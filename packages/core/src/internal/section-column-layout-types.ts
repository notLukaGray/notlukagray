export const DEFAULT_COLUMN_WIDTHS = "hug" as const;

export type ColumnCountInput = number | { mobile?: number; desktop?: number };
export type ElementOrderInput = string[] | { mobile?: string[]; desktop?: string[] } | undefined;
export type ColumnAssignmentsInput =
  | Record<string, number>
  | { mobile?: Record<string, number>; desktop?: Record<string, number> };
export type ColumnGapsInput =
  | string
  | string[]
  | { mobile?: string | string[]; desktop?: string | string[] }
  | undefined;
export type ColumnWidthsValueInput =
  | typeof DEFAULT_COLUMN_WIDTHS
  | "equal"
  | (number | "hug" | "equal" | string)[];
export type ColumnWidthsInput =
  | ColumnWidthsValueInput
  | { mobile?: ColumnWidthsValueInput; desktop?: ColumnWidthsValueInput };
export type ResolvedColumnWidthsInput = ColumnWidthsValueInput | undefined;

export type ColumnStyleInput = {
  borderRadius?: string;
  border?: { width?: string; style?: string; color?: string };
  fill?: string;
  padding?: string;
  gap?: string;
  alignItems?: "flex-start" | "center" | "flex-end" | "stretch";
  justifyContent?:
    | "flex-start"
    | "center"
    | "flex-end"
    | "space-between"
    | "space-around"
    | "space-evenly";
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
export type ColumnStylesInput =
  | ColumnStyleInput[]
  | { mobile?: ColumnStyleInput[]; desktop?: ColumnStyleInput[] }
  | undefined;
export type ColumnSpanValueInput = Record<string, number | "all">;
export type ColumnSpanInput =
  | ColumnSpanValueInput
  | { mobile?: ColumnSpanValueInput; desktop?: ColumnSpanValueInput }
  | undefined;
export type ResolvedColumnSpanInput = ColumnSpanValueInput | undefined;

export type ItemStyleInput = {
  borderRadius?: string;
  border?: { width?: string; style?: string; color?: string };
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
export type ItemStylesValueInput = Record<string, ItemStyleInput>;
export type ItemStylesInput =
  | ItemStylesValueInput
  | { mobile?: ItemStylesValueInput; desktop?: ItemStylesValueInput }
  | undefined;
export type ResolvedItemStylesInput = ItemStylesValueInput | undefined;
export type GridModeValue = "columns" | "grid";
export type GridModeInput =
  | GridModeValue
  | { mobile?: GridModeValue; desktop?: GridModeValue }
  | undefined;
export type ItemLayoutEntryInput = {
  column?: number;
  row?: number;
  columnSpan?: number | "all";
  rowSpan?: number;
  order?: number;
  alignX?: "left" | "center" | "right" | "stretch";
  alignY?: "top" | "center" | "bottom" | "stretch";
  zIndex?: number;
};
export type ItemLayoutValueInput = Record<string, ItemLayoutEntryInput>;
export type ItemLayoutInput =
  | ItemLayoutValueInput
  | { mobile?: ItemLayoutValueInput; desktop?: ItemLayoutValueInput }
  | undefined;
export type ResolvedItemLayoutInput = ItemLayoutValueInput | undefined;

export type ElementWithId = { id?: string; [key: string]: unknown };
