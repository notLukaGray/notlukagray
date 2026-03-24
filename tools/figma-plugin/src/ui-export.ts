/**
 * Export result handling, clipboard copy, and button event wiring.
 */

import type { ExportResult, UIToMainMessage } from "./types/figma-plugin";
import type { FramePreviewItem } from "./ui-state";
import { collectOverrides } from "./ui-state";
import { buildExportZip } from "./ui-zip";
export { setStatus, setWarnings, setSummary } from "./ui-status";
import { setStatus, setWarnings, setSummary } from "./ui-status";

// ---------------------------------------------------------------------------
// DOM element references (assembled by ui.ts at init)
// ---------------------------------------------------------------------------

export interface UIElements {
  exportBtn: HTMLButtonElement;
  actionRowEl: HTMLDivElement;
  copyJsonBtn: HTMLButtonElement;
  downloadBtn: HTMLButtonElement;
  statusEl: HTMLDivElement;
  summaryEl: HTMLDivElement;
  warningsEl: HTMLDivElement;
  previewEl: HTMLDivElement;
  autoPresetToggle: HTMLInputElement;
}

// ---------------------------------------------------------------------------
// Module-level state
// ---------------------------------------------------------------------------

export let pendingResult: ExportResult | null = null;
export let pendingBlob: Blob | null = null;

export function setPendingResult(r: ExportResult | null): void {
  pendingResult = r;
}
export function setPendingBlob(b: Blob | null): void {
  pendingBlob = b;
}

// ---------------------------------------------------------------------------
// Message sending
// ---------------------------------------------------------------------------

export function sendToMain(msg: UIToMainMessage): void {
  parent.postMessage({ pluginMessage: msg }, "*");
}

// ---------------------------------------------------------------------------
// Clipboard
// ---------------------------------------------------------------------------

export async function copyToClipboard(text: string): Promise<void> {
  // execCommand is synchronous — it runs within the user-gesture context of the
  // originating click. navigator.clipboard.writeText() is async, so by the time
  // it resolves/rejects the gesture context may have expired (especially inside
  // Figma's sandboxed data: URL iframe). Try execCommand first.
  try {
    const ta = document.createElement("textarea");
    ta.value = text;
    ta.style.position = "fixed";
    ta.style.left = "-9999px";
    ta.style.top = "-9999px";
    document.body.appendChild(ta);
    ta.focus();
    ta.select();
    const ok = document.execCommand("copy");
    document.body.removeChild(ta);
    if (ok) return;
  } catch {
    // execCommand unavailable — fall through to Clipboard API
  }
  await navigator.clipboard.writeText(text);
}

export function flashCopied(copyJsonBtn: HTMLButtonElement): void {
  copyJsonBtn.classList.add("copied");
  copyJsonBtn.textContent = "Copied!";
  setTimeout(() => {
    copyJsonBtn.classList.remove("copied");
    copyJsonBtn.textContent = "Copy JSON";
  }, 1500);
}

// ---------------------------------------------------------------------------
// Result handler
// ---------------------------------------------------------------------------

export async function handleResult(
  els: UIElements,
  result: ExportResult,
  errors: string[],
  warningCount: number,
  infoCount: number,
  mode: "copy" | "zip" = "zip"
): Promise<void> {
  setWarnings(els.warningsEl, result.warnings);

  if (errors.length > 0) {
    const errDiv = document.createElement("div");
    errDiv.className = "export-error-summary";
    errDiv.textContent = `${errors.length} error${errors.length !== 1 ? "s" : ""} during export — output may be incomplete`;
    els.warningsEl.prepend(errDiv);
  }

  const hasAnyContent =
    Object.keys(result.pages).length > 0 ||
    Object.keys(result.presets).length > 0 ||
    Object.keys(result.modals).length > 0 ||
    Object.keys(result.modules).length > 0 ||
    Object.keys(result.globals.buttons ?? {}).length > 0 ||
    Object.keys(result.globals.backgrounds ?? {}).length > 0 ||
    Object.keys(result.globals.elements ?? {}).length > 0;

  if (!hasAnyContent) {
    setStatus(els.statusEl, "Export produced no content.", "error");
    return;
  }

  if (mode === "copy") {
    setPendingResult(result);
    const pageCount = Object.keys(result.pages).length;
    const statusMsg =
      errors.length > 0
        ? `Done with ${errors.length} error${errors.length !== 1 ? "s" : ""} — JSON copied`
        : `Done! Exported ${pageCount} page(s).`;
    try {
      await copyToClipboard(resultToJson(result));
      setStatus(els.statusEl, statusMsg, errors.length > 0 ? "error" : "success");
      flashCopied(els.copyJsonBtn);
    } catch (err) {
      setStatus(els.statusEl, `Copy failed: ${String(err)}`, "error");
    }
    setSummary(els.summaryEl, result);
    els.actionRowEl.style.display = "flex";
    return;
  }

  // ZIP mode
  setPendingResult(result);
  setStatus(els.statusEl, "Packaging ZIP…");
  try {
    const blob = await buildExportZip(result, errors, warningCount, infoCount);
    setPendingBlob(blob);
    const pageCount = Object.keys(result.pages).length;
    const statusMsg =
      errors.length > 0
        ? `Done with ${errors.length} error${errors.length !== 1 ? "s" : ""} — check export-notes.txt`
        : `Done! Exported ${pageCount} page(s) and ${result.assets.length} asset(s).`;
    setStatus(els.statusEl, statusMsg, errors.length > 0 ? "error" : "success");
    setSummary(els.summaryEl, result);
    els.actionRowEl.style.display = "flex";
  } catch (err) {
    setStatus(els.statusEl, `ZIP packaging failed: ${String(err)}`, "error");
  }
}

// ---------------------------------------------------------------------------
// Button wiring
// ---------------------------------------------------------------------------

export function wireExportButton(
  els: UIElements,
  getCurrentFrames: () => FramePreviewItem[]
): void {
  els.exportBtn.addEventListener("click", () => {
    els.exportBtn.disabled = true;
    setPendingResult(null);
    setPendingBlob(null);
    els.actionRowEl.style.display = "none";
    els.summaryEl.style.display = "none";
    els.previewEl.style.display = "none";
    setStatus(els.statusEl, "Starting export…");
    els.warningsEl.innerHTML = "";
    const { targetOverrides, annotationOverrides, cdnPrefixOverrides } =
      collectOverrides(getCurrentFrames());
    sendToMain({
      type: "export",
      targetOverrides,
      annotationOverrides,
      cdnPrefixOverrides,
      autoPresets: els.autoPresetToggle.checked,
    });
  });
}

/** Strip binary asset data before serialising — Uint8Array is useless in JSON. */
function resultToJson(result: ExportResult): string {
  const copy = {
    ...result,
    assets: result.assets.map((a) => ({ filename: a.filename })),
  };
  return JSON.stringify(copy, null, 2);
}

export function wireCopyJsonButton(
  els: UIElements,
  getCurrentFrames: () => FramePreviewItem[]
): void {
  els.copyJsonBtn.addEventListener("click", () => {
    if (pendingResult) {
      void copyToClipboard(resultToJson(pendingResult)).then(() => flashCopied(els.copyJsonBtn));
      return;
    }
    els.copyJsonBtn.disabled = true;
    els.copyJsonBtn.textContent = "Exporting…";
    const { targetOverrides, annotationOverrides, cdnPrefixOverrides } =
      collectOverrides(getCurrentFrames());
    sendToMain({
      type: "export",
      mode: "copy",
      targetOverrides,
      annotationOverrides,
      cdnPrefixOverrides,
      autoPresets: els.autoPresetToggle.checked,
    });
  });
}

export function wireDownloadButton(
  els: UIElements,
  getCurrentFrames: () => FramePreviewItem[]
): void {
  els.downloadBtn.addEventListener("click", () => {
    if (!pendingBlob) {
      els.exportBtn.disabled = true;
      els.actionRowEl.style.display = "none";
      els.summaryEl.style.display = "none";
      els.previewEl.style.display = "none";
      setStatus(els.statusEl, "Starting export…");
      els.warningsEl.innerHTML = "";
      const { targetOverrides, annotationOverrides, cdnPrefixOverrides } =
        collectOverrides(getCurrentFrames());
      sendToMain({
        type: "export",
        mode: "zip",
        targetOverrides,
        annotationOverrides,
        cdnPrefixOverrides,
        autoPresets: els.autoPresetToggle.checked,
      });
      return;
    }
    const url = URL.createObjectURL(pendingBlob);
    const anchor = document.createElement("a");
    anchor.href = url;
    anchor.download = "page-builder-export.zip";
    anchor.click();
    URL.revokeObjectURL(url);
  });
}
