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
      label: "Primary",
      copyType: "body",
      level: 4,
      wordWrap: false,
      // Matches `/dev/colors` PreviewColumn “Primary” chip (primary fill + on-primary ink).
      linkDefault: "var(--pb-on-primary)",
      wrapperFill: "var(--pb-primary)",
      wrapperFillHover: "color-mix(in oklab, var(--pb-primary) 88%, white)",
      wrapperFillActive: "color-mix(in oklab, var(--pb-primary) 82%, black)",
      wrapperScaleActive: 0.97,
      wrapperPadding: "0.5rem 1rem",
      wrapperBorderRadius: "0.5rem",
      animation: NEUTRAL_ANIMATION,
    },
    accent: {
      label: "Accent",
      copyType: "body",
      level: 3,
      wordWrap: false,
      linkDefault: "var(--pb-on-accent)",
      wrapperFill: "var(--pb-accent)",
      wrapperFillHover: "color-mix(in oklab, var(--pb-accent) 88%, white)",
      wrapperFillActive: "color-mix(in oklab, var(--pb-accent) 80%, black)",
      wrapperScaleActive: 0.97,
      wrapperPadding: "0.6rem 1.15rem",
      wrapperBorderRadius: "0.5rem",
      animation: JSON.parse(JSON.stringify(NEUTRAL_ANIMATION)) as typeof NEUTRAL_ANIMATION,
    },
    ghost: {
      label: "Ghost",
      copyType: "body",
      level: 4,
      wordWrap: false,
      wrapperFill: "transparent",
      linkDefault: "var(--pb-on-secondary)",
      wrapperStroke: "var(--pb-on-secondary)",
      wrapperFillHover: "color-mix(in oklab, var(--pb-secondary) 10%, transparent)",
      wrapperStrokeHover: "var(--pb-on-secondary)",
      wrapperScaleActive: 0.97,
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
      linkDefault: "var(--pb-link)",
      linkHover: "var(--pb-link-hover)",
      linkActive: "var(--pb-link-active)",
      wrapperOpacityHover: 0.7,
      animation: JSON.parse(JSON.stringify(NEUTRAL_ANIMATION)) as typeof NEUTRAL_ANIMATION,
    },
  },
};
