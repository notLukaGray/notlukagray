import { describe, it, expect } from "vitest";
import {
  getElementLayoutStyle,
  normalizeLayoutInput,
  computePositioningStyle,
  computeSizingStyle,
  type ResolvedElementLayout,
} from "./element-layout-utils";

describe("element-layout-utils", () => {
  describe("normalizeLayoutInput", () => {
    it("returns undefined for undefined layout", () => {
      expect(normalizeLayoutInput(undefined)).toBeUndefined();
      expect(normalizeLayoutInput(undefined, true)).toBeUndefined();
    });

    it("returns layout as-is when isMobile is omitted (already resolved)", () => {
      const layout = { width: "100%", align: "center" as const };
      expect(normalizeLayoutInput(layout)).toEqual(layout);
    });
  });

  describe("computePositioningStyle", () => {
    it("maps align to alignSelf and applies margins and zIndex", () => {
      const resolved: ResolvedElementLayout = {
        align: "right",
        textAlign: "center",
        marginTop: "8px",
        marginBottom: "8px",
        zIndex: 10,
      };
      expect(computePositioningStyle(resolved)).toEqual({
        alignSelf: "flex-end",
        textAlign: "center",
        marginTop: "8px",
        marginBottom: "8px",
        zIndex: 10,
      });
    });

    it("returns empty object for empty resolved", () => {
      expect(computePositioningStyle({})).toEqual({});
    });

    it("supports vertical self-alignment via alignY using auto margins", () => {
      expect(computePositioningStyle({ alignY: "center" })).toMatchObject({
        marginTop: "auto",
        marginBottom: "auto",
      });
      expect(computePositioningStyle({ alignY: "bottom" })).toMatchObject({
        marginTop: "auto",
      });
    });
  });

  describe("computeSizingStyle", () => {
    it("converts hug to fit-content and sets minWidth/minHeight for non-hug", () => {
      const resolved: ResolvedElementLayout = {
        width: "100%",
        height: "hug",
      };
      expect(computeSizingStyle(resolved)).toEqual({
        width: "100%",
        minWidth: 0,
        height: "fit-content",
      });
    });

    it("applies constraints when present", () => {
      const resolved: ResolvedElementLayout = {
        width: "50%",
        constraints: {
          minWidth: "200px",
          maxWidth: "600px",
          minHeight: "100px",
        },
      };
      const style = computeSizingStyle(resolved);
      expect(style.minWidth).toBe("200px");
      expect(style.maxWidth).toBe("600px");
      expect(style.minHeight).toBe("100px");
    });
  });

  describe("getElementLayoutStyle", () => {
    it("returns empty object for undefined layout", () => {
      expect(getElementLayoutStyle(undefined)).toEqual({});
      expect(getElementLayoutStyle(undefined, true)).toEqual({});
    });

    it("representative: minimal layout (width only)", () => {
      const style = getElementLayoutStyle({ width: "200px" });
      expect(style).toMatchObject({ width: "200px", minWidth: 0 });
    });

    it("representative: hug width/height (fit-content)", () => {
      const style = getElementLayoutStyle({ width: "hug", height: "hug" });
      expect(style).toMatchObject({ width: "fit-content", height: "fit-content" });
    });

    it("representative: full layout (align, margins, constraints)", () => {
      const layout: ResolvedElementLayout = {
        width: "100%",
        height: "auto",
        align: "center",
        textAlign: "center",
        marginTop: "16px",
        marginBottom: "16px",
        zIndex: 5,
        constraints: { maxWidth: "800px" },
      };
      const style = getElementLayoutStyle(layout);
      expect(style.width).toBe("100%");
      expect(style.minWidth).toBe(0);
      expect(style.height).toBe("auto");
      expect(style.minHeight).toBe(0);
      expect(style.alignSelf).toBe("center");
      expect(style.textAlign).toBe("center");
      expect(style.marginTop).toBe("16px");
      expect(style.marginBottom).toBe("16px");
      expect(style.zIndex).toBe(5);
      expect(style.maxWidth).toBe("800px");
    });

    it("representative: responsive resolved via isMobile (desktop)", () => {
      const layout: Parameters<typeof getElementLayoutStyle>[0] = {
        width: ["80%", "100%"],
        align: ["left", "center"],
      };
      const style = getElementLayoutStyle(layout, false);
      expect(style.width).toBe("100%");
      expect(style.alignSelf).toBe("center");
    });

    it("representative: responsive resolved via isMobile (mobile)", () => {
      const layout: Parameters<typeof getElementLayoutStyle>[0] = {
        width: ["80%", "100%"],
        align: ["left", "center"],
      };
      const style = getElementLayoutStyle(layout, true);
      expect(style.width).toBe("80%");
      expect(style.alignSelf).toBe("flex-start");
    });

    it("applies responsive borderRadius", () => {
      const layout: Parameters<typeof getElementLayoutStyle>[0] = {
        width: "100%",
        borderRadius: ["12px", "24px"],
      };
      expect(getElementLayoutStyle(layout, true).borderRadius).toBe("12px");
      expect(getElementLayoutStyle(layout, false).borderRadius).toBe("24px");
    });

    it("applies responsive alignY", () => {
      const layout: Parameters<typeof getElementLayoutStyle>[0] = {
        alignY: ["top", "center"],
      };
      expect(getElementLayoutStyle(layout, true)).not.toHaveProperty("marginTop", "auto");
      expect(getElementLayoutStyle(layout, false)).toMatchObject({
        marginTop: "auto",
        marginBottom: "auto",
      });
    });
  });
});
