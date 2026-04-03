import { OVERFLOW_OPTIONS } from "@/app/dev/elements/_shared/dev-controls/foundation-constants";
import { typographyVariantForThemeExport } from "@/app/dev/elements/_shared/typography-export-block";
import { normalizePbImageAnimationDefaults } from "@/app/dev/elements/image/normalization";
import { BASE_DEFAULTS, STORAGE_KEY, VARIANT_ORDER } from "./constants";
import type { HeadingVariantDefaults, PersistedHeadingDefaults } from "./types";
import { clampNumber } from "../image/utils";

export function normalizeHeadingVariant(
  seed: HeadingVariantDefaults,
  incoming?: Partial<HeadingVariantDefaults>
): HeadingVariantDefaults {
  if (!incoming || typeof incoming !== "object") return seed;
  const level =
    typeof incoming.level === "number" && incoming.level >= 1 && incoming.level <= 6
      ? incoming.level
      : seed.level;
  const semanticLevel =
    incoming.semanticLevel != null &&
    typeof incoming.semanticLevel === "number" &&
    incoming.semanticLevel >= 1 &&
    incoming.semanticLevel <= 6
      ? incoming.semanticLevel
      : seed.semanticLevel;
  return {
    ...seed,
    ...incoming,
    level,
    text: typeof incoming.text === "string" ? incoming.text : seed.text,
    semanticLevel,
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

export function readPersistedHeading(): PersistedHeadingDefaults | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const data = JSON.parse(raw) as PersistedHeadingDefaults;
    if (!data?.variants || typeof data.defaultVariant !== "string") return null;
    const variants = { ...BASE_DEFAULTS.variants };
    for (const key of VARIANT_ORDER) {
      variants[key] = normalizeHeadingVariant(BASE_DEFAULTS.variants[key], data.variants?.[key]);
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

export function toHeadingExportJson(data: PersistedHeadingDefaults): string {
  const variants = Object.fromEntries(
    Object.entries(data.variants).map(([key, v]) => [
      key,
      typographyVariantForThemeExport(v as Record<string, unknown>),
    ])
  );
  return JSON.stringify({ heading: { defaultVariant: data.defaultVariant, variants } }, null, 2);
}
