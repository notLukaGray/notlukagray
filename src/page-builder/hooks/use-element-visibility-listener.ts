"use client";

import { useEffect, useState } from "react";

/**
 * Mounts on an element with an `id`. Listens for `page-builder-element-visibility` events
 * and toggles visibility based on the event detail.
 */
export function useElementVisibilityListener(id: string | undefined): boolean {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    if (!id || typeof window === "undefined") return;

    const handler = (e: Event) => {
      const detail = (e as CustomEvent<{ type: string; id: string }>).detail;
      if (detail.id !== id) return;
      switch (detail.type) {
        case "elementShow":
          setVisible(true);
          return;
        case "elementHide":
          setVisible(false);
          return;
        case "elementToggle":
          setVisible((v) => !v);
          return;
      }
    };

    window.addEventListener("page-builder-element-visibility", handler as EventListener);
    return () =>
      window.removeEventListener("page-builder-element-visibility", handler as EventListener);
  }, [id]);

  return visible;
}
