# Figma Widget

In-canvas companion scaffold for Figma workflows.

## Current State

- Scaffold only.
- No production widget runtime behavior is implemented yet.
- Intended to consume shared rules/types from `figma-bridge`.

## Commands

```bash
npm run build --workspace figma-widget-scaffold
npm run watch --workspace figma-widget-scaffold
npm run typecheck --workspace figma-widget-scaffold
```

## Layout

- `src/widget.ts`: placeholder widget entry
- `src/index.ts`: export barrel
- `src/rules.ts`: shared rule types for widget-facing workflows
- `docs/ROADMAP.md`: implementation milestones
