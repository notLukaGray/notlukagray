import type { CSSProperties } from "react";
import type { ElementBlock, ElementBodyVariant } from "@/page-builder/core/page-builder-schemas";
import { getElementLayoutStyle } from "@/page-builder/core/element-layout-utils";
import { getBodyTypographyClass } from "@/page-builder/core/element-body-typography";
import { useVariable } from "@/page-builder/core/page-builder-variable-store";

type Props = Extract<ElementBlock, { type: "elementBody" }>;

/** Page-builder body text element with layout and typography level (1-6). */
export function ElementBody({
  text,
  variableKey,
  level,
  letterSpacing,
  lineSpacing,
  lineHeight,
  fontFamily,
  fontSize,
  fontWeight,
  color,
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

  // When level is not provided, skip the typography class entirely so that
  // explicit fontSize/fontWeight/etc. overrides are not fighting a class.
  const resolvedLevel =
    level !== undefined && level !== null
      ? ((Array.isArray(level) ? level[0] : level) ?? undefined)
      : undefined;
  const typographyClass =
    resolvedLevel !== undefined ? getBodyTypographyClass(resolvedLevel as ElementBodyVariant) : "";

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

  // Build text inline styles. Explicit props override whatever the typography class sets.
  // lineSpacing maps to lineHeight (legacy prop name); lineHeight is the newer direct prop.
  const textStyle: CSSProperties = {
    ...(letterSpacing !== undefined ? { letterSpacing } : {}),
    ...(lineSpacing !== undefined ? { lineHeight: lineSpacing } : {}),
    ...(lineHeight !== undefined ? { lineHeight } : {}),
    ...(fontFamily !== undefined ? { fontFamily } : {}),
    ...(fontSize !== undefined ? { fontSize } : {}),
    ...(fontWeight !== undefined ? { fontWeight: fontWeight as CSSProperties["fontWeight"] } : {}),
    ...(textAlign !== undefined && !Array.isArray(textAlign)
      ? { textAlign: textAlign as CSSProperties["textAlign"] }
      : {}),
    ...(color !== undefined ? { color } : {}),
  };

  return (
    <div className="shrink-0" style={blockStyle}>
      <p className={`m-0 block${typographyClass ? ` ${typographyClass}` : ""}`} style={textStyle}>
        {resolvedText}
      </p>
    </div>
  );
}
