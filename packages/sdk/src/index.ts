import { CONTRACT_VERSION } from "@pb/contracts";
import {
  loadPage,
  migratePage,
  validatePage,
  type MigrationResult,
  type PageBuilderDiagnostic,
  type ValidatePageResult,
} from "@pb/core";

export type DiffChange = {
  path: string;
  from: unknown;
  to: unknown;
  breaking: boolean;
};

export type DiffResult = {
  contractVersion: string;
  changeCount: number;
  changes: DiffChange[];
};

export type PbClientOptions = {
  contractVersion?: string;
};

export type PbMigrateOptions = {
  from?: string;
  to: string;
};

export type PbClient = {
  validate: (page: unknown) => Promise<ValidatePageResult>;
  diff: (pageA: unknown, pageB: unknown) => Promise<DiffResult>;
  migrate: (page: unknown, options: PbMigrateOptions | string) => Promise<MigrationResult>;
  load: (source: string) => Promise<unknown>;
};

function isRecord(value: unknown): value is Record<string, unknown> {
  return value != null && typeof value === "object" && !Array.isArray(value);
}

function toPath(base: string, key: string | number): string {
  if (typeof key === "number") return `${base}[${key}]`;
  if (base === "$") return `${base}.${key}`;
  return `${base}.${key}`;
}

function diffValues(a: unknown, b: unknown, basePath = "$", out: DiffChange[] = []): DiffChange[] {
  if (Object.is(a, b)) return out;

  if (Array.isArray(a) && Array.isArray(b)) {
    const max = Math.max(a.length, b.length);
    for (let i = 0; i < max; i++) {
      diffValues(a[i], b[i], toPath(basePath, i), out);
    }
    return out;
  }

  if (isRecord(a) && isRecord(b)) {
    const keys = new Set([...Object.keys(a), ...Object.keys(b)]);
    for (const key of Array.from(keys).sort()) {
      diffValues(a[key], b[key], toPath(basePath, key), out);
    }
    return out;
  }

  out.push({
    path: basePath,
    from: a,
    to: b,
    breaking: a !== undefined && b === undefined,
  });

  return out;
}

function inferFromVersion(page: unknown, fallback: string): string {
  if (!isRecord(page)) return fallback;
  const version = page.contractVersion;
  return typeof version === "string" && version.length > 0 ? version : fallback;
}

function withContractVersion(
  contractVersion: string,
  diagnostics: PageBuilderDiagnostic[]
): PageBuilderDiagnostic[] {
  return diagnostics.map((diagnostic) => ({
    ...diagnostic,
    contractVersion: diagnostic.contractVersion || contractVersion,
  }));
}

export function createPbClient(options: PbClientOptions = {}): PbClient {
  const contractVersion = options.contractVersion ?? CONTRACT_VERSION;

  return {
    async validate(page: unknown): Promise<ValidatePageResult> {
      const result = validatePage(page);
      return {
        ...result,
        diagnostics: withContractVersion(contractVersion, result.diagnostics),
      };
    },

    async diff(pageA: unknown, pageB: unknown): Promise<DiffResult> {
      const changes = diffValues(pageA, pageB);
      return {
        contractVersion,
        changeCount: changes.length,
        changes,
      };
    },

    async migrate(page: unknown, optionsOrTo: PbMigrateOptions | string): Promise<MigrationResult> {
      const options =
        typeof optionsOrTo === "string" ? { to: optionsOrTo, from: undefined } : optionsOrTo;
      const fromVersion = options.from ?? inferFromVersion(page, contractVersion);
      const result = migratePage(page, fromVersion, options.to);
      return {
        ...result,
        diagnostics: withContractVersion(contractVersion, result.diagnostics),
      };
    },

    async load(source: string): Promise<unknown> {
      const loaded = loadPage(source);
      return loaded.validate.page ?? loaded.raw;
    },
  };
}

export type { MigrationResult, PageBuilderDiagnostic, ValidatePageResult } from "@pb/core";
