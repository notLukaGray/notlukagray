"use client";

import type { ReactNode } from "react";
import type { CSSProperties } from "react";

export type ElementVideoInteractiveContainerProps = {
  containerRef: React.RefObject<HTMLSpanElement | null>;
  isFullscreen?: boolean;
  onContextMenu: (e: React.MouseEvent) => void;
  onTouchStart: () => void;
  onTouchEnd?: (e: React.TouchEvent<HTMLSpanElement>) => void;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
  onMouseMove?: () => void;
  onClick?: (e: React.MouseEvent<HTMLSpanElement>) => void;
  children: ReactNode;
};

/** Fullscreen fill: Chrome/WebKit do not auto-size the fullscreen element; use viewport units so the bar's container has a definite size. */
const fullscreenFillStyle: CSSProperties = {
  position: "fixed",
  top: 0,
  left: 0,
  width: "100vw",
  height: "100vh",
  minWidth: "100%",
  minHeight: "100%",
};

/** Container span with gesture handlers for module-driven video (tap, touch, hover). */
export function ElementVideoInteractiveContainer({
  containerRef,
  isFullscreen = false,
  onContextMenu,
  onTouchStart,
  onTouchEnd,
  onMouseEnter,
  onMouseLeave,
  onMouseMove,
  onClick,
  children,
}: ElementVideoInteractiveContainerProps) {
  return (
    <span
      ref={containerRef}
      className="video-module-fullscreen-container relative block w-full h-full select-none"
      style={{
        WebkitTapHighlightColor: "transparent",
        WebkitTouchCallout: "none",
        touchAction: "manipulation",
        ...(isFullscreen ? fullscreenFillStyle : {}),
      }}
      onContextMenu={onContextMenu}
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      onMouseMove={onMouseMove}
      onClick={onClick}
    >
      {children}
    </span>
  );
}
