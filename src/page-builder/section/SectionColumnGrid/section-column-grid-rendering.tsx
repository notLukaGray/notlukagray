"use client";

import type { ElementBlock } from "@/page-builder/core/page-builder-schemas";
import { borderToCss } from "@/page-builder/core/section-utils";
import { generateElementKey } from "@/page-builder/core/element-keys";
import type { ColumnFlexStyle, ColumnStyleInput } from "@/page-builder/core/section-column-layout";
import { ElementRenderer } from "../../elements/Shared/ElementRenderer";

function mapColumnAlignX(
  value: ColumnStyleInput["alignX"]
): React.CSSProperties["alignItems"] | undefined {
  if (!value) return undefined;
  if (value === "left") return "flex-start";
  if (value === "right") return "flex-end";
  return value;
}

function mapColumnAlignY(
  value: ColumnStyleInput["alignY"]
): React.CSSProperties["justifyContent"] | undefined {
  if (!value) return undefined;
  if (value === "top") return "flex-start";
  if (value === "bottom") return "flex-end";
  return value;
}

export function getBoxStyle(style: ColumnStyleInput | undefined): React.CSSProperties | undefined {
  if (!style) return undefined;
  const justifyContent = style.justifyContent ?? mapColumnAlignY(style.alignY);
  const alignItems = style.alignItems ?? mapColumnAlignX(style.alignX);
  return {
    borderRadius: style.borderRadius,
    border: borderToCss(style.border),
    backgroundColor: style.fill,
    padding: style.padding,
    gap: style.gap,
    justifyContent,
    alignItems,
    minHeight: style.minHeight,
    maxHeight: style.maxHeight,
    minWidth: style.minWidth,
    maxWidth: style.maxWidth,
    width: style.width,
    height: style.height,
    overflow: style.overflow,
    overflowX: style.overflowX,
    overflowY: style.overflowY,
    ...(justifyContent || alignItems || style.gap
      ? { display: "flex", flexDirection: "column" }
      : {}),
  };
}

export function gridTemplateFromFlexStyles(columnFlexStyles: ColumnFlexStyle[]): string {
  return columnFlexStyles
    .map((style) => {
      if ("width" in style && style.width) return style.width;
      if (style.flex === "0 0 auto") return "max-content";
      if (style.flex === "1 1 0%") return "minmax(0, 1fr)";
      const m = /^([0-9.]+)\s+/.exec(style.flex);
      if (m) return `minmax(0, ${m[1]}fr)`;
      return "minmax(0, 1fr)";
    })
    .join(" ");
}

export function getPrimaryGap(
  resolvedColumnGaps: string | string[] | undefined
): string | undefined {
  if (!resolvedColumnGaps) return undefined;
  return typeof resolvedColumnGaps === "string" ? resolvedColumnGaps : resolvedColumnGaps[0];
}

function getSegmentRowStyle(
  resolvedColumnCount: number,
  resolvedColumnGaps: string | string[] | undefined
): React.CSSProperties {
  if (resolvedColumnCount <= 1 || !resolvedColumnGaps) return {};
  const isAuto =
    resolvedColumnGaps === "auto" ||
    (Array.isArray(resolvedColumnGaps) && resolvedColumnGaps[0] === "auto");
  const gap = typeof resolvedColumnGaps === "string" ? resolvedColumnGaps : resolvedColumnGaps[0];
  return isAuto ? { justifyContent: "space-between" } : { columnGap: gap };
}

export function renderColumnStackSegment({
  segmentColumns,
  segmentKey,
  columnFlexStyles,
  resolvedColumnCount,
  resolvedColumnGaps,
  columnStyles,
  itemStyles,
}: {
  segmentColumns: ElementBlock[][];
  segmentKey: string;
  columnFlexStyles: ColumnFlexStyle[];
  resolvedColumnCount: number;
  resolvedColumnGaps: string | string[] | undefined;
  columnStyles?: ColumnStyleInput[];
  itemStyles?: Record<string, ColumnStyleInput>;
}) {
  const rowStyle = getSegmentRowStyle(resolvedColumnCount, resolvedColumnGaps);
  return (
    <div key={segmentKey} className="relative z-10 flex min-w-0 w-full" style={rowStyle}>
      {segmentColumns.map((columnElements, columnIndex) => {
        const colStyle =
          resolvedColumnCount === 1 && resolvedColumnGaps
            ? {
                gap:
                  typeof resolvedColumnGaps === "string"
                    ? resolvedColumnGaps
                    : resolvedColumnGaps[0],
              }
            : {};
        const columnStyle = columnStyles?.[columnIndex];
        const style = { ...colStyle, ...(getBoxStyle(columnStyle) ?? {}) };
        const flexStyle = columnFlexStyles[columnIndex] ?? { flex: "0 0 auto" };
        const isHug = flexStyle.flex === "0 0 auto";
        const needsMinWidth = !isHug || resolvedColumnCount === 1;
        return (
          <div
            key={`${segmentKey}:${columnIndex}`}
            className={`flex flex-col ${needsMinWidth ? "min-w-0" : ""}`}
            style={{ ...style, ...flexStyle }}
          >
            {columnElements.map((block, i) => (
              <ItemCell
                key={
                  block.id
                    ? `${segmentKey}:${columnIndex}:${block.id}`
                    : `${segmentKey}:${columnIndex}:${generateElementKey(block, i)}:${i}`
                }
                block={block}
                style={block.id ? itemStyles?.[block.id] : undefined}
              />
            ))}
          </div>
        );
      })}
    </div>
  );
}

export function ItemCell({ block, style }: { block: ElementBlock; style?: ColumnStyleInput }) {
  const cellStyle = getBoxStyle(style);
  if (!cellStyle) return <ElementRenderer block={block} />;
  return (
    <div className="min-w-0" style={cellStyle}>
      <ElementRenderer block={block} />
    </div>
  );
}
