"use client";

import { useMemo, useRef, type CSSProperties } from "react";
import { useDeviceType } from "@/core/providers/device-type-provider";
import type { ElementBlock } from "@/page-builder/core/page-builder-schemas";
import {
  getElementLayoutStyle,
  pageBuilderFlexGapToCss,
} from "@/page-builder/core/element-layout-utils";
import { useVideoControlContext } from "./ElementVideo/VideoControlContext";
import { useSlotDefaultWrapperStyle } from "@/page-builder/elements/ElementModule/ModuleSlotContext";
import { useDimensionGestureContext } from "./Shared/DimensionGestureContext";
import { firePageBuilderAction } from "@/page-builder/triggers";
import { SectionGlassEffect } from "@/page-builder/section/stack/SectionGlassEffect";
import { ElementModuleChildren } from "./ElementModule/ElementModuleChildren";
import {
  buildBorderGradientOverlayStyle,
  coerceSectionEffects,
  type BorderGradient,
} from "./ElementModule/element-module-style-utils";
import { reconcileElementOrderWithDefinitions } from "@/page-builder/core/module-slot-utils";

type Props = Extract<ElementBlock, { type: "elementGroup" }>;

export function ElementModuleGroup({
  section,
  width,
  height,
  minWidth,
  minHeight,
  maxWidth,
  maxHeight,
  display = "flex",
  flexDirection = "row",
  alignItems = "center",
  justifyContent,
  gap,
  rowGap,
  columnGap,
  padding,
  paddingTop,
  paddingRight,
  paddingBottom,
  paddingLeft,
  flexWrap,
  flex,
  overflow,
  marginTop,
  marginBottom,
  marginLeft,
  marginRight,
  align,
  figmaConstraints,
  wrapperStyle: groupWrapperStyle,
  borderGradient,
  effects,
  layoutChildren,
  interactions,
}: Props & {
  overflow?: string;
  layoutChildren?: boolean;
  minWidth?: string | number;
  minHeight?: string | number;
  maxWidth?: string | number;
  maxHeight?: string | number;
  interactions?: {
    onClick?: unknown;
    onHoverEnter?: unknown;
    onHoverLeave?: unknown;
    onPointerDown?: unknown;
    onPointerUp?: unknown;
    onDoubleClick?: unknown;
    cursor?: string;
  };
}) {
  const { isMobile } = useDeviceType();
  const videoCtx = useVideoControlContext();
  const slotDefaultWrapper = useSlotDefaultWrapperStyle();
  const groupRef = useRef<HTMLDivElement>(null);
  const groupEffects = useMemo(() => coerceSectionEffects(effects), [effects]);
  const hasGlassEffect = (groupEffects ?? []).some((effect) => effect.type === "glass");
  // When inside a dimension gesture, all nested elementGroups fill their parent
  // so the visual layer grows with the animated container.
  const inDimensionGesture = useDimensionGestureContext();
  const resolvedWidth = inDimensionGesture ? "100%" : width;
  const resolvedHeight = inDimensionGesture ? "100%" : height;
  const definitions = (section?.definitions ?? {}) as Record<string, unknown>;
  const order = reconcileElementOrderWithDefinitions(section?.elementOrder, definitions);
  const idCounts = new Map<string, number>();
  const rawBlocks = order
    .map((key): ElementBlock | null => {
      const el = definitions[key] as unknown;
      if (
        !el ||
        typeof el !== "object" ||
        !("type" in el) ||
        (el as { type?: string }).type === "cssGradient"
      )
        return null;
      const candidate = el as ElementBlock & { id?: unknown };
      const baseId =
        typeof candidate.id === "string" && candidate.id.trim().length > 0 ? candidate.id : key;
      const nextCount = (idCounts.get(baseId) ?? 0) + 1;
      idCounts.set(baseId, nextCount);
      const uniqueId = nextCount === 1 ? baseId : `${baseId}__${nextCount}`;
      return { ...candidate, id: uniqueId } as ElementBlock;
    })
    .filter((x): x is ElementBlock => x != null);
  const blocks = videoCtx
    ? rawBlocks.filter((b) =>
        videoCtx.resolveShowWhen((b as ElementBlock & { showWhen?: string }).showWhen)
      )
    : rawBlocks;

  const layoutStyle = getElementLayoutStyle({
    width: resolvedWidth,
    height: resolvedHeight,
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
  });

  const hasBorderGradient =
    borderGradient != null &&
    typeof borderGradient === "object" &&
    typeof (borderGradient as BorderGradient).stroke === "string" &&
    (typeof (borderGradient as BorderGradient).width === "string" ||
      typeof (borderGradient as BorderGradient).width === "number");

  const resolvedFlexGap = pageBuilderFlexGapToCss(gap);

  const groupStyleBase: CSSProperties = {
    ...layoutStyle,
    display: (display as CSSProperties["display"]) ?? "flex",
    flexDirection: (flexDirection as CSSProperties["flexDirection"]) ?? "row",
    // Inside a dimension gesture, override alignItems to stretch so child wrappers
    // get a defined width (cross-axis fills the container) rather than shrinking to
    // content. Without this, width:100% on nested elements resolves to content-width.
    alignItems: inDimensionGesture
      ? "stretch"
      : ((alignItems as CSSProperties["alignItems"]) ?? "center"),
    ...(justifyContent
      ? { justifyContent: justifyContent as CSSProperties["justifyContent"] }
      : {}),
    ...(resolvedFlexGap != null ? { gap: resolvedFlexGap } : {}),
    ...(rowGap != null ? { rowGap } : {}),
    ...(columnGap != null ? { columnGap } : {}),
    ...(padding != null ? { padding } : {}),
    ...(paddingTop != null ? { paddingTop } : {}),
    ...(paddingRight != null ? { paddingRight } : {}),
    ...(paddingBottom != null ? { paddingBottom } : {}),
    ...(paddingLeft != null ? { paddingLeft } : {}),
    ...(flexWrap ? { flexWrap: flexWrap as CSSProperties["flexWrap"] } : {}),
    ...(flex ? { flex } : {}),
    overflow: (overflow ?? (layoutChildren ? "visible" : "hidden")) as CSSProperties["overflow"],
    ...(groupWrapperStyle as CSSProperties),
  };
  const groupStyle: CSSProperties =
    (hasBorderGradient || hasGlassEffect) && groupStyleBase.position == null
      ? { ...groupStyleBase, position: "relative" }
      : groupStyleBase;

  const hasInteractions = !!(
    interactions?.onClick ||
    interactions?.onHoverEnter ||
    interactions?.onHoverLeave ||
    interactions?.onPointerDown ||
    interactions?.onPointerUp ||
    interactions?.onDoubleClick
  );

  return (
    <div
      ref={groupRef}
      style={{
        ...groupStyle,
        ...(interactions?.cursor ? { cursor: interactions.cursor } : {}),
      }}
      className={flex ? undefined : "shrink-0"}
      onClick={
        interactions?.onClick
          ? () => firePageBuilderAction(interactions.onClick as never, "trigger")
          : undefined
      }
      onPointerEnter={
        interactions?.onHoverEnter
          ? () => firePageBuilderAction(interactions.onHoverEnter as never, "trigger")
          : undefined
      }
      onPointerLeave={
        interactions?.onHoverLeave
          ? () => firePageBuilderAction(interactions.onHoverLeave as never, "trigger")
          : undefined
      }
      onPointerDown={
        interactions?.onPointerDown
          ? () => firePageBuilderAction(interactions.onPointerDown as never, "trigger")
          : undefined
      }
      onPointerUp={
        interactions?.onPointerUp
          ? () => firePageBuilderAction(interactions.onPointerUp as never, "trigger")
          : undefined
      }
      onDoubleClick={
        interactions?.onDoubleClick
          ? () => firePageBuilderAction(interactions.onDoubleClick as never, "trigger")
          : undefined
      }
      tabIndex={hasInteractions ? 0 : undefined}
    >
      <SectionGlassEffect effects={groupEffects} sectionRef={groupRef} variant="auto" />
      {hasBorderGradient ? (
        <div
          aria-hidden
          style={buildBorderGradientOverlayStyle(
            borderGradient as BorderGradient,
            groupStyle.borderRadius
          )}
        />
      ) : null}
      <ElementModuleChildren
        blocks={blocks}
        inDimensionGesture={inDimensionGesture}
        isMobile={isMobile}
        layoutChildren={layoutChildren}
        slotDefaultWrapper={slotDefaultWrapper}
        getActionHandler={videoCtx?.getActionHandler}
      />
    </div>
  );
}
