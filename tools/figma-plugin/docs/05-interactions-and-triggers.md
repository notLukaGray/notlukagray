# Interactions and Triggers

Two distinct systems:

1. **Element interactions** — pointer/mouse events on individual elements, from Figma prototype reactions or `[pb: onClick=...]` annotations.
2. **Section triggers** — behavioral events attached to an entire section (viewport, timer, keyboard, scroll direction, idle, cursor).

The component variant system bridges both concepts.

---

## Part 1: Element interactions

### Two sources, one merge

Interactions come from two sources, merged at conversion time:

1. **Figma prototype reactions** (`node.reactions`) — extracted automatically.
2. **`[pb: onClick=...]` annotations** — explicit overrides.

Merge: `{ ...protoInteractions, ...annotationInteractions }`. Annotations win for any key present in both.

### Figma prototype reactions → page-builder interactions

| Figma trigger type                  | page-builder key |
| ----------------------------------- | ---------------- |
| `ON_CLICK`                          | `onClick`        |
| `MOUSE_ENTER`                       | `onHoverEnter`   |
| `MOUSE_LEAVE`                       | `onHoverLeave`   |
| `MOUSE_DOWN`                        | `onPointerDown`  |
| `MOUSE_UP`                          | `onPointerUp`    |
| `ON_DOUBLE_CLICK` / `DOUBLE_CLICK`  | `onDoubleClick`  |
| `ON_DRAG`                           | `onDragEnd`      |
| `ON_HOVER` (deprecated Figma alias) | `onHoverEnter`   |
| `ON_PRESS` (deprecated Figma alias) | `onPointerDown`  |

When multiple reactions share the same trigger type, only the first is kept.

### Figma action types mapped

| Figma action type                                     | page-builder action                                               | Notes                                                                 |
| ----------------------------------------------------- | ----------------------------------------------------------------- | --------------------------------------------------------------------- |
| `URL` / `OPEN_URL`                                    | `{ type: "navigate", payload: { href: url } }`                    | External URL note added to export-notes.txt                           |
| `BACK`                                                | `{ type: "navigate", payload: { back: true } }`                   |                                                                       |
| `NODE` / `NAVIGATE`                                   | `{ type: "navigate", payload: { href: slugifiedName, frameId } }` | `frameId` is Figma-internal; replace `href` with real route           |
| `CLOSE`                                               | `{ type: "modalClose", payload: {} }`                             |                                                                       |
| `OVERLAY_OPEN` / `OPEN_OVERLAY`                       | `{ type: "modalOpen", payload: { id: resolvedName } }`            | Name auto-resolved from frame; confirm matches runtime modal registry |
| `SWAP_OVERLAY`                                        | `{ type: "modalOpen", payload: { id: resolvedName } }`            | Swap vs open distinction not modelled — both emit modalOpen           |
| `SCROLL_TO`                                           | `{ type: "scrollTo", payload: { id: resolvedId } }`               | Target node name auto-resolved to slugified id                        |
| `SET_VARIABLE`                                        | `{ type: "setVariable", payload: { key, value } }`                | Best-effort; variable reference may need manual correction            |
| `SWAP_STATE` / `CONDITIONAL` / `UPDATE_MEDIA_RUNTIME` | silently skipped                                                  | No clean page-builder equivalent                                      |

Notes about auto-resolution: for `NAVIGATE`, `OVERLAY_OPEN`, `SWAP_OVERLAY`, and `SCROLL_TO`, the plugin calls `figma.getNodeById` to resolve the destination frame or node name and slugifies it. The resolved name is used as the action target. A warning is pushed to `export-notes.txt` for each resolved value so you know to verify it.

### Cursor auto-inference

When interactions are extracted, the cursor is auto-inferred:

- `onDragEnd` present → `"grab"`
- `onClick` or `onHoverEnter` present → `"pointer"`
- Otherwise → undefined (browser default)

An explicit `[pb: cursor=...]` annotation always overrides the inferred value.

### Annotation interaction examples

```
CTA Button [pb: onClick=navigate:/work/project, cursor=pointer]
Overlay [pb: onHoverEnter=elementShow:tooltip, onHoverLeave=elementHide:tooltip]
Drag Handle [pb: onDragEnd=fireTransition:reveal-anim]
```

---

## Part 2: Component variant system

Figma components with multiple variants can express interactive states. The plugin auto-detects this and wires the interactions automatically.

### What triggers detection

The plugin looks at each `COMPONENT_SET` (or an `INSTANCE` placed on canvas from a `COMPONENT_SET`) for a variant property named `State`, `Mode`, `Status`, or `Variant` (case-insensitive). If found, the full variant group is processed.

When you place a default-state `INSTANCE` on canvas, the plugin converts the entire `COMPONENT_SET` rather than just the single instance.

### State → interaction mapping

| Variant value                                   | Enter interaction       | Exit interaction | Notes                                                                                                 |
| ----------------------------------------------- | ----------------------- | ---------------- | ----------------------------------------------------------------------------------------------------- |
| `Default`, `Rest`, `Normal`, `Initial`, `Idle`  | Base state — no trigger | —                | One of these must exist                                                                               |
| `Hover`, `Hovered`                              | `onHoverEnter`          | `onHoverLeave`   | Resets to `"default"` on leave                                                                        |
| `Pressed`, `Down`                               | `onPointerDown`         | `onPointerUp`    | Resets to `"default"` on up                                                                           |
| `Active`                                        | `onPointerDown`         | `onPointerUp`    | Resets to `"active"` state                                                                            |
| `Selected`, `Checked`, `On`, `Open`, `Expanded` | `onClick`               | —                | Toggle — no automatic reset                                                                           |
| `Focus`, `Focused`                              | `onClick`               | —                | Best-effort; no focus event in schema                                                                 |
| `Disabled`                                      | —                       | —                | Sets `disabled: true` on the default inner group                                                      |
| `Loading`                                       | —                       | —                | Sibling element with `visibleWhen: { variable: "{id}--state", operator: "equals", value: "loading" }` |
| `Error`, `Invalid`                              | —                       | —                | Sibling element with `visibleWhen` on `"error"`                                                       |

All state changes target `setVariable` with key `{elementId}--state` (double hyphen). A component named `button-cta` uses state variable `button-cta--state`. Reference this variable elsewhere with `visibleWhen=button-cta--state:equals:hover`.

### Non-state variant properties

Other variant properties on the default variant are mapped:

- `Size` → `size` on the outer group (lowercased)
- `Theme` / `Color` / `Style` → `variant` on the outer group (lowercased, first one wins)
- Anything else → noted in `export-notes.txt`

### Output structure

```json
{
  "type": "elementGroup",
  "id": "button-cta",
  "cursor": "pointer",
  "interactions": {
    "onHoverEnter": {
      "type": "setVariable",
      "payload": { "key": "button-cta--state", "value": "hover" }
    },
    "onHoverLeave": {
      "type": "setVariable",
      "payload": { "key": "button-cta--state", "value": "default" }
    },
    "onPointerDown": {
      "type": "setVariable",
      "payload": { "key": "button-cta--state", "value": "pressed" }
    },
    "onPointerUp": {
      "type": "setVariable",
      "payload": { "key": "button-cta--state", "value": "default" }
    }
  },
  "section": {
    "elementOrder": ["button-cta--default", "button-cta--hover", "button-cta--pressed"],
    "definitions": {
      "button-cta--default": { "type": "elementGroup", "id": "button-cta--default" },
      "button-cta--hover": {
        "type": "elementGroup",
        "id": "button-cta--hover",
        "hidden": true,
        "visibleWhen": { "variable": "button-cta--state", "operator": "equals", "value": "hover" }
      },
      "button-cta--pressed": {
        "type": "elementGroup",
        "id": "button-cta--pressed",
        "hidden": true,
        "visibleWhen": { "variable": "button-cta--state", "operator": "equals", "value": "pressed" }
      }
    }
  }
}
```

### Designer rules

- Name the state-driving property exactly `State`, `Mode`, `Status`, or `Variant`.
- Place the `Default` (or `Rest`/`Normal`/`Initial`/`Idle`) variant instance on canvas when exporting.
- Placing a Hover or Pressed instance directly triggers a warning and falls back to single-variant conversion.
- Non-state properties (`Size`, `Theme`) should be on the default variant — they are read from there.

---

## Part 3: Section triggers

Section triggers respond to environmental events and fire page-builder actions. All configured via `[pb: ...]` annotations on the section frame. See the full reference in [02-annotation-system.md](./02-annotation-system.md).

### Viewport triggers

```
[pb: onVisible=elementShow:stats-counter, triggerOnce=true, threshold=0.3]
[pb: onInvisible=elementHide:floating-nav]
```

`triggerOnce=true` fires only on the first viewport entry. `threshold` controls how much of the section must be visible (0.0–1.0). `rootMargin` shifts the trigger boundary.

**Output:**

```json
{
  "onVisible": { "type": "elementShow", "payload": { "id": "stats-counter" } },
  "triggerOnce": true,
  "threshold": 0.3
}
```

### Timer triggers

```
[pb: timer=3000:modalOpen:welcome-prompt]
[pb: timerInterval=1000:8000:navigate:/next-slide]
[pb: timer2=10000:setVariable:slideIndex:0]
```

One-shot: `delayMs:actionType:param`. Interval: `delayMs:intervalMs:actionType:param`. Multiple timers via `timer2`, `timer3`.

**Output:**

```json
{
  "timerTriggers": [
    { "delay": 3000, "action": { "type": "modalOpen", "payload": { "id": "welcome-prompt" } } }
  ]
}
```

### Keyboard triggers

```
[pb: key=ArrowRight:navigate:/next, key2=ArrowLeft:navigate:/prev]
[pb: key=Escape:modalClose]
[pb: key=k+ctrl:modalOpen:search]
```

**Output:**

```json
{
  "keyboardTriggers": [
    { "key": "ArrowRight", "onKeyDown": { "type": "navigate", "payload": { "href": "/next" } } },
    {
      "key": "k",
      "ctrl": true,
      "onKeyDown": { "type": "modalOpen", "payload": { "id": "search" } }
    }
  ]
}
```

### Scroll direction triggers

```
[pb: onScrollDown=elementHide:site-nav, onScrollUp=elementShow:site-nav]
```

**Output:**

```json
{
  "scrollDirectionTriggers": [
    {
      "onScrollDown": { "type": "elementHide", "payload": { "id": "site-nav" } },
      "onScrollUp": { "type": "elementShow", "payload": { "id": "site-nav" } }
    }
  ]
}
```

### Idle trigger

```
[pb: idle=5000:modalOpen:help-prompt]
```

**Output:**

```json
{
  "idleTriggers": [
    { "idleAfterMs": 5000, "onIdle": { "type": "modalOpen", "payload": { "id": "help-prompt" } } }
  ]
}
```

### Cursor trigger

```
[pb: cursor=x:updateTransitionProgress:bg-anim]
```

**Output:**

```json
{
  "cursorTriggers": [
    {
      "axis": "x",
      "action": { "type": "updateTransitionProgress", "payload": { "id": "bg-anim" } }
    }
  ]
}
```

### Effect annotations

```
[pb: effect=parallax:0.6]
[pb: effect=scrollFade, effect2=blur:8]
```

| Effect           | Output                             |
| ---------------- | ---------------------------------- |
| `parallax:speed` | `{ type: "parallax", speed: 0.6 }` |
| `scrollFade`     | `{ type: "fade" }`                 |
| `blur:amount`    | `{ type: "blur", amount: 8 }`      |

### visibleWhen on sections

```
[pb: visibleWhen=isMenuOpen:equals:true]
```

Hides or shows the entire section based on a page-builder variable. Same operators as element `visibleWhen` — see [02-annotation-system.md](./02-annotation-system.md).

---

## Complete action shorthand reference

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

[Back to README](./README.md) | [Annotation system](./02-annotation-system.md) | [Element types](./04-element-types.md)
