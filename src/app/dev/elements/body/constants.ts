import { pbBuilderDefaultsV1, type PbBodyVariantKey } from "@/app/theme/pb-builder-defaults";
import { addTypographyAnimationToVariants } from "@/app/dev/elements/_shared/typography-animation-seed";
import type { BodyVariantDefaults, BodyVariantKey } from "./types";

export const STORAGE_KEY = "pb-element-body-dev-v1";

export const VARIANT_ORDER: BodyVariantKey[] = ["lead", "standard", "fine"];

export const VARIANT_LABELS: Record<BodyVariantKey, string> = {
  lead: "Lead",
  standard: "Standard",
  fine: "Fine",
};

/** Presets mirror `pbBuilderDefaultsV1.elements.body` plus the same animation lab model as image dev. */
export const BASE_DEFAULTS: {
  defaultVariant: BodyVariantKey;
  variants: Record<BodyVariantKey, BodyVariantDefaults>;
} = {
  defaultVariant: pbBuilderDefaultsV1.elements.body.defaultVariant as PbBodyVariantKey,
  variants: addTypographyAnimationToVariants(pbBuilderDefaultsV1.elements.body.variants),
};
