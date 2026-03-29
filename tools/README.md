# Tools

This directory now contains the two Figma-facing workstreams:

- `figma-plugin` for export and conversion
- `figma-widget` for in-canvas authoring and inspection
- `figma-bridge` for shared naming/prefix parsing (`Page/`, `Section/`, …), inspection + contextual heuristics, and annotation templates (used by the widget; export target parsing is shared with the plugin main thread)

The intent is to keep the conversion rules centralized while letting the UI surfaces
grow independently. Run `npm test` inside `figma-bridge` or `figma-plugin` for package-local Vitest suites.
