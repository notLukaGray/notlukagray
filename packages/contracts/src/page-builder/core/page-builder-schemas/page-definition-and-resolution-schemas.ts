import { z } from "zod";
import { PAGE_DENSITY_LEVELS } from "../page-density";
import { bgBlockSchema } from "./background-block-schemas";
import { elementBlockSchema, sectionDefinitionBlockSchema } from "./element-block-schemas";
import { moduleBlockSchema } from "./module-block-schemas";
import { baseSectionPropsSchema, sectionBlockSchema } from "./section-block-schemas";
import {
  columnAssignmentsRequiredSchema,
  columnCountSchema,
  columnGapsSchema,
  columnSpanMapSchema,
  columnStylesSchema,
  columnWidthsSchema,
  cssWidthOrFunctionSchema,
  itemLayoutSchema,
  itemStylesSchema,
  responsiveColumnSpanSchema,
  responsiveGridModeSchema,
} from "./section-style-and-column-schemas";

const sectionContentSizeSchema = z.union([z.enum(["full", "hug"]), cssWidthOrFunctionSchema]);
const responsiveSectionContentSizeSchema = z.union([
  sectionContentSizeSchema,
  z.tuple([sectionContentSizeSchema, sectionContentSizeSchema]),
]);
import {
  responsiveBooleanSchema,
  responsiveStringSchema,
  triggerActionSchema,
} from "./schema-primitives";

const contentBlockWithElementOrderSchema = baseSectionPropsSchema.extend({
  type: z.literal("contentBlock"),
  flexDirection: responsiveStringSchema.optional(),
  flexWrap: responsiveStringSchema.optional(),
  gap: responsiveStringSchema.optional(),
  rowGap: responsiveStringSchema.optional(),
  columnGap: responsiveStringSchema.optional(),
  alignItems: responsiveStringSchema.optional(),
  justifyContent: responsiveStringSchema.optional(),
  contentWidth: responsiveSectionContentSizeSchema.optional(),
  contentHeight: responsiveSectionContentSizeSchema.optional(),
  elementOrder: z.array(z.string()),
  definitions: z.record(z.string(), sectionDefinitionBlockSchema).optional(),
});

const scrollContainerWithElementOrderSchema = baseSectionPropsSchema.extend({
  type: z.literal("scrollContainer"),
  contentWidth: responsiveSectionContentSizeSchema.optional(),
  contentHeight: responsiveSectionContentSizeSchema.optional(),
  elementOrder: z.array(z.string()),
  definitions: z.record(z.string(), sectionDefinitionBlockSchema).optional(),
});

const sectionColumnDefinitionSchema = baseSectionPropsSchema.extend({
  type: z.literal("sectionColumn"),
  elementOrder: z
    .union([
      z.array(z.string()),
      z
        .object({
          mobile: z.array(z.string()).optional(),
          desktop: z.array(z.string()).optional(),
        })
        .refine((obj) => obj.mobile !== undefined || obj.desktop !== undefined, {
          message: "At least one of mobile or desktop elementOrder must be provided",
        }),
    ])
    .optional(),
  columns: columnCountSchema,
  columnAssignments: columnAssignmentsRequiredSchema,
  columnWidths: columnWidthsSchema.optional(),
  columnGaps: columnGapsSchema.optional(),
  columnStyles: columnStylesSchema.optional(),
  itemStyles: itemStylesSchema.optional(),
  gridMode: responsiveGridModeSchema,
  gridDebug: responsiveBooleanSchema,
  gridAutoRows: responsiveStringSchema.optional(),
  columnSpan: z.union([columnSpanMapSchema, responsiveColumnSpanSchema]).optional(),
  itemLayout: itemLayoutSchema.optional(),
  contentWidth: responsiveSectionContentSizeSchema.optional(),
  contentHeight: responsiveSectionContentSizeSchema.optional(),
  definitions: z.record(z.string(), sectionDefinitionBlockSchema).optional(),
});

export const pageBuilderDefinitionBlockSchema = z.union([
  moduleBlockSchema,
  bgBlockSchema,
  sectionBlockSchema,
  elementBlockSchema,
  contentBlockWithElementOrderSchema,
  scrollContainerWithElementOrderSchema,
  sectionColumnDefinitionSchema,
]);

export const backgroundTransitionEffectSchema = z.discriminatedUnion("type", [
  z.object({
    type: z.literal("TIME"),
    id: z.string().min(1),
    from: z.string(),
    to: z.string(),
    duration: z.number().positive(),
    easing: z.string().optional(),
  }),
  z.object({
    type: z.literal("TRIGGER"),
    id: z.string().min(1),
    from: z.string(),
    to: z.string(),
    duration: z.number().positive(),
    easing: z.string().optional(),
  }),
  z.object({
    type: z.literal("SCROLL"),
    id: z.string().min(1),
    from: z.string(),
    to: z.string(),
    source: z.enum(["page", "trigger"]).optional(),
    progress: z.number().min(0).max(1).optional(),
    progressRange: z
      .object({
        start: z.number().min(0).max(1),
        end: z.number().min(0).max(1),
      })
      .refine((range) => range.start < range.end, {
        message: "progressRange.start must be less than progressRange.end",
      })
      .optional(),
  }),
]);

export const pageScrollConfigSchema = z.object({
  smooth: z.boolean().optional(),
  lockBody: z.boolean().optional(),
  overflowX: z.enum(["hidden", "auto", "visible"]).optional(),
  overflowY: z.enum(["auto", "scroll", "hidden"]).optional(),
  snapType: z
    .enum(["none", "x mandatory", "y mandatory", "both mandatory", "x proximity", "y proximity"])
    .optional(),
});

export const pageDensitySchema = z.enum(PAGE_DENSITY_LEVELS);
export const forcedThemeSchema = z.enum(["light", "dark"]);

/** Optional parity / diagnostics blob appended by the Figma plugin “Copy page JSON” flow. */
export const figmaExportDiagnosticsPageFieldSchema = z.object({
  version: z.literal(1),
  converted: z.number(),
  fallback: z.number(),
  dropped: z.number(),
  topFallbackReasons: z.array(z.object({ code: z.string(), count: z.number() })),
  dropReasons: z.record(z.string(), z.number()).optional(),
  highRiskWarnings: z.array(z.object({ category: z.string(), count: z.number() })).optional(),
});
export type FigmaExportDiagnosticsPageField = z.infer<typeof figmaExportDiagnosticsPageFieldSchema>;

/** Generic taxonomy tags: record of category key → value list. Used for filtering on listing pages. */
export const pageTagsSchema = z.record(z.string(), z.array(z.string()));
export const knownPageTagsConfigSchema = z
  .object({
    knownTags: z.record(z.string(), z.array(z.string())),
  })
  .strict();

/** Filter dimension definition for listing pages (work index, shop index, etc.). */
export const filterCategorySchema = z.object({
  key: z.string(),
  label: z.string(),
  multiSelect: z.boolean().optional(),
});

export const filterConfigSchema = z.object({
  categories: z.array(filterCategorySchema),
});

export type PageTags = z.infer<typeof pageTagsSchema>;
export type KnownPageTagsConfig = z.infer<typeof knownPageTagsConfigSchema>;
export type FilterCategory = z.infer<typeof filterCategorySchema>;
export type FilterConfig = z.infer<typeof filterConfigSchema>;

export type PageTagValidationIssue = {
  path: Array<string | number>;
  message: string;
};

function listAllowedValues(values: readonly string[]): string {
  return values.length > 0 ? values.join(", ") : "none configured";
}

function hasKnownTagCategory(config: KnownPageTagsConfig, category: string): boolean {
  return Object.prototype.hasOwnProperty.call(config.knownTags, category);
}

export function validateKnownPageTags(
  tags: PageTags | undefined,
  config: KnownPageTagsConfig
): PageTagValidationIssue[] {
  if (!tags) return [];

  const issues: PageTagValidationIssue[] = [];
  const knownCategoryKeys = Object.keys(config.knownTags);

  for (const [category, values] of Object.entries(tags)) {
    if (!hasKnownTagCategory(config, category)) {
      issues.push({
        path: ["tags", category],
        message: `Unknown tag category "${category}". Known categories: ${listAllowedValues(knownCategoryKeys)}.`,
      });
      continue;
    }

    const knownValues = config.knownTags[category] ?? [];
    const knownValueSet = new Set(knownValues);
    values.forEach((value, index) => {
      if (knownValueSet.has(value)) return;
      issues.push({
        path: ["tags", category, index],
        message: `Unknown tag "${value}" for category "${category}". Known tags: ${listAllowedValues(knownValues)}.`,
      });
    });
  }

  return issues;
}

export function validateKnownFilterCategories(
  filterConfig: FilterConfig | undefined,
  config: KnownPageTagsConfig
): PageTagValidationIssue[] {
  if (!filterConfig) return [];

  const knownCategoryKeys = Object.keys(config.knownTags);
  return filterConfig.categories
    .map((category, index) => ({
      category,
      index,
    }))
    .filter(({ category }) => !hasKnownTagCategory(config, category.key))
    .map(({ category, index }) => ({
      path: ["filterConfig", "categories", index, "key"],
      message: `Unknown filter category "${category.key}". Known categories: ${listAllowedValues(knownCategoryKeys)}.`,
    }));
}

export const pageBuilderSchema = z
  .object({
    /** Injected at load time from the folder path — omit from JSON files. */
    slug: z.string().optional(),
    title: z.string(),
    description: z.string().optional(),
    ogImage: z.string().optional(),
    /** Canonical URL override. Useful when the same content is reachable at multiple slugs. */
    canonicalUrl: z.string().optional(),
    /** Robots meta directive e.g. "noindex, nofollow". Defaults to indexable when omitted. */
    robots: z.string().optional(),
    /** Comma-separated keyword hints for SEO. */
    keywords: z.string().optional(),
    /** BCP 47 language tag for the page (e.g. "en", "en-US", "fr"). Rendered as the html lang attribute. */
    lang: z.string().optional(),
    /** JSON-LD structured data blob. Rendered as a <script type="application/ld+json"> tag. */
    structuredData: z.unknown().optional(),
    definitions: z.record(z.string(), pageBuilderDefinitionBlockSchema),
    sectionOrder: z.array(z.string()),
    preset: z.record(z.string(), pageBuilderDefinitionBlockSchema).optional(),
    presets: z.array(z.string()).optional(),
    triggers: z.array(z.string()).optional(),
    bgKey: z.string().optional(),
    passwordProtected: z.boolean().optional(),
    assetBaseUrl: z.string().optional(),
    onPageProgress: triggerActionSchema.optional(),
    transitions: z
      .union([backgroundTransitionEffectSchema, z.array(backgroundTransitionEffectSchema)])
      .optional(),
    disableOverlays: z.array(z.string()).optional(),
    scroll: pageScrollConfigSchema.optional(),
    figmaExportDiagnostics: figmaExportDiagnosticsPageFieldSchema.optional(),
    density: pageDensitySchema.optional(),
    forcedTheme: forcedThemeSchema.optional(),
    /** Taxonomy tags for this page. Record of category key → value list (e.g. { brand: ["Echo"], ability: ["Colorist"] }). */
    tags: pageTagsSchema.optional(),
    /** Filter configuration — only meaningful on listing pages (work index, shop index, etc.). */
    filterConfig: filterConfigSchema.optional(),
  })
  .passthrough();

export const resolvedPageSchema = z
  .object({
    slug: z.string().optional(),
    title: z.string(),
    description: z.string().optional(),
    ogImage: z.string().optional(),
    canonicalUrl: z.string().optional(),
    robots: z.string().optional(),
    keywords: z.string().optional(),
    lang: z.string().optional(),
    structuredData: z.unknown().optional(),
    bg: bgBlockSchema.optional(),
    sections: z.array(sectionBlockSchema).optional(),
    passwordProtected: z.boolean().optional(),
    assetBaseUrl: z.string().optional(),
    scroll: pageScrollConfigSchema.optional(),
    density: pageDensitySchema.optional(),
    forcedTheme: forcedThemeSchema.optional(),
    tags: pageTagsSchema.optional(),
    filterConfig: filterConfigSchema.optional(),
  })
  .passthrough();
