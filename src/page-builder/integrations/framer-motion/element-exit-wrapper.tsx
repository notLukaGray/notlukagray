"use client";

import { useMemo } from "react";
import { AnimatePresence, MotionFromJson } from "@/page-builder/integrations/framer-motion";
import {
  MOTION_DEFAULTS,
  mergeMotionDefaults,
  getExitMotionFromPreset,
} from "@/page-builder/core/page-builder-motion-defaults";
import type { MotionPropsFromJson, MotionTiming } from "@/page-builder/core/page-builder-schemas";

export type ElementExitWrapperProps = {
  /** When false, child unmounts after exit animation. */
  show: boolean;
  /** Optional full motion config from JSON (initial, animate, exit, transition). When set, exit and transition come from here. */
  motion?: MotionPropsFromJson;
  /** Explicit entrance/exit semantics; exitPreset and exitMotion override legacy exitPreset/motion when set. */
  motionTiming?: MotionTiming;
  /** Optional preset name (from framer-motion-presets exitPresets) for exit keyframes. Ignored when motion.exit or motionTiming.exitMotion is set. */
  exitPreset?: string;
  /** Exit duration in seconds. Used when exitPreset is set and motion.transition is not. */
  exitDuration?: number;
  /** Exit easing. Used when exitPreset is set. */
  exitEasing?: string | [number, number, number, number];
  /** Stable unique key for AnimatePresence child. Required when multiple exit wrappers are siblings to avoid shared key bugs. */
  exitKey?: string;
  children: React.ReactNode;
};

/**
 * Wraps content in AnimatePresence + MotionFromJson. When show becomes false, exit animation
 * runs from motion.exit, exitPreset, or motionComponent.exit (motion-defaults).
 */
export function ElementExitWrapper({
  show,
  motion: motionFromJson,
  motionTiming,
  exitPreset,
  exitDuration = MOTION_DEFAULTS.transition.exitDuration ?? MOTION_DEFAULTS.transition.duration,
  exitEasing = MOTION_DEFAULTS.transition.ease,
  exitKey = "element-exit",
  children,
}: ElementExitWrapperProps) {
  const effectiveExitPreset = motionTiming?.exitPreset ?? exitPreset;
  const effectiveExitMotion = motionTiming?.exitMotion ?? motionFromJson;

  const motionConfig = useMemo<MotionPropsFromJson>(() => {
    const hasMotionExit =
      effectiveExitMotion != null &&
      typeof effectiveExitMotion === "object" &&
      (effectiveExitMotion as MotionPropsFromJson)?.exit != null;
    if (hasMotionExit && effectiveExitMotion != null) {
      return (
        mergeMotionDefaults(effectiveExitMotion as MotionPropsFromJson) ??
        ({} as MotionPropsFromJson)
      );
    }
    if (effectiveExitPreset && typeof effectiveExitPreset === "string") {
      const { exit, transition } = getExitMotionFromPreset(effectiveExitPreset, {
        duration: exitDuration,
        ease: exitEasing,
      });
      return (
        mergeMotionDefaults({
          initial: ((MOTION_DEFAULTS.motionComponent.animate as Record<string, unknown>) ?? {
            opacity: 1,
          }) as Record<string, string | number | number[]>,
          animate: MOTION_DEFAULTS.motionComponent.animate as Record<
            string,
            string | number | number[]
          >,
          exit: exit as Record<string, string | number | number[]>,
          transition,
        } as MotionPropsFromJson) ?? ({} as MotionPropsFromJson)
      );
    }
    const mc = MOTION_DEFAULTS.motionComponent;
    const exitTransition = { type: "tween" as const, duration: exitDuration, ease: exitEasing };
    return (
      mergeMotionDefaults({
        initial: mc.animate as Record<string, string | number | number[]>,
        animate: mc.animate as Record<string, string | number | number[]>,
        exit: (mc.exit as Record<string, string | number | number[]>) ?? { opacity: 0 },
        transition: exitTransition,
      } as MotionPropsFromJson) ?? ({} as MotionPropsFromJson)
    );
  }, [effectiveExitMotion, effectiveExitPreset, exitDuration, exitEasing]);

  return (
    <AnimatePresence>
      {show && (
        <MotionFromJson key={exitKey} motion={motionConfig}>
          {children}
        </MotionFromJson>
      )}
    </AnimatePresence>
  );
}
