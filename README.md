# Not Luka Gray: Page Builder System

This repository is a monorepo for a JSON-driven page builder platform.

The portfolio app in `apps/web` is a demo consumer of this system.

## Monorepo Layout

- `packages/contracts` (`@pb/contracts`): canonical schema and contract package
- `packages/core` (`@pb/core`): content pipeline and server-safe runtime helpers
- `packages/runtime-react` (`@pb/runtime-react`): React rendering runtime with server/client entrypoints
- `packages/sdk` (`@pb/sdk`): programmatic client for validate/diff/migrate/load workflows
- `packages/extensions` (`@pb/extensions`): plugin interfaces, testkit, and reference adapters
- `tools/pb-cli` (`@pb/pb-cli`): CLI for validate/diff/migrate/conformance workflows
- `tools/figma-plugin`: Figma export plugin
- `tools/figma-bridge`: shared Figma rule/heuristic layer
- `tools/figma-widget`: in-canvas companion scaffold
- `apps/web` (`@notlukagray/web`): Next.js app consuming the packages

## Quick Start

```bash
npm install
npm run dev
```

Primary root commands:

- `npm run check`: type-check, lint, format check, content validation
- `npm run build`: build app workspace
- `npm run test`: run vitest suite
- `npm run pb-cli -- <command>`: run page-builder CLI
- `npm run check:route-budgets`: run route payload budget guardrail

## System Flow

1. Contracts define canonical content and capability shapes.
2. Core loads, validates, expands, resolves, and migrates content.
3. Runtime React renders resolved page-builder structures.
4. SDK and CLI expose integration and operational interfaces.
5. Extensions package defines import/export/CMS plugin contracts.

## Workspace Conventions

- All packages are `"private": true` and exported as TypeScript source (no `dist/` output, no published artifact).
- Packages are consumed exclusively via Next.js / TypeScript project references within this monorepo.
- To publish a package externally, a `tsup` (or equivalent) build step would need to be added.
- Cross-package imports use workspace `@pb/*` npm scopes resolved by TypeScript path mapping.

## Documentation

- System docs hub: [`docs/README.md`](docs/README.md)
- Architecture: [`docs/architecture.md`](docs/architecture.md)
- Integration surfaces: [`docs/integration.md`](docs/integration.md)
- Quality checks and CI: [`docs/operations-quality-checks.md`](docs/operations-quality-checks.md)
- Script lifecycle: [`docs/scripts-lifecycle.md`](docs/scripts-lifecycle.md)

Workspace docs:

- [`packages/contracts/README.md`](packages/contracts/README.md)
- [`packages/core/README.md`](packages/core/README.md)
- [`packages/runtime-react/README.md`](packages/runtime-react/README.md)
- [`packages/sdk/README.md`](packages/sdk/README.md)
- [`packages/extensions/README.md`](packages/extensions/README.md)
- [`tools/pb-cli/README.md`](tools/pb-cli/README.md)
- [`tools/figma-plugin/README.md`](tools/figma-plugin/README.md)
- [`tools/figma-bridge/README.md`](tools/figma-bridge/README.md)
- [`tools/figma-widget/README.md`](tools/figma-widget/README.md)
- [`apps/web/README.md`](apps/web/README.md)
