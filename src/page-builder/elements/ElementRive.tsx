"use client";

import { useRef, useCallback } from "react";
import type { ElementBlock } from "@/page-builder/core/page-builder-schemas";
import type { ElementLayoutTransformOptions } from "@/page-builder/core/element-layout-utils";
import { ElementLayoutWrapper } from "./Shared/ElementLayoutWrapper";
import { RivePlayer, type Rive } from "@/page-builder/integrations/rive";
import { firePageBuilderAction } from "@/page-builder/triggers";
import { useRiveTriggerControls } from "./ElementRive/use-rive-trigger-controls";

type Props = Extract<ElementBlock, { type: "elementRive" }>;

type LayoutProps = Pick<
  ElementLayoutTransformOptions,
  "width" | "height" | "align" | "marginTop" | "marginBottom" | "marginLeft" | "marginRight"
> & {
  zIndex?: number;
  constraints?: import("@/page-builder/core/page-builder-schemas").ElementLayout["constraints"];
  [key: string]: unknown;
};

function buildLayout(values: {
  width: Props["width"];
  height: Props["height"];
  align: Props["align"];
  marginTop: Props["marginTop"];
  marginBottom: Props["marginBottom"];
  marginLeft: Props["marginLeft"];
  marginRight: Props["marginRight"];
  zIndex: Props["zIndex"];
  constraints: Props["constraints"];
  effects: Props["effects"];
  wrapperStyle: Props["wrapperStyle"];
  opacity: Props["opacity"];
  blendMode: Props["blendMode"];
  boxShadow: Props["boxShadow"];
  filter: Props["filter"];
  backdropFilter: Props["backdropFilter"];
  hidden: Props["hidden"];
  overflow: Props["overflow"];
}): LayoutProps {
  return {
    width: values.width as string | undefined,
    height: values.height as string | undefined,
    align: values.align as "left" | "center" | "right" | undefined,
    marginTop: values.marginTop as string | undefined,
    marginBottom: values.marginBottom as string | undefined,
    marginLeft: values.marginLeft as string | undefined,
    marginRight: values.marginRight as string | undefined,
    zIndex: values.zIndex,
    constraints: values.constraints,
    effects: values.effects,
    wrapperStyle: values.wrapperStyle,
    opacity: values.opacity,
    blendMode: values.blendMode,
    boxShadow: values.boxShadow,
    filter: values.filter,
    backdropFilter: values.backdropFilter,
    hidden: values.hidden,
    overflow: values.overflow,
  };
}

export function ElementRive({
  id,
  src,
  artboard,
  stateMachine,
  autoplay,
  ariaLabel,
  onStateChange,
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
  interactions,
  // Consume (but don't forward) remaining layout fields that are not used here.
  borderRadius: _borderRadius,
  fixed: _fixed,
  action: _action,
  actionPayload: _actionPayload,
  showWhen: _showWhen,
  wrapperStyle,
  opacity,
  blendMode,
  boxShadow,
  filter,
  backdropFilter,
  hidden,
  overflow,
  aria: _aria,
  motion: _motion,
  reduceMotion: _reduceMotion,
  exitPreset: _exitPreset,
  motionTiming: _motionTiming,
  dragUnit: _dragUnit,
  dragBehavior: _dragBehavior,
  dragAxis: _dragAxis,
  priority: _priority,
  textAlign: _textAlign,
  alignY: _alignY,
}: Props) {
  const riveRef = useRef<Rive | null>(null);

  const layout = buildLayout({
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
    hidden,
    overflow,
  });

  // Listen for rive.* trigger events and dispatch imperatively via riveRef.
  useRiveTriggerControls({ id, riveRef, stateMachine });

  // Fire the onStateChange action into the page-builder action bus.
  const handleStateChange = useCallback(
    (stateName: string) => {
      if (!onStateChange) return;
      // Inject the stateName into the action payload for the consumer.
      // We clone the action and merge stateName into its payload.
      const enriched = {
        ...onStateChange,
        payload:
          onStateChange.payload && typeof onStateChange.payload === "object"
            ? { ...onStateChange.payload, stateName }
            : { stateName },
      } as import("@/page-builder/core/page-builder-schemas").PageBuilderAction;
      firePageBuilderAction(enriched, "system");
    },
    [onStateChange]
  );

  return (
    <ElementLayoutWrapper layout={layout} interactions={interactions}>
      <div className="relative w-full h-full min-h-0 min-w-0 flex-1">
        <RivePlayer
          src={src}
          artboard={artboard}
          stateMachine={stateMachine}
          autoplay={autoplay ?? true}
          onStateChange={onStateChange ? handleStateChange : undefined}
          riveRef={riveRef}
          ariaLabel={ariaLabel}
          className="absolute inset-0"
        />
      </div>
    </ElementLayoutWrapper>
  );
}
