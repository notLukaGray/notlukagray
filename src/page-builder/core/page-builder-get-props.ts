import { cache } from "react";
import { isSafePathSegment } from "@/page-builder/core/page-builder-paths";
import type {
  FigmaExportDiagnosticsPageField,
  PageBuilderDefinitionBlock,
  ResolvedPage,
} from "@/page-builder/core/page-builder-schemas";
import type { bgBlock, SectionBlock } from "@/page-builder/core/page-builder-schemas";
import type {
  PageBuilder,
  PageDensity,
  PageScrollConfig,
} from "@/page-builder/core/page-builder-schemas";
import { expandPageBuilder } from "@/page-builder/core/page-builder-expand";
import {
  getAssetBaseUrl,
  resolveBgBlockUrls,
  resolveSectionBlockUrls,
} from "@/page-builder/core/page-builder-blocks";
import {
  isPageBuilder,
  loadPageBuilder,
  loadPageBuilderAsync,
  loadPageBuilderByPath,
  loadPageBuilderByPathAsync,
} from "@/page-builder/core/page-builder-load";
import { resolvePagePath } from "@/page-builder/core/load/page-builder-discover-pages";
import { loadModal } from "@/page-builder/core/modal-load";
import type { ModalProps } from "./modal-types";
import {
  buildRawBgDefinitions,
  buildResolvedBgDefinitions,
  resolvePageBuilderAssetsOnServer,
} from "./page-builder-resolve-assets-server";
import { resolvePageBuilderBreakpoint } from "./page-builder-resolve-breakpoint-server";
import { resolveEntranceMotionsIntoSections } from "./page-builder-resolve-entrance-motions";
import { applyBuilderElementDefaultsToSections } from "./page-builder-apply-element-defaults";
import type { BackgroundTransitionEffect } from "./page-builder-types";
import type { TriggerAction } from "./page-builder-schemas";
import { loadOverlaySections } from "./overlay/page-builder-overlay-loader";

/** Minimal page shape sent to client; avoids serializing definitions, bg, sections. */
export type PageBuilderPageClientPage = {
  slug: string;
  title: string;
  onPageProgress?: TriggerAction;
  transitions?: BackgroundTransitionEffect | BackgroundTransitionEffect[];
  scroll?: PageScrollConfig;
  density?: PageDensity;
  figmaExportDiagnostics?: FigmaExportDiagnosticsPageField;
};

function stripPageForClient(
  full: NonNullable<ReturnType<typeof getPageUncached>>
): PageBuilderPageClientPage {
  const page: PageBuilderPageClientPage = {
    slug: full.slug,
    title: full.title,
  };
  if (full.onPageProgress != null) page.onPageProgress = full.onPageProgress as TriggerAction;
  if (full.transitions != null)
    page.transitions = full.transitions as
      | BackgroundTransitionEffect
      | BackgroundTransitionEffect[];
  if (full.scroll != null) page.scroll = full.scroll as PageScrollConfig;
  if (full.density != null) page.density = full.density as PageDensity;
  const figmaExportDiagnostics = (
    full as unknown as { figmaExportDiagnostics?: FigmaExportDiagnosticsPageField }
  ).figmaExportDiagnostics;
  if (figmaExportDiagnostics != null) page.figmaExportDiagnostics = figmaExportDiagnostics;
  return page;
}

export type GetPageBuilderPropsOptions = {
  assetBaseUrl?: string;
  transformSections?: (sections: SectionBlock[]) => SectionBlock[];
  isMobile?: boolean;
};

export type PageBuilderPageProps = {
  page: PageBuilderPageClientPage;
  resolvedBg: bgBlock | null;
  resolvedSections: SectionBlock[];
  bgDefinitions: Record<string, bgBlock>;
  serverIsMobile?: boolean;
  overlaySections?: SectionBlock[];
};

export type GetModalPropsOptions = {
  transformSections?: (sections: SectionBlock[]) => SectionBlock[];
  /** When set, modal assets are resolved for this breakpoint (Bunny params, etc.). */
  isMobile?: boolean;
};

/**
 * Validate and split a slug string into segments.
 * Single-segment slugs (e.g. "project-brand") return ["project-brand"].
 * Multi-segment slugs (e.g. "work/project-brand") are split on "/" and each
 * segment is validated by isSafePathSegment.
 * Returns null if any segment is invalid.
 */
function parseSlugSegments(slug: string): string[] | null {
  if (typeof slug !== "string" || slug.length === 0) return null;
  const segments = slug.split("/");
  for (const seg of segments) {
    if (!isSafePathSegment(seg)) return null;
  }
  return segments;
}

/** Request-scoped cache: dedupes load+expand when both generateMetadata and getPageBuilderPropsAsync run for the same slug. */
function getPageUncached(
  slug: string
): (ResolvedPage & { definitions?: Record<string, PageBuilderDefinitionBlock> }) | null {
  const segments = parseSlugSegments(slug);
  if (!segments) return null;

  let page: PageBuilder | null;
  if (segments.length === 1) {
    // Non-null: length === 1 guarantees index 0 exists.
    page = loadPageBuilder(segments[0] as string);
  } else {
    const absolutePath = resolvePagePath(segments);
    if (!absolutePath) return null;
    page = loadPageBuilderByPath(absolutePath, segments);
  }
  if (page == null || !isPageBuilder(page)) return null;

  const assetBase = getAssetBaseUrl(page as ResolvedPage);
  const { bg: expandedBg, sections: sectionsWithResolvedTriggers } = expandPageBuilder(page, {
    assetBase,
  });

  return {
    ...page,
    bg: expandedBg,
    sections: sectionsWithResolvedTriggers,
    definitions: page.definitions,
  } as ResolvedPage & { definitions?: Record<string, PageBuilderDefinitionBlock> };
}

export const getPage = cache(getPageUncached);

/** Async load with parallel I/O; request-scoped cache shared with getPage for same slug. */
async function getPageAsyncUncached(
  slug: string
): Promise<(ResolvedPage & { definitions?: Record<string, PageBuilderDefinitionBlock> }) | null> {
  const segments = parseSlugSegments(slug);
  if (!segments) return null;

  let page: PageBuilder | null;
  if (segments.length === 1) {
    // Non-null: length === 1 guarantees index 0 exists.
    page = await loadPageBuilderAsync(segments[0] as string);
  } else {
    const absolutePath = resolvePagePath(segments);
    if (!absolutePath) return null;
    page = await loadPageBuilderByPathAsync(absolutePath, segments);
  }
  if (page == null || !isPageBuilder(page)) return null;

  const assetBase = getAssetBaseUrl(page as ResolvedPage);
  const { bg: expandedBg, sections: sectionsWithResolvedTriggers } = expandPageBuilder(page, {
    assetBase,
  });

  return {
    ...page,
    bg: expandedBg,
    sections: sectionsWithResolvedTriggers,
    definitions: page.definitions,
  } as ResolvedPage & { definitions?: Record<string, PageBuilderDefinitionBlock> };
}

export const getPageAsync = cache(getPageAsyncUncached);

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
  const { sections: sectionsWithTriggers } = expandPageBuilder(minimalPage, {
    assetBase: modalAssetBase,
  });
  const bgDefinitionsRaw = buildRawBgDefinitions(modal.definitions);
  // NOTE: Modals use the same ref-collect/sign/inject pipeline as full pages so modal images get
  // Bunny params and signed CDN URLs. Breakpoint resolution is skipped for modals (no resolvePageBuilderBreakpoint)
  // because modal content is typically shown in the current viewport; pass isMobile in options when you need
  // mobile-specific asset resolution.
  const { resolvedSections: resolvedSectionsFromPipeline } = resolvePageBuilderAssetsOnServer(
    null,
    sectionsWithTriggers.map((s) => ({ ...s }) as SectionBlock),
    bgDefinitionsRaw,
    [],
    { isMobile: options?.isMobile }
  );
  let resolvedSections = resolvedSectionsFromPipeline;
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
    ...(modal.motion !== undefined && { motion: modal.motion }),
  };
}

export function getPageBuilderProps(
  slug: string,
  options?: GetPageBuilderPropsOptions
): PageBuilderPageProps | null {
  const page = getPage(slug);
  if (!page) return null;

  const assetBase = getAssetBaseUrl(page);
  if (options?.assetBaseUrl != null && assetBase !== options.assetBaseUrl) {
    return null;
  }

  const resolvedBg = page.bg ? resolveBgBlockUrls(page.bg, assetBase) : null;
  let resolvedSections = (page.sections ?? []).map((block) =>
    resolveSectionBlockUrls(block, assetBase)
  );
  if (options?.transformSections) {
    resolvedSections = options.transformSections(resolvedSections);
  }
  resolvedSections = applyBuilderElementDefaultsToSections(resolvedSections);
  resolvedSections = resolveEntranceMotionsIntoSections(resolvedSections);
  const bgDefinitions = buildResolvedBgDefinitions(page.definitions, assetBase);
  const overlaySections = loadOverlaySections(
    (page as { disableOverlays?: string[] }).disableOverlays
  );

  return {
    page: stripPageForClient(page),
    resolvedBg,
    resolvedSections,
    bgDefinitions,
    ...(overlaySections.length > 0 && { overlaySections }),
  };
}

export async function getPageBuilderPropsAsync(
  slug: string,
  options?: GetPageBuilderPropsOptions
): Promise<PageBuilderPageProps | null> {
  const page = await getPageAsync(slug);
  if (!page) return null;

  const assetBase = getAssetBaseUrl(page);
  if (options?.assetBaseUrl != null && assetBase !== options.assetBaseUrl) {
    return null;
  }

  const resolvedBg: bgBlock | null = page.bg ? ({ ...page.bg } as bgBlock) : null;
  let resolvedSections: SectionBlock[] = (page.sections ?? []).map(
    (s) => ({ ...s }) as SectionBlock
  );
  if (options?.transformSections) {
    resolvedSections = options.transformSections(resolvedSections);
  }
  resolvedSections = applyBuilderElementDefaultsToSections(resolvedSections);

  const bgDefinitionsRaw = buildRawBgDefinitions(page.definitions);

  let treeForAssets = {
    resolvedBg,
    resolvedSections,
    bgDefinitionsRaw,
  };
  if (options?.isMobile !== undefined) {
    const resolved = resolvePageBuilderBreakpoint({
      sections: treeForAssets.resolvedSections,
      bg: treeForAssets.resolvedBg,
      bgDefinitions: treeForAssets.bgDefinitionsRaw,
      isMobile: options.isMobile,
    });
    treeForAssets = {
      resolvedBg: resolved.bg,
      resolvedSections: resolved.sections,
      bgDefinitionsRaw: resolved.bgDefinitions,
    };
  }

  const transitionsArray = page.transitions
    ? Array.isArray(page.transitions)
      ? page.transitions
      : [page.transitions]
    : [];

  const {
    resolvedBg: injectedBg,
    resolvedSections: injectedSectionsRaw,
    bgDefinitions,
  } = resolvePageBuilderAssetsOnServer(
    treeForAssets.resolvedBg,
    treeForAssets.resolvedSections,
    treeForAssets.bgDefinitionsRaw,
    transitionsArray,
    { isMobile: options?.isMobile }
  );

  const injectedSections = resolveEntranceMotionsIntoSections(injectedSectionsRaw);
  const overlaySections = loadOverlaySections(
    (page as { disableOverlays?: string[] }).disableOverlays
  );

  return {
    page: stripPageForClient(page),
    resolvedBg: injectedBg,
    resolvedSections: injectedSections,
    bgDefinitions,
    ...(overlaySections.length > 0 && { overlaySections }),
    ...(options?.isMobile !== undefined && { serverIsMobile: options.isMobile }),
  };
}
