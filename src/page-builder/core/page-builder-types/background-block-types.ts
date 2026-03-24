import type { TriggerAction } from "./trigger-action-types";

export type bgVarLayer = {
  fill: string;
  blendMode?: string;
  opacity?: number;
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
