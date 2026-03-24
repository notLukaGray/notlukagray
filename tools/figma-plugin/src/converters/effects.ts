/**
 * Effect extraction utilities.
 * Converts Figma shadow and blur effects to CSS strings.
 */

import { figmaRgbToHex } from "../utils/color";
import { toPx } from "../utils/css";

export type ExtractedGlassEffect = {
  type: "glass";
  lightIntensity?: number;
  lightAngle?: number;
  refraction?: number;
  depth?: number;
  dispersion?: number;
  frost?: string;
  mode?: "standard" | "polar" | "prominent" | "shader";
};

function clamp(value: number, min: number, max: number): number {
  return Math.max(min, Math.min(max, value));
}

function round(value: number, decimals = 3): number {
  const factor = 10 ** decimals;
  return Math.round(value * factor) / factor;
}

function normalizeFrostRadius(radius: number | undefined): string | undefined {
  if (typeof radius !== "number" || !Number.isFinite(radius)) return undefined;
  if (radius <= 0) return undefined;
  // Figma blur radii visually map closer to half-radius in CSS blur functions.
  return toPx(radius / 2);
}

function asNumber(value: unknown): number | undefined {
  if (typeof value === "number" && Number.isFinite(value)) return value;
  return undefined;
}

function hasGlassStyleHint(node: SceneNode | undefined): boolean {
  if (!node) return false;
  const rawEffectStyleId = (node as SceneNode & { effectStyleId?: unknown }).effectStyleId;
  if (typeof rawEffectStyleId !== "string" || rawEffectStyleId.trim().length === 0) return false;
  const figmaApi = (globalThis as { figma?: PluginAPI }).figma;
  if (!figmaApi?.getStyleById) return false;

  try {
    const style = figmaApi.getStyleById(rawEffectStyleId);
    if (!style || style.type !== "EFFECT") return false;
    const styleName = style.name?.toLowerCase() ?? "";
    const styleEffects =
      "effects" in style && Array.isArray((style as { effects?: readonly Effect[] }).effects)
        ? ((style as { effects?: readonly Effect[] }).effects ?? [])
        : [];
    return (
      styleName.includes("glass") ||
      styleEffects.some((effect) => effect.visible !== false && effect.type === "GLASS")
    );
  } catch {
    return false;
  }
}

/**
 * Converts Figma DROP_SHADOW and INNER_SHADOW effects to a CSS `box-shadow` string.
 * Multiple shadows are comma-separated.
 * Returns `undefined` if no visible shadow effects are present.
 */
export function extractBoxShadow(effects: readonly Effect[]): string | undefined {
  const parts: string[] = [];

  for (const effect of effects) {
    if (effect.visible === false) continue;
    if (effect.type !== "DROP_SHADOW" && effect.type !== "INNER_SHADOW") continue;

    const shadow = effect as DropShadowEffect | InnerShadowEffect;
    const { r, g, b, a } = shadow.color;
    const colorStr = figmaRgbToHex(r, g, b, a < 1 ? a : undefined);
    const inset = effect.type === "INNER_SHADOW" ? "inset " : "";

    parts.push(
      `${inset}${toPx(shadow.offset.x)} ${toPx(shadow.offset.y)} ${toPx(shadow.radius)} ${toPx(shadow.spread ?? 0)} ${colorStr}`
    );
  }

  return parts.length > 0 ? parts.join(", ") : undefined;
}

/**
 * Converts a Figma LAYER_BLUR effect to a CSS `filter` string.
 * Only the first visible LAYER_BLUR is used (Figma allows at most one).
 * Returns `undefined` if no layer blur is present.
 */
export function extractFilter(effects: readonly Effect[]): string | undefined {
  for (const effect of effects) {
    if (effect.visible === false) continue;
    if (effect.type !== "LAYER_BLUR") continue;
    return `blur(${toPx((effect as BlurEffect).radius / 2)})`;
  }
  return undefined;
}

/**
 * Converts a Figma BACKGROUND_BLUR effect to a CSS `backdrop-filter` string.
 * Only the first visible BACKGROUND_BLUR is used.
 * Returns `undefined` if no background blur is present.
 */
export function extractBackdropFilter(effects: readonly Effect[]): string | undefined {
  for (const effect of effects) {
    if (effect.visible === false) continue;
    if (effect.type !== "BACKGROUND_BLUR") continue;
    return `blur(${toPx((effect as BlurEffect).radius / 2)})`;
  }
  return undefined;
}

/**
 * Extracts a Figma GLASS effect into a structured section-effect payload.
 * If the node is using an effect style named "glass" (without a native GLASS effect),
 * this returns a minimal fallback payload so the page builder still applies glass treatment.
 */
export function extractGlassEffect(
  effects: readonly Effect[],
  node?: SceneNode
): ExtractedGlassEffect | undefined {
  for (const effect of effects) {
    if (effect.visible === false) continue;
    if (effect.type !== "GLASS") continue;
    const glass = effect as GlassEffect;
    return {
      type: "glass",
      lightIntensity: round(clamp(glass.lightIntensity, 0, 1)),
      lightAngle: round(glass.lightAngle, 2),
      refraction: round(clamp(glass.refraction, 0, 1)),
      depth: round(Math.max(1, glass.depth), 2),
      dispersion: round(clamp(glass.dispersion, 0, 1)),
      ...(normalizeFrostRadius(glass.radius) ? { frost: normalizeFrostRadius(glass.radius) } : {}),
    };
  }

  // Compatibility fallback: some plugin/runtime versions may surface newer glass payloads
  // without the `type: "GLASS"` discriminator in typings. Detect by signature.
  for (const effect of effects) {
    const rec = effect as unknown as Record<string, unknown>;
    if (rec.visible === false) continue;
    const type = typeof rec.type === "string" ? rec.type.toLowerCase() : "";
    const lightIntensity = asNumber(rec.lightIntensity);
    const lightAngle = asNumber(rec.lightAngle);
    const refraction = asNumber(rec.refraction);
    const depth = asNumber(rec.depth);
    const dispersion = asNumber(rec.dispersion);
    const radius = asNumber(rec.radius);
    const hasGlassShape =
      type.includes("glass") ||
      lightIntensity !== undefined ||
      lightAngle !== undefined ||
      refraction !== undefined ||
      depth !== undefined ||
      dispersion !== undefined;
    if (!hasGlassShape) continue;
    return {
      type: "glass",
      ...(lightIntensity !== undefined
        ? { lightIntensity: round(clamp(lightIntensity, 0, 1)) }
        : {}),
      ...(lightAngle !== undefined ? { lightAngle: round(lightAngle, 2) } : {}),
      ...(refraction !== undefined ? { refraction: round(clamp(refraction, 0, 1)) } : {}),
      ...(depth !== undefined ? { depth: round(Math.max(1, depth), 2) } : {}),
      ...(dispersion !== undefined ? { dispersion: round(clamp(dispersion, 0, 1)) } : {}),
      ...(normalizeFrostRadius(radius) ? { frost: normalizeFrostRadius(radius) } : {}),
    };
  }

  // Style-name fallback: support teams that tag an Effect Style as "glass"
  // but don't use the native GLASS effect node yet.
  if (hasGlassStyleHint(node)) {
    const fallbackBackgroundBlur = effects.find(
      (effect): effect is BlurEffect =>
        effect.visible !== false && effect.type === "BACKGROUND_BLUR"
    );
    return {
      type: "glass",
      ...(normalizeFrostRadius(fallbackBackgroundBlur?.radius)
        ? { frost: normalizeFrostRadius(fallbackBackgroundBlur?.radius) }
        : {}),
    };
  }

  return undefined;
}
