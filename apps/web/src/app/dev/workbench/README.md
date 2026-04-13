# Dev workbench session (`workbench-session-v2`)

All dev workbench tools (colors, fonts, style, and element labs) share one **canonical** `localStorage` entry:

- **Key:** `workbench-session-v2`
- **Shape:** `{ "v": 2, … }` with optional top-level slices:
  - **`colors`** — M1 color tool payload (same structure as the former `pb-color-tool-m1` value).
  - **`fonts`** — Font dev prefs (`{ "v": 2, "configs", "slotPreviewMode", "typeScale", "previewSampleText", "lineHeightScale", "letterSpacingScale" }`, formerly `notlukagray-font-dev-prefs-v1`).
  - **`style`** — Style tool v3 payload (`{ "v": 3, "seeds", "locks", "guidelines", ...foundationSlices }`, formerly `pb-style-tool-v2` / migrated from `pb-style-tool-guidelines-v1`).
  - **`elements`** — Optional object with per-element defaults for all live editors:
    - `image`, `body`, `heading`, `link`
    - `button`, `richText`, `input`, `range`
    - `video`, `videoTime`, `vector`, `svg`
    - `model3d`, `rive`, `spacer`, `scrollProgressBar`

Helpers live in `workbench-session.ts` (`getWorkbenchSession`, `patchWorkbench*`, `clearWorkbench*`, etc.).

## Baselines

- Fresh sessions and total reset use **neutral dev baselines** (foundation-authoring defaults, not production defaults).
- `Import Prod` in the workbench nav replaces the live session with values derived from current production config.

## Migration from legacy keys

On `getWorkbenchSession()`, any **missing** slice is filled from defaults and the merged snapshot is written back to `workbench-session-v2`. Element/style/color/font editors still support **legacy read fallback** (old per-tool keys) so previously saved browser state can be recovered, and corresponding legacy keys are removed when session-backed writes occur.

If the workbench key is deleted but legacy keys still exist, the next load **rehydrates** from those legacy entries the same way.

## Cross-tab updates

Touch points listen for the `storage` event on `workbench-session-v2` so another tab’s edits appear after the browser syncs `localStorage`.

## Reset/import/export/snapshots

- **Total reset** clears the canonical workbench session, snapshots, and all legacy tool/element keys.
- **Import/Export scopes** remain `all`, `colors`, `fonts`, `style`, `elements`.
- **Snapshots** support the same scope model and run diff-before-apply checks for safe restore.
