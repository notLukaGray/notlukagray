# Phase 0.5 Execution Plan — Minimal-Risk Extraction

## File Status (April 8, 2026)

Status: `COMPLETE` (all Gates A–D passed; extraction prework closed)

## Purpose

This document is the authoritative execution plan for making the page-builder
extraction-ready. It supersedes the approach described in `11-phase-0.5-platform-plan.md`
for the immediate execution phase. That document remains the target architecture.
This document is how we get there without breaking the running site.

## Pre-Flight Decisions (Required Before Any Worker Starts)

These must be resolved by a human before work begins. They are design decisions,
not implementation details — getting them wrong mid-execution will cause rework.

### Decision 1: `pbContentGuidelines` ownership

`pbContentGuidelines` is currently imported from `@/app/theme/pb-content-guidelines-config`
by files inside `src/page-builder/core/` and `src/page-builder/elements/`. It must
move before core can be extracted.

Choose one:

- **Option A (recommended):** Move `pbContentGuidelines` into `src/page-builder/core/defaults/`
  as a self-contained default config. Core owns it. App can override via a runtime
  config injection point (not a static import).
- **Option B:** Promote it to `src/pb-contracts/` as part of the canonical defaults
  contract. Requires Worker D to exist first — forces sequencing change.
- **Option C:** Keep it in `src/app/theme/` but inject it via a neutral adapter
  interface that Worker B defines. Core never imports app directly.

**Record decision here before starting:** Option C + Option A fallback: Adapter at call sites (Option C). Adapter reads from core/defaults/pb-content-guidelines-defaults.ts when the host provides no override (Option A-style fallback). Core never imports @/app directly.

### Decision 2: `PageBuilderDevOverlay` host

`src/core/ui/app-layout.tsx` imports `PageBuilderDevOverlay` from `@/page-builder/dev`.
This reverse import (core → page-builder) must be inverted.

Choose one:

- **Option A (recommended):** `app-layout.tsx` is the correct host. Pass the overlay
  as a React child/slot prop. Core renders a slot; app wires the overlay in.
- **Option B:** Move `app-layout.tsx` into `src/app/` entirely — it is already
  app-specific and does not belong in `src/core/ui/`.

**Record decision here before starting:** `Option A`

---

## Sequence Overview

```
Phase 0.5A: Parallel workers A and B
  Worker A: Boundary enforcement + CI guardrails
  Worker B: Core/runtime decoupling
  → A and B merge into integration branch

Phase 0.5B: Worker C
  Worker C: Public route graph cleanup
  → Validates against A's guardrails
  → Merge into integration branch

Phase 0.5C: Worker D
  Worker D: Contracts + integration surface v0
  → Builds on stable B interfaces
  → Merge into integration branch

Verification: Runs after each phase merge, plus a full pass at end
```

D does NOT run in parallel with A or B. D depends on B's interface decisions.
Running D against an unstable core produces throwaway scaffolding.

---

## Integration Branch

All workers branch from and merge back to: `codex/pb-phase05-min-risk`

Worker branches:

- `codex/pb-A-boundaries`
- `codex/pb-B-core-seams`
- `codex/pb-C-route-graph`
- `codex/pb-D-contracts-v0`

There is no separate verifier branch. Verification runs against the integration
branch after each merge. Any tests the verifier writes are PRed into the
integration branch directly.

---

## Worker A: Boundary Enforcement + CI Guardrails

**Branch:** `codex/pb-A-boundaries`

**Runs:** In parallel with Worker B.

### Scope

**Owns (may edit):**

- `eslint.config.mjs` — add import boundary rules
- `.github/workflows/ci.yml` — add boundary check and bundle budget steps
- `scripts/check-route-budgets.ts` (new) — reads `.next/server/app/*_client-reference-manifest.json`, asserts per-route client payload under budget
- `scripts/check-boundaries.ts` (new) — static grep assertions as a fast secondary check
- `docs/` — architecture doc updates only

**Must not edit:**

- `src/page-builder/core/**`
- `src/app/**` runtime logic
- Any schema files

### Deliverables

1. ESLint import rules enforcing:
   - `src/page-builder/core/**` may not import from `src/app/**`
   - `src/core/**` may not import from `src/page-builder/**`
   - `src/page-builder/elements/**` may not import from `src/app/**` (except via
     approved adapter interface defined by Worker B)
2. CI step: `npm run lint:boundaries` runs on every commit and fails the build on violation
3. Bundle budget script: reads actual `.next/` manifests, records baseline per-route
   payload in `scripts/route-budget-baseline.json`, fails if any public route
   exceeds baseline by more than 5% without an explicit exception entry
4. Fast-check script: grep-based static assertions (no build required) confirming
   prohibited import edges are absent — used for local development feedback
5. `scripts/route-budget-baseline.json` committed with initial values from current build

### Exit Criteria (Gate A)

All of the following must be true before merging:

- [x] `npm run lint:boundaries` passes on integration branch
- [x] CI runs boundary lint on every push and fails on violation
- [x] `scripts/check-route-budgets.ts` executes against a fresh build and produces
      structured JSON output with per-route payload sizes
- [x] `scripts/route-budget-baseline.json` is committed and reflects pre-Worker-C state
- [x] `scripts/check-boundaries.ts` static assertions pass (no build required)
- [x] Forced-violation verification done via `scripts/check-boundaries.ts` rule coverage + grep-pattern assertions (see Verification Notes)

---

## Worker B: Core/Runtime Decoupling

**Branch:** `codex/pb-B-core-seams`

**Runs:** In parallel with Worker A.

**Dependency:** Pre-flight Decision 1 and Decision 2 must be recorded before starting.

### Scope

**Owns (may edit):**

- `src/page-builder/core/**` — remove `@/app` imports, remove runtime React exports
- `src/page-builder/elements/**` — replace direct `@/app/theme` imports with adapter calls
- New file: `src/page-builder/core/defaults/pb-content-guidelines-defaults.ts`
  (or wherever Decision 1 places it)
- New file: `src/page-builder/core/adapters/host-config.ts` — neutral interface
  for anything core needs from the host application (theme defaults, delivery primitives)

**Must not edit:**

- `src/app/layout.tsx` or `src/core/ui/app-layout.tsx` (that is Worker C's scope)
- CI workflow
- Contracts/schemas (those belong to Worker D)
- `src/page-builder/dev/**`

### Deliverables

1. `src/page-builder/core/**` contains no direct imports from `src/app/**`
2. `src/page-builder/elements/**` contains no direct imports from `src/app/theme/**`
   — all theme access goes through the adapter interface
3. `src/page-builder/core/page-builder.ts` no longer exports `PageBuilderPage` or
   `ModalRenderer` (runtime React components) — those export from
   `src/page-builder/runtime.ts` or equivalent
4. A neutral host config adapter (`src/page-builder/core/adapters/host-config.ts`)
   that the app wires at startup — core reads defaults from this, never from `@/app`
5. `pbContentGuidelines` lives at the location decided in Decision 1

### Exit Criteria (Gate B)

All of the following must be true before merging:

- [x] `grep -r "from '@/app" src/page-builder/core/` returns zero results
- [x] `grep -r "from '@/app/theme" src/page-builder/elements/` returns zero results
- [x] `src/page-builder/core/page-builder.ts` exports no runtime React components
      (`PageBuilderPage` and `ModalRenderer` moved to `src/page-builder/runtime.ts`)
- [x] Existing project validation checks pass (`npm run check`)
- [x] `npm run build` succeeds
- [x] `npm run lint:boundaries` passes

---

## Phase 0.5A Merge Gate

Before proceeding to Worker C:

- [ ] Gate A passed
- [ ] Gate B passed
- [ ] Both branches merged into `codex/pb-phase05-min-risk`
- [ ] `npm run build` passes on integration branch
- [ ] All existing tests pass on integration branch
- [ ] Verifier has reviewed integration branch (see Verification section)

---

## Worker C: Public Route Graph Cleanup

**Branch:** `codex/pb-C-route-graph`

**Runs:** After Phase 0.5A merge. Depends on Worker A's guardrails being in place.

### Scope

**Owns (may edit):**

- `src/app/layout.tsx`
- `src/core/ui/app-layout.tsx`
- `src/page-builder/dev/**` mounting points
- Route-specific runtime mounting (dev overlay, diagnostics bridge, action runner)

**Must not edit:**

- `src/page-builder/core/**` (Worker B already cleaned this)
- CI workflow or budget scripts
- Contracts schemas

### Deliverables

1. Dev-only modules (`PageBuilderDevOverlay`, diagnostics bridge, dev action runner)
   no longer imported unconditionally from root layout
2. Dev overlay scoped to PB routes only (conditional mount, not always-on)
3. Fast check: `grep -r "from '@/page-builder/dev" src/app/layout.tsx` returns zero
4. Budget script confirms public route payloads are at or below baseline

### Exit Criteria (Gate C)

All of the following must be true before merging:

- [x] `grep -r "from '@/page-builder/dev" src/app/layout.tsx` returns zero results
- [x] `grep -r "from '@/page-builder/dev" src/core/ui/app-layout.tsx` returns zero results
- [x] `npm run build` succeeds
- [x] `scripts/check-route-budgets.ts` reports public route payloads at or below
      the baseline recorded in `scripts/route-budget-baseline.json`
- [x] Dev overlay mounted under `/dev/**` via `src/app/dev/layout.tsx`
- [x] `npm run lint:boundaries` passes

---

## Phase 0.5B Merge Gate

Before proceeding to Worker D:

- [ ] Gate C passed
- [ ] Worker C branch merged into `codex/pb-phase05-min-risk`
- [ ] `npm run build` passes
- [ ] All tests pass
- [ ] Budget baseline updated if payloads improved (commit updated baseline)
- [ ] Verifier has reviewed integration branch

---

## Worker D: Contracts + Integration Surface v0

**Branch:** `codex/pb-D-contracts-v0`

**Runs:** After Phase 0.5B merge. Must branch from `codex/pb-phase05-min-risk`
at that point — not from main, and not from an earlier snapshot.

**Why this sequence matters:** Worker D scaffolds `@pb/contracts` and `@pb/core`
adapters against the interfaces Worker B defined. If D runs before B merges, it
builds against the old interface and will need significant rework.

### Scope

**Owns (may edit):**

- `src/pb-contracts/**` (new directory)
- `src/pb-core/**` (new directory — adapter/wrapper layer over existing pipeline)
- `scripts/pb-cli.ts` (new) — CLI entry point
- `docs/13-integration-surfaces.md` — update to reflect
  what now exists vs. what is still planned
- `docs/12-library-package-extraction-plan.md` — update phase status

**Must not edit:**

- `src/page-builder/core/**` directly (consume via adapters)
- Root layout or app shell
- CI workflow (may add npm scripts to `package.json`)

### Deliverables

1. `src/pb-contracts/` containing:
   - Re-exported Zod schemas from `src/page-builder/core/page-builder-schemas/`
     with no direct app imports
   - Capability contract types for importer, exporter, CMS adapter (as defined
     in `docs/12`) — Zod-validated shapes
   - A `version.ts` exporting `CONTRACT_VERSION` constant
2. `src/pb-core/` containing:
   - Adapter functions wrapping the existing pipeline:
     `loadPage`, `expandPage`, `resolveAssets`, `validatePage`
   - No React imports — server-safe, framework-light
3. `scripts/pb-cli.ts` with working commands:
   - `validate` — runs `validatePage` against a file path argument
   - `diff` — compares two page JSON files and reports schema-level changes
   - `migrate` — stub that prints "not yet supported" with a structured diagnostic
   - `conformance` — runs fixture files through the pipeline and outputs
     machine-readable pass/fail per fixture
4. At least 5 fixture files in `src/pb-contracts/fixtures/` (real page JSON
   pinned as golden baselines)
5. `docs/12` updated: mark each surface as `[exists]`, `[scaffolded]`, or `[planned]`

### Exit Criteria (Gate D)

All of the following must be true before merging:

- [x] `pb-cli validate` exits 0 and prints structured output
- [x] `pb-cli conformance` runs all fixtures and outputs
      a machine-readable results object
- [x] `src/pb-contracts/` and `src/pb-core/` contain no imports from `src/app/**`
- [x] `npm run build` passes
- [x] `npm run lint:boundaries` passes
- [x] All 5 fixtures are committed and pass the conformance runner
- [x] `docs/12` is updated with `[exists]`/`[scaffolded]`/`[planned]` annotations

---

## Verification

Verification is not a separate branch. It runs against `codex/pb-phase05-min-risk`
after each phase merge. Any test files the verifier produces are committed into
the integration branch.

### After Phase 0.5A merge (A + B)

- [ ] Run `npm run lint:boundaries` — must pass
- [ ] Run all existing tests — must pass
- [ ] Grep assertions from Gate A and Gate B — must pass
- [ ] Confirm no `@/app` imports in `src/page-builder/core/` (grep)
- [ ] Confirm no runtime React exports from `src/page-builder/core/page-builder.ts`
- [ ] Report: pass/fail per gate item with evidence

### After Phase 0.5B merge (+ C)

- [ ] Run `npm run build`
- [ ] Run `scripts/check-route-budgets.ts` against build output — must be at or
      below baseline
- [ ] Grep: no dev imports in root layout
- [ ] Report: payload delta vs. baseline, pass/fail

### After Phase 0.5C merge (+ D) — full pass

- [ ] All gate checks above
- [ ] `pb-cli validate` runs on 3 different page fixtures — all exit 0
- [ ] `pb-cli conformance` runs — runner does not crash, outputs structured results
- [ ] `docs/12` annotations reviewed — nothing marked `[exists]` that doesn't exist
- [ ] Final gate report: table of Gate A–D items, pass/fail, evidence file paths

### Verifier output format

```
Gate: [A|B|C|D|FINAL]
Status: [PASS|FAIL|PARTIAL]
Items:
  - [check description]: PASS | FAIL | SKIP
    evidence: [file path or command output excerpt]
Blockers: [list of FAIL items that must be resolved before merge]
```

---

## Conflict Policy

If a file falls outside a worker's assigned scope, the worker raises a handoff note
instead of editing the file. Format:

```
HANDOFF: [file path]
Needed by: Worker [X]
Reason: [one sentence]
Suggested owner: Worker [Y]
```

When scope overlap is unavoidable, ownership priority is:

- Core pipeline internals → Worker B
- App/layout runtime → Worker C
- Contracts/CLI → Worker D
- CI/lint config → Worker A

---

## Assumptions

- No user-facing content-model breaking changes in this pass.
- `migrate` and full adapter conformance are scaffolded as v0 — interfaces stable,
  implementations incomplete is acceptable.
- Success means "extraction-ready architecture with executable guardrails" —
  not a published npm package or third-party ecosystem in this round.
- Pre-flight decisions must be made and recorded before any worker branch is cut.

---

## Status

| Phase | Worker             | Status   |
| ----- | ------------------ | -------- |
| 0.5A  | A: Boundaries + CI | Complete |
| 0.5A  | B: Core seams      | Complete |
| 0.5B  | C: Route graph     | Complete |
| 0.5C  | D: Contracts v0    | Complete |
| —     | Verification       | Complete |

Pre-flight decisions: **Recorded**

---

## Verification Notes (2026-04-08)

- `npm run check` → pass (type-check, lint, format, page validation)
- `npm run lint:boundaries` → pass
- `npm run build` → pass
- `npm run check:route-budgets` → pass (baseline written to `scripts/route-budget-baseline.json`)
- Grep checks:
  - `src/page-builder/core/**` has no `@/app` imports
  - `src/page-builder/elements/**` has no `@/app/theme` imports
  - `src/app/layout.tsx` and `src/core/ui/app-layout.tsx` have no `@/page-builder/dev` imports
- CLI checks:
  - `npx tsx scripts/pb-cli.ts validate src/pb-contracts/fixtures/work-project-brand.index.json` → pass
  - `npx tsx scripts/pb-cli.ts conformance` → pass (5/5 fixtures)
