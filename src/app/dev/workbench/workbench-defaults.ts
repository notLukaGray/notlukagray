import type { ColorToolPersistedV2 } from "@/app/dev/colors/color-tool-persistence";
import {
  getDefaultColorToolPersistedV2,
  getProductionColorToolPersistedV2,
} from "@/app/dev/colors/color-tool-persistence";
import {
  DEV_NEUTRAL_BODY_DEFAULTS,
  DEV_NEUTRAL_HEADING_DEFAULTS,
  DEV_NEUTRAL_IMAGE_DEFAULTS,
  DEV_NEUTRAL_LINK_DEFAULTS,
  DEV_PRODUCTION_BODY_DEFAULTS,
  DEV_PRODUCTION_HEADING_DEFAULTS,
  DEV_PRODUCTION_IMAGE_DEFAULTS,
  DEV_PRODUCTION_LINK_DEFAULTS,
} from "@/app/dev/elements/element-dev-baseline";
import type { PersistedBodyDefaults } from "@/app/dev/elements/body/types";
import type { PersistedHeadingDefaults } from "@/app/dev/elements/heading/types";
import type { PersistedImageDefaults } from "@/app/dev/elements/image/types";
import type { PersistedLinkDefaults } from "@/app/dev/elements/link/types";
import {
  DEV_NEUTRAL_FONT_CONFIGS,
  DEV_NEUTRAL_TYPE_SCALE,
  type FontWorkbenchSlotConfig,
} from "@/app/dev/fonts/font-tool-baseline";
import {
  getDefaultStyleToolPersistedV2,
  getProductionStyleToolPersistedV2,
  type StyleToolPersistedV2,
} from "@/app/dev/style/style-tool-persistence";
import type { FontWeightMap } from "@/app/fonts/config";
import { monoFontConfig, primaryFontConfig, secondaryFontConfig } from "@/app/fonts/config";
import { typeScaleConfig } from "@/app/fonts/type-scale";
import {
  hasCompleteWorkbenchStorageShape,
  mergeWorkbenchSessionShape,
} from "@/app/dev/workbench/workbench-session-shape";

const DEFAULT_PREVIEW_PHRASE = "The quick brown fox jumps over the lazy dog. 0123456789";

type FontWorkbenchPrefsV1 = {
  v: 1;
  configs: Record<
    "primary" | "secondary" | "mono",
    {
      family: string;
      weights: FontWeightMap;
      italic: boolean;
      source: "local" | "webfont";
      localRoleFiles?: Partial<Record<keyof FontWeightMap, string>>;
    }
  >;
  slotPreviewMode: Record<"primary" | "secondary" | "mono", "catalog" | "local">;
  typeScale: typeof typeScaleConfig;
  previewSampleText: string;
};

function toSlotState(config: FontWorkbenchSlotConfig): FontWorkbenchPrefsV1["configs"]["primary"] {
  return {
    family: config.family,
    weights: { ...config.weights },
    italic: config.italic,
    source: config.source,
  };
}

function toProductionSlotState(
  cfg: typeof primaryFontConfig
): FontWorkbenchPrefsV1["configs"]["primary"] {
  return {
    family: cfg.webfont.family,
    weights: { ...cfg.weights },
    italic: cfg.italic,
    source: cfg.source === "local" ? "local" : "webfont",
  };
}

function createFontsWorkbenchPrefs(
  configs: Record<"primary" | "secondary" | "mono", FontWorkbenchPrefsV1["configs"]["primary"]>,
  scale: FontWorkbenchPrefsV1["typeScale"]
): FontWorkbenchPrefsV1 {
  return {
    v: 1,
    configs,
    slotPreviewMode: { primary: "catalog", secondary: "catalog", mono: "catalog" },
    typeScale: structuredClone(scale),
    previewSampleText: DEFAULT_PREVIEW_PHRASE,
  };
}

export function getDefaultFontsWorkbenchPrefs(): FontWorkbenchPrefsV1 {
  return createFontsWorkbenchPrefs(
    {
      primary: toSlotState(DEV_NEUTRAL_FONT_CONFIGS.primary),
      secondary: toSlotState(DEV_NEUTRAL_FONT_CONFIGS.secondary),
      mono: toSlotState(DEV_NEUTRAL_FONT_CONFIGS.mono),
    },
    DEV_NEUTRAL_TYPE_SCALE
  );
}

export function getProductionFontsWorkbenchPrefs(): FontWorkbenchPrefsV1 {
  return createFontsWorkbenchPrefs(
    {
      primary: toProductionSlotState(primaryFontConfig),
      secondary: toProductionSlotState(secondaryFontConfig),
      mono: toProductionSlotState(monoFontConfig),
    },
    typeScaleConfig
  );
}

export function getDefaultImageElementPersisted(): PersistedImageDefaults {
  return {
    v: 3,
    defaultVariant: DEV_NEUTRAL_IMAGE_DEFAULTS.defaultVariant,
    variants: structuredClone(DEV_NEUTRAL_IMAGE_DEFAULTS.variants),
  };
}

export function getProductionImageElementPersisted(): PersistedImageDefaults {
  return {
    v: 3,
    defaultVariant: DEV_PRODUCTION_IMAGE_DEFAULTS.defaultVariant,
    variants: structuredClone(DEV_PRODUCTION_IMAGE_DEFAULTS.variants),
  };
}

export function getDefaultBodyElementPersisted(): PersistedBodyDefaults {
  return {
    v: 1,
    defaultVariant: DEV_NEUTRAL_BODY_DEFAULTS.defaultVariant,
    variants: structuredClone(
      DEV_NEUTRAL_BODY_DEFAULTS.variants
    ) as PersistedBodyDefaults["variants"],
  };
}

export function getProductionBodyElementPersisted(): PersistedBodyDefaults {
  return {
    v: 1,
    defaultVariant: DEV_PRODUCTION_BODY_DEFAULTS.defaultVariant,
    variants: structuredClone(
      DEV_PRODUCTION_BODY_DEFAULTS.variants
    ) as PersistedBodyDefaults["variants"],
  };
}

export function getDefaultHeadingElementPersisted(): PersistedHeadingDefaults {
  return {
    v: 1,
    defaultVariant: DEV_NEUTRAL_HEADING_DEFAULTS.defaultVariant,
    variants: structuredClone(
      DEV_NEUTRAL_HEADING_DEFAULTS.variants
    ) as PersistedHeadingDefaults["variants"],
  };
}

export function getProductionHeadingElementPersisted(): PersistedHeadingDefaults {
  return {
    v: 1,
    defaultVariant: DEV_PRODUCTION_HEADING_DEFAULTS.defaultVariant,
    variants: structuredClone(
      DEV_PRODUCTION_HEADING_DEFAULTS.variants
    ) as PersistedHeadingDefaults["variants"],
  };
}

export function getDefaultLinkElementPersisted(): PersistedLinkDefaults {
  return {
    v: 1,
    defaultVariant: DEV_NEUTRAL_LINK_DEFAULTS.defaultVariant,
    variants: structuredClone(
      DEV_NEUTRAL_LINK_DEFAULTS.variants
    ) as PersistedLinkDefaults["variants"],
  };
}

export function getProductionLinkElementPersisted(): PersistedLinkDefaults {
  return {
    v: 1,
    defaultVariant: DEV_PRODUCTION_LINK_DEFAULTS.defaultVariant,
    variants: structuredClone(
      DEV_PRODUCTION_LINK_DEFAULTS.variants
    ) as PersistedLinkDefaults["variants"],
  };
}

export type WorkbenchSessionV1 = {
  v: 1;
  colors: ColorToolPersistedV2;
  fonts: FontWorkbenchPrefsV1;
  style: StyleToolPersistedV2;
  elements: {
    image: PersistedImageDefaults;
    body: PersistedBodyDefaults;
    heading: PersistedHeadingDefaults;
    link: PersistedLinkDefaults;
  };
};

function createWorkbenchSession(
  colors: ColorToolPersistedV2,
  fonts: FontWorkbenchPrefsV1,
  style: StyleToolPersistedV2,
  elements: WorkbenchSessionV1["elements"]
): WorkbenchSessionV1 {
  return { v: 1, colors, fonts, style, elements };
}

export function getDefaultWorkbenchSession(): WorkbenchSessionV1 {
  return createWorkbenchSession(
    getDefaultColorToolPersistedV2(),
    getDefaultFontsWorkbenchPrefs(),
    getDefaultStyleToolPersistedV2(),
    {
      image: getDefaultImageElementPersisted(),
      body: getDefaultBodyElementPersisted(),
      heading: getDefaultHeadingElementPersisted(),
      link: getDefaultLinkElementPersisted(),
    }
  );
}

export function getProductionWorkbenchSession(): WorkbenchSessionV1 {
  return createWorkbenchSession(
    getProductionColorToolPersistedV2(),
    getProductionFontsWorkbenchPrefs(),
    getProductionStyleToolPersistedV2(),
    {
      image: getProductionImageElementPersisted(),
      body: getProductionBodyElementPersisted(),
      heading: getProductionHeadingElementPersisted(),
      link: getProductionLinkElementPersisted(),
    }
  );
}

export function mergeWorkbenchSessionWithDefaults(
  session: Partial<Omit<WorkbenchSessionV1, "elements">> & {
    v?: 1;
    elements?: Partial<WorkbenchSessionV1["elements"]>;
  }
): WorkbenchSessionV1 {
  return mergeWorkbenchSessionShape(session, getDefaultWorkbenchSession()) as WorkbenchSessionV1;
}

export function isWorkbenchStorageJsonComplete(raw: string | null): boolean {
  return hasCompleteWorkbenchStorageShape(raw);
}
