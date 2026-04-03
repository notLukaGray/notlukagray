export type ElementDevBatchId =
  | "batch-1-content"
  | "batch-2-interaction"
  | "batch-3-media"
  | "batch-4-graphics"
  | "batch-5-utility";

export type ElementDevEditor =
  | { kind: "placeholder" }
  | { kind: "styleScope"; scope: "elements-button" | "elements-rich-text" }
  | { kind: "imageVariants" }
  | { kind: "headingDev" }
  | { kind: "bodyDev" }
  | { kind: "linkDev" };

export type ElementDevEntry = {
  slug: string;
  type: string;
  navLabel: string;
  title: string;
  description: string;
  note?: string;
  batch: ElementDevBatchId;
  editor: ElementDevEditor;
  status: "live" | "scaffold";
};

export const ELEMENT_DEV_BATCH_META: Record<ElementDevBatchId, { label: string; blurb: string }> = {
  "batch-1-content": {
    label: "Batch 1 · Content",
    blurb: "Heading, body, and link defaults establish the baseline reading system.",
  },
  "batch-2-interaction": {
    label: "Batch 2 · Interaction",
    blurb: "Buttons and form controls define baseline interaction behavior.",
  },
  "batch-3-media": {
    label: "Batch 3 · Media",
    blurb: "Image/video defaults align media presentation and playback behavior.",
  },
  "batch-4-graphics": {
    label: "Batch 4 · Graphics + Motion",
    blurb: "Vector/SVG/3D/Rive defaults govern visual and motion-heavy elements.",
  },
  "batch-5-utility": {
    label: "Batch 5 · Utility",
    blurb: "Supporting utility elements that complete builder ergonomics.",
  },
};

export const ELEMENT_DEV_BATCH_ORDER: ElementDevBatchId[] = [
  "batch-1-content",
  "batch-2-interaction",
  "batch-3-media",
  "batch-4-graphics",
  "batch-5-utility",
];

type EntrySeed = Omit<ElementDevEntry, "editor" | "status"> & {
  editor?: ElementDevEditor;
  status?: ElementDevEntry["status"];
};

function defineEntry(seed: EntrySeed): ElementDevEntry {
  return {
    ...seed,
    editor: seed.editor ?? { kind: "placeholder" },
    status: seed.status ?? "scaffold",
  };
}

/**
 * Source of truth for the Elements area in /dev.
 * Intentionally excludes the module/group element per current roadmap.
 */
export const ELEMENT_DEV_ENTRIES: ElementDevEntry[] = [
  defineEntry({
    slug: "heading",
    type: "elementHeading",
    navLabel: "Heading",
    title: "Elements · Heading",
    description:
      "Preset heading variants (display / section / label), live preview, layout + runtime passthrough, and JSON export.",
    note: "Variant presets are sourced from pbBuilderDefaultsV1.elements.heading.",
    batch: "batch-1-content",
    editor: { kind: "headingDev" },
    status: "live",
  }),
  defineEntry({
    slug: "body",
    type: "elementBody",
    navLabel: "Body",
    title: "Elements · Body",
    description:
      "Body presets (lead / standard / fine), typography level, preview, and export — defaults live in pbBuilderDefaultsV1.elements.body.",
    batch: "batch-1-content",
    editor: { kind: "bodyDev" },
    status: "live",
  }),
  defineEntry({
    slug: "link",
    type: "elementLink",
    navLabel: "Link",
    title: "Elements · Link",
    description:
      "Link presets (inline / emphasis / nav), body vs heading copy, link color tokens, preview, and export — defaults live in pbBuilderDefaultsV1.elements.link.",
    batch: "batch-1-content",
    editor: { kind: "linkDev" },
    status: "live",
  }),
  defineEntry({
    slug: "button",
    type: "elementButton",
    navLabel: "Button",
    title: "Elements · Button",
    description:
      "Button defaults define baseline spacing and radius for wrapper-less button chrome.",
    note: "Typography styles are still chosen in Foundations → Fonts.",
    batch: "batch-2-interaction",
    editor: { kind: "styleScope", scope: "elements-button" },
    status: "live",
  }),
  defineEntry({
    slug: "rich-text",
    type: "elementRichText",
    navLabel: "Rich Text",
    title: "Elements · Rich Text",
    description:
      "Rich text defaults set rhythm and readability for content blocks when local overrides are not set.",
    batch: "batch-1-content",
    editor: { kind: "styleScope", scope: "elements-rich-text" },
    status: "live",
  }),
  defineEntry({
    slug: "image",
    type: "elementImage",
    navLabel: "Image",
    title: "Elements · Image",
    description:
      "Image defaults will be configured here (radius, object fit, base image behavior, and entry/exit motion presets).",
    note: "Presets focus on builder image usage (hero/inline/full-cover/feature). SVG/vector can handle logo/icon cases.",
    batch: "batch-3-media",
    editor: { kind: "imageVariants" },
    status: "live",
  }),
  defineEntry({
    slug: "video",
    type: "elementVideo",
    navLabel: "Video",
    title: "Elements · Video",
    description:
      "Video defaults will be configured here (poster behavior, playback controls, and layout framing).",
    batch: "batch-3-media",
  }),
  defineEntry({
    slug: "video-time",
    type: "elementVideoTime",
    navLabel: "Video Time",
    title: "Elements · Video Time",
    description:
      "Video time defaults will be configured here (format style, text level, and timing display options).",
    batch: "batch-3-media",
  }),
  defineEntry({
    slug: "vector",
    type: "elementVector",
    navLabel: "Vector",
    title: "Elements · Vector",
    description:
      "Vector defaults will be configured here (color behavior, scaling, and interaction states).",
    batch: "batch-4-graphics",
  }),
  defineEntry({
    slug: "svg",
    type: "elementSVG",
    navLabel: "SVG",
    title: "Elements · SVG",
    description:
      "SVG defaults will be configured here (markup rendering behavior, transforms, and link interactions).",
    batch: "batch-4-graphics",
  }),
  defineEntry({
    slug: "input",
    type: "elementInput",
    navLabel: "Input",
    title: "Elements · Input",
    description:
      "Input defaults will be configured here (placeholder behavior, icon usage, and baseline field styling).",
    batch: "batch-2-interaction",
  }),
  defineEntry({
    slug: "range",
    type: "elementRange",
    navLabel: "Range",
    title: "Elements · Range",
    description:
      "Range slider defaults will be configured here (track, fill, thumb sizing, and interaction response).",
    batch: "batch-2-interaction",
  }),
  defineEntry({
    slug: "spacer",
    type: "elementSpacer",
    navLabel: "Spacer",
    title: "Elements · Spacer",
    description:
      "Spacer defaults will be configured here (spacing utility behavior and responsive sizing defaults).",
    batch: "batch-5-utility",
  }),
  defineEntry({
    slug: "scroll-progress-bar",
    type: "elementScrollProgressBar",
    navLabel: "Scroll Progress",
    title: "Elements · Scroll Progress Bar",
    description:
      "Scroll progress defaults will be configured here (track/fill style, height, and scroll offset behavior).",
    batch: "batch-5-utility",
  }),
  defineEntry({
    slug: "model-3d",
    type: "elementModel3D",
    navLabel: "Model 3D",
    title: "Elements · Model 3D",
    description:
      "3D model defaults will be configured here (scene behavior, interaction controls, and baseline presentation).",
    batch: "batch-4-graphics",
  }),
  defineEntry({
    slug: "rive",
    type: "elementRive",
    navLabel: "Rive",
    title: "Elements · Rive",
    description:
      "Rive defaults will be configured here (state machine wiring, playback defaults, and layout behavior).",
    batch: "batch-4-graphics",
  }),
];

export function getElementDevEntryBySlug(slug: string): ElementDevEntry | null {
  return ELEMENT_DEV_ENTRIES.find((entry) => entry.slug === slug) ?? null;
}

export function getElementDevPath(slug: string): string {
  return `/dev/elements/${slug}`;
}

export function groupElementDevEntriesByBatch(): Record<ElementDevBatchId, ElementDevEntry[]> {
  return ELEMENT_DEV_ENTRIES.reduce(
    (acc, entry) => {
      acc[entry.batch].push(entry);
      return acc;
    },
    {
      "batch-1-content": [],
      "batch-2-interaction": [],
      "batch-3-media": [],
      "batch-4-graphics": [],
      "batch-5-utility": [],
    } as Record<ElementDevBatchId, ElementDevEntry[]>
  );
}
