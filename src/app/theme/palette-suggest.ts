import { converter, formatCss, parse, wcagContrast, clampGamut } from "culori";
import { type M1TokenId, M1_ON_PAIR, M1_TOKEN_IDS } from "@/app/theme/pb-color-tokens";

const toOklch = converter("oklch");

export type M1ColorSeeds = {
  /** Primary / brand fill for this theme. */
  primary: string;
  /** Secondary / muted surface fill. */
  secondary: string;
  /** Accent surface fill. */
  accent: string;
  /** Hover / emphasis for links (often higher chroma). */
  linkAccent: string;
};

/** Defaults aligned with current `globals.css` `:root` brand + links. */
export const DEFAULT_M1_SEEDS_LIGHT: M1ColorSeeds = {
  primary: "oklch(0.205 0 0)",
  secondary: "oklch(0.97 0 0)",
  accent: "oklch(0.97 0 0)",
  linkAccent: "#f000b8",
};

/** Defaults aligned with current `globals.css` `.dark` brand + links. */
export const DEFAULT_M1_SEEDS_DARK: M1ColorSeeds = {
  primary: "oklch(0.922 0 0)",
  secondary: "oklch(0.269 0 0)",
  accent: "oklch(0.269 0 0)",
  linkAccent: "#f000b8",
};

export type M1RowState = {
  value: string;
  confirmed: boolean;
  rowVariant: number;
};

/** Light vs dark maps to `globals.css` `:root` / `.dark` heuristics. */
export type M1ThemeMode = "light" | "dark";

/** True when every token row is unlocked — proposals use one coherent system driven by primary (+ link accent). */
export function isFullyFluidPalette(rows: Record<M1TokenId, M1RowState>): boolean {
  return M1_TOKEN_IDS.every((id) => !rows[id]?.confirmed);
}

function mix32(a: number, b: number): number {
  return Math.imul(a ^ b, 2654435761) >>> 0;
}

/** Deterministic 32-bit mixer for token id + variant (refresh jitter). */
export function tokenVariantHash(tokenId: string, variant: number): number {
  let h = variant >>> 0;
  for (let i = 0; i < tokenId.length; i++) {
    h = mix32(h, tokenId.charCodeAt(i));
  }
  return h >>> 0;
}

type Oklch = { mode: "oklch"; l: number; c: number; h?: number };

function asOklch(color: string): Oklch {
  const parsed = parse(color);
  if (!parsed) {
    return { mode: "oklch", l: 0.5, c: 0, h: 0 };
  }
  const o = toOklch(parsed);
  if (!o || o.mode !== "oklch") {
    return { mode: "oklch", l: 0.5, c: 0, h: 0 };
  }
  return {
    mode: "oklch",
    l: o.l ?? 0.5,
    c: o.c ?? 0,
    h: o.h,
  };
}

function clampOklch(o: Oklch): Oklch {
  const clipped = toOklch(clampGamut("rgb")(o));
  if (!clipped || clipped.mode !== "oklch") {
    return { mode: "oklch", l: o.l, c: o.c, h: o.h };
  }
  return {
    mode: "oklch",
    l: Math.min(1, Math.max(0, clipped.l)),
    c: Math.min(0.37, Math.max(0, clipped.c)),
    h: clipped.h,
  };
}

export function formatPbColor(o: Oklch): string {
  const s = formatCss(clampOklch(o));
  return s ?? "oklch(0.5 0 0)";
}

/** Small hue / chroma / lightness jitter from hash (per row refresh). */
export function jitterOklch(base: Oklch, tokenId: string, rowVariant: number): Oklch {
  const h = tokenVariantHash(tokenId, rowVariant);
  const dH = ((h & 0xff) / 255) * 10 - 5;
  const dC = (((h >> 8) & 0xff) / 255) * 0.035 - 0.0175;
  const dL = (((h >> 16) & 0xff) / 255) * 0.035 - 0.0175;

  const chroma = base.c ?? 0;
  const rawH = base.h ?? 0;
  const nh =
    chroma < 0.02
      ? rawH
      : (() => {
          let x = rawH + dH;
          while (x < 0) x += 360;
          while (x >= 360) x -= 360;
          return x;
        })();

  return clampOklch({
    mode: "oklch",
    l: Math.min(1, Math.max(0, base.l + dL)),
    c: Math.min(0.37, Math.max(0, chroma + dC)),
    h: nh,
  });
}

const TARGET_RATIOS = [4.5, 5, 5.5, 6, 6.5, 7, 7.5];

function contrastTargetForVariant(rowVariant: number): number {
  return TARGET_RATIOS[rowVariant % TARGET_RATIOS.length] ?? 4.5;
}

/**
 * Neutral foreground OKLCH on `fill` meeting WCAG contrast >= target (binary search on L).
 */
export function fitOnFill(fill: Oklch, rowVariant: number): Oklch {
  const fillO = clampOklch(fill);
  const target = contrastTargetForVariant(rowVariant);
  const lightFill = fillO.l >= 0.55;
  let lo = lightFill ? 0 : 0.52;
  let hi = lightFill ? 0.48 : 1;

  for (let i = 0; i < 28; i++) {
    const mid = (lo + hi) / 2;
    const cand: Oklch = { mode: "oklch", l: mid, c: 0, h: 0 };
    const ratio = wcagContrast(cand, fillO);
    if (lightFill) {
      if (ratio >= target) lo = mid;
      else hi = mid;
    } else {
      if (ratio >= target) hi = mid;
      else lo = mid;
    }
  }

  const outL = lightFill ? lo : hi;
  return clampOklch({ mode: "oklch", l: outL, c: 0, h: 0 });
}

function proposeFill(seedCss: string, tokenId: M1TokenId, rowVariant: number): Oklch {
  const base = asOklch(seedCss);
  return jitterOklch(base, tokenId, rowVariant);
}

function proposeLinkDefault(primaryFill: Oklch, tokenId: M1TokenId, rowVariant: number): Oklch {
  const h = primaryFill.c && primaryFill.c > 0.02 ? (primaryFill.h ?? 0) : 40;
  const base: Oklch = {
    mode: "oklch",
    l: 0.68,
    c: 0.025,
    h,
  };
  return jitterOklch(base, tokenId, rowVariant);
}

function proposeLinkHover(linkAccentSeed: string, tokenId: M1TokenId, rowVariant: number): Oklch {
  const base = asOklch(linkAccentSeed);
  const boosted: Oklch = {
    mode: "oklch",
    l: Math.min(0.62, Math.max(0.35, base.l)),
    c: Math.max(base.c ?? 0, 0.18),
    h: base.h,
  };
  return jitterOklch(boosted, tokenId, rowVariant);
}

function proposeLinkActive(linkDefault: Oklch, tokenId: M1TokenId, rowVariant: number): Oklch {
  const lightBg = linkDefault.l > 0.5;
  const base: Oklch = lightBg
    ? { mode: "oklch", l: 0.12, c: 0.06, h: linkDefault.h }
    : { mode: "oklch", l: 0.97, c: 0.02, h: linkDefault.h };
  return jitterOklch(base, tokenId, rowVariant);
}

function normalizeHue(primary: Oklch, linkAccentCss: string): number {
  if ((primary.c ?? 0) > 0.02) return primary.h ?? 0;
  const a = asOklch(linkAccentCss);
  if ((a.c ?? 0) > 0.04) return a.h ?? 320;
  return 85;
}

function coherentSurfaceFills(
  primary: Oklch,
  rows: Record<M1TokenId, M1RowState>,
  theme: M1ThemeMode,
  linkAccentCss: string
): { secondary: Oklch; accent: Oklch } {
  const h = normalizeHue(primary, linkAccentCss);

  if (theme === "light") {
    const secondary = jitterOklch(
      {
        mode: "oklch",
        l: primary.l > 0.55 ? Math.min(0.99, primary.l + 0.035) : 0.965,
        c: 0.022,
        h,
      },
      "--pb-secondary",
      rows["--pb-secondary"].rowVariant
    );
    const accent = jitterOklch(
      {
        mode: "oklch",
        l: primary.l > 0.55 ? Math.min(0.98, primary.l + 0.02) : 0.94,
        c: primary.l > 0.55 ? 0.04 : 0.058,
        h: (h + 32 + 360) % 360,
      },
      "--pb-accent",
      rows["--pb-accent"].rowVariant
    );
    return { secondary, accent };
  }

  const secondary = jitterOklch(
    { mode: "oklch", l: 0.26, c: 0.028, h },
    "--pb-secondary",
    rows["--pb-secondary"].rowVariant
  );
  const accent = jitterOklch(
    { mode: "oklch", l: 0.31, c: 0.065, h: (h + 28 + 360) % 360 },
    "--pb-accent",
    rows["--pb-accent"].rowVariant
  );
  return { secondary, accent };
}

function proposeCoherentLinkHover(
  primary: Oklch,
  linkAccentCss: string,
  tokenId: M1TokenId,
  rowVariant: number
): Oklch {
  const pop = asOklch(linkAccentCss);
  const hP = normalizeHue(primary, linkAccentCss);
  const hA = pop.c && pop.c > 0.03 ? (pop.h ?? hP) : hP;
  let h = hA * 0.52 + hP * 0.48;
  h = ((h % 360) + 360) % 360;
  const boosted = {
    mode: "oklch" as const,
    l: Math.min(0.6, Math.max(0.36, pop.l * 0.82 + primary.l * 0.18)),
    c: Math.max(pop.c ?? 0, 0.17),
    h,
  };
  return jitterOklch(boosted, tokenId, rowVariant);
}

/** All rows unlocked: one coherent ramp from primary hue + link-accent pop (secondary/accent seeds ignored). */
function proposeM1ValuesFullyFluid(
  seeds: M1ColorSeeds,
  rows: Record<M1TokenId, M1RowState>,
  theme: M1ThemeMode
): Record<M1TokenId, string> {
  const primaryFill = proposeFill(seeds.primary, "--pb-primary", rows["--pb-primary"].rowVariant);
  const { secondary: secondaryFill, accent: accentFill } = coherentSurfaceFills(
    primaryFill,
    rows,
    theme,
    seeds.linkAccent
  );
  const linkDefault = proposeLinkDefault(primaryFill, "--pb-link", rows["--pb-link"].rowVariant);
  const out = {} as Record<M1TokenId, string>;

  for (const id of M1_TOKEN_IDS) {
    switch (id) {
      case "--pb-primary":
        out[id] = formatPbColor(primaryFill);
        break;
      case "--pb-secondary":
        out[id] = formatPbColor(secondaryFill);
        break;
      case "--pb-accent":
        out[id] = formatPbColor(accentFill);
        break;
      case "--pb-on-primary":
        out[id] = formatPbColor(fitOnFill(primaryFill, rows[id].rowVariant));
        break;
      case "--pb-on-secondary":
        out[id] = formatPbColor(fitOnFill(secondaryFill, rows[id].rowVariant));
        break;
      case "--pb-on-accent":
        out[id] = formatPbColor(fitOnFill(accentFill, rows[id].rowVariant));
        break;
      case "--pb-link":
        out[id] = formatPbColor(linkDefault);
        break;
      case "--pb-link-hover": {
        const hover = proposeCoherentLinkHover(
          primaryFill,
          seeds.linkAccent,
          id,
          rows[id].rowVariant
        );
        out[id] = formatPbColor(hover);
        break;
      }
      case "--pb-link-active": {
        const active = proposeLinkActive(linkDefault, id, rows[id].rowVariant);
        out[id] = formatPbColor(active);
        break;
      }
      default:
        break;
    }
  }
  return out;
}

/**
 * Given seeds and per-row state, compute the CSS color string for every M1 token.
 * Confirmed rows keep their `value` in the output; unconfirmed rows get fresh proposals.
 * When nothing is locked, the whole palette follows `primary` (+ `linkAccent` for hover contrast); secondary/accent seeds apply only after locking breaks full-fluid mode.
 */
export function proposeM1Values(
  seeds: M1ColorSeeds,
  rows: Record<M1TokenId, M1RowState>,
  theme: M1ThemeMode
): Record<M1TokenId, string> {
  if (isFullyFluidPalette(rows)) {
    return proposeM1ValuesFullyFluid(seeds, rows, theme);
  }

  const out = {} as Record<M1TokenId, string>;

  const primaryFill = rows["--pb-primary"].confirmed
    ? asOklch(rows["--pb-primary"].value)
    : proposeFill(seeds.primary, "--pb-primary", rows["--pb-primary"].rowVariant);

  const secondaryFill = rows["--pb-secondary"].confirmed
    ? asOklch(rows["--pb-secondary"].value)
    : proposeFill(seeds.secondary, "--pb-secondary", rows["--pb-secondary"].rowVariant);

  const accentFill = rows["--pb-accent"].confirmed
    ? asOklch(rows["--pb-accent"].value)
    : proposeFill(seeds.accent, "--pb-accent", rows["--pb-accent"].rowVariant);

  const linkDefault = rows["--pb-link"].confirmed
    ? asOklch(rows["--pb-link"].value)
    : proposeLinkDefault(primaryFill, "--pb-link", rows["--pb-link"].rowVariant);

  for (const id of M1_TOKEN_IDS) {
    if (rows[id].confirmed) {
      out[id] = rows[id].value;
      continue;
    }

    switch (id) {
      case "--pb-primary":
        out[id] = formatPbColor(primaryFill);
        break;
      case "--pb-secondary":
        out[id] = formatPbColor(secondaryFill);
        break;
      case "--pb-accent":
        out[id] = formatPbColor(accentFill);
        break;
      case "--pb-on-primary":
        out[id] = formatPbColor(fitOnFill(primaryFill, rows[id].rowVariant));
        break;
      case "--pb-on-secondary":
        out[id] = formatPbColor(fitOnFill(secondaryFill, rows[id].rowVariant));
        break;
      case "--pb-on-accent":
        out[id] = formatPbColor(fitOnFill(accentFill, rows[id].rowVariant));
        break;
      case "--pb-link":
        out[id] = formatPbColor(linkDefault);
        break;
      case "--pb-link-hover": {
        const hover = proposeLinkHover(seeds.linkAccent, id, rows[id].rowVariant);
        out[id] = formatPbColor(hover);
        break;
      }
      case "--pb-link-active": {
        const active = proposeLinkActive(linkDefault, id, rows[id].rowVariant);
        out[id] = formatPbColor(active);
        break;
      }
      default:
        break;
    }
  }

  return out;
}

/** Contrast ratio for UI hint; returns undefined if parsing fails. */
export function contrastPair(foregroundCss: string, backgroundCss: string): number | undefined {
  try {
    const a = parse(foregroundCss);
    const b = parse(backgroundCss);
    if (!a || !b) return undefined;
    return wcagContrast(a, b);
  } catch {
    return undefined;
  }
}

export function contrastHintForToken(
  tokenId: M1TokenId,
  values: Record<M1TokenId, string>
): number | undefined {
  const pair = M1_ON_PAIR[tokenId];
  if (!pair) return undefined;
  return contrastPair(values[tokenId], values[pair]);
}

/** Lines for UI tooltips: ratio, normal-text WCAG bucket, large-text bucket. */
export function wcagContrastTooltipLines(ratio: number | undefined): string[] | null {
  if (ratio == null || !Number.isFinite(ratio)) return null;
  const n = ratio.toFixed(2);
  const normal =
    ratio >= 7 ? "AAA" : ratio >= 4.5 ? "AA" : ratio >= 3 ? "A (large text only)" : "Below AA";
  const large = ratio >= 4.5 ? "AAA" : ratio >= 3 ? "AA" : "Below AA";
  return [`${n}∶1`, `Normal text: ${normal}`, `Large text: ${large}`];
}

/** Fresh row map: all unconfirmed, variant 0, values from seeds. */
export function initialM1Rows(
  seeds: M1ColorSeeds,
  theme: M1ThemeMode
): Record<M1TokenId, M1RowState> {
  const base = Object.fromEntries(
    M1_TOKEN_IDS.map((id) => [
      id,
      { value: "", confirmed: false, rowVariant: 0 } satisfies M1RowState,
    ])
  ) as Record<M1TokenId, M1RowState>;

  const proposed = proposeM1Values(seeds, base, theme);
  const rows = { ...base };
  for (const id of M1_TOKEN_IDS) {
    rows[id] = { ...rows[id], value: proposed[id] };
  }
  return rows;
}
