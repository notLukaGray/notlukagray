"use client";
/* eslint-disable max-lines */

import { useState, type CSSProperties } from "react";
import type { FontWeightRole } from "@/app/fonts/config";
import { FONT_WEIGHT_ROLES } from "@/app/fonts/config";
import type { TypeScaleConfig, TypeScaleEntry } from "@/app/fonts/type-scale";
import { TYPE_SCALE_LABELS } from "@/app/fonts/type-scale";
import { localRolePreviewFamily } from "@/app/dev/fonts/local-font-preview";
import type { SlotName, TypeScaleFontPreviewSlot } from "./font-type-scale-preview";

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

function wghtPreviewStyle(fontFamilyCss: string, w: number, variableFace: boolean) {
  const style: CSSProperties = { fontFamily: fontFamilyCss, fontWeight: w };
  if (variableFace) style.fontVariationSettings = `"wght" ${w}`;
  return style;
}

const SLOT_UI_LABEL: Record<SlotName, string> = {
  primary: "Primary",
  secondary: "Secondary",
  mono: "Mono",
};

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

function resolveTypeScaleSampleWeight(
  weights: TypeScaleFontPreviewSlot["weights"],
  role: FontWeightRole
): number {
  return weights[role] ?? weights.regular ?? weights.book ?? weights.light ?? 400;
}

function resolveTypeScalePreviewFamily(
  fp: TypeScaleFontPreviewSlot,
  previewFontSlot: SlotName,
  isHeading: boolean
): { family: string; useLocalRole: boolean } {
  if (!fp.localRoles) return { family: fp.family, useLocalRole: false };
  const role = isHeading ? fp.localRoles.headingRole : fp.localRoles.bodyRole;
  if (fp.weights[role] === undefined) return { family: fp.family, useLocalRole: false };
  return { family: localRolePreviewFamily(previewFontSlot, role), useLocalRole: true };
}

function resolveTypeScaleRowPreview({
  entry,
  previewBreakpoint,
  fp,
  previewFontSlot,
  scaleKey,
}: {
  entry: TypeScaleEntry;
  previewBreakpoint: TypeScalePreviewBreakpoint;
  fp: TypeScaleFontPreviewSlot;
  previewFontSlot: SlotName;
  scaleKey: keyof TypeScaleConfig;
}) {
  const isHeading = scaleKey.startsWith("heading");
  const previewFontSize = previewBreakpoint === "desktop" ? entry.sizeDesktop : entry.sizeMobile;
  const previewLineHeight =
    previewBreakpoint === "desktop" ? entry.lineHeightDesktop : entry.lineHeightMobile;
  const previewWeight = resolveTypeScaleSampleWeight(fp.weights, entry.fontWeightRole);
  const familyState = resolveTypeScalePreviewFamily(fp, previewFontSlot, isHeading);
  return {
    isHeading,
    previewFontSize,
    previewLineHeight,
    previewWeightCss: familyState.useLocalRole ? 400 : previewWeight,
    previewFamilyCss: familyState.family,
    variableForPreview: fp.variableFace && !familyState.useLocalRole,
  };
}

function TypeScaleRow({
  scaleKey,
  entry,
  previewBreakpoint,
  fp,
  previewFontSlot,
  bodySampleText,
  onUpdateEntry,
}: {
  scaleKey: keyof TypeScaleConfig;
  entry: TypeScaleEntry;
  previewBreakpoint: TypeScalePreviewBreakpoint;
  fp: TypeScaleFontPreviewSlot;
  previewFontSlot: SlotName;
  bodySampleText: string;
  onUpdateEntry: (patch: Partial<TypeScaleEntry>) => void;
}) {
  const preview = resolveTypeScaleRowPreview({
    entry,
    previewBreakpoint,
    fp,
    previewFontSlot,
    scaleKey,
  });
  return (
    <div className="border-b border-border/40 last:border-0 pb-4 last:pb-0 space-y-2">
      <p className="font-mono text-[11px] text-muted-foreground">{TYPE_SCALE_LABELS[scaleKey]}</p>
      <div
        className="text-foreground py-1"
        style={{
          ...wghtPreviewStyle(
            `'${preview.previewFamilyCss}', sans-serif`,
            preview.previewWeightCss,
            preview.variableForPreview
          ),
          fontSize: `${preview.previewFontSize}px`,
          lineHeight: `${preview.previewLineHeight}px`,
          letterSpacing: entry.letterSpacing,
          whiteSpace: "pre-line",
        }}
      >
        {preview.isHeading ? HEADING_SAMPLE : typeScaleTwoLineBody(bodySampleText)}
      </div>
      <div className="flex flex-wrap gap-4 items-end">
        <div className="flex flex-col gap-0.5 min-w-[7rem]">
          <span className="font-mono text-[10px] text-muted-foreground">Weight</span>
          <select
            value={entry.fontWeightRole}
            onChange={(e) => onUpdateEntry({ fontWeightRole: e.target.value as FontWeightRole })}
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
          onChange={(v) => onUpdateEntry({ sizeDesktop: v as number })}
        />
        <ScaleField
          label="size mobile (px)"
          value={entry.sizeMobile}
          onChange={(v) => onUpdateEntry({ sizeMobile: v as number })}
        />
        <ScaleField
          label="line height (desktop)"
          value={entry.lineHeightDesktop}
          onChange={(v) => onUpdateEntry({ lineHeightDesktop: v as number })}
        />
        <ScaleField
          label="line height (mobile)"
          value={entry.lineHeightMobile}
          onChange={(v) => onUpdateEntry({ lineHeightMobile: v as number })}
        />
        <ScaleField
          label="letter-spacing"
          value={entry.letterSpacing}
          isString
          onChange={(v) => onUpdateEntry({ letterSpacing: v as string })}
        />
      </div>
    </div>
  );
}

export function TypeScalePanel({
  scale,
  scaleKeys,
  fontPreviewBySlot,
  onUpdate,
  bodySampleText,
}: {
  scale: TypeScaleConfig;
  scaleKeys: (keyof TypeScaleConfig)[];
  fontPreviewBySlot: Record<SlotName, TypeScaleFontPreviewSlot>;
  onUpdate: (s: TypeScaleConfig) => void;
  bodySampleText: string;
}) {
  const [previewBreakpoint, setPreviewBreakpoint] = useState<TypeScalePreviewBreakpoint>("desktop");
  const [previewFontSlot, setPreviewFontSlot] = useState<SlotName>("primary");
  const fp = fontPreviewBySlot[previewFontSlot];
  const updateEntry = (key: keyof TypeScaleConfig, patch: Partial<TypeScaleEntry>) =>
    onUpdate({ ...scale, [key]: { ...scale[key], ...patch } });
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
                  className={`px-2.5 py-1 rounded text-[11px] font-mono border transition-colors ${previewFontSlot === id ? "bg-foreground text-background border-transparent" : "text-muted-foreground hover:text-foreground border-border"}`}
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
                  className={`px-2.5 py-1 rounded text-[11px] font-mono border transition-colors ${previewBreakpoint === id ? "bg-foreground text-background border-transparent" : "text-muted-foreground hover:text-foreground border-border"}`}
                >
                  {label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
      {scaleKeys.map((key) => (
        <TypeScaleRow
          key={key}
          scaleKey={key}
          entry={scale[key]}
          previewBreakpoint={previewBreakpoint}
          fp={fp}
          previewFontSlot={previewFontSlot}
          bodySampleText={bodySampleText}
          onUpdateEntry={(patch) => updateEntry(key, patch)}
        />
      ))}
    </div>
  );
}
