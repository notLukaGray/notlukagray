import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { primaryFontConfig, secondaryFontConfig, monoFontConfig } from "@/app/fonts/config";
import { typeScaleConfig } from "@/app/fonts/type-scale";
import { FontDevClient } from "./FontDevClient";

export const metadata: Metadata = {
  title: "Fonts & type scale (dev)",
  robots: { index: false, follow: false },
};

// Don't cache — always reflect current config on reload.
export const dynamic = "force-dynamic";

export type BunnyFontMeta = {
  /** Display name, e.g. "Inter" */
  name: string;
  weights: number[];
  styles: string[];
  variable?: boolean;
  /** Font category from Bunny catalog, e.g. "sans-serif", "serif", "monospace", "display", "handwriting" */
  category?: string;
};

/** Raw shape returned by https://fonts.bunny.net/list */
type BunnyListEntryRaw = {
  familyName?: string;
  weights?: number[];
  styles?: string[];
  isVariable?: boolean;
  category?: string;
};

function normalizeBunnyFontList(raw: Record<string, unknown>): Record<string, BunnyFontMeta> {
  const out: Record<string, BunnyFontMeta> = {};
  for (const [slug, v] of Object.entries(raw)) {
    if (!v || typeof v !== "object") continue;
    const e = v as BunnyListEntryRaw;
    if (typeof e.familyName !== "string" || !e.familyName.length) continue;
    out[slug] = {
      name: e.familyName,
      weights: Array.isArray(e.weights) ? e.weights : [],
      styles: Array.isArray(e.styles) ? e.styles : [],
      variable: e.isVariable,
      category: typeof e.category === "string" ? e.category : undefined,
    };
  }
  return out;
}

async function fetchBunnyFontList(): Promise<Record<string, BunnyFontMeta>> {
  try {
    const res = await fetch("https://fonts.bunny.net/list", {
      next: { revalidate: 86400 },
    });
    if (!res.ok) return {};
    const raw = (await res.json()) as Record<string, unknown>;
    return normalizeBunnyFontList(raw);
  } catch {
    return {};
  }
}

export default async function FontDevPage() {
  if (process.env.NODE_ENV !== "development") notFound();

  const fontList = await fetchBunnyFontList();

  return (
    <FontDevClient
      fontList={fontList}
      initialConfigs={{
        primary: {
          family: primaryFontConfig.webfont.family,
          weights: primaryFontConfig.weights,
          italic: primaryFontConfig.italic,
          source: primaryFontConfig.source,
        },
        secondary: {
          family: secondaryFontConfig.webfont.family,
          weights: secondaryFontConfig.weights,
          italic: secondaryFontConfig.italic,
          source: secondaryFontConfig.source,
        },
        mono: {
          family: monoFontConfig.webfont.family,
          weights: monoFontConfig.weights,
          italic: monoFontConfig.italic,
          source: monoFontConfig.source,
        },
      }}
      initialTypeScale={typeScaleConfig}
    />
  );
}
