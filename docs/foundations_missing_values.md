# Foundations — Missing Values

What should be part of the foundations system but currently is not. Based on reading `pb-defaults-architecture.ts`, `pb-content-guidelines-config.ts`, the dev style/color/font tools, and the workbench session shape.

Organized from broadest impact to narrowest.

---

## 1. Spacing Scale

**Current state:** `PbFoundationDefaults.spacing` has a single `baseRem: number`. A linked inference rule derives `elements.frame.gap` from it (`baseRem × 2`). No named steps exist.

**Impact:** Every gap, padding, and margin in elements and layout accepts a raw CSS string. Changing the density of the design requires touching every individual value. There is no concept of "this element uses the `lg` spacing step."

**What should be added:**

A named 9-step scale derived from `baseRem`, individually overridable:

| Step | Name | Example at baseRem=0.75 |
|---|---|---|
| 0 | `none` | 0 |
| 1 | `xs` | ~0.25rem |
| 2 | `sm` | ~0.5rem |
| 3 | `md` | ~0.75rem (= baseRem) |
| 4 | `lg` | ~1rem |
| 5 | `xl` | ~1.5rem |
| 6 | `2xl` | ~2rem |
| 7 | `3xl` | ~3rem |
| 8 | `4xl` | ~4.5rem |

```ts
// In PbFoundationDefaults.spacing
spacing: {
  baseRem: number;
  scale: {
    none: string;
    xs: string;
    sm: string;
    md: string;
    lg: string;
    xl: string;
    "2xl": string;
    "3xl": string;
    "4xl": string;
  };
}
```

CSS variables exposed:
```css
--pb-space-none: 0;
--pb-space-xs: 0.25rem;
--pb-space-md: 0.75rem;
/* etc. */
```

**In the editor:** Steps are auto-derived from `baseRem` (locked by default). The Overrides drawer unlocks individual steps. Changing `baseRem` re-derives all unlocked steps.

---

## 2. Typography Scale as CSS Variables

**Current state:** The type scale is computed in the workbench (base font size + ratio → per-level sizes) and stored in workbench state. It is NOT emitted as CSS custom properties. Elements receive `fontSize` as a raw CSS string or a level number.

**Impact:** Updating the type scale requires re-derivation and re-render. You cannot reference `var(--pb-text-h2)` in a `fontSize` field or in a `clamp()`. There is no way for a section background or non-text element to "know" what heading level 2 looks like without hard-coding a value.

**What should be added:**

CSS variables generated from the computed type scale and injected into the document:

```css
--pb-text-h1: clamp(2.5rem, 5vw, 4rem);
--pb-text-h2: clamp(2rem, 4vw, 3rem);
--pb-text-h3: clamp(1.5rem, 3vw, 2.25rem);
--pb-text-h4: 1.5rem;
--pb-text-h5: 1.25rem;
--pb-text-h6: 1.125rem;
--pb-text-body-1: 1.125rem;
--pb-text-body-2: 1rem;
--pb-text-body-3: 0.875rem;
--pb-text-body-4: 0.8125rem;
--pb-text-body-5: 0.75rem;
--pb-text-body-6: 0.6875rem;
```

These are re-injected whenever the workbench type scale changes.

---

## 3. Line-Height Scale

**Current state:** `lineHeight` is a raw CSS string per element (on body; not even present on heading — see `schema_core_missing_values.md` item 1). No named scale exists.

**Impact:** Every element that needs a non-default line height stores an arbitrary number. Headings that need tight leading all independently store `1.1` or `1.15`. A design density change requires touching every one of them.

**What should be added:**

```ts
// In PbFoundationDefaults.typography
lineHeight: {
  tight: string;     // ~1.1
  snug: string;      // ~1.25
  normal: string;    // ~1.5
  relaxed: string;   // ~1.625
  loose: string;     // ~2
}
```

```css
--pb-leading-tight: 1.1;
--pb-leading-snug: 1.25;
--pb-leading-normal: 1.5;
--pb-leading-relaxed: 1.625;
--pb-leading-loose: 2;
```

---

## 4. Letter-Spacing Scale

**Current state:** `letterSpacing` is a raw string/number per element. No named scale exists.

**What should be added:**

```ts
letterSpacing: {
  tighter: string;    // -0.05em
  tight: string;      // -0.025em
  normal: string;     // 0em
  wide: string;       // 0.025em
  wider: string;      // 0.05em
  widest: string;     // 0.1em
}
```

```css
--pb-tracking-tighter: -0.05em;
--pb-tracking-tight: -0.025em;
--pb-tracking-normal: 0em;
--pb-tracking-wide: 0.025em;
--pb-tracking-wider: 0.05em;
--pb-tracking-widest: 0.1em;
```

---

## 5. Shadow Scale

**Current state:** `boxShadow` is a raw CSS string on both `elementLayoutSchema` and `baseSectionPropsSchema`. The `effects[]` array has structured `dropShadow` and `innerShadow` effect types (with separate x/y/blur/spread/color fields), but there are no named shadow tokens that elements can reference.

**Impact:** Every element with a shadow stores the full raw CSS string. A "design system shadow update" means finding and changing every occurrence.

**What should be added:**

A named shadow scale as CSS variables, editable per level (offsetX, offsetY, blur, spread, color, mode):

```css
--pb-shadow-none: none;
--pb-shadow-xs: 0 1px 2px 0 rgb(0 0 0 / 0.05);
--pb-shadow-sm: 0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1);
--pb-shadow-md: 0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1);
--pb-shadow-lg: 0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1);
--pb-shadow-xl: 0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1);
--pb-shadow-2xl: 0 25px 50px -12px rgb(0 0 0 / 0.25);
```

Shadow token values should have light/dark mode variants (dark mode often replaces drop shadows with ambient glow).

---

## 6. Border-Width Scale

**Current state:** Border/stroke widths are raw CSS strings on elements (`wrapperStroke`, `border.*` fields). No named scale exists.

**What should be added:**

```css
--pb-border-hairline: 0.5px;
--pb-border-sm: 1px;
--pb-border-md: 1.5px;
--pb-border-lg: 2px;
--pb-border-xl: 4px;
```

---

## 7. Motion Tokens

**Current state:** Motion duration and easing values are raw strings/numbers per element. The entrance/exit preset system uses `ENTRANCE_PRESET_NAMES` and `EXIT_PRESET_NAMES` constants (properly validated as enums in the schema), but the underlying duration and easing values for each preset are not exposed as editable tokens in foundations. There is no concept of "the fast transition duration" that all fast animations reference.

**Impact:** Changing the overall animation speed of the design means finding and changing every animation individually.

**What should be added:**

**Duration scale:**
```ts
duration: {
  instant: number;   // ~80ms
  fast: number;      // ~150ms
  normal: number;    // ~300ms
  slow: number;      // ~500ms
  slower: number;    // ~800ms
}
```

**Easing presets (named, editable):**
```ts
easing: {
  easeIn: string;       // cubic-bezier
  easeOut: string;
  easeInOut: string;
  spring: string;       // spring config or cubic approximation
  bounce: string;
  linear: string;
}
```

**Stagger step:**
```ts
staggerStep: number;  // ms, per-element delay in staggered entrance sequences
```

CSS variables:
```css
--pb-duration-instant: 80ms;
--pb-duration-fast: 150ms;
--pb-duration-normal: 300ms;
--pb-duration-slow: 500ms;
--pb-duration-slower: 800ms;
```

**In the editor:** These feed into the entrance/exit preset definitions. A preset references `duration.normal` by name rather than `300` — so changing the scale updates all animations that use it.

---

## 8. Breakpoint Definitions

**Current state:** Responsive values accept `mobile` and `desktop` (as a tuple or object). The actual pixel thresholds for these breakpoints are not defined, not exposed as CSS variables, and not editable in the workbench.

**Impact:** The editor cannot show a meaningful viewport width selector because it does not know at what pixel value "desktop" begins. The page-builder load/expand pipeline uses hardcoded breakpoint logic.

**What should be added:**

```ts
// In foundations
breakpoints: {
  mobile: number;    // max-width threshold for mobile (e.g. 767)
  desktop: number;   // min-width threshold for desktop (e.g. 768)
}
```

If/when the responsive system expands to more than two breakpoints:
```ts
breakpoints: {
  sm: number;   // 640
  md: number;   // 768
  lg: number;   // 1024
  xl: number;   // 1280
  "2xl": number;  // 1536
}
```

---

## 9. Content Width Presets

**Current state:** `contentWidth` on sections accepts `"full"`, `"hug"`, or a raw CSS string. There are no named width presets. `PbSectionDefaults.contentWidth` stores a single default value.

**Impact:** Every section that needs a constrained width stores a raw pixel value (e.g., `"1024px"`). Updating the standard content width means touching every section.

**What should be added:**

```ts
// In foundations
contentWidths: {
  narrow: string;     // e.g. "640px"
  standard: string;   // e.g. "1024px"
  wide: string;       // e.g. "1280px"
  full: string;       // "100%"
}
```

```css
--pb-width-narrow: 640px;
--pb-width-standard: 1024px;
--pb-width-wide: 1280px;
```

Section `contentWidth` fields can then reference `var(--pb-width-standard)` or use the named picker. The editor shows the named preset options before the raw input.

---

## 10. Section Margin / Vertical Rhythm Scale

**Current state:** Section margins (`marginTop`, `marginBottom` on `baseSectionPropsSchema`) are raw CSS strings. `PbSectionDefaults` has no margin defaults at all.

**Impact:** Vertical rhythm between sections is inconsistent because each section margin is independent. Switching between "spacious" and "compact" page density requires touching every section margin individually. (This also connects to the `density` field on `pageBuilderSchema` — what values does each density level produce?)

**What should be added:**

```ts
// In foundations
sectionMargins: {
  none: string;
  xs: string;
  sm: string;
  md: string;
  lg: string;
  xl: string;
}
```

```css
--pb-section-margin-none: 0;
--pb-section-margin-xs: 1.5rem;
--pb-section-margin-sm: 3rem;
--pb-section-margin-md: 5rem;
--pb-section-margin-lg: 8rem;
--pb-section-margin-xl: 12rem;
```

These also become the values behind the `density` field (compact = sm/md, spacious = lg/xl).

---

## 11. Global Reduce Motion Policy

**Current state:** `reduceMotion: z.boolean().optional()` is a per-element and per-section field. There is no foundation-level policy. The per-element boolean's semantics are ambiguous (true = respect system preference? true = force-reduce? the audit noted it was inverted in some contexts).

**Impact:** There is no way to say "all animations on this page use fade-only" or "ignore system preference for all parallax sections" without setting the field on every element. A global policy cannot be set.

**What should be added:**

```ts
// In foundations
motion: {
  reduceMotionPolicy: "honor-system" | "disable-all" | "replace-with-fade";
  // honor-system: respect prefers-reduced-motion (default)
  // disable-all: no animations regardless of system preference
  // replace-with-fade: replace all entrance animations with opacity fade only
}
```

This propagates to all element and section renderers. The per-element `reduceMotion` field then becomes an override of the global policy, not an independent setting.

---

## 12. Named Opacity Scale

**Current state:** `opacity: z.number().min(0).max(1).optional()` on `elementLayoutSchema`. Raw 0–1 number per element.

**What should be added:**

Named constants used as defaults and referenced in element editors:

```ts
opacity: {
  muted: 0.4;      // placeholder text, inactive states
  dimmed: 0.6;     // secondary content
  subtle: 0.75;    // supporting elements
  strong: 0.9;     // near-full
  full: 1.0;
}
```

Not CSS variables (opacity is set via inline style, not CSS custom properties). Named constants used only in the editor and in element defaults — they resolve to raw numbers at export.

---

## 13. Z-Index Layer System

**Current state:** `zIndex: z.number().optional()` on both `elementLayoutSchema` and `baseSectionPropsSchema`. Raw numbers with no coordination.

**Impact:** Layer management across a page is done by convention. No way to say "this element should always sit above the sticky header" without knowing what z-index the header uses.

**What should be added:**

```ts
// In foundations
layers: {
  base: number;      // 0
  raised: number;    // 10
  overlay: number;   // 20
  modal: number;     // 30
  toast: number;     // 40
  tooltip: number;   // 50
  max: number;       // 9999
}
```

Elements reference a named layer. The editor shows the named layer picker before the raw number input. Raw number is an override below the picker.

---

## 14. Focus Ring Tokens

**Current state:** No foundation-level specification for focus styles. Interactive elements have no `:focus-visible` defaults that come from foundations. There is no `--pb-ring-*` token family.

**Impact:** Focus outlines are browser defaults everywhere. There is no way to define the design system's focus treatment once and have it propagate to buttons, links, and inputs.

**What should be added:**

```css
--pb-ring-color: var(--pb-primary);
--pb-ring-width: 2px;
--pb-ring-offset: 2px;
--pb-ring-style: solid;
```

These propagate to button, link, and input focus behavior as defaults. Per-element overrides sit in element editors.

---

## 15. Preset Library as a Foundations Concern

**Current state:** `ENTRANCE_PRESET_NAMES` and `EXIT_PRESET_NAMES` are defined in `page-builder-motion-defaults.ts` (a large file). They ARE used as `z.enum()` in `motionTimingSchema` — so validation is correct. However, the preset definitions (what `initial`, `animate`, `transition` a given preset name resolves to) are inside the motion defaults file, not in foundations.

**Impact:** There is no workbench interface to view, add, or tune entrance/exit presets. A designer cannot add a new preset called `"blurFadeUp"` or adjust the `scaleUp` entrance distance without editing source code.

**What should be added:**

The entrance and exit preset registry should be a foundations-level editable list, not a hardcoded constant. Each entry:
```ts
{
  name: string;         // the validated key (e.g. "fadeUp")
  label: string;        // display name
  initial: MotionKeyframes;
  animate: MotionKeyframes;
  exit?: MotionKeyframes;
  defaultTransition: { duration: DurationScaleKey; ease: EasingPresetKey; };
}
```

This makes the preset library visible in the workbench and makes the motion token system (item 7 above) meaningful — presets reference duration and easing tokens by name.

---

## Override Model Summary

| Foundation Layer | Editor behavior | Override path |
|---|---|---|
| Color seeds | Editable directly | No override — seeds are the source |
| Derived semantic tokens | Auto-computed | Overrides drawer → forced checkbox per token |
| Spacing scale steps | Auto-derived from baseRem | Overrides drawer → unlock individual step |
| Type scale levels | Editable per level | Always visible — overriding individual levels is the common case |
| Line-height / letter-spacing | Named steps, directly editable | No override drawer needed |
| Shadow scale | Directly editable per level | No override drawer needed |
| Border-width scale | Directly editable | No override drawer needed |
| Motion tokens | Directly editable | No override drawer needed |
| Breakpoints | Directly editable | No override drawer needed |
| Content widths | Directly editable | No override drawer needed |
| Section margin scale | Auto-derived from spacing scale | Overrides drawer → unlock individual step |
| Reduce motion policy | Select control | No override drawer needed |
| Z-index layers | Directly editable | No override drawer needed |
| Focus ring tokens | Directly editable | No override drawer needed |
| Preset library | List editor (add/edit/remove) | No override — this is the source |
