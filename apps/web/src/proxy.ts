import { NextRequest, NextResponse } from "next/server";
import { PROTECTED_PAGE_PATHS } from "@/core/lib/protected-slugs.generated";
import { accessCookieName } from "@/core/lib/auth-constants";
import { verifyAccessTokenEdge } from "@/core/lib/access-cookie-edge";

/**
 * Proxy for protected page paths:
 * When path is protected and SITE_PASSWORD is set:
 * - redirect to the same path with `?unlock=1` if the access cookie is missing/invalid
 * - allow the request through when `unlock=1` is present so the page can render under unlock modal
 *
 * NOTE: Do not rewrite to /mobile or /desktop variants. The app now uses
 * a universal catch-all route and resolves breakpoint from request headers.
 * @see https://nextjs.org/docs/app/api-reference/file-conventions/proxy
 */
export async function proxy(request: NextRequest) {
  if (typeof process.env.SITE_PASSWORD !== "string" || process.env.SITE_PASSWORD.length === 0) {
    return NextResponse.next();
  }

  const pathname = request.nextUrl.pathname;
  const normalizedPath = pathname.replace(/^\/+|\/+$/g, "");
  if (!normalizedPath) return NextResponse.next();
  if (!PROTECTED_PAGE_PATHS.has(normalizedPath)) return NextResponse.next();

  const token = request.cookies.get(accessCookieName)?.value;
  const valid = await verifyAccessTokenEdge(token);
  const wantsUnlock = request.nextUrl.searchParams.get("unlock") === "1";

  if (!valid) {
    if (wantsUnlock) return NextResponse.next();

    const url = request.nextUrl.clone();
    url.searchParams.set("unlock", "1");
    return NextResponse.redirect(url);
  }

  if (wantsUnlock) {
    const url = request.nextUrl.clone();
    url.searchParams.delete("unlock");
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico|.*\\..*).*)"],
};
