"use client";

import type { FormFieldBlock } from "@/page-builder/core/page-builder-schemas";
import type { ElementBodyVariant } from "@/page-builder/core/page-builder-schemas";
import type { FormFieldValue } from "..";
import { formFieldStructuralClasses } from "./form-field-classes";
import {
  getFormFieldLabelClass,
  getFormFieldInputClass,
  getFormFieldErrorClass,
  REQUIRED_INDICATOR,
  STRUCTURAL_INPUT_BASE,
} from "./form-field-typography";

const INPUT_FIELD_TYPES = ["text", "email", "password", "tel", "url", "number", "date"] as const;

function isInputFieldType(t: string): t is (typeof INPUT_FIELD_TYPES)[number] {
  return (INPUT_FIELD_TYPES as readonly string[]).includes(t);
}

type Props = {
  field: FormFieldBlock;
  value: FormFieldValue;
  onChange: (value: FormFieldValue) => void;
  error?: string;
  disabled?: boolean;
  style: React.CSSProperties;
  resolvedLevel?: ElementBodyVariant;
};

export function FormFieldInput({
  field,
  value,
  onChange,
  error,
  disabled,
  style,
  resolvedLevel,
}: Props) {
  if (!isInputFieldType(field.fieldType)) return null;

  const strValue = typeof value === "string" ? value : "";
  const id = field.name ? `form-${field.name}` : undefined;
  const hasError = Boolean(error);
  const labelClass = getFormFieldLabelClass(resolvedLevel, field.labelClassName);
  const inputClass = getFormFieldInputClass(
    resolvedLevel,
    field.inputClassName,
    STRUCTURAL_INPUT_BASE
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
        type={field.fieldType}
        value={strValue}
        onChange={(e) => onChange(e.target.value)}
        placeholder={field.placeholder}
        required={field.required}
        disabled={disabled}
        min={field.min as string | number | undefined}
        max={field.max as string | number | undefined}
        step={field.step as string | number | undefined}
        minLength={field.minLength}
        maxLength={field.maxLength}
        pattern={field.pattern}
        aria-invalid={hasError}
        aria-describedby={hasError && id ? `${id}-error` : undefined}
        aria-required={field.required}
        className={inputClass}
        style={{ borderColor: hasError ? formFieldStructuralClasses.inputBorderError : undefined }}
      />
      {hasError && error && (
        <p id={id ? `${id}-error` : undefined} className={errorClass} role="alert">
          {error}
        </p>
      )}
    </div>
  );
}
