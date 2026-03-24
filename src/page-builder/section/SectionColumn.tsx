"use client";

import { useMemo, useRef } from "react";
import type { SectionBlock } from "@/page-builder/core/page-builder-schemas";
import { handleSectionWheel, getDefaultScrollSpeed } from "@/page-builder/core/section-utils";
import { resolveResponsiveValue } from "@/core/lib/responsive-value";
import { useSectionBaseStyles } from "@/page-builder/section/position/use-section-base-styles";
import { useStickyTrait } from "@/page-builder/section/position/use-sticky-trait";
import { useFixedTrait } from "@/page-builder/section/position/use-fixed-trait";
import { applySectionFillStyle } from "@/page-builder/core/section-style-utils";
import { LayerStack } from "./stack/LayerStack";
import { SectionGlassEffect } from "./stack/SectionGlassEffect";
import { useSectionViewportTrigger } from "@/page-builder/triggers/core/use-section-viewport-trigger";
import { useColumnLayout } from "@/page-builder/hooks/use-column-layout";
import { useDeviceType } from "@/core/providers/device-type-provider";
import {
  normalizeColumnSpanInput,
  resolveResponsiveBooleanProp,
  resolveResponsiveStringProp,
} from "./SectionColumn/section-column-prop-normalizers";
import { SectionColumnContent } from "./SectionColumn/section-column-content";
import { SectionMotionWrapper } from "@/page-builder/integrations/framer-motion";
import { SectionScrollTargetProvider } from "@/page-builder/section/position/SectionScrollTargetContext";
import { useSectionCustomTriggers } from "@/page-builder/triggers/core/use-section-custom-triggers";

type Props = Extract<SectionBlock, { type: "sectionColumn" }>;

export function SectionColumn({
  id,
  ariaLabel,
  fill,
  layers,
  effects,
  width,
  height,
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
  elements = [],
  columns,
  columnAssignments,
  columnWidths,
  columnGaps,
  columnStyles,
  itemStyles,
  gridMode,
  gridDebug,
  gridAutoRows,
  itemLayout,
  elementOrder,
  columnSpan: _columnSpan,
  contentWidth,
  contentHeight,
  minWidth,
  maxWidth,
  minHeight,
  maxHeight,
  sticky,
  stickyOffset = "0px",
  stickyPosition = "top",
  fixed,
  fixedPosition = "top",
  fixedOffset = "0px",
  onVisible,
  onInvisible,
  onProgress,
  onViewportProgress,
  threshold,
  triggerOnce,
  rootMargin,
  delay,
  motion: motionFromJson,
  motionTiming,
  reduceMotion,
  keyboardTriggers,
  timerTriggers,
  cursorTriggers,
  scrollDirectionTriggers,
  idleTriggers,
}: Props) {
  const sectionRef = useRef<HTMLElement>(null);
  const placeholderRef = useRef<HTMLDivElement>(null);
  const { isMobile } = useDeviceType();
  const resolvedAriaLabel = resolveResponsiveValue(ariaLabel, isMobile) ?? id ?? "Column layout";
  const resolvedFill = resolveResponsiveValue(fill, isMobile);
  const resolvedStickyOffset = resolveResponsiveValue(stickyOffset, isMobile) ?? "0px";
  const resolvedFixedOffset = resolveResponsiveValue(fixedOffset, isMobile) ?? "0px";

  useSectionViewportTrigger(sectionRef, {
    onVisible,
    onInvisible,
    onProgress,
    onViewportProgress,
    threshold,
    triggerOnce,
    rootMargin,
    delay,
  });

  useSectionCustomTriggers({
    keyboardTriggers,
    timerTriggers,
    cursorTriggers,
    scrollDirectionTriggers,
    idleTriggers,
  });

  const { baseStyle, resolvedLayout, alignStyle, transformY, hasInitialPosition } =
    useSectionBaseStyles({
      fill,
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
      scrollSpeed,
      initialX,
      initialY,
      zIndex,
      effects,
      sectionRef,
      usePadding: true,
      reduceMotion,
    });

  const { styleOverrides, placeholderStyle, showPlaceholder } = useStickyTrait({
    sectionRef,
    placeholderRef,
    sticky,
    stickyOffset: resolvedStickyOffset,
    stickyPosition,
    hasInitialPosition,
    resolvedLayout,
    alignStyle,
    transformY,
  });

  const fixedStyleOverrides = useFixedTrait({
    fixed,
    fixedPosition,
    fixedOffset: resolvedFixedOffset,
    resolvedLayout,
    zIndex,
  });

  const finalStyle = useMemo(() => {
    if (fixed) return { ...baseStyle, ...fixedStyleOverrides };
    if (sticky) return { ...baseStyle, ...styleOverrides };
    return baseStyle;
  }, [fixed, sticky, baseStyle, fixedStyleOverrides, styleOverrides]);

  const wheelHandler = useMemo(
    () => (e: React.WheelEvent<HTMLElement>) => handleSectionWheel(e, scrollSpeed),
    [scrollSpeed]
  );

  const normalizedColumnSpan = normalizeColumnSpanInput(_columnSpan);
  const resolvedGridDebug = resolveResponsiveBooleanProp(gridDebug, isMobile);
  const resolvedGridAutoRows = resolveResponsiveStringProp(gridAutoRows, isMobile);

  const columnLayout = useColumnLayout({
    elements,
    columns,
    columnAssignments,
    columnWidths,
    columnGaps,
    columnStyles,
    columnSpan: normalizedColumnSpan,
    itemStyles,
    gridMode,
    itemLayout,
    elementOrder,
    contentWidth,
    contentHeight,
  });

  return (
    <>
      {!fixed && showPlaceholder && (
        <div ref={placeholderRef} style={placeholderStyle} aria-hidden />
      )}
      <SectionMotionWrapper
        sectionRef={sectionRef}
        motion={motionFromJson}
        motionTiming={motionTiming}
        reduceMotion={reduceMotion}
        className="relative z-10 flex shrink-0 flex-col min-h-0"
        style={applySectionFillStyle(resolvedFill, layers, finalStyle)}
        aria-label={resolvedAriaLabel}
        onWheel={fixed ? undefined : wheelHandler}
      >
        <SectionScrollTargetProvider sectionRef={sectionRef}>
          {layers?.length ? <LayerStack layers={layers} /> : null}
          <SectionGlassEffect effects={effects} sectionRef={sectionRef} />
          <SectionColumnContent
            elements={elements}
            columnLayout={columnLayout}
            gridDebug={resolvedGridDebug}
            gridAutoRows={resolvedGridAutoRows}
          />
        </SectionScrollTargetProvider>
      </SectionMotionWrapper>
    </>
  );
}
