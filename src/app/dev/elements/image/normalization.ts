import type {
  PbImageAnimationCurve,
  PbImageConstraintValues,
  PbImageAnimationDefaults,
  PbImageEntranceFineTune,
  PbImageExitFineTune,
  PbResponsiveImageConstraints,
  PbResponsiveValue,
  PbImageVariantDefaults,
} from "@/app/theme/pb-builder-defaults";
import {
  ALIGN_OPTIONS,
  ALIGN_Y_OPTIONS,
  BASE_DEFAULTS,
  CURVE_PRESET_OPTIONS,
  HYBRID_STACK_OPTIONS,
  OBJECT_FIT_OPTIONS,
  OVERFLOW_OPTIONS,
  STORAGE_KEY,
  VARIANT_ORDER,
} from "./constants";
import type {
  PersistedImageDefaults,
  PersistedImageDefaultsLegacyV1,
  PersistedImageDefaultsLegacyV2,
} from "./types";
import { clampNumber } from "./utils";
import { DIRECTION_OPTIONS } from "./constants";

function normalizeBezierTuple(
  value: unknown,
  fallback: [number, number, number, number]
): [number, number, number, number] {
  if (!Array.isArray(value) || value.length !== 4) return fallback;
  return value.map((entry, index) => {
    const parsed = Number(entry);
    return Number.isFinite(parsed) ? parsed : fallback[index];
  }) as [number, number, number, number];
}

function normalizeCurve(
  seed: PbImageAnimationCurve,
  incoming?: Partial<PbImageAnimationCurve>
): PbImageAnimationCurve {
  return {
    preset:
      incoming?.preset && CURVE_PRESET_OPTIONS.includes(incoming.preset)
        ? incoming.preset
        : seed.preset,
    customBezier: normalizeBezierTuple(incoming?.customBezier, seed.customBezier),
  };
}

function normalizeResponsivePair<T>(
  incoming: unknown,
  isValid: (value: unknown) => value is T
): [T, T] | undefined {
  if (!Array.isArray(incoming) || incoming.length !== 2) return undefined;
  if (!isValid(incoming[0]) || !isValid(incoming[1])) return undefined;
  return [incoming[0], incoming[1]];
}

function normalizeResponsiveValue<T>(
  seed: PbResponsiveValue<T> | undefined,
  incoming: unknown,
  isValid: (value: unknown) => value is T
): PbResponsiveValue<T> | undefined {
  const tuple = normalizeResponsivePair(incoming, isValid);
  if (tuple) return tuple;
  if (isValid(incoming)) return incoming;
  return seed;
}

function isConstraintObject(value: unknown): value is PbImageConstraintValues {
  if (!value || typeof value !== "object" || Array.isArray(value)) return false;
  const rec = value as Record<string, unknown>;
  const validValue = (entry: unknown) => entry == null || typeof entry === "string";
  return (
    validValue(rec.minWidth) &&
    validValue(rec.maxWidth) &&
    validValue(rec.minHeight) &&
    validValue(rec.maxHeight)
  );
}

function normalizeConstraints(
  seed: PbResponsiveImageConstraints | undefined,
  incoming: unknown
): PbResponsiveImageConstraints | undefined {
  const tuple = normalizeResponsivePair(
    incoming,
    (entry): entry is PbImageConstraintValues | undefined =>
      entry === undefined || isConstraintObject(entry)
  );
  if (tuple) return tuple;
  if (incoming === undefined || isConstraintObject(incoming))
    return incoming as PbImageConstraintValues | undefined;
  return seed;
}

function normalizeEntranceFineTune(
  seed: PbImageEntranceFineTune,
  incoming?: Partial<PbImageEntranceFineTune>
): PbImageEntranceFineTune {
  return {
    direction:
      incoming?.direction && DIRECTION_OPTIONS.includes(incoming.direction)
        ? incoming.direction
        : seed.direction,
    distancePx: Math.max(0, Number(incoming?.distancePx ?? seed.distancePx)),
    fromOpacity: clampNumber(Number(incoming?.fromOpacity ?? seed.fromOpacity), 0, 1),
    toOpacity: clampNumber(Number(incoming?.toOpacity ?? seed.toOpacity), 0, 1),
    fromX: Number(incoming?.fromX ?? seed.fromX),
    toX: Number(incoming?.toX ?? seed.toX),
    fromY: Number(incoming?.fromY ?? seed.fromY),
    toY: Number(incoming?.toY ?? seed.toY),
    fromScale: Math.max(0, Number(incoming?.fromScale ?? seed.fromScale)),
    toScale: Math.max(0, Number(incoming?.toScale ?? seed.toScale)),
    fromRotate: Number(incoming?.fromRotate ?? seed.fromRotate),
    toRotate: Number(incoming?.toRotate ?? seed.toRotate),
    duration: Math.max(0, Number(incoming?.duration ?? seed.duration)),
    delay: Math.max(0, Number(incoming?.delay ?? seed.delay)),
    curve: normalizeCurve(seed.curve, incoming?.curve),
  };
}

function normalizeExitFineTune(
  seed: PbImageExitFineTune,
  incoming?: Partial<PbImageExitFineTune>
): PbImageExitFineTune {
  return {
    direction:
      incoming?.direction && DIRECTION_OPTIONS.includes(incoming.direction)
        ? incoming.direction
        : seed.direction,
    distancePx: Math.max(0, Number(incoming?.distancePx ?? seed.distancePx)),
    toOpacity: clampNumber(Number(incoming?.toOpacity ?? seed.toOpacity), 0, 1),
    toX: Number(incoming?.toX ?? seed.toX),
    toY: Number(incoming?.toY ?? seed.toY),
    toScale: Math.max(0, Number(incoming?.toScale ?? seed.toScale)),
    toRotate: Number(incoming?.toRotate ?? seed.toRotate),
    duration: Math.max(0, Number(incoming?.duration ?? seed.duration)),
    delay: Math.max(0, Number(incoming?.delay ?? seed.delay)),
    curve: normalizeCurve(seed.curve, incoming?.curve),
  };
}

/** Exported for typography dev tools (heading / body / link) that reuse the same animation lab model as image. */
export function normalizePbImageAnimationDefaults(
  seed: PbImageAnimationDefaults,
  incoming?: Partial<PbImageAnimationDefaults>
): PbImageAnimationDefaults {
  const incomingFineTune = incoming?.fineTune;
  return {
    ...seed,
    ...incoming,
    fineTune: {
      ...seed.fineTune,
      ...incomingFineTune,
      enabled:
        typeof incomingFineTune?.enabled === "boolean"
          ? incomingFineTune.enabled
          : seed.fineTune.enabled,
      usePresetAsBase:
        typeof incomingFineTune?.usePresetAsBase === "boolean"
          ? incomingFineTune.usePresetAsBase
          : seed.fineTune.usePresetAsBase,
      hybridStackInPreset:
        incomingFineTune?.hybridStackInPreset &&
        HYBRID_STACK_OPTIONS.includes(incomingFineTune.hybridStackInPreset)
          ? incomingFineTune.hybridStackInPreset
          : seed.fineTune.hybridStackInPreset,
      hybridStackOutPreset:
        incomingFineTune?.hybridStackOutPreset &&
        HYBRID_STACK_OPTIONS.includes(incomingFineTune.hybridStackOutPreset)
          ? incomingFineTune.hybridStackOutPreset
          : seed.fineTune.hybridStackOutPreset,
      hybridDuration: Math.max(
        0.05,
        Number(incomingFineTune?.hybridDuration ?? seed.fineTune.hybridDuration)
      ),
      entrance: normalizeEntranceFineTune(seed.fineTune.entrance, incomingFineTune?.entrance),
      exit: normalizeExitFineTune(seed.fineTune.exit, incomingFineTune?.exit),
    },
  };
}

export function normalizeVariant(
  seed: PbImageVariantDefaults,
  incoming?: Partial<PbImageVariantDefaults>
): PbImageVariantDefaults {
  if (!incoming || typeof incoming !== "object") return seed;
  return {
    ...seed,
    ...incoming,
    objectFit:
      normalizeResponsiveValue(
        seed.objectFit,
        incoming.objectFit,
        (value): value is "cover" | "contain" | "fillWidth" | "fillHeight" | "crop" =>
          typeof value === "string" && (OBJECT_FIT_OPTIONS as readonly string[]).includes(value)
      ) ?? seed.objectFit,
    aspectRatio: normalizeResponsiveValue(
      seed.aspectRatio,
      incoming.aspectRatio,
      (value): value is string => typeof value === "string"
    ),
    width: normalizeResponsiveValue(
      seed.width,
      incoming.width,
      (value): value is string => typeof value === "string"
    ),
    height: normalizeResponsiveValue(
      seed.height,
      incoming.height,
      (value): value is string => typeof value === "string"
    ),
    constraints: normalizeConstraints(seed.constraints, incoming.constraints),
    borderRadius:
      normalizeResponsiveValue(
        seed.borderRadius,
        incoming.borderRadius,
        (value): value is string => typeof value === "string"
      ) ?? seed.borderRadius,
    align: normalizeResponsiveValue(
      seed.align,
      incoming.align,
      (value): value is "left" | "center" | "right" =>
        typeof value === "string" && (ALIGN_OPTIONS as readonly string[]).includes(value)
    ),
    alignY: normalizeResponsiveValue(
      seed.alignY,
      incoming.alignY,
      (value): value is "top" | "center" | "bottom" =>
        typeof value === "string" && (ALIGN_Y_OPTIONS as readonly string[]).includes(value)
    ),
    marginTop: normalizeResponsiveValue(
      seed.marginTop,
      incoming.marginTop,
      (value): value is string => typeof value === "string"
    ),
    marginBottom: normalizeResponsiveValue(
      seed.marginBottom,
      incoming.marginBottom,
      (value): value is string => typeof value === "string"
    ),
    marginLeft: normalizeResponsiveValue(
      seed.marginLeft,
      incoming.marginLeft,
      (value): value is string => typeof value === "string"
    ),
    marginRight: normalizeResponsiveValue(
      seed.marginRight,
      incoming.marginRight,
      (value): value is string => typeof value === "string"
    ),
    zIndex:
      typeof incoming.zIndex === "number" && Number.isFinite(incoming.zIndex)
        ? incoming.zIndex
        : seed.zIndex,
    opacity:
      typeof incoming.opacity === "number" && Number.isFinite(incoming.opacity)
        ? clampNumber(incoming.opacity, 0, 1)
        : seed.opacity,
    overflow:
      incoming.overflow && OVERFLOW_OPTIONS.includes(incoming.overflow)
        ? incoming.overflow
        : seed.overflow,
    animation: normalizePbImageAnimationDefaults(seed.animation, incoming.animation),
    imageCrop:
      incoming.imageCrop != null || seed.imageCrop != null
        ? (() => {
            const merged = { ...(seed.imageCrop ?? {}), ...(incoming.imageCrop ?? {}) };
            const crop: PbImageVariantDefaults["imageCrop"] = {
              x: Number(merged.x ?? 0),
              y: Number(merged.y ?? 0),
              scale: Math.max(1, Math.min(4, Number(merged.scale ?? 1))),
            };
            if (typeof merged.focalX === "number" && Number.isFinite(merged.focalX)) {
              crop.focalX = clampNumber(merged.focalX, 0, 1);
            }
            if (typeof merged.focalY === "number" && Number.isFinite(merged.focalY)) {
              crop.focalY = clampNumber(merged.focalY, 0, 1);
            }
            return crop;
          })()
        : undefined,
  };
}

export function readPersisted(): PersistedImageDefaults | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const data = JSON.parse(raw) as
      | PersistedImageDefaults
      | PersistedImageDefaultsLegacyV2
      | PersistedImageDefaultsLegacyV1;
    if (!data || typeof data !== "object" || !("variants" in data) || !("defaultVariant" in data))
      return null;
    const variants = { ...BASE_DEFAULTS.variants };
    const rawVariants = data.variants as Record<string, Partial<PbImageVariantDefaults>>;
    for (const key of VARIANT_ORDER)
      variants[key] = normalizeVariant(BASE_DEFAULTS.variants[key], rawVariants?.[key]);
    return {
      v: 3,
      defaultVariant: VARIANT_ORDER.includes(data.defaultVariant)
        ? data.defaultVariant
        : BASE_DEFAULTS.defaultVariant,
      variants,
    };
  } catch {
    return null;
  }
}

export function toExportJson(data: PersistedImageDefaults): string {
  return JSON.stringify(
    { image: { defaultVariant: data.defaultVariant, variants: data.variants } },
    null,
    2
  );
}
