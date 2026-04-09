"use client";

import { forwardRef, useState, type ReactNode } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import type { ElementGraphicLink } from "@pb/contracts/page-builder/core/page-builder-types";
import { GraphicLinkHoverContext } from "./GraphicLinkHoverContext";

type GradientForResolve = { id?: string; stops?: Array<{ color?: string } | null> };

export type LinkState = {
  hover: boolean;
  active: boolean;
  disabled: boolean;
};

type Props = {
  link?: ElementGraphicLink | null;

  gradients?: GradientForResolve[];

  children: ReactNode | ((state: LinkState) => ReactNode);
  className?: string;
  style?: React.CSSProperties;
};

function toDuration(value: string | number | undefined): string | undefined {
  if (value == null) return undefined;
  if (typeof value === "number") return `${value}ms`;
  return String(value);
}

function resolveStateRefToColor(
  ref: string | undefined,
  elementGradients?: GradientForResolve[]
): string | undefined {
  if (ref == null || ref === "") return undefined;
  if (ref.startsWith("#")) return ref;
  const gradient = elementGradients?.find((g) => g?.id === ref);
  const firstStop = gradient?.stops?.find((s): s is NonNullable<typeof s> => s != null);
  return firstStop?.color;
}

const hoverHandlers = (
  setHover: (v: boolean) => void
): { onMouseEnter: () => void; onMouseLeave: () => void } => ({
  onMouseEnter: () => setHover(true),
  onMouseLeave: () => setHover(false),
});

export const GraphicLinkWrapper = forwardRef<HTMLAnchorElement | HTMLDivElement, Props>(
  ({ link, gradients: elementGradients, children, className, style }, ref) => {
    const [isHover, setIsHover] = useState(false);
    const pathname = usePathname();
    const duration = toDuration(link?.vectorTransition);
    const baseStyle: React.CSSProperties = {
      ...style,
      transitionDuration: duration ?? undefined,
      transitionProperty: duration ? "transform, color, opacity" : undefined,
    };

    const hasNavLink = link?.ref != null && String(link.ref).trim() !== "";
    if (!hasNavLink) {
      // Interactive-only: no navigation, but may have hover/active visuals (e.g. icons in action buttons)
      const state: LinkState = {
        hover: isHover,
        active: false,
        disabled: link?.disabled ?? false,
      };
      const content = typeof children === "function" ? children(state) : children;
      const hasHoverFill = link?.hoverFill != null || link?.activeFill != null;
      const useHoverHandlers = hasHoverFill && typeof children === "function";
      return (
        <GraphicLinkHoverContext.Provider value={isHover}>
          <div
            ref={ref as React.Ref<HTMLDivElement>}
            className={className}
            style={baseStyle}
            {...(useHoverHandlers ? hoverHandlers(setIsHover) : {})}
          >
            {content}
          </div>
        </GraphicLinkHoverContext.Provider>
      );
    }

    const isDisabled = link.disabled === true;
    const refVal = link.ref!;
    const href = link.external
      ? refVal
      : refVal.startsWith("/") || refVal.startsWith("#")
        ? refVal
        : `#${refVal}`;

    const isInternal = !link.external && href.startsWith("/");
    const isActive =
      isInternal && (pathname === href || (href !== "/" && pathname.startsWith(href)));

    const hoverScale = link.hoverScale;
    const hoverFillRef = link.hoverFill;
    const activeFillRef = link.activeFill;
    const disabledFillRef = link.disabledFill;
    // Resolve to CSS colors (for CSS variables). Only use flat CSS hover when the ref is NOT a gradient
    // (when it's a gradient id, elementVector already switches fill/stroke via React; CSS would override with solid color).
    const hoverColor = resolveStateRefToColor(hoverFillRef, elementGradients);
    const activeColor = resolveStateRefToColor(activeFillRef, elementGradients);
    const disabledColor = resolveStateRefToColor(disabledFillRef, elementGradients);
    const isGradientRef = (ref: string | undefined) =>
      ref != null && elementGradients?.some((g) => g?.id === ref);
    const useFlatHoverFill = hoverColor != null && !isGradientRef(hoverFillRef);
    const dataAttrs = {
      "data-hover-scale": hoverScale != null ? String(hoverScale) : undefined,
      "data-hover-color": hoverColor ?? undefined,
      "data-active-color": activeColor ?? undefined,
      "data-disabled-color": disabledColor ?? undefined,
      "data-disabled": isDisabled ? "true" : undefined,
      "data-active": isActive ? "true" : undefined,
    };

    const state: LinkState = {
      hover: isHover,
      active: isActive,
      disabled: isDisabled,
    };

    if (isDisabled) {
      const content = typeof children === "function" ? children(state) : children;
      return (
        <GraphicLinkHoverContext.Provider value={false}>
          <div
            ref={ref as React.Ref<HTMLDivElement>}
            className={className}
            style={{ ...baseStyle, pointerEvents: "none", opacity: 0.7 }}
            aria-disabled="true"
            {...dataAttrs}
          >
            {content}
          </div>
        </GraphicLinkHoverContext.Provider>
      );
    }

    const linkClassName = [
      className,
      "inline-flex items-center justify-center w-full h-full",
      hoverScale != null && "graphic-link-hover-scale",
      useFlatHoverFill && "graphic-link-hover-color",
      isActive && "graphic-link-active",
    ]
      .filter(Boolean)
      .join(" ");

    const linkStyle: React.CSSProperties = {
      ...baseStyle,
      ...(hoverColor && { ["--graphic-link-hover-color" as string]: hoverColor }),
      ...(activeColor && { ["--graphic-link-active-color" as string]: activeColor }),
      ...(disabledColor && { ["--graphic-link-disabled-color" as string]: disabledColor }),
      ...(hoverScale != null && { ["--graphic-link-hover-scale" as string]: String(hoverScale) }),
    };

    const content = typeof children === "function" ? children(state) : children;
    if (link.external) {
      return (
        <GraphicLinkHoverContext.Provider value={isHover}>
          <a
            ref={ref as React.Ref<HTMLAnchorElement>}
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className={linkClassName}
            style={linkStyle}
            {...dataAttrs}
            {...hoverHandlers(setIsHover)}
          >
            {content}
          </a>
        </GraphicLinkHoverContext.Provider>
      );
    }

    return (
      <GraphicLinkHoverContext.Provider value={isHover}>
        <Link
          ref={ref as React.Ref<HTMLAnchorElement>}
          href={href}
          className={linkClassName}
          style={linkStyle}
          {...dataAttrs}
          {...hoverHandlers(setIsHover)}
        >
          {content}
        </Link>
      </GraphicLinkHoverContext.Provider>
    );
  }
);
GraphicLinkWrapper.displayName = "GraphicLinkWrapper";
