# Library Validation Playbook

## File Status (April 8, 2026)

Status: `COMPLETE` (gate report produced on April 8, 2026 with `CONDITIONAL` verdict and assigned owners/due dates)

Use this playbook to validate the library package extraction described in
`12-library-package-extraction-plan.md`. It extends the multi-agent review pattern
established during Phase 0.5 validation, but targets the extracted packages rather
than the prework.

## Scope

This playbook applies after Phase 1 extraction is complete — meaning all five packages
(`@pb/contracts`, `@pb/core`, `@pb/runtime-react`, `@pb/sdk`, `@pb/extensions`) have
been extracted and `apps/web` has been migrated to consume them as external dependencies.

For Phase 0.5 prework validation, see the original playbook archived in
`temp/phase-0.5-docs/13-agent-validation-playbook.md`.

---

## Validation Package

Plan ID: `PB-PHASE-1`

Package contents:

1. `docs/12-library-package-extraction-plan.md`
2. `docs/13-integration-surfaces.md`
3. `docs/01-system-architecture.md`
4. `docs/03-page-builder-pipeline.md`
5. `docs/11-phase-0.5-execution-plan.md` (prework context)

Required evidence (must exist before review begins):

1. `npm run build` output from monorepo root
2. `pb-cli conformance` output against all fixtures (E3)
3. CI run link showing Gates A–D checks passing
4. Bundle budget report (from `scripts/check-route-budgets.ts`) post-extraction
5. TypeScript strict-mode compile output for each package (no `any` escapes in public APIs)

---

## Prompt Template

Use this exact template for each validator:

```text
You are Validator Agent {AGENT_ID}. Validate plan package PB-PHASE-1.

Rules:
1. Work independently. Do not assume other agent conclusions.
2. Treat missing evidence as risk. E3 is required for performance and security claims.
3. Cite file paths or output excerpts for every major claim.
4. Use the scoring rubric exactly — do not adjust weights.

Plan package:
- docs/12-library-package-extraction-plan.md
- docs/13-integration-surfaces.md
- docs/01-system-architecture.md
- docs/03-page-builder-pipeline.md
- docs/11-phase-0.5-execution-plan.md

Required evidence to evaluate:
- packages/contracts/package.json (exports, version)
- packages/core/package.json
- packages/runtime-react/package.json
- apps/web/package.json (or root package.json until app split is complete; must import @pb/*)
- pb-cli conformance output (E3)
- CI run showing all gates passing (E3)
- Bundle budget report (E3)

Tasks:
1. Score each category 0–5.
2. List blockers (FAIL items that block merge), major risks, minor concerns.
3. List missing evidence with impact assessment.
4. Output verdict: VALID | CONDITIONAL | INVALID
5. Output confidence: 0.00–1.00

Output format:
- Agent
- Category Scores [{category, score, rationale, evidence[]}]
- Weighted Score (0–100)
- Blockers
- Missing Evidence
- Verdict
- Conditions (if CONDITIONAL)
- Executive Summary (max 120 words)
```

---

## Scoring Rubric

Weights total 100.

| Category                  | Weight |
| ------------------------- | -----: |
| Requirements Coverage     |     20 |
| Technical Correctness     |     15 |
| Feasibility & Delivery    |     15 |
| Security & Compliance     |     15 |
| Reliability & Operability |     10 |
| Scalability & Performance |     10 |
| Cost & Resource Fit       |     10 |
| Testability & Migration   |      5 |

Score bands:

- `VALID`: score >= 80 and no blockers
- `CONDITIONAL`: score 60–79, or blockers with clear remediation path
- `INVALID`: score < 60, or critical failure in Security or Reliability

Weighted score: `sum(weight * score / 5)`

---

## Evidence Standard

Evidence tiers:

- `E1` assertion or context only (weakest)
- `E2` traceable artifact (plan, doc, committed code, test file)
- `E3` empirical proof (test output, CI report, bundle measurement, benchmark)

Minimum requirements by claim type:

| Claim type                              | Minimum evidence                           |
| --------------------------------------- | ------------------------------------------ |
| Package isolation ("no app imports")    | E3: grep output or CI lint report          |
| Contract stability ("schema unchanged") | E3: conformance test output                |
| Performance ("payloads reduced")        | E3: bundle budget report with before/after |
| Migration correctness                   | E3: migration fixture test output          |
| Plugin conformance                      | E3: testkit scorecard                      |
| TypeScript safety                       | E3: strict-mode compile output             |

Claims backed only by E1 are scored as if the claim is unverified.

---

## Agent Set

Run three validators simultaneously, each focused on a different failure mode:

### Agent CONTRACTS

Focus: `@pb/contracts` correctness, version metadata, JSON Schema outputs, capability
contract completeness.

Key checks:

- Are all top-level types exported?
- Are generated JSON Schema files committed and valid?
- Are capability contract shapes complete per `docs/12`?
- Is `CONTRACT_VERSION` consistent with `package.json`?
- Does importing from a plain Node.js script work?

### Agent PIPELINE

Focus: `@pb/core` correctness, migration completeness, `apps/web` pipeline integration,
no framework imports leaking into core.

Key checks:

- Do all five pipeline functions exist and have the correct signatures?
- Does `migratePage` have at least one implemented and tested path?
- Does `apps/web` use `@pb/core` instead of direct `src/page-builder/core/` imports?
- Is `CoreConfig` the only mechanism for host-level defaults?
- Does `@pb/core` compile without `next/` or `react` imports?

### Agent RUNTIME-PERF

Focus: `@pb/runtime-react` server/client boundary, bundle payloads, FM isolation,
`apps/web` route performance.

Key checks:

- Does the server entrypoint contain zero `"use client"` directives?
- Are FM imports fully contained within `packages/runtime-react/src/integrations/framer-motion/`?
- Does the bundle budget report show public routes at or below Gate A baseline?
- Are Three.js/R3F elements still behind `dynamic()` after extraction?
- Does the CI bundle check pass?

---

## Multi-Agent Workflow

1. Freeze the extraction commit SHA as `EXTRACTION_SHA` before review begins.
2. All three agents review the same SHA — no mid-review merges.
3. Each agent produces a report following the template above.
4. Compare category scores across agents. Flag any category where scores diverge by 2+.
5. If verdicts conflict or any agent scores INVALID, run an arbitration round.

---

## Arbitration

Triggered when: two agents disagree by 2+ points on any category, or verdicts conflict.

1. Each disagreeing agent submits evidence-backed deltas only — no re-scoring categories
   where they agree.
2. Arbiter agent reviews disputed categories only, with both agents' evidence.
3. Final score is arbiter's call on disputed categories, consensus on agreed categories.
4. If still tied after arbitration, escalate to human review with a written summary of
   the specific disagreement.

---

## Merge Gate

The extraction is approved when:

1. At least 3 validator agents have reviewed the same commit SHA.
2. Final verdict is `VALID`, or `CONDITIONAL` with all conditions assigned to owners
   and due dates.
3. No unresolved blockers.
4. All E3 evidence links are accessible (CI run, bundle report, conformance output).
5. `apps/web` renders at least one production page correctly post-extraction (smoke test).

---

## Post-Validation Output

Produce a gate report with:

1. Extraction SHA
2. Verdict per agent + final consensus verdict
3. Score table: agent × category
4. Blockers: description, owner, due date
5. Missing evidence: item, impact, who must provide it
6. Conditions (if CONDITIONAL): what must be true before unconditional approval

Format:

```
EXTRACTION_SHA: [git sha]
DATE: [date]
VERDICT: [VALID | CONDITIONAL | INVALID]
CONFIDENCE: [0.00–1.00]

SCORES:
  Category               | CONTRACTS | PIPELINE | RUNTIME-PERF | Final
  Requirements Coverage  |     X     |    X     |      X       |  X
  ...

BLOCKERS:
  1. [description] — Owner: [name] — Due: [date]

CONDITIONS:
  1. [what must be true]

MISSING EVIDENCE:
  1. [item] — Impact: [high|medium|low] — Provider: [who]
```

This report becomes the handoff artifact for any follow-on work (e.g., publishing
packages, third-party adapter program, hosted API work).

---

## Execution Report (April 8, 2026)

EXTRACTION_SHA: `56afee1bcd937cd40aaa99236814d36515d8bd20`  
DATE: `2026-04-08`  
VERDICT: `CONDITIONAL`  
CONFIDENCE: `0.92`

SCORES:

| Category                  | CONTRACTS | PIPELINE | RUNTIME-PERF | Final |
| ------------------------- | --------: | -------: | -----------: | ----: |
| Requirements Coverage     |         5 |        5 |            4 |     5 |
| Technical Correctness     |         5 |        5 |            4 |     5 |
| Feasibility & Delivery    |         4 |        5 |            4 |     4 |
| Security & Compliance     |         4 |        4 |            4 |     4 |
| Reliability & Operability |         4 |        5 |            4 |     4 |
| Scalability & Performance |         4 |        4 |            5 |     4 |
| Cost & Resource Fit       |         4 |        4 |            4 |     4 |
| Testability & Migration   |         5 |        5 |            4 |     5 |

Weighted scores:

- CONTRACTS: `88`
- PIPELINE: `93`
- RUNTIME-PERF: `82`
- Final (consensus): `88`

BLOCKERS:

- None.

CONDITIONS:

1. Attach CI run URL proving Gates A-D are passing on `EXTRACTION_SHA`.
   - Owner: Platform/Release owner
   - Due: 2026-04-10
2. Record independent three-validator outputs (CONTRACTS/PIPELINE/RUNTIME-PERF) against the same SHA and append links/records in this file. [COMPLETE]
   - Owner: Migration lead
   - Due: 2026-04-11
   - Records:
     - `docs/validation/PB-PHASE-1-CONTRACTS.md`
     - `docs/validation/PB-PHASE-1-PIPELINE.md`
     - `docs/validation/PB-PHASE-1-RUNTIME-PERF.md`

MISSING EVIDENCE:

1. CI run link with full gate pass report — Impact: `high` — Provider: Platform/Release owner

E3 evidence captured in this run:

- `npm run build` -> pass
- `npm run pb-cli -- conformance` -> pass (`6/6`)
- `npm run check:route-budgets` -> pass (all 5 monitored routes under budget)
- `npm run type-check --workspace @pb/contracts --workspace @pb/core --workspace @pb/runtime-react --workspace @pb/sdk --workspace @pb/extensions` -> pass
- `npm run test` -> pass (`77` files, `584` tests)
