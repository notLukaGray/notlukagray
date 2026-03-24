/**
 * Pure module-slot helpers. No React, no DOM (except getRegionFromClientX which takes el for rect).
 * Used by ModuleSlotSection and useSlotGestures; unit-testable.
 */

import type React from "react";
import type { ElementBlock } from "@/page-builder/core/page-builder-schemas";
import type { ModuleSlotConfig } from "@/page-builder/elements/ElementModule/types";

/** Resolves slot section definitions into ElementBlocks. Shared across video, image, model3d modules. */
export function resolveSlotElements(slot: ModuleSlotConfig): ElementBlock[] {
  const section = slot.section;
  if (!section?.definitions) return [];
  const order = section.elementOrder ?? Object.keys(section.definitions);
  return order
    .map((key) => {
      const el = section.definitions![key];
      if (!el || typeof el !== "object" || !("type" in el) || el.type === "cssGradient")
        return null;
      const withId = !("id" in el) || !el.id ? { ...el, id: key } : el;
      return withId as ElementBlock;
    })
    .filter((x): x is ElementBlock => x != null);
}

export type SlotRegion = "left" | "center" | "right";

/** Region from clientX relative to element width (thirds). */
export function getRegionFromClientX(clientX: number, el: HTMLElement): SlotRegion {
  const rect = el.getBoundingClientRect();
  const x = (clientX - rect.left) / rect.width;
  if (x < 1 / 3) return "left";
  if (x > 2 / 3) return "right";
  return "center";
}

/** Justify-content for feedback overlay by feedback type. */
export function getFeedbackJustifyContent(
  feedbackType: string
): "flex-start" | "flex-end" | "center" {
  if (feedbackType === "seekBack") return "flex-start";
  if (feedbackType === "seekForward") return "flex-end";
  return "center";
}

/** Padding for feedback overlay by feedback type. */
export function getFeedbackPadding(feedbackType: string): string {
  if (feedbackType === "seekBack") return "0 0 0 15%";
  if (feedbackType === "seekForward") return "0 15% 0 0";
  return "0";
}

/** Infer feedback type for seek action from payload. */
export function inferSeekFeedbackType(
  payload: number | undefined
): "seekBack" | "seekForward" | undefined {
  if (payload == null) return undefined;
  return payload < 0 ? "seekBack" : "seekForward";
}

export type ModuleSlotBaseStyleParams = {
  slot: ModuleSlotConfig;
  useHugLayout: boolean;
  durationMs: number;
  easing: string;
  expandDurationMs: number;
  hasLayoutTransition: boolean;
};

/** Build base slot style (position, flex, transition). Caller merges visibility/cursor. */
export function getModuleSlotBaseStyle({
  slot,
  useHugLayout,
  durationMs,
  easing,
  expandDurationMs,
  hasLayoutTransition,
}: ModuleSlotBaseStyleParams): React.CSSProperties {
  const position = (slot.position as React.CSSProperties["position"]) ?? "absolute";
  const positionStyles: React.CSSProperties = {
    position,
    ...(slot.inset && !useHugLayout ? { inset: slot.inset } : {}),
    ...(slot.top ? { top: slot.top } : {}),
    ...(useHugLayout
      ? { left: "50%", right: "auto", transform: "translateX(-50%)", width: "fit-content" }
      : slot.left || slot.right
        ? {
            ...(slot.left ? { left: slot.left } : {}),
            ...(slot.right ? { right: slot.right } : {}),
          }
        : {}),
    ...(slot.bottom ? { bottom: slot.bottom } : {}),
    ...(slot.zIndex != null ? { zIndex: slot.zIndex } : {}),
  };
  const transitionParts = [
    `opacity ${durationMs}ms ${easing}`,
    hasLayoutTransition
      ? `left ${expandDurationMs}ms ${easing}, right ${expandDurationMs}ms ${easing}, transform ${expandDurationMs}ms ${easing}, width ${expandDurationMs}ms ${easing}`
      : "",
  ].filter(Boolean);
  return {
    ...positionStyles,
    display: (slot.display as React.CSSProperties["display"]) ?? "flex",
    flexDirection: (slot.flexDirection as React.CSSProperties["flexDirection"]) ?? "row",
    alignItems: (slot.alignItems as React.CSSProperties["alignItems"]) ?? "center",
    justifyContent: (slot.justifyContent as React.CSSProperties["justifyContent"]) ?? "center",
    gap: slot.gap,
    padding: slot.padding,
    transition: transitionParts.join(", "),
    ...(slot.style as React.CSSProperties),
  };
}
