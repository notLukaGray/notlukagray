"use client";

import { useEffect } from "react";
import { useGLTF } from "@react-three/drei";
import { useAfterLcp } from "@/core/hooks/use-after-lcp";

/**
 * Preloads GLB geometry files into drei's cache on idle, after LCP.
 * Call this before the canvas mounts (even when initiallyLoaded=false) so
 * assets are ready in cache when the scene eventually renders.
 */
export function useModel3DPreload(geometryUrls: string[]) {
  const isAfterLcp = useAfterLcp();

  useEffect(() => {
    if (!isAfterLcp || geometryUrls.length === 0) return;

    const preload = () => {
      geometryUrls.forEach((url) => {
        if (url) useGLTF.preload(url);
      });
    };

    if (typeof window !== "undefined" && "requestIdleCallback" in window) {
      const id = requestIdleCallback(preload);
      return () => cancelIdleCallback(id);
    }

    preload();
    return;
  }, [isAfterLcp, geometryUrls]);
}
