# Page Builder Export — Figma Plugin

Exports selected Figma frames to page-builder JSON. Each top-level frame is converted to a section block; child layers become typed element blocks. Image fills are exported as PNG assets. The output is a ZIP containing structured JSON files, an `assets/` folder, and `export-notes.txt` with a conversion summary and all warnings.

Page exports are emitted in contract-native shape (`slug`, `title`, `sectionOrder`, `definitions`) so they can be dropped directly into `src/content/pages/` and validated with the same page-builder schema used at runtime.
Modal exports follow the same section-order/definitions pattern, and module exports are emitted as schema-valid `contentSlot + slots.main.section` scaffolds.

---

## Quick start

1. Open Figma Desktop.
2. Go to **Plugins → Development → Import plugin from manifest**.
3. Select `tools/figma-plugin/manifest.json`.
4. Select one or more top-level frames on the canvas.
5. Go to **Plugins → Development → Page Builder Export**.
6. Review the preview panel — it shows each detected frame, its type badge, and its output path. Set per-frame CDN prefixes and target overrides here.
7. Click **Export Selection**.
8. Click **Download ZIP** when conversion completes.

After export: unzip, copy JSON files to `src/content/` paths, copy `assets/` to CDN or public directory, then validate:

```bash
npx tsx scripts/validate-pages.ts
```

**Copy page JSON** (pb-dev) attaches root `figmaExportDiagnostics` with `converted` / `fallback` / `dropped` and reason histograms — see [Figma → Page Builder export contract](../../docs/16-figma-page-builder-export-contract.md).

---

## Build

```bash
cd tools/figma-plugin
npm install
npm run build   # → dist/main.js + dist/ui.html
npm run watch   # watch mode for development
```

---

## Naming convention

The frame's name prefix (everything before the first `/`) determines where the output lands.

| Frame name prefix   | Output path                        | Type badge    |
| ------------------- | ---------------------------------- | ------------- |
| `Page/`             | `pages/{key}.json`                 | blue          |
| `Section/`          | `presets/{key}.json`               | purple        |
| `Section[Desktop]/` | responsive pair — desktop half     | teal (paired) |
| `Section[Mobile]/`  | responsive pair — mobile half      | teal (paired) |
| `Modal/`            | `modals/{key}.json`                | orange        |
| `Module/`           | `modules/{key}.json`               | teal          |
| `Button/`           | `globals.json → buttons.{key}`     | green         |
| `Background/`       | `globals.json → backgrounds.{key}` | olive         |
| `Global/`           | `globals.json → elements.{key}`    | gray          |
| `skip/`             | excluded from export               | —             |
| _(no prefix)_       | `pages/{key}.json`                 | blue          |

`Section[Desktop]/hero` and `Section[Mobile]/hero` are exported as a matched pair, merged into a single preset where differing fields become `[mobileValue, desktopValue]` tuples. Missing counterpart → warning, both skipped.

---

## ZIP output structure

```
page-builder-export.zip
  pages/
    case-study.json
    about.json
  content/pages/
    case-study/
      index.json
      …
  presets/
    hero-dark.json
  modals/
    contact-form.json
  modules/
    feature-card.json
  globals.json
  assets/
    hero/banner.png
    hero/bg.png
    hero-reel/poster.png
  export-notes.txt
```

---

## Docs index

| File                                                                   | Contents                                                                                                    |
| ---------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------- |
| [00-getting-started.md](./00-getting-started.md)                       | Full step-by-step — install, name frames, run export, post-export checklist                                 |
| [01-architecture.md](./01-architecture.md)                             | Two-thread model, message protocol, conversion pipeline, ConversionContext, source file map                 |
| [02-annotation-system.md](./02-annotation-system.md)                   | Complete `[pb: key=value]` reference — all section, element, trigger, effect, motion, and style annotations |
| [03-section-types.md](./03-section-types.md)                           | `contentBlock`, `sectionColumn`, `revealSection` — detection logic, output shapes, responsive fields        |
| [04-element-types.md](./04-element-types.md)                           | All element types including `elementVideo`, auto-detection routing, layout props reference                  |
| [05-interactions-and-triggers.md](./05-interactions-and-triggers.md)   | Component variants, prototype reactions, annotation interactions, section trigger types                     |
| [06-visual-properties.md](./06-visual-properties.md)                   | Fills, borders, effects, opacity, transforms, typography, text truncation, Figma variables                  |
| [07-asset-handling.md](./07-asset-handling.md)                         | Asset key system, image export, video poster, CDN prefix, ZIP structure                                     |
| [08-workflow.md](./08-workflow.md)                                     | Layer naming, responsive pairs, CDN prefix, step-by-step export, post-export checklist                      |
| [09-extending.md](./09-extending.md)                                   | Adding new element types, section types, annotation keys, export targets, responsive fields                 |
| [12-page-builder-expand-parity.md](./12-page-builder-expand-parity.md) | Runtime `expandPageBuilder` ids, column keys, display order                                                 |
| [13-layout-figma-to-pb.md](./13-layout-figma-to-pb.md)                 | Figma auto-layout → JSON layout → CSS mapping                                                               |
| [14-globals-and-modules.md](./14-globals-and-modules.md)               | `globals.json` handoff vs `src/content/modules`                                                             |
| [15-figma-pb-parity-matrix.md](./15-figma-pb-parity-matrix.md)         | Page-builder schema vs exporter coverage (sections, elements, globals)                                      |
