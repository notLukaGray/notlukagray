# Operations and Quality Checks

## CI Pipeline

CI runs:

1. `npm ci`
2. `npm run check`
3. `npm run lint:boundaries`
4. `npm run build`
5. `npm run check:route-budgets`

Source: `.github/workflows/ci.yml`.

## Core Local Commands

- `npm run check`: type-check, lint, format check, validate pages
- `npm run test`: test suite
- `npm run lint:boundaries`: import-boundary and static guardrail checks
- `npm run check:route-budgets`: route payload budget checks against baseline
- `npm run contracts:generate-schemas`: regenerate contract JSON schemas
- `npm run pb-cli -- conformance`: fixture conformance run

## Guardrails

- Boundary checks prevent prohibited package/app import edges.
- Route budget checks compare current payloads to `scripts/route-budget-baseline.json`.
- Content validation is part of `check` and should stay green before merge.

## Change Review Checklist

Before merge:

1. Run `npm run check`.
2. Run `npm run build`.
3. Run `npm run test` for behavior-sensitive changes.
4. Run `npm run check:route-budgets` when route/runtime changes affect client payload.
5. Run relevant package-level type checks for touched workspaces.
