# Figma → Page Builder export contract (Batch C)

This document describes the **export trace**, **parity metrics**, and **`meta.figma`** fields produced by `tools/figma-plugin` and consumed by PB dev tooling.

## Export trace (`ExportResult.trace`)

The plugin attaches a machine-readable trace for every export. It is serialized to `export-trace.json` in ZIP exports and is always present on the in-memory `ExportResult` sent to the plugin UI.

### `counts.severity` / `counts.category`

Unchanged from earlier versions: warning strings are classified into `error` / `warn` / `info`, and bracket-prefixed categories are counted (e.g. `[preflight:annotations]` → category key `preflight:annotations`).

### `counts.parity` (optional, backwards compatible)

| Field             | Meaning                                                                                                                                                                                                                     |
| ----------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `converted`       | Count of element blocks in exported section trees **without** `meta.figma.fallbackReason` (recursive: `elementGroup.section.definitions`, reveal arrays, module slot sections).                                             |
| `fallback`        | Count of element blocks **with** `meta.figma.fallbackReason`.                                                                                                                                                               |
| `dropped`         | **Honest losses**: converter drops (e.g. `convertNode` returned `null`, guarded conversion errors) **plus** upstream routing drops (export target `skip`, orphaned responsive desktop/mobile frames that are not exported). |
| `fallbackReasons` | Histogram of stable `fallbackReason` codes on output elements.                                                                                                                                                              |
| `dropReasons`     | Histogram of stable drop codes (converter and upstream, merged into one map for the trace; upstream uses the same string codes without a prefix).                                                                           |

**Dropped** is **not** “elements minus converted”: it counts **input-side losses** (nodes/targets that never became output elements) while `converted`/`fallback` count **output-side** element blocks.

## Stable drop reason codes (plugin)

Defined in `tools/figma-plugin/src/export-parity.ts` as `EXPORT_DROP_REASON`:

- `convert-node-null` — `convertNode` returned `null` (node not representable as emitted element).
- `gather-child-error` — exception while converting a frame’s direct child.
- `reveal-slot-convert-error` — exception while converting a reveal section slot child.
- `column-child-error` — exception while converting a section column child.
- `export-target-skip` — user set the frame target to Skip.
- `responsive-orphan-frame` — `Section[Desktop]/` or `Section[Mobile]/` frame had no paired counterpart, so **that artboard was not exported**.

## Stable fallback reason codes (exporter)

These appear on `meta.figma.fallbackReason` when the exporter emits an `elementGroup` (or other element) as a stand-in. Examples (non-exhaustive; plugin may add more without a runtime bump):

- `unsupported-node-type`
- `group-conversion-fallback`
- `section-conversion-fallback`
- `instance-conversion-fallback`
- `instance-image-export-failed`
- `vector-export-failed`
- `annotated-svg-conversion-failed`
- `annotated-image-conversion-failed`
- `video-conversion-failed`
- `rectangle-image-export-failed`
- … (see `mergeElementMetaFigma` call sites in converters)

### Required `meta.figma` for fallback elements

Every fallback element **must** set:

- `meta.figma.sourceType` — Figma `node.type` when applicable.
- `meta.figma.sourceName` — layer name when available.
- `meta.figma.fallbackReason` — stable code from the lists above.

Runtime validation: `figmaExporterMetaSchema` in `src/page-builder/core/page-builder-schemas/figma-exporter-meta-schema.ts`.

## `figmaExportDiagnostics` on page JSON

When using **Copy page JSON** in the plugin UI, the payload includes an optional root field:

```json
{
  "slug": "…",
  "figmaExportDiagnostics": {
    "version": 1,
    "converted": 42,
    "fallback": 3,
    "dropped": 1,
    "topFallbackReasons": [{ "code": "group-conversion-fallback", "count": 2 }],
    "dropReasons": { "convert-node-null:TEXT": 1 },
    "highRiskWarnings": [{ "category": "structure", "count": 2 }]
  }
}
```

This is mirrored from `trace.counts.parity` plus derived “high risk” warning buckets for PB dev overlay. It is **optional** at runtime: `pageBuilderSchema` allows it and production ignores unknown keys.

## PB dev overlay

In development, **⌘⇧D** opens the overlay. The **Figma** tab reads:

- embedded `figmaExportDiagnostics` (from playground paste or future loaders), and/or
- a **scan** of `definitions` for `meta.figma.fallbackReason` (fallback-only; dropped/converted need embedded trace).

## Parity tests

- `tools/figma-plugin/src/export-parity-harness.test.ts` — guard against new drops on a fixed fixture.
- `tools/figma-plugin/src/section-reveal-e2e.test.ts` — real `convertNode` path for reveal wrapper preservation and parent placement metadata.
