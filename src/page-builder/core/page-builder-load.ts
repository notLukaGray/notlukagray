import { cache } from "react";
import fs from "fs";
import { isSafePathSegment, resolvePathUnder } from "@/page-builder/core/page-builder-paths";
import type { PageBuilder } from "@/page-builder/core/page-builder-schemas";
import { pageBuilderSchema } from "@/page-builder/core/page-builder-schemas";
import path from "path";
import {
  readPageJson,
  readPageJsonAsync,
  PAGE_DATA_DIR,
  PAGE_IGNORE,
  parseJsonSafe,
} from "./load/page-builder-load-io";
import { buildPresets, buildPresetsAsync } from "./load/page-builder-load-presets";
import {
  getDefinitionsForPage,
  getDefinitionsForPageAsync,
  mergeGlobalModulesIntoDefinitions,
  mergeGlobalModulesIntoDefinitionsAsync,
  hydrateSectionFiles,
  hydrateSectionFilesAsync,
  resolveDefinitionPresets,
} from "./load/page-builder-load-definitions";

export { readJsonFileSafe, coercePresetMap } from "./load/page-builder-load-io";
export { PAGE_DATA_DIR, PAGE_IGNORE } from "./load/page-builder-load-io";

export function isPageBuilder(data: Record<string, unknown>): data is PageBuilder {
  return (
    Array.isArray(data.sectionOrder) &&
    (data.definitions == null ||
      (typeof data.definitions === "object" && Object.keys(data.definitions as object).length > 0))
  );
}

function validatePageBuilderNonBlocking(pageBuilder: PageBuilder, slug: string): void {
  const validationResult = pageBuilderSchema.safeParse(pageBuilder);
  if (validationResult.success) return;
  const isDev = process.env.NODE_ENV === "development";
  if (isDev && process.env.STRICT_VALIDATION === "true") {
    throw new Error(
      `Page builder validation failed for ${slug}: ${validationResult.error.message}`
    );
  }
}

export function loadPageBuilder(slug: string): PageBuilder | null {
  if (!isSafePathSegment(slug)) return null;
  const withSlug = readPageJson(slug);
  if (withSlug == null || !Array.isArray(withSlug.sectionOrder)) return null;

  const sectionOrder = withSlug.sectionOrder as string[];
  let definitions = getDefinitionsForPage(withSlug, slug);
  definitions = mergeGlobalModulesIntoDefinitions(definitions);
  hydrateSectionFiles(definitions, slug, sectionOrder);

  const presets = buildPresets(withSlug);
  for (const key of sectionOrder) {
    if (definitions[key] == null && presets[key] != null) {
      definitions[key] = presets[key];
    }
  }
  const resolvedDefinitions = resolveDefinitionPresets(definitions, presets);

  const pageBuilder = { ...withSlug, definitions: resolvedDefinitions } as PageBuilder;
  validatePageBuilderNonBlocking(pageBuilder, slug);
  return pageBuilder;
}

/** Async load with parallel I/O — modules and presets load in parallel: page json, definitions, modules, section files, presets. */
export async function loadPageBuilderAsync(slug: string): Promise<PageBuilder | null> {
  if (!isSafePathSegment(slug)) return null;
  const withSlug = await readPageJsonAsync(slug);
  if (withSlug == null || !Array.isArray(withSlug.sectionOrder)) return null;

  const sectionOrder = withSlug.sectionOrder as string[];
  const definitions = await getDefinitionsForPageAsync(withSlug, slug);
  const [mergedDefinitions, presets] = await Promise.all([
    mergeGlobalModulesIntoDefinitionsAsync(definitions),
    buildPresetsAsync(withSlug),
  ]);
  const resolvedSectionDefinitions = await hydrateSectionFilesAsync(
    mergedDefinitions,
    slug,
    sectionOrder
  );
  for (const key of sectionOrder) {
    if (resolvedSectionDefinitions[key] == null && presets[key] != null) {
      resolvedSectionDefinitions[key] = presets[key];
    }
  }
  const resolvedDefinitions = resolveDefinitionPresets(resolvedSectionDefinitions, presets);

  const pageBuilder = { ...withSlug, definitions: resolvedDefinitions } as PageBuilder;
  validatePageBuilderNonBlocking(pageBuilder, slug);
  return pageBuilder;
}

const DEFAULT_BASE_PATH = "/work";

const PAGE_MANIFEST_PATH = path.join(process.cwd(), "src/content/page-manifest.json");

function readPageManifest(): { slug: string; basePath: string }[] {
  if (!fs.existsSync(PAGE_MANIFEST_PATH)) return [];
  const raw = fs.readFileSync(PAGE_MANIFEST_PATH, "utf-8");
  const parsed = parseJsonSafe<{ slug: string; assetBaseUrl?: string }[]>(raw);
  if (!parsed.ok || !Array.isArray(parsed.data)) return [];
  return parsed.data
    .filter(
      (p) =>
        p &&
        typeof p.slug === "string" &&
        typeof p.assetBaseUrl === "string" &&
        isSafePathSegment(p.slug)
    )
    .map((p) => ({
      slug: p.slug,
      basePath: p.assetBaseUrl as string,
    }));
}

function getPageSlugBasesUncached(): { slug: string; basePath: string }[] {
  if (!fs.existsSync(PAGE_DATA_DIR)) return [];
  const result: { slug: string; basePath: string }[] = [];
  const files = fs
    .readdirSync(PAGE_DATA_DIR)
    .filter((f) => f.endsWith(".json") && !PAGE_IGNORE.has(f) && !f.endsWith("-sections.json"));
  for (const f of files) {
    const slug = f.replace(/\.json$/, "");
    if (!isSafePathSegment(slug)) continue;
    const pagePath = resolvePathUnder(PAGE_DATA_DIR, f);
    if (!pagePath || !fs.existsSync(pagePath)) continue;
    const raw = fs.readFileSync(pagePath, "utf-8");
    const parsed = parseJsonSafe<Record<string, unknown>>(raw);
    if (!parsed.ok || parsed.data == null || typeof parsed.data !== "object") continue;
    const assetBaseUrl = (parsed.data as { assetBaseUrl?: unknown }).assetBaseUrl;
    if (typeof assetBaseUrl !== "string") {
      // Pages without an explicit assetBaseUrl (e.g. unlock) are not part of /work or /research indexes.
      continue;
    }
    result.push({ slug, basePath: assetBaseUrl });
  }
  return result;
}

function getPageSlugBasesCached(): { slug: string; basePath: string }[] {
  if (process.env.DISABLE_MANIFEST === "true") return getPageSlugBasesUncached();
  const fromManifest = readPageManifest();
  // Fallback to filesystem scan when manifest is missing or empty
  if (!fromManifest.length) {
    return getPageSlugBasesUncached();
  }
  return fromManifest;
}

/** Request-scoped cache: dedupes fs reads when generateStaticParams/sitemap call getPageSlugBases multiple times. */
export const getPageSlugBases = cache(getPageSlugBasesCached);

export function getPageSlugsByBase(basePath: string): string[] {
  return getPageSlugBases()
    .filter((p) => p.basePath === basePath)
    .map((p) => p.slug);
}

export function getPageSlugs(): string[] {
  return getPageSlugsByBase(DEFAULT_BASE_PATH);
}
