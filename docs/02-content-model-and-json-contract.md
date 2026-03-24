# Content model and JSON contract

## Content is the authoring surface

The runtime interprets authored content under `src/content/`.
Treat this tree as structured input with a stable contract, not ad-hoc files.

## Content directories

### `src/content/data/`

Global configuration and shared entry points.

Important files:

- `globals.json`
- `layout.json`
- `presets.json`

`globals.json` currently carries a lot of weight. It covers site metadata, nav/footer, logo, CDN config, auth defaults, UI timing, cache prefixes, and home-page hero data. That makes it convenient, but also heavy.

### `src/content/pages/`

This is the primary authored page surface.

A page usually has:

- one top-level page file such as `src/content/pages/lenero.json`
- one nested directory such as `src/content/pages/lenero/`
- one file per section or definition fragment inside that nested directory

This split is intentional. It keeps the page shell separate from section-level authoring.

### `src/content/presets/`

Reusable definition blocks or preset maps.

These are composition tools, not pages.
Use presets when a visual or structural pattern should be repeated across content.

### `src/content/modules/`

Reusable module definitions.

At the moment the major example is `video-player.json`.
This is important because it shows the intended design: modules are authored as structured config, not hardcoded per-video UI.

### `src/content/modals/`

Modal content follows the same overall philosophy as page content.

A modal has:

- a top-level modal file
- nested section files under a same-named directory

That is not accidental duplication. It means modal authoring stays close to page authoring, which keeps the mental model clean.

### `src/content/schemas/`

Generated JSON Schema files.

These are editor support artifacts, not runtime truth.
They exist so authored JSON gets autocomplete and validation help in editors.

## Page contract

A page file is the top-level document that tells the runtime what to load and how to compose it.

Common responsibilities:

- identity: `title`, `slug`, `description`, `ogImage`
- routing partition: `assetBaseUrl`
- structure: `sectionOrder`
- definitions: `definitions`
- inline presets: `preset` (page-local preset map)
- background selection: `bgKey`
- behavior: `transitions`, `passwordProtected`, optional page-level trigger hooks

The page does not need to inline every section.
It can point to nested section files, which the loader hydrates later.

## Definitions

Definitions are the currency of the system.

A definition can be:

- a background block
- a section block
- an element block
- a module block
- another reusable authored block that fits the page-builder contract

The core rule is simple:

- `sectionOrder` says what should render
- `definitions` says what those keys mean

## Merge order

The merge order matters because this repo composes authored state from multiple sources.

The effective sequence is:

1. inline page definitions
2. global modules from `src/content/modules/`
3. nested section files loaded for the page
4. extra definition fragments in the page directory
5. global presets
6. page-specific preset files
7. inline page presets (`preset` in the page JSON)
8. preset resolution into final definition blocks

Later data can override earlier data.
That is power, but it is also risk if keys are sloppy.

## Why section files exist

Nested section files are not ceremony.
They solve real problems:

- page files stay readable
- large sections stop becoming unreviewable blobs
- multiple people can work on a page with less friction
- nested section-local definitions can travel with the section that owns them

If a page becomes large and still lives entirely in one top-level JSON file, that is usually a smell.

## Asset partitions via `assetBaseUrl`

`assetBaseUrl` is more than a path prefix.

It partitions the authored page space into route surfaces such as:

- `/work`
- `/research`
- `/teaching`

That is how the same page-builder system powers multiple site sections without needing separate builders.

## What lives in code and what lives in content

### Put it in content when:

- it is page structure
- it is section composition
- it is reusable authored UI state
- it is a preset
- it is a module configuration
- it is modal content
- it is a route-specific content document

### Put it in code when:

- it is runtime behavior
- it is security logic
- it is media delivery logic
- it is section or element rendering behavior
- it is schema enforcement
- it is something that should not be editable by arbitrary content changes

## Schemas and types

The repo uses Zod schemas in `src/page-builder/core/page-builder-schemas/` as the canonical validation layer.

Generated JSON Schema in `src/content/schemas/` is downstream from that.
It exists for editor help.

The rule is simple:

- Zod is runtime and type truth
- generated JSON Schema is authoring assistance

## Practical authoring rules

1. Keep page shells thin.
2. Split large pages into nested section files.
3. Use presets when repetition becomes structural, not just convenient.
4. Use modules for reusable interactive systems.
5. Treat definition keys as real identifiers, not throwaway labels.
6. Do not bypass the content system just because one page is in a hurry.

## What to inspect when content goes wrong

- the top-level page file
- the nested section files for the page
- global modules
- global presets and page-level presets
- schema validation output from `npm run validate-pages`
- whether a key collision caused one definition to override another
