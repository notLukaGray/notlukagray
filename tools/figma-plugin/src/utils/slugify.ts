/**
 * Converts Figma layer names to valid page-builder element IDs.
 */

/**
 * Converts a Figma layer name to a valid element ID string.
 * Result is lowercase, hyphen-separated, no spaces or special chars,
 * truncated to 64 characters.
 */
export function slugify(name: string): string {
  return (
    name
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9\s-]/g, "") // strip special chars except hyphens and spaces
      .replace(/[\s]+/g, "-") // spaces → hyphens
      .replace(/-{2,}/g, "-") // collapse multiple hyphens
      .replace(/^-+|-+$/g, "") // strip leading/trailing hyphens
      .slice(0, 64) || "element"
  ); // fallback if name reduces to empty
}

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
