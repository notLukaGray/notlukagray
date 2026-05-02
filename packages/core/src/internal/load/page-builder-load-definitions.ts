import fs from "fs";
import fsPromises from "fs/promises";
import path from "path";
import type { PageBuilderDefinitionBlock } from "@pb/contracts";
import { isSafePathSegment, resolvePathUnder } from "../page-builder-paths";
import { resolvePresets } from "../page-builder-presets";
import { parseJsonSafe, CONTENT_DIR } from "./page-builder-load-io";
import {
  hydrateSectionFilesBySegments,
  hydrateSectionFilesBySegmentsAsync,
} from "./page-builder-load-definitions-hydrate";

const MODULES_DIR = path.join(CONTENT_DIR, "modules");

function loadGlobalModules(): Record<string, PageBuilderDefinitionBlock> {
  if (!fs.existsSync(MODULES_DIR) || !fs.statSync(MODULES_DIR).isDirectory()) return {};
  const modules: Record<string, PageBuilderDefinitionBlock> = {};
  try {
    const files = fs
      .readdirSync(MODULES_DIR)
      .filter((f) => f.endsWith(".json"))
      .sort((a, b) => a.localeCompare(b));
    for (const file of files) {
      const key = path.basename(file, ".json");
      if (!isSafePathSegment(key)) continue;
      const filePath = resolvePathUnder(MODULES_DIR, `${key}.json`);
      if (!filePath) continue;
      const raw = fs.readFileSync(filePath, "utf-8");
      const result = parseJsonSafe<unknown>(raw);
      if (!result.ok) continue;
      const data = result.data;
      if (data && typeof data === "object" && "type" in data) {
        modules[key] = data as PageBuilderDefinitionBlock;
      }
    }
  } catch {
    return modules;
  }
  return modules;
}

async function loadGlobalModulesAsync(): Promise<Record<string, PageBuilderDefinitionBlock>> {
  try {
    const stat = await fsPromises.stat(MODULES_DIR);
    if (!stat.isDirectory()) return {};
  } catch {
    return {};
  }
  const files = (await fsPromises.readdir(MODULES_DIR))
    .filter((f) => f.endsWith(".json"))
    .sort((a, b) => a.localeCompare(b));
  const results = await Promise.all(
    files.map(async (file) => {
      const key = path.basename(file, ".json");
      if (!isSafePathSegment(key)) return null;
      const filePath = resolvePathUnder(MODULES_DIR, `${key}.json`);
      if (!filePath) return null;
      const raw = await fsPromises.readFile(filePath, "utf-8");
      const result = parseJsonSafe<unknown>(raw);
      if (
        !result.ok ||
        !result.data ||
        typeof result.data !== "object" ||
        !("type" in result.data)
      ) {
        return null;
      }
      return { key, data: result.data as PageBuilderDefinitionBlock };
    })
  );
  const modules: Record<string, PageBuilderDefinitionBlock> = {};
  for (const result of results) {
    if (result) modules[result.key] = result.data;
  }
  return modules;
}

export function getDefinitionsForPage(
  withSlug: Record<string, unknown>,
  _slug: string
): Record<string, PageBuilderDefinitionBlock> {
  const definitions = withSlug.definitions as
    | Record<string, PageBuilderDefinitionBlock>
    | undefined;
  if (!definitions || typeof definitions !== "object" || Object.keys(definitions).length === 0) {
    return {};
  }
  return { ...definitions };
}

export async function getDefinitionsForPageAsync(
  withSlug: Record<string, unknown>,
  _slug: string
): Promise<Record<string, PageBuilderDefinitionBlock>> {
  return getDefinitionsForPage(withSlug, _slug);
}

export function mergeGlobalModulesIntoDefinitions(
  definitions: Record<string, PageBuilderDefinitionBlock>
): Record<string, PageBuilderDefinitionBlock> {
  return { ...loadGlobalModules(), ...definitions };
}

export async function mergeGlobalModulesIntoDefinitionsAsync(
  definitions: Record<string, PageBuilderDefinitionBlock>
): Promise<Record<string, PageBuilderDefinitionBlock>> {
  return { ...(await loadGlobalModulesAsync()), ...definitions };
}

export { hydrateSectionFilesBySegments, hydrateSectionFilesBySegmentsAsync };

export function resolveDefinitionPresets(
  definitions: Record<string, PageBuilderDefinitionBlock>,
  presets: Record<string, PageBuilderDefinitionBlock>
): Record<string, PageBuilderDefinitionBlock> {
  const resolved: Record<string, PageBuilderDefinitionBlock> = {};
  for (const [key, block] of Object.entries(definitions)) {
    resolved[key] = resolvePresets(block, presets);
  }
  return resolved;
}
