"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useCallback, useMemo, useRef } from "react";
import type {
  ElementBlock,
  SectionEffect,
} from "@pb/contracts/page-builder/core/page-builder-schemas";
import { resolveResponsiveValue } from "@pb/runtime-react/core/lib/responsive-value";
import { useDeviceType } from "@pb/runtime-react/core/providers/device-type-provider";
import { computeElementImagePresentation } from "./ElementImage/element-image-presentation";
import { firePageBuilderAction } from "@/page-builder/triggers";
import { SectionGlassEffect } from "@/page-builder/section/stack/SectionGlassEffect";

type Props = Extract<ElementBlock, { type: "elementImage" }>;

function coerceSectionEffects(value: unknown): SectionEffect[] | undefined {
  if (!Array.isArray(value)) return undefined;
  const entries = value.filter(
    (entry): entry is SectionEffect =>
      !!entry &&
      typeof entry === "object" &&
      "type" in entry &&
      typeof (entry as { type?: unknown }).type === "string"
  );
  return entries.length > 0 ? entries : undefined;
}

export function ElementImage({
  src,
  alt,
  width,
  height,
  borderRadius,
  constraints,
  align,
  alignY,
  marginTop,
  marginBottom,
  marginLeft,
  marginRight,
  zIndex,
  objectFit = "cover",
  objectPosition,
  imageCrop,
  imageFilters,
  fillOpacity,
  imageRotation,
  rotate,
  flipHorizontal = false,
  flipVertical = false,
  link,
  aspectRatio,
  figmaConstraints,
  effects,
  wrapperStyle,
  opacity,
  blendMode,
  boxShadow,
  filter,
  backdropFilter,
  overflow,
  hidden,
  priority,
  interactions,
}: Props) {
  const [hasError, setHasError] = useState(false);
  const figureRef = useRef<HTMLElement | null>(null);
  const imageEffects = useMemo(() => coerceSectionEffects(effects), [effects]);
  const hasGlassEffect = (imageEffects ?? []).some((effect) => effect.type === "glass");
  const { isMobile } = useDeviceType();
  const resolvedAspectRatio = resolveResponsiveValue(aspectRatio, isMobile);
  const resolvedObjectFit = resolveResponsiveValue(objectFit, isMobile) ?? "cover";

  const handleImgError = useCallback(() => {
    setHasError(true);
  }, []);
  const handleImgLoad = useCallback(() => {
    setHasError(false);
  }, []);
  const {
    fillHeight,
    hasSource,
    useIntrinsicSizing,
    imgStyle,
    fillImgStyle,
    nextImageFillStyle,
    figureStyle,
    contentWrapperStyle,
    figureClassName,
    resolvedHref,
    isInternal,
    imageFrameStyle,
  } = computeElementImagePresentation({
    type: "elementImage",
    src,
    alt,
    width,
    height,
    borderRadius,
    constraints,
    align,
    alignY,
    marginTop,
    marginBottom,
    marginLeft,
    marginRight,
    zIndex,
    objectFit: resolvedObjectFit,
    objectPosition,
    imageCrop,
    imageFilters,
    fillOpacity,
    imageRotation,
    rotate,
    flipHorizontal,
    flipVertical,
    link,
    aspectRatio: resolvedAspectRatio,
    figmaConstraints,
    effects,
    wrapperStyle,
    opacity,
    blendMode,
    boxShadow,
    filter,
    backdropFilter,
    overflow,
    hidden,
  });
  const showError = hasError && hasSource;
  const showImage = !showError && hasSource;
  const isBlobSrc = typeof src === "string" && src.startsWith("blob:");
  const resolvedTarget = link?.target ?? (!isInternal && resolvedHref ? "_blank" : undefined);
  const resolvedRel =
    link?.rel ??
    (!isInternal && resolvedHref
      ? "noopener noreferrer"
      : resolvedTarget === "_blank"
        ? "noopener noreferrer"
        : undefined);

  const hasInteractions = !!(
    interactions?.onClick ||
    interactions?.onHoverEnter ||
    interactions?.onHoverLeave ||
    interactions?.onPointerDown ||
    interactions?.onPointerUp ||
    interactions?.onDoubleClick
  );
  const interactionHandlers = hasInteractions
    ? {
        onClick: interactions?.onClick
          ? () => firePageBuilderAction(interactions.onClick!, "trigger")
          : undefined,
        onPointerEnter: interactions?.onHoverEnter
          ? () => firePageBuilderAction(interactions.onHoverEnter!, "trigger")
          : undefined,
        onPointerLeave: interactions?.onHoverLeave
          ? () => firePageBuilderAction(interactions.onHoverLeave!, "trigger")
          : undefined,
        onPointerDown: interactions?.onPointerDown
          ? () => firePageBuilderAction(interactions.onPointerDown!, "trigger")
          : undefined,
        onPointerUp: interactions?.onPointerUp
          ? () => firePageBuilderAction(interactions.onPointerUp!, "trigger")
          : undefined,
        onDoubleClick: interactions?.onDoubleClick
          ? () => firePageBuilderAction(interactions.onDoubleClick!, "trigger")
          : undefined,
        style: {
          cursor: interactions?.cursor ?? (interactions?.onClick ? "pointer" : undefined),
        } as React.CSSProperties,
      }
    : {};

  const content = (
    <div style={contentWrapperStyle}>
      {!hasSource && (
        <span className="text-muted-foreground text-sm" role="status">
          No image source.
        </span>
      )}
      {hasSource && showError && (
        <span className="text-muted-foreground text-sm" role="status">
          Image failed to load.
        </span>
      )}
      {showImage && src && (
        <span style={imageFrameStyle}>
          {useIntrinsicSizing ? (
            <img
              src={src}
              alt={alt ?? ""}
              style={fillHeight ? fillImgStyle : imgStyle}
              loading={priority ? "eager" : "lazy"}
              fetchPriority={priority ? "high" : undefined}
              onError={handleImgError}
              onLoad={handleImgLoad}
            />
          ) : (
            <Image
              src={src}
              alt={alt ?? ""}
              fill
              unoptimized={isBlobSrc}
              priority={!!priority}
              fetchPriority={priority ? "high" : "auto"}
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1200px"
              style={nextImageFillStyle}
              loading={priority ? "eager" : "lazy"}
              onError={handleImgError}
              onLoad={handleImgLoad}
            />
          )}
        </span>
      )}
    </div>
  );

  const figure = (
    <figure
      ref={figureRef}
      className={figureClassName}
      style={
        hasInteractions
          ? {
              ...figureStyle,
              ...(hasGlassEffect && figureStyle.position == null ? { position: "relative" } : {}),
              ...interactionHandlers.style,
            }
          : {
              ...figureStyle,
              ...(hasGlassEffect && figureStyle.position == null ? { position: "relative" } : {}),
            }
      }
      aria-live={showError ? "polite" : undefined}
      {...(hasInteractions
        ? {
            onClick: interactionHandlers.onClick,
            onPointerEnter: interactionHandlers.onPointerEnter,
            onPointerLeave: interactionHandlers.onPointerLeave,
            onPointerDown: interactionHandlers.onPointerDown,
            onPointerUp: interactionHandlers.onPointerUp,
            onDoubleClick: interactionHandlers.onDoubleClick,
          }
        : {})}
    >
      <SectionGlassEffect effects={imageEffects} sectionRef={figureRef} variant="auto" />
      {resolvedHref ? (
        isInternal ? (
          <Link
            href={resolvedHref}
            className="block w-full h-full"
            target={resolvedTarget}
            rel={resolvedRel}
          >
            {content}
          </Link>
        ) : (
          <a
            href={resolvedHref}
            target={resolvedTarget ?? "_blank"}
            rel={resolvedRel ?? "noopener noreferrer"}
            className="block w-full h-full"
          >
            {content}
          </a>
        )
      ) : (
        content
      )}
    </figure>
  );

  return figure;
}
