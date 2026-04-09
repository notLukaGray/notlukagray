"use client";

import { useEffect } from "react";
import {
  getWorkbenchSession,
  WORKBENCH_SESSION_CHANGED_EVENT,
  WORKBENCH_SESSION_STORAGE_KEY,
} from "@/app/dev/workbench/workbench-session";
import { serializePbFoundationsCss } from "@/app/theme/pb-foundation-css";

const STYLE_ELEMENT_ID = "pb-foundations-runtime";

function updateFoundationStyleTag(): void {
  if (typeof document === "undefined") return;
  const styleEl = document.getElementById(STYLE_ELEMENT_ID);
  if (!(styleEl instanceof HTMLStyleElement)) return;
  const css = serializePbFoundationsCss(getWorkbenchSession());
  if (styleEl.textContent !== css) styleEl.textContent = css;
}

export function PbFoundationsRuntimeSync(): null {
  useEffect(() => {
    if (process.env.NODE_ENV !== "development") return;

    const onStorage = (event: StorageEvent) => {
      if (event.key !== WORKBENCH_SESSION_STORAGE_KEY) return;
      updateFoundationStyleTag();
    };

    updateFoundationStyleTag();
    window.addEventListener("storage", onStorage);
    window.addEventListener(WORKBENCH_SESSION_CHANGED_EVENT, updateFoundationStyleTag);
    return () => {
      window.removeEventListener("storage", onStorage);
      window.removeEventListener(WORKBENCH_SESSION_CHANGED_EVENT, updateFoundationStyleTag);
    };
  }, []);

  return null;
}
