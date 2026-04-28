import { describe, expect, it } from "vitest";
import type { PageTags, ProjectGroupsMap, SectionBlock } from "@pb/contracts";
import { filterPageByActiveTags, slugifyTagValue } from "./page-builder-filter-pass";

const projectGroups: ProjectGroupsMap = {
  spinach: {
    projectSlug: "work/project-spinach-tiff",
    elements: ["bg-spinach", "spinach-item", "spinach-preview"],
  },
  brand: {
    projectSlug: "work/project-brand",
    elements: ["bg-brand", "brand-item", "brand-preview"],
  },
};

const tagsBySlug: Record<string, PageTags> = {
  "work/project-spinach-tiff": {
    brand: ["Spinach"],
    ability: ["Art Direction", "CGI"],
  },
  "work/project-brand": {
    brand: ["NOMA"],
    ability: ["Brand Identity"],
  },
};

const getProjectTags = (slug: string): PageTags | undefined => tagsBySlug[slug];

function makeSections(): SectionBlock[] {
  return [
    {
      type: "contentBlock",
      elementOrder: ["bg-spinach", "bg-brand", "page-heading", "layout"],
      elements: [
        { type: "elementGroup", id: "bg-spinach" },
        { type: "elementGroup", id: "bg-brand" },
        { type: "elementBody", id: "page-heading", text: "Work" },
        {
          type: "elementGroup",
          id: "layout",
          section: {
            elementOrder: ["list-col", "preview-col"],
            definitions: {
              "list-col": {
                type: "elementGroup",
                section: {
                  elementOrder: ["spinach-item", "brand-item"],
                  definitions: {
                    "spinach-item": { type: "elementBody", text: "Spinach × TIFF" },
                    "brand-item": { type: "elementBody", text: "NOMA" },
                  },
                },
              },
              "preview-col": {
                type: "elementGroup",
                section: {
                  elementOrder: ["spinach-preview", "brand-preview"],
                  definitions: {
                    "spinach-preview": { type: "elementGroup" },
                    "brand-preview": { type: "elementGroup" },
                  },
                },
              },
            },
          },
        },
      ],
    } as unknown as SectionBlock,
  ];
}

describe("filterPageByActiveTags", () => {
  it("is a no-op when no filters are active", () => {
    const sections = makeSections();
    const result = filterPageByActiveTags({
      sections,
      projectGroups,
      activeFilters: {},
      getProjectTags,
    });
    expect(result.removedKeys.size).toBe(0);
    expect(result.sections).toBe(sections);
  });

  it("is a no-op when active filters list is empty arrays", () => {
    const sections = makeSections();
    const result = filterPageByActiveTags({
      sections,
      projectGroups,
      activeFilters: { brand: [] },
      getProjectTags,
    });
    expect(result.removedKeys.size).toBe(0);
    expect(result.sections).toBe(sections);
  });

  it("drops elements for projects whose tags don't match a single-category filter", () => {
    const result = filterPageByActiveTags({
      sections: makeSections(),
      projectGroups,
      activeFilters: { brand: ["spinach"] },
      getProjectTags,
    });

    expect(result.removedKeys).toEqual(new Set(["bg-brand", "brand-item", "brand-preview"]));

    const top = result.sections[0] as unknown as {
      elementOrder: string[];
      elements: { id: string; section?: { elementOrder?: string[] } }[];
    };
    expect(top.elementOrder).toEqual(["bg-spinach", "page-heading", "layout"]);
    expect(top.elements.map((e) => e.id)).toEqual(["bg-spinach", "page-heading", "layout"]);

    const layout = top.elements.find((e) => e.id === "layout") as unknown as {
      section: {
        definitions: Record<
          string,
          {
            section: {
              elementOrder: string[];
              definitions: Record<string, unknown>;
            };
          }
        >;
      };
    };
    expect(layout.section.definitions["list-col"]!.section.elementOrder).toEqual(["spinach-item"]);
    expect(Object.keys(layout.section.definitions["list-col"]!.section.definitions)).toEqual([
      "spinach-item",
    ]);
    expect(layout.section.definitions["preview-col"]!.section.elementOrder).toEqual([
      "spinach-preview",
    ]);
  });

  it("drops expanded top-level elements whose ids were namespaced during page expansion", () => {
    const sections = makeSections() as unknown as Array<{
      elements: Array<{ id: string; type: string }>;
      elementOrder: string[];
    }>;
    sections[0]!.elements[0]!.id = "contentBlock_0:bg-spinach";
    sections[0]!.elements[1]!.id = "contentBlock_0:bg-brand";

    const result = filterPageByActiveTags({
      sections: sections as unknown as SectionBlock[],
      projectGroups,
      activeFilters: { brand: ["spinach"] },
      getProjectTags,
    });

    const top = result.sections[0] as unknown as {
      elementOrder: string[];
      elements: { id: string }[];
    };
    expect(top.elementOrder).toEqual(["bg-spinach", "page-heading", "layout"]);
    expect(top.elements.map((e) => e.id)).toEqual([
      "contentBlock_0:bg-spinach",
      "page-heading",
      "layout",
    ]);
  });

  it("AND-combines categories: project must match every active category", () => {
    const onlyMatchingBrand = filterPageByActiveTags({
      sections: makeSections(),
      projectGroups,
      activeFilters: { brand: ["spinach"], ability: ["brand-identity"] },
      getProjectTags,
    });
    // Spinach matches brand=spinach but not ability=brand-identity → dropped.
    // NOMA fails brand → dropped.
    expect(onlyMatchingBrand.removedKeys).toEqual(
      new Set([
        "bg-spinach",
        "spinach-item",
        "spinach-preview",
        "bg-brand",
        "brand-item",
        "brand-preview",
      ])
    );
  });

  it("OR-combines values within a single category", () => {
    const result = filterPageByActiveTags({
      sections: makeSections(),
      projectGroups,
      activeFilters: { brand: ["spinach", "noma"] },
      getProjectTags,
    });
    expect(result.removedKeys.size).toBe(0);
  });

  it("matches case-insensitively and handles multi-word slugs", () => {
    expect(slugifyTagValue("Clean It Up")).toBe("clean-it-up");
    expect(slugifyTagValue("  Art Direction ")).toBe("art-direction");

    const tags: Record<string, PageTags> = {
      "work/cleanup": { brand: ["Clean It Up"] },
    };
    const result = filterPageByActiveTags({
      sections: [
        {
          type: "contentBlock",
          elementOrder: ["cleanup-item"],
          elements: [{ type: "elementBody", id: "cleanup-item" }],
        } as unknown as SectionBlock,
      ],
      projectGroups: {
        cleanup: { projectSlug: "work/cleanup", elements: ["cleanup-item"] },
      },
      activeFilters: { brand: ["clean-it-up"] },
      getProjectTags: (slug) => tags[slug],
    });
    expect(result.removedKeys.size).toBe(0);
  });

  it("treats projects with no tags as non-matching when filters are active", () => {
    const result = filterPageByActiveTags({
      sections: makeSections(),
      projectGroups,
      activeFilters: { brand: ["spinach"] },
      getProjectTags: () => undefined,
    });
    // Both projects fail (no tags), so all elements drop.
    expect(result.removedKeys.size).toBe(6);
  });

  it("ignores filter categories the project doesn't have when filters list is empty", () => {
    const result = filterPageByActiveTags({
      sections: makeSections(),
      projectGroups,
      activeFilters: { topic: [] },
      getProjectTags,
    });
    expect(result.removedKeys.size).toBe(0);
  });
});
