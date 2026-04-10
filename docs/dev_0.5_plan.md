# Dev 0.5 — Architecture & Roadmap

## What this document is

The **living specification** for evolving the `/dev` workbench into a foundations-first element-and-layout editor that:

1. Exposes every controllable schema field through a typed input system
2. Wraps previews in the correct page-builder context so what you see reflects what the renderer will produce
3. Derives element and layout defaults from foundations — not from ad hoc raw values
4. Produces data shapes that match the page-builder schema and support a future drag-and-drop builder

**Related docs:** [`page-builder-schema-semantics.md`](./page-builder-schema-semantics.md) is the canonical reference for schema shapes, validation, and runtime precedence. This file is product/architecture intent and phased delivery order.

---

## Implementation status (snapshot)

Foundations **data** (tokens, CSS vars, workbench session fields, migrations, expand-time breakpoints, global motion policy) is largely **implemented in code**. The **/dev workbench UI** still only covers a subset (global seeds, guideline rows, partial style state — many persisted slices have no editors yet).

| Dev 0.5 phase (below)              | Typical state                                                                                                                                                                                                                                                                                              |
| ---------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Phase 1 — Foundations completeness | **Data layer:** spacing/shadow/motion/breakpoint tokens, type scale → CSS vars, line-height & letter-spacing scales, section margins, content width presets, opacity scale & z-index layers in session, reduce-motion policy. **UI:** incomplete — expose remaining slices in `/dev/style` (and previews). |
| Phases 2–8                         | **Not delivered** as a full product pass: input library, `WorkbenchPreviewContext`, element/section preview encapsulation, layout editors, per-element completeness, `/dev/custom`, named snapshots / diff saves.                                                                                          |

Historical gap-analysis notes (`foundations_missing_values`, `schema_core_missing_values`, step-by-step `foundations_impl_plan`) are **retired**; anything still open should appear in **Appendix: Remaining backlog** below or in **Known gaps** in `page-builder-schema-semantics.md`.

---

## Guiding principles

**Foundations are the ground truth.** Colors, typography, spacing, shadows, transitions, and motion are defined once and cascade into elements and layout. You pull them from the workbench session, not scattered constants.

**The override model is explicit.** Common overrides (color, fill, stroke) are first-class; rare ones (z-index, letter-spacing, cursor) sit behind an **Overrides** drawer; dangerous ones (`wrapperStyle` raw CSS) require explicit confirmation.

**Preview context is real context.** Previews inject the same CSS variables, breakpoints, and provider signals the renderer uses.

**Custom mode is output-only.** Scratch JSON does not mutate variants or the workbench session.

**Data shape is serializable.** Workbench exports map to schema shapes; IDs are stable for a future builder.

---

## Architecture overview

```
Workbench Session (localStorage)
├── foundations/
│   ├── colors          → CSS variables injected globally
│   ├── typography      → font slots + type scale + spacing scale
│   ├── spacing         → named spacing steps + radius scale
│   ├── shadows         → named shadow levels
│   ├── motion          → duration scale + easing presets
│   └── breakpoints     → responsive breakpoint definitions
├── elements/
│   ├── button          → per-variant defaults (derived from foundations)
│   ├── heading         → per-variant defaults
│   ├── body            → per-variant defaults
│   ├── link            → per-variant defaults
│   ├── image           → per-variant defaults
│   ├── video           → per-variant defaults
│   ├── input           → per-variant defaults
│   ├── range           → per-variant defaults
│   └── ...
└── layout/
    ├── contentBlock    → frame defaults (derived from foundations)
    ├── sectionColumn   → grid defaults
    ├── scrollContainer → scroll defaults
    └── section         → section base defaults
```

Foundations cascade at **read** time via pure derivation: `foundations → elementDefaults`.

---

## Part A — Foundations

### A1. Colors

**Existing:** M1 color seeds (light/dark) and derived semantic tokens.

**Editor target:** Brand seeds, sync-across-themes, semantic overrides behind Overrides drawer, neutral baseline, swatch previews (light + dark).

### A2. Typography

**Existing:** Font slots, weights, type scale.

**Editor target:** Per-level type scale overrides, line-height and letter-spacing scales (tokens exist — wire full UI), paragraph spacing, font-feature toggles, type specimen preview.

### A3. Spacing

**Existing:** `baseRem`, named spacing scale, radius steps, border-width scale in session + CSS.

**Editor target:** Ruler/step previews, per-step override locks in UI, radius scale editors beyond seeds if needed.

### A4. Shadows

**Existing:** Light/dark shadow scales in session + CSS vars.

**Editor target:** Per-level editors (structured or raw CSS string), preview card grid.

### A5. Motion

**Existing:** Duration and easing tokens, stagger, reduce-motion policy (CSS + runtime wrappers).

**Editor target:** Curve editors, default entrance/exit picks, looping demo card.

**Still open (product):** Preset **definitions** remain in `@pb/contracts` (`page-builder-motion-defaults`); an editable preset **registry** in the workbench + expand pipeline is not built yet.

### A6. Breakpoints

**Existing:** Mobile/desktop thresholds in session, wired into expand when options are passed.

**Editor target:** Editable thresholds, default preview viewport selector; optional future **sm/md/lg/…** beyond the current `[mobile, desktop]` content shape (schema change — separate decision).

---

## Part B — Input control library

Primitive, responsive, composite, token-reference, trigger-action, motion, and visibility controls — reused across element, section, and layout editors. (See original tables in git history if needed; summary: every schema field gets a matching control.)

---

## Part C — Preview encapsulation

**Goal:** What you see in `/dev` matches page-builder rendering.

### C1. Foundation context provider

`WorkbenchPreviewContext` (or equivalent): inject foundation CSS vars, active breakpoint, defaults context — **not implemented** as a named provider yet.

### C2–C5. Element, section, background, foundations previews

Full matrix of preview frames, state tabs, and inspectors — **planned**, not complete.

**Background note:** There is still no first-class `backgroundSolid` / `backgroundGradient` block type; variable layers with `fill` can approximate solids/gradients today.

---

## Part D — Element editors

Registry coverage, consistent settings panels (content → layout → typography → visual → motion → interactions → visibility → overrides), variant + custom mode, inheritance from foundations.

**Schema note:** `elementDivider` and other content elements exist in contracts; not all have full `/dev` editors.

---

## Part E — Layout editors

Frame (`contentBlock`), grid (`sectionColumn`), scroll container, section-base defaults — **specified**, largely **absent** from `/dev` as dedicated editors.

---

## Part F — Custom mode

`/dev/custom` (or equivalent): JSON in/out, no session mutation, optional variant diff — **not built**.

---

## Part G — Save system

Named snapshots, partial slice export/import, diff-before-apply, production import diff — **beyond** basic single-session persistence today.

---

## Part H — Data shape for drag-and-drop

Variants export valid `elementBlock` / `sectionBlock` nodes; IDs match load pipeline; foundations references use token names (e.g. `var(--pb-primary)`), not only resolved literals at author time.

---

## Implementation order

```
Phase 1 — Foundations completeness (data largely done; UI + polish remaining)
  A3–A6 Spacing, shadows, motion, breakpoints (+ editors, previews)

Phase 2 — Input control library
  B1–B7

Phase 3 — Foundation context provider
  C1 WorkbenchPreviewContext

Phase 4 — Element preview wrappers
  C2 All element preview encapsulations

Phase 5 — Section/Layout editors
  E1–E4 Frame, Grid, Scroll, Section base

Phase 6 — Element editor completeness
  D1–D3 All elements with full settings panels

Phase 7 — Custom mode
  F: standalone route + JSON panel

Phase 8 — Save system
  G: named snapshots, section-level saves, diff-aware restore
```

---

## Appendix: Remaining backlog (consolidated)

Use this list instead of separate internal gap docs.

**Workbench / product**

- Expose **all** persisted foundation slices in `/dev/style` (shadows, breakpoints, content widths, opacity scale, z-index layers, spacing locks, etc.).
- `WorkbenchPreviewContext` and **Part C** preview matrix.
- **Parts B, E, F, G** as above.

**Schema / pipeline** (detail in `page-builder-schema-semantics.md` → Known gaps)

- Form block `action` still **unvalidated** at schema level.
- Modal action payloads do not **cross-validate** modal ids to files.
- Optional: first-class **solid/gradient** background block types.
- Optional: **editable motion preset registry** in session + merge in `resolveEntranceMotion` / expand options.

**Optional foundations ideas** (not blocking Dev 0.5 core)

- Named **density → section margin** mapping formalized in content pipeline.
- **sm/md/lg** breakpoint expansion (requires schema + expand + UI agreement).

---

## Appendix: Retired internal docs

The following were merged or superseded by this file + `page-builder-schema-semantics.md` and are no longer maintained in-repo:

- `foundations_impl_plan.md` (agent implementation checklist — work largely landed in code)
- `foundations_missing_values.md` (wishlist; done items removed, open items → Appendix above + semantics doc)
- `schema_core_missing_values.md` (schema audit; fixed items removed, open items → semantics Known gaps)

Use a **local** `.plans/` folder (gitignored) only for personal scratch; the canonical roadmap is **this file**.
