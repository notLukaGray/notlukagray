/**
 * Shared utility functions for the glass effect system.
 * Kept separate so SectionGlassEffect.tsx stays under 250 LOC.
 */

export type GlassDimensions = {
  width: number;
  height: number;
  radius: number;
};

export function parsePx(value: string | number | undefined, fallback = 0): number {
  if (typeof value === "number") return Number.isFinite(value) ? value : fallback;
  if (typeof value === "string") {
    const n = parseFloat(value);
    return Number.isFinite(n) ? n : fallback;
  }
  return fallback;
}

export function clamp(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max);
}

export function parseLength(
  value: string | number | undefined,
  basis: number,
  fallback: number
): number {
  if (typeof value === "number") {
    if (!Number.isFinite(value)) return fallback;
    if (value >= 0 && value <= 1) return value * basis;
    return value;
  }
  if (typeof value === "string") {
    const trimmed = value.trim();
    if (!trimmed) return fallback;
    if (trimmed.endsWith("%")) {
      const pct = parseFloat(trimmed.slice(0, -1));
      return Number.isFinite(pct) ? (pct / 100) * basis : fallback;
    }
    const n = parseFloat(trimmed);
    return Number.isFinite(n) ? n : fallback;
  }
  return fallback;
}

/**
 * Mobile fallback helper: when blur is authored as normalized 0..1, keep a minimum floor.
 * Example: 0 -> 0.15, 1 -> 1, values >1 (px-like magnitudes) are preserved.
 */
export function liftNormalizedBlur(value: number, floor = 0.15): number {
  if (!Number.isFinite(value) || value <= 0) return floor;
  if (value >= 1) return value;
  const clampedFloor = clamp(floor, 0, 0.99);
  return clampedFloor + value * (1 - clampedFloor);
}

type MobileBlurPxOptions = {
  floor?: number;
  minPx?: number;
  maxPx?: number;
  logStrength?: number;
  referenceBlur?: number;
  curveExponent?: number;
  maxPxCap?: number;
};

/**
 * Converts authored blur to mobile fallback px using a logarithmic response:
 * low end stays subtle, high values compress instead of exploding.
 */
export function blurToMobileFallbackPx(
  value: number,
  {
    floor = 0.05,
    minPx = 3,
    maxPx = 18,
    logStrength = 3,
    referenceBlur = 4,
    curveExponent = 1,
    maxPxCap = maxPx,
  }: MobileBlurPxOptions = {}
): number {
  if (!Number.isFinite(value)) return Math.round(minPx);
  const safeFloor = clamp(floor, 0, Math.max(referenceBlur, 0.001));
  const safeReference = Math.max(referenceBlur, safeFloor + 0.001);
  const safeStrength = Math.max(logStrength, 0.01);
  const clamped = Math.max(value, safeFloor);
  const numerator = Math.log1p(safeStrength * clamped);
  const denominator = Math.log1p(safeStrength * safeReference);
  const t = clamp(denominator > 0 ? numerator / denominator : 0, 0, 1);
  const easedT = Math.pow(t, Math.max(curveExponent, 0.01));
  const px = minPx + (maxPx - minPx) * easedT;
  return Math.round(Math.min(px, maxPxCap));
}

export function normalizeBezelType(
  value: string | undefined
): "convex_circle" | "convex_squircle" | "concave" | "lip" {
  if (value === "convex_circle") return "convex_circle";
  if (value === "concave") return "concave";
  if (value === "lip") return "lip";
  return "convex_squircle";
}

export function readElementDimensions(el: HTMLElement): GlassDimensions {
  const rect = el.getBoundingClientRect();
  const style = window.getComputedStyle(el);
  const radiusStr = style.borderTopLeftRadius ?? "0";
  const radius = parsePx(radiusStr);
  // Use layout-space dimensions (client/offset/computed) so parent transforms
  // (e.g. Motion scale) don't inflate filter sizes and cause glass misalignment.
  const computedWidth = parsePx(style.width);
  const computedHeight = parsePx(style.height);
  const widthSource =
    (typeof computedWidth === "number" && computedWidth > 0 ? computedWidth : undefined) ??
    (el.clientWidth > 0 ? el.clientWidth : undefined) ??
    (el.offsetWidth > 0 ? el.offsetWidth : undefined) ??
    rect.width;
  const heightSource =
    (typeof computedHeight === "number" && computedHeight > 0 ? computedHeight : undefined) ??
    (el.clientHeight > 0 ? el.clientHeight : undefined) ??
    (el.offsetHeight > 0 ? el.offsetHeight : undefined) ??
    rect.height;
  return {
    width: Math.round(widthSource),
    height: Math.round(heightSource),
    radius,
  };
}
