"use client";

import { useEffect, useEffectEvent, useRef } from "react";
import type { SectionBlock } from "@pb/contracts/page-builder/core/page-builder-schemas";
import { useSectionBaseStyles } from "@/page-builder/section/position/use-section-base-styles";
import { firePageBuilderTrigger, firePageBuilderProgressTrigger } from "./core/trigger-event";
import { useSectionScrollProgress } from "@/page-builder/section/position/use-section-scroll-progress";
import { useSectionCustomTriggers } from "@/page-builder/triggers/core/use-section-custom-triggers";
import { SectionMotionWrapper } from "@/page-builder/integrations/framer-motion";

type Props = Extract<SectionBlock, { type: "sectionTrigger" }>;

export function PageTrigger({
  id,
  onVisible,
  onInvisible,
  onProgress,
  onViewportProgress,
  threshold = 0,
  triggerOnce = false,
  rootMargin,
  delay,
  width,
  height = "1px",
  align,
  marginLeft,
  marginRight,
  marginTop,
  marginBottom,
  initialX,
  initialY,
  motion: motionFromJson,
  keyboardTriggers,
  timerTriggers,
  cursorTriggers,
  scrollDirectionTriggers,
  idleTriggers,
}: Props) {
  const sentinelRef = useRef<HTMLElement>(null);
  const hasFiredVisibleOnce = useRef(false);
  const pendingTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);
  const lastViewportProgressRef = useRef<number | null>(null);
  const hasVisibleTrigger = onVisible != null;
  const hasInvisibleTrigger = onInvisible != null;
  const hasViewportProgressTrigger = onViewportProgress != null;
  const fireVisibleAction = useEffectEvent(() => {
    if (onVisible) firePageBuilderTrigger(true, onVisible, id);
  });
  const fireInvisibleAction = useEffectEvent(() => {
    if (onInvisible) firePageBuilderTrigger(false, onInvisible, id);
  });
  const fireViewportProgressAction = useEffectEvent((ratio: number) => {
    if (onViewportProgress) firePageBuilderProgressTrigger(ratio, onViewportProgress, id);
  });

  useSectionCustomTriggers({
    keyboardTriggers,
    timerTriggers,
    cursorTriggers,
    scrollDirectionTriggers,
    idleTriggers,
  });

  // Handle scroll progress tracking
  useSectionScrollProgress({
    sectionRef: sentinelRef,
    onProgress: onProgress
      ? (progress) => {
          firePageBuilderProgressTrigger(progress, onProgress, id);
        }
      : undefined,
  });

  const { baseStyle } = useSectionBaseStyles({
    fill: undefined,
    layers: undefined,
    effects: undefined,
    width,
    height,
    align,
    marginLeft,
    marginRight,
    marginTop,
    marginBottom,
    borderRadius: undefined,
    border: undefined,
    scrollSpeed: 1,
    initialX,
    initialY,
    sectionRef: sentinelRef,
    usePadding: false,
  });

  useEffect(() => {
    const el = sentinelRef.current;
    if (
      !el ||
      (!hasVisibleTrigger && !hasInvisibleTrigger && !onProgress && !hasViewportProgressTrigger)
    ) {
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (hasViewportProgressTrigger) {
            const ratio = entry.intersectionRatio;
            if (
              lastViewportProgressRef.current === null ||
              Math.abs(ratio - lastViewportProgressRef.current) > 0.001
            ) {
              lastViewportProgressRef.current = ratio;
              fireViewportProgressAction(ratio);
            }
          }

          const visible = entry.isIntersecting;

          if (pendingTimeout.current != null) {
            clearTimeout(pendingTimeout.current);
            pendingTimeout.current = null;
          }

          if (visible) {
            if (hasVisibleTrigger) {
              if (triggerOnce && hasFiredVisibleOnce.current) return;
              if (triggerOnce) hasFiredVisibleOnce.current = true;
              const ms = delay ?? 0;
              if (ms > 0) {
                pendingTimeout.current = setTimeout(() => {
                  pendingTimeout.current = null;
                  fireVisibleAction();
                }, ms);
              } else {
                fireVisibleAction();
              }
            }
          } else {
            if (hasInvisibleTrigger) {
              const ms = delay ?? 0;
              if (ms > 0) {
                pendingTimeout.current = setTimeout(() => {
                  pendingTimeout.current = null;
                  fireInvisibleAction();
                }, ms);
              } else {
                fireInvisibleAction();
              }
            }
          }
        }
      },
      {
        threshold: hasViewportProgressTrigger
          ? Array.from({ length: 101 }, (_, i) => i / 100)
          : threshold,
        rootMargin: rootMargin ?? undefined,
      }
    );

    observer.observe(el);
    return () => {
      if (pendingTimeout.current != null) clearTimeout(pendingTimeout.current);
      observer.disconnect();
      lastViewportProgressRef.current = null;
    };
  }, [
    id,
    onProgress,
    threshold,
    triggerOnce,
    rootMargin,
    delay,
    hasVisibleTrigger,
    hasInvisibleTrigger,
    hasViewportProgressTrigger,
  ]);

  return (
    <SectionMotionWrapper
      sectionRef={sentinelRef}
      motion={motionFromJson}
      className="pointer-events-none invisible shrink-0"
      style={{ ...baseStyle, visibility: "hidden", minHeight: 0 }}
      aria-hidden
    >
      {null}
    </SectionMotionWrapper>
  );
}
