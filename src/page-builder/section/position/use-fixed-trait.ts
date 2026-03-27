"use client";

import { useLayoutEffect, useMemo, useState, type CSSProperties } from "react";
import { parseCssValueToPixels, buildTransformString } from "@/page-builder/core/section-utils";
import { Z_INDEX } from "@/page-builder/core/section-constants";
import type { ResolvedSectionLayout } from "@/page-builder/section/position/use-section-base-styles";
import { useScrollContainer } from "@/page-builder/section/position/use-scroll-container";

export type UseFixedTraitProps = {
  fixed?: boolean;
  fixedPosition?: "top" | "bottom" | "left" | "right";
  fixedOffset?: string;
  resolvedLayout: ResolvedSectionLayout;
  zIndex?: number;
};

export function useFixedTrait({
  fixed = false,
  fixedPosition = "top",
  fixedOffset = "0px",
  resolvedLayout,
  zIndex,
}: UseFixedTraitProps): CSSProperties {
  const scrollContainer = useScrollContainer();
  const [containerViewport, setContainerViewport] = useState({
    scrollTop: 0,
    scrollLeft: 0,
    width: 0,
    height: 0,
  });

  useLayoutEffect(() => {
    if (!fixed || !scrollContainer) return;

    let rafId = 0;
    const updateViewport = () => {
      rafId = 0;
      const next = {
        scrollTop: scrollContainer.scrollTop,
        scrollLeft: scrollContainer.scrollLeft,
        width: scrollContainer.clientWidth,
        height: scrollContainer.clientHeight,
      };
      setContainerViewport((prev) =>
        prev.scrollTop === next.scrollTop &&
        prev.scrollLeft === next.scrollLeft &&
        prev.width === next.width &&
        prev.height === next.height
          ? prev
          : next
      );
    };
    const scheduleUpdate = () => {
      if (rafId !== 0) return;
      rafId = requestAnimationFrame(updateViewport);
    };

    updateViewport();
    scrollContainer.addEventListener("scroll", scheduleUpdate, { passive: true });
    window.addEventListener("resize", scheduleUpdate, { passive: true });
    const resizeObserver =
      typeof ResizeObserver !== "undefined" ? new ResizeObserver(scheduleUpdate) : null;
    resizeObserver?.observe(scrollContainer);

    return () => {
      scrollContainer.removeEventListener("scroll", scheduleUpdate);
      window.removeEventListener("resize", scheduleUpdate);
      resizeObserver?.disconnect();
      if (rafId !== 0) cancelAnimationFrame(rafId);
    };
  }, [fixed, scrollContainer]);

  return useMemo(() => {
    if (!fixed) return {};

    const w = resolvedLayout.width ?? "100%";
    const h = resolvedLayout.height;
    const a = resolvedLayout.align ?? "left";

    const offsetPixels =
      parseCssValueToPixels(fixedOffset, fixedPosition === "top" || fixedPosition === "bottom") ??
      0;

    const hasContainerViewport = !!scrollContainer;
    const style: CSSProperties = {
      position: hasContainerViewport ? "absolute" : "fixed",
      zIndex: zIndex ?? Z_INDEX.FIXED_SECTION,
    };

    let existingTransform: string | undefined;
    if (hasContainerViewport) {
      const xLeft = containerViewport.scrollLeft;
      const xCenter = containerViewport.scrollLeft + containerViewport.width / 2;
      const xRight = containerViewport.scrollLeft + containerViewport.width;
      const yTop = containerViewport.scrollTop;
      const yMiddle = containerViewport.scrollTop + containerViewport.height / 2;
      const yBottom = containerViewport.scrollTop + containerViewport.height;

      switch (fixedPosition) {
        case "top":
          style.top = `${yTop + offsetPixels}px`;
          style.left = `${a === "center" ? xCenter : a === "right" ? xRight : xLeft}px`;
          style.width = w === "hug" ? "fit-content" : w || "100%";
          if (a === "center") existingTransform = "translateX(-50%)";
          if (a === "right") existingTransform = "translateX(-100%)";
          break;
        case "bottom":
          style.top = `${yBottom - offsetPixels}px`;
          style.left = `${a === "center" ? xCenter : a === "right" ? xRight : xLeft}px`;
          style.width = w === "hug" ? "fit-content" : w || "100%";
          existingTransform =
            a === "center"
              ? "translate(-50%, -100%)"
              : a === "right"
                ? "translate(-100%, -100%)"
                : "translateY(-100%)";
          break;
        case "left":
          style.left = `${xLeft + offsetPixels}px`;
          style.top = `${yMiddle}px`;
          style.height = h === "hug" ? "fit-content" : h || "auto";
          existingTransform = "translateY(-50%)";
          break;
        case "right":
          style.left = `${xRight - offsetPixels}px`;
          style.top = `${yMiddle}px`;
          style.height = h === "hug" ? "fit-content" : h || "auto";
          existingTransform = "translate(-100%, -50%)";
          break;
      }
    } else {
      switch (fixedPosition) {
        case "top":
          style.top = `${offsetPixels}px`;
          style.left = a === "center" ? "50%" : a === "right" ? "auto" : "0";
          style.right = a === "right" ? "0" : "auto";
          style.width = w === "hug" ? "fit-content" : w || "100%";
          if (a === "center") existingTransform = "translateX(-50%)";
          break;
        case "bottom":
          style.bottom = `${offsetPixels}px`;
          style.left = a === "center" ? "50%" : a === "right" ? "auto" : "0";
          style.right = a === "right" ? "0" : "auto";
          style.width = w === "hug" ? "fit-content" : w || "100%";
          if (a === "center") existingTransform = "translateX(-50%)";
          break;
        case "left":
          style.left = `${offsetPixels}px`;
          style.top = "50%";
          existingTransform = "translateY(-50%)";
          style.height = h === "hug" ? "fit-content" : h || "auto";
          break;
        case "right":
          style.right = `${offsetPixels}px`;
          style.top = "50%";
          existingTransform = "translateY(-50%)";
          style.height = h === "hug" ? "fit-content" : h || "auto";
          break;
      }
    }

    const transform = buildTransformString(existingTransform);
    if (transform) style.transform = transform;

    return style;
  }, [
    fixed,
    fixedPosition,
    fixedOffset,
    resolvedLayout.width,
    resolvedLayout.height,
    resolvedLayout.align,
    zIndex,
    scrollContainer,
    containerViewport.scrollTop,
    containerViewport.scrollLeft,
    containerViewport.width,
    containerViewport.height,
  ]);
}
