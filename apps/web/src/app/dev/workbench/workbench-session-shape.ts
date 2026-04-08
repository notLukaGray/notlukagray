type WorkbenchElementsShape = {
  image: unknown;
  body: unknown;
  heading: unknown;
  link: unknown;
};

type WorkbenchShape = {
  v: 1;
  colors: unknown;
  fonts: unknown;
  style: unknown;
  elements: WorkbenchElementsShape;
};

type WorkbenchInFlight = Partial<Omit<WorkbenchShape, "elements">> & {
  v?: 1;
  elements?: Partial<WorkbenchShape["elements"]>;
};

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
    v: 1,
    colors: session.colors ?? defaults.colors,
    fonts: session.fonts ?? defaults.fonts,
    style: session.style ?? defaults.style,
    elements: mergeElements(session.elements, defaults.elements),
  };
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return value !== null && typeof value === "object";
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
      parsed.v === 1 &&
      parsed.colors != null &&
      parsed.fonts != null &&
      parsed.style != null &&
      hasRequiredElements(parsed.elements)
    );
  } catch {
    return false;
  }
}
