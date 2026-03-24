"use client";

import { useMemo } from "react";
import type { ModuleBlock } from "@/page-builder/core/page-builder-schemas";
import {
  resolveVideoShowWhen,
  getVideoActionHandler,
} from "@/page-builder/core/element-video-utils";
import type { UseVideoPlayerStateResult } from "./use-video-player-state";
import type { VideoControlContextValue } from "@/page-builder/elements/ElementVideo/VideoControlContext";
import type { UseVideoControlsResult } from "./use-video-controls";
import type { UseVideoFullscreenResult } from "./use-video-fullscreen";

export type UseVideoContextValueParams = {
  moduleConfig: ModuleBlock | undefined;
  state: UseVideoPlayerStateResult;
  controls: UseVideoControlsResult;
  fullscreen: UseVideoFullscreenResult;
};

export function useVideoContextValue({
  moduleConfig,
  state,
  controls,
  fullscreen,
}: UseVideoContextValueParams): VideoControlContextValue | null {
  return useMemo(() => {
    if (!moduleConfig) return null;
    const showWhenState = {
      isPlaying: state.isPlaying,
      isMuted: state.isMuted,
      isFullscreen: state.isFullscreen,
    };
    const handlers = {
      onPlay: controls.handlePlay,
      onPause: controls.handlePause,
      onTogglePlay: controls.handleTogglePlay,
      onSeek: controls.handleSeek,
      onSeekTo: controls.handleSeekTo,
      onMuteToggle: controls.toggleMute,
      onFullscreenToggle: fullscreen.toggleFullscreen,
    };
    return {
      isPlaying: state.isPlaying,
      isMuted: state.isMuted,
      isFullscreen: state.isFullscreen,
      volume: state.volume,
      currentTime: state.currentTime,
      duration: state.duration,
      feedback: state.feedback,
      onPlay: controls.handlePlay,
      onPause: controls.handlePause,
      onTogglePlay: controls.handleTogglePlay,
      onSeek: controls.handleSeek,
      onSeekTo: controls.handleSeekTo,
      onVolumeChange: controls.handleVolumeSet,
      onMuteToggle: controls.toggleMute,
      onFullscreenToggle: fullscreen.toggleFullscreen,
      showFeedback: state.showFeedback,
      resolveShowWhen: (showWhen: string | undefined) =>
        resolveVideoShowWhen(showWhen, showWhenState),
      getActionHandler: (action: string | undefined, payload?: number) =>
        getVideoActionHandler(action, payload, handlers),
    };
  }, [
    moduleConfig,
    state.isPlaying,
    state.isMuted,
    state.isFullscreen,
    state.volume,
    state.currentTime,
    state.duration,
    state.feedback,
    state.showFeedback,
    controls.handlePlay,
    controls.handlePause,
    controls.handleTogglePlay,
    controls.handleSeek,
    controls.handleSeekTo,
    controls.handleVolumeSet,
    controls.toggleMute,
    fullscreen.toggleFullscreen,
  ]);
}
