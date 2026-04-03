import type { CSSProperties } from "react";
import type {
  ElementBlock,
  ElementBodyVariant,
  ElementImageObjectFit,
} from "@/page-builder/core/page-builder-schemas";
import type { HeadingLevel } from "@/page-builder/core/element-body-typography";
import type { PbContentGuidelines } from "@/app/theme/pb-guidelines-expand";

export type PbTypographyBinding =
  | { copyType: "body"; level: ElementBodyVariant }
  | { copyType: "heading"; level: HeadingLevel };

export type PbBuilderFoundations = {
  alignment: "start" | "center" | "end";
  spacingBaseRem: number;
  radiusBaseRem: number;
};

export type PbSectionDefaults = {
  defaultTextAlign: CSSProperties["textAlign"];
};

export type PbModuleFrameDefaults = {
  gapWhenUnset: string | null;
  rowGapWhenUnset: string | null;
  columnGapWhenUnset: string | null;
  alignItemsDefault: NonNullable<CSSProperties["alignItems"]>;
  flexDirectionDefault: NonNullable<CSSProperties["flexDirection"]>;
  justifyContentDefault: string;
  paddingDefault: string;
  flexWrapDefault: NonNullable<CSSProperties["flexWrap"]>;
  borderRadiusDefault: string;
};

export type PbRichTextDefaults = {
  paragraphGap: string;
  codeBorderRadius: string;
  headingH1Margin: string;
  headingH1MarginTop: string | null;
  headingH1MarginBottom: string | null;
  headingH2Margin: string;
  headingH2MarginTop: string | null;
  headingH2MarginBottom: string | null;
  headingH3Margin: string;
  headingH3MarginTop: string | null;
  headingH3MarginBottom: string | null;
  listMarginY: string;
  blockquoteMarginY: string;
  hrMarginY: string;
  preWrapMarginY: string;
};

export type PbButtonVariantKey = "default" | "accent" | "ghost";

export type PbButtonVariantDefaults = {
  typography: PbTypographyBinding;
  wrapperFill?: string;
  wrapperStroke?: string;
  wrapperPadding?: string;
  wrapperBorderRadius?: string;
};

export type PbButtonDefaults = {
  labelGap: string;
  nakedPadding: string;
  nakedPaddingY: string | null;
  nakedPaddingX: string | null;
  nakedBorderRadius: string;
  variants: Record<PbButtonVariantKey, PbButtonVariantDefaults>;
};

export type PbImageDefaults = {
  borderRadius: string;
  defaultVariant: PbImageVariantKey;
  variants: Record<PbImageVariantKey, PbImageVariantDefaults>;
};

export type PbImageVariantKey = "hero" | "inline" | "fullCover" | "feature" | "crop";

export type PbImageAnimationTrigger = "onMount" | "onFirstVisible" | "onEveryVisible";

export type PbImageAnimationPreset = string;

export type PbImageAnimationDirection = "none" | "up" | "down" | "left" | "right";
export type PbImageHybridStackPreset = "none" | "zoomIn" | "zoomOut" | "tiltIn";

export type PbImageAnimationCurvePreset =
  | "linear"
  | "easeIn"
  | "easeOut"
  | "easeInOut"
  | "customBezier";

export type PbImageAnimationCurve = {
  preset: PbImageAnimationCurvePreset;
  customBezier: [number, number, number, number];
};

export type PbImageEntranceFineTune = {
  direction: PbImageAnimationDirection;
  distancePx: number;
  fromOpacity: number;
  toOpacity: number;
  fromX: number;
  toX: number;
  fromY: number;
  toY: number;
  fromScale: number;
  toScale: number;
  fromRotate: number;
  toRotate: number;
  duration: number;
  delay: number;
  curve: PbImageAnimationCurve;
};

export type PbImageExitFineTune = {
  direction: PbImageAnimationDirection;
  distancePx: number;
  toOpacity: number;
  toX: number;
  toY: number;
  toScale: number;
  toRotate: number;
  duration: number;
  delay: number;
  curve: PbImageAnimationCurve;
};

export type PbImageAnimationFineTune = {
  enabled: boolean;
  usePresetAsBase: boolean;
  hybridStackInPreset: PbImageHybridStackPreset;
  hybridStackOutPreset: PbImageHybridStackPreset;
  hybridDuration: number;
  entrance: PbImageEntranceFineTune;
  exit: PbImageExitFineTune;
};

export type PbImageAnimationDefaults = {
  trigger: PbImageAnimationTrigger;
  entrancePreset: PbImageAnimationPreset;
  exitPreset: PbImageAnimationPreset;
  fineTune: PbImageAnimationFineTune;
};

export type PbImageLayoutMode = "aspectRatio" | "fill" | "constraints";

export type PbResponsiveValue<T> = T | [T, T];
export type PbImageConstraintValues = {
  minWidth?: string;
  maxWidth?: string;
  minHeight?: string;
  maxHeight?: string;
};
export type PbResponsiveImageConstraints = PbResponsiveValue<PbImageConstraintValues | undefined>;

export type PbImageVariantDefaults = {
  layoutMode: PbImageLayoutMode;
  objectFit: PbResponsiveValue<ElementImageObjectFit>;
  aspectRatio?: PbResponsiveValue<string>;
  width?: PbResponsiveValue<string>;
  height?: PbResponsiveValue<string>;
  constraints?: PbResponsiveImageConstraints;
  borderRadius: PbResponsiveValue<string>;
  objectPosition?: string;
  /** Pan/zoom inside a fixed frame when `objectFit` is `crop`. x/y are % translate; scale ≥ 1 zooms in from cover baseline. focalX/focalY are 0–1 metadata only (no CSS). */
  imageCrop?: { x: number; y: number; scale: number; focalX?: number; focalY?: number };
  align?: PbResponsiveValue<"left" | "center" | "right">;
  alignY?: PbResponsiveValue<"top" | "center" | "bottom">;
  marginTop?: PbResponsiveValue<string>;
  marginBottom?: PbResponsiveValue<string>;
  marginLeft?: PbResponsiveValue<string>;
  marginRight?: PbResponsiveValue<string>;
  /** Stacking order on the layout wrapper (`elementLayoutSchema.zIndex`). */
  zIndex?: number;
  rotate?: number | string;
  flipHorizontal?: boolean;
  flipVertical?: boolean;
  opacity?: number;
  blendMode?: string;
  boxShadow?: string;
  filter?: string;
  backdropFilter?: string;
  overflow?: "hidden" | "visible" | "auto" | "scroll";
  hidden?: boolean;
  priority?: boolean;
  animation: PbImageAnimationDefaults;
};

export type PbHeadingVariantKey = "display" | "section" | "label";

export type PbBodyVariantKey = "lead" | "standard" | "fine";

export type PbLinkVariantKey = "inline" | "emphasis" | "nav";

export type PbHeadingVariantDefaults = Omit<
  Extract<ElementBlock, { type: "elementHeading" }>,
  "type"
>;

export type PbBodyVariantDefaults = Omit<Extract<ElementBlock, { type: "elementBody" }>, "type">;

export type PbLinkVariantDefaults = Omit<Extract<ElementBlock, { type: "elementLink" }>, "type">;

export type PbHeadingDefaults = {
  defaultVariant: PbHeadingVariantKey;
  variants: Record<PbHeadingVariantKey, PbHeadingVariantDefaults>;
};

export type PbBodyDefaults = {
  defaultVariant: PbBodyVariantKey;
  variants: Record<PbBodyVariantKey, PbBodyVariantDefaults>;
};

export type PbLinkDefaults = {
  defaultVariant: PbLinkVariantKey;
  variants: Record<PbLinkVariantKey, PbLinkVariantDefaults>;
};

export type PbElementDefaults = {
  richText: PbRichTextDefaults;
  button: PbButtonDefaults;
  image: PbImageDefaults;
  heading: PbHeadingDefaults;
  body: PbBodyDefaults;
  link: PbLinkDefaults;
};

export type PbBuilderDefaults = {
  version: 1;
  foundations: PbBuilderFoundations;
  sections: PbSectionDefaults;
  modules: {
    frame: PbModuleFrameDefaults;
  };
  elements: PbElementDefaults;
};

const MIN_SPACING_REM = 0.125;
const MIN_RADIUS_REM = 0.25;

function clampNumber(n: number, min: number, max: number): number {
  if (!Number.isFinite(n)) return min;
  return Math.min(max, Math.max(min, n));
}

function normalizeBezierTuple(
  value: [number, number, number, number]
): [number, number, number, number] {
  return [
    Number.isFinite(value[0]) ? value[0] : 0.25,
    Number.isFinite(value[1]) ? value[1] : 0.46,
    Number.isFinite(value[2]) ? value[2] : 0.45,
    Number.isFinite(value[3]) ? value[3] : 0.94,
  ];
}

function toMotionEase(curve: PbImageAnimationCurve): string | [number, number, number, number] {
  if (curve.preset === "customBezier") return normalizeBezierTuple(curve.customBezier);
  return curve.preset;
}

function toMotionTransition(
  duration: number,
  delay: number,
  curve: PbImageAnimationCurve
): {
  type: "tween";
  duration: number;
  delay: number;
  ease: string | [number, number, number, number];
} {
  return {
    type: "tween",
    duration: Math.max(0, duration),
    delay: Math.max(0, delay),
    ease: toMotionEase(curve),
  };
}

function toEntranceOffset(
  direction: PbImageAnimationDirection,
  distancePx: number
): {
  x?: number;
  y?: number;
} {
  const distance = Math.max(0, distancePx);
  if (direction === "up") return { y: distance };
  if (direction === "down") return { y: -distance };
  if (direction === "left") return { x: distance };
  if (direction === "right") return { x: -distance };
  return {};
}

function toExitOffset(
  direction: PbImageAnimationDirection,
  distancePx: number
): {
  x?: number;
  y?: number;
} {
  const distance = Math.max(0, distancePx);
  if (direction === "up") return { y: -distance };
  if (direction === "down") return { y: distance };
  if (direction === "left") return { x: -distance };
  if (direction === "right") return { x: distance };
  return {};
}

function getEntrancePresetKeyframes(preset: PbImageAnimationPreset): {
  initial: Record<string, unknown>;
  animate: Record<string, unknown>;
} {
  switch (preset) {
    case "fade":
      return { initial: { opacity: 0 }, animate: { opacity: 1 } };
    case "slideUp":
      return { initial: { y: 24 }, animate: { y: 0 } };
    case "slideDown":
      return { initial: { y: -24 }, animate: { y: 0 } };
    case "slideLeft":
      return { initial: { x: 24 }, animate: { x: 0 } };
    case "slideRight":
      return { initial: { x: -24 }, animate: { x: 0 } };
    case "zoomIn":
      return { initial: { scale: 0.92 }, animate: { scale: 1 } };
    case "zoomOut":
      return { initial: { scale: 1.08 }, animate: { scale: 1 } };
    case "tiltIn":
      return { initial: { rotate: -4 }, animate: { rotate: 0 } };
    default:
      return { initial: {}, animate: {} };
  }
}

function getExitPresetKeyframes(preset: PbImageAnimationPreset): { exit: Record<string, unknown> } {
  switch (preset) {
    case "fade":
      return { exit: { opacity: 0 } };
    case "slideUp":
      return { exit: { y: -24 } };
    case "slideDown":
      return { exit: { y: 24 } };
    case "slideLeft":
      return { exit: { x: -24 } };
    case "slideRight":
      return { exit: { x: 24 } };
    case "zoomIn":
      return { exit: { scale: 1.08 } };
    case "zoomOut":
      return { exit: { scale: 0.92 } };
    case "tiltIn":
      return { exit: { rotate: 4 } };
    default:
      return { exit: {} };
  }
}

function getHybridEntranceStackKeyframes(stack: PbImageHybridStackPreset): {
  initial: Record<string, unknown>;
  animate: Record<string, unknown>;
} {
  if (stack === "none") return { initial: {}, animate: {} };
  return getEntrancePresetKeyframes(stack);
}

function getHybridExitStackKeyframes(stack: PbImageHybridStackPreset): {
  exit: Record<string, unknown>;
} {
  if (stack === "none") return { exit: {} };
  return getExitPresetKeyframes(stack);
}

function createImageAnimationFineTune(
  entranceDirection: PbImageAnimationDirection,
  exitDirection: PbImageAnimationDirection
): PbImageAnimationFineTune {
  return {
    enabled: false,
    usePresetAsBase: true,
    hybridStackInPreset: "none",
    hybridStackOutPreset: "none",
    hybridDuration: 0.45,
    entrance: {
      direction: entranceDirection,
      distancePx: 24,
      fromOpacity: 0,
      toOpacity: 1,
      fromX: 0,
      toX: 0,
      fromY: 0,
      toY: 0,
      fromScale: 1,
      toScale: 1,
      fromRotate: 0,
      toRotate: 0,
      duration: 0.45,
      delay: 0,
      curve: {
        preset: "easeOut",
        customBezier: [0.25, 0.46, 0.45, 0.94],
      },
    },
    exit: {
      direction: exitDirection,
      distancePx: 24,
      toOpacity: 0,
      toX: 0,
      toY: 0,
      toScale: 1,
      toRotate: 0,
      duration: 0.28,
      delay: 0,
      curve: {
        preset: "easeInOut",
        customBezier: [0.4, 0, 0.2, 1],
      },
    },
  };
}

function rem(n: number): string {
  return `${n}rem`;
}

function normalizeSpacingBaseRem(n: number): number {
  return Number.isFinite(n) ? Math.max(MIN_SPACING_REM, n) : MIN_SPACING_REM;
}

function normalizeRadiusBaseRem(n: number): number {
  return Number.isFinite(n) ? Math.max(0, n) : 0;
}

function toTextAlign(
  alignment: PbBuilderFoundations["alignment"]
): NonNullable<CSSProperties["textAlign"]> {
  if (alignment === "center") return "center";
  if (alignment === "end") return "right";
  return "start";
}

function toFlexAlignItems(
  alignment: PbBuilderFoundations["alignment"]
): NonNullable<CSSProperties["alignItems"]> {
  if (alignment === "center") return "center";
  if (alignment === "end") return "flex-end";
  return "flex-start";
}

function toFlexJustifyContent(alignment: PbBuilderFoundations["alignment"]): string {
  if (alignment === "center") return "center";
  if (alignment === "end") return "flex-end";
  return "flex-start";
}

export const DEFAULT_PB_BUILDER_FOUNDATIONS: PbBuilderFoundations = {
  alignment: "center",
  spacingBaseRem: 0.5,
  radiusBaseRem: 0.375,
};

/**
 * Foundations-first generator for grouped page-builder defaults.
 * Colors/fonts remain managed in their own tools; this controls spacing/alignment/radius defaults.
 */
export function createPbBuilderDefaultsFromFoundations(
  foundations: PbBuilderFoundations
): PbBuilderDefaults {
  const spacingBaseRem = normalizeSpacingBaseRem(foundations.spacingBaseRem);
  const radiusBaseRem = normalizeRadiusBaseRem(foundations.radiusBaseRem);
  const textAlign = toTextAlign(foundations.alignment);
  const alignItems = toFlexAlignItems(foundations.alignment);
  const justifyContent = toFlexJustifyContent(foundations.alignment);
  const radiusCss = rem(Math.max(MIN_RADIUS_REM, radiusBaseRem));

  return {
    version: 1,
    foundations: {
      alignment: foundations.alignment,
      spacingBaseRem,
      radiusBaseRem,
    },
    sections: {
      defaultTextAlign: textAlign,
    },
    modules: {
      frame: {
        gapWhenUnset: rem(spacingBaseRem * 2),
        rowGapWhenUnset: null,
        columnGapWhenUnset: null,
        alignItemsDefault: alignItems,
        flexDirectionDefault: "row",
        justifyContentDefault: justifyContent,
        paddingDefault: "0",
        flexWrapDefault: "nowrap",
        borderRadiusDefault: radiusCss,
      },
    },
    elements: {
      richText: {
        paragraphGap: rem(spacingBaseRem),
        codeBorderRadius: rem(Math.max(MIN_RADIUS_REM, spacingBaseRem)),
        headingH1Margin: `${rem(spacingBaseRem * 2)} ${rem(spacingBaseRem * 0.5)}`,
        headingH1MarginTop: null,
        headingH1MarginBottom: null,
        headingH2Margin: `${rem(spacingBaseRem * 1.5)} ${rem(spacingBaseRem * 0.5)}`,
        headingH2MarginTop: null,
        headingH2MarginBottom: null,
        headingH3Margin: `${rem(spacingBaseRem * 1)} ${rem(spacingBaseRem * 0.5)}`,
        headingH3MarginTop: null,
        headingH3MarginBottom: null,
        listMarginY: rem(spacingBaseRem),
        blockquoteMarginY: rem(spacingBaseRem),
        hrMarginY: rem(spacingBaseRem * 1.5),
        preWrapMarginY: rem(spacingBaseRem * 1.5),
      },
      button: {
        labelGap: rem(spacingBaseRem),
        nakedPadding: `${rem(spacingBaseRem)} ${rem(spacingBaseRem * 2.5)}`,
        nakedPaddingY: null,
        nakedPaddingX: null,
        nakedBorderRadius: radiusCss,
        variants: {
          default: {
            typography: { copyType: "body", level: 4 },
          },
          accent: {
            typography: { copyType: "body", level: 3 },
            wrapperFill: "var(--pb-accent)",
            wrapperBorderRadius: radiusCss,
          },
          ghost: {
            typography: { copyType: "body", level: 5 },
            wrapperStroke: "var(--pb-border)",
            wrapperBorderRadius: radiusCss,
          },
        },
      },
      image: {
        borderRadius: radiusCss,
        defaultVariant: "hero",
        variants: {
          hero: {
            layoutMode: "aspectRatio",
            objectFit: "cover",
            aspectRatio: "16 / 9",
            borderRadius: radiusCss,
            objectPosition: "center",
            align: "center",
            alignY: "center",
            flipHorizontal: false,
            flipVertical: false,
            opacity: 1,
            overflow: "hidden",
            hidden: false,
            priority: true,
            animation: {
              trigger: "onFirstVisible",
              entrancePreset: "slideUp",
              exitPreset: "fade",
              fineTune: createImageAnimationFineTune("up", "up"),
            },
          },
          inline: {
            layoutMode: "aspectRatio",
            objectFit: "contain",
            aspectRatio: "4 / 3",
            borderRadius: radiusCss,
            objectPosition: "center",
            align: "left",
            alignY: "top",
            flipHorizontal: false,
            flipVertical: false,
            opacity: 1,
            overflow: "visible",
            hidden: false,
            priority: false,
            animation: {
              trigger: "onFirstVisible",
              entrancePreset: "fade",
              exitPreset: "fade",
              fineTune: createImageAnimationFineTune("none", "none"),
            },
          },
          fullCover: {
            layoutMode: "fill",
            objectFit: "cover",
            width: "100%",
            height: "100%",
            borderRadius: "0",
            objectPosition: "center",
            align: "center",
            alignY: "center",
            flipHorizontal: false,
            flipVertical: false,
            opacity: 1,
            overflow: "hidden",
            hidden: false,
            priority: true,
            animation: {
              trigger: "onMount",
              entrancePreset: "fade",
              exitPreset: "fade",
              fineTune: createImageAnimationFineTune("none", "none"),
            },
          },
          feature: {
            layoutMode: "aspectRatio",
            objectFit: "cover",
            aspectRatio: "3 / 4",
            borderRadius: radiusCss,
            objectPosition: "center top",
            align: "center",
            alignY: "center",
            flipHorizontal: false,
            flipVertical: false,
            opacity: 1,
            overflow: "hidden",
            hidden: false,
            priority: false,
            animation: {
              trigger: "onFirstVisible",
              entrancePreset: "slideLeft",
              exitPreset: "slideRight",
              fineTune: createImageAnimationFineTune("left", "right"),
            },
          },
          crop: {
            layoutMode: "aspectRatio",
            objectFit: "crop",
            aspectRatio: "16 / 9",
            borderRadius: radiusCss,
            objectPosition: "center",
            imageCrop: { x: 0, y: 0, scale: 1 },
            align: "center",
            alignY: "center",
            flipHorizontal: false,
            flipVertical: false,
            opacity: 1,
            overflow: "hidden",
            hidden: false,
            priority: false,
            animation: {
              trigger: "onFirstVisible",
              entrancePreset: "fade",
              exitPreset: "fade",
              fineTune: createImageAnimationFineTune("none", "none"),
            },
          },
        },
      },
      heading: {
        defaultVariant: "display",
        variants: {
          display: {
            variant: "display",
            level: 1,
            text: "Display heading",
            wordWrap: true,
            align: "left",
            alignY: "center",
          },
          section: {
            variant: "section",
            level: 2,
            text: "Section heading",
            wordWrap: true,
            align: "left",
            alignY: "top",
          },
          label: {
            variant: "label",
            level: 5,
            text: "Eyebrow label",
            wordWrap: true,
            align: "left",
            alignY: "center",
          },
        },
      },
      body: {
        defaultVariant: "standard",
        variants: {
          lead: {
            variant: "lead",
            text: "Lead paragraph for introductions and hero copy that should read larger than body text.",
            level: 2,
            wordWrap: true,
            align: "left",
            alignY: "top",
          },
          standard: {
            variant: "standard",
            text: "Standard body copy for descriptions, lists, and long-form content in layouts.",
            level: 4,
            wordWrap: true,
            align: "left",
            alignY: "top",
          },
          fine: {
            variant: "fine",
            text: "Fine print, captions, and tertiary supporting text.",
            level: 6,
            wordWrap: true,
            align: "left",
            alignY: "top",
          },
        },
      },
      link: {
        defaultVariant: "inline",
        variants: {
          inline: {
            variant: "inline",
            label: "Inline link",
            href: "/",
            external: false,
            copyType: "body",
            level: 4,
            wordWrap: true,
            align: "left",
            alignY: "center",
          },
          emphasis: {
            variant: "emphasis",
            label: "Emphasized link",
            href: "/work",
            external: false,
            copyType: "heading",
            level: 3,
            wordWrap: true,
            align: "left",
            alignY: "center",
          },
          nav: {
            variant: "nav",
            label: "Navigation link",
            href: "/about",
            external: false,
            copyType: "body",
            level: 4,
            wordWrap: true,
            align: "center",
            alignY: "center",
          },
        },
      },
    },
  };
}

/**
 * Future-facing grouped defaults model.
 * This is intentionally organized by page-builder domains instead of a flat token list.
 */
export const pbBuilderDefaultsV1: PbBuilderDefaults = createPbBuilderDefaultsFromFoundations(
  DEFAULT_PB_BUILDER_FOUNDATIONS
);

/**
 * Compatibility adapter while runtime still consumes the flat content-guidelines shape.
 */
export function toPbContentGuidelines(defaults: PbBuilderDefaults): PbContentGuidelines {
  const frame = defaults.modules.frame;
  const rich = defaults.elements.richText;
  const btn = defaults.elements.button;
  return {
    copyTextAlign: defaults.sections.defaultTextAlign,
    frameGapWhenUnset: frame.gapWhenUnset,
    frameRowGapWhenUnset: frame.rowGapWhenUnset,
    frameColumnGapWhenUnset: frame.columnGapWhenUnset,
    frameAlignItemsDefault: frame.alignItemsDefault,
    frameFlexDirectionDefault: frame.flexDirectionDefault,
    frameJustifyContentDefault: frame.justifyContentDefault,
    framePaddingDefault: frame.paddingDefault,
    frameFlexWrapDefault: frame.flexWrapDefault,
    frameBorderRadiusDefault: frame.borderRadiusDefault,
    richTextParagraphGap: rich.paragraphGap,
    richTextCodeBorderRadius: rich.codeBorderRadius,
    richTextHeadingH1Margin: rich.headingH1Margin,
    richTextHeadingH1MarginTop: rich.headingH1MarginTop,
    richTextHeadingH1MarginBottom: rich.headingH1MarginBottom,
    richTextHeadingH2Margin: rich.headingH2Margin,
    richTextHeadingH2MarginTop: rich.headingH2MarginTop,
    richTextHeadingH2MarginBottom: rich.headingH2MarginBottom,
    richTextHeadingH3Margin: rich.headingH3Margin,
    richTextHeadingH3MarginTop: rich.headingH3MarginTop,
    richTextHeadingH3MarginBottom: rich.headingH3MarginBottom,
    richTextListMarginY: rich.listMarginY,
    richTextBlockquoteMarginY: rich.blockquoteMarginY,
    richTextHrMarginY: rich.hrMarginY,
    richTextPreWrapMarginY: rich.preWrapMarginY,
    buttonLabelGap: btn.labelGap,
    buttonNakedPadding: btn.nakedPadding,
    buttonNakedPaddingY: btn.nakedPaddingY,
    buttonNakedPaddingX: btn.nakedPaddingX,
    buttonNakedBorderRadius: btn.nakedBorderRadius,
  };
}

/**
 * Shared-radius helper for linked defaults across elements/modules.
 * Example: raising button radius can also raise image/module frame radius in one edit.
 */
export function withUnifiedRadius(
  defaults: PbBuilderDefaults,
  radiusCss: string
): PbBuilderDefaults {
  return {
    ...defaults,
    modules: {
      ...defaults.modules,
      frame: {
        ...defaults.modules.frame,
        borderRadiusDefault: radiusCss,
      },
    },
    elements: {
      ...defaults.elements,
      button: {
        ...defaults.elements.button,
        nakedBorderRadius: radiusCss,
      },
      image: {
        ...defaults.elements.image,
        borderRadius: radiusCss,
        variants: {
          ...defaults.elements.image.variants,
          hero: {
            ...defaults.elements.image.variants.hero,
            borderRadius: radiusCss,
          },
          inline: {
            ...defaults.elements.image.variants.inline,
            borderRadius: radiusCss,
          },
          feature: {
            ...defaults.elements.image.variants.feature,
            borderRadius: radiusCss,
          },
          crop: {
            ...defaults.elements.image.variants.crop,
            borderRadius: radiusCss,
          },
        },
      },
    },
  };
}

export function buildImageMotionTimingFromAnimationDefaults(animation: PbImageAnimationDefaults): {
  trigger: PbImageAnimationTrigger;
  entrancePreset?: PbImageAnimationPreset;
  exitPreset?: PbImageAnimationPreset;
  entranceMotion?: Record<string, unknown>;
  exitMotion?: Record<string, unknown>;
} {
  const base: {
    trigger: PbImageAnimationTrigger;
    entrancePreset?: PbImageAnimationPreset;
    exitPreset?: PbImageAnimationPreset;
  } = {
    trigger: animation.trigger,
  };
  if (animation.entrancePreset.trim().length > 0) {
    base.entrancePreset = animation.entrancePreset;
  }
  if (animation.exitPreset.trim().length > 0) {
    base.exitPreset = animation.exitPreset;
  }

  if (!animation.fineTune.enabled) return base;

  const entrance = animation.fineTune.entrance;
  const exit = animation.fineTune.exit;
  const entranceTransition = toMotionTransition(entrance.duration, entrance.delay, entrance.curve);
  const exitTransition = toMotionTransition(exit.duration, exit.delay, exit.curve);

  if (animation.fineTune.usePresetAsBase) {
    const hybridDuration = Math.max(0, Number(animation.fineTune.hybridDuration || 0.45));
    const baseEntrance = getEntrancePresetKeyframes(animation.entrancePreset);
    const stackEntrance = getHybridEntranceStackKeyframes(animation.fineTune.hybridStackInPreset);
    const baseExit = getExitPresetKeyframes(animation.exitPreset);
    const stackExit = getHybridExitStackKeyframes(animation.fineTune.hybridStackOutPreset);
    const hybridTransition = {
      type: "tween" as const,
      duration: hybridDuration,
      delay: 0,
      ease: "easeOut" as const,
    };
    return {
      ...base,
      entranceMotion: {
        initial: { ...baseEntrance.initial, ...stackEntrance.initial },
        animate: { ...baseEntrance.animate, ...stackEntrance.animate },
        transition: hybridTransition,
      },
      exitMotion: {
        exit: { ...baseExit.exit, ...stackExit.exit },
        transition: hybridTransition,
      },
    };
  }

  const entranceOffset = toEntranceOffset(entrance.direction, entrance.distancePx);
  const exitOffset = toExitOffset(exit.direction, exit.distancePx);
  const entranceInitialX = (entrance.fromX ?? 0) + (entranceOffset.x ?? 0);
  const entranceInitialY = (entrance.fromY ?? 0) + (entranceOffset.y ?? 0);
  const entranceAnimateX = entrance.toX ?? 0;
  const entranceAnimateY = entrance.toY ?? 0;
  const exitTargetX = (exit.toX ?? 0) + (exitOffset.x ?? 0);
  const exitTargetY = (exit.toY ?? 0) + (exitOffset.y ?? 0);
  const entranceMotion: Record<string, unknown> = {
    initial: {
      opacity: clampNumber(entrance.fromOpacity, 0, 1),
      x: entranceInitialX,
      y: entranceInitialY,
      scale: Number.isFinite(entrance.fromScale) ? entrance.fromScale : 1,
      rotate: Number.isFinite(entrance.fromRotate) ? entrance.fromRotate : 0,
    },
    animate: {
      opacity: clampNumber(entrance.toOpacity, 0, 1),
      x: entranceAnimateX,
      y: entranceAnimateY,
      scale: Number.isFinite(entrance.toScale) ? entrance.toScale : 1,
      rotate: Number.isFinite(entrance.toRotate) ? entrance.toRotate : 0,
    },
    transition: entranceTransition,
  };
  const exitMotion: Record<string, unknown> = {
    exit: {
      opacity: clampNumber(exit.toOpacity, 0, 1),
      x: exitTargetX,
      y: exitTargetY,
      scale: Number.isFinite(exit.toScale) ? exit.toScale : 1,
      rotate: Number.isFinite(exit.toRotate) ? exit.toRotate : 0,
    },
    transition: exitTransition,
  };

  const withCustom: {
    trigger: PbImageAnimationTrigger;
    entrancePreset?: PbImageAnimationPreset;
    exitPreset?: PbImageAnimationPreset;
    entranceMotion: Record<string, unknown>;
    exitMotion: Record<string, unknown>;
  } = {
    ...base,
    entranceMotion,
    exitMotion,
  };

  if (!animation.fineTune.usePresetAsBase) {
    delete withCustom.entrancePreset;
    delete withCustom.exitPreset;
  }

  return withCustom;
}
