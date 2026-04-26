"use client";

import { useCallback, useEffect, useMemo, useRef, type CSSProperties } from "react";
import { useDeviceType } from "@pb/runtime-react/core/providers/device-type-provider";
import type { ElementBlock } from "@pb/contracts/page-builder/core/page-builder-schemas";
import { getPbContentGuidelines } from "@pb/core/internal/adapters/host-config";
import { resolveResponsiveValue } from "@pb/runtime-react/core/lib/responsive-value";
import {
  scaleRadiusForDensity,
  scaleSpaceShorthandForDensity,
} from "@pb/contracts/page-builder/core/page-density";
import {
  coalesceEmptyString,
  getElementLayoutStyle,
  normalizeFlexAlignItemsValue,
  normalizeFlexJustifyContentValue,
  resolveFrameColumnGapCss,
  resolveFrameGapCss,
  resolveFrameRowGapCss,
} from "@pb/core/internal/element-layout-utils";
import { resolveThemeStyleObject, resolveThemeValueDeep } from "@/page-builder/theme/theme-string";
import { usePageBuilderThemeMode } from "@/page-builder/theme/use-page-builder-theme-mode";
import { SectionGlassEffect } from "@/page-builder/section/stack/SectionGlassEffect";
import {
  buildBorderGradientOverlayStyle,
  coerceSectionEffects,
  type BorderGradient,
} from "@/page-builder/elements/ElementModule/element-module-style-utils";
import { useVideoControlContext } from "@/page-builder/elements/ElementVideo/VideoControlContext";
import { SectionDefinitionsContext } from "@/page-builder/elements/ElementModule/ModuleSlotContext";
import { ElementErrorBoundary } from "@/page-builder/SectionErrorBoundary";
import { ElementRenderer } from "@/page-builder/elements/Shared/ElementRenderer";
import { DEFAULT_SNAP_DURATION_MS, lerp } from "./ElementInfiniteScroll/infinite-scroll-math";
import { useInfiniteScrollBlocks } from "./ElementInfiniteScroll/infinite-scroll-blocks";
import {
  buildContainerStyle,
  buildItemStyle,
  buildRootStyle,
  buildTrackStyle,
} from "./ElementInfiniteScroll/infinite-scroll-styles";
import type { InfiniteScrollProps } from "./ElementInfiniteScroll/infinite-scroll-types";
import { usePrefersReducedMotion } from "./ElementInfiniteScroll/use-prefers-reduced-motion";
import { useInfiniteScrollGestures } from "./ElementInfiniteScroll/use-infinite-scroll-gestures";
import { useInfiniteScrollLoopBounds } from "./ElementInfiniteScroll/use-infinite-scroll-loop-bounds";
import { useInfiniteScrollSelectionPublish } from "./ElementInfiniteScroll/use-infinite-scroll-selection-publish";
import { useInfiniteScrollSnap } from "./ElementInfiniteScroll/use-infinite-scroll-snap";

export function ElementInfiniteScroll({
  section,
  width,
  height,
  minWidth,
  minHeight,
  maxWidth,
  maxHeight,
  align,
  marginTop,
  marginBottom,
  marginLeft,
  marginRight,
  figmaConstraints,
  borderRadius,
  wrapperStyle,
  borderGradient,
  effects,
  scrollDirection = "vertical",
  loop = true,
  initialIndex = 0,
  selectedIndexVariable,
  selectedIdVariable,
  selectedValueVariable,
  selectedValues,
  snapAlign = "center",
  centerOnClick = true,
  wheelLockMs,
  snapDurationMs = DEFAULT_SNAP_DURATION_MS,
  activeScale = 1,
  inactiveScale = 1,
  activeOpacity = 1,
  inactiveOpacity = 1,
  activeItemStyle,
  inactiveItemStyle,
  alignItems,
  justifyContent,
  gap,
  rowGap,
  columnGap,
  padding,
  paddingTop,
  paddingRight,
  paddingBottom,
  paddingLeft,
}: InfiniteScrollProps) {
  const pbContentGuidelines = getPbContentGuidelines();
  const { isMobile } = useDeviceType();
  const themeMode = usePageBuilderThemeMode();
  const videoCtx = useVideoControlContext();
  const prefersReducedMotion = usePrefersReducedMotion();
  const containerRef = useRef<HTMLDivElement>(null);
  const itemRefs = useRef<Array<HTMLDivElement | null>>([]);

  const resolvedWrapperStyle = resolveThemeStyleObject(
    wrapperStyle as Record<string, unknown> | undefined,
    themeMode
  ) as CSSProperties | undefined;
  const resolvedBorderGradient = resolveThemeValueDeep(borderGradient, themeMode) as
    | BorderGradient
    | undefined;
  const resolvedActiveItemStyle = resolveThemeStyleObject(
    activeItemStyle as Record<string, unknown> | undefined,
    themeMode
  ) as CSSProperties | undefined;
  const resolvedInactiveItemStyle = resolveThemeStyleObject(
    inactiveItemStyle as Record<string, unknown> | undefined,
    themeMode
  ) as CSSProperties | undefined;
  const groupEffects = useMemo(
    () => coerceSectionEffects(resolveThemeValueDeep(effects, themeMode)),
    [effects, themeMode]
  );
  const hasGlassEffect = (groupEffects ?? []).some((effect) => effect.type === "glass");
  const resolveShowWhen = useCallback(
    (showWhen: string | undefined) => videoCtx?.resolveShowWhen(showWhen) ?? true,
    [videoCtx]
  );

  const {
    blocks,
    definitions,
    fallbackSelectableBaseIndex,
    initialRenderedIndex,
    itemCount,
    normalizedInitialIndex,
    renderedItems,
    selectableBaseIndexSet,
    selectableBaseIndices,
    selectableRenderedIndices,
  } = useInfiniteScrollBlocks(section, resolveShowWhen, selectedValues, initialIndex, loop);

  const { normalizeLoopScrollPosition, scheduleNormalizeRetry } = useInfiniteScrollLoopBounds({
    axis: scrollDirection,
    containerRef,
    itemCount,
    itemRefs,
    loop,
  });

  const {
    activeBaseIndex,
    clearPendingSnapTarget,
    goToBaseIndex,
    goToRenderedIndex,
    isMoving,
    isMovingRef,
    isPointerActiveRef,
    onScroll,
    realignToCommitted,
    setPointerActive,
    stepBy,
    stepByPage,
  } = useInfiniteScrollSnap({
    axis: scrollDirection,
    containerRef,
    fallbackSelectableBaseIndex,
    initialRenderedIndex,
    itemCount,
    itemRefs,
    loop,
    normalizeLoopScrollPosition,
    normalizedInitialIndex,
    prefersReducedMotion,
    scheduleNormalizeRetry,
    selectableBaseIndices,
    selectableRenderedIndices,
    snapAlign,
    snapDurationMs,
  });

  const { onKeyDown, onPointerCancel, onPointerDown, onPointerUp } = useInfiniteScrollGestures({
    axis: scrollDirection,
    cancelPendingSnapTarget: clearPendingSnapTarget,
    containerRef,
    goToBaseIndex,
    itemCount,
    markMoving: onScroll,
    selectableBaseIndices,
    setPointerActive,
    stepBy,
    stepByPage,
    wheelLockMs,
  });

  useInfiniteScrollSelectionPublish({
    activeBaseIndex,
    blocks,
    isMoving,
    itemCount,
    selectedIdVariable,
    selectedIndexVariable,
    selectedValueVariable,
    selectedValues,
  });

  useEffect(() => {
    itemRefs.current.length = renderedItems.length;
  }, [renderedItems.length]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container || itemCount === 0) return;

    const observer =
      typeof ResizeObserver !== "undefined"
        ? new ResizeObserver(() => {
            if (isPointerActiveRef.current || isMovingRef.current) return;
            realignToCommitted();
          })
        : null;

    if (observer) {
      observer.observe(container);
      for (const item of itemRefs.current) {
        if (item) observer.observe(item);
      }
    }

    return () => observer?.disconnect();
  }, [isMovingRef, isPointerActiveRef, itemCount, realignToCommitted, renderedItems.length]);

  const resolvedActiveScale = resolveResponsiveValue(activeScale, isMobile) ?? 1;
  const resolvedInactiveScale = resolveResponsiveValue(inactiveScale, isMobile) ?? 1;
  const resolvedActiveOpacity = resolveResponsiveValue(activeOpacity, isMobile) ?? 1;
  const resolvedInactiveOpacity = resolveResponsiveValue(inactiveOpacity, isMobile) ?? 1;
  const resolvedAlignItems = resolveResponsiveValue(alignItems, isMobile);
  const resolvedJustifyContent = resolveResponsiveValue(justifyContent, isMobile);
  const resolvedGapValue = resolveResponsiveValue(gap, isMobile);
  const resolvedPadding = resolveResponsiveValue(padding, isMobile);
  const resolvedTrackAlignItems = normalizeFlexAlignItemsValue(
    coalesceEmptyString(resolvedAlignItems) ?? pbContentGuidelines.frameAlignItemsDefault
  );

  const layoutStyle = getElementLayoutStyle(
    {
      width,
      height,
      borderRadius,
      constraints: {
        ...(minWidth != null ? { minWidth: String(minWidth) } : {}),
        ...(minHeight != null ? { minHeight: String(minHeight) } : {}),
        ...(maxWidth != null ? { maxWidth: String(maxWidth) } : {}),
        ...(maxHeight != null ? { maxHeight: String(maxHeight) } : {}),
      },
      align,
      marginTop,
      marginBottom,
      marginLeft,
      marginRight,
      figmaConstraints,
    },
    isMobile
  );

  const effectiveBorderRadius =
    layoutStyle.borderRadius != null && String(layoutStyle.borderRadius).trim() !== ""
      ? layoutStyle.borderRadius
      : scaleRadiusForDensity(pbContentGuidelines.frameBorderRadiusDefault);
  const resolvedGap = resolveFrameGapCss(resolvedGapValue);
  const resolvedRowGap = resolveFrameRowGapCss(
    rowGap === undefined || rowGap === null ? rowGap : String(rowGap)
  );
  const resolvedColumnGap = resolveFrameColumnGapCss(
    columnGap === undefined || columnGap === null ? columnGap : String(columnGap)
  );
  const hasExplicitPadding =
    padding != null ||
    paddingTop != null ||
    paddingRight != null ||
    paddingBottom != null ||
    paddingLeft != null;
  const framePaddingFallback = !hasExplicitPadding
    ? { padding: scaleSpaceShorthandForDensity(pbContentGuidelines.framePaddingDefault) }
    : {};

  const rootStyle = buildRootStyle({
    effectiveBorderRadius,
    hasVisualOverlay: !!resolvedBorderGradient || hasGlassEffect,
    layoutStyle,
    wrapperStyle: resolvedWrapperStyle,
  });

  const containerStyle = buildContainerStyle({
    axis: scrollDirection,
  });

  const trackStyle = buildTrackStyle({
    alignItems: resolvedTrackAlignItems,
    axis: scrollDirection,
    columnGap: resolvedColumnGap,
    framePaddingFallback,
    gap: resolvedGap,
    justifyContent: normalizeFlexJustifyContentValue(
      coalesceEmptyString(resolvedJustifyContent) ?? pbContentGuidelines.frameJustifyContentDefault
    ) as CSSProperties["justifyContent"],
    padding: resolvedPadding,
    paddingBottom,
    paddingLeft,
    paddingRight,
    paddingTop,
    rowGap: resolvedRowGap,
  });

  const hasBorderGradient =
    resolvedBorderGradient != null &&
    typeof resolvedBorderGradient === "object" &&
    typeof resolvedBorderGradient.stroke === "string" &&
    (typeof resolvedBorderGradient.width === "string" ||
      typeof resolvedBorderGradient.width === "number");

  return (
    <div style={rootStyle} className="shrink-0">
      <SectionGlassEffect effects={groupEffects} sectionRef={containerRef} variant="auto" />
      {hasBorderGradient ? (
        <div
          aria-hidden
          style={buildBorderGradientOverlayStyle(
            resolvedBorderGradient as BorderGradient,
            rootStyle.borderRadius
          )}
        />
      ) : null}
      <div
        ref={containerRef}
        style={containerStyle}
        className="scroll-container-hide-scrollbar relative focus:outline-none focus-visible:ring-2 focus-visible:ring-current focus-visible:ring-offset-2 focus-visible:ring-offset-transparent"
        onKeyDown={onKeyDown}
        onPointerCancel={onPointerCancel}
        onPointerDown={onPointerDown}
        onPointerUp={onPointerUp}
        onScroll={onScroll}
        tabIndex={0}
        role="listbox"
        aria-roledescription="carousel"
        aria-orientation={scrollDirection}
      >
        <SectionDefinitionsContext.Provider value={definitions}>
          <div style={trackStyle}>
            {renderedItems.map(({ baseIndex, renderedIndex, block, renderKey }) => {
              const isActive = baseIndex === activeBaseIndex;
              const movingActiveBlend = isMoving && isActive ? 0.72 : 0;
              const visualScale = isActive
                ? lerp(resolvedActiveScale, resolvedInactiveScale, movingActiveBlend)
                : resolvedInactiveScale;
              const visualOpacity = isActive
                ? lerp(resolvedActiveOpacity, resolvedInactiveOpacity, movingActiveBlend)
                : resolvedInactiveOpacity;
              const isSelectable = selectableBaseIndexSet.has(baseIndex);

              return (
                <div
                  key={renderKey}
                  ref={(node) => {
                    itemRefs.current[renderedIndex] = node;
                  }}
                  style={buildItemStyle({
                    activeItemStyle: resolvedActiveItemStyle,
                    axis: scrollDirection,
                    centerOnClick,
                    inactiveItemStyle: resolvedInactiveItemStyle,
                    isActive,
                    isMoving,
                    isSelectable,
                    opacity: visualOpacity,
                    prefersReducedMotion,
                    scale: visualScale,
                    snapAlign,
                    snapDurationMs,
                    stretchCrossAxis:
                      scrollDirection === "vertical" && resolvedTrackAlignItems === "stretch",
                  })}
                  onClick={
                    centerOnClick && isSelectable
                      ? () => goToRenderedIndex(renderedIndex)
                      : undefined
                  }
                  data-pb-active={isActive ? "true" : "false"}
                  data-pb-moving={isMoving ? "true" : "false"}
                  data-pb-index={baseIndex}
                  role="option"
                  aria-selected={isActive}
                >
                  <ElementErrorBoundary elementKey={renderKey} key={`${renderKey}-boundary`}>
                    <ElementRenderer block={block as ElementBlock} />
                  </ElementErrorBoundary>
                </div>
              );
            })}
          </div>
        </SectionDefinitionsContext.Provider>
      </div>
    </div>
  );
}
