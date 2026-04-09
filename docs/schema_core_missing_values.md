# Schema Core — Missing Values

Fields, shapes, and concepts absent from the current page-builder schema that visual editing and full use-case coverage require. Every item below is based on reading the actual schema files — not summaries.

---

## Element-Level Gaps

### 1. `elementHeadingSchema` Missing `color` and `lineHeight`

**Observed:** `elementBodySchema` has both `color: z.string().optional()` and `lineHeight: z.union([z.string(), z.number()]).optional()`. `elementHeadingSchema` has neither.

**Gap:** There is no way to directly override a heading's text color in schema without using `wrapperStyle.color`. There is also no `lineHeight` field — heading has `lineSpacing` (line-to-line spacing modifier) but body has both that AND `lineHeight`. Whether `lineSpacing` maps to CSS `line-height` is ambiguous; the body schema treating them as distinct fields suggests they are not the same.

**What should be added to `elementHeadingSchema`:**
```ts
lineHeight: z.union([z.string(), z.number()]).optional(),
color: z.string().optional(),
```

---

### 2. `sectionContentBlockSchema` Has No Per-Instance Flex Layout Controls

**Observed:** `elementGroupSchema` has `flexDirection`, `alignItems`, `justifyContent`, `gap`, `rowGap`, `columnGap`, `flexWrap`, `padding` as direct fields. `sectionContentBlockSchema` extends `baseSectionPropsSchema` which has none of these.

**Gap:** You cannot set flex direction, alignment, or gap on a specific `contentBlock` section. These come from the global `PbFoundationDefaults.elements.frame` and can only be overridden via `wrapperStyle`. That means no two `contentBlock` sections can have different flex directions without using the escape hatch.

**What should be added to `sectionContentBlockSchema`:**
```ts
flexDirection: z.enum(["row", "column", "row-reverse", "column-reverse"]).optional(),
alignItems: z.string().optional(),
justifyContent: z.string().optional(),
flexWrap: z.enum(["nowrap", "wrap", "wrap-reverse"]).optional(),
gap: responsiveStringSchema.optional(),
rowGap: responsiveStringSchema.optional(),
columnGap: responsiveStringSchema.optional(),
```

These would override the global frame defaults per-section.

---

### 3. `elementLinkSchema` Missing `target` and `rel`

**Observed:** `elementLinkSchema` has `external: z.boolean()`. `elementSimpleLinkSchema` also has only `ref` and `external`. There is no `target` field.

**Gap:** Opening a link in `_parent` or `_top` is impossible. More importantly, `rel` (for `noopener noreferrer` on external links) is currently handled implicitly by the `external` boolean in the renderer, but cannot be overridden. Some links need `rel="nofollow"` or `rel="sponsored"`.

**What should be added:**
```ts
// In elementLinkSchema
target: z.enum(["_self", "_blank", "_parent", "_top"]).optional(),
rel: z.string().optional(),
```

---

### 4. `elementButtonSchema` Missing Loading State

**Observed:** Button has `disabled: z.boolean().optional()`. No `loading` state exists.

**Gap:** Async button actions (form submits, fetch triggers) need a loading state that is visually distinct from disabled — typically showing a spinner and preventing re-click, but not the same grey-out treatment.

**What should be added:**
```ts
loading: z.boolean().optional(),
loadingLabel: z.string().optional(),  // replaces label text during loading
```

---

### 5. `formFieldBlockSchema` Missing `disabled`, `readOnly`, `autocomplete`

**Observed:** `formFieldBlockSchema` has `required`, `minLength`, `maxLength`, `pattern`, validation fields. None of `disabled`, `readOnly`, or `autocomplete` exist.

**Gap:**
- `disabled`: Fields that should be visible but non-interactable (e.g., read-only calculated values in a form)
- `readOnly`: HTML input `readonly` — distinct from `disabled` (focusable, copyable)
- `autocomplete`: Controls browser autofill behavior (e.g., `"email"`, `"given-name"`, `"current-password"`, `"off"`)

**What should be added:**
```ts
disabled: z.boolean().optional(),
readOnly: z.boolean().optional(),
autocomplete: z.string().optional(),
```

---

### 6. `elementRangeSchema` Missing `disabled`

**Observed:** `elementRangeSchema` has min, max, step, defaultValue, action, ariaLabel, style. No `disabled` field.

**Gap:** Range sliders used in read-only display contexts (showing a current value without allowing interaction) cannot be set to disabled state.

**What should be added:**
```ts
disabled: z.boolean().optional(),
```

---

### 7. `textShadow` Not a First-Class Static Field on Text Elements

**Observed:** `textShadow` appears as a known Framer Motion keyframe property in `motionPropsSchema` (accessible via `motion.initial`, `motion.animate`). It is NOT a direct static field on `elementHeadingSchema`, `elementBodySchema`, or `elementLayoutSchema`. `textDecoration` and `textTransform` ARE first-class fields on `elementLayoutSchema`, so this is an intentional but incomplete precedent.

**Gap:** A static text shadow (not animated) requires `wrapperStyle: { textShadow: "..." }`. Given that `textDecoration`, `textTransform`, `textStroke` are all first-class fields, `textShadow` belongs alongside them.

**What should be added to `elementLayoutSchema`:**
```ts
textShadow: z.string().optional(),
```

---

### 8. `whiteSpace` Not a First-Class Field on Text Elements

**Observed:** `textDecoration`, `textTransform` exist on `elementLayoutSchema`. `whiteSpace` does not.

**Gap:** Single-line labels that must not wrap (`white-space: nowrap`) — common in nav items, button-adjacent tags, and table-like layouts — require `wrapperStyle.whiteSpace`. Given the precedent of `textDecoration` and `textTransform`, `whiteSpace` belongs as a peer field.

**What should be added to `elementLayoutSchema`:**
```ts
whiteSpace: z.enum(["normal", "nowrap", "pre", "pre-wrap", "pre-line"]).optional(),
```

---

### 9. `clipPath` Not a First-Class Field

**Observed:** `clipPath` appears in `KNOWN_FM_KEYFRAME_KEYS` (accessible via `motion` props) and inside `glassEffectSchema` (for glass shapes). It is NOT a direct static field on `elementLayoutSchema` or `baseSectionPropsSchema`. Static clip paths require `wrapperStyle.clipPath`.

**Gap:** Diagonal section cutouts, circular image masks, and custom-shaped elements are blocked from clean schema expression. Unlike `boxShadow`, `filter`, and `backdropFilter` (all of which are first-class fields on both element and section schemas), `clipPath` is absent.

**What should be added to both `elementLayoutSchema` and `baseSectionPropsSchema`:**
```ts
clipPath: z.string().optional(),
```

---

### 10. No `elementDivider` in the Element Block Union

**Observed:** A `divider` section type exists in `sectionBlockSchema` (full-width, no content). There is no divider in `elementBlockSchema`.

**Gap:** A horizontal rule between content blocks within a `contentBlock` frame requires either `elementRichText` content (losing all styling control) or a zero-height spacer with a border via `wrapperStyle`. Neither is semantic.

**What should be added to `elementBlockSchema`:**
```ts
// New schema
const elementDividerSchema = z.object({
  type: z.literal("elementDivider"),
  orientation: z.enum(["horizontal", "vertical"]).optional(),
  thickness: z.string().optional(),
  color: z.string().optional(),
  style: z.enum(["solid", "dashed", "dotted"]).optional(),
  length: responsiveStringSchema.optional(),
}).merge(elementLayoutSchema);
```

---

### 11. Section `cursor` Is a Raw String, Not an Enum

**Observed:** `elementInteractionsSchema` (inside `elementLayoutSchema`) declares `cursor` as a validated `z.enum([...])` with 10 specific values. `baseSectionPropsSchema` declares `cursor: z.string().optional()` — completely unvalidated.

**Gap:** Inconsistent validation for the same property. An editor cannot show a proper picker for the section cursor field.

**What should be changed in `baseSectionPropsSchema`:**
```ts
cursor: z.enum([
  "pointer", "default", "grab", "grabbing", "crosshair",
  "zoom-in", "zoom-out", "text", "move", "not-allowed", "auto", "none"
]).optional(),
```

---

### 12. `sectionRevealSchema` `revealPreset` Is an Unvalidated String

**Observed:** `sectionRevealSchema` has `revealPreset: z.string().optional()`. No validated preset list exists.

**Gap:** Mirrors the same historical problem that `entrancePreset` and `exitPreset` had before they were fixed (they now use `z.enum(ENTRANCE_PRESET_NAMES)` and `z.enum(EXIT_PRESET_NAMES)`). Typos in `revealPreset` silently produce no animation.

**What should be done:** Define a `REVEAL_PRESET_NAMES` constant (like the motion defaults pattern) and use `z.enum(REVEAL_PRESET_NAMES)`.

---

### 13. `baseSectionPropsSchema` Missing `aspectRatio`

**Observed:** `aspectRatio` is present on `elementImageSchema` and `elementVideoSchema`. It is absent from `baseSectionPropsSchema`.

**Gap:** Sections that function as media-like containers (hero tiles, card surfaces, aspect-locked panels) need a guaranteed aspect ratio. Without it, height is determined by content, which is often unpredictable for layout-driven designs.

**What should be added:**
```ts
aspectRatio: responsiveStringSchema.optional(),
```

---

### 14. `elementVideoSchema` Missing `playbackRate`

**Observed:** Video has `autoplay`, `loop`, `muted`, `objectFit`, `objectPosition`, `showPlayButton`, event triggers. No `playbackRate`.

**Gap:** Ambient videos and slow-motion effects require playback rate control (e.g., `0.5` for half speed). This is a standard HTML video attribute.

**What should be added:**
```ts
playbackRate: z.number().positive().optional(),
```

---

### 15. `buttonActionSchema` Is a Strict Subset — Buttons Cannot Fire `back`, `contentOverride`, or Rive Actions

**Observed:** `buttonActionSchema` (the enum governing the button's primary `action` field) does not include `back`, `contentOverride`, `rive.setInput`, `rive.fireTrigger`, `rive.play`, `rive.pause`, `rive.reset`, or `conditionalAction`. These all exist in `triggerActionSchema` and are available via `pointerDownAction`/`pointerUpAction`, but not via the primary `action` field.

**Gap:** A button cannot fire a Rive trigger via its primary action. It cannot fire `back` navigation. It cannot fire a `conditionalAction` directly. The workaround (using `pointerDownAction`) works but is semantically wrong — a pointer-down handler is not the same as a button click action.

**What should be done:** Either expand `buttonActionSchema` to include the missing types from `triggerActionSchema`, or replace `action: buttonActionSchema` with `action: triggerActionSchema.shape.type` (the full type union).

---

### 16. Modal Block Has No Schema in Contracts

**Observed:** `modalOpen`, `modalClose`, `modalToggle` actions in `triggerActionSchema` reference modal IDs (`payload: z.object({ id: z.string() })`). Modals exist as content files in the project. No `modalBlockSchema` exists in the contracts package.

**Gap:** Modal IDs are unvalidated strings in action payloads. There is no way to validate that a referenced modal ID actually exists or that a modal block is structurally valid at the schema layer.

**What should be added:** A `modalBlockSchema` in contracts, mirroring the structure used by the existing modal content files.

---

### 17. `pageScrollConfigSchema` Missing Scroll-Snap Controls

**Observed:** `pageScrollConfigSchema` has `smooth`, `lockBody`, `overflowX`, `overflowY`. No snap-related fields.

**Gap:** Pages with full-screen section snapping or horizontal carousels need scroll snap control at the page level. Currently only achievable via external CSS.

**What should be added:**
```ts
snapType: z.enum(["none", "x mandatory", "y mandatory", "both mandatory", "x proximity", "y proximity"]).optional(),
```

---

## Gradient and Visual Effects

### 18. Gradient Text Not Expressible

**Observed:** Text elements (`elementHeadingSchema`, `elementBodySchema`) have `color: z.string()` for a flat color. There is no gradient text field.

**Gap:** Gradient text (achieved via `background-clip: text` + a gradient `backgroundImage`) is a common motif for headings. It cannot be expressed without `wrapperStyle: { backgroundImage: "...", backgroundClip: "text", webkitBackgroundClip: "text", color: "transparent" }` — a four-field escape hatch.

**What should be added:** A `textFill` discriminated union on heading and body:
```ts
textFill: z.union([
  z.object({ type: z.literal("color"), value: z.string() }),
  z.object({ type: z.literal("gradient"), value: z.string() }),  // CSS gradient string
]).optional(),
```
