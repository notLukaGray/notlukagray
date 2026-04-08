"use client";

import type { FormFieldBlock } from "@pb/core/internal/page-builder-schemas";
import type { ElementBodyVariant } from "@pb/core/internal/page-builder-schemas";
import type { FormFieldValue } from "..";
import {
  getFormFieldLabelClass,
  getFormFieldErrorClass,
  REQUIRED_INDICATOR,
} from "./form-field-typography";

type Props = {
  field: FormFieldBlock;
  value: FormFieldValue;
  onChange: (value: FormFieldValue) => void;
  error?: string;
  disabled?: boolean;
  style: React.CSSProperties;
  resolvedLevel?: ElementBodyVariant;
};

export function FormFieldRange({
  field,
  value,
  onChange,
  error,
  disabled,
  style,
  resolvedLevel,
}: Props) {
  if (field.fieldType !== "range") return null;

  const strValue = typeof value === "string" ? value : "";
  const id = field.name ? `form-${field.name}` : undefined;
  const numVal = strValue === "" ? (field.min ?? 0) : Number(strValue);
  const hasError = Boolean(error);
  const labelClass = getFormFieldLabelClass(resolvedLevel, field.labelClassName);
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
        type="range"
        value={numVal}
        onChange={(e) => onChange(e.target.value as string)}
        min={field.min as number | string | undefined}
        max={field.max as number | string | undefined}
        step={field.step as number | string | undefined}
        disabled={disabled}
        aria-invalid={hasError}
        aria-describedby={hasError && id ? `${id}-error` : undefined}
        className={field.inputClassName ?? "w-full"}
      />
      {hasError && error && (
        <p id={id ? `${id}-error` : undefined} className={errorClass} role="alert">
          {error}
        </p>
      )}
    </div>
  );
}
