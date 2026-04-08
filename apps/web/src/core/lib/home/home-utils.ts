import type { HeroProject } from "@/core/lib/globals";
import { buildProxyUrl, needsProxyUrl } from "@/core/lib/proxy-url";

/** Wrap index into [0, length). */
export function wrapIndex(index: number, length: number): number {
  if (length <= 0) return 0;
  if (index < 0) {
    return ((index % length) + length) % length;
  }
  if (index >= length) {
    return index % length;
  }
  return index;
}

/** Opacity for carousel position 0-6 (center=3). */
export function getHeroCarouselOpacity(position: number): number {
  const opacities = [0, 0.2, 0.4, 0.8, 0.4, 0.2, 0];
  return opacities[position] ?? 0;
}

export function getProjectUrl(project: HeroProject): string {
  return `/work/${project.slug}`;
}

/** Background color for carousel placeholder (hue shifts by index). */
export function getCarouselPlaceholderBg(activeIndex: number): string {
  return `hsl(${(activeIndex * 45) % 360}, 20%, 10%)`;
}

function normalizeAssetKeyCandidate(value: string): string {
  const withoutHash = value.split("#")[0] ?? "";
  const withoutQuery = withoutHash.split("?")[0] ?? "";
  return withoutQuery.trim().replace(/^\/+/, "");
}

function buildProxyUrlForCandidate(value: string): string | null {
  const key = normalizeAssetKeyCandidate(value);
  if (!key || !needsProxyUrl(key)) return null;
  return buildProxyUrl(key);
}

function extractAssetKeyFromAllowedCdnUrl(value: string): string | null {
  try {
    const parsed = new URL(value);
    const host = parsed.hostname.toLowerCase();
    const isAllowedHost = host === "media.notlukagray.com" || host.endsWith(".b-cdn.net");
    if (!isAllowedHost) return null;

    let key = decodeURIComponent(parsed.pathname).replace(/^\/+/, "");
    if (key.startsWith("website/")) {
      key = key.slice("website/".length);
    }
    return needsProxyUrl(key) ? key : null;
  } catch {
    return null;
  }
}

/**
 * Enforce token-safe homepage media URLs:
 * - asset keys and legacy CDN URLs are rewritten to same-origin /api/video/... proxy URLs
 * - unknown absolute URLs are dropped to avoid unsigned direct CDN usage
 */
export function resolveHomeMediaUrl(raw: string | undefined): string | undefined {
  if (typeof raw !== "string") return undefined;
  const value = raw.trim();
  if (!value) return undefined;
  if (value.startsWith("/api/video/") || value.startsWith("data:") || value.startsWith("blob:")) {
    return value;
  }

  if (value.startsWith("http://") || value.startsWith("https://")) {
    const cdnKey = extractAssetKeyFromAllowedCdnUrl(value);
    return cdnKey ? buildProxyUrl(cdnKey) : undefined;
  }

  const proxyFromAsset = buildProxyUrlForCandidate(value);
  if (proxyFromAsset) return proxyFromAsset;

  return undefined;
}
