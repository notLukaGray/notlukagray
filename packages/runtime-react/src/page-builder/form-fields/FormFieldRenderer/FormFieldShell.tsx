"use client";

import { useMemo, useRef, type CSSProperties, type ReactNode } from "react";
import type {
  FormFieldBlock,
  SectionEffect,
} from "@pb/contracts/page-builder/core/page-builder-schemas";
import { SectionGlassEffect } from "@/page-builder/section/stack/SectionGlassEffect";
import { usePageBuilderThemeMode } from "@/page-builder/theme/use-page-builder-theme-mode";
import { resolveThemeValueDeep } from "@/page-builder/theme/theme-string";

type Props = {
  field: FormFieldBlock;
  style: CSSProperties;
  children: ReactNode;
};

function coerceSectionEffects(value: unknown): SectionEffect[] | undefined {
  if (!Array.isArray(value)) return undefined;
  const entries = value.filter(
    (entry): entry is SectionEffect =>
      !!entry &&
      typeof entry === "object" &&
      "type" in entry &&
      typeof (entry as { type?: unknown }).type === "string"
  );
  return entries.length > 0 ? entries : undefined;
}

export function FormFieldShell({ field, style, children }: Props) {
  const themeMode = usePageBuilderThemeMode();
  const surfaceRef = useRef<HTMLDivElement | null>(null);
  const effects = useMemo(
    () => coerceSectionEffects(resolveThemeValueDeep(field.effects, themeMode)),
    [field.effects, themeMode]
  );
  const hasGlassEffect = (effects ?? []).some((effect) => effect.type === "glass");
  const wrapperStyle: CSSProperties = {
    ...style,
    ...(hasGlassEffect ? { position: "relative", overflow: "hidden" } : {}),
  };
  const contentStyle: CSSProperties | undefined = hasGlassEffect
    ? { position: "relative", zIndex: 1 }
    : undefined;
  const syncBorderRadius =
    typeof wrapperStyle.borderRadius === "string" ? wrapperStyle.borderRadius : undefined;

  return (
    <div ref={surfaceRef} style={wrapperStyle}>
      {hasGlassEffect && (
        <SectionGlassEffect
          effects={effects}
          sectionRef={surfaceRef}
          variant="auto"
          syncBorderRadius={syncBorderRadius}
        />
      )}
      <div style={contentStyle}>{children}</div>
    </div>
  );
}
