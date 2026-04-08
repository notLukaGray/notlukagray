import type { ComponentType } from "react";
import type { bgBlock } from "@pb/core/internal/page-builder-schemas";
import { BackgroundVideo } from "./BackgroundVideo";
import { BackgroundImage } from "./BackgroundImage";
import { BackgroundVariable } from "./BackgroundVariable";
import { BackgroundPattern } from "./BackgroundPattern";
import { BackgroundTransition } from "./BackgroundTransition";

export {
  BackgroundVideo,
  BackgroundImage,
  BackgroundVariable,
  BackgroundPattern,
  BackgroundTransition,
};

export type KnownBgType =
  | "backgroundVideo"
  | "backgroundImage"
  | "backgroundVariable"
  | "backgroundPattern"
  | "backgroundTransition";

/** Type guard for supported background block types. */
export function isKnownBgType(type: string): type is KnownBgType {
  return (
    type === "backgroundVideo" ||
    type === "backgroundImage" ||
    type === "backgroundVariable" ||
    type === "backgroundPattern" ||
    type === "backgroundTransition"
  );
}

/** Map of background type string → component (video, image, variable, pattern, transition). */
export const BG_COMPONENTS: Record<KnownBgType, ComponentType<bgBlock>> = {
  backgroundVideo: BackgroundVideo as ComponentType<bgBlock>,
  backgroundImage: BackgroundImage as ComponentType<bgBlock>,
  backgroundVariable: BackgroundVariable as ComponentType<bgBlock>,
  backgroundPattern: BackgroundPattern as ComponentType<bgBlock>,
  backgroundTransition: BackgroundTransition as ComponentType<bgBlock>,
};
