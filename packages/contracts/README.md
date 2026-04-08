# @pb/contracts

Canonical schema and contract package for page-builder content and integration capabilities.

## Responsibilities

- Define Zod schemas for page-builder content models.
- Export contract version metadata.
- Export capability schemas for importers/exporters/CMS adapters.
- Generate JSON Schema artifacts for external validation consumers.

## Public Exports

From `package.json`:

- `@pb/contracts`
- `@pb/contracts/capability-schemas`
- `@pb/contracts/version`

From `src/index.ts`:

- content schemas and related types
- `CONTRACT_VERSION`, `SUPPORTED_CONTRACT_VERSIONS`
- capability schemas and types
- page density helpers

## Commands

```bash
npm run type-check --workspace @pb/contracts
npm run generate-schemas --workspace @pb/contracts
```

## Usage

```ts
import { pageBuilderSchema, CONTRACT_VERSION } from "@pb/contracts";

const parsed = pageBuilderSchema.parse(input);
console.log(CONTRACT_VERSION);
```

```ts
import { importerCapabilitySchema } from "@pb/contracts/capability-schemas";

const capability = importerCapabilitySchema.parse(payload);
```

## Schema Reference

- [`SCHEMA_CHEATSHEET.md`](./SCHEMA_CHEATSHEET.md)

## Notes

- Treat this package as the contract source of truth for cross-surface compatibility.
- Regenerate `dist/schemas` when schema shapes change.
