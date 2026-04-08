# globals.json vs runtime modules

## What the ZIP contains

The plugin can write **`globals.json`** (`buttons`, `backgrounds`, `elements`) when you export `Button/…`, `Background/…`, or `Global/…` frames.

## What page-builder load merges automatically

On the Next.js site, **`loadPageBuilder`** merges **`apps/web/src/content/modules/*.json`** into the page’s definitions map **before** expand (`{ ...moduleFiles, ...pageDefinitions }`). The page JSON **wins** on key collision.

There is **no** automatic merge of **`globals.json`** from a Figma ZIP into that pipeline. Treat **`globals.json` as a handoff artifact**: copy entries into:

- **`apps/web/src/content/modules/<key>.json`** for reusable blocks with `type: "module"`, or
- inline **`definitions`** / section files next to **`index.json`**, using the **same keys** as `elementOrder` and `element.module` references.

If you skip that step, the export “looks complete” but the site will not resolve those globals.

## Validation hints

`page-builder-validation.ts` may attribute `definitions.<key>` errors to either a page file or `apps/web/src/content/modules/<key>.json` when reporting paths.

## See also

- [Designer workflow / ZIP layout](./08-workflow.md)
- [Expand / ids](./12-page-builder-expand-parity.md)
- [System architecture](../../../docs/architecture.md)
