import type {
  CmsAdapterCapability,
  ExporterCapability,
  ImporterCapability,
  PageBuilder,
} from "@pb/contracts";
import type { PageBuilderDiagnostic } from "@pb/core";

export type UnsupportedConstruct = {
  code: string;
  path: string;
  description: string;
};

export type ImportResult = {
  pages: unknown[];
  diagnostics: PageBuilderDiagnostic[];
  unsupported: UnsupportedConstruct[];
};

export type ExportResult = {
  target: string;
  output: unknown;
  diagnostics: PageBuilderDiagnostic[];
};

export type CmsSyncResult = {
  diagnostics: PageBuilderDiagnostic[];
  changedIds: string[];
};

export type ImporterPlugin = {
  capability: ImporterCapability;
  import: (source: unknown) => Promise<ImportResult>;
};

export type ExporterPlugin = {
  capability: ExporterCapability;
  export: (page: PageBuilder) => Promise<ExportResult>;
};

export type CmsAdapterPlugin = {
  capability: CmsAdapterCapability;
  pull?: (query: unknown) => Promise<ImportResult>;
  push?: (pages: PageBuilder[]) => Promise<CmsSyncResult>;
};

export type AnyPbPlugin = ImporterPlugin | ExporterPlugin | CmsAdapterPlugin;

export {
  runImporterFixtureSuite,
  runExporterFixtureSuite,
  type FixtureScorecard,
  type ImporterFixture,
  type ExporterFixture,
} from "./testkit";
export {
  createReferenceJsonFileImporter,
  createThirdPartyPayloadImporter,
} from "./reference-importers";
export { createReferenceJsonExporter } from "./reference-exporters";
