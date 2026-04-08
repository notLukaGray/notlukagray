"use client";

import { useLayoutEffect, useState } from "react";
import {
  getDefaultScrollSpeed,
  parseCssValueToPixels,
  computeParallaxOffset,
} from "@pb/core/internal/section-utils";
import { useScrollContainerRef } from "./use-scroll-container";
import { useScroll } from "@/page-builder/integrations/framer-motion/triggers";
import {
  useMotionValue,
  useMotionValueEvent,
  useTransform,
} from "@/page-builder/integrations/framer-motion/motion-values";
import { useShouldReduceMotion } from "@/page-builder/integrations/framer-motion/reduced-motion";

export type UseSectionParallaxOptions = {
  /** When false, ignore system reduced-motion preference (e.g. section has reduceMotion: false). */
  respectReducedMotion?: boolean;
};

/** Parallax transform Y from scroll position via useScroll + useTransform (hardware-accelerated). */
export function useSectionParallax(
  scrollSpeed: number = getDefaultScrollSpeed(),
  initialY?: string,
  sectionRef?: React.RefObject<HTMLElement | null>,
  options?: UseSectionParallaxOptions
) {
  const containerRef = useScrollContainerRef();
  const defaultSpeed = getDefaultScrollSpeed();
  const basePosition = parseCssValueToPixels(initialY, true);
  const respectReducedMotion = options?.respectReducedMotion !== false;
  const shouldReduceMotion = useShouldReduceMotion(!respectReducedMotion);

  const { scrollY } = useScroll({
    container: containerRef ?? undefined,
  });

  const sectionTopMotion = useMotionValue(0);

  useLayoutEffect(() => {
    const container = containerRef?.current ?? null;
    const section = sectionRef?.current ?? null;
    if (!container || !section || scrollSpeed === defaultSpeed || shouldReduceMotion) return;

    const updateSectionTop = () => {
      const containerRect = container.getBoundingClientRect();
      const sectionRect = section.getBoundingClientRect();
      const sectionTop = sectionRect.top - containerRect.top + container.scrollTop;
      sectionTopMotion.set(sectionTop);
    };

    updateSectionTop();
    const ro = new ResizeObserver(updateSectionTop);
    ro.observe(container);
    return () => ro.disconnect();
  }, [containerRef, sectionRef, scrollSpeed, defaultSpeed, sectionTopMotion, shouldReduceMotion]);

  const parallaxY = useTransform(
    [scrollY, sectionTopMotion],
    ([scrollTop, sectionTop]: number[]) => {
      if (scrollSpeed === defaultSpeed || shouldReduceMotion) return 0;
      return computeParallaxOffset(typeof scrollTop === "number" ? scrollTop : 0, {
        scrollSpeed,
        defaultScrollSpeed: defaultSpeed,
        basePosition,
        sectionTop: typeof sectionTop === "number" ? sectionTop : 0,
      });
    }
  );

  const [transformY, setTransformY] = useState(() => parallaxY.get());
  useMotionValueEvent(parallaxY, "change", (v) => setTransformY(v));

  if (!containerRef || scrollSpeed === defaultSpeed || shouldReduceMotion) {
    return 0;
  }
  return transformY;
}
