import { getSignedCdnUrl, validateAssetKey } from "@/core/lib/cdn-asset-server";
import { buildProxyUrl, needsProxyUrl } from "@/core/lib/proxy-url";
import { resolveBgBlockUrls } from "@/page-builder/core/page-builder-blocks";
import type {
  bgBlock,
  PageBuilderDefinitionBlock,
  SectionBlock,
} from "@/page-builder/core/page-builder-schemas";
import type { GetSignedImageUrlFn } from "@/page-builder/core/page-builder-resolved-assets";
import { getBunnyImageParams } from "@/page-builder/core/page-builder-resolved-assets";
import {
  collectPageBuilderAssetRefs,
  injectResolvedUrlsIntoPage,
  injectResolvedUrlsIntoBgBlock,
} from "@/page-builder/core/page-builder-resolved-assets";
import type { BackgroundTransitionEffect } from "@/page-builder/core/page-builder-types";
import { createMemoizedComputeContainerWidthPx } from "./server/page-builder-container-width-server";

const BG_TYPES_FOR_DEFINITIONS = new Set([
  "backgroundVideo",
  "backgroundImage",
  "backgroundVariable",
  "backgroundPattern",
  "backgroundTransition",
]);

function isBgDefinition(block: unknown): block is bgBlock {
  return (
    block != null &&
    typeof block === "object" &&
    "type" in block &&
    BG_TYPES_FOR_DEFINITIONS.has((block as { type: string }).type)
  );
}

export function buildResolvedBgDefinitions(
  definitions: Record<string, PageBuilderDefinitionBlock> | undefined,
  assetBase: string
): Record<string, bgBlock> {
  const out: Record<string, bgBlock> = {};
  if (!definitions) return out;
  for (const [key, block] of Object.entries(definitions)) {
    if (isBgDefinition(block)) out[key] = resolveBgBlockUrls(block, assetBase);
  }
  return out;
}

export function buildRawBgDefinitions(
  definitions: Record<string, PageBuilderDefinitionBlock> | undefined
): Record<string, bgBlock> {
  const out: Record<string, bgBlock> = {};
  if (!definitions) return out;
  for (const [key, block] of Object.entries(definitions)) {
    if (isBgDefinition(block)) out[key] = { ...block };
  }
  return out;
}

function buildProxyUrlMapServer(refs: string[]): Map<string, string> {
  const m = new Map<string, string>();
  for (const ref of refs) {
    if (ref && needsProxyUrl(ref)) m.set(ref, buildProxyUrl(ref));
  }
  return m;
}

function collectAllRefs(
  resolvedBg: bgBlock | null,
  resolvedSections: SectionBlock[],
  bgDefinitionsRaw: Record<string, bgBlock>,
  transitionsArray: BackgroundTransitionEffect[]
): string[] {
  const refsSet = new Set<string>();
  for (const r of collectPageBuilderAssetRefs(resolvedBg, resolvedSections)) refsSet.add(r);
  for (const t of transitionsArray) {
    const fromBg = t.from && bgDefinitionsRaw[t.from] ? bgDefinitionsRaw[t.from] : null;
    const toBg = t.to && bgDefinitionsRaw[t.to] ? bgDefinitionsRaw[t.to] : null;
    if (fromBg) for (const r of collectPageBuilderAssetRefs(fromBg, [])) refsSet.add(r);
    if (toBg) for (const r of collectPageBuilderAssetRefs(toBg, [])) refsSet.add(r);
  }
  return Array.from(refsSet);
}

export type ResolvePageBuilderAssetsResult = {
  resolvedBg: bgBlock | null;
  resolvedSections: SectionBlock[];
  bgDefinitions: Record<string, bgBlock>;
};

function buildGetSignedImageUrl(
  urlByRef: Map<string, string | null>,
  proxyUrlByRef: Map<string, string>,
  options: { isMobile?: boolean } | undefined,
  computeContainerWidthPxMemo: (
    section: SectionBlock,
    elementId: string | undefined,
    isMobile: boolean
  ) => number | undefined
): GetSignedImageUrlFn {
  return (ref, obj, assetKey, elementContext) => {
    const valid = validateAssetKey(ref);
    if (!valid) return urlByRef.get(ref) ?? proxyUrlByRef.get(ref) ?? ref;
    const containerWidthPx =
      elementContext != null
        ? computeContainerWidthPxMemo(
            elementContext.section,
            elementContext.element.id,
            options?.isMobile === true
          )
        : undefined;
    const params = getBunnyImageParams(obj, assetKey, {
      isMobile: options?.isMobile,
      containerWidthPx,
    });
    const extraParams: Record<string, string> = {};
    if (params.class != null && params.class !== "") {
      extraParams.class = params.class;
      if (params.format) extraParams.format = params.format;
    } else {
      extraParams.format = params.format;
      extraParams.quality = String(params.quality);
      extraParams.width = String(params.width);
      if (params.aspect_ratio) extraParams.aspect_ratio = params.aspect_ratio;
      if (params.height != null) extraParams.height = String(params.height);
    }
    return getSignedCdnUrl(valid, extraParams);
  };
}

export function resolvePageBuilderAssetsOnServer(
  resolvedBg: bgBlock | null,
  resolvedSections: SectionBlock[],
  bgDefinitionsRaw: Record<string, bgBlock>,
  transitionsArray: BackgroundTransitionEffect[],
  options?: { isMobile?: boolean }
): ResolvePageBuilderAssetsResult {
  const refs = collectAllRefs(resolvedBg, resolvedSections, bgDefinitionsRaw, transitionsArray);

  const urlByRef = new Map<string, string | null>();
  for (const ref of refs) {
    const valid = validateAssetKey(ref);
    if (valid) urlByRef.set(ref, getSignedCdnUrl(valid));
  }
  const proxyUrlByRef = buildProxyUrlMapServer(refs);

  const computeContainerWidthPxMemo = createMemoizedComputeContainerWidthPx();
  const getSignedImageUrl = buildGetSignedImageUrl(
    urlByRef,
    proxyUrlByRef,
    options,
    computeContainerWidthPxMemo
  );

  const injected = injectResolvedUrlsIntoPage(
    resolvedBg,
    resolvedSections,
    urlByRef,
    proxyUrlByRef,
    getSignedImageUrl
  );

  const bgDefinitions: Record<string, bgBlock> = {};
  for (const [key, block] of Object.entries(bgDefinitionsRaw)) {
    bgDefinitions[key] = injectResolvedUrlsIntoBgBlock(
      block,
      urlByRef,
      proxyUrlByRef,
      getSignedImageUrl
    );
  }

  return {
    resolvedBg: injected.resolvedBg,
    resolvedSections: injected.resolvedSections,
    bgDefinitions,
  };
}
