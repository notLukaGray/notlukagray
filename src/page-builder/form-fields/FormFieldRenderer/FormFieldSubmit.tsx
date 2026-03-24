"use client";

import type { FormFieldBlock } from "@/page-builder/core/page-builder-schemas";
import type { ElementBodyVariant } from "@/page-builder/core/page-builder-schemas";
import { getFormFieldInputClass, STRUCTURAL_SUBMIT_BUTTON } from "./form-field-typography";

type Props = {
  field: FormFieldBlock;
  value?: unknown;
  disabled?: boolean;
  loadingText?: string;
  isSubmitting?: boolean;
  style: React.CSSProperties;
  resolvedLevel?: ElementBodyVariant;
};

export function FormFieldSubmit({
  field,
  disabled,
  loadingText,
  isSubmitting,
  style,
  resolvedLevel,
}: Props) {
  if (field.fieldType !== "submit") return null;

  const label = field.label ?? "Submit";
  const displayLabel =
    isSubmitting && (loadingText ?? field.loadingText) ? (loadingText ?? field.loadingText) : label;

  const buttonClass = getFormFieldInputClass(
    resolvedLevel,
    field.inputClassName,
    STRUCTURAL_SUBMIT_BUTTON
  );

  return (
    <div style={style}>
      <button type="submit" disabled={disabled ?? isSubmitting} className={buttonClass}>
        {displayLabel}
      </button>
    </div>
  );
}
