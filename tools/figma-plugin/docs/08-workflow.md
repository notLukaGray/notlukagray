# Designer Workflow

Recommended workflow for using the plugin day-to-day.

---

## Layer naming conventions

Layer names become element and section IDs. Meaningful names matter — they appear in the JSON, in error messages, and in content override keys.

### Rules

- Use descriptive kebab-case names: `hero-heading`, `feature-card`, `cta-button`.
- Avoid Figma defaults. Layers named `Frame 42`, `Rectangle 7`, `Group 3` generate warnings and produce IDs like `frame-42` that are useless for interactions or content overrides.
- Annotations go in square brackets at the end: `Hero Section [pb: sticky=true]`.
- The annotation block is stripped before the ID is generated.
- Names are lowercased and non-alphanumeric characters replaced with `-`.
- Duplicate IDs within a single export run are deduplicated by appending a counter: `hero-title`, `hero-title-2`.

### Generic name warning pattern

These patterns trigger a warning in `export-notes.txt`:

```
Frame 42, Rectangle 7, Group 3, Ellipse 1, Vector 6, Line 2, Polygon 5, Star 9
```

Rename these layers in Figma before exporting if the IDs will be referenced by interactions, `visibleWhen` conditions, or content overrides. The plugin still infers a better ID from the first text child content or component name where possible.

### Top-level frame naming

| Frame name                 | Output                                                |
| -------------------------- | ----------------------------------------------------- |
| `Page/Case Study`          | `pages/case-study.json`                               |
| `Section/Hero Dark`        | `presets/hero-dark.json`                              |
| `Section[Desktop]/hero`    | Responsive pair — merged with `Section[Mobile]/hero`  |
| `Section[Mobile]/hero`     | Responsive pair — merged with `Section[Desktop]/hero` |
| `Modal/Contact Form`       | `modals/contact-form.json`                            |
| `Module/Feature Card`      | `modules/feature-card.json`                           |
| `Button/Primary CTA`       | `globals.json → buttons.primary-cta`                  |
| `Background/Gradient Dark` | `globals.json → backgrounds.gradient-dark`            |
| `Global/Social Links`      | `globals.json → elements.social-links`                |
| `skip/Anything`            | Excluded from export                                  |

---

## Responsive pairs workflow

To produce a section that adapts between mobile and desktop:

1. Create two frames with matching base names:
   - `Section[Desktop]/hero` — design for desktop
   - `Section[Mobile]/hero` — design for mobile
2. Select both frames (or use `Cmd+A` if on the same Figma page).
3. Export. The plugin detects the pair, shows `hero [desktop+mobile]` in the preview panel.
4. Both frames are converted independently, then merged:
   - Fields that differ → `[mobileValue, desktopValue]` tuple.
   - Fields that are identical → single value.
   - Desktop wins for non-responsive structural fields.

**Missing counterpart** — `Section[Desktop]/hero` with no `Section[Mobile]/hero` → both frames skipped, warning logged. Always export pairs together.

**Which fields go responsive** — see [03-section-types.md](./03-section-types.md) for the full list of section-level responsive fields, and [04-element-types.md](./04-element-types.md) for element-level responsive fields.

---

## CDN prefix per frame

In the plugin UI preview panel, each frame has a CDN prefix field (persisted in `localStorage`). Set it to a project-specific prefix:

```
work/my-project/
```

All asset keys for that frame will be prefixed:

- Layer `hero/banner` → CDN key `work/my-project/hero/banner.png`
- Layer `intro-reel` → video src `work/my-project/intro-reel.mp4`

Leave blank to use bare layer names as asset keys.

---

## ZIP output structure

```
page-builder-export.zip
  pages/
    home.json
    about.json
  presets/
    hero-dark.json
  modals/
    search.json
  modules/
    testimonial.json
  globals.json
  assets/
    hero/banner.png
    hero/bg.png
    hero-reel/poster.png
  export-notes.txt
```

Multiple frames with the same `Page/` prefix are merged into a single `pages/{slug}.json`. Each frame becomes one section key in `sectionOrder`, and the concrete section block is stored in `definitions[sectionId]` (with a compatibility `sections` mirror also included).

`modals/{slug}.json` follows the same pattern (`id`, `title`, `sectionOrder`, `definitions`) so it can be loaded directly by the modal loader.
`modules/{slug}.json` is exported as a valid module scaffold (`type: "module"`, `contentSlot: "main"`, `slots.main.section`) and can be extended with additional slots/behavior.

`globals.json` structure:

```json
{
  "buttons": {
    "primary": { "type": "elementButton", "label": "Get started" }
  },
  "backgrounds": {
    "grid": { "fill": "#f5f5f5", "src": "grid/bg.png" }
  },
  "elements": {
    "site-logo": { "type": "elementImage", "src": "site-logo.png" }
  }
}
```

---

## Recommended Figma file structure

Keeping different output types on separate Figma pages reduces noise.

| Figma page     | What to put here                                                  |
| -------------- | ----------------------------------------------------------------- |
| **Pages**      | All `Page/*` frames — the actual case study layouts               |
| **Sections**   | All `Section/*`, `Section[Desktop]/*`, `Section[Mobile]/*` frames |
| **Modals**     | All `Modal/*` frames                                              |
| **Components** | All `Button/*`, `Global/*`, `Background/*` frames; component sets |
| **Modules**    | All `Module/*` frames                                             |

This is convention — the plugin works regardless of which Figma page frames live on.

---

## Step-by-step export

1. Open Figma Desktop.
2. Select one or more top-level frames. Each frame becomes one section in its output file.
3. Go to **Plugins → Development → Page Builder Export**.
4. Review the preview panel:
   - Each frame shows its name, type badge, and output path.
   - Responsive pairs show as `label [desktop+mobile]` with a teal badge.
   - Set per-frame CDN prefix if needed.
   - Override target type with the dropdown if auto-detection is wrong.
   - Mark frames as `skip` if you want to exclude them.
5. Click **Export Selection**.
6. Wait for conversion — progress messages appear.
7. Click **Download ZIP**.
8. Unzip.
9. Place files:
   - `pages/*.json` → `src/content/pages/`
   - `presets/*.json` → appropriate presets directory
   - `modals/*.json`, `modules/*.json` → as appropriate
   - `globals.json` → merge with existing globals
   - `assets/` → CDN or public directory
10. Run validation: `npx tsx scripts/validate-pages.ts`
11. Review `export-notes.txt` and apply manual fixes.

Frames are exported in top-to-bottom, left-to-right order (2 px threshold for near-identical rows). The order in `page.json` matches the visual stacking on canvas.

---

## What to do manually after export

Open `export-notes.txt` first. It categorises all notes into `[error]`, `[warn]`, `[info]`, and `[docs]`.

| Item                                           | Action                                                                                              |
| ---------------------------------------------- | --------------------------------------------------------------------------------------------------- |
| Generic layer name warnings (`Frame 42`, etc.) | Rename in Figma and re-export if these IDs will be referenced                                       |
| `[prototype] NAVIGATE` → `frameId`             | Replace `payload.href` with actual page routes                                                      |
| `[prototype] OPEN_OVERLAY` / `SWAP_OVERLAY`    | Confirm the auto-resolved modal `id` matches your runtime registry                                  |
| `[prototype] SCROLL_TO`                        | Confirm the resolved element `id` matches the target element                                        |
| `motionTiming` / entrance animations           | Add manually — never emitted from Figma appearance                                                  |
| `bgBlocks`                                     | Frames named `bg-*` or `background` get a warning — author as `bgBlocks` in JSON manually if needed |
| `CROP` scale mode warnings                     | Review `objectPosition` on affected images                                                          |
| Video src derived from layer name              | Verify `src` matches CDN path; set `[pb: src=...]` if it doesn't                                    |
| Component set warnings                         | Check that variants have standard state property names                                              |
| `[info] Merged responsive pair`                | Confirm merged output looks correct; check responsive tuples                                        |

---

## Re-exporting

Re-exporting the same component or frame overwrites the output for that key. Figma is the source of truth.

- Partial exports (only one page, one preset) are fine — they only overwrite their own output keys.
- Merging `globals.json` from multiple export runs is safe — keys from the latest run take precedence.
- **Manual post-export edits are overwritten** — `motionTiming` additions, fixed `frameId` links, etc. Keep those in a script or patch file.

---

## Working with component variants

- Always place the **Default** (or `Rest`/`Normal`/`Initial`/`Idle`) variant on canvas, not Hover or Pressed.
- Name the state property exactly `State`, `Mode`, `Status`, or `Variant`.
- Use the standard state values from the [component variant table](./05-interactions-and-triggers.md).

---

## Using annotations

**Annotate when**:

- Auto-detection gives the wrong result.
- You need section triggers (`onVisible`, `timer`, `key`, etc.).
- You need `visibleWhen` conditions.
- You need to set a video `src`.
- You need `contentKey` or `variableKey` on text elements.
- You need motion shorthand (`entrance`, `exit`, etc.).
- You need semantic typography levels without raw typography extraction (`style=h1`).

**Skip annotations when**:

- The naming convention already tells the plugin what to do.
- Auto-layout, text size, and fill type correctly determine the element type.
- You just want the default output.

---

## Handling absolute layouts

Auto-layout is strongly preferred. Free-layout (`layoutMode=NONE`) frames produce elements with absolute `top`/`left` positions in `wrapperStyle`, which works but is fragile at responsive widths.

When you must use free layout:

- Make sure the parent frame has a fixed size so coordinates are meaningful.
- The parent `elementGroup` will receive `position: "relative"` automatically.
- Each absolutely-positioned child gets `position: "absolute"` + `top`/`left`/`width`/`height` in `wrapperStyle`.

Nodes individually floated out of an auto-layout parent (`layoutPositioning === "ABSOLUTE"` in Figma) are also handled, with constraint-aware positioning.

---

## Design system alignment

### Text colors

Pure black (r/g/b < 4%) and pure white (r/g/b > 96%) are **not extracted** to `wrapperStyle.color`. Only intermediate custom colors are extracted. If text disappears after export, check that the design system CSS provides the base color.

### Figma variables

Variable bindings on fills and typography emit as `var(--token-name, fallback)`. Variable name `colors/primary/500` → CSS var `--colors-primary-500`. Ensure your runtime CSS custom properties use the same naming convention.

### Font families

Font family names are emitted as-is from Figma. Ensure fonts are loaded in the runtime.

---

[Back to README](./README.md) | [Annotation system](./02-annotation-system.md) | [Extending](./09-extending.md)
