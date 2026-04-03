export const TYPOGRAPHY_SETTINGS_CATEGORY_ORDER = [
  "content",
  "layout",
  "traits",
  "animation",
  "runtime",
] as const;

export type TypographySettingsCategoryKey = (typeof TYPOGRAPHY_SETTINGS_CATEGORY_ORDER)[number];

export type TypographyVisibleCategories = Record<TypographySettingsCategoryKey, boolean>;

export const TYPOGRAPHY_CATEGORY_LABELS: Record<TypographySettingsCategoryKey, string> = {
  content: "Content",
  layout: "Layout",
  traits: "Traits",
  animation: "Animation",
  runtime: "Runtime",
};

export const DEFAULT_TYPOGRAPHY_VISIBLE_CATEGORIES: TypographyVisibleCategories = {
  content: false,
  layout: false,
  traits: false,
  animation: false,
  runtime: false,
};
