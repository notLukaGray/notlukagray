import type {
  ThemeString,
  VectorGradient,
} from "@pb/contracts/page-builder/core/page-builder-schemas";
import { type PageBuilderThemeMode, resolveThemeString } from "@/page-builder/theme/theme-string";

/**
 * Resolve a fill/stroke reference to an SVG paint value.
 * ref can be: a key in colors (→ flat color), a gradient id in gradients (→ url(#id)), or a literal (url(#id), #hex).
 */
export function resolvePaint(
  ref: ThemeString | undefined,
  colors: Record<string, ThemeString> | undefined,
  gradients: VectorGradient[],
  themeMode: PageBuilderThemeMode
): string | undefined {
  const resolvedRef = resolveThemeString(ref, themeMode);
  if (resolvedRef == null || resolvedRef === "") return undefined;
  if (colors?.[resolvedRef] != null) return resolveThemeString(colors[resolvedRef], themeMode);
  const hasGradient = gradients.some((g) => g?.id === resolvedRef);
  if (hasGradient) return `url(#${resolvedRef})`;
  if (resolvedRef.startsWith("#") || /^url\s*\(\s*#/.test(resolvedRef)) return resolvedRef;
  return resolvedRef;
}

export function toVectorTransitionDuration(value: string | number | undefined): string | undefined {
  if (value == null) return undefined;
  if (typeof value === "number") return `${value}ms`;
  return String(value);
}
