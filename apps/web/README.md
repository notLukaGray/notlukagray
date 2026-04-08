# @notlukagray/web

Next.js App Router workspace that consumes the page-builder packages.

## Responsibilities

- Compose route/application behavior using `@pb/*` surfaces.
- Host app-level defaults and configuration wiring.
- Run content generation/validation scripts used by development and build.

## Commands

```bash
npm run dev --workspace @notlukagray/web
npm run build --workspace @notlukagray/web
npm run start --workspace @notlukagray/web
npm run type-check --workspace @notlukagray/web
npm run lint --workspace @notlukagray/web
npm run validate-pages --workspace @notlukagray/web
```

## Integration Points

- Server page assembly with `@pb/core` helpers.
- Runtime rendering via `@pb/runtime-react/server` and focused client subpaths.
- Type/schema usage from `@pb/contracts`.
- Dev tooling integrations via runtime dev surfaces where needed.

## Content and Scripts

- Content is stored under `src/content`.
- `dev` runs schema generation before Next dev server start.
- `build` runs protected slug generation before Next build.
