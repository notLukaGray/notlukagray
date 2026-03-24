import type { ComponentType } from "react";
import type {
  FormFieldBlock,
  FormFieldType,
  ElementBodyVariant,
} from "@/page-builder/core/page-builder-schemas";
import type { FormFieldValue } from "..";
import { FormFieldInput } from "./FormFieldInput";
import { FormFieldParagraph } from "./FormFieldParagraph";
import { FormFieldChoice } from "./FormFieldChoice";
import { FormFieldSubmit } from "./FormFieldSubmit";
import { FormFieldHidden } from "./FormFieldHidden";
import { FormFieldRange } from "./FormFieldRange";
import { FormFieldFile } from "./FormFieldFile";

export type FormFieldRenderProps = {
  field: FormFieldBlock;
  value: FormFieldValue;
  onChange: (value: FormFieldValue) => void;
  error?: string;
  disabled?: boolean;
  isSubmitting?: boolean;
  loadingText?: string;
  style: React.CSSProperties;
  resolvedLevel?: ElementBodyVariant;
};

/** Map fieldType → component; same pattern as ELEMENT_COMPONENTS. */
export const FORM_FIELD_COMPONENTS: Partial<
  Record<FormFieldType, ComponentType<FormFieldRenderProps>>
> = {
  text: FormFieldInput as ComponentType<FormFieldRenderProps>,
  email: FormFieldInput as ComponentType<FormFieldRenderProps>,
  password: FormFieldInput as ComponentType<FormFieldRenderProps>,
  tel: FormFieldInput as ComponentType<FormFieldRenderProps>,
  url: FormFieldInput as ComponentType<FormFieldRenderProps>,
  number: FormFieldInput as ComponentType<FormFieldRenderProps>,
  date: FormFieldInput as ComponentType<FormFieldRenderProps>,
  paragraph: FormFieldParagraph as ComponentType<FormFieldRenderProps>,
  checkbox: FormFieldChoice as ComponentType<FormFieldRenderProps>,
  checkboxGroup: FormFieldChoice as ComponentType<FormFieldRenderProps>,
  radio: FormFieldChoice as ComponentType<FormFieldRenderProps>,
  select: FormFieldChoice as ComponentType<FormFieldRenderProps>,
  switch: FormFieldChoice as ComponentType<FormFieldRenderProps>,
  range: FormFieldRange as ComponentType<FormFieldRenderProps>,
  file: FormFieldFile as ComponentType<FormFieldRenderProps>,
  hidden: FormFieldHidden as ComponentType<FormFieldRenderProps>,
  submit: FormFieldSubmit as ComponentType<FormFieldRenderProps>,
};
