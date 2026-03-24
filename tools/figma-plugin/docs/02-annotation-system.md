# Annotation System

Annotations embed page-builder metadata directly in Figma layer names. The plugin strips them from the name before generating element IDs.

---

## Syntax

```
Layer Name [pb: key=value, key2=value2]
```

Rules:

- The block must appear at the very end of the name.
- Multiple key-value pairs are separated by commas.
- Keys are lowercased and trimmed before matching — `Type`, `type`, and `TYPE` are all equivalent.
- Values are bare strings; no quoting is required or supported.
- A bare key with no `=` is treated as a boolean flag with value `"true"` — `[pb: sticky]` equals `[pb: sticky=true]`.
- The annotation is stripped before the layer name is used to generate the element ID.

```
Hero Section [pb: sticky=true, stickyOffset=64px]
Card Overlay [pb: hidden=true, visibleWhen=isHovered:equals:true]
Reveal Block [pb: type=revealSection, triggerMode=click]
FAQ Item [pb: type=revealSection]
```

---

## Type overrides

These force a specific element or section type, bypassing auto-detection heuristics. They can be applied to **any** node type.

| Annotation                          | Forces type             |
| ----------------------------------- | ----------------------- |
| `type=button`                       | `elementButton`         |
| `type=image`                        | `elementImage`          |
| `type=svg`                          | `elementSVG`            |
| `type=spacer`                       | `elementSpacer`         |
| `type=video` or `type=elementVideo` | `elementVideo`          |
| `type=sectionColumn`                | `sectionColumn` section |
| `type=revealSection`                | `revealSection` section |

---

## Semantic text style annotation

Applies to `TEXT` nodes. Emits only the semantic level — raw typography props (fontFamily, fontSize, etc.) are **not** extracted when this annotation is present.

```
Headline [pb: style=h1]
Sub-heading [pb: style=h3]
Caption [pb: style=body3]
```

| Annotation    | Element type     | Level |
| ------------- | ---------------- | ----- |
| `style=h1`    | `elementHeading` | 1     |
| `style=h2`    | `elementHeading` | 2     |
| `style=h3`    | `elementHeading` | 3     |
| `style=h4`    | `elementHeading` | 4     |
| `style=h5`    | `elementHeading` | 5     |
| `style=body1` | `elementBody`    | 1     |
| `style=body2` | `elementBody`    | 2     |
| `style=body3` | `elementBody`    | 3     |
| `style=body4` | `elementBody`    | 4     |
| `style=body5` | `elementBody`    | 5     |
| `style=body6` | `elementBody`    | 6     |

Without this annotation, the plugin infers heading vs body from font size and weight, and infers the level from font size thresholds. See [04-element-types.md](./04-element-types.md) for the heuristic.

---

## Motion shorthand

Works on **elements and sections**. Produces a `motionTiming` object in the output when `entrance` or `exit` is set.

```
Hero Heading [pb: entrance=slideUp, duration=0.5, delay=0.2]
Stats Section [pb: entrance=fade, trigger=onFirstVisible, viewportAmount=0.15]
Card [pb: entrance=slideRight, exit=fade]
```

| Key              | Valid values                                               | Default          |
| ---------------- | ---------------------------------------------------------- | ---------------- |
| `entrance`       | `fade`, `slideUp`, `slideDown`, `slideLeft`, `slideRight`  | —                |
| `exit`           | same as entrance                                           | —                |
| `trigger`        | `onMount`, `onFirstVisible`, `onEveryVisible`, `onTrigger` | `onFirstVisible` |
| `duration`       | float (seconds), e.g. `0.5`                                | —                |
| `delay`          | float (seconds), e.g. `0.2`                                | —                |
| `viewportAmount` | float `0.0`–`1.0`                                          | —                |

When neither `entrance` nor `exit` is set, no `motionTiming` is emitted and all other motion keys are ignored.

### Output shape

```json
{
  "motionTiming": {
    "trigger": "onFirstVisible",
    "entrancePreset": "slideUp",
    "exitPreset": "fade",
    "viewport": { "amount": 0.15 },
    "entranceMotion": { "transition": { "duration": 0.5, "delay": 0.2 } }
  }
}
```

---

## Section annotations

Applied to top-level frame layers.

| Key              | Format / values                             | Effect                                 |
| ---------------- | ------------------------------------------- | -------------------------------------- |
| `fill`           | CSS color string                            | Override the extracted background fill |
| `overflow`       | `hidden`, `visible`, `auto`, `scroll`       | Override CSS overflow                  |
| `hidden`         | `true`                                      | Set `display:none` statically          |
| `sticky`         | `true`                                      | Sticky positioning                     |
| `stickyOffset`   | e.g. `64px`                                 | Top offset when sticky                 |
| `stickyPosition` | `top`, `bottom`                             | Which edge to stick to                 |
| `visibleWhen`    | `variable:operator:value`                   | Conditional section visibility         |
| `scrollOpacity`  | `inputStart:inputEnd:outputStart:outputEnd` | Scroll-driven opacity mapping          |
| `triggerOnce`    | `true`                                      | Fire viewport triggers only once       |
| `threshold`      | `0.0`–`1.0`                                 | Intersection observer threshold        |
| `rootMargin`     | CSS margin string                           | Intersection observer root margin      |
| `delay`          | milliseconds                                | Entrance animation delay               |
| `ariaLabel`      | string                                      | `aria-label` on the section wrapper    |
| `scrollSpeed`    | float, e.g. `0.6`                           | Parallax scroll speed                  |

---

## Section trigger annotations

### Viewport triggers

```
[pb: onVisible=elementShow:counter]
[pb: onInvisible=elementHide:counter]
```

| Key           | Format             | Fires when                  |
| ------------- | ------------------ | --------------------------- |
| `onVisible`   | `actionType:param` | Section enters the viewport |
| `onInvisible` | `actionType:param` | Section leaves the viewport |

### Timer triggers

```
[pb: timer=2000:elementShow:promo-banner]
[pb: timerInterval=1000:5000:navigate:/next-slide]
[pb: timer2=5000:modalOpen:idle-prompt]
```

| Key                                | Format                                | Fires when                               |
| ---------------------------------- | ------------------------------------- | ---------------------------------------- |
| `timer`                            | `delayMs:actionType:param`            | Once after `delayMs` milliseconds        |
| `timer2`, `timer3`                 | same as `timer`                       | Additional independent timers            |
| `timerInterval`                    | `delayMs:intervalMs:actionType:param` | After `delayMs`, then every `intervalMs` |
| `timerInterval2`, `timerInterval3` | same as `timerInterval`               | Additional interval timers               |

### Keyboard triggers

```
[pb: key=ArrowRight:navigate:/next]
[pb: key=Escape:modalClose, key2=k+ctrl:modalOpen:search]
```

| Key            | Format                               | Notes                   |
| -------------- | ------------------------------------ | ----------------------- |
| `key`          | `keyToken+modifier:actionType:param` | Fires on keydown        |
| `key2`, `key3` | same as `key`                        | Additional key bindings |

Modifiers appended with `+`: `ctrl`, `shift`, `alt`, `meta`. Examples: `ArrowRight`, `Escape`, `k+ctrl`, `Enter+shift`.

### Scroll direction triggers

```
[pb: onScrollDown=elementHide:nav-bar, onScrollUp=elementShow:nav-bar]
```

| Key            | Format             | Fires when                         |
| -------------- | ------------------ | ---------------------------------- |
| `onScrollDown` | `actionType:param` | User scrolls down past the section |
| `onScrollUp`   | `actionType:param` | User scrolls up past the section   |

### Idle trigger

```
[pb: idle=5000:modalOpen:idle-prompt]
```

Format: `idleAfterMs:actionType:param`. Fires once after the user has been idle for `idleAfterMs` milliseconds.

### Cursor trigger

```
[pb: cursor=x:updateTransitionProgress:bg-anim]
```

Format: `axis:actionType:param`. Axis must be `x` or `y`. Fires on cursor movement along the given axis.

---

## Section effect annotations

```
[pb: effect=parallax:0.6]
[pb: effect=scrollFade, effect2=blur:10]
```

| Key                  | Format             | Multiple           |
| -------------------- | ------------------ | ------------------ |
| `effect`             | `effectType:param` | —                  |
| `effect2`, `effect3` | same as `effect`   | Additional effects |

| Effect type      | Example        | Output                             |
| ---------------- | -------------- | ---------------------------------- |
| `parallax:speed` | `parallax:0.6` | `{ type: "parallax", speed: 0.6 }` |
| `scrollFade`     | `scrollFade`   | `{ type: "fade" }`                 |
| `blur:amount`    | `blur:10`      | `{ type: "blur", amount: 10 }`     |

Unknown effect types are passed through as `{ type: effectType, param }`.

---

## revealSection-specific annotations

Applied to the frame that carries `[pb: type=revealSection]`.

| Key                  | Values                                             | Default    |
| -------------------- | -------------------------------------------------- | ---------- |
| `triggerMode`        | `click`, `hover`, `button`, `external`, `combined` | `click`    |
| `expandAxis`         | `vertical`, `horizontal`, `both`                   | `vertical` |
| `initialRevealed`    | `true`                                             | `false`    |
| `revealPreset`       | e.g. `fadeUp`, `slideDown`                         | —          |
| `expandDurationMs`   | milliseconds, e.g. `300`                           | —          |
| `externalTriggerKey` | string                                             | —          |

### Child frame slot names

| Slot                | Matched child names                       |
| ------------------- | ----------------------------------------- |
| `collapsedElements` | `collapsed`, `header`, `trigger`, `peek`  |
| `revealedElements`  | `revealed`, `content`, `expanded`, `body` |

Name matching is case-insensitive. When a named container frame is found, the converter walks its direct children and flattens them into the slot array — the container frame itself is not emitted. If no named slots are found, all children go to `revealedElements`.

---

## Element annotations

### Type and source

| Key      | Values             | Effect                          |
| -------- | ------------------ | ------------------------------- |
| `type`   | see Type overrides | Force element type              |
| `src`    | path or URL        | Asset source for image or video |
| `alt`    | string             | Image alt text override         |
| `poster` | path               | Video poster image path         |

### Video-specific

| Key              | Values               | Default when no playback annotations are set |
| ---------------- | -------------------- | -------------------------------------------- |
| `autoplay`       | `true`, `false`      | `true`                                       |
| `loop`           | `true`, `false`      | `true`                                       |
| `muted`          | `true`, `false`      | `true`                                       |
| `showPlayButton` | `true`, `false`      | —                                            |
| `objectFit`      | CSS object-fit value | —                                            |
| `module`         | modal ID string      | — (for modal video playback)                 |

When none of `autoplay`, `loop`, `muted` are set, defaults are `autoplay: true, loop: true, muted: true` (silent background loop). As soon as any one of the three is explicitly annotated, the other two default to `false`.

### Visibility and layout

| Key           | Format                                | Effect                 |
| ------------- | ------------------------------------- | ---------------------- |
| `hidden`      | `true`                                | Static `display:none`  |
| `opacity`     | `0`–`1`                               | CSS opacity            |
| `blendMode`   | CSS blend mode, e.g. `multiply`       | CSS `mix-blend-mode`   |
| `overflow`    | `hidden`, `visible`, `auto`, `scroll` | CSS overflow           |
| `zIndex`      | integer                               | CSS z-index            |
| `flipH`       | `true`                                | `flipHorizontal: true` |
| `flipV`       | `true`                                | `flipVertical: true`   |
| `visibleWhen` | `variable:operator:value`             | Conditional visibility |

### Button-specific

| Key        | Values             | Effect                                 |
| ---------- | ------------------ | -------------------------------------- |
| `href`     | path or URL        | Button link target                     |
| `label`    | string             | Button label override                  |
| `variant`  | string             | Button variant                         |
| `size`     | string             | Button size                            |
| `disabled` | `true`             | Disabled state                         |
| `action`   | `actionType:param` | Sets `pointerDownAction` on the button |

### Text-specific

| Key           | Values                     | Effect                                                    |
| ------------- | -------------------------- | --------------------------------------------------------- |
| `style`       | `h1`–`h5`, `body1`–`body6` | Semantic style — emits level only, skips raw typography   |
| `variableKey` | string                     | Render page-builder variable value instead of static text |
| `contentKey`  | string                     | Stored as `data-content-key` in `wrapperStyle`            |

### Accessibility

| Key          | Values | Effect               |
| ------------ | ------ | -------------------- |
| `ariaLabel`  | string | `aria.label`         |
| `ariaRole`   | string | `aria.role`          |
| `ariaHidden` | `true` | `aria.hidden = true` |

### Image positioning

| Key              | Values                              | Effect                                  |
| ---------------- | ----------------------------------- | --------------------------------------- |
| `objectPosition` | CSS position, e.g. `top`, `50% 30%` | Overrides auto-derived `objectPosition` |

---

## Element interaction annotations

| Key             | Format             | Maps to                                 |
| --------------- | ------------------ | --------------------------------------- |
| `onClick`       | `actionType:param` | `interactions.onClick`                  |
| `onHoverEnter`  | `actionType:param` | `interactions.onHoverEnter`             |
| `onHoverLeave`  | `actionType:param` | `interactions.onHoverLeave`             |
| `onPointerDown` | `actionType:param` | `interactions.onPointerDown`            |
| `onPointerUp`   | `actionType:param` | `interactions.onPointerUp`              |
| `onDoubleClick` | `actionType:param` | `interactions.onDoubleClick`            |
| `onDragEnd`     | `actionType:param` | `interactions.onDragEnd`                |
| `cursor`        | CSS cursor value   | Explicit `interactions.cursor` override |

Annotation interactions are merged over prototype reactions — annotations win for any key that appears in both.

Valid `cursor` values: `pointer`, `default`, `grab`, `grabbing`, `crosshair`, `zoom-in`, `zoom-out`, `text`, `move`, `not-allowed`.

---

## `visibleWhen` operators

Format: `variable:operator:value`.

| Operator     | Meaning               |
| ------------ | --------------------- |
| `equals`     | strict equality       |
| `notEquals`  | strict inequality     |
| `gt`         | greater than          |
| `gte`        | greater than or equal |
| `lt`         | less than             |
| `lte`        | less than or equal    |
| `contains`   | string contains       |
| `startsWith` | string starts with    |

Value auto-typing: `"true"` / `"false"` → boolean, numeric string → number, else string.

```
[pb: visibleWhen=isMenuOpen:equals:true]
[pb: visibleWhen=scrollProgress:gt:0.5]
[pb: visibleWhen=activeTab:equals:overview]
```

---

## Action shorthand reference

The `actionType:param` format used in trigger and interaction annotations.

| Shorthand                     | Emitted action                                          |
| ----------------------------- | ------------------------------------------------------- |
| `navigate:/path`              | `{ type: "navigate", payload: { href: "/path" } }`      |
| `navigate:back`               | `{ type: "navigate", payload: { back: true } }`         |
| `modalOpen:id`                | `{ type: "modalOpen", payload: { id: "id" } }`          |
| `modalClose`                  | `{ type: "modalClose" }`                                |
| `modalClose:id`               | `{ type: "modalClose", payload: { id: "id" } }`         |
| `elementShow:id`              | `{ type: "elementShow", payload: { id: "id" } }`        |
| `elementHide:id`              | `{ type: "elementHide", payload: { id: "id" } }`        |
| `elementToggle:id`            | `{ type: "elementToggle", payload: { id: "id" } }`      |
| `scrollTo:id`                 | `{ type: "scrollTo", payload: { id: "id" } }`           |
| `scrollTo`                    | `{ type: "scrollTo" }`                                  |
| `setVariable:key:value`       | `{ type: "setVariable", payload: { key, value } }`      |
| `setVariable:key=value`       | same (legacy equals format)                             |
| `fireTransition:id`           | `{ type: "fireTransition", payload: { id } }`           |
| `updateTransitionProgress:id` | `{ type: "updateTransitionProgress", payload: { id } }` |

Unknown action types are passed through as `{ type: actionType, payload: param }`.

---

## Full annotation examples

Sticky hero with a timer-delayed modal and parallax effect:

```
Hero Frame [pb: sticky=true, stickyOffset=64px, timer=3000:modalOpen:welcome-prompt, effect=parallax:0.8]
```

Section that animates in when it enters the viewport:

```
Stats Section [pb: entrance=slideUp, duration=0.4, trigger=onFirstVisible, viewportAmount=0.3, triggerOnce=true]
```

Nav bar that hides on scroll down and shows on scroll up:

```
Nav Bar [pb: onScrollDown=elementHide:nav-bar, onScrollUp=elementShow:nav-bar, sticky=true, stickyOffset=0px]
```

Video background loop:

```
Hero Reel [pb: type=elementVideo, autoplay=true, loop=true, muted=true]
```

Video with play button in a modal:

```
Case Study Film [pb: type=elementVideo, module=case-study-video-modal, showPlayButton=true]
```

Text with semantic style (no raw typography extracted):

```
Page Title [pb: style=h1]
Description [pb: style=body2]
```

---

[Back to README](./README.md) | [Section types](./03-section-types.md) | [Element types](./04-element-types.md) | [Interactions](./05-interactions-and-triggers.md)
