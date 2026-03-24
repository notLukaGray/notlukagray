import { describe, it, expect } from "vitest";
import { expandPageBuilder } from "./page-builder-expand";
import type { PageBuilder, SectionBlock } from "./page-builder-schemas";

describe("expandPageBuilder", () => {
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
});
