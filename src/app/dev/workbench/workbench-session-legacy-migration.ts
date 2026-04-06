import { STORAGE_KEY as BODY_ELEMENT_LEGACY_KEY } from "@/app/dev/elements/body/constants";
import { STORAGE_KEY as HEADING_ELEMENT_LEGACY_KEY } from "@/app/dev/elements/heading/constants";
import { STORAGE_KEY as IMAGE_ELEMENT_LEGACY_KEY } from "@/app/dev/elements/image/constants";
import { STORAGE_KEY as LINK_ELEMENT_LEGACY_KEY } from "@/app/dev/elements/link/constants";
import { readColorToolFromLegacyLocalStorage } from "@/app/dev/colors/color-tool-persistence";
import { readStyleToolFromLegacyLocalStorage } from "@/app/dev/style/style-tool-persistence";
import type { WorkbenchSessionV1 } from "@/app/dev/workbench/workbench-defaults";
import type { WorkbenchSessionV1InFlight } from "@/app/dev/workbench/workbench-session-import";

const FONT_DEV_LEGACY_STORAGE_KEY = "notlukagray-font-dev-prefs-v1";

function tryParseJson(raw: string): unknown {
  try {
    return JSON.parse(raw);
  } catch {
    return undefined;
  }
}

function isLegacyFontsPayload(value: unknown): value is WorkbenchSessionV1["fonts"] {
  if (!value || typeof value !== "object") return false;
  const candidate = value as { v?: unknown; configs?: unknown };
  return candidate.v === 1 && candidate.configs != null && typeof candidate.configs === "object";
}

function migrateLegacyFonts(next: WorkbenchSessionV1InFlight): boolean {
  if (next.fonts != null) return false;
  const raw = localStorage.getItem(FONT_DEV_LEGACY_STORAGE_KEY);
  if (!raw) return false;
  const parsed = tryParseJson(raw);
  if (!isLegacyFontsPayload(parsed)) return false;
  next.fonts = parsed;
  return true;
}

function migrateLegacyElement<K extends keyof WorkbenchSessionV1["elements"]>(
  elements: Partial<WorkbenchSessionV1["elements"]>,
  key: K,
  storageKey: string
): boolean {
  if (elements[key] != null) return false;
  const raw = localStorage.getItem(storageKey);
  if (!raw) return false;
  const parsed = tryParseJson(raw);
  if (!parsed || typeof parsed !== "object") return false;
  elements[key] = parsed as WorkbenchSessionV1["elements"][K];
  return true;
}

const LEGACY_ELEMENT_ENTRIES: Array<[keyof WorkbenchSessionV1["elements"], string]> = [
  ["image", IMAGE_ELEMENT_LEGACY_KEY],
  ["body", BODY_ELEMENT_LEGACY_KEY],
  ["heading", HEADING_ELEMENT_LEGACY_KEY],
  ["link", LINK_ELEMENT_LEGACY_KEY],
];

function applyLegacyGlobalSlices(next: WorkbenchSessionV1InFlight): boolean {
  let dirty = false;
  const legacyColors = readColorToolFromLegacyLocalStorage();
  if (next.colors == null && legacyColors) {
    next.colors = legacyColors;
    dirty = true;
  }
  if (migrateLegacyFonts(next)) dirty = true;
  const legacyStyle = readStyleToolFromLegacyLocalStorage();
  if (next.style == null && legacyStyle) {
    next.style = legacyStyle;
    dirty = true;
  }
  return dirty;
}

function applyLegacyElements(
  next: WorkbenchSessionV1InFlight,
  elements: Partial<WorkbenchSessionV1["elements"]>
): boolean {
  let dirty = false;
  for (const [key, storageKey] of LEGACY_ELEMENT_ENTRIES) {
    if (migrateLegacyElement(elements, key, storageKey)) dirty = true;
  }
  if (Object.keys(elements).length > 0) next.elements = elements;
  else delete next.elements;
  return dirty;
}

export function migrateLegacyIntoSession(session: WorkbenchSessionV1InFlight): boolean {
  if (typeof window === "undefined") return false;
  const next: WorkbenchSessionV1InFlight = { ...session, v: 1 };
  const elements: Partial<WorkbenchSessionV1["elements"]> = { ...next.elements };
  const dirty = applyLegacyGlobalSlices(next) || applyLegacyElements(next, elements);
  Object.assign(session, next);
  return dirty;
}
