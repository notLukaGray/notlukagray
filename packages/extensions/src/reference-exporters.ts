import { CONTRACT_VERSION, type ExporterCapability, type PageBuilder } from "@pb/contracts";
import type { PageBuilderDiagnostic } from "@pb/core";
import type { ExportResult, ExporterPlugin } from "./index";

const referenceCapability: ExporterCapability = {
  type: "exporter",
  name: "reference-json-exporter",
  version: "1.0.0",
  inputContractVersions: [CONTRACT_VERSION],
  outputTargets: ["page-builder-json"],
  fidelityLevel: "lossless",
  diagnosticCodes: [],
};

function deepClonePage(page: PageBuilder): PageBuilder {
  return JSON.parse(JSON.stringify(page)) as PageBuilder;
}

function emptyDiagnostics(): PageBuilderDiagnostic[] {
  return [];
}

async function exportToJsonTarget(page: PageBuilder): Promise<ExportResult> {
  return {
    target: "page-builder-json",
    output: deepClonePage(page),
    diagnostics: emptyDiagnostics(),
  };
}

export function createReferenceJsonExporter(): ExporterPlugin {
  return {
    capability: referenceCapability,
    export: exportToJsonTarget,
  };
}
