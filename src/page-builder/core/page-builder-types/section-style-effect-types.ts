export type dividerLayer = {
  fill?: string;
  blendMode?: string;
  opacity?: number;
};

export type SectionBorder = {
  width?: string;
  style?: string;
  color?: string;
};

export type BackdropBlurEffect = { type: "backdropBlur"; amount?: string };
export type GlassEffect = {
  type: "glass";
  lightIntensity?: number;
  lightAngle?: number;
  refraction?: number;
  depth?: number;
  dispersion?: number;
  frost?: string;
  mode?: "standard" | "polar" | "prominent" | "shader";
};
export type DropShadowEffect = {
  type: "dropShadow";
  x?: string;
  y?: string;
  blur?: string;
  spread?: string;
  color?: string;
};
export type InnerShadowEffect = {
  type: "innerShadow";
  x?: string;
  y?: string;
  blur?: string;
  spread?: string;
  color?: string;
};
export type GlowEffect = { type: "glow"; blur?: string; spread?: string; color?: string };
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
