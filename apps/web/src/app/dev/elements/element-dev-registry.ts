/* eslint-disable max-lines */

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
  | { kind: "buttonDev" }
  | { kind: "richTextDev" }
  | { kind: "linkDev" }
  | { kind: "videoDev" }
  | { kind: "videoTimeDev" }
  | { kind: "vectorDev" }
  | { kind: "svgDev" }
  | { kind: "model3dDev" }
  | { kind: "riveDev" }
  | { kind: "inputDev" }
  | { kind: "rangeDev" }
  | { kind: "spacerDev" }
  | { kind: "scrollProgressBarDev" };

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
      "Heading variants (display / section / label), live preview, layout + runtime passthrough, and JSON export.",
    note: "Variant defaults start from the dev neutral foundation baseline.",
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
      "Body variants (lead / standard / fine), typography level, preview, and export — defaults start from the dev neutral foundation baseline.",
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
      "Link variants (inline / emphasis / nav), body vs heading copy, link color tokens, preview, and export — defaults start from the dev neutral foundation baseline.",
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
    editor: { kind: "buttonDev" },
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
    editor: { kind: "richTextDev" },
    status: "live",
  }),
  defineEntry({
    slug: "image",
    type: "elementImage",
    navLabel: "Image",
    title: "Elements · Image",
    description:
      "Image defaults will be configured here (radius, object fit, base image behavior, and entry/exit motion presets).",
    note: "Variants focus on builder image usage (hero/inline/full-cover/feature). SVG/vector can handle logo/icon cases.",
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
      "Video defaults (object fit, aspect ratio, playback flags, and layout framing) for inline, full-cover, and hero use cases.",
    note: "Variant defaults start from the dev neutral foundation baseline.",
    batch: "batch-3-media",
    editor: { kind: "videoDev" },
    status: "live",
  }),
  defineEntry({
    slug: "video-time",
    type: "elementVideoTime",
    navLabel: "Video Time",
    title: "Elements · Video Time",
    description:
      "Video time defaults (layout sizing and motion) for the time display element inside custom video player layouts.",
    note: "Content is fully driven by VideoControlContext at runtime.",
    batch: "batch-3-media",
    editor: { kind: "videoTimeDev" },
    status: "live",
  }),
  defineEntry({
    slug: "vector",
    type: "elementVector",
    navLabel: "Vector",
    title: "Elements · Vector",
    description:
      "Vector defaults: color behavior, viewBox, shapes, scaling, and motion. Variant defaults start from neutral dev baseline.",
    batch: "batch-4-graphics",
    editor: { kind: "vectorDev" },
    status: "live",
  }),
  defineEntry({
    slug: "svg",
    type: "elementSVG",
    navLabel: "SVG",
    title: "Elements · SVG",
    description:
      "SVG defaults: raw markup rendering, transforms, and motion presets. Variant defaults start from neutral dev baseline.",
    batch: "batch-4-graphics",
    editor: { kind: "svgDev" },
    status: "live",
  }),
  defineEntry({
    slug: "input",
    type: "elementInput",
    navLabel: "Input",
    title: "Elements · Input",
    description:
      "Input variants (default / compact / minimal), placeholder, icon toggle, color, layout, and export. Interactive preview lets you type in the field.",
    batch: "batch-2-interaction",
    editor: { kind: "inputDev" },
    status: "live",
  }),
  defineEntry({
    slug: "range",
    type: "elementRange",
    navLabel: "Range",
    title: "Elements · Range",
    description:
      "Range slider variants (default / slim / accent) with track/fill/thumb styling, min/max/step, and interactive preview.",
    batch: "batch-2-interaction",
    editor: { kind: "rangeDev" },
    status: "live",
  }),
  defineEntry({
    slug: "spacer",
    type: "elementSpacer",
    navLabel: "Spacer",
    title: "Elements · Spacer",
    description:
      "Spacer variants (sm / md / lg) for layout rhythm. Preview shows the spacer height with a dashed guide alongside adjacent content blocks.",
    batch: "batch-5-utility",
    editor: { kind: "spacerDev" },
    status: "live",
  }),
  defineEntry({
    slug: "scroll-progress-bar",
    type: "elementScrollProgressBar",
    navLabel: "Scroll Progress",
    title: "Elements · Scroll Progress Bar",
    description:
      "Progress bar variants (default / minimal / bold) with height, fill, and track colors. Preview shows the bar at a static fill to visualise the style.",
    batch: "batch-5-utility",
    editor: { kind: "scrollProgressBarDev" },
    status: "live",
  }),
  defineEntry({
    slug: "model-3d",
    type: "elementModel3D",
    navLabel: "Model 3D",
    title: "Elements · Model 3D",
    description:
      "3D model defaults: animation behavior, layout framing, and baseline presentation. Deep scene/model config is authored in the Custom JSON panel.",
    note: "Live preview requires a real .glb file reference — use Custom JSON to paste a full element block.",
    batch: "batch-4-graphics",
    editor: { kind: "model3dDev" },
    status: "live",
  }),
  defineEntry({
    slug: "rive",
    type: "elementRive",
    navLabel: "Rive",
    title: "Elements · Rive",
    description:
      "Rive defaults: state machine wiring, playback defaults, fit mode, aspect ratio, and animation behavior.",
    note: "Live preview requires a real .riv file reference — use Custom JSON to paste a full element block.",
    batch: "batch-4-graphics",
    editor: { kind: "riveDev" },
    status: "live",
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
