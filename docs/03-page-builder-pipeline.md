# Page-builder pipeline

## Pipeline stages

Pages are processed in distinct stages.
This separation of concerns keeps each step narrow enough to reason about.

## Stage 1: load

Primary files:

- `src/page-builder/core/page-builder-load.ts`
- `src/page-builder/core/load/page-builder-load-io.ts`
- `src/page-builder/core/load/page-builder-load-definitions.ts`
- `src/page-builder/core/load/page-builder-load-presets.ts`

Responsibilities:

- validate the slug as a safe path segment
- read the top-level page JSON
- gather inline definitions
- merge global modules
- hydrate nested section files
- load global presets, page preset files, and inline page presets (`preset`)
- resolve definition presets
- perform non-blocking schema validation

This stage is about assembling the authored document into one coherent input.

Page JSON, section files, presets, and modules come from:

- `src/content/pages/` (e.g. `slug.json`, `slug/nav.json`)
- `src/content/data/presets.json`
- `src/content/presets/`
- `src/content/modules/`

## Stage 2: expand

Primary file:

- `src/page-builder/core/page-builder-expand.ts`

Supporting files:

- `src/page-builder/core/page-builder-expand/element-resolution.ts`
- `src/page-builder/core/page-builder-expand/column-namespacing.ts`
- `src/page-builder/core/page-builder-expand/trigger-payload-resolution.ts`

Responsibilities:

- compute the display order
- resolve the selected background block
- turn section references into concrete section blocks
- resolve element order into actual element arrays
- assign stable IDs and module wiring
- namespace column-related data
- resolve section trigger payload references
- optionally resolve trigger asset URLs in the same pass

This stage turns a content document into something the renderer can actually use.

Authored content can be indirect:

- sections can be referenced by key
- elements can be referenced by key
- nested definitions can exist inside sections
- modules can inject behavior
- triggers can reference assets or backgrounds indirectly

Expand resolves this indirection into concrete blocks for the renderer.

## Stage 3: resolve

Primary files:

- `src/page-builder/core/page-builder-get-props.ts`
- `src/page-builder/core/page-builder-blocks.ts`
- `src/page-builder/core/page-builder-resolve-assets-server.ts`
- `src/page-builder/core/page-builder-resolve-breakpoint-server.ts`
- `src/page-builder/core/page-builder-resolved-assets.ts`

Responsibilities:

- determine the effective asset base
- resolve block-level asset keys
- preprocess breakpoint-sensitive values on the server
- collect media refs across backgrounds, sections, and transitions
- build proxy and signed CDN URL maps
- inject resolved URLs into the tree
- compute transition background definitions
- resolve entrance motions into sections

This stage interprets authored data into runtime-ready data.

The client does not receive raw asset keys and derive behavior from them.
The server resolves as much as it can before the page reaches the browser for correctness, performance, and consistency.

## Stage 4: render

Primary files:

- `src/page-builder/PageBuilderPage.tsx`
- `src/page-builder/PageBuilderRenderer.tsx`
- `src/page-builder/PageBuilderBackground.tsx`

Responsibilities:

- wrap the page in semantic layout
- feed resolved sections and backgrounds into the renderer
- mount the correct background
- mount section components from the registry
- handle trigger listeners, transitions, overrides, and runtime state
- keep the rendering layer focused on execution rather than interpretation

The renderer should not be discovering structure.
It should be consuming prepared structure.

## Public entry points

### `getPage()` and `getPageAsync()`

These return the expanded page object, including definitions and resolved sections/background selection.

Use these when you need the page document itself, metadata, or pre-render access to the authored structure.

### `getPageBuilderProps()` and `getPageBuilderPropsAsync()`

These return the final page props consumed by `PageBuilderPage`.

Use these when the goal is rendering.

## Async and sync paths

Both sync and async code paths exist to support different route and metadata use cases while keeping the same contract surface.

The async path is the primary choice for route rendering.
The sync path is used for local utility and some build-time situations.

## Request-scoped caching

The loader and page getters make use of React `cache()`.

That matters because route generation and metadata generation can hit the same page data repeatedly in a single request/build cycle.

The cache reduces redundant disk work and repeated expand passes.

## Validation behavior

Validation is non-blocking by default.

In development, if `STRICT_VALIDATION=true`, page validation failures can throw.
Otherwise, the loader tolerates invalid content enough to keep moving, while still allowing stricter enforcement when needed.

## Manifest and slug generation

The pipeline is supported by generated artifacts:

- `src/content/page-manifest.json`
- `src/core/lib/protected-slugs.generated.ts`

These are produced by:

- `scripts/generate-page-manifest.ts`
- `scripts/generate-protected-slugs.ts`

They exist to keep runtime route work lighter and to avoid scanning page files for certain concerns on every request.

## Breakpoint resolution

The system does some breakpoint-aware work on the server.

That is important because many authored values are responsive arrays or breakpoint-bound objects.

For `/work`, the breakpoint is selected earlier through route rewriting to `/mobile` or `/desktop`.
For other route surfaces, the breakpoint can still be derived from the request user agent.

This is one of the places where route architecture and page-builder architecture touch directly.

## Failure modes

### Missing section key

If a key in `sectionOrder` never resolves to a valid section block, it simply will not render.
That is usually a content or merge issue.

### Preset collision

If preset and local keys collide carelessly, later resolution can override more than intended.

### Invalid nested definitions

A nested section file can quietly poison the merged definitions map if keys are reused badly.

### Asset resolution mismatch

If a ref is not a valid asset key, or the CDN assumptions do not match the ref format, the tree may resolve partially and fail later in rendering.

Understanding load, expand, resolve, and render as four separate jobs is important when making changes in this repo.
