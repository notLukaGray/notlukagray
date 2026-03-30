"use client";

import type { CSSProperties } from "react";
import type { CssInlineStyle, ElementBlock } from "@/page-builder/core/page-builder-schemas";
import { ElementRenderer } from "@/page-builder/elements/Shared/ElementRenderer";
import { generateElementKey } from "@/page-builder/core/element-keys";
import { LayoutMotionDiv } from "@/page-builder/integrations/framer-motion";
import {
  getChildWrapperLayoutStyle,
  getContainerWrapperStyle,
  shouldRenderChildWrapper,
} from "./element-module-style-utils";

type ElementModuleChildrenProps = {
  blocks: ElementBlock[];
  overlapGap?: string;
  flexDirection?: CSSProperties["flexDirection"];
  parentAlignItems?: CSSProperties["alignItems"];
  inDimensionGesture: boolean;
  isMobile: boolean;
  layoutChildren?: boolean;
  slotDefaultWrapper: Record<string, unknown>;
  getActionHandler?: (action: string | undefined, payload?: number) => (() => void) | undefined;
};

function mapCrossAxisPlacement(
  alignItems: CSSProperties["alignItems"]
): CSSProperties["justifyContent"] | CSSProperties["alignItems"] | undefined {
  if (alignItems === "center") return "center";
  if (alignItems === "flex-end" || alignItems === "end") return "flex-end";
  if (alignItems === "flex-start" || alignItems === "start") return "flex-start";
  return undefined;
}

export function ElementModuleChildren({
  blocks,
  overlapGap,
  flexDirection = "row",
  parentAlignItems = "center",
  inDimensionGesture,
  isMobile,
  layoutChildren,
  slotDefaultWrapper,
  getActionHandler,
}: ElementModuleChildrenProps) {
  return blocks.map((block, index) => {
    const key = generateElementKey(block, index);
    const action = (block as ElementBlock & { action?: string }).action;
    const actionPayload = (block as ElementBlock & { actionPayload?: number }).actionPayload;
    const handler = getActionHandler?.(action, actionPayload);
    const elWrapperStyle = (block as ElementBlock & { wrapperStyle?: CssInlineStyle }).wrapperStyle;
    const hasMotion = !!(block as ElementBlock & { motion?: unknown }).motion;
    const baseWrapperStyle = (
      handler
        ? { ...slotDefaultWrapper, ...(elWrapperStyle ?? {}) }
        : hasMotion
          ? {}
          : (elWrapperStyle ?? {})
    ) as CSSProperties;
    const wrapperStyle = getContainerWrapperStyle(baseWrapperStyle);
    const blockWidth = (block as ElementBlock & { width?: unknown }).width;
    const blockMaxWidth = (block as ElementBlock & { maxWidth?: unknown }).maxWidth;
    const blockHeight = (block as ElementBlock & { height?: unknown }).height;
    const blockMaxHeight = (block as ElementBlock & { maxHeight?: unknown }).maxHeight;
    const isConstrainedFullWidthChild =
      blockWidth === "100%" && typeof blockMaxWidth === "string" && blockMaxWidth.trim().length > 0;
    const isConstrainedFullHeightChild =
      blockHeight === "100%" &&
      typeof blockMaxHeight === "string" &&
      blockMaxHeight.trim().length > 0;
    const isColumnLikeParent = flexDirection === "column" || flexDirection === "column-reverse";
    const isRowLikeParent = flexDirection === "row" || flexDirection === "row-reverse";
    const crossAxisPlacement = mapCrossAxisPlacement(parentAlignItems);
    const shouldApplyConstrainedStretchPlacement =
      wrapperStyle.alignSelf === "stretch" &&
      crossAxisPlacement != null &&
      ((isColumnLikeParent && isConstrainedFullWidthChild) ||
        (isRowLikeParent && isConstrainedFullHeightChild));
    const cellStyleBase: CSSProperties = inDimensionGesture
      ? { width: "100%", height: "100%", ...wrapperStyle }
      : wrapperStyle;
    const cellLayoutStyle = getChildWrapperLayoutStyle(block, isMobile);
    const overlapOffsetStyle: CSSProperties =
      overlapGap && index > 0
        ? flexDirection === "column" || flexDirection === "column-reverse"
          ? { marginTop: overlapGap }
          : { marginLeft: overlapGap }
        : {};
    const constrainedStretchPlacementStyle: CSSProperties = shouldApplyConstrainedStretchPlacement
      ? isColumnLikeParent
        ? { display: "flex", justifyContent: crossAxisPlacement as CSSProperties["justifyContent"] }
        : { display: "flex", alignItems: crossAxisPlacement as CSSProperties["alignItems"] }
      : {};
    const wrapperFlex = wrapperStyle.flex;
    const hasFlexGrowWrapper = typeof wrapperFlex === "string" && /^\s*\d/.test(wrapperFlex);
    const isClippedGroupWithoutExplicitHeight =
      block.type === "elementGroup" &&
      (block as ElementBlock & { overflow?: unknown }).overflow === "hidden" &&
      (blockHeight == null || blockHeight === "fit-content");
    const clippedFlexContainStyle: CSSProperties =
      hasFlexGrowWrapper && isClippedGroupWithoutExplicitHeight
        ? {
            display: constrainedStretchPlacementStyle.display ?? "flex",
            alignItems:
              (constrainedStretchPlacementStyle.alignItems as CSSProperties["alignItems"]) ??
              "stretch",
          }
        : {};
    const cellStyle: CSSProperties = {
      ...cellLayoutStyle,
      ...cellStyleBase,
      ...overlapOffsetStyle,
      ...constrainedStretchPlacementStyle,
      ...clippedFlexContainStyle,
    };
    const content = <ElementRenderer key={key} block={block} />;

    if (handler) {
      return (
        <button
          key={key}
          type="button"
          onClick={(event) => {
            event.stopPropagation();
            handler();
          }}
          className="shrink-0 min-w-0 text-white rounded focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
          style={{ cursor: "pointer", ...cellStyle }}
          aria-label={action ?? "Control"}
        >
          {content}
        </button>
      );
    }

    if (layoutChildren) {
      return (
        <LayoutMotionDiv key={key} className="shrink-0 min-w-0" style={cellStyle}>
          {content}
        </LayoutMotionDiv>
      );
    }

    const needsWrapperForOverlap = !!(overlapGap && index > 0);
    if (
      !needsWrapperForOverlap &&
      !shouldRenderChildWrapper({
        hasHandler: false,
        layoutChildren: false,
        style: cellStyle,
      })
    ) {
      return content;
    }

    return (
      <div key={key} className="shrink-0 min-w-0" style={cellStyle}>
        {content}
      </div>
    );
  });
}
