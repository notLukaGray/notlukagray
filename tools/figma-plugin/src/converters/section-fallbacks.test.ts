import { describe, expect, it, vi } from "vitest";

vi.mock("./node-to-element", () => ({
  convertNode: vi.fn(async (node: { name?: string }) => ({
    type: "elementSpacer",
    id: String(node.name ?? "child")
      .trim()
      .toLowerCase()
      .replace(/\s+/g, "-"),
    height: "10px",
  })),
}));

import { convertFrameToRevealSection } from "./section-reveal";
import { convertFrameToColumnSection } from "./section-column-convert";
import { convertFrameToSection } from "./node-to-section";

(globalThis as unknown as { figma: { mixed: symbol } }).figma = { mixed: Symbol("mixed") };

function makeCtx(): {
  assets: never[];
  warnings: string[];
  assetCounter: number;
  usedIds: Set<string>;
  usedAssetKeys: Set<string>;
  cdnPrefix: string;
} {
  return {
    assets: [],
    warnings: [],
    assetCounter: 0,
    usedIds: new Set<string>(),
    usedAssetKeys: new Set<string>(),
    cdnPrefix: "",
  };
}

function makeLinearGradientPaint(overrides: Partial<GradientPaint> = {}): GradientPaint {
  return {
    type: "GRADIENT_LINEAR",
    visible: true,
    gradientTransform: [
      [1, 0, 0],
      [0, 1, 0],
    ],
    gradientStops: [
      { position: 0, color: { r: 0, g: 0, b: 0, a: 0 } },
      { position: 1, color: { r: 0, g: 0, b: 0, a: 1 } },
    ],
    ...overrides,
  } as GradientPaint;
}

describe("section fallback slotting", () => {
  it("keeps unslotted reveal children in revealedElements", async () => {
    const ctx = makeCtx();
    const section = await convertFrameToRevealSection(
      {
        type: "FRAME",
        name: "Reveal [pb: type=revealSection]",
        width: 600,
        height: 400,
        x: 0,
        y: 0,
        visible: true,
        fills: [],
        strokes: [],
        effects: [],
        layoutMode: "NONE",
        clipsContent: false,
        children: [
          {
            type: "FRAME",
            name: "Header",
            width: 200,
            height: 80,
            x: 0,
            y: 0,
            visible: true,
            children: [{ type: "RECTANGLE", name: "Slot child", width: 20, height: 20 }],
          },
          { type: "RECTANGLE", name: "Loose child", width: 20, height: 20 },
        ],
      } as unknown as FrameNode,
      ctx
    );

    expect(
      (section.revealedElements as unknown[]).map((el) => (el as { id?: string }).id)
    ).toContain("loose-child");
    expect(ctx.warnings.some((w) => w.includes("fallback slotting"))).toBe(true);
  });

  it("keeps loose column children and assigns them to the nearest column", async () => {
    const ctx = makeCtx();
    const section = await convertFrameToColumnSection(
      {
        type: "FRAME",
        name: "Columns",
        width: 800,
        height: 400,
        x: 0,
        y: 0,
        visible: true,
        fills: [],
        strokes: [],
        effects: [],
        layoutMode: "HORIZONTAL",
        clipsContent: false,
        children: [
          {
            type: "FRAME",
            name: "Column 1",
            width: 100,
            height: 400,
            x: 0,
            y: 0,
            visible: true,
            children: [{ type: "RECTANGLE", name: "Left item", width: 20, height: 20 }],
          },
          {
            type: "FRAME",
            name: "Column 2",
            width: 100,
            height: 400,
            x: 300,
            y: 0,
            visible: true,
            children: [{ type: "RECTANGLE", name: "Right item", width: 20, height: 20 }],
          },
          { type: "RECTANGLE", name: "Loose item", width: 20, height: 20, x: 320, y: 20 },
        ],
      } as unknown as FrameNode,
      ctx
    );

    const assignments = section.columnAssignments as Record<string, number>;
    const elementIds = (section.elements as Array<{ id?: string }>).map((el) => el.id);
    expect(elementIds).toEqual(expect.arrayContaining(["left-item", "right-item", "loose-item"]));
    expect(assignments["loose-item"]).toBe(2);
  });

  it("exports stacked section fills as layers so multi-gradient backgrounds are preserved", async () => {
    const ctx = makeCtx();
    const section = await convertFrameToSection(
      {
        type: "FRAME",
        name: "Page/Test",
        width: 600,
        height: 400,
        x: 0,
        y: 0,
        visible: true,
        fills: [
          makeLinearGradientPaint({
            gradientStops: [
              { position: 0, color: { r: 0.65, g: 0.5, b: 0.27, a: 1 } },
              { position: 1, color: { r: 0.02, g: 0.02, b: 0.01, a: 1 } },
            ],
          }),
          makeLinearGradientPaint({
            blendMode: "MULTIPLY",
            opacity: 0.5,
            gradientStops: [
              { position: 0, color: { r: 0, g: 0, b: 0, a: 0 } },
              { position: 1, color: { r: 0, g: 0, b: 0, a: 1 } },
            ],
          }),
        ],
        strokes: [],
        effects: [],
        layoutMode: "NONE",
        clipsContent: false,
        children: [],
      } as unknown as FrameNode,
      ctx
    );

    const layers = (section as Record<string, unknown>).layers as Array<Record<string, unknown>>;
    expect(Array.isArray(layers)).toBe(true);
    expect(layers).toHaveLength(2);
    expect(layers[0].fill).toContain("linear-gradient");
    expect(layers[1].blendMode).toBe("multiply");
    expect((section as Record<string, unknown>).fill).toBeUndefined();
  });

  it("drops inferred layers when [pb: fill=...] override is provided", async () => {
    const ctx = makeCtx();
    const section = await convertFrameToSection(
      {
        type: "FRAME",
        name: "Page/Test [pb: fill=#123456]",
        width: 600,
        height: 400,
        x: 0,
        y: 0,
        visible: true,
        fills: [makeLinearGradientPaint(), makeLinearGradientPaint({ blendMode: "OVERLAY" })],
        strokes: [],
        effects: [],
        layoutMode: "NONE",
        clipsContent: false,
        children: [],
      } as unknown as FrameNode,
      ctx
    );

    expect((section as Record<string, unknown>).fill).toBe("#123456");
    expect((section as Record<string, unknown>).layers).toBeUndefined();
  });
});
