import type { ElementBlock } from "./element-block-types";
import type { FormFieldBlock } from "../page-builder-schemas";
import type {
  SectionColumnAssignments,
  SectionColumnGaps,
  SectionColumnItemLayout,
  SectionColumnItemStyles,
  SectionColumnSpanMap,
  SectionColumnStyles,
  SectionColumnWidths,
  ResponsiveSectionColumnSpanMap,
} from "./section-column-layout-types";
import type { dividerLayer, SectionBorder, SectionEffect } from "./section-style-effect-types";
import type { TriggerAction } from "./trigger-action-types";

export type BaseSectionProps = {
  id?: string;
  fill?: string;
  layers?: dividerLayer[];
  effects?: SectionEffect[];
  width?: string;
  height?: string;
  minWidth?: string;
  maxWidth?: string;
  minHeight?: string;
  maxHeight?: string;
  align?: "left" | "center" | "right" | "full";
  marginLeft?: string;
  marginRight?: string;
  marginTop?: string;
  marginBottom?: string;
  borderRadius?: string;
  border?: SectionBorder;
  boxShadow?: string;
  filter?: string;
  backdropFilter?: string;
  clipPath?: string;
  cursor?:
    | "pointer"
    | "default"
    | "grab"
    | "grabbing"
    | "crosshair"
    | "zoom-in"
    | "zoom-out"
    | "text"
    | "move"
    | "not-allowed"
    | "auto"
    | "none";
  aspectRatio?: string;
  scrollSpeed?: number;
  initialX?: string;
  initialY?: string;
  zIndex?: number;
  onVisible?: TriggerAction;
  onInvisible?: TriggerAction;
  onProgress?: TriggerAction;
  onViewportProgress?: TriggerAction;
  threshold?: number;
  triggerOnce?: boolean;
  rootMargin?: string;
  delay?: number;
  sticky?: boolean;
  stickyOffset?: string;
  stickyPosition?: "top" | "bottom";
  fixed?: boolean;
  fixedPosition?: "top" | "bottom" | "left" | "right";
  fixedOffset?: string;
};

export type SectionColumnBlock = BaseSectionProps & {
  type: "sectionColumn";
  elements: ElementBlock[];
  columns: number | { mobile?: number; desktop?: number };
  columnAssignments: SectionColumnAssignments;
  columnWidths?: SectionColumnWidths;
  columnGaps?: SectionColumnGaps;
  columnStyles?: SectionColumnStyles;
  gridMode?: "columns" | "grid" | { mobile?: "columns" | "grid"; desktop?: "columns" | "grid" };
  gridDebug?: boolean | { mobile?: boolean; desktop?: boolean };
  gridAutoRows?: string;
  elementOrder?: string[] | { mobile?: string[]; desktop?: string[] };
  columnSpan?: SectionColumnSpanMap | ResponsiveSectionColumnSpanMap;
  itemStyles?: SectionColumnItemStyles;
  itemLayout?: SectionColumnItemLayout;
  contentWidth?: "full" | "hug" | string;
  contentHeight?: "full" | "hug" | string;
};

export type SectionBlock =
  | (BaseSectionProps & { type: "divider" })
  | (BaseSectionProps & {
      type: "contentBlock";
      elements: ElementBlock[];
      flexDirection?: "row" | "column" | "row-reverse" | "column-reverse";
      alignItems?: string;
      justifyContent?: string;
      flexWrap?: "nowrap" | "wrap" | "wrap-reverse";
      gap?: string;
      rowGap?: string;
      columnGap?: string;
      contentWidth?: "full" | "hug" | string;
      contentHeight?: "full" | "hug" | string;
    })
  | (BaseSectionProps & {
      type: "scrollContainer";
      elements: ElementBlock[];
      scrollDirection?: "horizontal" | "vertical";
      scrollProgressTrigger?: { id: string; invert?: boolean; input?: [number, number] };
      scrollProgressTriggerId?: string;
    })
  | SectionColumnBlock
  | (BaseSectionProps & {
      type: "sectionTrigger";
      id?: string;
      onVisible?: TriggerAction;
      onInvisible?: TriggerAction;
      onProgress?: TriggerAction;
      onViewportProgress?: TriggerAction;
      threshold?: number;
      triggerOnce?: boolean;
      rootMargin?: string;
      delay?: number;
    })
  | (BaseSectionProps & {
      type: "formBlock";
      fields: FormFieldBlock[];
      action?: string;
      method?: "get" | "post";
      actionPayload?: Record<string, string | number | boolean>;
      contentWidth?: "full" | "hug" | string;
      contentHeight?: "full" | "hug" | string;
    })
  | (BaseSectionProps & {
      type: "revealSection";
      triggerMode?: "hover" | "click" | "button" | "external" | "combined";
      initialRevealed?: boolean;
      revealOnHover?: boolean;
      revealOnClick?: boolean;
      toggleOnClick?: boolean;
      externalTriggerKey?: string;
      externalTriggerMode?: "setTrue" | "setFalse" | "toggle";
      expandAxis?: "vertical" | "horizontal" | "both";
      collapsedSize?: { height?: string; width?: string };
      expandedSize?: { height?: string; width?: string };
      expandDurationMs?: number;
      collapseDurationMs?: number;
      transitionEasing?: string;
      collapsedElements?: ElementBlock[];
      revealedElements?: ElementBlock[];
      revealStaggerMs?: number;
      revealDurationMs?: number;
      revealPreset?: string;
    });
