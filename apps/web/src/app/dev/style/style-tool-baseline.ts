import type { PbContentGuidelines } from "@/app/theme/pb-content-guidelines-config";
import { proposePbContentGuidelines, type StyleToolSeeds } from "@/app/theme/pb-style-suggest";

export const DEV_NEUTRAL_STYLE_SEEDS: StyleToolSeeds = {
  alignment: "start",
  spacingBaseRem: 0.75,
  radiusBaseRem: 0.5,
  useDefaultFrameGap: true,
};

export function createNeutralStyleGuidelines(): PbContentGuidelines {
  return proposePbContentGuidelines(DEV_NEUTRAL_STYLE_SEEDS);
}
