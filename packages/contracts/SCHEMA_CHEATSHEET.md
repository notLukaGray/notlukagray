# Schema Authoring Reference

This document is for writing page-builder JSON without reading TypeScript source.

For exhaustive variable/value semantics (including runtime defaults, precedence, and known schema gaps), see
[`../../docs/page-builder-schema-semantics.md`](../../docs/page-builder-schema-semantics.md).

## Conventions

- **Responsive string fields** accept either:
  - a single value: `"24px"`
  - a mobile/desktop tuple: `["20px", "32px"]`
- **Responsive enum fields** use the same tuple pattern.
- **Responsive booleans** accept either:
  - `true` / `false`
  - `{ "mobile": true, "desktop": false }`
- `definitions` is a map keyed by ID; `sectionOrder` / `elementOrder` reference those keys.
- Most schemas are `.passthrough()` in source, so unknown extension keys are tolerated.

## 1) Page Document (`pageBuilderSchema`)

`slug`, `title`, `definitions`, and `sectionOrder` are required.

```jsonc
{
  "slug": "work/example",
  "title": "Example Page",
  "description": "Optional",
  "ogImage": "Optional",

  "definitions": {
    "heroSection": {
      "type": "contentBlock",
      "elements": [],
    },
    "sharedModule": {
      "type": "module",
      "contentSlot": "main",
      "slots": {
        "main": {
          "section": {
            "definitions": {},
            "elementOrder": [],
          },
        },
      },
      "overlayMotion": {
        "initial": { "opacity": 0 },
        "animate": { "opacity": 1 },
      },
    },
  },

  "sectionOrder": ["heroSection"],

  "preset": {},
  "presets": [],
  "triggers": [],
  "bgKey": "Optional",
  "passwordProtected": false,
  "assetBaseUrl": "Optional",
  "onPageProgress": { "type": "trackEvent", "payload": { "event": "page_progress" } },
  "transitions": {
    "type": "TIME",
    "from": "bgA",
    "to": "bgB",
    "duration": 0.6,
  },
  "disableOverlays": ["header"],
  "scroll": {
    "smooth": true,
    "lockBody": false,
    "overflowX": "hidden",
    "overflowY": "auto",
  },
  "density": "balanced",
  "figmaExportDiagnostics": {
    "version": 1,
    "converted": 10,
    "fallback": 0,
    "dropped": 0,
    "topFallbackReasons": [],
  },
}
```

## 2) Section Types (`sectionBlockSchema`)

Allowed `type` values:

- `divider`
- `contentBlock`
- `scrollContainer`
- `sectionColumn`
- `sectionTrigger`
- `formBlock`
- `revealSection`

### Common Section Fields (base)

All section types can use fields like:

- layout/style: `fill`, `layers`, `effects`, `width`, `height`, `align`, `margin*`, `borderRadius`, `border`, `zIndex`, `overflow`
- motion/visibility: `motion`, `motionTiming`, `reduceMotion`, `visibleWhen`, `hidden`
- triggers: `onVisible`, `onInvisible`, `onProgress`, `onViewportProgress`, plus keyboard/timer/cursor/idle trigger arrays
- positioning: `sticky*`, `fixed*`
- metadata: `id`, `meta`

### `contentBlock`

```jsonc
{
  "type": "contentBlock",
  "id": "hero",
  "elements": [
    /* element blocks */
  ],
  "contentWidth": "full",
  "contentHeight": ["hug", "full"],
  "reorderable": false,
}
```

### `scrollContainer`

```jsonc
{
  "type": "scrollContainer",
  "elements": [
    /* element blocks */
  ],
  "scrollDirection": "horizontal",
  "scrollProgressTrigger": {
    "id": "galleryProgress",
    "input": [0, 1],
  },
}
```

### `sectionColumn`

Required: `elements`, `columns`, `columnAssignments`, `columnWidths`, `columnGaps`, `columnStyles`, `itemStyles`, `gridMode`, `elementOrder`, `itemLayout`.

```jsonc
{
  "type": "sectionColumn",
  "elements": [
    /* element blocks with unique ids */
  ],
  "columns": 3,
  "columnAssignments": {
    "title": 0,
    "body": 1,
    "cta": 2,
  },
  "columnWidths": "equal",
  "columnGaps": "24px",
  "columnStyles": [],
  "itemStyles": {},
  "gridMode": "columns",
  "elementOrder": ["title", "body", "cta"],
  "itemLayout": {},
  "columnSpan": {
    "body": 2,
  },
}
```

### `sectionTrigger`

```jsonc
{
  "type": "sectionTrigger",
  "id": "introTrigger",
  "onVisible": {
    "type": "trackEvent",
    "payload": { "event": "intro_visible" },
  },
  "threshold": 0.25,
  "triggerOnce": true,
}
```

### `formBlock`

```jsonc
{
  "type": "formBlock",
  "fields": [
    {
      "type": "formField",
      "fieldType": "email",
      "name": "email",
      "label": "Email",
      "required": true,
    },
    {
      "type": "formField",
      "fieldType": "submit",
      "label": "Send",
    },
  ],
  "method": "post",
  "action": "/api/forms/contact",
}
```

### `revealSection`

```jsonc
{
  "type": "revealSection",
  "triggerMode": "click",
  "initialRevealed": false,
  "expandAxis": "vertical",
  "collapsedElements": [
    /* element blocks */
  ],
  "revealedElements": [
    /* element blocks */
  ],
  "expandDurationMs": 240,
  "collapseDurationMs": 180,
}
```

## 3) Element Types (`elementBlockSchema`)

Every element can use layout/motion/visibility fields from `elementLayoutSchema` (for example `id`, `width`, `height`, `align`, `wrapperStyle`, `motion`, `motionTiming`, `visibleWhen`, `interactions`, `zIndex`, `meta`).

### Element Type Quick Map

| `type`             | Required fields             |
| ------------------ | --------------------------- |
| `elementHeading`   | `level`, `text`             |
| `elementBody`      | `text`                      |
| `elementLink`      | `label`, `href`, `copyType` |
| `elementImage`     | `src`, `alt`                |
| `elementVideo`     | `src`, `poster`             |
| `elementVector`    | `viewBox`, `shapes`         |
| `elementSVG`       | `markup`                    |
| `elementRichText`  | `content`                   |
| `elementRange`     | none besides `type`         |
| `elementInput`     | none besides `type`         |
| `elementVideoTime` | none besides `type`         |
| `elementSpacer`    | none besides `type`         |
| `elementButton`    | none besides `type`         |
| `elementModel3D`   | `scene`                     |
| `elementRive`      | `src`                       |
| `elementGroup`     | `section.definitions`       |

### Examples

#### Heading

```jsonc
{
  "type": "elementHeading",
  "id": "title",
  "level": 2,
  "text": "System-first title",
  "semanticLevel": 1,
}
```

#### Body

```jsonc
{
  "type": "elementBody",
  "id": "body",
  "text": "Body copy",
  "level": 3,
}
```

#### Link

```jsonc
{
  "type": "elementLink",
  "id": "docsLink",
  "label": "Open docs",
  "href": "/docs",
  "copyType": "body",
  "external": false,
}
```

#### Image

```jsonc
{
  "type": "elementImage",
  "id": "heroImage",
  "src": "media/hero.jpg",
  "alt": "Hero visual",
  "objectFit": "cover",
}
```

#### Video

```jsonc
{
  "type": "elementVideo",
  "id": "heroVideo",
  "src": "media/hero.mp4",
  "poster": "media/hero-poster.jpg",
  "autoplay": true,
  "muted": true,
  "loop": true,
}
```

#### Button

Use either `href` or `action` (not both).

```jsonc
{
  "type": "elementButton",
  "id": "cta",
  "label": "Contact",
  "href": "/contact",
  "external": false,
}
```

```jsonc
{
  "type": "elementButton",
  "id": "openModal",
  "label": "Open",
  "action": "modalOpen",
  "actionPayload": { "id": "contact" },
}
```

#### 3D

```jsonc
{
  "type": "elementModel3D",
  "id": "model",
  "scene": {
    "camera": { "type": "perspective", "fov": 45 },
    "contents": {
      "models": [{ "model": "shoeModel", "position": [0, 0, 0], "scale": 1 }],
    },
  },
  "models": {
    "shoeModel": { "geometry": "models/shoe.glb" },
  },
}
```

#### Rive

```jsonc
{
  "type": "elementRive",
  "id": "riveLogo",
  "src": "animations/logo.riv",
  "stateMachine": "Main",
  "autoplay": true,
}
```

#### Element group

```jsonc
{
  "type": "elementGroup",
  "id": "groupA",
  "section": {
    "definitions": {
      "childText": {
        "type": "elementBody",
        "text": "Grouped child",
      },
    },
    "elementOrder": ["childText"],
  },
  "display": "flex",
  "gap": "16px",
}
```

## 4) Module Blocks (`moduleBlockSchema`)

`contentSlot`, `slots`, and `overlayMotion` are required.

```jsonc
{
  "type": "module",
  "contentSlot": "main",
  "slots": {
    "main": {
      "position": "relative",
      "section": {
        "definitions": {
          "headline": {
            "type": "elementHeading",
            "level": 3,
            "text": "Module slot",
          },
        },
        "elementOrder": ["headline"],
      },
    },
  },
  "overlayMotion": {
    "initial": { "opacity": 0 },
    "animate": { "opacity": 1 },
    "transition": { "duration": 0.3 },
  },
  "contextType": "image",
}
```

## 5) Background Blocks (`bgBlockSchema`)

Allowed `type` values:

- `backgroundVideo`
- `backgroundImage`
- `backgroundVariable`
- `backgroundPattern`
- `backgroundTransition`

### Examples

```jsonc
{ "type": "backgroundImage", "image": "media/bg.jpg" }
```

```jsonc
{
  "type": "backgroundVariable",
  "layers": [
    {
      "fill": "linear-gradient(120deg, #111, #333)",
      "opacity": 1,
    },
  ],
}
```

```jsonc
{
  "type": "backgroundTransition",
  "from": { "type": "backgroundImage", "image": "media/a.jpg" },
  "to": { "type": "backgroundImage", "image": "media/b.jpg" },
  "mode": "time",
  "duration": 0.6,
}
```

## 6) Form Fields (`formFieldBlockSchema`)

Required: `type: "formField"`, `fieldType`.

Allowed `fieldType`:

- `text`, `email`, `password`, `tel`, `url`, `number`, `date`
- `paragraph`
- `checkbox`, `checkboxGroup`, `radio`, `select`, `switch`, `range`, `file`
- `hidden`, `submit`

### Example

```jsonc
{
  "type": "formField",
  "fieldType": "select",
  "name": "topic",
  "label": "Topic",
  "required": true,
  "options": [
    { "value": "support", "label": "Support" },
    { "value": "sales", "label": "Sales" },
  ],
  "width": "100%",
}
```

## 7) Trigger Actions (`triggerActionSchema`)

`triggerActionSchema` is a discriminated union on `type`.

### Common action families

- navigation: `navigate`, `back`, `scrollTo`, `scrollLock`, `scrollUnlock`
- modal: `modalOpen`, `modalClose`, `modalToggle`
- state/logic: `setVariable`, `fireMultiple`, `conditionalAction`
- element visibility: `elementShow`, `elementHide`, `elementToggle`
- media/browser/analytics/storage actions
- advanced `three.*` and `rive.*` actions

### Examples

```jsonc
{ "type": "navigate", "payload": { "href": "/work/example" } }
```

```jsonc
{ "type": "modalOpen", "payload": { "id": "contact" } }
```

```jsonc
{
  "type": "setVariable",
  "payload": {
    "key": "theme",
    "value": "dark",
  },
}
```

```jsonc
{
  "type": "fireMultiple",
  "payload": {
    "mode": "sequence",
    "actions": [
      { "type": "elementShow", "payload": { "id": "panel" } },
      { "type": "trackEvent", "payload": { "event": "panel_opened" } },
    ],
  },
}
```

## 8) Capability Schemas

- importer: `importerCapabilitySchema`
- exporter: `exporterCapabilitySchema`
- CMS adapter: `cmsAdapterCapabilitySchema`

JSON Schema artifacts:

- `dist/schemas/capability-importer.schema.json`
- `dist/schemas/capability-exporter.schema.json`
- `dist/schemas/capability-cms-adapter.schema.json`

## 9) Version Fields

- `CONTRACT_VERSION`
- `SUPPORTED_CONTRACT_VERSIONS`

Import from `@pb/contracts/version` when you only need version metadata.

## 10) Regenerate JSON Schema Artifacts

```bash
npm run contracts:generate-schemas
```

or

```bash
npm run generate-schemas --workspace @pb/contracts
```
