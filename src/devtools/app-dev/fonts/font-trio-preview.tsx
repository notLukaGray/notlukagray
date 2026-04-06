"use client";

import {
  createElement,
  type CSSProperties,
  type ReactNode,
  useCallback,
  useMemo,
  useState,
} from "react";
import type { FontWeightMap } from "@/app/fonts/config";
import type { TypeScaleConfig, TypeScaleEntry } from "@/app/fonts/type-scale";
import { TYPE_SCALE_LABELS, TYPE_SCALE_UTILITY_CLASS } from "@/app/fonts/type-scale";
import type { BunnyFontMeta } from "@/app/dev/fonts/page";
import { localRolePreviewFamily } from "@/app/dev/fonts/local-font-preview";
import type { LocalPreviewRuntime } from "@/app/dev/fonts/use-local-font-previews";

export type SlotName = "primary" | "secondary" | "mono";
type SlotPreviewMode = "catalog" | "local";

type SlotState = {
  family: string;
  weights: FontWeightMap;
  italic: boolean;
  source: "local" | "webfont";
  localRoleFiles?: Partial<Record<keyof FontWeightMap, string>>;
};

type WeightPickerMode =
  | { kind: "variable"; wghtMin: number; wghtMax: number }
  | { kind: "static"; options: number[] }
  | { kind: "localFiles"; files: LocalPreviewRuntime["files"] };

const SLOT_UI_LABEL: Record<SlotName, string> = {
  primary: "Primary",
  secondary: "Secondary",
  mono: "Mono",
};
const TRIO_DEMO_DEFAULTS = {
  kicker: "bodyMd",
  headline: "headingXl",
  lead: "bodyXl",
  body: "body2xl",
  quote: "bodyXl",
  codePara: "body2xl",
} as const satisfies Record<string, keyof TypeScaleConfig>;
type TrioDemoBlockId = keyof typeof TRIO_DEMO_DEFAULTS;
type TrioPreviewBreakpoint = "desktop" | "mobile";

function slugify(v: string): string {
  return v.toLowerCase().replace(/[^a-z0-9]+/g, "-");
}
function variableAxisFromMeta(meta: BunnyFontMeta | undefined): {
  wghtMin: number;
  wghtMax: number;
} {
  const w = meta?.weights;
  if (!w?.length) return { wghtMin: 100, wghtMax: 900 };
  const lo = Math.min(...w);
  const hi = Math.max(...w);
  if (lo === hi) return { wghtMin: 100, wghtMax: 900 };
  return { wghtMin: lo, wghtMax: hi };
}
function hasLocalPreviewFiles(
  previewMode: SlotPreviewMode,
  localLibrary: LocalPreviewRuntime | undefined
): boolean {
  if (previewMode !== "local") return false;
  return Boolean(localLibrary?.files.length);
}
function isVariablePickerMeta(meta: BunnyFontMeta | undefined): boolean {
  if (!meta) return true;
  return meta.variable === true;
}
function sortedWeightOptions(meta: BunnyFontMeta): number[] {
  if (!meta.weights || meta.weights.length === 0) return [];
  return [...new Set(meta.weights)].sort((a, b) => a - b);
}
function resolveWeightPickerMode(
  previewMode: SlotPreviewMode,
  bunnyMeta: BunnyFontMeta | undefined,
  localLibrary: LocalPreviewRuntime | undefined
): WeightPickerMode {
  if (hasLocalPreviewFiles(previewMode, localLibrary)) {
    return { kind: "localFiles", files: localLibrary!.files };
  }
  if (!bunnyMeta || isVariablePickerMeta(bunnyMeta)) {
    return { kind: "variable", ...variableAxisFromMeta(bunnyMeta) };
  }
  const options = sortedWeightOptions(bunnyMeta);
  if (options.length > 0) return { kind: "static", options };
  return { kind: "variable", ...variableAxisFromMeta(bunnyMeta) };
}
function wghtPreviewStyle(fontFamilyCss: string, w: number, variableFace: boolean): CSSProperties {
  const s: CSSProperties = { fontFamily: fontFamilyCss, fontWeight: w };
  if (variableFace) s.fontVariationSettings = `"wght" ${w}`;
  return s;
}
function resolveCompositeItalicStyle(
  italicMode: "inherit" | "normal" | "italic",
  slotItalic: boolean
): CSSProperties["fontStyle"] {
  if (italicMode === "normal") return "normal";
  if (italicMode === "italic") return "italic";
  return slotItalic ? "italic" : "normal";
}
function resolveCompositeFontFamilyCss(
  slot: SlotName,
  role: keyof FontWeightMap,
  state: SlotState,
  localActive: boolean
): string {
  const face = localActive ? localRolePreviewFamily(slot, role) : state.family;
  const generic = slot === "mono" ? "ui-monospace, monospace" : "sans-serif";
  return `'${face}', ${generic}`;
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
  const localActive = mode === "local" && Boolean(lib?.files.length);
  const fontFamilyCss = resolveCompositeFontFamilyCss(slot, role, state, localActive);
  const fontWeight = state.weights[role] ?? 400;
  return {
    ...wghtPreviewStyle(fontFamilyCss, fontWeight, picker.kind === "variable" && !localActive),
    fontStyle: resolveCompositeItalicStyle(italicMode, state.italic),
  };
}
function trioHoverTitle(scaleKey: keyof TypeScaleConfig, slot?: SlotName, extra?: string): string {
  let s = `${TYPE_SCALE_LABELS[scaleKey]} · ${TYPE_SCALE_UTILITY_CLASS[scaleKey]}`;
  if (slot) s += ` · ${SLOT_UI_LABEL[slot]} slot`;
  if (extra) s += ` · ${extra}`;
  return s;
}
function trioHeadingTagFromScaleKey(
  k: keyof TypeScaleConfig
): "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "p" {
  if (k === "heading2xl") return "h1";
  if (k === "headingXl") return "h2";
  if (k === "headingLg") return "h3";
  if (k === "headingMd") return "h4";
  if (k === "headingSm") return "h5";
  if (k === "headingXs") return "h6";
  return "p";
}
function trioEntryMetrics(
  entry: TypeScaleEntry,
  bp: TrioPreviewBreakpoint
): { sz: number; lh: number } {
  return bp === "desktop"
    ? { sz: entry.sizeDesktop, lh: entry.lineHeightDesktop }
    : { sz: entry.sizeMobile, lh: entry.lineHeightMobile };
}

function TrioHoverBlock({
  children,
  scaleKey,
  onScaleKeyChange,
  slot,
  extra,
}: {
  children: ReactNode;
  scaleKey: keyof TypeScaleConfig;
  onScaleKeyChange: (k: keyof TypeScaleConfig) => void;
  slot?: SlotName;
  extra?: string;
}) {
  const [hover, setHover] = useState(false);
  const title = trioHoverTitle(scaleKey, slot, extra);
  return (
    <div
      className="group rounded border border-transparent px-3 py-2 transition-colors hover:border-border/60 hover:bg-muted/20"
      title={title}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      {hover ? (
        <div className="mb-2 flex items-center justify-between gap-2">
          <span className="font-mono text-[10px] uppercase tracking-wide text-muted-foreground">
            {TYPE_SCALE_UTILITY_CLASS[scaleKey]}
          </span>
          <select
            value={scaleKey}
            onChange={(e) => onScaleKeyChange(e.target.value as keyof TypeScaleConfig)}
            className="rounded border border-border bg-background px-1.5 py-0.5 text-[10px] font-mono text-foreground focus:outline-none focus:ring-1 focus:ring-ring"
          >
            {Object.keys(TYPE_SCALE_LABELS).map((k) => (
              <option key={k} value={k}>
                {TYPE_SCALE_LABELS[k as keyof TypeScaleConfig]}
              </option>
            ))}
          </select>
        </div>
      ) : null}
      {children}
    </div>
  );
}

export function TrioInUnisonPreview({
  configs,
  effectiveSlotPreviewMode,
  previews,
  fontList,
  typeScale,
  bodyPhrase,
}: {
  configs: Record<SlotName, SlotState>;
  effectiveSlotPreviewMode: Record<SlotName, SlotPreviewMode>;
  previews: Partial<Record<SlotName, LocalPreviewRuntime>>;
  fontList: Record<string, BunnyFontMeta>;
  typeScale: TypeScaleConfig;
  bodyPhrase: string;
}) {
  const [trioBp, setTrioBp] = useState<TrioPreviewBreakpoint>("desktop");
  const [trioDemoKeys, setTrioDemoKeys] = useState<Record<TrioDemoBlockId, keyof TypeScaleConfig>>(
    () => ({ ...TRIO_DEMO_DEFAULTS })
  );
  const sec = configs.secondary;
  const setDemoKey = useCallback(
    (id: TrioDemoBlockId, key: keyof TypeScaleConfig) =>
      setTrioDemoKeys((p) => ({ ...p, [id]: key })),
    []
  );
  const sc = useCallback(
    (
      slot: SlotName,
      role: keyof FontWeightMap,
      italic: "inherit" | "normal" | "italic" = "inherit"
    ) =>
      compositeTextStyle(slot, role, configs, effectiveSlotPreviewMode, previews, fontList, italic),
    [configs, effectiveSlotPreviewMode, previews, fontList]
  );

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

  const previewInner = useMemo(
    () => (
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
            {bodyLine}
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
            "Design systems feel better when type has rhythm"
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
            A lead paragraph that previews body readability and density across desktop and mobile
            breakpoints.
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
            {bodyLine}
          </p>
        </TrioHoverBlock>
        <TrioHoverBlock
          scaleKey={trioDemoKeys.quote}
          onScaleKeyChange={(k) => setDemoKey("quote", k)}
          slot="secondary"
        >
          <blockquote
            className="border-l-2 border-border pl-4"
            style={{
              ...sc("secondary", quoteEntry.fontWeightRole, "italic"),
              fontSize: quoteM.sz,
              lineHeight: `${quoteM.lh}px`,
              letterSpacing: quoteEntry.letterSpacing,
            }}
          >
            Typography is a visual language with a measurable cadence.
          </blockquote>
        </TrioHoverBlock>
        <TrioHoverBlock
          scaleKey={trioDemoKeys.codePara}
          onScaleKeyChange={(k) => setDemoKey("codePara", k)}
          slot="mono"
          extra="Monospace utility"
        >
          <pre
            className="overflow-x-auto rounded bg-muted/40 p-3"
            style={{
              ...sc("mono", codeParaEntry.fontWeightRole),
              fontSize: codeParaM.sz,
              lineHeight: `${codeParaM.lh}px`,
              letterSpacing: codeParaEntry.letterSpacing,
            }}
          >{`const title = "${bodyLine.slice(0, 24)}";\nconsole.log(title);`}</pre>
          <p
            className="mt-2 text-muted-foreground"
            style={{
              ...sc("primary", legal.fontWeightRole),
              fontSize: legal.sizeDesktop,
              lineHeight: `${legal.lineHeightDesktop}px`,
            }}
          >
            Secondary support copy uses primary body tokens for legibility.
          </p>
        </TrioHoverBlock>
      </div>
    ),
    [
      trioDemoKeys,
      setDemoKey,
      sc,
      kickerEntry,
      kickerM,
      headlineTag,
      headlineEntry,
      hM,
      leadEntry,
      leadM,
      bodyEntry,
      bodyM,
      quoteEntry,
      quoteM,
      codeParaEntry,
      codeParaM,
      bodyLine,
      legal,
    ]
  );

  return (
    <section className="mt-8 rounded-lg border border-border bg-card/20 p-5">
      <div className="mb-4 flex items-center justify-between gap-3">
        <p className="font-mono text-[11px] text-muted-foreground uppercase tracking-wide">
          Trio preview
        </p>
        <div className="flex gap-1">
          {(["desktop", "mobile"] as TrioPreviewBreakpoint[]).map((bp) => (
            <button
              key={bp}
              type="button"
              onClick={() => setTrioBp(bp)}
              className={`px-2 py-0.5 rounded text-[11px] font-mono transition-colors ${trioBp === bp ? "bg-foreground text-background" : "text-muted-foreground hover:text-foreground"}`}
            >
              {bp}
            </button>
          ))}
        </div>
      </div>
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
      {sec.italic ? (
        <p className="mt-4 text-[10px] text-muted-foreground">
          Secondary slot currently uses italic mode.
        </p>
      ) : null}
    </section>
  );
}
