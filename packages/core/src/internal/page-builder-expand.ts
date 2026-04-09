import {
  SECTION_TYPE_STRINGS,
  type PageBuilder,
  type SectionBlock,
  type bgBlock,
} from "@pb/contracts";
import {
  applyElementIdsAndModules,
  buildDisplayOrder,
  getElementOrder,
  resolveElements,
} from "./page-builder-expand/element-resolution";
import { applyColumnNamespace } from "./page-builder-expand/column-namespacing";
import { resolveSectionTriggerPayloads } from "./page-builder-expand/trigger-payload-resolution";
import type { DefinitionsMap, SectionWithElements } from "./page-builder-expand/section-shapes";
import { resolveTriggerPayloadUrls } from "./page-builder-triggers";

export type ExpandPageBuilderOptions = {
  /** When set, trigger payloads get asset URLs resolved in the same pass (avoids second walk in getPage). */
  assetBase?: string;
};

function warnExpandFallbacks(page: PageBuilder, displayOrder: string[]): void {
  if (process.env.NODE_ENV !== "development") return;
  const defs = page.definitions;
  const slug = page.slug ?? "(unknown)";

  // bgKey fallback
  if (!page.bgKey) {
    console.warn(
      `[page-builder] ${slug}: bgKey not set — defaulting to "bg". Set bgKey explicitly to suppress this warning.`
    );
  }

  // section-order drops
  for (const key of page.sectionOrder ?? []) {
    const block = defs[key];
    if (block == null || typeof block !== "object" || !("type" in block)) {
      console.warn(
        `[page-builder] ${slug}: sectionOrder key "${key}" has no matching definition — dropped.`
      );
      continue;
    }
    const type = (block as { type: string }).type;
    if (!SECTION_TYPE_STRINGS.has(type)) {
      console.warn(
        `[page-builder] ${slug}: sectionOrder key "${key}" has type "${type}" which is not a section type — dropped.`
      );
    }
  }

  // element id synthesis (element lacks an explicit id, so def key is used)
  for (const key of displayOrder) {
    const block = defs[key];
    if (block == null || typeof block !== "object" || !("type" in block)) continue;
    const type = (block as { type: string }).type;
    if (!SECTION_TYPE_STRINGS.has(type)) continue;
    const section = block as { elementOrder?: unknown; elements?: unknown; definitions?: unknown };
    const order: string[] = Array.isArray(section.elementOrder)
      ? (section.elementOrder as string[])
      : [];
    const sectionDefs =
      section.definitions && typeof section.definitions === "object"
        ? { ...defs, ...(section.definitions as Record<string, unknown>) }
        : defs;
    for (const elKey of order) {
      const el = (sectionDefs as Record<string, unknown>)[elKey];
      if (el == null || typeof el !== "object" || !("type" in el)) continue;
      const elId = (el as Record<string, unknown>).id;
      if (typeof elId !== "string" || elId.trim().length === 0) {
        console.warn(
          `[page-builder] ${slug}/${key}: element "${elKey}" has no explicit id — synthesizing id from definition key. Add an id field to suppress.`
        );
      }
    }
  }
}

/** Expand PageBuilder into bg + sections; section.elements are refs into definitions. */
export function expandPageBuilder(
  page: PageBuilder,
  options?: ExpandPageBuilderOptions
): {
  bg: bgBlock | null;
  sections: SectionBlock[];
} {
  const defs = page.definitions;
  const displayOrder = buildDisplayOrder(page);
  const bgKey = page.bgKey ?? "bg";

  warnExpandFallbacks(page, displayOrder);

  const bg: bgBlock | null =
    defs[bgKey] != null && typeof defs[bgKey] === "object" && "type" in (defs[bgKey] as object)
      ? (defs[bgKey] as bgBlock)
      : null;

  const sections: SectionBlock[] = [];

  for (let i = 0; i < displayOrder.length; i++) {
    const key = displayOrder[i];
    if (!key) continue;
    const block = defs[key];
    if (block == null || typeof block !== "object" || !("type" in block)) continue;
    const type = (block as { type: string }).type;
    if (!SECTION_TYPE_STRINGS.has(type)) continue;

    const section = { ...block } as SectionWithElements;
    const order = getElementOrder(section);
    if (order?.length) {
      const sectionDefs = (section as { definitions?: DefinitionsMap }).definitions;
      const defsForElements: DefinitionsMap =
        sectionDefs && typeof sectionDefs === "object" && !Array.isArray(sectionDefs)
          ? { ...defs, ...sectionDefs }
          : defs;
      section.elements = resolveElements(order, defsForElements);
    }

    const namespacePrefix =
      section.id && typeof section.id === "string" ? section.id : `${type}_${i}`;
    applyElementIdsAndModules(section, defs, namespacePrefix);
    applyColumnNamespace(section, namespacePrefix);
    resolveSectionTriggerPayloads(section, defs);

    sections.push(section as SectionBlock);
  }

  const finalSections =
    options?.assetBase !== undefined
      ? resolveTriggerPayloadUrls(sections, options.assetBase, page.definitions)
      : sections;

  return { bg, sections: finalSections };
}
