# Figma Plugin

Figma exporter workspace for converting selected design frames into page-builder-oriented output.

## Scope

- Runs as a Figma plugin build.
- Produces export payloads and diagnostics for downstream page-builder consumption.
- Keeps conversion-specific logic in this workspace.

## Commands

```bash
npm run build --workspace page-builder-figma-plugin
npm run watch --workspace page-builder-figma-plugin
npm run test --workspace page-builder-figma-plugin
```

## Structure

- `src/`: plugin implementation
- `docs/`: plugin-specific behavior and conversion notes
- `manifest.json`: Figma plugin manifest

## Notes

- This workspace depends on `@pb/contracts` for contract alignment.
- Use plugin-local docs for conversion semantics and extension guidance.
