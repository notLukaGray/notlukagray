#!/usr/bin/env npx tsx

import fs from "node:fs";
import path from "node:path";
import { isDeepStrictEqual } from "node:util";
import { CONTRACT_VERSION, type PageBuilder } from "@pb/contracts";
import { expandPage, resolveAssets, type PageBuilderDiagnostic } from "@pb/core";
import { createPbClient, type DiffResult } from "@pb/sdk";

type CliResult = Record<string, unknown>;
type ConformanceAssertion = {
  path: string;
  equals?: unknown;
  exists?: boolean;
};

type FixtureConformanceExpect = {
  expandedAssertions?: ConformanceAssertion[];
};

function isRecord(value: unknown): value is Record<string, unknown> {
  return value != null && typeof value === "object" && !Array.isArray(value);
}

function resolveInputPath(inputPath: string): string {
  return path.isAbsolute(inputPath) ? inputPath : path.join(process.cwd(), inputPath);
}

function readJsonFile(
  filePath: string
): { ok: true; value: unknown } | { ok: false; error: string } {
  const absolute = resolveInputPath(filePath);
  if (!fs.existsSync(absolute)) {
    return { ok: false, error: `File not found: ${filePath}` };
  }

  try {
    const content = fs.readFileSync(absolute, "utf8");
    return { ok: true, value: JSON.parse(content) as unknown };
  } catch (error) {
    return {
      ok: false,
      error: `Failed to read/parse JSON: ${filePath} (${error instanceof Error ? error.message : String(error)})`,
    };
  }
}

function printJson(result: CliResult): void {
  process.stdout.write(`${JSON.stringify(result, null, 2)}\n`);
}

function printErrorJson(result: CliResult): void {
  process.stderr.write(`${JSON.stringify(result, null, 2)}\n`);
}

function getValueAtPath(root: unknown, pathExpr: string): unknown {
  const tokens = pathExpr.match(/([^[.\]]+)|\[(\d+)\]/g) ?? [];
  let current: unknown = root;
  for (const token of tokens) {
    if (current == null) return undefined;
    if (token.startsWith("[")) {
      const index = Number(token.slice(1, -1));
      if (!Array.isArray(current)) return undefined;
      current = current[index];
      continue;
    }
    if (!isRecord(current)) return undefined;
    current = current[token];
  }
  return current;
}

function formatExpected(expected: unknown): string {
  try {
    return JSON.stringify(expected);
  } catch {
    return String(expected);
  }
}

function readConformanceExpect(rawFixture: unknown): FixtureConformanceExpect | null {
  if (!isRecord(rawFixture)) return null;
  const rawExpect = rawFixture.conformanceExpect;
  if (!isRecord(rawExpect)) return null;
  const rawAssertions = rawExpect.expandedAssertions;
  if (!Array.isArray(rawAssertions)) return null;

  const expandedAssertions: ConformanceAssertion[] = [];
  for (const rawAssertion of rawAssertions) {
    if (!isRecord(rawAssertion) || typeof rawAssertion.path !== "string") continue;
    expandedAssertions.push({
      path: rawAssertion.path,
      ...(rawAssertion.equals !== undefined ? { equals: rawAssertion.equals } : {}),
      ...(typeof rawAssertion.exists === "boolean" ? { exists: rawAssertion.exists } : {}),
    });
  }

  return { expandedAssertions };
}

function buildConformanceAssertionDiagnostics(
  assertions: ConformanceAssertion[],
  expanded: unknown
): PageBuilderDiagnostic[] {
  const diagnostics: PageBuilderDiagnostic[] = [];

  for (const assertion of assertions) {
    const value = getValueAtPath(expanded, assertion.path);

    if (assertion.exists !== undefined) {
      const exists = value !== undefined;
      if (exists !== assertion.exists) {
        diagnostics.push({
          code: "PB_CONFORMANCE_ASSERTION_FAILED",
          severity: "error",
          path: assertion.path,
          message: `Expected exists=${assertion.exists} but got exists=${exists}.`,
          contractVersion: CONTRACT_VERSION,
        });
      }
    }

    if (assertion.equals !== undefined && !isDeepStrictEqual(value, assertion.equals)) {
      diagnostics.push({
        code: "PB_CONFORMANCE_ASSERTION_FAILED",
        severity: "error",
        path: assertion.path,
        message: `Expected ${formatExpected(assertion.equals)} but got ${formatExpected(value)}.`,
        contractVersion: CONTRACT_VERSION,
      });
    }
  }

  return diagnostics;
}

function buildExpansionIntegrityDiagnostics(expanded: unknown): PageBuilderDiagnostic[] {
  if (!isRecord(expanded) || !Array.isArray(expanded.sections)) {
    return [
      {
        code: "PB_CONFORMANCE_PIPELINE_ERROR",
        severity: "error",
        path: "$",
        message: "Expanded output is missing a top-level sections array.",
        contractVersion: CONTRACT_VERSION,
      },
    ];
  }

  const diagnostics: PageBuilderDiagnostic[] = [];

  for (const [index, section] of expanded.sections.entries()) {
    if (!isRecord(section)) {
      continue;
    }

    const elementOrder = section.elementOrder;
    if (!Array.isArray(elementOrder) || elementOrder.length === 0) {
      continue;
    }

    const resolvedElements = section.elements;
    if (!Array.isArray(resolvedElements) || resolvedElements.length === 0) {
      const sectionId = typeof section.id === "string" ? section.id : `index ${index}`;
      diagnostics.push({
        code: "PB_CONFORMANCE_EXPANSION_INCOMPLETE",
        severity: "error",
        path: `sections[${index}].elements`,
        message: `Section "${sectionId}" has elementOrder (${elementOrder.length}) but no resolved elements after expandPage.`,
        contractVersion: CONTRACT_VERSION,
      });
    }
  }

  return diagnostics;
}

async function runValidate(
  pb: ReturnType<typeof createPbClient>,
  filePath: string
): Promise<number> {
  const read = readJsonFile(filePath);
  if (!read.ok) {
    printErrorJson({
      command: "validate",
      file: filePath,
      valid: false,
      diagnostics: [
        {
          code: "PB_FILE_ERROR",
          severity: "error",
          path: "$",
          message: read.error,
          contractVersion: CONTRACT_VERSION,
        },
      ],
    });
    return 2;
  }

  const result = await pb.validate(read.value);
  printJson({
    command: "validate",
    file: filePath,
    contractVersion: CONTRACT_VERSION,
    valid: result.valid,
    diagnostics: result.diagnostics,
  });
  return result.valid ? 0 : 1;
}

async function runDiff(
  pb: ReturnType<typeof createPbClient>,
  fileA: string,
  fileB: string
): Promise<number> {
  const readA = readJsonFile(fileA);
  const readB = readJsonFile(fileB);

  if (!readA.ok || !readB.ok) {
    printErrorJson({
      command: "diff",
      contractVersion: CONTRACT_VERSION,
      changes: [],
      diagnostics: [
        ...(!readA.ok
          ? [
              {
                code: "PB_FILE_ERROR",
                severity: "error",
                path: "$",
                message: readA.error,
                contractVersion: CONTRACT_VERSION,
              },
            ]
          : []),
        ...(!readB.ok
          ? [
              {
                code: "PB_FILE_ERROR",
                severity: "error",
                path: "$",
                message: readB.error,
                contractVersion: CONTRACT_VERSION,
              },
            ]
          : []),
      ],
    });
    return 2;
  }

  const diff: DiffResult = await pb.diff(readA.value, readB.value);
  printJson({
    command: "diff",
    ...diff,
  });
  return 0;
}

async function runMigrate(
  pb: ReturnType<typeof createPbClient>,
  filePath: string,
  args: string[]
): Promise<number> {
  const read = readJsonFile(filePath);
  if (!read.ok) {
    printErrorJson({
      command: "migrate",
      status: "error",
      file: filePath,
      diagnostics: [
        {
          code: "PB_FILE_ERROR",
          severity: "error",
          path: "$",
          message: read.error,
          contractVersion: CONTRACT_VERSION,
        },
      ],
    });
    return 2;
  }

  const fromIndex = args.indexOf("--from");
  const toIndex = args.indexOf("--to");

  const from = fromIndex >= 0 ? args[fromIndex + 1] : undefined;
  const to = toIndex >= 0 ? (args[toIndex + 1] ?? CONTRACT_VERSION) : CONTRACT_VERSION;

  const result = await pb.migrate(read.value, {
    from,
    to,
  });

  if (isRecord(result.page)) {
    process.stdout.write(`${JSON.stringify(result.page, null, 2)}\n`);
  } else {
    printJson({
      command: "migrate",
      page: result.page,
    });
  }

  printErrorJson({
    command: "migrate",
    fromVersion: result.fromVersion,
    toVersion: result.toVersion,
    appliedTransforms: result.appliedTransforms,
    diagnostics: result.diagnostics,
  });

  return result.diagnostics.some((diagnostic) => diagnostic.severity === "error") ? 1 : 0;
}

async function runConformance(
  pb: ReturnType<typeof createPbClient>,
  fixturesDir?: string
): Promise<number> {
  const targetDir = resolveInputPath(fixturesDir ?? "packages/contracts/fixtures");
  if (!fs.existsSync(targetDir) || !fs.statSync(targetDir).isDirectory()) {
    printErrorJson({
      command: "conformance",
      contractVersion: CONTRACT_VERSION,
      total: 0,
      passed: 0,
      failed: 1,
      results: [],
      diagnostics: [
        {
          code: "PB_FIXTURE_DIR_MISSING",
          severity: "error",
          path: "$",
          message: `Fixtures directory not found: ${fixturesDir ?? "packages/contracts/fixtures"}`,
          contractVersion: CONTRACT_VERSION,
        },
      ],
    });
    return 2;
  }

  const fixtureFiles = fs
    .readdirSync(targetDir)
    .filter((entry) => entry.endsWith(".json"))
    .sort((a, b) => a.localeCompare(b));

  const results = [] as Array<{
    file: string;
    passed: boolean;
    diagnostics: PageBuilderDiagnostic[];
  }>;

  for (const fileName of fixtureFiles) {
    const relativePath = path.relative(process.cwd(), path.join(targetDir, fileName));
    const read = readJsonFile(relativePath);

    if (!read.ok) {
      results.push({
        file: relativePath,
        passed: false,
        diagnostics: [
          {
            code: "PB_FIXTURE_READ_ERROR",
            severity: "error",
            path: "$",
            message: read.error,
            contractVersion: CONTRACT_VERSION,
          },
        ],
      });
      continue;
    }

    const validation = await pb.validate(read.value);
    const diagnostics = [...validation.diagnostics];

    if (validation.valid) {
      try {
        const pageInput = read.value as PageBuilder;
        const expanded = expandPage(pageInput);
        diagnostics.push(...buildExpansionIntegrityDiagnostics(expanded));
        // Ensure server asset resolution path executes during conformance.
        resolveAssets(pageInput);

        const expect = readConformanceExpect(read.value);
        if (expect?.expandedAssertions && expect.expandedAssertions.length > 0) {
          diagnostics.push(
            ...buildConformanceAssertionDiagnostics(expect.expandedAssertions, expanded)
          );
        }
      } catch (error) {
        diagnostics.push({
          code: "PB_CONFORMANCE_PIPELINE_ERROR",
          severity: "error",
          path: "$",
          message: `Pipeline execution failed: ${error instanceof Error ? error.message : String(error)}`,
          contractVersion: CONTRACT_VERSION,
        });
      }
    }

    results.push({
      file: relativePath,
      passed: diagnostics.every((diagnostic) => diagnostic.severity !== "error"),
      diagnostics,
    });
  }

  const passed = results.filter((result) => result.passed).length;
  const failed = results.length - passed;

  printJson({
    command: "conformance",
    contractVersion: CONTRACT_VERSION,
    fixturesDir: path.relative(process.cwd(), targetDir),
    total: results.length,
    passed,
    failed,
    results,
  });

  return failed === 0 ? 0 : 1;
}

function printUsage(): void {
  printErrorJson({
    status: "error",
    message: "Usage: pb-cli <validate|diff|migrate|conformance> [...args]",
  });
}

export async function runCli(argv = process.argv): Promise<number> {
  const [, , command, ...args] = argv;
  const pb = createPbClient({ contractVersion: CONTRACT_VERSION });

  switch (command) {
    case "validate": {
      const filePath = args[0];
      if (!filePath) {
        printUsage();
        return 2;
      }
      return runValidate(pb, filePath);
    }
    case "diff": {
      const fileA = args[0];
      const fileB = args[1];
      if (!fileA || !fileB) {
        printUsage();
        return 2;
      }
      return runDiff(pb, fileA, fileB);
    }
    case "migrate": {
      const filePath = args[0];
      if (!filePath) {
        printUsage();
        return 2;
      }
      return runMigrate(pb, filePath, args.slice(1));
    }
    case "conformance": {
      const fixturesDir = args[0];
      return runConformance(pb, fixturesDir);
    }
    default:
      printUsage();
      return 2;
  }
}

if (import.meta.url === `file://${process.argv[1]}`) {
  runCli().then(
    (exitCode) => {
      process.exit(exitCode);
    },
    (error) => {
      printErrorJson({
        status: "error",
        message: error instanceof Error ? error.message : String(error),
      });
      process.exit(2);
    }
  );
}
