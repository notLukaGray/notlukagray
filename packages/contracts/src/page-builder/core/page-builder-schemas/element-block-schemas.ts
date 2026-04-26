import { z } from "zod";
import { elementLayoutSchema } from "./element-foundation-schemas";
import {
  elementBodySchema,
  elementButtonSchema,
  elementDividerSchema,
  elementHeadingSchema,
  elementImageSchema,
  elementLinkSchema,
  elementRangeSchema,
  elementInputSchema,
  elementRichTextSchema,
  elementSVGSchema,
  elementSpacerSchema,
  elementScrollProgressBarSchema,
  elementVectorSchema,
  elementVideoSchema,
  elementVideoTimeSchema,
  elementVideoQualitySelectSchema,
} from "./element-content-schemas";
import { elementModel3DSchema } from "./element-model3d-schemas";
import { elementRiveSchema } from "./element-rive-schemas";
import { sectionEffectSchema } from "./section-effect-schemas";
import {
  cssInlineStyleSchema,
  jsonValueSchema,
  responsiveStringSchema,
  themeStringSchema,
} from "./schema-primitives";

// z.lazy breaks the circular init (TS7022) by deferring evaluation until parse time.
// z.ZodType<unknown> annotation prevents TypeScript from trying to infer the recursive type.
const lazyElementBlock: z.ZodType<unknown> = z.lazy(() => elementBlockSchema);
const responsiveNumberSchema = z.union([z.number(), z.tuple([z.number(), z.number()])]).optional();
const nestedElementSectionSchema = z
  .object({
    elementOrder: z.array(z.string()).optional(),
    definitions: z.record(z.string(), lazyElementBlock),
  })
  .passthrough();

const elementGroupSchema = z
  .object({
    type: z.literal("elementGroup"),
    section: nestedElementSectionSchema,
    display: z.string().optional(),
    flexDirection: responsiveStringSchema.optional(),
    alignItems: responsiveStringSchema.optional(),
    justifyContent: responsiveStringSchema.optional(),
    /** Spacing between items; theme fallback when unset — `pbContentGuidelines.frameGapWhenUnset`. */
    gap: responsiveStringSchema.optional(),
    flexWrap: z.enum(["nowrap", "wrap", "wrap-reverse"]).optional(),
    /** Theme fallback when unset — `pbContentGuidelines.frameRowGapWhenUnset`. */
    rowGap: z.union([z.string(), z.number()]).optional(),
    padding: responsiveStringSchema.optional(),
    /** Per-side padding. Overrides the shorthand `padding` field if set. */
    paddingTop: z.union([z.string(), z.number()]).optional(),
    /** Per-side padding. Overrides the shorthand `padding` field if set. */
    paddingRight: z.union([z.string(), z.number()]).optional(),
    /** Per-side padding. Overrides the shorthand `padding` field if set. */
    paddingBottom: z.union([z.string(), z.number()]).optional(),
    /** Per-side padding. Overrides the shorthand `padding` field if set. */
    paddingLeft: z.union([z.string(), z.number()]).optional(),
    flex: responsiveStringSchema.optional(),
    columnCount: z.number().int().positive().optional(),
    /** Theme fallback when unset — `pbContentGuidelines.frameColumnGapWhenUnset`. */
    columnGap: z.union([z.string(), z.number()]).optional(),
    effects: z.array(sectionEffectSchema).optional(),
  })
  .merge(elementLayoutSchema)
  .passthrough();

const elementInfiniteScrollSchema = z
  .object({
    type: z.literal("elementInfiniteScroll"),
    section: nestedElementSectionSchema,
    scrollDirection: z.enum(["horizontal", "vertical"]).optional(),
    loop: z.boolean().optional(),
    initialIndex: z.number().int().optional(),
    selectedIndexVariable: z.string().optional(),
    selectedIdVariable: z.string().optional(),
    selectedValueVariable: z.string().optional(),
    selectedValues: z.record(z.string(), jsonValueSchema).optional(),
    snapAlign: z.enum(["start", "center", "end"]).optional(),
    centerOnClick: z.boolean().optional(),
    wheelLockMs: z.number().nonnegative().optional(),
    snapDurationMs: z.number().nonnegative().optional(),
    activeScale: responsiveNumberSchema,
    inactiveScale: responsiveNumberSchema,
    activeOpacity: responsiveNumberSchema,
    inactiveOpacity: responsiveNumberSchema,
    activeItemStyle: cssInlineStyleSchema.optional(),
    inactiveItemStyle: cssInlineStyleSchema.optional(),
    alignItems: responsiveStringSchema.optional(),
    justifyContent: responsiveStringSchema.optional(),
    gap: responsiveStringSchema.optional(),
    rowGap: z.union([z.string(), z.number()]).optional(),
    columnGap: z.union([z.string(), z.number()]).optional(),
    padding: responsiveStringSchema.optional(),
    paddingTop: z.union([z.string(), z.number()]).optional(),
    paddingRight: z.union([z.string(), z.number()]).optional(),
    paddingBottom: z.union([z.string(), z.number()]).optional(),
    paddingLeft: z.union([z.string(), z.number()]).optional(),
    effects: z.array(sectionEffectSchema).optional(),
  })
  .merge(elementLayoutSchema)
  .passthrough();

export const elementBlockSchema = z
  .discriminatedUnion("type", [
    elementHeadingSchema,
    elementBodySchema,
    elementLinkSchema,
    elementImageSchema,
    elementVideoSchema,
    elementVectorSchema,
    elementSVGSchema,
    elementRichTextSchema,
    elementRangeSchema,
    elementInputSchema,
    elementVideoTimeSchema,
    elementVideoQualitySelectSchema,
    elementSpacerSchema,
    elementDividerSchema,
    elementScrollProgressBarSchema,
    elementButtonSchema,
    elementModel3DSchema,
    elementRiveSchema,
    elementGroupSchema,
    elementInfiniteScrollSchema,
  ])
  .superRefine((value, ctx) => {
    if (!("borderGradient" in value) || !("wrapperStyle" in value)) return;
    const borderGradient = (value as { borderGradient?: unknown }).borderGradient;
    const wrapperStyle = (value as { wrapperStyle?: unknown }).wrapperStyle;
    if (!borderGradient || !wrapperStyle || typeof wrapperStyle !== "object") return;

    const BORDER_STYLE_KEYS = new Set([
      "border",
      "borderTop",
      "borderRight",
      "borderBottom",
      "borderLeft",
      "borderColor",
      "borderWidth",
      "borderStyle",
      "borderImage",
      "borderImageSource",
      "borderImageSlice",
      "outline",
    ]);
    const hasBorderStyle = Object.keys(wrapperStyle as Record<string, unknown>).some((key) =>
      BORDER_STYLE_KEYS.has(key)
    );
    if (!hasBorderStyle) return;
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: "Use either `borderGradient` or border/outline styles in wrapperStyle, not both",
      path: ["wrapperStyle"],
    });
  });

export const cssGradientDefinitionSchema = z.object({
  type: z.literal("cssGradient"),
  value: themeStringSchema,
});

export const sectionDefinitionBlockSchema = z.union([
  elementBlockSchema,
  cssGradientDefinitionSchema,
]);

export { figmaExporterMetaSchema, pageBuilderMetaSchema } from "./figma-exporter-meta-schema";
export type { FigmaExporterMeta, PageBuilderMeta } from "./figma-exporter-meta-schema";
