import type { CSSProperties } from "react";
import {
  buildImageMotionTimingFromAnimationDefaults,
  type PbImageAnimationDefaults,
  type PbImageVariantDefaults,
  type PbImageVariantKey,
} from "@/app/theme/pb-builder-defaults";
import type { ImageRuntimeDraft, VisibleWhenOperator } from "./types";

export const DEFAULT_IMAGE_RUNTIME_DRAFT: ImageRuntimeDraft = {
  linkEnabled: false,
  linkRef: "",
  linkExternal: false,
  cursor: "",
  visibleWhenEnabled: false,
  visibleWhenVariable: "",
  visibleWhenOperator: "equals",
  visibleWhenValue: "",
  visibleWhenPreviewValue: "",
  ariaLabel: "",
  wrapperStyleJson: "",
  figmaConstraintsJson: "",
  motionJson: "",
};

function parseJsonObject(text: string): Record<string, unknown> | undefined {
  const trimmed = text.trim();
  if (!trimmed) return undefined;
  try {
    const parsed = JSON.parse(trimmed) as unknown;
    if (!parsed || typeof parsed !== "object" || Array.isArray(parsed)) return undefined;
    return parsed as Record<string, unknown>;
  } catch {
    return undefined;
  }
}

function parseLooseValue(text: string): unknown {
  const trimmed = text.trim();
  if (!trimmed) return "";
  try {
    return JSON.parse(trimmed) as unknown;
  } catch {
    return trimmed;
  }
}

function asNumber(value: unknown): number | null {
  if (typeof value === "number" && Number.isFinite(value)) return value;
  if (typeof value === "string" && value.trim()) {
    const parsed = Number(value);
    if (Number.isFinite(parsed)) return parsed;
  }
  return null;
}

function evaluateVisibleWhen(
  currentRaw: unknown,
  expectedRaw: unknown,
  operator: VisibleWhenOperator
): boolean {
  const currentNum = asNumber(currentRaw);
  const expectedNum = asNumber(expectedRaw);
  if (operator === "contains") return String(currentRaw).includes(String(expectedRaw));
  if (operator === "startsWith") return String(currentRaw).startsWith(String(expectedRaw));
  if (operator === "equals") return String(currentRaw) === String(expectedRaw);
  if (operator === "notEquals") return String(currentRaw) !== String(expectedRaw);
  if (currentNum == null || expectedNum == null) return false;
  if (operator === "gt") return currentNum > expectedNum;
  if (operator === "gte") return currentNum >= expectedNum;
  if (operator === "lt") return currentNum < expectedNum;
  return currentNum <= expectedNum;
}

function omitUndefined<T extends Record<string, unknown>>(value: T): Partial<T> {
  const out: Record<string, unknown> = {};
  for (const [key, entry] of Object.entries(value)) {
    if (entry !== undefined) out[key] = entry;
  }
  return out as Partial<T>;
}

export function buildRuntimePreviewState(draft: ImageRuntimeDraft): {
  visibleWhenMatches: boolean;
  wrapperStyle: CSSProperties | undefined;
  figmaConstraints: Record<string, unknown> | undefined;
  motion: Record<string, unknown> | undefined;
  linkHref: string | null;
  linkExternal: boolean;
  cursor: ImageRuntimeDraft["cursor"] | undefined;
  ariaLabel: string | undefined;
} {
  const currentValue = parseLooseValue(draft.visibleWhenPreviewValue);
  const expectedValue = parseLooseValue(draft.visibleWhenValue);
  const visibleWhenMatches = !draft.visibleWhenEnabled
    ? true
    : evaluateVisibleWhen(currentValue, expectedValue, draft.visibleWhenOperator);
  const trimmedHref = draft.linkRef.trim();
  return {
    visibleWhenMatches,
    wrapperStyle: parseJsonObject(draft.wrapperStyleJson) as CSSProperties | undefined,
    figmaConstraints: parseJsonObject(draft.figmaConstraintsJson),
    motion: parseJsonObject(draft.motionJson),
    linkHref: draft.linkEnabled && trimmedHref.length > 0 ? trimmedHref : null,
    linkExternal: draft.linkExternal,
    cursor: draft.cursor || undefined,
    ariaLabel: draft.ariaLabel.trim() || undefined,
  };
}

export function buildCustomElementSnippet(
  variantKey: PbImageVariantKey,
  variant: PbImageVariantDefaults,
  draft: ImageRuntimeDraft
): Record<string, unknown> {
  const runtime = buildRuntimePreviewState(draft);
  const visibleWhen =
    draft.visibleWhenEnabled && draft.visibleWhenVariable.trim()
      ? {
          variable: draft.visibleWhenVariable.trim(),
          operator: draft.visibleWhenOperator,
          value: parseLooseValue(draft.visibleWhenValue),
        }
      : undefined;
  const interactions = runtime.cursor ? { cursor: runtime.cursor } : undefined;
  const aria = runtime.ariaLabel ? { "aria-label": runtime.ariaLabel } : undefined;
  const link = runtime.linkHref
    ? { ref: runtime.linkHref, external: runtime.linkExternal }
    : undefined;

  const element = omitUndefined({
    type: "elementImage",
    variant: variantKey,
    src: "https://images.unsplash.com/photo-1521747116042-5a810fda9664",
    alt: "Custom image",
    objectFit: variant.objectFit,
    objectPosition: variant.objectPosition,
    imageCrop: variant.imageCrop,
    aspectRatio: variant.aspectRatio,
    width: variant.width,
    height: variant.height,
    constraints: variant.constraints,
    borderRadius: variant.borderRadius,
    align: variant.align,
    alignY: variant.alignY,
    marginTop: variant.marginTop,
    marginBottom: variant.marginBottom,
    marginLeft: variant.marginLeft,
    marginRight: variant.marginRight,
    zIndex: variant.zIndex,
    rotate: variant.rotate,
    flipHorizontal: variant.flipHorizontal,
    flipVertical: variant.flipVertical,
    opacity: variant.opacity,
    blendMode: variant.blendMode,
    boxShadow: variant.boxShadow,
    filter: variant.filter,
    backdropFilter: variant.backdropFilter,
    overflow: variant.overflow,
    hidden: variant.hidden,
    priority: variant.priority,
    motionTiming: buildImageMotionTimingFromAnimationDefaults(variant.animation),
    link,
    interactions,
    visibleWhen,
    aria,
    wrapperStyle: runtime.wrapperStyle,
    figmaConstraints: runtime.figmaConstraints,
    motion: runtime.motion,
  });

  return element as Record<string, unknown>;
}

/** Runtime passthrough for typography elements (heading / body / link): no image `link` field. */
export function mergeTypographyDevRuntime(
  draft: ImageRuntimeDraft,
  element: Record<string, unknown>
): Record<string, unknown> {
  const runtime = buildRuntimePreviewState(draft);
  const visibleWhen =
    draft.visibleWhenEnabled && draft.visibleWhenVariable.trim()
      ? {
          variable: draft.visibleWhenVariable.trim(),
          operator: draft.visibleWhenOperator,
          value: parseLooseValue(draft.visibleWhenValue),
        }
      : undefined;
  const interactions = runtime.cursor ? { cursor: runtime.cursor } : undefined;
  const aria = runtime.ariaLabel ? { "aria-label": runtime.ariaLabel } : undefined;
  const {
    animation,
    motionTiming: storedTiming,
    ...elementRest
  } = element as {
    animation?: PbImageAnimationDefaults;
    motionTiming?: unknown;
  } & Record<string, unknown>;
  const motionTiming =
    animation != null
      ? buildImageMotionTimingFromAnimationDefaults(animation)
      : (storedTiming as Record<string, unknown> | undefined);
  return omitUndefined({
    ...elementRest,
    motionTiming,
    interactions,
    visibleWhen,
    aria,
    wrapperStyle: runtime.wrapperStyle,
    figmaConstraints: runtime.figmaConstraints,
    motion: runtime.motion,
  });
}
