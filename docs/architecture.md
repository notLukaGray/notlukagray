# Architecture

## System Boundaries

The system is organized into contracts, core pipeline, runtime renderer, integration surfaces, and consuming apps/tools.

- `@pb/contracts`: schema and contract source of truth
- `@pb/core`: content pipeline and server-safe operations
- `@pb/runtime-react`: React rendering runtime
- `@pb/sdk`: programmatic integration client
- `@pb/extensions`: plugin interfaces and testkit
- `@pb/pb-cli`: operational CLI

## Package Relationships

- `@pb/core` depends on `@pb/contracts`.
- `@pb/runtime-react` depends on `@pb/core` and `@pb/contracts`.
- `@pb/sdk` depends on `@pb/core` and `@pb/contracts`.
- `@pb/extensions` depends on `@pb/core` and `@pb/contracts`.
- `@pb/pb-cli` depends on `@pb/sdk` and `@pb/contracts`.
- `apps/web` consumes all runtime-facing package surfaces.

## Data Flow

1. Content JSON is loaded and validated.
2. Core expands content definitions and resolves assets/defaults.
3. Runtime React consumes resolved structures and renders page UI.
4. SDK/CLI and extension plugins operate against the same contract/core layers.

## Runtime Model

- Server-side responsibilities: load, validate, expand, resolve, migrate.
- Client-side responsibilities: interaction rendering, motion, modal orchestration.
- `@pb/runtime-react` explicitly separates server and client entrypoints.

## Stability Guidelines

- Prefer top-level package exports and documented subpaths.
- Treat `@pb/core/internal/*` and broad convenience subpaths as lower-stability internal surfaces.
- Keep app-specific defaults/config in app code; inject into core via supported configuration APIs.
