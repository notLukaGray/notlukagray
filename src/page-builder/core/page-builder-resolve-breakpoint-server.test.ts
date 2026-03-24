import { describe, it, expect } from "vitest";
import { resolvePageBuilderBreakpoint } from "./page-builder-resolve-breakpoint-server";
import type { bgBlock, SectionBlock } from "./page-builder-schemas";

describe("page-builder-resolve-breakpoint-server", () => {
  describe("resolvePageBuilderBreakpoint", () => {
    it("resolves responsive array in bg (mobile)", () => {
      const bg: bgBlock = {
        type: "backgroundImage",
        image: "work/hero.jpg",
        width: ["100%", "50%"],
      } as bgBlock;
      const result = resolvePageBuilderBreakpoint({
        sections: [],
        bg,
        bgDefinitions: {},
        isMobile: true,
      });
      expect(result.bg).not.toBeNull();
      expect((result.bg as Record<string, unknown>).width).toBe("100%");
    });

    it("resolves responsive array in bg (desktop)", () => {
      const bg: bgBlock = {
        type: "backgroundImage",
        image: "work/hero.jpg",
        width: ["100%", "50%"],
      } as bgBlock;
      const result = resolvePageBuilderBreakpoint({
        sections: [],
        bg,
        bgDefinitions: {},
        isMobile: false,
      });
      expect(result.bg).not.toBeNull();
      expect((result.bg as Record<string, unknown>).width).toBe("50%");
    });

    it("resolves responsive object in bg", () => {
      const bg: bgBlock = {
        type: "backgroundImage",
        image: "work/hero.jpg",
        width: { mobile: "100%", desktop: "60%" },
      } as bgBlock;
      const result = resolvePageBuilderBreakpoint({
        sections: [],
        bg,
        bgDefinitions: {},
        isMobile: false,
      });
      expect(result.bg).not.toBeNull();
      expect((result.bg as Record<string, unknown>).width).toBe("60%");
    });

    it("resolves responsive values in bgDefinitions", () => {
      const def: bgBlock = {
        type: "backgroundImage",
        image: "work/card.jpg",
        width: ["100%", "33%"],
      } as bgBlock;
      const result = resolvePageBuilderBreakpoint({
        sections: [],
        bg: null,
        bgDefinitions: { cardBg: def },
        isMobile: true,
      });
      expect(result.bgDefinitions.cardBg).toBeDefined();
      expect((result.bgDefinitions.cardBg as Record<string, unknown>).width).toBe("100%");
    });

    it("resolves backgroundTransition from/to recursively", () => {
      const fromBg: bgBlock = {
        type: "backgroundImage",
        image: "a.jpg",
        width: ["100%", "50%"],
      } as bgBlock;
      const toBg: bgBlock = {
        type: "backgroundImage",
        image: "b.jpg",
        width: { mobile: "100%", desktop: "75%" },
      } as bgBlock;
      const bg: bgBlock = {
        type: "backgroundTransition",
        from: fromBg,
        to: toBg,
      } as bgBlock;
      const result = resolvePageBuilderBreakpoint({
        sections: [],
        bg,
        bgDefinitions: {},
        isMobile: false,
      });
      expect(result.bg).not.toBeNull();
      const resolved = result.bg as { type: string; from: bgBlock; to: bgBlock };
      expect(resolved.type).toBe("backgroundTransition");
      expect((resolved.from as Record<string, unknown>).width).toBe("50%");
      expect((resolved.to as Record<string, unknown>).width).toBe("75%");
    });

    it("returns empty sections and bg when given empty input", () => {
      const result = resolvePageBuilderBreakpoint({
        sections: [] as SectionBlock[],
        bg: null,
        bgDefinitions: {},
        isMobile: true,
      });
      expect(result.sections).toEqual([]);
      expect(result.bg).toBeNull();
      expect(result.bgDefinitions).toEqual({});
    });
  });
});
