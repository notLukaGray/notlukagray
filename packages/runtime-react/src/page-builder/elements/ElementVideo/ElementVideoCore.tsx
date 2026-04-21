"use client";

import { useCallback, useEffect, useRef } from "react";
import type { CSSProperties } from "react";
import type { UseVideoControlsResult } from "@/page-builder/hooks/use-video-controls";

export type ElementVideoCoreProps = {
  setVideoRef: (el: HTMLVideoElement | null) => void;
  src: string;
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
  isManagedSource: boolean;
  priority?: boolean;
  preload?: "none" | "metadata" | "auto";
  crossOrigin?: "anonymous" | "use-credentials";
  controlsList?: string;
};

export function ElementVideoCore({
  setVideoRef,
  src,
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
  isManagedSource,
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
    const video = videoElRef.current;
    if (isManagedSource) return;
    if (!video || !shouldLoad || !src) return;

    // Start buffering once the container is visible / interacted with.
    if (video.preload !== "auto") {
      video.preload = "auto";
    }

    if (!video.currentSrc && !video.src) return;
    if (video.networkState === HTMLMediaElement.NETWORK_NO_SOURCE) return;
    if (video.readyState >= HTMLMediaElement.HAVE_FUTURE_DATA) return;

    video.load();
  }, [isManagedSource, shouldLoad, src]);

  useEffect(() => {
    if (!videoElRef.current || playbackRate == null) return;
    videoElRef.current.playbackRate = playbackRate;
  }, [playbackRate]);

  const resolvedPoster = shouldLoad ? (poster ?? undefined) : undefined;

  return (
    <>
      {priority && resolvedPoster && (
        // React 19 hoists this to <head> during SSR so the poster is discovered before JS runs.
        <link rel="preload" as="image" href={resolvedPoster} fetchPriority="high" />
      )}
      <video
        ref={handleVideoRef}
        src={!isManagedSource && shouldLoad ? src : undefined}
        poster={resolvedPoster}
        autoPlay={autoplay}
        loop={loop}
        muted={muted}
        playsInline
        preload={shouldLoad ? (preload ?? "auto") : "none"}
        crossOrigin={crossOrigin}
        controls={!withModule}
        disableRemotePlayback
        controlsList={controlsList ?? "nodownload nofullscreen noremoteplayback"}
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
