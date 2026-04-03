import { useCallback, useEffect, useMemo, useState } from "react";
import { getAnimationBehavior } from "@/app/dev/elements/_shared/motion-lab";
import {
  DEFAULT_TYPOGRAPHY_VISIBLE_CATEGORIES,
  type TypographySettingsCategoryKey,
  type TypographyVisibleCategories,
} from "@/app/dev/elements/_shared/dev-controls/typography-settings-categories";
import {
  DEFAULT_IMAGE_RUNTIME_DRAFT,
  buildRuntimePreviewState,
} from "@/app/dev/elements/image/runtime-draft";
import type { ImageRuntimeDraft } from "@/app/dev/elements/image/types";
import { useTypographyMotionPreview } from "@/app/dev/elements/_shared/useTypographyMotionPreview";
import type {
  PbImageAnimationCurvePreset,
  PbImageAnimationDefaults,
  PbImageEntranceFineTune,
  PbImageExitFineTune,
} from "@/app/theme/pb-builder-defaults";
import { BASE_DEFAULTS, STORAGE_KEY, VARIANT_ORDER } from "./constants";
import { buildHeadingElementSnippet } from "./build-snippet";
import {
  normalizeHeadingVariant,
  readPersistedHeading,
  toHeadingExportJson,
} from "./normalization";
import type { HeadingVariantDefaults, HeadingVariantKey } from "./types";
import type { PersistedHeadingDefaults } from "./types";

export function useHeadingElementDevController() {
  const [defaultVariant, setDefaultVariant] = useState<HeadingVariantKey>(
    BASE_DEFAULTS.defaultVariant
  );
  const [variants, setVariants] = useState<Record<HeadingVariantKey, HeadingVariantDefaults>>(
    BASE_DEFAULTS.variants
  );
  const [activeVariant, setActiveVariant] = useState<HeadingVariantKey>(
    BASE_DEFAULTS.defaultVariant
  );
  const [isCustomVariant, setIsCustomVariant] = useState(false);
  const [hydrated, setHydrated] = useState(false);
  const [copied, setCopied] = useState(false);
  const [visibleCategories, setVisibleCategories] = useState<TypographyVisibleCategories>(
    DEFAULT_TYPOGRAPHY_VISIBLE_CATEGORIES
  );
  const [runtimeDraft, setRuntimeDraft] = useState<ImageRuntimeDraft>(DEFAULT_IMAGE_RUNTIME_DRAFT);

  useEffect(() => {
    /* eslint-disable react-hooks/set-state-in-effect -- hydrate once from localStorage after mount in this client-only tool. */
    const saved = readPersistedHeading();
    if (saved) {
      setDefaultVariant(saved.defaultVariant);
      setVariants(saved.variants);
      setActiveVariant(saved.defaultVariant);
    }
    setHydrated(true);
    /* eslint-enable react-hooks/set-state-in-effect */
  }, []);

  useEffect(() => {
    if (hydrated) {
      const payload: PersistedHeadingDefaults = { v: 1, defaultVariant, variants };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(payload));
    }
  }, [defaultVariant, hydrated, variants]);

  const updateVariant = useCallback(
    (key: HeadingVariantKey, apply: (v: HeadingVariantDefaults) => HeadingVariantDefaults) => {
      setVariants((prev) => ({ ...prev, [key]: apply(prev[key]) }));
    },
    []
  );

  const setVariantPatch = useCallback(
    (key: HeadingVariantKey, patch: Partial<HeadingVariantDefaults>) => {
      updateVariant(key, (v) => ({ ...v, ...patch }));
    },
    [updateVariant]
  );

  const setVariantExact = useCallback(
    (key: HeadingVariantKey, next: HeadingVariantDefaults) => {
      updateVariant(key, () => next);
    },
    [updateVariant]
  );

  const setAnimationPatch = useCallback(
    (key: HeadingVariantKey, patch: Partial<PbImageAnimationDefaults>) => {
      updateVariant(key, (v) => ({ ...v, animation: { ...v.animation, ...patch } }));
    },
    [updateVariant]
  );

  const patchEntranceFineTune = useCallback(
    (key: HeadingVariantKey, patch: Partial<PbImageEntranceFineTune>) => {
      updateVariant(key, (v) => ({
        ...v,
        animation: {
          ...v.animation,
          fineTune: {
            ...v.animation.fineTune,
            entrance: { ...v.animation.fineTune.entrance, ...patch },
          },
        },
      }));
    },
    [updateVariant]
  );

  const patchExitFineTune = useCallback(
    (key: HeadingVariantKey, patch: Partial<PbImageExitFineTune>) => {
      updateVariant(key, (v) => ({
        ...v,
        animation: {
          ...v.animation,
          fineTune: { ...v.animation.fineTune, exit: { ...v.animation.fineTune.exit, ...patch } },
        },
      }));
    },
    [updateVariant]
  );

  const setEntranceCurvePreset = useCallback(
    (key: HeadingVariantKey, preset: PbImageAnimationCurvePreset) =>
      patchEntranceFineTune(key, {
        curve: { ...variants[key].animation.fineTune.entrance.curve, preset },
      }),
    [patchEntranceFineTune, variants]
  );

  const setExitCurvePreset = useCallback(
    (key: HeadingVariantKey, preset: PbImageAnimationCurvePreset) =>
      patchExitFineTune(key, { curve: { ...variants[key].animation.fineTune.exit.curve, preset } }),
    [patchExitFineTune, variants]
  );

  const setEntranceBezierValue = useCallback(
    (key: HeadingVariantKey, index: number, value: number) =>
      patchEntranceFineTune(key, {
        curve: {
          ...variants[key].animation.fineTune.entrance.curve,
          customBezier: variants[key].animation.fineTune.entrance.curve.customBezier.map(
            (entry, i) => (i === index ? value : entry)
          ) as [number, number, number, number],
        },
      }),
    [patchEntranceFineTune, variants]
  );

  const setExitBezierValue = useCallback(
    (key: HeadingVariantKey, index: number, value: number) =>
      patchExitFineTune(key, {
        curve: {
          ...variants[key].animation.fineTune.exit.curve,
          customBezier: variants[key].animation.fineTune.exit.curve.customBezier.map((entry, i) =>
            i === index ? value : entry
          ) as [number, number, number, number],
        },
      }),
    [patchExitFineTune, variants]
  );

  const setRuntimePatch = useCallback((patch: Partial<ImageRuntimeDraft>) => {
    setRuntimeDraft((prev) => ({ ...prev, ...patch }));
  }, []);

  const active = variants[activeVariant];
  const runtimePreview = useMemo(() => buildRuntimePreviewState(runtimeDraft), [runtimeDraft]);
  const motionPreview = useTypographyMotionPreview(
    active as unknown as Record<string, unknown>,
    runtimePreview.motion
  );
  const { resetMotionPreview } = motionPreview;
  const animationBehavior = getAnimationBehavior(active.animation.fineTune);
  const showHybridControls = animationBehavior === "hybrid";
  const showFineTuneControls = animationBehavior === "custom";
  const showPresetControls = animationBehavior !== "custom";

  const exportJson = useMemo(
    () => toHeadingExportJson({ v: 1, defaultVariant, variants }),
    [defaultVariant, variants]
  );
  const customElementJson = useMemo(
    () => JSON.stringify(buildHeadingElementSnippet(activeVariant, active, runtimeDraft), null, 2),
    [active, activeVariant, runtimeDraft]
  );

  const copyExport = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(exportJson);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      /* ignore */
    }
  }, [exportJson]);

  const resetHeadingDefaults = useCallback(() => {
    localStorage.removeItem(STORAGE_KEY);
    setDefaultVariant(BASE_DEFAULTS.defaultVariant);
    setVariants(BASE_DEFAULTS.variants);
    setActiveVariant(BASE_DEFAULTS.defaultVariant);
    setIsCustomVariant(false);
    setVisibleCategories(DEFAULT_TYPOGRAPHY_VISIBLE_CATEGORIES);
    setRuntimeDraft(DEFAULT_IMAGE_RUNTIME_DRAFT);
    resetMotionPreview();
    setCopied(false);
  }, [resetMotionPreview]);

  const toggleCategoryVisibility = useCallback((key: TypographySettingsCategoryKey) => {
    setVisibleCategories((prev) => ({ ...prev, [key]: !prev[key] }));
  }, []);

  const selectVariant = useCallback((key: HeadingVariantKey) => {
    setActiveVariant(key);
    setIsCustomVariant(false);
  }, []);

  const selectCustomVariant = useCallback(() => {
    setIsCustomVariant(true);
  }, []);

  return {
    active,
    activeVariant,
    animationBehavior,
    copied,
    customElementJson,
    defaultVariant,
    exportJson,
    hydrated,
    isCustomVariant,
    patchEntranceFineTune,
    patchExitFineTune,
    resetHeadingDefaults,
    runtimeDraft,
    runtimePreview,
    setAnimationPatch,
    setEntranceBezierValue,
    setEntranceCurvePreset,
    setExitBezierValue,
    setExitCurvePreset,
    showFineTuneControls,
    showHybridControls,
    showPresetControls,
    variants,
    copyExport,
    normalizeVariant: normalizeHeadingVariant,
    selectCustomVariant,
    selectVariant,
    setActiveVariant,
    setDefaultVariant,
    setRuntimePatch,
    toggleCategoryVisibility,
    setVariantExact,
    setVariantPatch,
    variantOrder: VARIANT_ORDER,
    visibleCategories,
    ...motionPreview,
  };
}

export type HeadingElementDevController = ReturnType<typeof useHeadingElementDevController>;
