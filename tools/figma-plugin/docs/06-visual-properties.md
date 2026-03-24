# Visual Properties

How the plugin translates Figma visual properties to page-builder fields.

---

## Fills

Defined in `src/converters/fills.ts`.

**Single fill**: the first visible fill is extracted as a CSS color or gradient string.

**Multiple stacked fills**: all visible layers are composed into a CSS `background` shorthand. Figma fills are ordered bottom-to-top; the array is reversed before compositing so CSS layers run top-to-bottom.

### Solid fill

Converted to a hex string (`#rrggbb` or `#rrggbbaa` when opacity < 0.99).

When the fill color is bound to a Figma variable, the plugin resolves it to a CSS custom property:

```
colors/primary/500   →   "var(--colors-primary-500, #ff5500)"
brand/surface/dark   →   "var(--brand-surface-dark, #1a1a2e)"
```

Variable name: slashes → hyphens, lowercased, sanitized.

### Linear gradient

```
fill: "linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)"
```

Angle computed from the `gradientTransform` matrix. Gradient stop colors also resolve to CSS vars when variable-bound.

### Radial gradient

```
fill: "radial-gradient(circle, #ffffff 0%, #000000 100%)"
```

### Image fill

Image fills on non-text nodes are exported as PNGs. See [07-asset-handling.md](./07-asset-handling.md).

Background image fills on section frames are exported separately via `exportImageFillAsset` and stored as `bgImage` on the section (e.g. `hero/bg.png`).

### Unsupported gradient types

`GRADIENT_ANGULAR` and `GRADIENT_DIAMOND` have no CSS equivalent. The fill is skipped and a warning is logged. This applies inside multi-fill stacks too.

### Multiple fills example

```
Figma fills (bottom to top):
  [0]  SOLID #1a1a1a
  [1]  GRADIENT_LINEAR rgba(0,0,0,0.4) → transparent

CSS output:
  background: linear-gradient(180deg, rgba(0,0,0,0.4) 0%, transparent 100%), #1a1a1a
```

When an IMAGE fill is part of a multi-fill stack, it is emitted as `/* image-fill */` in the composited string. A warning is added.

---

## Typography

Defined in `src/converters/typography.ts`.

| Field            | Figma source               | Notes                                                                                                             |
| ---------------- | -------------------------- | ----------------------------------------------------------------------------------------------------------------- |
| `fontFamily`     | `node.fontName.family`     | Emitted as-is; CSS var() when variable-bound                                                                      |
| `fontSize`       | `node.fontSize`            | In px, e.g. `"24px"`; CSS var() when variable-bound                                                               |
| `fontWeight`     | `node.fontWeight`          | Falls back to inference from `fontName.style` (`"Bold"` → 700, etc.)                                              |
| `letterSpacing`  | `node.letterSpacing`       | `PERCENT` → `em` (Figma % / 100); `PIXELS` → `px`; CSS var() when variable-bound                                  |
| `lineHeight`     | `node.lineHeight`          | `PERCENT` → unitless ratio (`value / 100`); `PIXELS` → px string; `AUTO` → omitted; CSS var() when variable-bound |
| `textAlign`      | `node.textAlignHorizontal` | `LEFT`→`"left"`, `CENTER`→`"center"`, `RIGHT`→`"right"`, `JUSTIFIED`→`"justify"`                                  |
| `textDecoration` | `node.textDecoration`      | Omitted when `NONE`                                                                                               |
| `textTransform`  | `node.textCase`            | `UPPER`→`"uppercase"`, `LOWER`→`"lowercase"`, `TITLE`→`"capitalize"`, `SMALL_CAPS`→`"uppercase"`                  |

Mixed text styles (`fontName === figma.mixed` etc.) cause the node to be emitted as `elementRichText`.

**When `[pb: style=h1]` … `[pb: style=body6]` is present**, raw typography is NOT extracted — only the level number is emitted.

---

## Text fill color

Written to `wrapperStyle.color`.

- **Solid fill**: hex color → `wrapperStyle.color`
  - Pure black (r/g/b < 4%) → **skipped** (design system handles)
  - Pure white (r/g/b > 96%) → **skipped** (design system handles)
- **Gradient fill** (no solid fill present):

```json
{
  "wrapperStyle": {
    "background": "linear-gradient(90deg, #ff5500 0%, #ff0099 100%)",
    "-webkit-background-clip": "text",
    "-webkit-text-fill-color": "transparent",
    "color": "transparent"
  }
}
```

Only the node-level fill is used. Per-run fills (different colors on parts of the text) are not extracted.

---

## Text truncation

Extracted automatically from `TextNode` properties:

- `node.maxLines > 0` → `element.maxLines`
- `node.textTruncation === "ENDING"` → `element.textOverflow = "ellipsis"` (also sets `maxLines = 1` if unset)
- `node.textAutoResize === "HEIGHT"` → `height` is omitted from the element
- `node.textAutoResize === "WIDTH_AND_HEIGHT"` → both `width` and `height` are omitted

---

## Effects

Defined in `src/converters/effects.ts`.

| Figma effect type | Output field     | Format                                                  |
| ----------------- | ---------------- | ------------------------------------------------------- |
| `DROP_SHADOW`     | `boxShadow`      | CSS box-shadow string; multiple shadows comma-separated |
| `INNER_SHADOW`    | `boxShadow`      | Same, with `inset` keyword                              |
| `LAYER_BLUR`      | `filter`         | `"blur(Npx)"`                                           |
| `BACKGROUND_BLUR` | `backdropFilter` | `"blur(Npx)"`                                           |
| `GLASS`           | `effects[]`      | `{ "type":"glass", ... }` section effect payload        |

Effects with `visible === false` are skipped.

---

## Borders

Defined in `src/converters/layout.ts` (`extractBorderProps`).

Only the **first visible solid stroke** is converted. Gradient strokes are not supported.

| Condition                                             | Output field                                                           |
| ----------------------------------------------------- | ---------------------------------------------------------------------- |
| Uniform stroke weight, `INSIDE` or `CENTER` alignment | `border: "Npx solid #color"`                                           |
| Uniform stroke weight, `OUTSIDE` alignment            | `outline: "Npx solid #color"`                                          |
| Per-side weights differ                               | `borderTop`, `borderRight`, `borderBottom`, `borderLeft` as applicable |
| Non-zero `strokeDashes`                               | Same as above but with `dashed` style                                  |

Variable-bound stroke colors resolve to CSS vars with hex fallback.

For element-level nodes, border props go into `wrapperStyle`. For section-level nodes, they are spread as top-level fields.

---

## Opacity and blend mode

- `node.opacity < 1` → `opacity` field (rounded to 3 decimal places).
- Figma blend mode → CSS `mix-blend-mode` string.
- `NORMAL` and `PASS_THROUGH` are not emitted.
- `LINEAR_BURN` / `LINEAR_DODGE` → fall back to `"normal"` + warning.

---

## Transforms

- `node.rotation` → `rotate` field. Figma stores rotation with inverted sign convention, so the value is negated: `rotate = -node.rotation`. Values within 0.01 degrees of zero are omitted.
- Horizontal/vertical flips: use `[pb: flipH=true]` / `[pb: flipV=true]` annotations — the plugin does not auto-detect flips from the transform matrix.

---

## Corner radius

- Uniform `cornerRadius` → `borderRadius: "Npx"` (or CSS var when variable-bound).
- Mixed per-corner radii → four-value shorthand: `"topLeft topRight bottomRight bottomLeft"`.

---

## Absolute positioning

When a node's parent uses `layoutMode=NONE` (free layout), the child receives absolute-position styles in `wrapperStyle`:

```json
{
  "wrapperStyle": {
    "position": "absolute",
    "left": "48px",
    "top": "120px",
    "width": "400px",
    "height": "260px"
  }
}
```

The parent container gets `wrapperStyle: { position: "relative" }` so the absolute children resolve correctly.

Nodes individually floated out of an auto-layout parent (`layoutPositioning === "ABSOLUTE"`) are handled the same way, with `RIGHT`/`BOTTOM` constraint math using parent dimensions.

---

## Figma variables

Variable bindings on fills and any numeric property are resolved to CSS custom properties using `figma.variables.getVariableById`.

**Variable name transformation**:

```
"colors/primary/500"  →  "--colors-primary-500"
"spacing/md"          →  "--spacing-md"
```

Slashes replaced with hyphens, then lowercased and sanitized.

### Numeric property bindings

| Property                                                        | Example output                         |
| --------------------------------------------------------------- | -------------------------------------- |
| `fontSize`                                                      | `var(--typography-scale-h1, 48px)`     |
| `letterSpacing`                                                 | `var(--letter-spacing-tight, -0.02em)` |
| `lineHeight`                                                    | `var(--line-height-heading, 1.1)`      |
| `paddingTop` / `paddingRight` / `paddingBottom` / `paddingLeft` | `var(--spacing-md, 16px)`              |
| `itemSpacing` (gap)                                             | `var(--spacing-lg, 24px)`              |
| `cornerRadius`                                                  | `var(--radius-md, 8px)`                |
| `width` / `height` (fixed-size nodes only)                      | `var(--size-avatar, 48px)`             |

If `figma.variables.getVariableById` is unavailable or the variable cannot be resolved, the raw numeric value is emitted directly.

---

## Figma Styles

Style names never appear in the output. The plugin reads resolved values directly from each node. Using or not using named styles in Figma does not change the plugin output.

---

## What is NOT extracted

| Figma feature                                     | Handling                                                                               |
| ------------------------------------------------- | -------------------------------------------------------------------------------------- |
| Corner smoothing (squircle)                       | Standard `borderRadius`; warning added                                                 |
| `LINEAR_BURN` / `LINEAR_DODGE` blend modes        | Falls back to `"normal"`; warning added                                                |
| Figma image filters (temperature, tint, exposure) | Omitted entirely                                                                       |
| `GRADIENT_ANGULAR` / `GRADIENT_DIAMOND`           | No CSS equivalent — skipped; warning logged                                            |
| `motionTiming` / entrance animations              | Only emitted via `[pb: entrance=...]` annotation — never derived from Figma appearance |
| Per-run text fills                                | Only node-level fill extracted                                                         |
| Figma grid layouts (as visual guides)             | Not converted                                                                          |
| Figma constraints (fixed, scale)                  | Not converted                                                                          |
| Boolean variables                                 | No CSS equivalent                                                                      |
| Mode switching (light/dark)                       | Plugin reads the current mode's resolved value only                                    |

---

[Back to README](./README.md) | [Asset handling](./07-asset-handling.md) | [Element types](./04-element-types.md)
