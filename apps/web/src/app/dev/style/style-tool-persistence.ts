import {
  pbContentGuidelines as COMMITTED_DEFAULTS,
  type PbContentGuidelines,
} from "@/app/theme/pb-content-guidelines-config";
import {
  emptyLocks,
  PB_GUIDELINE_KEYS,
  proposePbContentGuidelines,
  type StyleToolSeeds,
} from "@/app/theme/pb-style-suggest";
import {
  createNeutralStyleGuidelines,
  DEV_NEUTRAL_STYLE_SEEDS,
} from "@/app/dev/style/style-tool-baseline";

/** Legacy keys; values migrate into `workbench-session-v1`. */
export const STYLE_TOOL_LEGACY_STORAGE_KEY_V1 = "pb-style-tool-guidelines-v1";
export const STYLE_TOOL_LEGACY_STORAGE_KEY_V2 = "pb-style-tool-v2";

export type StyleToolPersistedV2 = {
  v: 2;
  seeds: StyleToolSeeds;
  locks: Record<keyof PbContentGuidelines, boolean>;
  guidelines: PbContentGuidelines;
};

export function fillRequiredGuidelineDefaults(g: PbContentGuidelines): PbContentGuidelines {
  const baseline = createNeutralStyleGuidelines();
  const out = { ...g };
  const pick = <K extends keyof PbContentGuidelines>(key: K) => {
    const v = out[key];
    if (v == null || (typeof v === "string" && v.trim() === "")) {
      (out as Record<string, unknown>)[key] = baseline[key];
    }
  };
  pick("frameJustifyContentDefault");
  pick("framePaddingDefault");
  pick("frameFlexWrapDefault");
  pick("frameBorderRadiusDefault");
  pick("richTextCodeBorderRadius");
  pick("buttonNakedBorderRadius");
  return out;
}

function readStyleFromV2Raw(raw: string): StyleToolPersistedV2 | null {
  const data = JSON.parse(raw) as Partial<StyleToolPersistedV2>;
  if (data.v === 2 && data.seeds && data.locks && data.guidelines) {
    const locks = { ...emptyLocks(), ...data.locks } as Record<keyof PbContentGuidelines, boolean>;
    return {
      v: 2,
      seeds: { ...DEV_NEUTRAL_STYLE_SEEDS, ...data.seeds },
      locks,
      guidelines: fillRequiredGuidelineDefaults({
        ...createNeutralStyleGuidelines(),
        ...data.guidelines,
      } as PbContentGuidelines),
    };
  }
  return null;
}

/** Read style tool state from pre-workbench localStorage keys only. */
export function readStyleToolFromLegacyLocalStorage(): StyleToolPersistedV2 | null {
  if (typeof window === "undefined") return null;
  try {
    const rawV2 = localStorage.getItem(STYLE_TOOL_LEGACY_STORAGE_KEY_V2);
    if (rawV2) {
      const parsed = readStyleFromV2Raw(rawV2);
      if (parsed) return parsed;
    }
    const rawV1 = localStorage.getItem(STYLE_TOOL_LEGACY_STORAGE_KEY_V1);
    if (rawV1) {
      const flat = JSON.parse(rawV1) as Partial<PbContentGuidelines>;
      const guidelines = fillRequiredGuidelineDefaults({
        ...createNeutralStyleGuidelines(),
        ...flat,
      } as PbContentGuidelines);
      return {
        v: 2,
        seeds: { ...DEV_NEUTRAL_STYLE_SEEDS },
        locks: Object.fromEntries(PB_GUIDELINE_KEYS.map((k) => [k, true])) as Record<
          keyof PbContentGuidelines,
          boolean
        >,
        guidelines,
      };
    }
    return null;
  } catch {
    return null;
  }
}

export function coerceStyleToolPersisted(data: unknown): StyleToolPersistedV2 | null {
  if (!data || typeof data !== "object") return null;
  const d = data as Partial<StyleToolPersistedV2>;
  if (d.v !== 2 || !d.seeds || !d.locks || !d.guidelines) return null;
  try {
    return readStyleFromV2Raw(JSON.stringify(d));
  } catch {
    return null;
  }
}

/** Style tool snapshot equivalent to first load of `/dev/style` with no saved prefs. */
export function getDefaultStyleToolPersistedV2(): StyleToolPersistedV2 {
  const seeds = { ...DEV_NEUTRAL_STYLE_SEEDS };
  const locks = emptyLocks();
  const guidelines = fillRequiredGuidelineDefaults(proposePbContentGuidelines(seeds));
  return { v: 2, seeds, locks, guidelines };
}

export function getProductionStyleToolPersistedV2(): StyleToolPersistedV2 {
  const seeds = { ...DEV_NEUTRAL_STYLE_SEEDS };
  const locks = emptyLocks();
  return {
    v: 2,
    seeds,
    locks,
    guidelines: fillRequiredGuidelineDefaults(COMMITTED_DEFAULTS),
  };
}
