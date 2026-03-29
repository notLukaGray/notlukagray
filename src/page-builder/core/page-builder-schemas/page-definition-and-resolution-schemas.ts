import { z } from "zod";
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

const sectionBlockWithElementOrderSchema = baseSectionPropsSchema.extend({
  type: z.enum(["contentBlock", "scrollContainer"]),
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
  sectionBlockWithElementOrderSchema,
  sectionColumnDefinitionSchema,
]);

export const backgroundTransitionEffectSchema = z.discriminatedUnion("type", [
  z.object({
    type: z.literal("TIME"),
    from: z.string(),
    to: z.string(),
    duration: z.number().positive(),
    easing: z.string().optional(),
  }),
  z.object({
    type: z.literal("TRIGGER"),
    from: z.string(),
    to: z.string(),
    duration: z.number().positive(),
    easing: z.string().optional(),
    id: z.string().optional(),
  }),
  z.object({
    type: z.literal("SCROLL"),
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
});

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

export const pageBuilderSchema = z
  .object({
    slug: z.string(),
    title: z.string(),
    description: z.string().optional(),
    ogImage: z.string().optional(),
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
  })
  .passthrough();

export const resolvedPageSchema = z
  .object({
    slug: z.string(),
    title: z.string(),
    description: z.string().optional(),
    ogImage: z.string().optional(),
    bg: bgBlockSchema.optional(),
    sections: z.array(sectionBlockSchema).optional(),
    passwordProtected: z.boolean().optional(),
    assetBaseUrl: z.string().optional(),
    scroll: pageScrollConfigSchema.optional(),
  })
  .passthrough();
