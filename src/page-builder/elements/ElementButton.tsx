"use client";

import { useMemo, useRef, type ReactNode } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import type { CSSProperties } from "react";
import type { ElementBlock, SectionEffect } from "@/page-builder/core/page-builder-schemas";
import { ElementRenderer } from "@/page-builder/elements/Shared/ElementRenderer";
import { useDefinitions } from "@/page-builder/elements/ElementModule/ModuleSlotContext";
import { firePageBuilderAction } from "@/page-builder/triggers";
import { AnimatePresence, MotionFromJson } from "@/page-builder/integrations/framer-motion";
import {
  mergeMotionDefaults,
  getExitMotionFromPreset,
} from "@/page-builder/core/page-builder-motion-defaults";
import {
  buildElementButtonBlockStyle,
  buildElementButtonWrapperStyles,
  getElementButtonTypographyClass,
} from "./ElementButton/element-button-styles";
import {
  buildElementButtonLinkState,
  resolveElementButtonVectorBlock,
} from "./ElementButton/element-button-link-and-vector";
import { useModel3DReadyButtonExit } from "./ElementButton/use-model3d-ready-button-exit";
import { SectionGlassEffect } from "@/page-builder/section/stack/SectionGlassEffect";

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
  vectorRef,
  href,
  external = false,
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
  wrapperFill,
  wrapperStroke,
  wrapperFillRef,
  wrapperStrokeRef,
  wrapperPadding,
  wrapperBorderRadius,
  pointerDownAction,
  pointerUpAction,
  ...rest
}: Props) {
  const pathname = usePathname();
  const shellRef = useRef<HTMLDivElement | null>(null);
  const definitions = useDefinitions();
  const typographyClass = getElementButtonTypographyClass({
    type: "elementButton",
    label,
    copyType,
    level,
  } as Props);
  const { hasWrapper, useRoundedGradientStroke, wrapperStyle, innerWrapperStyle } =
    buildElementButtonWrapperStyles(definitions as Record<string, unknown> | null | undefined, {
      wrapperFill,
      wrapperStroke,
      wrapperFillRef,
      wrapperStrokeRef,
      wrapperPadding,
      wrapperBorderRadius,
    });
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
      disabled,
    },
    typographyClass
  );
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
  const vectorBlock = resolveElementButtonVectorBlock(
    definitions as Record<string, unknown> | null | undefined,
    vectorRef
  );
  const model3DExit = useModel3DReadyButtonExit(action, actionPayload);
  const buttonEffects = useMemo(() => coerceSectionEffects(rest.effects), [rest.effects]);
  const hasGlassEffect = (buttonEffects ?? []).some((effect) => effect.type === "glass");

  const exitMotion = useMemo(() => {
    const base = mergeMotionDefaults(rest.motion ?? {}) ?? {};
    const exitFromPreset =
      rest.exitPreset && typeof rest.exitPreset === "string"
        ? getExitMotionFromPreset(rest.exitPreset, {
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
  }, [rest.motion, rest.exitPreset, model3DExit.exitDurationMs, model3DExit.exitEasing]);

  const hasLabel = label != null && label !== "";
  const hasVector = vectorBlock != null;
  const hasAction = !!action && !href;
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
          style={disabled && hasLink ? { opacity: 0.6 } : undefined}
        >
          {label}
        </span>
      )}
      {hasVector && <ElementRenderer block={vectorBlock as ElementBlock} />}
    </span>
  );

  const inner = hasLink ? (
    isInternal ? (
      <Link href={href!} className={linkClassName} style={{ ...linkStyle, ...nakedSurfacePadding }}>
        {content}
      </Link>
    ) : (
      <a
        href={href!}
        className={linkClassName}
        style={{ ...linkStyle, ...nakedSurfacePadding }}
        {...(external && { target: "_blank", rel: "noopener noreferrer" })}
      >
        {content}
      </a>
    )
  ) : hasAction ? (
    <button
      type="button"
      onClick={() => {
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
      disabled={disabled}
      className={`inline-flex items-center justify-center ${disabled ? "cursor-not-allowed" : "cursor-pointer"}`}
      style={{
        appearance: "none",
        background: "transparent",
        border: "none",
        color: "inherit",
        font: "inherit",
        textAlign: "inherit",
        ...(hasWrapper ? { padding: 0 } : nakedSurfacePadding),
        ...(disabled ? { opacity: 0.6 } : {}),
      }}
    >
      {content}
    </button>
  ) : (
    content
  );

  const wrappedInner = hasWrapper ? (
    <span style={wrapperStyle} className="inline-flex">
      {useRoundedGradientStroke ? (
        <span style={innerWrapperStyle} className="inline-flex">
          {inner}
        </span>
      ) : (
        inner
      )}
    </span>
  ) : (
    inner
  );

  const shellStyle: CSSProperties = {
    ...blockStyle,
    ...(hasGlassEffect && blockStyle.position == null ? { position: "relative" } : {}),
  };

  const renderButtonShell = (child: ReactNode) => (
    <div ref={shellRef} className="shrink-0" style={shellStyle}>
      <SectionGlassEffect effects={buttonEffects} sectionRef={shellRef} variant="auto" />
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
