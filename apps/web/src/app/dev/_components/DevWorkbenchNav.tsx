"use client";

import { usePathname } from "next/navigation";
import { useCallback, useEffect, useRef, useState, type ChangeEvent } from "react";
import { confirmAndClearAllDevToolStorage } from "@/app/dev/_components/dev-reset";
import {
  DEV_WORKBENCH_NAV_GROUPS,
  DevWorkbenchNavDropdown,
} from "@/app/dev/_components/dev-workbench-nav-groups";
import {
  exportWorkbenchSessionJson,
  importWorkbenchSessionFromJson,
  importWorkbenchProductionDefaults,
  loadWorkbenchBookmark,
  saveWorkbenchBookmark,
} from "@/app/dev/workbench/workbench-session";

type Props = {
  onResetSection?: () => void;
  onTotalReset?: () => void;
};

const persistBtnClass =
  "inline-flex items-center rounded border px-2.5 py-1.5 text-[11px] font-mono transition-colors border-border text-muted-foreground hover:bg-muted/60 hover:text-foreground";

type Flash = { kind: "success" | "error"; text: string } | null;

export function DevWorkbenchNav({ onResetSection, onTotalReset }: Props) {
  const pathname = usePathname() ?? "";
  const [flash, setFlash] = useState<Flash>(null);
  const importRef = useRef<HTMLInputElement>(null);
  const flashTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const showFlash = useCallback((next: Flash) => {
    if (flashTimerRef.current) clearTimeout(flashTimerRef.current);
    setFlash(next);
    if (next) {
      flashTimerRef.current = setTimeout(() => setFlash(null), 4500);
    }
  }, []);

  useEffect(
    () => () => {
      if (flashTimerRef.current) clearTimeout(flashTimerRef.current);
    },
    []
  );

  const onSaveBookmark = useCallback(() => {
    saveWorkbenchBookmark();
    showFlash({ kind: "success", text: "Snapshot saved in this browser" });
  }, [showFlash]);

  const onLoadBookmark = useCallback(() => {
    const r = loadWorkbenchBookmark();
    if (r.ok) showFlash({ kind: "success", text: "Snapshot loaded" });
    else showFlash({ kind: "error", text: r.error });
  }, [showFlash]);

  const onExport = useCallback(() => {
    try {
      const text = exportWorkbenchSessionJson();
      const blob = new Blob([text], { type: "application/json" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "workbench-session.json";
      a.click();
      URL.revokeObjectURL(url);
      showFlash({ kind: "success", text: "Session file saved" });
    } catch {
      showFlash({ kind: "error", text: "Could not export file" });
    }
  }, [showFlash]);

  const onPickImport = useCallback(() => importRef.current?.click(), []);

  const onImportProduction = useCallback(() => {
    importWorkbenchProductionDefaults();
    showFlash({ kind: "success", text: "Loaded current production defaults" });
  }, [showFlash]);

  const onImportFile = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      e.target.value = "";
      if (!file) return;
      const reader = new FileReader();
      reader.onload = () => {
        const text = typeof reader.result === "string" ? reader.result : "";
        const r = importWorkbenchSessionFromJson(text);
        if (r.ok) showFlash({ kind: "success", text: "Session imported" });
        else showFlash({ kind: "error", text: r.error });
      };
      reader.onerror = () => showFlash({ kind: "error", text: "Could not read file" });
      reader.readAsText(file);
    },
    [showFlash]
  );

  return (
    <nav className="mb-6 w-full rounded-lg border border-border/80 bg-card/20 p-3">
      <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <div className="flex flex-wrap items-center gap-2">
          {DEV_WORKBENCH_NAV_GROUPS.map((group) => (
            <DevWorkbenchNavDropdown key={group.title} group={group} pathname={pathname} />
          ))}
        </div>

        <div className="flex flex-col items-stretch gap-2 sm:items-end">
          <div className="flex flex-wrap items-center justify-end gap-2">
            <button
              type="button"
              onClick={onSaveBookmark}
              className={persistBtnClass}
              title="Save current dev workbench session to a named slot in this browser"
            >
              Save
            </button>
            <button
              type="button"
              onClick={onLoadBookmark}
              className={persistBtnClass}
              title="Restore the last Save snapshot (overwrites live session)"
            >
              Load
            </button>
            <button
              type="button"
              onClick={onExport}
              className={persistBtnClass}
              title="Download workbench session as a JSON file"
            >
              Export
            </button>
            <button
              type="button"
              onClick={onPickImport}
              className={persistBtnClass}
              title="Replace live session from a JSON file (invalid files are rejected)"
              aria-label="Import workbench session JSON file"
            >
              Import
            </button>
            <button
              type="button"
              onClick={onImportProduction}
              className={persistBtnClass}
              title="Replace live session using current production config defaults"
            >
              Import Prod
            </button>
            <input
              ref={importRef}
              type="file"
              accept="application/json,.json"
              className="sr-only"
              tabIndex={-1}
              onChange={onImportFile}
              aria-hidden
            />
            <button
              type="button"
              onClick={onResetSection}
              disabled={!onResetSection}
              className={`inline-flex items-center rounded border px-3 py-1.5 text-[11px] font-mono transition-colors ${
                onResetSection
                  ? "border-border text-muted-foreground hover:bg-muted/60 hover:text-foreground"
                  : "cursor-not-allowed border-border/50 text-muted-foreground/50"
              }`}
              title={
                onResetSection ? "Reset this section only" : "No local state in this section yet"
              }
            >
              Reset Section
            </button>
            <button
              type="button"
              onClick={() => {
                if (!confirmAndClearAllDevToolStorage()) return;
                onTotalReset?.();
              }}
              className="inline-flex items-center rounded border border-destructive/40 bg-background px-3 py-1.5 text-[11px] font-mono text-destructive transition-colors hover:bg-destructive/10 hover:text-destructive"
              title="Clear workbench session, bookmark, and all legacy dev keys"
            >
              Total reset
            </button>
          </div>
          {flash ? (
            <p
              role="status"
              className={`text-right text-[11px] font-mono leading-snug ${
                flash.kind === "error"
                  ? "text-destructive"
                  : "text-emerald-800 dark:text-emerald-400"
              }`}
            >
              {flash.text}
            </p>
          ) : null}
        </div>
      </div>
    </nav>
  );
}
