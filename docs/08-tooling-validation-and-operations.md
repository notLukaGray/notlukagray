# Tooling, validation, and operations

## Build and validation commands

### Development

```bash
npm run dev
```

### Full preflight

```bash
npm run check
npm run test
```

### Build

```bash
npm run build
```

### Fix style issues

```bash
npm run fix
```

## Important scripts

### `generate-page-manifest`

File: `scripts/generate-page-manifest.ts`

Generates `src/content/page-manifest.json`.

Purpose:

- make slug and base-path lookup cheap
- avoid scanning all page files in some runtime paths
- support route generation and indexing

### `generate-protected-slugs`

File: `scripts/generate-protected-slugs.ts`

Generates `src/core/lib/protected-slugs.generated.ts`.

Purpose:

- avoid checking password protection by reading page files at request time
- give the proxy a fast lookup surface

### `generate-json-schemas`

File: `scripts/generate-json-schemas.ts`

Generates JSON Schema files into `src/content/schemas/`.

Purpose:

- editor autocomplete
- editor validation
- lower-friction content authoring

### `validate-pages`

File: `scripts/validate-pages.ts`

Runs page-builder validation across all or selected slugs.

Purpose:

- catch authored data problems before deploy
- surface nested schema issues with source hints
- make content breakage easier to debug

### `list-assets`

File: `scripts/list-page-builder-assets.ts`

Enumerates asset refs from authored page data.

Purpose:

- inspect media coverage
- audit content assets
- support migration or verification work

## Tests

The repo uses Vitest with Happy DOM.

Config:

- `vitest.config.ts`

The current test coverage is targeted rather than exhaustive.
It covers key helper and pipeline behavior such as:

- page-builder load and expand
- trigger handling
- breakpoint resolution
- section layout helpers
- media URL helpers
- SVG sanitization and transforms
- route behavior for batch asset resolution

That is the right kind of test coverage for this repo.
It focuses on brittle logic, not empty component snapshots.

## Dev tooling surfaces

### Live content reload

- `src/core/dev/DevContentReloadClient.tsx`
- `src/app/api/dev/content-watch/route.ts`

This watches `src/content/` during development and refreshes when content changes.

### Dev validation reporting

- `src/core/dev/DevPageValidationClient.tsx`
- `src/app/api/dev/page-validation/route.ts`

This surfaces page-builder validation errors in development for the current page.

These are useful because the repo is content-heavy and schema-heavy.

## Environment variables

### Core access and gating

- `SITE_PASSWORD`
- `STRICT_VALIDATION`

### Media delivery

- `BUNNY_TOKEN_SECRET`
- `BUNNY_SECURITY_KEY`
- `VIDEO_TOKEN_SECRET`

Only one signing secret path is needed, but the code tolerates multiple env names.

### Build and deployment context

- `VERCEL_GIT_COMMIT_SHA`
- `VERCEL_URL`
- `SITE_URL`
- `DISABLE_MANIFEST`

### Email and form infrastructure

- `RESEND_API_KEY`
- `RESEND_FROM`
- `FORM_CONTACT_FROM`
- `FORM_CONTACT_RECIPIENT`

### Handler-specific recipient overrides

- `FORM_NEWSLETTER_RECIPIENT`
- `FORM_EVENT_RECIPIENT`
- `FORM_FEEDBACK_RECIPIENT`
- `FORM_JOB_INQUIRY_RECIPIENT`
- `FORM_QUOTE_RECIPIENT`
- `FORM_APPLICATION_RECIPIENT`
- `FORM_RSVP_RECIPIENT`
- `FORM_GATED_RECIPIENT`
- `FORM_WAITLIST_RECIPIENT`
- `FORM_UNSUBSCRIBE_RECIPIENT`

### Webhooks and redirects

- `NEWSLETTER_WEBHOOK_URL`
- `MAILCHIMP_WEBHOOK_URL`
- `WAITLIST_WEBHOOK_URL`
- `UNSUBSCRIBE_WEBHOOK_URL`
- `GATED_ASSET_REDIRECT`

### Lightweight auth helpers

- `MAGIC_LINK_SECRET`
- `FORM_RATE_LIMIT_SECRET`

## Current deployment assumptions

### Next.js host

The code assumes a Next.js host that supports App Router, API routes, and edge or node runtime as used by the routes.
Vercel is the current deployment target.

### CDN

The current code assumes Bunny semantics for:

- tokenized asset URLs
- optimizer query params
- storage path structure
- redirect and proxy strategy

### Fonts and static assets

Local fonts are bundled through Next font handling.
Public assets are minimal compared to CDN-served media.

## Operational notes

### Page manifest

There is a filesystem fallback, but the manifest path exists to support scale and should not be removed without a clear replacement.

### Generated files

`page-manifest.json` and `protected-slugs.generated.ts` affect runtime behavior and should be treated as build inputs.

### Validation in workflows

Because content is executable in the broad sense, invalid JSON or invalid block structure is not harmless.
Validation should be part of normal workflow.

## Portability notes

If the repo moves off Vercel and Bunny, the first operational surfaces to replace are:

- media signing helpers
- image loader logic
- any reliance on edge runtime behavior for proxy and auth
- environment variable naming and host URL assumptions

The page-builder itself is far less host-specific than the delivery layer.

## Practical standard for contributors

Before merging anything meaningful:

1. run `npm run check`
2. run `npm run test`
3. if content changed, run `npm run validate-pages`
4. if page metadata or password flags changed, ensure manifest and protected slug generation still make sense
5. if schema contracts changed, regenerate JSON schemas
