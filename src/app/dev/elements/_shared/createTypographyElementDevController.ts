"use client";
/* eslint-disable max-lines */

import { useCallback, useEffect, useMemo, useState } from "react";
import type {
  PbImageAnimationCurvePreset,
  PbImageAnimationDefaults,
  PbImageEntranceFineTune,
  PbImageExitFineTune,
} from "@/app/theme/pb-builder-defaults";
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
import {
  clearWorkbenchElement,
  patchWorkbenchElement,
  WORKBENCH_SESSION_CHANGED_EVENT,
  WORKBENCH_SESSION_STORAGE_KEY,
} from "@/app/dev/workbench/workbench-session";
import type {
  PersistedShape,
  TypographyControllerOptions,
} from "@/app/dev/elements/_shared/typography-controller-types";
export function createTypographyElementDevController<
  K extends string,
  V extends { animation: PbImageAnimationDefaults },
  P extends PersistedShape<K, V>,
>(options: TypographyControllerOptions<K, V, P>) {
  return function useTypographyElementDevController() {
    const [defaultVariant, setDefaultVariant] = useState<K>(options.defaults.defaultVariant);
    const [variants, setVariants] = useState<Record<K, V>>(options.defaults.variants);
    const [activeVariant, setActiveVariant] = useState<K>(options.defaults.defaultVariant);
    const [isCustomVariant, setIsCustomVariant] = useState(false);
    const [hydrated, setHydrated] = useState(false);
    const [copied, setCopied] = useState(false);
    const [visibleCategories, setVisibleCategories] = useState<TypographyVisibleCategories>(
      DEFAULT_TYPOGRAPHY_VISIBLE_CATEGORIES
    );
    const [runtimeDraft, setRuntimeDraft] = useState<ImageRuntimeDraft>(
      DEFAULT_IMAGE_RUNTIME_DRAFT
    );
    useEffect(() => {
      const saved = options.readPersisted();
      if (saved) {
        setDefaultVariant(saved.defaultVariant);
        setVariants(saved.variants);
        setActiveVariant(saved.defaultVariant);
      }
      setHydrated(true);
    }, []);
    useEffect(() => {
      if (!hydrated) return;
      patchWorkbenchElement(
        options.elementKey,
        options.toPersisted(defaultVariant, variants) as never
      );
    }, [defaultVariant, hydrated, variants]);
    useEffect(() => {
      if (typeof window === "undefined" || !hydrated) return;
      const syncFromSession = () => {
        const saved = options.readPersisted();
        if (saved) {
          setDefaultVariant(saved.defaultVariant);
          setVariants(saved.variants);
          setActiveVariant(saved.defaultVariant);
          return;
        }
        setDefaultVariant(options.defaults.defaultVariant);
        setVariants(options.defaults.variants);
        setActiveVariant(options.defaults.defaultVariant);
        setIsCustomVariant(false);
      };
      const onStorage = (e: StorageEvent) => {
        if (e.key === WORKBENCH_SESSION_STORAGE_KEY) syncFromSession();
      };
      window.addEventListener("storage", onStorage);
      window.addEventListener(WORKBENCH_SESSION_CHANGED_EVENT, syncFromSession);
      return () => {
        window.removeEventListener("storage", onStorage);
        window.removeEventListener(WORKBENCH_SESSION_CHANGED_EVENT, syncFromSession);
      };
    }, [hydrated]);
    const updateVariant = useCallback((key: K, apply: (v: V) => V) => {
      setVariants((prev) => ({ ...prev, [key]: apply(prev[key]) }));
    }, []);
    const setVariantPatch = useCallback(
      (key: K, patch: Partial<V>) => updateVariant(key, (variant) => ({ ...variant, ...patch })),
      [updateVariant]
    );
    const setVariantExact = useCallback(
      (key: K, nextVariant: V) => updateVariant(key, () => nextVariant),
      [updateVariant]
    );
    const setAnimationPatch = useCallback(
      (key: K, patch: Partial<PbImageAnimationDefaults>) =>
        updateVariant(key, (variant) => ({
          ...variant,
          animation: { ...variant.animation, ...patch },
        })),
      [updateVariant]
    );
    const patchEntranceFineTune = useCallback(
      (key: K, patch: Partial<PbImageEntranceFineTune>) =>
        updateVariant(key, (variant) => ({
          ...variant,
          animation: {
            ...variant.animation,
            fineTune: {
              ...variant.animation.fineTune,
              entrance: { ...variant.animation.fineTune.entrance, ...patch },
            },
          },
        })),
      [updateVariant]
    );
    const patchExitFineTune = useCallback(
      (key: K, patch: Partial<PbImageExitFineTune>) =>
        updateVariant(key, (variant) => ({
          ...variant,
          animation: {
            ...variant.animation,
            fineTune: {
              ...variant.animation.fineTune,
              exit: { ...variant.animation.fineTune.exit, ...patch },
            },
          },
        })),
      [updateVariant]
    );
    const setEntranceCurvePreset = useCallback(
      (key: K, preset: PbImageAnimationCurvePreset) =>
        patchEntranceFineTune(key, {
          curve: { ...variants[key].animation.fineTune.entrance.curve, preset },
        }),
      [patchEntranceFineTune, variants]
    );
    const setExitCurvePreset = useCallback(
      (key: K, preset: PbImageAnimationCurvePreset) =>
        patchExitFineTune(key, {
          curve: { ...variants[key].animation.fineTune.exit.curve, preset },
        }),
      [patchExitFineTune, variants]
    );
    const setEntranceBezierValue = useCallback(
      (key: K, index: number, value: number) =>
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
      (key: K, index: number, value: number) =>
        patchExitFineTune(key, {
          curve: {
            ...variants[key].animation.fineTune.exit.curve,
            customBezier: variants[key].animation.fineTune.exit.curve.customBezier.map(
              (entry, i) => (i === index ? value : entry)
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
    const motionPreview = useTypographyMotionPreview(active as unknown as Record<string, unknown>);
    const { resetMotionPreview } = motionPreview;
    const ft = active.animation.fineTune;
    const exportJson = useMemo(
      () => options.toExportJson(options.toPersisted(defaultVariant, variants)),
      [defaultVariant, variants]
    );
    const customElementJson = useMemo(
      () => JSON.stringify(options.buildSnippet(activeVariant, active, runtimeDraft), null, 2),
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
    const resetDefaults = useCallback(() => {
      clearWorkbenchElement(options.elementKey);
      setDefaultVariant(options.defaults.defaultVariant);
      setVariants(options.defaults.variants);
      setActiveVariant(options.defaults.defaultVariant);
      setIsCustomVariant(false);
      setVisibleCategories(DEFAULT_TYPOGRAPHY_VISIBLE_CATEGORIES);
      setRuntimeDraft(DEFAULT_IMAGE_RUNTIME_DRAFT);
      resetMotionPreview();
      setCopied(false);
    }, [resetMotionPreview]);
    return {
      active,
      activeVariant,
      animationBehavior: getAnimationBehavior(ft),
      copied,
      customElementJson,
      defaultVariant,
      exportJson,
      hydrated,
      isCustomVariant,
      normalizeVariant: options.normalizeVariant,
      patchEntranceFineTune,
      patchExitFineTune,
      resetDefaults,
      runtimeDraft,
      runtimePreview,
      setAnimationPatch,
      setDefaultVariant,
      setEntranceBezierValue,
      setEntranceCurvePreset,
      setExitBezierValue,
      setExitCurvePreset,
      setRuntimePatch,
      setVariantExact,
      setVariantPatch,
      showFineTuneControls: ft.entranceBehavior === "custom" || ft.exitBehavior === "custom",
      showHybridControls: ft.entranceBehavior === "hybrid" || ft.exitBehavior === "hybrid",
      showPresetControls: ft.entranceBehavior !== "custom" || ft.exitBehavior !== "custom",
      toggleCategoryVisibility: (key: TypographySettingsCategoryKey) =>
        setVisibleCategories((prev) => ({ ...prev, [key]: !prev[key] })),
      selectCustomVariant: () => setIsCustomVariant(true),
      selectVariant: (key: K) => {
        setActiveVariant(key);
        setIsCustomVariant(false);
      },
      copyExport,
      setActiveVariant,
      variantOrder: options.variantOrder,
      variants,
      visibleCategories,
      ...motionPreview,
    };
  };
}
