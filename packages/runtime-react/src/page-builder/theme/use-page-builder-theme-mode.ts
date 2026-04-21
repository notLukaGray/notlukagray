"use client";

import { useSyncExternalStore } from "react";
import type { PageBuilderThemeMode } from "./theme-string";

function readThemeMode(): PageBuilderThemeMode {
  if (typeof document === "undefined") return "dark";
  const root = document.documentElement;
  const forcedTheme = root.dataset.pbForcedTheme;
  if (forcedTheme === "light" || forcedTheme === "dark") return forcedTheme;
  return root.classList.contains("dark") ? "dark" : "light";
}

function subscribe(callback: () => void): () => void {
  if (typeof document === "undefined") return () => {};
  const root = document.documentElement;
  const observer = new MutationObserver(callback);
  observer.observe(root, {
    attributes: true,
    attributeFilter: ["class", "data-pb-forced-theme"],
  });

  const onStorage = (event: StorageEvent) => {
    if (event.key === "theme") callback();
  };
  window.addEventListener("storage", onStorage);

  return () => {
    observer.disconnect();
    window.removeEventListener("storage", onStorage);
  };
}

export function usePageBuilderThemeMode(): PageBuilderThemeMode {
  return useSyncExternalStore(subscribe, readThemeMode, () => "dark");
}
