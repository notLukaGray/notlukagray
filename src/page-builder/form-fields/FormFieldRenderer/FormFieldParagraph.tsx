import type { FormFieldBlock } from "@/page-builder/core/page-builder-schemas";
import type { ElementBodyVariant } from "@/page-builder/core/page-builder-schemas";
import type { FormFieldValue } from "..";
import { formFieldStructuralClasses } from "./form-field-classes";
import {
  getFormFieldLabelClass,
  getFormFieldInputClass,
  getFormFieldErrorClass,
  REQUIRED_INDICATOR,
  STRUCTURAL_TEXTAREA,
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

export function FormFieldParagraph({
  field,
  value,
  onChange,
  error,
  disabled,
  style,
  resolvedLevel,
}: Props) {
  if (field.fieldType !== "paragraph") return null;

  const strValue = typeof value === "string" ? value : "";
  const id = field.name ? `form-${field.name}` : undefined;
  const hasError = Boolean(error);
  const labelClass = getFormFieldLabelClass(resolvedLevel, field.labelClassName);
  const inputClass = getFormFieldInputClass(
    resolvedLevel,
    field.inputClassName,
    STRUCTURAL_TEXTAREA
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
      <textarea
        id={id}
        name={field.name}
        value={strValue}
        onChange={(e) => onChange(e.target.value)}
        placeholder={field.placeholder}
        required={field.required}
        disabled={disabled}
        rows={field.rows ?? 3}
        maxLength={field.maxLength}
        aria-invalid={hasError}
        aria-describedby={hasError && id ? `${id}-error` : undefined}
        aria-required={field.required}
        className={inputClass}
        style={{
          borderColor: hasError ? formFieldStructuralClasses.inputBorderError : undefined,
        }}
      />
      {hasError && error && (
        <p id={id ? `${id}-error` : undefined} className={errorClass} role="alert">
          {error}
        </p>
      )}
    </div>
  );
}
