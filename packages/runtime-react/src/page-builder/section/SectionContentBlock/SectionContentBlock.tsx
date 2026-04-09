"use client";

import { useMemo, useRef } from "react";
import { useShallow } from "zustand/react/shallow";
import type {
  SectionBlock,
  SectionDefinitionBlock,
} from "@pb/contracts/page-builder/core/page-builder-schemas";
import { handleSectionWheel, getDefaultScrollSpeed } from "@pb/core/internal/section-utils";
import { resolveResponsiveValue } from "@pb/runtime-react/core/lib/responsive-value";
import { useDeviceType } from "@pb/runtime-react/core/providers/device-type-provider";
import { SectionMotionWrapper } from "@/page-builder/integrations/framer-motion";
import { applySectionFillStyle } from "@pb/core/internal/section-style-utils";
import { useSectionBaseStyles } from "@/page-builder/section/position/use-section-base-styles";
import { useStickyTrait } from "@/page-builder/section/position/use-sticky-trait";
import { useFixedTrait } from "@/page-builder/section/position/use-fixed-trait";
import { LayerStack } from "@/page-builder/section/stack/LayerStack";
import { SectionGlassEffect } from "@/page-builder/section/stack/SectionGlassEffect";
import { useSectionViewportTrigger } from "@/page-builder/triggers/core/use-section-viewport-trigger";
import { buildSectionContentWrapperStyle } from "./section-content-block-content-wrapper-style";
import { resolveSectionContentBlockElements } from "./section-content-block-element-resolution";
import { ReorderableElementList } from "./ReorderableElementList";
import { SectionContentBlockElementList } from "./SectionContentBlockElementList";
import { useSectionScrollOpacityStyle } from "@/page-builder/integrations/framer-motion/scroll-style";
import { SectionScrollTargetProvider } from "@/page-builder/section/position/SectionScrollTargetContext";
import { useSectionCustomTriggers } from "@/page-builder/triggers/core/use-section-custom-triggers";
import { useVariableStore } from "@/page-builder/runtime/page-builder-variable-store";
import {
  evaluateConditions,
  type VisibleWhenConfig,
} from "@pb/contracts/page-builder/core/page-builder-condition-evaluator";
import type { JsonValue } from "@pb/contracts/page-builder/core/page-builder-types/json-value";

type ContentBlockBase = Extract<SectionBlock, { type: "contentBlock" }>;
type Props = ContentBlockBase & {
  elementOrder?: string[] | { mobile?: string[]; desktop?: string[] };
  definitions?: Record<string, SectionDefinitionBlock>;
  visibleWhen?: VisibleWhenConfig;
};

export function SectionContentBlock({
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
  elements: elementsProp = [],
  elementOrder,
  reorderable,
  reorderAxis,
  reorderDragUnit,
  reorderDragBehavior,
  definitions: sectionDefinitions,
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
  scrollOpacityRange,
  reduceMotion,
  keyboardTriggers,
  timerTriggers,
  cursorTriggers,
  scrollDirectionTriggers,
  idleTriggers,
  visibleWhen,
}: Props) {
  const sectionRef = useRef<HTMLElement>(null);
  const placeholderRef = useRef<HTMLDivElement>(null);
  const { isMobile } = useDeviceType();
  const resolvedAriaLabel = resolveResponsiveValue(ariaLabel, isMobile) ?? id ?? "Content block";

  const elements = useMemo(
    () =>
      resolveSectionContentBlockElements({
        elementsProp,
        elementOrder,
        sectionDefinitions,
      }),
    [elementsProp, elementOrder, sectionDefinitions]
  );

  const resolvedFill = resolveResponsiveValue(fill, isMobile);
  const resolvedAlign = resolveResponsiveValue(align, isMobile) as
    | "left"
    | "center"
    | "right"
    | "full"
    | undefined;
  const resolvedStickyOffset = resolveResponsiveValue(stickyOffset, isMobile) ?? "0px";
  const resolvedFixedOffset = resolveResponsiveValue(fixedOffset, isMobile) ?? "0px";

  const contentColumnAlignItems =
    resolvedAlign === "center"
      ? "items-center"
      : resolvedAlign === "right"
        ? "items-end"
        : "items-start";

  const scrollOpacityStyle = useSectionScrollOpacityStyle(sectionRef, scrollOpacityRange, {
    respectReducedMotion: reduceMotion !== false,
  });

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

  // visibleWhen — always call hook unconditionally; conditionally return null after all hooks
  // Subscribe only to the variable keys referenced by this section's visibleWhen condition
  // so that unrelated setVariable calls don't re-render every section.
  const conditionKeys = useMemo((): string[] => {
    if (!visibleWhen) return [];
    const keys: string[] = [];
    if (visibleWhen.variable) keys.push(visibleWhen.variable);
    for (const c of visibleWhen.conditions ?? []) keys.push(c.variable);
    return keys;
  }, [visibleWhen]);
  const variables = useVariableStore(
    useShallow(
      (state) =>
        Object.fromEntries(conditionKeys.map((k) => [k, state.variables[k]])) as Record<
          string,
          JsonValue
        >
    )
  );

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

  const resolvedContentWidth = resolveResponsiveValue(contentWidth, isMobile);
  const resolvedContentHeight = resolveResponsiveValue(contentHeight, isMobile);
  const contentBackgroundWhenLayers = layers?.length && resolvedFill ? resolvedFill : undefined;
  const contentWrapperStyle = useMemo(
    () =>
      buildSectionContentWrapperStyle({
        resolvedContentWidth,
        resolvedContentHeight,
        sectionHasExplicitHeight: !!resolvedLayout?.height,
        elementCount: elements.length,
        contentBackground: contentBackgroundWhenLayers,
      }),
    [
      resolvedContentWidth,
      resolvedContentHeight,
      resolvedLayout?.height,
      elements.length,
      contentBackgroundWhenLayers,
    ]
  );

  const sectionContent = (
    <>
      {layers?.length ? (
        <LayerStack layers={layers} />
      ) : resolvedFill ? (
        <LayerStack fill={resolvedFill} />
      ) : null}
      <SectionGlassEffect effects={effects} sectionRef={sectionRef} isSectionFixed={!!fixed} />
      <div
        className={`relative z-10 flex min-h-0 flex-col ${contentColumnAlignItems}`}
        style={contentWrapperStyle}
      >
        {reorderable ? (
          <ReorderableElementList
            elements={elements}
            sectionDefinitions={sectionDefinitions}
            axis={reorderAxis ?? "y"}
            dragUnit={reorderDragUnit ?? "frame"}
            dragBehavior={reorderDragBehavior ?? "elasticSnap"}
          />
        ) : (
          <SectionContentBlockElementList
            elements={elements}
            sectionDefinitions={sectionDefinitions}
          />
        )}
      </div>
    </>
  );

  const sectionProps = {
    className: `relative z-10 flex shrink-0 flex-col min-h-0 ${fixed ? "overflow-visible" : "overflow-hidden"}`,
    style: {
      ...applySectionFillStyle(resolvedFill, layers, finalStyle),
      ...(scrollOpacityStyle ?? {}),
      ...(process.env.NODE_ENV === "development" && elements.length > 0 && { minHeight: "1px" }),
    },
    "aria-label": resolvedAriaLabel,
    "data-section-type": "contentBlock",
    "data-elements-count": elements.length,
    onWheel: fixed ? undefined : wheelHandler,
  };

  if (visibleWhen && !evaluateConditions(visibleWhen, variables)) return null;

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
          {sectionContent}
        </SectionScrollTargetProvider>
      </SectionMotionWrapper>
    </>
  );
}
