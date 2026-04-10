/* eslint-disable complexity, max-lines */
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
import { DEFAULT_BREAKPOINTS, type BreakpointDefinitions } from "@/app/theme/pb-breakpoint-tokens";
import { DEFAULT_MOTION_FOUNDATIONS, type MotionFoundations } from "@/app/theme/pb-motion-tokens";
import {
  DEFAULT_SHADOW_SCALE,
  DEFAULT_SHADOW_SCALE_DARK,
  type ShadowScale,
} from "@/app/theme/pb-shadow-tokens";
import {
  DEFAULT_OPACITY_SCALE,
  OPACITY_SCALE_KEYS,
  clampUnitOpacity,
  type OpacityScale,
} from "@/app/theme/pb-opacity-tokens";
import {
  DEFAULT_BORDER_WIDTH_SCALE,
  DEFAULT_CONTENT_WIDTH_PRESETS,
  deriveSectionMarginScale,
  deriveSpacingScale,
  type BorderWidthScale,
  type ContentWidthPresets,
  type SectionMarginScale,
  type SpacingScale,
} from "@/app/theme/pb-spacing-tokens";
import {
  DEFAULT_Z_INDEX_LAYERS,
  Z_INDEX_LAYER_KEYS,
  type ZIndexLayerScale,
} from "@/app/theme/pb-z-index-layers";
import {
  createNeutralStyleGuidelines,
  DEV_NEUTRAL_STYLE_SEEDS,
} from "@/app/dev/style/style-tool-baseline";

/** Legacy keys; values migrate into `workbench-session-v2`. */
export const STYLE_TOOL_LEGACY_STORAGE_KEY_V1 = "pb-style-tool-guidelines-v1";
export const STYLE_TOOL_LEGACY_STORAGE_KEY_V2 = "pb-style-tool-v2";

const SPACING_SCALE_KEYS = ["none", "xs", "sm", "md", "lg", "xl", "2xl", "3xl", "4xl"] as const;
const _SPACING_SCALE_SEED_KEYS = ["xs", "sm", "md", "lg", "xl", "2xl", "3xl", "4xl"] as const;
const SHADOW_SCALE_KEYS = ["none", "xs", "sm", "md", "lg", "xl", "2xl"] as const;
const BORDER_WIDTH_KEYS = ["hairline", "sm", "md", "lg", "xl"] as const;
const CONTENT_WIDTH_KEYS = ["narrow", "standard", "wide", "full"] as const;
const SECTION_MARGIN_KEYS = ["none", "xs", "sm", "md", "lg", "xl"] as const;

export type StyleToolPersistedV2 = {
  v: 2;
  seeds: StyleToolSeeds;
  locks: Record<keyof PbContentGuidelines, boolean>;
  guidelines: PbContentGuidelines;
};

export type StyleToolPersistedV3 = {
  v: 3;
  seeds: StyleToolSeeds;
  locks: Record<keyof PbContentGuidelines, boolean>;
  guidelines: PbContentGuidelines;
  spacingScale: SpacingScale;
  spacingScaleLocks: Record<keyof SpacingScale, boolean>;
  shadowScale: ShadowScale;
  shadowScaleDark: ShadowScale;
  borderWidthScale: BorderWidthScale;
  motion: MotionFoundations;
  breakpoints: BreakpointDefinitions;
  contentWidths: ContentWidthPresets;
  sectionMarginScale: SectionMarginScale;
  sectionMarginScaleLocks: Record<keyof SectionMarginScale, boolean>;
  opacityScale: OpacityScale;
  zIndexLayers: ZIndexLayerScale;
};

function isRecord(value: unknown): value is Record<string, unknown> {
  return value !== null && typeof value === "object" && !Array.isArray(value);
}

function pickStringMap<T extends string>(
  keys: readonly T[],
  source: unknown,
  fallback: Record<T, string>
): Record<T, string> {
  const out = { ...fallback };
  if (!isRecord(source)) return out;
  for (const key of keys) {
    const v = source[key];
    if (typeof v === "string" && v.trim().length > 0) out[key] = v.trim();
  }
  return out;
}

function pickBoolLocks<T extends string>(keys: readonly T[], source: unknown): Record<T, boolean> {
  const out = Object.fromEntries(keys.map((k) => [k, false])) as Record<T, boolean>;
  if (!isRecord(source)) return out;
  for (const key of keys) {
    out[key] = source[key] === true;
  }
  return out;
}

function coerceOpacityScale(source: unknown): OpacityScale {
  const out: OpacityScale = { ...DEFAULT_OPACITY_SCALE };
  if (!isRecord(source)) return out;
  for (const key of OPACITY_SCALE_KEYS) {
    const v = source[key];
    if (typeof v === "number" && Number.isFinite(v)) {
      out[key] = clampUnitOpacity(v);
    }
  }
  return out;
}

function coerceZIndexLayers(source: unknown): ZIndexLayerScale {
  const out: ZIndexLayerScale = { ...DEFAULT_Z_INDEX_LAYERS };
  if (!isRecord(source)) return out;
  for (const key of Z_INDEX_LAYER_KEYS) {
    const v = source[key];
    if (typeof v === "number" && Number.isFinite(v)) {
      out[key] = Math.round(v);
    }
  }
  return out;
}

function toSpacingSeedScale(
  scale: SpacingScale
): Record<(typeof _SPACING_SCALE_SEED_KEYS)[number], string> {
  return {
    xs: scale.xs,
    sm: scale.sm,
    md: scale.md,
    lg: scale.lg,
    xl: scale.xl,
    "2xl": scale["2xl"],
    "3xl": scale["3xl"],
    "4xl": scale["4xl"],
  };
}

function toSpacingSeedLocks(
  locks: Record<keyof SpacingScale, boolean>
): Partial<Record<(typeof _SPACING_SCALE_SEED_KEYS)[number], boolean>> {
  return {
    xs: locks.xs,
    sm: locks.sm,
    md: locks.md,
    lg: locks.lg,
    xl: locks.xl,
    "2xl": locks["2xl"],
    "3xl": locks["3xl"],
    "4xl": locks["4xl"],
  };
}

function coerceBreakpoints(source: unknown): BreakpointDefinitions {
  if (!isRecord(source)) return { ...DEFAULT_BREAKPOINTS };
  const mobile =
    typeof source.mobile === "number" && Number.isFinite(source.mobile)
      ? Math.max(0, Math.round(source.mobile))
      : DEFAULT_BREAKPOINTS.mobile;
  const desktop =
    typeof source.desktop === "number" && Number.isFinite(source.desktop)
      ? Math.max(0, Math.round(source.desktop))
      : DEFAULT_BREAKPOINTS.desktop;
  return { mobile, desktop };
}

function coerceMotionFoundations(source: unknown): MotionFoundations {
  if (!isRecord(source)) {
    return {
      durations: { ...DEFAULT_MOTION_FOUNDATIONS.durations },
      easings: { ...DEFAULT_MOTION_FOUNDATIONS.easings },
      staggerStep: DEFAULT_MOTION_FOUNDATIONS.staggerStep,
      reduceMotionPolicy: DEFAULT_MOTION_FOUNDATIONS.reduceMotionPolicy,
    };
  }
  const durations = isRecord(source.durations)
    ? {
        instant:
          typeof source.durations.instant === "number" && Number.isFinite(source.durations.instant)
            ? source.durations.instant
            : DEFAULT_MOTION_FOUNDATIONS.durations.instant,
        fast:
          typeof source.durations.fast === "number" && Number.isFinite(source.durations.fast)
            ? source.durations.fast
            : DEFAULT_MOTION_FOUNDATIONS.durations.fast,
        normal:
          typeof source.durations.normal === "number" && Number.isFinite(source.durations.normal)
            ? source.durations.normal
            : DEFAULT_MOTION_FOUNDATIONS.durations.normal,
        slow:
          typeof source.durations.slow === "number" && Number.isFinite(source.durations.slow)
            ? source.durations.slow
            : DEFAULT_MOTION_FOUNDATIONS.durations.slow,
        slower:
          typeof source.durations.slower === "number" && Number.isFinite(source.durations.slower)
            ? source.durations.slower
            : DEFAULT_MOTION_FOUNDATIONS.durations.slower,
      }
    : { ...DEFAULT_MOTION_FOUNDATIONS.durations };

  const easings = isRecord(source.easings)
    ? {
        easeIn:
          typeof source.easings.easeIn === "string"
            ? source.easings.easeIn
            : DEFAULT_MOTION_FOUNDATIONS.easings.easeIn,
        easeOut:
          typeof source.easings.easeOut === "string"
            ? source.easings.easeOut
            : DEFAULT_MOTION_FOUNDATIONS.easings.easeOut,
        easeInOut:
          typeof source.easings.easeInOut === "string"
            ? source.easings.easeInOut
            : DEFAULT_MOTION_FOUNDATIONS.easings.easeInOut,
        spring:
          typeof source.easings.spring === "string"
            ? source.easings.spring
            : DEFAULT_MOTION_FOUNDATIONS.easings.spring,
        bounce:
          typeof source.easings.bounce === "string"
            ? source.easings.bounce
            : DEFAULT_MOTION_FOUNDATIONS.easings.bounce,
        linear:
          typeof source.easings.linear === "string"
            ? source.easings.linear
            : DEFAULT_MOTION_FOUNDATIONS.easings.linear,
      }
    : { ...DEFAULT_MOTION_FOUNDATIONS.easings };

  const staggerStep =
    typeof source.staggerStep === "number" && Number.isFinite(source.staggerStep)
      ? Math.max(0, source.staggerStep)
      : DEFAULT_MOTION_FOUNDATIONS.staggerStep;

  const policy =
    source.reduceMotionPolicy === "disable-all" ||
    source.reduceMotionPolicy === "replace-with-fade" ||
    source.reduceMotionPolicy === "honor-system"
      ? source.reduceMotionPolicy
      : DEFAULT_MOTION_FOUNDATIONS.reduceMotionPolicy;

  return {
    durations,
    easings,
    staggerStep,
    reduceMotionPolicy: policy,
  };
}

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

function readStyleFromV3Raw(raw: string): StyleToolPersistedV3 | null {
  const data = JSON.parse(raw) as Partial<StyleToolPersistedV3>;
  if (data.v !== 3 || !data.seeds || !data.locks || !data.guidelines) return null;

  const baseRem =
    typeof data.seeds.spacingBaseRem === "number" && Number.isFinite(data.seeds.spacingBaseRem)
      ? data.seeds.spacingBaseRem
      : DEV_NEUTRAL_STYLE_SEEDS.spacingBaseRem;
  const derivedSpacingScale = deriveSpacingScale(baseRem);
  const spacingScale = pickStringMap(SPACING_SCALE_KEYS, data.spacingScale, derivedSpacingScale);
  const spacingScaleLocks = pickBoolLocks(SPACING_SCALE_KEYS, data.spacingScaleLocks);

  const sectionMarginFallback = deriveSectionMarginScale(spacingScale);
  const sectionMarginScale = pickStringMap(
    SECTION_MARGIN_KEYS,
    data.sectionMarginScale,
    sectionMarginFallback
  );
  const sectionMarginScaleLocks = pickBoolLocks(SECTION_MARGIN_KEYS, data.sectionMarginScaleLocks);

  const seeds: StyleToolSeeds = {
    ...DEV_NEUTRAL_STYLE_SEEDS,
    ...data.seeds,
    spacingScale: toSpacingSeedScale(spacingScale),
    spacingScaleLocks: toSpacingSeedLocks(spacingScaleLocks),
  };

  return {
    v: 3,
    seeds,
    locks: { ...emptyLocks(), ...data.locks } as Record<keyof PbContentGuidelines, boolean>,
    guidelines: fillRequiredGuidelineDefaults({
      ...createNeutralStyleGuidelines(),
      ...data.guidelines,
    } as PbContentGuidelines),
    spacingScale,
    spacingScaleLocks,
    shadowScale: pickStringMap(SHADOW_SCALE_KEYS, data.shadowScale, DEFAULT_SHADOW_SCALE),
    shadowScaleDark: pickStringMap(
      SHADOW_SCALE_KEYS,
      data.shadowScaleDark,
      DEFAULT_SHADOW_SCALE_DARK
    ),
    borderWidthScale: pickStringMap(
      BORDER_WIDTH_KEYS,
      data.borderWidthScale,
      DEFAULT_BORDER_WIDTH_SCALE
    ),
    motion: coerceMotionFoundations(data.motion),
    breakpoints: coerceBreakpoints(data.breakpoints),
    contentWidths: pickStringMap(
      CONTENT_WIDTH_KEYS,
      data.contentWidths,
      DEFAULT_CONTENT_WIDTH_PRESETS
    ),
    sectionMarginScale,
    sectionMarginScaleLocks,
    opacityScale: coerceOpacityScale(data.opacityScale),
    zIndexLayers: coerceZIndexLayers(data.zIndexLayers),
  };
}

export function coerceStyleToolV2toV3(v2: StyleToolPersistedV2): StyleToolPersistedV3 {
  const baseRem =
    typeof v2.seeds.spacingBaseRem === "number" && Number.isFinite(v2.seeds.spacingBaseRem)
      ? v2.seeds.spacingBaseRem
      : DEV_NEUTRAL_STYLE_SEEDS.spacingBaseRem;
  const spacingScale = deriveSpacingScale(baseRem);
  const spacingScaleLocks = pickBoolLocks(SPACING_SCALE_KEYS, undefined);
  const sectionMarginScale = deriveSectionMarginScale(spacingScale);
  const sectionMarginScaleLocks = pickBoolLocks(SECTION_MARGIN_KEYS, undefined);

  return {
    v: 3,
    seeds: {
      ...v2.seeds,
      spacingScale: toSpacingSeedScale(spacingScale),
      spacingScaleLocks: toSpacingSeedLocks(spacingScaleLocks),
    },
    locks: { ...v2.locks },
    guidelines: fillRequiredGuidelineDefaults(v2.guidelines),
    spacingScale,
    spacingScaleLocks,
    shadowScale: { ...DEFAULT_SHADOW_SCALE },
    shadowScaleDark: { ...DEFAULT_SHADOW_SCALE_DARK },
    borderWidthScale: { ...DEFAULT_BORDER_WIDTH_SCALE },
    motion: {
      durations: { ...DEFAULT_MOTION_FOUNDATIONS.durations },
      easings: { ...DEFAULT_MOTION_FOUNDATIONS.easings },
      staggerStep: DEFAULT_MOTION_FOUNDATIONS.staggerStep,
      reduceMotionPolicy: DEFAULT_MOTION_FOUNDATIONS.reduceMotionPolicy,
    },
    breakpoints: { ...DEFAULT_BREAKPOINTS },
    contentWidths: { ...DEFAULT_CONTENT_WIDTH_PRESETS },
    sectionMarginScale,
    sectionMarginScaleLocks,
    opacityScale: { ...DEFAULT_OPACITY_SCALE },
    zIndexLayers: { ...DEFAULT_Z_INDEX_LAYERS },
  };
}

/** Read style tool state from pre-workbench localStorage keys only. */
export function readStyleToolFromLegacyLocalStorage(): StyleToolPersistedV3 | null {
  if (typeof window === "undefined") return null;
  try {
    const rawV2 = localStorage.getItem(STYLE_TOOL_LEGACY_STORAGE_KEY_V2);
    if (rawV2) {
      const parsedV3 = readStyleFromV3Raw(rawV2);
      if (parsedV3) return parsedV3;
      const parsed = readStyleFromV2Raw(rawV2);
      if (parsed) return coerceStyleToolV2toV3(parsed);
    }
    const rawV1 = localStorage.getItem(STYLE_TOOL_LEGACY_STORAGE_KEY_V1);
    if (rawV1) {
      const flat = JSON.parse(rawV1) as Partial<PbContentGuidelines>;
      const guidelines = fillRequiredGuidelineDefaults({
        ...createNeutralStyleGuidelines(),
        ...flat,
      } as PbContentGuidelines);
      const v2: StyleToolPersistedV2 = {
        v: 2,
        seeds: { ...DEV_NEUTRAL_STYLE_SEEDS },
        locks: Object.fromEntries(PB_GUIDELINE_KEYS.map((k) => [k, true])) as Record<
          keyof PbContentGuidelines,
          boolean
        >,
        guidelines,
      };
      return coerceStyleToolV2toV3(v2);
    }
    return null;
  } catch {
    return null;
  }
}

export function coerceStyleToolPersisted(data: unknown): StyleToolPersistedV3 | null {
  if (!data || typeof data !== "object") return null;
  try {
    const raw = JSON.stringify(data);
    const v3 = readStyleFromV3Raw(raw);
    if (v3) return v3;
    const v2 = readStyleFromV2Raw(raw);
    return v2 ? coerceStyleToolV2toV3(v2) : null;
  } catch {
    return null;
  }
}

/** Style tool snapshot equivalent to first load of `/dev/style` with no saved prefs. */
export function getDefaultStyleToolPersistedV3(): StyleToolPersistedV3 {
  const seeds = { ...DEV_NEUTRAL_STYLE_SEEDS };
  const locks = emptyLocks();
  const guidelines = fillRequiredGuidelineDefaults(proposePbContentGuidelines(seeds));
  const v2: StyleToolPersistedV2 = { v: 2, seeds, locks, guidelines };
  return coerceStyleToolV2toV3(v2);
}

export function getProductionStyleToolPersistedV3(): StyleToolPersistedV3 {
  const seeds = { ...DEV_NEUTRAL_STYLE_SEEDS };
  const locks = emptyLocks();
  const v2: StyleToolPersistedV2 = {
    v: 2,
    seeds,
    locks,
    guidelines: fillRequiredGuidelineDefaults(COMMITTED_DEFAULTS),
  };
  return coerceStyleToolV2toV3(v2);
}
