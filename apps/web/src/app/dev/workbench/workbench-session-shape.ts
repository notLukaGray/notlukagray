type WorkbenchElementsShape = {
  image: unknown;
  body: unknown;
  heading: unknown;
  link: unknown;
};

type WorkbenchShape = {
  v: 2;
  colors: unknown;
  fonts: unknown;
  style: unknown;
  elements: WorkbenchElementsShape;
};

type WorkbenchInFlight = Partial<Omit<WorkbenchShape, "elements">> & {
  v?: 2;
  elements?: Partial<WorkbenchShape["elements"]>;
};

function isRecord(value: unknown): value is Record<string, unknown> {
  return value !== null && typeof value === "object";
}

function deepMergeRecord(defaults: unknown, patch: unknown): unknown {
  if (!isRecord(defaults) || !isRecord(patch)) return patch ?? defaults;
  const out: Record<string, unknown> = { ...defaults };
  for (const [key, value] of Object.entries(patch)) {
    if (value === undefined) continue;
    out[key] = deepMergeRecord(out[key], value);
  }
  return out;
}

function mergeElements(
  elements: WorkbenchInFlight["elements"],
  defaults: WorkbenchShape["elements"]
): WorkbenchShape["elements"] {
  const merged = { ...defaults };
  if (!elements) return merged;
  if (elements.image != null) merged.image = elements.image;
  if (elements.body != null) merged.body = elements.body;
  if (elements.heading != null) merged.heading = elements.heading;
  if (elements.link != null) merged.link = elements.link;
  return merged;
}

export function mergeWorkbenchSessionShape(
  session: WorkbenchInFlight,
  defaults: WorkbenchShape
): WorkbenchShape {
  return {
    v: 2,
    colors: deepMergeRecord(defaults.colors, session.colors),
    fonts: deepMergeRecord(defaults.fonts, session.fonts),
    style: deepMergeRecord(defaults.style, session.style),
    elements: mergeElements(session.elements, defaults.elements),
  };
}

function hasRequiredElements(elements: unknown): boolean {
  if (!isRecord(elements)) return false;
  return (
    elements.image != null &&
    elements.body != null &&
    elements.heading != null &&
    elements.link != null
  );
}

export function hasCompleteWorkbenchStorageShape(raw: string | null): boolean {
  if (!raw || raw.trim() === "") return false;
  try {
    const parsed = JSON.parse(raw) as Record<string, unknown>;
    return (
      parsed.v === 2 &&
      parsed.colors != null &&
      parsed.fonts != null &&
      parsed.style != null &&
      hasRequiredElements(parsed.elements)
    );
  } catch {
    return false;
  }
}
