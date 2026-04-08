# Library Package Extraction Plan

## File Status (April 8, 2026)

Status: `COMPLETE` (migration implementation complete and playbook gate recorded as `CONDITIONAL` with owners/due dates)

## Prerequisites

This plan assumes Phase 0.5 execution (see `11-phase-0.5-execution-plan.md`) is complete.
Specifically, all four gates must have passed before any work here begins:

- Gate A: Boundary lint rules in CI, bundle budget baseline committed
- Gate B: `src/page-builder/core/` has no `@/app` imports, no React component exports
- Gate C: Dev modules absent from public route client manifests
- Gate D: `src/pb-contracts/` and `src/pb-core/` scaffolds exist, `pb-cli` v0 runs

If any gate is incomplete, stop and complete Phase 0.5 execution first (`docs/11-phase-0.5-execution-plan.md`).

---

## Execution Snapshot (April 8, 2026)

This document includes implementation progress from three extraction passes completed on April 8, 2026.

Completed:

- npm workspaces configured at repo root (`packages/*`, `tools/*`)
- `@pb/contracts` created in `packages/contracts/` with `CONTRACT_VERSION = "1.0.0"`
- `@pb/core` created in `packages/core/` with `load/expand/resolve/validate/migrate` exports
- `@pb/core/defaults` public subpath added for app theme/default surfaces
- `@pb/core/expand` public subpath added for client-safe expansion (`expandPageBuilder`)
- `apps/web` workspace created and wired (`@notlukagray/web`)
- App source/public moved under `apps/web/src` and `apps/web/public` (no root compatibility symlinks remain)
- `page-builder` runtime source moved under `packages/runtime-react/src/page-builder`
- `@pb/sdk` created in `packages/sdk/` with `createPbClient`
- `@pb/extensions` created in `packages/extensions/` with plugin interfaces + importer testkit
- `@pb/runtime-react` package scaffolded with explicit `/server` and `/client` entrypoints
- Runtime client consumption narrowed to focused subpaths (`@pb/runtime-react/{effects,modal,renderers,motion,scroll}`)
- Runtime dev subpath surfaces added (`@pb/runtime-react/{dev-client,dev-server,dev-core}`) for non-public-internals migration
- `tools/pb-cli` extracted from `scripts/pb-cli.ts` and wired to `@pb/sdk`
- `@pb/core` `expandPage`/`resolveAssets` now proxy real pipeline modules (expand/defaults/entrance/asset resolution)
- JSON Schemas generated to `packages/contracts/dist/schemas/`
- Fixture conformance run passed (`6/6`) via `npm run pb-cli -- conformance` (includes pipeline assertions)
- `src/app/playground/page.tsx` moved off `@pb/core/internal/*` import to public `@pb/core/expand`
- App/theme shims moved off `@pb/core/internal/*` to `@pb/core/defaults`
- `check:route-budgets` updated to resolve build output from either `apps/web/.next` or root `.next` (latest build wins, optional `ROUTE_BUDGET_NEXT_DIR` override)
- ESLint workspace support patched so `apps/web/.next/**` is ignored and split-path rule globs apply to both `src/**` and `apps/web/src/**`
- `apps/web/src/**` now has zero direct `@/page-builder/**` imports (route + dev + devtools paths migrated)
- Framer Motion imports are isolated to `packages/runtime-react/src/page-builder/integrations/framer-motion/**`
- Unused shim folders removed from app workspace (`apps/web/src/pb-core`, `apps/web/src/pb-contracts`)
- Runtime duplicated core tree removed from `packages/runtime-react/src/page-builder/core/`; runtime now consumes `@pb/core`/`@pb/core/internal` for shared pipeline internals
- Legacy core tests migrated out of runtime package into `packages/core/src/internal/**` (`315` core tests passing in `@pb/core`)
- App-level host defaults now route through public `CoreConfig` (`setCoreConfig`) instead of direct host-config adapter wiring
- Formatting drift corrected; `npm run check` is green

Still not completed:

- None for Phase 1 extraction implementation. Conditional gate follow-ups are tracked in `docs/14-library-validation-playbook.md`.

Verified commands on April 8, 2026:

- `npm run pb-cli -- conformance` -> pass (`6/6`)
- `npm run contracts:generate-schemas` -> pass
- `npm run lint:boundaries` -> pass
- `npm run check:route-budgets` -> pass
- `npm run type-check --workspace @pb/{contracts,core,runtime-react,sdk,extensions}` -> pass
- `npm run type-check` -> pass
- `npm run build` -> pass
- `npm run web:build` -> pass
- `npm run test` -> pass
- `npm run lint` -> pass
- `npm run check` -> pass

---

## What This Plan Covers

Phase 0.5 produced in-repo scaffolds: `src/pb-contracts/`, `src/pb-core/`, a v0 CLI,
and clean internal boundaries. This plan extracts those scaffolds into publishable,
versioned npm packages and wires the app to consume them as external dependencies.

The target package set:

```
@pb/contracts     — Zod schemas, JSON Schema outputs, contract version metadata
@pb/core          — load/expand/resolve/validate pipeline, server-safe
@pb/runtime-react — React renderer, section/element runtime, server + client entrypoints
@pb/sdk           — typed client APIs for integrators
@pb/extensions    — plugin interfaces for importers, exporters, CMS adapters
```

The app (`apps/web`) becomes a consumer, not the host, of these packages.

---

## Monorepo Structure

Target structure (end state):

```
/
  apps/
    web/               (current Next.js app, now a consumer)
  packages/
    contracts/         (extracted from src/pb-contracts/)
    core/              (extracted from src/pb-core/ + src/page-builder/core/)
    runtime-react/     (extracted from src/page-builder/ renderer layer)
    sdk/               (new)
    extensions/        (new)
  tools/
    figma-plugin/      (already exists, now consumes @pb/contracts directly)
    pb-cli/            (extracted from scripts/pb-cli.ts)
  docs/
```

Current implemented structure (April 8, 2026):

```
/
  apps/
    web/
  packages/
    contracts/
    core/
    runtime-react/
    sdk/
    extensions/
  tools/
    figma-plugin/
    pb-cli/
```

Workspace setup is active via npm workspaces in the root `package.json`.

---

## Package Specifications

### `@pb/contracts` `[scaffolded]`

Source: `src/pb-contracts/` (Gate D scaffold)

Responsibilities:

- Zod schemas for page, section, element, module, modal, globals
- Generated JSON Schema outputs (committed artifact, regenerated on schema change)
- Capability contract shapes: importer, exporter, CMS adapter (see `12-integration-surfaces.md`)
- `CONTRACT_VERSION` constant and version metadata
- No React, no Next.js, no server-only APIs — importable anywhere

Public exports:

- `pageBuilderSchema`, `sectionSchema`, `elementSchema`, and variants
- `importerCapabilitySchema`, `exporterCapabilitySchema`, `cmsAdapterCapabilitySchema`
- `CONTRACT_VERSION`, `SUPPORTED_CONTRACT_VERSIONS`
- TypeScript types derived from schemas (via `z.infer`)

Breaking change policy:

- Major version: any schema field removal, rename, or type narrowing
- Minor version: new optional fields, new schema variants
- Patch: documentation, error message improvements
- Deprecation window: 180 days minimum before major bump

Exit criteria:

- [x] `packages/contracts/` builds independently (`tsc --noEmit` passes with no app imports)
- [x] `apps/web` consumes `@pb/contracts` via workspace dependency, not local path
- [x] `tools/figma-plugin` consumes `@pb/contracts` via workspace dependency
- [x] JSON Schema outputs generated and committed to `packages/contracts/dist/schemas/`
- [x] All current fixtures (`6/6`) validate against exported schemas (including pipeline conformance assertions)
- [x] `CONTRACT_VERSION` is `"1.0.0"`

Current limitation (must be removed before Phase 1D closeout):

- `packages/contracts/src/page-builder/core/**` currently mirrors schema source from `src/page-builder/core/**`; source of truth has not yet moved to the package. This is a scaffolded extraction seam, not final ownership.

---

### `@pb/core` `[extracted]`

Source: `src/pb-core/` (Gate D scaffold) + `src/page-builder/core/` (post-Gate B)

Responsibilities:

- `loadPage(path)` — reads and parses canonical JSON
- `expandPage(page)` — resolves presets, modules, defaults
- `resolveAssets(page, options)` — server-side asset URL injection
- `validatePage(page)` — schema validation with structured diagnostics
- `migratePage(page, fromVersion, toVersion)` — version migration (see below)
- No React, no Next.js `next/` imports, no `"use client"`

Migration support is the key new deliverable in this package that Gate D only stubbed.
At minimum, one migration path must be implemented and tested before 1.0:

- v0 → v1 canonical form (covers any breaking changes from pre-platform content)

Public exports:

- `loadPage`, `expandPage`, `resolveAssets`, `validatePage`, `migratePage`
- `PageBuilderDiagnostic` type — structured error/warning format
- `CoreConfig` — host configuration interface (replaces `pbContentGuidelines` static import)

Exit criteria:

- [x] `packages/core/` builds independently with zero `@/app` imports
- [x] All existing `src/page-builder/core/` tests pass against the extracted package
- [x] `migratePage` has at least one implemented path (`0.5.0-v0` → `1.0.0`) and CLI validation run
- [x] `apps/web` uses `@pb/core` package imports for pipeline entrypoints (`load/expand/resolve/validate/migrate` surfaces)
- [x] `CoreConfig` is the only mechanism by which app-level defaults reach the pipeline

Current limitation (must be removed before Phase 1D closeout):

- Relative `packages/core -> src/page-builder/core/**` back-links were removed in the April 8, 2026 extraction pass. Remaining app-side migrations are tracked in Phase 1D gates.

---

### `@pb/runtime-react` `[scaffolded]`

Source: `src/page-builder/` renderer layer (sections, elements, integrations)

Responsibilities:

- `PageBuilderPage` React component (server component entry)
- `SectionRenderer`, `ElementRenderer` (client)
- Framer Motion integration (stays inside this package — FM boundary rule holds)
- Three.js/R3F element wrappers
- Explicit server entrypoint (`@pb/runtime-react/server`) and client entrypoint (`@pb/runtime-react/client`)
- No pipeline logic — delegates all data work to `@pb/core`

Server entrypoint (`/server`):

- `PageBuilderPage` — async RSC, calls `@pb/core` pipeline, passes resolved props to client
- No `"use client"` in this entrypoint

Client entrypoint (`/client`):

- `SectionRenderer`, `ElementRenderer`, motion wrappers, trigger handlers
- All `"use client"` components live here

Exit criteria:

- [x] `packages/runtime-react/` builds independently
- [x] No FM imports outside `packages/runtime-react/src/page-builder/integrations/framer-motion/`
- [x] Server entrypoint has no `"use client"` directives
- [x] `apps/web` renders pages via `@pb/runtime-react/server` only, no direct renderer imports
- [x] Route payload budget (Gate A baseline) holds or improves after switch

Current limitation (must be removed before Phase 1D closeout):

- `@pb/runtime-react` still exposes a broad `dev-core`/internal surface; API narrowing is still recommended before publish.

---

### `@pb/sdk` `[extracted]`

Source: New package, no Gate D scaffold

Responsibilities:

- Typed programmatic API for integrators who don't want to use the CLI
- Wraps `@pb/core` with ergonomic, documented surfaces
- Handles config, auth context, and diagnostics formatting for external consumers
- Works in Node.js and edge runtimes (no `fs` direct usage — delegate to adapters)

Minimum viable surface:

```ts
import { createPbClient } from "@pb/sdk";

const pb = createPbClient({ contractVersion: "1.0.0" });
await pb.validate(pageJson); // returns diagnostics
await pb.diff(pageJsonA, pageJsonB); // returns structural diff
await pb.migrate(pageJson, "1.0.0"); // returns migrated page
```

Exit criteria:

- [x] `packages/sdk/` builds independently
- [x] `validate`, `diff`, `migrate` are implemented and exercised via extracted `pb-cli`
- [x] Diagnostics output is machine-readable (structured JSON with codes)
- [x] Works without Next.js or any framework runtime present

---

### `@pb/extensions` `[scaffolded]`

Source: New package, based on capability contract types from `@pb/contracts`

Responsibilities:

- Plugin interfaces: `ImporterPlugin`, `ExporterPlugin`, `CmsAdapterPlugin`
- Adapter testkit: fixture runner that scores plugin implementations
- Reference adapter: at minimum one working exporter (the Figma path is a candidate)

This is the last package to extract. Do not start until `@pb/contracts` and `@pb/core`
are stable at 1.0.

Exit criteria:

- [x] Plugin interface types match the capability contract shapes in `@pb/contracts`
- [x] Testkit surface exists and returns a machine-readable scorecard shape
- [x] At least one reference adapter passes the testkit at 100%
- [x] Third-party-style adapter (no app internals) can pass testkit

---

## Extraction Sequence

```
Phase 1A (parallel):
  Extract @pb/contracts
  Extract @pb/core

Phase 1B (after 1A):
  Extract @pb/runtime-react
  Build @pb/sdk

Phase 1C (after 1B):
  Extract @pb/extensions
  Update tools/figma-plugin to consume @pb/contracts directly
  Update tools/pb-cli to consume @pb/sdk

Phase 1D (after 1C):
  apps/web uses only public package APIs — no src/page-builder/ direct imports
  Conformance suite runs against all packages end-to-end
```

---

## Performance Guardrails (inherited from Phase 0.5)

These constraints carry forward and must not regress:

1. `"use client"` at leaf level only — no component trees that force client unnecessarily
2. No `@pb/all` mega-package or catch-all barrel
3. Package `exports` field must be explicit — no deep path imports from outside the package
4. `@pb/core` and `@pb/contracts` must be importable in Node.js without a Next.js context
5. Route payload budget (established in Gate A) is a hard CI ceiling

---

## Governance

1. No breaking change to `@pb/contracts` without major version + migration path in `@pb/core`
2. Contract changelog committed alongside every schema change
3. Every package has its own `CHANGELOG.md` — updated before merge
4. Conformance suite must pass before any package publishes
5. `apps/web` is the integration test — if it breaks, the package change is blocked

---

## Status

| Phase | Package              | Status                                                                           |
| ----- | -------------------- | -------------------------------------------------------------------------------- |
| 1A    | `@pb/contracts`      | Extracted to `packages/contracts/`                                               |
| 1A    | `@pb/core`           | Extracted to `packages/core/`                                                    |
| 1B    | `@pb/runtime-react`  | Extracted; legacy duplicated core tree removed and runtime rewired to `@pb/core` |
| 1B    | `@pb/sdk`            | Extracted to `packages/sdk/`                                                     |
| 1C    | `@pb/extensions`     | Extracted with reference adapters + testkit pass                                 |
| 1C    | `pb-cli`             | Extracted to `tools/pb-cli/`                                                     |
| 1D    | `apps/web` migration | Workspace split + import migration complete                                      |

Overall progress estimate (April 8, 2026): 100% extraction complete (`CONDITIONAL` gate pending evidence follow-ups).

---

## Closeout Plan (Finish Phase 1)

This is the remaining implementation sequence to finish the extraction.
Execute in order; do not skip gates.

### 1) Finalize `@pb/contracts` consumers

1. Move active app/tool schema imports to `@pb/contracts` package exports.
2. Remove compatibility re-export usage in runtime paths (`src/pb-contracts/*`) after migration.
3. Update `tools/figma-plugin` to depend on and import `@pb/contracts` directly.

Gate:

- [x] `rg "@/pb-contracts|src/pb-contracts" src tools` returns only temporary shims (or zero after cleanup)
- [x] `tools/figma-plugin` compiles/tests with `@pb/contracts` as the source of truth

### 2) Complete true `@pb/core` extraction

1. Move remaining pipeline implementation from `src/page-builder/core/**` into `packages/core/src/**`.
2. Remove relative back-links from `packages/core` to `src/**`.
3. Port/point pipeline tests to run against `@pb/core` exports.
4. Route all host defaults through `CoreConfig` only.

Gate:

- [x] `rg "\.\./\.\./\.\./src/page-builder/core" packages/core/src` returns zero
- [x] Core tests pass against package API
- [x] `apps/web` uses `@pb/core` imports for load/expand/resolve/validate/migrate
- [x] `rg "@pb/core/internal" src tools` returns zero

### 3) Complete `@pb/runtime-react` extraction + app switch

1. Move renderer implementation (server + client split) into `packages/runtime-react/src/**`.
2. Replace scaffold throws with real implementations.
3. Constrain Framer Motion imports to `packages/runtime-react/src/integrations/framer-motion/**`.
4. Switch app routes to `@pb/runtime-react/server` and `@pb/runtime-react/client`.

Gate:

- [x] `packages/runtime-react/src/server.ts` and `client.ts` no longer throw
- [x] `rg "from \"framer-motion\"" packages/runtime-react/src` returns no page-builder runtime usages outside `packages/runtime-react/src/page-builder/integrations/framer-motion/**`
- [x] `apps/web` has no direct renderer import from `src/page-builder/**`

### 4) Complete `@pb/extensions` reference adapters

1. Implement one first-party reference adapter (recommended: Figma exporter path).
2. Add third-party-style fixture adapter in tests (no app internals).
3. Run testkit and require 100% for reference adapter.

Gate:

- [x] `runImporterFixtureSuite`/testkit scorecard shows reference adapter at `100`
- [x] Third-party-style adapter passes same harness

### 5) Close Phase 1D migration + verification

1. Remove app compatibility shims (`src/pb-core`, `src/pb-contracts`) once unused.
2. Run full verification set:
   - `npm run build`
   - `npm run check`
   - `npm run pb-cli -- conformance`
   - `npm run check:route-budgets`
3. Produce validation report per `docs/14-library-validation-playbook.md`.

Verification notes from April 8, 2026:

- `npm run build` passed
- `npm run web:build` passed
- `npm run test` passed
- `npm run pb-cli -- conformance` passed (`6/6`)
- `npm run check:route-budgets` passed
- `npm run lint:boundaries` passed
- `npm run lint` passed
- `npm run type-check` passed
- `npm run check` passed
- `rg '@/page-builder/|src/page-builder' apps/web/src` returns zero matches
- `rg 'from "framer-motion"' packages/runtime-react/src` only returns matches under `packages/runtime-react/src/page-builder/integrations/framer-motion/**`

### Exact Remaining Work (Verified April 8, 2026, post-migration pass)

No open implementation items remain for Phase 1 extraction.

Follow-up conditions are documentation/evidence closeout only and are tracked in `docs/14-library-validation-playbook.md` (CI link attachment).

Gate (Definition of Done):

- [x] `apps/web` consumes only public `@pb/*` package APIs for pipeline + runtime
- [x] No direct imports to `src/page-builder/**` from app route/runtime entrypoints
- [x] Conformance, boundaries, type-check, build, and route budgets all pass
- [x] Extraction validated by playbook and marked `VALID` or `CONDITIONAL` with assigned owners/dates
