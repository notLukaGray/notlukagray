"use client";

import { useCallback, useState } from "react";
import type { ElementBlock, PageBuilderAction } from "@/page-builder/core/page-builder-schemas";
import type { ElementLayoutTransformOptions } from "@/page-builder/core/element-layout-utils";
import type { ElementLayout } from "@/page-builder/core/page-builder-schemas";
import { ElementLayoutWrapper } from "./Shared/ElementLayoutWrapper";
import { useVideoControlContext } from "./ElementVideo/VideoControlContext";
import { firePageBuilderProgressTrigger } from "@/page-builder/triggers";

type Props = Extract<ElementBlock, { type: "elementRange" }>;

type LayoutProps = Pick<
  ElementLayoutTransformOptions,
  "width" | "height" | "align" | "marginTop" | "marginBottom" | "marginLeft" | "marginRight"
> & {
  zIndex?: number;
  constraints?: ElementLayout["constraints"];
  [key: string]: unknown;
};

export function ElementRange({
  min = 0,
  max = 1,
  step = 0.01,
  ariaLabel,
  width,
  height,
  align,
  marginTop,
  marginBottom,
  marginLeft,
  marginRight,
  zIndex,
  constraints,
  effects,
  wrapperStyle,
  opacity,
  blendMode,
  boxShadow,
  filter,
  backdropFilter,
  hidden,
  action,
  actionPayload,
  style,
  interactions,
}: Props) {
  const videoCtx = useVideoControlContext();
  const layout = {
    width,
    height,
    align,
    marginTop,
    marginBottom,
    marginLeft,
    marginRight,
    zIndex,
    constraints,
    effects,
    wrapperStyle,
    opacity,
    blendMode,
    boxShadow,
    filter,
    backdropFilter,
    hidden,
  } as LayoutProps;

  const [progress, setProgress] = useState(min);

  const isVolume = action === "volume" && videoCtx;
  const isSeek = action === "seek" && videoCtx;
  const seekDuration = isSeek ? Math.max(0, videoCtx.duration || 0) : 0;
  const seekRatio = isSeek && seekDuration > 0 ? (videoCtx.currentTime || 0) / seekDuration : 0;
  const value = isVolume ? (videoCtx.isMuted ? 0 : videoCtx.volume) : isSeek ? seekRatio : progress;
  const onVolumeChange = isVolume ? videoCtx.onVolumeChange : undefined;
  const onSeekTo = isSeek ? videoCtx.onSeekTo : undefined;

  const styleObj = (style ?? {}) as Record<string, unknown>;
  const { trackColor, fillColor, accentColor, trackHeight, thumbSize, borderRadius, ...restStyle } =
    styleObj;

  const use2Tone = typeof trackColor === "string" && typeof fillColor === "string";
  const trackH = trackHeight as string | undefined;
  const thumbS = thumbSize as string | undefined;
  const radius = (borderRadius as string | undefined) ?? "9999px";

  const containerStyle: React.CSSProperties = {
    position: "relative",
    width: "100%",
    minWidth: 0,
    ...(restStyle as React.CSSProperties),
  };

  const inputStyle: React.CSSProperties = {
    position: "absolute",
    inset: 0,
    width: "100%",
    height: "100%",
    margin: 0,
    opacity: 0,
    cursor: "pointer",
    zIndex: 1,
  };

  const canRenderCustom = use2Tone && trackH && thumbS;

  const trackStyle: React.CSSProperties = canRenderCustom
    ? {
        position: "absolute",
        left: 0,
        right: 0,
        top: "50%",
        transform: "translateY(-50%)",
        height: trackH,
        background: trackColor as string,
        borderRadius: radius,
        pointerEvents: "none",
      }
    : {};

  const fillStyle: React.CSSProperties = canRenderCustom
    ? {
        position: "absolute",
        left: 0,
        top: "50%",
        transform: "translateY(-50%)",
        width: `${((value - min) / (max - min)) * 100}%`,
        height: trackH,
        background: fillColor as string,
        borderRadius: radius,
        pointerEvents: "none",
      }
    : {};

  const thumbStyle: React.CSSProperties = canRenderCustom
    ? {
        position: "absolute",
        left: `calc(${((value - min) / (max - min)) * 100}% - ${thumbS} / 2)`,
        top: "50%",
        transform: "translateY(-50%)",
        width: thumbS,
        height: thumbS,
        background: fillColor as string,
        borderRadius: "50%",
        pointerEvents: "none",
      }
    : {};

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const v = parseFloat(e.target.value);
      if (onVolumeChange) {
        onVolumeChange(v);
        return;
      }
      if (onSeekTo) {
        const ratio = max === min ? 0 : (v - min) / (max - min);
        onSeekTo(Math.max(0, Math.min(1, ratio)) * seekDuration);
        return;
      }
      if (action) {
        const ratio = max === min ? 0 : (v - min) / (max - min);
        const normalizedProgress = Math.max(0, Math.min(1, ratio));
        setProgress(v);
        firePageBuilderProgressTrigger(normalizedProgress, {
          type: action,
          payload: actionPayload ?? {},
        } as PageBuilderAction);
      }
    },
    [onVolumeChange, onSeekTo, action, actionPayload, min, max, seekDuration]
  );

  if (canRenderCustom) {
    return (
      <ElementLayoutWrapper layout={layout} overflow="visible" interactions={interactions}>
        <div style={containerStyle}>
          <input
            type="range"
            min={min}
            max={max}
            step={step}
            value={value}
            onChange={handleChange}
            disabled={action === "volume" ? !isVolume : action === "seek" ? !isSeek : false}
            style={inputStyle}
            aria-label={ariaLabel ?? "Range"}
          />
          <div style={trackStyle} />
          <div style={fillStyle} />
          <div style={thumbStyle} />
        </div>
      </ElementLayoutWrapper>
    );
  }

  const fallbackAccent = (accentColor as string) ?? (use2Tone ? (fillColor as string) : undefined);

  return (
    <ElementLayoutWrapper layout={layout} overflow="visible" interactions={interactions}>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={handleChange}
        disabled={action === "volume" ? !isVolume : action === "seek" ? !isSeek : false}
        style={{
          width: "100%",
          minWidth: 0,
          ...(restStyle as React.CSSProperties),
          ...(fallbackAccent ? { accentColor: fallbackAccent } : {}),
        }}
        className="w-full min-w-0"
        aria-label={ariaLabel ?? "Range"}
      />
    </ElementLayoutWrapper>
  );
}
