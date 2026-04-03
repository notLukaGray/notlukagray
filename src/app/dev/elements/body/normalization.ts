import { OVERFLOW_OPTIONS } from "@/app/dev/elements/_shared/dev-controls/foundation-constants";
import { typographyVariantForThemeExport } from "@/app/dev/elements/_shared/typography-export-block";
import { normalizePbImageAnimationDefaults } from "@/app/dev/elements/image/normalization";
import { BASE_DEFAULTS, STORAGE_KEY, VARIANT_ORDER } from "./constants";
import type { BodyVariantDefaults, PersistedBodyDefaults } from "./types";
import { clampNumber } from "../image/utils";

export function normalizeBodyVariant(
  seed: BodyVariantDefaults,
  incoming?: Partial<BodyVariantDefaults>
): BodyVariantDefaults {
  if (!incoming || typeof incoming !== "object") return seed;
  return {
    ...seed,
    ...incoming,
    text: typeof incoming.text === "string" ? incoming.text : seed.text,
    wordWrap: typeof incoming.wordWrap === "boolean" ? incoming.wordWrap : seed.wordWrap,
    opacity:
      typeof incoming.opacity === "number" && Number.isFinite(incoming.opacity)
        ? clampNumber(incoming.opacity, 0, 1)
        : seed.opacity,
    zIndex:
      typeof incoming.zIndex === "number" && Number.isFinite(incoming.zIndex)
        ? incoming.zIndex
        : seed.zIndex,
    overflow:
      incoming.overflow && OVERFLOW_OPTIONS.includes(incoming.overflow)
        ? incoming.overflow
        : seed.overflow,
    animation: normalizePbImageAnimationDefaults(seed.animation, incoming?.animation),
  };
}

export function readPersistedBody(): PersistedBodyDefaults | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const data = JSON.parse(raw) as PersistedBodyDefaults;
    if (!data?.variants || typeof data.defaultVariant !== "string") return null;
    const variants = { ...BASE_DEFAULTS.variants };
    for (const key of VARIANT_ORDER) {
      variants[key] = normalizeBodyVariant(BASE_DEFAULTS.variants[key], data.variants?.[key]);
    }
    return {
      v: 1,
      defaultVariant: VARIANT_ORDER.includes(data.defaultVariant)
        ? data.defaultVariant
        : BASE_DEFAULTS.defaultVariant,
      variants,
    };
  } catch {
    return null;
  }
}

export function toBodyExportJson(data: PersistedBodyDefaults): string {
  const variants = Object.fromEntries(
    Object.entries(data.variants).map(([key, v]) => [
      key,
      typographyVariantForThemeExport(v as Record<string, unknown>),
    ])
  );
  return JSON.stringify({ body: { defaultVariant: data.defaultVariant, variants } }, null, 2);
}
