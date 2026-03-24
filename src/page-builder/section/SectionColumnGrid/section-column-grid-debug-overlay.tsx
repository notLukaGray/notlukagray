"use client";

import type { ElementBlock } from "@/page-builder/core/page-builder-schemas";
import type { GridLayoutItem } from "@/page-builder/core/section-column-layout";

export function buildGridItemStyle(item: GridLayoutItem<ElementBlock>): React.CSSProperties {
  const style: React.CSSProperties = { minWidth: 0 };
  if (item.columnStart != null)
    style.gridColumn = `${item.columnStart} / span ${item.columnSpan ?? 1}`;
  else if (item.columnSpan && item.columnSpan > 1)
    style.gridColumn = `auto / span ${item.columnSpan}`;
  if (item.rowStart != null) style.gridRow = `${item.rowStart} / span ${item.rowSpan ?? 1}`;
  else if (item.rowSpan && item.rowSpan > 1) style.gridRow = `auto / span ${item.rowSpan}`;
  if (item.justifySelf) style.justifySelf = item.justifySelf;
  if (item.alignSelf) style.alignSelf = item.alignSelf;
  if (item.zIndex != null) style.zIndex = item.zIndex;
  return style;
}

export function GridDebugOverlay({ items }: { items: GridLayoutItem<ElementBlock>[] }) {
  return (
    <>
      {items.map((item, idx) => (
        <div
          key={`debug-${item.element.id ?? idx}`}
          style={{
            ...buildGridItemStyle(item),
            outline: "1px dashed rgba(210,255,122,0.55)",
            background: "rgba(210,255,122,0.06)",
            minHeight: "2rem",
            position: "relative",
          }}
        >
          <div
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              fontSize: "10px",
              lineHeight: 1.1,
              padding: "2px 4px",
              color: "#d2ff7a",
              background: "rgba(0,0,0,0.65)",
              borderBottomRightRadius: "4px",
            }}
          >
            {item.element.id ?? `item-${idx}`}
          </div>
        </div>
      ))}
    </>
  );
}
