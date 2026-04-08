# Script Lifecycle

This file documents root `scripts/` ownership and intent.

## Keep and Document

- `scripts/check-boundaries.ts`: static import-boundary enforcement helper used by `lint:boundaries`
- `scripts/check-route-budgets.ts`: route payload budget validator used by CI and local checks
- `scripts/route-budget-baseline.json`: baseline consumed by route budget checks
- `scripts/generate-json-schemas.ts`: app JSON schema generation
- `scripts/validate-pages.ts`: content validation
- `scripts/generate-protected-slugs.ts`: build-time protected slug map generation
- `scripts/list-page-builder-assets.ts`: asset inventory utility used by app/root command
- `scripts/patch-eslint-plugin-react-eslint10.mjs`: postinstall compatibility patch
- `scripts/prepare-commit.sh`: convenience wrapper used by `prepare:commit`

## Removed

- `scripts/pb-cli.ts`: removed. CLI entrypoint is `tools/pb-cli/src/index.ts` via `npm run pb-cli -- ...`.

## Ownership Rule

If a script exists only to call a package/tool entrypoint, prefer deleting the wrapper and documenting the canonical package/tool command.
