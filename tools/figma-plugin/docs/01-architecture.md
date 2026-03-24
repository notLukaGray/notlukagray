# Plugin Architecture

Figma plugins run in two isolated environments that communicate only via `postMessage`. Understanding this split is necessary when modifying either thread.

---

## Two-thread model

**Main thread** (`src/main.ts`): a sandboxed JavaScript environment with full access to the `figma.*` API. No DOM, no `fetch`, no network. All reading of node geometry, fills, effects, reactions, and async asset export (`figma.exportAsync`, `figma.getImageByHash`) happens here.

**UI thread** (`src/ui.html` + `src/ui.ts`): a browser iframe with full DOM and network access. No `figma.*` API. Handles the export button, progress display, the preview panel, per-frame overrides, ZIP assembly via JSZip, and the file download trigger.

---

## Message protocol

Defined in `src/types/figma-plugin.ts`.

```ts
/** Message sent from UI thread to main thread. */
export type UIToMainMessage =
  | {
      type: "export";
      targetOverrides?: Record<string, string>;
      annotationOverrides?: Record<string, Record<string, string>>;
      cdnPrefixOverrides?: Record<string, string>;
    }
  | { type: "close" };

/** Message sent from main thread to UI thread. */
export type MainToUIMessage =
  | {
      type: "result";
      payload: ExportResult;
      errorCount: number;
      warningCount: number;
      infoCount: number;
      errors: string[];
    }
  | { type: "error"; message: string }
  | { type: "progress"; message: string }
  | {
      type: "preview";
      items: Array<{
        id: string;
        name: string;
        target: ExportTarget;
        issues: FrameIssue[];
        responsivePairKey?: string;
      }>;
    };
```

Sequence for a normal export:

1. User clicks Export → UI collects per-frame overrides from `localStorage` and sends `{ type: "export", targetOverrides, annotationOverrides, cdnPrefixOverrides }`.
2. Main thread sends one or more `progress` messages as it processes frames.
3. Main thread sends a `preview` message listing all detected frames, their resolved type badges, and output paths. Responsive pairs appear as single entries with the `responsivePairKey` field set.
4. After conversion finishes, main thread sends `{ type: "result", payload: ExportResult, ... }`.
5. UI assembles the ZIP and shows the Download button.

---

## Build pipeline

`build.js` uses esbuild to:

1. Compile `src/main.ts → dist/main.js` (bundled, no DOM APIs, targets Figma's sandbox).
2. Compile `src/ui.ts` to an inline script and inject it into `src/ui.html` by replacing the `/*__UI_SCRIPT__*/` placeholder, producing `dist/ui.html`.

Manifest entry points:

```json
{
  "main": "dist/main.js",
  "ui": "dist/ui.html"
}
```

---

## ConversionContext

A mutable state object threaded through every converter function. Created once per export run in `main.ts`, shared across all frame conversions.

```ts
export interface ConversionContext {
  assets: AssetEntry[]; // accumulated binary assets for the ZIP
  warnings: string[]; // non-fatal issues; written to export-notes.txt
  assetCounter: number; // global counter; incremented each time a new asset is registered
  usedIds: Set<string>; // all element IDs emitted; used to enforce uniqueness
  usedAssetKeys: Set<string>; // all asset keys emitted; used to prevent filename collisions
  cdnPrefix: string; // per-frame CDN prefix set from the UI; prepended to all asset keys
}
```

Converters:

- Push to `ctx.assets` when exporting an image or SVG.
- Push to `ctx.warnings` for anything that cannot be represented faithfully (instead of throwing).
- Use `ctx.usedIds` via `ensureUniqueId()` — never generate IDs manually.
- Use `buildAssetKey(rawName, ctx)` for asset filenames — handles CDN prefix + collision detection.

---

## Conversion pipeline

1. **Selection filter** — `figma.currentPage.selection` filtered to `FrameNode` only. Non-frame selections are ignored silently.
2. **Sort** — frames sorted top-to-bottom then left-to-right by `y`/`x` position. A 2 px threshold collapses near-identical rows so minor vertical misalignment does not reorder visually adjacent frames.
3. **Responsive pair detection** — frames with `Section[Desktop]/` or `Section[Mobile]/` prefixes are separated. Unpaired frames are warned and skipped.
4. **Preview** — `detectExportTarget(frame)` called for each frame to produce the preview list sent to the UI.
5. **Per-frame conversion** — `convertFrameToSection(frame, ctx)` called for each frame in sorted order. Per-frame `cdnPrefix` is set from UI overrides before each call.
6. **Responsive merge** — paired `Section[Desktop]/*` + `Section[Mobile]/*` frames are each converted independently, then merged by `mergeResponsiveSections`. Differing responsive fields become `[mobileValue, desktopValue]` tuples.
7. **Section type routing** — inside `convertFrameToSection`: annotation check first → `isColumnLayout` check → `isRevealLayout` check → default `contentBlock`.
8. **Child walk** — `convertNode(child, ctx)` called recursively for every descendant.
9. **Result routing** — each converted section placed in the correct bucket (`pages`, `presets`, `modals`, `modules`, or `globals`) of the `ExportResult` object based on `detectExportTarget`.
10. **Post-message** — completed `ExportResult` sent to UI thread.
11. **ZIP assembly** — UI thread receives result, packages all JSON files, assets, and `export-notes.txt` into a ZIP via JSZip.

---

## detectExportTarget

The function `detectExportTarget(node)` in `main.ts` reads the frame name, splits on the first `/`, and maps the prefix to an `ExportTargetType`:

| Name prefix        | ExportTargetType      | Notes                                            |
| ------------------ | --------------------- | ------------------------------------------------ |
| `page`             | `"page"`              |                                                  |
| `section`          | `"preset"`            |                                                  |
| `section[desktop]` | `"preset"`            | `responsiveRole: "desktop"` — paired with mobile |
| `section[mobile]`  | `"preset"`            | `responsiveRole: "mobile"` — paired with desktop |
| `modal`            | `"modal"`             |                                                  |
| `module`           | `"module"`            |                                                  |
| `button`           | `"global-button"`     |                                                  |
| `background`       | `"global-background"` |                                                  |
| `global`           | `"global-element"`    |                                                  |
| _(no match)_       | `"page"`              |                                                  |

Prefix matching is case-insensitive. The portion after `/` is slugified to produce the output key.

---

## Source file map

```
src/
  main.ts                        plugin entry point; orchestrates conversion and routing
  ui.ts / ui.html                download UI, per-frame overrides, ZIP assembly, preview panel
  types/
    figma-plugin.ts              ConversionContext, ExportResult, message types, AssetEntry
    page-builder.ts              TypeScript mirrors of all output shapes
  converters/
    node-to-section.ts           top-level frame → section block (type router)
    node-to-element.ts           SceneNode → element block (type router + annotation application)
    annotations.ts               [pb: ...] parser, trigger shorthand, interaction parser, style annotation
    section-column.ts            horizontal grid → sectionColumn
    section-reveal.ts            annotated frame → revealSection
    section-triggers.ts          annotation keys → trigger/effect/behavioural props
    responsive-merge.ts          merges Section[Desktop]/* + Section[Mobile]/* pairs
    motion.ts                    entrance/exit/trigger annotation → motionTiming object
    prototype-interactions.ts    Figma reactions → ElementInteractions
    component-variants.ts        COMPONENT_SET → interactive elementGroup
    component-props.ts           Figma INSTANCE component properties extraction
    fills.ts                     Paint → CSS color / gradient / CSS var()
    layout.ts                    dimensions, auto-layout, borders, corner radius, opacity
    effects.ts                   box-shadow, filter, backdrop-filter
    typography.ts                text style extraction, heading/body level heuristics
    text.ts                      TextNode → elementHeading / elementBody / elementLink
    image.ts                     image-fill node → elementImage + PNG export
    video.ts                     video node detection and conversion → elementVideo
    button.ts                    button detection and conversion → elementButton
    index.ts                     barrel exports
  utils/
    asset-key.ts                 buildAssetKey — CDN prefix + collision detection
    color.ts                     figmaRgbToHex, figmaPaintToCSS
    css.ts                       toPx, figmaRadiusToCSS
    slugify.ts                   slugify, ensureUniqueId
```

---

[Back to README](./README.md)
