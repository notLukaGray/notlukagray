import type { CSSProperties } from "react";
import type { ElementBlock, ElementLayout } from "@pb/core/internal/page-builder-schemas";
import type { ElementLayoutTransformOptions } from "@pb/core/internal/element-layout-utils";
import type { LinkState } from "../Shared/GraphicLinkWrapper";
import type { VectorShape } from "@pb/core/internal/page-builder-schemas";

export type ElementVectorProps = Extract<ElementBlock, { type: "elementVector" }>;

export type VectorLayoutProps = Pick<
  ElementLayoutTransformOptions,
  "width" | "height" | "align" | "marginTop" | "marginBottom" | "marginLeft" | "marginRight"
> & {
  zIndex?: number;
  constraints?: ElementLayout["constraints"];
};

export type VectorLink = ElementVectorProps["link"];
export type VectorStrokeGroup = NonNullable<ElementVectorProps["strokeGroup"]>;

export type SvgRenderContext = {
  state: LinkState;
  shapes: VectorShape[];
  pathShapes: (VectorShape & { type: "path"; d: string })[];
  strokeGroup: VectorStrokeGroup | null;
  resolve: (ref: string | undefined) => string | undefined;
  resolveFill: (defaultFillRef: string | undefined) => string | undefined;
  resolveStroke: (defaultStrokeRef: string | undefined) => string | undefined;
  resolveHoverFill: (defaultFillRef: string | undefined) => string | undefined;
  resolvedStroke: string | undefined;
  strokeTransitionStyle: CSSProperties | undefined;
  needsOpacityTransition: boolean;
  opacityTransitionStyle: CSSProperties | undefined;
};
