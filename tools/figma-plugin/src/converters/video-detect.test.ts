import { describe, it, expect } from "vitest";
import { inferVideoInferenceMeta } from "./video-detect";

describe("video-detect inference meta", () => {
  it("returns null for explicit video type annotation", () => {
    const node = { type: "FRAME", name: "Clip" } as unknown as SceneNode;
    expect(inferVideoInferenceMeta(node, { type: "video" })).toBeNull();
  });

  it("returns medium confidence for name heuristics", () => {
    const node = { type: "FRAME", name: "Promo trailer" } as unknown as SceneNode;
    expect(inferVideoInferenceMeta(node, {})).toMatchObject({
      kind: "elementVideo",
      confidence: "medium",
      detail: "layer-name",
    });
  });
});
