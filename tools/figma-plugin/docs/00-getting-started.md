# Getting Started

Complete guide for someone using the plugin for the first time, from installation to first export.

---

## 1. Install the plugin

1. Open **Figma Desktop** (the plugin API requires the desktop app).
2. Go to **Plugins → Development → Import plugin from manifest**.
3. Select `tools/figma-plugin/manifest.json` from this repo.
4. The plugin now appears under **Plugins → Development → Page Builder Export**.

---

## 2. Build the plugin

```bash
cd tools/figma-plugin
npm install
npm run build   # → dist/main.js + dist/ui.html
```

For active development, use watch mode — Figma Desktop reloads automatically when `dist/` changes:

```bash
npm run watch
```

---

## 3. Name your frames

Every top-level Figma frame that you want to export needs a name that tells the plugin where the output goes.

### Standard frames

The prefix before the first `/` determines the output target:

| Frame name                 | Output path                                | UI badge |
| -------------------------- | ------------------------------------------ | -------- |
| `Page/Case Study`          | `pages/case-study.json`                    | blue     |
| `Section/Hero Dark`        | `presets/hero-dark.json`                   | purple   |
| `Modal/Contact Form`       | `modals/contact-form.json`                 | orange   |
| `Module/Feature Card`      | `modules/feature-card.json`                | teal     |
| `Button/Primary CTA`       | `globals.json → buttons.primary-cta`       | green    |
| `Background/Gradient Dark` | `globals.json → backgrounds.gradient-dark` | olive    |
| `Global/Social Links`      | `globals.json → elements.social-links`     | gray     |
| `My Frame` _(no prefix)_   | `pages/my-frame.json`                      | blue     |

Prefix matching is case-insensitive. The slug after `/` is lowercased and non-alphanumeric characters become hyphens.

### Responsive pairs (new)

To export a section that responds to different breakpoints, create two matched frames:

```
Section[Desktop]/hero    ←  desktop artboard
Section[Mobile]/hero     ←  mobile artboard
```

The plugin detects the pair, shows `hero [desktop+mobile]` with a teal badge in the preview, converts both frames independently, then merges them. Fields that differ between mobile and desktop become `[mobileValue, desktopValue]` tuples in the output. Missing counterpart → warning logged, both frames skipped.

### Skip frames

Name a frame `skip/anything` or `Skip/anything` and it will be excluded from export entirely. You can also set a frame to skip in the plugin UI.

---

## 4. Run the export

1. Select one or more top-level frames on the canvas.
2. Go to **Plugins → Development → Page Builder Export**.
3. The preview panel loads, showing each frame, its type badge, and its output path.
4. In the preview panel you can:
   - Override the target type (page / preset / modal / etc.) with a dropdown.
   - Set a per-frame CDN prefix (e.g. `work/my-project/`) — asset keys for that frame will be prefixed.
   - Mark a frame as skip.
5. Click **Export Selection**.
6. Wait for conversion — progress messages appear in the plugin panel.
7. Click **Download ZIP**.

---

## 5. After export

### Unzip and review

```
page-builder-export.zip
  pages/
    case-study.json
  presets/
    hero-dark.json
  modals/
    contact-form.json
  assets/
    hero/banner.png
    hero/poster.png
  export-notes.txt
```

Open `export-notes.txt` first. All `[error]` entries must be addressed. Review `[warn]` entries.

### Place files

- `pages/*.json` → `src/content/pages/`
- `presets/*.json` → appropriate presets directory
- `modals/*.json`, `modules/*.json` → as appropriate
- `globals.json` → merge with existing globals
- `assets/` → your CDN or public directory

### Validate

```bash
npx tsx scripts/validate-pages.ts
```

### Manual fixes required after every export

| Issue                                         | Fix                                                                    |
| --------------------------------------------- | ---------------------------------------------------------------------- |
| `[prototype] NAVIGATE` actions with `frameId` | Replace `payload.href` with the real page route                        |
| `[prototype] OPEN_OVERLAY` or `SWAP_OVERLAY`  | Confirm the auto-resolved modal `id` matches your runtime registry     |
| `[prototype] SCROLL_TO`                       | Confirm the resolved `id` matches the target element's page-builder id |
| Video `src` derived from layer name           | Verify `src` matches your CDN key, or use `[pb: src=...]`              |
| `motionTiming`                                | Never emitted by the plugin — add manually where needed                |

---

## Frame naming — quick rules

- Descriptive kebab-case names: `hero-heading`, `feature-card`, `cta-button`.
- Rename Figma defaults (`Frame 42`, `Rectangle 7`) before exporting — auto-names trigger warnings and produce useless IDs.
- The annotation block is stripped before the ID is generated: `Hero Section [pb: sticky=true]` → ID `hero-section`.
- Multiple `Page/Case Study` frames export into the same `pages/case-study.json`, each frame adding a section.

---

## Layer naming and asset keys

Layer names drive asset filenames. Slashes in a layer name create directory structure:

| Layer name           | Image asset key          | ZIP path                        |
| -------------------- | ------------------------ | ------------------------------- |
| `hero`               | `hero.png`               | `assets/hero.png`               |
| `hero/banner`        | `hero/banner.png`        | `assets/hero/banner.png`        |
| `work/project/cover` | `work/project/cover.png` | `assets/work/project/cover.png` |

Background image fills: `heroFrame` layer name → `hero/bg.png` in the ZIP.

Video poster: `intro-reel` layer name → `intro-reel/poster.png` in the ZIP. Video `src` → `intro-reel.mp4` (not exported — must already exist on CDN).

A CDN prefix set in the plugin UI is prepended to all asset keys for that frame: prefix `work/case-study/` + layer `hero/banner` → CDN key `work/case-study/hero/banner.png`.

---

## Annotation quick reference

Format: `[pb: key=value, key2=value2]` at the end of any layer name.

```
Hero Banner [pb: entrance=slideUp, duration=0.5]
Section Frame [pb: sticky=true, stickyOffset=64px]
Video Layer [pb: type=elementVideo, autoplay=true, loop=true, muted=true]
Caption [pb: style=body2]
Headline [pb: style=h1]
```

Rules:

- The block must appear at the very end of the name.
- Keys are case-insensitive.
- A bare key with no `=` is a boolean flag `true`.
- The annotation is stripped before generating the element ID.

### Most common annotations

**Type overrides** (bypass auto-detection):

```
[pb: type=button]
[pb: type=image]
[pb: type=elementVideo]
[pb: type=spacer]
[pb: type=revealSection]
[pb: type=sectionColumn]
```

**Typography semantic styles** (emit heading/body level only, no raw typography):

```
[pb: style=h1]   [pb: style=h2]   [pb: style=h3]   [pb: style=h4]   [pb: style=h5]
[pb: style=body1] through [pb: style=body6]
```

**Element interactions**:

```
[pb: onClick=navigate:/work/slug]
[pb: onClick=modalOpen:contact-form]
[pb: onClick=modalClose]
[pb: onClick=scrollTo:target-id]
[pb: onHoverEnter=elementShow:tooltip]
[pb: onHoverLeave=elementHide:tooltip]
```

**Section behavior**:

```
[pb: sticky=true, stickyOffset=64px]
[pb: onVisible=elementShow:counter-group, triggerOnce=true]
[pb: onScrollDown=elementHide:nav-bar, onScrollUp=elementShow:nav-bar]
[pb: timer=3000:modalOpen:idle-prompt]
[pb: effect=parallax:0.6]
```

**Motion shorthand** (works on elements and sections):

```
[pb: entrance=slideUp, exit=fade, duration=0.5, delay=0.2]
[pb: entrance=fade, trigger=onFirstVisible, viewportAmount=0.15]
```

**Asset and content**:

```
[pb: src=video/reel.mp4]
[pb: poster=video/reel/poster.jpg]
[pb: alt=Hero photo of project]
[pb: href=/work/project-name]
[pb: variableKey=heroTitle]
[pb: contentKey=hero-heading]
```

Full annotation reference: [02-annotation-system.md](./02-annotation-system.md).

---

## Auto-detection — what the plugin infers without annotations

| Figma state                                                      | Plugin output                                         |
| ---------------------------------------------------------------- | ----------------------------------------------------- |
| `clipContent: true` on a frame                                   | `overflow: "hidden"`                                  |
| Hidden layer (`visible: false`)                                  | Element exported with `hidden: true`                  |
| Horizontal auto-layout, all children are frames                  | Auto-classified as `sectionColumn`                    |
| `TEXT` node, `fontSize >= 22` or `fontWeight >= 600`             | `elementHeading`                                      |
| `TEXT` node with URL hyperlink                                   | `elementLink`                                         |
| Frame/INSTANCE with name starting `video` or `vid-`              | `elementVideo`                                        |
| `VECTOR`, `ELLIPSE`, `STAR`, `POLYGON`, `LINE`                   | `elementSVG`                                          |
| `RECTANGLE` with image fill                                      | `elementImage`                                        |
| `COMPONENT`/`INSTANCE` name containing `button`, `btn`, or `cta` | `elementButton`                                       |
| Prototype `ON_CLICK` → URL                                       | `navigate` action                                     |
| Prototype `OPEN_OVERLAY`                                         | `modalOpen` action (ID auto-resolved from frame name) |
| Prototype `SCROLL_TO`                                            | `scrollTo` action (ID auto-resolved from node name)   |

---

## Common mistakes

**Generic layer names** — `Rectangle 123` produces ID `rectangle-123`, useless in interactions. Rename before export.

**Clip content on elements with shadows** — `clipContent = true` auto-emits `overflow: hidden`. Turn off Clip Content if shadows should bleed outside the frame.

**Non-default variant on canvas** — placing a Hover or Pressed instance directly triggers a warning and skips full variant state wiring. Always place the Default variant.

**Video src from layer name** — if the layer is named `hero-reel`, the plugin emits `src: "hero-reel.mp4"` and logs a warning to verify. Set `[pb: src=path/to/file.mp4]` if the CDN key differs.

**Re-exporting overwrites manual JSON edits** — `motionTiming` additions, fixed `frameId` links, and other post-export edits are overwritten on the next export. Keep those in a script or patch file.

**Responsive pair missing counterpart** — `Section[Desktop]/hero` with no matching `Section[Mobile]/hero` → both frames skipped, warning logged.

---

## After export checklist

1. Unzip the archive.
2. Open `export-notes.txt` — address all `[error]` entries, review `[warn]`.
3. Copy JSON files to `src/content/` paths; copy `assets/` to CDN or public directory.
4. Replace `frameId` values in `navigate` and `modalOpen` actions with real routes/slugs (prototype NAVIGATE actions).
5. Verify video `src` keys match CDN paths.
6. Add `motionTiming` fields manually where animations are needed.
7. Run `npx tsx scripts/validate-pages.ts`.

---

[README](./README.md) | [Architecture](./01-architecture.md) | [Annotation system](./02-annotation-system.md) | [Section types](./03-section-types.md) | [Element types](./04-element-types.md) | [Interactions](./05-interactions-and-triggers.md) | [Visual properties](./06-visual-properties.md) | [Asset handling](./07-asset-handling.md) | [Workflow](./08-workflow.md)
