"use client";

import { createElement } from "react";
import dynamic from "next/dynamic";
import type { bgBlock } from "@pb/contracts/page-builder/core/page-builder-schemas";
import { BG_COMPONENTS, isKnownBgType } from "@/page-builder/background";
import type { BackgroundTransitionEffect } from "@pb/contracts/page-builder/core/page-builder-types";

const BackgroundTransitionEffectComponent = dynamic(
  () =>
    import("./BackgroundTransitionEffect").then((m) => ({
      default: m.BackgroundTransitionEffect,
    })),
  { loading: () => null }
);

export type PageBuilderBackgroundProps = {
  loading: boolean;
  bg: bgBlock | null;
  transitionsArray: BackgroundTransitionEffect[];
  activeTransitionIds: Set<string>;
  reversingTransitionIds: Set<string>;
  transitionProgress: Map<string, number>;
  resolvedTransitionBackgrounds: Map<string, { fromBg: bgBlock | null; toBg: bgBlock | null }>;
  setActiveTransitionIds: React.Dispatch<React.SetStateAction<Set<string>>>;
  setReversingTransitionIds: React.Dispatch<React.SetStateAction<Set<string>>>;
};

/** Renders the correct background or transition based on loading and transition state. Presentational. */
export function PageBuilderBackground({
  loading,
  bg,
  transitionsArray,
  activeTransitionIds,
  reversingTransitionIds,
  transitionProgress,
  resolvedTransitionBackgrounds,
  setActiveTransitionIds,
  setReversingTransitionIds,
}: PageBuilderBackgroundProps): React.ReactNode {
  const showBg = !!bg;
  const BgComponent = bg && isKnownBgType(bg.type) ? BG_COMPONENTS[bg.type] : null;

  const mainBgProps = bg ? { ...bg, priority: true as const } : null;

  if (loading) {
    return showBg && BgComponent && mainBgProps
      ? createElement(BgComponent, mainBgProps as bgBlock)
      : null;
  }

  const activeNonScroll = transitionsArray
    .filter((t) => t.type !== "SCROLL")
    .filter((t) => activeTransitionIds.has(t.id || "default"));

  if (activeNonScroll.length > 0) {
    return activeNonScroll.map((transition) => {
      const transitionId = transition.id || "default";
      const backgrounds = resolvedTransitionBackgrounds.get(transitionId);
      if (!backgrounds) return null;
      return (
        <BackgroundTransitionEffectComponent
          key={`transition-${transitionId}`}
          effect={transition}
          fromBg={backgrounds.fromBg}
          toBg={backgrounds.toBg}
          transitionId={transitionId}
          isReversing={reversingTransitionIds.has(transitionId)}
          onReverseComplete={() => {
            if (transition.type !== "TRIGGER") {
              setActiveTransitionIds((prev) => {
                const next = new Set(prev);
                next.delete(transitionId);
                return next;
              });
            }
            setReversingTransitionIds((prev) => {
              const next = new Set(prev);
              next.delete(transitionId);
              return next;
            });
          }}
        />
      );
    });
  }

  const scrollTransition = transitionsArray.find((t) => t.type === "SCROLL");
  const scrollTransitionId = scrollTransition ? scrollTransition.id || "default" : null;
  const hasScrollProgress =
    scrollTransitionId != null && transitionProgress.has(scrollTransitionId);

  if (scrollTransition && scrollTransitionId != null && hasScrollProgress) {
    const backgrounds = resolvedTransitionBackgrounds.get(scrollTransitionId);
    const p = transitionProgress.get(scrollTransitionId) ?? 0;
    if (backgrounds) {
      const effectWithProgress = {
        ...scrollTransition,
        progress: p,
      } as BackgroundTransitionEffect;
      return (
        <BackgroundTransitionEffectComponent
          key={`transition-${scrollTransitionId}`}
          effect={effectWithProgress}
          fromBg={backgrounds.fromBg}
          toBg={backgrounds.toBg}
          transitionId={scrollTransitionId}
          isReversing={false}
          onReverseComplete={() => {}}
        />
      );
    }
  }

  return showBg && BgComponent && mainBgProps
    ? createElement(BgComponent, mainBgProps as bgBlock)
    : null;
}
