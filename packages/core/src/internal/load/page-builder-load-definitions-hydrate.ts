import fs from "fs";
import fsPromises from "fs/promises";
import path from "path";
import type { PageBuilderDefinitionBlock } from "@pb/contracts";
import { isSafePathSegment, resolvePathUnder } from "../page-builder-paths";
import { parseJsonSafe, PAGE_DATA_DIR } from "./page-builder-load-io";
import { mergeNestedSectionDefinitions } from "./page-builder-load-definitions-merge";

function warnDuplicateFragmentKeys(dupes: Map<string, string[]>): void {
  if (process.env.NODE_ENV !== "development" || dupes.size === 0) return;
  for (const [key, files] of dupes.entries()) {
    console.warn(`[page-builder] duplicate fragment key "${key}" in: ${files.join(", ")}`);
  }
}

function sectionPath(slugSegments: string[], key: string): string | null {
  return resolvePathUnder(PAGE_DATA_DIR, ...slugSegments, `${key}.json`);
}

function readJsonFile(filePath: string): Record<string, unknown> | null {
  const raw = fs.readFileSync(filePath, "utf-8");
  const result = parseJsonSafe<Record<string, unknown>>(raw);
  return result.ok && result.data && typeof result.data === "object" ? result.data : null;
}

async function readJsonFileAsync(filePath: string): Promise<Record<string, unknown> | null> {
  const raw = await fsPromises.readFile(filePath, "utf-8");
  const result = parseJsonSafe<Record<string, unknown>>(raw);
  return result.ok && result.data && typeof result.data === "object" ? result.data : null;
}

type Fragment = { file: string; data: Record<string, unknown> };

function mergeFragments(
  definitions: Record<string, PageBuilderDefinitionBlock>,
  fragments: Fragment[],
  sectionSet: ReadonlySet<string>
): void {
  const keySources = new Map<string, string[]>();
  for (const fragment of fragments) {
    for (const [key, value] of Object.entries(fragment.data)) {
      if (sectionSet.has(key)) continue;
      if (value && typeof value === "object" && !Array.isArray(value) && "type" in value) {
        definitions[key] = value as PageBuilderDefinitionBlock;
        const list = keySources.get(key) ?? [];
        list.push(fragment.file);
        keySources.set(key, list);
      }
    }
  }
  const dupes = new Map<string, string[]>();
  for (const [key, files] of keySources.entries()) {
    if (files.length > 1) dupes.set(key, files);
  }
  warnDuplicateFragmentKeys(dupes);
}

function listJsonFilesSorted(dir: string): string[] {
  return fs
    .readdirSync(dir)
    .filter((file) => file.endsWith(".json"))
    .sort((a, b) => a.localeCompare(b));
}

export function hydrateSectionFilesBySegments(
  definitions: Record<string, PageBuilderDefinitionBlock>,
  slugSegments: string[],
  sectionOrder: string[]
): Record<string, PageBuilderDefinitionBlock> {
  for (const seg of slugSegments) if (!isSafePathSegment(seg)) return definitions;
  const slugDir = resolvePathUnder(PAGE_DATA_DIR, ...slugSegments);
  if (!slugDir || !fs.existsSync(slugDir) || !fs.statSync(slugDir).isDirectory())
    return definitions;

  const sectionSet = new Set(sectionOrder);
  for (const key of sectionOrder) {
    if (!isSafePathSegment(key) || definitions[key] != null) continue;
    const filePath = sectionPath(slugSegments, key);
    if (!filePath || !fs.existsSync(filePath)) continue;
    const sectionData = readJsonFile(filePath);
    if (!sectionData) continue;
    mergeNestedSectionDefinitions(
      definitions,
      sectionData.definitions as Record<string, unknown>,
      sectionSet
    );
    definitions[key] = sectionData as PageBuilderDefinitionBlock;
  }

  const fragments: Fragment[] = [];
  for (const file of listJsonFilesSorted(slugDir)) {
    const basename = path.basename(file, ".json");
    if (!isSafePathSegment(basename)) continue;
    if (basename === "index" || sectionSet.has(basename) || basename.endsWith("-sections"))
      continue;
    const filePath = resolvePathUnder(PAGE_DATA_DIR, ...slugSegments, file);
    if (!filePath || !fs.existsSync(filePath) || !fs.statSync(filePath).isFile()) continue;
    const data = readJsonFile(filePath);
    if (data) fragments.push({ file, data });
  }
  mergeFragments(definitions, fragments, sectionSet);
  return definitions;
}

export async function hydrateSectionFilesBySegmentsAsync(
  definitions: Record<string, PageBuilderDefinitionBlock>,
  slugSegments: string[],
  sectionOrder: string[]
): Promise<Record<string, PageBuilderDefinitionBlock>> {
  for (const seg of slugSegments) if (!isSafePathSegment(seg)) return definitions;
  const slugDir = resolvePathUnder(PAGE_DATA_DIR, ...slugSegments);
  if (!slugDir) return definitions;
  try {
    const stat = await fsPromises.stat(slugDir);
    if (!stat.isDirectory()) return definitions;
  } catch {
    return definitions;
  }

  const sectionSet = new Set(sectionOrder);
  for (const key of sectionOrder) {
    if (!isSafePathSegment(key) || definitions[key] != null) continue;
    const filePath = sectionPath(slugSegments, key);
    if (!filePath) continue;
    const sectionData = await readJsonFileAsync(filePath).catch(() => null);
    if (!sectionData) continue;
    mergeNestedSectionDefinitions(
      definitions,
      sectionData.definitions as Record<string, unknown>,
      sectionSet
    );
    definitions[key] = sectionData as PageBuilderDefinitionBlock;
  }

  const files = (await fsPromises.readdir(slugDir))
    .filter((file) => file.endsWith(".json"))
    .sort((a, b) => a.localeCompare(b));
  const fragments: Fragment[] = [];
  for (const file of files) {
    const basename = path.basename(file, ".json");
    if (!isSafePathSegment(basename)) continue;
    if (basename === "index" || sectionSet.has(basename) || basename.endsWith("-sections"))
      continue;
    const filePath = resolvePathUnder(PAGE_DATA_DIR, ...slugSegments, file);
    if (!filePath) continue;
    const data = await readJsonFileAsync(filePath).catch(() => null);
    if (data) fragments.push({ file, data });
  }
  mergeFragments(definitions, fragments, sectionSet);
  return definitions;
}
