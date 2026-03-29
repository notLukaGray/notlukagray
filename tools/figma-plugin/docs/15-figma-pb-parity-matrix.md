# Figma exporter ↔ page-builder parity matrix

Authoritative schemas live under [`src/page-builder/core/page-builder-schemas/`](../../../src/page-builder/core/page-builder-schemas/). This matrix summarizes what the Figma plugin emits today versus what Zod allows.

## Section block types

| PB `type`         | Exporter source                                                                            |
| ----------------- | ------------------------------------------------------------------------------------------ |
| `contentBlock`    | Default frame; auto-layout padding wrapper when needed                                     |
| `sectionColumn`   | `[pb: type=sectionColumn]` **or** layout grid / horizontal auto-layout heuristics          |
| `revealSection`   | `[pb: type=revealSection]` **or** vertical clipped frame + collapsed/revealed child naming |
| `scrollContainer` | `[pb: type=scrollContainer]` **or** `overflowDirection` ≠ `NONE` on frame                  |
| `divider`         | `[pb: type=divider]` **or** thin stroke-only / hairline frame heuristic                    |
| `formBlock`       | `[pb: type=formBlock]` **or** ≥2 input-like component instances + multiple children        |
| `sectionTrigger`  | Not emitted from frames — author in JSON                                                   |

`scrollContainer`: `scrollDirection` follows Figma `overflowDirection`; `scrollProgressTrigger` / `scrollProgressTriggerId` remain manual in JSON.

## Element types

| PB `type`                                                                            | Exporter                                                              |
| ------------------------------------------------------------------------------------ | --------------------------------------------------------------------- |
| `elementHeading` / `elementBody` / `elementLink`                                     | TEXT + style / annotations                                            |
| `elementImage` / `elementVideo` / `elementVector` / `elementSVG` / `elementRichText` | Shape / fills / mixed text                                            |
| `elementButton`                                                                      | Naming heuristic + component instances + `[pb: type=button]`          |
| `elementSpacer`                                                                      | `[pb: type=spacer]`                                                   |
| `elementGroup`                                                                       | Nested auto-layout / frame groups                                     |
| `elementInput`                                                                       | Input/search-like **INSTANCE** names                                  |
| `elementScrollProgressBar`                                                           | Wide shallow **INSTANCE**/frame whose name suggests progress/scrubber |
| `elementRive`                                                                        | Main component name suggests Rive / `.riv`                            |
| `elementRange`, `elementVideoTime`, `elementModel3D`                                 | Not converted — author in JSON                                        |

## Globals / backgrounds

| Artifact                             | ZIP / handoff                                                                                                                                                                                                                                                                                                                                     |
| ------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `globals.json` → `backgrounds.{key}` | Emitted as **`bgBlock`** shape: `backgroundImage` when `bgImage` exists, else `backgroundVariable` with one `layers[]` entry from section `fill`. Motion, transitions, and video layers are **not** inferred — extend in JSON ([`background-block-schemas.ts`](../../../src/page-builder/core/page-builder-schemas/background-block-schemas.ts)). |
| `globals.json` merge                 | **Not** auto-loaded by the Next app — see [14-globals-and-modules.md](./14-globals-and-modules.md).                                                                                                                                                                                                                                               |

## Annotations

- Multiple `[pb: …]` blocks in one layer name **merge** (later keys override).
- Figma **dev annotations** on a node are **merged** with name annotations (panel values override name keys on conflict).
- Section frames use the same `parseNodeAnnotations` path as elements (not name-only).

## Widget inspection

The widget snapshot includes overflow direction, primary fill kind, variable-binding flag, and (for TEXT) linked style name / font size to steer designers toward **Figma-native** signals before copy-pasting `[pb:]`.

## See also

- [13-layout-figma-to-pb.md](./13-layout-figma-to-pb.md) — align / sizing mapping
- [12-page-builder-expand-parity.md](./12-page-builder-expand-parity.md) — ids after `expandPageBuilder`
