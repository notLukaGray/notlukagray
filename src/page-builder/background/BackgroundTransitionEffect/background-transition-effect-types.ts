import type { bgBlock } from "@/page-builder/core/page-builder-schemas";
import type { BackgroundTransitionEffect } from "@/page-builder/core/page-builder-types";

export type BackgroundTransitionEffectProps = {
  effect: BackgroundTransitionEffect;
  fromBg: bgBlock | null;
  toBg: bgBlock | null;
  transitionId?: string;
  isReversing?: boolean;
  onReverseComplete?: () => void;
};

export type ScrollBackgroundTransitionEffect = Extract<
  BackgroundTransitionEffect,
  { type: "SCROLL" }
>;
export type TriggerBackgroundTransitionEffect = Extract<
  BackgroundTransitionEffect,
  { type: "TRIGGER" }
>;
export type TimeBackgroundTransitionEffect = Extract<BackgroundTransitionEffect, { type: "TIME" }>;
