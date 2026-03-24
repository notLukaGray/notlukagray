/**
 * Barrel — re-exports all page-builder schema types.
 * No logic lives here.
 */

export type {
  ResponsiveString,
  ResponsiveNumber,
  LayoutProps,
  ImageCrop,
  ImageFilters,
  CursorType,
  ElementInteractions,
  ElementCondition,
  ElementVisibleWhen,
  TriggerAction,
} from "./page-builder-primitives";

export type {
  ElementType,
  ElementHeading,
  ElementBody,
  ElementLink,
  ElementImage,
  ElementVideo,
  ElementRichText,
  ElementSVG,
  ElementButton,
  ElementSpacer,
  ElementBlock,
} from "./page-builder-element";

export type {
  SectionType,
  BaseSectionProps,
  ContentBlock,
  SectionColumnBlock,
  SectionBlock,
  BgBlock,
  PageBuilderPage,
  ContentBlockProps,
} from "./page-builder-section";

export type { TypographyOverrides } from "./page-builder-typography";
