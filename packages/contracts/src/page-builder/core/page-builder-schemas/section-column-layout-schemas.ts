import { z } from "zod";
import { sectionBorderSchema } from "./section-effect-schemas";
import { themeStringSchema } from "./schema-primitives";

const cssWidthPattern = /^(?:\d+(?:\.\d+)?(?:fr|%|px|rem|em|vw|vh)|[a-zA-Z][a-zA-Z0-9_-]*)$/;
const cssWidthSchema = z.string().refine((val) => cssWidthPattern.test(val.trim()), {
  message:
    "Width must be a valid CSS value: number with unit (fr, %, px, rem, em, vw, vh) or design token",
});

export const cssWidthOrFunctionSchema = z
  .string()
  .min(1)
  .max(120)
  .refine(
    (val) => {
      const t = val.trim();
      return cssWidthPattern.test(t) || /^(min|max|clamp)\([\s\S]+\)$/.test(t);
    },
    { message: "Width must be a length (e.g. 800px), or min/max/clamp(...)" }
  );

export const columnCountSchema = z.union([
  z.number().int().min(1).max(12),
  z
    .object({
      mobile: z.number().int().min(1).max(12).optional(),
      desktop: z.number().int().min(1).max(12).optional(),
    })
    .refine((obj) => obj.mobile !== undefined || obj.desktop !== undefined, {
      message: "At least one of mobile or desktop must be provided",
    }),
]);

const columnWidthsValueSchema = z.union([
  z.literal("equal"),
  z.literal("hug"),
  z.array(z.union([z.number().positive(), cssWidthSchema, z.literal("hug")])),
]);

export const columnWidthsSchema = z
  .union([
    columnWidthsValueSchema,
    z
      .object({
        mobile: columnWidthsValueSchema.optional(),
        desktop: columnWidthsValueSchema.optional(),
      })
      .refine((obj) => obj.mobile !== undefined || obj.desktop !== undefined, {
        message: "At least one of mobile or desktop columnWidths must be provided",
      }),
  ])
  .optional();

export const columnGapsSchema = z
  .union([
    z.string(),
    z.array(z.string()),
    z.object({
      mobile: z.union([z.string(), z.array(z.string())]).optional(),
      desktop: z.union([z.string(), z.array(z.string())]).optional(),
    }),
  ])
  .optional();

export const columnSpanSchema = z
  .union([z.number().int().min(1).max(12), z.literal("all")])
  .optional();
export const columnSpanMapSchema = z.record(z.string(), columnSpanSchema);
export const responsiveColumnSpanSchema = z
  .object({ mobile: columnSpanMapSchema.optional(), desktop: columnSpanMapSchema.optional() })
  .refine((obj) => obj.mobile !== undefined || obj.desktop !== undefined, {
    message: "At least one of mobile or desktop columnSpan must be provided",
  });

const gridModeSchema = z.enum(["columns", "grid"]);
export const responsiveGridModeSchema = z
  .union([
    gridModeSchema,
    z
      .object({ mobile: gridModeSchema.optional(), desktop: gridModeSchema.optional() })
      .refine((obj) => obj.mobile !== undefined || obj.desktop !== undefined, {
        message: "At least one of mobile or desktop gridMode must be provided",
      }),
  ])
  .optional();

export const columnStyleSchema = z.object({
  borderRadius: z.string().optional(),
  border: sectionBorderSchema.optional(),
  fill: themeStringSchema.optional(),
  padding: z.string().optional(),
  gap: z.string().optional(),
  justifyContent: z
    .enum(["flex-start", "center", "flex-end", "space-between", "space-around", "space-evenly"])
    .optional(),
  alignItems: z.enum(["flex-start", "center", "flex-end", "stretch"]).optional(),
  alignX: z.enum(["left", "center", "right", "stretch"]).optional(),
  alignY: z
    .enum(["top", "center", "bottom", "space-between", "space-around", "space-evenly"])
    .optional(),
  minHeight: z.string().optional(),
  maxHeight: z.string().optional(),
  minWidth: z.string().optional(),
  maxWidth: z.string().optional(),
  width: z.string().optional(),
  height: z.string().optional(),
  overflow: z.enum(["visible", "hidden", "auto", "scroll"]).optional(),
  overflowX: z.enum(["visible", "hidden", "auto", "scroll"]).optional(),
  overflowY: z.enum(["visible", "hidden", "auto", "scroll"]).optional(),
});

export const columnStylesSchema = z
  .union([
    z.array(columnStyleSchema),
    z
      .object({
        mobile: z.array(columnStyleSchema).optional(),
        desktop: z.array(columnStyleSchema).optional(),
      })
      .refine((obj) => obj.mobile !== undefined || obj.desktop !== undefined, {
        message: "At least one of mobile or desktop columnStyles must be provided",
      }),
  ])
  .optional();

export const itemStyleSchema = columnStyleSchema.extend({});

export const itemStylesSchema = z
  .union([
    z.record(z.string(), itemStyleSchema),
    z
      .object({
        mobile: z.record(z.string(), itemStyleSchema).optional(),
        desktop: z.record(z.string(), itemStyleSchema).optional(),
      })
      .refine((obj) => obj.mobile !== undefined || obj.desktop !== undefined, {
        message: "At least one of mobile or desktop itemStyles must be provided",
      }),
  ])
  .optional();

export const itemLayoutEntrySchema = z.object({
  column: z.number().int().min(0).max(11).optional(),
  row: z.number().int().min(0).optional(),
  columnSpan: columnSpanSchema,
  rowSpan: z.number().int().min(1).max(50).optional(),
  order: z.number().int().optional(),
  alignX: z.enum(["left", "center", "right", "stretch"]).optional(),
  alignY: z.enum(["top", "center", "bottom", "stretch"]).optional(),
  zIndex: z.number().optional(),
});

const itemLayoutMapSchema = z.record(z.string(), itemLayoutEntrySchema);
export const itemLayoutSchema = z
  .union([
    itemLayoutMapSchema,
    z
      .object({ mobile: itemLayoutMapSchema.optional(), desktop: itemLayoutMapSchema.optional() })
      .refine((obj) => obj.mobile !== undefined || obj.desktop !== undefined, {
        message: "At least one of mobile or desktop itemLayout must be provided",
      }),
  ])
  .optional();

export const elementOrderSchema = z
  .union([
    z.array(z.string()),
    z.object({ mobile: z.array(z.string()).optional(), desktop: z.array(z.string()).optional() }),
  ])
  .optional();

export const columnAssignmentsSchema = z
  .union([
    z.record(z.string(), z.number().int().min(0)),
    z.object({
      mobile: z.record(z.string(), z.number().int().min(0)).optional(),
      desktop: z.record(z.string(), z.number().int().min(0)).optional(),
    }),
  ])
  .optional();

export const columnAssignmentsRequiredSchema = z.union([
  z.record(z.string(), z.number().int().min(0)),
  z
    .object({
      mobile: z.record(z.string(), z.number().int().min(0)).optional(),
      desktop: z.record(z.string(), z.number().int().min(0)).optional(),
    })
    .refine((obj) => obj.mobile !== undefined || obj.desktop !== undefined, {
      message: "At least one of mobile or desktop columnAssignments must be provided",
    }),
]);
