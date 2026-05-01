import { NextRequest, NextResponse } from "next/server";
import { getAccessCookieHeader, getClearAccessCookieHeader } from "@/core/lib/access-cookie";
import { buildFingerprint } from "@/core/lib/rate-limit/fingerprint";
import {
  getUnlockRateLimitState,
  getRateLimitCookieHeader,
  getClearRateLimitCookieHeader,
  LOCKOUT_MS,
} from "@/core/lib/unlock-rate-limit";

type ParsedRequest = { password: string; redirect: string };

function buildErrorResponse(message: string, status: number): NextResponse {
  return NextResponse.json({ error: message }, { status });
}

function buildLockedResponse(retryAfterSec: number): NextResponse {
  return NextResponse.json(
    {
      error: "Too many failed attempts. Please try again later.",
      retryAfterSec,
    },
    { status: 429, headers: { "Retry-After": String(retryAfterSec) } }
  );
}

function buildSuccessResponse(redirect: string): NextResponse {
  const accessCookieHeader = getAccessCookieHeader();
  if (!accessCookieHeader) {
    return NextResponse.json({ error: "Could not set access cookie." }, { status: 500 });
  }
  const safeRedirect = redirect.startsWith("/") && !redirect.startsWith("//") ? redirect : "/";
  const response = NextResponse.json({ ok: true, redirect: safeRedirect });
  response.headers.set("Set-Cookie", accessCookieHeader);
  response.headers.append("Set-Cookie", getClearRateLimitCookieHeader());
  return response;
}

async function parseRequest(request: NextRequest): Promise<ParsedRequest | NextResponse> {
  let body: { password?: string; redirect?: string };
  try {
    body = await request.json();
  } catch {
    return buildErrorResponse("Invalid body.", 400);
  }
  const password = typeof body.password === "string" ? body.password.trim() : "";
  if (!password) return buildErrorResponse("Password is required.", 400);
  const redirect = typeof body.redirect === "string" ? body.redirect.trim() : "";
  return { password, redirect };
}

function validatePassword(password: string): boolean {
  const secret = process.env.SITE_PASSWORD;
  return typeof secret === "string" && password === secret;
}

export async function POST(request: NextRequest) {
  const secret = process.env.SITE_PASSWORD;
  if (!secret) {
    return buildErrorResponse("Password protection is not configured.", 503);
  }

  const cookieHeader = request.headers.get("cookie");
  const fp = buildFingerprint(request, "unlock");
  const rateState = getUnlockRateLimitState(cookieHeader, fp);
  if (rateState.locked && rateState.lockedUntil != null) {
    const retryAfterSec = Math.ceil((rateState.lockedUntil - Date.now()) / 1000);
    return buildLockedResponse(retryAfterSec);
  }

  const parsed = await parseRequest(request);
  if (parsed instanceof NextResponse) return parsed;
  const { password, redirect } = parsed;

  if (!validatePassword(password)) {
    const rateLimitHeader = getRateLimitCookieHeader(rateState.count, fp);
    const locked = rateState.count + 1 >= 5;
    const retryAfterSec = locked ? Math.ceil(LOCKOUT_MS / 1000) : undefined;
    const response = NextResponse.json(
      {
        error: locked
          ? "Too many failed attempts. Try again in 15 minutes."
          : "Incorrect password.",
        ...(retryAfterSec != null && { retryAfterSec }),
      },
      { status: 401 }
    );
    if (rateLimitHeader) response.headers.append("Set-Cookie", rateLimitHeader);
    return response;
  }

  return buildSuccessResponse(redirect);
}

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  if (searchParams.get("lock") !== "1") {
    return NextResponse.json({ error: "Use ?lock=1 to clear access." }, { status: 400 });
  }

  const response = NextResponse.redirect(new URL("/", request.url), 302);
  response.headers.set("Set-Cookie", getClearAccessCookieHeader());
  return response;
}
