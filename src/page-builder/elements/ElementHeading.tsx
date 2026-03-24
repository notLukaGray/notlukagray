import { createElement, type CSSProperties } from "react";
import type { ElementBlock } from "@/page-builder/core/page-builder-schemas";
import { getElementLayoutStyle } from "@/page-builder/core/element-layout-utils";
import { getHeadingTypographyClass } from "@/page-builder/core/element-body-typography";
import { useVariable } from "@/page-builder/core/page-builder-variable-store";

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
  align,
  textAlign,
  width,
  height,
  marginTop,
  marginBottom,
  marginLeft,
  marginRight,
  wordWrap = true,
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
  };
  const multilineAlign = textAlign ?? align;
  if (multilineAlign)
    blockStyle.textAlign = multilineAlign as "left" | "right" | "center" | "justify";
  blockStyle.whiteSpace = wordWrap ? "normal" : "nowrap";
  if (!wordWrap) blockStyle.overflow = "hidden";
  blockStyle.textOverflow = wordWrap ? undefined : "ellipsis";
  const textStyle: CSSProperties = {
    letterSpacing,
    lineHeight: lineSpacing,
  };

  return (
    <div className="shrink-0" style={blockStyle}>
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
