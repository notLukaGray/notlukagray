import type { CSSProperties } from "react";
import { DEFAULT_SCROLL_SPEED } from "../section-constants";

export type SectionAlign = "left" | "center" | "right" | "full";

export function getSectionAlignStyle(align?: SectionAlign, width?: string): CSSProperties {
  if (align === "center") {
    return { marginLeft: "auto", marginRight: "auto" };
  }
  if (align === "right") {
    return { marginLeft: "auto", marginRight: 0 };
  }
  if (align === "full") {
    return width !== "hug"
      ? { width: "100%", marginLeft: 0, marginRight: 0 }
      : { marginLeft: 0, marginRight: 0 };
  }
  return {};
}

export function getDefaultScrollSpeed(): number {
  return DEFAULT_SCROLL_SPEED;
}

// Re-export for backwards compatibility from barrel consumers.
export { DEFAULT_SCROLL_SPEED };

export function handleSectionWheel(
  e: React.WheelEvent<HTMLElement>,
  scrollSpeed: number = DEFAULT_SCROLL_SPEED
): void {
  const el = e.currentTarget;

  if (el.scrollHeight <= el.clientHeight) return;

  if (scrollSpeed === DEFAULT_SCROLL_SPEED) {
    e.stopPropagation();
    return;
  }

  e.preventDefault();
  e.stopPropagation();

  const delta = e.deltaY * scrollSpeed;
  el.scrollTop += delta;
}
