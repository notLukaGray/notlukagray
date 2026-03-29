import { z } from "zod";
import {
  cssInlineStyleSchema,
  responsiveStringSchema,
  triggerActionSchema,
} from "./schema-primitives";
import {
  buttonActionSchema,
  elementButtonSchema,
  parseButtonAction,
  type ButtonAction,
} from "./element-button-schemas";
import {
  elementGraphicLinkSchema,
  elementLayoutSchema,
  elementSimpleLinkSchema,
  responsiveElementBodyVariantSchema,
  responsiveObjectFitSchema,
  vectorColorsSchema,
  vectorGradientSchema,
  vectorShapeSchema,
} from "./element-foundation-schemas";
import { elementRangeSchema } from "./element-range-schemas";
import { elementInputSchema } from "./element-input-schemas";

const headingLevelSchema = z.union([
  z.literal(1),
  z.literal(2),
  z.literal(3),
  z.literal(4),
  z.literal(5),
  z.literal(6),
]);

const elementHeadingSchema = z
  .object({
    type: z.literal("elementHeading"),
    level: headingLevelSchema,
    /** Optional semantic heading level (h1–h6) for document outline. When set, used for the element tag; `level` still drives typography style. Use to fix heading order (e.g. level 4 style with semanticLevel 2 for correct outline). */
    semanticLevel: headingLevelSchema.optional(),
    text: z.string(),
    wordWrap: z.boolean().optional(),
    letterSpacing: z.union([z.string(), z.number()]).optional(),
    lineSpacing: z.union([z.string(), z.number()]).optional(),
    /** When set, renders the variable value from the store instead of static `text`. */
    variableKey: z.string().optional(),
    fontFamily: z.string().optional(),
    fontSize: z.union([z.string(), z.number()]).optional(),
    fontWeight: z.union([z.string(), z.number()]).optional(),
    fontFeatureSettings: z.string().optional(),
    textOverflow: z.string().optional(),
    textStroke: z.string().optional(),
    verticalAlign: z.string().optional(),
    paragraphSpacing: z.union([z.string(), z.number()]).optional(),
    maxLines: z.number().int().positive().optional(),
  })
  .merge(elementLayoutSchema);

const elementBodySchema = z
  .object({
    type: z.literal("elementBody"),
    text: z.string(),
    level: responsiveElementBodyVariantSchema.optional(),
    wordWrap: z.boolean().optional(),
    letterSpacing: z.union([z.string(), z.number()]).optional(),
    lineSpacing: z.union([z.string(), z.number()]).optional(),
    /** When set, renders the variable value from the store instead of static `text`. */
    variableKey: z.string().optional(),
    fontFamily: z.string().optional(),
    fontSize: z.union([z.string(), z.number()]).optional(),
    fontWeight: z.union([z.string(), z.number()]).optional(),
    lineHeight: z.union([z.string(), z.number()]).optional(),
    /** Direct text color override. Takes precedence over typography class color. */
    color: z.string().optional(),
    fontFeatureSettings: z.string().optional(),
    textOverflow: z.string().optional(),
    textStroke: z.string().optional(),
    verticalAlign: z.string().optional(),
    paragraphSpacing: z.union([z.string(), z.number()]).optional(),
    maxLines: z.number().int().positive().optional(),
  })
  .merge(elementLayoutSchema);

const elementLinkSchema = z
  .object({
    type: z.literal("elementLink"),
    label: z.string(),
    href: z.string(),
    external: z.boolean().optional(),
    copyType: z.enum(["heading", "body"]),
    level: responsiveElementBodyVariantSchema.optional(),
    wordWrap: z.boolean().optional(),
    linkDefault: z.string().optional(),
    linkHover: z.string().optional(),
    linkActive: z.string().optional(),
    linkDisabled: z.string().optional(),
    linkTransition: z.union([z.string(), z.number()]).optional(),
    disabled: z.boolean().optional(),
    fontFamily: z.string().optional(),
    fontSize: z.union([z.string(), z.number()]).optional(),
    fontWeight: z.union([z.string(), z.number()]).optional(),
    fontFeatureSettings: z.string().optional(),
    textOverflow: z.string().optional(),
    textStroke: z.string().optional(),
    verticalAlign: z.string().optional(),
    paragraphSpacing: z.union([z.string(), z.number()]).optional(),
  })
  .merge(elementLayoutSchema)
  .refine(
    (data) => {
      if (data.copyType === "heading") return data.level !== undefined;
      return true;
    },
    { message: "level is required when copyType is 'heading'", path: ["level"] }
  );

const elementImageSchema = z
  .object({
    type: z.literal("elementImage"),
    src: z.string(),
    alt: z.string(),
    objectFit: responsiveObjectFitSchema,
    objectPosition: z.string().optional(),
    rotate: z.union([z.number(), z.string()]).optional(),
    flipHorizontal: z.boolean().optional(),
    flipVertical: z.boolean().optional(),
    link: elementSimpleLinkSchema.optional(),
    aspectRatio: responsiveStringSchema.optional(),
    imageRotation: z.number().optional(),
    imageCrop: z
      .object({
        x: z.number().optional(),
        y: z.number().optional(),
        scale: z.number().optional(),
      })
      .optional(),
    imageFilters: z
      .object({
        brightness: z.number().optional(),
        contrast: z.number().optional(),
        saturate: z.number().optional(),
        blur: z.number().optional(),
        grayscale: z.number().optional(),
        sepia: z.number().optional(),
        hueRotate: z.number().optional(),
        invert: z.number().optional(),
      })
      .optional(),
    fillOpacity: z.number().min(0).max(1).optional(),
  })
  .merge(elementLayoutSchema);

const elementVideoSchema = z
  .object({
    type: z.literal("elementVideo"),
    src: z.string(),
    /** Poster (Bunny asset key or resolved URL). Required. */
    poster: z.string(),
    ariaLabel: z.string().optional(),
    autoplay: z.boolean().optional(),
    loop: z.boolean().optional(),
    muted: z.boolean().optional(),
    objectFit: responsiveObjectFitSchema,
    objectPosition: z.string().optional(),
    rotate: z.union([z.number(), z.string()]).optional(),
    flipHorizontal: z.boolean().optional(),
    flipVertical: z.boolean().optional(),
    showPlayButton: z.boolean().optional(),
    link: elementSimpleLinkSchema.optional(),
    aspectRatio: responsiveStringSchema.optional(),
    module: z.string().optional(),
    /** Action to fire when video starts playing. */
    onVideoPlay: triggerActionSchema.optional(),
    /** Action to fire when video is paused. */
    onVideoPause: triggerActionSchema.optional(),
    /** Action to fire when video ends. */
    onVideoEnd: triggerActionSchema.optional(),
  })
  .merge(elementLayoutSchema);

const elementVectorSchema = z
  .object({
    type: z.literal("elementVector"),
    viewBox: z.string(),
    ariaLabel: z.string().optional(),
    preserveAspectRatio: z.string().optional(),
    shapes: z.array(vectorShapeSchema),
    colors: vectorColorsSchema,
    gradients: z.array(vectorGradientSchema).optional(),
    strokeGroup: z
      .object({
        stroke: z.string(),
        strokeWidth: z.number().optional(),
        strokeLinejoin: z.enum(["miter", "round", "bevel"]).optional(),
        strokeMiterlimit: z.number().optional(),
        opacity: z.number().optional(),
        blendMode: z.string().optional(),
      })
      .optional(),
    rotate: z.union([z.number(), z.string()]).optional(),
    flipHorizontal: z.boolean().optional(),
    flipVertical: z.boolean().optional(),
    link: elementGraphicLinkSchema.optional(),
  })
  .merge(elementLayoutSchema);

const elementSVGSchema = z
  .object({
    type: z.literal("elementSVG"),
    markup: z.string(),
    ariaLabel: z.string().optional(),
    rotate: z.union([z.number(), z.string()]).optional(),
    flipHorizontal: z.boolean().optional(),
    flipVertical: z.boolean().optional(),
    link: elementGraphicLinkSchema.optional(),
  })
  .merge(elementLayoutSchema);

const elementRichTextSchema = z
  .object({
    type: z.literal("elementRichText"),
    content: z.string(),
    markup: z.string().optional(),
    level: responsiveElementBodyVariantSchema.optional(),
    wordWrap: z.boolean().optional(),
  })
  .merge(elementLayoutSchema);

const elementVideoTimeSchema = z
  .object({
    type: z.literal("elementVideoTime"),
    format: z.string().optional(),
    level: responsiveElementBodyVariantSchema.optional(),
    wordWrap: z.boolean().optional(),
    style: cssInlineStyleSchema.optional(),
  })
  .merge(elementLayoutSchema);

const elementSpacerSchema = z
  .object({ type: z.literal("elementSpacer") })
  .merge(elementLayoutSchema);

/** Scroll progress bar element. Tracks parent section scroll (0→1) via SectionScrollTargetContext. */
const elementScrollProgressBarSchema = z
  .object({
    type: z.literal("elementScrollProgressBar"),
    /** Bar height in CSS; when omitted uses motion-defaults progressBar. */
    height: z.string().optional(),
    /** Bar fill color; when omitted uses motion-defaults progressBar. */
    fill: z.string().optional(),
    /** Track background; when omitted uses motion-defaults progressBar. */
    trackBackground: z.string().optional(),
    /** useScroll offset; e.g. ["start end", "end start"]. */
    offset: z.tuple([z.string(), z.string()]).optional(),
  })
  .merge(elementLayoutSchema);

export { buttonActionSchema, parseButtonAction };
export type { ButtonAction };

export {
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
};
