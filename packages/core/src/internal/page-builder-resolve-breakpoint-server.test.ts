import { describe, it, expect } from "vitest";
import {
  isMobileFromUserAgent,
  resolvePageBuilderBreakpoint,
} from "./page-builder-resolve-breakpoint-server";
import type { bgBlock, SectionBlock } from "@pb/contracts/page-builder/core/page-builder-schemas";

describe("page-builder-resolve-breakpoint-server", () => {
  describe("resolvePageBuilderBreakpoint", () => {
    it("detects mobile from user-agent strings", () => {
      expect(isMobileFromUserAgent("Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X)")).toBe(
        true
      );
      expect(isMobileFromUserAgent("Mozilla/5.0 (Macintosh; Intel Mac OS X 14_0)")).toBe(false);
    });

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

    it("returns the same bg reference when no responsive fields exist", () => {
      const bg: bgBlock = { type: "backgroundImage", image: "work/static.jpg" } as bgBlock;
      const result = resolvePageBuilderBreakpoint({
        sections: [],
        bg,
        bgDefinitions: {},
        isMobile: true,
      });
      expect(result.bg).toBe(bg);
    });

    it("keeps divider section reference when no responsive props exist", () => {
      const divider = { type: "divider", id: "d1" } as unknown as SectionBlock;
      const result = resolvePageBuilderBreakpoint({
        sections: [divider],
        bg: null,
        bgDefinitions: {},
        isMobile: false,
      });
      expect(result.sections[0]).toBe(divider);
    });

    it("resolves contentWidth/contentHeight responsive values on contentBlock", () => {
      const section = {
        type: "contentBlock",
        elements: [],
        contentWidth: ["100%", "75%"],
        contentHeight: { mobile: "auto", desktop: "80vh" },
      } as unknown as SectionBlock;
      const mobile = resolvePageBuilderBreakpoint({
        sections: [section],
        bg: null,
        bgDefinitions: {},
        isMobile: true,
      });
      const desktop = resolvePageBuilderBreakpoint({
        sections: [section],
        bg: null,
        bgDefinitions: {},
        isMobile: false,
      });
      expect((mobile.sections[0] as Record<string, unknown>).contentWidth).toBe("100%");
      expect((desktop.sections[0] as Record<string, unknown>).contentWidth).toBe("75%");
      expect((mobile.sections[0] as Record<string, unknown>).contentHeight).toBe("auto");
      expect((desktop.sections[0] as Record<string, unknown>).contentHeight).toBe("80vh");
    });
  });
});
