# Section Types

Every top-level Figma frame becomes one section block. The section type determines how its children are structured and how they are laid out at runtime.

---

## Type routing priority

1. Explicit `[pb: type=...]` annotation on the frame — highest priority.
2. Auto-detection: Figma layout grid with ≥ 2 columns → `sectionColumn`.
3. Auto-detection: horizontal auto-layout where all direct children are frame-type nodes (FRAME / COMPONENT / INSTANCE) → `sectionColumn`.
4. Auto-detection: horizontal auto-layout where frame-type children cover > 60% of the total width → `sectionColumn`.
5. Auto-detection: `[pb: type=revealSection]` annotation → `revealSection`.
6. Default: `contentBlock`.

---

## contentBlock

The default section type. Any frame not auto-detected as a column layout and not annotated as another type.

Direct children of the frame are converted to elements and stored in the `elements` array. When the frame has auto-layout padding, a wrapper `elementGroup` is injected to carry the padding — the section itself does not have padding fields.

### Output shape

```json
{
  "type": "contentBlock",
  "id": "hero-section",
  "fill": "#0f0f0f",
  "width": "1440px",
  "height": "800px",
  "overflow": "hidden",
  "borderRadius": "0px",
  "flexDirection": "column",
  "gap": "48px",
  "alignItems": "center",
  "elements": [
    { "type": "elementHeading", "id": "hero-title", "...": "..." },
    { "type": "elementBody", "id": "hero-sub", "...": "..." }
  ]
}
```

### Section base props

All section types extract these automatically from the Figma frame.

| Property                    | Figma source                                                               |
| --------------------------- | -------------------------------------------------------------------------- |
| `id`                        | `slugify(frame.name)` with annotation stripped; deduplicated via `usedIds` |
| `fill`                      | First visible fill: solid → hex or CSS var, gradient → CSS gradient string |
| `bgImage`                   | Image fill on the frame → exported to `assets/{frameName}/bg.png`          |
| `width`                     | Frame width in px                                                          |
| `height`                    | Frame height in px                                                         |
| `minHeight` / `maxHeight`   | Auto-layout min/max height constraints                                     |
| `minWidth` / `maxWidth`     | Auto-layout min/max width constraints                                      |
| `borderRadius`              | `cornerRadius` (uniform or per-corner)                                     |
| `overflow`                  | `clipsContent === true` → `"hidden"`, otherwise omitted                    |
| `boxShadow`                 | `DROP_SHADOW` effects → CSS box-shadow string                              |
| `filter`                    | `LAYER_BLUR` effect → `filter: blur(Npx)`                                  |
| `backdropFilter`            | `BACKGROUND_BLUR` effect → `backdrop-filter: blur(Npx)`                    |
| `opacity`                   | `node.opacity` (omitted when 1.0)                                          |
| `blendMode`                 | Figma blend mode → CSS mix-blend-mode                                      |
| `border` / `borderTop` etc. | Strokes → CSS border (per-side when individual weights differ)             |
| `outline`                   | `OUTSIDE`-aligned strokes                                                  |

Annotation overrides for `fill`, `overflow`, and `hidden` are applied after extraction. Trigger and effect props are merged last.

---

## sectionColumn

A two-or-more-column grid layout.

### Auto-detection rules

A frame is auto-detected as `sectionColumn` when ANY of:

- It carries `[pb: type=sectionColumn]`, OR
- It has a Figma layout grid with ≥ 2 columns, OR
- Its `layoutMode` is `HORIZONTAL` AND all direct children are FRAME / COMPONENT / INSTANCE nodes AND there are ≥ 2 of them, OR
- Its `layoutMode` is `HORIZONTAL` AND frame-type children collectively cover > 60% of the frame's total width.

The "all children are frames" rule catches clean column grids without needing to count widths. The 60% threshold catches layouts where a few non-frame siblings (like a divider icon) are present but the dominant intent is still columns.

### Column width resolution

- All column children have equal widths (within 1 px) → `"1fr"` per column.
- Unequal widths → pixel values from each child frame's actual width.

Column gap comes from `frame.itemSpacing` when > 0.

When the frame has a Figma layout grid (no auto-layout), children are assigned to columns by snapping their x position to the nearest grid column edge.

### Output shape

```json
{
  "type": "sectionColumn",
  "id": "feature-grid",
  "columns": 3,
  "columnWidths": ["1fr", "1fr", "1fr"],
  "columnGaps": "24px",
  "columnAssignments": {
    "feature-card-a": 1,
    "feature-card-b": 2,
    "feature-card-c": 3
  },
  "elementOrder": ["feature-card-a", "feature-card-b", "feature-card-c"],
  "elements": [
    { "type": "elementGroup", "id": "feature-card-a", "...": "..." },
    { "type": "elementGroup", "id": "feature-card-b", "...": "..." },
    { "type": "elementGroup", "id": "feature-card-c", "...": "..." }
  ]
}
```

Elements are stored flat in the `elements` array. `columnAssignments` maps each element ID to its 1-based column index. `elementOrder` preserves left-to-right, top-to-bottom ordering.

### Example

```
Feature Row         ← sectionColumn, columns=3, columnWidths=["1fr","1fr","1fr"], columnGaps="24px"
  Card A            ← column 1 → elementGroup
  Card B            ← column 2 → elementGroup
  Card C            ← column 3 → elementGroup
```

---

## revealSection

An accordion/expand pattern. The section starts collapsed and reveals content on a trigger. Always annotation-only — use `[pb: type=revealSection]`.

### Child slotting

The converter looks at direct children of the annotated frame and assigns them to one of two slots based on the child frame name:

| Slot                | Matched child names                       | Purpose                   |
| ------------------- | ----------------------------------------- | ------------------------- |
| `collapsedElements` | `collapsed`, `header`, `trigger`, `peek`  | Always-visible peek state |
| `revealedElements`  | `revealed`, `content`, `expanded`, `body` | Hidden until revealed     |

Name matching is case-insensitive and allows prefix/suffix context (`"peek state"` matches `"peek"`). When a named container frame is found, its direct children are flattened into the slot — the container frame itself is not emitted. If no named slots are found, all children go to `revealedElements`.

### Output shape

```json
{
  "type": "revealSection",
  "id": "faq-item",
  "fill": "#ffffff",
  "width": "800px",
  "triggerMode": "click",
  "expandAxis": "vertical",
  "initialRevealed": false,
  "collapsedElements": [{ "type": "elementHeading", "id": "faq-question", "...": "..." }],
  "revealedElements": [{ "type": "elementBody", "id": "faq-answer", "...": "..." }]
}
```

### All revealSection annotation keys

| Key                  | Values                                             | Default    |
| -------------------- | -------------------------------------------------- | ---------- |
| `triggerMode`        | `click`, `hover`, `button`, `external`, `combined` | `click`    |
| `expandAxis`         | `vertical`, `horizontal`, `both`                   | `vertical` |
| `initialRevealed`    | `true`                                             | `false`    |
| `revealPreset`       | preset name string                                 | —          |
| `expandDurationMs`   | milliseconds                                       | —          |
| `externalTriggerKey` | string                                             | —          |

### Example with all slots named

```
FAQ Item [pb: type=revealSection, triggerMode=click, expandDurationMs=250]
  header              ← children become collapsedElements
    FAQ Question      ← elementHeading
  body                ← children become revealedElements
    FAQ Answer        ← elementBody
```

---

## Responsive sections

Sections can carry responsive field values as `[mobileValue, desktopValue]` tuples when exported as a `Section[Desktop]/*` + `Section[Mobile]/*` pair and merged.

See [08-workflow.md](./08-workflow.md) for the two-artboard workflow.

The complete list of responsive-capable section fields (from `responsive-merge.ts`):

```
width, height, minWidth, maxWidth, minHeight, maxHeight,
align, marginLeft, marginRight, marginTop, marginBottom,
borderRadius, initialX, initialY, stickyOffset, fixedOffset,
columns, columnAssignments, columnWidths, columnGaps,
columnStyles, columnSpan, itemLayout, gridMode, gridAutoRows, elementOrder
```

Fields not in this set use the desktop value, falling back to mobile when absent from desktop.

---

[Back to README](./README.md) | [Annotation system](./02-annotation-system.md) | [Element types](./04-element-types.md)
