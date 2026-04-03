/**
 * Type scale configuration.
 *
 * Six **heading** steps and six **body** steps from **extra small** through **double
 * extra large** (XS → 2XL). Size, line-height, letter-spacing, and **weight role** are
 * independent per step — tokens are a ladder only, not a fixed HTML outline slot.
 *
 * Values drive CSS custom properties injected in the layout; globals.css references
 * vars only. To change the scale: edit the numbers here. To preview: /dev/fonts.
 */

import type { FontWeightRole } from "./config";

export type TypeScaleEntry = {
  /** Desktop font size in px (applied at ≥768px). */
  sizeDesktop: number;
  /** Mobile font size in px (applied below 768px). */
  sizeMobile: number;
  /** Desktop line height in px. */
  lineHeightDesktop: number;
  /** Mobile line height in px. */
  lineHeightMobile: number;
  /** Letter spacing as a CSS value (e.g. "0", "0.02em", "-0.01em"). */
  letterSpacing: string;
  /**
   * Which named weight from `primaryFontConfig.weights` this style uses.
   * Injected as `--type-{...}-fw: var(--font-weight-{name})` so it tracks the font config.
   */
  fontWeightRole: FontWeightRole;
};

export type TypeScaleConfig = {
  // ── Headings (XS → 2XL, smallest → largest) ───────────────────────────────
  headingXs: TypeScaleEntry;
  headingSm: TypeScaleEntry;
  headingMd: TypeScaleEntry;
  headingLg: TypeScaleEntry;
  headingXl: TypeScaleEntry;
  heading2xl: TypeScaleEntry;

  // ── Body (XS → 2XL, smallest → largest) ───────────────────────────────────
  bodyXs: TypeScaleEntry;
  bodySm: TypeScaleEntry;
  bodyMd: TypeScaleEntry;
  bodyLg: TypeScaleEntry;
  bodyXl: TypeScaleEntry;
  body2xl: TypeScaleEntry;
};

export const typeScaleConfig: TypeScaleConfig = {
  headingXs: {
    sizeDesktop: 24,
    sizeMobile: 16,
    lineHeightDesktop: 28,
    lineHeightMobile: 20,
    letterSpacing: "0",
    fontWeightRole: "light",
  },
  headingSm: {
    sizeDesktop: 30,
    sizeMobile: 20,
    lineHeightDesktop: 33,
    lineHeightMobile: 22,
    letterSpacing: "0",
    fontWeightRole: "bold",
  },
  headingMd: {
    sizeDesktop: 32,
    sizeMobile: 22,
    lineHeightDesktop: 36,
    lineHeightMobile: 26,
    letterSpacing: "0",
    fontWeightRole: "light",
  },
  headingLg: {
    sizeDesktop: 40,
    sizeMobile: 26,
    lineHeightDesktop: 44,
    lineHeightMobile: 29,
    letterSpacing: "0",
    fontWeightRole: "bold",
  },
  headingXl: {
    sizeDesktop: 50,
    sizeMobile: 30,
    lineHeightDesktop: 55,
    lineHeightMobile: 33,
    letterSpacing: "0",
    fontWeightRole: "bold",
  },
  heading2xl: {
    sizeDesktop: 76,
    sizeMobile: 44,
    lineHeightDesktop: 84,
    lineHeightMobile: 48,
    letterSpacing: "0",
    fontWeightRole: "bold",
  },
  bodyXs: {
    sizeDesktop: 12,
    sizeMobile: 8,
    lineHeightDesktop: 18,
    lineHeightMobile: 12,
    letterSpacing: "0",
    fontWeightRole: "light",
  },
  bodySm: {
    sizeDesktop: 12,
    sizeMobile: 8,
    lineHeightDesktop: 18,
    lineHeightMobile: 12,
    letterSpacing: "0",
    fontWeightRole: "book",
  },
  bodyMd: {
    sizeDesktop: 22,
    sizeMobile: 12,
    lineHeightDesktop: 33,
    lineHeightMobile: 18,
    letterSpacing: "0",
    fontWeightRole: "thin",
  },
  bodyLg: {
    sizeDesktop: 22,
    sizeMobile: 12,
    lineHeightDesktop: 33,
    lineHeightMobile: 18,
    letterSpacing: "0",
    fontWeightRole: "book",
  },
  bodyXl: {
    sizeDesktop: 26,
    sizeMobile: 18,
    lineHeightDesktop: 39,
    lineHeightMobile: 28,
    letterSpacing: "0",
    fontWeightRole: "thin",
  },
  body2xl: {
    sizeDesktop: 26,
    sizeMobile: 18,
    lineHeightDesktop: 39,
    lineHeightMobile: 28,
    letterSpacing: "0",
    fontWeightRole: "book",
  },
};

/** Maps each config key to its CSS var prefix. */
export const TYPE_SCALE_VAR_PREFIXES: Record<keyof TypeScaleConfig, string> = {
  headingXs: "--type-heading-xs",
  headingSm: "--type-heading-sm",
  headingMd: "--type-heading-md",
  headingLg: "--type-heading-lg",
  headingXl: "--type-heading-xl",
  heading2xl: "--type-heading-2xl",
  bodyXs: "--type-body-xs",
  bodySm: "--type-body-sm",
  bodyMd: "--type-body-md",
  bodyLg: "--type-body-lg",
  bodyXl: "--type-body-xl",
  body2xl: "--type-body-2xl",
};

/** Display labels for the dev tool and UI (full written names). */
export const TYPE_SCALE_LABELS: Record<keyof TypeScaleConfig, string> = {
  headingXs: "Heading Extra Small",
  headingSm: "Heading Small",
  headingMd: "Heading Medium",
  headingLg: "Heading Large",
  headingXl: "Heading Extra Large",
  heading2xl: "Heading Double Extra Large",
  bodyXs: "Body Extra Small",
  bodySm: "Body Small",
  bodyMd: "Body Medium",
  bodyLg: "Body Large",
  bodyXl: "Body Extra Large",
  body2xl: "Body Double Extra Large",
};

/** Compact tier token (specs, dropdowns). */
export const TYPE_SCALE_SHORT_TAG: Record<keyof TypeScaleConfig, string> = {
  headingXs: "XS",
  headingSm: "SM",
  headingMd: "MD",
  headingLg: "LG",
  headingXl: "XL",
  heading2xl: "2XL",
  bodyXs: "XS",
  bodySm: "SM",
  bodyMd: "MD",
  bodyLg: "LG",
  bodyXl: "XL",
  body2xl: "2XL",
};

/** CSS utility class per scale entry (see `globals.css`). */
export const TYPE_SCALE_UTILITY_CLASS: Record<keyof TypeScaleConfig, string> = {
  headingXs: "typography-heading-xs",
  headingSm: "typography-heading-sm",
  headingMd: "typography-heading-md",
  headingLg: "typography-heading-lg",
  headingXl: "typography-heading-xl",
  heading2xl: "typography-heading-2xl",
  bodyXs: "typography-body-xs",
  bodySm: "typography-body-sm",
  bodyMd: "typography-body-md",
  bodyLg: "typography-body-lg",
  bodyXl: "typography-body-xl",
  body2xl: "typography-body-2xl",
};

/**
 * Oldest persisted keys (primary / legal / …) → current `TypeScaleConfig` keys
 * (XS–2XL semantics).
 */
export const TYPE_SCALE_LEGACY_KEYS: Record<string, keyof TypeScaleConfig> = {
  headingPrimary: "heading2xl",
  headingSecondary: "headingXl",
  headingTertiaryBold: "headingLg",
  headingTertiaryLight: "headingMd",
  headingCardBold: "headingSm",
  headingCardLight: "headingXs",
  bodyLargeRegular: "body2xl",
  bodyLargeThin: "bodyXl",
  bodyMediumRegular: "bodyLg",
  bodyMediumThin: "bodyMd",
  bodyLegalBook: "bodySm",
  bodyLegalLight: "bodyXs",
};

/**
 * Next-most-recent save used the same string names as today but with **XL = largest**
 * and **2XS = smallest**. If JSON still has `heading2xs` / `body2xs`, move each blob
 * to the matching XS–2XL key before merging.
 */
export const TYPE_SCALE_PREVIOUS_TSHIRT_SLOT_MAP: Record<string, keyof TypeScaleConfig> = {
  headingXl: "heading2xl",
  headingLg: "headingXl",
  headingMd: "headingLg",
  headingSm: "headingMd",
  headingXs: "headingSm",
  heading2xs: "headingXs",
  bodyXl: "body2xl",
  bodyLg: "bodyXl",
  bodyMd: "bodyLg",
  bodySm: "bodyMd",
  bodyXs: "bodySm",
  body2xs: "bodyXs",
};
