import type { PageBuilderDefinitionBlock } from "@pb/contracts";

export function mergeNestedSectionDefinitions(
  definitions: Record<string, PageBuilderDefinitionBlock>,
  nestedDefs: Record<string, unknown> | undefined,
  sectionSet: ReadonlySet<string>
): void {
  if (!nestedDefs || typeof nestedDefs !== "object") return;
  for (const [key, value] of Object.entries(nestedDefs)) {
    if (sectionSet.has(key)) continue;
    if (value && typeof value === "object") {
      definitions[key] = value as PageBuilderDefinitionBlock;
    }
  }
}
