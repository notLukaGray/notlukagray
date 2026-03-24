import fs from "fs";
import fsPromises from "fs/promises";
import path from "path";
import { isSafePathSegment, resolvePathUnder } from "../page-builder-paths";
import type { PageBuilderDefinitionBlock } from "../page-builder-schemas";

export const PAGE_DATA_DIR = path.join(process.cwd(), "src/content/pages");
export const PAGE_IGNORE = new Set(["schema.example.json"]);

export function parseJsonSafe<T = unknown>(
  raw: string
): { ok: true; data: T } | { ok: false; error: unknown } {
  try {
    return { ok: true, data: JSON.parse(raw) as T };
  } catch (err) {
    return { ok: false, error: err };
  }
}

export function readJsonFileSafe(filePath: string): unknown | null {
  if (!fs.existsSync(filePath)) return null;
  try {
    const raw = fs.readFileSync(filePath, "utf-8");
    const result = parseJsonSafe<unknown>(raw);
    return result.ok ? result.data : null;
  } catch {
    return null;
  }
}

/** Async read for parallel load phase. Returns null if file missing or invalid JSON. */
export async function readJsonFileSafeAsync(filePath: string): Promise<unknown | null> {
  try {
    const raw = await fsPromises.readFile(filePath, "utf-8");
    const result = parseJsonSafe<unknown>(raw);
    return result.ok ? result.data : null;
  } catch {
    return null;
  }
}

export function coercePresetMap(data: unknown): Record<string, PageBuilderDefinitionBlock> {
  const out: Record<string, PageBuilderDefinitionBlock> = {};
  if (data == null || typeof data !== "object") return out;
  for (const [key, value] of Object.entries(data as Record<string, unknown>)) {
    if (value != null && typeof value === "object") {
      out[key] = value as PageBuilderDefinitionBlock;
    }
  }
  return out;
}

export function readPageJson(slug: string): Record<string, unknown> | null {
  if (!isSafePathSegment(slug)) return null;
  const pagePath = resolvePathUnder(PAGE_DATA_DIR, `${slug}.json`);
  if (!pagePath || !fs.existsSync(pagePath)) return null;
  const raw = fs.readFileSync(pagePath, "utf-8");
  const result = parseJsonSafe<Record<string, unknown>>(raw);
  if (!result.ok) return null;
  return { ...result.data, slug } as Record<string, unknown>;
}

/** Async: read page JSON for parallel load phase. */
export async function readPageJsonAsync(slug: string): Promise<Record<string, unknown> | null> {
  if (!isSafePathSegment(slug)) return null;
  const pagePath = resolvePathUnder(PAGE_DATA_DIR, `${slug}.json`);
  if (!pagePath) return null;
  try {
    const raw = await fsPromises.readFile(pagePath, "utf-8");
    const result = parseJsonSafe<Record<string, unknown>>(raw);
    if (!result.ok) return null;
    return { ...result.data, slug } as Record<string, unknown>;
  } catch {
    return null;
  }
}
