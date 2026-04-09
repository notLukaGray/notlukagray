# Foundations Implementation Plan

## Context for the implementing agent

This project has a page-builder with a workbench dev tool at `/dev`. The workbench stores its state in localStorage under `workbench-session-v1`. Foundations (colors, fonts, spacing/style) are the lowest layer — they derive defaults that cascade into every element and section.

Read these files in full before touching anything:

```
apps/web/src/app/theme/pb-defaults-architecture.ts       ← PbFoundationDefaults, PbBuilderDefaultsV3, applyLinkedInference
apps/web/src/app/theme/pb-style-suggest.ts               ← StyleToolSeeds, proposePbContentGuidelines, emptyLocks
apps/web/src/app/dev/style/style-tool-persistence.ts     ← StyleToolPersistedV2, getDefaultStyleToolPersistedV2
apps/web/src/app/dev/style/style-tool-baseline.ts        ← DEV_NEUTRAL_STYLE_SEEDS
apps/web/src/app/dev/workbench/workbench-defaults.ts     ← WorkbenchSessionV1, getDefaultWorkbenchSession
apps/web/src/app/dev/workbench/workbench-session-shape.ts ← mergeWorkbenchSessionShape
apps/web/src/app/theme/pb-guidelines-expand.ts           ← re-exports from @pb/core/defaults
apps/web/src/app/theme/pb-content-guidelines-config.ts   ← legacy flat shape, pbContentGuidelinesConfigFileExport
packages/core/src/internal/defaults/pb-builder-defaults.ts ← actual PbContentGuidelines type definition and expand logic
```

The pattern for everything that already exists:

- **Seeds** = minimal user-controlled inputs
- **Propose** = a pure function that derives all values from seeds
- **Locks** = per-key booleans that pin a value and prevent seed re-derivation
- **Persisted** = `{ v: N, seeds, locks, derivedValues }`
- **CSS variables** = injected at app startup from persisted or production values

Follow this exact pattern for every new token family below.

---

## What to build (strictly in this order)

---

### Step 1 — Spacing Scale

**Goal:** Replace the single `spacingBaseRem` seed with a named 9-step scale. All downstream derivations that currently use `b × multiplier` continue to work but now reference named steps.

**1a. Extend `StyleToolSeeds` in `apps/web/src/app/theme/pb-style-suggest.ts`**

Add to the existing `StyleToolSeeds` type:

```ts
spacingScale?: {
  xs: string;    // defaults: derived from spacingBaseRem
  sm: string;
  md: string;    // = spacingBaseRem rem (the current base)
  lg: string;
  xl: string;
  "2xl": string;
  "3xl": string;
  "4xl": string;
};
spacingScaleLocks?: Partial<Record<"xs"|"sm"|"md"|"lg"|"xl"|"2xl"|"3xl"|"4xl", boolean>>;
```

The `spacingBaseRem` seed stays and remains the single dial. The `spacingScale` stores per-step overrides. A step is overridden only if its lock is true; otherwise it is derived from `spacingBaseRem`.

**Default derivation ratios (use these exactly):**

```
xs  = baseRem × 0.333  (round to 3dp)
sm  = baseRem × 0.667
md  = baseRem × 1.0    (the base)
lg  = baseRem × 1.333
xl  = baseRem × 2.0
2xl = baseRem × 2.667
3xl = baseRem × 4.0
4xl = baseRem × 6.0
```

**1b. Add `deriveSpacingScale(baseRem: number): SpacingScale` in `pb-style-suggest.ts`**

Pure function. Takes the base rem value, returns an object with all 9 keys as rem strings (e.g. `"0.5rem"`). Include `none: "0"` as a constant (not derived, always `"0"`).

**1c. Extend `PbFoundationDefaults` in `apps/web/src/app/theme/pb-defaults-architecture.ts`**

Change the `spacing` field:

```ts
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
};
```

**1d. Add CSS variable injection**

Create a new file: `apps/web/src/app/theme/pb-spacing-tokens.ts`

```ts
export type SpacingScale = PbFoundationDefaults["spacing"]["scale"];

export function spacingScaleToCssVars(scale: SpacingScale): Record<string, string> {
  return {
    "--pb-space-none": scale.none,
    "--pb-space-xs": scale.xs,
    "--pb-space-sm": scale.sm,
    "--pb-space-md": scale.md,
    "--pb-space-lg": scale.lg,
    "--pb-space-xl": scale.xl,
    "--pb-space-2xl": scale["2xl"],
    "--pb-space-3xl": scale["3xl"],
    "--pb-space-4xl": scale["4xl"],
  };
}
```

**1e. Update `StyleToolPersistedV2` → bump to `StyleToolPersistedV3`**

In `apps/web/src/app/dev/style/style-tool-persistence.ts`, add:

```ts
export type StyleToolPersistedV3 = {
  v: 3;
  seeds: StyleToolSeeds; // seeds now includes spacingScale + spacingScaleLocks
  locks: Record<keyof PbContentGuidelines, boolean>;
  guidelines: PbContentGuidelines;
  // NEW
  spacingScale: SpacingScale;
  spacingScaleLocks: Record<keyof SpacingScale, boolean>;
};
```

Add a migration function `coerceStyleToolV2toV3(v2: StyleToolPersistedV2): StyleToolPersistedV3` that derives the spacing scale from the existing `seeds.spacingBaseRem`, all locks false.

Update `getDefaultStyleToolPersistedV2` → `getDefaultStyleToolPersistedV3`.
Update `getProductionStyleToolPersistedV2` → `getProductionStyleToolPersistedV3`.

**1f. Update `WorkbenchSessionV1` → bump to `WorkbenchSessionV2` in `apps/web/src/app/dev/workbench/workbench-defaults.ts`**

```ts
export type WorkbenchSessionV2 = {
  v: 2;
  colors: ColorToolPersistedV2;
  fonts: FontWorkbenchPrefsV1;
  style: StyleToolPersistedV3; // ← updated
  elements: { image; body; heading; link };
};
```

Update `getDefaultWorkbenchSession`, `getProductionWorkbenchSession`, `mergeWorkbenchSessionWithDefaults`, and `isWorkbenchStorageJsonComplete` accordingly.

Update `WORKBENCH_SESSION_STORAGE_KEY` to `"workbench-session-v2"` and add legacy migration: if a `v: 1` session is found in storage, run it through `coerceStyleToolV2toV3` and re-save as v2.

---

### Step 2 — Shadow Scale

**Goal:** A 6-level named shadow scale stored in foundations, injected as CSS variables.

**2a. Create `apps/web/src/app/theme/pb-shadow-tokens.ts`**

```ts
export type ShadowLevel = "none" | "xs" | "sm" | "md" | "lg" | "xl" | "2xl";

export type ShadowEntry = {
  x: string;
  y: string;
  blur: string;
  spread: string;
  color: string;
  inset: boolean;
};

export type ShadowScale = Record<ShadowLevel, string>; // resolved CSS box-shadow strings

export const DEFAULT_SHADOW_SCALE: ShadowScale = {
  none: "none",
  xs: "0 1px 2px 0 rgb(0 0 0 / 0.05)",
  sm: "0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)",
  md: "0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)",
  lg: "0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)",
  xl: "0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)",
  "2xl": "0 25px 50px -12px rgb(0 0 0 / 0.25)",
};

export const DEFAULT_SHADOW_SCALE_DARK: ShadowScale = {
  none: "none",
  xs: "0 1px 2px 0 rgb(0 0 0 / 0.2)",
  sm: "0 1px 3px 0 rgb(0 0 0 / 0.3), 0 1px 2px -1px rgb(0 0 0 / 0.2)",
  md: "0 4px 6px -1px rgb(0 0 0 / 0.3), 0 2px 4px -2px rgb(0 0 0 / 0.2)",
  lg: "0 10px 15px -3px rgb(0 0 0 / 0.3), 0 4px 6px -4px rgb(0 0 0 / 0.2)",
  xl: "0 20px 25px -5px rgb(0 0 0 / 0.35), 0 8px 10px -6px rgb(0 0 0 / 0.2)",
  "2xl": "0 25px 50px -12px rgb(0 0 0 / 0.5)",
};

export function shadowScaleToCssVars(
  light: ShadowScale,
  dark: ShadowScale
): Record<string, string> {
  // Light mode vars (default)
  const vars: Record<string, string> = {};
  for (const [k, v] of Object.entries(light)) {
    vars[`--pb-shadow-${k}`] = v;
  }
  // Dark mode vars injected separately via .dark selector (see Step 2b)
  return vars;
}
```

**2b. Dark mode injection pattern**

The existing color system injects dark-mode vars via a `.dark` selector class on `<html>`. Follow the same pattern: shadow dark vars go in the same dark-mode injection block, not a separate mechanism.

**2c. Add shadows to `StyleToolPersistedV3`**

```ts
export type StyleToolPersistedV3 = {
  // ... existing fields
  shadowScale: ShadowScale; // light
  shadowScaleDark: ShadowScale; // dark
};
```

The dev editor will allow editing each level as a raw CSS box-shadow string. No seed derivation — shadows are edited directly (they are design decisions, not derived from a formula).

---

### Step 3 — Border-Width Scale

Small addition. Follow the same pattern as shadows but simpler (no dark variant).

**3a. Add to `apps/web/src/app/theme/pb-spacing-tokens.ts`** (extend the existing file from Step 1):

```ts
export type BorderWidthScale = {
  hairline: string;
  sm: string;
  md: string;
  lg: string;
  xl: string;
};

export const DEFAULT_BORDER_WIDTH_SCALE: BorderWidthScale = {
  hairline: "0.5px",
  sm: "1px",
  md: "1.5px",
  lg: "2px",
  xl: "4px",
};

export function borderWidthScaleToCssVars(scale: BorderWidthScale): Record<string, string> {
  return {
    "--pb-border-hairline": scale.hairline,
    "--pb-border-sm": scale.sm,
    "--pb-border-md": scale.md,
    "--pb-border-lg": scale.lg,
    "--pb-border-xl": scale.xl,
  };
}
```

**3b. Add to `StyleToolPersistedV3`:**

```ts
borderWidthScale: BorderWidthScale;
```

---

### Step 4 — Line-Height Scale

**4a. Add to `apps/web/src/app/theme/pb-spacing-tokens.ts`:**

```ts
export type LineHeightScale = {
  tight: string;
  snug: string;
  normal: string;
  relaxed: string;
  loose: string;
};

export const DEFAULT_LINE_HEIGHT_SCALE: LineHeightScale = {
  tight: "1.1",
  snug: "1.25",
  normal: "1.5",
  relaxed: "1.625",
  loose: "2",
};

export function lineHeightScaleToCssVars(scale: LineHeightScale): Record<string, string> {
  return {
    "--pb-leading-tight": scale.tight,
    "--pb-leading-snug": scale.snug,
    "--pb-leading-normal": scale.normal,
    "--pb-leading-relaxed": scale.relaxed,
    "--pb-leading-loose": scale.loose,
  };
}
```

**4b. These are stored in `fonts` section of the session** (not `style`), because they are typographic. Extend `FontWorkbenchPrefsV1` → `FontWorkbenchPrefsV2`:

```ts
type FontWorkbenchPrefsV2 = {
  v: 2;
  // ... all existing v1 fields
  lineHeightScale: LineHeightScale;
  letterSpacingScale: LetterSpacingScale; // defined in Step 5
};
```

---

### Step 5 — Letter-Spacing Scale

Follow the same pattern as Step 4, added in the same file and session location.

**5a. Add to `apps/web/src/app/theme/pb-spacing-tokens.ts`:**

```ts
export type LetterSpacingScale = {
  tighter: string;
  tight: string;
  normal: string;
  wide: string;
  wider: string;
  widest: string;
};

export const DEFAULT_LETTER_SPACING_SCALE: LetterSpacingScale = {
  tighter: "-0.05em",
  tight: "-0.025em",
  normal: "0em",
  wide: "0.025em",
  wider: "0.05em",
  widest: "0.1em",
};

export function letterSpacingScaleToCssVars(scale: LetterSpacingScale): Record<string, string> {
  return {
    "--pb-tracking-tighter": scale.tighter,
    "--pb-tracking-tight": scale.tight,
    "--pb-tracking-normal": scale.normal,
    "--pb-tracking-wide": scale.wide,
    "--pb-tracking-wider": scale.wider,
    "--pb-tracking-widest": scale.widest,
  };
}
```

---

### Step 6 — Typography Scale as CSS Variables

**Goal:** The computed type scale (already in `FontWorkbenchPrefsV1.typeScale`) must be injected as CSS custom properties so elements can reference `var(--pb-text-h2)` in font-size fields.

**6a. Create `apps/web/src/app/theme/pb-type-scale-tokens.ts`**

```ts
// TypeScale mirrors the shape from apps/web/src/app/fonts/type-scale.ts
// Read that file to understand the exact shape before implementing.

export function typeScaleToCssVars(scale: typeof typeScaleConfig): Record<string, string> {
  // Derive CSS vars from scale. Each heading level gets --pb-text-h{N}.
  // Each body level gets --pb-text-body-{N}.
  // Use clamp() for h1–h3 if the scale provides min/max; otherwise use the computed size directly.
  // Read the typeScaleConfig shape first to implement this correctly.
  return { ... };
}
```

Read `apps/web/src/app/fonts/type-scale.ts` to understand the typeScaleConfig shape before implementing `typeScaleToCssVars`.

---

### Step 7 — Motion Tokens

**Goal:** Named duration scale and easing presets, stored in foundations, injected as CSS variables.

**7a. Create `apps/web/src/app/theme/pb-motion-tokens.ts`**

```ts
export type DurationScale = {
  instant: number; // ms
  fast: number;
  normal: number;
  slow: number;
  slower: number;
};

export type EasingPresets = {
  easeIn: string;
  easeOut: string;
  easeInOut: string;
  spring: string;
  bounce: string;
  linear: string;
};

export const DEFAULT_DURATION_SCALE: DurationScale = {
  instant: 80,
  fast: 150,
  normal: 300,
  slow: 500,
  slower: 800,
};

export const DEFAULT_EASING_PRESETS: EasingPresets = {
  easeIn: "cubic-bezier(0.4, 0, 1, 1)",
  easeOut: "cubic-bezier(0, 0, 0.2, 1)",
  easeInOut: "cubic-bezier(0.4, 0, 0.2, 1)",
  spring: "cubic-bezier(0.34, 1.56, 0.64, 1)",
  bounce: "cubic-bezier(0.34, 1.56, 0.64, 1)",
  linear: "linear",
};

export type MotionFoundations = {
  durations: DurationScale;
  easings: EasingPresets;
  staggerStep: number; // ms between staggered elements, default 50
  reduceMotionPolicy: "honor-system" | "disable-all" | "replace-with-fade";
};

export const DEFAULT_MOTION_FOUNDATIONS: MotionFoundations = {
  durations: DEFAULT_DURATION_SCALE,
  easings: DEFAULT_EASING_PRESETS,
  staggerStep: 50,
  reduceMotionPolicy: "honor-system",
};

export function motionFoundationsToCssVars(m: MotionFoundations): Record<string, string> {
  return {
    "--pb-duration-instant": `${m.durations.instant}ms`,
    "--pb-duration-fast": `${m.durations.fast}ms`,
    "--pb-duration-normal": `${m.durations.normal}ms`,
    "--pb-duration-slow": `${m.durations.slow}ms`,
    "--pb-duration-slower": `${m.durations.slower}ms`,
    "--pb-ease-in": m.easings.easeIn,
    "--pb-ease-out": m.easings.easeOut,
    "--pb-ease-in-out": m.easings.easeInOut,
    "--pb-ease-spring": m.easings.spring,
    "--pb-ease-bounce": m.easings.bounce,
    "--pb-ease-linear": m.easings.linear,
  };
}
```

**7b. Add `motion` to `StyleToolPersistedV3`:**

```ts
motion: MotionFoundations;
```

**7c. Wire `reduceMotionPolicy` to the page-builder renderer**

Find where `reduceMotion` is read in `packages/runtime-react/src/page-builder/`. The global policy from foundations must be checked there before the per-element `reduceMotion` field. The per-element field is an override of the global policy, not an independent setting.

Do not rename the schema field `reduceMotion` — the schema stays as-is. The policy resolution is renderer logic only:

```ts
// Pseudocode for renderer decision
function shouldRunMotion(
  elementReduceMotion: boolean | undefined,
  policy: MotionFoundations["reduceMotionPolicy"]
): boolean {
  if (policy === "disable-all") return false;
  if (policy === "honor-system") return elementReduceMotion ?? true;
  // "replace-with-fade" handled separately in the entrance wrapper
  return elementReduceMotion ?? true;
}
```

---

### Step 8 — Breakpoint Definitions

**Goal:** The two-breakpoint mobile/desktop system needs editable pixel thresholds.

**8a. Create `apps/web/src/app/theme/pb-breakpoint-tokens.ts`**

```ts
export type BreakpointDefinitions = {
  mobile: number; // max-width for "mobile" (e.g. 767)
  desktop: number; // min-width for "desktop" (e.g. 768)
};

export const DEFAULT_BREAKPOINTS: BreakpointDefinitions = {
  mobile: 767,
  desktop: 768,
};

export function breakpointsToCssVars(bp: BreakpointDefinitions): Record<string, string> {
  return {
    "--pb-breakpoint-mobile": `${bp.mobile}px`,
    "--pb-breakpoint-desktop": `${bp.desktop}px`,
  };
}
```

**8b. Add to `StyleToolPersistedV3`:**

```ts
breakpoints: BreakpointDefinitions;
```

**8c. Wire to the page-builder expand/resolve pipeline**

Read `packages/core/src/internal/page-builder-expand.ts`. Find where responsive values `[mobile, desktop]` are resolved. The breakpoint threshold used there must come from `BreakpointDefinitions.desktop`, not a hardcoded constant. The workbench session must be able to pass the breakpoint config to the page-builder expand pipeline.

Do not change the responsive value schema shape — the schema stays as `[mobile, desktop]` tuple. Only the resolution threshold becomes configurable.

---

### Step 9 — Content Width Presets

**Goal:** Named content width values that sections can reference instead of raw pixel strings.

**9a. Add to `apps/web/src/app/theme/pb-spacing-tokens.ts`:**

```ts
export type ContentWidthPresets = {
  narrow: string;
  standard: string;
  wide: string;
};

export const DEFAULT_CONTENT_WIDTH_PRESETS: ContentWidthPresets = {
  narrow: "640px",
  standard: "1024px",
  wide: "1280px",
};

export function contentWidthPresetsToCssVars(presets: ContentWidthPresets): Record<string, string> {
  return {
    "--pb-width-narrow": presets.narrow,
    "--pb-width-standard": presets.standard,
    "--pb-width-wide": presets.wide,
  };
}
```

**9b. Add to `StyleToolPersistedV3`:**

```ts
contentWidths: ContentWidthPresets;
```

---

### Step 10 — Section Margin Scale

**Goal:** Named vertical section margin steps, auto-derived from the spacing scale, individually lockable.

**10a. Add to `apps/web/src/app/theme/pb-spacing-tokens.ts`:**

```ts
export type SectionMarginScale = {
  none: string;
  xs: string;
  sm: string;
  md: string;
  lg: string;
  xl: string;
};

// Default derivation: multiply spacing scale md step by a section-rhythm multiplier
export function deriveSectionMarginScale(spacingScale: SpacingScale): SectionMarginScale {
  // Parse spacingScale.md as rem number, then derive by fixed multiples
  const mdRem = parseRemFloat(spacingScale.md); // write a small parseRemFloat helper
  return {
    none: "0",
    xs: `${(mdRem * 2).toFixed(3)}rem`,
    sm: `${(mdRem * 4).toFixed(3)}rem`,
    md: `${(mdRem * 6.667).toFixed(3)}rem`,
    lg: `${(mdRem * 10.667).toFixed(3)}rem`,
    xl: `${(mdRem * 16).toFixed(3)}rem`,
  };
}

export function sectionMarginScaleToCssVars(scale: SectionMarginScale): Record<string, string> {
  return {
    "--pb-section-margin-none": scale.none,
    "--pb-section-margin-xs": scale.xs,
    "--pb-section-margin-sm": scale.sm,
    "--pb-section-margin-md": scale.md,
    "--pb-section-margin-lg": scale.lg,
    "--pb-section-margin-xl": scale.xl,
  };
}
```

**10b. Add to `StyleToolPersistedV3`:**

```ts
sectionMarginScale: SectionMarginScale;
sectionMarginScaleLocks: Record<keyof SectionMarginScale, boolean>;
```

When spacing scale changes, re-derive all unlocked section margin steps. Locked steps stay at their manually set value.

---

### Step 11 — Focus Ring and Selection Tokens

Small additions. Add to `apps/web/src/app/theme/pb-color-tokens.ts` (or wherever the derived color tokens are injected — read that file first):

```ts
// Focus ring
"--pb-ring-color": "var(--pb-primary)",   // references existing color token
"--pb-ring-width": "2px",
"--pb-ring-offset": "2px",
"--pb-ring-style": "solid",

// Text selection
"--pb-selection-bg": "var(--pb-primary)",
"--pb-selection-color": "var(--pb-on-primary)",
```

These are constant derivations from color tokens — not separately configurable. They live in the derived token injection, not in `StyleToolPersistedV3`.

---

### Step 12 — Linked Inference Extensions

Read `applyLinkedInference` in `pb-defaults-architecture.ts`. The existing link rules derive `elements.frame.gap` from `foundation.spacing.baseRem`. Add new rules:

```ts
// Frame gap now references spacing scale md step (not raw baseRem × 2)
{ sourcePath: "foundation.spacing.scale.md", targetPath: "elements.frame.gap", transform: { kind: "identity" }, mode: "fillIfUnset" },
{ sourcePath: "foundation.spacing.scale.md", targetPath: "elements.frame.rowGap", transform: { kind: "identity" }, mode: "fillIfUnset" },
{ sourcePath: "foundation.radius.md", targetPath: "elements.frame.borderRadius", transform: { kind: "identity" }, mode: "fillIfUnset" },
{ sourcePath: "foundation.radius.md", targetPath: "section.borderRadius", transform: { kind: "identity" }, mode: "fillIfUnset" },
```

Keep the existing `foundation.spacing.baseRem → elements.frame.gap` rule for backward compatibility but lower its priority (run it before the new scale rule so the scale rule can override it).

---

### Step 13 — CSS Variable Injection Wiring

**Goal:** All new CSS variables must be injected at the same point existing ones are.

Find the file that injects CSS variables into the document (search for `--pb-primary` being set programmatically — likely in a React provider or a `useEffect` in the layout). Add calls to all the new `*ToCssVars` functions there, reading from the active workbench session (in dev) or from the production defaults (in production).

The injection must be:

- **In dev:** Reactive — re-inject when the workbench session changes (listen for `WORKBENCH_SESSION_CHANGED_EVENT`)
- **In production:** Static — inject once at page load from the committed production defaults

Do not create a separate injection mechanism. Hook into what already exists.

---

### Step 14 — Workbench Session Migration

The workbench session version bumps from v1 to v2. Write a migration in `workbench-session-legacy-migration.ts`:

```ts
export function migrateV1toV2(v1: WorkbenchSessionV1): WorkbenchSessionV2 {
  return {
    v: 2,
    colors: v1.colors,
    fonts: migratefontsV1toV2(v1.fonts), // adds lineHeightScale + letterSpacingScale
    style: migrateStyleV2toV3(v1.style), // adds all new style token families
    elements: v1.elements,
  };
}
```

`migrateStyleV2toV3` reads the existing `seeds.spacingBaseRem` and derives all new token families from it using the default derivation functions. No user data is lost. On next read, the v1 session is migrated to v2 and re-saved.

---

## Files created by this implementation

```
apps/web/src/app/theme/pb-spacing-tokens.ts      ← spacing scale, border-width, content widths,
                                                     line-height, letter-spacing, section margins
apps/web/src/app/theme/pb-shadow-tokens.ts        ← shadow scale (light + dark)
apps/web/src/app/theme/pb-motion-tokens.ts        ← motion durations, easings, stagger, policy
apps/web/src/app/theme/pb-breakpoint-tokens.ts    ← breakpoint definitions
apps/web/src/app/theme/pb-type-scale-tokens.ts    ← type scale → CSS vars
```

## Files modified by this implementation

```
apps/web/src/app/theme/pb-defaults-architecture.ts        ← extend PbFoundationDefaults.spacing
apps/web/src/app/theme/pb-style-suggest.ts                ← extend StyleToolSeeds, add deriveSpacingScale
apps/web/src/app/dev/style/style-tool-persistence.ts      ← StyleToolPersistedV2 → V3
apps/web/src/app/dev/style/style-tool-baseline.ts         ← extend DEV_NEUTRAL_STYLE_SEEDS
apps/web/src/app/dev/workbench/workbench-defaults.ts      ← WorkbenchSessionV1 → V2
apps/web/src/app/dev/workbench/workbench-session-shape.ts ← update hasCompleteWorkbenchStorageShape
apps/web/src/app/dev/workbench/workbench-session-legacy-migration.ts ← v1→v2 migration
packages/core/src/internal/page-builder-expand.ts         ← breakpoint threshold from config
packages/runtime-react/src/page-builder/*                 ← reduceMotionPolicy wiring
[CSS variable injection file — find via grep for --pb-primary being set]
```

---

## Constraints and rules

1. **Do not change any Zod schema files.** This plan is foundations only. Schema changes are a separate plan.
2. **Do not change the content JSON files** under `apps/web/src/content/`. The new tokens are additive — nothing breaks if they are absent.
3. **All new token types must be exported** from their respective files so the dev editors (not part of this plan) can import them.
4. **All derivation functions must be pure** — no side effects, no I/O, no React.
5. **Every new persisted field must have a default value** exported as a constant (e.g. `DEFAULT_SHADOW_SCALE`). The migration and the `getDefault*` functions use these constants. This prevents any undefined access when a field is missing from an old session.
6. **Session version bump is mandatory.** A v1 session in storage must be migrated forward, not silently discarded. The migration must run at read time in `workbench-session.ts` before the session is returned to any consumer.
7. **Follow the `spacingBaseRem` naming convention.** Existing seeds use camelCase. New seeds follow the same convention.
8. **Type the CSS var functions as `Record<string, string>`** not `CSSProperties` — they are injected via `element.style.setProperty`, not via React style props.
