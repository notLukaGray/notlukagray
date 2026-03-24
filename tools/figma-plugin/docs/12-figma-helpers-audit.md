# Figma Helpers Audit

This exporter prefers official `@figma-plugin/helpers` utilities where they provide clear correctness or maintenance value.

## Currently Adopted

- `topLevelFrames`:
  - `src/main-run-export.ts`
  - Used for no-selection fallback exports.
- `isFrameNode`:
  - `src/main-run-export.ts`
  - Used for safer frame filtering.
- `extractLinearGradientParamsFromTransform`:
  - `src/converters/fills-gradient.ts`
  - Linear gradient conversion.
- `extractRadialOrDiamondGradientParams`:
  - `src/converters/fills-gradient.ts`
  - Radial/diamond/conic parameter extraction.
- `extractImageCropParams`:
  - `src/converters/image.ts`
  - Crop transform/object-position approximation.
- `parseTextStyle`:
  - `src/converters/node-element-group.ts`
  - Mixed text run export (markdown + markup approximation).
- `getBoundingRect`:
  - `src/converters/layout-auto-props.ts`
  - Rotated visual bounds for absolute positioning.
- `isVisibleNode`:
  - `src/converters/structure-hints.ts`
  - Visibility filtering with parent-chain awareness.
- `isFrameNode`, `isGroupNode`, `isComponentNode`, `isInstanceNode`:
  - `src/converters/structure-hints.ts`
  - Container/type detection.
- `hasChildren`, `isTextNode`:
  - `src/converters/node-element-helpers.ts`
  - `src/converters/button.ts`
  - Node traversal/id inference/text extraction guards.

## Intentionally Not Adopted (for now)

- `figmaRGBToHex` / color converters:
  - Existing local color formatter is stable and already integrated.
- `getRelativePosition` / `getTopLevelParent`:
  - Helper implementation uses absolute-value offsets and top-level parent defaults, which can be less precise for our nested/constraint-aware positioning flow.
- `getTextNodeCSS`:
  - Too coarse for runtime schema fidelity; we need explicit field mapping and variable-aware handling.
- `findAll`, `nodeToObject`, `clone`, font-loading helpers:
  - Not on exporter critical path today.

## Revisit Triggers

- If future exporters need more codegen parity with inspect, re-evaluate `getTextNodeCSS`.
- If we add deep scene graph transforms beyond current absolute/constraint paths, re-check `getRelativePosition`.
