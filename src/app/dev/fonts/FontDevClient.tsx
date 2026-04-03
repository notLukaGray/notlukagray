"use client";

import {
  createElement,
  useCallback,
  useEffect,
  useId,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
  startTransition,
  type CSSProperties,
  type ReactNode,
} from "react";
import type { FontWeightMap, FontWeightRole } from "@/app/fonts/config";
import { FONT_WEIGHT_ROLES } from "@/app/fonts/config";
import type { TypeScaleConfig, TypeScaleEntry } from "@/app/fonts/type-scale";
import {
  TYPE_SCALE_VAR_PREFIXES,
  TYPE_SCALE_LABELS,
  TYPE_SCALE_SHORT_TAG,
  TYPE_SCALE_LEGACY_KEYS,
  TYPE_SCALE_PREVIOUS_TSHIRT_SLOT_MAP,
  TYPE_SCALE_UTILITY_CLASS,
} from "@/app/fonts/type-scale";
import { buildBunnyFontUrl } from "@/app/fonts/webfont";
import type { BunnyFontMeta } from "./page";
import {
  applyLocalRolePreviewFontFaces,
  clearLocalRolePreviewFontFaces,
  deriveLocalDisplayFamily,
  inferWeightStyleFromFileName,
  localRolePreviewFamily,
  previewCssFamily,
  type LocalRoleFaceRule,
} from "./local-font-preview";
import {
  useLocalFontPreviews,
  type LocalPreviewFileRuntime,
  type LocalPreviewRuntime,
} from "./use-local-font-previews";
import { DevWorkbenchNav } from "@/app/dev/_components/DevWorkbenchNav";
import { DevWorkbenchPageHeader } from "@/app/dev/_components/DevWorkbenchPageHeader";
import { DevWorkbenchPageShell } from "@/app/dev/_components/DevWorkbenchPageShell";

// ─── Types ────────────────────────────────────────────────────────────────────

type SlotName = "primary" | "secondary" | "mono";

const SLOT_UI_LABEL: Record<SlotName, string> = {
  primary: "Primary",
  secondary: "Secondary",
  mono: "Mono",
};

type SlotPreviewMode = "catalog" | "local";

type WeightPickerMode =
  | { kind: "variable"; wghtMin: number; wghtMax: number }
  | { kind: "static"; options: number[] }
  | { kind: "localFiles"; files: LocalPreviewFileRuntime[] };

const VARIABLE_WGHT_FALLBACK_MIN = 100;
const VARIABLE_WGHT_FALLBACK_MAX = 900;

function variableAxisFromMeta(meta: BunnyFontMeta | undefined): {
  wghtMin: number;
  wghtMax: number;
} {
  const w = meta?.weights;
  if (!w?.length) {
    return { wghtMin: VARIABLE_WGHT_FALLBACK_MIN, wghtMax: VARIABLE_WGHT_FALLBACK_MAX };
  }
  const lo = Math.min(...w);
  const hi = Math.max(...w);
  // Bunny sometimes lists a single sample for a VF — min===max would clamp every role to one weight (e.g. 900).
  if (lo === hi) {
    return { wghtMin: VARIABLE_WGHT_FALLBACK_MIN, wghtMax: VARIABLE_WGHT_FALLBACK_MAX };
  }
  return { wghtMin: lo, wghtMax: hi };
}

function variablePicker(meta: BunnyFontMeta | undefined): WeightPickerMode {
  const { wghtMin, wghtMax } = variableAxisFromMeta(meta);
  return { kind: "variable", wghtMin, wghtMax };
}

function clampWght(n: number, wghtMin: number, wghtMax: number): number {
  const lo = Math.min(wghtMin, wghtMax);
  const hi = Math.max(wghtMin, wghtMax);
  return Math.min(hi, Math.max(lo, Math.round(n)));
}

function snapWghtToCatalogSteps(n: number, steps: number[]): number {
  const sorted = [...new Set(steps)].sort((a, b) => a - b);
  if (sorted.length < 2) return n;
  let best = sorted[0]!;
  let bestDist = Math.abs(best - n);
  for (const s of sorted) {
    const d = Math.abs(s - n);
    if (d < bestDist || (d === bestDist && s > best)) {
      best = s;
      bestDist = d;
    }
  }
  return best;
}

function wghtPreviewStyle(fontFamilyCss: string, w: number, variableFace: boolean): CSSProperties {
  const s: CSSProperties = { fontFamily: fontFamilyCss, fontWeight: w };
  if (variableFace) {
    s.fontVariationSettings = `"wght" ${w}`;
  }
  return s;
}

function staticWeightOptionLabel(w: number): string {
  const hints: Partial<Record<number, string>> = {
    100: "Thin",
    200: "Extra light",
    300: "Light",
    400: "Regular",
    500: "Medium",
    600: "Semibold",
    700: "Bold",
    800: "Extra bold",
    900: "Black",
  };
  const hint = hints[w];
  return hint ? `${w} — ${hint}` : String(w);
}

function staticSelectOptionLabel(
  w: number,
  rowName: keyof FontWeightMap,
  allWeights: FontWeightMap
): string {
  const base = staticWeightOptionLabel(w);
  const other = WEIGHT_NAMES.find((n) => n !== rowName && allWeights[n] === w);
  return other ? `${base} · ${other}` : base;
}

function resolveWeightPickerMode(
  previewMode: SlotPreviewMode,
  bunnyMeta: BunnyFontMeta | undefined,
  localLibrary: LocalPreviewRuntime | undefined
): WeightPickerMode {
  if (previewMode === "local" && localLibrary?.files.length) {
    return { kind: "localFiles", files: localLibrary.files };
  }
  if (bunnyMeta?.variable === true) return variablePicker(bunnyMeta);
  // Catalog static face: discrete masters from the API when present.
  if (bunnyMeta) {
    const opts = bunnyMeta.weights?.length
      ? [...new Set(bunnyMeta.weights)].sort((a, b) => a - b)
      : [];
    if (opts.length > 0) return { kind: "static", options: opts };
    return variablePicker(bunnyMeta);
  }
  return variablePicker(undefined);
}

function catalogVariableSnapStepsFromMeta(
  previewMode: SlotPreviewMode,
  bunnyMeta: BunnyFontMeta | undefined
): number[] | null {
  if (previewMode !== "catalog" || bunnyMeta?.variable !== true || bunnyMeta.weights.length < 2) {
    return null;
  }
  return [...new Set(bunnyMeta.weights)].sort((a, b) => a - b);
}

type SlotState = {
  family: string;
  weights: FontWeightMap;
  italic: boolean;
  source: "local" | "webfont";

  localRoleFiles?: Partial<Record<keyof FontWeightMap, string>>;
};

type Props = {
  fontList: Record<string, BunnyFontMeta>;
  initialConfigs: Record<SlotName, SlotState>;
  initialTypeScale: TypeScaleConfig;
};

const WEIGHT_NAMES: (keyof FontWeightMap)[] = ["thin", "light", "regular", "book", "bold", "black"];

const SEMANTIC_IDEAL_WEIGHT: Record<keyof FontWeightMap, number> = {
  thin: 100,
  light: 300,
  book: 500,
  regular: 400,
  bold: 700,
  black: 900,
};

function defaultWeightForSemanticSlot(name: keyof FontWeightMap, picker: WeightPickerMode): number {
  const ideal = SEMANTIC_IDEAL_WEIGHT[name];
  if (picker.kind === "variable") {
    return clampWght(ideal, picker.wghtMin, picker.wghtMax);
  }
  if (picker.kind === "localFiles") {
    const files = picker.files;
    const f = files[WEIGHT_NAMES.indexOf(name) % files.length]!;
    return f.fontWeight;
  }
  const opts = picker.options;
  if (!opts.length) return ideal;
  const first = opts[0]!;
  return opts.reduce((best, o) => (Math.abs(o - ideal) < Math.abs(best - ideal) ? o : best), first);
}

const SCALE_KEYS = Object.keys(TYPE_SCALE_VAR_PREFIXES) as (keyof TypeScaleConfig)[];

const DEFAULT_PREVIEW_PHRASE = "The quick brown fox jumps over the lazy dog. 0123456789";
const HEADING_SAMPLE = "LOREM IPSUM\nlorem ipsum";

function typeScaleTwoLineBody(text: string): string {
  const normalized = text.trim();
  const byNl = normalized
    .split(/\r?\n/)
    .map((s) => s.trim())
    .filter((s) => s.length > 0);
  if (byNl.length >= 2) return `${byNl[0]}\n${byNl[1]}`;
  if (byNl.length === 1) {
    const s = byNl[0]!;
    const half = Math.floor(s.length / 2);
    let cut = s.lastIndexOf(" ", half);
    if (cut < 12) cut = s.indexOf(" ", half + 1);
    if (cut <= 0) return `${s}\n${s}`;
    const a = s.slice(0, cut).trim();
    const b = s.slice(cut).trim();
    return b.length > 0 ? `${a}\n${b}` : `${a}\n${a}`;
  }
  return `${normalized}\n${normalized}`;
}

// ─── Persist UI in localStorage (dev tool only; never sent to server) ─────────

const FONT_DEV_PREFS_KEY = "notlukagray-font-dev-prefs-v1";

type FontDevPrefsV1 = {
  v: 1;
  configs: Record<SlotName, SlotState>;
  slotPreviewMode: Record<SlotName, SlotPreviewMode>;
  typeScale: TypeScaleConfig;
  previewSampleText: string;
};

function sanitizeFontWeightMap(raw: unknown): FontWeightMap {
  const out: FontWeightMap = {};
  if (!raw || typeof raw !== "object") return out;
  const o = raw as Record<string, unknown>;
  for (const k of WEIGHT_NAMES) {
    const v = o[k];
    if (typeof v === "number" && Number.isFinite(v) && v >= 1 && v <= 1000) {
      out[k] = Math.round(v);
    }
  }
  return out;
}

function sanitizeLocalRoleFiles(raw: unknown): SlotState["localRoleFiles"] {
  if (!raw || typeof raw !== "object") return undefined;
  const o = raw as Record<string, unknown>;
  const out: NonNullable<SlotState["localRoleFiles"]> = {};
  for (const k of WEIGHT_NAMES) {
    const v = o[k];
    if (typeof v === "string" && v.length > 0 && v.length < 512) out[k] = v;
  }
  return Object.keys(out).length > 0 ? out : undefined;
}

function mergeSlotState(baseline: SlotState, patch: unknown): SlotState {
  if (!patch || typeof patch !== "object") return baseline;
  const p = patch as Partial<SlotState>;
  const weights = sanitizeFontWeightMap(p.weights);
  const hasWeights = WEIGHT_NAMES.some((k) => weights[k] !== undefined);
  // Baseline from `config.ts` is authoritative for `source`: old prefs often had `local`
  // when defaults were local or IDB ran before hydrate; do not resurrect that after defaults move to webfont.
  const source =
    baseline.source === "webfont" ? "webfont" : p.source === "local" ? "local" : "webfont";
  const localRoleFiles = source === "local" ? sanitizeLocalRoleFiles(p.localRoleFiles) : undefined;
  return {
    family:
      typeof p.family === "string" && p.family.trim().length > 0
        ? p.family.trim()
        : baseline.family,
    weights: hasWeights ? weights : baseline.weights,
    italic: typeof p.italic === "boolean" ? p.italic : baseline.italic,
    source,
    localRoleFiles,
  };
}

function sanitizeFontWeightRole(raw: unknown, fallback: FontWeightRole): FontWeightRole {
  return typeof raw === "string" && FONT_WEIGHT_ROLES.includes(raw as FontWeightRole)
    ? (raw as FontWeightRole)
    : fallback;
}

function storedNeedsResetTshirtSlots(s: Record<string, unknown>): boolean {
  return ("heading2xs" in s && !("heading2xl" in s)) || ("body2xs" in s && !("body2xl" in s));
}

/** Older saves used XL=largest & 2XS=smallest; permute entries to XS–2XL semantics. */
function remapPreviousTshirtEraKeys(s: Record<string, unknown>): Record<string, unknown> {
  const out = { ...s };
  for (const [from, to] of Object.entries(TYPE_SCALE_PREVIOUS_TSHIRT_SLOT_MAP)) {
    if (out[String(to)] === undefined && out[from] !== undefined) {
      out[String(to)] = out[from];
    }
  }
  for (const from of Object.keys(TYPE_SCALE_PREVIOUS_TSHIRT_SLOT_MAP)) {
    delete out[from];
  }
  return out;
}

function mergeTypeScaleFromStored(baseline: TypeScaleConfig, stored: unknown): TypeScaleConfig {
  if (!stored || typeof stored !== "object") return baseline;
  const raw = stored as Record<string, unknown>;
  let s: Record<string, unknown> = { ...raw };
  for (const [legacy, modern] of Object.entries(TYPE_SCALE_LEGACY_KEYS)) {
    if (s[String(modern)] === undefined && s[legacy] !== undefined) {
      s[String(modern)] = s[legacy];
    }
  }
  if (storedNeedsResetTshirtSlots(s)) {
    s = remapPreviousTshirtEraKeys(s);
  }
  const out = { ...baseline };
  for (const key of SCALE_KEYS) {
    const e = s[key as string];
    if (!e || typeof e !== "object") continue;
    const entry = e as Record<string, unknown>;
    const base = baseline[key];
    out[key] = {
      sizeDesktop: typeof entry.sizeDesktop === "number" ? entry.sizeDesktop : base.sizeDesktop,
      sizeMobile: typeof entry.sizeMobile === "number" ? entry.sizeMobile : base.sizeMobile,
      lineHeightDesktop:
        typeof entry.lineHeightDesktop === "number"
          ? entry.lineHeightDesktop
          : base.lineHeightDesktop,
      lineHeightMobile:
        typeof entry.lineHeightMobile === "number" ? entry.lineHeightMobile : base.lineHeightMobile,
      letterSpacing:
        typeof entry.letterSpacing === "string" ? entry.letterSpacing : base.letterSpacing,
      fontWeightRole: sanitizeFontWeightRole(entry.fontWeightRole, base.fontWeightRole),
    };
  }
  return out;
}

function readFontDevPrefs(
  baselineConfigs: Record<SlotName, SlotState>,
  baselineScale: TypeScaleConfig
): Omit<FontDevPrefsV1, "v"> | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem(FONT_DEV_PREFS_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as FontDevPrefsV1;
    if (parsed?.v !== 1 || !parsed.configs || typeof parsed.configs !== "object") return null;

    const configs = { ...baselineConfigs };
    for (const slot of ["primary", "secondary", "mono"] as SlotName[]) {
      configs[slot] = mergeSlotState(baselineConfigs[slot], parsed.configs[slot]);
    }

    const spm = parsed.slotPreviewMode;
    let slotPreviewMode: Record<SlotName, SlotPreviewMode> = {
      primary: spm?.primary === "local" ? "local" : "catalog",
      secondary: spm?.secondary === "local" ? "local" : "catalog",
      mono: spm?.mono === "local" ? "local" : "catalog",
    };
    slotPreviewMode = syncSlotPreviewModeWithWebfontSource(configs, slotPreviewMode);

    const typeScale = mergeTypeScaleFromStored(baselineScale, parsed.typeScale);

    const previewSampleText =
      typeof parsed.previewSampleText === "string" && parsed.previewSampleText.trim().length > 0
        ? parsed.previewSampleText.slice(0, 5000)
        : DEFAULT_PREVIEW_PHRASE;

    return { configs, slotPreviewMode, typeScale, previewSampleText };
  } catch {
    return null;
  }
}

function writeFontDevPrefs(payload: Omit<FontDevPrefsV1, "v">): void {
  if (typeof window === "undefined") return;
  try {
    const data: FontDevPrefsV1 = { v: 1, ...payload };
    localStorage.setItem(FONT_DEV_PREFS_KEY, JSON.stringify(data));
  } catch {
    // ignore quota / private mode
  }
}

function syncSlotPreviewModeWithWebfontSource(
  configs: Record<SlotName, SlotState>,
  slotPreviewMode: Record<SlotName, SlotPreviewMode>
): Record<SlotName, SlotPreviewMode> {
  const next = { ...slotPreviewMode };
  for (const slot of ["primary", "secondary", "mono"] as SlotName[]) {
    if (configs[slot].source === "webfont") next[slot] = "catalog";
  }
  return next;
}

// ─── Helpers ─────────────────────────────────────────────────────────────────

function slugify(family: string) {
  return family.toLowerCase().replace(/\s+/g, "-");
}

function assignStaticDefaults(options: number[]): FontWeightMap {
  const sorted = [...new Set(options)].sort((a, b) => a - b);
  const out: FontWeightMap = {};
  if (sorted.length === 0) return out;
  const first = sorted[0]!;
  for (const name of WEIGHT_NAMES) {
    const ideal = SEMANTIC_IDEAL_WEIGHT[name];
    out[name] = sorted.reduce(
      (best, o) => (Math.abs(o - ideal) < Math.abs(best - ideal) ? o : best),
      first
    );
  }
  return out;
}

function firstUnusedStaticMaster(options: number[], used: Set<number>, ideal: number): number {
  const free = options.filter((w) => !used.has(w));
  if (free.length === 0) {
    const fb = options[0];
    return fb !== undefined ? fb : ideal;
  }
  return free.reduce(
    (best, o) => (Math.abs(o - ideal) < Math.abs(best - ideal) ? o : best),
    free[0]!
  );
}

function initialLocalSlotAssignments(files: LocalPreviewFileRuntime[]): {
  weights: FontWeightMap;
  localRoleFiles: Partial<Record<keyof FontWeightMap, string>>;
} {
  const weights: FontWeightMap = {};
  const localRoleFiles: Partial<Record<keyof FontWeightMap, string>> = {};
  for (let i = 0; i < WEIGHT_NAMES.length; i++) {
    const name = WEIGHT_NAMES[i]!;
    const f = files[i % files.length]!;
    weights[name] = f.fontWeight;
    localRoleFiles[name] = f.fileName;
  }
  return { weights, localRoleFiles };
}

function initialLocalFromFileNames(fileNames: string[]): {
  weights: FontWeightMap;
  localRoleFiles: Partial<Record<keyof FontWeightMap, string>>;
} {
  const weights: FontWeightMap = {};
  const localRoleFiles: Partial<Record<keyof FontWeightMap, string>> = {};
  for (let i = 0; i < WEIGHT_NAMES.length; i++) {
    const name = WEIGHT_NAMES[i]!;
    const fn = fileNames[i % fileNames.length]!;
    weights[name] = inferWeightStyleFromFileName(fn).weight;
    localRoleFiles[name] = fn;
  }
  return { weights, localRoleFiles };
}

function usedStaticMastersExcept(
  weights: FontWeightMap,
  exceptName: keyof FontWeightMap
): Set<number> {
  const s = new Set<number>();
  for (const n of WEIGHT_NAMES) {
    if (n === exceptName) continue;
    const v = weights[n];
    if (v !== undefined) s.add(v);
  }
  return s;
}

function defaultWeightsMap(picker: WeightPickerMode): FontWeightMap {
  if (picker.kind === "variable") {
    const weights: FontWeightMap = {};
    for (const name of WEIGHT_NAMES) {
      weights[name] = defaultWeightForSemanticSlot(name, picker);
    }
    return weights;
  }
  if (picker.kind === "localFiles") {
    return initialLocalSlotAssignments(picker.files).weights;
  }
  return assignStaticDefaults(picker.options);
}

function defaultWeightsForCatalogSelection(
  family: string,
  fontList: Record<string, BunnyFontMeta>
): FontWeightMap {
  const meta = fontList[slugify(family)];
  const picker = resolveWeightPickerMode("catalog", meta, undefined);
  return defaultWeightsMap(picker);
}

function injectFontLink(url: string): void {
  if (typeof document === "undefined") return;
  if (document.querySelector(`link[data-font-preview="${url}"]`)) return;
  const link = document.createElement("link");
  link.rel = "stylesheet";
  link.href = url;
  link.dataset.fontPreview = url;
  document.head.appendChild(link);
}

function variableWeightRangeSnippet(meta: BunnyFontMeta): string {
  const w = meta.weights;
  if (w.length === 0) return "100 900";
  return `${Math.min(...w)} ${Math.max(...w)}`;
}

function generateFontSnippet(
  slot: SlotName,
  state: SlotState,
  bunnyMeta: BunnyFontMeta | undefined,
  browserLocalPreview?: boolean
): string {
  const head =
    browserLocalPreview === true
      ? `// Preview: files below are only in this browser. For the live site, add the same files under public/font/ and list them in local.files here.\n//\n`
      : "";

  const weights = Object.entries(state.weights)
    .filter(([, v]) => v !== undefined)
    .map(([k, v]) => `    ${k}: ${v}`)
    .join(",\n");

  const isVariable = bunnyMeta?.variable === true;
  const localBlock = isVariable
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

function generateAllFontsSnippet(
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

function generateScaleSnippet(scale: TypeScaleConfig): string {
  const entries = SCALE_KEYS.map((key) => {
    const e = scale[key];
    return `  ${key}: {
    sizeDesktop: ${e.sizeDesktop},
    sizeMobile: ${e.sizeMobile},
    lineHeightDesktop: ${e.lineHeightDesktop},
    lineHeightMobile: ${e.lineHeightMobile},
    letterSpacing: "${e.letterSpacing}",
    fontWeightRole: "${e.fontWeightRole}",
  }`;
  }).join(",\n");

  return `export const typeScaleConfig: TypeScaleConfig = {\n${entries},\n};`;
}

// ─── Category config ─────────────────────────────────────────────────────────

const CATEGORIES = [
  { id: "all", label: "All" },
  { id: "local", label: "Uploaded" },
  { id: "sans-serif", label: "Sans-serif" },
  { id: "serif", label: "Serif" },
  { id: "monospace", label: "Mono" },
  { id: "display", label: "Display" },
  { id: "handwriting", label: "Handwriting" },
] as const;

const FONT_LIST_PAGE_SIZE = 200;

type CategoryId = (typeof CATEGORIES)[number]["id"];

const SLOT_DEFAULT_CATEGORY: Record<SlotName, CategoryId> = {
  primary: "sans-serif",
  secondary: "serif",
  mono: "monospace",
};

function pickPreviewWeight(weights: number[]): number {
  if (!weights.length) return 400;
  if (weights.includes(400)) return 400;
  return weights.reduce((best, w) => (Math.abs(w - 400) < Math.abs(best - 400) ? w : best));
}

function bunnyCatalogFaceSummary(meta: BunnyFontMeta): {
  faces: number;
  uniqueWeightCount: number;
  detail: string;
} | null {
  const uniqueW = [...new Set(meta.weights)].sort((a, b) => a - b);
  const uw = uniqueW.length;
  const hasNormal = meta.styles.includes("normal");
  const hasItalic = meta.styles.includes("italic");
  let styleCount = 0;
  if (hasNormal) styleCount++;
  if (hasItalic) styleCount++;
  if (styleCount === 0) styleCount = Math.max(1, meta.styles.length);

  if (uw === 0) {
    if (meta.variable === true) {
      return {
        faces: styleCount,
        uniqueWeightCount: 0,
        detail: `Variable font; weight list not listed — ${styleCount} style ${styleCount === 1 ? "entry" : "entries"}.`,
      };
    }
    return null;
  }

  const faces = uw * styleCount;
  const styleLabel = hasNormal && hasItalic ? "normal & italic" : hasItalic ? "italic" : "normal";
  return {
    faces,
    uniqueWeightCount: uw,
    detail: `${faces} variants (${uw} weights × ${styleLabel}). Weights: ${uniqueW.join(", ")}.`,
  };
}

// ─── FontDropdownItem (lazy-load preview CSS when row scrolls into view) ─────

function FontDropdownItem({
  slug,
  meta,
  sampleLine,
  scrollRoot,
  onSelect,

  devLocalFace,
}: {
  slug: string;
  meta: BunnyFontMeta;
  sampleLine: string;

  scrollRoot: HTMLUListElement | null;
  onSelect: () => void;
  devLocalFace?: {
    cssFamily: string;
    weights: number[];
    variable?: boolean;
    fileCount?: number;
  };
}) {
  const rowRef = useRef<HTMLButtonElement>(null);
  const [shouldLoad, setShouldLoad] = useState(false);
  const isDevLocal = Boolean(devLocalFace);
  const previewWeight = pickPreviewWeight(isDevLocal ? devLocalFace!.weights : meta.weights);

  useEffect(() => {
    if (isDevLocal) return;
    const el = rowRef.current;
    if (!el || !scrollRoot || shouldLoad) return;

    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          setShouldLoad(true);
          obs.disconnect();
        }
      },
      { root: scrollRoot, rootMargin: "120px 0px", threshold: 0.01 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [isDevLocal, scrollRoot, shouldLoad]);

  useEffect(() => {
    if (isDevLocal || !shouldLoad) return;
    const url = `https://fonts.bunny.net/css2?family=${slug}:wght@${previewWeight}&display=swap`;
    injectFontLink(url);
  }, [isDevLocal, shouldLoad, slug, previewWeight]);

  const loadedFamily = isDevLocal
    ? `'${devLocalFace!.cssFamily}', sans-serif`
    : shouldLoad
      ? `'${meta.name}', sans-serif`
      : "inherit";

  const faceBadge = (() => {
    if (isDevLocal && devLocalFace) {
      const fc = devLocalFace.fileCount ?? 0;
      const distinctW = new Set(devLocalFace.weights).size;
      const primary = fc > 0 ? `${fc} file${fc === 1 ? "" : "s"}` : `${distinctW}w`;
      const detail =
        fc > 0
          ? `${fc} uploaded file${fc === 1 ? "" : "s"} · ${distinctW} weight value${distinctW === 1 ? "" : "s"} guessed from file names.`
          : "Your uploaded files";
      return { primary, detail };
    }
    const s = bunnyCatalogFaceSummary(meta);
    if (!s) {
      return { primary: "—", detail: "No weight info for this family" };
    }
    return {
      primary: `${s.faces} face${s.faces === 1 ? "" : "s"}`,
      detail: s.detail,
    };
  })();

  return (
    <button
      ref={rowRef}
      type="button"
      className="group w-full px-3 py-2 text-left hover:bg-muted flex gap-3 items-start"
      onMouseDown={onSelect}
    >
      <div className="min-w-0 flex-1 space-y-1">
        <span
          className="block text-base text-foreground leading-tight"
          style={wghtPreviewStyle(
            loadedFamily,
            previewWeight,
            Boolean(isDevLocal ? devLocalFace?.variable : meta.variable)
          )}
        >
          {meta.name}
        </span>
        <span
          className="block text-[13px] text-muted-foreground leading-snug line-clamp-2"
          style={wghtPreviewStyle(
            loadedFamily,
            previewWeight,
            Boolean(isDevLocal ? devLocalFace?.variable : meta.variable)
          )}
        >
          {sampleLine}
        </span>
      </div>
      <span
        className="shrink-0 font-mono text-[10px] text-muted-foreground pt-0.5 text-right max-w-[6.25rem] leading-tight"
        title={faceBadge.detail}
      >
        <span className="block">
          {(isDevLocal ? devLocalFace?.variable : meta.variable) && (
            <span className="mr-1 opacity-90" title="Variable font">
              Var
            </span>
          )}
          <span>{faceBadge.primary}</span>
        </span>
        {isDevLocal && <span className="block text-[9px] opacity-75">yours</span>}
      </span>
    </button>
  );
}

// ─── FontPicker ───────────────────────────────────────────────────────────────

function FontPicker({
  slot,
  value,
  fontList,
  previewMode,
  localLibrary,
  onSelectCatalog,
  onSelectLocal,
  previewSampleText,
}: {
  slot: SlotName;
  value: string;
  fontList: Record<string, BunnyFontMeta>;
  previewMode: SlotPreviewMode;
  localLibrary?: LocalPreviewRuntime;
  onSelectCatalog: (family: string) => void;
  onSelectLocal: () => void;
  previewSampleText: string;
}) {
  const [search, setSearch] = useState("");
  const [open, setOpen] = useState(false);
  const [category, setCategory] = useState<CategoryId>(SLOT_DEFAULT_CATEGORY[slot]);
  const ref = useRef<HTMLDivElement>(null);
  const listUlRef = useRef<HTMLUListElement | null>(null);
  const [listScrollRoot, setListScrollRoot] = useState<HTMLUListElement | null>(null);
  const setListUlRef = useCallback((el: HTMLUListElement | null) => {
    listUlRef.current = el;
    setListScrollRoot(el);
  }, []);
  const [displayCount, setDisplayCount] = useState(FONT_LIST_PAGE_SIZE);
  const listScrollTopRef = useRef(0);
  const listDisplayCountRef = useRef(FONT_LIST_PAGE_SIZE);
  const listLoadSentinelRef = useRef<HTMLLIElement | null>(null);
  const visibleLengthRef = useRef(0);

  useEffect(() => {
    listDisplayCountRef.current = displayCount;
  }, [displayCount]);

  const localNames = localLibrary?.files.map((f) => f.fileName) ?? [];
  const localDisplayName = localNames.length > 0 ? deriveLocalDisplayFamily(localNames) : "Local";

  const localSyntheticEntry: [string, BunnyFontMeta] | null = (() => {
    if (!localLibrary?.files.length) return null;
    const wSet = new Set(
      localLibrary.files.map((f) => inferWeightStyleFromFileName(f.fileName).weight)
    );
    const weights = [...wSet].sort((a, b) => a - b);
    const styles = ["normal", "italic"] as string[];
    return [
      "__local__",
      {
        name: localDisplayName,
        weights,
        styles,
        variable: false,
        category: "local",
      },
    ];
  })();

  // Valid entries only
  const allEntries = Object.entries(fontList).filter(
    ([, meta]) => meta && typeof meta.name === "string" && meta.name.length > 0
  );

  let categoryFiltered: [string, BunnyFontMeta][];
  if (category === "local") {
    categoryFiltered = localSyntheticEntry ? [localSyntheticEntry] : [];
  } else if (category === "all") {
    categoryFiltered = allEntries;
  } else {
    categoryFiltered = allEntries.filter(([, meta]) => meta.category === category);
  }

  const visible =
    search.length >= 1
      ? categoryFiltered.filter(([, meta]) =>
          meta.name.toLowerCase().includes(search.toLowerCase())
        )
      : categoryFiltered;

  const shown = visible.slice(0, displayCount);
  const hasMore = visible.length > displayCount;

  useLayoutEffect(() => {
    visibleLengthRef.current = visible.length;
  }, [visible.length]);

  useLayoutEffect(() => {
    const ul = listUlRef.current;
    if (!open || !ul) return;
    ul.scrollTop = listScrollTopRef.current;
  }, [open, listScrollRoot, category, search]);

  useEffect(() => {
    if (!open || !hasMore) return;
    const root = listUlRef.current;
    const target = listLoadSentinelRef.current;
    if (!root || !target) return;

    const obs = new IntersectionObserver(
      (entries) => {
        if (!entries[0]?.isIntersecting) return;
        setDisplayCount((c) => {
          const cap = visibleLengthRef.current;
          if (c >= cap) return c;
          const next = Math.min(c + FONT_LIST_PAGE_SIZE, cap);
          listDisplayCountRef.current = next;
          return next;
        });
      },
      { root, rootMargin: "0px 0px 120px 0px", threshold: 0 }
    );
    obs.observe(target);
    return () => obs.disconnect();
  }, [open, hasMore, displayCount, listScrollRoot]);

  useEffect(() => {
    function onClickOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener("mousedown", onClickOutside);
    return () => document.removeEventListener("mousedown", onClickOutside);
  }, []);

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        className="w-full rounded border border-border bg-background px-3 py-1.5 text-left text-sm font-mono text-foreground hover:bg-muted/50 focus:outline-none focus:ring-1 focus:ring-ring flex items-center justify-between gap-2"
        onClick={() => {
          let nextOpen = false;
          setOpen((o) => {
            nextOpen = !o;
            return nextOpen;
          });
          if (nextOpen) {
            setDisplayCount(listDisplayCountRef.current);
            if (previewMode === "local" && localLibrary && localLibrary.files.length > 0) {
              setCategory("local");
            }
          }
        }}
      >
        <span>{value}</span>
        <span className="text-muted-foreground text-[10px]">▾</span>
      </button>

      {open && (
        <div className="absolute z-50 mt-1 w-full rounded border border-border bg-background shadow-xl">
          <div className="flex gap-0 border-b border-border overflow-x-auto">
            {CATEGORIES.map((cat) => (
              <button
                key={cat.id}
                type="button"
                onMouseDown={(e) => {
                  e.preventDefault();
                  setCategory(cat.id);
                  setDisplayCount(FONT_LIST_PAGE_SIZE);
                  listDisplayCountRef.current = FONT_LIST_PAGE_SIZE;
                  listScrollTopRef.current = 0;
                }}
                className={`shrink-0 px-2.5 py-1.5 text-[11px] font-mono whitespace-nowrap transition-colors ${
                  category === cat.id
                    ? "bg-foreground text-background"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          <div className="border-b border-border px-2 py-1.5">
            <input
              autoFocus
              className="w-full bg-transparent text-sm font-mono text-foreground placeholder:text-muted-foreground focus:outline-none"
              placeholder="Search…"
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setDisplayCount(FONT_LIST_PAGE_SIZE);
                listDisplayCountRef.current = FONT_LIST_PAGE_SIZE;
                listScrollTopRef.current = 0;
              }}
            />
          </div>

          <ul
            ref={setListUlRef}
            onScroll={(e) => {
              listScrollTopRef.current = e.currentTarget.scrollTop;
            }}
            className="max-h-72 overflow-y-auto overflow-x-hidden"
          >
            {shown.map(([slug, meta]) => (
              <li key={slug} className="border-b border-border/40 last:border-0">
                <FontDropdownItem
                  slug={slug}
                  meta={meta}
                  sampleLine={previewSampleText}
                  scrollRoot={listScrollRoot}
                  devLocalFace={
                    slug === "__local__"
                      ? {
                          cssFamily: previewCssFamily(slot),
                          weights: meta.weights,
                          variable: false,
                          fileCount: localLibrary?.files.length ?? 0,
                        }
                      : undefined
                  }
                  onSelect={() => {
                    if (slug === "__local__") onSelectLocal();
                    else onSelectCatalog(meta.name);
                    setOpen(false);
                    setSearch("");
                    listScrollTopRef.current = 0;
                    listDisplayCountRef.current = FONT_LIST_PAGE_SIZE;
                    setDisplayCount(FONT_LIST_PAGE_SIZE);
                  }}
                />
              </li>
            ))}
            {hasMore && (
              <li
                ref={listLoadSentinelRef}
                className="h-px w-full shrink-0 overflow-hidden border-0 p-0 pointer-events-none list-none"
                aria-hidden
              />
            )}
            {visible.length === 0 && (
              <li className="px-3 py-3 text-[11px] text-muted-foreground font-mono">
                {category === "local"
                  ? "No files yet — upload under Your files below."
                  : "No fonts match your search"}
              </li>
            )}
          </ul>
        </div>
      )}
    </div>
  );
}

// ─── WeightRow ────────────────────────────────────────────────────────────────

function VariableWeightInput({
  weight,
  wghtMin,
  wghtMax,
  catalogSnapSteps,
  onCommit,
  className,
}: {
  weight: number;
  wghtMin: number;
  wghtMax: number;

  catalogSnapSteps: number[] | null;
  onCommit: (n: number) => void;
  className: string;
}) {
  const [text, setText] = useState(String(weight));

  function commitFromText(raw: string): void {
    const t = raw.trim();
    if (t === "") {
      setText(String(weight));
      return;
    }
    const n = Number(t);
    if (!Number.isFinite(n)) {
      setText(String(weight));
      return;
    }
    let v = clampWght(n, wghtMin, wghtMax);
    if (catalogSnapSteps && catalogSnapSteps.length >= 2) {
      v = snapWghtToCatalogSteps(v, catalogSnapSteps);
    }
    onCommit(v);
    setText(String(v));
  }

  const snapHint =
    catalogSnapSteps && catalogSnapSteps.length >= 2
      ? ` This family only ships these weights: ${catalogSnapSteps.join(", ")}. Numbers in between round to the closest (e.g. 150 → 200).`
      : "";

  return (
    <input
      type="text"
      inputMode="numeric"
      autoComplete="off"
      title={`Weight range: ${wghtMin}–${wghtMax}.${snapHint} Tab or Enter to apply.`}
      value={text}
      onFocus={() => {
        setText(String(weight));
      }}
      onBlur={() => {
        commitFromText(text);
      }}
      onKeyDown={(e) => {
        if (e.key === "Enter") (e.target as HTMLInputElement).blur();
      }}
      onChange={(e) => {
        const v = e.target.value;
        if (v === "" || /^\d+$/.test(v)) setText(v);
      }}
      className={className}
    />
  );
}

function localFileOptionLabel(f: LocalPreviewFileRuntime): string {
  return `${f.fileName}  ·  ${f.fontWeight} ${f.fontStyle}`;
}

function WeightRow({
  name,
  value,
  allWeights,
  family,
  italic,
  sampleText,
  weightPicker,
  catalogVariableSnapSteps,
  localRoleFileName,
  onLocalRoleFileChange,
  onRoleToggle,
  onChange,
}: {
  name: keyof FontWeightMap;
  value: number | undefined;
  allWeights: FontWeightMap;
  family: string;
  italic: boolean;
  sampleText: string;
  weightPicker: WeightPickerMode;
  catalogVariableSnapSteps: number[] | null;
  localRoleFileName?: string;
  onLocalRoleFileChange?: (fileName: string) => void;
  onRoleToggle?: (enabled: boolean) => void;
  onChange: (v: number | undefined) => void;
}) {
  const defined = value !== undefined;
  const defaultOnCheck =
    weightPicker.kind === "variable"
      ? defaultWeightForSemanticSlot(name, weightPicker)
      : weightPicker.kind === "localFiles"
        ? defaultWeightForSemanticSlot(name, weightPicker)
        : firstUnusedStaticMaster(
            weightPicker.options,
            usedStaticMastersExcept(allWeights, name),
            SEMANTIC_IDEAL_WEIGHT[name]
          );

  const rowVariableFace = weightPicker.kind === "variable";
  const previewWeight = weightPicker.kind === "localFiles" ? 400 : (value ?? 400);

  return (
    <div className="flex items-center gap-3 py-1.5 border-b border-border/40 last:border-0 flex-wrap">
      <label className="w-16 shrink-0 font-mono text-[11px] text-muted-foreground">{name}</label>
      <input
        type="checkbox"
        checked={defined}
        onChange={(e) =>
          onRoleToggle
            ? onRoleToggle(e.target.checked)
            : onChange(e.target.checked ? defaultOnCheck : undefined)
        }
        className="shrink-0"
      />
      {defined && weightPicker.kind === "localFiles" && onLocalRoleFileChange && (
        <select
          value={localRoleFileName ?? weightPicker.files[0]!.fileName}
          onChange={(e) => onLocalRoleFileChange(e.target.value)}
          title="Which file this row uses. The number is the weight (100–900)."
          className="min-w-0 max-w-[min(100%,14rem)] shrink rounded border border-border bg-background px-2 py-0.5 text-[11px] font-mono text-foreground focus:outline-none focus:ring-1 focus:ring-ring"
        >
          {weightPicker.files.map((f) => (
            <option key={f.fileName} value={f.fileName}>
              {localFileOptionLabel(f)}
            </option>
          ))}
        </select>
      )}
      {defined && weightPicker.kind === "variable" && value !== undefined && (
        <VariableWeightInput
          key={`${weightPicker.wghtMin}-${weightPicker.wghtMax}-${value}`}
          weight={value}
          wghtMin={weightPicker.wghtMin}
          wghtMax={weightPicker.wghtMax}
          catalogSnapSteps={catalogVariableSnapSteps}
          onCommit={(n) => onChange(n)}
          className="w-[4.5rem] rounded border border-border bg-background px-2 py-0.5 text-sm font-mono text-foreground focus:outline-none focus:ring-1 focus:ring-ring"
        />
      )}
      {defined && weightPicker.kind === "static" && value !== undefined && (
        <select
          value={value}
          onChange={(e) => onChange(Number(e.target.value))}
          title="Pick a weight from this family. You can use the same weight on more than one row."
          className="min-w-[8.5rem] max-w-[14rem] rounded border border-border bg-background px-2 py-0.5 text-sm font-mono text-foreground focus:outline-none focus:ring-1 focus:ring-ring"
        >
          {weightPicker.options.map((w) => (
            <option key={w} value={w}>
              {staticSelectOptionLabel(w, name, allWeights)}
            </option>
          ))}
        </select>
      )}
      {defined && weightPicker.kind === "localFiles" && value !== undefined && (
        <VariableWeightInput
          weight={value}
          wghtMin={100}
          wghtMax={900}
          catalogSnapSteps={null}
          onCommit={(n) => onChange(n)}
          className="w-[4.5rem] rounded border border-border bg-background px-2 py-0.5 text-sm font-mono text-foreground focus:outline-none focus:ring-1 focus:ring-ring"
        />
      )}
      {defined && (
        <p
          className="flex-1 min-w-0 truncate text-foreground text-sm"
          style={{
            ...wghtPreviewStyle(`'${family}', sans-serif`, previewWeight, rowVariableFace),
          }}
        >
          {sampleText}
        </p>
      )}
      {defined && italic && (
        <p
          className="hidden md:block flex-1 min-w-0 truncate text-muted-foreground text-sm italic"
          style={{
            ...wghtPreviewStyle(`'${family}', sans-serif`, previewWeight, rowVariableFace),
            fontStyle: "italic",
          }}
        >
          {sampleText}
        </p>
      )}
    </div>
  );
}

// ─── SlotPanel ────────────────────────────────────────────────────────────────

function SlotPanel({
  slot,
  state,
  fontList,
  onUpdate,
  previewFamily,
  previewMode,
  localLibrary,
  onPreviewCatalog,
  onPreviewLocal,
  onLocalUploadFiles,
  onClearLocal,
  previewSampleText,
}: {
  slot: SlotName;
  state: SlotState;
  fontList: Record<string, BunnyFontMeta>;
  onUpdate: (s: SlotState) => void;

  previewFamily: string;
  previewMode: SlotPreviewMode;
  localLibrary?: LocalPreviewRuntime;
  onPreviewCatalog: (family: string) => void;
  onPreviewLocal: () => void;

  onLocalUploadFiles: (files: File[]) => void;
  onClearLocal: () => void;
  previewSampleText: string;
}) {
  const fileRef = useRef<HTMLInputElement>(null);
  const skipBunny = previewMode === "local" && (localLibrary?.files.length ?? 0) > 0;

  const bunnyMeta = fontList[slugify(state.family)];
  const catalogVariableSnapSteps = catalogVariableSnapStepsFromMeta(previewMode, bunnyMeta);
  const weightPicker = resolveWeightPickerMode(previewMode, bunnyMeta, localLibrary);
  const weightPickerKey =
    weightPicker.kind === "static"
      ? `s:${weightPicker.options.join(",")}`
      : weightPicker.kind === "localFiles"
        ? `lf:${weightPicker.files
            .map((f) => f.fileName)
            .sort()
            .join("\0")}`
        : `v:${weightPicker.wghtMin}-${weightPicker.wghtMax}`;
  const variableWghtMin = weightPicker.kind === "variable" ? weightPicker.wghtMin : null;
  const variableWghtMax = weightPicker.kind === "variable" ? weightPicker.wghtMax : null;

  useEffect(() => {
    if (skipBunny) return;
    const url = buildBunnyFontUrl(state.family, state.weights, state.italic, {
      variableWghtRange:
        variableWghtMin !== null && variableWghtMax !== null
          ? { min: variableWghtMin, max: variableWghtMax }
          : undefined,
    });
    injectFontLink(url);
  }, [
    skipBunny,
    state.family,
    state.weights,
    state.italic,
    weightPickerKey,
    weightPicker.kind,
    variableWghtMin,
    variableWghtMax,
  ]);
  const fontClampKey = [
    previewMode,
    state.family,
    weightPicker.kind === "static"
      ? weightPicker.options.join(",")
      : weightPicker.kind === "localFiles"
        ? `lf:${weightPicker.files
            .map((f) => f.fileName)
            .sort()
            .join(",")}`
        : `var:${weightPicker.wghtMin}-${weightPicker.wghtMax}`,
    localLibrary?.files
      .map((f) => f.fileName)
      .sort()
      .join("\0") ?? "",
  ].join("|");

  const stateRef = useRef(state);
  const onUpdateRef = useRef(onUpdate);
  useLayoutEffect(() => {
    stateRef.current = state;
    onUpdateRef.current = onUpdate;
  }, [state, onUpdate]);

  // Only when the face changes — not on every parent re-render (localLibrary identity).
  useEffect(() => {
    const mode = resolveWeightPickerMode(previewMode, bunnyMeta, localLibrary);
    const cur = stateRef.current;
    const nextWeights = { ...cur.weights };
    let changed = false;

    if (mode.kind === "localFiles") {
      const names = new Set(mode.files.map((f) => f.fileName));
      const nextRoleFiles = { ...cur.localRoleFiles };
      for (const name of WEIGHT_NAMES) {
        const v = nextWeights[name];
        if (v !== undefined) {
          const c = clampWght(v, 100, 900);
          if (c !== v) {
            nextWeights[name] = c;
            changed = true;
          }
        }
        const fn = nextRoleFiles[name];
        if (fn !== undefined && !names.has(fn)) {
          const fb = mode.files[WEIGHT_NAMES.indexOf(name) % mode.files.length]!.fileName;
          nextRoleFiles[name] = fb;
          changed = true;
        }
      }
      if (changed) {
        onUpdateRef.current({ ...cur, weights: nextWeights, localRoleFiles: nextRoleFiles });
        return;
      }
    } else if (mode.kind === "static" && mode.options.length > 0) {
      const allowed = new Set(mode.options);
      for (const name of WEIGHT_NAMES) {
        const v = nextWeights[name];
        if (v !== undefined && !allowed.has(v)) {
          nextWeights[name] = undefined;
          changed = true;
        }
      }
    } else if (mode.kind === "variable") {
      const vSnap = catalogVariableSnapStepsFromMeta(previewMode, bunnyMeta);
      for (const name of WEIGHT_NAMES) {
        const v = nextWeights[name];
        if (v === undefined) continue;
        let c = clampWght(v, mode.wghtMin, mode.wghtMax);
        if (vSnap && vSnap.length >= 2) {
          c = snapWghtToCatalogSteps(c, vSnap);
        }
        if (c !== v) {
          nextWeights[name] = c;
          changed = true;
        }
      }
    }

    if (changed) onUpdateRef.current({ ...cur, weights: nextWeights });
    // fontClampKey encodes previewMode, family, static option set, and upload filenames.
  }, [fontClampKey]); // eslint-disable-line react-hooks/exhaustive-deps -- see fontClampKey above

  function updateSemanticWeight(name: keyof FontWeightMap, v: number | undefined) {
    if (v === undefined) {
      const lr = { ...state.localRoleFiles };
      delete lr[name];
      onUpdate({ ...state, weights: { ...state.weights, [name]: undefined }, localRoleFiles: lr });
      return;
    }
    if (weightPicker.kind === "variable") {
      let c = clampWght(v, weightPicker.wghtMin, weightPicker.wghtMax);
      if (catalogVariableSnapSteps && catalogVariableSnapSteps.length >= 2) {
        c = snapWghtToCatalogSteps(c, catalogVariableSnapSteps);
      }
      onUpdate({ ...state, weights: { ...state.weights, [name]: c } });
      return;
    }
    onUpdate({ ...state, weights: { ...state.weights, [name]: v } });
  }

  function setLocalRoleFile(name: keyof FontWeightMap, fileName: string) {
    if (!localLibrary?.files.length || weightPicker.kind !== "localFiles") return;
    const f = localLibrary.files.find((x) => x.fileName === fileName);
    const inferred = f?.fontWeight ?? 400;
    onUpdate({
      ...state,
      localRoleFiles: { ...state.localRoleFiles, [name]: fileName },
      weights: { ...state.weights, [name]: inferred },
    });
  }

  function toggleLocalRole(name: keyof FontWeightMap, enabled: boolean) {
    if (!enabled) {
      updateSemanticWeight(name, undefined);
      return;
    }
    if (!localLibrary?.files.length || weightPicker.kind !== "localFiles") return;
    const idx = WEIGHT_NAMES.indexOf(name);
    const f = localLibrary.files[idx % localLibrary.files.length]!;
    onUpdate({
      ...state,
      weights: { ...state.weights, [name]: f.fontWeight },
      localRoleFiles: { ...state.localRoleFiles, [name]: f.fileName },
    });
  }

  return (
    <div className="rounded-lg border border-border bg-card/20 p-5 space-y-4">
      <div className="flex items-center gap-3 flex-wrap">
        <span className="font-mono text-[11px] text-muted-foreground uppercase tracking-wide w-20 shrink-0">
          {SLOT_UI_LABEL[slot]}
        </span>
        <div className="flex-1 min-w-[200px]">
          <FontPicker
            slot={slot}
            value={state.family}
            fontList={fontList}
            previewMode={previewMode}
            localLibrary={localLibrary}
            onSelectCatalog={(family) => onPreviewCatalog(family)}
            onSelectLocal={() => onPreviewLocal()}
            previewSampleText={previewSampleText}
          />
        </div>
        <label className="flex items-center gap-1.5 text-muted-foreground font-mono text-[11px] cursor-pointer">
          <input
            type="checkbox"
            checked={state.italic}
            onChange={(e) => onUpdate({ ...state, italic: e.target.checked })}
          />
          italic
        </label>
        {bunnyMeta && previewMode === "catalog" && (
          <span className="font-mono text-[10px] text-muted-foreground border border-border rounded px-1.5 py-0.5">
            {bunnyMeta.variable
              ? `Variable · ${variableAxisFromMeta(bunnyMeta).wghtMin}–${variableAxisFromMeta(bunnyMeta).wghtMax}`
              : "Static"}
          </span>
        )}
      </div>

      <div className="rounded border border-border/60 bg-muted/15 px-3 py-2 space-y-1.5">
        <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
          <span className="font-mono text-[10px] text-muted-foreground uppercase tracking-wide shrink-0">
            Your files
          </span>
          <input
            ref={fileRef}
            type="file"
            multiple
            accept=".woff2,.woff,.ttf,.otf,font/woff2,font/woff,application/font-woff"
            className="sr-only"
            onChange={(e) => {
              const list = e.target.files ? Array.from(e.target.files) : [];
              e.target.value = "";
              if (!list.length) return;
              onLocalUploadFiles(list);
            }}
          />
          <button
            type="button"
            className="rounded border border-border px-2 py-1 text-[11px] font-mono text-foreground hover:bg-muted/60"
            onClick={() => fileRef.current?.click()}
          >
            Upload files…
          </button>
          {localLibrary && localLibrary.files.length > 0 ? (
            <>
              <span
                className="text-[11px] font-mono text-muted-foreground truncate max-w-[min(100%,18rem)]"
                title={localLibrary.files.map((f) => f.fileName).join(", ")}
              >
                {localLibrary.files.length} file{localLibrary.files.length === 1 ? "" : "s"}
                {localLibrary.files.length > 0
                  ? ` · ${localLibrary.files
                      .slice(0, 2)
                      .map((f) => f.fileName)
                      .join(", ")}${localLibrary.files.length > 2 ? "…" : ""}`
                  : ""}
              </span>
              <button
                type="button"
                className="text-[11px] font-mono text-foreground underline-offset-2 hover:underline"
                onClick={onClearLocal}
              >
                Clear all
              </button>
            </>
          ) : (
            <span className="text-[11px] text-muted-foreground">
              Select one or many files · preview stays in this browser only
            </span>
          )}
        </div>
        <p className="text-[10px] text-muted-foreground leading-snug">
          Weights are guessed from file names (e.g. Bold, 700). Fix any row in the list below if a
          file sits on the wrong line.
        </p>
      </div>

      <div className="space-y-2.5 py-3 border-y border-border/40">
        {WEIGHT_NAMES.some((n) => state.weights[n] !== undefined) ? (
          WEIGHT_NAMES.map((name) => {
            const w = state.weights[name];
            if (w === undefined) return null;
            return (
              <div
                key={name}
                className="flex flex-col gap-0.5 sm:flex-row sm:items-baseline sm:gap-4 min-w-0"
              >
                <span className="font-mono text-[10px] text-muted-foreground uppercase tracking-wide w-14 shrink-0 pt-0.5">
                  {name}
                </span>
                <p
                  className="text-lg md:text-2xl leading-snug text-foreground min-w-0 flex-1 break-words"
                  style={wghtPreviewStyle(
                    `'${
                      weightPicker.kind === "localFiles"
                        ? localRolePreviewFamily(slot, name)
                        : previewFamily
                    }', sans-serif`,
                    weightPicker.kind === "localFiles" ? 400 : w,
                    weightPicker.kind === "variable"
                  )}
                >
                  {previewSampleText}
                </p>
              </div>
            );
          })
        ) : (
          <p className="text-sm text-muted-foreground py-1">
            Turn on weights below — each line shows that weight in the sample.
          </p>
        )}
      </div>

      <div>
        <p className="font-mono text-[11px] text-muted-foreground mb-1 uppercase tracking-wide">
          Weights
        </p>
        <p className="text-[10px] text-muted-foreground mb-2 leading-snug">
          {weightPicker.kind === "localFiles"
            ? `${weightPicker.files.length} file${weightPicker.files.length === 1 ? "" : "s"}: choose which file each row uses. The number is the weight (100–900). Italic adds a second sample in faux italic if you don’t have an italic file.`
            : weightPicker.kind === "variable"
              ? catalogVariableSnapSteps
                ? `This family loads separate files at: ${catalogVariableSnapSteps.join(", ")}. Typing a value in between rounds to the nearest so the preview matches what really loads (e.g. 150 → 200).`
                : `Variable weight range about ${weightPicker.wghtMin}–${weightPicker.wghtMax}. Enter a whole number in that range.`
              : `${weightPicker.options.length} weights available: ${weightPicker.options.join(", ")}. Turn on the rows you need; you can use the same weight on more than one row.`}
        </p>
        {WEIGHT_NAMES.map((name) => (
          <WeightRow
            key={name}
            name={name}
            value={state.weights[name]}
            allWeights={state.weights}
            family={
              weightPicker.kind === "localFiles"
                ? localRolePreviewFamily(slot, name)
                : previewFamily
            }
            italic={state.italic}
            sampleText={previewSampleText}
            weightPicker={weightPicker}
            catalogVariableSnapSteps={catalogVariableSnapSteps}
            localRoleFileName={state.localRoleFiles?.[name]}
            onLocalRoleFileChange={
              weightPicker.kind === "localFiles" ? (fn) => setLocalRoleFile(name, fn) : undefined
            }
            onRoleToggle={
              weightPicker.kind === "localFiles" ? (en) => toggleLocalRole(name, en) : undefined
            }
            onChange={(v) => updateSemanticWeight(name, v)}
          />
        ))}
      </div>
    </div>
  );
}

// ─── Type scale preview (which font slot drives the live samples) ─────────────

type TypeScaleFontPreviewSlot = {
  family: string;
  weights: FontWeightMap;
  variableFace: boolean;
  localRoles: { headingRole: keyof FontWeightMap; bodyRole: keyof FontWeightMap } | null;
};

function localRolesForTypeScaleSlot(
  slot: SlotName,
  effectiveSlotPreviewMode: Record<SlotName, SlotPreviewMode>,
  configs: Record<SlotName, SlotState>,
  previewActive: (s: SlotName) => boolean
): TypeScaleFontPreviewSlot["localRoles"] {
  if (effectiveSlotPreviewMode[slot] !== "local" || !previewActive(slot)) return null;
  const w = configs[slot].weights;
  return {
    headingRole:
      w.bold !== undefined
        ? "bold"
        : w.black !== undefined
          ? "black"
          : ("regular" satisfies keyof FontWeightMap),
    bodyRole:
      w.regular !== undefined
        ? ("regular" satisfies keyof FontWeightMap)
        : w.book !== undefined
          ? ("book" satisfies keyof FontWeightMap)
          : w.light !== undefined
            ? ("light" satisfies keyof FontWeightMap)
            : ("thin" satisfies keyof FontWeightMap),
  };
}

function buildTypeScaleFontPreview({
  configs,
  effectiveSlotPreviewMode,
  fontList,
  previews,
  previewActive,
  faceForSlot,
}: {
  configs: Record<SlotName, SlotState>;
  effectiveSlotPreviewMode: Record<SlotName, SlotPreviewMode>;
  fontList: Record<string, BunnyFontMeta>;
  previews: Partial<Record<SlotName, LocalPreviewRuntime>>;
  previewActive: (slot: SlotName) => boolean;
  faceForSlot: (slot: SlotName) => string;
}): Record<SlotName, TypeScaleFontPreviewSlot> {
  const out = {} as Record<SlotName, TypeScaleFontPreviewSlot>;
  for (const slot of ["primary", "secondary", "mono"] as SlotName[]) {
    out[slot] = {
      family: faceForSlot(slot),
      weights: configs[slot].weights,
      variableFace:
        resolveWeightPickerMode(
          effectiveSlotPreviewMode[slot],
          fontList[slugify(configs[slot].family)],
          previews[slot]
        ).kind === "variable",
      localRoles: localRolesForTypeScaleSlot(
        slot,
        effectiveSlotPreviewMode,
        configs,
        previewActive
      ),
    };
  }
  return out;
}

// ─── TypeScalePanel ───────────────────────────────────────────────────────────

function ScaleField({
  label,
  value,
  isString,
  onChange,
}: {
  label: string;
  value: number | string;
  isString?: boolean;
  onChange: (v: number | string) => void;
}) {
  return (
    <div className="flex flex-col gap-0.5">
      <span className="font-mono text-[10px] text-muted-foreground">{label}</span>
      {isString ? (
        <input
          type="text"
          value={String(value)}
          onChange={(e) => onChange(e.target.value)}
          className="w-20 rounded border border-border bg-background px-2 py-0.5 text-[11px] font-mono text-foreground focus:outline-none focus:ring-1 focus:ring-ring"
        />
      ) : (
        <input
          type="number"
          min={1}
          value={Number(value)}
          onChange={(e) => onChange(Number(e.target.value))}
          className="w-16 rounded border border-border bg-background px-2 py-0.5 text-[11px] font-mono text-foreground focus:outline-none focus:ring-1 focus:ring-ring"
        />
      )}
    </div>
  );
}

type TypeScalePreviewBreakpoint = "desktop" | "mobile";

function TypeScalePanel({
  scale,
  fontPreviewBySlot,
  onUpdate,
  bodySampleText,
}: {
  scale: TypeScaleConfig;
  fontPreviewBySlot: Record<SlotName, TypeScaleFontPreviewSlot>;
  onUpdate: (s: TypeScaleConfig) => void;
  bodySampleText: string;
}) {
  const [previewBreakpoint, setPreviewBreakpoint] = useState<TypeScalePreviewBreakpoint>("desktop");
  const [previewFontSlot, setPreviewFontSlot] = useState<SlotName>("primary");
  const fp = fontPreviewBySlot[previewFontSlot];

  const updateEntry = (key: keyof TypeScaleConfig, patch: Partial<TypeScaleEntry>) => {
    onUpdate({ ...scale, [key]: { ...scale[key], ...patch } });
  };

  return (
    <div className="rounded-lg border border-border bg-card/20 p-5 space-y-4">
      <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
        <p className="font-mono text-[11px] text-muted-foreground uppercase tracking-wide shrink-0 pt-0.5">
          Type Scale
        </p>
        <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center sm:justify-end">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="font-mono text-[10px] text-muted-foreground uppercase tracking-wide">
              Font
            </span>
            <div className="flex gap-1 flex-wrap">
              {(["primary", "secondary", "mono"] as SlotName[]).map((id) => (
                <button
                  key={id}
                  type="button"
                  onClick={() => setPreviewFontSlot(id)}
                  className={`px-2.5 py-1 rounded text-[11px] font-mono border transition-colors ${
                    previewFontSlot === id
                      ? "bg-foreground text-background border-transparent"
                      : "text-muted-foreground hover:text-foreground border-border"
                  }`}
                >
                  {SLOT_UI_LABEL[id]}
                </button>
              ))}
            </div>
          </div>
          <div className="flex items-center gap-2 flex-wrap">
            <span className="font-mono text-[10px] text-muted-foreground uppercase tracking-wide">
              Size
            </span>
            <div className="flex gap-1">
              {(
                [
                  { id: "desktop" as const, label: "Desktop" },
                  { id: "mobile" as const, label: "Mobile" },
                ] as const
              ).map(({ id, label }) => (
                <button
                  key={id}
                  type="button"
                  onClick={() => setPreviewBreakpoint(id)}
                  className={`px-2.5 py-1 rounded text-[11px] font-mono border transition-colors ${
                    previewBreakpoint === id
                      ? "bg-foreground text-background border-transparent"
                      : "text-muted-foreground hover:text-foreground border-border"
                  }`}
                >
                  {label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {SCALE_KEYS.map((key) => {
        const entry = scale[key];
        const isHeading = key.startsWith("heading");
        const previewFontSize =
          previewBreakpoint === "desktop" ? entry.sizeDesktop : entry.sizeMobile;
        const previewLineHeight =
          previewBreakpoint === "desktop" ? entry.lineHeightDesktop : entry.lineHeightMobile;
        const role = entry.fontWeightRole;
        const previewWeight =
          fp.weights[role] ?? fp.weights.regular ?? fp.weights.book ?? fp.weights.light ?? 400;
        const useLocalRole =
          fp.localRoles &&
          (isHeading
            ? fp.weights[fp.localRoles.headingRole]
            : fp.weights[fp.localRoles.bodyRole]) !== undefined;
        const previewFamilyCss =
          useLocalRole && fp.localRoles
            ? localRolePreviewFamily(
                previewFontSlot,
                isHeading ? fp.localRoles.headingRole : fp.localRoles.bodyRole
              )
            : fp.family;
        const previewWeightCss = useLocalRole ? 400 : previewWeight;
        const variableForPreview = fp.variableFace && !useLocalRole;

        return (
          <div
            key={key}
            className="border-b border-border/40 last:border-0 pb-4 last:pb-0 space-y-2"
          >
            <p className="font-mono text-[11px] text-muted-foreground">{TYPE_SCALE_LABELS[key]}</p>

            <div
              className="text-foreground py-1"
              style={{
                ...wghtPreviewStyle(
                  `'${previewFamilyCss}', sans-serif`,
                  previewWeightCss,
                  variableForPreview
                ),
                fontSize: `${previewFontSize}px`,
                lineHeight: `${previewLineHeight}px`,
                letterSpacing: entry.letterSpacing,
                whiteSpace: "pre-line",
              }}
            >
              {isHeading ? HEADING_SAMPLE : typeScaleTwoLineBody(bodySampleText)}
            </div>

            <div className="flex flex-wrap gap-4 items-end">
              <div className="flex flex-col gap-0.5 min-w-[7rem]">
                <span className="font-mono text-[10px] text-muted-foreground">Weight</span>
                <select
                  value={entry.fontWeightRole}
                  onChange={(e) =>
                    updateEntry(key, { fontWeightRole: e.target.value as FontWeightRole })
                  }
                  className="rounded border border-border bg-background px-2 py-1 text-[11px] font-mono text-foreground focus:outline-none focus:ring-1 focus:ring-ring"
                >
                  {FONT_WEIGHT_ROLES.map((r) => (
                    <option key={r} value={r}>
                      {r}
                    </option>
                  ))}
                </select>
              </div>
              <ScaleField
                label="size desktop (px)"
                value={entry.sizeDesktop}
                onChange={(v) => updateEntry(key, { sizeDesktop: v as number })}
              />
              <ScaleField
                label="size mobile (px)"
                value={entry.sizeMobile}
                onChange={(v) => updateEntry(key, { sizeMobile: v as number })}
              />
              <ScaleField
                label="line height (desktop)"
                value={entry.lineHeightDesktop}
                onChange={(v) => updateEntry(key, { lineHeightDesktop: v as number })}
              />
              <ScaleField
                label="line height (mobile)"
                value={entry.lineHeightMobile}
                onChange={(v) => updateEntry(key, { lineHeightMobile: v as number })}
              />
              <ScaleField
                label="letter-spacing"
                value={entry.letterSpacing}
                isString
                onChange={(v) => updateEntry(key, { letterSpacing: v as string })}
              />
            </div>
          </div>
        );
      })}
    </div>
  );
}

// ─── Snippet sidebar ──────────────────────────────────────────────────────────

type SnippetTab = "fonts" | "scale";

function SnippetPanel({
  configs,
  typeScale,
  fontList,
  slotHasLocalPreview,
}: {
  configs: Record<SlotName, SlotState>;
  typeScale: TypeScaleConfig;
  fontList: Record<string, BunnyFontMeta>;
  slotHasLocalPreview: (slot: SlotName) => boolean;
}) {
  const [active, setActive] = useState<SnippetTab>("fonts");
  const [copied, setCopied] = useState(false);

  const tabs: { id: SnippetTab; label: string }[] = [
    { id: "fonts", label: "Fonts" },
    { id: "scale", label: "Scale" },
  ];

  const snippet =
    active === "scale"
      ? generateScaleSnippet(typeScale)
      : generateAllFontsSnippet(configs, fontList, slotHasLocalPreview);

  const copy = () => {
    navigator.clipboard.writeText(snippet).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  const destFile = active === "scale" ? "src/app/fonts/type-scale.ts" : "src/app/fonts/config.ts";

  return (
    <div className="rounded-lg border border-border bg-card/20 p-4 space-y-3">
      <div className="flex items-center justify-between flex-wrap gap-2">
        <p className="font-mono text-[11px] text-muted-foreground uppercase tracking-wide">
          Code to paste
        </p>
        <div className="flex gap-1">
          {tabs.map(({ id, label }) => (
            <button
              key={id}
              type="button"
              onClick={() => setActive(id)}
              className={`px-2 py-0.5 rounded text-[11px] font-mono transition-colors ${
                active === id
                  ? "bg-foreground text-background"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      <pre className="overflow-x-auto rounded bg-muted/40 p-3 text-[11px] font-mono text-foreground leading-relaxed whitespace-pre-wrap max-h-96 overflow-y-auto">
        {snippet}
      </pre>

      <button
        type="button"
        onClick={copy}
        className="w-full rounded border border-border px-3 py-2 text-sm font-mono text-foreground hover:bg-muted transition-colors"
      >
        {copied ? "Copied!" : "Copy code"}
      </button>

      <p className="text-[10px] text-muted-foreground">
        Paste into <code className="font-mono text-[0.95em]">{destFile}</code> and save; the running
        dev server will pick it up.
      </p>
    </div>
  );
}

function compositeTextStyle(
  slot: SlotName,
  role: keyof FontWeightMap,
  configs: Record<SlotName, SlotState>,
  effectiveSlotPreviewMode: Record<SlotName, SlotPreviewMode>,
  previews: Partial<Record<SlotName, LocalPreviewRuntime>>,
  fontList: Record<string, BunnyFontMeta>,
  italicMode: "inherit" | "normal" | "italic" = "inherit"
): CSSProperties {
  const state = configs[slot];
  const mode = effectiveSlotPreviewMode[slot];
  const lib = previews[slot];
  const meta = fontList[slugify(state.family)];
  const picker = resolveWeightPickerMode(mode, meta, lib);
  const w = state.weights[role] ?? 400;
  const localActive = mode === "local" && Boolean(lib?.files.length);
  const variableFace = picker.kind === "variable" && !localActive;
  const generic = slot === "mono" ? "ui-monospace, monospace" : "sans-serif";
  const face = localActive ? localRolePreviewFamily(slot, role) : state.family;
  const fontFamilyCss = `'${face}', ${generic}`;
  const style: CSSProperties = {
    ...wghtPreviewStyle(fontFamilyCss, w, variableFace),
  };
  if (italicMode === "normal") style.fontStyle = "normal";
  else if (italicMode === "italic") style.fontStyle = "italic";
  else style.fontStyle = state.italic ? "italic" : "normal";
  return style;
}

type TrioPreviewBreakpoint = "desktop" | "mobile";

function trioHoverTitle(scaleKey: keyof TypeScaleConfig, slot?: SlotName, extra?: string): string {
  const label = TYPE_SCALE_LABELS[scaleKey];
  const cls = TYPE_SCALE_UTILITY_CLASS[scaleKey];
  let s = `${label} · ${cls}`;
  if (slot) s += ` · ${SLOT_UI_LABEL[slot]} slot`;
  if (extra) s += ` · ${extra}`;
  return s;
}

const TRIO_DEMO_DEFAULTS = {
  kicker: "bodyMd",
  headline: "headingXl",
  lead: "bodyXl",
  body: "body2xl",
  quote: "bodyXl",
  codePara: "body2xl",
} as const satisfies Record<string, keyof TypeScaleConfig>;

type TrioDemoBlockId = keyof typeof TRIO_DEMO_DEFAULTS;

function trioHeadingTagFromScaleKey(
  k: keyof TypeScaleConfig
): "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "p" {
  switch (k) {
    case "heading2xl":
      return "h1";
    case "headingXl":
      return "h2";
    case "headingLg":
      return "h3";
    case "headingMd":
      return "h4";
    case "headingSm":
      return "h5";
    case "headingXs":
      return "h6";
    default:
      return "p";
  }
}

function TrioHoverBlock({
  scaleKey,
  slot,
  extra,
  onScaleKeyChange,
  children,
}: {
  scaleKey: keyof TypeScaleConfig;
  slot?: SlotName;
  extra?: string;
  onScaleKeyChange?: (key: keyof TypeScaleConfig) => void;
  children: ReactNode;
}) {
  const selectId = useId();
  const title = trioHoverTitle(scaleKey, slot, extra);
  const label = TYPE_SCALE_LABELS[scaleKey];
  const cls = TYPE_SCALE_UTILITY_CLASS[scaleKey];
  return (
    <div
      className="group relative mb-1 cursor-help rounded-md px-0.5 py-0.5 outline-none ring-offset-background transition-shadow hover:bg-muted/20 focus-within:bg-muted/20 focus-visible:bg-muted/20 focus-visible:ring-2 focus-visible:ring-ring"
      tabIndex={0}
      title={title}
    >
      {children}
      <div
        className={`absolute left-0 right-0 top-full z-20 mx-0 mt-1 max-w-2xl rounded-md border border-border bg-card px-2.5 py-2 text-[10px] font-mono leading-snug text-muted-foreground shadow-md transition-all duration-150 ${
          onScaleKeyChange
            ? "invisible opacity-0 group-hover:visible group-hover:opacity-100 group-focus-within:visible group-focus-within:opacity-100"
            : "invisible opacity-0 group-hover:visible group-hover:opacity-100 group-focus-within:visible group-focus-within:opacity-100 pointer-events-none"
        }`}
      >
        <p className="m-0 pointer-events-none">
          <span className="font-semibold text-foreground">{label}</span>
          <span> · </span>
          <code className="text-[0.95em] text-foreground/90">{cls}</code>
          {slot ? (
            <>
              <span> · </span>
              <span>{SLOT_UI_LABEL[slot]}</span>
            </>
          ) : null}
        </p>
        {extra ? (
          <p className="m-0 mt-1 border-t border-border/60 pt-1 text-[9px] pointer-events-none">
            {extra}
          </p>
        ) : null}
        {onScaleKeyChange ? (
          <div className="mt-2 border-t border-border/60 pt-2">
            <label htmlFor={selectId} className="sr-only">
              Type scale entry for this preview block
            </label>
            <select
              id={selectId}
              value={scaleKey}
              onChange={(e) => onScaleKeyChange(e.target.value as keyof TypeScaleConfig)}
              className="w-full max-w-full rounded border border-border bg-background px-2 py-1.5 text-[11px] font-mono text-foreground focus:outline-none focus:ring-1 focus:ring-ring"
              onClick={(e) => e.stopPropagation()}
              onKeyDown={(e) => e.stopPropagation()}
            >
              {SCALE_KEYS.map((k) => (
                <option key={k} value={k}>
                  {`${TYPE_SCALE_LABELS[k]} (${TYPE_SCALE_SHORT_TAG[k]})`}
                </option>
              ))}
            </select>
          </div>
        ) : null}
      </div>
    </div>
  );
}

function trioEntryMetrics(
  entry: TypeScaleEntry,
  bp: TrioPreviewBreakpoint
): { sz: number; lh: number } {
  return bp === "desktop"
    ? { sz: entry.sizeDesktop, lh: entry.lineHeightDesktop }
    : { sz: entry.sizeMobile, lh: entry.lineHeightMobile };
}

function TrioInUnisonPreview({
  configs,
  effectiveSlotPreviewMode,
  previews,
  fontList,
  typeScale,
  bodyPhrase,
  trioResetSignal = 0,
}: {
  configs: Record<SlotName, SlotState>;
  effectiveSlotPreviewMode: Record<SlotName, SlotPreviewMode>;
  previews: Partial<Record<SlotName, LocalPreviewRuntime>>;
  fontList: Record<string, BunnyFontMeta>;
  typeScale: TypeScaleConfig;
  bodyPhrase: string;
  trioResetSignal?: number;
}) {
  const [trioBp, setTrioBp] = useState<TrioPreviewBreakpoint>("desktop");
  const [trioDemoKeys, setTrioDemoKeys] = useState<Record<TrioDemoBlockId, keyof TypeScaleConfig>>(
    () => ({ ...TRIO_DEMO_DEFAULTS })
  );
  const sec = configs.secondary;

  useEffect(() => {
    /* eslint-disable react-hooks/set-state-in-effect -- reset demo state when parent signals remount-style refresh. */
    if (trioResetSignal === 0) return;
    setTrioDemoKeys({ ...TRIO_DEMO_DEFAULTS });
    /* eslint-enable react-hooks/set-state-in-effect */
  }, [trioResetSignal]);

  const setDemoKey = useCallback((id: TrioDemoBlockId, key: keyof TypeScaleConfig) => {
    setTrioDemoKeys((p) => ({ ...p, [id]: key }));
  }, []);

  const sc = (
    slot: SlotName,
    role: keyof FontWeightMap,
    italic: "inherit" | "normal" | "italic" = "inherit"
  ) =>
    compositeTextStyle(slot, role, configs, effectiveSlotPreviewMode, previews, fontList, italic);

  const kickerEntry = typeScale[trioDemoKeys.kicker];
  const headlineEntry = typeScale[trioDemoKeys.headline];
  const leadEntry = typeScale[trioDemoKeys.lead];
  const bodyEntry = typeScale[trioDemoKeys.body];
  const quoteEntry = typeScale[trioDemoKeys.quote];
  const codeParaEntry = typeScale[trioDemoKeys.codePara];
  const legal = typeScale.bodySm;

  const kickerM = trioEntryMetrics(kickerEntry, trioBp);
  const hM = trioEntryMetrics(headlineEntry, trioBp);
  const leadM = trioEntryMetrics(leadEntry, trioBp);
  const bodyM = trioEntryMetrics(bodyEntry, trioBp);
  const quoteM = trioEntryMetrics(quoteEntry, trioBp);
  const codeParaM = trioEntryMetrics(codeParaEntry, trioBp);

  const headlineTag = trioHeadingTagFromScaleKey(trioDemoKeys.headline);

  const bodyLine =
    bodyPhrase.trim().split(/\r?\n/)[0]?.trim() || "The quick brown fox jumps over the lazy dog.";

  const previewInner = (
    <div className="w-full space-y-8 pb-24 text-foreground">
      <TrioHoverBlock
        scaleKey={trioDemoKeys.kicker}
        onScaleKeyChange={(k) => setDemoKey("kicker", k)}
        slot="secondary"
        extra="Uppercase kicker (custom letter-spacing)"
      >
        <p
          className="text-muted-foreground"
          style={{
            ...sc("secondary", kickerEntry.fontWeightRole),
            fontSize: kickerM.sz,
            lineHeight: `${kickerM.lh}px`,
            letterSpacing: "0.22em",
            textTransform: "uppercase",
          }}
        >
          Editorial · Field notes
        </p>
      </TrioHoverBlock>

      <TrioHoverBlock
        scaleKey={trioDemoKeys.headline}
        onScaleKeyChange={(k) => setDemoKey("headline", k)}
        slot="primary"
      >
        {createElement(
          headlineTag,
          {
            className: "m-0",
            style: {
              ...sc("primary", headlineEntry.fontWeightRole),
              fontSize: hM.sz,
              lineHeight: `${hM.lh}px`,
              letterSpacing: headlineEntry.letterSpacing,
            },
          },
          "This is a headline."
        )}
      </TrioHoverBlock>

      <TrioHoverBlock
        scaleKey={trioDemoKeys.lead}
        onScaleKeyChange={(k) => setDemoKey("lead", k)}
        slot="primary"
      >
        <p
          className="text-muted-foreground"
          style={{
            ...sc("primary", leadEntry.fontWeightRole),
            fontSize: leadM.sz,
            lineHeight: `${leadM.lh}px`,
            letterSpacing: leadEntry.letterSpacing,
          }}
        >
          Secondary sets the tone above; primary carries the story; mono pins the details: labels,
          tokens, and paths. Without breaking rhythm.
        </p>
      </TrioHoverBlock>

      <TrioHoverBlock
        scaleKey={trioDemoKeys.body}
        onScaleKeyChange={(k) => setDemoKey("body", k)}
        slot="primary"
      >
        <p
          style={{
            ...sc("primary", bodyEntry.fontWeightRole),
            fontSize: bodyM.sz,
            lineHeight: `${bodyM.lh}px`,
            letterSpacing: bodyEntry.letterSpacing,
          }}
        >
          {bodyLine} This paragraph stays in the primary face so you can judge texture and color at
          reading size.
        </p>
      </TrioHoverBlock>

      <TrioHoverBlock
        scaleKey={trioDemoKeys.quote}
        onScaleKeyChange={(k) => setDemoKey("quote", k)}
        slot="secondary"
        extra="Pull quote · italic secondary"
      >
        <blockquote
          className="border-l-2 border-border pl-5 text-muted-foreground m-0"
          style={{
            ...sc("secondary", quoteEntry.fontWeightRole, sec.italic ? "inherit" : "italic"),
            fontSize: quoteM.sz,
            lineHeight: `${quoteM.lh}px`,
            letterSpacing: quoteEntry.letterSpacing,
          }}
        >
          “A second voice doesn’t compete—it answers the headline in a different register.”
        </blockquote>
      </TrioHoverBlock>

      <TrioHoverBlock
        scaleKey={trioDemoKeys.codePara}
        onScaleKeyChange={(k) => setDemoKey("codePara", k)}
        slot="primary"
        extra={`Inline ${TYPE_SCALE_LABELS.bodySm} mono for code`}
      >
        <p
          style={{
            ...sc("primary", codeParaEntry.fontWeightRole),
            fontSize: codeParaM.sz,
            lineHeight: `${codeParaM.lh}px`,
            letterSpacing: codeParaEntry.letterSpacing,
          }}
        >
          Inline token{" "}
          <code
            className="rounded bg-muted/50 px-1.5 py-0.5"
            style={{
              ...sc("mono", legal.fontWeightRole, "normal"),
              fontSize: "0.88em",
            }}
          >
            --color-accent
          </code>{" "}
          and path{" "}
          <code
            className="rounded bg-muted/50 px-1.5 py-0.5"
            style={{
              ...sc("mono", legal.fontWeightRole, "normal"),
              fontSize: "0.82em",
            }}
          >
            src/app/fonts/config.ts
          </code>{" "}
          use mono so they scan as machinery, not prose.
        </p>
      </TrioHoverBlock>
    </div>
  );

  return (
    <section className="mt-12 rounded-lg border border-border bg-card/25 p-6 md:p-8">
      <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between mb-6">
        <p className="font-mono text-[10px] text-muted-foreground uppercase tracking-wide">
          All three together
        </p>
        <div className="flex items-center gap-2 flex-wrap">
          <span className="font-mono text-[10px] text-muted-foreground uppercase tracking-wide">
            Type scale
          </span>
          <div className="flex gap-1">
            {(
              [
                { id: "desktop" as const, label: "Desktop" },
                { id: "mobile" as const, label: "Mobile" },
              ] as const
            ).map(({ id, label }) => (
              <button
                key={id}
                type="button"
                onClick={() => setTrioBp(id)}
                className={`px-2.5 py-1 rounded text-[11px] font-mono border transition-colors ${
                  trioBp === id
                    ? "bg-foreground text-background border-transparent"
                    : "text-muted-foreground hover:text-foreground border-border"
                }`}
              >
                {label}
              </button>
            ))}
          </div>
        </div>
      </div>

      <p className="text-[10px] text-muted-foreground mb-4 max-w-xl leading-snug">
        Hover or focus a block to open its panel: summary, then a type-scale dropdown to try another
        entry (e.g. H2 → H1) without editing the table. This only affects this preview. Native
        tooltips repeat the summary line.
      </p>

      <div
        className={
          trioBp === "mobile"
            ? "mx-auto w-full max-w-[390px] rounded-lg border border-dashed border-border/80 bg-background/40 p-4 pt-10"
            : "w-full pt-10"
        }
      >
        {trioBp === "mobile" ? (
          <p className="font-mono text-[9px] text-muted-foreground uppercase tracking-wide mb-4">
            390px column · mobile type sizes from the scale
          </p>
        ) : null}
        {previewInner}
      </div>
    </section>
  );
}

// ─── Main component ───────────────────────────────────────────────────────────

export function FontDevClient({ fontList, initialConfigs, initialTypeScale }: Props) {
  const [configs, setConfigs] = useState<Record<SlotName, SlotState>>(initialConfigs);
  const [typeScale, setTypeScale] = useState<TypeScaleConfig>(initialTypeScale);
  const [previewSampleText, setPreviewSampleText] = useState(DEFAULT_PREVIEW_PHRASE);
  const [trioDemoResetSignal, setTrioDemoResetSignal] = useState(0);
  const [slotPreviewMode, setSlotPreviewMode] = useState<Record<SlotName, SlotPreviewMode>>({
    primary: "catalog",
    secondary: "catalog",
    mono: "catalog",
  });
  const { ready, previews, replaceSlotFiles, clearSlot, previewActive } = useLocalFontPreviews();
  const hydratedLocalIDB = useRef(false);
  const prefsLoadedRef = useRef(false);
  const [prefsHydrated, setPrefsHydrated] = useState(false);

  useLayoutEffect(() => {
    if (prefsLoadedRef.current) return;
    prefsLoadedRef.current = true;
    const restored = readFontDevPrefs(initialConfigs, initialTypeScale);
    if (restored) {
      /* eslint-disable react-hooks/set-state-in-effect -- one-shot hydrate from localStorage after mount (client-only). */
      setConfigs(restored.configs);
      setSlotPreviewMode(restored.slotPreviewMode);
      setTypeScale(restored.typeScale);
      setPreviewSampleText(restored.previewSampleText);
      /* eslint-enable react-hooks/set-state-in-effect */
    }
    setPrefsHydrated(true);
  }, [initialConfigs, initialTypeScale]);

  const effectiveSlotPreviewMode = useMemo(
    () => syncSlotPreviewModeWithWebfontSource(configs, slotPreviewMode),
    [configs, slotPreviewMode]
  );

  useEffect(() => {
    writeFontDevPrefs({
      configs,
      slotPreviewMode: effectiveSlotPreviewMode,
      typeScale,
      previewSampleText,
    });
  }, [configs, effectiveSlotPreviewMode, typeScale, previewSampleText]);

  useEffect(() => {
    if (!ready || !prefsHydrated || hydratedLocalIDB.current) return;
    hydratedLocalIDB.current = true;

    const c = configs;
    const takeover: SlotName[] = [];
    for (const slot of ["primary", "secondary", "mono"] as SlotName[]) {
      const lib = previews[slot];
      if (!lib?.files.length) continue;
      if (c[slot].source !== "local") continue;
      takeover.push(slot);
    }
    if (takeover.length === 0) return;

    startTransition(() => {
      setSlotPreviewMode((p) => {
        const next = { ...p };
        for (const slot of takeover) next[slot] = "local";
        return next;
      });
      setConfigs((prev) => {
        const next = { ...prev };
        for (const slot of takeover) {
          const lib = previews[slot]!;
          const name = deriveLocalDisplayFamily(lib.files.map((f) => f.fileName));
          const { weights, localRoleFiles } = initialLocalSlotAssignments(lib.files);
          next[slot] = { ...next[slot], family: name, source: "local", weights, localRoleFiles };
        }
        return next;
      });
    });
  }, [ready, previews, configs, prefsHydrated]);

  useEffect(() => {
    const bySlot: Partial<Record<SlotName, LocalRoleFaceRule[]>> = {};
    for (const slot of ["primary", "secondary", "mono"] as SlotName[]) {
      if (effectiveSlotPreviewMode[slot] !== "local" || !previews[slot]?.files.length) continue;
      const st = configs[slot];
      const lib = previews[slot]!;
      const rows: LocalRoleFaceRule[] = [];
      for (const name of WEIGHT_NAMES) {
        if (st.weights[name] === undefined) continue;
        const fn = st.localRoleFiles?.[name] ?? lib.files[0]!.fileName;
        const file = lib.files.find((f) => f.fileName === fn) ?? lib.files[0]!;
        rows.push({
          role: name,
          family: localRolePreviewFamily(slot, name),
          url: file.objectUrl,
          format: file.format,
        });
      }
      bySlot[slot] = rows;
    }
    applyLocalRolePreviewFontFaces(bySlot);
    return () => clearLocalRolePreviewFontFaces();
  }, [configs, previews, effectiveSlotPreviewMode]);

  const faceForSlot = (slot: SlotName) =>
    effectiveSlotPreviewMode[slot] === "local" && previewActive(slot)
      ? previewCssFamily(slot)
      : configs[slot].family;

  const applyUploadFamily = (slot: SlotName, fileNames: string[]) => {
    const name = deriveLocalDisplayFamily(fileNames);
    const { weights, localRoleFiles } = initialLocalFromFileNames(fileNames);
    setConfigs((c) => ({
      ...c,
      [slot]: { ...c[slot], family: name, source: "local", weights, localRoleFiles },
    }));
    setSlotPreviewMode((p) => ({ ...p, [slot]: "local" }));
  };

  const resetFontDevToolState = useCallback(() => {
    try {
      localStorage.removeItem(FONT_DEV_PREFS_KEY);
    } catch {
      /* quota / private mode */
    }
    setConfigs(initialConfigs);
    setTypeScale(initialTypeScale);
    setSlotPreviewMode({ primary: "catalog", secondary: "catalog", mono: "catalog" });
    setPreviewSampleText(DEFAULT_PREVIEW_PHRASE);
    for (const slot of ["primary", "secondary", "mono"] as SlotName[]) {
      void clearSlot(slot);
    }
    setTrioDemoResetSignal((n) => n + 1);
  }, [clearSlot, initialConfigs, initialTypeScale]);

  const resetFontDevTool = useCallback(() => {
    resetFontDevToolState();
  }, [resetFontDevToolState]);

  const fontCount = Object.keys(fontList).length;

  return (
    <DevWorkbenchPageShell
      nav={
        <DevWorkbenchNav onResetSection={resetFontDevTool} onTotalReset={resetFontDevToolState} />
      }
    >
      <DevWorkbenchPageHeader
        eyebrow="Dev · Foundations"
        title="Fonts & type scale"
        description={
          <>
            Choose fonts from the library, set weights, adjust the type scale, then copy the code on
            the right into <code>src/app/fonts/</code> when you’re ready to ship it. You can also
            upload font files for a quick try-out — those previews stay in this browser and are not
            uploaded anywhere.
            {fontCount > 0 ? (
              <span className="text-muted-foreground/80">
                {" "}
                Library: {fontCount.toLocaleString()} families.
              </span>
            ) : null}
          </>
        }
        meta={
          <>
            <span className="font-medium text-foreground/90">Note:</span>{" "}
            <code>typography-heading-*</code> and <code>typography-body-*</code> use{" "}
            <code>--font-weight-*</code> and <code>--type-*-fw</code> from the{" "}
            <strong>primary</strong> font slot only. Secondary and mono do not change those CSS
            variables.
          </>
        }
      />

      <div className="mb-6 rounded-lg border border-border bg-card/20 p-4">
        <label
          htmlFor="font-dev-preview-phrase"
          className="mb-2 block font-mono text-[11px] uppercase tracking-wide text-muted-foreground"
        >
          Sample text
        </label>
        <textarea
          id="font-dev-preview-phrase"
          value={previewSampleText}
          onChange={(e) => setPreviewSampleText(e.target.value)}
          rows={2}
          className="min-h-[3rem] w-full resize-y rounded border border-border bg-background px-3 py-2 text-sm text-foreground focus:outline-none focus:ring-1 focus:ring-ring"
          spellCheck={false}
        />
      </div>

      <div className="grid grid-cols-1 gap-8 md:grid-cols-[minmax(0,1fr)_minmax(17.5rem,26.25rem)] md:items-start">
        <div className="space-y-6">
          {(["primary", "secondary", "mono"] as SlotName[]).map((slot) => (
            <SlotPanel
              key={slot}
              slot={slot}
              state={configs[slot]}
              fontList={fontList}
              onUpdate={(s) => setConfigs((prev) => ({ ...prev, [slot]: s }))}
              previewFamily={faceForSlot(slot)}
              previewMode={effectiveSlotPreviewMode[slot]}
              localLibrary={previews[slot]}
              onPreviewCatalog={(family) => {
                setSlotPreviewMode((p) => ({ ...p, [slot]: "catalog" }));
                const weights = defaultWeightsForCatalogSelection(family, fontList);
                setConfigs((c) => ({
                  ...c,
                  [slot]: {
                    ...c[slot],
                    family,
                    source: "webfont",
                    weights,
                    localRoleFiles: undefined,
                  },
                }));
              }}
              onPreviewLocal={() => {
                setSlotPreviewMode((p) => ({ ...p, [slot]: "local" }));
                const lib = previews[slot];
                if (!lib?.files.length) return;
                const name = deriveLocalDisplayFamily(lib.files.map((f) => f.fileName));
                const { weights, localRoleFiles } = initialLocalSlotAssignments(lib.files);
                setConfigs((c) => ({
                  ...c,
                  [slot]: { ...c[slot], family: name, source: "local", weights, localRoleFiles },
                }));
              }}
              onLocalUploadFiles={async (files) => {
                await replaceSlotFiles(slot, files);
                applyUploadFamily(
                  slot,
                  files.map((f) => f.name)
                );
              }}
              onClearLocal={() => {
                void clearSlot(slot);
                setSlotPreviewMode((p) => ({ ...p, [slot]: "catalog" }));
                setConfigs((c) => ({
                  ...c,
                  [slot]: {
                    ...c[slot],
                    family: initialConfigs[slot].family,
                    source: "webfont",
                    weights: initialConfigs[slot].weights,
                    localRoleFiles: undefined,
                  },
                }));
              }}
              previewSampleText={previewSampleText}
            />
          ))}

          <TypeScalePanel
            scale={typeScale}
            fontPreviewBySlot={buildTypeScaleFontPreview({
              configs,
              effectiveSlotPreviewMode,
              fontList,
              previews,
              previewActive,
              faceForSlot,
            })}
            onUpdate={setTypeScale}
            bodySampleText={previewSampleText}
          />
        </div>

        <div className="md:sticky md:top-8">
          <SnippetPanel
            configs={configs}
            typeScale={typeScale}
            fontList={fontList}
            slotHasLocalPreview={previewActive}
          />
        </div>
      </div>

      <TrioInUnisonPreview
        configs={configs}
        effectiveSlotPreviewMode={effectiveSlotPreviewMode}
        previews={previews}
        fontList={fontList}
        typeScale={typeScale}
        bodyPhrase={previewSampleText}
        trioResetSignal={trioDemoResetSignal}
      />
    </DevWorkbenchPageShell>
  );
}
