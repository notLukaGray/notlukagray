# Integration

## Primary Surfaces

### Contracts (`@pb/contracts`)

Use for:

- page-builder content schemas
- capability contract schemas
- contract version metadata

### Core (`@pb/core`)

Use for:

- `validatePage`
- `loadPage`
- `expandPage`
- `resolveAssets`
- `migratePage`
- page/modal helper access for app runtime

### Runtime (`@pb/runtime-react`)

Use for:

- server entrypoint: `@pb/runtime-react/server`
- client entrypoint: `@pb/runtime-react/client`
- focused client surfaces: `renderers`, `effects`, `modal`, `motion`, `scroll`

### SDK (`@pb/sdk`)

Use for:

- integration-friendly validate/diff/migrate/load workflows through `createPbClient`

### Extensions (`@pb/extensions`)

Use for:

- importer/exporter/CMS adapter plugin contracts
- fixture-based plugin verification with testkit

### CLI (`@pb/pb-cli`)

Use for:

- `validate`, `diff`, `migrate`, `conformance`

## App Consumer (`apps/web`)

`apps/web` is the reference consumer workspace. It imports from `@pb/*` package surfaces and uses runtime entrypoints in route/app composition.

## Figma Tooling

- `tools/figma-plugin` exports Figma content into page-builder-oriented JSON structures.
- `tools/figma-bridge` provides shared heuristics and type vocabulary for plugin/widget workflows.
- `tools/figma-widget` is an in-progress scaffold for in-canvas assistance.

## Recommended Integration Pattern

1. Validate content with contracts/core.
2. Resolve content on server via core.
3. Render with runtime server/client surfaces.
4. Automate verification with CLI and CI checks.
