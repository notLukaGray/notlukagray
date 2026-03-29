# Layout: Figma → page-builder JSON → CSS

This is the mapping cheat sheet for **element** vs **section** layout. Primary implementation: `src/page-builder/core/element-layout-utils/layout-style.ts`, `ElementLayoutWrapper.tsx`, `SectionContentBlock`, `use-section-base-styles.ts`.

## Elements

| Authoring (JSON)               | Runtime CSS / behavior               | Figma intuition                                                                    |
| ------------------------------ | ------------------------------------ | ---------------------------------------------------------------------------------- |
| `align` left / center / right  | `align-self` on flex item            | Counter-axis in row parent                                                         |
| `alignY` top / center / bottom | `margin-top` / `margin-bottom: auto` | Not the same as CSS `align-items` naming                                           |
| `textAlign`                    | `text-align`                         | Text layer alignment                                                               |
| `width` / `height` `hug`       | `fit-content` (and flex min tweaks)  | Figma Hug                                                                          |
| other `width` / `height`       | passed through                       | Use `100%` for fill—no magic `fill` token on elements                              |
| `constraints`                  | min/max width/height                 | Responsive **arrays** are ignored in sizing—resolve to a plain object before style |

`ElementLayoutWrapper` applies layout to the outer `<figure>`; the **inner** div is always `display:flex; align-items:center; justify-content:center`. Inner alignment in Figma may need a different structure or annotations.

## Sections (content blocks / columns)

| Authoring                               | Notes                                                                                              |
| --------------------------------------- | -------------------------------------------------------------------------------------------------- |
| `align` includes `full` (sections only) | Elements only support left / center / right                                                        |
| Section `margin*` (common paths)        | Often applied as **padding** on the section surface (`useSectionBaseStyles({ usePadding: true })`) |
| `contentWidth` / `contentHeight`        | Inner “card” area vs outer section—see `section-content-block-content-wrapper-style.ts`            |
| `initialX` / `initialY`                 | Absolute positioning path; interacts with `align` when X omitted                                   |
| Section `fixed`                         | Edge pinning + `fixedOffset` (not the same as element `layout.fixed` viewport centering)           |

## Exporter guidance

1. Prefer **tuple** `[mobile, desktop]` for responsive **element** layout values when exporting; server-side resolution is tuple-oriented in several passes.
2. Do not emit section-only `align: full` on **element** `align`.
3. When matching auto-layout “fill container”, emit explicit percentage or flex, not a fictional `fill` keyword on the element schema.

## Fixture

See `tools/figma-plugin/src/__fixtures__/layout-alignment-reference.json` for a minimal `contentBlock` shape used in tests.
