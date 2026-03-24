import { describe, expect, it, vi } from "vitest";
import { convertInstanceNode } from "./node-instance-convert";
import { convertVariantChildren } from "./variant-child-helpers";

vi.mock("./variant-child-helpers", () => ({
  convertVariantChildren: vi.fn(async () => ({
    elementOrder: ["new-text"],
    definitions: {
      "new-text": { type: "elementBody", id: "new-text", text: "New Label" },
    },
  })),
  extractVariantNodeProps: vi.fn(() => ({
    width: "200px",
    height: "50px",
    wrapperStyle: { backgroundColor: "#111111" },
  })),
}));

vi.mock("./component-variants", async () => {
  const actual =
    await vi.importActual<typeof import("./component-variants")>("./component-variants");
  return {
    ...actual,
    buildVariantElement: vi.fn(async () => ({
      type: "elementGroup",
      id: "button",
      section: {
        elementOrder: ["button--default", "button--hover"],
        definitions: {
          "button--default": {
            type: "elementGroup",
            id: "button--default",
            section: {
              elementOrder: ["old-text"],
              definitions: {
                "old-text": {
                  type: "elementBody",
                  id: "old-text",
                  text: "OLD",
                  motion: { whileHover: { opacity: 0.8 } },
                },
              },
            },
          },
          "button--hover": {
            type: "elementGroup",
            id: "button--hover",
            hidden: true,
            section: { elementOrder: [], definitions: {} },
          },
        },
      },
    })),
  };
});

describe("convertInstanceNode", () => {
  it("applies placed-instance overrides to the exported default variant state", async () => {
    const componentSet = {
      type: "COMPONENT_SET",
      name: "Button Set",
    } as unknown as ComponentSetNode;
    const mainComponent = { parent: componentSet } as unknown as ComponentNode;
    const instance = {
      type: "INSTANCE",
      name: "Button Instance",
      variantProperties: { State: "Default" },
      componentProperties: {},
      getMainComponentAsync: vi.fn(async () => mainComponent),
    } as unknown as InstanceNode;

    const ctx = {
      assets: [],
      warnings: [] as string[],
      assetCounter: 0,
      usedIds: new Set<string>(),
      usedAssetKeys: new Set<string>(),
      cdnPrefix: "",
    };

    const result = await convertInstanceNode(
      instance,
      ctx,
      {},
      undefined,
      vi.fn(async () => null)
    );

    expect(result).toBeTruthy();
    const record = result as unknown as Record<string, unknown>;
    const section = record.section as Record<string, unknown>;
    const defs = section.definitions as Record<string, unknown>;
    const defaultState = defs["button--default"] as Record<string, unknown>;
    expect(defaultState.width).toBe("200px");
    expect(defaultState.height).toBe("50px");
    expect(defaultState.wrapperStyle).toEqual({ backgroundColor: "#111111" });
    const defaultSection = defaultState.section as Record<string, unknown>;
    expect(defaultSection.elementOrder).toEqual(["old-text"]);
    const defaultDefs = defaultSection.definitions as Record<string, unknown>;
    expect(defaultDefs["old-text"]).toEqual({
      type: "elementBody",
      id: "old-text",
      text: "New Label",
      motion: { whileHover: { opacity: 0.8 } },
    });
  });

  it("applies componentPropertyReferences overrides (characters/visible) onto merged default state", async () => {
    vi.mocked(convertVariantChildren).mockResolvedValueOnce({
      elementOrder: ["old-text"],
      definitions: {
        "old-text": { type: "elementBody", id: "old-text", text: "OLD" },
      },
    });

    const componentSet = {
      type: "COMPONENT_SET",
      name: "Button Set",
    } as unknown as ComponentSetNode;
    const mainComponent = { parent: componentSet } as unknown as ComponentNode;
    const instance = {
      type: "INSTANCE",
      name: "Button Instance",
      variantProperties: { State: "Default" },
      componentProperties: {
        "ButtonText#0:1": { type: "TEXT", value: "Override Label" },
        "IconVisible#0:2": { type: "BOOLEAN", value: false },
      },
      children: [
        {
          type: "TEXT",
          name: "Label",
          componentPropertyReferences: { characters: "ButtonText#0:1", visible: "IconVisible#0:2" },
        },
      ],
      getMainComponentAsync: vi.fn(async () => mainComponent),
    } as unknown as InstanceNode;

    const ctx = {
      assets: [],
      warnings: [] as string[],
      assetCounter: 0,
      usedIds: new Set<string>(),
      usedAssetKeys: new Set<string>(),
      cdnPrefix: "",
    };

    const result = await convertInstanceNode(
      instance,
      ctx,
      {},
      undefined,
      vi.fn(async () => null)
    );

    const record = result as unknown as Record<string, unknown>;
    const section = record.section as Record<string, unknown>;
    const defs = section.definitions as Record<string, unknown>;
    const defaultState = defs["button--default"] as Record<string, unknown>;
    const defaultSection = defaultState.section as Record<string, unknown>;
    const defaultDefs = defaultSection.definitions as Record<string, unknown>;
    expect(defaultDefs["old-text"]).toEqual({
      type: "elementBody",
      id: "old-text",
      text: "Override Label",
      motion: { whileHover: { opacity: 0.8 } },
      hidden: true,
    });
  });
});
