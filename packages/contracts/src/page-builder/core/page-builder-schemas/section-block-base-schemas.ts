import { z } from "zod";
import { REVEAL_PRESET_NAMES } from "../page-builder-motion-defaults";
import { elementBlockSchema } from "./element-block-schemas";
import { formFieldBlockSchema } from "./form-field-schemas";
import { motionPropsSchema, motionTimingSchema } from "./motion-props-schema";
import {
  columnAssignmentsRequiredSchema,
  columnCountSchema,
  columnGapsSchema,
  columnSpanMapSchema,
  columnStylesSchema,
  columnWidthsSchema,
  cssWidthOrFunctionSchema,
  elementOrderSchema,
  itemLayoutSchema,
  itemStylesSchema,
  responsiveColumnSpanSchema,
  responsiveGridModeSchema,
} from "./section-style-and-column-schemas";
import {
  jsonValueSchema,
  responsiveBooleanSchema,
  responsiveSectionAlignSchema,
  responsiveStringSchema,
  triggerActionSchema,
} from "./schema-primitives";
import {
  dividerLayerSchema,
  sectionBorderSchema,
  sectionEffectSchema,
} from "./section-style-and-column-schemas";
import { pageBuilderMetaSchema } from "./figma-exporter-meta-schema";

const scrollOpacityRangeSchema = z
  .object({
    input: z.tuple([z.number(), z.number()]).optional(),
    output: z.tuple([z.number(), z.number()]).optional(),
  })
  .optional();

const sectionContentSizeSchema = z.union([z.enum(["full", "hug"]), cssWidthOrFunctionSchema]);
const responsiveSectionContentSizeSchema = z.union([
  sectionContentSizeSchema,
  z.tuple([sectionContentSizeSchema, sectionContentSizeSchema]),
]);

const SECTION_CURSOR_VALUES = [
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
  "auto",
  "none",
] as const;

const sectionCursorSchema = z.preprocess(
  (value) =>
    typeof value === "string" && !(SECTION_CURSOR_VALUES as readonly string[]).includes(value)
      ? undefined
      : value,
  z.enum(SECTION_CURSOR_VALUES).optional()
);

const revealPresetSchema = z.preprocess(
  (value) =>
    typeof value === "string" && !(REVEAL_PRESET_NAMES as readonly string[]).includes(value)
      ? undefined
      : value,
  z.enum(REVEAL_PRESET_NAMES).optional()
);

export const baseSectionPropsSchema = z.object({
  id: z.string().optional(),
  /** Namespaced metadata (`meta.figma`, etc.); passthrough preserves extension keys. */
  meta: pageBuilderMetaSchema.optional(),

  ariaLabel: responsiveStringSchema.optional(),
  fill: responsiveStringSchema.optional(),
  layers: z.array(dividerLayerSchema).optional(),
  effects: z.array(sectionEffectSchema).optional(),
  width: responsiveStringSchema.optional(),
  height: responsiveStringSchema.optional(),
  minWidth: responsiveStringSchema.optional(),
  maxWidth: responsiveStringSchema.optional(),
  minHeight: responsiveStringSchema.optional(),
  maxHeight: responsiveStringSchema.optional(),
  align: responsiveSectionAlignSchema.optional(),
  marginLeft: responsiveStringSchema.optional(),
  marginRight: responsiveStringSchema.optional(),
  marginTop: responsiveStringSchema.optional(),
  marginBottom: responsiveStringSchema.optional(),
  borderRadius: responsiveStringSchema.optional(),
  border: sectionBorderSchema.optional(),

  boxShadow: z.string().optional(),

  filter: z.string().optional(),

  backdropFilter: z.string().optional(),
  clipPath: z.string().optional(),
  overflow: z.enum(["hidden", "visible", "auto", "scroll"]).optional(),
  borderTop: z.string().optional(),
  borderRight: z.string().optional(),
  borderBottom: z.string().optional(),
  borderLeft: z.string().optional(),
  cursor: sectionCursorSchema,
  aspectRatio: responsiveStringSchema.optional(),
  scrollSpeed: z.number().optional(),
  initialX: responsiveStringSchema.optional(),
  initialY: responsiveStringSchema.optional(),
  zIndex: z.number().optional(),
  onVisible: triggerActionSchema.optional(),
  onInvisible: triggerActionSchema.optional(),
  onProgress: triggerActionSchema.optional(),
  onViewportProgress: triggerActionSchema.optional(),
  threshold: z.number().optional(),
  triggerOnce: z.boolean().optional(),
  rootMargin: z.string().optional(),
  delay: z.number().optional(),

  motion: motionPropsSchema,

  reduceMotion: z.boolean().optional(),

  motionTiming: motionTimingSchema.optional(),

  scrollOpacityRange: scrollOpacityRangeSchema,
  sticky: z.boolean().optional(),
  stickyOffset: responsiveStringSchema.optional(),
  stickyPosition: z.enum(["top", "bottom"]).optional(),
  fixed: z.boolean().optional(),
  fixedPosition: z.enum(["top", "bottom", "left", "right"]).optional(),
  fixedOffset: responsiveStringSchema.optional(),
  // Keyboard triggers for this section (active while section is mounted)
  keyboardTriggers: z
    .array(
      z.object({
        key: z.string(),
        shift: z.boolean().optional(),
        ctrl: z.boolean().optional(),
        alt: z.boolean().optional(),
        meta: z.boolean().optional(),
        onKeyDown: triggerActionSchema.optional(),
        onKeyUp: triggerActionSchema.optional(),
        preventDefault: z.boolean().optional(),
      })
    )
    .optional(),
  // Timer triggers — delays and intervals
  timerTriggers: z
    .array(
      z.object({
        delay: z.number().optional(),
        interval: z.number().optional(),
        maxFires: z.number().optional(),
        action: triggerActionSchema,
      })
    )
    .optional(),
  // Cursor position as progress trigger
  cursorTriggers: z
    .array(
      z.object({
        axis: z.enum(["x", "y"]),
        action: triggerActionSchema,
        throttleMs: z.number().optional(),
      })
    )
    .optional(),
  // Scroll direction triggers — fire actions when user scrolls up or down
  scrollDirectionTriggers: z
    .array(
      z.object({
        onScrollDown: triggerActionSchema.optional(),
        onScrollUp: triggerActionSchema.optional(),

        threshold: z.number().optional(),
      })
    )
    .optional(),
  // Idle/active triggers — fire actions after a period of user inactivity
  idleTriggers: z
    .array(
      z.object({
        idleAfterMs: z.number().optional(),
        onIdle: triggerActionSchema.optional(),
        onActive: triggerActionSchema.optional(),
      })
    )
    .optional(),

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
});

export const sectionDividerSchema = baseSectionPropsSchema.extend({
  type: z.literal("divider"),
});

export const sectionContentBlockSchema = baseSectionPropsSchema.extend({
  type: z.literal("contentBlock"),
  elements: z.array(elementBlockSchema),
  flexDirection: z
    .union([
      z.enum(["row", "column", "row-reverse", "column-reverse"]),
      z.tuple([
        z.enum(["row", "column", "row-reverse", "column-reverse"]),
        z.enum(["row", "column", "row-reverse", "column-reverse"]),
      ]),
    ])
    .optional(),
  alignItems: responsiveStringSchema.optional(),
  justifyContent: responsiveStringSchema.optional(),
  flexWrap: z
    .union([
      z.enum(["nowrap", "wrap", "wrap-reverse"]),
      z.tuple([
        z.enum(["nowrap", "wrap", "wrap-reverse"]),
        z.enum(["nowrap", "wrap", "wrap-reverse"]),
      ]),
    ])
    .optional(),
  gap: responsiveStringSchema.optional(),
  rowGap: responsiveStringSchema.optional(),
  columnGap: responsiveStringSchema.optional(),

  reorderable: z.boolean().optional(),

  reorderAxis: z.enum(["x", "y"]).optional(),

  reorderDragUnit: z.enum(["frame", "content"]).optional(),

  reorderDragBehavior: z.enum(["elasticSnap", "free", "none"]).optional(),
  contentWidth: responsiveSectionContentSizeSchema.optional(),
  contentHeight: responsiveSectionContentSizeSchema.optional(),
});

const scrollProgressTriggerSchema = z
  .object({
    id: z.string(),
    invert: z.boolean().optional(),

    input: z.tuple([z.number(), z.number()]).optional(),
  })
  .optional();

export const sectionScrollContainerSchema = baseSectionPropsSchema.extend({
  type: z.literal("scrollContainer"),
  elements: z.array(elementBlockSchema),
  scrollDirection: z.enum(["horizontal", "vertical", "both"]).optional(),

  scrollProgressTrigger: scrollProgressTriggerSchema,

  scrollProgressTriggerId: z.string().optional(),
});

export const sectionColumnBaseSchema = baseSectionPropsSchema.extend({
  type: z.literal("sectionColumn"),
  elements: z.array(elementBlockSchema),
  columns: columnCountSchema,
  columnAssignments: columnAssignmentsRequiredSchema,
  columnWidths: columnWidthsSchema,
  columnGaps: columnGapsSchema,
  columnStyles: columnStylesSchema,
  itemStyles: itemStylesSchema,
  gridMode: responsiveGridModeSchema,
  gridDebug: responsiveBooleanSchema,
  gridAutoRows: responsiveStringSchema.optional(),
  elementOrder: elementOrderSchema,
  columnSpan: z.union([columnSpanMapSchema, responsiveColumnSpanSchema]).optional(),
  itemLayout: itemLayoutSchema,
  contentWidth: responsiveSectionContentSizeSchema.optional(),
  contentHeight: responsiveSectionContentSizeSchema.optional(),
});

export const sectionTriggerSchema = baseSectionPropsSchema.extend({
  type: z.literal("sectionTrigger"),
  id: z.string().optional(),
  onVisible: triggerActionSchema.optional(),
  onInvisible: triggerActionSchema.optional(),
  onProgress: triggerActionSchema.optional(),
  threshold: z.number().optional(),
  triggerOnce: z.boolean().optional(),
  rootMargin: z.string().optional(),
  delay: z.number().optional(),
});

export const sectionFormBlockSchema = baseSectionPropsSchema.extend({
  type: z.literal("formBlock"),
  fields: z.array(formFieldBlockSchema),

  action: z.string().optional(),
  method: z.enum(["get", "post"]).optional(),

  actionPayload: z.record(z.string(), z.union([z.string(), z.number(), z.boolean()])).optional(),
  contentWidth: responsiveSectionContentSizeSchema.optional(),
  contentHeight: responsiveSectionContentSizeSchema.optional(),
});

const revealTriggerModeSchema = z.enum(["hover", "click", "button", "external", "combined"]);
const revealExternalTriggerModeSchema = z.enum(["setTrue", "setFalse", "toggle"]);
const revealExpandAxisSchema = z.enum(["vertical", "horizontal", "both"]);

const revealSizeSchema = z
  .object({
    height: z.string().optional(),
    width: z.string().optional(),
  })
  .optional();

export const sectionRevealSchema = baseSectionPropsSchema.extend({
  type: z.literal("revealSection"),

  triggerMode: revealTriggerModeSchema.optional(),

  initialRevealed: z.boolean().optional(),

  revealOnHover: z.boolean().optional(),

  revealOnClick: z.boolean().optional(),

  toggleOnClick: z.boolean().optional(),

  externalTriggerKey: z.string().optional(),

  externalTriggerMode: revealExternalTriggerModeSchema.optional(),

  expandAxis: revealExpandAxisSchema.optional(),

  collapsedSize: revealSizeSchema.optional(),

  expandedSize: revealSizeSchema.optional(),

  expandDurationMs: z.number().optional(),

  collapseDurationMs: z.number().optional(),

  transitionEasing: z.string().optional(),

  collapsedElements: z.array(elementBlockSchema).optional(),

  revealedElements: z.array(elementBlockSchema).optional(),

  revealStaggerMs: z.number().optional(),

  revealDurationMs: z.number().optional(),

  revealPreset: revealPresetSchema,
});
