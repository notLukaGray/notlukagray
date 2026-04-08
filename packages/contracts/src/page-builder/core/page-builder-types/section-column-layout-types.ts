import type { SectionBorder } from "./section-style-effect-types";

export type SectionColumnStyle = {
  borderRadius?: string;
  border?: SectionBorder;
  fill?: string;
  padding?: string;
  gap?: string;
  justifyContent?:
    | "flex-start"
    | "center"
    | "flex-end"
    | "space-between"
    | "space-around"
    | "space-evenly";
  alignItems?: "flex-start" | "center" | "flex-end" | "stretch";
  alignX?: "left" | "center" | "right" | "stretch";
  alignY?: "top" | "center" | "bottom" | "space-between" | "space-around" | "space-evenly";
  minHeight?: string;
  maxHeight?: string;
  minWidth?: string;
  maxWidth?: string;
  width?: string;
  height?: string;
  overflow?: "visible" | "hidden" | "auto" | "scroll";
  overflowX?: "visible" | "hidden" | "auto" | "scroll";
  overflowY?: "visible" | "hidden" | "auto" | "scroll";
};

export type ResponsiveSectionColumnStyleList = {
  mobile?: SectionColumnStyle[];
  desktop?: SectionColumnStyle[];
};

export type SectionColumnWidths =
  | "equal"
  | "hug"
  | Array<number | string>
  | {
      mobile?: "equal" | "hug" | Array<number | string>;
      desktop?: "equal" | "hug" | Array<number | string>;
    };

export type SectionColumnAssignments =
  | Record<string, number>
  | { mobile?: Record<string, number>; desktop?: Record<string, number> };

export type SectionColumnGaps =
  | string
  | string[]
  | { mobile?: string | string[]; desktop?: string | string[] };

export type SectionColumnStyles = SectionColumnStyle[] | ResponsiveSectionColumnStyleList;

export type SectionColumnSpanMap = Record<string, number | "all">;

export type ResponsiveSectionColumnSpanMap = {
  mobile?: SectionColumnSpanMap;
  desktop?: SectionColumnSpanMap;
};

export type SectionColumnItemStyles =
  | Record<string, SectionColumnStyle>
  | {
      mobile?: Record<string, Record<string, unknown>>;
      desktop?: Record<string, Record<string, unknown>>;
    };

export type SectionColumnItemLayoutEntry = {
  column?: number;
  row?: number;
  columnSpan?: number | "all";
  rowSpan?: number;
  order?: number;
  alignX?: "left" | "center" | "right" | "stretch";
  alignY?: "top" | "center" | "bottom" | "stretch";
  zIndex?: number;
};

export type SectionColumnItemLayout =
  | Record<string, SectionColumnItemLayoutEntry>
  | {
      mobile?: Record<string, Record<string, unknown>>;
      desktop?: Record<string, Record<string, unknown>>;
    };
