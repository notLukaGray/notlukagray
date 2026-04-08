# @pb/core

Core pipeline package for loading, validating, expanding, resolving, and migrating page-builder content.

## Responsibilities

- Validate content against canonical contracts.
- Load content from file paths.
- Expand content definitions into resolved structures.
- Resolve asset URLs for runtime consumption.
- Migrate content between contract versions.
- Provide app-facing helpers for page/modal retrieval and props shaping.

## Public Exports

From `package.json`:

- `@pb/core`
- `@pb/core/host-config`
- `@pb/core/defaults`
- `@pb/core/expand`
- `@pb/core/internal/*` (available but lower-stability)

Key top-level APIs (from `src/index.ts`):

- `validatePage`, `loadPage`, `expandPage`, `resolveAssets`, `migratePage`
- `setCoreConfig`, `getCoreConfig`
- `getPage`, `getPageAsync`, `getPageBuilderProps`, `getPageBuilderPropsAsync`, `getModalProps`

## Commands

```bash
npm run type-check --workspace @pb/core
npm run test --workspace @pb/core
```

## Usage

```ts
import { loadPage, validatePage, expandPage, resolveAssets } from "@pb/core";

const loaded = loadPage("apps/web/src/content/pages/work/example/index.json");
if (!loaded.validate.valid) {
  throw new Error("Invalid page content");
}

const expanded = expandPage(loaded.validate.page!);
const resolved = resolveAssets(loaded.validate.page!);
```

```ts
import { migratePage } from "@pb/core";

const migrated = migratePage(page, "0.5.0-v0", "1.0.0");
```

## Boundaries

- No React component rendering responsibilities.
- Top-level exports are preferred integration points.
- `@pb/core/internal/*` is exposed for advanced internal consumers; avoid unless required.
