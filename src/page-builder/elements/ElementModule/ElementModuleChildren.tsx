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
  inDimensionGesture: boolean;
  isMobile: boolean;
  layoutChildren?: boolean;
  slotDefaultWrapper: Record<string, unknown>;
  getActionHandler?: (action: string | undefined, payload?: number) => (() => void) | undefined;
};

export function ElementModuleChildren({
  blocks,
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
    const cellStyleBase: CSSProperties = inDimensionGesture
      ? { width: "100%", height: "100%", ...wrapperStyle }
      : wrapperStyle;
    const cellLayoutStyle = getChildWrapperLayoutStyle(block, isMobile);
    const cellStyle: CSSProperties = { ...cellLayoutStyle, ...cellStyleBase };
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

    if (
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
