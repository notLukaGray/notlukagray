# @pb/extensions

Plugin interface package for importer/exporter/CMS adapters, including a fixture-based testkit.

## Responsibilities

- Define plugin contract types for import/export/CMS integration.
- Provide testkit runners for fixture validation.
- Provide reference importer/exporter implementations.

## Public Exports

From `package.json`:

- `@pb/extensions`
- `@pb/extensions/testkit`

From `src/index.ts`:

- plugin types: `ImporterPlugin`, `ExporterPlugin`, `CmsAdapterPlugin`
- fixture helpers: `runImporterFixtureSuite`, `runExporterFixtureSuite`
- reference implementations: `createReferenceJsonFileImporter`, `createThirdPartyPayloadImporter`, `createReferenceJsonExporter`

## Commands

```bash
npm run type-check --workspace @pb/extensions
```

## Usage

```ts
import { createReferenceJsonFileImporter, runImporterFixtureSuite } from "@pb/extensions";

const importer = createReferenceJsonFileImporter();
const scorecard = await runImporterFixtureSuite(importer, [
  { id: "fixture-1", source: { path: "./fixtures/page.json" } },
]);
```

```ts
import { createReferenceJsonExporter, runExporterFixtureSuite } from "@pb/extensions";

const exporter = createReferenceJsonExporter();
const scorecard = await runExporterFixtureSuite(exporter, [{ id: "fixture-1", page }]);
```

## Notes

- Error-severity diagnostics fail fixture tests.
- Capability metadata should accurately declare supported contract versions and targets.
