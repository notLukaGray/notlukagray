# Page Builder Schema Semantics

This document is the canonical, human-readable reference for what page-builder content accepts and how values are interpreted.

It intentionally focuses on variable names, accepted values, defaults, and behavior semantics, not raw JSON Schema output.

## Scope

Primary schema sources:

- `packages/contracts/src/page-builder/core/page-builder-schemas/schema-primitives.ts`
- `packages/contracts/src/page-builder/core/page-builder-schemas/element-foundation-schemas.ts`
- `packages/contracts/src/page-builder/core/page-builder-schemas/element-content-schemas.ts`
- `packages/contracts/src/page-builder/core/page-builder-schemas/element-button-schemas.ts`
- `packages/contracts/src/page-builder/core/page-builder-schemas/element-range-schemas.ts`
- `packages/contracts/src/page-builder/core/page-builder-schemas/element-input-schemas.ts`
- `packages/contracts/src/page-builder/core/page-builder-schemas/element-model3d-schemas.ts`
- `packages/contracts/src/page-builder/core/page-builder-schemas/element-rive-schemas.ts`
- `packages/contracts/src/page-builder/core/page-builder-schemas/element-block-schemas.ts`
- `packages/contracts/src/page-builder/core/page-builder-schemas/section-effect-schemas.ts`
- `packages/contracts/src/page-builder/core/page-builder-schemas/section-column-layout-schemas.ts`
- `packages/contracts/src/page-builder/core/page-builder-schemas/section-column-validation.ts`
- `packages/contracts/src/page-builder/core/page-builder-schemas/section-block-base-schemas.ts`
- `packages/contracts/src/page-builder/core/page-builder-schemas/section-block-schemas.ts`
- `packages/contracts/src/page-builder/core/page-builder-schemas/background-block-schemas.ts`
- `packages/contracts/src/page-builder/core/page-builder-schemas/module-block-schemas.ts`
- `packages/contracts/src/page-builder/core/page-builder-schemas/form-field-schemas.ts`
- `packages/contracts/src/page-builder/core/page-builder-schemas/motion-props-schema.ts`
- `packages/contracts/src/page-builder/core/page-builder-schemas/page-definition-and-resolution-schemas.ts`
- `packages/contracts/src/page-builder/core/page-builder-schemas/figma-exporter-meta-schema.ts`

Runtime interpretation sources (defaults, precedence, fallbacks):

- `packages/core/src/internal/page-builder-load.ts`
- `packages/core/src/internal/page-builder-expand.ts`
- `packages/core/src/internal/page-builder-expand/element-resolution.ts`
- `packages/core/src/internal/page-builder-expand/column-namespacing.ts`
- `packages/core/src/internal/page-builder-apply-element-defaults.ts`
- `packages/core/src/internal/page-builder-resolve-entrance-motions.ts`
- `packages/runtime-react/src/page-builder/dev/page-builder-validation.ts`
- `packages/runtime-react/src/page-builder/PageBuilderBackground.tsx`
- `packages/runtime-react/src/page-builder/integrations/framer-motion/section-motion-wrapper.tsx`
- `packages/runtime-react/src/page-builder/elements/Shared/ElementRenderer.tsx`

## Conventions

### Responsive value shapes

- `responsiveString`: `"value"` or `["mobile", "desktop"]`
- `responsiveEnum`: `"value"` or `[mobileValue, desktopValue]`
- `responsiveBoolean`: `true|false` or `{ mobile?: boolean, desktop?: boolean }` (at least one key required)

### Common condition operators

- `equals`
- `notEquals`
- `gt`
- `gte`
- `lt`
- `lte`
- `contains`
- `startsWith`

### Passthrough behavior

Some schemas are `.passthrough()`, so unknown keys are tolerated unless specific nested unions/refinements reject them. Notable locations:

- `elementGroupSchema` — root and nested `section` level use passthrough for extension fields
- `materialDefSchema` — passthrough for extra material slots
- `canvasDefSchema`, `lightDirectionalSchema`, `lightPointSchema`, `lightSpotSchema`, `cameraOrthographicSchema`, `cameraPerspectiveSchema` — passthrough for Three.js-specific extension fields
- `pageBuilderMetaSchema` — passthrough for custom tooling keys

`motionPropsSchema` is **not** passthrough — all accepted Framer Motion props are explicitly enumerated. Unknown keys are stripped at parse time. Motion keyframe key names (inside `initial`/`animate`/`exit`/`while*`) are additionally validated against an allowlist — see below.

## Trigger Actions (`triggerActionSchema`)

Discriminated by `type`.

Core transition/content:

- `contentOverride`
- `backgroundSwitch`
- `startTransition`
- `stopTransition`
- `updateTransitionProgress`

Navigation/scroll:

- `back`
- `navigate`
- `scrollTo`
- `scrollLock`
- `scrollUnlock`

Modal/state/logic:

- `modalOpen`
- `modalClose`
- `modalToggle`
- `setVariable`
- `fireMultiple`
- `conditionalAction`

Visibility/media/browser/analytics/storage:

- `elementShow`
- `elementHide`
- `elementToggle`
- `playSound`
- `stopSound`
- `setVolume`
- `copyToClipboard`
- `vibrate`
- `setDocumentTitle`
- `openExternalUrl`
- `trackEvent`
- `setLocalStorage`
- `setSessionStorage`

3D and asset families:

- `three.*` full action namespace for model, camera, material, scene, transform, post-process, and loops
- `assetPlay`
- `assetPause`
- `assetTogglePlay`
- `assetSeek`
- `assetMute`
- `videoFullscreen`

Rive family:

- `rive.setInput`
- `rive.fireTrigger`
- `rive.play`
- `rive.pause`
- `rive.reset`

Payload contracts:

- `three.*` — all payloads are typed objects with optional fields. `id?: string` targets a specific element; omit to broadcast. All action-specific fields are optional but type-checked — Zod rejects wrong types (e.g. `opacity: "bright"` on `three.setMaterialOpacity`). See typed shapes below.
- `assetPlay/assetPause/assetTogglePlay/assetMute/videoFullscreen` — `payload` is open record. `id?: string` for targeting.
- `assetSeek` — `payload: { id?: string, time?: number }`. Consistent with other asset shapes.
- `rive.setInput` — requires `input: string` (state-machine input name) and `value: boolean|number|string`. `payload.id` optional.
- `rive.fireTrigger` — requires `input: string` (trigger input name). `payload.id` optional.
- `rive.play/pause/reset` — open record; `animationName?: string` is the notable optional key.
- `conditionalAction` supports both shorthand (`variable/operator/value`) and multi-condition branches (`conditions[]` + `logic` + `then/elseIf/else`).

### three.\* typed payload shapes

All payloads share `id?: string`. Action-specific fields:

| Action(s)                                                                                                                                                                                                                                                                                      | Extra fields                                                                                   |
| ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------- |
| `three.load`, `three.unload`, `three.toggleLoaded`, `three.resetCamera`, `three.playVideoTexture`, `three.pauseVideoTexture`, `three.toggleVideoTexture`, `three.resetTransform`, `three.stopContinuousRotate`, `three.stopContinuousFloat`, `three.stopContinuousScale`, `three.orbitDisable` | _(id only)_                                                                                    |
| `three.setVisibility`                                                                                                                                                                                                                                                                          | `visible?: boolean`                                                                            |
| `three.fadeIn`, `three.fadeOut`                                                                                                                                                                                                                                                                | `durationMs?: number`                                                                          |
| `three.playAnimation`, `three.pauseAnimation`, `three.toggleAnimation`, `three.setAnimation`                                                                                                                                                                                                   | `name?: string`                                                                                |
| `three.crossFadeAnimation`                                                                                                                                                                                                                                                                     | `name?: string`, `durationMs?: number`, `warp?: boolean`                                       |
| `three.scrubAnimation`                                                                                                                                                                                                                                                                         | `clip?: string`, `progress?: number` (0–1)                                                     |
| `three.setCameraPreset`, `three.nextCameraPreset`, `three.setCameraEffectsPreset`                                                                                                                                                                                                              | `preset?: string`                                                                              |
| `three.setPosition`                                                                                                                                                                                                                                                                            | `position?: [x,y,z]`, `x?/y?/z?: number`, `durationMs?: number`                                |
| `three.translateBy`                                                                                                                                                                                                                                                                            | `x?/y?/z?: number`, `durationMs?: number`                                                      |
| `three.setRotation`                                                                                                                                                                                                                                                                            | `rotation?: [x,y,z]`, `x?/y?/z?: number`, `durationMs?: number`                                |
| `three.rotateBy`                                                                                                                                                                                                                                                                               | `x?/y?/z?: number`                                                                             |
| `three.setScale`                                                                                                                                                                                                                                                                               | `scale?: number \| [x,y,z]`, `durationMs?: number`                                             |
| `three.scaleBy`                                                                                                                                                                                                                                                                                | `factor?: number`                                                                              |
| `three.animateTo`                                                                                                                                                                                                                                                                              | `position?: [x,y,z]`, `rotation?: [x,y,z]`, `scale?: number \| [x,y,z]`, `durationMs?: number` |
| `three.startContinuousRotate`                                                                                                                                                                                                                                                                  | `axis?: "x"\|"y"\|"z"`, `speed?: number`                                                       |
| `three.startContinuousFloat`                                                                                                                                                                                                                                                                   | `amount?: number`, `speed?: number`                                                            |
| `three.startContinuousScale`                                                                                                                                                                                                                                                                   | `min?: number`, `max?: number`, `speed?: number`                                               |
| `three.animateCamera`                                                                                                                                                                                                                                                                          | `position?: [x,y,z]`, `lookAt?: [x,y,z]`, `fov?: number`, `durationMs?: number`                |
| `three.orbitEnable`                                                                                                                                                                                                                                                                            | `autoRotate?: boolean`, `autoRotateSpeed?: number`                                             |
| `three.setMaterialColor`                                                                                                                                                                                                                                                                       | `color?: string` (hex or CSS), `meshName?: string`                                             |
| `three.setMaterialOpacity`                                                                                                                                                                                                                                                                     | `opacity?: number` (0–1), `meshName?: string`, `durationMs?: number`                           |
| `three.setEmissiveIntensity`                                                                                                                                                                                                                                                                   | `intensity?: number`, `meshName?: string`                                                      |
| `three.setLightIntensity`                                                                                                                                                                                                                                                                      | `intensity?: number`, `index?: number`, `name?: string`                                        |
| `three.setLightColor`                                                                                                                                                                                                                                                                          | `color?: string`, `index?: number`, `name?: string`                                            |
| `three.setPostProcessingParam`                                                                                                                                                                                                                                                                 | `effect?: string`, `param?: string`, `value?: number`                                          |
| `three.togglePostEffect`                                                                                                                                                                                                                                                                       | `effect?: string`, `enabled?: boolean` (omit to toggle)                                        |

## Page Document (`pageBuilderSchema`)

Required:

- `slug: string`
- `title: string`
- `definitions: Record<string, PageBuilderDefinitionBlock>`
- `sectionOrder: string[]`

Optional:

- `description`, `ogImage`
- `preset` and `presets`
- `triggers`
- `bgKey`
- `passwordProtected`
- `assetBaseUrl`
- `onPageProgress` (`triggerAction`)
- `transitions` (single or array of page-level transition effects)
- `disableOverlays`
- `scroll`
- `figmaExportDiagnostics`
- `density` (`comfortable | balanced | compact`)

### Page scroll config

- `smooth?: boolean`
- `lockBody?: boolean`
- `overflowX?: "hidden" | "auto" | "visible"`
- `overflowY?: "auto" | "scroll" | "hidden"`

### Page transition effect types

- `TIME`
- `TRIGGER`
- `SCROLL`

All transition types **require `id: string` (non-empty)**. Multiple transitions must have distinct ids — there is no implicit "default" id and no runtime fallback.

`SCROLL` supports optional:

- `source: "page" | "trigger"`
- `progress: 0..1`
- `progressRange: { start: 0..1, end: 0..1 }` with `start < end`

## Definition Block Union (`pageBuilderDefinitionBlockSchema`)

`definitions.<key>` can be:

- `moduleBlock`
- `bgBlock`
- `sectionBlock`
- `elementBlock`
- `sectionBlockWithElementOrder` (definition-time helper)
- `sectionColumnDefinition` (definition-time helper)

## Background Blocks (`bgBlockSchema`)

Supported `type` values:

- `backgroundVideo`
- `backgroundImage`
- `backgroundVariable`
- `backgroundPattern`
- `backgroundTransition`

### backgroundVideo

- `video: string` (required)
- `poster?: string`
- `overlay?: #RRGGBBAA`

### backgroundImage

- `image: string` (required)

### backgroundVariable

- `layers: bgVarLayer[]` (required)

`bgVarLayer` fields:

- `fill: string` (required)
- `blendMode?: string`
- `opacity?: number`
- `backgroundSize?: string`
- `backgroundPosition?: string`
- `motion?: bgLayerMotion[]`

### backgroundPattern

- `image: string` (required)
- `repeat?: "repeat" | "repeat-x" | "repeat-y" | "no-repeat"`

### backgroundTransition

- `from: bgBlock` (required)
- `to: bgBlock` (required)
- `duration?: positive number`
- `easing?: string`
- `mode?: "progress" | "time"`
- `trigger?: triggerAction`
- `time?: nonnegative number`
- `position?: number | string`
- `progress?: 0..1`
- `progressRange?: { start: 0..1, end: 0..1 }`, `start < end`

Constraint:

- If mode resolves to `time`, `duration` is required.

## Section Effects (`sectionEffectSchema`)

Supported effect `type` values:

- `backdropBlur`
- `glass`
- `dropShadow`
- `innerShadow`
- `glow`
- `opacity`
- `blur`
- `brightness`
- `contrast`
- `saturate`
- `grayscale`
- `sepia`

### divider layer and border helpers

- `dividerLayer`: `fill?`, `blendMode?`, `opacity?`
- `sectionBorder`: `width?`, `style?`, `color?`

### glass effect highlights

- Figma semantic knobs: `lightIntensity`, `lightAngle`, `refraction`, `depth`, `dispersion`, `frost`, `splay`, `mode`, `overLight`, `mouseFollow`
- Derived/exporter fields preserved: `displacementScale`, `blurAmount`, `saturation`, `aberrationIntensity`, `elasticity`, `reflection`
- Physics overrides: `bezelType`, `bezelWidth`, `glassThickness`, `refractiveIndex`, `blur`, `scaleRatio`, `specularOpacity`, `specularSaturation`, `magnifyingScale`, `dropShadow`, `clipPath`, `clipRule`

Bounds examples:

- `refraction` and similar percent-like knobs constrained to expected ranges
- `refractiveIndex >= 1`
- `specularOpacity <= 2`

## Section Base Contract (`baseSectionPropsSchema`)

Common fields available on all section types:

- identity/meta: `id`, `meta`
- visual surface: `fill`, `layers`, `effects`, `border`, `borderRadius`, `boxShadow`, `filter`, `backdropFilter`
- sizing: `width`, `height`, `minWidth`, `maxWidth`, `minHeight`, `maxHeight`
- layout/margins: `align`, `marginLeft`, `marginRight`, `marginTop`, `marginBottom`
- overflow/border edges: `overflow`, `borderTop`, `borderRight`, `borderBottom`, `borderLeft`
- positioning/scroll transforms: `scrollSpeed`, `initialX`, `initialY`, `zIndex`
- viewport triggers: `onVisible`, `onInvisible`, `onProgress`, `onViewportProgress`, `threshold`, `triggerOnce`, `rootMargin`, `delay`
- motion: `motion`, `motionTiming`, `reduceMotion`, `scrollOpacityRange`
- sticky/fixed: `sticky`, `stickyOffset`, `stickyPosition`, `fixed`, `fixedPosition`, `fixedOffset`
- custom trigger arrays: `keyboardTriggers`, `timerTriggers`, `cursorTriggers`, `scrollDirectionTriggers`, `idleTriggers`
- conditional visibility: `visibleWhen`

`visibleWhen` supports:

- single condition form (`variable`, `operator`, `value`)
- multi-condition form (`conditions[]`, `logic: and|or`)

## Section Types (`sectionBlockSchema`)

Allowed `type` values:

- `divider`
- `contentBlock`
- `scrollContainer`
- `sectionColumn`
- `sectionTrigger`
- `formBlock`
- `revealSection`

### divider

- no additional required fields beyond base

### contentBlock

- `elements: ElementBlock[]` (required)
- `reorderable?: boolean`
- `reorderAxis?: "x" | "y"`
- `reorderDragUnit?: "frame" | "content"`
- `reorderDragBehavior?: "elasticSnap" | "free" | "none"`
- `contentWidth?: "full" | "hug" | cssWidthOrFunction` (responsive supported)
- `contentHeight?: "full" | "hug" | cssWidthOrFunction` (responsive supported)

### scrollContainer

- `elements: ElementBlock[]` (required)
- `scrollDirection?: "horizontal" | "vertical" | "both"`
- `scrollProgressTrigger?: { id: string, invert?: boolean, input?: [number, number] }`
- `scrollProgressTriggerId?: string`

### sectionColumn

- `elements: ElementBlock[]` (required)
- `columns` (required)
- `columnAssignments` (required)
- `columnWidths`
- `columnGaps`
- `columnStyles`
- `itemStyles`
- `gridMode`
- `gridDebug`
- `gridAutoRows`
- `elementOrder`
- `columnSpan`
- `itemLayout`
- `contentWidth`
- `contentHeight`

### sectionTrigger

- focused trigger-only section with `onVisible/onInvisible/onProgress` and viewport options

### formBlock

- `fields: FormFieldBlock[]` (required)
- `action?: string`
- `method?: "get" | "post"`
- `actionPayload?: Record<string, string|number|boolean>`
- `contentWidth`, `contentHeight`

### revealSection

- `triggerMode?: "hover" | "click" | "button" | "external" | "combined"`
- `initialRevealed?: boolean`
- `revealOnHover?: boolean`
- `revealOnClick?: boolean`
- `toggleOnClick?: boolean`
- `externalTriggerKey?: string`
- `externalTriggerMode?: "setTrue" | "setFalse" | "toggle"`
- `expandAxis?: "vertical" | "horizontal" | "both"`
- `collapsedSize?: { height?: string, width?: string }`
- `expandedSize?: { height?: string, width?: string }`
- `expandDurationMs?`, `collapseDurationMs?`, `transitionEasing?`
- `collapsedElements?: ElementBlock[]`
- `revealedElements?: ElementBlock[]`
- `revealStaggerMs?`, `revealDurationMs?`, `revealPreset?`

## Section Column Layout Primitives

### columns

- number `1..12`
- or responsive object `{ mobile?: 1..12, desktop?: 1..12 }` with at least one key

### columnWidths

- `"equal"`
- `"hug"`
- array of positive numbers / css width values / `"hug"`
- or responsive object with `mobile`/`desktop`

### columnGaps

- `string`
- `string[]`
- or responsive object of the same

### columnSpan

- per-element value: integer `1..12` or `"all"`
- map form: `Record<elementId, span>`
- or responsive map

### gridMode

- `"columns"` or `"grid"`
- or responsive form

### columnStyle

Accepted keys include:

- `borderRadius`, `border`, `fill`, `padding`, `gap`
- `justifyContent` enum
- `alignItems` enum
- `alignX` enum
- `alignY` enum
- `minHeight`, `maxHeight`, `minWidth`, `maxWidth`, `width`, `height`
- `overflow`, `overflowX`, `overflowY` enums

### itemLayout entry

- `column?: 0..11`
- `row?: >=0`
- `columnSpan?: 1..12 | "all"`
- `rowSpan?: 1..50`
- `order?: int`
- `alignX?: left|center|right|stretch`
- `alignY?: top|center|bottom|stretch`
- `zIndex?: number`

## Section Column Validation Rules

For `sectionColumn` only:

- all `elements[]` must have non-empty, unique `id`
- `elementOrder` ids must exist and not repeat
- `columnAssignments` ids must exist and target valid column indexes
- `columnSpan`, `itemStyles`, and `itemLayout` maps may reference only existing element ids

## Module Block (`moduleBlockSchema`)

Required:

- `type: "module"`
- `contentSlot: string`
- `slots: Record<string, moduleSlot>`
- `overlayMotion` (motion object schema)

Optional:

- `meta`
- `contextType: "video" | "image" | "model3d"`
- `definitionsRef`
- `container?: { padding?, borderRadius?, aspectRatio? }`
- `behavior?: Record<string, number|string|boolean>`
- `style`

### moduleSlot

Layout and positioning keys:

- `position`, `inset`, `top`, `left`, `right`, `bottom`
- `zIndex`
- `display`, `flexDirection`, `alignItems`, `justifyContent`, `gap`
- `flexWrap: "nowrap" | "wrap" | "wrap-reverse"`
- `rowGap`, `columnGap`
- `padding`
- `section?: { elementOrder?, definitions? }`

Interaction/visibility keys:

- `action?: string`
- `visibleWhen?: "always" | string[]`

Motion/transition keys:

- `transition?: { durationMs, easing }` (defaults pulled from motion defaults)
- `expandDurationMs`, `elementRevealMs`, `elementRevealStaggerMs` (defaulted)
- `motion`
- `visibilityPreset`
- `revealPreset`
- `slotWrapperGestures`
- `wrapperMotion?: { whileHover?, whileTap?, whileFocus? }`
- `transformInherit?: "inherit" | "disable" | "follow"`

## Element Base Layout (`elementLayoutSchema`)

Available on every element type that merges this schema:

- identity/meta: `id`, `meta`
- sizing/layout: `width`, `height`, `borderRadius`, `constraints`, `align`, `alignY`, `textAlign`, margins, `zIndex`, `priority`, `fixed`, `figmaConstraints`
- actions/state: `action`, `actionPayload`, `showWhen`
- surface/style/accessibility: `borderGradient`, `wrapperStyle`, `aria`, `opacity`, `blendMode`, `hidden`, `overflow`, `boxShadow`, `filter`, `backdropFilter`, `effects`, `rotate`, `flipHorizontal`, `flipVertical`, `textDecoration`, `textTransform`
- motion/drag/interactions: `motion`, `reduceMotion`, `exitPreset`, `motionTiming`, `dragUnit`, `dragBehavior`, `dragAxis`, `interactions`
- conditional visibility: `visibleWhen`

Key constraints:

- `opacity` is `0..1`
- `borderGradient` cannot be combined with border/outline keys inside `wrapperStyle`

## Element Types (`elementBlockSchema`)

Supported `type` values:

- `elementHeading`
- `elementBody`
- `elementLink`
- `elementImage`
- `elementVideo`
- `elementVector`
- `elementSVG`
- `elementRichText`
- `elementRange`
- `elementInput`
- `elementVideoTime`
- `elementSpacer`
- `elementScrollProgressBar`
- `elementButton`
- `elementModel3D`
- `elementRive`
- `elementGroup`

### elementHeading

Required:

- `level: 1..6`
- `text: string`

Optional highlights:

- `variant: display|section|label`
- `semanticLevel: 1..6`
- `variableKey`
- typography controls (`fontFamily`, `fontSize`, `fontWeight`, spacing, overflow)
- `maxLines` positive int

### elementBody

Required:

- `text: string`

Optional highlights:

- `variant: lead|standard|fine`
- `level` responsive body variant
- `variableKey`
- `color`
- typography controls and `maxLines`

### elementLink

Required:

- `label: string`
- `href: string`
- `copyType: heading|body`

Optional highlights:

- `variant: inline|emphasis|nav`
- `external`
- `level`
- link state tokens (`linkDefault`, `linkHover`, `linkActive`, `linkDisabled`, `linkTransition`)
- `disabled`

Constraint:

- if `copyType = heading`, `level` is required

### elementImage

Required:

- `src: string`
- `alt: string`

Optional highlights:

- `variant: hero|inline|fullCover|feature|crop`
- `objectFit` responsive enum
- `objectPosition`
- `link`
- `aspectRatio`
- `imageCrop` with `focalX/focalY` in `0..1`
- `imageFilters`
- `fillOpacity` in `0..1`

### elementVideo

Required:

- `src: string`
- `poster: string`

Optional highlights:

- `variant: inline|compact|fullcover|hero`
- `ariaLabel`
- `autoplay`, `loop`, `muted`
- `objectFit` responsive enum
- `objectPosition`
- `showPlayButton`
- `link`
- `aspectRatio`
- `module`
- `onVideoPlay`, `onVideoPause`, `onVideoEnd` (`triggerAction`)

Variant alias map:

| Alias        | Resolves to |
| ------------ | ----------- |
| `full`       | `fullcover` |
| `fullscreen` | `fullcover` |
| `cover`      | `fullcover` |
| `featured`   | `hero`      |

Default variant: `inline`. Fields injected per variant: `objectFit`, `aspectRatio`, `module`, `showPlayButton`, `autoplay`, `loop`, `muted`.

### elementVector

Required:

- `viewBox: string`
- `shapes: vectorShape[]`

Optional highlights:

- `ariaLabel`
- `preserveAspectRatio`
- `colors`
- `gradients`
- `strokeGroup`
- `link` (graphic link semantics)

### elementSVG

Required:

- `markup: string`

Optional:

- `ariaLabel`
- `link`

### elementRichText

Required:

- `content: string`

Optional:

- `markup`
- `level`
- `wordWrap`

### elementRange

Optional fields:

- `variant: default|slim|accent`
- `min`, `max`, `step`, `defaultValue`
- `action`, `actionPayload`
- `ariaLabel`
- `style`

`style` supports dedicated range keys:

- `trackColor`
- `fillColor`
- `accentColor`
- `trackHeight`
- `thumbSize`
- `borderRadius`
- plus any extra string/number CSS-like keys

Behavior notes:

- comments document renderer defaults (`min=0`, `max=1`, `step=0.01`, `ariaLabel="Range"`)
- comments document special runtime `action` strings (`volume`, `seek`)

Variant alias map:

| Alias     | Resolves to |
| --------- | ----------- |
| `thick`   | `default`   |
| `thin`    | `slim`      |
| `colored` | `accent`    |

Default variant: `default`. Fields injected per variant: `style.trackColor`, `style.fillColor`, `style.trackHeight`, `style.thumbSize`, `style.borderRadius` (sub-keys merged individually, never overwrites explicitly set sub-keys).

### elementInput

Optional fields:

- `variant: default|compact|minimal`
- `placeholder`
- `ariaLabel`
- `showIcon`
- `color`

Behavior notes:

- comments document runtime defaults (`placeholder="Search"`, `showIcon=true`, default text color)
- `placeholder` is never injected from variant defaults — content authors always set their own

Variant alias map:

| Alias       | Resolves to |
| ----------- | ----------- |
| `search`    | `default`   |
| `text`      | `default`   |
| `condensed` | `compact`   |
| `bare`      | `minimal`   |

Default variant: `default`. Fields injected per variant: `showIcon`, `color`, `height`.

### elementVideoTime

Optional fields:

- `format`
- `level`
- `wordWrap`
- `style`

### elementSpacer

Optional fields:

- `variant: sm|md|lg`

Variant alias map:

| Alias    | Resolves to |
| -------- | ----------- |
| `small`  | `sm`        |
| `medium` | `md`        |
| `large`  | `lg`        |
| `xs`     | `sm`        |
| `xl`     | `lg`        |

Default variant: `md`. Fields injected per variant: `height` (`1rem` / `2rem` / `4rem`).

### elementScrollProgressBar

Optional fields:

- `height`
- `fill`
- `trackBackground`
- `offset` (2-string tuple)

### elementButton

Optional fields:

- `variant: default|accent|ghost|text`
- content/link/action: `label`, `copyType`, `level`, `vectorRef`, `href`, `external`, `action`, `actionPayload`
- link state tokens: `linkDefault`, `linkHover`, `linkActive`, `linkDisabled`, `linkTransition`, `disabled`
- wrapper tokens: `wrapperFill`, `wrapperStroke`, `wrapperFillRef`, `wrapperStrokeRef`, `wrapperPadding`, `wrapperBorderRadius`
- trigger hooks: `pointerDownAction`, `pointerUpAction`

`action` is bound to `buttonActionSchema` — a strict enum of all supported action strings. Unknown action values fail schema. In dev, a named warning is emitted at load time for unrecognized values (migration grace period before hard fail).

Constraints:

- cannot use both `href` and `action` simultaneously
- `actionPayload` accepts any value and is intentionally untyped

Variant alias map:

| Alias       | Resolves to |
| ----------- | ----------- |
| `primary`   | `accent`    |
| `secondary` | `ghost`     |
| `tertiary`  | `text`      |
| `link`      | `text`      |
| `naked`     | `text`      |

Default variant: `default`. Fields injected per variant: `copyType`, `level` (from `typography` binding), `wrapperFill`, `wrapperStroke`, `wrapperPadding`, `wrapperBorderRadius`. The `text` variant injects no wrapper styling (naked text link).

### elementModel3D

Required:

- `scene`

Optional highlights:

- `ariaLabel`
- `initiallyLoaded`
- `textures`, `materials`, `models`
- `canvas`
- `postProcessing`
- `module`

3D subtypes include:

- texture defs (`image` or `video`)
- light defs (`ambient`, `directional`, `point`, `spot`)
- camera defs (`orthographic`, `perspective`)
- post-processing (`brightnessContrast`, `noise`, `bloom`, `ssao`)

### elementRive

Required:

- `src`

Optional:

- `artboard`
- `stateMachine`
- `autoplay`
- `ariaLabel`
- `onStateChange`

### elementGroup

Required:

- `section: { definitions: Record<string, ElementBlock>, elementOrder? }`

`section.definitions` is now recursively validated as `ElementBlock` via `z.lazy()`. Invalid nested element payloads fail schema at parse time.

Optional highlights:

- flex/grid wrapper controls (`display`, `flexDirection`, `alignItems`, `justifyContent`, `gap`, `flexWrap`, `rowGap`, `columnGap`, `columnCount`, `padding`, per-side paddings)
- `effects`
- `.passthrough()` at root and nested section level for extension fields

## Form Fields (`formFieldBlockSchema`)

Required:

- `type: "formField"`
- `fieldType`

`fieldType` allowed values:

- `text`
- `email`
- `password`
- `tel`
- `url`
- `number`
- `date`
- `paragraph`
- `checkbox`
- `checkboxGroup`
- `radio`
- `select`
- `switch`
- `range`
- `file`
- `hidden`
- `submit`

Optional content/validation fields:

- `level`, `name`, `label`, `placeholder`, `required`, `value`
- `minLength`, `maxLength`, `pattern`, `rows`
- `min`, `max`, `step` (number|string)
- `options` (`{ value, label }[]`)
- `accept`, `multiple`, `loadingText`

Optional style fields:

- `width`, `align`, margins, `textAlign`, `padding`
- `fill`, `stroke`, `borderRadius`, `borderWidth`
- `wrapperStyle`
- `labelClassName`, `inputClassName`, `inputStyle`, `errorClassName`

Enforced constraints (`superRefine`):

- `select`, `radio`, `checkboxGroup` require a non-empty `options` array
- `submit` requires a non-empty `label`
- `multiple: true` is only valid on `file` and `select` fields

## Metadata (`pageBuilderMetaSchema`)

`meta` supports:

- `figma?: figmaExporterMeta`
- passthrough custom keys

`figmaExporterMeta` optional fields:

- `sourceType`
- `sourceName`
- `fallbackReason`
- `originalLayers` (`dividerLayer[]`)

## Runtime Semantics and Precedence (Important)

These behaviors are runtime-level and may not be obvious from schema shapes:

### Validation and loading

- Dev validation flattens union-branch errors, dedupes output, and appends expected/received/current-value metadata.
- Validation tries to map `definitions.*` paths back to concrete source files.
- Runtime loading is non-blocking on schema failures unless strict validation mode is enabled.

### Page expansion and ID normalization

- invalid/missing entries in `sectionOrder` are silently dropped during expansion; in dev, a named warning is emitted per dropped key.
- `bgKey` falls back to `"bg"` when omitted; in dev, a warning is emitted when no explicit `bgKey` is set.
- element ids may be synthesized from the definition key when `id` is absent; in dev, a warning is emitted per synthesized id.
- element ids are deduplicated with `__N` suffixes when the same base id appears multiple times in a section.
- section scoping can namespace ids (`sectionId:elementId`) across element order and column maps.

### Default injection pipeline

- element defaults (heading, body, link, image, button, video, input, range, spacer — all with variant aliases) are injected post-parse.
- resolved entrance motion (`motionTiming.resolvedEntranceMotion`) is injected post-parse.
- precedence is effectively:
  - explicit entrance motion
  - element motion
  - preset/default motion

### API-level behavior differences

- some APIs return expanded data without default/motion injection.
- the page-builder props pipeline applies default and entrance-motion injection.

### Background transitions

- rendering precedence picks active transitions first, then static background fallback.
- missing transition refs (`from`/`to`) can resolve to no-op visuals without hard failure.
- `id` is required on all transition types; runtime drops transitions with missing/empty ids in dev with a warning.
- `TIME` transitions auto-start on mount.

### Section/element rendering behavior

- unknown section/element types are dev-warned and dropped from render.
- sticky/fixed offsets often default to `"0px"` in runtime components when omitted.
- section motion timing path can override raw motion behavior.
- reduced motion and in-viewport-on-mount can force immediate final visual state.
- `visibleWhen` defaults to permissive behavior when no condition is provided.

### Form submission behavior

- form `action` is interpreted via an allowlisted action-key map at runtime.
- unknown action keys can become silent no-submit behavior.

## Motion Keyframe Key Allowlist

`initial`, `animate`, `exit`, `whileHover`, `whileTap`, `whileFocus`, `whileDrag`, `whileInView` keyframe objects validate each key against a known Framer Motion property set. Unknown keys that don't start with `--` fail with a targeted error.

CSS custom properties (`--myVar: value`) are always allowed as an escape hatch.

Notable supported keys: `x`, `y`, `z`, `rotate`, `rotateX/Y/Z`, `scale`, `scaleX/Y`, `skew`, `skewX/Y`, `opacity`, `color`, `backgroundColor`, `borderColor`, `fill`, `stroke`, `fillOpacity`, `strokeOpacity`, `width`, `height`, `top`, `left`, `right`, `bottom`, `borderRadius`, `boxShadow`, `clipPath`, `filter`, `backdropFilter`, `pathLength`, `pathOffset`, `pathSpacing`, `originX/Y/Z`, `perspective`, `zIndex`, `cursor`, `textShadow`, `outline`, `transition` (per-property override), and standard text/border/background shorthands.

## Motion Props (`motionPropsSchema`)

Available on every element via `elementLayoutSchema.motion`. All fields optional. Schema is strict — no passthrough; unknown keys are stripped at parse time.

Framer Motion props explicitly enumerated:

- keyframes: `initial`, `animate`, `exit`, `transition`
- variant system: `initialVariant`, `animateVariant`, `exitVariant`, `variants` (record of named animation states)
- layout animations: `layout`, `layoutId`, `layoutDependency`, `layoutScroll`, `layoutRoot`
- custom/presence: `custom` (pass-through to variant resolver), `presenceAffectsLayout`
- gesture states: `whileInView`, `whileHover`, `whileTap`, `whileFocus`, `whileDrag`
- viewport: `viewport`
- drag: `drag`, `dragConstraints`, `dragElastic`, `dragMomentum`, `dragTransition`, `dragSnapToOrigin`, `dragDirectionLock`, `dragPropagation`
- custom: `inheritMode`, `inherit`, `motionTiming`

### FM variant system availability

`variants`, `initialVariant`, `animateVariant`, `exitVariant` are available on **every element type** — heading, body, link, image, video, vector, SVG, button, richText, spacer, scrollProgressBar, range, input, videoTime, model3D, Rive, group — all of them, via `elementLayoutSchema.motion`. No element type is excluded.

The FM variant system (`variants` map + `*Variant` string refs) is distinct from the page-builder `variant` field (visual/layout presets like `"display"` or `"hero"`). They do not interact.

## Known Gaps Remaining

- Form `action` key (on `formBlock`) is an unvalidated string — unknown action keys produce silent no-submit behavior at runtime. The valid action keys are handled by an allowlist inside the form submission handler, not enforced at schema level.

## Authoring Guardrails

Recommended team rules on top of schema:

- Always set explicit variant keys for heading/body/link/image in reusable presets.
- Require explicit ids for all section-column elements.
- Always set `id` on all page transitions — now schema-enforced, not a convention.
- Prefer explicit `visibleWhen.logic` (`and` or `or`) in authored JSON for readability.
- Set `bgKey` explicitly on every page document — implicit `"bg"` fallback emits a dev warning.
- Set explicit `id` on every element — synthesized ids from definition keys emit dev warnings and are unstable across refactors.
- Only use action strings from the `buttonActionSchema` enum — unknown values emit dev warnings now, and will fail hard in a future strict pass.
