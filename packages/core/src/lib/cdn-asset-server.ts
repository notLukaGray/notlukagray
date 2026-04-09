import { createHash } from "crypto";
import { getCoreGlobals } from "./globals";

function getSecret(): string | undefined {
  return (
    process.env.BUNNY_TOKEN_SECRET ||
    process.env.BUNNY_SECURITY_KEY ||
    process.env.VIDEO_TOKEN_SECRET
  );
}

function encodePathPreservingSlashes(path: string): string {
  return path
    .split("/")
    .map((seg) => encodeURIComponent(seg))
    .join("/");
}

export function validateAssetKey(key: string): string | null {
  if (!key || typeof key !== "string") return null;

  // Normalize slashes first
  key = key.replace(/\\/g, "/");

  // Decode percent-encoding (so "%20" etc are validated as the actual characters)
  // If your keys may include literal "%" characters, you will need a different strategy.
  try {
    key = decodeURIComponent(key).trim();
  } catch {
    return null;
  }

  if (!key || key.length > 512) return null;

  // Basic traversal / malformed checks
  if (key.includes("..")) return null;
  if (key.startsWith("/") || key.endsWith("/")) return null;
  if (key.includes("//")) return null;

  const parts = key.split("/");

  // No empty or dot segments
  if (parts.length === 0) return null;
  if (parts.some((p) => p.length === 0 || p === ".")) return null;

  // Optional: cap depth to prevent absurd keys
  if (parts.length > 25) return null;

  const filename = parts[parts.length - 1];
  if (!filename || filename.startsWith(".")) return null;

  const { cdnAllowedExtensions } = getCoreGlobals();
  const hasValidExtension = cdnAllowedExtensions.some((ext) =>
    filename.toLowerCase().endsWith(ext.toLowerCase())
  );
  if (!hasValidExtension) return null;

  // Allowed characters per segment
  // Current: letters, numbers, underscore, dash, dot
  // If you need spaces or parentheses, expand this regex.
  const safePart = /^[a-zA-Z0-9_.-]+$/;
  if (!parts.every((p) => safePart.test(p))) return null;

  // Return normalized key with single "/" separators
  return parts.join("/");
}

export function generateBunnyToken(
  signaturePath: string,
  expiresAt: number,
  parameterData: string = ""
): string {
  try {
    const secret = getSecret();
    if (!secret) return "";
    const hashableBase = secret + signaturePath + String(expiresAt) + parameterData;
    const hash = createHash("sha256").update(hashableBase).digest("base64");
    return hash.replace(/\+/g, "-").replace(/\//g, "_").replace(/=/g, "");
  } catch {
    return "";
  }
}

export const CDN_ASSET_CONTENT_TYPES: Record<string, string> = {
  ".exr": "application/exr",
  ".hdr": "application/hdr",
  ".webp": "image/webp",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".png": "image/png",
  ".glb": "model/gltf-binary",
  ".gltf": "model/gltf+json",
  ".webm": "video/webm",
  ".mp4": "video/mp4",
};

export function getContentTypeForAssetKey(assetKey: string): string {
  const ext = assetKey.toLowerCase().slice(assetKey.lastIndexOf("."));
  return CDN_ASSET_CONTENT_TYPES[ext] ?? "application/octet-stream";
}

/**
 * Build query param string for token hash (Bunny requires all query params except token/expires
 * to be included in the signature, sorted alphabetically, form-encoded).
 */
function buildSortedParamString(params: Record<string, string>): string {
  const entries = Object.entries(params).filter(
    ([k, v]) => k !== "token" && k !== "expires" && v != null && v !== ""
  );
  entries.sort(([a], [b]) => a.localeCompare(b));
  return entries.map(([k, v]) => `${k}=${v}`).join("&");
}

/**
 * Signed CDN URL for an asset. For images, pass extraParams (width, height, quality, format, aspect_ratio) so they are
 * included in the token signature—Bunny rejects requests where query params don't match the hash.
 */
export function getSignedCdnUrl(assetKey: string, extraParams?: Record<string, string>): string {
  const { cdnTokenExpiryDays, cdnBase } = getCoreGlobals();
  const tokenExpirySeconds = cdnTokenExpiryDays * 24 * 60 * 60;
  const expiresAt = Math.floor(Date.now() / 1000) + tokenExpirySeconds;

  const encodedKey = encodePathPreservingSlashes(assetKey);
  const pathForSigning = `/website/${encodedKey}`;

  const parameterData = extraParams ? buildSortedParamString(extraParams) : "";
  const token = generateBunnyToken(pathForSigning, expiresAt, parameterData);

  const base = cdnBase.replace(/\/+$/, "");
  if (!token) return `${base}/${encodedKey}`;

  const search = new URLSearchParams({ token, expires: String(expiresAt) });
  if (extraParams) {
    for (const [k, v] of Object.entries(extraParams)) {
      if (v != null && v !== "") search.set(k, v);
    }
  }
  return `${base}/${encodedKey}?${search.toString()}`;
}

export async function fetchAssetFromCdn(
  ref: string
): Promise<{ buffer: ArrayBuffer; contentType: string } | null> {
  const assetKey = validateAssetKey(ref);
  if (!assetKey) return null;

  const url = getSignedCdnUrl(assetKey);
  const res = await fetch(url, { cache: "force-cache" });
  if (!res.ok) return null;

  const buffer = await res.arrayBuffer();
  const contentType = getContentTypeForAssetKey(assetKey);
  return { buffer, contentType };
}
