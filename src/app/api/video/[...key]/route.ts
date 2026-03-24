import { NextRequest, NextResponse } from "next/server";
import { validateAssetKey, getSignedCdnUrl } from "@/core/lib/cdn-asset-server";

/**
 * GET /api/video/[...key] – validate asset key and redirect to a fresh signed CDN URL.
 * Key can be a single segment (e.g. video.webm) or path/filename (e.g. dump_3d_test/albedo_card.webp).
 * Catch-all ensures path keys are not split when the server decodes %2F to /.
 */
export async function GET(
  _request: NextRequest,
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

    const cdnUrl = getSignedCdnUrl(assetKey);

    // Redirect all asset types to the signed CDN URL — browser/Three.js fetches
    // directly from Bunny. Vercel serves only this tiny redirect, not the asset bytes.
    return NextResponse.redirect(cdnUrl, 302);
  } catch (_error) {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
