"use client";

import { useEffect, useState } from "react";

type UseAfterLcpOptions = {
  fallbackMs?: number;
};

/**
 * Returns true once the page has produced an LCP entry (or after a fallback timeout).
 * Used to defer non-critical video loading until after the initial paint settles.
 */
export function useAfterLcp({ fallbackMs = 4000 }: UseAfterLcpOptions = {}): boolean {
  const [isAfterLcp, setIsAfterLcp] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (isAfterLcp) return;

    let done = false;
    let fallbackTimer: ReturnType<typeof setTimeout> | null = null;
    let rafId: number | null = null;
    let observer: PerformanceObserver | null = null;

    const markReady = () => {
      if (done) return;
      done = true;
      setIsAfterLcp(true);
      if (fallbackTimer) {
        clearTimeout(fallbackTimer);
        fallbackTimer = null;
      }
      if (rafId != null) {
        cancelAnimationFrame(rafId);
        rafId = null;
      }
      observer?.disconnect();
      observer = null;
    };

    const markReadyNextFrame = () => {
      if (done || rafId != null) return;
      rafId = requestAnimationFrame(() => {
        rafId = null;
        markReady();
      });
    };

    fallbackTimer = setTimeout(markReady, fallbackMs);

    try {
      if ("PerformanceObserver" in window) {
        observer = new PerformanceObserver((list) => {
          if (list.getEntries().length > 0) {
            markReadyNextFrame();
          }
        });
        observer.observe({ type: "largest-contentful-paint", buffered: true });
      }
    } catch {
      // Ignore unsupported observer/type combinations and rely on fallback/load events.
    }

    const onLoad = () => markReadyNextFrame();
    window.addEventListener("load", onLoad, { once: true });
    if (document.readyState === "complete") {
      markReadyNextFrame();
    }

    return () => {
      done = true;
      if (fallbackTimer) clearTimeout(fallbackTimer);
      if (rafId != null) cancelAnimationFrame(rafId);
      observer?.disconnect();
      window.removeEventListener("load", onLoad);
    };
  }, [fallbackMs, isAfterLcp]);

  return isAfterLcp;
}
