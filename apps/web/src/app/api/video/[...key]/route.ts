import { NextRequest, NextResponse } from "next/server";
import { validateAssetKey, getSignedCdnUrl } from "@/core/lib/cdn-asset-server";
import { buildProxyUrl } from "@/core/lib/proxy-url";

function parsePositiveInt(
  value: string | null,
  { min, max }: { min: number; max: number }
): number | null {
  if (value == null) return null;
  const parsed = Number(value);
  if (!Number.isFinite(parsed)) return null;
  const rounded = Math.round(parsed);
  if (rounded < min || rounded > max) return null;
  return rounded;
}

function parseImageParams(request: NextRequest): Record<string, string> | undefined {
  const searchParams = request.nextUrl.searchParams;
  const params: Record<string, string> = {};

  const width = parsePositiveInt(searchParams.get("width") ?? searchParams.get("w"), {
    min: 1,
    max: 4096,
  });
  if (width != null) params.width = String(width);

  const quality = parsePositiveInt(searchParams.get("quality") ?? searchParams.get("q"), {
    min: 1,
    max: 100,
  });
  if (quality != null) params.quality = String(quality);

  const height = parsePositiveInt(searchParams.get("height"), {
    min: 1,
    max: 4096,
  });
  if (height != null) params.height = String(height);

  const format = searchParams.get("format");
  if (format && /^(avif|webp|jpg|jpeg|png)$/i.test(format)) {
    params.format = format.toLowerCase();
  }

  const aspectRatio = searchParams.get("aspect_ratio");
  if (aspectRatio && /^\d+(?::|\/)\d+$/.test(aspectRatio)) {
    params.aspect_ratio = aspectRatio.replace("/", ":");
  }

  const className = searchParams.get("class");
  if (className && /^[a-zA-Z0-9_-]+$/.test(className)) {
    params.class = className;
  }

  return Object.keys(params).length > 0 ? params : undefined;
}

function isHlsPlaylist(assetKey: string): boolean {
  return assetKey.toLowerCase().endsWith(".m3u8");
}

function splitUriSuffix(uri: string): { pathPart: string; suffix: string } {
  const queryIndex = uri.indexOf("?");
  const hashIndex = uri.indexOf("#");
  const suffixIndex =
    queryIndex === -1 ? hashIndex : hashIndex === -1 ? queryIndex : Math.min(queryIndex, hashIndex);

  if (suffixIndex === -1) return { pathPart: uri, suffix: "" };
  return {
    pathPart: uri.slice(0, suffixIndex),
    suffix: uri.slice(suffixIndex),
  };
}

function rewriteHlsUri(line: string, baseKey: string): string {
  const trimmed = line.trim();
  if (!trimmed || trimmed.startsWith("/") || trimmed.startsWith("//")) {
    return line;
  }

  if (trimmed.startsWith("#")) {
    return line.replace(/URI="([^"]+)"/g, (_match, uri: string) => {
      if (uri.startsWith("/") || uri.startsWith("//") || /^[a-z][a-z0-9+.-]*:/i.test(uri)) {
        return `URI="${uri}"`;
      }

      const { pathPart, suffix } = splitUriSuffix(uri);
      const normalized = [baseKey, pathPart]
        .filter(Boolean)
        .join("/")
        .replace(/\/+/g, "/")
        .split("/")
        .reduce<string[]>((parts, part) => {
          if (part === ".") return parts;
          if (part === "..") {
            parts.pop();
            return parts;
          }
          parts.push(part);
          return parts;
        }, [])
        .join("/");
      const assetKey = validateAssetKey(normalized);
      return assetKey ? `URI="${buildProxyUrl(assetKey)}${suffix}"` : `URI="${uri}"`;
    });
  }

  if (/^[a-z][a-z0-9+.-]*:/i.test(trimmed)) return line;

  const { pathPart, suffix } = splitUriSuffix(trimmed);
  const normalized = [baseKey, pathPart]
    .filter(Boolean)
    .join("/")
    .replace(/\/+/g, "/")
    .split("/")
    .reduce<string[]>((parts, part) => {
      if (part === ".") return parts;
      if (part === "..") {
        parts.pop();
        return parts;
      }
      parts.push(part);
      return parts;
    }, [])
    .join("/");
  const assetKey = validateAssetKey(normalized);
  if (!assetKey) return line;

  return line.replace(trimmed, `${buildProxyUrl(assetKey)}${suffix}`);
}

function rewriteHlsPlaylist(playlist: string, assetKey: string): string {
  const slashIndex = assetKey.lastIndexOf("/");
  const baseKey = slashIndex === -1 ? "" : assetKey.slice(0, slashIndex);
  return playlist
    .split(/\r?\n/)
    .map((line) => rewriteHlsUri(line, baseKey))
    .join("\n");
}

/**
 * GET /api/video/[...key] – validate asset key and redirect to a fresh signed CDN URL.
 * Key can be a single segment (e.g. video.webm) or path/filename (e.g. dump_3d_test/albedo_card.webp).
 * Catch-all ensures path keys are not split when the server decodes %2F to /.
 */
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ key: string[] }> }
): Promise<NextResponse> {
  try {
    let keySegments: string[];
    try {
      const resolvedParams = await params;
      keySegments = resolvedParams.key;
    } catch (_error) {
      return NextResponse.json({ error: "Invalid request parameters" }, { status: 400 });
    }

    if (!Array.isArray(keySegments) || keySegments.length === 0) {
      return NextResponse.json({ error: "Missing asset key" }, { status: 400 });
    }

    const key = keySegments.join("/");

    const assetKey = validateAssetKey(key);
    if (!assetKey) {
      return NextResponse.json(
        {
          error:
            "Invalid asset key. Use filename.ext or path/filename.ext (e.g. project/asset.webp).",
        },
        { status: 400 }
      );
    }

    const cdnUrl = getSignedCdnUrl(assetKey, parseImageParams(request));

    if (isHlsPlaylist(assetKey)) {
      const upstream = await fetch(cdnUrl, { cache: "no-store" });
      if (!upstream.ok) {
        return NextResponse.json(
          { error: `Unable to fetch HLS playlist (${upstream.status}).` },
          { status: upstream.status }
        );
      }

      const playlist = rewriteHlsPlaylist(await upstream.text(), assetKey);
      return new NextResponse(playlist, {
        headers: {
          "Cache-Control": "private, max-age=60",
          "Content-Type": "application/vnd.apple.mpegurl; charset=utf-8",
        },
      });
    }

    // Redirect all asset types to the signed CDN URL — browser/Three.js fetches
    // directly from Bunny. Vercel serves only this tiny redirect, not the asset bytes.
    return NextResponse.redirect(cdnUrl, 302);
  } catch (_error) {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
