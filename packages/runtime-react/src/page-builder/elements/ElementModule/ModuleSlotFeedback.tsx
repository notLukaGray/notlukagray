"use client";

import type { CSSProperties } from "react";
import type {
  CssInlineStyle,
  ElementBlock,
} from "@pb/contracts/page-builder/core/page-builder-schemas";
import { uiVideoFeedbackDurationMs } from "@pb/runtime-react/core/lib/globals";
import { ElementRenderer } from "@/page-builder/elements/Shared/ElementRenderer";
import { getFeedbackJustifyContent, getFeedbackPadding } from "@pb/core/internal/module-slot-utils";
import type { ModuleSlotConfig } from "./types";
import { usePageBuilderThemeMode } from "@/page-builder/theme/use-page-builder-theme-mode";
import { resolveThemeStyleObject } from "@/page-builder/theme/theme-string";

export type ModuleSlotFeedbackProps = {
  slot: ModuleSlotConfig;
  feedback: { type: string; at: number };
  feedbackMap: Record<string, string>;
  feedbackDurationMs?: number;
};

export function ModuleSlotFeedback({
  slot,
  feedback,
  feedbackMap,
  feedbackDurationMs = uiVideoFeedbackDurationMs,
}: ModuleSlotFeedbackProps) {
  const themeMode = usePageBuilderThemeMode();
  const elementKey = feedbackMap[feedback.type];
  if (!elementKey) return null;
  const section = slot.section;
  const def = section?.definitions?.[elementKey];
  if (!def || typeof def !== "object" || !("type" in def)) return null;
  const block = "id" in def && def.id ? def : { ...def, id: elementKey };
  const wrapperStyle = (block as ElementBlock & { wrapperStyle?: CssInlineStyle }).wrapperStyle;
  const feedbackChrome = slot.feedbackChromeStyle;
  const mergedStyle: CSSProperties = {
    ...(resolveThemeStyleObject(feedbackChrome, themeMode) as CSSProperties),
    ...(resolveThemeStyleObject(wrapperStyle, themeMode) as CSSProperties),
  };
  const justifyContent = getFeedbackJustifyContent(feedback.type);
  const padding = getFeedbackPadding(feedback.type);

  return (
    <div
      style={{
        position: (slot.position as CSSProperties["position"]) ?? "absolute",
        ...(slot.inset ? { inset: slot.inset } : {}),
        ...(slot.top ? { top: slot.top } : {}),
        ...(slot.left ? { left: slot.left } : {}),
        ...(slot.right ? { right: slot.right } : {}),
        ...(slot.bottom ? { bottom: slot.bottom } : {}),
        ...(slot.zIndex != null ? { zIndex: slot.zIndex } : {}),
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent,
        padding,
        pointerEvents: "none",
        animation: `touch-feedback-flash ${feedbackDurationMs}ms ease forwards`,
        ...(resolveThemeStyleObject(slot.style, themeMode) as CSSProperties),
      }}
      aria-hidden="false"
    >
      <div className="shrink-0 flex items-center justify-center" style={mergedStyle}>
        <ElementRenderer key={elementKey} block={block as ElementBlock} />
      </div>
    </div>
  );
}
