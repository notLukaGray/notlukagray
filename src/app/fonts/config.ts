export type FontWeightMap = {
  thin?: number;
  light?: number;
  book?: number;
  regular?: number;
  bold?: number;
  black?: number;
};

/** Semantic keys in `FontWeightMap` — used by typography / type scale to pick a weight. */
export const FONT_WEIGHT_ROLES = ["thin", "light", "regular", "book", "bold", "black"] as const;
export type FontWeightRole = (typeof FONT_WEIGHT_ROLES)[number];

export type LocalStaticFile = {
  /**
   * Relative path from create-fonts.ts. Must match the literal path in the
   * corresponding `localFont()` src array — Next.js/Turbopack requires literals there.
   */
  path: string;
  weight: number;
  style: "normal" | "italic";
};

export type LocalFontConfig =
  | { variable: true; path: string; weightRange: string }
  | { variable: false; files: LocalStaticFile[] };

export type FontSlotConfig = {
  /**
   * Active source. Flip this single field to toggle between self-hosted and
   * webfont delivery for this slot. Everything else stays the same.
   */
  source: "local" | "webfont";

  /**
   * Webfont config. `family` must match the display name in the Bunny Fonts
   * catalog (e.g. "Inter", "Roboto Flex", "JetBrains Mono").
   * The CSS URL is constructed automatically from `weights` + `italic`.
   */
  webfont: { family: string };

  /**
   * Local font config. Keep this in sync with the literal `src` in create-fonts.ts.
   * (Next.js/Turbopack cannot resolve dynamically computed paths in next/font/local,
   * so the actual file paths live as string literals over there.)
   */
  local: LocalFontConfig;

  /**
   * Semantic weight names mapped to numeric font-weight values for this typeface.
   * These drive the `--font-weight-*` CSS vars injected in the layout, which the
   * typography classes in globals.css consume.
   */
  weights: FontWeightMap;

  /** Whether italic styles are available for this typeface. */
  italic: boolean;
};

// ─── Slot definitions ─────────────────────────────────────────────────────────
//
// To switch a slot from local files to a webfont (or back):
//   change `source` — that's the only line you need to touch.
//
// To change the webfont family:
//   update `webfont.family` to any name from fonts.bunny.net.
//
// To update local files:
//   1. Drop your font files into public/font/
//   2. Update the `local` config here to document them
//   3. Update the matching literal src array in create-fonts.ts
//
// To change weight mappings for a new typeface:
//   update `weights` — the CSS vars and typography classes update automatically.

export const primaryFontConfig: FontSlotConfig = {
  source: "webfont",

  webfont: { family: "Inter" },

  // Stub until real files are added. Switch to variable: true for a variable font:
  //   local: { variable: true, path: "Exo2[wght].woff2", weightRange: "100 900" }
  // or list individual weight files:
  //   local: { variable: false, files: [{ path: "Gothica-Bold.woff2", weight: 700, style: "normal" }, ...] }
  local: {
    variable: false,
    files: [
      { path: "../../../public/font/_local-loader-stub.woff2", weight: 400, style: "normal" },
    ],
  },

  weights: { thin: 100, light: 300, book: 500, regular: 400, bold: 700, black: 900 },
  italic: true,
};

export const secondaryFontConfig: FontSlotConfig = {
  source: "webfont",

  webfont: { family: "Newsreader" },

  local: {
    variable: false,
    files: [
      { path: "../../../public/font/_local-loader-stub.woff2", weight: 400, style: "normal" },
    ],
  },

  weights: { thin: 100, light: 300, book: 500, regular: 400, bold: 700, black: 900 },
  italic: true,
};

export const monoFontConfig: FontSlotConfig = {
  source: "webfont",

  webfont: { family: "JetBrains Mono" },

  local: {
    variable: false,
    files: [
      { path: "../../../public/font/_local-loader-stub.woff2", weight: 400, style: "normal" },
    ],
  },

  weights: { thin: 100, light: 300, book: 500, regular: 400, bold: 700, black: 900 },
  italic: false,
};
