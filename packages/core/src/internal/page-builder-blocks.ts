import * as globalsModule from "@/core/lib/globals";
import * as proxyUrlModule from "@/core/lib/proxy-url";
import type { ElementBlock, ResolvedPage, SectionBlock, bgBlock } from "@pb/contracts";
import { readInteropExport } from "@pb/core/internal/interop";
import {
  walkBgBlock,
  walkElement,
  walkSection,
} from "@pb/core/internal/resolved-assets/page-builder-asset-tree-walk";

const globalAssetBaseUrl = readInteropExport<string>(globalsModule, "assetBaseUrl");
const buildProxyUrl = readInteropExport<(ref: string) => string>(proxyUrlModule, "buildProxyUrl");
const isAssetKey = readInteropExport<(value: string) => boolean>(proxyUrlModule, "isAssetKey");

const BG_BLOCK_TYPES = new Set([
  "backgroundVideo",
  "backgroundImage",
  "backgroundVariable",
  "backgroundPattern",
]);

export function isBgBlockShape(value: unknown): value is bgBlock {
  return (
    value != null &&
    typeof value === "object" &&
    "type" in value &&
    typeof (value as { type: string }).type === "string" &&
    BG_BLOCK_TYPES.has((value as { type: string }).type)
  );
}

export function getAssetBaseUrl(page: ResolvedPage | null): string {
  if (page?.assetBaseUrl != null && typeof page.assetBaseUrl === "string") return page.assetBaseUrl;
  return globalAssetBaseUrl;
}

export function resolveBgBlockUrls(block: bgBlock, _base: string): bgBlock {
  const out = { ...block } as Record<string, unknown>;
  walkBgBlock(out as bgBlock, (key, value, node) => {
    if (typeof value !== "string") return;
    if (!isAssetKey(value)) return;
    (node as Record<string, string>)[key] = buildProxyUrl(value);
  });
  return out as bgBlock;
}

export function resolveElementBlockUrls(block: ElementBlock, _base: string): ElementBlock {
  const out = { ...block } as Record<string, unknown>;
  walkElement(out as ElementBlock, (key, value, node) => {
    if (typeof value !== "string") return;
    if (!isAssetKey(value)) return;
    (node as Record<string, string>)[key] = buildProxyUrl(value);
  });
  return out as ElementBlock;
}

export function resolveSectionBlockUrls(block: SectionBlock, _base: string): SectionBlock {
  const out = { ...block } as SectionBlock & Record<string, unknown>;
  walkSection(out as SectionBlock, (key, value, node) => {
    if (typeof value !== "string") return;
    if (!isAssetKey(value)) return;
    (node as Record<string, string>)[key] = buildProxyUrl(value);
  });
  return out as SectionBlock;
}
