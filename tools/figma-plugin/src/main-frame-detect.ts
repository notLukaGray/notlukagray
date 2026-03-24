/**
 * Export target detection from Figma frame names.
 * Uses the "Prefix/Name" naming convention to determine what kind of page-builder
 * artifact each frame maps to (page, preset, modal, module, global, etc.).
 */

import type { ExportTarget, ExportTargetType } from "./types/figma-plugin";
import { slugify } from "./utils/slugify";
import { stripAnnotations } from "./converters/annotations-parse";

const KNOWN_PREFIXES = new Set([
  "page",
  "section",
  "section[desktop]",
  "section[mobile]",
  "modal",
  "module",
  "button",
  "background",
  "global",
]);

function splitPrefixName(name: string): { prefix: string; rest: string; hasSlash: boolean } {
  const slashIdx = name.indexOf("/");
  if (slashIdx < 0) {
    return { prefix: "", rest: name, hasSlash: false };
  }

  return {
    prefix: name.slice(0, slashIdx).trim().toLowerCase(),
    rest: name.slice(slashIdx + 1).trim(),
    hasSlash: true,
  };
}

/**
 * Determines the export target for a Figma node based on its name prefix.
 * Uses the "/" naming convention: "Section/Hero Dark" → preset with key "hero-dark".
 * Falls back to "page" for frames with no recognized prefix.
 */
export function detectExportTarget(
  node: FrameNode | ComponentNode | ComponentSetNode
): ExportTarget {
  const name = stripAnnotations(node.name || "untitled");
  const { prefix, rest } = splitPrefixName(name);

  const key = slugify(rest || name);
  const label = rest || name;

  switch (prefix) {
    case "page":
      return { type: "page", key, label };
    case "section":
      return { type: "preset", key, label };
    // Responsive artboard prefixes — treated as presets; the pairing logic in
    // runExport will later merge desktop+mobile pairs before writing output.
    case "section[desktop]":
      return { type: "preset", key, label, responsiveRole: "desktop" } as ExportTarget;
    case "section[mobile]":
      return { type: "preset", key, label, responsiveRole: "mobile" } as ExportTarget;
    case "modal":
      return { type: "modal", key, label };
    case "module":
      return { type: "module", key, label };
    case "button":
      return { type: "global-button", key, label };
    case "background":
      return { type: "global-background", key, label };
    case "global":
      return { type: "global-element", key, label };
    default:
      return { type: "page", key: slugify(name), label: name };
  }
}

/**
 * Returns non-fatal prefix diagnostics for slash-based names.
 * These are warnings only; export target resolution still falls back to "page".
 */
export function getPrefixDiagnostics(node: FrameNode | ComponentNode | ComponentSetNode): string[] {
  const name = stripAnnotations(node.name || "untitled");
  const { prefix, rest, hasSlash } = splitPrefixName(name);
  const diagnostics: string[] = [];

  if (!hasSlash) return diagnostics;

  if (!rest) {
    diagnostics.push(`[prefix] Frame "${name}" has no name after "/".`);
  }

  if (!KNOWN_PREFIXES.has(prefix)) {
    diagnostics.push(
      `[prefix] Frame "${name}" uses unknown prefix "${prefix || "(empty)"}" and will default to page.`
    );
  }

  return diagnostics;
}

/**
 * Maps a dropdown string value (from the UI override) back to an ExportTarget.
 */
export function parseTargetOverride(value: string, frame: FrameNode): ExportTarget {
  const name = stripAnnotations(frame.name || "untitled");
  const { rest } = splitPrefixName(name);
  const key = slugify(rest || name);
  const label = rest || name;

  const typeMap: Record<string, ExportTargetType> = {
    page: "page",
    preset: "preset",
    modal: "modal",
    module: "module",
    button: "global-button",
    background: "global-background",
    global: "global-element",
    skip: "skip",
  };

  const resolvedType = typeMap[value.toLowerCase()] ?? "page";
  return { type: resolvedType, key, label };
}
