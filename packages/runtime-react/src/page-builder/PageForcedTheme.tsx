"use client";

import * as React from "react";

type ForcedTheme = "light" | "dark";

const STORAGE_KEY = "theme";
const DEFAULT_THEME: ForcedTheme = "dark";

function normalizeTheme(theme: string | null): ForcedTheme | null {
  return theme === "light" || theme === "dark" ? theme : null;
}

function resolvePreferredTheme(): ForcedTheme {
  const stored = normalizeTheme(window.localStorage.getItem(STORAGE_KEY));
  if (stored) return stored;
  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : DEFAULT_THEME;
}

function applyTheme(theme: ForcedTheme): void {
  const root = document.documentElement;
  root.classList.remove("light", "dark");
  root.classList.add(theme);
}

export function pageForcedThemeInlineScript(theme: ForcedTheme): string {
  return `document.documentElement.dataset.pbForcedTheme=${JSON.stringify(theme)};document.documentElement.classList.remove("light","dark");document.documentElement.classList.add(${JSON.stringify(theme)});`;
}

export function PageForcedTheme({ theme }: { theme?: ForcedTheme }) {
  React.useEffect(() => {
    if (theme !== "light" && theme !== "dark") return;

    const root = document.documentElement;
    root.dataset.pbForcedTheme = theme;
    applyTheme(theme);

    return () => {
      delete root.dataset.pbForcedTheme;
      applyTheme(resolvePreferredTheme());
    };
  }, [theme]);

  return null;
}
