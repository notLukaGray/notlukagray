import type {
  ElementBlock,
  SectionDefinitionBlock,
} from "@/page-builder/core/page-builder-schemas";

export function resolveSectionContentBlockElements(args: {
  elementsProp?: ElementBlock[];
  elementOrder?: string[] | { mobile?: string[]; desktop?: string[] };
  sectionDefinitions?: Record<string, SectionDefinitionBlock>;
}): ElementBlock[] {
  const { elementsProp = [], elementOrder, sectionDefinitions } = args;
  if (elementsProp.length) return elementsProp;

  const order = Array.isArray(elementOrder) ? elementOrder : null;
  if (!order?.length || !sectionDefinitions || typeof sectionDefinitions !== "object") return [];

  const resolved: ElementBlock[] = [];
  for (const key of order) {
    const def = (sectionDefinitions as Record<string, unknown>)[key];
    if (def && typeof def === "object" && "type" in def) {
      const element = def as ElementBlock & { id?: string };
      resolved.push(
        element.id ? (element as ElementBlock) : ({ ...element, id: key } as ElementBlock)
      );
    }
  }
  return resolved;
}
