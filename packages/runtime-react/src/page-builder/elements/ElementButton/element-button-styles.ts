import type { CSSProperties } from "react";
import { applyPbDefaultTextAlign } from "@pb/core/internal/adapters/host-config";
import type { ElementBlock, ElementBodyVariant } from "@pb/core/internal/page-builder-schemas";
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
  blockStyle.whiteSpace = wordWrap ? "normal" : "nowrap";
  if (!wordWrap) {
    blockStyle.overflow = "hidden";
    blockStyle.textOverflow = "ellipsis";
  }
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

export function buildElementButtonWrapperStyles(
  definitions: Record<string, unknown> | null | undefined,
  props: Pick<
    ElementButtonProps,
    | "wrapperFill"
    | "wrapperStroke"
    | "wrapperFillRef"
    | "wrapperStrokeRef"
    | "wrapperPadding"
    | "wrapperBorderRadius"
  >
) {
  const {
    wrapperFill,
    wrapperStroke,
    wrapperFillRef,
    wrapperStrokeRef,
    wrapperPadding,
    wrapperBorderRadius,
  } = props;
  const resolvedFill = resolveCssGradientRef(definitions, wrapperFillRef, wrapperFill);
  const resolvedStroke = resolveCssGradientRef(definitions, wrapperStrokeRef, wrapperStroke);

  const strokeWidth = 2;
  const isGradientStroke = resolvedStroke != null && String(resolvedStroke).includes("gradient");
  const useRoundedGradientStroke = isGradientStroke && wrapperBorderRadius != null;
  const hasWrapper = resolvedFill != null || resolvedStroke != null;

  const wrapperStyle: CSSProperties = hasWrapper
    ? {
        ...(resolvedFill != null && !useRoundedGradientStroke && { background: resolvedFill }),
        ...(wrapperPadding != null && !useRoundedGradientStroke && { padding: wrapperPadding }),
        ...(wrapperBorderRadius != null && { borderRadius: wrapperBorderRadius }),
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
    : {};

  const innerWrapperStyle: CSSProperties =
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
      : {};

  return { hasWrapper, useRoundedGradientStroke, wrapperStyle, innerWrapperStyle };
}
