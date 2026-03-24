import fs from "fs";
import fsPromises from "fs/promises";
import path from "path";
import { isSafePathSegment, resolvePathUnder } from "../page-builder-paths";
import type { PageBuilderDefinitionBlock } from "../page-builder-schemas";
import { resolvePresets } from "../page-builder-presets";
import { PAGE_DATA_DIR, parseJsonSafe } from "./page-builder-load-io";

const MODULES_DIR = path.join(process.cwd(), "src/content/modules");

function loadGlobalModules(): Record<string, PageBuilderDefinitionBlock> {
  if (!fs.existsSync(MODULES_DIR) || !fs.statSync(MODULES_DIR).isDirectory()) return {};
  const modules: Record<string, PageBuilderDefinitionBlock> = {};
  try {
    const files = fs.readdirSync(MODULES_DIR).filter((f) => f.endsWith(".json"));
    for (const file of files) {
      const key = path.basename(file, ".json");
      if (!isSafePathSegment(key)) continue;
      const filePath = resolvePathUnder(MODULES_DIR, `${key}.json`);
      if (!filePath) continue;
      const raw = fs.readFileSync(filePath, "utf-8");
      const result = parseJsonSafe<unknown>(raw);
      if (!result.ok) continue;
      const data = result.data;
      if (data != null && typeof data === "object" && "type" in (data as object)) {
        modules[key] = data as PageBuilderDefinitionBlock;
      }
    }
  } catch {
    // ignore
  }
  return modules;
}

/** Async: read all module JSON files in parallel. */
async function loadGlobalModulesAsync(): Promise<Record<string, PageBuilderDefinitionBlock>> {
  try {
    const stat = await fsPromises.stat(MODULES_DIR);
    if (!stat.isDirectory()) return {};
  } catch {
    return {};
  }
  const files = (await fsPromises.readdir(MODULES_DIR)).filter((f) => f.endsWith(".json"));
  const results = await Promise.all(
    files.map(async (file) => {
      const key = path.basename(file, ".json");
      if (!isSafePathSegment(key)) return null;
      const filePath = resolvePathUnder(MODULES_DIR, `${key}.json`);
      if (!filePath) return null;
      const raw = await fsPromises.readFile(filePath, "utf-8");
      const result = parseJsonSafe<unknown>(raw);
      if (!result.ok) return null;
      const data = result.data;
      if (data != null && typeof data === "object" && "type" in (data as object)) {
        return { key, data: data as PageBuilderDefinitionBlock } as const;
      }
      return null;
    })
  );
  const modules: Record<string, PageBuilderDefinitionBlock> = {};
  for (const r of results) {
    if (r) modules[r.key] = r.data;
  }
  return modules;
}

function loadSectionFile(
  slug: string,
  sectionKey: string,
  definitions: Record<string, PageBuilderDefinitionBlock>
): void {
  if (!isSafePathSegment(slug) || !isSafePathSegment(sectionKey)) return;
  const sectionPath = resolvePathUnder(PAGE_DATA_DIR, slug, `${sectionKey}.json`);
  if (!sectionPath || !fs.existsSync(sectionPath)) return;
  const raw = fs.readFileSync(sectionPath, "utf-8");
  const result = parseJsonSafe<Record<string, unknown>>(raw);
  if (!result.ok) return;
  const sectionData = result.data;
  const { definitions: sectionDefs } = sectionData as Record<string, unknown> & {
    definitions?: Record<string, unknown>;
  };
  if (sectionDefs != null && typeof sectionDefs === "object") {
    for (const [k, v] of Object.entries(sectionDefs)) {
      if (v != null && typeof v === "object") definitions[k] = v as PageBuilderDefinitionBlock;
    }
  }
  definitions[sectionKey] = sectionData as PageBuilderDefinitionBlock;
}

export function getDefinitionsForPage(
  withSlug: Record<string, unknown>,
  _slug: string
): Record<string, PageBuilderDefinitionBlock> {
  const definitions = withSlug.definitions as
    | Record<string, PageBuilderDefinitionBlock>
    | undefined;
  if (definitions == null || typeof definitions !== "object") return {};
  if (Object.keys(definitions).length === 0) return {};
  return { ...definitions };
}

/** Async: definitions from inline page JSON only. Returns {} when missing so section files + presets can fill in. */
export async function getDefinitionsForPageAsync(
  withSlug: Record<string, unknown>,
  _slug: string
): Promise<Record<string, PageBuilderDefinitionBlock>> {
  const definitions = withSlug.definitions as
    | Record<string, PageBuilderDefinitionBlock>
    | undefined;
  if (definitions == null || typeof definitions !== "object") return {};
  if (Object.keys(definitions).length === 0) return {};
  return { ...definitions };
}

function loadDefinitionFragments(
  slug: string,
  definitions: Record<string, PageBuilderDefinitionBlock>,
  sectionOrder: string[]
): void {
  if (!isSafePathSegment(slug)) return;
  const slugDirResolved = resolvePathUnder(PAGE_DATA_DIR, slug);
  if (
    !slugDirResolved ||
    !fs.existsSync(slugDirResolved) ||
    !fs.statSync(slugDirResolved).isDirectory()
  )
    return;
  const sectionSet = new Set(sectionOrder);
  const files = fs.readdirSync(slugDirResolved).filter((f) => f.endsWith(".json"));
  for (const file of files) {
    const basename = path.basename(file, ".json");
    if (!isSafePathSegment(basename)) continue;
    if (sectionSet.has(basename) || basename === slug || basename.endsWith("-sections")) continue;
    const filePath = resolvePathUnder(PAGE_DATA_DIR, slug, file);
    if (!filePath || !fs.statSync(filePath).isFile()) continue;
    const raw = fs.readFileSync(filePath, "utf-8");
    const result = parseJsonSafe<Record<string, unknown>>(raw);
    if (!result.ok) continue;
    const data = result.data;
    if (data == null || typeof data !== "object" || Array.isArray(data)) continue;
    for (const [key, value] of Object.entries(data)) {
      if (value != null && typeof value === "object" && !Array.isArray(value) && "type" in value) {
        definitions[key] = value as PageBuilderDefinitionBlock;
      }
    }
  }
}

export function mergeGlobalModulesIntoDefinitions(
  definitions: Record<string, PageBuilderDefinitionBlock>
): Record<string, PageBuilderDefinitionBlock> {
  return { ...loadGlobalModules(), ...definitions };
}

export async function mergeGlobalModulesIntoDefinitionsAsync(
  definitions: Record<string, PageBuilderDefinitionBlock>
): Promise<Record<string, PageBuilderDefinitionBlock>> {
  const modules = await loadGlobalModulesAsync();
  return { ...modules, ...definitions };
}

export function hydrateSectionFiles(
  definitions: Record<string, PageBuilderDefinitionBlock>,
  slug: string,
  sectionOrder: string[]
): Record<string, PageBuilderDefinitionBlock> {
  if (!isSafePathSegment(slug)) return definitions;
  const slugDir = resolvePathUnder(PAGE_DATA_DIR, slug);
  if (slugDir && fs.existsSync(slugDir) && fs.statSync(slugDir).isDirectory()) {
    for (const key of sectionOrder) {
      if (!isSafePathSegment(key)) continue;
      if (definitions[key] == null) loadSectionFile(slug, key, definitions);
    }
    loadDefinitionFragments(slug, definitions, sectionOrder);
  }
  return definitions;
}

/** Async: load section files and definition fragments in parallel. */
export async function hydrateSectionFilesAsync(
  definitions: Record<string, PageBuilderDefinitionBlock>,
  slug: string,
  sectionOrder: string[]
): Promise<Record<string, PageBuilderDefinitionBlock>> {
  if (!isSafePathSegment(slug)) return definitions;
  const slugDir = resolvePathUnder(PAGE_DATA_DIR, slug);
  if (!slugDir) return definitions;
  let stat: Awaited<ReturnType<typeof fsPromises.stat>> | null = null;
  try {
    stat = await fsPromises.stat(slugDir);
  } catch {
    return definitions;
  }
  if (!stat.isDirectory()) return definitions;

  const sectionSet = new Set(sectionOrder);
  const files = (await fsPromises.readdir(slugDir)).filter((f) => f.endsWith(".json"));
  const toRead: { path: string; kind: "section" | "fragment"; key?: string }[] = [];
  for (const key of sectionOrder) {
    if (!isSafePathSegment(key)) continue;
    if (definitions[key] == null) {
      const sectionPath = resolvePathUnder(PAGE_DATA_DIR, slug, `${key}.json`);
      if (sectionPath) toRead.push({ path: sectionPath, kind: "section", key });
    }
  }
  for (const file of files) {
    const basename = path.basename(file, ".json");
    if (!isSafePathSegment(basename)) continue;
    if (sectionSet.has(basename) || basename === slug || basename.endsWith("-sections")) continue;
    const filePath = resolvePathUnder(PAGE_DATA_DIR, slug, file);
    if (!filePath) continue;
    toRead.push({ path: filePath, kind: "fragment" });
  }

  const results = await Promise.all(
    toRead.map(async (item) => {
      try {
        const raw = await fsPromises.readFile(item.path, "utf-8");
        const result = parseJsonSafe<Record<string, unknown>>(raw);
        if (!result.ok) return null;
        return { ...item, data: result.data };
      } catch {
        return null;
      }
    })
  );

  // First pass: set each section block by its key so section keys are never overwritten by nested defs.
  for (const r of results) {
    if (!r || !r.data || typeof r.data !== "object") continue;
    if (r.kind === "section" && r.key) {
      definitions[r.key] = r.data as PageBuilderDefinitionBlock;
    }
  }

  // Second pass: merge nested definitions and fragments, never overwriting a section key.
  for (const r of results) {
    if (!r || !r.data || typeof r.data !== "object") continue;
    if (r.kind === "section" && r.key) {
      const sectionData = r.data as Record<string, unknown> & {
        definitions?: Record<string, unknown>;
      };
      const sectionDefs = sectionData.definitions;
      if (sectionDefs != null && typeof sectionDefs === "object") {
        for (const [k, v] of Object.entries(sectionDefs)) {
          if (v != null && typeof v === "object" && !sectionSet.has(k)) {
            definitions[k] = v as PageBuilderDefinitionBlock;
          }
        }
      }
    } else if (r.kind === "fragment") {
      const data = r.data as Record<string, unknown>;
      for (const [key, value] of Object.entries(data)) {
        if (
          value != null &&
          typeof value === "object" &&
          !Array.isArray(value) &&
          "type" in value &&
          !sectionSet.has(key)
        ) {
          definitions[key] = value as PageBuilderDefinitionBlock;
        }
      }
    }
  }

  // Fallback: load any section still missing (e.g. async read failed) so no section is dropped.
  for (const key of sectionOrder) {
    if (!isSafePathSegment(key)) continue;
    if (definitions[key] == null) {
      loadSectionFile(slug, key, definitions);
    }
  }
  return definitions;
}

export function resolveDefinitionPresets(
  definitions: Record<string, PageBuilderDefinitionBlock>,
  presets: Record<string, PageBuilderDefinitionBlock>
): Record<string, PageBuilderDefinitionBlock> {
  const resolvedDefinitions: Record<string, PageBuilderDefinitionBlock> = {};
  for (const [key, block] of Object.entries(definitions)) {
    resolvedDefinitions[key] = resolvePresets(block, presets);
  }
  return resolvedDefinitions;
}
