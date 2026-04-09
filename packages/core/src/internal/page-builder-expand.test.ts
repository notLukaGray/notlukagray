import { describe, it, expect } from "vitest";
import { expandPageBuilder } from "./page-builder-expand";
import type {
  PageBuilder,
  SectionBlock,
} from "@pb/contracts/page-builder/core/page-builder-schemas";

describe("expandPageBuilder", () => {
  it("uses default bg key when bgKey is omitted", () => {
    const page: PageBuilder = {
      slug: "test",
      title: "Test",
      sectionOrder: [],
      definitions: {
        bg: {
          type: "backgroundImage",
          image: "work/default.jpg",
        } as unknown as PageBuilder["definitions"][string],
      },
    } as PageBuilder;
    const { bg } = expandPageBuilder(page);
    expect(bg).not.toBeNull();
    expect((bg as { type?: string }).type).toBe("backgroundImage");
  });

  it("ignores entries in sectionOrder that are not valid section blocks", () => {
    const page: PageBuilder = {
      slug: "test",
      title: "Test",
      sectionOrder: ["badType", "missing", "valid"],
      definitions: {
        badType: { type: "notASection" } as unknown as PageBuilder["definitions"][string],
        valid: {
          type: "contentBlock",
          elements: [],
        } as unknown as PageBuilder["definitions"][string],
      },
      bgKey: "_none",
    };
    const { sections } = expandPageBuilder(page);
    expect(sections).toHaveLength(1);
    expect(sections[0]?.type).toBe("contentBlock");
  });

  it("resolves trigger payload URLs when assetBase is provided", () => {
    const page: PageBuilder = {
      slug: "test",
      title: "Test",
      sectionOrder: ["hero"],
      definitions: {
        hero: {
          type: "sectionColumn",
          elements: [],
          onVisible: { type: "setBackground", payload: "heroBg" },
        } as unknown as PageBuilder["definitions"][string],
        heroBg: {
          type: "backgroundImage",
          image: "work/hero.jpg",
        } as unknown as PageBuilder["definitions"][string],
      },
      bgKey: "_none",
    };

    const { sections } = expandPageBuilder(page, { assetBase: "/work" });
    expect(sections).toHaveLength(1);
    const section = sections[0] as SectionBlock;
    expect(section.onVisible?.payload).toBeDefined();
    const payload = section.onVisible!.payload as { type?: string; image?: string };
    expect(payload.type).toBe("backgroundImage");
    expect(payload.image).toContain("/api/video/");
    expect(payload.image).toContain("work");
    expect(payload.image).toContain("hero.jpg");
  });

  it("does not resolve trigger payload URLs when assetBase is omitted", () => {
    const page: PageBuilder = {
      slug: "test",
      title: "Test",
      sectionOrder: ["hero"],
      definitions: {
        hero: {
          type: "sectionColumn",
          elements: [],
          onVisible: { type: "setBackground", payload: "heroBg" },
        } as unknown as PageBuilder["definitions"][string],
        heroBg: {
          type: "backgroundImage",
          image: "work/hero.jpg",
        } as unknown as PageBuilder["definitions"][string],
      },
      bgKey: "_none",
    };

    const { sections } = expandPageBuilder(page);
    expect(sections).toHaveLength(1);
    const section = sections[0] as SectionBlock;
    const payload = section.onVisible!.payload as { type?: string; image?: string };
    expect(payload.image).toBe("work/hero.jpg");
  });

  it("resolves trigger payload URLs with empty assetBase when requested", () => {
    const page: PageBuilder = {
      slug: "test",
      title: "Test",
      sectionOrder: ["hero"],
      definitions: {
        hero: {
          type: "sectionColumn",
          elements: [],
          onVisible: { type: "setBackground", payload: "heroBg" },
        } as unknown as PageBuilder["definitions"][string],
        heroBg: {
          type: "backgroundImage",
          image: "work/hero.jpg",
        } as unknown as PageBuilder["definitions"][string],
      },
      bgKey: "_none",
    };

    const { sections } = expandPageBuilder(page, { assetBase: "" });
    expect(sections).toHaveLength(1);
    const section = sections[0] as SectionBlock;
    const payload = section.onVisible!.payload as { type?: string; image?: string };
    expect(payload.image).toContain("/api/video/");
  });

  it("does not throw when sectionOrder contains empty keys", () => {
    const page: PageBuilder = {
      slug: "test",
      title: "Test",
      sectionOrder: ["", "hero"],
      definitions: {
        hero: {
          type: "contentBlock",
          elements: [],
        } as unknown as PageBuilder["definitions"][string],
      },
      bgKey: "_none",
    };
    const { sections } = expandPageBuilder(page);
    expect(sections).toHaveLength(1);
    expect(sections[0]?.type).toBe("contentBlock");
  });
});
