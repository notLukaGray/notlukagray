import { NextRequest, NextResponse } from "next/server";
import { formRateLimitMaxPerHour } from "@/core/lib/globals";
import { getFormRateLimitState, getFormRateLimitCookieHeader } from "./form-rate-limit";
import { formRateLimitResponse } from "./form-responses";

/**
 * Checks form rate limit for the given handler. Returns a 429 NextResponse if over limit.
 * Otherwise returns null and the route should call getFormRateLimitCookieHeader after success.
 */
export function checkFormRateLimit(
  request: NextRequest,
  handlerKey: string,
  maxPerHour: number = formRateLimitMaxPerHour
): NextResponse | null {
  const cookieHeader = request.headers.get("cookie");
  const { allowed } = getFormRateLimitState(cookieHeader, handlerKey, maxPerHour);
  if (!allowed) {
    return formRateLimitResponse("Too many submissions. Please try again in an hour.", 3600);
  }
  return null;
}

export function buildFormRateLimitCookie(
  request: NextRequest,
  handlerKey: string,
  maxPerHour: number = formRateLimitMaxPerHour
): string {
  return getFormRateLimitCookieHeader(request.headers.get("cookie"), handlerKey, maxPerHour);
}
