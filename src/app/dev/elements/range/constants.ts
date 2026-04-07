import {
  cloneTypographyAnimationFromImageDefaults,
  DEV_NEUTRAL_IMAGE_DEFAULTS,
} from "@/app/dev/elements/element-dev-baseline";
import type { RangeVariantDefaults, RangeVariantKey } from "./types";

const NEUTRAL_ANIMATION = cloneTypographyAnimationFromImageDefaults(DEV_NEUTRAL_IMAGE_DEFAULTS);

export const STORAGE_KEY = "pb-element-range-dev-v1";

export const VARIANT_ORDER: RangeVariantKey[] = ["default", "slim", "accent"];

export const VARIANT_LABELS: Record<RangeVariantKey, string> = {
  default: "Default",
  slim: "Slim",
  accent: "Accent",
};

/** Neutral starting presets for range variants in dev foundation authoring. */
export const BASE_DEFAULTS: {
  defaultVariant: RangeVariantKey;
  variants: Record<RangeVariantKey, RangeVariantDefaults>;
} = {
  defaultVariant: "default",
  variants: {
    default: {
      min: 0,
      max: 100,
      step: 1,
      defaultValue: 35,
      ariaLabel: "Adjust value",
      style: {
        trackColor: "rgba(255,255,255,0.2)",
        fillColor: "rgba(255,255,255,0.9)",
        trackHeight: "4px",
        thumbSize: "14px",
        borderRadius: "9999px",
      },
      animation: NEUTRAL_ANIMATION,
    },
    slim: {
      min: 0,
      max: 100,
      step: 1,
      defaultValue: 60,
      ariaLabel: "Adjust value",
      style: {
        trackColor: "rgba(255,255,255,0.1)",
        fillColor: "rgba(255,255,255,0.7)",
        trackHeight: "2px",
        thumbSize: "10px",
        borderRadius: "9999px",
      },
      animation: { ...JSON.parse(JSON.stringify(NEUTRAL_ANIMATION)) },
    },
    accent: {
      min: 0,
      max: 100,
      step: 1,
      defaultValue: 80,
      ariaLabel: "Adjust value",
      style: {
        trackColor: "rgba(255,255,255,0.15)",
        fillColor: "#a78bfa",
        trackHeight: "4px",
        thumbSize: "16px",
        borderRadius: "9999px",
      },
      animation: { ...JSON.parse(JSON.stringify(NEUTRAL_ANIMATION)) },
    },
  },
};
