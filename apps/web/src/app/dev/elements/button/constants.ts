import {
  cloneTypographyAnimationFromImageDefaults,
  DEV_NEUTRAL_IMAGE_DEFAULTS,
} from "@/app/dev/elements/element-dev-baseline";
import type { ButtonVariantDefaults, ButtonVariantKey } from "./types";

const NEUTRAL_ANIMATION = cloneTypographyAnimationFromImageDefaults(DEV_NEUTRAL_IMAGE_DEFAULTS);

export const STORAGE_KEY = "pb-element-button-dev-v1";

export const VARIANT_ORDER: ButtonVariantKey[] = ["default", "accent", "ghost", "text"];

export const VARIANT_LABELS: Record<ButtonVariantKey, string> = {
  default: "Default",
  accent: "Accent",
  ghost: "Ghost",
  text: "Text",
};

export const BASE_DEFAULTS: {
  defaultVariant: ButtonVariantKey;
  variants: Record<ButtonVariantKey, ButtonVariantDefaults>;
} = {
  defaultVariant: "default",
  variants: {
    default: {
      label: "Button",
      copyType: "body",
      level: 4,
      wordWrap: false,
      wrapperFill: "rgba(255,255,255,0.08)",
      wrapperPadding: "0.5rem 1rem",
      wrapperBorderRadius: "0.5rem",
      animation: NEUTRAL_ANIMATION,
    },
    accent: {
      label: "Primary Action",
      copyType: "body",
      level: 3,
      wordWrap: false,
      wrapperFill: "var(--pb-accent)",
      wrapperPadding: "0.6rem 1.15rem",
      wrapperBorderRadius: "0.5rem",
      animation: JSON.parse(JSON.stringify(NEUTRAL_ANIMATION)) as typeof NEUTRAL_ANIMATION,
    },
    ghost: {
      label: "Secondary",
      copyType: "body",
      level: 4,
      wordWrap: false,
      wrapperStroke: "var(--pb-border)",
      wrapperPadding: "0.5rem 1rem",
      wrapperBorderRadius: "0.5rem",
      animation: JSON.parse(JSON.stringify(NEUTRAL_ANIMATION)) as typeof NEUTRAL_ANIMATION,
    },
    text: {
      label: "Read more",
      copyType: "body",
      level: 5,
      href: "/",
      wordWrap: false,
      animation: JSON.parse(JSON.stringify(NEUTRAL_ANIMATION)) as typeof NEUTRAL_ANIMATION,
    },
  },
};
