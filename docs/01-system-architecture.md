# System architecture

## Conceptual layers

This repo has two layers:

1. **Product layer**
   - the actual site surfaces: home, work, research, teaching, profile, unlock, form endpoints

2. **System layer**
   - the page-builder, schema contracts, content loading, media resolution, triggers, modules, modals, delivery logic

The system layer defines the underlying platform.
The product layer is an application of that platform.

Most documentation should focus on the system layer.

## Main subsystems

### 1. Route layer

Lives in `src/app/`.

This layer does four jobs:

- expose route surfaces
- generate metadata and static params
- choose the correct page-builder entry point
- expose API routes for unlock, forms, media, and dev tooling

The route layer is thin on purpose. It should not own page composition logic.

### 2. Content layer

Lives in `src/content/`.

This is where the authored system lives:

- `data/` for global configuration and preset entry points
- `pages/` for page definitions and section fragments
- `modules/` for reusable interactive module definitions
- `modals/` for modal content definitions
- `presets/` for reusable visual and structural blocks
- `schemas/` for generated JSON Schema files

The content layer defines what should exist.
It does not decide how the runtime behaves after load.

### 3. Page-builder core

Lives mostly in `src/page-builder/core/`.

This is the backbone.

It handles:

- filesystem load
- preset composition
- definition merging
- section hydration
- reference expansion
- trigger payload resolution
- asset URL resolution
- breakpoint-aware server preprocessing
- public APIs like `getPage()`, `getPageBuilderProps()`, and async variants

This is the part of the repo that makes authored JSON become renderable state.

### 4. Rendering runtime

Lives across `src/page-builder/`, `src/page-builder/section/`, and `src/page-builder/elements/`.

This layer takes a resolved tree and mounts it.

Important runtime files:

- `src/page-builder/PageBuilderPage.tsx`
- `src/page-builder/PageBuilderRenderer.tsx`
- `src/page-builder/PageBuilderBackground.tsx`
- `src/page-builder/section/index.ts`
- `src/page-builder/elements/index.ts`
- `src/page-builder/elements/Shared/ElementRenderer.tsx`

This is the execution layer, not the source of truth.

### 5. Infrastructure layer

Lives mostly in `src/core/lib/`, `src/core/hooks/`, and a few `src/app/api/*` routes.

This layer handles:

- CDN signing and proxy construction
- access cookie logic
- unlock rate limiting
- form parsing and email handoff
- image loader behavior
- shared hooks for media and page state
- app shell and shared header/footer UI

This is where the system touches the outside world.

## Request and render flow

For a page-builder route, the path is roughly this:

```text
route file
-> getPageBuilderPropsAsync()
-> loadPageBuilderAsync()
-> merge definitions / modules / presets / section files
-> expandPageBuilder()
-> resolve breakpoints and asset URLs
-> PageBuilderPage
-> PageBuilderRenderer
-> section registry
-> element registry
```

That is the contract. Most of the repo hangs off this pipeline.

## Directory map

### `src/app/`

- top-level pages and layouts
- route entry points for work, research, teaching, profile
- unlock and form APIs
- media API routes
- dev-only validation and content-watch routes

### `src/content/`

- canonical authored data
- not passive assets, but structured input for the runtime
- a page is usually split between a top-level file and nested section files

### `src/core/`

- shared shell UI
- shared hooks
- auth and cookie logic
- media delivery helpers
- forms infrastructure
- global config parsing

### `src/page-builder/`

- schemas and types
- loader and expand logic
- runtime rendering
- section and element registries
- triggers and transitions
- Framer Motion and 3D integrations

### `scripts/`

- generation and validation utilities
- not runtime code, but important to build correctness and editor support

## Design principles you should preserve

### Thin routes

Routes should choose a page or runtime path, not build the page.

### Data before components

New page surface area should come from content and contracts first.
Ad hoc components should be the exception.

### Server prepares, client executes

The client should not have to figure out what a content key means.
The server does the expensive interpretive work first.

### File-based authorship

The repo is intentionally built so authored content can be split into human-sized files.

### Controlled extensibility

Not every string in JSON is executable.
Handlers, routes, and media flows are allowlisted or mediated.

## Architectural asymmetries that are real

The repo is coherent, but not perfectly uniform.

- `/work` uses proxy-based mobile/desktop variant rewriting
- `/research` and `/teaching` still read the user agent at request time
- home is not page-builder driven in the same way as work pages
- forms follow a shared pattern, but remain route-per-handler
- media resolution is generalized in concept, Bunny-specific in implementation

## What external partners need to understand fast

1. This is a system repo, not just a site repo.
2. JSON structure is first-class.
3. `src/page-builder/core/` is the operational center.
4. `src/content/` is where authored change should start.
5. Media delivery, triggers, and motion are part of the architecture, not decoration.
