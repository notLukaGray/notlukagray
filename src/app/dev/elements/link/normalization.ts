import { OVERFLOW_OPTIONS } from "@/app/dev/elements/_shared/dev-controls/foundation-constants";
import { typographyVariantForThemeExport } from "@/app/dev/elements/_shared/typography-export-block";
import { normalizePbImageAnimationDefaults } from "@/app/dev/elements/image/normalization";
import { BASE_DEFAULTS, STORAGE_KEY, VARIANT_ORDER } from "./constants";
import type { LinkVariantDefaults, PersistedLinkDefaults } from "./types";
import { clampNumber } from "../image/utils";

export function normalizeLinkVariant(
  seed: LinkVariantDefaults,
  incoming?: Partial<LinkVariantDefaults>
): LinkVariantDefaults {
  if (!incoming || typeof incoming !== "object") return seed;
  const copyType =
    incoming.copyType === "heading" || incoming.copyType === "body"
      ? incoming.copyType
      : seed.copyType;
  return {
    ...seed,
    ...incoming,
    label: typeof incoming.label === "string" ? incoming.label : seed.label,
    href: typeof incoming.href === "string" ? incoming.href : seed.href,
    copyType,
    external: typeof incoming.external === "boolean" ? incoming.external : seed.external,
    disabled: typeof incoming.disabled === "boolean" ? incoming.disabled : seed.disabled,
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

export function readPersistedLink(): PersistedLinkDefaults | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const data = JSON.parse(raw) as PersistedLinkDefaults;
    if (!data?.variants || typeof data.defaultVariant !== "string") return null;
    const variants = { ...BASE_DEFAULTS.variants };
    for (const key of VARIANT_ORDER) {
      variants[key] = normalizeLinkVariant(BASE_DEFAULTS.variants[key], data.variants?.[key]);
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

export function toLinkExportJson(data: PersistedLinkDefaults): string {
  const variants = Object.fromEntries(
    Object.entries(data.variants).map(([key, v]) => [
      key,
      typographyVariantForThemeExport(v as Record<string, unknown>),
    ])
  );
  return JSON.stringify({ link: { defaultVariant: data.defaultVariant, variants } }, null, 2);
}
