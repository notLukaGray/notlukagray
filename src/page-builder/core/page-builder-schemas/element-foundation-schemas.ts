import { z } from "zod";
import { motionPropsSchema, motionTimingSchema } from "./motion-props-schema";
import {
  cssInlineStyleSchema,
  jsonValueSchema,
  responsiveElementAlignSchema,
  responsiveElementAlignYSchema,
  responsiveStringSchema,
  responsiveTextAlignSchema,
  triggerActionSchema,
} from "./schema-primitives";
import { sectionEffectSchema } from "./section-effect-schemas";

export const borderGradientSchema = z.object({
  stroke: z.string().min(1),
  width: z.union([z.string(), z.number()]),
});

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

const constraintsObjectSchema = z.object({
  minWidth: z.string().optional(),
  maxWidth: z.string().optional(),
  minHeight: z.string().optional(),
  maxHeight: z.string().optional(),
});

export const elementLayoutConstraintsSchema = constraintsObjectSchema.optional();

const responsiveConstraintsSchema = z
  .union([
    constraintsObjectSchema.optional(),
    z.tuple([constraintsObjectSchema.optional(), constraintsObjectSchema.optional()]),
  ])
  .optional();

/**
 * Universal element interactions — available on any element type.
 * Fires the same page-builder action bus used by buttons, viewport triggers, and 3D events.
 */
export const elementInteractionsSchema = z
  .object({
    onClick: triggerActionSchema.optional(),
    onHoverEnter: triggerActionSchema.optional(),
    onHoverLeave: triggerActionSchema.optional(),
    onPointerDown: triggerActionSchema.optional(),
    onPointerUp: triggerActionSchema.optional(),
    onDoubleClick: triggerActionSchema.optional(),
    onDragEnd: triggerActionSchema.optional(), // fires when a drag gesture ends
    onDragStart: triggerActionSchema.optional(), // fires when a drag gesture starts
    /** CSS cursor style when this element has interactions */
    cursor: z
      .enum([
        "pointer",
        "default",
        "grab",
        "grabbing",
        "crosshair",
        "zoom-in",
        "zoom-out",
        "text",
        "move",
        "not-allowed",
      ])
      .optional(),
  })
  .optional();

export const elementLayoutSchema = z
  .object({
    id: z.string().optional(),
    width: responsiveStringSchema.optional(),
    height: responsiveStringSchema.optional(),
    borderRadius: responsiveStringSchema.optional(),
    constraints: responsiveConstraintsSchema,
    align: responsiveElementAlignSchema.optional(),
    alignY: responsiveElementAlignYSchema.optional(),
    textAlign: responsiveTextAlignSchema.optional(),
    marginTop: responsiveStringSchema.optional(),
    marginBottom: responsiveStringSchema.optional(),
    marginLeft: responsiveStringSchema.optional(),
    marginRight: responsiveStringSchema.optional(),
    zIndex: z.number().optional(),
    /** When true, hint loader to prioritize this element's fetch (e.g. fetchPriority=high for images). */
    priority: z.boolean().optional(),
    fixed: z.boolean().optional(),
    action: z.string().optional(),
    actionPayload: jsonValueSchema.optional(),
    showWhen: z
      .enum([
        "assetPlaying",
        "assetPaused",
        "assetMuted",
        "assetUnmuted",
        "videoFullscreen",
        "videoContained",
      ])
      .optional(),
    /** Gradient border ring rendered as a separate layer from `background` and solid `border`. */
    borderGradient: borderGradientSchema.optional(),
    wrapperStyle: cssInlineStyleSchema.optional(),
    /** Optional aria-* attributes spread onto the element wrapper (e.g. aria-label, aria-describedby). */
    aria: z.record(z.string(), z.union([z.string(), z.boolean()])).optional(),
    /** Optional Framer Motion config from JSON: initial, animate, exit, transition, variants. Full FM control. */
    motion: motionPropsSchema,
    /** When false, ignore system reduced-motion preference for this element (e.g. always run parallax/entrance). Default true = respect preference. */
    reduceMotion: z.boolean().optional(),
    /** Optional exit preset name (framer-motion-presets exitPresets) for unmount/hide. Use with ElementExitWrapper when show toggles. */
    exitPreset: z.string().optional(),
    /** Explicit entrance/exit semantics: when and how (trigger, viewport, presets). When set, overrides legacy animate/entrance* fields for entrance behavior. */
    motionTiming: motionTimingSchema,
    /** When inside a reorderable section: draggable unit. "frame" = outer layout container (default), "content" = inner content only. */
    dragUnit: z.enum(["frame", "content"]).optional(),
    /** When draggable: "elasticSnap" (default), "free", or "none". */
    dragBehavior: z.enum(["elasticSnap", "free", "none"]).optional(),
    /** When draggable: axis. "x" | "y" | "both". Section reorderAxis still applies to the list. */
    dragAxis: z.enum(["x", "y", "both"]).optional(),
    /** Universal pointer/click interactions — fires page-builder actions from any element. */
    interactions: elementInteractionsSchema,
    /** Hide this element when variable conditions are not met. Evaluated client-side against the variable store. */
    visibleWhen: z
      .object({
        variable: z.string().optional(),
        operator: z
          .enum(["equals", "notEquals", "gt", "gte", "lt", "lte", "contains", "startsWith"])
          .optional(),
        value: jsonValueSchema.optional(),
        conditions: z
          .array(
            z.object({
              variable: z.string(),
              operator: z.enum([
                "equals",
                "notEquals",
                "gt",
                "gte",
                "lt",
                "lte",
                "contains",
                "startsWith",
              ]),
              value: jsonValueSchema,
            })
          )
          .optional(),
        logic: z.enum(["and", "or"]).optional(),
      })
      .optional(),
    /** CSS opacity (0–1). */
    opacity: z.number().min(0).max(1).optional(),
    /** CSS mix-blend-mode value e.g. "multiply". */
    blendMode: z.string().optional(),
    /** Static initial visibility — false renders display:none. */
    hidden: z.boolean().optional(),
    /** CSS overflow. */
    overflow: z.enum(["hidden", "visible", "auto", "scroll"]).optional(),
    /** Raw CSS box-shadow string e.g. "0 4px 12px rgba(0,0,0,0.15)". */
    boxShadow: z.string().optional(),
    /** Raw CSS filter string e.g. "blur(4px) brightness(1.1)". */
    filter: z.string().optional(),
    /** Raw CSS backdrop-filter string. */
    backdropFilter: z.string().optional(),
    /** Generic visual effects payload supported on any surface-capable element. */
    effects: z.array(sectionEffectSchema).optional(),
    /** Rotation in degrees or CSS string (e.g. "45deg"). Mirrors field on image/video/vector/SVG schemas. */
    rotate: z.union([z.number(), z.string()]).optional(),
    /** Mirror element horizontally. Mirrors field on image/video/vector/SVG schemas. */
    flipHorizontal: z.boolean().optional(),
    /** Mirror element vertically. Mirrors field on image/video/vector/SVG schemas. */
    flipVertical: z.boolean().optional(),
    /** CSS text-decoration e.g. "underline". */
    textDecoration: z.string().optional(),
    /** CSS text-transform e.g. "uppercase". */
    textTransform: z.string().optional(),
  })
  .superRefine((value, ctx) => {
    if (!value.borderGradient || !value.wrapperStyle) return;
    const hasBorderStyle = Object.keys(value.wrapperStyle).some((key) =>
      BORDER_STYLE_KEYS.has(key)
    );
    if (!hasBorderStyle) return;
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: "Use either `borderGradient` or border/outline styles in wrapperStyle, not both",
      path: ["wrapperStyle"],
    });
  });

export const elementImageObjectFitSchema = z.enum(["cover", "contain", "fillWidth", "fillHeight"]);

export const responsiveObjectFitSchema = z
  .union([
    elementImageObjectFitSchema,
    z.tuple([elementImageObjectFitSchema, elementImageObjectFitSchema]),
  ])
  .optional();

const elementBodyVariantNumericSchema = z.union([
  z.literal(1),
  z.literal(2),
  z.literal(3),
  z.literal(4),
  z.literal(5),
  z.literal(6),
]);

export const elementBodyVariantSchema = elementBodyVariantNumericSchema;
export const responsiveElementBodyVariantSchema = z.union([
  elementBodyVariantNumericSchema,
  z.tuple([elementBodyVariantNumericSchema, elementBodyVariantNumericSchema]),
]);

export const elementSimpleLinkSchema = z.object({
  ref: z.string().min(1),
  external: z.boolean(),
});

export const elementGraphicLinkSchema = z
  .object({
    ref: z.string().optional(),
    external: z.boolean().optional(),
    hoverScale: z.number().optional(),
    hoverFill: z.string().optional(),
    activeFill: z.string().optional(),
    disabledFill: z.string().optional(),
    hoverStroke: z.string().optional(),
    activeStroke: z.string().optional(),
    disabledStroke: z.string().optional(),
    vectorTransition: z.union([z.string(), z.number()]).optional(),
    disabled: z.boolean().optional(),
  })
  .refine((v) => !v.ref || (v.ref && v.external !== undefined), {
    message: "external is required when ref is set",
  });

export const vectorColorsSchema = z.record(z.string(), z.string()).optional();

export const vectorShapeStyleSchema = z.object({
  fill: z.string().optional(),
  stroke: z.string().optional(),
  strokeWidth: z.union([z.number(), z.string()]).optional(),
  strokeLinecap: z.enum(["butt", "round", "square"]).optional(),
  strokeLinejoin: z.enum(["miter", "round", "bevel"]).optional(),
  opacity: z.number().optional(),
  transform: z.string().optional(),
});

export const vectorGradientStopSchema = z.object({
  offset: z.string(),
  color: z.string(),
  opacity: z.number().optional(),
});

export const vectorLinearGradientSchema = z.object({
  type: z.literal("linearGradient"),
  id: z.string(),
  x1: z.union([z.number(), z.string()]).optional(),
  y1: z.union([z.number(), z.string()]).optional(),
  x2: z.union([z.number(), z.string()]).optional(),
  y2: z.union([z.number(), z.string()]).optional(),
  gradientUnits: z.enum(["userSpaceOnUse", "objectBoundingBox"]).optional(),
  gradientTransform: z.string().optional(),
  stops: z.array(vectorGradientStopSchema),
});

export const vectorRadialGradientSchema = z.object({
  type: z.literal("radialGradient"),
  id: z.string(),
  cx: z.union([z.number(), z.string()]).optional(),
  cy: z.union([z.number(), z.string()]).optional(),
  r: z.union([z.number(), z.string()]).optional(),
  fx: z.union([z.number(), z.string()]).optional(),
  fy: z.union([z.number(), z.string()]).optional(),
  gradientUnits: z.enum(["userSpaceOnUse", "objectBoundingBox"]).optional(),
  stops: z.array(vectorGradientStopSchema),
});

export const vectorGradientSchema = z.discriminatedUnion("type", [
  vectorLinearGradientSchema,
  vectorRadialGradientSchema,
]);

export const vectorShapeSchema = z.discriminatedUnion("type", [
  z
    .object({
      type: z.literal("rect"),
      x: z.union([z.number(), z.string()]).optional(),
      y: z.union([z.number(), z.string()]).optional(),
      width: z.union([z.number(), z.string()]),
      height: z.union([z.number(), z.string()]),
      rx: z.union([z.number(), z.string()]).optional(),
      ry: z.union([z.number(), z.string()]).optional(),
    })
    .merge(vectorShapeStyleSchema),
  z
    .object({
      type: z.literal("circle"),
      cx: z.union([z.number(), z.string()]),
      cy: z.union([z.number(), z.string()]),
      r: z.union([z.number(), z.string()]),
    })
    .merge(vectorShapeStyleSchema),
  z
    .object({
      type: z.literal("ellipse"),
      cx: z.union([z.number(), z.string()]),
      cy: z.union([z.number(), z.string()]),
      rx: z.union([z.number(), z.string()]),
      ry: z.union([z.number(), z.string()]),
    })
    .merge(vectorShapeStyleSchema),
  z
    .object({
      type: z.literal("line"),
      x1: z.union([z.number(), z.string()]),
      y1: z.union([z.number(), z.string()]),
      x2: z.union([z.number(), z.string()]),
      y2: z.union([z.number(), z.string()]),
    })
    .merge(vectorShapeStyleSchema),
  z.object({ type: z.literal("polygon"), points: z.string() }).merge(vectorShapeStyleSchema),
  z.object({ type: z.literal("polyline"), points: z.string() }).merge(vectorShapeStyleSchema),
  z.object({ type: z.literal("path"), d: z.string() }).merge(vectorShapeStyleSchema),
]);
