# Page Builder Defaults Roadmap

## Objective

Move from one flat style bucket to a domain model that mirrors page-builder runtime:

1. `colors` + `fonts` establish foundations.
2. `layout defaults` (sections/modules/frames) derive from foundations.
3. `element defaults` (rich text, button variants, image, etc.) build on both.

The result should reduce repeated JSON authoring and make defaults feel incremental.

Current scope note:

- `module builder` and `modal builder` are intentionally backburnered for now.
- We keep this track focused on foundations -> layout -> elements.

## Target Model

- `foundations`
  - alignment
  - spacing base
  - radius base
  - (existing color + font configs stay source-of-truth)
- `sections`
  - section-level copy/layout defaults
- `modules.frame`
  - frame gap, direction, align/justify, wrap, padding, radius
- `elements`
  - `richText` rhythm + heading/list/code spacing
  - `button` base chrome + named variants (`default`, `accent`, `ghost`)
  - `image` defaults (radius now; more later)

Compatibility stays via adapter:

- grouped model -> legacy `PbContentGuidelines` flat shape

## UX Flow (Progressive Setup)

1. `/dev/colors`

- user sets brand/theme seeds

2. `/dev/fonts`

- user sets family + type scale

3. `/dev/style/layout`

- user sets section/module/frame behavior
- defaults are proposed from spacing + alignment seeds

4. `/dev/style/elements`

- user sets per-element defaults and variants
- typography selectors reference font/type-scale choices

5. `/dev/style/review`

- preview matrix for sections/modules/elements
- export commit-ready config

## Linking Rules (Guideposts, Not Boxes)

Keep links as explicit toggles:

- `Link radius across modules/buttons/images` (one control, multiple targets)
- `Button variant typography from type scale` (pick body/heading slot, not hardcoded classes)
- `Frame spacing informs rich text rhythm` (optional seed link with per-token lock overrides)

Use existing seed+lock behavior:

- unlocked tokens follow seeds
- locked tokens stay custom

## Rollout Plan

1. Foundation (now)

- add grouped defaults schema + compatibility adapter + tests
- make alignment/spacing/radius a single source-of-truth

2. Integrate

- read runtime defaults from grouped config while still exporting flat shape

3. Split `/dev/style`

- separate tabs/pages: `layout`, `elements`, `review`

4. Add element variant defaults

- start with `elementButton` named variants, then expand

5. Add linking controls

- radius and typography links first (highest leverage)
