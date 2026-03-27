"use client";

import { useRef, useMemo, useState, useCallback } from "react";
import type {
  ElementBlock,
  ModuleBlock,
  SectionEffect,
} from "@/page-builder/core/page-builder-schemas";
import { firePageBuilderAction } from "@/page-builder/triggers";
import { resolveVideoLink } from "@/page-builder/core/element-video-utils";
import { uiVideoPauseButtonHideDelayMs, uiVideoFeedbackDurationMs } from "@/core/lib/globals";
import { useVideoPlayerState } from "@/page-builder/hooks/use-video-player-state";
import { useVideoControls } from "@/page-builder/hooks/use-video-controls";
import { useVideoFullscreen } from "@/page-builder/hooks/use-video-fullscreen";
import { useElementVideoStyles } from "@/page-builder/hooks/use-element-video-styles";
import { useVideoContextValue } from "@/page-builder/hooks/use-video-context-value";
import { VideoControlContext } from "./ElementVideo/VideoControlContext";
import { ElementVideoCore } from "./ElementVideo/ElementVideoCore";
import { ElementVideoInteractiveContainer } from "./ElementVideo/ElementVideoInteractiveContainer";
import { ElementVideoSlotsOverlay } from "./ElementVideo/ElementVideoSlotsOverlay";
import { ElementVideoLinkWrap } from "./ElementVideo/ElementVideoLinkWrap";
import { useVideoLazyLoad } from "./ElementVideo/use-video-lazy-load";
import { resolveElementVideoSlots } from "./ElementVideo/element-video-slots";
import { SectionGlassEffect } from "@/page-builder/section/stack/SectionGlassEffect";

type Props = Extract<ElementBlock, { type: "elementVideo" }> & {
  moduleConfig?: ModuleBlock;
};

function NoVideoSource() {
  return (
    <span className="text-muted-foreground text-sm" role="status">
      No video source.
    </span>
  );
}

function coerceSectionEffects(value: unknown): SectionEffect[] | undefined {
  if (!Array.isArray(value)) return undefined;
  const entries = value.filter(
    (entry): entry is SectionEffect =>
      !!entry &&
      typeof entry === "object" &&
      "type" in entry &&
      typeof (entry as { type?: unknown }).type === "string"
  );
  return entries.length > 0 ? entries : undefined;
}

export function ElementVideo({
  src,
  poster,
  ariaLabel,
  autoplay = false,
  loop = false,
  muted = false,
  width,
  height,
  align,
  alignY,
  borderRadius,
  constraints,
  marginTop,
  marginBottom,
  marginLeft,
  marginRight,
  zIndex,
  fixed,
  effects,
  wrapperStyle,
  opacity,
  blendMode,
  boxShadow,
  filter,
  backdropFilter,
  overflow,
  hidden,
  objectFit = "cover",
  objectPosition,
  rotate,
  flipHorizontal = false,
  flipVertical = false,
  showPlayButton = true,
  link,
  aspectRatio,
  priority = false,
  moduleConfig,
  onVideoPlay,
  onVideoPause,
  onVideoEnd,
}: Props) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const figureRef = useRef<HTMLElement | null>(null);
  const containerRef = useRef<HTMLSpanElement>(null);
  const [videoEl, setVideoEl] = useState<HTMLVideoElement | null>(null);
  const setVideoRef = useCallback((el: HTMLVideoElement | null) => {
    (videoRef as React.MutableRefObject<HTMLVideoElement | null>).current = el;
    setVideoEl(el);
  }, []);
  const sleepAfterMs =
    (moduleConfig?.behavior as { sleepAfterMs?: number } | undefined)?.sleepAfterMs ??
    uiVideoPauseButtonHideDelayMs;
  const feedbackDurationMs =
    (moduleConfig?.behavior as { feedbackDurationMs?: number } | undefined)?.feedbackDurationMs ??
    uiVideoFeedbackDurationMs;
  const state = useVideoPlayerState({
    autoplay,
    muted,
    feedbackDurationMs,
  });

  const baseControls = useVideoControls({
    videoRef,
    state,
    setPlaying: state.setPlaying,
    setShowControls: state.setShowControls,
    setVolume: state.setVolume,
    setMuted: state.setMuted,
    setCurrentTime: state.setCurrentTime,
    setDuration: state.setDuration,
    sleepAfterMs,
    loop,
  });

  const controls = useMemo(() => {
    if (!onVideoPlay && !onVideoPause && !onVideoEnd) return baseControls;
    return {
      ...baseControls,
      handlePlay: () => {
        baseControls.handlePlay();
        if (onVideoPlay) firePageBuilderAction(onVideoPlay, "trigger");
      },
      handlePause: () => {
        baseControls.handlePause();
        if (onVideoPause) firePageBuilderAction(onVideoPause, "trigger");
      },
      handleEnded: () => {
        baseControls.handleEnded();
        if (onVideoEnd) firePageBuilderAction(onVideoEnd, "trigger");
      },
    };
  }, [baseControls, onVideoPlay, onVideoPause, onVideoEnd]);

  const fullscreen = useVideoFullscreen({
    videoRef,
    containerRef,
    videoEl,
    setFullscreen: state.setFullscreen,
  });

  const styles = useElementVideoStyles({
    width,
    height,
    align,
    alignY,
    borderRadius,
    constraints,
    marginTop,
    marginBottom,
    marginLeft,
    marginRight,
    zIndex,
    fixed,
    wrapperStyle,
    opacity,
    blendMode,
    boxShadow,
    filter,
    backdropFilter,
    overflow,
    hidden,
    rotate,
    flipHorizontal,
    flipVertical,
    objectFit,
    objectPosition,
    aspectRatio,
    moduleConfig,
  });
  const videoEffects = useMemo(() => coerceSectionEffects(effects), [effects]);
  const hasGlassEffect = (videoEffects ?? []).some((effect) => effect.type === "glass");

  const videoContextValue = useVideoContextValue({
    moduleConfig,
    state,
    controls,
    fullscreen,
  });

  const { isLinkable, resolvedHref, isInternal } = useMemo(
    () => resolveVideoLink(link, showPlayButton),
    [link, showPlayButton]
  );

  const hasSource = src != null && String(src).trim() !== "";
  const { shouldLoadVideo, armVideoLoad } = useVideoLazyLoad({
    autoplay,
    hasSource,
    priority,
    containerRef,
  });
  const showVideo = hasSource;
  const resolvedPoster = poster;
  const resolvedAriaLabel = (ariaLabel?.trim() || "Video").trim();

  const { contentSlotKey, slotsObj, useSectionSlots } = useMemo(
    () => resolveElementVideoSlots(moduleConfig),
    [moduleConfig]
  );

  const videoCore = (
    <ElementVideoCore
      setVideoRef={setVideoRef}
      src={src ?? ""}
      shouldLoad={shouldLoadVideo}
      poster={resolvedPoster ?? undefined}
      ariaLabel={resolvedAriaLabel}
      videoStyle={styles.videoStyle}
      withModule={!!moduleConfig}
      controls={controls}
      autoplay={autoplay}
      loop={loop}
      muted={muted}
    />
  );

  const videoContent = moduleConfig ? (
    <VideoControlContext.Provider value={videoContextValue}>
      {!hasSource && <NoVideoSource />}
      {showVideo && src && (
        <ElementVideoInteractiveContainer
          containerRef={containerRef}
          isFullscreen={state.isFullscreen}
          onContextMenu={(e) => e.preventDefault()}
          onTouchStart={() => {
            armVideoLoad();
            controls.showControlsTemporarily();
          }}
          onTouchEnd={undefined}
          onMouseEnter={() => {
            armVideoLoad();
            controls.showControlsTemporarily();
          }}
          onMouseLeave={controls.scheduleHideControls}
          onMouseMove={controls.showControlsTemporarily}
          onClick={undefined}
        >
          <div style={{ position: "absolute", inset: 0, zIndex: 0 }}>{videoCore}</div>
          {useSectionSlots && showPlayButton && (
            <ElementVideoSlotsOverlay
              slotsObj={slotsObj as Record<string, unknown>}
              contentSlotKey={contentSlotKey}
              moduleConfig={moduleConfig}
              showControls={state.showControls}
              isPlaying={state.isPlaying}
              isMuted={state.isMuted}
              isFullscreen={state.isFullscreen}
              onPointerEnter={controls.showControlsTemporarily}
              onPointerLeave={controls.scheduleHideControls}
              onPointerMove={controls.showControlsTemporarily}
              onPointerDown={controls.showControlsTemporarily}
            />
          )}
        </ElementVideoInteractiveContainer>
      )}
    </VideoControlContext.Provider>
  ) : (
    <>
      {!hasSource && <NoVideoSource />}
      {showVideo && src && (
        <span
          ref={containerRef}
          className="relative block w-full h-full"
          onPointerEnter={armVideoLoad}
          onTouchStart={armVideoLoad}
          onFocusCapture={armVideoLoad}
        >
          {videoCore}
        </span>
      )}
    </>
  );

  return (
    <figure
      ref={figureRef}
      className="shrink-0 m-0 block overflow-hidden"
      style={{
        ...styles.figureStyle,
        ...(hasGlassEffect && styles.figureStyle.position == null ? { position: "relative" } : {}),
      }}
    >
      <SectionGlassEffect effects={videoEffects} sectionRef={figureRef} variant="auto" />
      <div style={styles.wrapperStyle}>
        <ElementVideoLinkWrap
          isLinkable={isLinkable}
          resolvedHref={resolvedHref}
          isInternal={isInternal}
        >
          {videoContent}
        </ElementVideoLinkWrap>
      </div>
    </figure>
  );
}
