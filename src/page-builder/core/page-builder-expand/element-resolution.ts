import type { ElementBlock, PageBuilder } from "@/page-builder/core/page-builder-schemas";
import type { DefinitionsMap, SectionWithElements } from "./section-shapes";

export function buildDisplayOrder(page: PageBuilder): string[] {
  return [...(page.sectionOrder ?? []), ...(page.triggers ?? [])];
}

export function getElementOrder(section: SectionWithElements): string[] | null {
  if (Array.isArray(section.elementOrder)) return section.elementOrder;
  const eo = section.elementOrder;
  if (eo && typeof eo === "object" && ("mobile" in eo || "desktop" in eo)) {
    return eo.desktop ?? eo.mobile ?? null;
  }
  if (
    Array.isArray(section.elements) &&
    section.elements.length > 0 &&
    typeof section.elements[0] === "string"
  ) {
    return section.elements as string[];
  }
  return null;
}

export function resolveElements(order: string[], defs: DefinitionsMap): ElementBlock[] {
  return order
    .map((k) => {
      const element = defs[k];
      if (element && typeof element === "object" && "type" in element) {
        if (!("id" in element) || !element.id) {
          return { ...element, id: k } as ElementBlock;
        }
        return { ...element } as ElementBlock;
      }
      return null;
    })
    .filter(
      (x): x is ElementBlock =>
        x != null &&
        typeof x === "object" &&
        "type" in x &&
        typeof (x as { type: string }).type === "string"
    );
}

export function applyElementIdsAndModules(
  section: SectionWithElements,
  defs: DefinitionsMap,
  namespacePrefix: string
): void {
  if (!Array.isArray(section.elements)) return;
  for (const element of section.elements) {
    if (
      element &&
      typeof element === "object" &&
      "id" in element &&
      typeof element.id === "string" &&
      element.id
    ) {
      element.id = `${namespacePrefix}:${element.id}`;
    }
    const el = element as ElementBlock & { module?: string; moduleConfig?: unknown };
    if (el.module && typeof el.module === "string") {
      const moduleBlock = defs[el.module];
      if (
        moduleBlock &&
        typeof moduleBlock === "object" &&
        "type" in moduleBlock &&
        (moduleBlock as { type: string }).type === "module"
      ) {
        el.moduleConfig = moduleBlock;
      }
    }
  }
}
