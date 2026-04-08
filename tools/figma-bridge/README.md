# Figma Bridge

Shared type and rule layer for Figma tooling workspaces.

## Scope

- Shared issue categories and suggestion model.
- Shared heuristics and helper utilities that do not depend on Figma runtime APIs.
- Common vocabulary consumed by `figma-plugin` and `figma-widget`.

## Commands

```bash
npm run build --workspace @notlukagray/figma-bridge
npm run check --workspace @notlukagray/figma-bridge
npm run test --workspace @notlukagray/figma-bridge
```

## Notes

- Keep this package runtime-agnostic.
- Conversion and UI orchestration remain in their owning tool workspaces.
