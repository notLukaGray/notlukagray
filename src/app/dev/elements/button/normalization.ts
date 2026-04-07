import {
  normalizeTypographyVariants,
  pickBoolean,
  pickFiniteNumber,
  pickOverflowValue,
  pickString,
  pickUnitOpacity,
  resolveTypographyDefaultVariant,
} from "@/app/dev/elements/_shared/typography-normalization-helpers";
import { typographyVariantForThemeExport } from "@/app/dev/elements/_shared/typography-export-block";
import { normalizePbImageAnimationDefaults } from "@/app/dev/elements/image/normalization";
import { parseButtonAction } from "@/page-builder/core/page-builder-schemas/element-button-schemas";
import { BASE_DEFAULTS, STORAGE_KEY, VARIANT_ORDER } from "./constants";
import type { ButtonVariantDefaults, ButtonVariantKey, PersistedButtonDefaults } from "./types";

function pickCopyType(
  incoming: unknown,
  fallback: ButtonVariantDefaults["copyType"]
): ButtonVariantDefaults["copyType"] {
  return incoming === "heading" || incoming === "body" ? incoming : fallback;
}

function pickButtonLevel(
  incoming: unknown,
  fallback: ButtonVariantDefaults["level"]
): ButtonVariantDefaults["level"] {
  if (typeof incoming === "number" && incoming >= 1 && incoming <= 6) {
    return incoming as ButtonVariantDefaults["level"];
  }
  return fallback;
}

export function normalizeButtonVariant(
  seed: ButtonVariantDefaults,
  incoming?: Partial<ButtonVariantDefaults>
): ButtonVariantDefaults {
  if (!incoming || typeof incoming !== "object") return seed;
  return {
    ...seed,
    ...incoming,
    label: pickString(incoming.label, seed.label),
    href: pickString(incoming.href, seed.href),
    copyType: pickCopyType(incoming.copyType, seed.copyType),
    level: pickButtonLevel(incoming.level, seed.level),
    external: pickBoolean(incoming.external, seed.external),
    disabled: pickBoolean(incoming.disabled, seed.disabled),
    wordWrap: pickBoolean(incoming.wordWrap, seed.wordWrap),
    action: parseButtonAction(
      pickString(incoming.action, seed.action)
    ) as ButtonVariantDefaults["action"],
    actionPayload: incoming.actionPayload ?? seed.actionPayload,
    wrapperFill: pickString(incoming.wrapperFill, seed.wrapperFill),
    wrapperStroke: pickString(incoming.wrapperStroke, seed.wrapperStroke),
    wrapperPadding: pickString(incoming.wrapperPadding, seed.wrapperPadding),
    wrapperBorderRadius: pickString(incoming.wrapperBorderRadius, seed.wrapperBorderRadius),
    opacity: pickUnitOpacity(incoming.opacity, seed.opacity),
    zIndex: pickFiniteNumber(incoming.zIndex, seed.zIndex),
    overflow: pickOverflowValue(incoming.overflow, seed.overflow),
    animation: normalizePbImageAnimationDefaults(seed.animation, incoming?.animation),
  };
}

export function readPersistedButton(): PersistedButtonDefaults | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const d = JSON.parse(raw) as Record<string, unknown>;
    if (!d.defaultVariant || !d.variants) return null;
    return {
      v: 1,
      defaultVariant: resolveTypographyDefaultVariant(
        VARIANT_ORDER,
        d.defaultVariant as string,
        BASE_DEFAULTS.defaultVariant
      ) as ButtonVariantKey,
      variants: normalizeTypographyVariants(
        VARIANT_ORDER,
        BASE_DEFAULTS.variants,
        d.variants as Record<string, unknown>,
        normalizeButtonVariant
      ),
    };
  } catch {
    return null;
  }
}

export function toButtonExportJson(data: PersistedButtonDefaults): string {
  const variants = Object.fromEntries(
    Object.entries(data.variants).map(([key, v]) => [
      key,
      typographyVariantForThemeExport(v as Record<string, unknown>),
    ])
  );
  return JSON.stringify({ button: { defaultVariant: data.defaultVariant, variants } }, null, 2);
}

export function toButtonPersisted(
  defaultVariant: ButtonVariantKey,
  variants: Record<ButtonVariantKey, ButtonVariantDefaults>
): PersistedButtonDefaults {
  return { v: 1, defaultVariant, variants };
}
