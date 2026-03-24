"use client";

import { useEffect, useRef } from "react";
import { useScrollContainer } from "@/page-builder/section/position/use-scroll-container";

export type UsePageScrollProgressOptions = {
  onProgress?: (progress: number) => void;

  startOffset?: number;

  endOffset?: number;
};

export function usePageScrollProgress({
  onProgress,
  startOffset = 0,
  endOffset = 0,
}: UsePageScrollProgressOptions): void {
  const container = useScrollContainer();
  const rafIdRef = useRef<number | null>(null);
  const lastProgressRef = useRef<number | null>(null);

  useEffect(() => {
    if (!container || !onProgress) return;

    const calculateProgress = (): number => {
      const scrollTop = container.scrollTop;
      const containerHeight = container.clientHeight;
      const scrollHeight = container.scrollHeight;

      // Calculate scrollable range
      const maxScroll = scrollHeight - containerHeight;

      // Apply offsets
      const startPoint = startOffset;
      const endPoint = maxScroll - endOffset;

      // Calculate progress (0 = at top, 1 = at bottom)
      let progress = 0;
      if (scrollTop < startPoint) {
        // Haven't started scrolling yet (with offset)
        progress = 0;
      } else if (scrollTop > endPoint) {
        // Scrolled past end (with offset)
        progress = 1;
      } else {
        // Linear interpolation between start and end
        const range = endPoint - startPoint;
        const position = scrollTop - startPoint;
        progress = range > 0 ? Math.max(0, Math.min(1, position / range)) : 0;
      }

      return progress;
    };

    const updateProgress = () => {
      const progress = calculateProgress();

      // Only fire if progress changed significantly (avoid excessive updates)
      if (
        lastProgressRef.current === null ||
        Math.abs(progress - lastProgressRef.current) > 0.001
      ) {
        lastProgressRef.current = progress;
        onProgress(progress);
      }

      rafIdRef.current = null;
    };

    const handleScroll = () => {
      if (rafIdRef.current === null) {
        rafIdRef.current = requestAnimationFrame(updateProgress);
      }
    };

    const handleResize = () => {
      if (rafIdRef.current === null) {
        rafIdRef.current = requestAnimationFrame(updateProgress);
      }
    };

    // Initial calculation
    updateProgress();

    container.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleResize, { passive: true });

    return () => {
      container.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleResize);
      if (rafIdRef.current !== null) {
        cancelAnimationFrame(rafIdRef.current);
        rafIdRef.current = null;
      }
      lastProgressRef.current = null;
    };
  }, [container, onProgress, startOffset, endOffset]);
}
