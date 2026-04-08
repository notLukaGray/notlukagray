import {
  normalizeTypographyVariants,
  pickUnitOpacity,
  resolveTypographyDefaultVariant,
} from "@/app/dev/elements/_shared/typography-normalization-helpers";
import { normalizePbImageAnimationDefaults } from "@/app/dev/elements/image/normalization";
import { BASE_DEFAULTS, STORAGE_KEY, VARIANT_ORDER } from "./constants";
import type { PersistedVectorDefaults, VectorVariantDefaults } from "./types";

export function normalizeVectorVariant(
  seed: VectorVariantDefaults,
  incoming?: Partial<VectorVariantDefaults>
): VectorVariantDefaults {
  if (!incoming || typeof incoming !== "object") return seed;
  return {
    ...seed,
    ...incoming,
    shapes: (incoming.shapes ?? seed.shapes) as VectorVariantDefaults["shapes"],
    opacity: pickUnitOpacity(incoming.opacity, seed.opacity),
    animation: normalizePbImageAnimationDefaults(seed.animation, incoming?.animation),
  };
}

export function readPersistedVector(): PersistedVectorDefaults | null {
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
        normalizeVectorVariant
      ),
    };
  } catch {
    return null;
  }
}

export function toVectorExportJson(data: PersistedVectorDefaults): string {
  return JSON.stringify(
    { vector: { defaultVariant: data.defaultVariant, variants: data.variants } },
    null,
    2
  );
}
