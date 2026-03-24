import { describe, expect, it, vi } from "vitest";
import { extractAbsolutePositionStyle, extractConstraintPosition } from "./layout-auto-props";
import { getBoundingRect } from "@figma-plugin/helpers";

vi.mock("@figma-plugin/helpers", () => ({
  getBoundingRect: vi.fn(() => ({ x: 0, y: 0, x2: 140, y2: 70, width: 140, height: 70 })),
}));

describe("layout-auto-props absolute positioning", () => {
  it("uses visual bounding dimensions for rotated nodes", () => {
    const style = extractAbsolutePositionStyle({
      x: 10,
      y: 20,
      width: 100,
      height: 50,
      rotation: 30,
    } as unknown as SceneNode & { x: number; y: number; width: number; height: number });

    expect(vi.mocked(getBoundingRect)).toHaveBeenCalled();
    expect(style).toMatchObject({
      left: "10px",
      top: "20px",
      width: "140px",
      height: "70px",
    });
  });

  it("uses raw dimensions for non-rotated nodes", () => {
    const style = extractAbsolutePositionStyle({
      x: 5,
      y: 6,
      width: 100,
      height: 50,
      rotation: 0,
    } as unknown as SceneNode & { x: number; y: number; width: number; height: number });

    expect(style).toMatchObject({
      left: "5px",
      top: "6px",
      width: "100px",
      height: "50px",
    });
  });

  it("computes right/bottom offsets from visual bounding size for rotated nodes", () => {
    const style = extractConstraintPosition(
      {
        x: 20,
        y: 30,
        width: 100,
        height: 50,
        rotation: 15,
        constraints: { horizontal: "RIGHT", vertical: "BOTTOM" },
      } as unknown as SceneNode & { x: number; y: number; width: number; height: number },
      400,
      300
    );

    expect(style).toMatchObject({
      right: "240px",
      bottom: "200px",
      width: "140px",
      height: "70px",
    });
  });
});
