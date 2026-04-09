"use client";

import type { FormFieldBlock } from "@pb/contracts/page-builder/core/page-builder-schemas";
import type { ElementBodyVariant } from "@pb/contracts/page-builder/core/page-builder-schemas";
import { formFieldStructuralClasses } from "./form-field-classes";
import {
  getFormFieldLabelClass,
  getFormFieldInputClass,
  getFormFieldErrorClass,
  REQUIRED_INDICATOR,
} from "./form-field-typography";

type Props = {
  field: FormFieldBlock;
  value?: unknown;
  error?: string;
  disabled?: boolean;
  style: React.CSSProperties;
  resolvedLevel?: ElementBodyVariant;
};

export function FormFieldFile({ field, error, disabled, style, resolvedLevel }: Props) {
  if (field.fieldType !== "file") return null;

  const id = field.name ? `form-${field.name}` : undefined;
  const hasError = Boolean(error);
  const labelClass = getFormFieldLabelClass(resolvedLevel, field.labelClassName);
  const inputClass = getFormFieldInputClass(
    resolvedLevel,
    field.inputClassName,
    formFieldStructuralClasses.fileInput
  );
  const errorClass = getFormFieldErrorClass(field.errorClassName);

  return (
    <div style={style}>
      {field.label && (
        <label htmlFor={id} className={labelClass}>
          {field.label}
          {field.required && (
            <span className={REQUIRED_INDICATOR} aria-hidden>
              *
            </span>
          )}
        </label>
      )}
      <input
        id={id}
        name={field.name}
        type="file"
        accept={field.accept}
        multiple={field.multiple}
        required={field.required}
        disabled={disabled}
        aria-invalid={hasError}
        aria-describedby={hasError && id ? `${id}-error` : undefined}
        className={inputClass}
      />
      {hasError && error && (
        <p id={id ? `${id}-error` : undefined} className={errorClass} role="alert">
          {error}
        </p>
      )}
    </div>
  );
}
