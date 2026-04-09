# Dev 0.5 — Architecture Plan

## What This Document Is

A complete specification for evolving the `/dev` workbench into a fully formed foundations-first, element-and-layout editor that:

1. Exposes every controllable schema field through a typed input system
2. Wraps previews in the correct page-builder context so what you see reflects what the renderer will produce
3. Derives every element and layout default from foundations — not from hard-coded raw values
4. Produces data shapes that are correct for the page-builder schema and safe for a future drag-and-drop builder

This is a plan document only. Nothing in the codebase is modified here.

---

## Guiding Principles

**Foundations are the ground truth.** Colors, typography, spacing, shadows, transitions, and motion are defined once and cascade into elements and layout. You do not pull these values from arbitrary references in the codebase — you pull them from the workbench session. An element knows nothing about `--pb-primary` until foundations say what `--pb-primary` is.

**The override model is explicit.** You can override any foundation value on any element or section, but:

- Common overrides (color, fill, stroke) surface as first-class controls
- Rare overrides (z-index, letter-spacing, cursor) sit behind an **Overrides** drawer
- Dangerous overrides (wrapperStyle raw CSS) require a forced checkbox confirmation before unlocking

**Preview context is real context.** Every preview wrapper injects the layout signals, CSS variables, breakpoints, and provider state that the renderer uses. A button previewed in `/dev/elements/button` behaves exactly as it would inside a live page-builder frame.

**Custom mode is output-only.** Custom lets a user manipulate all variant fields visually and receive the correct JSON back. It does not write back to any variant. It does not pollute the workbench session.

**Data shape is serializable and addressable.** Every piece of state produced by the workbench maps 1:1 to a page-builder schema shape. There are no local UI-only fields in any export. IDs are stable and unique so a future drag-and-drop layer can reference them directly.

---

## Architecture Overview

```
Workbench Session (localStorage)
├── foundations/
│   ├── colors          → CSS variables injected globally
│   ├── typography      → font slots + type scale + spacing scale
│   ├── spacing         → named spacing steps + radius scale
│   ├── shadows         → named shadow levels
│   ├── motion          → duration scale + easing presets
│   └── breakpoints     → responsive breakpoint definitions
├── elements/
│   ├── button          → per-variant defaults (derived from foundations)
│   ├── heading         → per-variant defaults
│   ├── body            → per-variant defaults
│   ├── link            → per-variant defaults
│   ├── image           → per-variant defaults
│   ├── video           → per-variant defaults
│   ├── input           → per-variant defaults
│   ├── range           → per-variant defaults
│   └── ...
└── layout/
    ├── contentBlock    → frame defaults (derived from foundations)
    ├── sectionColumn   → grid defaults
    ├── scrollContainer → scroll defaults
    └── section         → section base defaults
```

Foundations changes cascade into element and layout defaults at read time (not write time). The derivation is a pure function: `foundations → elementDefaults`. Nothing in elements stores a copy of a foundations value — it stores a reference or inherits it.

---

## Part A — Foundations

### A1. Colors

**What already exists:** M1 color seed system (primary, secondary, accent, link, linkHover, linkActive) plus derived semantic tokens for surfaces, text, borders, status, and charts.

**What the editor should expose:**

| Control                  | Input Type               | Notes                                                         |
| ------------------------ | ------------------------ | ------------------------------------------------------------- |
| Brand seeds (light/dark) | Color picker (Oklch)     | 4 seeds × 2 themes                                            |
| Sync seeds across themes | Toggle                   | Shared default                                                |
| Semantic token overrides | Expandable row per token | Hidden behind **Overrides** drawer; forced checkbox to unlock |
| Neutral baseline         | Toggle                   | "Start from neutral" mode vs production                       |

**Override model:** The 34 derived semantic tokens are automatically computed. If a user wants to manually override `--pb-surface-raised`, they open the Overrides drawer, enable the checkbox for that token, and set an absolute Oklch value. Override rows are visually flagged as "manual — breaks cascade."

**Preview:** Live swatch grid showing all 9 brand tokens and all 34 derived tokens, in both light and dark mode side-by-side.

---

### A2. Typography

**What already exists:** Three font slots (primary, secondary, mono), font source (local/Bunny), weights, italic flags, type scale (base size + ratio + per-level sizes).

**What needs to be added:**

| Control               | Input Type                                   | Notes                                                       |
| --------------------- | -------------------------------------------- | ----------------------------------------------------------- |
| Type scale steps      | Number inputs per level (1–6)                | Currently exists as ratio — expose individual overrides     |
| Line-height scale     | Named steps: tight/snug/normal/relaxed/loose | Maps to CSS `line-height` values; foundations sets defaults |
| Letter-spacing scale  | Named steps: tighter/tight/normal/wide/wider | Maps to CSS `letter-spacing`                                |
| Paragraph spacing     | Rem multiplier                               | Used by rich text and body defaults                         |
| Font feature settings | Toggle checklist                             | `kern`, `liga`, `calt`, `onum`, etc.                        |

**Override model:** The type scale drives heading and body element defaults. Per-element overrides sit in the element editor, not here.

**Preview:** A live type specimen showing all 6 heading levels and all 3 body levels rendered in the selected fonts.

---

### A3. Spacing

**What already exists:** A single `baseRem` multiplier that informs frame gaps and padding. Named radius values (none/sm/md/lg/pill).

**What needs to be added (see also `foundations_missing_values.md`):**

| Control                                | Input Type          | Notes                                                                              |
| -------------------------------------- | ------------------- | ---------------------------------------------------------------------------------- |
| Spacing scale steps (xs–5xl)           | Number inputs (rem) | 8 named steps used by gap, padding, margin controls throughout elements and layout |
| Radius scale (none–pill + custom)      | Number inputs (rem) | Extends existing system; `pill` = 9999rem                                          |
| Border width scale (hairline/sm/md/lg) | Number inputs (px)  | Used by stroke controls in elements                                                |

**Override model:** Spacing scale values are locked by default. The **Overrides** button unlocks individual steps. Changing a step re-derives all element defaults that reference it.

**Preview:** A spacing ruler visualization and a set of boxes demonstrating each spacing step.

---

### A4. Shadows

**What currently exists:** Shadow strings are raw CSS values set per-element. No token system.

**What this section introduces:**

| Control                            | Input Type              | Notes                                                                                    |
| ---------------------------------- | ----------------------- | ---------------------------------------------------------------------------------------- |
| Shadow scale (none/xs/sm/md/lg/xl) | Shadow editor per level | Each level: offsetX, offsetY, blur, spread, color (token reference or raw), inset toggle |
| Inner shadow toggle per level      | Checkbox                | Produces `inset` variants automatically                                                  |

**Override model:** All levels visible and editable directly (no forced checkbox — shadows are a deliberate design decision).

**Preview:** A grid of cards demonstrating each shadow level in light and dark mode.

---

### A5. Motion

**What currently exists:** Entrance/exit presets are unvalidated free strings. Duration and easing values are raw ms/string values scattered across element defaults.

**What this section introduces:**

| Control                                          | Input Type                                             | Notes                                                                         |
| ------------------------------------------------ | ------------------------------------------------------ | ----------------------------------------------------------------------------- |
| Duration scale (instant/fast/normal/slow/slower) | Number inputs (ms)                                     | 5 named steps                                                                 |
| Easing presets                                   | Named list with curve editor                           | e.g., `ease-in`, `ease-out`, `spring-bouncy`, etc. Custom Bézier/spring input |
| Default entrance preset                          | Select from validated preset list                      | Replaces free-string entrancePreset                                           |
| Default exit preset                              | Select                                                 | Same as above                                                                 |
| Reduce motion policy                             | Toggle: disable-all / replace-with-fade / honor-system | Sets global `reduceMotion` default                                            |

**Override model:** Duration and easing are named references. Elements reference the name, not the value. Override at element level by unlocking the field.

**Preview:** A looping demonstration card showing the selected entrance + exit in sequence.

---

### A6. Breakpoints

**What currently exists:** Responsive values accept `mobile` and `desktop` but the actual breakpoint pixel values are not exposed or editable in the workbench.

**What this section introduces:**

| Control                                  | Input Type         | Notes                                                          |
| ---------------------------------------- | ------------------ | -------------------------------------------------------------- |
| Breakpoint definitions (sm/md/lg/xl/2xl) | Number inputs (px) | Sets the px thresholds for responsive value resolution         |
| Default preview viewport                 | Select             | Which breakpoint to show by default in element/layout previews |

---

## Part B — Input Control Library

Every schema field needs a corresponding input control. This section maps field types to controls. These controls are reused across all element, section, and layout editors.

### B1. Primitive Controls

| Schema Type                   | Control                | Notes                                             |
| ----------------------------- | ---------------------- | ------------------------------------------------- |
| `string` (free)               | Text input             |                                                   |
| `string` (long)               | Textarea               | Triggers: `content`, `description` fields         |
| `number`                      | Stepper input          | Min/max/step derived from schema                  |
| `boolean`                     | Toggle switch          |                                                   |
| `z.enum([...])` (2–3 options) | Segmented control      |                                                   |
| `z.enum([...])` (4+ options)  | Select dropdown        |                                                   |
| `string` (color CSS)          | Color picker           | Inline Oklch picker + token reference picker tab  |
| `string` (size CSS)           | Size input             | Number + unit selector (px/rem/em/%)              |
| `string` (duration CSS/ms)    | Duration input         | Number + unit selector (ms/s) + named step picker |
| `string` (CSS function)       | Raw + computed preview | Smart input that detects calc(), clamp(), var()   |

### B2. Responsive Controls

Any field with a responsive shape `value | [mobile, desktop] | { mobile?, desktop? }` gets a **Responsive toggle** above its input. When toggled on, the input splits into two fields (mobile / desktop) with a device icon label.

Responsive toggle is off by default. When turned on, both values default to the current single value.

The preview viewport selector (from Breakpoints foundations) controls which value is shown in preview at any time.

### B3. Composite Controls

| Schema Type                                    | Control                                                                 |
| ---------------------------------------------- | ----------------------------------------------------------------------- |
| CSS margin/padding (1–4 sides)                 | Box model editor (visual quad)                                          |
| `borderRadius`                                 | Corner editor (visual quad, lock-all toggle)                            |
| `boxShadow`                                    | Shadow picker (uses foundation shadow tokens as presets + raw override) |
| `filter` / `backdropFilter`                    | Filter stack editor (add/remove/reorder filters)                        |
| `objectPosition`                               | 2D position picker (x/y, with named anchor grid)                        |
| `imageCrop`                                    | Crop editor (visual crop interface)                                     |
| `imageFilters`                                 | Per-filter sliders (brightness, contrast, saturation, blur, etc.)       |
| Flex properties (direction/align/justify/wrap) | Visual flex editor                                                      |
| Grid columns                                   | Column builder (count + width distribution + gap)                       |

### B4. Token Reference Controls

For any field that can reference a foundation token (color, spacing, radius, shadow, duration, easing), the control has two modes:

- **Token mode** (default): Select from a token picker. Shows the resolved value.
- **Override mode**: Unlocked by a small "Override" button. Shows raw input. Override values are flagged visually.

### B5. Trigger Action Controls

Trigger actions are discriminated unions. The control is:

1. A type selector (select dropdown showing all action types)
2. A contextual payload form that appears below, shaped by the selected type

| Action Type                | Payload Form                                   |
| -------------------------- | ---------------------------------------------- |
| `setState`                 | Key input + value input                        |
| `transition`               | Target page/section input + transition options |
| `togglePlay` / `seek`      | Media target reference                         |
| `scrollTo`                 | Section ID picker                              |
| `setVolume`                | Range slider                                   |
| `openModal` / `closeModal` | Modal ID picker                                |
| `runAnimation`             | Element ID + preset picker                     |
| ...                        | ...                                            |

### B6. Motion Controls

The motion editor is a dedicated collapsible panel:

- **Entrance section**: Preset picker (validated from foundations motion presets) + timing overrides (delay, duration, easing) + fine-tune (distance, amount, axis)
- **Exit section**: Same as entrance
- **Motion variants** (advanced): Named variant builder for Framer Motion's `variants` prop
- **Transition override**: Custom transition object for when presets don't suffice
- **Viewport options**: `once`, `threshold`, `rootMargin`

### B7. Visibility & Conditional Controls

| Field         | Control                                                         |
| ------------- | --------------------------------------------------------------- |
| `visibleWhen` | State key picker + operator (truthy/falsy/equals) + value input |
| `showWhen`    | Same pattern, asset-state specific                              |
| `hidden`      | Toggle, displayed prominently as a "Hide element" shortcut      |

---

## Part C — Preview Encapsulation

This is the most nuanced section. The goal is: **what you see in `/dev` is what you get in page-builder.**

### C1. The Foundation Context Provider

All `/dev` previews are wrapped in a `<WorkbenchPreviewContext>` that:

- Injects all CSS custom properties from the active workbench foundations (colors, spacing, radius, shadows, motion durations/easings, typography variables)
- Sets the active breakpoint viewport from the foundations breakpoint selection
- Provides the PbFoundationDefaults context that the page-builder renderer reads

This context re-renders whenever the workbench session changes.

### C2. Element Previews

Elements need to be wrapped in a simulated frame context. Here is what each element type needs:

| Element Type              | Preview Encapsulation                                                                                                                                                                 |
| ------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Heading / Body / Link** | A `contentBlock` frame with configurable background (light/dark toggle) and configurable width. Shows the element at rest, on-hover, and in reduced-motion mode via tabs.             |
| **Button**                | A `contentBlock` frame. Shows all states: default, hover, active, disabled, loading. State tabs + interactive mode toggle (actually hover/click to see live transitions).             |
| **Input**                 | A frame with realistic label and error state simulation. Empty, filled, focused, error states shown via state tabs.                                                                   |
| **Range**                 | A frame showing track, fill, and thumb. Draggable in interactive mode. Shows custom render (when trackHeight/thumbSize set) vs default.                                               |
| **Image**                 | A constrained frame that respects the variant's width/height/aspectRatio constraints. Background toggle (checkerboard for transparent images). Crop tool visible when crop is active. |
| **Video**                 | A constrained frame with a poster image. Play/pause interactive in preview. Shows autoplay behavior indicator.                                                                        |
| **Vector / SVG**          | A frame with configurable background (to test fill/stroke contrast). Shows hover state if vectorTransition is defined.                                                                |
| **3D Model**              | A WebGL-capable preview canvas. Camera/orbit controls active. Lighting from the 3D scene definition.                                                                                  |
| **Rive**                  | A canvas-backed preview. State machine inputs surfaced as controls when a state machine is defined.                                                                                   |
| **Spacer**                | A frame showing the spacer as a visible ruler with a dimension overlay. Not visually interesting alone — shows dimension value prominently.                                           |

**Common element preview affordances:**

- Background color toggle (light surface / dark surface / transparent / custom)
- Viewport width selector (from foundations breakpoints)
- Entrance animation playback button (plays the entrance then resets)
- Exit animation playback button
- Reduced-motion mode toggle
- "Inspect" overlay showing resolved CSS values (margins, padding, box model)

### C3. Section / Layout Previews

Sections and layout containers need a viewport simulation:

| Section Type             | Preview Encapsulation                                                                                                                          |
| ------------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------- |
| **contentBlock (frame)** | Full-width viewport simulation. Fill, effects, and margins rendered. Elements inside are real rendered elements (using their active defaults). |
| **sectionColumn**        | Viewport simulation with grid overlay toggle. Column widths, gaps, and column styles all rendered. Responsive breakpoint simulator.            |
| **scrollContainer**      | Constrained-height frame with scrollable content. Scroll progress bar shown as overlay if scroll progress trigger is defined.                  |
| **revealSection**        | Two-state preview: collapsed and revealed. Button to toggle between states in preview.                                                         |
| **section base**         | For motion/trigger testing: a taller viewport so scroll-triggered events can be tested.                                                        |

**Section preview affordances:**

- Viewport width slider (continuous, or snap to breakpoint)
- Scroll position scrubber (for testing scroll-triggered motion)
- Theme toggle (light/dark)
- Grid/spacing overlay toggle
- "Add element" panel (for building a representative preview)

### C4. Background Previews

Backgrounds wrap sections and need to be previewed over representative content:

| Background Type    | Preview Context                                                                                 |
| ------------------ | ----------------------------------------------------------------------------------------------- |
| `video`            | Shows the video playing/paused with content overlaid. Blend mode and opacity controls visible.  |
| `image`            | Shows image with objectFit applied and content overlaid.                                        |
| `variable` (color) | Shows the color fill with content overlaid.                                                     |
| `pattern`          | Shows the pattern tile with content overlaid.                                                   |
| `transition`       | Shows a crossfade/animation between two background states. Scrubber to position the transition. |

**Missing:** There is no solid-color or gradient background type. See `schema_core_missing_values.md`.

### C5. Foundations Previews

Each foundations section has a dedicated preview panel:

| Foundation  | Preview                                                            |
| ----------- | ------------------------------------------------------------------ |
| Colors      | Token swatch grid, light + dark side-by-side, WCAG contrast badges |
| Typography  | Type specimen (all levels, both fonts), paragraph sample           |
| Spacing     | Ruler visualization + box demo per step                            |
| Shadows     | Card grid showing each shadow level                                |
| Motion      | Looping animation demo card (entrance → pause → exit)              |
| Breakpoints | Viewport ruler with breakpoint markers                             |

---

## Part D — Element Editors

### D1. Expanded Element Registry

All existing batch elements plus gaps filled in:

**Batch 1 · Content**

- Heading (exists)
- Body (exists)
- Link (exists)
- Rich Text (exists)
- Divider (element-level, not section-level — see schema gaps)

**Batch 2 · Interaction**

- Button (exists)
- Input (exists)
- Range (exists)
- Form (full form block editor — new)

**Batch 3 · Media**

- Image (exists)
- Video (exists)
- Video Time (exists)

**Batch 4 · Graphics**

- Vector (exists)
- SVG (exists)
- Model 3D (exists)
- Rive (exists)

**Batch 5 · Utility**

- Spacer (exists)
- Scroll Progress Bar (exists)
- Element Group (new — container element with layout controls)

### D2. Per-Element Editor Shape

Each element editor follows this consistent structure:

```
[Variant Picker]                 ← Select or custom mode
[Preview]                        ← C2 preview encapsulation for this type
[Settings panel]
  ├── Content                    ← Text, src, label, alt, etc.
  ├── Layout                     ← Width, height, margin, padding, align
  ├── Typography (if text)       ← Font slot, level, weight, line-height, tracking
  ├── Visual                     ← Fill, stroke, border-radius, shadow, opacity
  ├── Filters / Effects          ← Image filters, backdrop, blend mode
  ├── Motion                     ← Entrance, exit, fine-tune
  ├── Interactions               ← onClick, onHover, onDrag, onDoubleClick
  ├── Visibility                 ← visibleWhen, hidden
  └── [Overrides]                ← Rarely-used fields behind disclosure (z-index, cursor, wrapperStyle, aria)
```

### D3. Variant Inheritance Model

Each element editor exposes:

1. **Built-in variants** — Named semantic defaults (e.g., `default`, `accent`, `ghost`, `text` for buttons). These are edited here and saved to the workbench.
2. **Custom mode** — A scratch pad. Clones from any variant. Edits produce JSON output only. Do not overwrite variants.
3. **Default variant selection** — Which variant is used when a new element of this type is dropped onto a page.

Variants inherit from foundations: a button's default fill is `--pb-primary`, not a hard-coded color. If you change `--pb-primary` in foundations, the button preview updates immediately. You can override at variant level, but you'll see an override badge.

---

## Part E — Layout Editors

Layout editing is currently absent from `/dev`. This section specifies what is needed.

### E1. Frame (contentBlock) Editor

Controls what the default `contentBlock` section looks like.

**Settings:**

- Default content width (full / hug / CSS)
- Default content height
- Frame gap (references spacing scale)
- Frame row/column gap
- Frame flex direction (row / column)
- Frame align items
- Frame justify content
- Frame flex wrap
- Default padding (references spacing scale, per-side)
- Default border radius (references radius scale)
- Background fill (token reference or raw)
- Default effects (shadows, filters)

**Preview:** A live frame with 2–3 placeholder elements inside showing how gap, alignment, and padding behave.

### E2. Grid (sectionColumn) Editor

Controls default grid behavior.

**Settings:**

- Default column count (responsive)
- Default column widths (equal / hug / custom)
- Default column gap (references spacing scale)
- Default row gap
- Default column styles (fill, padding, border, radius per column)
- Grid mode default (columns / grid)

**Preview:** A live 2-column and 3-column grid with placeholder content blocks.

### E3. Scroll Container Editor

**Settings:**

- Default scroll direction
- Snap behavior (none / mandatory / proximity)
- Scrollbar visibility

**Preview:** A horizontal scrolling strip of placeholder cards.

### E4. Section Base Editor

Controls the defaults applied to every section.

**Settings:**

- Default section align
- Default width / max-width
- Default margins (vertical rhythm — references spacing scale)
- Default overflow
- Default border radius (references radius scale)

**Preview:** A section with a background and some content, showing margin collapse and max-width.

---

## Part F — Custom Mode

Custom mode is a JSON-in, JSON-out scratch pad. It does not affect any variants.

**Entry:** Available on every element and section editor as a "Custom" option in the variant picker. Also accessible as a standalone `/dev/custom` route that accepts any element or section type.

**How it works:**

1. User selects element/section type
2. The editor loads with an empty template (minimum required fields populated)
3. All controls are available, same as in variant editing
4. A live JSON panel on the right shows the current output
5. JSON can be manually edited (two-way sync)
6. "Copy JSON" produces a snippet ready to paste into a page content file
7. No save. No workbench mutation. Session is in-memory only.

**Diff view:** Custom mode can optionally show a diff against the closest named variant. This is useful for understanding what you changed.

**Future note:** When drag-and-drop is introduced, Custom mode becomes the "Add element" panel. The JSON output from custom mode is the serialized node that gets dropped into the page tree.

---

## Part G — Save System

The workbench save system already exists at a basic level (snapshot/restore). For 0.5, it needs to be extended to:

1. **Named snapshots** — Not just one bookmark slot, but multiple named saves (e.g., "Light brand", "Dark brand", "Client A")
2. **Section-level partial saves** — Save only foundations.colors without touching the rest of the session
3. **Diff-aware restore** — When loading a snapshot, show a diff of what will change before applying
4. **Export format** — The exported JSON must be valid against the page-builder schema. It should include both the raw values AND enough metadata to re-import without loss
5. **Production import** — The "Import Prod" feature should show a diff between current session and production before applying

---

## Part H — Data Shape for Future Drag-and-Drop

Every piece of state in the workbench must be structured so it can feed directly into a drag-and-drop page builder without restructuring.

**Requirements:**

1. Every element variant produces a valid `elementBlock` JSON node when exported
2. Every section default produces a valid `sectionBlock` JSON node
3. All IDs (`id` field) follow the same format used by the page-builder load system
4. Parent-child relationships (elements inside sections, elements inside element groups) are expressed as arrays of IDs — no embedding of schema
5. The workbench session shape is designed so that a "drop" operation takes a variant JSON node and inserts it into a `elements[]` array in a section definition — no transformation needed
6. Foundations values are always referenced by token name (`--pb-primary`) in element/section defaults, never by resolved value

This ensures that `/dev` is not a standalone tool but a configuration layer that feeds directly into the page-builder content pipeline.

---

## Implementation Order

```
Phase 1 — Foundations completeness
  A3 Spacing scale
  A4 Shadows
  A5 Motion tokens
  A6 Breakpoints

Phase 2 — Input control library
  B1-B4 (primitive + responsive + composite + token reference)
  B5 Trigger action controls
  B6 Motion controls
  B7 Visibility controls

Phase 3 — Foundation context provider
  C1 WorkbenchPreviewContext

Phase 4 — Element preview wrappers
  C2 All element preview encapsulations

Phase 5 — Section/Layout editors
  E1-E4 Frame, Grid, Scroll, Section base

Phase 6 — Element editor completeness
  D1-D3 All elements with full settings panels

Phase 7 — Custom mode
  F: standalone route + JSON panel

Phase 8 — Save system
  G: named snapshots, section-level saves, diff-aware restore
```
