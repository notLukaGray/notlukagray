/**
 * Converts Figma layer names to valid page-builder element IDs.
 * `slugify` is canonical in figma-bridge — re-exported here to avoid duplication.
 */

export { slugify } from "../../../figma-bridge/src/slugify";

/**
 * Returns `id` if not in `usedIds`, otherwise appends `-2`, `-3`, etc.
 * Mutates `usedIds` by adding the returned ID.
 */
export function ensureUniqueId(id: string, usedIds: Set<string>): string {
  if (!usedIds.has(id)) {
    usedIds.add(id);
    return id;
  }

  let counter = 2;
  let candidate = `${id}-${counter}`;
  while (usedIds.has(candidate)) {
    counter++;
    candidate = `${id}-${counter}`;
  }

  usedIds.add(candidate);
  return candidate;
}
