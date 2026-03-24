/**
 * Core annotation parsing — layer-name [pb: key=value] extraction and helpers.
 */

const ANNOTATION_REGEX_GLOBAL = /\[pb:\s*([^\]]+)\]/gi;

const ELEMENT_SUPPORTED_ANNOTATION_KEYS = new Set([
  "type",
  "label",
  "href",
  "action",
  "variant",
  "size",
  "disabled",
  "objectposition",
  "src",
  "poster",
  "autoplay",
  "loop",
  "muted",
  "showplaybutton",
  "objectfit",
  "module",
  "seo",
  "style",
  "variablekey",
  "contentkey",
  "hidden",
  "opacity",
  "blendmode",
  "overflow",
  "fliph",
  "flipv",
  "arialabel",
  "ariarole",
  "ariahidden",
  "zindex",
  "visiblewhen",
  "cursor",
  "hardswap",
  "entrance",
  "exit",
  "trigger",
  "duration",
  "delay",
  "ease",
  "stiffness",
  "damping",
  "viewportamount",
  "onclick",
  "onhoverenter",
  "onhoverleave",
  "onpointerdown",
  "onpointerup",
  "ondoubleclick",
  "ondragend",
]);

const SECTION_SUPPORTED_ANNOTATION_KEYS = new Set([
  "type",
  "fill",
  "overflow",
  "hidden",
  "onscrolldown",
  "onscrollup",
  "sticky",
  "stickyoffset",
  "stickyposition",
  "visiblewhen",
  "scrollopacity",
  "triggeronce",
  "threshold",
  "rootmargin",
  "delay",
  "arialabel",
  "onvisible",
  "oninvisible",
  "scrollspeed",
  "initialrevealed",
  "expandaxis",
  "revealpreset",
  "expanddurationms",
  "externaltriggerkey",
  "triggermode",
  "entrance",
  "exit",
  "trigger",
  "duration",
  "ease",
  "stiffness",
  "damping",
  "viewportamount",
]);

const SECTION_SUPPORTED_ANNOTATION_FAMILIES = [
  "timer",
  "timerinterval",
  "key",
  "idle",
  "cursor",
  "effect",
] as const;

/**
 * Parses page-builder annotations from a Figma layer name.
 * Syntax: "Layer Name [pb: key=value, key2=value2]"
 * Returns key/value map (empty object if no annotation found).
 *
 * @example
 * parseAnnotations('Hero [pb: type=button, href=/about]')
 * // → { type: "button", href: "/about" }
 */
export function parseAnnotations(name: string): Record<string, string> {
  const matches = [...name.matchAll(/\[pb:\s*([^\]]+)\]/gi)];
  const match = matches.length > 0 ? matches[matches.length - 1] : null;
  if (!match) return {};

  const result: Record<string, string> = {};
  const pairs = match[1].split(",");

  for (const pair of pairs) {
    const eqIndex = pair.indexOf("=");
    if (eqIndex === -1) {
      const key = pair.trim().toLowerCase();
      if (key) result[key] = "true";
      continue;
    }
    const key = pair.slice(0, eqIndex).trim().toLowerCase();
    const value = pair.slice(eqIndex + 1).trim();
    if (key) result[key] = value;
  }

  return result;
}

function isSupportedAnnotationKey(
  key: string,
  supportedKeys: ReadonlySet<string>,
  supportedFamilies: readonly string[]
): boolean {
  if (supportedKeys.has(key)) return true;

  for (const family of supportedFamilies) {
    if (key === family) return true;
    if (key.startsWith(family)) {
      const suffix = key.slice(family.length);
      if (suffix.length > 0 && /^[0-9]+$/.test(suffix)) return true;
    }
  }

  return false;
}

/**
 * Returns annotation keys that are not recognized by the exporter/designer
 * converters for the current context.
 */
export function findUnsupportedAnnotationKeys(
  annotations: Record<string, string>,
  supportedKeys: ReadonlySet<string>,
  supportedFamilies: readonly string[] = []
): string[] {
  return Object.keys(annotations).filter(
    (key) => !isSupportedAnnotationKey(key, supportedKeys, supportedFamilies)
  );
}

function collectAnnotationCandidateStrings(value: unknown, out: string[], depth = 0): void {
  if (depth > 2 || value == null) return;
  if (typeof value === "string") {
    if (value.includes("[pb:")) out.push(value);
    return;
  }
  if (Array.isArray(value)) {
    for (const item of value) collectAnnotationCandidateStrings(item, out, depth + 1);
    return;
  }
  if (typeof value === "object") {
    for (const nested of Object.values(value as Record<string, unknown>)) {
      collectAnnotationCandidateStrings(nested, out, depth + 1);
    }
  }
}

type NodeAnnotationLike = {
  label?: string;
  labelMarkdown?: string;
};

/**
 * Best-effort annotation extraction from a live Figma node.
 * Prefers `[pb: ...]` embedded in `name`, but also scans annotation-like fields because
 * some Figma surfaces expose annotations separately from the layer name.
 */
export function parseNodeAnnotations(
  node: { name?: string } & Record<string, unknown>
): Record<string, string> {
  const fromName = parseAnnotations(node.name ?? "");
  if (Object.keys(fromName).length > 0) return fromName;

  const nodeAnnotations = (node as { annotations?: readonly NodeAnnotationLike[] }).annotations;
  if (Array.isArray(nodeAnnotations)) {
    for (const ann of nodeAnnotations) {
      const parsed = parseAnnotations(ann.label ?? ann.labelMarkdown ?? "");
      if (Object.keys(parsed).length > 0) return parsed;
    }
  }

  const candidates: string[] = [];
  for (const [key, value] of Object.entries(node)) {
    if (
      key.toLowerCase().includes("annotation") ||
      key.toLowerCase().includes("description") ||
      (typeof value === "string" && value.includes("[pb:"))
    ) {
      collectAnnotationCandidateStrings(value, candidates);
    }
  }

  for (const candidate of candidates) {
    const parsed = parseAnnotations(candidate);
    if (Object.keys(parsed).length > 0) return parsed;
  }

  return {};
}

export {
  ELEMENT_SUPPORTED_ANNOTATION_KEYS,
  SECTION_SUPPORTED_ANNOTATION_KEYS,
  SECTION_SUPPORTED_ANNOTATION_FAMILIES,
};

/**
 * Returns the layer name with the [pb:...] annotation removed.
 */
export function stripAnnotations(name: string): string {
  return name
    .replace(ANNOTATION_REGEX_GLOBAL, "")
    .replace(/\s{2,}/g, " ")
    .trim();
}

/**
 * Returns true if the annotation map contains the given key with value "true"
 * or if the key exists as a bare flag (empty string).
 */
export function annotationFlag(annotations: Record<string, string>, key: string): boolean {
  return annotations[key] === "true" || annotations[key] === "";
}

/**
 * Returns a numeric annotation value or undefined.
 */
export function annotationNumber(
  annotations: Record<string, string>,
  key: string
): number | undefined {
  const v = annotations[key];
  if (v === undefined) return undefined;
  const n = parseFloat(v);
  return isNaN(n) ? undefined : n;
}

/**
 * Parses a JSON-like value string: "true"/"false" → boolean, numeric → number, else string.
 */
export function parseAnnotationValue(v: string): string | number | boolean {
  if (v === "true") return true;
  if (v === "false") return false;
  const n = Number(v);
  if (!isNaN(n) && v.trim() !== "") return n;
  return v;
}

// ---------------------------------------------------------------------------
// Semantic text style annotation
// ---------------------------------------------------------------------------

const SEO_HEADING_RE = /^h([1-6])$/i;
const HEADING_STYLE_RE = /^h([1-6])$/i;
const BODY_STYLE_RE = /^body([1-6])$/i;

/**
 * Describes the semantic text style resolved from a [pb: style=...] annotation.
 */
export interface SemanticTextStyle {
  elementType: "elementHeading" | "elementBody";
  level: number;
}

/**
 * Parses the semantic style keys from an annotation map and returns the corresponding
 * SemanticTextStyle, or `null` if absent or unrecognised.
 */
export function parseTextStyleAnnotation(
  annotations: Record<string, string>
): SemanticTextStyle | null {
  const seoRaw = annotations["seo"];
  if (seoRaw) {
    const seoMatch = SEO_HEADING_RE.exec(seoRaw);
    if (seoMatch) {
      return { elementType: "elementHeading", level: parseInt(seoMatch[1], 10) };
    }
  }

  const raw = annotations["style"];
  if (!raw) return null;

  const headingMatch = HEADING_STYLE_RE.exec(raw);
  if (headingMatch) {
    return { elementType: "elementHeading", level: parseInt(headingMatch[1], 10) };
  }

  const bodyMatch = BODY_STYLE_RE.exec(raw);
  if (bodyMatch) {
    return { elementType: "elementBody", level: parseInt(bodyMatch[1], 10) };
  }

  return null;
}
