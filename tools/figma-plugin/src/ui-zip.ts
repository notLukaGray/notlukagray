/**
 * ZIP packaging: assembles pages, presets, modals, modules, globals, assets,
 * and export notes into a downloadable archive via JSZip.
 */

import JSZip from "jszip";
import type { ExportResult } from "./types/figma-plugin";
import { generateExportNotes } from "./ui-export-notes";

/**
 * Builds a ZIP blob from a completed ExportResult.
 * Includes all output files and export-notes.txt.
 */
export async function buildExportZip(
  result: ExportResult,
  errors: string[],
  warningCount: number,
  infoCount: number
): Promise<Blob> {
  const zip = new JSZip();

  for (const [key, page] of Object.entries(result.pages)) {
    zip.file(`pages/${key}.json`, JSON.stringify(page, null, 2));
  }
  for (const [key, preset] of Object.entries(result.presets)) {
    zip.file(`presets/${key}.json`, JSON.stringify(preset, null, 2));
  }
  for (const [key, modal] of Object.entries(result.modals)) {
    zip.file(`modals/${key}.json`, JSON.stringify(modal, null, 2));
  }
  for (const [key, mod] of Object.entries(result.modules)) {
    zip.file(`modules/${key}.json`, JSON.stringify(mod, null, 2));
  }

  const hasGlobals =
    Object.keys(result.globals.buttons ?? {}).length > 0 ||
    Object.keys(result.globals.backgrounds ?? {}).length > 0 ||
    Object.keys(result.globals.elements ?? {}).length > 0;

  if (hasGlobals) {
    const globalsObj: Record<string, unknown> = {};
    if (result.globals.buttons && Object.keys(result.globals.buttons).length > 0) {
      globalsObj.buttons = result.globals.buttons;
    }
    if (result.globals.backgrounds && Object.keys(result.globals.backgrounds).length > 0) {
      globalsObj.backgrounds = result.globals.backgrounds;
    }
    if (result.globals.elements && Object.keys(result.globals.elements).length > 0) {
      globalsObj.elements = result.globals.elements;
    }
    zip.file("globals.json", JSON.stringify(globalsObj, null, 2));
  }

  zip.file("export-notes.txt", generateExportNotes(result, errors, warningCount, infoCount));
  if (result.trace) {
    zip.file("export-trace.json", JSON.stringify(result.trace, null, 2));
  }

  for (const asset of result.assets) {
    zip.file(asset.filename, asset.data);
  }

  return zip.generateAsync({ type: "blob" });
}
