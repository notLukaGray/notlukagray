import { pbBuilderDefaultsV1, type PbHeadingVariantKey } from "@/app/theme/pb-builder-defaults";
import { addTypographyAnimationToVariants } from "@/app/dev/elements/_shared/typography-animation-seed";
import type { HeadingVariantDefaults, HeadingVariantKey } from "./types";

export const STORAGE_KEY = "pb-element-heading-dev-v1";

export const VARIANT_ORDER: HeadingVariantKey[] = ["display", "section", "label"];

export const VARIANT_LABELS: Record<HeadingVariantKey, string> = {
  display: "Display",
  section: "Section",
  label: "Label",
};

/** Presets mirror `pbBuilderDefaultsV1.elements.heading` plus the same animation lab model as image dev. */
export const BASE_DEFAULTS: {
  defaultVariant: HeadingVariantKey;
  variants: Record<HeadingVariantKey, HeadingVariantDefaults>;
} = {
  defaultVariant: pbBuilderDefaultsV1.elements.heading.defaultVariant as PbHeadingVariantKey,
  variants: addTypographyAnimationToVariants(pbBuilderDefaultsV1.elements.heading.variants),
};
