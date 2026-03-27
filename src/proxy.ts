import { NextRequest, NextResponse } from "next/server";
import { PROTECTED_SLUGS } from "@/core/lib/protected-slugs.generated";
import { accessCookieName } from "@/core/lib/auth-constants";
import { verifyAccessTokenEdge } from "@/core/lib/access-cookie-edge";

/**
 * Proxy for /work/*:
 * When slug is protected and SITE_PASSWORD is set, redirect to /
 * with unlock_redirect if the access cookie is missing or invalid.
 *
 * NOTE: Do not rewrite to /mobile or /desktop variants. The app now uses
 * a universal catch-all route and resolves breakpoint from request headers.
 * @see https://nextjs.org/docs/app/api-reference/file-conventions/proxy
 */
export async function proxy(request: NextRequest) {
  const pathname = request.nextUrl.pathname;
  const workMatch = pathname.match(/^\/work\/(.+?)\/?$/);
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

  return NextResponse.next();
}

export const config = {
  matcher: ["/work/:path*"],
};
