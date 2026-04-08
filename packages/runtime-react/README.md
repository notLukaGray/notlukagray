# @pb/runtime-react

React runtime package for rendering page-builder pages and related client behaviors.

## Responsibilities

- Render page-builder structures in React.
- Expose explicit server/client entrypoints.
- Provide focused client surfaces for renderers, effects, modal handling, motion, and scroll containers.

## Public Exports

From `package.json`:

- `@pb/runtime-react`
- `@pb/runtime-react/server`
- `@pb/runtime-react/client`
- focused subpaths: `renderers`, `effects`, `modal`, `motion`, `scroll`
- additional subpaths: `core/*`, `content/*`, `dev-client`, `dev-server`, `dev-core`

## Commands

```bash
npm run type-check --workspace @pb/runtime-react
```

## Usage

```tsx
// server component
import { PageBuilderPage } from "@pb/runtime-react/server";
```

```tsx
"use client";
import { SectionRenderer, ElementRenderer, ModalRenderer } from "@pb/runtime-react/client";
```

## Boundaries

- Use `server` entrypoints in server/RSC contexts and `client` entrypoints in client contexts.
- Prefer focused documented subpaths over broad `core/*` or `content/*` imports.
- `dev-*` entrypoints are intended for tooling/dev workflows, not production app APIs.
