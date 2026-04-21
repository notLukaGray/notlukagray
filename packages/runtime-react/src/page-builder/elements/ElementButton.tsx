"use client";

import { useMemo, useRef, type ReactNode } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import type { CSSProperties } from "react";
import type {
  ElementBlock,
  SectionEffect,
} from "@pb/contracts/page-builder/core/page-builder-schemas";
import { ElementRenderer } from "@/page-builder/elements/Shared/ElementRenderer";
import { useDefinitions } from "@/page-builder/elements/ElementModule/ModuleSlotContext";
import { firePageBuilderAction } from "@/page-builder/triggers";
import { AnimatePresence, MotionFromJson } from "@/page-builder/integrations/framer-motion";
import {
  mergeMotionDefaults,
  getExitMotionFromPreset,
} from "@pb/contracts/page-builder/core/page-builder-motion-defaults";
import {
  buildElementButtonBlockStyle,
  buildElementButtonWrapperStyles,
  getElementButtonTypographyClass,
} from "./ElementButton/element-button-styles";
import { resolveFontFamily } from "@pb/core/internal/element-font-slot";
import { resolveResponsiveValue } from "@pb/core/lib/responsive-value";
import {
  buildElementButtonLinkState,
  resolveElementButtonVectorBlock,
} from "./ElementButton/element-button-link-and-vector";
import { useModel3DReadyButtonExit } from "./ElementButton/use-model3d-ready-button-exit";
import { SectionGlassEffect } from "@/page-builder/section/stack/SectionGlassEffect";
import { useDeviceType } from "@/core/hooks/use-device-type";
import { usePageBuilderThemeMode } from "@/page-builder/theme/use-page-builder-theme-mode";
import { resolveThemeString, resolveThemeValueDeep } from "@/page-builder/theme/theme-string";

type Props = Extract<ElementBlock, { type: "elementButton" }>;

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

/** Page-builder button: typography (like elementLink/body/heading), optional vector (via vectorRef), and either link (a-ref) or action (schema'd button function). */
export function ElementButton({
  label,
  copyType = "body",
  level,
  fontFamily,
  vectorRef,
  href,
  external = false,
  target,
  rel,
  download,
  hreflang,
  ping,
  referrerPolicy,
  action,
  actionPayload,
  align,
  textAlign,
  width,
  height,
  marginTop,
  marginBottom,
  marginLeft,
  marginRight,
  wordWrap = true,
  linkDefault,
  linkHover,
  linkActive,
  linkDisabled,
  linkTransition,
  disabled = false,
  loading = false,
  loadingLabel,
  wrapperFill,
  wrapperStroke,
  wrapperFillRef,
  wrapperStrokeRef,
  wrapperStrokeWidth,
  wrapperPadding,
  wrapperBorderRadius,
  wrapperWidth,
  wrapperHeight,
  wrapperMinWidth,
  wrapperMinHeight,
  wrapperFillHover,
  wrapperStrokeHover,
  wrapperFillActive,
  wrapperScaleHover,
  wrapperScaleActive,
  wrapperScaleDisabled,
  wrapperOpacityHover,
  wrapperFillDisabled,
  wrapperTransition,
  wrapperInteractionVars,
  pointerDownAction,
  pointerUpAction,
  aria,
  tabIndex,
  role,
  ...rest
}: Props) {
  const pathname = usePathname();
  const { isMobile } = useDeviceType();
  const themeMode = usePageBuilderThemeMode();
  const shellRef = useRef<HTMLDivElement | null>(null);
  // Ref for the wrapper span when glass is active — overlay anchors and measures from here,
  // so scale/transform on the wrapper carries the glass along with the content.
  const glassTargetRef = useRef<HTMLSpanElement | null>(null);
  const isDisabled = disabled || loading;
  const definitions = useDefinitions();
  const resolvedWrapperBorderRadius = resolveResponsiveValue(wrapperBorderRadius, isMobile);
  const typographyClass = getElementButtonTypographyClass({
    type: "elementButton",
    label,
    copyType,
    level,
  } as Props);
  const {
    hasWrapper,
    useRoundedGradientStroke,
    wrapperStyle: rawWrapperStyle,
    innerWrapperStyle,
    hasStateVars,
  } = buildElementButtonWrapperStyles(
    definitions as Record<string, unknown> | null | undefined,
    themeMode,
    {
      wrapperFill,
      wrapperStroke,
      wrapperFillRef,
      wrapperStrokeRef,
      wrapperStrokeWidth,
      wrapperPadding: resolveResponsiveValue(wrapperPadding, isMobile),
      wrapperBorderRadius: resolvedWrapperBorderRadius,
      wrapperWidth: resolveResponsiveValue(wrapperWidth, isMobile),
      wrapperHeight: resolveResponsiveValue(wrapperHeight, isMobile),
      wrapperMinWidth: resolveResponsiveValue(wrapperMinWidth, isMobile),
      wrapperMinHeight: resolveResponsiveValue(wrapperMinHeight, isMobile),
      wrapperFillHover,
      wrapperStrokeHover,
      wrapperFillActive,
      wrapperScaleHover,
      wrapperScaleActive,
      wrapperScaleDisabled,
      wrapperOpacityHover,
      wrapperFillDisabled,
      wrapperTransition,
      wrapperInteractionVars,
    }
  );
  const { hasLink, isInternal, linkStyle, linkClassName } = buildElementButtonLinkState(
    pathname,
    {
      href,
      external,
      linkDefault,
      linkHover,
      linkActive,
      linkDisabled,
      linkTransition,
      disabled: isDisabled,
    },
    typographyClass,
    themeMode
  );
  const ariaProps = aria as Record<string, string | boolean> | undefined;
  const resolvedTarget = target ?? (external ? "_blank" : undefined);
  const resolvedRel =
    rel ?? (resolvedTarget === "_blank" || external ? "noopener noreferrer" : undefined);
  const blockStyle = buildElementButtonBlockStyle({
    width,
    height,
    align,
    textAlign,
    marginTop,
    marginBottom,
    marginLeft,
    marginRight,
    wordWrap,
    ...rest,
  } as Props & { wordWrap: boolean });
  const resolvedFontFamily = resolveFontFamily(fontFamily);
  const vectorBlock = resolveElementButtonVectorBlock(
    definitions as Record<string, unknown> | null | undefined,
    vectorRef
  );
  const model3DExit = useModel3DReadyButtonExit(action, actionPayload);
  const motionConfig = rest.motion;
  const exitPreset = rest.exitPreset;
  const buttonEffects = useMemo(
    () => coerceSectionEffects(resolveThemeValueDeep(rest.effects, themeMode)),
    [rest.effects, themeMode]
  );
  const hasGlassEffect = (buttonEffects ?? []).some((effect) => effect.type === "glass");
  const glassSyncBorderRadius =
    hasGlassEffect && resolvedWrapperBorderRadius != null && resolvedWrapperBorderRadius !== ""
      ? resolvedWrapperBorderRadius
      : undefined;

  // When glass is active, strip `background` from the wrapper's inline style.
  // Inline styles beat @layer CSS rules so the hover rule can't override them.
  // Instead, a fill layer div rendered above the glass overlay reads the same
  // CSS vars (--element-btn-fill / --element-btn-fill-hover etc.) with no
  // competing inline style, so the CSS rules apply correctly.
  const wrapperStyle: CSSProperties = useMemo(() => {
    if (!hasGlassEffect) return rawWrapperStyle;
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { background, ...rest } = rawWrapperStyle;
    return rest;
  }, [hasGlassEffect, rawWrapperStyle]);

  const exitMotion = useMemo(() => {
    const resolvedMotion = resolveThemeValueDeep(motionConfig, themeMode) as typeof motionConfig;
    const base = mergeMotionDefaults(resolvedMotion ?? {}) ?? {};
    const exitFromPreset =
      exitPreset && typeof exitPreset === "string"
        ? getExitMotionFromPreset(exitPreset, {
            duration: model3DExit.exitDurationMs / 1000,
            ease: model3DExit.exitEasing,
          }).exit
        : undefined;
    const exitKeyframes = (base.exit as Record<string, unknown> | undefined) ??
      exitFromPreset ?? { opacity: 0 };
    return {
      ...base,
      initial: base.initial ?? { opacity: 1 },
      animate: base.animate ?? { opacity: 1 },
      exit: exitKeyframes as Record<string, string | number | number[]>,
      transition: {
        ...(typeof base.transition === "object" && base.transition ? base.transition : {}),
        duration: model3DExit.exitDurationMs / 1000,
        ease: model3DExit.exitEasing,
      },
    };
  }, [motionConfig, exitPreset, model3DExit.exitDurationMs, model3DExit.exitEasing, themeMode]);

  const resolvedLabel = loading && loadingLabel != null ? loadingLabel : label;
  const hasLabel = resolvedLabel != null && resolvedLabel !== "";
  const hasVector = vectorBlock != null;
  const hasAction = !!action && !href;
  const resolvedLinkDefault = resolveThemeString(linkDefault, themeMode);
  const contentWrapStyle: CSSProperties =
    hasLabel && hasVector
      ? {
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: "var(--pb-button-label-gap)",
        }
      : {};

  const nakedSurfacePadding: CSSProperties = hasWrapper
    ? {}
    : {
        paddingTop: "var(--pb-button-naked-pad-y)",
        paddingBottom: "var(--pb-button-naked-pad-y)",
        paddingLeft: "var(--pb-button-naked-pad-x)",
        paddingRight: "var(--pb-button-naked-pad-x)",
        borderRadius: "var(--pb-button-naked-radius)",
      };

  const content = (
    <span
      style={contentWrapStyle}
      className="inline-flex items-center justify-center gap-(--pb-button-label-gap)"
    >
      {hasLabel && (
        <span
          className={`m-0 block ${typographyClass}`}
          style={{
            ...(resolvedFontFamily ? { fontFamily: resolvedFontFamily } : {}),
            ...(!hasLink && resolvedLinkDefault != null && resolvedLinkDefault !== ""
              ? { color: resolvedLinkDefault }
              : {}),
            ...(isDisabled && hasLink ? { opacity: 0.6 } : {}),
          }}
        >
          {resolvedLabel}
        </span>
      )}
      {hasVector && <ElementRenderer block={vectorBlock as ElementBlock} />}
    </span>
  );

  const inner = hasLink ? (
    isInternal ? (
      <Link
        href={href!}
        className={linkClassName}
        style={{ ...linkStyle, ...nakedSurfacePadding }}
        aria-disabled={isDisabled || undefined}
        aria-busy={loading || undefined}
        tabIndex={isDisabled ? -1 : tabIndex}
        download={download as string | undefined}
        hrefLang={hreflang}
        ping={ping}
        referrerPolicy={referrerPolicy}
        {...(ariaProps ? ariaProps : {})}
        onClick={isDisabled ? (event) => event.preventDefault() : undefined}
      >
        {content}
      </Link>
    ) : (
      <a
        href={href!}
        className={linkClassName}
        style={{ ...linkStyle, ...nakedSurfacePadding }}
        target={resolvedTarget}
        rel={resolvedRel}
        download={download as string | boolean | undefined}
        hrefLang={hreflang}
        ping={ping}
        referrerPolicy={referrerPolicy}
        aria-disabled={isDisabled || undefined}
        aria-busy={loading || undefined}
        tabIndex={isDisabled ? -1 : tabIndex}
        {...(ariaProps ? ariaProps : {})}
        onClick={isDisabled ? (event) => event.preventDefault() : undefined}
      >
        {content}
      </a>
    )
  ) : hasAction ? (
    <button
      type="button"
      onClick={() => {
        if (isDisabled) return;
        model3DExit.arm();
        firePageBuilderAction(
          { type: action!, payload: actionPayload } as Parameters<typeof firePageBuilderAction>[0],
          "button"
        );
      }}
      onPointerDown={
        pointerDownAction
          ? () =>
              firePageBuilderAction(
                pointerDownAction as Parameters<typeof firePageBuilderAction>[0],
                "button"
              )
          : undefined
      }
      onPointerUp={
        pointerUpAction
          ? () =>
              firePageBuilderAction(
                pointerUpAction as Parameters<typeof firePageBuilderAction>[0],
                "button"
              )
          : undefined
      }
      disabled={isDisabled}
      aria-busy={loading || undefined}
      className={`inline-flex items-center justify-center ${isDisabled ? "cursor-not-allowed" : "cursor-pointer"}`}
      style={{
        appearance: "none",
        background: "transparent",
        border: "none",
        color: "inherit",
        font: "inherit",
        textAlign: "inherit",
        ...(hasWrapper ? { padding: 0 } : nakedSurfacePadding),
        ...(isDisabled ? { opacity: 0.6 } : {}),
      }}
    >
      {content}
    </button>
  ) : (
    content
  );

  const wrapperClassName = [
    "inline-flex",
    hasStateVars ? "element-btn-wrap" : "",
    isDisabled ? "element-btn-wrap--disabled" : "",
  ]
    .filter(Boolean)
    .join(" ");

  // When glass is active, content must be position:relative so it paints above the absolute overlay.
  const glassLifted = hasGlassEffect ? (
    <span style={{ position: "relative" }}>{inner}</span>
  ) : (
    inner
  );

  // Glass lives inside whichever span carries the interactions (.element-btn-wrap) so that
  // scale/transform on that span moves the overlay together with the content.
  // `syncBorderRadius` mirrors `wrapperBorderRadius` on the glass overlay + filter sizing.
  const wrappedInner =
    hasWrapper || hasStateVars ? (
      <span
        ref={hasGlassEffect ? glassTargetRef : undefined}
        style={{
          ...wrapperStyle,
          ...(hasGlassEffect ? { position: "relative" as const } : {}),
        }}
        className={wrapperClassName}
      >
        {hasGlassEffect && (
          <>
            <SectionGlassEffect
              effects={buttonEffects}
              sectionRef={glassTargetRef}
              variant="auto"
              syncBorderRadius={glassSyncBorderRadius}
            />
            {/* Fill layer: above glass, below content. No inline background so CSS hover
                vars (--element-btn-fill-hover etc.) apply without inline-style interference. */}
            <span
              aria-hidden
              className="element-btn-glass-fill absolute inset-0 pointer-events-none"
              style={{
                borderRadius: glassSyncBorderRadius ?? "inherit",
              }}
            />
          </>
        )}
        {hasWrapper && useRoundedGradientStroke ? (
          <span style={innerWrapperStyle} className="inline-flex">
            {glassLifted}
          </span>
        ) : (
          glassLifted
        )}
      </span>
    ) : (
      inner
    );

  const shellStyle: CSSProperties = {
    ...blockStyle,
    // Naked glass (no wrapper span): overlay still needs an anchor and border-radius on the shell.
    ...(hasGlassEffect && !hasWrapper && !hasStateVars
      ? {
          ...(blockStyle.position == null ? { position: "relative" as const } : {}),
          ...(resolvedWrapperBorderRadius != null
            ? { borderRadius: resolvedWrapperBorderRadius }
            : {}),
        }
      : {}),
  };

  const renderButtonShell = (child: ReactNode) => (
    <div
      ref={shellRef}
      className="shrink-0"
      style={shellStyle}
      role={role}
      tabIndex={!hasLink && !hasAction ? tabIndex : undefined}
    >
      {/* Naked glass only — when there's a wrapper span the overlay renders inside it above. */}
      {hasGlassEffect && !hasWrapper && !hasStateVars && (
        <SectionGlassEffect
          effects={buttonEffects}
          sectionRef={shellRef}
          variant="auto"
          syncBorderRadius={glassSyncBorderRadius}
        />
      )}
      {child}
    </div>
  );

  if (model3DExit.hasExit) {
    return (
      <AnimatePresence>
        {model3DExit.showButton && (
          <MotionFromJson key="button-exit" motion={exitMotion}>
            {renderButtonShell(wrappedInner)}
          </MotionFromJson>
        )}
      </AnimatePresence>
    );
  }

  if (!model3DExit.isMounted) return null;

  return renderButtonShell(wrappedInner);
}
