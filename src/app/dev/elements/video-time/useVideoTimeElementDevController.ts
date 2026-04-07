"use client";

import { createSimpleElementDevController } from "@/app/dev/elements/_shared/createSimpleElementDevController";
import { BASE_DEFAULTS, STORAGE_KEY, VARIANT_ORDER } from "./constants";
import { buildVideoTimeElementSnippet } from "./build-snippet";
import {
  normalizeVideoTimeVariant,
  readPersistedVideoTime,
  toVideoTimeExportJson,
  toVideoTimePersisted,
} from "./normalization";
import type {
  VideoTimeVariantDefaults,
  VideoTimeVariantKey,
  PersistedVideoTimeDefaults,
} from "./types";

const useBaseVideoTimeController = createSimpleElementDevController<
  VideoTimeVariantKey,
  VideoTimeVariantDefaults,
  PersistedVideoTimeDefaults
>({
  storageKey: STORAGE_KEY,
  defaults: BASE_DEFAULTS,
  variantOrder: VARIANT_ORDER,
  readPersisted: readPersistedVideoTime,
  normalizeVariant: normalizeVideoTimeVariant,
  buildSnippet: buildVideoTimeElementSnippet,
  toExportJson: toVideoTimeExportJson,
  toPersisted: toVideoTimePersisted,
});

export function useVideoTimeElementDevController() {
  const controller = useBaseVideoTimeController();
  return {
    ...controller,
    resetVideoTimeDefaults: controller.resetDefaults,
  };
}

export type VideoTimeElementDevController = ReturnType<typeof useVideoTimeElementDevController>;
