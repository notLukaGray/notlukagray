import { beforeEach, describe, expect, it } from "vitest";
import { scanPageFrames } from "./widget-audit";

function makeFrame(id: string, name: string): SceneNode {
  return {
    id,
    type: "FRAME",
    name,
  } as SceneNode;
}

describe("scanPageFrames responsive pairing", () => {
  beforeEach(() => {
    (globalThis as { figma?: unknown }).figma = {
      currentPage: {
        children: [],
      },
    };
  });

  it("keeps first duplicate key per role and marks duplicate rows with warnings", () => {
    const figmaApi = (globalThis as { figma: { currentPage: { children: SceneNode[] } } }).figma;
    figmaApi.currentPage.children = [
      makeFrame("d1", "Section[Desktop]/Hero"),
      makeFrame("d2", "Section[Desktop]/Hero"),
      makeFrame("m1", "Section[Mobile]/Hero"),
      makeFrame("m2", "Section[Mobile]/Hero"),
    ];

    const rows = scanPageFrames();
    const byId = new Map(rows.map((row) => [row.frameId, row]));

    expect(byId.get("d1")?.pairStatus).toBe("paired");
    expect(byId.get("d1")?.pairedWithName).toBe("Section[Mobile]/Hero");
    expect(byId.get("m1")?.pairStatus).toBe("paired");
    expect(byId.get("m1")?.pairedWithName).toBe("Section[Desktop]/Hero");

    expect(byId.get("d2")?.pairStatus).toBe("paired");
    expect(byId.get("d2")?.prefixWarnings).toEqual(
      expect.arrayContaining([expect.stringContaining("Duplicate Section[Desktop]/hero frame key")])
    );
    expect(byId.get("d2")?.pairedWithName).toBe("Section[Mobile]/Hero");

    expect(byId.get("m2")?.pairStatus).toBe("paired");
    expect(byId.get("m2")?.prefixWarnings).toEqual(
      expect.arrayContaining([expect.stringContaining("Duplicate Section[Mobile]/hero frame key")])
    );
    expect(byId.get("m2")?.pairedWithName).toBe("Section[Desktop]/Hero");
  });

  it("marks unmatched responsive frames as orphan", () => {
    const figmaApi = (globalThis as { figma: { currentPage: { children: SceneNode[] } } }).figma;
    figmaApi.currentPage.children = [makeFrame("d1", "Section[Desktop]/Solo")];

    const rows = scanPageFrames();
    expect(rows).toHaveLength(1);
    expect(rows[0]).toMatchObject({
      frameId: "d1",
      exportKind: "preset",
      exportKey: "solo",
      responsiveRole: "desktop",
      pairStatus: "orphan",
    });
  });

  it("ignores non-frame nodes entirely", () => {
    const figmaApi = (globalThis as { figma: { currentPage: { children: SceneNode[] } } }).figma;
    figmaApi.currentPage.children = [
      makeFrame("f1", "Section[Desktop]/Hero"),
      { id: "t1", type: "TEXT", name: "Ignored" } as SceneNode,
    ];

    const rows = scanPageFrames();
    expect(rows.map((row) => row.frameId)).toEqual(["f1"]);
  });
});
