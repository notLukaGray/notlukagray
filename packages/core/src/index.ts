import fs from "node:fs";
import path from "node:path";
import {
  CONTRACT_VERSION,
  type FigmaExportDiagnosticsPageField,
  pageBuilderSchema,
  type BackgroundTransitionEffect,
  type PageBuilder,
  type PageBuilderDefinitionBlock,
  type PageDensity,
  type PageScrollConfig,
  type ResolvedPage,
  type SectionBlock,
  type TriggerAction,
  type bgBlock,
} from "@pb/contracts";
import {
  getAssetBaseUrl,
  resolveBgBlockUrls,
  resolveSectionBlockUrls,
} from "@pb/core/internal/page-builder-blocks";
import { expandPageBuilder } from "@pb/core/internal/page-builder-expand";
import { resolvePresets } from "@pb/core/internal/page-builder-presets";
import { applyBuilderElementDefaultsToSections } from "@pb/core/internal/page-builder-apply-element-defaults";
import { resolveEntranceMotionsIntoSections } from "@pb/core/internal/page-builder-resolve-entrance-motions";
import {
  buildRawBgDefinitions,
  buildResolvedBgDefinitions,
  resolvePageBuilderAssetsOnServer,
  type ResolvePageBuilderAssetsResult,
} from "@pb/core/internal/page-builder-resolve-assets-server";
import {
  loadPageBuilder,
  loadPageBuilderAsync,
  loadPageBuilderByPath,
  loadPageBuilderByPathAsync,
  getPageSlugBases,
  getPageSlugs,
  getPageSlugsByBase,
} from "@pb/core/internal/page-builder-load";
import {
  discoverAllPages,
  resolvePagePath,
  type PageEntry,
} from "@pb/core/internal/load/page-builder-discover-pages";
import { loadModal, type ModalBuilder } from "@pb/core/internal/modal-load";
import type { ModalProps } from "@pb/core/internal/modal-types";
import { loadOverlaySections } from "@pb/core/internal/overlay/page-builder-overlay-loader";
import { isSafePathSegment } from "@pb/core/internal/page-builder-paths";
import {
  applyPbDefaultTextAlign,
  getPageBuilderHostConfig,
  getPbBuilderDefaults,
  getPbContentGuidelines,
  setPageBuilderHostConfig,
  type PageBuilderHostConfig,
} from "@pb/core/internal/adapters/host-config";
import { configureCoreGlobals } from "@pb/core/lib/globals";
import {
  toPbContentGuidelines,
  type PbBuilderDefaults,
} from "@pb/core/internal/defaults/pb-builder-defaults";
import type { PbContentGuidelines } from "@pb/core/internal/defaults/pb-guidelines-expand";
import {
  resolveBreakpointDefinitions,
  type BreakpointDefinitions,
} from "@pb/core/internal/defaults/pb-breakpoint-defaults";

export type PageBuilderDiagnostic = {
  code: string;
  severity: "error" | "warning" | "info";
  path: string;
  message: string;
  contractVersion: string;
};

// Backward-compatible alias for existing in-repo scripts.
export type PbCoreDiagnostic = PageBuilderDiagnostic;

export type CoreConfig = {
  builderDefaults?: PbBuilderDefaults;
  contentGuidelines?: PbContentGuidelines;
  assetBaseUrl?: string;
  defaultSection?: Partial<SectionBlock>;
  defaultElement?: Record<string, unknown>;
};

let coreConfig: CoreConfig = {};

export function setCoreConfig(config: CoreConfig): void {
  coreConfig = { ...coreConfig, ...config };

  if (typeof config.assetBaseUrl === "string") {
    configureCoreGlobals({ assetBaseUrl: config.assetBaseUrl });
  }

  const hostConfigPatch: Partial<PageBuilderHostConfig> = {};
  if (config.builderDefaults) {
    hostConfigPatch.pbBuilderDefaults = config.builderDefaults;
    if (config.contentGuidelines == null) {
      hostConfigPatch.pbContentGuidelines = toPbContentGuidelines(config.builderDefaults);
    }
  }
  if (config.contentGuidelines) {
    hostConfigPatch.pbContentGuidelines = config.contentGuidelines;
  }
  if (Object.keys(hostConfigPatch).length > 0) {
    setPageBuilderHostConfig(hostConfigPatch);
  }
}

export function getCoreConfig(): CoreConfig {
  return { ...coreConfig };
}

export type ValidatePageResult = {
  valid: boolean;
  diagnostics: PageBuilderDiagnostic[];
  page: PageBuilder | null;
};

export type ExpandPageResult = {
  bg: bgBlock | null;
  sections: SectionBlock[];
};

export type LoadPageResult = {
  filePath: string;
  raw: unknown;
  validate: ValidatePageResult;
};

export type ResolveAssetsOptions = {
  isMobile?: boolean;
  assetBaseUrl?: string;
  breakpoints?: Partial<BreakpointDefinitions>;
  viewportWidthPx?: number;
};

export type ResolveAssetsResult = ResolvePageBuilderAssetsResult & {
  transitions: BackgroundTransitionEffect[];
  assetBase: string;
};

export type MigrationResult = {
  page: unknown;
  diagnostics: PageBuilderDiagnostic[];
  fromVersion: string;
  toVersion: string;
  appliedTransforms: string[];
};

export type GetPageBuilderPropsOptions = {
  assetBaseUrl?: string;
  transformSections?: (sections: SectionBlock[]) => SectionBlock[];
  isMobile?: boolean;
  breakpoints?: Partial<BreakpointDefinitions>;
  viewportWidthPx?: number;
};

export type GetModalPropsOptions = {
  transformSections?: (sections: SectionBlock[]) => SectionBlock[];
  isMobile?: boolean;
  breakpoints?: Partial<BreakpointDefinitions>;
  viewportWidthPx?: number;
};

export type GetPageOptions = {
  isMobile?: boolean;
  breakpoints?: Partial<BreakpointDefinitions>;
  viewportWidthPx?: number;
};

export type PageBuilderPageClientPage = {
  slug: string;
  title: string;
  onPageProgress?: TriggerAction;
  transitions?: BackgroundTransitionEffect | BackgroundTransitionEffect[];
  scroll?: PageScrollConfig;
  density?: PageDensity;
  figmaExportDiagnostics?: FigmaExportDiagnosticsPageField;
};

export type PageBuilderPageProps = {
  page: PageBuilderPageClientPage;
  resolvedBg: bgBlock | null;
  resolvedSections: SectionBlock[];
  bgDefinitions: Record<string, bgBlock>;
  serverIsMobile?: boolean;
  overlaySections?: SectionBlock[];
};

export type ResolvedPageWithDefinitions = ResolvedPage & {
  definitions?: Record<string, PageBuilderDefinitionBlock>;
};

function isRecord(value: unknown): value is Record<string, unknown> {
  return value != null && typeof value === "object" && !Array.isArray(value);
}

function mapPath(pathParts: Array<string | number>): string {
  if (pathParts.length === 0) return "$";
  return `$${pathParts
    .map((part) => (typeof part === "number" ? `[${part}]` : `.${part}`))
    .join("")}`;
}

function toDiagnostics(error: unknown): PageBuilderDiagnostic[] {
  if (!error || typeof error !== "object") {
    return [
      {
        code: "PB_UNKNOWN_ERROR",
        severity: "error",
        path: "$",
        message: String(error),
        contractVersion: CONTRACT_VERSION,
      },
    ];
  }

  const maybeIssues = (error as { issues?: unknown }).issues;
  if (!Array.isArray(maybeIssues)) {
    return [
      {
        code: "PB_VALIDATION_ERROR",
        severity: "error",
        path: "$",
        message: "Validation failed with an unknown error shape.",
        contractVersion: CONTRACT_VERSION,
      },
    ];
  }

  return maybeIssues.map((issue) => {
    const rec = issue as { code?: unknown; message?: unknown; path?: unknown };
    const issuePath = Array.isArray(rec.path)
      ? mapPath(
          rec.path.filter(
            (part): part is string | number => typeof part === "string" || typeof part === "number"
          )
        )
      : "$";

    return {
      code: typeof rec.code === "string" ? rec.code : "PB_SCHEMA_ISSUE",
      severity: "error" as const,
      path: issuePath,
      message: typeof rec.message === "string" ? rec.message : "Schema validation issue.",
      contractVersion: CONTRACT_VERSION,
    };
  });
}

function buildPageForExpansion(page: PageBuilder): PageBuilder {
  const definitions = {
    ...(page.definitions as Record<string, PageBuilderDefinitionBlock>),
  };
  const inlinePresets = isRecord(page.preset)
    ? (page.preset as Record<string, PageBuilderDefinitionBlock>)
    : {};

  for (const sectionKey of page.sectionOrder) {
    if (definitions[sectionKey] == null && inlinePresets[sectionKey] != null) {
      definitions[sectionKey] = inlinePresets[sectionKey];
    }
  }

  const resolvedDefinitions: Record<string, PageBuilderDefinitionBlock> = {};
  for (const [key, block] of Object.entries(definitions)) {
    resolvedDefinitions[key] = resolvePresets(block, inlinePresets);
  }

  return {
    ...page,
    definitions: resolvedDefinitions,
  };
}

function resolveAssetBase(page: PageBuilder, options?: ResolveAssetsOptions): string {
  if (options?.assetBaseUrl) return options.assetBaseUrl;
  if (coreConfig.assetBaseUrl) return coreConfig.assetBaseUrl;
  return getAssetBaseUrl(page as ResolvedPage);
}

function resolveViewportWidthForExpansion(options?: GetPageOptions): number | undefined {
  if (typeof options?.viewportWidthPx === "number" && Number.isFinite(options.viewportWidthPx)) {
    return options.viewportWidthPx;
  }
  if (options?.isMobile === undefined) return undefined;
  const breakpoints = resolveBreakpointDefinitions(options.breakpoints);
  return options.isMobile ? breakpoints.desktop - 1 : breakpoints.desktop;
}

function parseSlugSegments(slug: string): string[] | null {
  if (typeof slug !== "string" || slug.length === 0) return null;
  const segments = slug.split("/");
  for (const seg of segments) {
    if (!isSafePathSegment(seg)) return null;
  }
  return segments;
}

function stripPageForClient(page: ResolvedPageWithDefinitions): PageBuilderPageClientPage {
  const stripped: PageBuilderPageClientPage = {
    slug: page.slug,
    title: page.title,
  };
  if (page.onPageProgress != null) stripped.onPageProgress = page.onPageProgress as TriggerAction;
  if (page.transitions != null) {
    stripped.transitions = page.transitions as
      | BackgroundTransitionEffect
      | BackgroundTransitionEffect[];
  }
  if (page.scroll != null) stripped.scroll = page.scroll as PageScrollConfig;
  if (page.density != null) stripped.density = page.density as PageDensity;
  if (
    (page as { figmaExportDiagnostics?: FigmaExportDiagnosticsPageField }).figmaExportDiagnostics !=
    null
  ) {
    stripped.figmaExportDiagnostics = (
      page as { figmaExportDiagnostics?: FigmaExportDiagnosticsPageField }
    ).figmaExportDiagnostics;
  }
  return stripped;
}

export function validatePage(input: unknown): ValidatePageResult {
  const parsed = pageBuilderSchema.safeParse(input);
  if (parsed.success) {
    return {
      valid: true,
      diagnostics: [],
      page: parsed.data,
    };
  }

  return {
    valid: false,
    diagnostics: toDiagnostics(parsed.error),
    page: null,
  };
}

export function loadPage(filePath: string): LoadPageResult {
  const absolute = path.isAbsolute(filePath) ? filePath : path.join(process.cwd(), filePath);
  const rawContent = fs.readFileSync(absolute, "utf8");
  const raw = JSON.parse(rawContent) as unknown;

  return {
    filePath: absolute,
    raw,
    validate: validatePage(raw),
  };
}

export function expandPage(page: PageBuilder): ExpandPageResult {
  const preparedPage = buildPageForExpansion(page);
  const assetBase = resolveAssetBase(preparedPage);
  const expanded = expandPageBuilder(preparedPage, { assetBase });
  const withDefaults = applyBuilderElementDefaultsToSections(expanded.sections);
  const withEntranceMotions = resolveEntranceMotionsIntoSections(withDefaults);

  return {
    bg: expanded.bg,
    sections: withEntranceMotions,
  };
}

export function resolveAssets(
  page: PageBuilder,
  options?: ResolveAssetsOptions
): ResolveAssetsResult {
  const preparedPage = buildPageForExpansion(page);
  const assetBase = resolveAssetBase(preparedPage, options);
  const viewportWidthPx = resolveViewportWidthForExpansion(options);

  const expanded = expandPageBuilder(preparedPage, {
    assetBase,
    breakpoints: options?.breakpoints,
    ...(viewportWidthPx !== undefined ? { viewportWidthPx } : {}),
  });
  const withDefaults = applyBuilderElementDefaultsToSections(expanded.sections);
  const withEntranceMotions = resolveEntranceMotionsIntoSections(withDefaults);

  const bgDefinitionsRaw = buildRawBgDefinitions(
    preparedPage.definitions as Record<string, PageBuilderDefinitionBlock> | undefined
  );
  const transitionsArray = preparedPage.transitions
    ? Array.isArray(preparedPage.transitions)
      ? preparedPage.transitions
      : [preparedPage.transitions]
    : [];

  const resolved = resolvePageBuilderAssetsOnServer(
    expanded.bg,
    withEntranceMotions,
    bgDefinitionsRaw,
    transitionsArray,
    { isMobile: options?.isMobile }
  );

  return {
    ...resolved,
    transitions: transitionsArray,
    assetBase,
  };
}

function toRecordClone(value: unknown): Record<string, unknown> | null {
  if (!isRecord(value)) return null;
  return JSON.parse(JSON.stringify(value)) as Record<string, unknown>;
}

export function migratePage(
  page: unknown,
  fromVersion: string,
  toVersion: string
): MigrationResult {
  const diagnostics: PageBuilderDiagnostic[] = [];
  const appliedTransforms: string[] = [];

  if (toVersion !== CONTRACT_VERSION) {
    return {
      page,
      diagnostics: [
        {
          code: "PB_MIGRATE_UNSUPPORTED_TARGET",
          severity: "error",
          path: "$",
          message: `Unsupported migration target: ${toVersion}`,
          contractVersion: CONTRACT_VERSION,
        },
      ],
      fromVersion,
      toVersion,
      appliedTransforms,
    };
  }

  if (fromVersion === toVersion) {
    appliedTransforms.push("identity");
    return {
      page,
      diagnostics,
      fromVersion,
      toVersion,
      appliedTransforms,
    };
  }

  const migratedRecord = toRecordClone(page);
  if (migratedRecord == null) {
    return {
      page,
      diagnostics: [
        {
          code: "PB_MIGRATE_INVALID_INPUT",
          severity: "error",
          path: "$",
          message: "Migration input must be a JSON object.",
          contractVersion: CONTRACT_VERSION,
        },
      ],
      fromVersion,
      toVersion,
      appliedTransforms,
    };
  }

  if (fromVersion === "0.5.0-v0" || fromVersion.startsWith("0.")) {
    migratedRecord.contractVersion = CONTRACT_VERSION;
    if (typeof migratedRecord.assetBaseUrl !== "string" && coreConfig.assetBaseUrl) {
      migratedRecord.assetBaseUrl = coreConfig.assetBaseUrl;
      appliedTransforms.push("inject-asset-base-url");
    }
    appliedTransforms.push("stamp-contract-version");

    const validation = validatePage(migratedRecord);
    diagnostics.push(...validation.diagnostics);

    if (!validation.valid) {
      diagnostics.push({
        code: "PB_MIGRATE_OUTPUT_INVALID",
        severity: "warning",
        path: "$",
        message: "Migration completed but output is not fully valid against @pb/contracts 1.0.0.",
        contractVersion: CONTRACT_VERSION,
      });
    }

    return {
      page: migratedRecord,
      diagnostics,
      fromVersion,
      toVersion,
      appliedTransforms,
    };
  }

  return {
    page,
    diagnostics: [
      {
        code: "PB_MIGRATE_PATH_NOT_FOUND",
        severity: "error",
        path: "$",
        message: `No migration path available from ${fromVersion} to ${toVersion}.`,
        contractVersion: CONTRACT_VERSION,
      },
    ],
    fromVersion,
    toVersion,
    appliedTransforms,
  };
}

export function getPage(
  slug: string,
  options?: GetPageOptions
): ResolvedPageWithDefinitions | null {
  const segments = parseSlugSegments(slug);
  if (!segments) return null;

  const page =
    segments.length === 1
      ? loadPageBuilder(segments[0] as string)
      : (() => {
          const absolutePath = resolvePagePath(segments);
          return absolutePath ? loadPageBuilderByPath(absolutePath, segments) : null;
        })();
  if (!page) return null;

  const assetBase = getAssetBaseUrl(page as ResolvedPage);
  const viewportWidthPx = resolveViewportWidthForExpansion(options);
  const expanded = expandPageBuilder(page, {
    assetBase,
    breakpoints: options?.breakpoints,
    ...(viewportWidthPx !== undefined ? { viewportWidthPx } : {}),
  });

  return {
    ...(page as ResolvedPage),
    bg: expanded.bg,
    sections: expanded.sections,
    definitions: page.definitions,
  } as ResolvedPageWithDefinitions;
}

export async function getPageAsync(
  slug: string,
  options?: GetPageOptions
): Promise<ResolvedPageWithDefinitions | null> {
  const segments = parseSlugSegments(slug);
  if (!segments) return null;

  const page =
    segments.length === 1
      ? await loadPageBuilderAsync(segments[0] as string)
      : await (async () => {
          const absolutePath = resolvePagePath(segments);
          return absolutePath ? loadPageBuilderByPathAsync(absolutePath, segments) : null;
        })();
  if (!page) return null;

  const assetBase = getAssetBaseUrl(page as ResolvedPage);
  const viewportWidthPx = resolveViewportWidthForExpansion(options);
  const expanded = expandPageBuilder(page, {
    assetBase,
    breakpoints: options?.breakpoints,
    ...(viewportWidthPx !== undefined ? { viewportWidthPx } : {}),
  });

  return {
    ...(page as ResolvedPage),
    bg: expanded.bg,
    sections: expanded.sections,
    definitions: page.definitions,
  } as ResolvedPageWithDefinitions;
}

export function getModalProps(id: string, options?: GetModalPropsOptions): ModalProps | null {
  const modal = loadModal(id);
  if (!modal) return null;

  const minimalPage: PageBuilder = {
    slug: modal.id,
    title: modal.title ?? "",
    sectionOrder: modal.sectionOrder,
    definitions: modal.definitions,
    bgKey: "_none",
  };

  const modalAssetBase = getAssetBaseUrl(null);
  const viewportWidthPx = resolveViewportWidthForExpansion(options);
  const expanded = expandPageBuilder(minimalPage, {
    assetBase: modalAssetBase,
    breakpoints: options?.breakpoints,
    ...(viewportWidthPx !== undefined ? { viewportWidthPx } : {}),
  });
  const bgDefinitionsRaw = buildRawBgDefinitions(modal.definitions);

  const resolved = resolvePageBuilderAssetsOnServer(
    null,
    expanded.sections.map((section) => ({ ...section }) as SectionBlock),
    bgDefinitionsRaw,
    [],
    { isMobile: options?.isMobile }
  );

  let resolvedSections = resolved.resolvedSections;
  if (options?.transformSections) {
    resolvedSections = options.transformSections(resolvedSections);
  }
  resolvedSections = applyBuilderElementDefaultsToSections(resolvedSections);
  resolvedSections = resolveEntranceMotionsIntoSections(resolvedSections);

  return {
    id: modal.id,
    title: modal.title,
    resolvedSections,
    transition: modal.transition,
    ...(modal.motion !== undefined ? { motion: modal.motion } : {}),
  };
}

export function getPageBuilderProps(
  slug: string,
  options?: GetPageBuilderPropsOptions
): PageBuilderPageProps | null {
  const page = getPage(slug, options);
  if (!page) return null;

  const assetBase = getAssetBaseUrl(page);
  if (options?.assetBaseUrl != null && assetBase !== options.assetBaseUrl) {
    return null;
  }

  const resolvedBg = page.bg ? resolveBgBlockUrls(page.bg, assetBase) : null;
  let resolvedSections = (page.sections ?? []).map((section) =>
    resolveSectionBlockUrls(section, assetBase)
  );
  if (options?.transformSections) {
    resolvedSections = options.transformSections(resolvedSections);
  }
  resolvedSections = applyBuilderElementDefaultsToSections(resolvedSections);
  resolvedSections = resolveEntranceMotionsIntoSections(resolvedSections);

  const bgDefinitions = buildResolvedBgDefinitions(page.definitions, assetBase);
  const overlayViewportWidthPx = resolveViewportWidthForExpansion(options);
  const overlaySections = loadOverlaySections(
    (page as { disableOverlays?: string[] }).disableOverlays,
    {
      breakpoints: options?.breakpoints,
      viewportWidthPx: overlayViewportWidthPx,
    }
  );

  return {
    page: stripPageForClient(page),
    resolvedBg,
    resolvedSections,
    bgDefinitions,
    ...(overlaySections.length > 0 ? { overlaySections } : {}),
  };
}

export async function getPageBuilderPropsAsync(
  slug: string,
  options?: GetPageBuilderPropsOptions
): Promise<PageBuilderPageProps | null> {
  const page = await getPageAsync(slug, options);
  if (!page) return null;

  const assetBase = getAssetBaseUrl(page);
  if (options?.assetBaseUrl != null && assetBase !== options.assetBaseUrl) {
    return null;
  }

  const resolvedBg: bgBlock | null = page.bg ? ({ ...page.bg } as bgBlock) : null;
  let resolvedSections: SectionBlock[] = (page.sections ?? []).map(
    (section) => ({ ...section }) as SectionBlock
  );
  if (options?.transformSections) {
    resolvedSections = options.transformSections(resolvedSections);
  }
  resolvedSections = applyBuilderElementDefaultsToSections(resolvedSections);

  const bgDefinitionsRaw = buildRawBgDefinitions(page.definitions);
  const transitionsArray = page.transitions
    ? Array.isArray(page.transitions)
      ? page.transitions
      : [page.transitions]
    : [];

  const injected = resolvePageBuilderAssetsOnServer(
    resolvedBg,
    resolvedSections,
    bgDefinitionsRaw,
    transitionsArray,
    { isMobile: options?.isMobile }
  );

  const injectedSections = resolveEntranceMotionsIntoSections(injected.resolvedSections);
  const overlayViewportWidthPx = resolveViewportWidthForExpansion(options);
  const overlaySections = loadOverlaySections(
    (page as { disableOverlays?: string[] }).disableOverlays,
    {
      breakpoints: options?.breakpoints,
      viewportWidthPx: overlayViewportWidthPx,
    }
  );

  return {
    page: stripPageForClient(page),
    resolvedBg: injected.resolvedBg,
    resolvedSections: injectedSections,
    bgDefinitions: injected.bgDefinitions,
    ...(overlaySections.length > 0 ? { overlaySections } : {}),
    ...(options?.isMobile !== undefined ? { serverIsMobile: options.isMobile } : {}),
  };
}

const MOBILE_UA_REGEX = /iPhone|iPad|iPod|Android/i;

export function isMobileFromUserAgent(userAgent: string): boolean {
  return MOBILE_UA_REGEX.test(userAgent);
}

export {
  setPageBuilderHostConfig,
  getPageBuilderHostConfig,
  getPbBuilderDefaults,
  getPbContentGuidelines,
  applyPbDefaultTextAlign,
  discoverAllPages,
  resolvePagePath,
  loadModal,
  getPageSlugBases,
  getPageSlugs,
  getPageSlugsByBase,
};

export type { PageEntry, ModalBuilder, ModalProps, PageBuilderHostConfig };
