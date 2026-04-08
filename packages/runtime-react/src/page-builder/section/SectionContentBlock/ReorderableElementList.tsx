"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import type { ElementBlock, SectionDefinitionBlock } from "@pb/core/internal/page-builder-schemas";
import { generateElementKey } from "@pb/core/internal/element-keys";
import { ElementErrorBoundary } from "@/page-builder/SectionErrorBoundary";
import { ElementRenderer } from "@/page-builder/elements/Shared/ElementRenderer";
import { ReorderGroup, ReorderItem } from "@/page-builder/integrations/framer-motion";
import { SectionDefinitionsContext } from "@/page-builder/elements/ElementModule/ModuleSlotContext";

type Props = {
  elements: ElementBlock[];
  sectionDefinitions?: Record<string, SectionDefinitionBlock>;
  /** "y" (default) or "x" for reorder axis */
  axis?: "x" | "y";
  /** Default draggable unit: "frame" (outer layout container) or "content". Frame is the default so the whole card/row is dragged. */
  dragUnit?: "frame" | "content";
  /** Default drag behavior: "elasticSnap" (elastic + snap to slot), "free", or "none". */
  dragBehavior?: "elasticSnap" | "free" | "none";
  /** Called when order changes so the parent can persist (e.g. to elementOrder / form). */
  onOrderChange?: (order: string[]) => void;
};

/** Frame wrapper for each reorder item. Width is fit-content so the column can be centered by the parent. */
const reorderItemFrameStyle: React.CSSProperties = {
  position: "relative",
  width: "fit-content",
  minHeight: 0,
};

/** Renders a list of elements as Framer Motion Reorder.Group/Item. Default draggable unit is the frame (outer container). */
export function ReorderableElementList({
  elements,
  sectionDefinitions,
  axis = "y",
  dragUnit = "frame",
  dragBehavior = "elasticSnap",
  onOrderChange,
}: Props) {
  const initialOrder = useMemo(
    () => elements.map((block, i) => generateElementKey(block, i)),
    [elements]
  );
  const [order, setOrder] = useState<string[]>(initialOrder);

  useEffect(() => {
    setOrder(initialOrder);
  }, [initialOrder]);

  const handleReorder = useCallback(
    (newOrder: string[]) => {
      setOrder(newOrder);
      onOrderChange?.(newOrder);
    },
    [onOrderChange]
  );

  const keyToBlock = useMemo(() => {
    const map: Record<string, ElementBlock> = {};
    elements.forEach((el, i) => {
      const key = generateElementKey(el, i);
      map[key] = el;
    });
    return map;
  }, [elements]);

  const { dragEnabled } = useMemo(() => {
    if (dragBehavior === "none") return { dragEnabled: false };
    if (dragBehavior === "elasticSnap") {
      return {
        dragEnabled: true,
      };
    }
    return { dragEnabled: true };
  }, [dragBehavior]);

  const groupStyle: React.CSSProperties = {
    display: "flex",
    flexDirection: axis === "y" ? "column" : "row",
    gap: 0,
    listStyle: "none",
    margin: 0,
    padding: 0,
    ...(axis === "y" ? { alignItems: "center" } : {}),
  };

  return (
    <SectionDefinitionsContext.Provider value={sectionDefinitions ?? null}>
      <ReorderGroup axis={axis} values={order} onReorder={handleReorder} style={groupStyle}>
        {order.map((key) => {
          const block = keyToBlock[key];
          if (!block) return null;
          const content = (
            <ElementErrorBoundary elementKey={key}>
              <ElementRenderer block={block} />
            </ElementErrorBoundary>
          );
          return (
            <ReorderItem
              key={key}
              value={key}
              style={reorderItemFrameStyle}
              drag={dragEnabled}
              dragBehavior={dragBehavior}
            >
              {dragUnit === "frame" ? <div style={reorderItemFrameStyle}>{content}</div> : content}
            </ReorderItem>
          );
        })}
      </ReorderGroup>
    </SectionDefinitionsContext.Provider>
  );
}
