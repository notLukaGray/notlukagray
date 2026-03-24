import type { PageBuilderPage } from "./page-builder";

export interface AssetEntry {
  /** Relative path inside the ZIP, e.g. "assets/image-hero.png" */
  filename: string;
  data: Uint8Array;
}

export interface GlobalsOutput {
  buttons?: Record<string, unknown>;
  backgrounds?: Record<string, unknown>;
  elements?: Record<string, unknown>;
}

export interface ExportResult {
  /** All page exports. key = slug, value = PageBuilderPage */
  pages: Record<string, unknown>;
  /** All section preset exports. key = slug, value = section block */
  presets: Record<string, unknown>;
  /** All modal exports. key = slug, value = modal definition */
  modals: Record<string, unknown>;
  /** All module exports. key = slug, value = element block or module */
  modules: Record<string, unknown>;
  /** Global element registry — accumulated across all exports in this session */
  globals: GlobalsOutput;
  /** Exported binary assets (images, SVGs) */
  assets: AssetEntry[];
  /** Non-fatal warnings */
  warnings: string[];
  /** Machine-readable export trace mirrored into export-trace.json. */
  trace?: ExportTrace;
  /** Total element count across all pages */
  elementCount: number;
}

export type ExportTargetType =
  | "page"
  | "preset"
  | "modal"
  | "module"
  | "global-button"
  | "global-background"
  | "global-element"
  | "skip";

export interface ExportTarget {
  type: ExportTargetType;
  key: string;
  /** Display label shown in UI */
  label: string;
  /**
   * Set to "desktop" or "mobile" when the frame is part of a responsive pair
   * (Section[Desktop]/* or Section[Mobile]/* naming convention).
   * Absent for all single-artboard frames.
   */
  responsiveRole?: "desktop" | "mobile";
}

export interface ConversionContext {
  assets: AssetEntry[];
  warnings: string[];
  /** When true, auto-promote repeated sibling structures into presets. */
  autoPresets?: boolean;
  /** Tracks generated preset keys to avoid collisions. */
  usedPresetKeys?: Set<string>;
  /** Incremented each time a new asset is registered; used for unique filenames. */
  assetCounter: number;
  /** Tracks element IDs already used in this export to enforce uniqueness. */
  usedIds: Set<string>;
  /** Tracks asset keys already used in this export to prevent filename collisions. */
  usedAssetKeys: Set<string>;
  /** CDN path prefix prepended to all generated asset keys (e.g. "work/my-project/"). */
  cdnPrefix: string;
  /**
   * When true, skip all binary asset exports (image/video rasterisation).
   * CDN keys are still derived from node names so the JSON is complete.
   * Used by the "Copy JSON" flow to avoid the slow figma.getImageByHash /
   * exportAsync round-trips.
   */
  skipAssets?: boolean;
}

export interface FrameIssue {
  severity: "error" | "warn" | "info";
  category?: string;
  message: string;
}

export interface ExportTraceIssue {
  frameId: string;
  frameName: string;
  severity: FrameIssue["severity"];
  category: string;
  message: string;
}

export interface ExportTrace {
  counts: {
    severity: Record<FrameIssue["severity"], number>;
    category: Record<string, number>;
  };
  frames: Array<{
    id: string;
    name: string;
    issues: ExportTraceIssue[];
  }>;
}

/** Message sent from main thread to UI thread. */
export type MainToUIMessage =
  | {
      type: "result";
      payload: ExportResult;
      errorCount: number;
      warningCount: number;
      infoCount: number;
      errors: string[];
      mode: "copy" | "zip";
    }
  | { type: "error"; message: string }
  | { type: "progress"; message: string }
  | {
      type: "preview";
      items: Array<{
        id: string;
        name: string;
        target: ExportTarget;
        issues: FrameIssue[];
        /** Present when this item is one half of a responsive pair. */
        responsivePairKey?: string;
      }>;
    };

/** Message sent from UI thread to main thread. */
export type UIToMainMessage =
  | {
      type: "export";
      /** "copy" — JSON only, skip ZIP asset bundling. "zip" — full export with assets (default). */
      mode?: "copy" | "zip";
      targetOverrides?: Record<string, string>;
      annotationOverrides?: Record<string, Record<string, string>>;
      cdnPrefixOverrides?: Record<string, string>;
      autoPresets?: boolean;
    }
  | {
      type: "refresh-preview";
      targetOverrides: Record<string, string>;
      autoPresets?: boolean;
    }
  | { type: "close" };

// Keep PageBuilderPage re-export for any code that imported it via this module
export type { PageBuilderPage };
