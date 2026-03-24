import type { CSSProperties } from "react";
import type { ElementBlock } from "@/page-builder/core/page-builder-schemas";
import {
  getElementLayoutStyle,
  getElementTransformStyle,
  type ElementLayoutTransformOptions,
} from "@/page-builder/core/element-layout-utils";
import { resolveElementImageLink } from "./element-image-link";

type ElementImageProps = Extract<ElementBlock, { type: "elementImage" }>;
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
  if (objectFit === "cover" || objectFit === "contain") {
    imgStyle.width = "100%";
    imgStyle.height = "100%";
    imgStyle.objectFit = objectFit;
    imgStyle.objectPosition = resolvedObjectPosition;
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

  const nextImageFillStyle: CSSProperties = {
    display: "block",
    objectFit: objectFit === "cover" || objectFit === "contain" ? objectFit : "cover",
    objectPosition: resolvedObjectPosition,
  };

  const hasSource = src != null && String(src).trim() !== "";
  const useIntrinsicSizing = height === "hug" || fillHeight;
  const fillImgStyle: CSSProperties =
    fillHeight && useIntrinsicSizing
      ? {
          display: "block",
          width: "100%",
          height: "100%",
          objectFit: objectFit === "contain" ? "contain" : "cover",
          objectPosition: resolvedObjectPosition,
        }
      : imgStyle;

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
