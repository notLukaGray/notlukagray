# Extending the system

## First question

Before adding anything, identify whether it is primarily a content concern, a schema concern, a runtime concern, or an infrastructure concern.

## When to add content only

Add content only when the runtime already supports the needed behavior.

Examples:

- new work page
- new research or teaching page
- new section arrangement using existing types
- new background usage
- new modal content using existing blocks
- new module instance using existing module contract

If you can solve it in authored JSON cleanly, you should.

## When to add a preset

Add a preset when repetition becomes structural.

Use a preset for:

- repeated control styles
- repeated section patterns
- repeated vector or button configurations
- repeated authored motion defaults

Avoid adding a preset for one-off similarity.

## When to add a module

Add a module when you need a reusable interactive container or slot system.

Good module cases:

- video control overlays
- grouped authored interactions
- slotted UI systems that should be reused across multiple elements or pages

## When to add a new element

Add a new element when the authored system is missing a real atomic or near-atomic surface.

Good reasons:

- new media type
- new control surface
- new authored visual primitive
- new runtime behavior that belongs at element scope

Bad reasons:

- one page wants a weird one-off card
- a design detail could already be expressed with existing elements and section layout

## When to add a new section type

Add a new section type when the missing behavior is section-scale, not element-scale.

Good reasons:

- new container behavior
- new viewport or scroll semantics
- new layout orchestration mode
- new section-level runtime state

Bad reasons:

- trying to avoid learning `sectionColumn`
- hiding element complexity inside a new section because it feels faster

## When to add a new route

Add a new route surface only when the content partition or product surface is genuinely different.

Good reasons:

- a new top-level site area with different indexing, metadata, or access rules
- a new API surface
- a new app shell requirement

Bad reasons:

- one page needs special handling that the page-builder should solve
- a content pattern feels inconvenient in the current route

## When to add infrastructure code

Add or change infrastructure code when the outside world changes:

- new CDN
- new auth requirement
- new delivery requirement
- new email or webhook provider
- new deployment environment

Infrastructure changes should not leak into authored content if you can avoid it.

## Correct order for feature work

### If the feature is content-only

1. confirm existing block types support it
2. author content
3. validate
4. test render behavior

### If the feature needs schema and runtime support

1. define or update schema
2. define the authored contract in plain language
3. implement runtime behavior
4. register it in the correct registry
5. ensure asset, breakpoint, motion, or trigger layers know about it if needed
6. add tests
7. update docs
8. then author content using it

## Common expansion paths

### Add a new page

- create `src/content/pages/<slug>.json`
- add nested section files if needed
- keep `sectionOrder` explicit
- choose the correct `assetBaseUrl`
- validate the page
- let the existing route surface pick it up

### Add a new modal

- create `src/content/modals/<id>.json`
- add nested modal section files
- rely on `loadModal()` and `getModalProps()`

### Add a new form handler

- add the route under `src/app/api/forms/`
- add the allowlisted key in `src/core/lib/forms/registry.ts`
- keep the response contract consistent
- add rate limiting and validation
- document required env variables

### Add a new background type

- extend schema
- implement background component under `src/page-builder/background/`
- register it
- make sure transition logic and definition resolution tolerate it

### Add a new 3D capability

- update 3D schemas
- update authored contract
- update runtime scene or control handling
- confirm asset resolution still works
- document whether it affects trigger actions or ready sequencing

## Standards for extension

1. Keep route files thin.
2. Keep authored contracts explicit.
3. Avoid hidden behavior in random components.
4. Do not add new env variables casually. Group them logically.
5. Avoid unnecessary overlap between modules and presets.
6. Keep feature behavior in runtime code when it does not belong in authored content.
7. Avoid adding runtime branching when authored structure can express the change.
