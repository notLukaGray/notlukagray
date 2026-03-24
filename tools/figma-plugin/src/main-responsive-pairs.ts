/**
 * Responsive pair detection: groups frames into normal frames,
 * desktop artboards, and mobile artboards; validates pairs.
 */

import type { ExportTarget, FrameIssue } from "./types/figma-plugin";
import { detectExportTarget } from "./main-frame-detect";

export interface ResponsivePairResult {
  normalFrames: FrameNode[];
  desktopFramesByKey: Map<string, FrameNode>;
  mobileFramesByKey: Map<string, FrameNode>;
  pairedKeys: Set<string>;
  tempCtxWarnings: string[];
}

/**
 * Splits a sorted frame list into normal frames, desktop/mobile artboard maps,
 * and a set of validated responsive pair keys.
 */
export function detectResponsivePairs(
  frames: FrameNode[],
  targetOverrides: Record<string, string>
): ResponsivePairResult {
  const desktopFramesByKey = new Map<string, FrameNode>();
  const mobileFramesByKey = new Map<string, FrameNode>();
  const normalFrames: FrameNode[] = [];

  for (const frame of frames) {
    const override = targetOverrides[frame.id];
    // Only auto-detect responsive roles — user overrides are never treated as pairs
    if (!override) {
      const t = detectExportTarget(frame);
      if ((t as ExportTarget & { responsiveRole?: string }).responsiveRole === "desktop") {
        desktopFramesByKey.set(t.key, frame);
        continue;
      }
      if ((t as ExportTarget & { responsiveRole?: string }).responsiveRole === "mobile") {
        mobileFramesByKey.set(t.key, frame);
        continue;
      }
    }
    normalFrames.push(frame);
  }

  // Validate pairs — warn and skip unpaired frames
  const pairedKeys = new Set<string>();
  const tempCtxWarnings: string[] = [];

  for (const key of desktopFramesByKey.keys()) {
    if (mobileFramesByKey.has(key)) {
      pairedKeys.add(key);
    } else {
      const frameName = desktopFramesByKey.get(key)!.name;
      tempCtxWarnings.push(
        `[responsive] Frame "${frameName}" has Section[Desktop]/ prefix but no matching Section[Mobile]/${key} counterpart — skipped`
      );
    }
  }
  for (const key of mobileFramesByKey.keys()) {
    if (!desktopFramesByKey.has(key)) {
      const frameName = mobileFramesByKey.get(key)!.name;
      tempCtxWarnings.push(
        `[responsive] Frame "${frameName}" has Section[Mobile]/ prefix but no matching Section[Desktop]/${key} counterpart — skipped`
      );
    }
  }

  return { normalFrames, desktopFramesByKey, mobileFramesByKey, pairedKeys, tempCtxWarnings };
}

export interface PreviewItem {
  id: string;
  name: string;
  target: ExportTarget;
  issues: FrameIssue[];
  responsivePairKey?: string;
}
