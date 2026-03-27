"use client";

import { useCallback, useRef, useState } from "react";
import { motion } from "@/page-builder/integrations/framer-motion";
import { useShouldReduceMotion } from "./reduced-motion";
import type { MotionTiming } from "@/page-builder/core/page-builder-schemas";

type MotionDivProps = React.ComponentProps<typeof motion.div>;

const ALIGN_TO_JUSTIFY: Record<"left" | "center" | "right", string> = {
  left: "flex-start",
  center: "center",
  right: "flex-end",
};
const ALIGN_Y_TO_ALIGN: Record<"top" | "center" | "bottom", string> = {
  top: "flex-start",
  center: "center",
  bottom: "flex-end",
};

export type ElementEntranceWrapperProps = {
  motionTiming?: MotionTiming;
  layoutFixed?: boolean;
  wrapperStyle?: React.CSSProperties;
  align?: "left" | "center" | "right";
  alignY?: "top" | "center" | "bottom";
  aria?: Record<string, string | boolean>;
  /** For trigger "onTrigger": external control of the animate state. */
  animateOverrideFromTrigger?: Record<string, unknown>;
  /** When false, ignore system reduced-motion preference for this element. */
  reduceMotion?: boolean;
  children: React.ReactNode;
};

/**
 * Entrance wrapper using Framer Motion's native APIs.
 * Motion config is pre-resolved server-side into motionTiming.resolvedEntranceMotion.
 *
 * SSR renders a plain <div> (no opacity:0 inline style) so the element is visible
 * in the static HTML. After hydration, useLayoutEffect swaps to motion.div before
 * the first browser paint — in-viewport elements skip the animation entirely,
 * below-fold elements get their entrance state applied before the user can see them.
 *
 * Triggers:
 *   onMount          → initial → animate on component mount
 *   onFirstVisible   → whileInView once (default)
 *   onEveryVisible   → whileInView every time
 *   onTrigger        → animate controlled by animateOverrideFromTrigger
 */
export function ElementEntranceWrapper({
  motionTiming,
  layoutFixed = false,
  wrapperStyle,
  align = "center",
  alignY = "center",
  aria,
  animateOverrideFromTrigger,
  reduceMotion,
  children,
}: ElementEntranceWrapperProps) {
  const skip = useShouldReduceMotion(reduceMotion === false);
  const ref = useRef<HTMLDivElement | null>(null);
  // null = pre-hydration (SSR) | false = hydrated, below fold | true = hydrated, in viewport on mount
  const [viewOnMount, setViewOnMount] = useState<boolean | null>(null);

  const setMountRef = useCallback(
    (el: HTMLDivElement | null) => {
      ref.current = el;
      if (!el || viewOnMount !== null) return;
      const rect = el.getBoundingClientRect();
      const inView = rect.top < window.innerHeight && rect.bottom > 0;
      setViewOnMount(inView);
    },
    [viewOnMount]
  );

  const resolved = motionTiming?.resolvedEntranceMotion;
  if (!resolved) return <>{children}</>;

  const { initial, animate, transition, viewportAmount, viewportOnce, whileHover, whileTap } =
    resolved;
  const trigger = motionTiming?.trigger ?? "onFirstVisible";

  const effectiveInitial = skip || viewOnMount === true ? animate : initial;
  const effectiveTransition = skip || viewOnMount === true ? { duration: 0 } : transition;

  const hasScaleGesture =
    (whileHover != null && "scale" in whileHover) || (whileTap != null && "scale" in whileTap);

  const containerStyle: React.CSSProperties = layoutFixed
    ? {
        position: "fixed",
        inset: 0,
        width: "100%",
        height: "100%",
        display: "flex",
        alignItems: ALIGN_Y_TO_ALIGN[alignY],
        justifyContent: ALIGN_TO_JUSTIFY[align],
        pointerEvents: "none",
      }
    : { ...wrapperStyle, ...(hasScaleGesture ? { overflow: "hidden" } : {}) };

  const innerFlexStyle: React.CSSProperties | undefined = layoutFixed
    ? {
        display: "flex",
        alignItems: ALIGN_Y_TO_ALIGN[alignY],
        justifyContent: ALIGN_TO_JUSTIFY[align],
        width: "100%",
        height: "100%",
        pointerEvents: "auto",
      }
    : undefined;

  const inner =
    layoutFixed && innerFlexStyle ? <div style={innerFlexStyle}>{children}</div> : children;

  // SSR + pre-hydration: plain div so the element is visible in the static HTML.
  // LCP is recorded immediately; no opacity:0 in the server-rendered output.
  if (viewOnMount === null) {
    return (
      <div ref={setMountRef} style={containerStyle} {...(aria as Record<string, string>)}>
        {inner}
      </div>
    );
  }

  const sharedProps = {
    ref: setMountRef,
    style: containerStyle,
    ...(aria as Record<string, unknown>),
  } as Partial<MotionDivProps>;

  if (trigger === "onMount") {
    return (
      <motion.div
        {...sharedProps}
        initial={effectiveInitial as MotionDivProps["initial"]}
        animate={animate as MotionDivProps["animate"]}
        transition={effectiveTransition as MotionDivProps["transition"]}
        whileHover={whileHover as MotionDivProps["whileHover"]}
        whileTap={whileTap as MotionDivProps["whileTap"]}
      >
        {inner}
      </motion.div>
    );
  }

  if (trigger === "onTrigger") {
    const animateState =
      animateOverrideFromTrigger && Object.keys(animateOverrideFromTrigger).length > 0
        ? animateOverrideFromTrigger
        : effectiveInitial;
    return (
      <motion.div
        {...sharedProps}
        initial={effectiveInitial as MotionDivProps["initial"]}
        animate={animateState as MotionDivProps["animate"]}
        transition={effectiveTransition as MotionDivProps["transition"]}
      >
        {inner}
      </motion.div>
    );
  }

  // Default: onFirstVisible / onEveryVisible — FM native whileInView
  return (
    <motion.div
      {...sharedProps}
      initial={effectiveInitial as MotionDivProps["initial"]}
      whileInView={animate as MotionDivProps["whileInView"]}
      viewport={{ once: viewportOnce, amount: viewportAmount }}
      transition={effectiveTransition as MotionDivProps["transition"]}
      whileHover={whileHover as MotionDivProps["whileHover"]}
      whileTap={whileTap as MotionDivProps["whileTap"]}
    >
      {inner}
    </motion.div>
  );
}
