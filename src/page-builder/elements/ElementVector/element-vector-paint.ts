import type { VectorGradient } from "@/page-builder/core/page-builder-schemas";

/**
 * Resolve a fill/stroke reference to an SVG paint value.
 * ref can be: a key in colors (→ flat color), a gradient id in gradients (→ url(#id)), or a literal (url(#id), #hex).
 */
export function resolvePaint(
  ref: string | undefined,
  colors: Record<string, string> | undefined,
  gradients: VectorGradient[]
): string | undefined {
  if (ref == null || ref === "") return undefined;
  if (colors?.[ref] != null) return colors[ref];
  const hasGradient = gradients.some((g) => g?.id === ref);
  if (hasGradient) return `url(#${ref})`;
  if (ref.startsWith("#") || /^url\s*\(\s*#/.test(ref)) return ref;
  return ref;
}

export function toVectorTransitionDuration(value: string | number | undefined): string | undefined {
  if (value == null) return undefined;
  if (typeof value === "number") return `${value}ms`;
  return String(value);
}
