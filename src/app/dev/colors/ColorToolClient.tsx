"use client";

import { formatHex, parse } from "culori";
import {
  useCallback,
  useEffect,
  useMemo,
  useState,
  type CSSProperties,
  type ReactNode,
} from "react";
import {
  DEFAULT_M1_SEEDS_DARK,
  DEFAULT_M1_SEEDS_LIGHT,
  type M1ColorSeeds,
  type M1RowState,
  type M1ThemeMode,
  contrastHintForToken,
  contrastPair,
  initialM1Rows,
  isFullyFluidPalette,
  proposeM1Values,
  wcagContrastTooltipLines,
} from "@/app/theme/palette-suggest";
import { M1_TOKEN_IDS, M1_TOKEN_META, type M1TokenId } from "@/app/theme/pb-color-tokens";
import { DevWorkbenchNav } from "@/app/dev/_components/DevWorkbenchNav";
import { DevWorkbenchPageHeader } from "@/app/dev/_components/DevWorkbenchPageHeader";
import { DevWorkbenchPageShell } from "@/app/dev/_components/DevWorkbenchPageShell";

const STORAGE_KEY = "pb-color-tool-m1";

type PersistedV2 = {
  seedsLight: M1ColorSeeds;
  seedsDark: M1ColorSeeds;
  rowsLight: Record<M1TokenId, M1RowState>;
  rowsDark: Record<M1TokenId, M1RowState>;
  /** When true, seed edits apply to both light and dark seed sets. */
  syncSeedsAcrossThemes?: boolean;
};

type PersistedV1 = {
  seeds: {
    primaryLight: string;
    secondaryLight: string;
    accentLight: string;
    linkAccent: string;
  };
  rows: Record<M1TokenId, M1RowState>;
};

function migrateV1ToV2(data: PersistedV1): PersistedV2 {
  const seedsLight: M1ColorSeeds = {
    primary: data.seeds.primaryLight,
    secondary: data.seeds.secondaryLight,
    accent: data.seeds.accentLight,
    linkAccent: data.seeds.linkAccent,
  };
  return {
    seedsLight,
    seedsDark: { ...DEFAULT_M1_SEEDS_DARK },
    rowsLight: data.rows,
    rowsDark: initialM1Rows(DEFAULT_M1_SEEDS_DARK, "dark"),
  };
}

function readPersisted(): PersistedV2 | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const data = JSON.parse(raw) as PersistedV2 & Partial<PersistedV1> & { seeds?: unknown };

    if (
      data.seedsLight &&
      data.seedsDark &&
      data.rowsLight &&
      data.rowsDark &&
      typeof data.seedsLight === "object" &&
      typeof data.seedsDark === "object"
    ) {
      return {
        seedsLight: data.seedsLight,
        seedsDark: data.seedsDark,
        rowsLight: data.rowsLight,
        rowsDark: data.rowsDark,
        syncSeedsAcrossThemes: data.syncSeedsAcrossThemes === true,
      };
    }

    const legacy = data as PersistedV1;
    if (
      legacy.seeds &&
      typeof legacy.seeds === "object" &&
      "primaryLight" in legacy.seeds &&
      legacy.rows
    ) {
      return migrateV1ToV2(legacy);
    }

    return null;
  } catch {
    return null;
  }
}

/** Full `config.ts` source for paste-replace of `src/app/theme/config.ts`. */
function buildThemeConfigFileExport(
  light: Record<M1TokenId, string>,
  dark: Record<M1TokenId, string>
): string {
  const fmtObj = (name: "pbBrandLight" | "pbBrandDark", rec: Record<M1TokenId, string>) => {
    const lines = M1_TOKEN_IDS.map(
      (id) => `  ${JSON.stringify(id)}: ${JSON.stringify(rec[id])},`
    ).join("\n");
    return `export const ${name} = {\n${lines}\n} as const satisfies Record<M1TokenId, string>;`;
  };

  const pbInlineFn = [
    "export function pbBrandCssInline(): string {",
    '  const lightDerived = derivePbThemeTokens(pbBrandLight, "light");',
    '  const darkDerived = derivePbThemeTokens(pbBrandDark, "dark");',
    "  const rootLines = [",
    "    ...M1_TOKEN_IDS.map((id) => `  ${id}: ${pbBrandLight[id]};`),",
    "    ...PB_DERIVED_TOKEN_IDS.map((id) => `  ${id}: ${lightDerived[id]};`),",
    '  ].join("\\n");',
    "  const darkLines = [",
    "    ...M1_TOKEN_IDS.map((id) => `  ${id}: ${pbBrandDark[id]};`),",
    "    ...PB_DERIVED_TOKEN_IDS.map((id) => `  ${id}: ${darkDerived[id]};`),",
    '  ].join("\\n");',
    "  return " + "`" + ":root {\\n${rootLines}\\n}\\n\\n.dark {\\n${darkLines}\\n}" + "`" + ";",
    "}",
  ].join("\n");

  return [
    `import type { M1TokenId } from "@/app/theme/pb-color-tokens";`,
    `import { M1_TOKEN_IDS } from "@/app/theme/pb-color-tokens";`,
    `import { derivePbThemeTokens, PB_DERIVED_TOKEN_IDS } from "@/app/theme/pb-color-derived-tokens";`,
    "",
    "/**",
    " * Brand + link seeds for light UI. Edit via `/dev/colors` → copy replaces this file.",
    " * Extended surfaces/status/chart/sidebar tokens derive from these seeds at runtime.",
    " */",
    fmtObj("pbBrandLight", light),
    "",
    fmtObj("pbBrandDark", dark),
    "",
    "/** Emits `:root` / `.dark` blocks; injected at start of `<body>` so it overrides `globals.css`. */",
    pbInlineFn,
    "",
  ].join("\n");
}

function WcagHoverBubble({
  fg,
  bg,
  title,
  children,
}: {
  fg: string;
  bg: string;
  title: string;
  children: ReactNode;
}) {
  const lines = wcagContrastTooltipLines(contrastPair(fg, bg));
  return (
    <div className="group/wcag relative w-fit max-w-full overflow-visible">
      {children}
      {lines ? (
        <span
          className="pointer-events-none absolute bottom-full left-1/2 z-20 mb-1.5 block w-max min-w-48 max-w-[min(18rem,calc(100vw-2rem))] -translate-x-1/2 rounded-md border border-border bg-card px-2.5 py-2 font-mono text-[10px] leading-snug text-foreground opacity-0 shadow-lg transition-opacity duration-150 group-hover/wcag:opacity-100"
          role="tooltip"
        >
          <span className="mb-1 block border-b border-border/60 pb-1 text-[9px] uppercase tracking-wide text-muted-foreground">
            {title}
          </span>
          {lines.map((line, i) => (
            <span key={i} className="block">
              {line}
            </span>
          ))}
        </span>
      ) : null}
    </div>
  );
}

function WcagLinkBubble({ v }: { v: Record<M1TokenId, string> }) {
  const def = contrastPair(v["--pb-link"], v["--pb-secondary"]);
  const hov = contrastPair(v["--pb-link-hover"], v["--pb-secondary"]);
  const linesDef = wcagContrastTooltipLines(def);
  const linesHov = wcagContrastTooltipLines(hov);
  const hasTip = linesDef || linesHov;

  return (
    <span className="group/wlink relative inline-block overflow-visible">
      <a
        href="#"
        className="underline decoration-2 underline-offset-4"
        style={{ color: "var(--pb-link)" }}
        onMouseEnter={(e) => {
          e.currentTarget.style.color = "var(--pb-link-hover)";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.color = "var(--pb-link)";
        }}
        onMouseDown={(e) => {
          e.currentTarget.style.color = "var(--pb-link-active)";
        }}
        onMouseUp={(e) => {
          e.currentTarget.style.color = "var(--pb-link-hover)";
        }}
        onClick={(e) => e.preventDefault()}
      >
        Call to action link
      </a>
      {hasTip ? (
        <span className="pointer-events-none absolute bottom-full left-1/2 z-20 mb-1.5 block w-max min-w-52 max-w-[min(20rem,calc(100vw-2rem))] -translate-x-1/2 rounded-md border border-border bg-card px-2.5 py-2 font-mono text-[10px] leading-snug text-foreground opacity-0 shadow-lg transition-opacity duration-150 group-hover/wlink:opacity-100">
          {linesDef ? (
            <>
              <span className="mb-1 block border-b border-border/60 pb-1 text-[9px] uppercase tracking-wide text-muted-foreground">
                Link · default
              </span>
              {linesDef.map((line, i) => (
                <span key={`d-${i}`} className="block">
                  {line}
                </span>
              ))}
            </>
          ) : null}
          {linesHov ? (
            <>
              <span
                className={`block text-[9px] uppercase tracking-wide text-muted-foreground ${
                  linesDef
                    ? "mt-2 border-t border-border/60 pt-2"
                    : "mb-1 border-b border-border/60 pb-1"
                }`}
              >
                Link · hover vs surface
              </span>
              {linesHov.map((line, i) => (
                <span key={`h-${i}`} className="block">
                  {line}
                </span>
              ))}
            </>
          ) : null}
        </span>
      ) : null}
    </span>
  );
}

function PreviewColumn({ label, v }: { label: string; v: Record<M1TokenId, string> }) {
  const vars = useMemo((): CSSProperties => {
    const o: Record<string, string> = {};
    for (const id of M1_TOKEN_IDS) o[id] = v[id];
    return o as CSSProperties;
  }, [v]);

  return (
    <div
      className="overflow-visible rounded-lg border border-border/80"
      style={{
        ...vars,
        background: "var(--pb-secondary)",
        color: "var(--pb-on-secondary)",
      }}
    >
      <div className="border-b border-border/40 px-3 py-1.5 font-mono text-[10px] uppercase tracking-wide text-muted-foreground">
        {label}
      </div>
      <div className="space-y-3 overflow-visible p-3">
        <div className="flex flex-wrap gap-2 overflow-visible">
          <WcagHoverBubble
            fg={v["--pb-on-primary"]}
            bg={v["--pb-primary"]}
            title="On primary / primary"
          >
            <button
              type="button"
              className="rounded-md px-3 py-1.5 text-sm font-medium"
              style={{ background: "var(--pb-primary)", color: "var(--pb-on-primary)" }}
            >
              Primary
            </button>
          </WcagHoverBubble>
          <WcagHoverBubble
            fg={v["--pb-on-accent"]}
            bg={v["--pb-accent"]}
            title="On accent / accent"
          >
            <button
              type="button"
              className="rounded-md px-3 py-1.5 text-sm font-medium"
              style={{ background: "var(--pb-accent)", color: "var(--pb-on-accent)" }}
            >
              Accent
            </button>
          </WcagHoverBubble>
          <WcagHoverBubble
            fg={v["--pb-on-secondary"]}
            bg={v["--pb-secondary"]}
            title="Outline / surface"
          >
            <span
              className="inline-flex rounded-md border-2 px-3 py-1.5 text-sm font-medium"
              style={{
                borderColor: "var(--pb-on-secondary)",
                color: "var(--pb-on-secondary)",
              }}
            >
              Ghost
            </span>
          </WcagHoverBubble>
        </div>
        <WcagHoverBubble
          fg={v["--pb-on-secondary"]}
          bg={v["--pb-secondary"]}
          title="Body / surface"
        >
          <p className="max-w-prose text-sm leading-relaxed">
            Body copy on the secondary surface — hover this block for contrast. Shorter labels and
            large type can pass with lower ratios than dense paragraph text.
          </p>
        </WcagHoverBubble>
        <p className="text-xs opacity-80">
          Muted-style line (same ink, reduced emphasis for hierarchy only).
        </p>
        <p className="text-sm">
          Inline copy with a <WcagLinkBubble v={v} /> in context.
        </p>
      </div>
    </div>
  );
}

export function ColorToolClient() {
  const [seedsLight, setSeedsLight] = useState<M1ColorSeeds>(DEFAULT_M1_SEEDS_LIGHT);
  const [seedsDark, setSeedsDark] = useState<M1ColorSeeds>(DEFAULT_M1_SEEDS_DARK);
  const [rowsLight, setRowsLight] = useState<Record<M1TokenId, M1RowState>>(() =>
    initialM1Rows(DEFAULT_M1_SEEDS_LIGHT, "light")
  );
  const [rowsDark, setRowsDark] = useState<Record<M1TokenId, M1RowState>>(() =>
    initialM1Rows(DEFAULT_M1_SEEDS_DARK, "dark")
  );
  const [editTheme, setEditTheme] = useState<M1ThemeMode>("light");
  const [syncSeedsAcrossThemes, setSyncSeedsAcrossThemes] = useState(false);
  const [hydrated, setHydrated] = useState(false);
  const [exportCopied, setExportCopied] = useState(false);

  useEffect(() => {
    /* eslint-disable react-hooks/set-state-in-effect -- one-shot hydrate from localStorage after mount (client-only). */
    const saved = readPersisted();
    if (saved) {
      setSeedsLight(saved.seedsLight);
      setSeedsDark(saved.seedsDark);
      setRowsLight(saved.rowsLight);
      setRowsDark(saved.rowsDark);
      if (saved.syncSeedsAcrossThemes) setSyncSeedsAcrossThemes(true);
    }
    setHydrated(true);
    /* eslint-enable react-hooks/set-state-in-effect */
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    const payload: PersistedV2 = {
      seedsLight,
      seedsDark,
      rowsLight,
      rowsDark,
      syncSeedsAcrossThemes,
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(payload));
  }, [hydrated, seedsLight, seedsDark, rowsLight, rowsDark, syncSeedsAcrossThemes]);

  const resolvedLight = useMemo(
    () => proposeM1Values(seedsLight, rowsLight, "light"),
    [seedsLight, rowsLight]
  );
  const resolvedDark = useMemo(
    () => proposeM1Values(seedsDark, rowsDark, "dark"),
    [seedsDark, rowsDark]
  );

  const seeds = editTheme === "light" ? seedsLight : seedsDark;
  const rows = editTheme === "light" ? rowsLight : rowsDark;
  const resolved = editTheme === "light" ? resolvedLight : resolvedDark;

  const setRows = editTheme === "light" ? setRowsLight : setRowsDark;
  const setSeeds = editTheme === "light" ? setSeedsLight : setSeedsDark;

  const displayValue = useCallback(
    (id: M1TokenId) => (rows[id].confirmed ? rows[id].value : resolved[id]),
    [rows, resolved]
  );

  const setSeed = (key: keyof M1ColorSeeds, v: string) => {
    if (syncSeedsAcrossThemes) {
      setSeedsLight((s) => ({ ...s, [key]: v }));
      setSeedsDark((s) => ({ ...s, [key]: v }));
    } else {
      setSeeds((s) => ({ ...s, [key]: v }));
    }
  };

  const onSyncSeedsToggle = (checked: boolean) => {
    setSyncSeedsAcrossThemes(checked);
    if (checked) {
      const source = editTheme === "light" ? seedsLight : seedsDark;
      const next = { ...source };
      setSeedsLight(next);
      setSeedsDark(next);
    }
  };

  const onConfirmToggle = (id: M1TokenId, checked: boolean) => {
    setRows((r) => {
      const seedsNow = editTheme === "light" ? seedsLight : seedsDark;
      if (checked) {
        const v = proposeM1Values(seedsNow, r, editTheme)[id];
        return { ...r, [id]: { ...r[id], confirmed: true, value: v } };
      }
      return { ...r, [id]: { ...r[id], confirmed: false } };
    });
  };

  const onValueInput = (id: M1TokenId, v: string) => {
    setRows((r) => ({ ...r, [id]: { ...r[id], value: v, confirmed: true } }));
  };

  const onColorWell = (id: M1TokenId, v: string) => {
    setRows((r) => ({ ...r, [id]: { ...r[id], value: v, confirmed: true } }));
  };

  const onRefresh = (id: M1TokenId) => {
    setRows((r) => {
      if (r[id].confirmed) return r;
      return { ...r, [id]: { ...r[id], rowVariant: r[id].rowVariant + 1 } };
    });
  };

  /** Local reset: clears only this tool's saved state and restores built-in defaults. */
  const resetColorTool = () => {
    localStorage.removeItem(STORAGE_KEY);
    setSeedsLight(DEFAULT_M1_SEEDS_LIGHT);
    setSeedsDark(DEFAULT_M1_SEEDS_DARK);
    setRowsLight(initialM1Rows(DEFAULT_M1_SEEDS_LIGHT, "light"));
    setRowsDark(initialM1Rows(DEFAULT_M1_SEEDS_DARK, "dark"));
    setSyncSeedsAcrossThemes(false);
    setEditTheme("light");
    setExportCopied(false);
  };

  const exportText = buildThemeConfigFileExport(resolvedLight, resolvedDark);

  const copyExportWithFlash = async () => {
    try {
      await navigator.clipboard.writeText(exportText);
      setExportCopied(true);
      setTimeout(() => setExportCopied(false), 2000);
    } catch {
      /* ignore */
    }
  };

  return (
    <DevWorkbenchPageShell
      nav={<DevWorkbenchNav onResetSection={resetColorTool} onTotalReset={resetColorTool} />}
    >
      <DevWorkbenchPageHeader
        eyebrow="Dev · Foundations"
        title="Colors"
        description={
          <>
            Tune <code>--pb-*</code> brand and link tokens for <strong>light</strong> and{" "}
            <strong>dark</strong>. With nothing locked, the palette tracks <strong>primary</strong>;
            lock rows for finer control. Refresh re-rolls an unlocked row. Runtime surfaces, text,
            status, charts, and sidebar tokens derive from these seeds. Copy the file into{" "}
            <code>src/app/theme/config.ts</code> (replace the whole file).
          </>
        }
        meta={
          <>
            <span className="font-medium text-foreground/90">Note:</span>{" "}
            {isFullyFluidPalette(rows) ? (
              <>
                Full-fluid mode: secondary and accent seeds are paused until you lock any token.
                Link hover still blends <code>linkAccent</code> with primary hue.
              </>
            ) : (
              <>
                Partial locks: each unlocked fill uses its matching seed; confirmed values stay
                fixed while seeds or refresh update the rest.
              </>
            )}
          </>
        }
      />

      <div className="mb-6 flex flex-wrap items-center gap-x-4 gap-y-2">
        <div className="flex flex-wrap items-center gap-3">
          <span className="font-mono text-[10px] uppercase tracking-wide text-muted-foreground">
            Edit theme
          </span>
          <div className="flex gap-1">
            {(["light", "dark"] as const).map((mode) => (
              <button
                key={mode}
                type="button"
                className={`rounded px-2 py-0.5 text-[11px] font-mono transition-colors ${
                  editTheme === mode
                    ? "bg-foreground text-background"
                    : "text-muted-foreground hover:text-foreground"
                }`}
                onClick={() => setEditTheme(mode)}
              >
                {mode === "light" ? "Light" : "Dark"}
              </button>
            ))}
          </div>
        </div>
        <label className="flex cursor-pointer select-none items-center gap-2 font-mono text-[11px] text-foreground">
          <input
            type="checkbox"
            className="h-3.5 w-3.5 rounded border-border accent-foreground"
            checked={syncSeedsAcrossThemes}
            onChange={(e) => onSyncSeedsToggle(e.target.checked)}
          />
          <span>
            Sync seeds{" "}
            <span className="text-[10px] font-normal text-muted-foreground">
              (light &amp; dark share the same seed values)
            </span>
          </span>
        </label>
      </div>

      <div className="grid grid-cols-1 gap-8 md:grid-cols-[minmax(0,1fr)_minmax(17.5rem,26.25rem)] md:items-start">
        <div className="space-y-6">
          <section className="space-y-3 rounded-lg border border-border bg-card/20 p-4">
            <p className="mb-0 font-mono text-[11px] uppercase tracking-wide text-muted-foreground">
              Global seeds · {editTheme}
            </p>
            <p className="text-[11px] leading-relaxed text-muted-foreground">
              {isFullyFluidPalette(rows) ? (
                <>
                  Primary drives generated surfaces and links. Secondary and accent fields are
                  disabled until you lock a row.
                </>
              ) : syncSeedsAcrossThemes ? (
                <>
                  Each unlocked row follows its seed. Seed edits update{" "}
                  <strong className="font-medium text-foreground/90">both</strong> light and dark
                  sets (token locks stay per theme).
                </>
              ) : (
                <>
                  Each unlocked row follows its seed. Changes apply to the {editTheme} theme only.
                </>
              )}
            </p>
            <div className="grid gap-4 sm:grid-cols-2">
              {(
                [
                  ["primary", "Primary"],
                  ["secondary", "Secondary"],
                  ["accent", "Accent"],
                  ["linkAccent", "Link accent"],
                ] as const
              ).map(([key, label]) => (
                <label
                  key={key}
                  className={`space-y-2 ${
                    isFullyFluidPalette(rows) && (key === "secondary" || key === "accent")
                      ? "opacity-50"
                      : ""
                  }`}
                >
                  <span className="font-mono text-[10px] uppercase tracking-wide text-muted-foreground">
                    {label}
                  </span>
                  <span className="flex items-center gap-2">
                    <input
                      type="color"
                      className="h-9 w-14 shrink-0 cursor-pointer rounded border border-border bg-transparent p-0 disabled:cursor-not-allowed"
                      value={hexApproxForInput(seeds[key])}
                      disabled={
                        isFullyFluidPalette(rows) && (key === "secondary" || key === "accent")
                      }
                      onChange={(e) => setSeed(key, e.target.value)}
                      aria-label={`${label} picker (${editTheme})`}
                    />
                    <input
                      type="text"
                      className="min-w-0 flex-1 rounded border border-border bg-background px-3 py-2 font-mono text-[11px] text-foreground focus:outline-none focus:ring-1 focus:ring-ring disabled:cursor-not-allowed"
                      value={seeds[key]}
                      disabled={
                        isFullyFluidPalette(rows) && (key === "secondary" || key === "accent")
                      }
                      onChange={(e) => setSeed(key, e.target.value)}
                    />
                  </span>
                </label>
              ))}
            </div>
          </section>

          <section className="overflow-x-auto rounded-lg border border-border bg-card/10">
            <table className="w-full min-w-[640px] border-collapse text-left">
              <thead>
                <tr className="border-b border-border bg-muted/30">
                  {["Token", "", "Value", "Contrast", "Lock", ""].map((h, i) => (
                    <th
                      key={i}
                      className="px-3 py-2 font-mono text-[10px] font-normal uppercase tracking-wide text-muted-foreground"
                    >
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {M1_TOKEN_IDS.map((id) => {
                  const ratio = contrastHintForToken(id, resolved);
                  const lowContrast = ratio !== undefined && ratio < 4.5;
                  return (
                    <tr key={id} className="border-b border-border/80 last:border-b-0">
                      <td className="px-3 py-2.5 align-middle">
                        <span className="text-sm font-medium text-foreground">
                          {M1_TOKEN_META[id].label}
                        </span>
                        <div className="font-mono text-[10px] text-muted-foreground">{id}</div>
                      </td>
                      <td className="px-3 py-2.5 align-middle">
                        <input
                          type="color"
                          className="h-8 w-12 cursor-pointer rounded border border-border bg-transparent p-0"
                          value={hexApproxForInput(displayValue(id))}
                          onChange={(e) => onColorWell(id, e.target.value)}
                          aria-label={`${M1_TOKEN_META[id].label} color (${editTheme})`}
                        />
                      </td>
                      <td className="max-w-[min(280px,40vw)] px-3 py-2.5 align-middle">
                        <input
                          type="text"
                          className="w-full rounded border border-border bg-background px-3 py-1.5 font-mono text-[11px] text-foreground focus:outline-none focus:ring-1 focus:ring-ring"
                          value={displayValue(id)}
                          onChange={(e) => onValueInput(id, e.target.value)}
                        />
                      </td>
                      <td className="px-3 py-2.5 align-middle font-mono text-[11px] tabular-nums text-muted-foreground">
                        {ratio != null ? (
                          <span
                            className={
                              lowContrast ? "font-medium text-amber-600 dark:text-amber-400" : ""
                            }
                          >
                            {ratio.toFixed(2)}∶1
                          </span>
                        ) : (
                          "—"
                        )}
                      </td>
                      <td className="px-3 py-2.5 align-middle">
                        <label className="flex cursor-pointer items-center gap-2 font-mono text-[11px] text-muted-foreground">
                          <input
                            type="checkbox"
                            className="rounded border-border"
                            checked={rows[id].confirmed}
                            onChange={(e) => onConfirmToggle(id, e.target.checked)}
                          />
                          Lock
                        </label>
                      </td>
                      <td className="px-3 py-2.5 align-middle">
                        <button
                          type="button"
                          className="rounded border border-border px-2.5 py-1 font-mono text-[11px] text-muted-foreground transition-colors hover:bg-muted/60 hover:text-foreground disabled:cursor-not-allowed disabled:opacity-40"
                          disabled={rows[id].confirmed}
                          title={
                            rows[id].confirmed
                              ? "Uncheck lock to try another suggestion"
                              : "Re-roll suggestion"
                          }
                          onClick={() => onRefresh(id)}
                        >
                          Refresh
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </section>

          <section className="space-y-3 rounded-lg border border-border bg-card/20 p-4">
            <div>
              <p className="font-mono text-[11px] uppercase tracking-wide text-muted-foreground">
                Preview
              </p>
              <p className="mt-1 text-[10px] leading-relaxed text-muted-foreground">
                Light and dark together —{" "}
                <strong className="font-medium text-foreground/80">hover</strong> buttons, body
                block, or link for WCAG 2.1 contrast (normal vs large text).
              </p>
            </div>
            <div className="grid gap-3 overflow-visible sm:grid-cols-2">
              <PreviewColumn label="Light (resolved)" v={resolvedLight} />
              <PreviewColumn label="Dark (resolved)" v={resolvedDark} />
            </div>
          </section>
        </div>

        <div className="md:sticky md:top-8">
          <div className="space-y-3 rounded-lg border border-border bg-card/20 p-4">
            <p className="font-mono text-[11px] uppercase tracking-wide text-muted-foreground">
              Code to paste
            </p>
            <p className="text-[10px] leading-snug text-muted-foreground">
              Replace <code className="font-mono text-[0.95em]">src/app/theme/config.ts</code>{" "}
              entirely. Layout injects{" "}
              <code className="font-mono text-[0.95em]">pbBrandCssInline()</code> after base CSS.
            </p>
            <pre className="max-h-96 overflow-x-auto overflow-y-auto whitespace-pre-wrap rounded bg-muted/40 p-3 font-mono text-[11px] leading-relaxed text-foreground">
              {exportText}
            </pre>
            <button
              type="button"
              onClick={() => void copyExportWithFlash()}
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

/** sRGB hex for native color inputs (SSR-safe). */
function hexApproxForInput(css: string): string {
  try {
    const p = parse(css);
    if (!p) return "#808080";
    return formatHex(p) ?? "#808080";
  } catch {
    return "#808080";
  }
}
