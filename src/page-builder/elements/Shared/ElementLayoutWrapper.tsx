import type { CSSProperties, ReactNode } from "react";
import { useCallback, useMemo, useRef } from "react";
import {
  getElementLayoutStyle,
  getElementTransformStyle,
  type ElementLayoutTransformOptions,
} from "@/page-builder/core/element-layout-utils";
import { firePageBuilderAction } from "@/page-builder/triggers";
import type {
  PageBuilderAction,
  ElementLayout,
  SectionEffect,
} from "@/page-builder/core/page-builder-schemas";
import { SectionGlassEffect } from "@/page-builder/section/stack/SectionGlassEffect";

type LayoutProps = Pick<
  ElementLayoutTransformOptions,
  "width" | "height" | "align" | "marginTop" | "marginBottom" | "marginLeft" | "marginRight"
> & {
  zIndex?: number;
  constraints?: ElementLayout["constraints"];
  effects?: SectionEffect[];
  [key: string]: unknown;
};

type TransformProps = Pick<
  ElementLayoutTransformOptions,
  "rotate" | "flipHorizontal" | "flipVertical"
>;

export type ElementInteractions = {
  onClick?: PageBuilderAction;
  onHoverEnter?: PageBuilderAction;
  onHoverLeave?: PageBuilderAction;
  onPointerDown?: PageBuilderAction;
  onPointerUp?: PageBuilderAction;
  onDoubleClick?: PageBuilderAction;
  cursor?: string;
};

type Props = {
  layout: LayoutProps;
  transform?: TransformProps;
  children: ReactNode;
  /** Inner div overflow; default "hidden". Use "visible" for range/slider so thumb isn't clipped. */
  overflow?: "hidden" | "visible";
  /** Optional extra props on the figure (e.g. aria-busy). */
  figureProps?: React.ComponentPropsWithoutRef<"figure">;
  /** Universal element interactions from JSON. */
  interactions?: ElementInteractions;
};

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

/**
 * Shared wrapper for elements that use layout + optional transform.
 * Supports universal pointer/click interactions from JSON.
 */
export function ElementLayoutWrapper({
  layout,
  transform,
  children,
  overflow = "hidden",
  figureProps,
  interactions,
}: Props) {
  const surfaceRef = useRef<HTMLElement | null>(null);
  const surfaceEffects = useMemo(() => coerceSectionEffects(layout.effects), [layout.effects]);
  const hasGlassEffect = (surfaceEffects ?? []).some((effect) => effect.type === "glass");
  const layoutStyle = getElementLayoutStyle(layout as Partial<ElementLayout>);
  const transformStyle = getElementTransformStyle(
    transform ? { ...layout, ...transform } : undefined
  );
  const innerStyle: CSSProperties = {
    width: "100%",
    height: "100%",
    overflow: overflow as "hidden" | "visible",
    display: "flex" as const,
    alignItems: "center" as const,
    justifyContent: "center" as const,
    ...(hasGlassEffect ? { position: "relative" as const, zIndex: 1 } : {}),
    ...transformStyle,
  };

  const hasInteractions = !!(
    interactions?.onClick ||
    interactions?.onHoverEnter ||
    interactions?.onHoverLeave ||
    interactions?.onPointerDown ||
    interactions?.onPointerUp ||
    interactions?.onDoubleClick
  );

  const handleClick = useCallback(() => {
    if (interactions?.onClick) firePageBuilderAction(interactions.onClick, "trigger");
  }, [interactions]);

  const handlePointerEnter = useCallback(() => {
    if (interactions?.onHoverEnter) firePageBuilderAction(interactions.onHoverEnter, "trigger");
  }, [interactions]);

  const handlePointerLeave = useCallback(() => {
    if (interactions?.onHoverLeave) firePageBuilderAction(interactions.onHoverLeave, "trigger");
  }, [interactions]);

  const handlePointerDown = useCallback(() => {
    if (interactions?.onPointerDown) firePageBuilderAction(interactions.onPointerDown, "trigger");
  }, [interactions]);

  const handlePointerUp = useCallback(() => {
    if (interactions?.onPointerUp) firePageBuilderAction(interactions.onPointerUp, "trigger");
  }, [interactions]);

  const handleDoubleClick = useCallback(() => {
    if (interactions?.onDoubleClick) firePageBuilderAction(interactions.onDoubleClick, "trigger");
  }, [interactions]);

  const baseFigureStyle: CSSProperties = {
    ...layoutStyle,
    ...(hasGlassEffect && layoutStyle.position == null ? { position: "relative" as const } : {}),
  };

  const interactionProps = hasInteractions
    ? {
        onClick: interactions?.onClick ? handleClick : undefined,
        onPointerEnter: interactions?.onHoverEnter ? handlePointerEnter : undefined,
        onPointerLeave: interactions?.onHoverLeave ? handlePointerLeave : undefined,
        onPointerDown: interactions?.onPointerDown ? handlePointerDown : undefined,
        onPointerUp: interactions?.onPointerUp ? handlePointerUp : undefined,
        onDoubleClick: interactions?.onDoubleClick ? handleDoubleClick : undefined,
        style: {
          ...baseFigureStyle,
          cursor: interactions?.cursor ?? (interactions?.onClick ? "pointer" : undefined),
        } as CSSProperties,
      }
    : {
        style: baseFigureStyle,
      };

  return (
    <figure ref={surfaceRef} className="shrink-0 m-0" {...interactionProps} {...figureProps}>
      <SectionGlassEffect effects={surfaceEffects} sectionRef={surfaceRef} />
      <div style={innerStyle}>{children}</div>
    </figure>
  );
}
