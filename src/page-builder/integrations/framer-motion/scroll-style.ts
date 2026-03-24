"use client";

import { useState, useCallback } from "react";
import type { CSSProperties, RefObject } from "react";
import { useSectionScrollProgressFM } from "./section-scroll-progress";
import { useShouldReduceMotion } from "./reduced-motion";

export type ScrollOpacityRange = {
  /** Input progress range (0–1) where the mapping applies. Defaults to [0, 1]. */
  input?: [number, number];
  /** Output opacity range (0–1). Defaults to [0, 1]. */
  output?: [number, number];
};

function clamp01(value: number): number {
  if (!Number.isFinite(value)) return 0;
  if (value < 0) return 0;
  if (value > 1) return 1;
  return value;
}

export type UseSectionScrollOpacityStyleOptions = {
  /** When false, ignore system reduced-motion preference (e.g. section has reduceMotion: false). */
  respectReducedMotion?: boolean;
};

/**
 * Maps section scroll progress (0–1) to an opacity style using useSectionScrollProgressFM.
 * Returns a CSSProperties fragment that can be merged into section style.
 */
export function useSectionScrollOpacityStyle(
  sectionRef: RefObject<HTMLElement | null>,
  range?: ScrollOpacityRange,
  options?: UseSectionScrollOpacityStyleOptions
): CSSProperties | undefined {
  const [opacity, setOpacity] = useState<number | null>(null);
  const respectReducedMotion = options?.respectReducedMotion !== false;
  const shouldReduceMotion = useShouldReduceMotion(!respectReducedMotion);

  const handleProgress = useCallback(
    (progress: number) => {
      if (!range || shouldReduceMotion) return;
      const [inStart, inEnd] = range.input ?? [0, 1];
      const [outStart, outEnd] = range.output ?? [0, 1];

      const inputSpan = inEnd - inStart || 1;
      const normalized = clamp01((progress - inStart) / inputSpan);
      const value = outStart + (outEnd - outStart) * normalized;
      setOpacity(value);
    },
    [range, shouldReduceMotion]
  );

  useSectionScrollProgressFM({
    sectionRef,
    onProgress: range && !shouldReduceMotion ? handleProgress : undefined,
  });

  if (!range) return undefined;

  if (shouldReduceMotion) {
    const [, outEnd] = range.output ?? [0, 1];
    const fallbackOpacity = clamp01(outEnd ?? 1);
    return { opacity: fallbackOpacity };
  }

  // Before first progress event, use output range start to avoid flash
  if (opacity === null) {
    const [outStart] = range.output ?? [0, 1];
    return { opacity: clamp01(outStart ?? 0) };
  }
  return { opacity };
}
