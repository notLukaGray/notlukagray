import { CONTRACT_VERSION, type PageBuilder } from "@pb/contracts";
import type { PageBuilderDiagnostic } from "@pb/core";
import { validatePage } from "@pb/core";
import type { ExporterPlugin, ImporterPlugin } from "./index";

export type FixtureResult = {
  id: string;
  passed: boolean;
  diagnostics: PageBuilderDiagnostic[];
};

export type FixtureScorecard = {
  plugin: string;
  total: number;
  passed: number;
  failed: number;
  score: number;
  results: FixtureResult[];
};

export type ImporterFixture = {
  id: string;
  source: unknown;
};

export type ExporterFixture = {
  id: string;
  page: PageBuilder;
  unsupportedPaths?: string[];
};

function normalizeDiagnostics(value: PageBuilderDiagnostic[]): PageBuilderDiagnostic[] {
  return value.map((diagnostic) => ({ ...diagnostic }));
}

function harnessDiagnostic(
  code: string,
  message: string,
  path = "$",
  severity: PageBuilderDiagnostic["severity"] = "error"
): PageBuilderDiagnostic {
  return {
    code,
    severity,
    path,
    message,
    contractVersion: CONTRACT_VERSION,
  };
}

export async function runImporterFixtureSuite(
  plugin: ImporterPlugin,
  fixtures: ImporterFixture[]
): Promise<FixtureScorecard> {
  const results: FixtureResult[] = [];

  for (const fixture of fixtures) {
    const imported = await plugin.import(fixture.source);

    const importDiagnostics = normalizeDiagnostics(imported.diagnostics);
    const pageDiagnostics: PageBuilderDiagnostic[] = [];

    for (const page of imported.pages) {
      const validation = validatePage(page);
      pageDiagnostics.push(...validation.diagnostics);
    }

    const diagnostics = [...importDiagnostics, ...pageDiagnostics];

    results.push({
      id: fixture.id,
      passed: diagnostics.every((diagnostic) => diagnostic.severity !== "error"),
      diagnostics,
    });
  }

  const passed = results.filter((result) => result.passed).length;
  const failed = results.length - passed;

  return {
    plugin: plugin.capability.name,
    total: results.length,
    passed,
    failed,
    score: results.length === 0 ? 0 : Math.round((passed / results.length) * 100),
    results,
  };
}

export async function runExporterFixtureSuite(
  plugin: ExporterPlugin,
  fixtures: ExporterFixture[]
): Promise<FixtureScorecard> {
  const results: FixtureResult[] = [];

  for (const fixture of fixtures) {
    const exported = await plugin.export(fixture.page);
    const diagnostics = normalizeDiagnostics(exported.diagnostics);

    if (!plugin.capability.outputTargets.includes(exported.target)) {
      diagnostics.push(
        harnessDiagnostic(
          "PB_EXT_EXPORT_INVALID_TARGET",
          `Exporter returned target "${exported.target}" not declared in capability.`,
          "$.target"
        )
      );
    }

    const unsupportedPaths = fixture.unsupportedPaths ?? [];
    for (const unsupportedPath of unsupportedPaths) {
      const hasDiagnostic = diagnostics.some(
        (diagnostic) =>
          diagnostic.path === unsupportedPath &&
          (diagnostic.severity === "error" || diagnostic.severity === "warning")
      );
      if (!hasDiagnostic) {
        diagnostics.push(
          harnessDiagnostic(
            "PB_EXT_EXPORT_MISSING_UNSUPPORTED_DIAGNOSTIC",
            `Unsupported construct at ${unsupportedPath} was dropped/unsupported without explicit diagnostics.`,
            unsupportedPath
          )
        );
      }
    }

    results.push({
      id: fixture.id,
      passed: diagnostics.every((diagnostic) => diagnostic.severity !== "error"),
      diagnostics,
    });
  }

  const passed = results.filter((result) => result.passed).length;
  const failed = results.length - passed;

  return {
    plugin: plugin.capability.name,
    total: results.length,
    passed,
    failed,
    score: results.length === 0 ? 0 : Math.round((passed / results.length) * 100),
    results,
  };
}
