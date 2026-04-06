"use client";
/* eslint-disable max-lines */

import { useState, type CSSProperties } from "react";
import type { FontWeightMap } from "@/app/fonts/config";
import type { LocalPreviewFileRuntime } from "@/app/dev/fonts/use-local-font-previews";

type WeightPickerMode =
  | { kind: "variable"; wghtMin: number; wghtMax: number }
  | { kind: "static"; options: number[] }
  | { kind: "localFiles"; files: LocalPreviewFileRuntime[] };

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
  if (variableFace) s.fontVariationSettings = `"wght" ${w}`;
  return s;
}

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
  const commitFromText = (raw: string) => {
    const t = raw.trim();
    if (t === "") return void setText(String(weight));
    const n = Number(t);
    if (!Number.isFinite(n)) return void setText(String(weight));
    let v = clampWght(n, wghtMin, wghtMax);
    if (catalogSnapSteps && catalogSnapSteps.length >= 2)
      v = snapWghtToCatalogSteps(v, catalogSnapSteps);
    onCommit(v);
    setText(String(v));
  };
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
      onFocus={() => setText(String(weight))}
      onBlur={() => commitFromText(text)}
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

function WeightRowValueControl({
  name,
  value,
  defined,
  allWeights,
  weightPicker,
  catalogVariableSnapSteps,
  localRoleFileName,
  onLocalRoleFileChange,
  onChange,
  staticOptionLabel,
}: {
  name: keyof FontWeightMap;
  value: number | undefined;
  defined: boolean;
  allWeights: FontWeightMap;
  weightPicker: WeightPickerMode;
  catalogVariableSnapSteps: number[] | null;
  localRoleFileName?: string;
  onLocalRoleFileChange?: (fileName: string) => void;
  onChange: (v: number | undefined) => void;
  staticOptionLabel: (w: number, rowName: keyof FontWeightMap, allWeights: FontWeightMap) => string;
}) {
  if (!defined || value === undefined) return null;
  if (weightPicker.kind === "localFiles") {
    return (
      <>
        {onLocalRoleFileChange ? (
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
        ) : null}
        <VariableWeightInput
          weight={value}
          wghtMin={100}
          wghtMax={900}
          catalogSnapSteps={null}
          onCommit={(n) => onChange(n)}
          className="w-[4.5rem] rounded border border-border bg-background px-2 py-0.5 text-sm font-mono text-foreground focus:outline-none focus:ring-1 focus:ring-ring"
        />
      </>
    );
  }
  if (weightPicker.kind === "variable") {
    return (
      <VariableWeightInput
        key={`${weightPicker.wghtMin}-${weightPicker.wghtMax}-${value}`}
        weight={value}
        wghtMin={weightPicker.wghtMin}
        wghtMax={weightPicker.wghtMax}
        catalogSnapSteps={catalogVariableSnapSteps}
        onCommit={(n) => onChange(n)}
        className="w-[4.5rem] rounded border border-border bg-background px-2 py-0.5 text-sm font-mono text-foreground focus:outline-none focus:ring-1 focus:ring-ring"
      />
    );
  }
  return (
    <select
      value={value}
      onChange={(e) => onChange(Number(e.target.value))}
      title="Pick a weight from this family. You can use the same weight on more than one row."
      className="min-w-[8.5rem] max-w-[14rem] rounded border border-border bg-background px-2 py-0.5 text-sm font-mono text-foreground focus:outline-none focus:ring-1 focus:ring-ring"
    >
      {weightPicker.options.map((w) => (
        <option key={w} value={w}>
          {staticOptionLabel(w, name, allWeights)}
        </option>
      ))}
    </select>
  );
}

export function WeightRow({
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
  defaultOnCheck,
  staticOptionLabel,
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
  defaultOnCheck: number;
  staticOptionLabel: (w: number, rowName: keyof FontWeightMap, allWeights: FontWeightMap) => string;
}) {
  const defined = value !== undefined;
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
      <WeightRowValueControl
        name={name}
        value={value}
        defined={defined}
        allWeights={allWeights}
        weightPicker={weightPicker}
        catalogVariableSnapSteps={catalogVariableSnapSteps}
        localRoleFileName={localRoleFileName}
        onLocalRoleFileChange={onLocalRoleFileChange}
        onChange={onChange}
        staticOptionLabel={staticOptionLabel}
      />
      {defined ? (
        <>
          <p
            className="flex-1 min-w-0 truncate text-foreground text-sm"
            style={{
              ...wghtPreviewStyle(`'${family}', sans-serif`, previewWeight, rowVariableFace),
            }}
          >
            {sampleText}
          </p>
          {italic ? (
            <p
              className="hidden md:block flex-1 min-w-0 truncate text-muted-foreground text-sm italic"
              style={{
                ...wghtPreviewStyle(`'${family}', sans-serif`, previewWeight, rowVariableFace),
                fontStyle: "italic",
              }}
            >
              {sampleText}
            </p>
          ) : null}
        </>
      ) : null}
    </div>
  );
}
