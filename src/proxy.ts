import { NextRequest, NextResponse } from "next/server";
import { PROTECTED_SLUGS } from "@/core/lib/protected-slugs.generated";
import { accessCookieName } from "@/core/lib/auth-constants";
import { verifyAccessTokenEdge } from "@/core/lib/access-cookie-edge";

/** UA-based breakpoint: rewrite /work/[slug] to /work/[slug]/mobile|desktop so the page can be static (no headers()). */
function isMobileUserAgent(userAgent: string): boolean {
  return /iPhone|iPad|iPod|Android/i.test(userAgent);
}

/**
 * Proxy for /work/[slug]:
 * 1) When slug is protected and SITE_PASSWORD is set, redirect to / with unlock_redirect if the access cookie is missing or invalid.
 * 2) When path is exactly /work/[slug] (no variant), rewrite to /work/[slug]/mobile or /work/[slug]/desktop from UA so the app can serve static HTML without headers().
 * Auth and UA rewrite in the proxy keep work pages statically generated.
 * @see https://nextjs.org/docs/app/api-reference/file-conventions/proxy
 */
export async function proxy(request: NextRequest) {
  const pathname = request.nextUrl.pathname;
  const workMatch = pathname.match(/^\/work\/([^/]+)\/?$/);
  if (!workMatch) return NextResponse.next();
  const slug = workMatch[1]!;

  if (PROTECTED_SLUGS.has(slug) && typeof process.env.SITE_PASSWORD === "string") {
    const token = request.cookies.get(accessCookieName)?.value;
    const valid = await verifyAccessTokenEdge(token);
    if (!valid) {
      const url = new URL("/", request.url);
      url.searchParams.set("unlock_redirect", `/work/${slug}`);
      return NextResponse.redirect(url);
    }
  }

  const ua = request.headers.get("user-agent") ?? "";
  const variant = isMobileUserAgent(ua) ? "mobile" : "desktop";
  const rewriteUrl = new URL(`/work/${slug}/${variant}`, request.url);
  return NextResponse.rewrite(rewriteUrl);
}

export const config = {
  matcher: ["/work/:path*"],
};
