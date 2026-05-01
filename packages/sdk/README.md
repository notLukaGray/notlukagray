# @pb/sdk

Programmatic integration client for page-builder workflows.

## Responsibilities

- Provide a single client constructor (`createPbClient`) for validate/diff/migrate/load operations.
- Normalize operational workflows for external integrators and tools.

## Public Exports

From `package.json`:

- `@pb/sdk`

From `src/index.ts`:

- `createPbClient`
- types: `PbClient`, `DiffResult`, `MigrationResult`, `ValidatePageResult`, `PageBuilderDiagnostic`

## Commands

```bash
npm run type-check --workspace @pb/sdk
```

## Usage

```ts
import { createPbClient } from "@pb/sdk";

const pb = createPbClient();
const validation = await pb.validate(pageJson);
const diff = await pb.diff(before, after);
```

```ts
import { createPbClient } from "@pb/sdk";

const pb = createPbClient({ contractVersion: "1.0.0" });
const migrated = await pb.migrate(pageJson, { from: "0.5.0-v0", to: "1.0.0" });
```

## Notes

- `diff` is structural and marks removals as breaking.
- `migrate` can infer source version from `page.contractVersion` when omitted.

## Internal SDK — Not Published

`@pb/sdk` is an internal workspace package. Despite the "SDK" naming, it is not a released artifact. It describes a programmatic surface within the monorepo; publishing externally would require an explicit build pipeline.
