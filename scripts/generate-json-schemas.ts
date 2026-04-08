#!/usr/bin/env npx tsx

/**
 * Generate JSON Schema files from Zod schemas for editor support.
 *
 * VSCode/Cursor use these schemas to provide autocomplete, validation, and
 * hover docs when editing page/section/module JSON files—so you get
 * schema-backed "variables" (property names, types, enums) without memorizing.
 *
 * Usage:
 *   npm run generate-json-schemas
 *
 * Output:
 *   page-builder.schema.json       — page files (work/*.json)
 *   definition-block.schema.json    — section/preset blocks (work/slug/*.json, presets/*.json)
 *   definitions-file.schema.json    — sections file (work/*-sections.json)
 *   module.schema.json              — module files (modules/*.json)
 *
 * Wire-up: .vscode/settings.json maps these to file patterns via json.schemas.
 */

import * as fs from "fs";
import * as path from "path";
import { z } from "zod";
import {
  pageBuilderSchema,
  pageBuilderDefinitionBlockSchema,
  moduleBlockSchema,
} from "@pb/contracts";

// Sections file: work/slug-sections.json has only { definitions: { ... } }
const definitionsFileSchema = z.object({
  definitions: z.record(z.string(), pageBuilderDefinitionBlockSchema),
});

const APP_ROOT = fs.existsSync(path.join(process.cwd(), "src/content"))
  ? process.cwd()
  : path.join(process.cwd(), "apps/web");

const SCHEMAS_DIR = path.join(APP_ROOT, "src/content/schemas");

const toJSONSchemaOptions = {
  target: "draft-2020-12" as const,
  unrepresentable: "any" as const,
  cycles: "ref" as const,
};

/** Keys we never want to be required in JSON schemas (legacy entrance fields removed from element schema). */
const ENTRANCE_REQUIRED_KEYS = new Set([
  "animate",
  "entranceAmount",
  "entranceOnce",
  "entranceDuration",
  "entranceDelay",
  "entranceDistance",
  "entranceEase",
]);

/** Recursively walk a JSON Schema object and strip entrance* keys from any "required" arrays. */
function stripEntranceFromRequired(schema: unknown): unknown {
  if (!schema || typeof schema !== "object") return schema;

  if (Array.isArray(schema)) {
    return schema.map((item) => stripEntranceFromRequired(item));
  }

  const obj = schema as Record<string, unknown>;

  if (Array.isArray(obj.required)) {
    obj.required = (obj.required as unknown[]).filter(
      (key) => typeof key === "string" && !ENTRANCE_REQUIRED_KEYS.has(key)
    );
  }

  // If this is a contentBlock section definition, make sure reorderable & friends are allowed.
  if (obj.properties && typeof obj.properties === "object") {
    const props = obj.properties as Record<string, unknown>;
    const typeProp = props.type as { const?: unknown } | undefined;
    if (typeProp && typeof typeProp === "object" && typeProp.const === "contentBlock") {
      if (!props.reorderable) props.reorderable = { type: "boolean" };
      if (!props.reorderAxis) {
        props.reorderAxis = {
          type: "string",
          enum: ["x", "y"],
        };
      }
      if (!props.reorderDragUnit) {
        props.reorderDragUnit = {
          type: "string",
          enum: ["frame", "content"],
        };
      }
      if (!props.reorderDragBehavior) {
        props.reorderDragBehavior = {
          type: "string",
          enum: ["elasticSnap", "free", "none"],
        };
      }
    }
  }

  for (const [k, v] of Object.entries(obj)) {
    obj[k] = stripEntranceFromRequired(v);
  }

  return obj;
}

/**
 * Returns true for objects that are substantial enough to be worth extracting
 * into $defs. Skips primitives, bare $ref nodes, and trivially small objects.
 */
function isSubstantial(node: Record<string, unknown>): boolean {
  const keys = Object.keys(node);
  // Skip bare $ref nodes — already a reference
  if (keys.length === 1 && keys[0] === "$ref") return false;
  // Skip tiny schemas like { type: "string" } or { type: "boolean" }
  if (keys.length <= 2 && !("properties" in node) && !("anyOf" in node) && !("oneOf" in node)) {
    return false;
  }
  return true;
}

/**
 * Post-process a JSON Schema to deduplicate repeated inline definitions into $defs.
 * This dramatically reduces file size (12–14 MB → ~150 KB) by using $ref instead of
 * inlining the same schema hundreds of times.
 */
function deduplicateRefs(schema: Record<string, unknown>): Record<string, unknown> {
  // Pass 1: walk and fingerprint every object node, count occurrences
  const fingerprintCount = new Map<string, number>();
  const fingerprintToNode = new Map<string, Record<string, unknown>>();

  function countNode(node: unknown): void {
    if (!node || typeof node !== "object") return;

    if (Array.isArray(node)) {
      for (const item of node) countNode(item);
      return;
    }

    const obj = node as Record<string, unknown>;

    // Don't fingerprint the top-level schema itself
    const fp = JSON.stringify(obj);
    if (isSubstantial(obj)) {
      fingerprintCount.set(fp, (fingerprintCount.get(fp) ?? 0) + 1);
      if (!fingerprintToNode.has(fp)) {
        fingerprintToNode.set(fp, obj);
      }
    }

    for (const v of Object.values(obj)) {
      countNode(v);
    }
  }

  // Count all nodes except the root itself
  for (const v of Object.values(schema)) {
    countNode(v);
  }

  // Pass 2: build $defs for nodes seen more than once
  const defs: Record<string, Record<string, unknown>> = {};
  // Preserve any existing $defs from Zod's cycle handling
  if (schema.$defs && typeof schema.$defs === "object" && !Array.isArray(schema.$defs)) {
    Object.assign(defs, schema.$defs as Record<string, unknown>);
  }

  const fingerprintToDef = new Map<string, string>();
  let counter = 0;

  for (const [fp, count] of fingerprintCount) {
    if (count < 2) continue;
    const node = fingerprintToNode.get(fp)!;
    // Don't re-extract nodes that are already a $ref
    if ("$ref" in node && Object.keys(node).length === 1) continue;

    // Derive a name from the node's title field, or from a counter
    let name: string;
    if (typeof node.title === "string" && node.title.length > 0) {
      // Sanitize: remove spaces and special chars, keep alphanumerics
      const base = node.title.replace(/[^a-zA-Z0-9_]/g, "");
      // Make unique in case two distinct nodes share a title
      name = base in defs ? `${base}_${++counter}` : base;
    } else {
      name = `Def${++counter}`;
    }

    defs[name] = node;
    fingerprintToDef.set(fp, name);
  }

  // Pass 3: walk the schema again, replacing duplicate occurrences with $ref
  // We skip the very first occurrence so the def itself stays intact in $defs.
  const fingerprintSeenCount = new Map<string, number>();

  function replaceNode(node: unknown): unknown {
    if (!node || typeof node !== "object") return node;

    if (Array.isArray(node)) {
      return node.map((item) => replaceNode(item));
    }

    const obj = node as Record<string, unknown>;
    const fp = JSON.stringify(obj);

    if (isSubstantial(obj) && fingerprintToDef.has(fp)) {
      const seen = fingerprintSeenCount.get(fp) ?? 0;
      fingerprintSeenCount.set(fp, seen + 1);
      // Always replace with a $ref — the canonical copy lives in $defs
      return { $ref: `#/$defs/${fingerprintToDef.get(fp)}` };
    }

    // Recurse into children
    const result: Record<string, unknown> = {};
    for (const [k, v] of Object.entries(obj)) {
      if (k === "$defs") {
        // Skip existing $defs — we'll re-attach them at the end
        continue;
      }
      result[k] = replaceNode(v);
    }
    return result;
  }

  // Build the deduplicated schema body (without $defs key)
  const deduped = replaceNode(schema) as Record<string, unknown>;

  // Re-run deduplication on the $defs themselves so shared sub-schemas
  // inside $defs are also collapsed — but only one level to avoid cycles
  const deduplicatedDefs: Record<string, unknown> = {};
  for (const [name, defNode] of Object.entries(defs)) {
    deduplicatedDefs[name] = replaceNode(defNode);
  }

  // Return with $defs prepended
  const { $defs: _removed, ...rest } = deduped;
  void _removed;

  return {
    ...(Object.keys(deduplicatedDefs).length > 0 ? { $defs: deduplicatedDefs } : {}),
    ...rest,
  };
}

function writeSchemaFile(filename: string, schema: object): void {
  const filePath = path.join(SCHEMAS_DIR, filename);
  const cleaned = stripEntranceFromRequired(schema) as Record<string, unknown>;
  const deduped = deduplicateRefs(cleaned);
  const wrapped = {
    $schema: "https://json-schema.org/draft/2020-12/schema",
    $id: filename,
    ...deduped,
  };
  fs.mkdirSync(SCHEMAS_DIR, { recursive: true });
  fs.writeFileSync(filePath, JSON.stringify(wrapped, null, 2), "utf-8");
  const stats = fs.statSync(filePath);
  process.stdout.write(`  ✓ ${filename} (${(stats.size / 1024).toFixed(1)} KB)\n`);
}

function main(): void {
  process.stdout.write("Generating JSON schemas...\n");

  // Page: full page JSON (work/slug.json, work/foo.json)
  process.stdout.write("  → page-builder.schema.json\n");
  const pageSchema = z.toJSONSchema(pageBuilderSchema, toJSONSchemaOptions);
  if (pageSchema && typeof pageSchema === "object") {
    writeSchemaFile("page-builder.schema.json", pageSchema as object);
  }

  // Definition block: section files (work/slug/nav.json) and preset blocks (presets/*.json)
  process.stdout.write("  → definition-block.schema.json\n");
  const definitionSchema = z.toJSONSchema(pageBuilderDefinitionBlockSchema, toJSONSchemaOptions);
  if (definitionSchema && typeof definitionSchema === "object") {
    writeSchemaFile("definition-block.schema.json", definitionSchema as object);
  }

  // Module: module JSON (modules/*.json)
  process.stdout.write("  → module.schema.json\n");
  const moduleSchema = z.toJSONSchema(moduleBlockSchema, toJSONSchemaOptions);
  if (moduleSchema && typeof moduleSchema === "object") {
    writeSchemaFile("module.schema.json", moduleSchema as object);
  }

  // Definitions-only file: work/slug-sections.json
  process.stdout.write("  → definitions-file.schema.json\n");
  const definitionsFile = z.toJSONSchema(definitionsFileSchema, toJSONSchemaOptions);
  if (definitionsFile && typeof definitionsFile === "object") {
    writeSchemaFile("definitions-file.schema.json", definitionsFile as object);
  }

  process.stdout.write("Done.\n");
}

main();
