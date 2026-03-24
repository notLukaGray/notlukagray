import type {
  ElementBodyVariant,
  ElementGraphicLink,
  ElementImageObjectFit,
  ElementLayout,
  ElementLinkStateStyle,
  ElementSimpleLink,
  VectorGradient,
  VectorShape,
} from "./element-shared-types";

export type ElementBlock =
  | ({
      type: "elementHeading";
      level: 1 | 2 | 3 | 4 | 5 | 6;
      /** Semantic heading level for document outline; when set, used for the tag while `level` drives typography. */
      semanticLevel?: 1 | 2 | 3 | 4 | 5 | 6;
      text: string;
      wordWrap?: boolean;
      letterSpacing?: string | number;
      lineSpacing?: string | number;
    } & ElementLayout)
  | ({
      type: "elementBody";
      text: string;
      level?: ElementBodyVariant;
      wordWrap?: boolean;
      letterSpacing?: string | number;
      lineSpacing?: string | number;
    } & ElementLayout)
  | (
      | ({
          type: "elementLink";
          label: string;
          href: string;
          external?: boolean;
          copyType: "heading";
          level: 1 | 2 | 3 | 4 | 5 | 6;
          wordWrap?: boolean;
        } & ElementLayout &
          ElementLinkStateStyle)
      | ({
          type: "elementLink";
          label: string;
          href: string;
          external?: boolean;
          copyType: "body";
          level?: ElementBodyVariant;
          wordWrap?: boolean;
        } & ElementLayout &
          ElementLinkStateStyle)
    )
  | ({
      type: "elementImage";
      src: string;
      alt: string;
      objectFit?: ElementImageObjectFit;
      objectPosition?: string;
      rotate?: number | string;
      flipHorizontal?: boolean;
      flipVertical?: boolean;
      link?: ElementSimpleLink;
      aspectRatio?: string | [string, string];
    } & ElementLayout)
  | ({
      type: "elementVideo";
      src: string;
      poster?: string;
      ariaLabel?: string;
      autoplay?: boolean;
      loop?: boolean;
      muted?: boolean;
      objectFit?: ElementImageObjectFit;
      objectPosition?: string;
      rotate?: number | string;
      flipHorizontal?: boolean;
      flipVertical?: boolean;
      showPlayButton?: boolean;
      link?: ElementSimpleLink;
      aspectRatio?: string | [string, string];
    } & ElementLayout)
  | ({
      type: "elementVector";
      viewBox: string;
      ariaLabel?: string;
      preserveAspectRatio?: string;
      shapes: VectorShape[];
      colors?: Record<string, string>;
      gradients?: VectorGradient[];
      strokeGroup?: {
        stroke: string;
        strokeWidth?: number;
        strokeLinejoin?: "miter" | "round" | "bevel";
        strokeMiterlimit?: number;
        opacity?: number;
        blendMode?: string;
      };
      rotate?: number | string;
      flipHorizontal?: boolean;
      flipVertical?: boolean;
      link?: ElementGraphicLink;
    } & ElementLayout)
  | ({
      type: "elementSVG";
      markup: string;
      ariaLabel?: string;
      rotate?: number | string;
      flipHorizontal?: boolean;
      flipVertical?: boolean;
      link?: ElementGraphicLink;
    } & ElementLayout)
  | ({
      type: "elementRichText";
      content: string;
      level?: ElementBodyVariant;
      wordWrap?: boolean;
    } & ElementLayout);
