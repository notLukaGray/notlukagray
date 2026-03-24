# Figma Widget Scaffold

This package is the future in-canvas companion to the exporter. The plugin remains the
conversion engine, while the widget becomes the designer-facing assistant.

## Tracks

1. Inspector MVP
2. On-canvas helper
3. Bridge-first integration

## Phased Plan

### Phase 1: Inspector MVP

- Inspect the selected node or widget context.
- Show current export target, issue categories, and suggestion actions.
- Surface warnings without blocking the designer.

Exit criteria:

- A designer can select a node and understand what the exporter would do with it.
- Structure, naming, and annotation issues are visible before export.

### Phase 2: On-Canvas Helper

- Add lightweight in-canvas hints and quick actions.
- Offer one-click fixes for common cases like section/preset suggestions.
- Keep the surface small so it helps without interrupting layout work.

Exit criteria:

- Designers can apply common export hints directly from the canvas.
- The widget does not require a full export cycle to clarify a problem.

### Phase 3: Bridge-First Integration

- Move shared heuristics, issue categories, and suggestion types into `figma-bridge`.
- Let plugin and widget consume the same rule engine.
- Keep presentation logic separate from conversion logic.

Exit criteria:

- The plugin and widget agree on issue categories and suggestion actions.
- A single shared rules module defines the vocabulary for both surfaces.

## Current State

This package is only a scaffold:

- no widget runtime is implemented yet
- no Figma API calls are wired
- the build script only typechecks the source files

## Layout

- `src/widget.ts` - placeholder widget entry and authoring notes
- `src/index.ts` - simple barrel for future widget exports
- `src/rules.ts` - shared rule and suggestion types for bridge-first work
- `docs/ROADMAP.md` - milestones and exit criteria
