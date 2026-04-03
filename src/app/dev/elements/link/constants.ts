import { pbBuilderDefaultsV1, type PbLinkVariantKey } from "@/app/theme/pb-builder-defaults";
import { addTypographyAnimationToVariants } from "@/app/dev/elements/_shared/typography-animation-seed";
import type { LinkVariantDefaults, LinkVariantKey } from "./types";

export const STORAGE_KEY = "pb-element-link-dev-v1";

export const VARIANT_ORDER: LinkVariantKey[] = ["inline", "emphasis", "nav"];

export const VARIANT_LABELS: Record<LinkVariantKey, string> = {
  inline: "Inline",
  emphasis: "Emphasis",
  nav: "Nav",
};

/** Presets mirror `pbBuilderDefaultsV1.elements.link` plus the same animation lab model as image dev. */
export const BASE_DEFAULTS: {
  defaultVariant: LinkVariantKey;
  variants: Record<LinkVariantKey, LinkVariantDefaults>;
} = {
  defaultVariant: pbBuilderDefaultsV1.elements.link.defaultVariant as PbLinkVariantKey,
  variants: addTypographyAnimationToVariants(pbBuilderDefaultsV1.elements.link.variants),
};
