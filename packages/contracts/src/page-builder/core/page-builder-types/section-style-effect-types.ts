import type { ThemeString } from "../page-builder-schemas";

export type dividerLayer = {
  fill?: ThemeString;
  blendMode?: string;
  opacity?: number;
};

export type SectionBorder = {
  width?: string;
  style?: string;
  color?: ThemeString;
};

export type BackdropBlurEffect = { type: "backdropBlur"; amount?: string };
export type GlassEffect = {
  type: "glass";
  // Figma-semantic fields
  lightIntensity?: number;
  lightAngle?: number;
  refraction?: number;
  depth?: number;
  dispersion?: number;
  frost?: string;
  splay?: number;
  mode?: "standard" | "polar" | "prominent" | "shader";
  overLight?: boolean;
  mouseFollow?: boolean;
  // Physics overrides
  bezelType?: "convex_circle" | "convex_squircle" | "concave" | "lip";
  bezelWidth?: number | string;
  glassThickness?: number | string;
  refractiveIndex?: number;
  blur?: number | string;
  scaleRatio?: number;
  specularOpacity?: number;
  specularSaturation?: number;
  magnifyingScale?: number;
  dropShadow?: boolean;
};
export type DropShadowEffect = {
  type: "dropShadow";
  x?: string;
  y?: string;
  blur?: string;
  spread?: string;
  color?: ThemeString;
};
export type InnerShadowEffect = {
  type: "innerShadow";
  x?: string;
  y?: string;
  blur?: string;
  spread?: string;
  color?: ThemeString;
};
export type GlowEffect = { type: "glow"; blur?: string; spread?: string; color?: ThemeString };
export type OpacityEffect = { type: "opacity"; value?: number };
export type BlurEffect = { type: "blur"; amount?: string };
export type BrightnessEffect = { type: "brightness"; value?: number };
export type ContrastEffect = { type: "contrast"; value?: number };
export type SaturateEffect = { type: "saturate"; value?: number };
export type GrayscaleEffect = { type: "grayscale"; value?: number };
export type SepiaEffect = { type: "sepia"; value?: number };

export type SectionEffect =
  | BackdropBlurEffect
  | GlassEffect
  | DropShadowEffect
  | InnerShadowEffect
  | GlowEffect
  | OpacityEffect
  | BlurEffect
  | BrightnessEffect
  | ContrastEffect
  | SaturateEffect
  | GrayscaleEffect
  | SepiaEffect;
