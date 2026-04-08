import fs from "fs";
import path from "path";
import { isSafePathSegment, resolvePathUnder } from "../page-builder-paths";
import type { PageBuilderDefinitionBlock } from "@pb/contracts";
import {
  readJsonFileSafe,
  readJsonFileSafeAsync,
  coercePresetMap,
  CONTENT_DIR,
} from "./page-builder-load-io";

const PRESETS_PATH = path.join(CONTENT_DIR, "data/presets.json");
const PRESETS_DIR = path.join(CONTENT_DIR, "presets");

function isSingleBlock(data: unknown): data is Record<string, unknown> {
  return (
    data != null && typeof data === "object" && !Array.isArray(data) && "type" in (data as object)
  );
}

function loadPresetFiles(files: string[]): Record<string, PageBuilderDefinitionBlock> {
  const presets: Record<string, PageBuilderDefinitionBlock> = {};
  for (const entry of files) {
    const file = typeof entry === "string" ? entry : null;
    if (!file) continue;
    const basename = path.basename(file, ".json");
    if (!isSafePathSegment(basename)) continue;
    const filePath = resolvePathUnder(PRESETS_DIR, `${basename}.json`);
    if (!filePath || !fs.existsSync(filePath)) continue;
    const data = readJsonFileSafe(filePath);
    if (data === null) continue;
    if (isSingleBlock(data)) {
      presets[basename] = data as PageBuilderDefinitionBlock;
    } else {
      Object.assign(presets, coercePresetMap(data));
    }
  }
  return presets;
}

/** Async: read preset files in parallel. */
async function loadPresetFilesAsync(
  files: string[]
): Promise<Record<string, PageBuilderDefinitionBlock>> {
  const presets: Record<string, PageBuilderDefinitionBlock> = {};
  const entries = files
    .filter((entry): entry is string => typeof entry === "string")
    .map((file) => {
      const basename = path.basename(file, ".json");
      const filePath = isSafePathSegment(basename)
        ? resolvePathUnder(PRESETS_DIR, `${basename}.json`)
        : null;
      return { basename, filePath };
    })
    .filter((item): item is { basename: string; filePath: string } => item.filePath != null);

  const results = await Promise.all(
    entries.map(async ({ basename, filePath }) => {
      try {
        const data = await readJsonFileSafeAsync(filePath);
        if (data === null) return null;
        if (isSingleBlock(data)) {
          return { basename, data: data as PageBuilderDefinitionBlock };
        }
        return { basename, map: coercePresetMap(data) };
      } catch {
        return null;
      }
    })
  );
  for (const r of results) {
    if (!r) continue;
    if ("data" in r) presets[r.basename] = r.data as PageBuilderDefinitionBlock;
    else Object.assign(presets, r.map);
  }
  return presets;
}

function loadGlobalPresets(): Record<string, PageBuilderDefinitionBlock> {
  const data = readJsonFileSafe(PRESETS_PATH);
  if (data === null) return {};
  const obj = data as Record<string, unknown>;
  const loadList = obj.load;
  if (Array.isArray(loadList) && loadList.length > 0) {
    return loadPresetFiles(loadList as string[]);
  }
  return coercePresetMap(data);
}

async function loadGlobalPresetsAsync(): Promise<Record<string, PageBuilderDefinitionBlock>> {
  const data = await readJsonFileSafeAsync(PRESETS_PATH);
  if (data === null) return {};
  const obj = data as Record<string, unknown>;
  const loadList = obj.load;
  if (Array.isArray(loadList) && loadList.length > 0) {
    return loadPresetFilesAsync(loadList as string[]);
  }
  return coercePresetMap(data);
}

export function buildPresets(
  withSlug: Record<string, unknown>
): Record<string, PageBuilderDefinitionBlock> {
  const presets = { ...loadGlobalPresets() };
  const pagePresetFiles = withSlug.presets as string[] | undefined;
  if (Array.isArray(pagePresetFiles) && pagePresetFiles.length > 0) {
    Object.assign(presets, loadPresetFiles(pagePresetFiles));
  }
  const inlinePresets = withSlug.preset as Record<string, unknown> | undefined;
  if (inlinePresets && typeof inlinePresets === "object") {
    Object.assign(presets, coercePresetMap(inlinePresets));
  }
  return presets;
}

export async function buildPresetsAsync(
  withSlug: Record<string, unknown>
): Promise<Record<string, PageBuilderDefinitionBlock>> {
  const presets = { ...(await loadGlobalPresetsAsync()) };
  const pagePresetFiles = withSlug.presets as string[] | undefined;
  if (Array.isArray(pagePresetFiles) && pagePresetFiles.length > 0) {
    Object.assign(presets, await loadPresetFilesAsync(pagePresetFiles));
  }
  const inlinePresets = withSlug.preset as Record<string, unknown> | undefined;
  if (inlinePresets && typeof inlinePresets === "object") {
    Object.assign(presets, coercePresetMap(inlinePresets));
  }
  return presets;
}
