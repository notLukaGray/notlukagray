# Elements, sections, and layout

## The registry model

The runtime is registry-driven.

Main files:

- `src/page-builder/section/index.ts`
- `src/page-builder/elements/index.ts`
- `src/page-builder/elements/Shared/ElementRenderer.tsx`

A resolved section or element block becomes executable because its `type` maps to a registered component.

Extending the system means updating the registry, schemas, and renderer.

## Section types

Current section registry keys:

- `divider`
- `contentBlock`
- `scrollContainer`
- `sectionColumn`
- `sectionTrigger`
- `formBlock`
- `revealSection`

These come from `src/page-builder/section/index.ts` and are mirrored by schema constants in `src/page-builder/core/page-builder-schemas.ts`.

### `divider`

Structural spacer or viewport progress driver.
Often used as a timing surface, not just a blank gap.

### `contentBlock`

The basic section container for ordered elements.
This is a common workhorse section.

### `scrollContainer`

Used for horizontal or specialized scroll-driven compositions.

### `sectionColumn`

The higher-complexity layout section.
Supports columns, spans, item styles, assignments, and grid-like placement behaviors.

### `sectionTrigger`

A section whose primary job is event and trigger behavior.

### `formBlock`

Structured form container that resolves allowed handlers and field definitions through the page-builder system.

### `revealSection`

A section with reveal-driven visibility and interaction behavior.

## Element types

Current element registry keys:

- `elementHeading`
- `elementBody`
- `elementLink`
- `elementImage`
- `elementVideo`
- `elementVector`
- `elementSVG`
- `elementRichText`
- `elementRange`
- `elementVideoTime`
- `elementSpacer`
- `elementScrollProgressBar`
- `elementButton`
- `elementModel3D`
- `elementGroup`

Not every element is equally simple.

### Simple content elements

- heading
- body
- rich text
- spacer
- link

These mostly express authored content and layout.

### Media elements

- image
- video
- model3D
- svg
- vector

These touch delivery, motion, rendering complexity, or custom presentation logic.

### Interactive/control elements

- button
- range
- video time
- scroll progress bar
- group

These participate more directly in runtime state or module behavior.

## `ElementRenderer` is the choke point

`src/page-builder/elements/Shared/ElementRenderer.tsx` is where resolved element blocks become mounted components.

Its jobs include:

- breakpoint resolution for element props
- entrance wrapper handling
- motion wrapper handling
- exit wrapper handling
- pulling the correct component from the registry

This file keeps element execution behavior centralized and uniform.

## Layout model

The layout model is not one thing.
It is layered.

### Block-level layout

Most elements and sections carry width, height, alignment, margin, and related authored values.

### Section-level layout

Sections can define broader layout behavior:

- full-width and centered spans
- column counts and widths
- gaps
- item placement
- border radius and fill
- effects like blur or shadows
- sticky, fixed, scroll-speed, and progress-driven behaviors

### Grid and assignment layer

`sectionColumn` is where layout becomes much more system-like.

Relevant files include:

- `src/page-builder/core/section-column-layout.ts`
- `src/page-builder/core/section-column-layout-builders.ts`
- `src/page-builder/hooks/use-column-layout.ts`
- `src/page-builder/section/SectionColumn.tsx`

This part of the system provides authored layout richness without turning every page into custom React.

## Section traits and layout props

Sections share a common set of layout-related props and traits:

- layout: `width`, `height`, `minWidth`, `maxWidth`, `minHeight`, `maxHeight`, `align`
- positioning: `initialX`, `initialY` for absolute placement when needed
- background: single fills or layered fills with blend and opacity
- effects: blur, shadows, and related visual filters
- stacking: `zIndex`
- traits: `sticky` and `fixed` plus their offsets and positions

Many of these props support responsive values (arrays or mobile/desktop objects) and are normalized during expansion so the renderer sees a concrete layout shape.

## Responsive values

Responsive props are pervasive.
They can be arrays or mobile/desktop keyed objects depending on the surface.

Server-side breakpoint resolution exists so the client usually gets a prepared version of the authored values rather than doing all branching itself.

That keeps runtime behavior cleaner and improves consistency.

## Modules and groups

`elementGroup` and module-related code let authored content describe grouped and slotted systems.

Relevant files:

- `src/page-builder/elements/ElementModule.tsx`
- `src/page-builder/elements/ElementModule/`
- `src/page-builder/core/module-slot-utils.ts`
- `src/content/modules/video-player.json`

Modules are how interactive overlays and slotted behaviors stop being one-off components.
They represent reusable interaction systems, not just reusable visuals.

## Element layout reference

Elements share a common layout surface that controls how they occupy space inside sections:

- identity: optional `id` for lookup, overrides, and column assignment
- size: `width`, `height`, plus `minWidth`, `maxWidth`, `minHeight`, `maxHeight`
- alignment: `align`, `textAlign`, margins, and `zIndex`
- responsiveness: most sizing and alignment props can be responsive
- entrance animation: variants and timing fields that drive entrance behavior

Module-aware elements can also attach actions (such as play/pause or seek for video), visibility rules tied to module state, and wrapper styles. Those behaviors are mediated through the module slot system rather than arbitrary per-element code.

## How to add a new element

The correct path is:

1. add or extend the schema in `src/page-builder/core/page-builder-schemas/`
2. add any supporting types if needed
3. create the runtime component under `src/page-builder/elements/`
4. register it in `src/page-builder/elements/index.ts`
5. make sure asset or breakpoint resolution covers its authored fields if necessary
6. add tests if the element introduces non-trivial logic
7. document the authored contract

Skipping schema work and mounting a component directly creates undocumented runtime behavior.

## How to add a new section type

The path is similar:

1. define the schema shape
2. implement the section component
3. register it in `src/page-builder/section/index.ts`
4. make sure `SECTION_TYPE_STRINGS` knows about it
5. make sure expand and trigger logic can tolerate it
6. document how authored content should use it

## What not to do

- Do not create a one-off React page because one page has special needs
- Do not hide layout behavior in CSS classes only if it changes authored meaning
- Do not add new element fields without considering breakpoint and asset resolution
- Do not let keys and IDs be sloppy. Namespacing and lookup matter here

## Extension philosophy

The system should grow by adding new well-defined authored surfaces, not by letting runtime exceptions pile up.

This keeps the page-builder from degrading into ad-hoc special cases.
