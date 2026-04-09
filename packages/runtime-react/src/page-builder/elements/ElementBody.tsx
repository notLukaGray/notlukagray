import type { CSSProperties } from "react";
import { applyPbDefaultTextAlign } from "@pb/core/internal/adapters/host-config";
import type {
  ElementBlock,
  ElementBodyVariant,
} from "@pb/contracts/page-builder/core/page-builder-schemas";
import {
  getElementLayoutStyle,
  getLayoutRotateFlipStyle,
} from "@pb/core/internal/element-layout-utils";
import { getBodyTypographyClass } from "@pb/core/internal/element-body-typography";
import { useVariable } from "@/page-builder/runtime/page-builder-variable-store";
import { resolveFontFamily } from "@pb/core/internal/element-font-slot";

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
  rotate,
  flipHorizontal,
  flipVertical,
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
    ...getLayoutRotateFlipStyle({ rotate, flipHorizontal, flipVertical }),
  };
  applyPbDefaultTextAlign(blockStyle, align, textAlign);

  // Build text inline styles. Explicit props override whatever the typography class sets.
  // lineSpacing maps to lineHeight (legacy prop name); lineHeight is the newer direct prop.
  // word wrap / overflow — must be on the text element, not the wrapper, for text-overflow to work
  const textStyle: CSSProperties = {
    ...(letterSpacing !== undefined ? { letterSpacing } : {}),
    ...(lineSpacing !== undefined ? { lineHeight: lineSpacing } : {}),
    ...(lineHeight !== undefined ? { lineHeight } : {}),
    ...(resolveFontFamily(fontFamily) !== undefined
      ? { fontFamily: resolveFontFamily(fontFamily) }
      : {}),
    ...(fontSize !== undefined ? { fontSize } : {}),
    ...(fontWeight !== undefined ? { fontWeight: fontWeight as CSSProperties["fontWeight"] } : {}),
    ...(textAlign !== undefined && !Array.isArray(textAlign)
      ? { textAlign: textAlign as CSSProperties["textAlign"] }
      : {}),
    ...(color !== undefined ? { color } : {}),
    whiteSpace: wordWrap ? "normal" : "nowrap",
    overflowWrap: wordWrap ? "break-word" : "normal",
    wordBreak: wordWrap ? "break-word" : "normal",
    ...(wordWrap ? {} : { overflow: "hidden", textOverflow: "ellipsis" }),
  };

  return (
    <div className="shrink-0 max-w-full" style={blockStyle}>
      <p className={`m-0 block${typographyClass ? ` ${typographyClass}` : ""}`} style={textStyle}>
        {resolvedText}
      </p>
    </div>
  );
}
