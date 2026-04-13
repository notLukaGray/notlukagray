import type { CSSProperties } from "react";
import { applyPbDefaultTextAlign } from "@pb/core/internal/adapters/host-config";
import type {
  ElementBlock,
  ElementBodyVariant,
} from "@pb/contracts/page-builder/core/page-builder-schemas";
import { getElementLayoutStyle } from "@pb/core/internal/element-layout-utils";
import {
  getBodyTypographyClass,
  getHeadingTypographyClass,
  DEFAULT_BODY_LEVEL,
} from "@pb/core/internal/element-body-typography";

type ElementButtonProps = Extract<ElementBlock, { type: "elementButton" }>;

export function getElementButtonTypographyClass(props: ElementButtonProps): string {
  if (props.copyType === "heading") {
    const level = props.level ?? 1;
    return getHeadingTypographyClass(level);
  }
  const level = (props.level ?? DEFAULT_BODY_LEVEL) as ElementBodyVariant;
  return getBodyTypographyClass(level);
}

export function buildElementButtonBlockStyle(
  props: Pick<
    ElementButtonProps,
    | "width"
    | "height"
    | "align"
    | "textAlign"
    | "marginTop"
    | "marginBottom"
    | "marginLeft"
    | "marginRight"
    | "wordWrap"
  > &
    Omit<Partial<ElementButtonProps>, "type"> & { wordWrap: boolean }
): CSSProperties {
  const {
    wordWrap,
    align,
    textAlign,
    width,
    height,
    marginTop,
    marginBottom,
    marginLeft,
    marginRight,
    ...rest
  } = props;
  const blockStyle: CSSProperties = {
    ...getElementLayoutStyle({
      width,
      height,
      align,
      textAlign,
      marginTop,
      marginBottom,
      marginLeft,
      marginRight,
      ...rest,
    }),
  };
  applyPbDefaultTextAlign(blockStyle, align, textAlign);
  // `wordWrap` only toggles wrapping (multi-line vs single-line). It does not imply overflow;
  // use layout `overflow` / `textOverflow` when you need clipping or ellipsis.
  blockStyle.whiteSpace = wordWrap ? "normal" : "nowrap";
  return blockStyle;
}

function resolveCssGradientRef(
  definitions: Record<string, unknown> | null | undefined,
  ref: string | undefined,
  literal: string | undefined
): string | undefined {
  if (ref == null || ref === "" || definitions == null) return literal;
  const def = definitions[ref];
  if (
    def != null &&
    typeof def === "object" &&
    "type" in def &&
    (def as { type?: unknown }).type === "cssGradient" &&
    "value" in def &&
    typeof (def as { value?: unknown }).value === "string"
  ) {
    return (def as { value: string }).value;
  }
  return literal;
}

const DEFAULT_WRAPPER_STROKE_WIDTH_PX = 2;

function clampWrapperStrokeWidthPx(raw: number | undefined): number {
  if (raw == null || !Number.isFinite(raw)) return DEFAULT_WRAPPER_STROKE_WIDTH_PX;
  return Math.round(Math.min(Math.max(raw, 0), 48));
}

export function buildElementButtonWrapperStyles(
  definitions: Record<string, unknown> | null | undefined,
  props: Pick<
    ElementButtonProps,
    | "wrapperFill"
    | "wrapperStroke"
    | "wrapperFillRef"
    | "wrapperStrokeRef"
    | "wrapperStrokeWidth"
    | "wrapperPadding"
    | "wrapperBorderRadius"
    | "wrapperWidth"
    | "wrapperHeight"
    | "wrapperMinWidth"
    | "wrapperMinHeight"
    | "wrapperFillHover"
    | "wrapperStrokeHover"
    | "wrapperFillActive"
    | "wrapperScaleHover"
    | "wrapperScaleActive"
    | "wrapperScaleDisabled"
    | "wrapperOpacityHover"
    | "wrapperFillDisabled"
    | "wrapperTransition"
    | "wrapperInteractionVars"
  >
) {
  const {
    wrapperFill,
    wrapperStroke,
    wrapperFillRef,
    wrapperStrokeRef,
    wrapperStrokeWidth,
    wrapperPadding,
    wrapperBorderRadius,
    wrapperWidth,
    wrapperHeight,
    wrapperMinWidth,
    wrapperMinHeight,
    wrapperFillHover,
    wrapperStrokeHover,
    wrapperFillActive,
    wrapperScaleHover,
    wrapperScaleActive,
    wrapperScaleDisabled,
    wrapperOpacityHover,
    wrapperFillDisabled,
    wrapperTransition,
    wrapperInteractionVars,
  } = props;
  const resolvedFill = resolveCssGradientRef(definitions, wrapperFillRef, wrapperFill);
  const resolvedStroke = resolveCssGradientRef(definitions, wrapperStrokeRef, wrapperStroke);

  const strokeWidth = clampWrapperStrokeWidthPx(wrapperStrokeWidth);
  const isGradientStroke = resolvedStroke != null && String(resolvedStroke).includes("gradient");
  const useRoundedGradientStroke = isGradientStroke && wrapperBorderRadius != null;
  const hasWrapper = resolvedFill != null || resolvedStroke != null;

  /** Callers pass breakpoint-resolved strings; schema types still allow responsive tuples. */
  const wrapperStyle = (
    hasWrapper
      ? {
          ...(resolvedFill != null && !useRoundedGradientStroke && { background: resolvedFill }),
          ...(wrapperPadding != null && !useRoundedGradientStroke && { padding: wrapperPadding }),
          ...(wrapperBorderRadius != null && { borderRadius: wrapperBorderRadius }),
          ...(wrapperWidth != null && { width: wrapperWidth }),
          ...(wrapperHeight != null && { height: wrapperHeight }),
          ...(wrapperMinWidth != null && { minWidth: wrapperMinWidth }),
          ...(wrapperMinHeight != null && { minHeight: wrapperMinHeight }),
          ...(resolvedStroke != null &&
            (useRoundedGradientStroke
              ? { padding: strokeWidth, background: resolvedStroke }
              : isGradientStroke
                ? {
                    border: `${strokeWidth}px solid transparent`,
                    borderImage: `${resolvedStroke} 1`,
                    borderImageSlice: 1,
                  }
                : { border: `${strokeWidth}px solid ${resolvedStroke}` })),
          display: "inline-flex",
          alignItems: "center",
          justifyContent: "center",
        }
      : {}
  ) as CSSProperties;

  const innerWrapperStyle = (
    hasWrapper && useRoundedGradientStroke
      ? {
          ...(resolvedFill != null && { background: resolvedFill }),
          ...(wrapperPadding != null && { padding: wrapperPadding }),
          borderRadius:
            wrapperBorderRadius != null
              ? (() => {
                  const r = String(wrapperBorderRadius);
                  const match = r.match(/^(\d*\.?\d+)(px|rem|em)$/);
                  return match ? `calc(${match[1]}${match[2]} - ${strokeWidth}px)` : r;
                })()
              : undefined,
          display: "inline-flex",
          alignItems: "center",
          justifyContent: "center",
        }
      : {}
  ) as CSSProperties;

  // Interactive CSS vars — explicit props + defaults so :hover/:active always resolve (globals.css
  // uses var(--element-btn-fill-hover, var(--element-btn-fill)) and transitions run on the wrapper).
  const stateVars: CSSProperties = {};
  if (wrapperFillHover != null)
    (stateVars as Record<string, string>)["--element-btn-fill-hover"] = wrapperFillHover;
  if (wrapperStrokeHover != null)
    (stateVars as Record<string, string>)["--element-btn-stroke-hover"] = wrapperStrokeHover;
  if (wrapperFillActive != null)
    (stateVars as Record<string, string>)["--element-btn-fill-active"] = wrapperFillActive;
  if (wrapperScaleHover != null)
    (stateVars as Record<string, string>)["--element-btn-scale-hover"] = String(wrapperScaleHover);
  if (wrapperScaleActive != null)
    (stateVars as Record<string, string>)["--element-btn-scale-active"] =
      String(wrapperScaleActive);
  if (wrapperScaleDisabled != null)
    (stateVars as Record<string, string>)["--element-btn-scale-disabled"] =
      String(wrapperScaleDisabled);
  if (wrapperOpacityHover != null)
    (stateVars as Record<string, string>)["--element-btn-opacity-hover"] =
      String(wrapperOpacityHover);
  if (wrapperFillDisabled != null)
    (stateVars as Record<string, string>)["--element-btn-fill-disabled"] = wrapperFillDisabled;
  if (wrapperTransition != null)
    (stateVars as Record<string, string>)["--element-btn-transition"] = wrapperTransition;

  const fillTracking: CSSProperties = {};
  const canTrackSolidFill =
    hasWrapper &&
    resolvedFill != null &&
    !useRoundedGradientStroke &&
    typeof resolvedFill === "string";
  if (canTrackSolidFill) {
    (fillTracking as Record<string, string>)["--element-btn-fill"] = resolvedFill;
    if (wrapperFillHover == null) {
      (fillTracking as Record<string, string>)["--element-btn-fill-hover"] = resolvedFill;
    }
    if (wrapperFillActive == null) {
      const hoverFallback = wrapperFillHover ?? resolvedFill;
      (fillTracking as Record<string, string>)["--element-btn-fill-active"] = hoverFallback;
    }
  }
  const canTrackSolidStroke =
    hasWrapper &&
    resolvedStroke != null &&
    !isGradientStroke &&
    !useRoundedGradientStroke &&
    typeof resolvedStroke === "string";
  if (canTrackSolidStroke) {
    (fillTracking as Record<string, string>)["--element-btn-stroke"] = resolvedStroke;
    if (wrapperStrokeHover == null) {
      (fillTracking as Record<string, string>)["--element-btn-stroke-hover"] = resolvedStroke;
    }
  }

  const customVars: CSSProperties = {};
  if (wrapperInteractionVars) {
    for (const [key, val] of Object.entries(wrapperInteractionVars)) {
      if (typeof key === "string" && key.startsWith("--") && typeof val === "string") {
        (customVars as Record<string, string>)[key] = val;
      }
    }
  }

  const interactionLayer: CSSProperties = { ...fillTracking, ...stateVars, ...customVars };
  const hasInteractionLayer = Object.keys(interactionLayer).length > 0;
  const needsInteractiveWrapper = hasWrapper || hasInteractionLayer;

  return {
    hasWrapper,
    useRoundedGradientStroke,
    wrapperStyle:
      hasWrapper || hasInteractionLayer ? { ...wrapperStyle, ...interactionLayer } : wrapperStyle,
    innerWrapperStyle,
    /** True when the wrapper should mount `.element-btn-wrap` (fills, strokes, hovers, opacity). */
    hasStateVars: needsInteractiveWrapper,
  };
}
