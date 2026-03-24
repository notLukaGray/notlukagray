import { z } from "zod";

export const dividerLayerSchema = z.object({
  fill: z.string().optional(),
  blendMode: z.string().optional(),
  opacity: z.number().optional(),
});

export const sectionBorderSchema = z.object({
  width: z.string().optional(),
  style: z.string().optional(),
  color: z.string().optional(),
});

export const backdropBlurEffectSchema = z.object({
  type: z.literal("backdropBlur"),
  amount: z.string().optional(),
});
export const glassEffectSchema = z.object({
  type: z.literal("glass"),
  lightIntensity: z.number().min(0).max(1).optional(),
  lightAngle: z.number().optional(),
  refraction: z.number().min(0).max(1).optional(),
  depth: z.number().min(1).optional(),
  dispersion: z.number().min(0).max(1).optional(),
  frost: z.string().optional(),
  mode: z.enum(["standard", "polar", "prominent", "shader"]).optional(),
});
export const dropShadowEffectSchema = z.object({
  type: z.literal("dropShadow"),
  x: z.string().optional(),
  y: z.string().optional(),
  blur: z.string().optional(),
  spread: z.string().optional(),
  color: z.string().optional(),
});
export const innerShadowEffectSchema = z.object({
  type: z.literal("innerShadow"),
  x: z.string().optional(),
  y: z.string().optional(),
  blur: z.string().optional(),
  spread: z.string().optional(),
  color: z.string().optional(),
});
export const glowEffectSchema = z.object({
  type: z.literal("glow"),
  blur: z.string().optional(),
  spread: z.string().optional(),
  color: z.string().optional(),
});
export const opacityEffectSchema = z.object({
  type: z.literal("opacity"),
  value: z.number().optional(),
});
export const blurEffectSchema = z.object({
  type: z.literal("blur"),
  amount: z.string().optional(),
});
export const brightnessEffectSchema = z.object({
  type: z.literal("brightness"),
  value: z.number().optional(),
});
export const contrastEffectSchema = z.object({
  type: z.literal("contrast"),
  value: z.number().optional(),
});
export const saturateEffectSchema = z.object({
  type: z.literal("saturate"),
  value: z.number().optional(),
});
export const grayscaleEffectSchema = z.object({
  type: z.literal("grayscale"),
  value: z.number().optional(),
});
export const sepiaEffectSchema = z.object({
  type: z.literal("sepia"),
  value: z.number().optional(),
});

export const sectionEffectSchema = z.discriminatedUnion("type", [
  backdropBlurEffectSchema,
  glassEffectSchema,
  dropShadowEffectSchema,
  innerShadowEffectSchema,
  glowEffectSchema,
  opacityEffectSchema,
  blurEffectSchema,
  brightnessEffectSchema,
  contrastEffectSchema,
  saturateEffectSchema,
  grayscaleEffectSchema,
  sepiaEffectSchema,
]);
