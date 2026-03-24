"use client";

/**
 * Video overlay: one Framer Motion wrapper controls opacity (fade in/out).
 * Visibility rules: see video-control-visibility-rules.ts.
 */

import { useMemo, useState, useEffect } from "react";
import type { CSSProperties } from "react";
import type { ModuleBlock } from "@/page-builder/core/page-builder-schemas";
import type { ModuleSlotConfig } from "@/page-builder/elements/ElementModule/types";
import { VideoSlotSection } from "./VideoSlotSection";
import { motion, MotionFromJson } from "@/page-builder/integrations/framer-motion";
import type { Transition } from "framer-motion";
import { mergeMotionDefaults } from "@/page-builder/core/page-builder-motion-defaults";

export type ElementVideoSlotsOverlayProps = {
  slotsObj: Record<string, unknown>;
  contentSlotKey: string;
  moduleConfig: ModuleBlock;
  showControls: boolean;
  isPlaying: boolean;
  isMuted: boolean;
  isFullscreen: boolean;
  onPointerEnter: () => void;
  onPointerLeave: () => void;
  onPointerMove: () => void;
  onPointerDown: () => void;
};

function buildOverlayMotionFromBehavior(
  behavior: Record<string, unknown> | undefined
): Record<string, unknown> {
  const ms =
    (typeof behavior?.controlsTransitionMs === "number" ? behavior.controlsTransitionMs : null) ??
    (typeof behavior?.sleepFadeMs === "number" ? behavior.sleepFadeMs : null);
  const ease =
    typeof behavior?.controlsTransitionEasing === "string"
      ? behavior.controlsTransitionEasing
      : typeof behavior?.transitionEasing === "string"
        ? behavior.transitionEasing
        : undefined;
  return {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    transition:
      ms != null || ease
        ? { duration: ms != null ? ms / 1000 : 0.3, ...(ease ? { ease } : {}) }
        : undefined,
  };
}

function slotHasSection(slot: unknown): slot is { section?: { definitions?: unknown } } {
  return (
    slot != null &&
    typeof slot === "object" &&
    typeof (slot as { section?: { definitions?: unknown } })?.section?.definitions !== "undefined"
  );
}

/** Slot has layout or style so we don't paint an unstyled bar (avoids FOUC when module loads late). */
function slotHasLayoutOrStyle(slot: ModuleSlotConfig): boolean {
  return (
    (typeof slot.position === "string" && slot.position.length > 0) ||
    (typeof slot.bottom === "string" && slot.bottom.length > 0) ||
    (typeof slot.left === "string" && slot.left.length > 0) ||
    (typeof slot.right === "string" && slot.right.length > 0) ||
    (slot.style != null && typeof slot.style === "object" && Object.keys(slot.style).length > 0)
  );
}

function isDisableSlot(slot: ModuleSlotConfig): boolean {
  return slot.transformInherit === "disable";
}

export function ElementVideoSlotsOverlay({
  slotsObj,
  contentSlotKey,
  moduleConfig,
  showControls,
  isPlaying,
  isMuted,
  isFullscreen,
  onPointerEnter,
  onPointerLeave,
  onPointerMove,
  onPointerDown,
}: ElementVideoSlotsOverlayProps) {
  const slotBehavior = moduleConfig?.behavior as Record<string, unknown> | undefined;

  /** Framer Motion config for overlay (gestures etc.). Opacity fade is driven by CSS transition on wrapper (controlsTransitionMs from JSON). */
  const overlayMotion = useMemo(() => {
    const fromJson = (moduleConfig as ModuleBlock & { overlayMotion?: unknown }).overlayMotion;
    const base =
      fromJson && typeof fromJson === "object"
        ? (fromJson as Record<string, unknown>)
        : buildOverlayMotionFromBehavior(slotBehavior);
    return mergeMotionDefaults(base) as Record<string, unknown>;
  }, [moduleConfig, slotBehavior]);

  const slotsTransitionMs =
    typeof slotBehavior?.controlsTransitionMs === "number"
      ? slotBehavior.controlsTransitionMs
      : typeof slotBehavior?.sleepFadeMs === "number"
        ? slotBehavior.sleepFadeMs
        : 500;
  const slotsTransitionEasing =
    typeof slotBehavior?.controlsTransitionEasing === "string"
      ? slotBehavior.controlsTransitionEasing
      : typeof slotBehavior?.transitionEasing === "string"
        ? slotBehavior.transitionEasing
        : "easeOut";

  const { inheritSlots, disableSlots, fullscreenBottomSlotKey, fullscreenBottomSlot } =
    useMemo(() => {
      const inherit: [string, ModuleSlotConfig][] = [];
      const disable: [string, ModuleSlotConfig][] = [];
      for (const [key, slot] of Object.entries(slotsObj)) {
        if (key === contentSlotKey || !slotHasSection(slot)) continue;
        const cfg = slot as ModuleSlotConfig;
        if (!slotHasLayoutOrStyle(cfg)) continue;
        if (isDisableSlot(cfg)) disable.push([key, cfg]);
        else inherit.push([key, cfg]);
      }
      const bottomInDisable = disable.find(([k]) => k === "bottomBar");
      const bottomInInherit = inherit.find(([k]) => k === "bottomBar");
      const bottomKey = bottomInDisable || bottomInInherit ? "bottomBar" : null;
      const bottomEntry = bottomInDisable ?? bottomInInherit ?? null;
      return {
        inheritSlots: inherit,
        disableSlots: disable,
        fullscreenBottomSlotKey: bottomKey,
        fullscreenBottomSlot: bottomEntry,
      };
    }, [slotsObj, contentSlotKey]);

  const [overlayReady, setOverlayReady] = useState(false);

  useEffect(() => {
    const id = requestAnimationFrame(() => setOverlayReady(true));
    return () => cancelAnimationFrame(id);
  }, []);

  const defaultTransitionMs =
    typeof slotBehavior?.controlsTransitionMs === "number"
      ? slotBehavior.controlsTransitionMs
      : typeof slotBehavior?.sleepFadeMs === "number"
        ? slotBehavior.sleepFadeMs
        : undefined;
  const defaultTransitionEasing =
    typeof slotBehavior?.controlsTransitionEasing === "string"
      ? slotBehavior.controlsTransitionEasing
      : typeof slotBehavior?.transitionEasing === "string"
        ? slotBehavior.transitionEasing
        : undefined;

  const slotProps = {
    showControls,
    isPlaying,
    isMuted,
    isFullscreen,
    defaultTransitionMs,
    defaultTransitionEasing,
  };

  const overlayWrapperStyle = useMemo<CSSProperties>(() => {
    const style: CSSProperties = {
      WebkitTapHighlightColor: "transparent",
      WebkitTouchCallout: "none",
    };
    if (isFullscreen) {
      Object.assign(style, {
        width: "100%",
        height: "100%",
        minWidth: "100%",
        minHeight: "100%",
        display: "flex",
        flexDirection: "column" as CSSProperties["flexDirection"],
        justifyContent: "flex-end",
      });
    }
    return style;
  }, [isFullscreen]);

  // Single Framer Motion wrapper: one place controls fade (rules: transition from JSON, never instant)
  const overlayTransition = useMemo<Transition>(
    () => ({
      duration: slotsTransitionMs / 1000,
      // Framer Motion accepts string easings; cast to the library type.
      ease: slotsTransitionEasing as Transition["ease"],
    }),
    [slotsTransitionMs, slotsTransitionEasing]
  );

  if (!overlayReady) {
    return (
      <div
        className="absolute inset-0 z-10 select-none"
        style={overlayWrapperStyle}
        aria-hidden="true"
      />
    );
  }

  return (
    <div
      className="absolute inset-0 z-10 select-none"
      style={overlayWrapperStyle}
      aria-hidden="false"
    >
      <motion.div
        className="absolute inset-0"
        style={{
          zIndex: 0,
          pointerEvents: showControls ? "auto" : "none",
          WebkitTapHighlightColor: "transparent",
          WebkitTouchCallout: "none",
          ...(isFullscreen
            ? {
                display: "flex",
                flexDirection: "column" as CSSProperties["flexDirection"],
                justifyContent: "flex-end",
              }
            : {}),
        }}
        animate={{ opacity: showControls ? 1 : 0 }}
        transition={overlayTransition}
        onPointerEnter={onPointerEnter}
        onPointerLeave={onPointerLeave}
        onPointerMove={onPointerMove}
        onPointerDown={(e) => {
          e.stopPropagation();
          onPointerDown();
        }}
      >
        {/* Motion layer: slots that inherit transform */}
        <MotionFromJson motion={overlayMotion} useMotionAsIs className="absolute inset-0">
          {inheritSlots
            .filter(([key]) => !isFullscreen || key !== fullscreenBottomSlotKey)
            .map(([key, slot]) => (
              <VideoSlotSection
                key={key}
                slot={slot}
                slotKey={key}
                {...slotProps}
                debugSlotKey={key}
              />
            ))}
        </MotionFromJson>
        {/* Fullscreen: pin bottom bar to viewport, full width */}
        {isFullscreen &&
          fullscreenBottomSlot &&
          (() => {
            const [key, slot] = fullscreenBottomSlot;
            return (
              <div
                className="absolute inset-0 pointer-events-none"
                style={{ zIndex: 5 }}
                aria-hidden="true"
              >
                <div
                  style={{
                    position: "fixed",
                    bottom: 0,
                    left: 0,
                    right: 0,
                    width: "100%",
                    minHeight: 0,
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "flex-end",
                    pointerEvents: "auto",
                  }}
                >
                  <VideoSlotSection
                    slot={slot}
                    slotKey={key}
                    {...slotProps}
                    slotStyleOverride={{
                      left: "10px",
                      right: "10px",
                      bottom: "10px",
                      width: "auto",
                    }}
                    debugSlotKey={key}
                  />
                </div>
              </div>
            );
          })()}
        {/* Disable layer: slots that don't scale with parent; when fullscreen, bottomBar is above */}
        {disableSlots.length > 0 && (
          <div
            className="absolute inset-0"
            style={{
              zIndex: 1,
              pointerEvents: "none",
              WebkitTapHighlightColor: "transparent",
              WebkitTouchCallout: "none",
            }}
          >
            {disableSlots
              .filter(([key]) => !isFullscreen || key !== fullscreenBottomSlotKey)
              .map(([key, slot]) => (
                <VideoSlotSection
                  key={key}
                  slot={slot}
                  slotKey={key}
                  {...slotProps}
                  pointerEventsWhenVisible="auto"
                  debugSlotKey={key}
                />
              ))}
          </div>
        )}
      </motion.div>
    </div>
  );
}
