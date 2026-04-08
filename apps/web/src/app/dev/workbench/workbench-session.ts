import {
  COLOR_TOOL_LEGACY_STORAGE_KEY,
  type ColorToolPersistedV2,
} from "@/app/dev/colors/color-tool-persistence";
import { STORAGE_KEY as BODY_ELEMENT_LEGACY_KEY } from "@/app/dev/elements/body/constants";
import { STORAGE_KEY as HEADING_ELEMENT_LEGACY_KEY } from "@/app/dev/elements/heading/constants";
import { STORAGE_KEY as IMAGE_ELEMENT_LEGACY_KEY } from "@/app/dev/elements/image/constants";
import { STORAGE_KEY as LINK_ELEMENT_LEGACY_KEY } from "@/app/dev/elements/link/constants";
import {
  getDefaultWorkbenchSession,
  getProductionWorkbenchSession,
  isWorkbenchStorageJsonComplete,
  mergeWorkbenchSessionWithDefaults,
  type WorkbenchSessionV1,
} from "@/app/dev/workbench/workbench-defaults";
import {
  STYLE_TOOL_LEGACY_STORAGE_KEY_V1,
  STYLE_TOOL_LEGACY_STORAGE_KEY_V2,
  type StyleToolPersistedV2,
} from "@/app/dev/style/style-tool-persistence";
import {
  parseImportedWorkbenchSessionJson,
  type WorkbenchSessionV1InFlight,
} from "@/app/dev/workbench/workbench-session-import";
import { migrateLegacyIntoSession } from "@/app/dev/workbench/workbench-session-legacy-migration";

export type { WorkbenchSessionV1 } from "@/app/dev/workbench/workbench-defaults";

export type WorkbenchElementKey = keyof WorkbenchSessionV1["elements"];

export const WORKBENCH_SESSION_STORAGE_KEY = "workbench-session-v1";

/** Named bookmark written by “Save” in the workbench nav (separate from the live session). */
export const WORKBENCH_SESSION_BOOKMARK_KEY = "workbench-session-bookmark-v1";

/** Dispatched after Load bookmark or Import so mounted tools resync in the same tab (storage events are other-tabs only). */
export const WORKBENCH_SESSION_CHANGED_EVENT = "pb-workbench-session-changed";

export const FONT_DEV_LEGACY_STORAGE_KEY = "notlukagray-font-dev-prefs-v1";

export const WORKBENCH_LEGACY_LOCAL_STORAGE_KEYS = [
  COLOR_TOOL_LEGACY_STORAGE_KEY,
  FONT_DEV_LEGACY_STORAGE_KEY,
  STYLE_TOOL_LEGACY_STORAGE_KEY_V1,
  STYLE_TOOL_LEGACY_STORAGE_KEY_V2,
  IMAGE_ELEMENT_LEGACY_KEY,
  BODY_ELEMENT_LEGACY_KEY,
  HEADING_ELEMENT_LEGACY_KEY,
  LINK_ELEMENT_LEGACY_KEY,
] as const;

export const ALL_WORKBENCH_DEV_STORAGE_KEYS = [
  WORKBENCH_SESSION_STORAGE_KEY,
  WORKBENCH_SESSION_BOOKMARK_KEY,
  ...WORKBENCH_LEGACY_LOCAL_STORAGE_KEYS,
] as const;

function readParsedOnly(): WorkbenchSessionV1InFlight | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem(WORKBENCH_SESSION_STORAGE_KEY);
    if (!raw) return null;
    const p = JSON.parse(raw) as Partial<WorkbenchSessionV1>;
    if (p?.v !== 1) return null;
    return p as WorkbenchSessionV1InFlight;
  } catch {
    return null;
  }
}

export function clearWorkbenchLegacyLocalStorageKeys(): void {
  if (typeof window === "undefined") return;
  for (const k of WORKBENCH_LEGACY_LOCAL_STORAGE_KEYS) {
    try {
      localStorage.removeItem(k);
    } catch {
      /* ignore */
    }
  }
}

export function dispatchWorkbenchSessionChanged(): void {
  if (typeof window === "undefined") return;
  window.dispatchEvent(new CustomEvent(WORKBENCH_SESSION_CHANGED_EVENT));
}

export function applyImportedWorkbenchSession(session: WorkbenchSessionV1InFlight): void {
  clearWorkbenchLegacyLocalStorageKeys();
  saveWorkbenchSession(session);
  dispatchWorkbenchSessionChanged();
}

export function saveWorkbenchBookmark(): void {
  if (typeof window === "undefined") return;
  try {
    const s = getWorkbenchSession();
    localStorage.setItem(WORKBENCH_SESSION_BOOKMARK_KEY, JSON.stringify(s));
  } catch {
    /* ignore quota / private mode */
  }
}

export function loadWorkbenchBookmark(): { ok: true } | { ok: false; error: string } {
  if (typeof window === "undefined") return { ok: false, error: "Not available" };
  try {
    const raw = localStorage.getItem(WORKBENCH_SESSION_BOOKMARK_KEY);
    if (raw == null || raw.trim() === "") return { ok: false, error: "No saved snapshot yet" };
    const r = parseImportedWorkbenchSessionJson(raw);
    if (!r.ok) return r;
    applyImportedWorkbenchSession(r.session);
    return { ok: true };
  } catch {
    return { ok: false, error: "Could not load snapshot" };
  }
}

export function importWorkbenchSessionFromJson(
  raw: string
): { ok: true } | { ok: false; error: string } {
  const r = parseImportedWorkbenchSessionJson(raw);
  if (!r.ok) return r;
  applyImportedWorkbenchSession(r.session);
  return { ok: true };
}

export function importWorkbenchProductionDefaults(): { ok: true } {
  applyImportedWorkbenchSession(getProductionWorkbenchSession());
  return { ok: true };
}

export function exportWorkbenchSessionJson(): string {
  return JSON.stringify(getWorkbenchSession(), null, 2);
}

/** Persist canonical full session (merges any missing slices from defaults). */
export function saveWorkbenchSession(session: WorkbenchSessionV1InFlight): void {
  if (typeof window === "undefined") return;
  const complete = mergeWorkbenchSessionWithDefaults(session);
  try {
    localStorage.setItem(WORKBENCH_SESSION_STORAGE_KEY, JSON.stringify(complete));
  } catch {
    /* quota / private mode */
  }
}

/**
 * Single canonical dev workbench snapshot: migrates legacy keys, merges defaults for any missing slice,
 * upgrades storage to a complete document when needed, and returns the full object.
 */
export function getWorkbenchSession(): WorkbenchSessionV1 {
  const base = readParsedOnly() ?? { v: 1 as const };
  const normalized: WorkbenchSessionV1InFlight = { ...base, v: 1 };
  const migratedDirty = migrateLegacyIntoSession(normalized);
  const complete = mergeWorkbenchSessionWithDefaults(normalized);
  const raw =
    typeof window !== "undefined" ? localStorage.getItem(WORKBENCH_SESSION_STORAGE_KEY) : null;
  if (migratedDirty || !isWorkbenchStorageJsonComplete(raw)) {
    try {
      localStorage.setItem(WORKBENCH_SESSION_STORAGE_KEY, JSON.stringify(complete));
    } catch {
      /* ignore */
    }
  }
  return complete;
}

export function patchWorkbenchColors(next: ColorToolPersistedV2): void {
  const s = getWorkbenchSession();
  try {
    localStorage.removeItem(COLOR_TOOL_LEGACY_STORAGE_KEY);
  } catch {
    /* ignore */
  }
  saveWorkbenchSession({ ...s, colors: next });
}

export function clearWorkbenchColors(): void {
  const s = getWorkbenchSession();
  const d = getDefaultWorkbenchSession();
  try {
    localStorage.removeItem(COLOR_TOOL_LEGACY_STORAGE_KEY);
  } catch {
    /* ignore */
  }
  saveWorkbenchSession({ ...s, colors: d.colors });
}

export function patchWorkbenchStyle(next: StyleToolPersistedV2): void {
  const s = getWorkbenchSession();
  try {
    localStorage.removeItem(STYLE_TOOL_LEGACY_STORAGE_KEY_V1);
    localStorage.removeItem(STYLE_TOOL_LEGACY_STORAGE_KEY_V2);
  } catch {
    /* ignore */
  }
  saveWorkbenchSession({ ...s, style: next });
}

export function clearWorkbenchStyle(): void {
  const s = getWorkbenchSession();
  const d = getDefaultWorkbenchSession();
  try {
    localStorage.removeItem(STYLE_TOOL_LEGACY_STORAGE_KEY_V2);
    localStorage.removeItem(STYLE_TOOL_LEGACY_STORAGE_KEY_V1);
  } catch {
    /* ignore */
  }
  saveWorkbenchSession({ ...s, style: d.style });
}

export function patchWorkbenchFonts(payload: unknown): void {
  const s = getWorkbenchSession();
  try {
    localStorage.removeItem(FONT_DEV_LEGACY_STORAGE_KEY);
  } catch {
    /* ignore */
  }
  saveWorkbenchSession({ ...s, fonts: payload as WorkbenchSessionV1["fonts"] });
}

export function clearWorkbenchFonts(): void {
  const s = getWorkbenchSession();
  const d = getDefaultWorkbenchSession();
  try {
    localStorage.removeItem(FONT_DEV_LEGACY_STORAGE_KEY);
  } catch {
    /* ignore */
  }
  saveWorkbenchSession({ ...s, fonts: d.fonts });
}

const ELEMENT_LEGACY_KEYS: Record<WorkbenchElementKey, string> = {
  image: IMAGE_ELEMENT_LEGACY_KEY,
  body: BODY_ELEMENT_LEGACY_KEY,
  heading: HEADING_ELEMENT_LEGACY_KEY,
  link: LINK_ELEMENT_LEGACY_KEY,
};

export function patchWorkbenchElement<K extends WorkbenchElementKey>(
  key: K,
  value: WorkbenchSessionV1["elements"][K]
): void {
  const s = getWorkbenchSession();
  try {
    localStorage.removeItem(ELEMENT_LEGACY_KEYS[key]);
  } catch {
    /* ignore */
  }
  saveWorkbenchSession({
    ...s,
    elements: { ...s.elements, [key]: value },
  });
}

export function clearWorkbenchElement<K extends WorkbenchElementKey>(key: K): void {
  const s = getWorkbenchSession();
  const d = getDefaultWorkbenchSession();
  try {
    localStorage.removeItem(ELEMENT_LEGACY_KEYS[key]);
  } catch {
    /* ignore */
  }
  saveWorkbenchSession({
    ...s,
    elements: { ...s.elements, [key]: d.elements[key] },
  });
}
