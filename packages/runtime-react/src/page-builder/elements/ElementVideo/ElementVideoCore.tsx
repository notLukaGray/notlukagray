"use client";

import { useCallback, useEffect, useRef } from "react";
import type { CSSProperties } from "react";
import type { UseVideoControlsResult } from "@/page-builder/hooks/use-video-controls";

export type ElementVideoCoreProps = {
  setVideoRef: (el: HTMLVideoElement | null) => void;
  shouldLoad: boolean;
  poster?: string;
  ariaLabel?: string;
  videoStyle: CSSProperties;
  withModule: boolean;
  controls: UseVideoControlsResult;
  autoplay: boolean;
  loop: boolean;
  muted: boolean;
  playbackRate?: number;
  priority?: boolean;
  preload?: "none" | "metadata" | "auto";
  crossOrigin?: "anonymous" | "use-credentials";
  controlsList?: string;
};

function isIosLikeDevice(): boolean {
  if (typeof navigator === "undefined") return false;
  return /iPad|iPhone|iPod/.test(navigator.userAgent);
}

export function ElementVideoCore({
  setVideoRef,
  shouldLoad,
  poster,
  ariaLabel,
  videoStyle,
  withModule,
  controls,
  autoplay,
  loop,
  muted,
  playbackRate,
  priority,
  preload,
  crossOrigin,
  controlsList,
}: ElementVideoCoreProps) {
  const videoElRef = useRef<HTMLVideoElement | null>(null);

  const handleVideoRef = useCallback(
    (el: HTMLVideoElement | null) => {
      videoElRef.current = el;
      setVideoRef(el);
    },
    [setVideoRef]
  );

  useEffect(() => {
    if (!videoElRef.current || playbackRate == null) return;
    videoElRef.current.playbackRate = playbackRate;
  }, [playbackRate]);

  const resolvedPoster = shouldLoad ? (poster ?? undefined) : undefined;
  const resolvedControlsList =
    controlsList ?? (isIosLikeDevice() ? "nodownload" : "nodownload nofullscreen");
  const disableRemotePlayback = controlsList?.split(/\s+/).includes("noremoteplayback");

  return (
    <>
      {priority && resolvedPoster && (
        // React 19 hoists this to <head> during SSR so the poster is discovered before JS runs.
        <link rel="preload" as="image" href={resolvedPoster} fetchPriority="high" />
      )}
      <video
        ref={handleVideoRef}
        poster={resolvedPoster}
        autoPlay={autoplay}
        loop={loop}
        muted={muted}
        playsInline
        preload={shouldLoad ? (preload ?? "auto") : "none"}
        crossOrigin={crossOrigin}
        controls={!withModule}
        disableRemotePlayback={disableRemotePlayback || undefined}
        controlsList={resolvedControlsList}
        style={{
          ...videoStyle,
          ...(withModule ? { width: "100%", height: "100%" } : {}),
        }}
        onPlay={controls.handlePlay}
        onPause={controls.handlePause}
        onEnded={controls.handleEnded}
        onVolumeChange={controls.handleVolumeChange}
        onLoadedData={controls.handleVolumeChange}
        onTimeUpdate={controls.onTimeUpdate}
        onLoadedMetadata={controls.onLoadedMetadata}
        aria-label={ariaLabel || "Video"}
      />
    </>
  );
}
