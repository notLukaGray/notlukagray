import fs from "fs";
import { isSafePathSegment } from "./page-builder-paths";
import type { PageBuilder } from "@pb/contracts";
import { pageBuilderSchema, buttonActionSchema } from "@pb/contracts";
import {
  readPageJson,
  readPageJsonAsync,
  readPageJsonByPath,
  readPageJsonByPathAsync,
  PAGE_DATA_DIR,
  parseJsonSafe,
} from "./load/page-builder-load-io";
import { validateSlugSegments } from "./load/page-builder-validate-slug";
import { discoverAllPages } from "./load/page-builder-discover-pages";
import { buildPresets, buildPresetsAsync } from "./load/page-builder-load-presets";
import {
  getDefinitionsForPage,
  getDefinitionsForPageAsync,
  mergeGlobalModulesIntoDefinitions,
  mergeGlobalModulesIntoDefinitionsAsync,
  hydrateSectionFiles,
  hydrateSectionFilesAsync,
  hydrateSectionFilesBySegments,
  hydrateSectionFilesBySegmentsAsync,
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

const knownButtonActions = new Set(buttonActionSchema.options);

function warnUnknownButtonActions(pageBuilder: PageBuilder, slug: string): void {
  if (process.env.NODE_ENV !== "development") return;
  const definitions = pageBuilder.definitions ?? {};
  for (const [defKey, block] of Object.entries(definitions)) {
    const elements =
      block != null && typeof block === "object" && "elements" in block
        ? (block as { elements?: unknown[] }).elements
        : undefined;
    if (!Array.isArray(elements)) continue;
    for (const el of elements) {
      if (
        el != null &&
        typeof el === "object" &&
        (el as Record<string, unknown>).type === "elementButton"
      ) {
        const action = (el as Record<string, unknown>).action;
        if (typeof action === "string" && !knownButtonActions.has(action as never)) {
          console.warn(
            `[page-builder] ${slug}/${defKey}: unknown button action "${action}" — ` +
              `will fail strict validation. Update to a known action or remove.`
          );
        }
      }
    }
  }
}

function validatePageBuilderNonBlocking(pageBuilder: PageBuilder, slug: string): void {
  warnUnknownButtonActions(pageBuilder, slug);
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

/**
 * Load a page by its absolute index.json path (resolved by resolvePagePath) and
 * the URL slug segments (e.g. ['work', 'project-brand']).
 * Path has already been validated by the discovery layer.
 * The joined segments string is used as the slug stored on the PageBuilder object.
 */
export function loadPageBuilderByPath(
  absolutePath: string,
  slugSegments: string[]
): PageBuilder | null {
  const slug = slugSegments.join("/");
  const withSlug = readPageJsonByPath(absolutePath, slug);
  if (withSlug == null || !Array.isArray(withSlug.sectionOrder)) return null;

  const sectionOrder = withSlug.sectionOrder as string[];
  let definitions = getDefinitionsForPage(withSlug, slug);
  definitions = mergeGlobalModulesIntoDefinitions(definitions);
  hydrateSectionFilesBySegments(definitions, slugSegments, sectionOrder);

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

/**
 * Async variant of loadPageBuilderByPath with parallel I/O.
 */
export async function loadPageBuilderByPathAsync(
  absolutePath: string,
  slugSegments: string[]
): Promise<PageBuilder | null> {
  const slug = slugSegments.join("/");
  const withSlug = await readPageJsonByPathAsync(absolutePath, slug);
  if (withSlug == null || !Array.isArray(withSlug.sectionOrder)) return null;

  const sectionOrder = withSlug.sectionOrder as string[];
  const definitions = await getDefinitionsForPageAsync(withSlug, slug);
  const [mergedDefinitions, presets] = await Promise.all([
    mergeGlobalModulesIntoDefinitionsAsync(definitions),
    buildPresetsAsync(withSlug),
  ]);
  const resolvedSectionDefinitions = await hydrateSectionFilesBySegmentsAsync(
    mergedDefinitions,
    slugSegments,
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

function getPageSlugBasesUncached(): { slug: string; basePath: string }[] {
  if (!fs.existsSync(PAGE_DATA_DIR)) return [];
  const result: { slug: string; basePath: string }[] = [];
  const pages = discoverAllPages();
  for (const page of pages) {
    if (page.slugSegments.length === 0) continue;
    if (!page.slugSegments.every((segment) => isSafePathSegment(segment))) continue;
    const slug = page.slugSegments.join("/");
    const raw = fs.readFileSync(page.contentPath, "utf-8");
    const parsed = parseJsonSafe<Record<string, unknown>>(raw);
    if (!parsed.ok || parsed.data == null || typeof parsed.data !== "object") continue;
    const assetBaseUrl = (parsed.data as { assetBaseUrl?: unknown }).assetBaseUrl;
    if (typeof assetBaseUrl !== "string") {
      // Pages without an explicit assetBaseUrl (e.g. unlock) are not part of /work or /research indexes.
      continue;
    }
    validateSlugSegments(page.slugSegments);
    result.push({ slug, basePath: assetBaseUrl });
  }
  result.sort((a, b) => a.slug.localeCompare(b.slug));
  return result;
}

export function getPageSlugBases(): { slug: string; basePath: string }[] {
  return getPageSlugBasesUncached();
}

export function getPageSlugsByBase(basePath: string): string[] {
  return getPageSlugBases()
    .filter((p) => p.basePath === basePath)
    .map((p) => p.slug);
}

export function getPageSlugs(): string[] {
  return getPageSlugsByBase(DEFAULT_BASE_PATH);
}
