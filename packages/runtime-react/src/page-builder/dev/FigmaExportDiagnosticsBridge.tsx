"use client";

import { useEffect } from "react";
import type { FigmaExportDiagnosticsPageField } from "@pb/core/internal/page-builder-schemas";
import { useFigmaExportDiagnosticsStore } from "@/page-builder/dev/figma-export-diagnostics-store";

type FigmaExportDiagnosticsBridgeProps = {
  diagnostics?: FigmaExportDiagnosticsPageField;
};

/**
 * Wires runtime pages into the same diagnostics store used by `/playground` JSON paste.
 * This keeps the PB dev overlay's Figma tab populated on normal routes too.
 */
export function FigmaExportDiagnosticsBridge({ diagnostics }: FigmaExportDiagnosticsBridgeProps) {
  useEffect(() => {
    if (process.env.NODE_ENV !== "development") return;
    const root = diagnostics ? { figmaExportDiagnostics: diagnostics } : null;
    useFigmaExportDiagnosticsStore.getState().ingestPlaygroundPageRoot(root);
  }, [diagnostics]);

  return null;
}
