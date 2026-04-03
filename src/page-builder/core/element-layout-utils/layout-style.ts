import type { CSSProperties } from "react";
import { pbContentGuidelines } from "@/app/theme/pb-content-guidelines-config";
import { scaleSpaceForDensity } from "@/page-builder/core/page-density";
import type { ElementLayout } from "../page-builder-schemas";
import { resolveResponsiveValue } from "../../../core/lib/responsive-value";
import { resolveConstraintStyle } from "./figma-constraints-style";

/** JSON often sends `""` for “unset”; treat like undefined so guideline defaults apply. */
export function coalesceEmptyString(value: unknown): string | undefined {
  if (value == null) return undefined;
  if (typeof value === "number" && !Number.isNaN(value)) return String(value);
  if (typeof value !== "string") return undefined;
  const t = value.trim();
  return t === "" ? undefined : t;
}

/** Maps exporter / author quirks to valid flex `align-items` keywords. */
export function normalizeFlexAlignItemsValue(
  value: string
): NonNullable<CSSProperties["alignItems"]> {
  const s = value.trim();
  if (s === "left" || s === "start") return "flex-start";
  if (s === "right" || s === "end") return "flex-end";
  return s as NonNullable<CSSProperties["alignItems"]>;
}

/** Maps exporter / author quirks to valid `justify-content` keywords. */
export function normalizeFlexJustifyContentValue(value: string): string {
  const s = value.trim();
  if (s === "left" || s === "start") return "flex-start";
  if (s === "right" || s === "end") return "flex-end";
  return s;
}

function resolveSize(value: string | undefined): string | undefined {
  if (value == null) return undefined;
  return value === "hug" ? "fit-content" : value;
}

/**
 * Maps page-builder `gap` to a CSS `gap` value. `"auto"` is used when export infers
 * Figma packed/dynamic primary-axis spacing (itemSpacing 0 but non-zero child geometry);
 * flexbox has no gap:auto, so we omit the property and rely on alignment + children.
 */
export function pageBuilderFlexGapToCss(gap: string | undefined | null): string | undefined {
  if (gap == null || gap === "auto") return undefined;
  if (/^-\d*\.?\d+(px|rem|em|vw|vh|%)$/i.test(gap.trim())) return undefined;
  return gap;
}

/** Resolved `gap` for element groups, including `pbContentGuidelines.frameGapWhenUnset` when JSON omits `gap`. */
export function resolveFrameGapCss(gap: string | undefined | null): string | undefined {
  if (gap == null || gap === "") {
    const fallback = pbContentGuidelines.frameGapWhenUnset;
    return fallback != null ? scaleSpaceForDensity(fallback) : undefined;
  }
  return pageBuilderFlexGapToCss(gap);
}

/** Row gap when JSON omits `rowGap` — uses `frameRowGapWhenUnset` when set. */
export function resolveFrameRowGapCss(rowGap: string | undefined | null): string | undefined {
  if (rowGap == null || rowGap === "") {
    const fallback = pbContentGuidelines.frameRowGapWhenUnset;
    return fallback != null ? scaleSpaceForDensity(fallback) : undefined;
  }
  return pageBuilderFlexGapToCss(rowGap);
}

/** Column gap when JSON omits `columnGap` — uses `frameColumnGapWhenUnset` when set. */
export function resolveFrameColumnGapCss(columnGap: string | undefined | null): string | undefined {
  if (columnGap == null || columnGap === "") {
    const fallback = pbContentGuidelines.frameColumnGapWhenUnset;
    return fallback != null ? scaleSpaceForDensity(fallback) : undefined;
  }
  return pageBuilderFlexGapToCss(columnGap);
}

export function pageBuilderOverlapGapToCss(gap: string | undefined | null): string | undefined {
  if (gap == null) return undefined;
  const trimmed = gap.trim();
  return /^-\d*\.?\d+(px|rem|em|vw|vh|%)$/i.test(trimmed) ? trimmed : undefined;
}

export function pageBuilderJustifyContentForGap(
  justifyContent: CSSProperties["justifyContent"] | undefined,
  gap: string | undefined | null
): CSSProperties["justifyContent"] | undefined {
  const overlapGap = pageBuilderOverlapGapToCss(gap);
  if (overlapGap && justifyContent === "space-between") return "center";
  return justifyContent;
}

const ALIGN_TO_ALIGN_SELF: Record<"left" | "center" | "right", string> = {
  left: "flex-start",
  center: "center",
  right: "flex-end",
};

export type ResolvedElementLayout = {
  id?: string;
  width?: string;
  height?: string;
  borderRadius?: string;
  constraints?: ElementLayout["constraints"];
  align?: "left" | "center" | "right";
  alignY?: "top" | "center" | "bottom";
  textAlign?: "left" | "right" | "center" | "justify";
  marginTop?: string;
  marginBottom?: string;
  marginLeft?: string;
  marginRight?: string;
  zIndex?: number;
  fixed?: boolean;
};

export function normalizeLayoutInput(
  layout: Partial<ElementLayout> | ElementLayout | undefined,
  isMobile?: boolean
): ResolvedElementLayout | undefined {
  if (!layout) return undefined;
  if (isMobile === undefined) return layout as ResolvedElementLayout;
  const width = resolveResponsiveValue(layout.width, isMobile);
  const height = resolveResponsiveValue(layout.height, isMobile);
  const borderRadius = resolveResponsiveValue(layout.borderRadius, isMobile);
  const align = resolveResponsiveValue(layout.align, isMobile);
  const alignY = resolveResponsiveValue(layout.alignY, isMobile);
  const textAlign = resolveResponsiveValue(layout.textAlign, isMobile);
  const marginTop = resolveResponsiveValue(layout.marginTop, isMobile);
  const marginBottom = resolveResponsiveValue(layout.marginBottom, isMobile);
  const marginLeft = resolveResponsiveValue(layout.marginLeft, isMobile);
  const marginRight = resolveResponsiveValue(layout.marginRight, isMobile);
  return {
    ...layout,
    width,
    height,
    borderRadius,
    align,
    alignY,
    textAlign,
    marginTop,
    marginBottom,
    marginLeft,
    marginRight,
  } as ResolvedElementLayout;
}

export function computePositioningStyle(resolved: ResolvedElementLayout): CSSProperties {
  const style: CSSProperties = {};
  if (resolved.align != null) style.alignSelf = ALIGN_TO_ALIGN_SELF[resolved.align];
  if (resolved.textAlign != null) style.textAlign = resolved.textAlign;
  if (resolved.marginTop != null) style.marginTop = resolved.marginTop;
  if (resolved.marginBottom != null) style.marginBottom = resolved.marginBottom;
  if (resolved.marginLeft != null) style.marginLeft = resolved.marginLeft;
  if (resolved.marginRight != null) style.marginRight = resolved.marginRight;
  if (resolved.alignY === "center") {
    if (resolved.marginTop == null) style.marginTop = "auto";
    if (resolved.marginBottom == null) style.marginBottom = "auto";
  } else if (resolved.alignY === "bottom") {
    if (resolved.marginTop == null) style.marginTop = "auto";
  }
  if (resolved.zIndex != null) style.zIndex = resolved.zIndex;
  if (resolved.borderRadius != null) style.borderRadius = resolved.borderRadius;
  return style;
}

export function computeSizingStyle(resolved: ResolvedElementLayout): CSSProperties {
  const style: CSSProperties = {};
  const width = resolveSize(resolved.width);
  const height = resolveSize(resolved.height);
  if (width != null) {
    style.width = width;
    if (resolved.width != null && resolved.width !== "hug") style.minWidth = 0;
  }
  if (height != null) {
    style.height = height;
    if (resolved.height != null && resolved.height !== "hug") style.minHeight = 0;
  }
  const constraints = Array.isArray(resolved.constraints)
    ? undefined
    : (resolved.constraints as
        | { minWidth?: string; maxWidth?: string; minHeight?: string; maxHeight?: string }
        | undefined);
  if (constraints) {
    if (constraints.minWidth != null) style.minWidth = constraints.minWidth;
    if (constraints.maxWidth != null) style.maxWidth = constraints.maxWidth;
    if (constraints.minHeight != null) style.minHeight = constraints.minHeight;
    if (constraints.maxHeight != null) style.maxHeight = constraints.maxHeight;
  }
  return style;
}

function computeFixedStyle(resolved: ResolvedElementLayout): CSSProperties {
  if (!resolved.fixed) return {};
  return {
    position: "fixed",
    left: "50%",
    top: "50%",
    transform: "translate(-50%, -50%)",
    zIndex: resolved.zIndex ?? 20,
  };
}

function sanitizeWrapperStyle(value: unknown): CSSProperties {
  if (!value || typeof value !== "object") return {};
  const style: CSSProperties = {};
  for (const [key, raw] of Object.entries(value as Record<string, unknown>)) {
    if (typeof raw === "string" || typeof raw === "number") {
      (style as Record<string, string | number>)[key] = raw;
    }
  }
  return style;
}

function computeVisualStyle(
  layout: Partial<ElementLayout> | ElementLayout | undefined
): CSSProperties {
  if (!layout) return {};
  const record = layout as Record<string, unknown>;
  const webkitBackdrop = record.WebkitBackdropFilter;
  return {
    ...(layout.hidden ? { display: "none" } : {}),
    ...(layout.opacity !== undefined ? { opacity: layout.opacity } : {}),
    ...(layout.blendMode
      ? { mixBlendMode: layout.blendMode as CSSProperties["mixBlendMode"] }
      : {}),
    ...(layout.overflow ? { overflow: layout.overflow } : {}),
    ...(layout.boxShadow ? { boxShadow: layout.boxShadow } : {}),
    ...(layout.filter ? { filter: layout.filter } : {}),
    ...(layout.backdropFilter ? { backdropFilter: layout.backdropFilter } : {}),
    ...(typeof webkitBackdrop === "string"
      ? { WebkitBackdropFilter: webkitBackdrop }
      : layout.backdropFilter
        ? { WebkitBackdropFilter: layout.backdropFilter }
        : {}),
    ...sanitizeWrapperStyle(layout.wrapperStyle),
  };
}

const LAYOUT_STYLE_HANDLERS: Record<string, (resolved: ResolvedElementLayout) => CSSProperties> = {
  default: (resolved) => ({
    ...(resolved.fixed ? computeFixedStyle(resolved) : computePositioningStyle(resolved)),
    ...computeSizingStyle(resolved),
  }),
};

/** Accepts full or partial layout; entrance* and other optional fields are not used for style. */
export function getElementLayoutStyle(
  layout: Partial<ElementLayout> | ElementLayout | undefined,
  isMobile?: boolean
): CSSProperties {
  const resolved = normalizeLayoutInput(layout, isMobile);
  if (!resolved) return {};
  const handler = LAYOUT_STYLE_HANDLERS.default ?? (() => ({}));
  const figmaConstraintStyle = resolveConstraintStyle(
    (layout as Partial<ElementLayout> | undefined)?.figmaConstraints ?? undefined
  );
  return {
    ...handler(resolved),
    ...computeVisualStyle(layout),
    ...figmaConstraintStyle,
  };
}
