import fs from "fs";
import path from "path";
import { isSafePathSegment, resolvePathUnder } from "./page-builder-paths";
import type { ModalBuilderFromSchema, PageBuilderDefinitionBlock } from "@pb/contracts";
import { modalBuilderSchema, MOTION_DEFAULTS, sectionEffectSchema } from "@pb/contracts";
import type { ModalTransitionConfig } from "./modal-types";
import { motionPropsSchema } from "@pb/contracts";
import { CONTENT_DIR } from "./load/page-builder-load-io";

const MODALS_DIR = path.join(CONTENT_DIR, "modals");

function parseJsonSafe<T = unknown>(
  raw: string
): { ok: true; data: T } | { ok: false; error: unknown } {
  try {
    return { ok: true, data: JSON.parse(raw) as T };
  } catch (err) {
    return { ok: false, error: err };
  }
}

function readModalJson(id: string): Record<string, unknown> | null {
  if (!isSafePathSegment(id)) return null;
  const modalPath = resolvePathUnder(MODALS_DIR, `${id}.json`);
  if (!modalPath || !fs.existsSync(modalPath)) return null;
  const raw = fs.readFileSync(modalPath, "utf-8");
  const result = parseJsonSafe<Record<string, unknown>>(raw);
  if (!result.ok) return null;
  return { ...result.data, id } as Record<string, unknown>;
}

function getDefinitionsForModal(
  withId: Record<string, unknown>,
  id: string
): Record<string, PageBuilderDefinitionBlock> {
  const definitions = withId.definitions as Record<string, PageBuilderDefinitionBlock> | undefined;
  if (
    definitions != null &&
    typeof definitions === "object" &&
    Object.keys(definitions).length > 0
  ) {
    return { ...definitions };
  }
  if (isSafePathSegment(id)) {
    const sectionsPath = resolvePathUnder(MODALS_DIR, `${id}-sections.json`);
    if (sectionsPath && fs.existsSync(sectionsPath)) {
      const sectionsRaw = fs.readFileSync(sectionsPath, "utf-8");
      const result = parseJsonSafe<Record<string, unknown>>(sectionsRaw);
      if (
        result.ok &&
        result.data?.definitions != null &&
        typeof result.data.definitions === "object"
      ) {
        return { ...(result.data.definitions as Record<string, PageBuilderDefinitionBlock>) };
      }
    }
  }
  return {};
}

function loadModalSectionFile(
  id: string,
  sectionKey: string,
  definitions: Record<string, PageBuilderDefinitionBlock>
): void {
  if (!isSafePathSegment(id) || !isSafePathSegment(sectionKey)) return;
  const sectionPath = resolvePathUnder(MODALS_DIR, id, `${sectionKey}.json`);
  if (!sectionPath || !fs.existsSync(sectionPath)) return;
  const raw = fs.readFileSync(sectionPath, "utf-8");
  const result = parseJsonSafe<Record<string, unknown>>(raw);
  if (!result.ok) return;
  const sectionData = result.data;
  const { definitions: sectionDefs } = sectionData as Record<string, unknown> & {
    definitions?: Record<string, unknown>;
  };
  if (sectionDefs != null && typeof sectionDefs === "object") {
    for (const [k, v] of Object.entries(sectionDefs)) {
      if (v != null && typeof v === "object") definitions[k] = v as PageBuilderDefinitionBlock;
    }
  }
  definitions[sectionKey] = sectionData as PageBuilderDefinitionBlock;
}

function hydrateModalSectionFiles(
  definitions: Record<string, PageBuilderDefinitionBlock>,
  id: string,
  sectionOrder: string[]
): void {
  if (!isSafePathSegment(id)) return;
  const idDir = resolvePathUnder(MODALS_DIR, id);
  if (!idDir || !fs.existsSync(idDir) || !fs.statSync(idDir).isDirectory()) return;
  for (const key of sectionOrder) {
    if (!isSafePathSegment(key)) continue;
    if (definitions[key] == null) loadModalSectionFile(id, key, definitions);
  }
}

/**
 * Modal definition: same structure as a page (sectionOrder + definitions) but for modal content.
 * Used as input to expandPageBuilder (with no bg) to get sections.
 */
export type ModalBuilder = ModalBuilderFromSchema;

/**
 * Load a modal by id from src/content/modals/<id>.json and modals/<id>/*.json.
 * Returns a ModalBuilder (sectionOrder + definitions) that can be expanded like a page (no bg).
 * Returns null if not found or invalid.
 */
export function loadModal(id: string): ModalBuilder | null {
  if (!isSafePathSegment(id)) return null;
  const withId = readModalJson(id);
  if (withId == null || !Array.isArray(withId.sectionOrder)) return null;

  const sectionOrder = withId.sectionOrder as string[];
  const definitions = getDefinitionsForModal(withId, id);
  hydrateModalSectionFiles(definitions, id, sectionOrder);

  const title = typeof withId.title === "string" ? withId.title : undefined;
  const rawTransition = withId.transition;
  let transition: ModalTransitionConfig;
  if (rawTransition != null && typeof rawTransition === "object" && !Array.isArray(rawTransition)) {
    const t = rawTransition as Record<string, unknown>;
    const enterMs =
      (MOTION_DEFAULTS.transition.enterDuration ?? MOTION_DEFAULTS.transition.duration) * 1000;
    const exitMs =
      (MOTION_DEFAULTS.transition.exitDuration ?? MOTION_DEFAULTS.transition.duration) * 1000;
    transition = {
      enterDurationMs: typeof t.enterDurationMs === "number" ? t.enterDurationMs : enterMs,
      exitDurationMs: typeof t.exitDurationMs === "number" ? t.exitDurationMs : exitMs,
      easing: typeof t.easing === "string" ? t.easing : MOTION_DEFAULTS.transition.ease,
    };
  } else {
    transition = {
      enterDurationMs:
        (MOTION_DEFAULTS.transition.enterDuration ?? MOTION_DEFAULTS.transition.duration) * 1000,
      exitDurationMs:
        (MOTION_DEFAULTS.transition.exitDuration ?? MOTION_DEFAULTS.transition.duration) * 1000,
      easing: MOTION_DEFAULTS.transition.ease,
    };
  }

  const motionResult = motionPropsSchema.safeParse(withId.motion);
  const motion = motionResult.success ? motionResult.data : undefined;
  const rawEffects = Array.isArray(withId.effects) ? withId.effects : undefined;
  const effects = rawEffects
    ?.map((effect) => sectionEffectSchema.safeParse(effect))
    .filter((result) => result.success)
    .map((result) => result.data);

  const modalCandidate: ModalBuilder = {
    id,
    title,
    sectionOrder,
    definitions,
    transition,
    ...(motion !== undefined ? { motion } : {}),
    ...(effects && effects.length > 0 ? { effects } : {}),
  };
  const modalParse = modalBuilderSchema.safeParse(modalCandidate);
  if (!modalParse.success) return null;
  return modalParse.data;
}
