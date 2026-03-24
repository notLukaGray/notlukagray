# Routes, forms, auth, and security

## Route surfaces

Primary route directories:

- `src/app/`
- `src/app/work/`
- `src/app/research/`
- `src/app/teaching/`
- `src/app/profile/`
- `src/app/api/`

The route layer is intentionally thin, but it still defines important system behavior.

## Home surface

The home page is not built through the full page-builder route path.
It uses `HomeView` and global hero data from `globals.json`.

## Work pages

`/work` is a specialized surface.

Important files:

- `src/proxy.ts`
- `src/app/work/[slug]/[variant]/page.tsx`
- `src/app/work/layout.tsx`

### `/work` behavior

The proxy rewrites `/work/[slug]` to `/work/[slug]/mobile` or `/work/[slug]/desktop` based on user agent.

This allows the page to be statically generated without needing request headers in the page component itself, and it gives `/work` a different routing model than research and teaching.

## Research and teaching pages

These use:

- `src/app/research/[slug]/page.tsx`
- `src/app/teaching/[slug]/page.tsx`

They still read the request user agent directly to choose breakpoint behavior, so breakpoint handling is not fully unified across all page-builder surfaces.

## Protected content flow

Protection is controlled by page content plus generated slug metadata.

Important files:

- `scripts/generate-protected-slugs.ts`
- `src/core/lib/protected-slugs.generated.ts`
- `src/proxy.ts`
- `src/app/api/unlock/route.ts`
- `src/core/lib/access-cookie.ts`
- `src/core/lib/access-cookie-edge.ts`
- `src/core/lib/unlock-rate-limit.ts`

### Flow

1. page content sets `passwordProtected: true`
2. build script generates the protected slug set
3. proxy checks the slug and access cookie
4. if missing or invalid, user is redirected toward unlock flow
5. unlock API validates password and sets access cookie
6. protected content becomes available until the cookie expires or is cleared

This flow implements gated portfolio-style access, not full identity management.

## Auth model scope

The auth model is intentionally small and uses:

- password gate
- signed cookie
- rate limiting
- optional magic-link and password-reset style form endpoints for specific flows

## Form architecture

Primary files:

- `src/core/lib/forms/registry.ts`
- `src/core/lib/forms/parse-form-body.ts`
- `src/core/lib/forms/form-rate-limit.ts`
- `src/core/lib/forms/form-responses.ts`
- `src/core/lib/forms/send-email.ts`
- `src/core/lib/forms/with-form-rate-limit.ts`
- `src/app/api/forms/*/route.ts`

### Design choice

Form block actions are allowlisted keys, not arbitrary URLs.

This prevents content authors from turning a page-builder form into an unbounded network surface.

### Current handler set

Current handlers include:

- `contact`
- `newsletter`
- `waitlist`
- `event-registration`
- `feedback`
- `gated-asset`
- `job-inquiry`
- `quote-request`
- `application`
- `rsvp`
- `unsubscribe`
- `password-reset`
- `magic-link`
- `unlock`

## Form route pattern

Most form routes follow the same shape:

1. rate-limit check
2. request body parse
3. schema validation with Zod
4. email send or webhook handoff
5. optional safe redirect
6. submission cookie update

This consistency also shows where future consolidation could happen.

## Media API routes

Important files:

- `src/app/api/video/[...key]/route.ts`
- `src/app/api/video/batch/route.ts`

These routes resolve asset keys into signed URLs or streamable responses in a controlled way.

## Dev-only API routes

Important files:

- `src/app/api/dev/content-watch/route.ts`
- `src/app/api/dev/page-validation/route.ts`

These only exist in development and support live content reload and validation reporting.

They are not product features.
They are developer quality-of-life surfaces.

## Security boundaries that matter

### Safe path segments

The loader and asset routes validate path segments and asset keys.
That is a direct guard against path traversal and malformed input.

### Allowlisted form actions

Forms do not accept arbitrary target URLs.
That is a major safety boundary.

### Signed cookies and tokenized URLs

Protected content and media access are mediated rather than public by default.

### Rate limiting

Unlock and form flows both have rate-limiting behavior.
It is cookie-based, lightweight, and appropriate for the current problem space.

### Redirect hygiene

Redirects are checked so they stay root-relative and do not become open redirect vectors.

## What this system does not try to be

- a full multi-user auth system
- a generalized backend platform
- a secrets vault
- a generalized CMS admin

That restraint is healthy.

## Practical route truths

- route files stay thin
- page-builder routes delegate almost everything to core helpers
- route surfaces are partitioned by `assetBaseUrl`
- work uses a stronger static optimization strategy than research and teaching
- forms are intentionally explicit rather than auto-generated from config alone

## Where to be careful

1. Changing protected content flow without regenerating slug metadata
2. Letting form routes drift apart in response shape
3. Relaxing asset key validation casually
4. Assuming Bunny redirect behavior is the same as asset streaming behavior
5. Treating magic-link or password-reset helper routes as fully fleshed auth products when they are really lightweight utility flows
