"use client";

export const DEV_TOOL_STORAGE_KEYS = [
  "pb-color-tool-m1",
  "notlukagray-font-dev-prefs-v1",
  "pb-style-tool-guidelines-v1",
  "pb-style-tool-v2",
  "pb-element-image-dev-v1",
] as const;

export function clearDevToolStorage(keys: readonly string[]): void {
  if (typeof window === "undefined") return;
  for (const key of keys) {
    try {
      localStorage.removeItem(key);
    } catch {
      /* ignore private-mode/quota errors */
    }
  }
}

export function confirmAndClearAllDevToolStorage(): boolean {
  if (typeof window === "undefined") return false;
  const ok = window.confirm(
    "Total reset will clear all dev setup work: colors, typography, layout/style, and element defaults saved in this browser. This cannot be undone. Continue?"
  );
  if (!ok) return false;
  clearDevToolStorage(DEV_TOOL_STORAGE_KEYS);
  return true;
}
