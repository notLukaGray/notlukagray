"use client";

import type { FormFieldBlock } from "@pb/contracts/page-builder/core/page-builder-schemas";
import type { ElementBodyVariant } from "@pb/contracts/page-builder/core/page-builder-schemas";
import { firePageBuilderAction } from "@/page-builder/triggers";
import { FormFieldShell } from "./FormFieldShell";
import { getFormFieldInputClass, STRUCTURAL_SUBMIT_BUTTON } from "./form-field-typography";
import { resolveThemeStyleObject } from "@/page-builder/theme/theme-string";
import { usePageBuilderThemeMode } from "@/page-builder/theme/use-page-builder-theme-mode";

type Props = {
  field: FormFieldBlock;
  value?: unknown;
  disabled?: boolean;
  loadingText?: string;
  isSubmitting?: boolean;
  style: React.CSSProperties;
  resolvedLevel?: ElementBodyVariant;
};

export function FormFieldButton({
  field,
  disabled,
  loadingText,
  isSubmitting,
  style,
  resolvedLevel,
}: Props) {
  const themeMode = usePageBuilderThemeMode();
  if (field.fieldType !== "button" && field.fieldType !== "submit") return null;

  const label = field.label ?? "Submit";
  const buttonType = field.buttonType ?? "submit";
  const fieldDisabled = disabled || field.disabled === true || isSubmitting;
  const displayLabel =
    buttonType === "submit" && isSubmitting && (loadingText ?? field.loadingText)
      ? (loadingText ?? field.loadingText)
      : label;

  const buttonClass = getFormFieldInputClass(
    resolvedLevel,
    field.inputClassName,
    STRUCTURAL_SUBMIT_BUTTON
  );

  const handleClick = () => {
    if (fieldDisabled || buttonType !== "button") return;
    if (field.action) firePageBuilderAction(field.action, "trigger");
    if (field.href) window.location.href = field.href;
  };

  return (
    <FormFieldShell field={field} style={style}>
      <button
        type={buttonType}
        disabled={fieldDisabled}
        onClick={handleClick}
        className={buttonClass}
        style={
          resolveThemeStyleObject(field.inputStyle, themeMode) as React.CSSProperties | undefined
        }
      >
        {displayLabel}
      </button>
    </FormFieldShell>
  );
}
