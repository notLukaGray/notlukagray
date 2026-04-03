import type { CSSProperties } from "react";
import {
  buildImageMotionTimingFromAnimationDefaults,
  type PbImageAnimationDefaults,
  type PbImageVariantDefaults,
} from "@/app/theme/pb-builder-defaults";
import {
  MOTION_DEFAULTS,
  getEntranceMotionFromPreset,
  getExitMotionFromPreset,
} from "@/page-builder/core/page-builder-motion-defaults";
import type { MotionPropsFromJson } from "@/page-builder/core/page-builder-schemas";
import {
  resolveConstraintsForDevice,
  resolveResponsiveValueForDevice,
  type PreviewDevice,
} from "./responsive";
import { parseAspectRatioValue } from "./utils";

export type PreviewResolvedVariant = {
  layoutMode: PbImageVariantDefaults["layoutMode"];
  objectFit: "cover" | "contain" | "fillWidth" | "fillHeight" | "crop";
  aspectRatio?: string;
  width?: string;
  height?: string;
  constraints?: { minWidth?: string; maxWidth?: string; minHeight?: string; maxHeight?: string };
  borderRadius: string;
  objectPosition?: string;
  imageCrop?: { x: number; y: number; scale: number; focalX?: number; focalY?: number };
  align?: "left" | "center" | "right";
  alignY?: "top" | "center" | "bottom";
  marginTop?: string;
  marginBottom?: string;
  marginLeft?: string;
  marginRight?: string;
  zIndex?: number;
  rotate?: number | string;
  flipHorizontal?: boolean;
  flipVertical?: boolean;
  opacity?: number;
  blendMode?: string;
  boxShadow?: string;
  filter?: string;
  backdropFilter?: string;
  overflow?: "hidden" | "visible" | "auto" | "scroll";
  hidden?: boolean;
  animation: PbImageAnimationDefaults;
};

export function resolveVariantForPreview(
  variant: PbImageVariantDefaults,
  device: PreviewDevice
): PreviewResolvedVariant {
  return {
    layoutMode: variant.layoutMode,
    objectFit: resolveResponsiveValueForDevice(variant.objectFit, device) ?? "cover",
    aspectRatio: resolveResponsiveValueForDevice(variant.aspectRatio, device),
    width: resolveResponsiveValueForDevice(variant.width, device),
    height: resolveResponsiveValueForDevice(variant.height, device),
    constraints: resolveConstraintsForDevice(variant.constraints, device),
    borderRadius: resolveResponsiveValueForDevice(variant.borderRadius, device) ?? "0",
    objectPosition: variant.objectPosition,
    imageCrop: variant.imageCrop,
    align: resolveResponsiveValueForDevice(variant.align, device),
    alignY: resolveResponsiveValueForDevice(variant.alignY, device),
    marginTop: resolveResponsiveValueForDevice(variant.marginTop, device),
    marginBottom: resolveResponsiveValueForDevice(variant.marginBottom, device),
    marginLeft: resolveResponsiveValueForDevice(variant.marginLeft, device),
    marginRight: resolveResponsiveValueForDevice(variant.marginRight, device),
    zIndex: variant.zIndex,
    rotate: variant.rotate,
    flipHorizontal: variant.flipHorizontal,
    flipVertical: variant.flipVertical,
    opacity: variant.opacity,
    blendMode: variant.blendMode,
    boxShadow: variant.boxShadow,
    filter: variant.filter,
    backdropFilter: variant.backdropFilter,
    overflow: variant.overflow,
    hidden: variant.hidden,
    animation: variant.animation,
  };
}

export function buildPreviewMotion(animation: PbImageAnimationDefaults): MotionPropsFromJson {
  const timing = buildImageMotionTimingFromAnimationDefaults(animation);
  const entranceMotion = timing.entranceMotion as Record<string, unknown> | undefined;
  const entranceTransition =
    entranceMotion?.transition && typeof entranceMotion.transition === "object"
      ? (entranceMotion.transition as MotionPropsFromJson["transition"])
      : undefined;
  const baseMotion =
    entranceMotion && (entranceMotion.initial != null || entranceMotion.animate != null)
      ? ({
          ...(entranceTransition ? { transition: entranceTransition } : {}),
          ...(entranceMotion as MotionPropsFromJson),
        } as MotionPropsFromJson)
      : getEntranceMotionFromPreset(timing.entrancePreset ?? "fade", {
          distancePx: MOTION_DEFAULTS.defaultSlideDistancePx,
          duration:
            Number((entranceTransition as Record<string, unknown> | undefined)?.duration) ||
            MOTION_DEFAULTS.transition.duration,
          delay:
            Number((entranceTransition as Record<string, unknown> | undefined)?.delay) ||
            MOTION_DEFAULTS.transition.delay,
          ease:
            ((entranceTransition as Record<string, unknown> | undefined)?.ease as
              | string
              | [number, number, number, number]
              | undefined) ?? MOTION_DEFAULTS.easeTuple,
        });
  const exitMotion = timing.exitMotion as
    | { exit?: Record<string, unknown>; transition?: unknown }
    | undefined;
  const exitTransition =
    exitMotion?.transition && typeof exitMotion.transition === "object"
      ? (exitMotion.transition as MotionPropsFromJson["transition"])
      : undefined;
  if (exitMotion?.exit && typeof exitMotion.exit === "object") {
    return {
      ...baseMotion,
      ...(exitTransition ? { transition: exitTransition } : {}),
      exit: exitMotion.exit as Record<string, string | number | number[]>,
    };
  }
  if (typeof timing.exitPreset === "string" && timing.exitPreset.trim().length > 0) {
    const fromPreset = getExitMotionFromPreset(timing.exitPreset, {
      duration: (exitTransition as Record<string, unknown> | undefined)?.duration as
        | number
        | undefined,
      delay: (exitTransition as Record<string, unknown> | undefined)?.delay as number | undefined,
      ease: (exitTransition as Record<string, unknown> | undefined)?.ease as
        | string
        | [number, number, number, number]
        | undefined,
    });
    return {
      ...baseMotion,
      ...(fromPreset.transition
        ? { transition: fromPreset.transition as MotionPropsFromJson["transition"] }
        : {}),
      exit: fromPreset.exit as Record<string, string | number | number[]>,
    };
  }
  return baseMotion;
}

export function getLoopIntervalMs(animation: PbImageAnimationDefaults): number {
  const inDuration = !animation.fineTune.enabled
    ? MOTION_DEFAULTS.transition.duration
    : animation.fineTune.usePresetAsBase
      ? animation.fineTune.hybridDuration
      : animation.fineTune.entrance.duration;
  const outDuration = !animation.fineTune.enabled
    ? MOTION_DEFAULTS.transition.exitDuration
    : animation.fineTune.usePresetAsBase
      ? animation.fineTune.hybridDuration
      : animation.fineTune.exit.duration;
  return Math.max(1800, Math.round((inDuration + outDuration + 1.2) * 1000));
}

export function getPreviewMediaShell(variant: PreviewResolvedVariant) {
  const justifyContent =
    variant.align === "left" ? "flex-start" : variant.align === "right" ? "flex-end" : "center";
  const alignItems =
    variant.alignY === "top" ? "flex-start" : variant.alignY === "bottom" ? "flex-end" : "center";
  const stageStyle: CSSProperties = {
    justifyContent,
    alignItems,
    marginTop: variant.marginTop,
    marginBottom: variant.marginBottom,
    marginLeft: variant.marginLeft,
    marginRight: variant.marginRight,
  };
  if (variant.layoutMode === "fill") {
    return {
      className: "absolute inset-6 flex md:inset-8",
      style: stageStyle,
      mediaStyle: {
        width: variant.width ?? "100%",
        height: variant.height ?? "100%",
        maxWidth: "100%",
        maxHeight: "100%",
      },
    };
  }
  if (variant.layoutMode === "constraints") {
    return {
      className: "absolute inset-6 flex md:inset-8",
      style: stageStyle,
      mediaStyle: {
        width: variant.width ?? "70%",
        height: variant.height ?? undefined,
        minWidth: variant.constraints?.minWidth ?? "12rem",
        maxWidth: variant.constraints?.maxWidth ?? "100%",
        minHeight: variant.constraints?.minHeight ?? "8rem",
        maxHeight: variant.constraints?.maxHeight ?? "100%",
        aspectRatio: variant.aspectRatio ?? "4 / 3",
      },
    };
  }
  const frameRatio = 16 / 9;
  const mediaRatio = parseAspectRatioValue(variant.aspectRatio) ?? frameRatio;
  return {
    className: "absolute inset-6 flex md:inset-8",
    style: stageStyle,
    mediaStyle: {
      aspectRatio: variant.aspectRatio ?? "16 / 9",
      width: mediaRatio < frameRatio ? "auto" : "100%",
      height: mediaRatio < frameRatio ? "100%" : "auto",
      maxWidth: "100%",
      maxHeight: "100%",
    },
  };
}

export function getPreviewLayoutSummary(variant: PreviewResolvedVariant): string {
  if (variant.layoutMode === "fill") {
    return `Fill uses width ${variant.width ?? "100%"} and height ${variant.height ?? "100%"} inside the frame.`;
  }
  if (variant.layoutMode === "constraints") {
    return `Constraints honor min/max bounds (${variant.constraints?.minWidth ?? "12rem"} to ${
      variant.constraints?.maxWidth ?? "100%"
    }, ${variant.constraints?.minHeight ?? "8rem"} to ${variant.constraints?.maxHeight ?? "100%"}).`;
  }
  if (variant.objectFit === "crop") {
    const c = variant.imageCrop;
    const focal =
      c?.focalX != null && c?.focalY != null
        ? ` · focal ${(c.focalX * 100).toFixed(0)}%, ${(c.focalY * 100).toFixed(0)}% (metadata)`
        : "";
    return `Object fit crop: fixed frame ${variant.aspectRatio ?? "16 / 9"}; left-drag pan · right-drag scale · middle-click focal point (does not pan)${focal} — pan x ${
      c?.x ?? 0
    }%, y ${c?.y ?? 0}%, scale ${c?.scale ?? 1}.`;
  }
  return `Aspect ratio mode fits ${variant.aspectRatio ?? "16 / 9"} inside the frame.`;
}

export function getPreviewUploadImageStyle(variant: PreviewResolvedVariant): CSSProperties {
  if (variant.objectFit === "fillWidth") return { width: "100%", height: "auto", maxWidth: "100%" };
  if (variant.objectFit === "fillHeight")
    return { width: "auto", height: "100%", maxHeight: "100%" };
  if (variant.objectFit === "crop") {
    const { x, y, scale } = variant.imageCrop ?? { x: 0, y: 0, scale: 1 };
    const s = Math.min(4, Math.max(1, scale));
    return {
      width: "100%",
      height: "100%",
      objectFit: "cover",
      objectPosition: "50% 50%",
      transform: `translate(${x}%, ${y}%) scale(${s})`,
      transformOrigin: "center center",
    };
  }
  return {
    width: "100%",
    height: "100%",
    objectFit: variant.objectFit === "contain" ? "contain" : "cover",
    objectPosition: variant.objectPosition ?? "50% 50%",
  };
}

export function getPreviewFrameStyle(
  variant: PreviewResolvedVariant,
  variantLayoutStyle?: CSSProperties
): CSSProperties {
  const rotate = typeof variant.rotate === "number" ? `${variant.rotate}deg` : variant.rotate;
  const flipX = variant.flipHorizontal ? "scaleX(-1)" : "";
  const flipY = variant.flipVertical ? "scaleY(-1)" : "";
  const transforms = [rotate ? `rotate(${rotate})` : "", flipX, flipY].filter(Boolean).join(" ");
  return {
    ...variantLayoutStyle,
    ...(variant.zIndex != null ? { zIndex: variant.zIndex } : {}),
    borderRadius: variant.borderRadius,
    overflow: variant.overflow ?? "hidden",
    opacity: variant.opacity ?? 1,
    mixBlendMode: variant.blendMode as CSSProperties["mixBlendMode"],
    boxShadow: variant.boxShadow,
    filter: variant.filter,
    backdropFilter: variant.backdropFilter,
    transform: transforms.length > 0 ? transforms : undefined,
    visibility: variant.hidden ? "hidden" : "visible",
  };
}
