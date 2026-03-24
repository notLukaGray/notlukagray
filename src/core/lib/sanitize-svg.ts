/**
 * Sanitize inline SVG markup for safe display (elementSVG). Treat as image: no scripts,
 * no external refs, no event handlers. Allowlist tags and attributes only.
 * Runs in browser (uses DOMParser); returns empty string during SSR.
 */

/** Allowlist of safe SVG tag names (lowercase). */
export const TAGS_ALLOWED = new Set([
  "svg",
  "g",
  "path",
  "circle",
  "rect",
  "ellipse",
  "line",
  "polygon",
  "polyline",
  "defs",
  "clippath",
  "mask",
  "lineargradient",
  "radialgradient",
  "stop",
  "title",
  "desc",
]);

/** Allowlist of safe attribute names (lowercase, no xlink prefix, no hyphens). */
export const ATTRS_ALLOWED = new Set([
  "viewbox",
  "width",
  "height",
  "preserveaspectratio",
  "xmlns",
  "d",
  "fill",
  "fillopacity",
  "stroke",
  "strokeopacity",
  "strokewidth",
  "strokelinecap",
  "strokelinejoin",
  "opacity",
  "transform",
  "x",
  "y",
  "x1",
  "y1",
  "x2",
  "y2",
  "cx",
  "cy",
  "r",
  "rx",
  "ry",
  "points",
  "id",
  "clippath",
  "cliprule",
  "fillrule",
  "gradientunits",
  "gradienttransform",
  "fx",
  "fy",
  "offset",
  "stopcolor",
  "stopopacity",
  "strokemiterlimit",
]);

const SHAPE_TAGS = new Set(["path", "circle", "rect", "ellipse", "polygon", "polyline", "line"]);

function normalizeAttrName(name: string): string {
  return name
    .toLowerCase()
    .replace(/^xlink:/, "")
    .replace(/-/g, "");
}

export function isAllowedTag(tagName: string): boolean {
  return TAGS_ALLOWED.has(tagName.toLowerCase());
}

export function isAllowedAttr(_tagName: string, attrName: string): boolean {
  const normalized = normalizeAttrName(attrName);
  if (normalized.startsWith("on")) return false;
  if (ATTRS_ALLOWED.has(normalized)) return true;
  if (normalized === "style") return true;
  return false;
}

export function sanitizeAttrValue(
  _tagName: string,
  attrName: string,
  value: string
): string | null {
  const v = value.trim().toLowerCase();
  if (v.startsWith("javascript:") || v.startsWith("data:") || v.startsWith("vbscript:"))
    return null;
  if (
    attrName
      .toLowerCase()
      .replace(/^xlink:/, "")
      .replace(/-/g, "") === "href" &&
    (v.startsWith("javascript:") || v.startsWith("data:"))
  )
    return null;
  return value.replace(/"/g, "&quot;").replace(/</g, "&lt;");
}

export function escapeText(text: string): string {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function serializeNode(node: Node, inheritedFill?: string): string {
  if (node.nodeType === Node.TEXT_NODE) {
    return escapeText(node.textContent ?? "");
  }
  if (node.nodeType !== Node.ELEMENT_NODE) return "";
  const el = node as Element;
  const tag = el.tagName.toLowerCase();
  if (!isAllowedTag(tag)) return "";

  const fill = el.getAttribute("fill");
  const hasFill = fill != null && fill !== "none" && fill !== "transparent";
  const currentFill = hasFill ? fill : inheritedFill;

  const attrs: string[] = [];
  for (const { name, value } of Array.from(el.attributes)) {
    if (!isAllowedAttr(tag, name)) continue;
    const safe = sanitizeAttrValue(tag, name, value);
    if (safe === null) continue;
    attrs.push(`${name}="${safe}"`);
  }

  if (SHAPE_TAGS.has(tag) && !hasFill && currentFill) {
    attrs.push(`fill="${currentFill.replace(/"/g, "&quot;")}"`);
  }

  const attrStr = attrs.length > 0 ? " " + attrs.join(" ") : "";
  const children = Array.from(el.childNodes)
    .map((child) => serializeNode(child, currentFill))
    .join("");
  return `<${tag}${attrStr}>${children}</${tag}>`;
}

/**
 * Sanitize SVG markup: allowlist tags and attributes, strip scripts and dangerous refs.
 * Returns empty string when DOM is not available (SSR).
 */
export function sanitizeSvgMarkup(markup: string): string {
  if (typeof document === "undefined" || typeof DOMParser === "undefined") return "";

  const trimmed = markup.trim();
  if (!trimmed) return "";

  try {
    const parser = new DOMParser();
    const doc = parser.parseFromString(trimmed, "image/svg+xml");
    const root = doc.documentElement;
    if (!root || root.tagName.toLowerCase() !== "svg") return "";

    return serializeNode(root);
  } catch {
    return "";
  }
}
