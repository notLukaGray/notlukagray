import type {
  ElementBlock,
  PageBuilderDefinitionBlock,
  SectionBlock,
} from "@/page-builder/core/page-builder-schemas";

export type SectionWithElements = SectionBlock & {
  elementOrder?: string[] | { mobile?: string[]; desktop?: string[] };
  elements?: string[] | ElementBlock[];
  columnAssignments?: unknown;
  columnSpan?: Record<string, unknown>;
  itemStyles?: Record<string, unknown>;
  itemLayout?: Record<string, unknown>;
};

export type DefinitionsMap = Record<string, PageBuilderDefinitionBlock>;
