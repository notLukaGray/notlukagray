"use client";

import { useMemo, useRef } from "react";
import type { SectionBlock } from "@pb/contracts/page-builder/core/page-builder-schemas";
import { handleSectionWheel, getDefaultScrollSpeed } from "@pb/core/internal/section-utils";
import { resolveResponsiveValue } from "@pb/runtime-react/core/lib/responsive-value";
import { useSectionBaseStyles } from "@/page-builder/section/position/use-section-base-styles";
import { useStickyTrait } from "@/page-builder/section/position/use-sticky-trait";
import { useFixedTrait } from "@/page-builder/section/position/use-fixed-trait";
import { useDeviceType } from "@pb/runtime-react/core/providers/device-type-provider";
import { applySectionFillStyle } from "@pb/core/internal/section-style-utils";
import { LayerStack } from "./stack/LayerStack";
import { SectionGlassEffect } from "./stack/SectionGlassEffect";
import { useSectionViewportTrigger } from "@/page-builder/triggers/core/use-section-viewport-trigger";
import { useSectionCustomTriggers } from "@/page-builder/triggers/core/use-section-custom-triggers";
import { SectionMotionWrapper } from "@/page-builder/integrations/framer-motion";
import { SectionScrollTargetProvider } from "@/page-builder/section/position/SectionScrollTargetContext";
import { usePageBuilderThemeMode } from "@/page-builder/theme/use-page-builder-theme-mode";
import { resolveThemeString } from "@/page-builder/theme/theme-string";

type Props = Extract<SectionBlock, { type: "divider" }>;

export function SectionDivider({
  id,
  ariaLabel,
  fill,
  layers,
  effects,
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
  clipPath,
  cursor,
  aspectRatio,
  scrollSpeed = getDefaultScrollSpeed(),
  initialX,
  initialY,
  zIndex,
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
  const themeMode = usePageBuilderThemeMode();
  const resolvedAriaLabel = resolveResponsiveValue(ariaLabel, isMobile) ?? id;
  const resolvedFill = resolveThemeString(resolveResponsiveValue(fill, isMobile), themeMode);
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
      clipPath,
      cursor,
      aspectRatio,
      scrollSpeed,
      initialX,
      initialY,
      zIndex,
      effects,
      sectionRef,
      reduceMotion,
      usePadding: false,
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

  const sectionProps = {
    className: "relative z-10 shrink-0 min-h-0",
    style: applySectionFillStyle(resolvedFill, layers, finalStyle),
    "aria-hidden": resolvedAriaLabel ? undefined : true,
    ...(resolvedAriaLabel && { "aria-label": resolvedAriaLabel }),
    onWheel: fixed ? undefined : wheelHandler,
  };

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
        {...sectionProps}
      >
        <SectionScrollTargetProvider sectionRef={sectionRef}>
          {layers?.length ? <LayerStack layers={layers} /> : null}
          <SectionGlassEffect effects={effects} sectionRef={sectionRef} isSectionFixed={!!fixed} />
        </SectionScrollTargetProvider>
      </SectionMotionWrapper>
    </>
  );
}
