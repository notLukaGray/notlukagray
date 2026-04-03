import {
  pbBuilderDefaultsV1,
  type PbImageAnimationDefaults,
  type PbImageLayoutMode,
  type PbImageVariantKey,
} from "@/app/theme/pb-builder-defaults";
import { MOTION_DEFAULTS } from "@/page-builder/core/page-builder-motion-defaults";
import {
  MOTION_CURVE_PRESET_OPTIONS,
  MOTION_DIRECTION_OPTIONS,
  MOTION_HYBRID_STACK_OPTIONS,
} from "@/app/dev/elements/_shared/motion-lab";
import {
  ALIGN_OPTIONS,
  ALIGN_Y_OPTIONS,
  BLEND_MODE_OPTIONS,
  INTERACTION_CURSOR_OPTIONS,
  OBJECT_FIT_OPTIONS,
  OVERFLOW_OPTIONS,
  VISIBLE_WHEN_OPERATOR_OPTIONS,
} from "@/app/dev/elements/_shared/dev-controls/foundation-constants";
import type { SettingsCategoryKey } from "./types";

export {
  ALIGN_OPTIONS,
  ALIGN_Y_OPTIONS,
  BLEND_MODE_OPTIONS,
  INTERACTION_CURSOR_OPTIONS,
  OBJECT_FIT_OPTIONS,
  OVERFLOW_OPTIONS,
  VISIBLE_WHEN_OPERATOR_OPTIONS,
};

export const STORAGE_KEY = "pb-element-image-dev-v1";

export const BASE_DEFAULTS = {
  defaultVariant: pbBuilderDefaultsV1.elements.image.defaultVariant,
  variants: pbBuilderDefaultsV1.elements.image.variants,
} as const;

export const VARIANT_ORDER: PbImageVariantKey[] = [
  "hero",
  "inline",
  "fullCover",
  "feature",
  "crop",
];

export const VARIANT_LABELS: Record<PbImageVariantKey, string> = {
  hero: "Hero",
  inline: "Inline",
  fullCover: "Full Cover",
  feature: "Feature",
  crop: "Crop",
};

export const CATEGORY_LABELS: Record<SettingsCategoryKey, string> = {
  layout: "Layout",
  traits: "Traits",
  animation: "Animation",
  runtime: "Runtime",
};

export const ANIMATION_TRIGGER_OPTIONS: PbImageAnimationDefaults["trigger"][] = [
  "onMount",
  "onFirstVisible",
  "onEveryVisible",
];

export const ENTRANCE_PRESET_OPTIONS =
  Object.keys(MOTION_DEFAULTS.entrancePresets).length > 0
    ? Object.keys(MOTION_DEFAULTS.entrancePresets)
    : ["fade"];
export const EXIT_PRESET_OPTIONS =
  Object.keys(MOTION_DEFAULTS.exitPresets).length > 0
    ? Object.keys(MOTION_DEFAULTS.exitPresets)
    : ["fade"];

export const LAYOUT_MODE_OPTIONS: PbImageLayoutMode[] = ["aspectRatio", "fill", "constraints"];
export const DIRECTION_OPTIONS = MOTION_DIRECTION_OPTIONS;
export const CURVE_PRESET_OPTIONS = MOTION_CURVE_PRESET_OPTIONS;
export const HYBRID_STACK_OPTIONS = MOTION_HYBRID_STACK_OPTIONS;

export const IMAGE_VARIABLES_NOT_SUPPORTED_YET = [
  "native imageRotation field (schema-only)",
  "imageCrop pairs with object fit `crop` (variant templates may include defaults)",
  "native imageFilters object (schema-only)",
  "native fillOpacity field (schema-only)",
] as const;
