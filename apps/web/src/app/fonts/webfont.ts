import type { FontSlotConfig, FontWeightMap } from "./config";

const BUNNY_CSS2 = "https://fonts.bunny.net/css2?family=";

export type BuildBunnyFontUrlOptions = {
  /**
   * Request a continuous `wght` slice (css2 `min..max`). Use for catalog variable
   * faces so the browser gets real masters — the legacy `css?family=` endpoint
   * often served only 400 for Inter-style families, so every weight looked black.
   */
  variableWghtRange?: { min: number; max: number };
};

/**
 * Build a Bunny Fonts CSS URL for a given family and weight/style config.
 *
 * Uses the **`css2`** API (Google Fonts v2–compatible). The older `css?family=`
 * responses frequently omitted requested weights for variable families.
 *
 * Only the weights explicitly defined in `weights` are requested (discrete list),
 * unless `variableWghtRange` is set — then one axis range is used instead.
 */
export function buildBunnyFontUrl(
  family: string,
  weights: FontWeightMap,
  italic: boolean,
  opts?: BuildBunnyFontUrlOptions
): string {
  let uniqueWeights = [
    ...new Set(
      (Object.values(weights) as (number | undefined)[]).filter((v): v is number => v !== undefined)
    ),
  ].sort((a, b) => a - b);

  if (uniqueWeights.length === 0) {
    uniqueWeights = [400];
  }

  const slug = family.toLowerCase().replace(/\s+/g, "-");

  const axis = (() => {
    const vr = opts?.variableWghtRange;
    if (vr) {
      const lo = Math.min(vr.min, vr.max);
      const hi = Math.max(vr.min, vr.max);
      return { range: `${lo}..${hi}` as const, discrete: null as string | null };
    }
    return { range: null as string | null, discrete: uniqueWeights.join(";") };
  })();

  if (italic) {
    if (axis.range) {
      const r = axis.range;
      return `${BUNNY_CSS2}${slug}:ital,wght@0,${r};1,${r}&display=swap`;
    }
    const normal = uniqueWeights.map((w) => `0,${w}`).join(";");
    const italics = uniqueWeights.map((w) => `1,${w}`).join(";");
    return `${BUNNY_CSS2}${slug}:ital,wght@${normal};${italics}&display=swap`;
  }

  if (axis.range) {
    return `${BUNNY_CSS2}${slug}:wght@${axis.range}&display=swap`;
  }
  return `${BUNNY_CSS2}${slug}:wght@${axis.discrete}&display=swap`;
}

/**
 * Returns the CSS URLs for every slot currently set to `source: "webfont"`.
 * Slots using local files are excluded — they're handled by next/font/local.
 */
export function getActiveWebfontUrls(
  primary: FontSlotConfig,
  secondary: FontSlotConfig,
  mono: FontSlotConfig
): string[] {
  return [primary, secondary, mono]
    .filter((c) => c.source === "webfont")
    .map((c) => buildBunnyFontUrl(c.webfont.family, c.weights, c.italic));
}
