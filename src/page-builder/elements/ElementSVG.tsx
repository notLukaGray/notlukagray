"use client";

import { forwardRef, useState, useEffect } from "react";
import type { ElementBlock } from "@/page-builder/core/page-builder-schemas";
import { sanitizeSvgMarkup } from "@/core/lib/sanitize-svg";
import {
  parseTransformString,
  buildGradientTransformMatrix,
  serializeTransformMatrix,
} from "@/core/lib/svg-transform-utils";
import type { ElementLayoutTransformOptions } from "@/page-builder/core/element-layout-utils";
import type { ElementLayout } from "@/page-builder/core/page-builder-schemas";
import { ElementLayoutWrapper } from "./Shared/ElementLayoutWrapper";
import { GraphicLinkWrapper } from "./Shared/GraphicLinkWrapper";

type Props = Extract<ElementBlock, { type: "elementSVG" }>;

type LayoutProps = Pick<
  ElementLayoutTransformOptions,
  "width" | "height" | "align" | "marginTop" | "marginBottom" | "marginLeft" | "marginRight"
> & {
  zIndex?: number;
  constraints?: ElementLayout["constraints"];
};

function ensureSvgFillsContainer(sanitized: string): string {
  if (!sanitized.trim().startsWith("<svg")) return sanitized;
  return sanitized.replace(/<svg(\s[^>]*)?>/i, (_match, attrs) => {
    const hasXmlns = attrs && /xmlns\s*=/i.test(attrs);
    const xmlnsAttr = hasXmlns ? "" : ' xmlns="http://www.w3.org/2000/svg"';
    return `<svg width="100%" height="100%" style="display:block"${xmlnsAttr}${attrs || ""}>`;
  });
}

function fixBlendModeForMobile(svg: string): string {
  return svg.replace(/<g([^>]*style="([^"]*mix-blend-mode[^"]*)"([^>]*))>/gi, (match) => {
    const styleMatch = match.match(/style="([^"]*)"/);
    if (!styleMatch || !styleMatch[1]) return match;

    const styleContent = styleMatch[1];
    if (styleContent.includes("transform")) {
      return match;
    }
    const newStyleContent = `${styleContent};transform:translateZ(0)`;
    return match.replace(/style="([^"]*)"/, `style="${newStyleContent}"`);
  });
}

function fixGradientTransformForMobile(svg: string): string {
  return svg.replace(/gradientTransform="([^"]+)"/gi, (_, transformValue) => {
    const parsed = parseTransformString(transformValue);
    const matrix = buildGradientTransformMatrix(parsed);
    const out = matrix != null ? serializeTransformMatrix(matrix) : transformValue;
    return `gradientTransform="${out}"`;
  });
}

/** Page-builder SVG element: inline markup, treat as image (no editing; display only). Sanitized. Optional link (ref + internal/external) makes it buttonable. */
export const ElementSVG = forwardRef<HTMLAnchorElement | HTMLDivElement, Props>(
  (
    {
      markup,
      ariaLabel,
      width,
      height,
      align,
      marginTop,
      marginBottom,
      marginLeft,
      marginRight,
      zIndex,
      constraints,
      effects,
      wrapperStyle,
      opacity,
      blendMode,
      boxShadow,
      filter,
      backdropFilter,
      overflow,
      hidden,
      rotate,
      flipHorizontal = false,
      flipVertical = false,
      link,
      interactions,
    },
    ref
  ) => {
    const layout = {
      width,
      height,
      align,
      marginTop,
      marginBottom,
      marginLeft,
      marginRight,
      zIndex,
      constraints,
      effects,
      wrapperStyle,
      opacity,
      blendMode,
      boxShadow,
      filter,
      backdropFilter,
      overflow,
      hidden,
    };
    const transform = { rotate, flipHorizontal, flipVertical };

    const [safeHtml, setSafeHtml] = useState("");
    const [sanitizeFailed, setSanitizeFailed] = useState(false);

    useEffect(() => {
      const trimmed = markup != null ? String(markup).trim() : "";
      if (!trimmed) {
        queueMicrotask(() => {
          setSafeHtml("");
          setSanitizeFailed(false);
        });
        return;
      }
      const sanitized = sanitizeSvgMarkup(markup);
      const filled = ensureSvgFillsContainer(sanitized);
      const blendModeFixed = fixBlendModeForMobile(filled);
      const gradientFixed = fixGradientTransformForMobile(blendModeFixed);
      const hasValidSvg =
        gradientFixed.trim().length > 0 && gradientFixed.trim().toLowerCase().startsWith("<svg");
      queueMicrotask(() => {
        setSafeHtml(gradientFixed);
        setSanitizeFailed(!hasValidSvg);
      });
    }, [markup]);

    const hasMarkup = markup != null && String(markup).trim() !== "";
    const showFallback = !hasMarkup || sanitizeFailed;

    return (
      <ElementLayoutWrapper
        layout={layout as LayoutProps}
        transform={transform}
        interactions={interactions}
      >
        {showFallback && (
          <GraphicLinkWrapper ref={ref} className="w-full h-full flex items-center justify-center">
            <span className="text-muted-foreground text-sm w-full text-center" role="status">
              {!hasMarkup ? "No SVG markup." : "SVG content unavailable."}
            </span>
          </GraphicLinkWrapper>
        )}
        {!showFallback && (
          <GraphicLinkWrapper
            ref={ref}
            link={link}
            className="w-full h-full flex items-center justify-center [&_svg]:block"
            style={{ transform: "translateZ(0)" }}
          >
            <div
              data-graphic-content
              className="w-full h-full [&_svg]:block"
              dangerouslySetInnerHTML={{ __html: safeHtml }}
              role="img"
              aria-label={ariaLabel?.trim() || "SVG graphic"}
            />
          </GraphicLinkWrapper>
        )}
      </ElementLayoutWrapper>
    );
  }
);
ElementSVG.displayName = "ElementSVG";
