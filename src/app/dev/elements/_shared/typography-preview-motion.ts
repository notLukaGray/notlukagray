import { buildPreviewMotion } from "@/app/dev/elements/image/preview-motion";
import {
  MOTION_DEFAULTS,
  getEntranceMotionFromPreset,
  getExitMotionFromPreset,
  mergeMotionDefaults,
} from "@/page-builder/core/page-builder-motion-defaults";
import type { MotionPropsFromJson, MotionTiming } from "@/page-builder/core/page-builder-schemas";
import type { PbImageAnimationDefaults } from "@/app/theme/pb-builder-defaults";

function mergeMotionRecords(
  a?: Record<string, unknown>,
  b?: Record<string, unknown>
): Record<string, unknown> | undefined {
  if (!a && !b) return undefined;
  return { ...(a ?? {}), ...(b ?? {}) };
}

/**
 * Builds a full `MotionPropsFromJson` for typography dev previews, from variant `animation`
 * (image lab model), or legacy `motion` / `motionTiming`, plus optional runtime `motion` JSON.
 */
export function buildTypographyPreviewMotion(
  active: Record<string, unknown>,
  runtimeMotion?: Record<string, unknown> | undefined
): MotionPropsFromJson {
  const animation = active.animation as PbImageAnimationDefaults | undefined;
  if (animation != null) {
    const base = buildPreviewMotion(animation);
    const merged = mergeMotionRecords(
      base as Record<string, unknown>,
      runtimeMotion
    ) as MotionPropsFromJson;
    return merged;
  }

  const mergedMotion = mergeMotionRecords(
    active.motion as Record<string, unknown> | undefined,
    runtimeMotion
  );

  const timing = active.motionTiming as MotionTiming | undefined;

  if (mergedMotion && (mergedMotion.initial != null || mergedMotion.animate != null)) {
    return mergeExitFromTiming(mergedMotion as MotionPropsFromJson, timing);
  }

  if (timing && typeof timing === "object") {
    const timingRecord = timing as Record<string, unknown>;
    const entranceMotion = timingRecord.entranceMotion as Record<string, unknown> | undefined;
    const entranceTransition =
      entranceMotion?.transition && typeof entranceMotion.transition === "object"
        ? (entranceMotion.transition as MotionPropsFromJson["transition"])
        : undefined;
    const baseMotion =
      entranceMotion && (entranceMotion.initial != null || entranceMotion.animate != null)
        ? ({
            ...(entranceTransition ? { transition: entranceTransition } : {}),
            ...(entranceMotion as MotionPropsFromJson),
          } as MotionPropsFromJson)
        : getEntranceMotionFromPreset((timingRecord.entrancePreset as string) ?? "fade", {
            distancePx: MOTION_DEFAULTS.defaultSlideDistancePx,
            duration:
              Number((entranceTransition as Record<string, unknown> | undefined)?.duration) ||
              MOTION_DEFAULTS.transition.duration,
            delay:
              Number((entranceTransition as Record<string, unknown> | undefined)?.delay) ||
              MOTION_DEFAULTS.transition.delay,
            ease:
              ((entranceTransition as Record<string, unknown> | undefined)?.ease as
                | string
                | [number, number, number, number]
                | undefined) ?? MOTION_DEFAULTS.easeTuple,
          });

    return mergeExitFromTiming(baseMotion, timing);
  }

  return mergeMotionDefaults({
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    transition: { duration: 0.35, ease: MOTION_DEFAULTS.transition.ease },
    exit: { opacity: 0 },
  });
}

function mergeExitFromTiming(
  baseMotion: MotionPropsFromJson,
  timing: MotionTiming | undefined
): MotionPropsFromJson {
  if (!timing || typeof timing !== "object") {
    return mergeMotionDefaults({
      ...baseMotion,
      exit: baseMotion.exit ?? { opacity: 0 },
    });
  }
  const timingRecord = timing as Record<string, unknown>;
  const exitMotion = timingRecord.exitMotion as
    | { exit?: Record<string, unknown>; transition?: unknown }
    | undefined;
  const exitTransition =
    exitMotion?.transition && typeof exitMotion.transition === "object"
      ? (exitMotion.transition as MotionPropsFromJson["transition"])
      : undefined;
  if (exitMotion?.exit && typeof exitMotion.exit === "object") {
    return mergeMotionDefaults({
      ...baseMotion,
      ...(exitTransition ? { transition: exitTransition } : {}),
      exit: exitMotion.exit as Record<string, string | number | number[]>,
    });
  }
  const exitPreset = timingRecord.exitPreset as string | undefined;
  if (typeof exitPreset === "string" && exitPreset.trim().length > 0) {
    const fromPreset = getExitMotionFromPreset(exitPreset, {
      duration: (exitTransition as Record<string, unknown> | undefined)?.duration as
        | number
        | undefined,
      delay: (exitTransition as Record<string, unknown> | undefined)?.delay as number | undefined,
      ease: (exitTransition as Record<string, unknown> | undefined)?.ease as
        | string
        | [number, number, number, number]
        | undefined,
    });
    return mergeMotionDefaults({
      ...baseMotion,
      ...(fromPreset.transition
        ? { transition: fromPreset.transition as MotionPropsFromJson["transition"] }
        : {}),
      exit: fromPreset.exit as Record<string, string | number | number[]>,
    });
  }
  return mergeMotionDefaults({
    ...baseMotion,
    exit: baseMotion.exit ?? { opacity: 0 },
  });
}
