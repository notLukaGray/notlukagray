# Dev workbench session (`workbench-session-v1`)

All dev workbench tools (colors, fonts, style, and element labs) share one **canonical** `localStorage` entry:

- **Key:** `workbench-session-v1`
- **Shape:** `{ "v": 1, … }` with optional top-level slices:
  - **`colors`** — M1 color tool payload (same structure as the former `pb-color-tool-m1` value).
  - **`fonts`** — Font dev prefs (`{ "v": 1, "configs", "slotPreviewMode", "typeScale", "previewSampleText" }`, formerly `notlukagray-font-dev-prefs-v1`).
  - **`style`** — Style tool v2 payload (`{ "v": 2, "seeds", "locks", "guidelines" }`, formerly `pb-style-tool-v2` / migrated from `pb-style-tool-guidelines-v1`).
  - **`elements`** — Optional object with **`image`**, **`body`**, **`heading`**, **`link`** keys; each value matches the JSON shape previously stored under the per-element legacy keys (e.g. `pb-element-image-dev-v1`).

Helpers live in `workbench-session.ts` (`getWorkbenchSession`, `patchWorkbench*`, `clearWorkbench*`, etc.).

## Baselines

- Fresh sessions and total reset use **neutral dev baselines** (foundation-authoring defaults, not production defaults).
- `Import Prod` in the workbench nav replaces the live session with values derived from current production config.

## Migration from legacy keys

On `getWorkbenchSession()`, any **missing** slice is filled from its legacy key once, then the merged snapshot is written back to `workbench-session-v1`. Tools also **remove** the corresponding legacy key when they save, so new writes go only through the workbench.

If the workbench key is deleted but legacy keys still exist, the next load **rehydrates** from those legacy entries the same way.

## Cross-tab updates

Touch points listen for the `storage` event on `workbench-session-v1` so another tab’s edits appear after the browser syncs `localStorage`.
