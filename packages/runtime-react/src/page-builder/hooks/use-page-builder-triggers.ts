"use client";

import { useMemo } from "react";
import type { bgBlock, SectionBlock } from "@pb/contracts/page-builder/core/page-builder-schemas";
import type { TriggerAction } from "@pb/contracts/page-builder/core/page-builder-schemas";
import type { BackgroundTransitionEffect } from "@pb/contracts/page-builder/core/page-builder-types";
import { usePageBuilderOverrides } from "./use-page-builder-overrides";
import { usePageBuilderTransitionState } from "./use-page-builder-transition-state";
import { usePageBuilderTriggerListener } from "./use-page-builder-trigger-listener";

export type PageBuilderTriggersParams = {
  resolvedBg: bgBlock | null;
  resolvedSections: SectionBlock[];
  onPageProgress?: TriggerAction;
  bgDefinitions?: Record<string, bgBlock>;
  transitions?: BackgroundTransitionEffect | BackgroundTransitionEffect[];
};

export type PageBuilderTriggersResult = {
  currentBg: bgBlock | null;
  sectionsWithOverrides: SectionBlock[];
  activeTransitionIds: Set<string>;
  reversingTransitionIds: Set<string>;
  transitionProgress: Map<string, number>;
  setActiveTransitionIds: React.Dispatch<React.SetStateAction<Set<string>>>;
  setReversingTransitionIds: React.Dispatch<React.SetStateAction<Set<string>>>;
  transitionsArray: BackgroundTransitionEffect[];
};

/** Composes overrides, transition state, and trigger listener. Single place to wire page-builder trigger behavior. */
export function usePageBuilderTriggers({
  resolvedBg,
  resolvedSections,
  onPageProgress,
  bgDefinitions,
  transitions,
}: PageBuilderTriggersParams): PageBuilderTriggersResult {
  const transitionsArray = useMemo(() => {
    const raw = transitions ? (Array.isArray(transitions) ? transitions : [transitions]) : [];
    const filtered = raw.filter((transition) => {
      const id = transition.id;
      return typeof id === "string" && id.trim().length > 0;
    });
    if (process.env.NODE_ENV === "development" && filtered.length !== raw.length) {
      console.warn(
        `[page-builder] usePageBuilderTriggers: dropped ${raw.length - filtered.length} transition(s) with missing/empty id`
      );
    }
    return filtered;
  }, [transitions]);

  const { currentBg, sectionsWithOverrides, setOverrides } = usePageBuilderOverrides({
    resolvedBg,
    resolvedSections,
  });

  const {
    activeTransitionIds,
    reversingTransitionIds,
    transitionProgress,
    setActiveTransitionIds,
    setReversingTransitionIds,
    setTransitionProgress,
  } = usePageBuilderTransitionState({ transitionsArray, onPageProgress });

  usePageBuilderTriggerListener({
    setOverrides,
    setActiveTransitionIds,
    setReversingTransitionIds,
    setTransitionProgress,
    resolvedBg,
    bgDefinitions,
    transitionsArray,
  });

  return {
    currentBg,
    sectionsWithOverrides,
    activeTransitionIds,
    reversingTransitionIds,
    transitionProgress,
    setActiveTransitionIds,
    setReversingTransitionIds,
    transitionsArray,
  };
}
