"use client";

import { useRef, useMemo, useState, useCallback, type CSSProperties } from "react";
import type {
  ElementBlock,
  ModuleBlock,
  SectionEffect,
} from "@pb/contracts/page-builder/core/page-builder-schemas";
import { firePageBuilderAction } from "@/page-builder/triggers";
import {
  choosePreferredVideoSource,
  resolveVideoLink,
  type VideoSourceCandidate,
  type VideoSourceSupportProbe,
} from "@pb/core/internal/element-video-utils";
import {
  uiVideoPauseButtonHideDelayMs,
  uiVideoFeedbackDurationMs,
} from "@pb/runtime-react/core/lib/globals";
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
import { useElementVideoSource } from "./ElementVideo/use-element-video-source";
import { ElementVideoErrorOverlay } from "./ElementVideo/ElementVideoErrorOverlay";
import { useVideoLazyLoad } from "./ElementVideo/use-video-lazy-load";
import { resolveElementVideoSlots } from "./ElementVideo/element-video-slots";
import { SectionGlassEffect } from "@/page-builder/section/stack/SectionGlassEffect";
import { usePageBuilderThemeMode } from "@/page-builder/theme/use-page-builder-theme-mode";
import { resolveThemeValueDeep } from "@/page-builder/theme/theme-string";

type Props = Extract<ElementBlock, { type: "elementVideo" }> & {
  moduleConfig?: ModuleBlock;
};

function resolveAspectRatioValue(aspectRatio: Props["aspectRatio"]): string {
  if (typeof aspectRatio === "string" && aspectRatio.trim().length > 0) return aspectRatio;
  if (
    Array.isArray(aspectRatio) &&
    typeof aspectRatio[0] === "string" &&
    aspectRatio[0].trim().length > 0
  ) {
    return aspectRatio[0];
  }
  return "16 / 9";
}

function NoVideoSource({ poster, aspectRatio }: { poster?: string; aspectRatio?: string }) {
  const fallbackStyle: CSSProperties = {
    display: "block",
    width: "100%",
    minHeight: "10rem",
    aspectRatio: aspectRatio ?? "16 / 9",
    borderRadius: "inherit",
    overflow: "hidden",
    backgroundColor: "rgba(255,255,255,0.06)",
  };

  if (poster && poster.trim().length > 0) {
    return (
      <span
        className="relative"
        style={{
          ...fallbackStyle,
          backgroundImage: `url("${poster}")`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          opacity: 0.75,
        }}
      >
        <span className="pointer-events-none absolute inset-0 grid place-items-center text-[11px] uppercase tracking-[0.2em] text-white/70">
          Video source missing
        </span>
      </span>
    );
  }

  return (
    <span
      className="grid place-items-center text-[11px] uppercase tracking-[0.2em] text-white/65"
      role="status"
      style={fallbackStyle}
    >
      Video source missing
      <span className="mt-1 block text-[9px] normal-case tracking-normal text-white/50">
        Add a URL or Bunny key to see live playback.
      </span>
    </span>
  );
}

function PrePlayPosterOverlay({
  poster,
  ariaLabel,
  objectFit,
  objectPosition,
  visible,
}: {
  poster?: string;
  ariaLabel: string;
  objectFit: Props["objectFit"];
  objectPosition?: string;
  visible: boolean;
}) {
  if (!poster || poster.trim().length === 0 || !visible) return null;

  const resolvedObjectFit = Array.isArray(objectFit) ? objectFit[0] : objectFit;
  const backgroundSize =
    resolvedObjectFit === "contain"
      ? "contain"
      : resolvedObjectFit === "fillWidth"
        ? "100% auto"
        : resolvedObjectFit === "fillHeight"
          ? "auto 100%"
          : "cover";

  return (
    <span
      className="pointer-events-none absolute inset-0 block"
      style={{
        zIndex: 1,
        backgroundImage: `url("${poster}")`,
        backgroundPosition: objectPosition ?? "center",
        backgroundRepeat: "no-repeat",
        backgroundSize,
        borderRadius: "inherit",
      }}
      role="img"
      aria-label={`${ariaLabel} poster`}
    />
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

function createVideoSourceSupportProbe(): VideoSourceSupportProbe | undefined {
  if (typeof document === "undefined") return undefined;

  const video = document.createElement("video");
  const mediaSource =
    typeof window === "undefined"
      ? undefined
      : (window.MediaSource as typeof MediaSource | undefined);
  return {
    canPlayType: (type) => video.canPlayType(type),
    hasMediaSource: !!mediaSource,
    isMediaSourceTypeSupported: (type) => mediaSource?.isTypeSupported(type) === true,
  };
}

function usePreferredVideoSource(
  src: string | undefined,
  sources: VideoSourceCandidate[] | undefined
): string {
  return useMemo(
    () => choosePreferredVideoSource(src, sources, createVideoSourceSupportProbe()),
    [src, sources]
  );
}

export function ElementVideo({
  src,
  sources,
  poster,
  ariaLabel,
  autoplay = false,
  loop = false,
  muted = false,
  playbackRate,
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
  streamingConfig,
  preload,
  crossOrigin,
  controlsList,
}: Props) {
  const themeMode = usePageBuilderThemeMode();
  const videoRef = useRef<HTMLVideoElement>(null);
  const figureRef = useRef<HTMLElement | null>(null);
  const containerRef = useRef<HTMLSpanElement>(null);
  const [videoEl, setVideoEl] = useState<HTMLVideoElement | null>(null);
  const setVideoRef = useCallback((el: HTMLVideoElement | null) => {
    (videoRef as React.MutableRefObject<HTMLVideoElement | null>).current = el;
    setVideoEl(el);
  }, []);
  const preferredSrc = usePreferredVideoSource(src, sources);
  const hasSource = preferredSrc.trim() !== "";
  const [playbackStartState, setPlaybackStartState] = useState({
    src: preferredSrc,
    autoplay,
    hasStarted: autoplay,
  });
  const hasStartedPlayback =
    playbackStartState.src === preferredSrc && playbackStartState.autoplay === autoplay
      ? playbackStartState.hasStarted
      : autoplay;
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
    return {
      ...baseControls,
      handlePlay: () => {
        setPlaybackStartState({ src: preferredSrc, autoplay, hasStarted: true });
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
  }, [autoplay, baseControls, onVideoPlay, onVideoPause, onVideoEnd, preferredSrc]);

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
  const videoEffects = useMemo(
    () => coerceSectionEffects(resolveThemeValueDeep(effects, themeMode)),
    [effects, themeMode]
  );
  const hasGlassEffect = (videoEffects ?? []).some((effect) => effect.type === "glass");

  const { isLinkable, resolvedHref, isInternal, target, rel } = useMemo(
    () => resolveVideoLink(link, showPlayButton),
    [link, showPlayButton]
  );

  const { shouldLoadVideo, armVideoLoad } = useVideoLazyLoad({
    autoplay,
    hasSource,
    priority,
    containerRef,
  });
  const videoSourceState = useElementVideoSource({
    videoEl,
    src: preferredSrc,
    shouldLoad: shouldLoadVideo,
    autoplay,
    streamingConfig,
  });
  const moduleEffects = useMemo(
    () =>
      coerceSectionEffects(
        resolveThemeValueDeep(
          (moduleConfig as { effects?: unknown } | undefined)?.effects,
          themeMode
        )
      ),
    [moduleConfig, themeMode]
  );
  const hasModuleGlassEffect = (moduleEffects ?? []).some((effect) => effect.type === "glass");

  const videoContextValue = useVideoContextValue({
    moduleConfig,
    state,
    controls,
    fullscreen,
    sourceState: videoSourceState,
  });
  const showVideo = hasSource;
  const resolvedPoster = poster;
  const resolvedAspectRatio = resolveAspectRatioValue(aspectRatio);
  const resolvedAriaLabel = (ariaLabel?.trim() || "Video").trim();
  const showPrePlayPoster = showVideo && !hasStartedPlayback;

  const { contentSlotKey, slotsObj, useSectionSlots } = useMemo(
    () => resolveElementVideoSlots(moduleConfig),
    [moduleConfig]
  );

  const videoCore = (
    <ElementVideoCore
      setVideoRef={setVideoRef}
      src={preferredSrc}
      shouldLoad={shouldLoadVideo}
      poster={resolvedPoster ?? undefined}
      ariaLabel={resolvedAriaLabel}
      videoStyle={styles.videoStyle}
      withModule={!!moduleConfig}
      controls={controls}
      autoplay={autoplay}
      loop={loop}
      muted={muted}
      playbackRate={playbackRate}
      isManagedSource={videoSourceState.isHls || videoSourceState.isDash}
      priority={priority}
      preload={preload}
      crossOrigin={crossOrigin}
      controlsList={controlsList}
    />
  );

  const videoContent = moduleConfig ? (
    <VideoControlContext.Provider value={videoContextValue}>
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
        <div style={{ position: "absolute", inset: 0, zIndex: 0 }}>
          {showVideo && preferredSrc ? (
            <>
              {videoCore}
              <PrePlayPosterOverlay
                poster={resolvedPoster ?? undefined}
                ariaLabel={resolvedAriaLabel}
                objectFit={objectFit}
                objectPosition={objectPosition}
                visible={showPrePlayPoster}
              />
              {videoSourceState.errorKind && (
                <ElementVideoErrorOverlay errorKind={videoSourceState.errorKind} />
              )}
            </>
          ) : (
            <NoVideoSource poster={resolvedPoster} aspectRatio={resolvedAspectRatio} />
          )}
        </div>
        {hasModuleGlassEffect && (
          <SectionGlassEffect effects={moduleEffects} sectionRef={containerRef} variant="auto" />
        )}
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
    </VideoControlContext.Provider>
  ) : (
    <>
      {!hasSource && <NoVideoSource poster={resolvedPoster} aspectRatio={resolvedAspectRatio} />}
      {showVideo && preferredSrc && (
        <span
          ref={containerRef}
          className="relative block w-full h-full"
          onPointerEnter={armVideoLoad}
          onTouchStart={armVideoLoad}
          onFocusCapture={armVideoLoad}
        >
          {videoCore}
          <PrePlayPosterOverlay
            poster={resolvedPoster ?? undefined}
            ariaLabel={resolvedAriaLabel}
            objectFit={objectFit}
            objectPosition={objectPosition}
            visible={showPrePlayPoster}
          />
          {videoSourceState.errorKind && (
            <ElementVideoErrorOverlay errorKind={videoSourceState.errorKind} />
          )}
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
          target={target}
          rel={rel}
        >
          {videoContent}
        </ElementVideoLinkWrap>
      </div>
    </figure>
  );
}
