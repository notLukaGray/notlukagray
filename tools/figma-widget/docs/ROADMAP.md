# Roadmap

## Milestone 1: Shared Vocabulary

- Create a compact rule model for issue categories, suggestion kinds, and rule signatures.
- Keep it framework-agnostic so both plugin and widget can import it.

Exit criteria:

- The plugin and widget can refer to the same issue categories without duplicating enums.

## Milestone 2: Inspector MVP

- Render a selected-node inspector.
- Show target resolution, structural warnings, and annotation hints.
- Offer a small suggestion list with safe, reversible actions.

Exit criteria:

- A designer can understand the export shape from the widget alone.

## Milestone 3: On-Canvas Helper

- Show minimal hints near the selected node or frame.
- Offer quick actions for preset/section nudges and annotation cleanup.

Exit criteria:

- Common structural mistakes can be resolved in place.

## Milestone 4: Bridge-First Integration

- Move reusable heuristics into `tools/figma-bridge`.
- Have plugin and widget consume shared rules and suggestion metadata.
- Keep all presentation code local to each surface.

Exit criteria:

- There is one source of truth for heuristics and suggestions.

## Non-Goals

- Replacing the exporter.
- Adding destructive auto-fixes.
- Mirroring every exporter warning in the widget on day one.
