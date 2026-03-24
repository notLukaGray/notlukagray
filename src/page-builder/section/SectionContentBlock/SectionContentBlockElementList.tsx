import type {
  ElementBlock,
  SectionDefinitionBlock,
} from "@/page-builder/core/page-builder-schemas";
import { generateElementKey } from "@/page-builder/core/element-keys";
import { ElementErrorBoundary } from "@/page-builder/SectionErrorBoundary";
import { ElementRenderer } from "@/page-builder/elements/Shared/ElementRenderer";
import { SectionDefinitionsContext } from "@/page-builder/elements/ElementModule/ModuleSlotContext";

type Props = {
  elements: ElementBlock[];
  sectionDefinitions?: Record<string, SectionDefinitionBlock>;
};

export function SectionContentBlockElementList({ elements, sectionDefinitions }: Props) {
  return (
    <SectionDefinitionsContext.Provider value={sectionDefinitions ?? null}>
      {elements.map((block, i) => {
        const key = generateElementKey(block, i);
        return (
          <ElementErrorBoundary key={key} elementKey={key}>
            <ElementRenderer block={block} />
          </ElementErrorBoundary>
        );
      })}
    </SectionDefinitionsContext.Provider>
  );
}
