import type { M1TokenId } from "@/app/theme/pb-color-tokens";
import { M1_TOKEN_IDS } from "@/app/theme/pb-color-tokens";
import { derivePbThemeTokens, PB_DERIVED_TOKEN_IDS } from "@/app/theme/pb-color-derived-tokens";

const PB_A11Y_CONSTANT_TOKENS: Record<string, string> = {
  "--pb-ring-color": "var(--pb-primary)",
  "--pb-ring-width": "2px",
  "--pb-ring-offset": "2px",
  "--pb-ring-style": "solid",
  "--pb-selection-bg": "var(--pb-primary)",
  "--pb-selection-color": "var(--pb-on-primary)",
};

/**
 * Brand + link seeds for light UI. Edit via `/dev/colors` → copy replaces this file.
 * Extended surfaces/status/chart/sidebar tokens derive from these seeds at runtime.
 */
export const pbBrandLight = {
  "--pb-primary": "oklch(0.205 0 0)",
  "--pb-on-primary": "oklch(0.985 0 0)",
  "--pb-secondary": "oklch(0.97 0 0)",
  "--pb-on-secondary": "oklch(0.205 0 0)",
  "--pb-accent": "oklch(0.97 0 0)",
  "--pb-on-accent": "oklch(0.205 0 0)",
  "--pb-link": "#a8a8a8",
  "--pb-link-hover": "#f000b8",
  "--pb-link-active": "#ffffff",
} as const satisfies Record<M1TokenId, string>;

export const pbBrandDark = {
  "--pb-primary": "oklch(0.922 0 0)",
  "--pb-on-primary": "oklch(0.205 0 0)",
  "--pb-secondary": "oklch(0.269 0 0)",
  "--pb-on-secondary": "oklch(0.985 0 0)",
  "--pb-accent": "oklch(0.269 0 0)",
  "--pb-on-accent": "oklch(0.985 0 0)",
  "--pb-link": "#a8a8a8",
  "--pb-link-hover": "#f000b8",
  "--pb-link-active": "#ffffff",
} as const satisfies Record<M1TokenId, string>;

/** Emits `:root` / `.dark` blocks; injected at start of `<body>` so it overrides `globals.css`. */
export function pbBrandCssInline(): string {
  const lightDerived = derivePbThemeTokens(pbBrandLight, "light");
  const darkDerived = derivePbThemeTokens(pbBrandDark, "dark");
  const rootLines = [
    ...M1_TOKEN_IDS.map((id) => `  ${id}: ${pbBrandLight[id]};`),
    ...PB_DERIVED_TOKEN_IDS.map((id) => `  ${id}: ${lightDerived[id]};`),
    ...Object.entries(PB_A11Y_CONSTANT_TOKENS).map(([id, value]) => `  ${id}: ${value};`),
  ].join("\n");
  const darkLines = [
    ...M1_TOKEN_IDS.map((id) => `  ${id}: ${pbBrandDark[id]};`),
    ...PB_DERIVED_TOKEN_IDS.map((id) => `  ${id}: ${darkDerived[id]};`),
    ...Object.entries(PB_A11Y_CONSTANT_TOKENS).map(([id, value]) => `  ${id}: ${value};`),
  ].join("\n");
  return `:root {\n${rootLines}\n}\n\n.dark {\n${darkLines}\n}`;
}
