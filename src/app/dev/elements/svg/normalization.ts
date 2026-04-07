import {
  normalizeTypographyVariants,
  pickString,
  pickUnitOpacity,
  resolveTypographyDefaultVariant,
} from "@/app/dev/elements/_shared/typography-normalization-helpers";
import { normalizePbImageAnimationDefaults } from "@/app/dev/elements/image/normalization";
import { BASE_DEFAULTS, DEFAULT_MARKUP, STORAGE_KEY, VARIANT_ORDER } from "./constants";
import type { PersistedSvgDefaults, SvgVariantDefaults } from "./types";

export function normalizeSvgVariant(
  seed: SvgVariantDefaults,
  incoming?: Partial<SvgVariantDefaults>
): SvgVariantDefaults {
  if (!incoming || typeof incoming !== "object") return seed;
  return {
    ...seed,
    ...incoming,
    markup: pickString(incoming.markup, seed.markup ?? DEFAULT_MARKUP),
    opacity: pickUnitOpacity(incoming.opacity, seed.opacity),
    animation: normalizePbImageAnimationDefaults(seed.animation, incoming?.animation),
  };
}

export function readPersistedSvg(): PersistedSvgDefaults | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const d = JSON.parse(raw) as Record<string, unknown>;
    if (!d.defaultVariant || !d.variants) return null;
    return {
      v: 1 as const,
      defaultVariant: resolveTypographyDefaultVariant(
        VARIANT_ORDER,
        d.defaultVariant as string,
        BASE_DEFAULTS.defaultVariant
      ),
      variants: normalizeTypographyVariants(
        VARIANT_ORDER,
        BASE_DEFAULTS.variants,
        d.variants as Record<string, unknown>,
        normalizeSvgVariant
      ),
    };
  } catch {
    return null;
  }
}

export function toSvgExportJson(data: PersistedSvgDefaults): string {
  return JSON.stringify(
    { svg: { defaultVariant: data.defaultVariant, variants: data.variants } },
    null,
    2
  );
}
