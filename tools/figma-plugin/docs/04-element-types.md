# Element Types

Every child node inside a section frame is routed to an element converter. The routing is deterministic and documented here.

---

## Routing table

Annotation `type` overrides run first, before node-type heuristics. Video detection runs before the type switch and catches any node type.

| Figma node                                               | Condition                                                                                                                                    | Emits                                              |
| -------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------- |
| Any node                                                 | `[pb: type=button]` annotation                                                                                                               | `elementButton`                                    |
| Any node                                                 | `[pb: type=spacer]` annotation                                                                                                               | `elementSpacer`                                    |
| Any node                                                 | `[pb: type=svg]` annotation                                                                                                                  | `elementSVG`                                       |
| Any node                                                 | `[pb: type=image]` annotation                                                                                                                | `elementImage`                                     |
| Any node                                                 | `[pb: type=elementVideo]` or `[pb: type=video]`, OR name starts with `video`/`vid-`, OR native VIDEO fill, OR INSTANCE with video `src` prop | `elementVideo`                                     |
| `TEXT`                                                   | `fontName`, `textStyleId`, or `fontSize` is `figma.mixed`                                                                                    | `elementRichText`                                  |
| `TEXT`                                                   | Has URL hyperlink on the full text                                                                                                           | `elementLink`                                      |
| `TEXT`                                                   | `isLikelyHeading()` returns true                                                                                                             | `elementHeading`                                   |
| `TEXT`                                                   | otherwise                                                                                                                                    | `elementBody`                                      |
| `VECTOR`, `BOOLEAN_OPERATION`, `STAR`, `POLYGON`, `LINE` | —                                                                                                                                            | `elementSVG`                                       |
| `ELLIPSE`                                                | —                                                                                                                                            | `elementSVG`                                       |
| `RECTANGLE`                                              | Has `IMAGE` fill                                                                                                                             | `elementImage`                                     |
| `RECTANGLE`                                              | No image fill                                                                                                                                | `elementSVG` (rasterised)                          |
| `FRAME`, `GROUP`, `COMPONENT`                            | Has `IMAGE` fill                                                                                                                             | `elementImage`                                     |
| `COMPONENT`                                              | `isLikelyButton()` returns true                                                                                                              | `elementButton`                                    |
| `INSTANCE`                                               | Part of a COMPONENT_SET with a state property, placed as default variant                                                                     | Full `elementGroup` via variant converter          |
| `INSTANCE`                                               | `isLikelyButton()` returns true                                                                                                              | `elementButton` (with component props merged)      |
| `INSTANCE`                                               | Has `IMAGE` fill                                                                                                                             | `elementImage`                                     |
| `FRAME`, `GROUP`, `COMPONENT`, `INSTANCE`                | Has children, no image fill                                                                                                                  | `elementGroup`                                     |
| `COMPONENT_SET`                                          | —                                                                                                                                            | `elementGroup` via variant converter               |
| `SECTION` (Figma organizational)                         | —                                                                                                                                            | `elementGroup` (transparent wrapper for children)  |
| Hidden node (`visible === false`)                        | —                                                                                                                                            | Element exported with `hidden: true` (not skipped) |
| All other types                                          | —                                                                                                                                            | `null` + warning                                   |

---

## elementHeading

**Figma source**: `TEXT` node. Routed when `isLikelyHeading()` returns true.

### isLikelyHeading heuristic

Returns `true` when ANY of:

- `fontSize >= 22`
- `fontWeight >= 600`
- The applied text style name contains `heading`, `/h`, `title`, `display`, or matches `h1`–`h6` (case-insensitive)

### Heading level from fontSize

```
>= 64 → 1    >= 48 → 2    >= 36 → 3    >= 28 → 4    >= 22 → 5    else → 6
```

Override with `[pb: style=h1]` through `[pb: style=h5]` to emit a specific level and skip raw typography extraction.

### Output shape

```json
{
  "type": "elementHeading",
  "id": "hero-title",
  "level": 1,
  "text": "Case Study",
  "fontFamily": "Inter",
  "fontSize": "72px",
  "fontWeight": 700,
  "letterSpacing": "-0.03em",
  "lineHeight": "1.05",
  "textAlign": "left",
  "wrapperStyle": { "color": "#e8e8e8" }
}
```

Text fill color is written to `wrapperStyle.color`. Pure black (r/g/b < 4%) and pure white (r/g/b > 96%) are skipped — the design system handles those. Gradient text fills produce a `background` + `-webkit-background-clip: text` pattern in `wrapperStyle`.

---

## elementBody

**Figma source**: `TEXT` node that does not match `isLikelyHeading()`.

### Body level from fontSize

```
>= 18 → 1    >= 16 → 2    >= 14 → 3    >= 13 → 4    else → 5
```

Override with `[pb: style=body1]` through `[pb: style=body6]` to emit a specific level and skip raw typography extraction.

Same text props as `elementHeading` (`fontFamily`, `fontSize`, `fontWeight`, `letterSpacing`, `lineHeight`, `textAlign`). Text fill color handled identically.

---

## elementLink

**Figma source**: `TEXT` node where the full text is a URL hyperlink (detected via `getStyledTextSegments`). Falls back to legacy `node.hyperlink.type === "URL"` check.

```json
{
  "type": "elementLink",
  "id": "nav-about",
  "label": "About",
  "href": "https://example.com/about",
  "external": true,
  "copyType": "body"
}
```

`copyType` is `"heading"` when `isLikelyHeading()` is also true, otherwise `"body"`. When `copyType` is `"heading"`, `level` is also set. `external` is `true` when `href` does not start with `/`.

Partial inline links (hyperlink on only part of the text) are not supported — a warning is added and the node is emitted as plain text (`elementHeading` or `elementBody`).

---

## elementRichText

**Figma source**: `TEXT` node where `fontName`, `textStyleId`, or `fontSize` is `figma.mixed` (multiple text runs with different styles).

```json
{
  "type": "elementRichText",
  "id": "mixed-copy",
  "content": "Plain text characters from the node"
}
```

A warning is added noting that mixed-style formatting is approximate. The raw `characters` string is stored in `content`.

---

## elementImage

**Figma source**: `RECTANGLE`, `FRAME`, `GROUP`, `COMPONENT`, or `INSTANCE` with an `IMAGE` fill; or any node annotated `[pb: type=image]`.

```json
{
  "type": "elementImage",
  "id": "hero-photo",
  "src": "hero/banner.png",
  "alt": "hero-photo",
  "objectFit": "cover",
  "aspectRatio": "16/9",
  "objectPosition": "50% 30%"
}
```

- `src`: the CDN key from `buildAssetKey(node.name, ctx)`. Layer name `hero/banner` → CDN key `hero/banner.png`. With a per-frame CDN prefix `work/project/`, the key becomes `work/project/hero/banner.png`.
- `alt`: defaults to the layer name; override with `[pb: alt=...]`.
- `objectFit`: derived from Figma `scaleMode` — `FILL` → `"cover"`, `FIT` → `"contain"`, `CROP` → `"cover"` (approximate; adds warning), `TILE` → `"cover"`.
- `objectPosition`: derived from `imageTransform` matrix when meaningfully off-center (> 5% from 50%). Override with `[pb: objectPosition=...]`.
- `aspectRatio`: computed via GCD from node dimensions; only emitted when both parts of the fraction simplify to ≤ 50 (e.g. `1920×1080 → "16/9"`, but `317×218 → undefined`).
- For `INSTANCE` nodes, component properties `alt` and `src` override derived values.

---

## elementSVG

**Figma source**: `VECTOR`, `BOOLEAN_OPERATION`, `STAR`, `POLYGON`, `LINE`, `ELLIPSE`, or plain `RECTANGLE` (no image fill); or any node annotated `[pb: type=svg]`.

```json
{
  "type": "elementSVG",
  "id": "logo-mark",
  "markup": "<svg viewBox=\"0 0 100 100\">...</svg>",
  "width": "120px",
  "height": "120px"
}
```

SVGs are exported via `exportAsync({ format: "SVG_STRING" })` and stored inline in `markup`. No asset file is written to the ZIP.

---

## elementButton

**Figma source**: COMPONENT or INSTANCE with name matching `/\b(button|btn|cta)\b/i`, or any node with name starting with `btn-`, `button-`, or `cta-`, or any node annotated `[pb: type=button]`.

```json
{
  "type": "elementButton",
  "id": "cta-button",
  "label": "View project",
  "href": "/work/project-name",
  "variant": "primary",
  "size": "lg"
}
```

- `label`: from `[pb: label=...]` → first `TEXT` descendant → cleaned layer name.
- `href`: from `[pb: href=...]` → first TEXT child hyperlink.
- `variant` / `size`: from `[pb: variant=...]` / `[pb: size=...]`.
- `disabled`: from `[pb: disabled=true]`.
- `pointerDownAction`: from `[pb: action=actionType:param]`.
- For `INSTANCE` nodes, component properties `label`, `href`, `disabled`, `variant`, `size` fill any gaps not already covered by annotations.

---

## elementVideo

**Figma source**: any node with `[pb: type=elementVideo]` or `[pb: type=video]` annotation, or name starting with `video` or `vid-` (case-insensitive), or a Figma-native VIDEO fill, or an `INSTANCE` with a component property `src` pointing to a video URL (`.mp4`, `.webm`, `.mov`, `.ogg`).

```json
{
  "type": "elementVideo",
  "id": "hero-reel",
  "src": "hero-reel.mp4",
  "poster": "hero-reel/poster.png",
  "autoplay": true,
  "loop": true,
  "muted": true,
  "width": "1280px",
  "height": "720px"
}
```

### src resolution priority

1. `[pb: src=...]` annotation
2. Component property named `src` (INSTANCE only)
3. Derived from the clean layer name via `buildAssetKey(cleanName, ctx, ".mp4")` — e.g. layer `work/project/intro-reel` → `work/project/intro-reel.mp4`. A warning is logged noting the derived path so you can verify it matches the CDN.

### poster resolution priority

1. `[pb: poster=...]` annotation
2. Component property `poster`
3. The node is exported as a PNG raster and stored in the ZIP. Key: `{cleanName}/poster.png`.

### Playback defaults

When **none** of `autoplay`, `loop`, `muted` are annotated: defaults to `autoplay: true, loop: true, muted: true` (silent background loop).

When **any one** of the three is explicitly annotated: the unannotated fields default to `false`. So `[pb: autoplay=true]` alone produces `autoplay: true, loop: false, muted: false`.

### Optional fields

| Annotation            | Output field           | Notes                              |
| --------------------- | ---------------------- | ---------------------------------- |
| `showPlayButton=true` | `showPlayButton: true` | Inline player with play/pause UI   |
| `objectFit=cover`     | `objectFit: "cover"`   | CSS object-fit                     |
| `module=myModalId`    | `module: "myModalId"`  | Opens video in that modal on click |

### Common patterns

Silent background loop (no annotations needed if layer name starts with `video`):

```
video-hero [pb: type=elementVideo]
```

Inline player:

```
case-study-film [pb: type=elementVideo, showPlayButton=true]
```

Modal video (click to open in modal):

```
project-reel [pb: type=elementVideo, module=project-video-modal]
```

---

## elementGroup

**Figma source**: `FRAME`, `GROUP`, `COMPONENT`, or `INSTANCE` that has children and no image fill, and is not detected as a button.

Children are stored in a keyed `section.definitions` record.

```json
{
  "type": "elementGroup",
  "id": "card",
  "flexDirection": "column",
  "gap": "16px",
  "alignItems": "flex-start",
  "padding": "24px",
  "width": "100%",
  "height": "320px",
  "backgroundColor": "#ffffff",
  "section": {
    "elementOrder": ["card-image", "card-title", "card-body"],
    "definitions": {
      "card-image": { "type": "elementImage", "...": "..." },
      "card-title": { "type": "elementHeading", "...": "..." },
      "card-body": { "type": "elementBody", "...": "..." }
    }
  }
}
```

Layout props (`flexDirection`, `gap`, `padding`, `alignItems`, `justifyContent`, etc.) are top-level on the group. A solid fill becomes `backgroundColor`.

### Absolute positioning

When a group's Figma parent uses `layoutMode=NONE` (free layout), the child receives CSS absolute-position styles in `wrapperStyle`:

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

The parent group receives a `position: "relative"` hint so the coordinates resolve correctly.

Nodes individually floated out of an auto-layout parent (`layoutPositioning === "ABSOLUTE"` in Figma) also receive absolute-position styles, with `RIGHT`/`BOTTOM` constraint math applied using the parent's dimensions.

---

## elementSpacer

**Figma source**: any node annotated `[pb: type=spacer]`.

```json
{ "type": "elementSpacer", "id": "gap-1", "width": "100%", "height": "48px" }
```

No auto-detection. Dimensions are taken from the node's width and height.

---

## Universal layout props

Available on every element type.

| Field                                                       | Type                   | Source                                           |
| ----------------------------------------------------------- | ---------------------- | ------------------------------------------------ | ----------------------------------------------------- |
| `width` / `height`                                          | `string`               | Node dimensions or `auto`                        |
| `marginTop` / `marginBottom` / `marginLeft` / `marginRight` | `string`               | Auto-layout margin                               |
| `borderRadius`                                              | `string`               | `cornerRadius`                                   |
| `align`                                                     | `string`               | `"left"`, `"center"`, `"right"`, `"full"`        |
| `alignY`                                                    | `string`               | Vertical alignment                               |
| `alignSelf`                                                 | `string`               | `layoutAlign` on child within auto-layout parent |
| `zIndex`                                                    | `number`               | `[pb: zIndex=10]`                                |
| `opacity`                                                   | `number`               | `node.opacity` or `[pb: opacity=0.5]`            |
| `blendMode`                                                 | `string`               | CSS mix-blend-mode                               |
| `hidden`                                                    | `boolean`              | `node.visible === false` or `[pb: hidden=true]`  |
| `overflow`                                                  | `string`               | `clipsContent === true` or `[pb: overflow=...]`  |
| `rotate`                                                    | `number`               | `-node.rotation`                                 |
| `flipHorizontal` / `flipVertical`                           | `boolean`              | `[pb: flipH=true]` / `[pb: flipV=true]`          |
| `boxShadow`                                                 | `string`               | CSS shadow string                                |
| `filter`                                                    | `string`               | CSS filter string                                |
| `backdropFilter`                                            | `string`               | CSS backdrop-filter string                       |
| `wrapperStyle`                                              | `Record<string, string | number>`                                         | Text color, gradient text, borders, absolute position |
| `interactions`                                              | `ElementInteractions`  | onClick, onHoverEnter, etc.                      |
| `visibleWhen`                                               | `ElementVisibleWhen`   | Conditional visibility                           |
| `aria`                                                      | `Record<string, string | boolean>`                                        | aria-label, aria-role, aria-hidden                    |
| `cursor`                                                    | `CursorType`           | Hoisted from `interactions.cursor`               |
| `motionTiming`                                              | `MotionTiming`         | From `[pb: entrance=..., exit=..., ...]`         |

Responsive fields (become tuples when mobile ≠ desktop):

```
width, height, borderRadius, align, alignY, textAlign,
marginTop, marginBottom, marginLeft, marginRight, gap, padding, level, objectFit
```

---

[Back to README](./README.md) | [Annotation system](./02-annotation-system.md) | [Visual properties](./06-visual-properties.md)
