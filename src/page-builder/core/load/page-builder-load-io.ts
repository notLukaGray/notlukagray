import fs from "fs";
import fsPromises from "fs/promises";
import path from "path";
import { isSafePathSegment, resolvePathUnder } from "../page-builder-paths";
import type { PageBuilderDefinitionBlock } from "../page-builder-schemas";

export const PAGE_DATA_DIR = path.join(process.cwd(), "src/content/pages");
export const PAGE_IGNORE = new Set(["schema.example.json"]);

/**
 * Resolve the absolute content directory for a single-segment slug.
 * Single-segment slugs map to src/content/pages/{slug}.
 */
export function resolveSlugDir(slug: string): string | null {
  if (!isSafePathSegment(slug)) return null;
  return resolvePathUnder(PAGE_DATA_DIR, slug) ?? null;
}

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
  const slugDir = resolveSlugDir(slug);
  if (!slugDir) return null;
  // Prefer index.json inside the directory (new convention), fall back to {slugDir}.json (legacy)
  const indexPath = path.join(slugDir, "index.json");
  const pagePath = fs.existsSync(indexPath) ? indexPath : `${slugDir}.json`;
  if (!fs.existsSync(pagePath)) return null;
  const raw = fs.readFileSync(pagePath, "utf-8");
  const result = parseJsonSafe<Record<string, unknown>>(raw);
  if (!result.ok) return null;
  return { ...result.data, slug } as Record<string, unknown>;
}

/** Async: read page JSON for parallel load phase. */
export async function readPageJsonAsync(slug: string): Promise<Record<string, unknown> | null> {
  if (!isSafePathSegment(slug)) return null;
  const slugDir = resolveSlugDir(slug);
  if (!slugDir) return null;
  // Prefer index.json inside the directory (new convention), fall back to {slugDir}.json (legacy)
  const indexPath = path.join(slugDir, "index.json");
  let pagePath: string;
  try {
    pagePath = fs.existsSync(indexPath) ? indexPath : `${slugDir}.json`;
    const raw = await fsPromises.readFile(pagePath, "utf-8");
    const result = parseJsonSafe<Record<string, unknown>>(raw);
    if (!result.ok) return null;
    return { ...result.data, slug } as Record<string, unknown>;
  } catch {
    return null;
  }
}

/**
 * Read page JSON from an absolute path resolved by resolvePagePath().
 * The path has already been validated by the discovery layer — do NOT call
 * with untrusted user input.
 * The slug parameter is the joined URL segments (e.g. "work/project-brand")
 * and is stored on the returned object for downstream consumers.
 */
export function readPageJsonByPath(
  absolutePath: string,
  slug: string
): Record<string, unknown> | null {
  if (!fs.existsSync(absolutePath)) return null;
  try {
    const raw = fs.readFileSync(absolutePath, "utf-8");
    const result = parseJsonSafe<Record<string, unknown>>(raw);
    if (!result.ok) return null;
    return { ...result.data, slug } as Record<string, unknown>;
  } catch {
    return null;
  }
}

/**
 * Async variant of readPageJsonByPath for the parallel load phase.
 */
export async function readPageJsonByPathAsync(
  absolutePath: string,
  slug: string
): Promise<Record<string, unknown> | null> {
  try {
    const raw = await fsPromises.readFile(absolutePath, "utf-8");
    const result = parseJsonSafe<Record<string, unknown>>(raw);
    if (!result.ok) return null;
    return { ...result.data, slug } as Record<string, unknown>;
  } catch {
    return null;
  }
}
