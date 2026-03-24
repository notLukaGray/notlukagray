## Not Luka Gray

This repo is a JSON‑driven page‑builder system.
The portfolio and case‑study pages in this repo exist primarily as a concrete demo of that system.

There are two main layers:

- **System layer** – page‑builder pipeline, content model, media pipeline, triggers, forms, auth
- **Product layer** – the portfolio routes that consume the system

If you are making non‑trivial changes, treat the system layer as the primary subject and the portfolio as an example implementation.

### Stack

- Next.js App Router (pages, layouts, API routes)
- React 19
- TypeScript
- Tailwind CSS
- Zod (schemas and validation)
- Framer Motion (integrated)
- ThreeJS (integrated)

---

## Getting started

### Run the app

- `npm install`
- `npm run dev`

Main route surfaces:

- `src/app/` – pages, layouts, `api/unlock`, `api/video/[...key]`, dev routes
- `src/app/work/[slug]/[variant]/page.tsx` – page‑builder work pages (mobile/desktop variants)
- `src/app/research/[slug]/page.tsx`, `src/app/teaching/[slug]/page.tsx` – other page‑builder routes
- `src/app/profile/` – profile surface

### Core directories

- `src/content/` – authored JSON (pages, sections, presets, modules, modals, globals)
- `src/page-builder/core/` – load/expand/resolve pipeline, schemas, model3D helpers
- `src/page-builder/` – runtime renderer, sections, elements, backgrounds, triggers, modals
- `src/core/` – shared shell, auth, media helpers, forms, config parsing
- `scripts/` – page manifest and protected‑slug generation, JSON Schema generation, validation, asset listing

### Key scripts

- `npm run dev` – development server
- `npm run build` – generate protected slugs, then Next build
- `npm run check` – type‑check, lint, format check, validate pages
- `npm run fix` – lint `--fix` and format
- `npm run generate-json-schemas` – emit JSON Schema for `src/content` from Zod
- `npm run validate-pages` – validate authored pages against schemas

---

## System overview (high level)

Page‑builder routes follow a four‑stage pipeline:

1. **Content** – JSON in `src/content/pages/...` and nested section files
2. **Load** – loader in `src/page-builder/core/page-builder-load.ts`
3. **Expand** – resolve references, presets, traits, and module wiring
4. **Resolve** – asset URLs, breakpoints, transition backgrounds
5. **Render** – `PageBuilderPage` / `PageBuilderRenderer` mount backgrounds and sections

If you are changing routes, content, or the builder itself, read the docs for each of these steps before wiring in new behavior.

---

## Where to read next

Full documentation lives in `docs/`. Good starting points depend on what you are trying to do.

### Understand the architecture

Start here if you are new to the repo:

1. [System architecture](docs/01-system-architecture.md)
2. [Page-builder pipeline](docs/03-page-builder-pipeline.md)
3. [Routes, forms, auth, and security](docs/07-routes-forms-auth-and-security.md)

### Work with authored content

If you need to add or debug pages, sections, or modules:

1. [Content model and JSON contract](docs/02-content-model-and-json-contract.md)
2. [Page-builder pipeline](docs/03-page-builder-pipeline.md)
3. [Elements, sections, and layout](docs/04-elements-sections-and-layout.md)

### Extend runtime behavior

If you are adding new elements, sections, media behavior, or triggers:

1. [Elements, sections, and layout](docs/04-elements-sections-and-layout.md)
2. [Rich media, 3D, and assets](docs/05-rich-media-3d-and-assets.md)
3. [Triggers, motion, modals, and overrides](docs/06-triggers-motion-modals-and-overrides.md)
4. [Extending the system](docs/09-extending-the-system.md)

### Operate and review the system

If you are focused on deployment, validation, or maintenance:

1. [Tooling, validation, and operations](docs/08-tooling-validation-and-operations.md)
2. [Maintenance review](docs/10-maintenance-review.md)

---

## Reader assumptions

The docs assume you:

- can read TypeScript
- are comfortable with basic Next.js App Router concepts
- understand client/server boundaries at a high level
