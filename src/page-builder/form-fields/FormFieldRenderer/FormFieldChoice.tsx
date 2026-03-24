"use client";

import type { FormFieldBlock, FormFieldOption } from "@/page-builder/core/page-builder-schemas";
import type { ElementBodyVariant } from "@/page-builder/core/page-builder-schemas";
import type { FormFieldValue } from "..";
import { formFieldStructuralClasses } from "./form-field-classes";
import {
  getFormFieldLabelClass,
  getFormFieldLabelInlineClass,
  getFormFieldInputClass,
  getFormFieldErrorClass,
  REQUIRED_INDICATOR,
  STRUCTURAL_SELECT,
} from "./form-field-typography";

const CHOICE_FIELD_TYPES = ["checkbox", "checkboxGroup", "radio", "select", "switch"] as const;

function isChoiceFieldType(t: string): t is (typeof CHOICE_FIELD_TYPES)[number] {
  return (CHOICE_FIELD_TYPES as readonly string[]).includes(t);
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

export function FormFieldChoice({
  field,
  value,
  onChange,
  error,
  disabled,
  style,
  resolvedLevel,
}: Props) {
  if (!isChoiceFieldType(field.fieldType)) return null;

  const id = field.name ? `form-${field.name}` : undefined;
  const hasError = Boolean(error);
  const labelClass = getFormFieldLabelClass(resolvedLevel, field.labelClassName);
  const labelInlineClass = getFormFieldLabelInlineClass(resolvedLevel, field.labelClassName);
  const errorClass = getFormFieldErrorClass(field.errorClassName);

  if (field.fieldType === "checkbox" || field.fieldType === "switch") {
    const checked = Boolean(value);
    return (
      <div style={style}>
        <label className={formFieldStructuralClasses.choiceLabel}>
          <input
            id={id}
            name={field.name}
            type="checkbox"
            checked={checked}
            onChange={(e) => onChange(e.target.checked)}
            required={field.required}
            disabled={disabled}
            aria-invalid={hasError}
            aria-describedby={hasError && id ? `${id}-error` : undefined}
            className={field.inputClassName ?? formFieldStructuralClasses.checkbox}
          />
          {field.label && (
            <span className={labelInlineClass}>
              {field.label}
              {field.required && (
                <span className={REQUIRED_INDICATOR} aria-hidden>
                  *
                </span>
              )}
            </span>
          )}
        </label>
        {hasError && error && (
          <p id={id ? `${id}-error` : undefined} className={errorClass} role="alert">
            {error}
          </p>
        )}
      </div>
    );
  }

  if (!field.options?.length) return null;

  const options = field.options as FormFieldOption[];

  if (field.fieldType === "select") {
    const strVal = typeof value === "string" ? value : "";
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
        <select
          id={id}
          name={field.name}
          value={strVal}
          onChange={(e) => onChange(e.target.value)}
          required={field.required}
          disabled={disabled}
          aria-invalid={hasError}
          aria-describedby={hasError && id ? `${id}-error` : undefined}
          className={getFormFieldInputClass(resolvedLevel, field.inputClassName, STRUCTURAL_SELECT)}
        >
          {field.placeholder && <option value="">{field.placeholder}</option>}
          {options.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
        {hasError && error && (
          <p id={id ? `${id}-error` : undefined} className={errorClass} role="alert">
            {error}
          </p>
        )}
      </div>
    );
  }

  if (field.fieldType === "radio") {
    const strVal = typeof value === "string" ? value : "";
    return (
      <div style={style}>
        {field.label && (
          <span className={labelClass}>
            {field.label}
            {field.required && (
              <span className={REQUIRED_INDICATOR} aria-hidden>
                *
              </span>
            )}
          </span>
        )}
        <div
          className={formFieldStructuralClasses.choiceGroup}
          role="radiogroup"
          aria-label={field.label}
          aria-required={field.required}
          aria-invalid={hasError}
        >
          {options.map((opt) => (
            <label key={opt.value} className={formFieldStructuralClasses.choiceLabel}>
              <input
                name={field.name}
                type="radio"
                value={opt.value}
                checked={strVal === opt.value}
                onChange={() => onChange(opt.value)}
                disabled={disabled}
                className={formFieldStructuralClasses.radio}
              />
              <span className={labelInlineClass}>{opt.label}</span>
            </label>
          ))}
        </div>
        {hasError && error && (
          <p id={id ? `${id}-error` : undefined} className={errorClass} role="alert">
            {error}
          </p>
        )}
      </div>
    );
  }

  if (field.fieldType === "checkboxGroup") {
    const arrVal = Array.isArray(value) ? value : [];
    const toggle = (v: string) => {
      const next = arrVal.includes(v) ? arrVal.filter((x) => x !== v) : [...arrVal, v];
      onChange(next);
    };
    return (
      <div style={style}>
        {field.label && (
          <span className={labelClass}>
            {field.label}
            {field.required && (
              <span className={REQUIRED_INDICATOR} aria-hidden>
                *
              </span>
            )}
          </span>
        )}
        <div
          className={formFieldStructuralClasses.choiceGroup}
          role="group"
          aria-label={field.label}
        >
          {options.map((opt) => (
            <label key={opt.value} className={formFieldStructuralClasses.choiceLabel}>
              <input
                name={field.name}
                type="checkbox"
                value={opt.value}
                checked={arrVal.includes(opt.value)}
                onChange={() => toggle(opt.value)}
                disabled={disabled}
                aria-invalid={hasError}
                className={formFieldStructuralClasses.checkboxGroupItem}
              />
              <span className={labelInlineClass}>{opt.label}</span>
            </label>
          ))}
        </div>
        {hasError && error && (
          <p id={id ? `${id}-error` : undefined} className={errorClass} role="alert">
            {error}
          </p>
        )}
      </div>
    );
  }

  return null;
}
