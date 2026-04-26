import type { ScrollAxis, SnapAlign } from "./infinite-scroll-types";

export const LOOP_COPY_COUNT = 3;
export const DEFAULT_SNAP_DURATION_MS = 420;
export const DEFAULT_SCROLL_SETTLE_FRAMES = 7;
export const DEFAULT_WHEEL_LOCK_MS = 220;
export const SCROLL_SETTLE_EPSILON_PX = 0.9;
export const SNAP_SETTLE_EPSILON_PX = 2.5;
export const STALL_RECOVERY_IDLE_MS = 260;
export const PROGRAMMATIC_AUTO_SCROLL_SUPPRESS_MS = 40;
export const PROGRAMMATIC_SMOOTH_SCROLL_BUFFER_MS = 80;
export const MAX_SNAP_RETRIES = 2;

export function wrapIndex(index: number, length: number): number {
  if (length <= 0) return 0;
  return ((index % length) + length) % length;
}

export function clampIndex(index: number, length: number): number {
  if (length <= 0) return 0;
  return Math.max(0, Math.min(length - 1, index));
}

export function getScrollPosition(container: HTMLDivElement, axis: ScrollAxis): number {
  return axis === "horizontal" ? container.scrollLeft : container.scrollTop;
}

export function setScrollPosition(
  container: HTMLDivElement,
  axis: ScrollAxis,
  value: number
): void {
  if (axis === "horizontal") {
    container.scrollLeft = value;
    return;
  }
  container.scrollTop = value;
}

export function getContainerExtent(container: HTMLDivElement, axis: ScrollAxis): number {
  return axis === "horizontal" ? container.clientWidth : container.clientHeight;
}

export function getItemStart(item: HTMLDivElement, axis: ScrollAxis): number {
  return axis === "horizontal" ? item.offsetLeft : item.offsetTop;
}

export function getItemSize(item: HTMLDivElement, axis: ScrollAxis): number {
  return axis === "horizontal" ? item.offsetWidth : item.offsetHeight;
}

export function getItemScrollOffset(
  container: HTMLDivElement,
  item: HTMLDivElement,
  axis: ScrollAxis,
  snapAlign: SnapAlign
): number {
  const itemStart = getItemStart(item, axis);
  const itemSize = getItemSize(item, axis);
  const containerExtent = getContainerExtent(container, axis);
  if (snapAlign === "start") return itemStart;
  if (snapAlign === "end") return itemStart + itemSize - containerExtent;
  return itemStart + itemSize / 2 - containerExtent / 2;
}

export function lerp(from: number, to: number, progress: number): number {
  return from + (to - from) * progress;
}

export function getNowMs(): number {
  return typeof performance !== "undefined" && typeof performance.now === "function"
    ? performance.now()
    : Date.now();
}
