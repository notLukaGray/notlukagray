import type { TypeScaleConfig } from "@/app/fonts/type-scale";
import { TYPE_SCALE_VAR_PREFIXES } from "@/app/fonts/type-scale";
import type { BunnyFontMeta } from "@/app/dev/fonts/page";
import type { SlotName, SlotState } from "./font-dev-persistence";

const SCALE_KEYS = Object.keys(TYPE_SCALE_VAR_PREFIXES) as (keyof TypeScaleConfig)[];

function slugify(family: string): string {
  return family.toLowerCase().replace(/\s+/g, "-");
}

function variableWeightRangeSnippet(meta: BunnyFontMeta): string {
  if (meta.weights.length === 0) return "100 900";
  return `${Math.min(...meta.weights)} ${Math.max(...meta.weights)}`;
}

function generateFontSnippet(
  slot: SlotName,
  state: SlotState,
  bunnyMeta: BunnyFontMeta | undefined,
  browserLocalPreview?: boolean
): string {
  const head = browserLocalPreview
    ? "// Preview: files below are only in this browser. For the live site, add the same files under public/font/ and list them in local.files here.\n//\n"
    : "";

  const weights = Object.entries(state.weights)
    .filter(([, value]) => value !== undefined)
    .map(([key, value]) => `    ${key}: ${value}`)
    .join(",\n");

  const localBlock = bunnyMeta?.variable
    ? `  local: {
    variable: true,
    path: "../../../public/font/YourFont[wght].woff2",
    weightRange: "${bunnyMeta ? variableWeightRangeSnippet(bunnyMeta) : "100 900"}",
  },`
    : `  local: {
    variable: false,
    files: [
      // { path: "../../../public/font/YourFont-Regular.woff2", weight: 400, style: "normal" },
    ],
  },`;

  return `${head}export const ${slot}FontConfig: FontSlotConfig = {
  source: "${state.source}",

  webfont: { family: "${state.family}" },

${localBlock}

  weights: {
${weights},
  },
  italic: ${state.italic},
};`;
}

export function generateAllFontsSnippet(
  configs: Record<SlotName, SlotState>,
  fontList: Record<string, BunnyFontMeta>,
  slotHasLocalPreview: (slot: SlotName) => boolean
): string {
  return (["primary", "secondary", "mono"] as SlotName[])
    .map((slot) =>
      generateFontSnippet(
        slot,
        configs[slot],
        fontList[slugify(configs[slot].family)],
        slotHasLocalPreview(slot)
      )
    )
    .join("\n\n");
}

export function generateScaleSnippet(scale: TypeScaleConfig): string {
  const entries = SCALE_KEYS.map((key) => {
    const entry = scale[key];
    return `  ${key}: {
    sizeDesktop: ${entry.sizeDesktop},
    sizeMobile: ${entry.sizeMobile},
    lineHeightDesktop: ${entry.lineHeightDesktop},
    lineHeightMobile: ${entry.lineHeightMobile},
    letterSpacing: "${entry.letterSpacing}",
    fontWeightRole: "${entry.fontWeightRole}",
  }`;
  }).join(",\n");

  return `export const typeScaleConfig: TypeScaleConfig = {\n${entries},\n};`;
}
