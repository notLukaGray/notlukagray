# Figma Bridge

Shared rule types and tiny helpers for the exporter plugin and the future widget.

## What belongs here

- Issue categories used by both surfaces.
- Suggestion actions that can be rendered as UI affordances.
- Heuristic signatures that describe repeated layout patterns without depending on Figma APIs.
- Small pure helpers for summarizing and constructing rule data.

## How the plugin uses it

The exporter plugin should import these types/helpers when it:

- creates preflight issues
- classifies repeated structures
- proposes non-fatal suggestions in the preview UI

The plugin stays responsible for Figma reads and export generation. This package only defines the shared rule language.

## How the widget uses it

The widget should import the same types/helpers when it:

- analyzes selected nodes
- shows issue badges and guidance
- offers quick-fix actions in canvas

The widget stays responsible for UI and Figma widget interaction. This package keeps its suggestions and categories aligned with the plugin.

## Build

```bash
npm run build --prefix tools/figma-bridge
npm run check --prefix tools/figma-bridge
```
