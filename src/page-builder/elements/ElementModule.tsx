"use client";

import { useMemo, useRef, type CSSProperties } from "react";
import type {
  CssInlineStyle,
  ElementBlock,
  SectionEffect,
} from "@/page-builder/core/page-builder-schemas";
import { ElementRenderer } from "./Shared/ElementRenderer";
import { generateElementKey } from "@/page-builder/core/element-keys";
import { getElementLayoutStyle } from "@/page-builder/core/element-layout-utils";
import { useVideoControlContext } from "./ElementVideo/VideoControlContext";
import { useSlotDefaultWrapperStyle } from "@/page-builder/elements/ElementModule/ModuleSlotContext";
import { LayoutMotionDiv } from "@/page-builder/integrations/framer-motion";
import { useDimensionGestureContext } from "./Shared/DimensionGestureContext";
import { firePageBuilderAction } from "@/page-builder/triggers";
import { SectionGlassEffect } from "@/page-builder/section/stack/SectionGlassEffect";

type Props = Extract<ElementBlock, { type: "elementGroup" }>;
type BorderGradient = { stroke: string; width: string | number };

function lightenHexColor(hex: string, amount: number): string {
  const match = /^#?([0-9a-fA-F]{6})$/.exec(hex);
  if (!match) return hex;
  const matchedHex = match[1];
  if (!matchedHex) return hex;
  const int = parseInt(matchedHex, 16);
  const r = Math.min(255, ((int >> 16) & 0xff) + amount);
  const g = Math.min(255, ((int >> 8) & 0xff) + amount);
  const b = Math.min(255, (int & 0xff) + amount);
  const toHex = (v: number) => v.toString(16).padStart(2, "0");
  return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
}

function getContainerWrapperStyle(base: CSSProperties): CSSProperties {
  const bg = base.background;
  if (!bg || typeof bg !== "string") return base;
  return {
    ...base,
    background: lightenHexColor(bg, 10),
  };
}

function buildBorderGradientOverlayStyle(
  borderGradient: BorderGradient,
  borderRadius: CSSProperties["borderRadius"]
): CSSProperties {
  return {
    position: "absolute",
    inset: 0,
    padding: borderGradient.width,
    borderRadius: borderRadius ?? "inherit",
    background: borderGradient.stroke,
    boxSizing: "border-box",
    pointerEvents: "none",
    WebkitMask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
    WebkitMaskComposite: "xor",
    maskComposite: "exclude",
  };
}

function coerceSectionEffects(value: unknown): SectionEffect[] | undefined {
  if (!Array.isArray(value)) return undefined;
  const entries = value.filter(
    (entry): entry is SectionEffect =>
      !!entry &&
      typeof entry === "object" &&
      "type" in entry &&
      typeof (entry as { type?: unknown }).type === "string"
  );
  return entries.length > 0 ? entries : undefined;
}

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
  padding,
  flex,
  overflow,
  marginTop,
  marginBottom,
  marginLeft,
  marginRight,
  align,
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
  const definitions = section?.definitions ?? {};
  const order = section?.elementOrder ?? Object.keys(definitions);
  const rawBlocks = order
    .map((key): ElementBlock | null => {
      const el = definitions[key];
      if (
        !el ||
        typeof el !== "object" ||
        !("type" in el) ||
        (el as { type?: string }).type === "cssGradient"
      )
        return null;
      return ("id" in el && (el as { id?: unknown }).id ? el : { ...el, id: key }) as ElementBlock;
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
  });

  const hasBorderGradient =
    borderGradient != null &&
    typeof borderGradient === "object" &&
    typeof (borderGradient as BorderGradient).stroke === "string" &&
    (typeof (borderGradient as BorderGradient).width === "string" ||
      typeof (borderGradient as BorderGradient).width === "number");

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
    ...(gap ? { gap } : {}),
    ...(padding ? { padding } : {}),
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
      <SectionGlassEffect effects={groupEffects} sectionRef={groupRef} />
      {hasBorderGradient ? (
        <div
          aria-hidden
          style={buildBorderGradientOverlayStyle(
            borderGradient as BorderGradient,
            groupStyle.borderRadius
          )}
        />
      ) : null}
      {blocks.map((block, i) => {
        const action = (block as ElementBlock & { action?: string }).action;
        const actionPayload = (block as ElementBlock & { actionPayload?: number }).actionPayload;
        const handler = videoCtx?.getActionHandler(action, actionPayload);
        const elWrapperStyle = (
          block as ElementBlock & {
            wrapperStyle?: CssInlineStyle;
          }
        ).wrapperStyle;
        const hasMotion = !!(block as ElementBlock & { motion?: unknown }).motion;
        const baseWrapperStyle = (
          handler
            ? { ...slotDefaultWrapper, ...(elWrapperStyle ?? {}) }
            : hasMotion
              ? {}
              : (elWrapperStyle ?? {})
        ) as CSSProperties;
        const wrapperStyle = getContainerWrapperStyle(baseWrapperStyle);
        // Inside a dimension gesture, cell wrappers (which carry the visual —
        // background, borderRadius, etc.) must fill their parent so the visual
        // expands with the animated container rather than hugging content.
        const cellStyle: CSSProperties = inDimensionGesture
          ? { width: "100%", height: "100%", ...wrapperStyle }
          : wrapperStyle;
        const content = <ElementRenderer key={generateElementKey(block, i)} block={block} />;
        if (handler) {
          return (
            <button
              key={generateElementKey(block, i)}
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                handler();
              }}
              className="flex items-center justify-center shrink-0 text-white rounded focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
              style={{ cursor: "pointer", ...cellStyle }}
              aria-label={action ?? "Control"}
            >
              {content}
            </button>
          );
        }
        // layoutChildren: true means siblings participate in Framer Motion FLIP reflow
        // when any sibling changes dimensions via gesture animation.
        if (layoutChildren) {
          return (
            <LayoutMotionDiv
              key={generateElementKey(block, i)}
              className="shrink-0"
              style={cellStyle}
            >
              {content}
            </LayoutMotionDiv>
          );
        }
        return (
          <div
            key={generateElementKey(block, i)}
            className="shrink-0 flex items-center justify-center"
            style={cellStyle}
          >
            {content}
          </div>
        );
      })}
    </div>
  );
}
