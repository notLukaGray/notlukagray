import { z } from "zod";
import { elementLayoutSchema } from "./element-foundation-schemas";
import {
  elementBodySchema,
  elementButtonSchema,
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
} from "./element-content-schemas";
import { elementModel3DSchema } from "./element-model3d-schemas";
import { elementRiveSchema } from "./element-rive-schemas";
import { sectionEffectSchema } from "./section-effect-schemas";

const elementGroupSchema = z
  .object({
    type: z.literal("elementGroup"),
    section: z.object({
      elementOrder: z.array(z.string()).optional(),
      // definitions holds child ElementBlocks. z.unknown() is required here because
      // elementGroupSchema is part of elementBlockSchema — z.lazy(() => elementBlockSchema)
      // would cause a circular initializer TS error (TS7022). The tree-walk casts to ElementBlock.
      definitions: z.record(z.string(), z.unknown()),
    }),
    display: z.string().optional(),
    flexDirection: z.string().optional(),
    alignItems: z.string().optional(),
    justifyContent: z.string().optional(),
    gap: z.string().optional(),
    flexWrap: z.enum(["nowrap", "wrap", "wrap-reverse"]).optional(),
    rowGap: z.union([z.string(), z.number()]).optional(),
    padding: z.string().optional(),
    /** Per-side padding. Overrides the shorthand `padding` field if set. */
    paddingTop: z.union([z.string(), z.number()]).optional(),
    /** Per-side padding. Overrides the shorthand `padding` field if set. */
    paddingRight: z.union([z.string(), z.number()]).optional(),
    /** Per-side padding. Overrides the shorthand `padding` field if set. */
    paddingBottom: z.union([z.string(), z.number()]).optional(),
    /** Per-side padding. Overrides the shorthand `padding` field if set. */
    paddingLeft: z.union([z.string(), z.number()]).optional(),
    flex: z.string().optional(),
    columnCount: z.number().int().positive().optional(),
    columnGap: z.union([z.string(), z.number()]).optional(),
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
    elementSpacerSchema,
    elementScrollProgressBarSchema,
    elementButtonSchema,
    elementModel3DSchema,
    elementRiveSchema,
    elementGroupSchema,
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
  value: z.string(),
});

export const sectionDefinitionBlockSchema = z.union([
  elementBlockSchema,
  cssGradientDefinitionSchema,
]);
