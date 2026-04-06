"use client";

import type { CSSProperties, RefObject } from "react";
import type { BunnyFontMeta } from "@/app/dev/fonts/page";
import type { FontWeightMap } from "@/app/fonts/config";
import { localRolePreviewFamily } from "@/app/dev/fonts/local-font-preview";
import type { LocalPreviewRuntime } from "@/app/dev/fonts/use-local-font-previews";
import { FontPicker } from "./font-picker";
import { WeightRow } from "./font-weight-row";

export type SlotName = "primary" | "secondary" | "mono";

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

const WEIGHT_NAMES: (keyof FontWeightMap)[] = ["thin", "light", "regular", "book", "bold", "black"];

function wghtPreviewStyle(fontFamilyCss: string, w: number, variableFace: boolean) {
  const style: CSSProperties = { fontFamily: fontFamilyCss, fontWeight: w };
  if (variableFace) style.fontVariationSettings = `"wght" ${w}`;
  return style;
}

function localUploadSummaryText(localLibrary: LocalPreviewRuntime): string {
  if (localLibrary.files.length === 0) return "";
  const sample = localLibrary.files
    .slice(0, 2)
    .map((f) => f.fileName)
    .join(", ");
  const suffix = localLibrary.files.length > 2 ? "…" : "";
  return ` · ${sample}${suffix}`;
}

function weightPickerHelpText(
  weightPicker: WeightPickerMode,
  catalogVariableSnapSteps: number[] | null
): string {
  if (weightPicker.kind === "localFiles") {
    return `${weightPicker.files.length} file${weightPicker.files.length === 1 ? "" : "s"}: choose which file each row uses. The number is the weight (100–900). Italic adds a second sample in faux italic if you don’t have an italic file.`;
  }
  if (weightPicker.kind === "variable") {
    if (catalogVariableSnapSteps) {
      return `This family loads separate files at: ${catalogVariableSnapSteps.join(", ")}. Typing a value in between rounds to the nearest so the preview matches what really loads (e.g. 150 → 200).`;
    }
    return `Variable weight range about ${weightPicker.wghtMin}–${weightPicker.wghtMax}. Enter a whole number in that range.`;
  }
  return `${weightPicker.options.length} weights available: ${weightPicker.options.join(", ")}. Turn on the rows you need; you can use the same weight on more than one row.`;
}

export function SlotPanelHeader({
  slot,
  state,
  fontList,
  previewMode,
  localLibrary,
  onPreviewCatalog,
  onPreviewLocal,
  onUpdate,
  previewSampleText,
  modeBadgeText,
}: {
  slot: SlotName;
  state: SlotState;
  fontList: Record<string, BunnyFontMeta>;
  previewMode: "catalog" | "local";
  localLibrary?: LocalPreviewRuntime;
  onPreviewCatalog: (family: string) => void;
  onPreviewLocal: () => void;
  onUpdate: (s: SlotState) => void;
  previewSampleText: string;
  modeBadgeText?: string;
}) {
  return (
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
          onSelectCatalog={onPreviewCatalog}
          onSelectLocal={onPreviewLocal}
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
      {modeBadgeText ? (
        <span className="font-mono text-[10px] text-muted-foreground border border-border rounded px-1.5 py-0.5">
          {modeBadgeText}
        </span>
      ) : null}
    </div>
  );
}

export function SlotPanelUploads({
  fileRef,
  localLibrary,
  onLocalUploadFiles,
  onClearLocal,
}: {
  fileRef: RefObject<HTMLInputElement | null>;
  localLibrary?: LocalPreviewRuntime;
  onLocalUploadFiles: (files: File[]) => void;
  onClearLocal: () => void;
}) {
  const hasLocalFiles = Boolean(localLibrary && localLibrary.files.length > 0);
  return (
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
        {hasLocalFiles && localLibrary ? (
          <>
            <span
              className="text-[11px] font-mono text-muted-foreground truncate max-w-[min(100%,18rem)]"
              title={localLibrary.files.map((f) => f.fileName).join(", ")}
            >
              {localLibrary.files.length} file{localLibrary.files.length === 1 ? "" : "s"}
              {localUploadSummaryText(localLibrary)}
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
  );
}

export function SlotPanelActiveWeightPreview({
  slot,
  state,
  weightPicker,
  previewFamily,
  previewSampleText,
}: {
  slot: SlotName;
  state: SlotState;
  weightPicker: WeightPickerMode;
  previewFamily: string;
  previewSampleText: string;
}) {
  const visibleWeights = WEIGHT_NAMES.filter((name) => state.weights[name] !== undefined);
  if (visibleWeights.length === 0) {
    return (
      <div className="space-y-2.5 py-3 border-y border-border/40">
        <p className="text-sm text-muted-foreground py-1">
          Turn on weights below — each line shows that weight in the sample.
        </p>
      </div>
    );
  }
  return (
    <div className="space-y-2.5 py-3 border-y border-border/40">
      {visibleWeights.map((name) => {
        const w = state.weights[name]!;
        const previewFace =
          weightPicker.kind === "localFiles" ? localRolePreviewFamily(slot, name) : previewFamily;
        const previewWeight = weightPicker.kind === "localFiles" ? 400 : w;
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
                `'${previewFace}', sans-serif`,
                previewWeight,
                weightPicker.kind === "variable"
              )}
            >
              {previewSampleText}
            </p>
          </div>
        );
      })}
    </div>
  );
}

export function SlotPanelWeightsEditor({
  slot,
  state,
  previewFamily,
  previewSampleText,
  weightPicker,
  catalogVariableSnapSteps,
  setLocalRoleFile,
  toggleLocalRole,
  updateSemanticWeight,
  resolveDefaultOnCheck,
  staticOptionLabel,
}: {
  slot: SlotName;
  state: SlotState;
  previewFamily: string;
  previewSampleText: string;
  weightPicker: WeightPickerMode;
  catalogVariableSnapSteps: number[] | null;
  setLocalRoleFile: (name: keyof FontWeightMap, fileName: string) => void;
  toggleLocalRole: (name: keyof FontWeightMap, enabled: boolean) => void;
  updateSemanticWeight: (name: keyof FontWeightMap, value: number | undefined) => void;
  resolveDefaultOnCheck: (
    name: keyof FontWeightMap,
    allWeights: FontWeightMap,
    weightPicker: WeightPickerMode
  ) => number;
  staticOptionLabel: (w: number, rowName: keyof FontWeightMap, allWeights: FontWeightMap) => string;
}) {
  return (
    <div>
      <p className="font-mono text-[11px] text-muted-foreground mb-1 uppercase tracking-wide">
        Weights
      </p>
      <p className="text-[10px] text-muted-foreground mb-2 leading-snug">
        {weightPickerHelpText(weightPicker, catalogVariableSnapSteps)}
      </p>
      {WEIGHT_NAMES.map((name) => (
        <WeightRow
          key={name}
          name={name}
          value={state.weights[name]}
          allWeights={state.weights}
          family={
            weightPicker.kind === "localFiles" ? localRolePreviewFamily(slot, name) : previewFamily
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
          defaultOnCheck={resolveDefaultOnCheck(name, state.weights, weightPicker)}
          staticOptionLabel={staticOptionLabel}
        />
      ))}
    </div>
  );
}
