/**
 * Single typography mapping: level/variant in JSON → CSS class. Used by ElementBody,
 * ElementRichText, ElementHeading, ElementLink, ElementButton, ElementVideoTime, and
 * form fields. Revise typography in two places only: globals.css (styles) and this module (level → class).
 */
import type { ElementBodyVariant } from "./page-builder-schemas";

export type HeadingLevel = 1 | 2 | 3 | 4 | 5 | 6;

export const BODY_TYPOGRAPHY_CLASS_BY_LEVEL: Record<ElementBodyVariant, string> = {
  1: "typography-body-large-regular",
  2: "typography-body-large-thin",
  3: "typography-body-medium-regular",
  4: "typography-body-medium-thin",
  5: "typography-body-legal-book",
  6: "typography-body-legal-light",
};

export const HEADING_TYPOGRAPHY_CLASS_BY_LEVEL: Record<HeadingLevel, string> = {
  1: "typography-heading-primary-bold",
  2: "typography-heading-secondary-bold",
  3: "typography-heading-tertiary-bold",
  4: "typography-heading-tertiary-light",
  5: "typography-heading-card-bold",
  6: "typography-heading-card-bold",
};

export const DEFAULT_BODY_LEVEL: ElementBodyVariant = 3;

export function getBodyTypographyClass(level: ElementBodyVariant | undefined): string {
  const resolved = level ?? DEFAULT_BODY_LEVEL;
  return BODY_TYPOGRAPHY_CLASS_BY_LEVEL[resolved];
}

export function getHeadingTypographyClass(level: HeadingLevel | undefined): string {
  const resolved = level ?? 1;
  return HEADING_TYPOGRAPHY_CLASS_BY_LEVEL[resolved];
}
