import { z } from "zod";
import { responsiveElementBodyVariantSchema } from "./element-foundation-schemas";
import {
  cssInlineStyleSchema,
  responsiveElementAlignSchema,
  responsiveStringSchema,
  responsiveTextAlignSchema,
} from "./schema-primitives";

/** Option for choice fields (radio, select, checkboxGroup). */
export const formFieldOptionSchema = z.object({
  value: z.string(),
  label: z.string(),
});

/** Style (appearance) modifiers — how the form field looks. Reuses element-style primitives. */
export const formFieldStyleSchema = z.object({
  width: responsiveStringSchema.optional(),
  align: responsiveElementAlignSchema.optional(),
  marginTop: responsiveStringSchema.optional(),
  marginBottom: responsiveStringSchema.optional(),
  marginLeft: responsiveStringSchema.optional(),
  marginRight: responsiveStringSchema.optional(),
  textAlign: responsiveTextAlignSchema.optional(),
  padding: responsiveStringSchema.optional(),
  fill: responsiveStringSchema.optional(),
  stroke: responsiveStringSchema.optional(),
  borderRadius: responsiveStringSchema.optional(),
  borderWidth: responsiveStringSchema.optional(),
  wrapperStyle: cssInlineStyleSchema.optional(),
  /** Optional Tailwind/class override for label (e.g. "text-lg font-bold"). Default typography from level. */
  labelClassName: z.string().optional(),
  /** Optional Tailwind/class override for input/control (e.g. "text-lg"). Default typography from level. */
  inputClassName: z.string().optional(),
  /** Optional inline style object applied directly to the native input/control element. */
  inputStyle: cssInlineStyleSchema.optional(),
  /** Optional class for error message text. */
  errorClassName: z.string().optional(),
});

/** fieldType enum: one container, many types. Validation and HTML behavior follow from type. */
export const formFieldTypeSchema = z.enum([
  "text",
  "email",
  "password",
  "tel",
  "url",
  "number",
  "date",
  "paragraph",
  "checkbox",
  "checkboxGroup",
  "radio",
  "select",
  "switch",
  "range",
  "file",
  "hidden",
  "submit",
]);

/** Common (content) + Style merged into one form field block. */
export const formFieldBlockSchema = z
  .object({
    type: z.literal("formField"),
    fieldType: formFieldTypeSchema,
    /** Typography level (1–6), same as element body. Drives label and input text size from JSON. */
    level: responsiveElementBodyVariantSchema.optional(),
    name: z.string().optional(),
    label: z.string().optional(),
    placeholder: z.string().optional(),
    required: z.boolean().optional(),
    value: z.string().optional(),
    minLength: z.number().optional(),
    maxLength: z.number().optional(),
    pattern: z.string().optional(),
    rows: z.number().optional(),
    min: z.union([z.number(), z.string()]).optional(),
    max: z.union([z.number(), z.string()]).optional(),
    step: z.union([z.number(), z.string()]).optional(),
    options: z.array(formFieldOptionSchema).optional(),
    accept: z.string().optional(),
    multiple: z.boolean().optional(),
    loadingText: z.string().optional(),
  })
  .merge(formFieldStyleSchema);

export type FormFieldOption = z.infer<typeof formFieldOptionSchema>;
export type FormFieldStyle = z.infer<typeof formFieldStyleSchema>;
export type FormFieldType = z.infer<typeof formFieldTypeSchema>;
export type FormFieldBlock = z.infer<typeof formFieldBlockSchema>;
