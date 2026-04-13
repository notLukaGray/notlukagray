import type { FontSlotConfig, FontWeightMap } from "./config";
import type { TypeScaleConfig } from "./type-scale";
import { TYPE_SCALE_VAR_PREFIXES } from "./type-scale";

function definedWeightEntries(weights: FontWeightMap): [string, number][] {
  return (Object.entries(weights) as [string, number | undefined][]).filter(
    (e): e is [string, number] => e[1] !== undefined
  );
}

/**
 * Generates a CSS block (`:root` + `@media` override) that sets:
 *
 * **Font weight vars** — `--font-weight-{name}` from the primary slot's weight
 * map. Consumed by `typography-font-*` and all heading/body classes.
 *
 * **Webfont family vars** — `--font-{primary|secondary|mono}` for slots using
 * `source: "webfont"`. Local slots are handled by next/font/local instead.
 *
 * **Type scale vars** — `--type-{class}-size`, `--type-{class}-lh`,
 * `--type-{class}-ls`, `--type-{class}-fw` (references `--font-weight-*`). Mobile in `:root`, desktop overrides in
 * `@media (min-width: 768px)`. Consumed by the typography classes in globals.css,
 * replacing all hardcoded pixel values.
 *
 * Inject as a `<style>` tag at the top of <head> in layout.tsx.
 */
export function generateFontCssVars(
  primary: FontSlotConfig,
  secondary: FontSlotConfig,
  mono: FontSlotConfig,
  typeScale: TypeScaleConfig
): string {
  const root: string[] = [];
  const desktop: string[] = [];

  // ── Weight vars ──────────────────────────────────────────────────────────
  for (const [name, value] of definedWeightEntries(primary.weights)) {
    root.push(`  --font-weight-${name}: ${value};`);
  }

  // ── Webfont family vars ──────────────────────────────────────────────────
  if (primary.source === "webfont") {
    root.push(`  --font-primary: '${primary.webfont.family}', sans-serif;`);
  }
  if (secondary.source === "webfont") {
    root.push(`  --font-secondary: '${secondary.webfont.family}', serif;`);
  }
  if (mono.source === "webfont") {
    root.push(`  --font-mono-face: '${mono.webfont.family}', monospace;`);
  }

  // ── Type scale vars ──────────────────────────────────────────────────────
  for (const [key, prefix] of Object.entries(TYPE_SCALE_VAR_PREFIXES)) {
    const entry = typeScale[key as keyof TypeScaleConfig];
    root.push(`  ${prefix}-size: ${entry.sizeMobile}px;`);
    root.push(`  ${prefix}-lh: ${entry.lineHeightMobile}px;`);
    root.push(`  ${prefix}-ls: ${entry.letterSpacing};`);
    root.push(`  ${prefix}-fw: var(--font-weight-${entry.fontWeightRole});`);
    desktop.push(`  ${prefix}-size: ${entry.sizeDesktop}px;`);
    desktop.push(`  ${prefix}-lh: ${entry.lineHeightDesktop}px;`);
  }

  const rootBlock = `:root {\n${root.join("\n")}\n}`;
  const desktopBlock =
    desktop.length > 0
      ? `\n@media (min-width: 768px) {\n  :root {\n${desktop.map((l) => "  " + l).join("\n")}\n  }\n}`
      : "";

  return rootBlock + desktopBlock;
}

/**
 * Inline style vars for `globals.css` typography utilities (`--type-*-size`, etc.).
 * The root layout injects these on `:root`; workbench previews must repeat them on
 * the preview subtree or typography classes keep static fallbacks.
 */
export function typeScaleToWorkbenchTypographyStyleVars(options: {
  typeScale: TypeScaleConfig;
  primaryWeights: FontWeightMap;
  useMobileSizes: boolean;
}): Record<string, string> {
  const vars: Record<string, string> = {};
  for (const [name, value] of Object.entries(options.primaryWeights)) {
    if (value !== undefined && value !== null) {
      vars[`--font-weight-${name}`] = String(value);
    }
  }
  for (const [key, prefix] of Object.entries(TYPE_SCALE_VAR_PREFIXES) as [
    keyof TypeScaleConfig,
    string,
  ][]) {
    const entry = options.typeScale[key];
    const size = options.useMobileSizes ? entry.sizeMobile : entry.sizeDesktop;
    const lineHeight = options.useMobileSizes ? entry.lineHeightMobile : entry.lineHeightDesktop;
    vars[`${prefix}-size`] = `${size}px`;
    vars[`${prefix}-lh`] = `${lineHeight}px`;
    vars[`${prefix}-ls`] = entry.letterSpacing;
    vars[`${prefix}-fw`] = `var(--font-weight-${entry.fontWeightRole})`;
  }
  return vars;
}
