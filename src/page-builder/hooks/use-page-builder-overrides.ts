"use client";

import { useState, useEffect, useMemo } from "react";
import type { bgBlock, SectionBlock } from "@/page-builder/core/page-builder-schemas";
import { OVERRIDE_KEY_BG } from "@/page-builder/core/page-builder-schemas";
import {
  applyElementOverrides,
  isBgBlockPayload,
  type OverridesMap,
} from "@/page-builder/core/page-builder-overrides";

export type UsePageBuilderOverridesParams = {
  resolvedBg: bgBlock | null;
  resolvedSections: SectionBlock[];
};

export type UsePageBuilderOverridesResult = {
  currentBg: bgBlock | null;
  sectionsWithOverrides: SectionBlock[];
  setOverrides: React.Dispatch<React.SetStateAction<OverridesMap>>;
};

export function usePageBuilderOverrides({
  resolvedBg,
  resolvedSections,
}: UsePageBuilderOverridesParams): UsePageBuilderOverridesResult {
  const [overrides, setOverrides] = useState<OverridesMap>({});

  useEffect(() => {
    queueMicrotask(() => setOverrides({}));
  }, [resolvedBg]);

  const currentBg = useMemo(
    () =>
      overrides[OVERRIDE_KEY_BG] != null && isBgBlockPayload(overrides[OVERRIDE_KEY_BG])
        ? (overrides[OVERRIDE_KEY_BG] as bgBlock)
        : resolvedBg,
    [overrides, resolvedBg]
  );

  const sectionsWithOverrides = useMemo(
    () => applyElementOverrides(resolvedSections, overrides),
    [resolvedSections, overrides]
  );

  return { currentBg, sectionsWithOverrides, setOverrides };
}
