"use client";

import { useMemo, type CSSProperties } from "react";
import type { BaseSectionProps } from "@pb/core/internal/page-builder-schemas";
import { resolveResponsiveValue } from "@pb/runtime-react/core/lib/responsive-value";
import { sectionEffectsToStyle } from "@pb/core/internal/section-effects";
import {
  getDefaultScrollSpeed,
  buildTransformString,
  borderToCss,
} from "@pb/core/internal/section-utils";
import { useDeviceType } from "@pb/runtime-react/core/providers/device-type-provider";
import { useSectionParallax } from "./use-section-parallax";
import { useSectionPositioning } from "./use-section-positioning";

type UseSectionBaseStylesProps = Pick<
  BaseSectionProps,
  | "id"
  | "ariaLabel"
  | "fill"
  | "layers"
  | "effects"
  | "width"
  | "height"
  | "minWidth"
  | "maxWidth"
  | "minHeight"
  | "maxHeight"
  | "align"
  | "marginLeft"
  | "marginRight"
  | "marginTop"
  | "marginBottom"
  | "borderRadius"
  | "border"
  | "boxShadow"
  | "filter"
  | "backdropFilter"
  | "scrollSpeed"
  | "initialX"
  | "initialY"
  | "zIndex"
  | "reduceMotion"
> & {
  sectionRef: React.RefObject<HTMLElement | null>;
  usePadding?: boolean; // If true, uses padding instead of margin for spacing
};

export type ResolvedSectionLayout = {
  width: string | undefined;
  height: string | undefined;
  minWidth: string | undefined;
  maxWidth: string | undefined;
  minHeight: string | undefined;
  maxHeight: string | undefined;
  align: "left" | "center" | "right" | "full" | undefined;
  marginLeft: string | undefined;
  marginRight: string | undefined;
  marginTop: string | undefined;
  marginBottom: string | undefined;
  initialX: string | undefined;
  initialY: string | undefined;
};

export function useSectionBaseStyles({
  width,
  height,
  minWidth,
  maxWidth,
  minHeight,
  maxHeight,
  align,
  marginLeft,
  marginRight,
  marginTop,
  marginBottom,
  borderRadius,
  border,
  boxShadow,
  filter,
  backdropFilter,
  scrollSpeed = getDefaultScrollSpeed(),
  initialX,
  initialY,
  zIndex,
  effects,
  sectionRef,
  usePadding = false,
  reduceMotion,
}: UseSectionBaseStylesProps) {
  const { isMobile } = useDeviceType();

  const resolvedLayout = useMemo<ResolvedSectionLayout>(
    () => ({
      width: resolveResponsiveValue(width, isMobile),
      height: resolveResponsiveValue(height, isMobile),
      minWidth: resolveResponsiveValue(minWidth, isMobile),
      maxWidth: resolveResponsiveValue(maxWidth, isMobile),
      minHeight: resolveResponsiveValue(minHeight, isMobile),
      maxHeight: resolveResponsiveValue(maxHeight, isMobile),
      align: resolveResponsiveValue(align, isMobile) as ResolvedSectionLayout["align"] | undefined,
      marginLeft: resolveResponsiveValue(marginLeft, isMobile),
      marginRight: resolveResponsiveValue(marginRight, isMobile),
      marginTop: resolveResponsiveValue(marginTop, isMobile),
      marginBottom: resolveResponsiveValue(marginBottom, isMobile),
      initialX: resolveResponsiveValue(initialX, isMobile),
      initialY: resolveResponsiveValue(initialY, isMobile),
    }),
    [
      width,
      height,
      minWidth,
      maxWidth,
      minHeight,
      maxHeight,
      align,
      marginLeft,
      marginRight,
      marginTop,
      marginBottom,
      initialX,
      initialY,
      isMobile,
    ]
  );

  const transformY = useSectionParallax(scrollSpeed, resolvedLayout.initialY, sectionRef, {
    respectReducedMotion: reduceMotion !== false,
  });
  const { alignStyle, positioningStyle, shouldApplyAlignStyle, hasInitialPosition } =
    useSectionPositioning({
      align: resolvedLayout.align,
      width: resolvedLayout.width,
      initialX: resolvedLayout.initialX,
      initialY: resolvedLayout.initialY,
    });

  const resolvedBorderRadius = resolveResponsiveValue(borderRadius, isMobile);

  const baseStyle = useMemo<CSSProperties>(() => {
    const effectStyle = sectionEffectsToStyle(effects);
    const mergedBoxShadow = [effectStyle.boxShadow, boxShadow]
      .filter((value): value is string => typeof value === "string" && value.length > 0)
      .join(", ");
    const mergedFilter = [effectStyle.filter, filter]
      .filter((value): value is string => typeof value === "string" && value.length > 0)
      .join(" ");
    const mergedBackdropFilter = [effectStyle.backdropFilter, backdropFilter]
      .filter((value): value is string => typeof value === "string" && value.length > 0)
      .join(" ");

    const w = resolvedLayout.width;
    const h = resolvedLayout.height;
    const style: CSSProperties = {
      width: w === "hug" ? "fit-content" : w,
      height: h === "hug" ? "fit-content" : h,
      ...(resolvedLayout.minWidth != null ? { minWidth: resolvedLayout.minWidth } : {}),
      ...(resolvedLayout.maxWidth != null ? { maxWidth: resolvedLayout.maxWidth } : {}),
      ...(resolvedLayout.minHeight != null ? { minHeight: resolvedLayout.minHeight } : {}),
      ...(resolvedLayout.maxHeight != null ? { maxHeight: resolvedLayout.maxHeight } : {}),
      borderRadius: resolvedBorderRadius,
      border: borderToCss(border),
      overflowX: "hidden",
      overflowY: "hidden",
      scrollBehavior: "smooth",
      ...(zIndex != null ? { zIndex } : {}),
      ...(shouldApplyAlignStyle ? alignStyle : {}),
      ...positioningStyle,
      ...effectStyle,
      ...(mergedBoxShadow ? { boxShadow: mergedBoxShadow } : {}),
      ...(mergedFilter ? { filter: mergedFilter } : {}),
      ...(mergedBackdropFilter
        ? {
            backdropFilter: mergedBackdropFilter,
            WebkitBackdropFilter: mergedBackdropFilter,
          }
        : {}),
    };

    if (usePadding) {
      style.paddingLeft = resolvedLayout.marginLeft;
      style.paddingRight = resolvedLayout.marginRight;
      style.paddingTop = resolvedLayout.marginTop;
      style.paddingBottom = resolvedLayout.marginBottom;
      // When using padding, don't set margins (padding handles spacing internally)
    } else {
      style.marginLeft = resolvedLayout.marginLeft;
      style.marginRight = resolvedLayout.marginRight;
      style.marginTop = resolvedLayout.marginTop;
      style.marginBottom = resolvedLayout.marginBottom;
      // Explicit marginLeft/marginRight from section JSON override align-derived values (e.g. center → margin auto)
      if (resolvedLayout.marginLeft != null) style.marginLeft = resolvedLayout.marginLeft;
      if (resolvedLayout.marginRight != null) style.marginRight = resolvedLayout.marginRight;
    }

    const existingTransform = positioningStyle.transform as string | undefined;
    const transform = buildTransformString(existingTransform, transformY);
    if (transform) {
      style.transform = transform;
    }

    return style;
  }, [
    resolvedLayout,
    resolvedBorderRadius,
    border,
    zIndex,
    transformY,
    alignStyle,
    positioningStyle,
    shouldApplyAlignStyle,
    effects,
    boxShadow,
    filter,
    backdropFilter,
    usePadding,
  ]);

  return {
    baseStyle,
    transformY,
    alignStyle,
    positioningStyle,
    shouldApplyAlignStyle,
    resolvedLayout,
    hasInitialPosition,
  };
}
