import { useCallback, useEffect, useMemo, useState } from "react";
import type {
  PbImageAnimationCurvePreset,
  PbImageAnimationDefaults,
  PbImageEntranceFineTune,
  PbImageExitFineTune,
  PbImageVariantDefaults,
  PbImageVariantKey,
} from "@/app/theme/pb-builder-defaults";
import { getAnimationBehavior } from "@/app/dev/elements/_shared/motion-lab";
import { BASE_DEFAULTS, STORAGE_KEY } from "./constants";
import { readPersisted, toExportJson } from "./normalization";
import { buildPreviewMotion, getLoopIntervalMs } from "./preview-motion";
import {
  buildCustomElementSnippet,
  buildRuntimePreviewState,
  DEFAULT_IMAGE_RUNTIME_DRAFT,
} from "./runtime-draft";
import {
  resolveConstraintsForDevice,
  resolveResponsiveValueForDevice,
  type PreviewDevice,
} from "./responsive";
import type { ImageRuntimeDraft, SettingsCategoryKey, VisibleCategories } from "./types";
import { isNonEmptyText } from "./utils";

const DEFAULT_VISIBLE_CATEGORIES: VisibleCategories = {
  layout: false,
  traits: false,
  animation: false,
  runtime: false,
};

function hasResponsiveText(value: unknown): boolean {
  if (typeof value === "string") return value.trim().length > 0;
  if (Array.isArray(value) && value.length === 2) {
    return value.some((entry) => typeof entry === "string" && entry.trim().length > 0);
  }
  return false;
}

export function useImageElementDevController() {
  const [defaultVariant, setDefaultVariant] = useState<PbImageVariantKey>(
    BASE_DEFAULTS.defaultVariant
  );
  const [variants, setVariants] = useState<Record<PbImageVariantKey, PbImageVariantDefaults>>(
    BASE_DEFAULTS.variants
  );
  const [activeVariant, setActiveVariant] = useState<PbImageVariantKey>(
    BASE_DEFAULTS.defaultVariant
  );
  const [isCustomVariant, setIsCustomVariant] = useState(false);
  const [hydrated, setHydrated] = useState(false);
  const [copied, setCopied] = useState(false);
  const [visibleCategories, setVisibleCategories] = useState<VisibleCategories>(
    DEFAULT_VISIBLE_CATEGORIES
  );
  const [previewVisible, setPreviewVisible] = useState(true);
  const [previewKey, setPreviewKey] = useState(0);
  const [autoLoop, setAutoLoop] = useState(false);
  const [previewDevice, setPreviewDevice] = useState<PreviewDevice>("desktop");
  const [previewUploadUrl, setPreviewUploadUrl] = useState<string | null>(null);
  const [previewUploadName, setPreviewUploadName] = useState<string | null>(null);
  const [runtimeDraft, setRuntimeDraft] = useState<ImageRuntimeDraft>(DEFAULT_IMAGE_RUNTIME_DRAFT);

  useEffect(() => {
    /* eslint-disable react-hooks/set-state-in-effect -- hydrate once from localStorage after mount in this client-only tool. */
    const saved = readPersisted();
    if (saved) {
      setDefaultVariant(saved.defaultVariant);
      setVariants(saved.variants);
      setActiveVariant(saved.defaultVariant);
    }
    setHydrated(true);
    /* eslint-enable react-hooks/set-state-in-effect */
  }, []);

  useEffect(() => {
    if (hydrated)
      localStorage.setItem(STORAGE_KEY, JSON.stringify({ v: 3, defaultVariant, variants }));
  }, [defaultVariant, hydrated, variants]);

  const updateVariant = useCallback(
    (
      key: PbImageVariantKey,
      apply: (variant: PbImageVariantDefaults) => PbImageVariantDefaults
    ) => {
      setVariants((prev) => ({ ...prev, [key]: apply(prev[key]) }));
    },
    []
  );
  const setVariantPatch = useCallback(
    (key: PbImageVariantKey, patch: Partial<PbImageVariantDefaults>) =>
      updateVariant(key, (variant) => ({ ...variant, ...patch })),
    [updateVariant]
  );
  const setVariantExact = useCallback(
    (key: PbImageVariantKey, nextVariant: PbImageVariantDefaults) =>
      updateVariant(key, () => nextVariant),
    [updateVariant]
  );
  const setAnimationPatch = useCallback(
    (key: PbImageVariantKey, patch: Partial<PbImageAnimationDefaults>) =>
      updateVariant(key, (variant) => ({
        ...variant,
        animation: { ...variant.animation, ...patch },
      })),
    [updateVariant]
  );
  const patchEntranceFineTune = useCallback(
    (key: PbImageVariantKey, patch: Partial<PbImageEntranceFineTune>) =>
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
    (key: PbImageVariantKey, patch: Partial<PbImageExitFineTune>) =>
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
    (key: PbImageVariantKey, preset: PbImageAnimationCurvePreset) =>
      patchEntranceFineTune(key, {
        curve: { ...variants[key].animation.fineTune.entrance.curve, preset },
      }),
    [patchEntranceFineTune, variants]
  );
  const setExitCurvePreset = useCallback(
    (key: PbImageVariantKey, preset: PbImageAnimationCurvePreset) =>
      patchExitFineTune(key, { curve: { ...variants[key].animation.fineTune.exit.curve, preset } }),
    [patchExitFineTune, variants]
  );
  const setEntranceBezierValue = useCallback(
    (key: PbImageVariantKey, index: number, value: number) =>
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
    (key: PbImageVariantKey, index: number, value: number) =>
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

  const clearPreviewUpload = useCallback(
    () =>
      setPreviewUploadUrl((prev) => {
        if (prev) URL.revokeObjectURL(prev);
        setPreviewUploadName(null);
        return null;
      }),
    []
  );
  const setPreviewUploadFile = useCallback((file: File | null) => {
    setPreviewUploadUrl((prev) => {
      if (prev) URL.revokeObjectURL(prev);
      return file ? URL.createObjectURL(file) : null;
    });
    setPreviewUploadName(file ? file.name : null);
  }, []);

  useEffect(
    () => () => {
      if (previewUploadUrl) URL.revokeObjectURL(previewUploadUrl);
    },
    [previewUploadUrl]
  );

  const resetImageDefaults = useCallback(() => {
    localStorage.removeItem(STORAGE_KEY);
    setDefaultVariant(BASE_DEFAULTS.defaultVariant);
    setVariants(BASE_DEFAULTS.variants);
    setActiveVariant(BASE_DEFAULTS.defaultVariant);
    setIsCustomVariant(false);
    setVisibleCategories(DEFAULT_VISIBLE_CATEGORIES);
    setRuntimeDraft(DEFAULT_IMAGE_RUNTIME_DRAFT);
    setPreviewVisible(true);
    setPreviewKey(0);
    setAutoLoop(false);
    setPreviewDevice("desktop");
    setCopied(false);
    clearPreviewUpload();
  }, [clearPreviewUpload]);

  const toggleCategoryVisibility = useCallback((key: SettingsCategoryKey) => {
    setVisibleCategories((prev) => ({ ...prev, [key]: !prev[key] }));
  }, []);

  const selectVariant = useCallback((key: PbImageVariantKey) => {
    setActiveVariant(key);
    setIsCustomVariant(false);
  }, []);

  const selectCustomVariant = useCallback(() => {
    setIsCustomVariant(true);
  }, []);

  const setRuntimePatch = useCallback((patch: Partial<ImageRuntimeDraft>) => {
    setRuntimeDraft((prev) => ({ ...prev, ...patch }));
  }, []);

  const active = variants[activeVariant];
  const animationBehavior = getAnimationBehavior(active.animation.fineTune);
  const showHybridControls = animationBehavior === "hybrid";
  const showFineTuneControls = animationBehavior === "custom";
  const showPresetControls = animationBehavior !== "custom";
  const activeObjectFitDesktop =
    resolveResponsiveValueForDevice(active.objectFit, "desktop") ?? "cover";
  const showObjectPositionControl =
    active.layoutMode !== "fill" &&
    activeObjectFitDesktop !== "crop" &&
    (activeObjectFitDesktop === "cover" || activeObjectFitDesktop === "contain");
  const showCropPanZoom = activeObjectFitDesktop === "crop";
  const constraintsDesktop = resolveConstraintsForDevice(active.constraints, "desktop");
  const constraintsMobile = resolveConstraintsForDevice(active.constraints, "mobile");
  const showAlignmentControls =
    active.layoutMode === "fill" ||
    active.layoutMode === "constraints" ||
    hasResponsiveText(active.width) ||
    hasResponsiveText(active.height) ||
    isNonEmptyText(resolveResponsiveValueForDevice(active.width, "desktop")) ||
    isNonEmptyText(resolveResponsiveValueForDevice(active.width, "mobile")) ||
    isNonEmptyText(resolveResponsiveValueForDevice(active.height, "desktop")) ||
    isNonEmptyText(resolveResponsiveValueForDevice(active.height, "mobile")) ||
    isNonEmptyText(constraintsDesktop?.minWidth) ||
    isNonEmptyText(constraintsDesktop?.maxWidth) ||
    isNonEmptyText(constraintsDesktop?.minHeight) ||
    isNonEmptyText(constraintsDesktop?.maxHeight) ||
    isNonEmptyText(constraintsMobile?.minWidth) ||
    isNonEmptyText(constraintsMobile?.maxWidth) ||
    isNonEmptyText(constraintsMobile?.minHeight) ||
    isNonEmptyText(constraintsMobile?.maxHeight);
  const exportJson = useMemo(
    () => toExportJson({ v: 3, defaultVariant, variants }),
    [defaultVariant, variants]
  );
  const previewMotion = useMemo(() => buildPreviewMotion(active.animation), [active.animation]);
  const runtimePreview = useMemo(() => buildRuntimePreviewState(runtimeDraft), [runtimeDraft]);
  const customElementJson = useMemo(
    () => JSON.stringify(buildCustomElementSnippet(activeVariant, active, runtimeDraft), null, 2),
    [active, activeVariant, runtimeDraft]
  );

  const copyExport = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(exportJson);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {}
  }, [exportJson]);
  const animateInPreview = useCallback(() => {
    setPreviewVisible(false);
    window.setTimeout(() => {
      setPreviewKey((current) => current + 1);
      setPreviewVisible(true);
    }, 70);
  }, []);
  const animateOutPreview = useCallback(() => setPreviewVisible(false), []);
  const showPreview = useCallback(() => setPreviewVisible(true), []);

  useEffect(() => {
    if (!autoLoop) return;
    const id = window.setInterval(() => {
      animateOutPreview();
      window.setTimeout(animateInPreview, 140);
    }, getLoopIntervalMs(active.animation));
    return () => window.clearInterval(id);
  }, [active.animation, animateInPreview, animateOutPreview, autoLoop]);

  return {
    active,
    activeVariant,
    animationBehavior,
    autoLoop,
    copied,
    defaultVariant,
    exportJson,
    hydrated,
    isCustomVariant,
    customElementJson,
    previewKey,
    previewDevice,
    previewMotion,
    previewUploadName,
    previewUploadUrl,
    previewVisible,
    runtimeDraft,
    runtimePreview,
    showAlignmentControls,
    showFineTuneControls,
    showHybridControls,
    showObjectPositionControl,
    showCropPanZoom,
    showPresetControls,
    variants,
    visibleCategories,
    animateInPreview,
    animateOutPreview,
    clearPreviewUpload,
    copyExport,
    patchEntranceFineTune,
    patchExitFineTune,
    resetImageDefaults,
    selectCustomVariant,
    selectVariant,
    setActiveVariant,
    setAnimationPatch,
    setAutoLoop,
    setDefaultVariant,
    setEntranceBezierValue,
    setEntranceCurvePreset,
    setExitBezierValue,
    setExitCurvePreset,
    setPreviewUploadFile,
    setPreviewDevice,
    setRuntimePatch,
    setVariantPatch,
    setVariantExact,
    showPreview,
    toggleCategoryVisibility,
  };
}

export type ImageElementDevController = ReturnType<typeof useImageElementDevController>;
