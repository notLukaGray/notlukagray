import { useCallback, useState } from "react";
import type { FormFieldBlock } from "@pb/core/internal/page-builder-schemas";
import type { FormFieldValue } from "@/page-builder/form-fields";
import { validateFormField } from "@/page-builder/form-fields/FormFieldRenderer/form-field-validation";

function getFieldKey(field: FormFieldBlock, index: number): string {
  if (field.name && field.fieldType !== "submit") return field.name;
  return `field_${index}`;
}

function getInitialValue(field: FormFieldBlock): FormFieldValue {
  if (field.fieldType === "checkbox" || field.fieldType === "switch") return false;
  if (field.fieldType === "checkboxGroup") return [];
  if (field.fieldType === "hidden" && field.value !== undefined) return field.value;
  return "";
}

export function useFormBlockState(fields: FormFieldBlock[]) {
  const [values, setValues] = useState<Record<string, FormFieldValue>>(() => {
    const init: Record<string, FormFieldValue> = {};
    fields.forEach((field, i) => {
      const key = getFieldKey(field, i);
      if (field.fieldType !== "submit") init[key] = getInitialValue(field);
    });
    return init;
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const setValue = useCallback((key: string, value: FormFieldValue) => {
    setValues((prev) => ({ ...prev, [key]: value }));
    setErrors((prev) => {
      const next = { ...prev };
      delete next[key];
      return next;
    });
  }, []);

  const validateAll = useCallback((): boolean => {
    const nextErrors: Record<string, string> = {};
    fields.forEach((field, i) => {
      const key = getFieldKey(field, i);
      if (field.fieldType === "submit" || field.fieldType === "hidden") return;
      const value =
        values[key] ??
        (field.fieldType === "checkbox" || field.fieldType === "switch"
          ? false
          : field.fieldType === "checkboxGroup"
            ? []
            : "");
      const err = validateFormField(field, value);
      if (err) nextErrors[key] = err;
    });
    setErrors(nextErrors);
    setSubmitError(null);
    return Object.keys(nextErrors).length === 0;
  }, [fields, values]);

  return {
    values,
    errors,
    submitError,
    isSubmitting,
    setValues,
    setErrors,
    setSubmitError,
    setIsSubmitting,
    setValue,
    validateAll,
    getFieldKey,
  };
}
