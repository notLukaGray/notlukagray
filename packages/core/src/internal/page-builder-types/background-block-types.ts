import type { TriggerAction } from "./trigger-action-types";
import type { BgLayerMotion } from "@pb/contracts";

export type bgVarLayer = {
  fill: string;
  blendMode?: string;
  opacity?: number;
  /** CSS background-size value. Use e.g. "400% 400%" to give moving gradients room to pan. */
  backgroundSize?: string;
  /** Initial CSS background-position. Overridden at runtime by parallax motion. */
  backgroundPosition?: string;
  /** Motion configs — multiple types compose additively on the same layer. */
  motion?: BgLayerMotion[];
};

export type bgPatternRepeat = "repeat" | "repeat-x" | "repeat-y" | "no-repeat";

export type bgBlock =
  | { type: "backgroundVideo"; video: string; poster?: string; overlay?: string }
  | { type: "backgroundImage"; image: string }
  | { type: "backgroundVariable"; layers: bgVarLayer[] }
  | { type: "backgroundPattern"; image: string; repeat?: bgPatternRepeat }
  | {
      type: "backgroundTransition";
      from: bgBlock;
      to: bgBlock;
      duration?: number;
      easing?: string;
      mode?: "progress" | "time";
      trigger?: TriggerAction;
      time?: number;
      position?: number | string;
      progress?: number;
      progressRange?: { start: number; end: number };
    };
