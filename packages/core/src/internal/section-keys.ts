import type { SectionBlock } from "./page-builder-schemas";

/** Normalize a value into a safe key part (alphanumeric + underscores). */
export function normalizeKeyPart(value: string, maxLen = 20): string {
  return value
    .slice(0, maxLen)
    .replace(/\s/g, "_")
    .replace(/[^a-zA-Z0-9_]/g, "_");
}

function safeHash(value: string, len: number): string {
  return String(value)
    .slice(0, len)
    .replace(/[^a-zA-Z0-9]/g, "_");
}

// Elements here are accessed with duck-typing (first.text, first.src) because the function
// reads common text/src fields across many element types without discriminating the union.
function keyFromElements(
  type: string,
  elements: Array<Record<string, unknown>>,
  index: number
): string | null {
  const first = elements[0];
  if (!first) return `${type}_${index}`;
  if (typeof first.text === "string")
    return `${type}_${normalizeKeyPart(first.text, 20)}_${first.text.length}`;
  if (typeof first.src === "string")
    return `${type}_${first.src.slice(-20).replace(/[^a-zA-Z0-9]/g, "_")}`;
  return null;
}

/** Stable key for a section (id when present, else type + content hints, fallback to index). */
export function generateSectionKey(section: SectionBlock, index: number): string {
  const type = section.type;
  if ("id" in section && typeof section.id === "string" && section.id)
    return `${type}_${section.id}`;
  if ("elements" in section && Array.isArray(section.elements) && section.elements.length > 0) {
    const k = keyFromElements(type, section.elements, index);
    if (k) return k;
  }
  if ("initialX" in section && section.initialX)
    return `${type}_x_${safeHash(String(section.initialX), 15)}`;
  if ("initialY" in section && section.initialY)
    return `${type}_y_${safeHash(String(section.initialY), 15)}`;
  const hasFixed =
    "fixed" in section && section.fixed && "fixedPosition" in section && section.fixedPosition;
  if (hasFixed) {
    return `${type}_fixed_${section.fixedPosition}`;
  }
  if (type === "sectionTrigger" && "id" in section && typeof section.id === "string" && section.id)
    return `${type}_${section.id}`;
  const hasSticky =
    "sticky" in section && section.sticky && "stickyOffset" in section && section.stickyOffset;
  if (hasSticky && "stickyOffset" in section && section.stickyOffset)
    return `${type}_offset_${safeHash(String(section.stickyOffset), 10)}`;
  return `${type}_${index}`;
}
