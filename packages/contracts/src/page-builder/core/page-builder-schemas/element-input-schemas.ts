import { z } from "zod";
import { elementLayoutSchema } from "./element-foundation-schemas";

/**
 * Glass search/text input element.
 *
 * Renders an actual <input type="text"> inside a glass-capable layout wrapper.
 * Supports all standard layout/motion/effects fields via elementLayoutSchema.
 */
export const elementInputSchema = z
  .object({
    type: z.literal("elementInput"),
    /** Preset key for `pbBuilderDefaultsV1.elements.input` variant templates. */
    variant: z.enum(["default", "compact", "minimal"]).optional(),
    /** Placeholder text. Animates out on focus. Defaults to "Search". */
    placeholder: z.string().optional(),
    /** Accessible label for the input. */
    ariaLabel: z.string().optional(),
    /** Show a search icon on the left. Defaults to true. */
    showIcon: z.boolean().optional(),
    /** CSS color string for text and icon. Defaults to rgba(255,255,255,0.85). */
    color: z.string().optional(),
  })
  .merge(elementLayoutSchema);
