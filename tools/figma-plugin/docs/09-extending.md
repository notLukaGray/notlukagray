# Adding New Converters

How to extend the plugin with new element types, section types, annotation keys, export targets, and variant states.

---

## Adding a new element type

### 1. Add the TypeScript interface to `src/types/page-builder.ts`

```ts
export interface ElementFoo extends LayoutProps {
  type: "elementFoo";
  myProp: string;
}
```

Add `"elementFoo"` to the `ElementType` union in the same file.

### 2. Create `src/converters/foo.ts`

```ts
import type { ConversionContext } from "../types/figma-plugin";
import type { ElementBlock } from "../types/page-builder";
import { slugify, ensureUniqueId } from "../utils/slugify";
import { stripAnnotations } from "./annotations";

/** Returns true when this node should be converted as elementFoo. */
export function isFooNode(node: SceneNode, annotations: Record<string, string>): boolean {
  return annotations.type === "foo" || node.name.toLowerCase().startsWith("foo-");
}

/** Converts a Figma node to an elementFoo block. */
export async function convertFooNode(
  node: SceneNode,
  ctx: ConversionContext,
  annotations: Record<string, string>
): Promise<ElementBlock | null> {
  const id = ensureUniqueId(slugify(stripAnnotations(node.name || "foo")), ctx.usedIds);
  return { type: "elementFoo", id, myProp: annotations.myprop ?? "" };
}
```

### 3. Add detection to `src/converters/node-to-element.ts`

In `convertNode()`, add a check after the video check, before the `switch (node.type)` block:

```ts
import { isFooNode, convertFooNode } from "./foo";

// In convertNode():
if (isFooNode(node, annotations)) {
  const result = await convertFooNode(node, ctx, annotations);
  if (result) {
    applyAbsPos(result);
    applyElementAnnotationProps(result, node, annotations, ctx.warnings);
  }
  return result;
}
```

`applyElementAnnotationProps` applies all annotation-driven fields (`hidden`, `opacity`, `blendMode`, `visibleWhen`, `interactions`, `aria`, `zIndex`, `motionTiming`, etc.) to any element type.

### 4. Export from `src/converters/index.ts`

```ts
export { isFooNode, convertFooNode } from "./foo";
```

---

## Adding a new section type

### 1. Create `src/converters/section-foo.ts`

Follow the pattern from `section-column.ts` and `section-reveal.ts`:

- Export an `isFooLayout(frame, annotations)` function for detection.
- Export a `convertFrameToFooSection(frame, ctx)` async converter.
- Call `parseSectionTriggerProps(annotations)` and `Object.assign(section, triggerProps)` at the end.
- Extract base visual props with `extractLayoutProps`, `extractFill`, `exportImageFillAsset`, `extractBorderProps`, `extractBoxShadow`, `extractFilter`, `extractBackdropFilter`.

### 2. Add detection to `src/converters/node-to-section.ts`

In the type routing block inside `convertFrameToSection()`:

```ts
import { isFooLayout, convertFrameToFooSection } from "./section-foo";

// In convertFrameToSection():
if (annotatedType === "foosection" || (!hasExplicitType && isFooLayout(frame, annotations))) {
  return convertFrameToFooSection(frame, ctx) as unknown as ContentBlock;
}
```

### 3. Export from `src/converters/index.ts`

```ts
export { isFooLayout, convertFrameToFooSection } from "./section-foo";
```

---

## Adding new annotation keys

### Section-level trigger or effect keys

Add a new parsing block in `parseSectionTriggerProps()` in `src/converters/section-triggers.ts`. Use `collectKeyedValues(annotations, "myKey")` to automatically support `myKey`, `myKey2`, `myKey3`, etc.:

```ts
const pulseValues = collectKeyedValues(annotations, "pulse");
const pulseEntries: unknown[] = [];

for (const v of pulseValues) {
  const colonIdx = v.indexOf(":");
  if (colonIdx === -1) continue;
  const ms = parseFloat(v.slice(0, colonIdx));
  if (isNaN(ms)) continue;
  const action = parseTriggerShorthand(v.slice(colonIdx + 1).trim());
  if (action) pulseEntries.push({ pulseAfterMs: ms, onPulse: action });
}

if (pulseEntries.length > 0) props.pulseTriggers = pulseEntries;
```

Also add `pulseTriggers?: unknown[]` to the `SectionTriggerProps` interface.

### Element-level annotation keys

Add a check in `applyElementAnnotationProps()` in `src/converters/node-to-element.ts`:

```ts
// [pb: contentSlot=main]
if (annotations.contentslot) {
  element.contentSlot = annotations.contentslot;
}
```

Use `annotationFlag`, `annotationNumber`, or `parseAnnotationValue` from `annotations.ts` for type coercion.

### New action shorthand types

Add a new `case` in `parseTriggerShorthand` in `src/converters/annotations.ts`:

```ts
case "myAction":
  if (!param) return null;
  return { type: "myAction", payload: { target: param } };
```

Also add the type to the `TriggerAction` union in `src/converters/annotations.ts` and `src/types/page-builder.ts`.

### New motion preset values

Add to the `ENTRANCE_EXIT_PRESETS` set in `src/converters/motion.ts`:

```ts
const ENTRANCE_EXIT_PRESETS = new Set([
  "fade",
  "slideUp",
  "slideDown",
  "slideLeft",
  "slideRight",
  "zoomIn", // new
]);
```

---

## Adding a new export target type

### 1. Update `ExportTargetType` in `src/types/figma-plugin.ts`

```ts
export type ExportTargetType =
  | "page"
  | "preset"
  | "modal"
  | "module"
  | "global-button"
  | "global-background"
  | "global-element"
  | "skip"
  | "theme"; // new
```

### 2. Update `detectExportTarget` in `src/main.ts`

```ts
case "theme":
  return { type: "theme", key, label };
```

### 3. Handle in `applyFrameToResult` in `src/main.ts`

```ts
case "theme": {
  result.themes ??= {};
  result.themes[target.key] = section;
  break;
}
```

Also add `themes?: Record<string, unknown>` to the `ExportResult` interface in `src/types/figma-plugin.ts`.

### 4. Write to ZIP in `src/ui.ts`

```ts
for (const [key, theme] of Object.entries(result.themes ?? {})) {
  zip.file(`themes/${key}.json`, JSON.stringify(theme, null, 2));
}
```

### 5. Add badge color and label in `src/ui.ts`

```ts
const TARGET_BADGE_COLORS: Record<ExportTarget["type"], string> = {
  // ...
  theme: "badge-pink",
};
```

---

## Adding a new variant state

Add a new entry to `VARIANT_STATE_MAP` in `src/converters/component-variants.ts`:

```ts
skeleton: { terminal: true, stateValue: "skeleton" },
```

Valid `VariantStateInfo` fields:

| Field        | Type      | Meaning                                                          |
| ------------ | --------- | ---------------------------------------------------------------- |
| `isBase`     | `boolean` | Default state — no trigger needed to enter it                    |
| `trigger`    | `string`  | Interaction key to enter this state (e.g. `"onHoverEnter"`)      |
| `release`    | `string`  | Interaction key to exit this state (e.g. `"onHoverLeave"`)       |
| `stateValue` | `string`  | Value set on the state variable                                  |
| `toggle`     | `boolean` | `onClick` toggles between this state and base                    |
| `terminal`   | `boolean` | Not interaction-triggered; emitted as sibling with `visibleWhen` |
| `prop`       | `string`  | Direct prop to set on the element (used by `disabled`)           |

---

## Adding responsive support for a new field

To make a new section-level field responsive (a `[mobileValue, desktopValue]` tuple when mobile ≠ desktop):

Add the field name to `SECTION_RESPONSIVE_KEYS` in `src/converters/responsive-merge.ts`:

```ts
export const SECTION_RESPONSIVE_KEYS: Set<string> = new Set([
  // existing fields...
  "myNewField",
]);
```

For element-level fields, add to `ELEMENT_RESPONSIVE_KEYS` in the same file.

---

## ConversionContext contract

Every converter that creates assets, emits warnings, or generates IDs must follow this contract:

- **Never generate IDs directly**. Always use `ensureUniqueId(slugify(name), ctx.usedIds)`. This registers the ID in `ctx.usedIds` and appends a counter if needed.
- **Never generate asset filenames directly**. Always use `buildAssetKey(rawName, ctx)` from `src/utils/asset-key.ts`. This handles CDN prefix and collision detection.
- **Never throw for non-fatal issues**. Push to `ctx.warnings` and return `null` or a degraded result.
- **Always push to `ctx.assets`** when storing a binary asset. Never write to disk directly.
- **Pass `ctx` through all nested calls** without modifying its structure — only mutate `assets`, `warnings`, `assetCounter`, `usedIds`, and `usedAssetKeys`.

---

## Testing

```bash
# Build
cd tools/figma-plugin
npm run build

# Load in Figma Desktop
# Plugins → Development → Import plugin from manifest → select manifest.json
# Select a test frame → run plugin → inspect the ZIP output

# Validate the exported JSON against the runtime schema
cd /Users/lucwarre/WEB/notlukagray
npx tsx scripts/validate-pages.ts
```

Watch mode during development:

```bash
cd tools/figma-plugin
npm run watch
```

Figma Desktop reloads the plugin automatically when `dist/main.js` or `dist/ui.html` changes.

---

[Back to README](./README.md) | [Architecture](./01-architecture.md) | [Annotation system](./02-annotation-system.md)
