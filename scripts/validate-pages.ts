#!/usr/bin/env npx tsx
/**
 * CLI for page-builder validation. Use before commit or in CI:
 *   npm run validate-pages
 *   npm run validate-pages [slug1] [slug2]
 * Uses the same logic as dev browser validation (see page-builder-validation.ts).
 */
import {
  runPageBuilderValidation,
  summarizeValidation,
} from "../packages/runtime-react/src/page-builder/dev/page-builder-validation";
import fs from "fs";
import path from "path";
import { discoverAllPages } from "@pb/core";
import { parseJsonSafe } from "@pb/core/internal/load/page-builder-load-io";
import {
  filterConfigSchema,
  knownPageTagsConfigSchema,
  pageTagsSchema,
  validateKnownFilterCategories,
  validateKnownPageTags,
  type KnownPageTagsConfig,
} from "@pb/contracts";

interface ValidateConfig {
  slugs: string[];
}

type SectionFileFailure = {
  slug: string;
  sectionKey: string;
  expectedPath: string;
};

type SectionWaiverConfig = {
  pages?: Record<string, string[]>;
};

type TagValidationFailure = {
  slug: string;
  path: string;
  message: string;
};

const APP_ROOT = fs.existsSync(path.join(process.cwd(), "src/content"))
  ? process.cwd()
  : path.join(process.cwd(), "apps/web");

const SECTION_WAIVER_PATH = path.join(APP_ROOT, "src/content/config/section-file-waivers.json");
const TAGS_CONFIG_PATH = path.join(APP_ROOT, "src/content/config/tags.json");

function parseArgs(argv: string[]): ValidateConfig {
  const slugs = argv.length > 0 ? argv : [];
  return { slugs };
}

function formatReport(
  resultsReturn: ReturnType<typeof runPageBuilderValidation>,
  toolingErrorCount = 0
): string {
  const { validCount, invalidCount } = summarizeValidation(resultsReturn);
  const toolingSummary =
    toolingErrorCount > 0
      ? `, ${toolingErrorCount} tooling error${toolingErrorCount === 1 ? "" : "s"}`
      : "";
  const summary = `Summary: ${validCount} page${validCount === 1 ? "" : "s"} valid, ${invalidCount} page${
    invalidCount === 1 ? "" : "s"
  } invalid${toolingSummary}.`;
  const hasErrors = invalidCount > 0 || toolingErrorCount > 0;
  const message = hasErrors
    ? "\nValidation failed.\nFix the errors above (check the JSON path after 'Location:' and the page shown in 'Source:') before deploying."
    : "\nAll pages validated successfully. 🎉";
  return summary + message;
}

function formatZodIssues(error: {
  issues: Array<{ path: Array<string | number>; message: string }>;
}): string[] {
  return error.issues.map((issue) => `${issue.path.join(".") || "(root)"}: ${issue.message}`);
}

function loadSectionWaivers(): SectionWaiverConfig {
  if (!fs.existsSync(SECTION_WAIVER_PATH)) return {};
  const raw = fs.readFileSync(SECTION_WAIVER_PATH, "utf-8");
  const parsed = parseJsonSafe<unknown>(raw);
  if (!parsed.ok || parsed.data == null || typeof parsed.data !== "object") return {};

  const pagesRaw = (parsed.data as { pages?: unknown }).pages;
  if (pagesRaw == null || typeof pagesRaw !== "object" || Array.isArray(pagesRaw)) return {};

  const pages: Record<string, string[]> = {};
  for (const [slug, value] of Object.entries(pagesRaw as Record<string, unknown>)) {
    if (!Array.isArray(value)) continue;
    pages[slug] = value.filter((entry): entry is string => typeof entry === "string");
  }
  return { pages };
}

function isSectionWaived(waivers: SectionWaiverConfig, slug: string, sectionKey: string): boolean {
  const pageWaivers = waivers.pages?.[slug];
  if (!pageWaivers || pageWaivers.length === 0) return false;
  return pageWaivers.includes("*") || pageWaivers.includes(sectionKey);
}

function loadKnownTagsConfig(): { config?: KnownPageTagsConfig; errors: string[] } {
  if (!fs.existsSync(TAGS_CONFIG_PATH)) return { errors: [] };

  const raw = fs.readFileSync(TAGS_CONFIG_PATH, "utf-8");
  const parsed = parseJsonSafe<unknown>(raw);
  if (!parsed.ok) {
    return { errors: [`Invalid JSON: ${parsed.error}`] };
  }

  const result = knownPageTagsConfigSchema.safeParse(parsed.data);
  if (!result.success) {
    return { errors: formatZodIssues(result.error) };
  }

  return { config: result.data, errors: [] };
}

function validateSectionFiles(slugs: string[]): SectionFileFailure[] {
  const slugFilter = new Set(slugs);
  const applySlugFilter = slugFilter.size > 0;
  const waivers = loadSectionWaivers();
  const failures: SectionFileFailure[] = [];
  const pages = discoverAllPages();

  for (const page of pages) {
    const slug = page.slugSegments.join("/");
    if (applySlugFilter && !slugFilter.has(slug)) continue;

    const raw = fs.readFileSync(page.contentPath, "utf-8");
    const parsed = parseJsonSafe<Record<string, unknown>>(raw);
    if (!parsed.ok || parsed.data == null || typeof parsed.data !== "object") continue;

    const sectionOrderRaw = parsed.data.sectionOrder;
    if (!Array.isArray(sectionOrderRaw)) continue;
    const sectionOrder = sectionOrderRaw.filter(
      (value): value is string => typeof value === "string"
    );
    if (sectionOrder.length <= 1) continue;

    const pageDir = path.dirname(page.contentPath);
    for (const sectionKey of sectionOrder) {
      const expectedPath = path.join(pageDir, `${sectionKey}.json`);
      if (fs.existsSync(expectedPath) || isSectionWaived(waivers, slug, sectionKey)) continue;
      failures.push({
        slug,
        sectionKey,
        expectedPath: path.relative(process.cwd(), expectedPath),
      });
    }
  }

  return failures;
}

function validateKnownTags(
  slugs: string[],
  config: KnownPageTagsConfig | undefined
): TagValidationFailure[] {
  if (!config) return [];

  const slugFilter = new Set(slugs);
  const applySlugFilter = slugFilter.size > 0;
  const failures: TagValidationFailure[] = [];
  const pages = discoverAllPages();

  for (const page of pages) {
    const slug = page.slugSegments.join("/");
    if (applySlugFilter && !slugFilter.has(slug)) continue;

    const raw = fs.readFileSync(page.contentPath, "utf-8");
    const parsed = parseJsonSafe<Record<string, unknown>>(raw);
    if (!parsed.ok || parsed.data == null || typeof parsed.data !== "object") continue;

    const tagsResult =
      parsed.data.tags === undefined ? null : pageTagsSchema.safeParse(parsed.data.tags);
    const filterConfigResult =
      parsed.data.filterConfig === undefined
        ? null
        : filterConfigSchema.safeParse(parsed.data.filterConfig);

    const issues = [
      ...(tagsResult?.success ? validateKnownPageTags(tagsResult.data, config) : []),
      ...(filterConfigResult?.success
        ? validateKnownFilterCategories(filterConfigResult.data, config)
        : []),
    ];

    failures.push(
      ...issues.map((issue) => ({
        slug,
        path: issue.path.join("."),
        message: issue.message,
      }))
    );
  }

  return failures;
}

function exitWithStatus(
  resultsReturn: ReturnType<typeof runPageBuilderValidation>,
  sectionFailures: SectionFileFailure[],
  tagFailures: TagValidationFailure[],
  tagsConfigErrors: string[]
): void {
  const hasErrors = resultsReturn.some((r) => !r.valid);
  process.exit(
    hasErrors || sectionFailures.length > 0 || tagFailures.length > 0 || tagsConfigErrors.length > 0
      ? 1
      : 0
  );
}

function main(): void {
  const config = parseArgs(process.argv.slice(2));
  const knownTags = loadKnownTagsConfig();
  const results = runPageBuilderValidation({ slugs: config.slugs });
  const sectionFailures = validateSectionFiles(config.slugs);
  const tagFailures = validateKnownTags(config.slugs, knownTags.config);

  for (const { slug, valid, errors } of results) {
    if (!valid) {
      console.error(`\n❌ Page "${slug}" has validation errors:`);
      for (const error of errors) {
        // Try to split our enriched error string into clearer parts.
        // Format from validator is roughly:
        //   "<path>: [code] union[0]: message (meta...) (source ...)"
        // We re-label these pieces for readability.
        const locationMatch = error.match(/^([^:]+):\s*(.*)$/);
        const [location, restAfterLocation] = locationMatch
          ? [locationMatch[0], locationMatch[2]]
          : [null, error];

        const safeRest = restAfterLocation ?? error;
        const sourceMatch = safeRest.match(/\(source [^)]+\)$/);
        const source = sourceMatch ? sourceMatch[0] : null;
        const core = sourceMatch ? safeRest.slice(0, sourceMatch.index).trim() : safeRest.trim();

        if (location || source) {
          console.error("  - Error:");
          if (location) {
            console.error(`      Location: ${location.replace(/:\s*$/, "")}`);
          }
          console.error(`      Details: ${core}`);
          if (source) {
            console.error(`      Source: ${source.replace(/^\(|\)$/g, "")}`);
          }
        } else {
          console.error(`  - ${error}`);
        }
      }
    }
  }

  if (sectionFailures.length > 0) {
    console.error("\n❌ Section file validation errors:");
    let currentSlug = "";
    for (const failure of sectionFailures) {
      if (failure.slug !== currentSlug) {
        currentSlug = failure.slug;
        console.error(`  ${currentSlug}`);
      }
      console.error(`    - Missing ${failure.sectionKey}.json (${failure.expectedPath})`);
    }
    console.error(
      `\nAdd section files or add targeted waivers in ${path.relative(process.cwd(), SECTION_WAIVER_PATH)}.`
    );
  }

  if (knownTags.errors.length > 0) {
    console.error("\n❌ Known tag config validation errors:");
    console.error(`  ${path.relative(process.cwd(), TAGS_CONFIG_PATH)}`);
    for (const error of knownTags.errors) {
      console.error(`    - ${error}`);
    }
  }

  if (tagFailures.length > 0) {
    console.error("\n❌ Known tag validation errors:");
    let currentSlug = "";
    for (const failure of tagFailures) {
      if (failure.slug !== currentSlug) {
        currentSlug = failure.slug;
        console.error(`  ${currentSlug}`);
      }
      console.error(`    - ${failure.path}: ${failure.message}`);
    }
    console.error(
      `\nAdd missing categories or tags in ${path.relative(process.cwd(), TAGS_CONFIG_PATH)}.`
    );
  }

  console.error(
    formatReport(results, sectionFailures.length + tagFailures.length + knownTags.errors.length)
  );
  exitWithStatus(results, sectionFailures, tagFailures, knownTags.errors);
}

main();
