import type { CSSProperties } from "react";
import type { ElementBlock } from "@/page-builder/core/page-builder-schemas";
import {
  getElementLayoutStyle,
  getElementTransformStyle,
  type ElementLayoutTransformOptions,
} from "@/page-builder/core/element-layout-utils";
import { resolveElementImageLink } from "./element-image-link";

type ElementImageProps = Extract<ElementBlock, { type: "elementImage" }>;

function applyImageCropToImageStyles(
  target: CSSProperties,
  imageCrop: NonNullable<ElementImageProps["imageCrop"]> | undefined,
  objectFit: ElementImageProps["objectFit"] | undefined
): void {
  const fit = objectFit ?? "cover";
  if (fit === "crop") {
    const c = imageCrop ?? { x: 0, y: 0, scale: 1 };
    const x = Number(c.x ?? 0);
    const y = Number(c.y ?? 0);
    const scaleRaw = Number(c.scale ?? 1);
    const scale = Number.isFinite(scaleRaw) ? Math.min(4, Math.max(1, scaleRaw)) : 1;
    target.objectPosition = "50% 50%";
    target.transform = `translate(${x}%, ${y}%) scale(${scale})`;
    target.transformOrigin = "center center";
    return;
  }
  if (!imageCrop || typeof imageCrop !== "object") return;
  if (fit !== "cover" && fit !== "contain") return;
  const x = Number(imageCrop.x ?? 0);
  const y = Number(imageCrop.y ?? 0);
  const scaleRaw = Number(imageCrop.scale ?? 1);
  const scale = Number.isFinite(scaleRaw) ? Math.min(4, Math.max(1, scaleRaw)) : 1;
  target.objectPosition = "50% 50%";
  target.transform = `translate(${x}%, ${y}%) scale(${scale})`;
  target.transformOrigin = "center center";
}

type ComputedElementImagePresentation = {
  fillHeight: boolean;
  hasSource: boolean;
  useIntrinsicSizing: boolean;
  effectiveMinHeight: string | undefined;
  imgStyle: CSSProperties;
  fillImgStyle: CSSProperties;
  nextImageFillStyle: CSSProperties;
  figureStyle: CSSProperties;
  contentWrapperStyle: CSSProperties;
  figureClassName: string;
  resolvedHref: string | null;
  isInternal: boolean;
  imageFrameStyle: CSSProperties;
};

export function computeElementImagePresentation(
  props: Partial<ElementImageProps> & Pick<ElementImageProps, "type" | "src" | "alt">
): ComputedElementImagePresentation {
  const {
    src,
    width,
    height,
    borderRadius,
    constraints,
    align,
    alignY,
    marginTop,
    marginBottom,
    marginLeft,
    marginRight,
    zIndex,
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
    link,
    aspectRatio,
    figmaConstraints,
    imageCrop,
  } = props;

  const fillHeight = height === "100%";
  const layoutStyle: CSSProperties = getElementLayoutStyle({
    width,
    height: fillHeight ? undefined : height,
    borderRadius,
    constraints,
    align,
    alignY,
    marginTop,
    marginBottom,
    marginLeft,
    marginRight,
    zIndex,
    figmaConstraints,
    effects,
    wrapperStyle,
    opacity,
    blendMode,
    boxShadow,
    filter,
    backdropFilter,
    overflow,
    hidden,
  });

  const innerStyle: CSSProperties = {
    ...getElementTransformStyle({
      width,
      height,
      align,
      marginTop,
      marginBottom,
      marginLeft,
      marginRight,
      rotate,
      flipHorizontal,
      flipVertical,
    } as ElementLayoutTransformOptions),
  };

  if (fillHeight) innerStyle.height = "100%";

  const isFillWidth = objectFit === "fillWidth";
  const isFillHeight = objectFit === "fillHeight";
  const isCropFit = objectFit === "crop";
  if (isFillWidth) {
    innerStyle.height = "auto";
    innerStyle.alignItems = "stretch";
  }
  if (isFillHeight) innerStyle.width = "100%";

  const resolvedObjectPosition =
    objectPosition ??
    (align === "left" ? "left center" : align === "right" ? "right center" : "50% 50%");

  const imgStyle: CSSProperties = {
    display: "block",
    maxWidth: "100%",
    maxHeight: "100%",
  };
  if (objectFit === "cover" || objectFit === "contain" || isCropFit) {
    imgStyle.width = "100%";
    imgStyle.height = "100%";
    imgStyle.objectFit = isCropFit ? "cover" : objectFit;
    imgStyle.objectPosition = isCropFit ? "50% 50%" : resolvedObjectPosition;
  } else if (isFillWidth) {
    imgStyle.width = "100%";
    imgStyle.height = "auto";
  } else if (isFillHeight) {
    imgStyle.height = "100%";
    imgStyle.width = "auto";
  } else {
    imgStyle.width = "100%";
    imgStyle.height = "100%";
    imgStyle.objectFit = "cover";
    imgStyle.objectPosition = resolvedObjectPosition;
  }

  applyImageCropToImageStyles(imgStyle, imageCrop, objectFit);

  const nextImageFillStyle: CSSProperties = {
    display: "block",
    objectFit:
      objectFit === "cover" || objectFit === "contain"
        ? objectFit
        : objectFit === "crop"
          ? "cover"
          : "cover",
    objectPosition: isCropFit ? "50% 50%" : resolvedObjectPosition,
  };

  applyImageCropToImageStyles(nextImageFillStyle, imageCrop, objectFit);

  const hasSource = src != null && String(src).trim() !== "";
  const useIntrinsicSizing = height === "hug" || fillHeight;
  const fillImgStyle: CSSProperties =
    fillHeight && useIntrinsicSizing
      ? {
          display: "block",
          width: "100%",
          height: "100%",
          objectFit: objectFit === "contain" ? "contain" : objectFit === "crop" ? "cover" : "cover",
          objectPosition: isCropFit ? "50% 50%" : resolvedObjectPosition,
        }
      : imgStyle;

  if (fillHeight && useIntrinsicSizing) {
    applyImageCropToImageStyles(fillImgStyle, imageCrop, objectFit);
  }

  const effectiveMinHeight =
    constraints && !Array.isArray(constraints) ? constraints.minHeight : undefined;

  const cssAspectRatio: CSSProperties["aspectRatio"] =
    aspectRatio == null
      ? undefined
      : Array.isArray(aspectRatio)
        ? `${aspectRatio[0]}/${aspectRatio[1]}`
        : aspectRatio;

  const figureStyle: CSSProperties = {
    ...layoutStyle,
    ...(cssAspectRatio != null ? { aspectRatio: cssAspectRatio } : {}),
    ...(fillHeight
      ? effectiveMinHeight != null
        ? {
            height: effectiveMinHeight,
            flexShrink: 0,
            alignSelf: "stretch",
          }
        : {
            flex: "1 1 0",
            minHeight: "200px",
            alignSelf: "stretch",
          }
      : effectiveMinHeight != null
        ? { minHeight: effectiveMinHeight }
        : {}),
  };

  const { resolvedHref, isInternal } = resolveElementImageLink(link);

  const contentWrapperStyle: CSSProperties = {
    ...innerStyle,
    width: innerStyle.width ?? "100%",
    ...(useIntrinsicSizing && !fillHeight ? {} : { height: innerStyle.height ?? "100%" }),
  };

  const imageFrameStyle: CSSProperties = {
    position: useIntrinsicSizing && !fillHeight ? "static" : "relative",
    display: "block",
    width: "100%",
    height: useIntrinsicSizing && !fillHeight ? "auto" : "100%",
    overflow: "hidden",
    ...(fillHeight
      ? { minHeight: effectiveMinHeight ?? "200px" }
      : effectiveMinHeight != null && !useIntrinsicSizing
        ? { minHeight: effectiveMinHeight }
        : {}),
  };

  const figureClassName =
    fillHeight && effectiveMinHeight != null
      ? "m-0 min-w-0 shrink-0 overflow-hidden"
      : fillHeight
        ? "m-0 min-h-0 flex-1 min-w-0 overflow-hidden"
        : "m-0 shrink-0 overflow-hidden";

  return {
    fillHeight,
    hasSource,
    useIntrinsicSizing,
    effectiveMinHeight,
    imgStyle,
    fillImgStyle,
    nextImageFillStyle,
    figureStyle,
    contentWrapperStyle,
    figureClassName,
    resolvedHref,
    isInternal,
    imageFrameStyle,
  };
}
