import type { ComponentType } from "react";
import type { SectionBlock } from "@/page-builder/core/page-builder-schemas";
import { SectionDivider } from "./SectionDivider";
import { SectionContentBlock } from "./SectionContentBlock";
import { ScrollContainerSection } from "./ScrollContainerSection";
import { PageTrigger, PAGE_BUILDER_TRIGGER_EVENT } from "@/page-builder/triggers";
import { SectionColumn } from "./SectionColumn";
import { SectionFormBlock } from "./SectionFormBlock/SectionFormBlock";
import { SectionReveal } from "./SectionReveal";

export {
  SectionDivider,
  SectionContentBlock,
  ScrollContainerSection,
  SectionColumn,
  SectionFormBlock,
  SectionReveal,
  PageTrigger,
  PAGE_BUILDER_TRIGGER_EVENT,
};
export type { PageBuilderTriggerDetail } from "@/page-builder/triggers";
export { useSectionViewportTrigger } from "@/page-builder/triggers/core/use-section-viewport-trigger";
export type { SectionViewportTriggerOptions } from "@/page-builder/triggers/core/use-section-viewport-trigger";

type SectionComponentProps = SectionBlock & { _isFirstSection?: boolean };

export const SECTION_COMPONENTS: Record<string, ComponentType<SectionComponentProps>> = {
  divider: SectionDivider as ComponentType<SectionComponentProps>,
  contentBlock: SectionContentBlock as ComponentType<SectionComponentProps>,
  scrollContainer: ScrollContainerSection as ComponentType<SectionComponentProps>,
  sectionColumn: SectionColumn as ComponentType<SectionComponentProps>,
  sectionTrigger: PageTrigger as ComponentType<SectionComponentProps>,
  formBlock: SectionFormBlock as ComponentType<SectionComponentProps>,
  revealSection: SectionReveal as ComponentType<SectionComponentProps>,
};
