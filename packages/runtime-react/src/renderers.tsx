"use client";

import { createElement, type ReactElement } from "react";
import type { ElementBlock, SectionBlock } from "@pb/contracts";
import { SECTION_COMPONENTS } from "./page-builder/section";
import { ElementRenderer as InternalElementRenderer } from "./page-builder/elements/Shared/ElementRenderer";
import { PageBuilderRenderer } from "./page-builder/hooks";

export type SectionRendererProps = {
  section: SectionBlock;
  isFirstSection?: boolean;
};

export type ElementRendererProps = {
  block: ElementBlock;
  exitPresenceShow?: boolean;
  exitPresenceKey?: string;
  onExitComplete?: () => void;
  exitPresenceMode?: "sync" | "wait" | "popLayout";
  forceEntranceAnimation?: boolean;
};

export { PageBuilderRenderer };

export function SectionRenderer({
  section,
  isFirstSection,
}: SectionRendererProps): ReactElement | null {
  const SectionComponent = SECTION_COMPONENTS[section.type];
  if (!SectionComponent) return null;
  return createElement(SectionComponent, { ...section, _isFirstSection: isFirstSection });
}

export function ElementRenderer(props: ElementRendererProps): ReactElement {
  return createElement(InternalElementRenderer, props);
}
