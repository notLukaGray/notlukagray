"use client";

import { useMemo, type CSSProperties, type ReactNode } from "react";
import { buildWorkbenchThemeColorVarMap } from "@/app/theme/pb-workbench-color-var-map";
import { useWorkbenchPreviewContext } from "@/app/dev/workbench/workbench-preview-context";

export type WorkbenchElementPreviewFoundationTheme = "dark" | "light";

type Props = {
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
  /**
   * Which `/dev/colors` token set to scope under this subtree.
   * Default `dark` matches typical `/dev` dark shell and product dark surfaces.
   */
  foundationTheme?: WorkbenchElementPreviewFoundationTheme;
};

/**
 * Scopes workbench **color** tokens and default **body** typography onto rendered elements only.
 * Preview chrome (toolbars, labels) should stay **outside** this wrapper so app Tailwind dev theming
 * is unchanged.
 */
export function WorkbenchElementPreviewSurface({
  children,
  className,
  style,
  foundationTheme = "dark",
}: Props) {
  const { defaults } = useWorkbenchPreviewContext();
  const colorVarMap = useMemo(
    () => buildWorkbenchThemeColorVarMap(defaults.colors, foundationTheme),
    [defaults.colors, foundationTheme]
  );

  return (
    <div
      className={className}
      // Color vars are computed from workbench session (localStorage) vs server defaults — tiny
      // floating-point differences in OKLCH arithmetic across JS engines are expected and benign.
      // suppressHydrationWarning prevents the mismatch from being reported as an error.
      suppressHydrationWarning
      style={{
        ...colorVarMap,
        backgroundColor: "var(--pb-surface-root)",
        color: "var(--pb-text-primary)",
        fontFamily: "var(--font-body, var(--font-sans))",
        ...style,
      }}
    >
      {children}
    </div>
  );
}
