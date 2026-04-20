"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import type { MediaPlayerClass, Representation } from "dashjs";
import type Hls from "hls.js";

export type ElementVideoQualityLevel = {
  value: string;
  label: string;
  height?: number;
  bitrate?: number;
};

export type VideoErrorKind =
  /** Browser doesn't support MSE / HLS.js — suggest switching browsers. */
  | "unsupported"
  /** Fatal load or decode error that survived one recovery attempt. */
  | "fatal";

export type ElementVideoSourceState = {
  isHls: boolean;
  isDash: boolean;
  qualityLevels: ElementVideoQualityLevel[];
  selectedQuality: string;
  setSelectedQuality: (value: string) => void;
  errorKind: VideoErrorKind | null;
};

const DASH_LOG_LEVEL_ERROR = 2;

function srcPathname(src: string): string {
  try {
    return new URL(src, "https://local.invalid").pathname.toLowerCase();
  } catch {
    return src.split(/[?#]/, 1)[0]?.toLowerCase() ?? "";
  }
}

export function isHlsVideoSource(src: string): boolean {
  return srcPathname(src).endsWith(".m3u8");
}

export function isDashVideoSource(src: string): boolean {
  return srcPathname(src).endsWith(".mpd");
}

export type ElementVideoStreamingConfig = {
  autoStartLoad?: boolean;
  maxBufferLength?: number;
  maxBufferSize?: number;
  bufferTimeDefault?: number;
  bufferTimeAtTopQuality?: number;
};

export function useElementVideoSource({
  videoEl,
  src,
  shouldLoad,
  autoplay,
  streamingConfig,
}: {
  videoEl: HTMLVideoElement | null;
  src: string;
  shouldLoad: boolean;
  autoplay?: boolean;
  streamingConfig?: ElementVideoStreamingConfig;
}): ElementVideoSourceState {
  const isHls = isHlsVideoSource(src);
  const isDash = isDashVideoSource(src);
  const hlsRef = useRef<Hls | null>(null);
  const dashRef = useRef<MediaPlayerClass | null>(null);
  const [qualityLevels, setQualityLevels] = useState<ElementVideoQualityLevel[]>([]);
  const [selectedQuality, setSelectedQualityState] = useState("auto");
  const [errorKind, setErrorKind] = useState<VideoErrorKind | null>(null);

  const setSelectedQuality = useCallback((value: string) => {
    setSelectedQualityState(value);
    const dash = dashRef.current;
    if (dash) {
      dash.updateSettings({
        streaming: { abr: { autoSwitchBitrate: { video: value === "auto" } } },
      });
      const level = Number(value);
      if (value !== "auto" && Number.isInteger(level)) {
        dash.setRepresentationForTypeByIndex("video", level, true);
      }
      return;
    }

    const hls = hlsRef.current;
    if (!hls) return;

    if (value === "auto") {
      hls.currentLevel = -1;
      return;
    }

    const level = Number(value);
    if (Number.isInteger(level) && level >= 0 && level < hls.levels.length) {
      hls.currentLevel = level;
    }
  }, []);

  useEffect(() => {
    const video = videoEl;
    if (!video || !isHls) return;

    let cancelled = false;
    let hls: Hls | null = null;

    if (!shouldLoad || !src) {
      video.removeAttribute("src");
      video.load();
      setQualityLevels([]);
      setSelectedQualityState("auto");
      setErrorKind(null);
      return;
    }

    if (video.canPlayType("application/vnd.apple.mpegurl")) {
      // Native HLS (Safari). Hand off to the browser; listen for hard failures.
      video.src = src;
      setQualityLevels([]);
      setSelectedQualityState("auto");
      setErrorKind(null);
      const onNativeError = () => setErrorKind("fatal");
      video.addEventListener("error", onNativeError);
      return () => {
        video.removeEventListener("error", onNativeError);
        video.removeAttribute("src");
        video.load();
      };
    }

    // Autoplay requires segments immediately; otherwise defer until play.
    let playListener: (() => void) | null = null;

    void import("hls.js").then((module) => {
      if (cancelled) return;
      const Hls = module.default;

      if (!Hls.isSupported()) {
        setErrorKind("unsupported");
        return;
      }

      const effectiveAutoStartLoad = autoplay ? true : (streamingConfig?.autoStartLoad ?? false);

      hls = new Hls({
        enableWorker: true,
        autoStartLoad: effectiveAutoStartLoad,
        startFragPrefetch: false,
        maxBufferLength: streamingConfig?.maxBufferLength ?? 20,
        maxMaxBufferLength: 60,
        maxBufferSize: streamingConfig?.maxBufferSize ?? 10 * 1000 * 1000,
      });
      hlsRef.current = hls;
      hls.on(Hls.Events.MANIFEST_PARSED, () => {
        if (!hls) return;
        setQualityLevels(
          hls.levels.map((level, index) => {
            const height = level.height > 0 ? level.height : undefined;
            const bitrate = level.bitrate > 0 ? level.bitrate : undefined;
            return {
              value: String(index),
              label: height
                ? `${height}p`
                : bitrate
                  ? `${Math.round(bitrate / 1000)} kbps`
                  : `Level ${index + 1}`,
              height,
              bitrate,
            };
          })
        );
        setSelectedQualityState(hls.currentLevel === -1 ? "auto" : String(hls.currentLevel));
      });
      hls.on(Hls.Events.LEVEL_SWITCHED, (_event, data) => {
        if (!hls) return;
        setSelectedQualityState(hls.autoLevelEnabled ? "auto" : String(data.level));
      });

      // One recovery attempt per error type; give up and surface an error after that.
      let networkRecovered = false;
      let mediaRecovered = false;
      hls.on(Hls.Events.ERROR, (_event, data) => {
        if (!data.fatal) return;
        if (data.type === Hls.ErrorTypes.NETWORK_ERROR && !networkRecovered) {
          networkRecovered = true;
          hls?.startLoad();
        } else if (data.type === Hls.ErrorTypes.MEDIA_ERROR && !mediaRecovered) {
          mediaRecovered = true;
          hls?.recoverMediaError();
        } else {
          setErrorKind("fatal");
        }
      });

      hls.loadSource(src);
      hls.attachMedia(video);

      if (!effectiveAutoStartLoad && !cancelled) {
        // Start loading segments from the current position on first play.
        // hls.startLoad() is safe to call repeatedly — it's a no-op once loading.
        playListener = () => {
          hls?.startLoad(video.currentTime);
        };
        video.addEventListener("play", playListener);
      }
    });

    return () => {
      cancelled = true;
      if (playListener) video.removeEventListener("play", playListener);
      hls?.destroy();
      if (hlsRef.current === hls) hlsRef.current = null;
      setQualityLevels([]);
      setSelectedQualityState("auto");
      setErrorKind(null);
      video.removeAttribute("src");
      video.load();
    };
  }, [autoplay, isHls, shouldLoad, src, streamingConfig, videoEl]);

  useEffect(() => {
    const video = videoEl;
    if (!video || !isDash) return;

    let cancelled = false;
    let dash: MediaPlayerClass | null = null;

    if (!shouldLoad || !src) {
      video.removeAttribute("src");
      video.load();
      setQualityLevels([]);
      setSelectedQualityState("auto");
      setErrorKind(null);
      return;
    }

    // DASH requires Media Source Extensions.
    if (typeof window !== "undefined" && !("MediaSource" in window)) {
      setErrorKind("unsupported");
      return;
    }

    void import("dashjs").then((module) => {
      if (cancelled) return;

      dash = module.MediaPlayer().create();
      dashRef.current = dash;
      dash.updateSettings({
        debug: { logLevel: DASH_LOG_LEVEL_ERROR },
        streaming: {
          abr: { autoSwitchBitrate: { video: true } },
          buffer: {
            bufferTimeDefault: streamingConfig?.bufferTimeDefault ?? 12,
            bufferTimeAtTopQuality: streamingConfig?.bufferTimeAtTopQuality ?? 20,
            bufferToKeep: 10,
          },
        },
      });
      dash.on(module.MediaPlayer.events.STREAM_INITIALIZED, () => {
        if (!dash) return;
        const representations = dash.getRepresentationsByType("video") as Representation[];
        setQualityLevels(
          representations.map((representation, index) => {
            const height = representation.height > 0 ? representation.height : undefined;
            const bitrate = representation.bitrateInKbit > 0 ? representation.bitrateInKbit : 0;
            return {
              value: String(index),
              label: height
                ? `${height}p`
                : bitrate
                  ? `${Math.round(bitrate)} kbps`
                  : `Level ${index + 1}`,
              height,
              bitrate: bitrate ? bitrate * 1000 : undefined,
            };
          })
        );
        setSelectedQualityState("auto");
      });
      dash.on(module.MediaPlayer.events.ERROR, () => {
        setErrorKind("fatal");
      });
      dash.initialize(video, src, false, 0);
    });

    return () => {
      cancelled = true;
      dash?.destroy();
      if (dashRef.current === dash) dashRef.current = null;
      setQualityLevels([]);
      setSelectedQualityState("auto");
      setErrorKind(null);
      video.removeAttribute("src");
      video.load();
    };
  }, [isDash, shouldLoad, src, streamingConfig, videoEl]);

  return {
    isHls,
    isDash,
    qualityLevels,
    selectedQuality,
    setSelectedQuality,
    errorKind,
  };
}
