# Page-builder expand parity (Figma export)

JSON you export is **authored** page data. The live site runs **`expandPageBuilder`** after **`loadPageBuilder`**, which changes ids and resolves references. The Figma widget **Export preview** shows prefix/slug targets; **runtime element ids** are not the same as layer slugs.

## Display order

Expand builds an ordered list from **`sectionOrder`** followed by **`triggers`** keys (in that order). Section indices used for fallback ids (`${type}_${index}`) follow this **combined** list, not `sectionOrder` alone.

## Namespaced element ids

For each section, expand sets `namespacePrefix` to **`section.id`** if present, otherwise `` `${section.type}_${i}` `` where `i` is the section index in display order.

Every resolved element id becomes **`${namespacePrefix}:${baseId}`** where `baseId` is the definition’s `id` field if non-empty, otherwise the **definition map key**. Duplicate `baseId` values in one section get suffixes `__2`, `__3`, …

**Implication:** `elementOrder` / `definitions` keys should stay aligned with each block’s `id` when using **sectionColumn** (`columnAssignments`, `columnSpan`, `itemStyles`, `itemLayout`), because those maps are keyed by the **definition key** after namespacing—not necessarily by the inner `id` field if it differs from the key.

## Definitions merge per section

Element lookup uses `{ ...page.definitions, ...section.definitions }`. Keys in the section object **override** page-level keys with the same name.

## Triggers and payloads

Section triggers may reference **`definitions[payload]`** by string key. Later passes resolve asset URLs in trigger payloads. Skipping expand (e.g. pasting only into pb-dev without a full expand step) **will not** show these effects.

## Reference code

- `src/page-builder/core/page-builder-expand.ts`
- `src/page-builder/core/page-builder-expand/element-resolution.ts`
- `src/page-builder/core/page-builder-expand/column-namespacing.ts`
