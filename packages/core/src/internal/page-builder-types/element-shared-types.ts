import type { SectionEffect } from "./section-style-effect-types";

export type ElementTextAlign = "left" | "right" | "center" | "justify";

export type ElementLayout = {
  id?: string;
  width?: string;
  height?: string;
  borderRadius?: string;
  /** When true, hint loader to prioritize this element's fetch (e.g. fetchPriority=high for images). */
  priority?: boolean;
  align?: "left" | "center" | "right";
  alignY?: "top" | "center" | "bottom";
  textAlign?: ElementTextAlign;
  marginTop?: string;
  marginBottom?: string;
  marginLeft?: string;
  marginRight?: string;
  zIndex?: number;
  effects?: SectionEffect[];
};

export type ElementImageObjectFit = "cover" | "contain" | "fillWidth" | "fillHeight" | "crop";

export type VectorShapeStyle = {
  fill?: string;
  stroke?: string;
  strokeWidth?: number | string;
  strokeLinecap?: "butt" | "round" | "square";
  strokeLinejoin?: "miter" | "round" | "bevel";
  opacity?: number;
  transform?: string;
};

export type VectorGradientStop = {
  offset: string;
  color: string;
  opacity?: number;
};

export type VectorLinearGradient = {
  type: "linearGradient";
  id: string;
  x1?: number | string;
  y1?: number | string;
  x2?: number | string;
  y2?: number | string;
  gradientUnits?: "userSpaceOnUse" | "objectBoundingBox";
  gradientTransform?: string;
  stops: VectorGradientStop[];
};

export type VectorRadialGradient = {
  type: "radialGradient";
  id: string;
  cx?: number | string;
  cy?: number | string;
  r?: number | string;
  fx?: number | string;
  fy?: number | string;
  gradientUnits?: "userSpaceOnUse" | "objectBoundingBox";
  stops: VectorGradientStop[];
};

export type VectorGradient = VectorLinearGradient | VectorRadialGradient;

export type VectorShape =
  | ({
      type: "rect";
      x?: number | string;
      y?: number | string;
      width: number | string;
      height: number | string;
      rx?: number | string;
      ry?: number | string;
    } & VectorShapeStyle)
  | ({
      type: "circle";
      cx: number | string;
      cy: number | string;
      r: number | string;
    } & VectorShapeStyle)
  | ({
      type: "ellipse";
      cx: number | string;
      cy: number | string;
      rx: number | string;
      ry: number | string;
    } & VectorShapeStyle)
  | ({
      type: "line";
      x1: number | string;
      y1: number | string;
      x2: number | string;
      y2: number | string;
    } & VectorShapeStyle)
  | ({ type: "polygon"; points: string } & VectorShapeStyle)
  | ({ type: "polyline"; points: string } & VectorShapeStyle)
  | ({ type: "path"; d: string } & VectorShapeStyle);

export type ElementLinkStateStyle = {
  linkDefault?: string;
  linkHover?: string;
  linkActive?: string;
  linkDisabled?: string;
  linkTransition?: string | number;
  disabled?: boolean;
};

export type ElementSimpleLink = {
  ref: string;
  external: boolean;
};

export type ElementGraphicLink = {
  ref?: string;
  external?: boolean;
  hoverScale?: number;
  hoverFill?: string;
  activeFill?: string;
  disabledFill?: string;
  hoverStroke?: string;
  activeStroke?: string;
  disabledStroke?: string;
  vectorTransition?: string | number;
  disabled?: boolean;
};

export type ElementBodyVariant = 1 | 2 | 3 | 4 | 5 | 6;
