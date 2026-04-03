"use client";

import Link from "next/link";
import {
  useCallback,
  useEffect,
  useMemo,
  useState,
  type CSSProperties,
  type ReactNode,
} from "react";
import {
  pbContentGuidelines as COMMITTED_DEFAULTS,
  pbContentGuidelinesConfigFileExport,
  type PbContentGuidelines,
} from "@/app/theme/pb-content-guidelines-config";
import { expandGuidelinesToCssVars } from "@/app/theme/pb-guidelines-expand";
import {
  DEFAULT_STYLE_TOOL_SEEDS,
  emptyLocks,
  mergeGuidelinesWithLocks,
  PB_GUIDELINE_KEYS,
  proposePbContentGuidelines,
  type StyleToolSeeds,
} from "@/app/theme/pb-style-suggest";
import {
  buildPageDensityCssVars,
  scaleSpaceForDensity,
  scaleSpaceShorthandForDensity,
  type PageDensity,
} from "@/page-builder/core/page-density";
import { DevWorkbenchNav } from "@/app/dev/_components/DevWorkbenchNav";
import { DevWorkbenchPageHeader } from "@/app/dev/_components/DevWorkbenchPageHeader";
import { DevWorkbenchPageShell } from "@/app/dev/_components/DevWorkbenchPageShell";

const STORAGE_KEY_V1 = "pb-style-tool-guidelines-v1";
const STORAGE_KEY_V2 = "pb-style-tool-v2";

/** Values accepted for `justify-content` on frames (dropdown; matches common page-builder exports). */
const FRAME_JUSTIFY_OPTIONS = [
  "flex-start",
  "center",
  "flex-end",
  "space-between",
  "space-around",
  "space-evenly",
] as const;

type PersistedV2 = {
  v: 2;
  seeds: StyleToolSeeds;
  locks: Record<keyof PbContentGuidelines, boolean>;
  guidelines: PbContentGuidelines;
};

const ROW_META: Record<keyof PbContentGuidelines, { label: string; hint: string }> = {
  copyTextAlign: {
    label: "Copy text-align",
    hint: "Default alignment used when a text block does not choose its own alignment.",
  },
  frameGapWhenUnset: {
    label: "Frame · default gap",
    hint: "Used when `elementGroup` / slot has no `gap` property. Empty = no theme fallback.",
  },
  frameRowGapWhenUnset: {
    label: "Frame · default row-gap",
    hint: "Used when there is no `rowGap`. Pairs with `gap`; set a value here to see it in the preview.",
  },
  frameColumnGapWhenUnset: {
    label: "Frame · default column-gap",
    hint: "Used when there is no `columnGap`.",
  },
  frameAlignItemsDefault: {
    label: "Frame · align-items",
    hint: "Fallback when the group/slot has no `alignItems`.",
  },
  frameFlexDirectionDefault: {
    label: "Frame · flex-direction",
    hint: "Fallback when the group has no `flexDirection`.",
  },
  frameJustifyContentDefault: {
    label: "Frame · justify-content",
    hint: "Fallback when the group has no `justifyContent` (empty string counts as unset at runtime).",
  },
  framePaddingDefault: {
    label: "Frame · default padding",
    hint: "When the group has no `padding` / per-side padding fields. Use 0 for none.",
  },
  frameFlexWrapDefault: {
    label: "Frame · flex-wrap",
    hint: "Fallback when the group has no `flexWrap`.",
  },
  frameBorderRadiusDefault: {
    label: "Frame · default border-radius",
    hint: "When the group has no `borderRadius` in layout.",
  },
  richTextParagraphGap: { label: "Rich · paragraph stack", hint: "[&+&] between paragraphs." },
  richTextCodeBorderRadius: {
    label: "Rich · fenced code radius",
    hint: "Code blocks / pre wrapper in ElementRichText.",
  },
  richTextHeadingH1Margin: { label: "Rich · H1 margin (top bottom)", hint: "Two lengths or one." },
  richTextHeadingH1MarginTop: {
    label: "Rich · H1 margin-top override",
    hint: "Empty → use block pair.",
  },
  richTextHeadingH1MarginBottom: { label: "Rich · H1 margin-bottom override", hint: "" },
  richTextHeadingH2Margin: { label: "Rich · H2 margin (top bottom)", hint: "" },
  richTextHeadingH2MarginTop: { label: "Rich · H2 margin-top override", hint: "" },
  richTextHeadingH2MarginBottom: { label: "Rich · H2 margin-bottom override", hint: "" },
  richTextHeadingH3Margin: { label: "Rich · H3 margin (top bottom)", hint: "" },
  richTextHeadingH3MarginTop: { label: "Rich · H3 margin-top override", hint: "" },
  richTextHeadingH3MarginBottom: { label: "Rich · H3 margin-bottom override", hint: "" },
  richTextListMarginY: { label: "Rich · list / table Y", hint: "" },
  richTextBlockquoteMarginY: { label: "Rich · blockquote Y", hint: "" },
  richTextHrMarginY: { label: "Rich · hr Y", hint: "" },
  richTextPreWrapMarginY: { label: "Rich · code block Y", hint: "" },
  buttonLabelGap: { label: "Button · label ↔ icon gap", hint: "" },
  buttonNakedPadding: {
    label: "Button · naked padding (Y X)",
    hint: "Resolved to --pb-button-naked-pad-y/x.",
  },
  buttonNakedPaddingY: { label: "Button · naked pad Y override", hint: "Empty → use block pair." },
  buttonNakedPaddingX: { label: "Button · naked pad X override", hint: "" },
  buttonNakedBorderRadius: {
    label: "Button · naked border-radius",
    hint: "Wrapper-less / naked chrome only (--pb-button-naked-radius).",
  },
};

/** Shown when the value is empty (e.g. null) so the field never feels unidentified. */
const FIELD_PLACEHOLDER: Partial<Record<keyof PbContentGuidelines, string>> = {
  frameGapWhenUnset: "e.g. 1rem — empty = no theme fallback for gap",
  frameRowGapWhenUnset: "optional · e.g. 0.75rem",
  frameColumnGapWhenUnset: "optional · e.g. 0.75rem",
  framePaddingDefault: "e.g. 0 or 1rem",
  frameBorderRadiusDefault: "e.g. 0.375rem or 9999px",
  richTextParagraphGap: "e.g. 0.5rem",
  richTextCodeBorderRadius: "e.g. 0.5rem",
  richTextHeadingH1Margin: "e.g. 1rem 0.25rem",
  richTextHeadingH1MarginTop: "optional override · e.g. 1.5rem",
  richTextHeadingH1MarginBottom: "optional override · e.g. 0.25rem",
  richTextHeadingH2Margin: "e.g. 0.75rem 0.25rem",
  richTextHeadingH2MarginTop: "optional · e.g. 1rem",
  richTextHeadingH2MarginBottom: "optional · e.g. 0.25rem",
  richTextHeadingH3Margin: "e.g. 0.5rem 0.25rem",
  richTextHeadingH3MarginTop: "optional · e.g. 0.75rem",
  richTextHeadingH3MarginBottom: "optional · e.g. 0.25rem",
  richTextListMarginY: "e.g. 0.5rem",
  richTextBlockquoteMarginY: "e.g. 0.5rem",
  richTextHrMarginY: "e.g. 0.75rem",
  richTextPreWrapMarginY: "e.g. 0.75rem",
  buttonLabelGap: "e.g. 0.5rem",
  buttonNakedPadding: "e.g. 0.5rem 1.25rem",
  buttonNakedPaddingY: "optional · e.g. 0.75rem",
  buttonNakedPaddingX: "optional · e.g. 2rem",
  buttonNakedBorderRadius: "e.g. 0.375rem",
};

const DEFAULT_FIELD_PLACEHOLDER = "CSS value";

function fillRequiredGuidelineDefaults(g: PbContentGuidelines): PbContentGuidelines {
  const out = { ...g };
  const pick = <K extends keyof PbContentGuidelines>(key: K) => {
    const v = out[key];
    if (v == null || (typeof v === "string" && v.trim() === "")) {
      (out as Record<string, unknown>)[key] = COMMITTED_DEFAULTS[key];
    }
  };
  pick("frameJustifyContentDefault");
  pick("framePaddingDefault");
  pick("frameFlexWrapDefault");
  pick("frameBorderRadiusDefault");
  pick("richTextCodeBorderRadius");
  pick("buttonNakedBorderRadius");
  return out;
}

const SECTIONS: {
  title: string;
  blurb: string;
  keys: (keyof PbContentGuidelines)[];
}[] = [
  {
    title: "Frames",
    blurb:
      "Frame defaults for gap, direction, alignment, padding, wrapping, and radius. These only apply when a frame has not chosen a custom value.",
    keys: [
      "frameGapWhenUnset",
      "frameRowGapWhenUnset",
      "frameColumnGapWhenUnset",
      "frameAlignItemsDefault",
      "frameFlexDirectionDefault",
      "frameJustifyContentDefault",
      "framePaddingDefault",
      "frameFlexWrapDefault",
      "frameBorderRadiusDefault",
    ],
  },
  {
    title: "Copy",
    blurb: "Default text-align follows **Alignment** until locked.",
    keys: ["copyTextAlign"],
  },
  {
    title: "Rich text rhythm",
    blurb:
      "Per-level **block** margin (`top bottom` or one length). Optional top/bottom rows override only if they differ.",
    keys: [
      "richTextParagraphGap",
      "richTextCodeBorderRadius",
      "richTextHeadingH1Margin",
      "richTextHeadingH1MarginTop",
      "richTextHeadingH1MarginBottom",
      "richTextHeadingH2Margin",
      "richTextHeadingH2MarginTop",
      "richTextHeadingH2MarginBottom",
      "richTextHeadingH3Margin",
      "richTextHeadingH3MarginTop",
      "richTextHeadingH3MarginBottom",
      "richTextListMarginY",
      "richTextBlockquoteMarginY",
      "richTextHrMarginY",
      "richTextPreWrapMarginY",
    ],
  },
  {
    title: "Interactive",
    blurb: "Baseline button spacing and rounding. Button text styling still comes from Fonts.",
    keys: [
      "buttonLabelGap",
      "buttonNakedPadding",
      "buttonNakedPaddingY",
      "buttonNakedPaddingX",
      "buttonNakedBorderRadius",
    ],
  },
];

export type StyleDevScope =
  | "foundations"
  | "layout-frames"
  | "elements-rich-text"
  | "elements-button"
  | "all";

type ScopeConfig = {
  title: string;
  kicker: string;
  sectionTitles: string[];
  showGlobalSeeds: boolean;
};

const SCOPE_CONFIG: Record<StyleDevScope, ScopeConfig> = {
  foundations: {
    title: "Style · Foundations",
    kicker: "Global primitives",
    sectionTitles: ["Copy"],
    showGlobalSeeds: true,
  },
  "layout-frames": {
    title: "Layout · Frames",
    kicker: "Frame defaults",
    sectionTitles: ["Frames"],
    showGlobalSeeds: false,
  },
  "elements-rich-text": {
    title: "Elements · Rich Text",
    kicker: "Element defaults",
    sectionTitles: ["Rich text rhythm"],
    showGlobalSeeds: false,
  },
  "elements-button": {
    title: "Elements · Button",
    kicker: "Element defaults",
    sectionTitles: ["Interactive"],
    showGlobalSeeds: false,
  },
  all: {
    title: "Spacing / Style",
    kicker: "Layer 3 · Seeds + locks (like colors)",
    sectionTitles: ["Frames", "Copy", "Rich text rhythm", "Interactive"],
    showGlobalSeeds: true,
  },
};

const NULLABLE_STRING_KEYS = new Set<keyof PbContentGuidelines>([
  "frameGapWhenUnset",
  "frameRowGapWhenUnset",
  "frameColumnGapWhenUnset",
  "richTextHeadingH1MarginTop",
  "richTextHeadingH1MarginBottom",
  "richTextHeadingH2MarginTop",
  "richTextHeadingH2MarginBottom",
  "richTextHeadingH3MarginTop",
  "richTextHeadingH3MarginBottom",
  "buttonNakedPaddingY",
  "buttonNakedPaddingX",
]);

function readPersisted(): PersistedV2 | null {
  if (typeof window === "undefined") return null;
  try {
    const rawV2 = localStorage.getItem(STORAGE_KEY_V2);
    if (rawV2) {
      const data = JSON.parse(rawV2) as Partial<PersistedV2>;
      if (data.v === 2 && data.seeds && data.locks && data.guidelines) {
        const locks = { ...emptyLocks(), ...data.locks } as Record<
          keyof PbContentGuidelines,
          boolean
        >;
        return {
          v: 2,
          seeds: { ...DEFAULT_STYLE_TOOL_SEEDS, ...data.seeds },
          locks,
          guidelines: fillRequiredGuidelineDefaults({
            ...COMMITTED_DEFAULTS,
            ...data.guidelines,
          } as PbContentGuidelines),
        };
      }
    }
    const rawV1 = localStorage.getItem(STORAGE_KEY_V1);
    if (rawV1) {
      const flat = JSON.parse(rawV1) as Partial<PbContentGuidelines>;
      const guidelines = fillRequiredGuidelineDefaults({
        ...COMMITTED_DEFAULTS,
        ...flat,
      } as PbContentGuidelines);
      return {
        v: 2,
        seeds: { ...DEFAULT_STYLE_TOOL_SEEDS },
        locks: Object.fromEntries(PB_GUIDELINE_KEYS.map((k) => [k, true])) as Record<
          keyof PbContentGuidelines,
          boolean
        >,
        guidelines,
      };
    }
    return null;
  } catch {
    return null;
  }
}

/** Exact variable map injected at runtime (same as `pbContentGuidelinesCssInline`). */
function guidelinesToPreviewStyle(g: PbContentGuidelines): CSSProperties {
  return expandGuidelinesToCssVars(g) as CSSProperties;
}

function formatDisplayValue(key: keyof PbContentGuidelines, g: PbContentGuidelines): string {
  const v = g[key];
  if (v === null) return "";
  return String(v);
}

function parseFieldInput(
  key: keyof PbContentGuidelines,
  raw: string
): PbContentGuidelines[typeof key] {
  if (NULLABLE_STRING_KEYS.has(key)) {
    const t = raw.trim();
    return (t === "" ? null : t) as PbContentGuidelines[typeof key];
  }
  return raw as PbContentGuidelines[typeof key];
}

export function StyleDevClient({ scope = "foundations" }: { scope?: StyleDevScope }) {
  const view = SCOPE_CONFIG[scope];
  const [seeds, setSeeds] = useState<StyleToolSeeds>({ ...DEFAULT_STYLE_TOOL_SEEDS });
  const [locks, setLocks] = useState<Record<keyof PbContentGuidelines, boolean>>(emptyLocks());
  const [guidelines, setGuidelines] = useState<PbContentGuidelines>(() =>
    proposePbContentGuidelines(DEFAULT_STYLE_TOOL_SEEDS)
  );
  const [previewDensity, setPreviewDensity] = useState<PageDensity>("balanced");
  const [hydrated, setHydrated] = useState(false);
  const [exportCopied, setExportCopied] = useState(false);

  useEffect(() => {
    /* eslint-disable react-hooks/set-state-in-effect -- one-shot hydrate from localStorage after mount (client-only). */
    const saved = readPersisted();
    if (saved) {
      setSeeds(saved.seeds);
      setLocks(saved.locks);
      setGuidelines(
        mergeGuidelinesWithLocks(
          proposePbContentGuidelines(saved.seeds),
          saved.guidelines,
          saved.locks
        )
      );
    }
    setHydrated(true);
    /* eslint-enable react-hooks/set-state-in-effect */
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    const payload: PersistedV2 = { v: 2, seeds, locks, guidelines };
    localStorage.setItem(STORAGE_KEY_V2, JSON.stringify(payload));
    try {
      localStorage.removeItem(STORAGE_KEY_V1);
    } catch {
      /* ignore */
    }
  }, [seeds, locks, guidelines, hydrated]);

  const mergeFromSeeds = useCallback(
    (
      nextSeeds: StyleToolSeeds,
      nextLocks: Record<keyof PbContentGuidelines, boolean>,
      prevG: PbContentGuidelines
    ) => mergeGuidelinesWithLocks(proposePbContentGuidelines(nextSeeds), prevG, nextLocks),
    []
  );

  const onSeedsChange = useCallback(
    (patch: Partial<StyleToolSeeds>) => {
      setSeeds((s) => {
        const next = { ...s, ...patch };
        setGuidelines((prev) => mergeFromSeeds(next, locks, prev));
        return next;
      });
    },
    [locks, mergeFromSeeds]
  );

  const toggleLock = useCallback(
    (key: keyof PbContentGuidelines) => {
      setLocks((prevL) => {
        const nextL = { ...prevL, [key]: !prevL[key] };
        setGuidelines((prevG) =>
          mergeGuidelinesWithLocks(proposePbContentGuidelines(seeds), prevG, nextL)
        );
        return nextL;
      });
    },
    [seeds]
  );

  const onFieldEdit = useCallback((key: keyof PbContentGuidelines, raw: string) => {
    const parsed = parseFieldInput(key, raw);
    setLocks((prevL) => ({ ...prevL, [key]: true }));
    setGuidelines((prev) => ({ ...prev, [key]: parsed }));
  }, []);

  const resetStyleTool = () => {
    localStorage.removeItem(STORAGE_KEY_V2);
    localStorage.removeItem(STORAGE_KEY_V1);
    const nextSeeds = { ...DEFAULT_STYLE_TOOL_SEEDS };
    const nextLocks = emptyLocks();
    setSeeds(nextSeeds);
    setLocks(nextLocks);
    setGuidelines(proposePbContentGuidelines(nextSeeds));
    setExportCopied(false);
  };

  const exportText = useMemo(() => pbContentGuidelinesConfigFileExport(guidelines), [guidelines]);

  const copyExport = async () => {
    try {
      await navigator.clipboard.writeText(exportText);
      setExportCopied(true);
      setTimeout(() => setExportCopied(false), 2000);
    } catch {
      /* ignore */
    }
  };

  const previewVars = useMemo(() => guidelinesToPreviewStyle(guidelines), [guidelines]);
  const proposed = useMemo(() => proposePbContentGuidelines(seeds), [seeds]);
  const visibleSections = useMemo(
    () => SECTIONS.filter((sec) => view.sectionTitles.includes(sec.title)),
    [view.sectionTitles]
  );
  const visibleKeys = useMemo(() => visibleSections.flatMap((sec) => sec.keys), [visibleSections]);

  const allUnlocked = visibleKeys.every((k) => !locks[k]);

  const resetVisibleSection = useCallback(() => {
    const targetKeys = scope === "all" ? PB_GUIDELINE_KEYS : visibleKeys;
    const shouldResetSeeds = scope === "all" || view.showGlobalSeeds;
    const seedSource = shouldResetSeeds ? { ...DEFAULT_STYLE_TOOL_SEEDS } : seeds;

    if (shouldResetSeeds) setSeeds(seedSource);

    setLocks((prevL) => {
      const nextL = { ...prevL };
      for (const key of targetKeys) nextL[key] = false;
      setGuidelines((prevG) =>
        mergeGuidelinesWithLocks(proposePbContentGuidelines(seedSource), prevG, nextL)
      );
      return nextL;
    });

    setExportCopied(false);
  }, [scope, seeds, view.showGlobalSeeds, visibleKeys]);

  return (
    <DevWorkbenchPageShell
      nav={<DevWorkbenchNav onResetSection={resetVisibleSection} onTotalReset={resetStyleTool} />}
    >
      <DevWorkbenchPageHeader
        eyebrow="Dev · Style"
        title={view.title}
        description={
          scope === "foundations" ? (
            <>
              Set the global style primitives first: alignment, spacing rhythm, radius baseline, and
              density feel. These foundations quietly inform layout and element defaults so
              designers can build quickly without feeling boxed in.
            </>
          ) : scope === "layout-frames" ? (
            <>
              Frame defaults apply when a frame does not explicitly set its own layout value.
              Foundations still come from{" "}
              <Link
                href="/dev/style"
                className="font-mono text-[0.9em] underline underline-offset-2"
              >
                /dev/style
              </Link>
              .
            </>
          ) : scope === "elements-rich-text" ? (
            <>
              Rich text defaults set rhythm and readability for content blocks. These values only
              apply when an element does not specify its own spacing.
            </>
          ) : scope === "elements-button" ? (
            <>
              Button defaults define baseline spacing and radius for wrapper-less button chrome.
              Typography styles are still chosen in{" "}
              <Link
                href="/dev/fonts"
                className="font-mono text-[0.9em] underline underline-offset-2"
              >
                /dev/fonts
              </Link>
              .
            </>
          ) : (
            <>
              <strong className="font-semibold text-foreground/90">Global seeds</strong> set the
              baseline (e.g. center alignment, one spacing rhythm).{" "}
              <strong className="font-semibold text-foreground/90">Unlocked</strong> rows track
              seeds; <strong className="font-semibold text-foreground/90">Lock</strong> a row to
              freeze it while you keep tuning the rest.
            </>
          )
        }
        meta={
          <>
            <p className="font-mono text-[11px] uppercase tracking-wide text-muted-foreground">
              {view.kicker}
            </p>
            {visibleKeys.length > 0 && allUnlocked ? (
              <p className="mt-2 text-amber-700 dark:text-amber-400">
                Full-fluid: every row follows seeds. Lock any token to pin it.
              </p>
            ) : null}
          </>
        }
      />

      <div className="grid grid-cols-1 gap-8 md:grid-cols-[minmax(0,1fr)_minmax(17.5rem,26.25rem)] md:items-start">
        <div className="space-y-6">
          {view.showGlobalSeeds ? (
            <section className="space-y-4 rounded-lg border border-border bg-card/20 p-4">
              <p className="font-mono text-[11px] uppercase tracking-wide text-muted-foreground">
                Global seeds
              </p>
              <div className="grid gap-4 sm:grid-cols-2">
                <label className="space-y-1.5">
                  <span className="font-mono text-[10px] uppercase tracking-wide text-muted-foreground">
                    Alignment
                  </span>
                  <select
                    className="w-full rounded border border-border bg-background px-3 py-2 font-mono text-[11px] text-foreground focus:outline-none focus:ring-1 focus:ring-ring"
                    value={seeds.alignment}
                    onChange={(e) =>
                      onSeedsChange({ alignment: e.target.value as StyleToolSeeds["alignment"] })
                    }
                  >
                    <option value="start">Start / left stack</option>
                    <option value="center">Center</option>
                    <option value="end">End / right</option>
                  </select>
                  <p className="text-[10px] text-muted-foreground">
                    Sets the overall default alignment mood for content.
                  </p>
                </label>
                <label className="space-y-1.5">
                  <span className="font-mono text-[10px] uppercase tracking-wide text-muted-foreground">
                    Spacing base (rem)
                  </span>
                  <input
                    type="number"
                    step={0.125}
                    min={0.125}
                    className="w-full rounded border border-border bg-background px-3 py-2 font-mono text-[11px] text-foreground focus:outline-none focus:ring-1 focus:ring-ring"
                    value={seeds.spacingBaseRem}
                    onChange={(e) =>
                      onSeedsChange({ spacingBaseRem: Number(e.target.value) || 0.125 })
                    }
                  />
                  <p className="text-[10px] text-muted-foreground">
                    Base rhythm used across defaults (paragraphs, gaps, and button spacing).
                  </p>
                </label>
                <label className="space-y-1.5">
                  <span className="font-mono text-[10px] uppercase tracking-wide text-muted-foreground">
                    Radius base (rem)
                  </span>
                  <input
                    type="number"
                    step={0.125}
                    min={0}
                    className="w-full rounded border border-border bg-background px-3 py-2 font-mono text-[11px] text-foreground focus:outline-none focus:ring-1 focus:ring-ring"
                    value={seeds.radiusBaseRem}
                    onChange={(e) => onSeedsChange({ radiusBaseRem: Number(e.target.value) || 0 })}
                  />
                  <p className="text-[10px] text-muted-foreground">
                    Shared rounding baseline for frames, code blocks, and button chrome.
                  </p>
                </label>
                <div className="space-y-1.5">
                  <span className="font-mono text-[10px] uppercase tracking-wide text-muted-foreground">
                    Infer frame gap from spacing
                  </span>
                  <label className="inline-flex items-center gap-2 rounded border border-border bg-background px-3 py-2 text-[11px] text-foreground">
                    <input
                      type="checkbox"
                      className="rounded border-border"
                      checked={seeds.useDefaultFrameGap}
                      onChange={(e) => onSeedsChange({ useDefaultFrameGap: e.target.checked })}
                    />
                    Use `2 × spacing base` when frames do not set a gap
                  </label>
                  <p className="text-[10px] text-muted-foreground">
                    Turn off if your team prefers every frame to define its own spacing.
                  </p>
                </div>
                <label className="space-y-1.5">
                  <span className="font-mono text-[10px] uppercase tracking-wide text-muted-foreground">
                    Page density preview
                  </span>
                  <select
                    className="w-full rounded border border-border bg-background px-3 py-2 font-mono text-[11px] text-foreground focus:outline-none focus:ring-1 focus:ring-ring"
                    value={previewDensity}
                    onChange={(e) => setPreviewDensity(e.target.value as PageDensity)}
                  >
                    <option value="comfortable">Comfortable</option>
                    <option value="balanced">Balanced</option>
                    <option value="compact">Compact</option>
                  </select>
                  <p className="text-[10px] text-muted-foreground">
                    Page-level schema supports density:{" "}
                    <code className="font-mono text-[0.95em]">comfortable</code>,{" "}
                    <code className="font-mono text-[0.95em]">balanced</code>,{" "}
                    <code className="font-mono text-[0.95em]">compact</code>. Density scales layout
                    spacing defaults (frame gap/padding) and radius, not rich-text margins.
                  </p>
                </label>
              </div>
            </section>
          ) : null}

          {visibleSections.map((sec) => (
            <section
              key={sec.title}
              className="space-y-3 rounded-lg border border-border bg-card/20 p-4"
            >
              <div>
                <p className="font-mono text-[11px] uppercase tracking-wide text-muted-foreground">
                  {sec.title}
                </p>
                <p className="mt-1 text-[10px] leading-relaxed text-muted-foreground">
                  {sec.blurb}
                </p>
              </div>
              <div className="overflow-x-auto rounded border border-border/80">
                <table className="w-full min-w-[520px] border-collapse text-left">
                  <thead>
                    <tr className="border-b border-border bg-muted/30">
                      <th className="px-3 py-2 font-mono text-[10px] font-normal uppercase tracking-wide text-muted-foreground">
                        Token
                      </th>
                      <th className="px-3 py-2 font-mono text-[10px] font-normal uppercase tracking-wide text-muted-foreground">
                        Proposed
                      </th>
                      <th className="px-3 py-2 font-mono text-[10px] font-normal uppercase tracking-wide text-muted-foreground">
                        Value
                      </th>
                      <th className="px-3 py-2 font-mono text-[10px] font-normal uppercase tracking-wide text-muted-foreground">
                        Lock
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {sec.keys.map((key) => {
                      const meta = ROW_META[key];
                      const locked = locks[key];
                      return (
                        <tr key={key} className="border-b border-border/80 last:border-b-0">
                          <td className="px-3 py-2.5 align-top">
                            <span className="text-sm font-medium text-foreground">
                              {meta.label}
                            </span>
                            <div className="font-mono text-[10px] text-muted-foreground">{key}</div>
                            {meta.hint ? (
                              <p className="mt-1 max-w-xs text-[10px] text-muted-foreground">
                                {meta.hint}
                              </p>
                            ) : null}
                          </td>
                          <td className="px-3 py-2.5 align-top font-mono text-[10px] tabular-nums text-muted-foreground">
                            {formatDisplayValue(key, proposed)}
                          </td>
                          <td className="px-3 py-2.5 align-top">
                            {key === "copyTextAlign" ? (
                              <select
                                className="w-full min-w-32 rounded border border-border bg-background px-2 py-1.5 font-mono text-[11px] text-foreground focus:outline-none focus:ring-1 focus:ring-ring"
                                value={String(guidelines.copyTextAlign ?? "start")}
                                onChange={(e) => onFieldEdit("copyTextAlign", e.target.value)}
                              >
                                {(
                                  ["start", "left", "center", "right", "justify", "end"] as const
                                ).map((opt) => (
                                  <option key={opt} value={opt}>
                                    {opt}
                                  </option>
                                ))}
                              </select>
                            ) : key === "frameAlignItemsDefault" ? (
                              <select
                                className="w-full min-w-32 rounded border border-border bg-background px-2 py-1.5 font-mono text-[11px] text-foreground focus:outline-none focus:ring-1 focus:ring-ring"
                                value={String(guidelines.frameAlignItemsDefault)}
                                onChange={(e) =>
                                  onFieldEdit("frameAlignItemsDefault", e.target.value)
                                }
                              >
                                {(
                                  [
                                    "flex-start",
                                    "center",
                                    "flex-end",
                                    "stretch",
                                    "baseline",
                                  ] as const
                                ).map((opt) => (
                                  <option key={opt} value={opt}>
                                    {opt}
                                  </option>
                                ))}
                              </select>
                            ) : key === "frameFlexDirectionDefault" ? (
                              <select
                                className="w-full min-w-32 rounded border border-border bg-background px-2 py-1.5 font-mono text-[11px] text-foreground focus:outline-none focus:ring-1 focus:ring-ring"
                                value={String(guidelines.frameFlexDirectionDefault)}
                                onChange={(e) =>
                                  onFieldEdit("frameFlexDirectionDefault", e.target.value)
                                }
                              >
                                {(["row", "row-reverse", "column", "column-reverse"] as const).map(
                                  (opt) => (
                                    <option key={opt} value={opt}>
                                      {opt}
                                    </option>
                                  )
                                )}
                              </select>
                            ) : key === "frameFlexWrapDefault" ? (
                              <select
                                className="w-full min-w-32 rounded border border-border bg-background px-2 py-1.5 font-mono text-[11px] text-foreground focus:outline-none focus:ring-1 focus:ring-ring"
                                value={String(guidelines.frameFlexWrapDefault)}
                                onChange={(e) =>
                                  onFieldEdit("frameFlexWrapDefault", e.target.value)
                                }
                              >
                                {(["nowrap", "wrap", "wrap-reverse"] as const).map((opt) => (
                                  <option key={opt} value={opt}>
                                    {opt}
                                  </option>
                                ))}
                              </select>
                            ) : key === "frameJustifyContentDefault" ? (
                              <select
                                className="w-full min-w-32 rounded border border-border bg-background px-2 py-1.5 font-mono text-[11px] text-foreground focus:outline-none focus:ring-1 focus:ring-ring"
                                value={guidelines.frameJustifyContentDefault}
                                onChange={(e) =>
                                  onFieldEdit("frameJustifyContentDefault", e.target.value)
                                }
                              >
                                {!(FRAME_JUSTIFY_OPTIONS as readonly string[]).includes(
                                  guidelines.frameJustifyContentDefault
                                ) ? (
                                  <option value={guidelines.frameJustifyContentDefault}>
                                    {guidelines.frameJustifyContentDefault} (custom)
                                  </option>
                                ) : null}
                                {FRAME_JUSTIFY_OPTIONS.map((opt) => (
                                  <option key={opt} value={opt}>
                                    {opt}
                                  </option>
                                ))}
                              </select>
                            ) : (
                              <input
                                type="text"
                                className="w-full min-w-24 rounded border border-border bg-background px-2 py-1.5 font-mono text-[11px] text-foreground placeholder:text-muted-foreground/70 focus:outline-none focus:ring-1 focus:ring-ring"
                                placeholder={FIELD_PLACEHOLDER[key] ?? DEFAULT_FIELD_PLACEHOLDER}
                                value={formatDisplayValue(key, guidelines)}
                                onChange={(e) => onFieldEdit(key, e.target.value)}
                              />
                            )}
                          </td>
                          <td className="px-3 py-2.5 align-top">
                            <label className="flex cursor-pointer items-center gap-2 font-mono text-[11px] text-muted-foreground">
                              <input
                                type="checkbox"
                                className="rounded border-border"
                                checked={locked}
                                onChange={() => toggleLock(key)}
                              />
                              Lock
                            </label>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>

              <SectionPreview
                title={sec.title}
                guidelines={guidelines}
                previewVars={previewVars}
                previewDensity={previewDensity}
                sectionKeys={sec.keys}
              />
            </section>
          ))}
        </div>

        <div className="md:sticky md:top-8">
          <div className="space-y-3 rounded-lg border border-border bg-card/20 p-4">
            <p className="font-mono text-[11px] uppercase tracking-wide text-muted-foreground">
              Handoff snippet
            </p>
            <p className="text-[10px] leading-snug text-muted-foreground">
              Share this with engineering when defaults feel right. It captures your current style
              decisions so implementation stays aligned.
            </p>
            <pre className="max-h-96 overflow-x-auto overflow-y-auto whitespace-pre-wrap rounded bg-muted/40 p-3 font-mono text-[11px] leading-relaxed text-foreground">
              {exportText}
            </pre>
            <button
              type="button"
              onClick={() => void copyExport()}
              className="w-full rounded border border-border px-3 py-2 text-sm font-mono text-foreground transition-colors hover:bg-muted"
            >
              {exportCopied ? "Copied!" : "Copy code"}
            </button>
          </div>
        </div>
      </div>
    </DevWorkbenchPageShell>
  );
}

const FRAME_PREVIEW_CHROME: Pick<CSSProperties, "boxSizing" | "border" | "background"> = {
  boxSizing: "border-box",
  border: "1px solid color-mix(in oklab, var(--foreground) 18%, transparent)",
  background: "color-mix(in oklab, var(--foreground) 5%, transparent)",
};

function resolveFrameGapsCss(
  g: PbContentGuidelines
): Pick<CSSProperties, "gap" | "rowGap" | "columnGap"> {
  const gap =
    g.frameGapWhenUnset != null && String(g.frameGapWhenUnset).trim() !== ""
      ? g.frameGapWhenUnset
      : undefined;
  const rowGap =
    g.frameRowGapWhenUnset != null && String(g.frameRowGapWhenUnset).trim() !== ""
      ? g.frameRowGapWhenUnset
      : undefined;
  const columnGap =
    g.frameColumnGapWhenUnset != null && String(g.frameColumnGapWhenUnset).trim() !== ""
      ? g.frameColumnGapWhenUnset
      : undefined;
  return {
    ...(gap != null ? { gap: scaleSpaceForDensity(gap) } : {}),
    ...(rowGap != null ? { rowGap: scaleSpaceForDensity(rowGap) } : {}),
    ...(columnGap != null ? { columnGap: scaleSpaceForDensity(columnGap) } : {}),
  };
}

/** Gap / row-gap / column-gap + direction + wrap (no padding — padding has its own preview). */
function frameGapWrapDirectionPreviewStyle(g: PbContentGuidelines): CSSProperties {
  return {
    display: "flex",
    ...FRAME_PREVIEW_CHROME,
    flexDirection: g.frameFlexDirectionDefault,
    justifyContent: "flex-start",
    alignItems: "flex-start",
    flexWrap: g.frameFlexWrapDefault,
    maxWidth: 260,
    minHeight: 48,
    overflow: "visible",
    padding: 0,
    borderRadius: 0,
    ...resolveFrameGapsCss(g),
  };
}

const FRAME_PREVIEW_CELLS = ["A", "B", "C", "D", "E", "F"] as const;

function FrameSubPreviewLabel({ children }: { children: ReactNode }) {
  return (
    <p className="mb-1.5 font-mono text-[10px] leading-snug text-muted-foreground">{children}</p>
  );
}

function FramePreviewAlignItems({ g }: { g: PbContentGuidelines }) {
  return (
    <div>
      <FrameSubPreviewLabel>
        <strong className="text-foreground">Align-items</strong> — cross axis only (flex-direction
        fixed to <code className="font-mono text-[0.95em]">row</code>; items have different
        heights).
      </FrameSubPreviewLabel>
      <div
        style={{
          display: "flex",
          ...FRAME_PREVIEW_CHROME,
          flexDirection: "row",
          justifyContent: "flex-start",
          alignItems: g.frameAlignItemsDefault,
          flexWrap: "nowrap",
          gap: 0,
          padding: 0,
          borderRadius: 0,
          minHeight: 72,
          maxWidth: 280,
          width: "100%",
        }}
      >
        {(
          [
            { key: "A", body: "A" },
            {
              key: "B",
              body: (
                <>
                  B
                  <br />
                  tall
                  <br />
                  cell
                </>
              ),
            },
            { key: "C", body: "C" },
          ] as const
        ).map(({ key, body }, i) => (
          <span
            key={key}
            className={`shrink-0 rounded px-2 py-1 text-center font-mono text-[10px] leading-snug ${
              i === 0 ? "bg-primary/20" : i === 1 ? "bg-accent/25" : "bg-secondary"
            }`}
            style={{ flex: "0 0 auto", width: 52 }}
          >
            {body}
          </span>
        ))}
      </div>
    </div>
  );
}

function FramePreviewJustifyContent({ g }: { g: PbContentGuidelines }) {
  return (
    <div>
      <FrameSubPreviewLabel>
        <strong className="text-foreground">Justify-content</strong> — main axis (row, three equal
        cells; no gap).
      </FrameSubPreviewLabel>
      <div
        style={{
          display: "flex",
          ...FRAME_PREVIEW_CHROME,
          flexDirection: "row",
          alignItems: "center",
          justifyContent: g.frameJustifyContentDefault as CSSProperties["justifyContent"],
          flexWrap: "nowrap",
          gap: 0,
          padding: 0,
          borderRadius: 0,
          width: "100%",
          maxWidth: 280,
          minHeight: 52,
        }}
      >
        {(["J1", "J2", "J3"] as const).map((label, i) => (
          <span
            key={label}
            className={`shrink-0 rounded px-2 py-2 text-center font-mono text-[10px] ${
              i === 0 ? "bg-primary/20" : i === 1 ? "bg-accent/25" : "bg-secondary"
            }`}
            style={{ flex: "0 0 auto", width: 52 }}
          >
            {label}
          </span>
        ))}
      </div>
    </div>
  );
}

function FramePreviewGapWrapDirection({ g }: { g: PbContentGuidelines }) {
  return (
    <div>
      <FrameSubPreviewLabel>
        <strong className="text-foreground">Gap / direction / wrap</strong> — theme fallbacks for{" "}
        <code className="font-mono text-[0.95em]">gap</code>,{" "}
        <code className="font-mono text-[0.95em]">rowGap</code>,{" "}
        <code className="font-mono text-[0.95em]">columnGap</code>,{" "}
        <code className="font-mono text-[0.95em]">flexDirection</code>,{" "}
        <code className="font-mono text-[0.95em]">flexWrap</code> (narrow width, six cells; padding
        unset here).
      </FrameSubPreviewLabel>
      <div style={frameGapWrapDirectionPreviewStyle(g)}>
        {FRAME_PREVIEW_CELLS.map((cell, i) => (
          <span
            key={cell}
            className={`shrink-0 rounded px-2 py-1.5 text-center font-mono text-[10px] ${
              i % 3 === 0 ? "bg-primary/15" : i % 3 === 1 ? "bg-accent/20" : "bg-secondary"
            }`}
            style={{ flex: "0 0 auto", width: 56 }}
          >
            {cell}
          </span>
        ))}
      </div>
    </div>
  );
}

function FramePreviewPaddingRadius({ g }: { g: PbContentGuidelines }) {
  return (
    <div>
      <FrameSubPreviewLabel>
        <strong className="text-foreground">Padding and border-radius</strong> — fallbacks when the
        group omits layout padding / radius (inner blocks show the inset).
      </FrameSubPreviewLabel>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          flexWrap: "nowrap",
          alignItems: "center",
          justifyContent: "flex-start",
          gap: "0.5rem",
          padding: scaleSpaceShorthandForDensity(g.framePaddingDefault),
          borderRadius: g.frameBorderRadiusDefault,
          ...FRAME_PREVIEW_CHROME,
          width: "100%",
          maxWidth: 280,
        }}
      >
        <span className="block h-8 min-w-14 rounded-sm bg-primary/25" />
        <span className="block h-8 min-w-14 rounded-sm bg-accent/30" />
      </div>
    </div>
  );
}

function SectionPreview({
  title,
  guidelines,
  previewVars,
  previewDensity,
  sectionKeys,
}: {
  title: string;
  guidelines: PbContentGuidelines;
  previewVars: CSSProperties;
  previewDensity: PageDensity;
  sectionKeys: (keyof PbContentGuidelines)[];
}) {
  const showFrame = sectionKeys.some((k) => String(k).startsWith("frame"));
  const showCopy = sectionKeys.includes("copyTextAlign");
  const showRich = sectionKeys.some((k) => String(k).startsWith("richText"));
  const showBtn = sectionKeys.some((k) => String(k).startsWith("button"));

  return (
    <div className="rounded-lg border border-dashed border-border/80 bg-muted/15 p-3">
      <p className="mb-2 font-mono text-[10px] uppercase text-muted-foreground">
        Preview · {title}
      </p>
      {showFrame ? (
        <p className="mb-3 text-[10px] leading-snug text-muted-foreground">
          Each block below isolates what you are editing so one control does not hide another.
          Tokens still apply only when the page-builder block does not set that property.
        </p>
      ) : null}
      <div
        className="rounded-md border border-border/60 bg-background/40 p-3"
        style={{
          ...(buildPageDensityCssVars(previewDensity) as CSSProperties),
          ...previewVars,
          ...(showCopy
            ? { textAlign: guidelines.copyTextAlign as CSSProperties["textAlign"] }
            : {}),
        }}
      >
        {showFrame ? (
          <div className="space-y-4 border-t border-border/50 pt-3">
            <FramePreviewAlignItems g={guidelines} />
            <FramePreviewJustifyContent g={guidelines} />
            <FramePreviewGapWrapDirection g={guidelines} />
            <FramePreviewPaddingRadius g={guidelines} />
          </div>
        ) : null}
        {showCopy && !showFrame ? (
          <p className="typography-body-sm m-0 max-w-prose">
            Copy uses the token when the block has no explicit `textAlign` / `align`.
          </p>
        ) : null}
        {showRich ? (
          <div className={`typography-body-sm max-w-prose ${showFrame ? "mt-3" : ""}`}>
            <p className="m-0">Paragraph one.</p>
            <p className="m-0 mt-(--pb-rich-text-p-gap)">Paragraph two.</p>
            <span className="mt-(--pb-rich-text-h3-mt) mb-(--pb-rich-text-h3-mb) block text-base font-bold">
              Heading
            </span>
            <p className="m-0">After heading.</p>
          </div>
        ) : null}
        {showBtn ? (
          <div className={showFrame || showRich ? "mt-3" : ""}>
            <button
              type="button"
              className="inline-flex items-center justify-center gap-(--pb-button-label-gap) border border-border font-mono text-[10px]"
              style={{
                paddingTop: "var(--pb-button-naked-pad-y)",
                paddingBottom: "var(--pb-button-naked-pad-y)",
                paddingLeft: "var(--pb-button-naked-pad-x)",
                paddingRight: "var(--pb-button-naked-pad-x)",
                borderRadius: "var(--pb-button-naked-radius)",
              }}
            >
              Label
              <span className="opacity-60">●</span>
            </button>
          </div>
        ) : null}
      </div>
    </div>
  );
}
