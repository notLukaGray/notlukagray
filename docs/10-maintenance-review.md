# Maintenance review

This file documents areas where structural pressure is building.

## 1. Documentation drift

The previous documentation drifted as the repo grew faster than its map.

The fix is to keep documentation tied to the stable seams of the system:

- content contract
- pipeline stages
- registry surfaces
- delivery layer
- route partitions

## 2. `globals.json` scope

Current responsibilities inside `src/content/data/globals.json` include:

- site metadata
- person schema
- asset defaults
- CDN configuration
- auth defaults
- UI timing values
- nav and footer
- logo
- home hero content

This is convenient, but broad enough to become a catch-all.

What to do later:

- split if ownership becomes confusing
- keep the public parsing layer stable in `src/core/lib/globals.ts`
- do not break consumers just to make the file look cleaner

## 3. Content tree mixes canonical content and test surfaces

Examples currently living in `src/content/pages/`:

- `card-test`
- `fm-integration-test`
- `form-demo`
- `page-builder-pipeline`

These may be valid development assets, but they live beside canonical pages.

Why that matters:

- route indexing can become noisy
- external partners cannot immediately tell what is real production content
- test and demo surfaces risk becoming accidental long-term residents

What to do later:

- move them into a clearly named sandbox or internal-demo partition
- or mark them as explicitly non-canonical through naming and route rules

## 4. Route strategy is not fully unified

Current reality:

- `/work` uses proxy-based mobile/desktop variants
- `/research` and `/teaching` still read user agent at request time
- home is structurally different from page-builder surfaces

What to do later:

- decide whether the work-route strategy is the future model
- or decide whether the simpler request-time breakpoint path is acceptable across all surfaces
- document the chosen long-term direction and delete the other shape if it becomes obsolete

## 5. Form routes are consistent but repetitive

This is both a strength and a maintenance cost.

Strength:

- each route is explicit
- each handler is easy to inspect
- security remains obvious

Cost:

- repeated parsing, validation, email, webhook, and redirect code
- drift risk as new handlers get added

What to do later:

- consider a handler factory or config-driven route helper
- keep allowlisting explicit even if you reduce repetition
- do not over-abstract this into something harder to audit

## 6. Schema surface is powerful but heavy

The repo has both:

- schema definitions
- inferred TypeScript types
- some parallel type exports and constants

This is normal for a serious builder system, but it means schema changes are not cheap.

What to do later:

- keep converging on schema-first truth
- remove manual duplication only where it is actually redundant
- do not chase theoretical elegance if it makes the contract harder to use

## 7. Media portability is real but adapter-thin

The system is portable beyond Bunny, but the implementation is still clearly Bunny-shaped.

Pressure points:

- signed URL generation
- optimizer params
- custom image loader behavior
- CORS assumptions
- redirect semantics

What to do later:

- formalize a media provider adapter boundary if migration becomes likely
- avoid spreading Bunny assumptions into more files than necessary

## 8. Page-builder backbone and home page exception

If the long-term goal is a more universally data-authored system, the current split between the home page and page-builder surfaces should remain a conscious decision, not an accident of history.

## 9. Generated artifacts in workflow

These files matter:

- `src/core/lib/protected-slugs.generated.ts`
- `src/content/schemas/*.json`

(Page discovery scans `src/content/pages/`; a legacy `page-manifest.json` path is not part of the current build.)

If contributors stop thinking about them, bugs become harder to diagnose.

What to do later:

- keep build and validation commands visible
- consider stronger preflight hooks if the team grows
- make sure generated artifact drift is easy to detect

## 10. Pruning focus

The pruning target should be ambiguity, not size.

That means:

- separate demo content from canonical content
- unify route strategy where it matters
- reduce obvious route repetition where it is safe
- keep global config from becoming a junk drawer
- keep docs tied to stable seams, not temporary page examples

## Areas that are not pruning candidates

- the staged page-builder pipeline
- the schema system
- the trigger and motion layers
- the 3D system
- the media resolution architecture
- the module pattern

These are core parts of the system and are not pruning candidates.
