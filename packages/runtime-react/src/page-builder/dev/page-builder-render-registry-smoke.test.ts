import { describe, expect, it } from "vitest";
import type { ElementBlock, SectionBlock } from "@pb/contracts";
import { discoverAllPages, loadPageBuilderByPathAsync, resolvePagePath } from "@pb/core/loader";
import { expandPageBuilder } from "@pb/core/expand";
import { SECTION_COMPONENTS } from "@/page-builder/section";
import { ELEMENT_COMPONENTS } from "@/page-builder/elements";

function collectElementsFromSection(section: SectionBlock): ElementBlock[] {
  const out: ElementBlock[] = [];
  const visitElement = (element: ElementBlock): void => {
    out.push(element);
    const el = element as ElementBlock & {
      section?: { definitions?: Record<string, unknown> };
      moduleConfig?: {
        slots?: Record<string, { section?: { definitions?: Record<string, unknown> } }>;
      };
    };
    if (el.section?.definitions) {
      for (const def of Object.values(el.section.definitions)) {
        if (def && typeof def === "object" && "type" in def) {
          visitElement(def as ElementBlock);
        }
      }
    }
    if (el.moduleConfig?.slots) {
      for (const slot of Object.values(el.moduleConfig.slots)) {
        const defs = slot?.section?.definitions;
        if (!defs) continue;
        for (const def of Object.values(defs)) {
          if (def && typeof def === "object" && "type" in def) {
            visitElement(def as ElementBlock);
          }
        }
      }
    }
  };

  const main = (section as { elements?: ElementBlock[] }).elements;
  if (Array.isArray(main)) {
    for (const element of main) {
      if (element && typeof element === "object") visitElement(element);
    }
  }

  if (section.type === "revealSection") {
    const reveal = section as SectionBlock & {
      collapsedElements?: ElementBlock[];
      revealedElements?: ElementBlock[];
    };
    for (const element of reveal.collapsedElements ?? []) visitElement(element);
    for (const element of reveal.revealedElements ?? []) visitElement(element);
  }

  return out;
}

describe("page-builder render registry smoke", () => {
  it("ensures every discovered page resolves to known section/element renderer types", async () => {
    const pages = discoverAllPages();
    const unknownSectionTypes = new Set<string>();
    const unknownElementTypes = new Set<string>();

    for (const page of pages) {
      const absPath = resolvePagePath(page.slugSegments);
      if (!absPath) continue;
      const loaded = await loadPageBuilderByPathAsync(absPath, page.slugSegments);
      expect(loaded).not.toBeNull();
      if (!loaded) continue;

      const expanded = expandPageBuilder(loaded);
      for (const section of expanded.sections) {
        if (!SECTION_COMPONENTS[section.type]) unknownSectionTypes.add(section.type);
        for (const element of collectElementsFromSection(section)) {
          if (!ELEMENT_COMPONENTS[element.type]) unknownElementTypes.add(element.type);
        }
      }
    }

    expect(Array.from(unknownSectionTypes)).toEqual([]);
    expect(Array.from(unknownElementTypes)).toEqual([]);
  });
});
