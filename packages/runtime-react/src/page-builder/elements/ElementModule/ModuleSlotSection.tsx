"use client";

import { useMemo } from "react";
import type { CSSProperties } from "react";
import type {
  ElementBlock,
  MotionPropsFromJson,
} from "@pb/contracts/page-builder/core/page-builder-schemas";
import { uiVideoFeedbackDurationMs } from "@pb/runtime-react/core/lib/globals";
import {
  MOTION_DEFAULTS,
  mergeMotionDefaults,
  getEntranceMotionFromPreset,
} from "@pb/contracts/page-builder/core/page-builder-motion-defaults";
import { resolveSlotElements, getModuleSlotBaseStyle } from "@pb/core/internal/module-slot-utils";
import { MotionFromJson } from "@/page-builder/integrations/framer-motion";
import { useSlotGestures } from "@/page-builder/hooks/use-slot-gestures";
import { ModuleSlotFeedback } from "./ModuleSlotFeedback";
import { ModuleSlotContent } from "./ModuleSlotContent";
import type { ModuleSlotConfig } from "./types";

export { useSlotDefaultWrapperStyle } from "./ModuleSlotContext";

export { resolveSlotElements } from "@pb/core/internal/module-slot-utils";

export type ModuleSlotSectionProps = {
  slot: ModuleSlotConfig;
  isSlotVisible: boolean;
  useHugLayout: boolean;
  resolveShowWhen: (showWhen: string | undefined) => boolean;
  getActionHandler: (action: string | undefined, payload?: number) => (() => void) | undefined;
  feedback: { type: string; at: number } | null;
  showFeedback?: (type: string) => void;
  defaultTransitionMs?: number;
  defaultTransitionEasing?: string;
  /** When set to "auto", slot uses pointer-events: auto when visible (e.g. when in a non-scaling layer so it receives clicks). */
  pointerEventsWhenVisible?: "auto";
  /** Optional style override merged over the slot base style (e.g. fullscreen bottom bar full width). */
  slotStyleOverride?: CSSProperties;
  /** For console logs only (e.g. "bottomBar"). */
  debugSlotKey?: string;
};

export function ModuleSlotSection({
  slot,
  isSlotVisible,
  useHugLayout,
  resolveShowWhen,
  getActionHandler,
  feedback,
  showFeedback,
  defaultTransitionMs,
  defaultTransitionEasing,
  pointerEventsWhenVisible,
  slotStyleOverride,
}: ModuleSlotSectionProps) {
  const rawElements = useMemo(() => resolveSlotElements(slot), [slot]);
  const elements = useMemo(
    () =>
      rawElements.filter((el) =>
        resolveShowWhen((el as ElementBlock & { showWhen?: string }).showWhen)
      ),
    [rawElements, resolveShowWhen]
  );

  const expandDurationMs = slot.expandDurationMs ?? MOTION_DEFAULTS.transition.duration * 1000;
  const elementRevealMs = slot.elementRevealMs ?? MOTION_DEFAULTS.transition.duration * 1000;
  const elementRevealStaggerMs =
    slot.elementRevealStaggerMs ?? MOTION_DEFAULTS.transition.staggerDelay * 1000;
  const durationMs =
    slot.transition?.durationMs ??
    defaultTransitionMs ??
    MOTION_DEFAULTS.transition.duration * 1000;
  const easing =
    slot.transition?.easing ?? defaultTransitionEasing ?? MOTION_DEFAULTS.transition.ease;
  const slotActionHandler = slot.action ? getActionHandler(slot.action, undefined) : undefined;

  const { handlePointerDown, handlePointerUp, hasTapHandler } = useSlotGestures({
    gestures: slot.gestures,
    getActionHandler,
    showFeedback,
    slotActionHandler,
  });

  const hasReveal = elementRevealMs > 0 && elementRevealStaggerMs >= 0 && !useHugLayout;

  const feedbackSlot = slot.feedbackSlot;
  const feedbackMap = slot.feedbackMap;
  const feedbackDurationMs =
    slot.feedbackDurationMs ??
    uiVideoFeedbackDurationMs ??
    MOTION_DEFAULTS.defaultFeedbackDurationMs;

  const slotStyle = useMemo(() => {
    const base = getModuleSlotBaseStyle({
      slot,
      useHugLayout,
      durationMs,
      easing,
      expandDurationMs,
      hasLayoutTransition: useHugLayout || !!slot.layoutMode,
    });
    return slotStyleOverride ? { ...base, ...slotStyleOverride } : base;
  }, [slot, useHugLayout, durationMs, easing, expandDurationMs, slotStyleOverride]);

  const slotMotion = useMemo((): MotionPropsFromJson => {
    const slotMotionFromJson = slot.motion;
    const visibilityPreset = slot.visibilityPreset;
    let out: MotionPropsFromJson;
    if (
      slotMotionFromJson &&
      typeof slotMotionFromJson === "object" &&
      (slotMotionFromJson.initial != null || slotMotionFromJson.animate != null)
    ) {
      const merged = mergeMotionDefaults(slotMotionFromJson) ?? {};
      out = {
        ...merged,
        transition: {
          ...(typeof merged.transition === "object" && merged.transition ? merged.transition : {}),
          duration: durationMs / 1000,
          ease: easing,
        },
      };
    } else if (visibilityPreset && typeof visibilityPreset === "string") {
      const fromPreset = getEntranceMotionFromPreset(visibilityPreset, {
        distancePx: 0,
        duration: durationMs / 1000,
        delay: 0,
        ease: easing,
      });
      out = mergeMotionDefaults(fromPreset) ?? {};
    } else {
      const mc = MOTION_DEFAULTS.motionComponent;
      const fallback =
        mergeMotionDefaults({
          initial: mc.initial as Record<string, string | number | number[]>,
          animate: mc.animate as Record<string, string | number | number[]>,
          transition: { duration: durationMs / 1000, ease: easing },
        }) ?? {};
      out = fallback as MotionPropsFromJson;
    }

    const wm = slot.wrapperMotion;
    if (wm != null && typeof wm === "object") {
      out = { ...out };
      const o = out as Record<string, unknown>;
      if (wm.whileHover !== undefined) o.whileHover = wm.whileHover;
      if (wm.whileTap !== undefined) o.whileTap = wm.whileTap;
      if (wm.whileFocus !== undefined) o.whileFocus = wm.whileFocus;
    }

    return out;
  }, [slot, durationMs, easing]);

  if (feedbackSlot) {
    if (!feedback || !feedbackMap) return null;
    return (
      <ModuleSlotFeedback
        slot={slot}
        feedback={feedback}
        feedbackMap={feedbackMap}
        feedbackDurationMs={feedbackDurationMs}
      />
    );
  }

  const styleWithCursor: CSSProperties = slotActionHandler
    ? { ...slotStyle, cursor: "pointer" }
    : slotStyle;
  const tapHandlerStyle: CSSProperties = hasTapHandler
    ? {
        userSelect: "none",
        WebkitUserSelect: "none",
        WebkitTapHighlightColor: "transparent",
        touchAction: "manipulation",
      }
    : {};
  const isHidden = !isSlotVisible;

  const defaultWrapperStyle = slot.defaultWrapperStyle ?? {};
  const slotDefinitions = slot.section?.definitions ?? null;

  return (
    <MotionFromJson
      motion={slotMotion}
      animateOverride={{ opacity: isSlotVisible ? 1 : 0 }}
      style={{
        ...styleWithCursor,
        ...tapHandlerStyle,
        pointerEvents: isSlotVisible ? (pointerEventsWhenVisible ?? undefined) : "none",
      }}
      onPointerDown={hasTapHandler ? handlePointerDown : undefined}
      onPointerUp={hasTapHandler ? handlePointerUp : undefined}
      onPointerCancel={hasTapHandler ? handlePointerUp : undefined}
      role={slotActionHandler ? "button" : undefined}
      aria-label={slotActionHandler ? slot.action : undefined}
      aria-hidden={isHidden ? "true" : "false"}
      inert={isHidden}
    >
      <ModuleSlotContent
        elements={elements}
        getActionHandler={getActionHandler}
        slotDefinitions={slotDefinitions}
        defaultWrapperStyle={defaultWrapperStyle}
        hasReveal={hasReveal}
        elementRevealMs={elementRevealMs}
        elementRevealStaggerMs={elementRevealStaggerMs}
        easing={easing}
        revealPreset={slot.revealPreset}
      />
    </MotionFromJson>
  );
}
