import { createElement, type CSSProperties } from "react";
import { applyPbDefaultTextAlign } from "@pb/core/internal/adapters/host-config";
import type { ElementBlock } from "@pb/core/internal/page-builder-schemas";
import {
  getElementLayoutStyle,
  getLayoutRotateFlipStyle,
} from "@pb/core/internal/element-layout-utils";
import { getHeadingTypographyClass } from "@pb/core/internal/element-body-typography";
import { useVariable } from "@/page-builder/runtime/page-builder-variable-store";
import { resolveFontFamily } from "@pb/core/internal/element-font-slot";

type Props = Extract<ElementBlock, { type: "elementHeading" }>;

const TAG_MAP = ["h1", "h2", "h3", "h4", "h5", "h6"] as const;

/** Resolve the tag from semanticLevel (outline) or level (style). */
function headingTag(
  level: 1 | 2 | 3 | 4 | 5 | 6,
  semanticLevel?: 1 | 2 | 3 | 4 | 5 | 6
): (typeof TAG_MAP)[number] {
  const tagLevel = semanticLevel ?? level;
  return TAG_MAP[tagLevel - 1] ?? "h1";
}

export function ElementHeading({
  level,
  semanticLevel,
  text,
  variableKey,
  letterSpacing,
  lineSpacing,
  fontFamily,
  fontSize,
  fontWeight,
  align,
  textAlign,
  width,
  height,
  marginTop,
  marginBottom,
  marginLeft,
  marginRight,
  wordWrap = true,
  rotate,
  flipHorizontal,
  flipVertical,
  ...rest
}: Props & { variableKey?: string }) {
  // Always call hook unconditionally; use its value only when variableKey is set
  const variableValue = useVariable(variableKey ?? "");
  const resolvedText = variableKey !== undefined ? String(variableValue ?? "") : text;
  const tag = headingTag(level, semanticLevel);
  const typographyClass = getHeadingTypographyClass(level);

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
    ...getLayoutRotateFlipStyle({ rotate, flipHorizontal, flipVertical }),
  };
  applyPbDefaultTextAlign(blockStyle, align, textAlign);
  const textStyle: CSSProperties = {
    letterSpacing,
    lineHeight: lineSpacing,
    ...(resolveFontFamily(fontFamily) !== undefined
      ? { fontFamily: resolveFontFamily(fontFamily) }
      : {}),
    ...(fontSize !== undefined ? { fontSize } : {}),
    ...(fontWeight !== undefined ? { fontWeight: fontWeight as CSSProperties["fontWeight"] } : {}),
    // word wrap / overflow — must be on the text element, not the wrapper, for text-overflow to work
    whiteSpace: wordWrap ? "normal" : "nowrap",
    overflowWrap: wordWrap ? "break-word" : "normal",
    wordBreak: wordWrap ? "break-word" : "normal",
    ...(wordWrap ? {} : { overflow: "hidden", textOverflow: "ellipsis" }),
  };

  return (
    <div className="shrink-0 max-w-full" style={blockStyle}>
      {createElement(
        tag,
        {
          className: `m-0 block ${typographyClass}`,
          style: textStyle,
        },
        resolvedText
      )}
    </div>
  );
}
