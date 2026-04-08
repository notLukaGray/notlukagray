"use client";

import { useCallback, useEffect } from "react";

/** iOS Safari: video-only fullscreen. Not on HTMLVideoElement in TS; we use at runtime. */
type VideoWithWebkit = HTMLVideoElement & {
  webkitEnterFullscreen?: () => void;
  webkitExitFullscreen?: () => void;
  webkitDisplayingFullscreen?: boolean;
};

export type UseVideoFullscreenParams = {
  videoRef: React.RefObject<HTMLVideoElement | null>;
  containerRef: React.RefObject<HTMLElement | null>;
  /** Video element when mounted (for iOS webkit listeners). */
  videoEl: HTMLVideoElement | null;
  setFullscreen: (v: boolean) => void;
};

export type UseVideoFullscreenResult = {
  toggleFullscreen: () => void;
};

/**
 * Fullscreen for video: desktop uses container.requestFullscreen();
 * mobile/iOS uses video.webkitEnterFullscreen() when available.
 * Syncs isFullscreen from both fullscreenchange and webkitbeginfullscreen/webkitendfullscreen.
 */
export function useVideoFullscreen({
  videoRef,
  containerRef,
  videoEl,
  setFullscreen,
}: UseVideoFullscreenParams): UseVideoFullscreenResult {
  const toggleFullscreen = useCallback(() => {
    const video = videoRef.current as VideoWithWebkit | null;
    const container = containerRef.current;

    if (video?.webkitEnterFullscreen) {
      if (video.webkitDisplayingFullscreen) {
        video.webkitExitFullscreen?.();
      } else {
        video.webkitEnterFullscreen();
      }
      return;
    }

    if (document.fullscreenElement) {
      document.exitFullscreen();
    } else if (container) {
      container.requestFullscreen().catch(() => {});
    }
  }, [videoRef, containerRef]);

  useEffect(() => {
    const onFullscreenChange = () => setFullscreen(!!document.fullscreenElement);
    document.addEventListener("fullscreenchange", onFullscreenChange);
    return () => document.removeEventListener("fullscreenchange", onFullscreenChange);
  }, [setFullscreen]);

  useEffect(() => {
    if (!videoEl) return;
    const v = videoEl as VideoWithWebkit;
    const onBegin = () => setFullscreen(true);
    const onEnd = () => setFullscreen(false);
    const beginEv = "webkitbeginfullscreen";
    const endEv = "webkitendfullscreen";
    v.addEventListener(beginEv, onBegin);
    v.addEventListener(endEv, onEnd);
    return () => {
      v.removeEventListener(beginEv, onBegin);
      v.removeEventListener(endEv, onEnd);
    };
  }, [videoEl, setFullscreen]);

  return { toggleFullscreen };
}
