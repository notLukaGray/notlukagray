import { useCallback, useEffect, useMemo, useState } from "react";
import { buildTypographyPreviewMotion } from "@/app/dev/elements/_shared/typography-preview-motion";
import { getLoopIntervalMs } from "@/app/dev/elements/image/preview-motion";
import type { PbImageAnimationDefaults } from "@/app/theme/pb-builder-defaults";

const LOOP_MS = 2800;

export function useTypographyMotionPreview(
  active: Record<string, unknown>,
  runtimeMotion: Record<string, unknown> | undefined
) {
  const [previewVisible, setPreviewVisible] = useState(true);
  const [previewKey, setPreviewKey] = useState(0);
  const [autoLoop, setAutoLoop] = useState(false);

  const previewMotion = useMemo(
    () => buildTypographyPreviewMotion(active, runtimeMotion),
    [active, runtimeMotion]
  );

  const animateInPreview = useCallback(() => {
    setPreviewVisible(false);
    window.setTimeout(() => {
      setPreviewKey((current) => current + 1);
      setPreviewVisible(true);
    }, 70);
  }, []);

  const animateOutPreview = useCallback(() => {
    setPreviewVisible(false);
  }, []);

  const showPreview = useCallback(() => {
    setPreviewVisible(true);
  }, []);

  const loopMs = useMemo(() => {
    const anim = active.animation as PbImageAnimationDefaults | undefined;
    return anim != null ? getLoopIntervalMs(anim) : LOOP_MS;
  }, [active]);

  useEffect(() => {
    if (!autoLoop) return;
    const id = window.setInterval(() => {
      setPreviewVisible(false);
      window.setTimeout(() => {
        setPreviewKey((k) => k + 1);
        setPreviewVisible(true);
      }, 140);
    }, loopMs);
    return () => window.clearInterval(id);
  }, [autoLoop, loopMs]);

  const resetMotionPreview = useCallback(() => {
    setPreviewVisible(true);
    setPreviewKey(0);
    setAutoLoop(false);
  }, []);

  return {
    animateInPreview,
    animateOutPreview,
    autoLoop,
    previewKey,
    previewMotion,
    previewVisible,
    resetMotionPreview,
    setAutoLoop,
    showPreview,
  };
}
