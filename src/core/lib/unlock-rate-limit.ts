import { createHmac, timingSafeEqual } from "crypto";
import {
  rateLimitCookieName,
  rateLimitMaxAttempts,
  rateLimitLockoutMinutes,
  rateLimitCookieExpiryHours,
} from "./globals";

type RateLimitPayload = {
  count: number;
  lockedUntil?: number;
};

function getSecret(): string | undefined {
  return process.env.SITE_PASSWORD;
}

function sign(payload: string): string {
  const secret = getSecret();
  if (!secret) return "";
  return createHmac("sha256", secret).update(payload).digest("base64url");
}

function verify(payload: string, signature: string): boolean {
  const secret = getSecret();
  if (!secret) return false;
  const expected = createHmac("sha256", secret).update(payload).digest("base64url");
  if (signature.length !== expected.length) return false;
  try {
    return timingSafeEqual(Buffer.from(signature, "utf8"), Buffer.from(expected, "utf8"));
  } catch {
    return false;
  }
}

export function getUnlockRateLimitState(cookieHeader: string | null): {
  locked: boolean;
  lockedUntil?: number;
  count: number;
} {
  if (!cookieHeader) return { locked: false, count: 0 };

  const match = cookieHeader.match(new RegExp(`${rateLimitCookieName}=([^;]+)`));
  const value = match?.[1]?.trim();
  if (!value) return { locked: false, count: 0 };

  const [payloadB64, signature] = value.split(".");
  if (!payloadB64 || !signature || !verify(payloadB64, signature)) {
    return { locked: false, count: 0 };
  }

  try {
    const json = Buffer.from(payloadB64, "base64url").toString("utf8");
    const data = JSON.parse(json) as RateLimitPayload;
    const count = typeof data.count === "number" ? data.count : 0;
    const lockedUntil = typeof data.lockedUntil === "number" ? data.lockedUntil : undefined;

    const now = Date.now();
    if (lockedUntil != null && now < lockedUntil) {
      return { locked: true, lockedUntil, count };
    }
    return { locked: false, count };
  } catch {
    return { locked: false, count: 0 };
  }
}

export function getRateLimitCookieHeader(currentCount: number): string {
  const count = currentCount + 1;
  const now = Date.now();
  const lockoutMs = rateLimitLockoutMinutes * 60 * 1000;
  const lockedUntil = count >= rateLimitMaxAttempts ? now + lockoutMs : undefined;

  const payload: RateLimitPayload = { count, ...(lockedUntil != null && { lockedUntil }) };
  const payloadB64 = Buffer.from(JSON.stringify(payload), "utf8").toString("base64url");
  const signature = sign(payloadB64);
  if (!signature) return "";

  const value = `${payloadB64}.${signature}`;
  const cookieExpirySeconds = rateLimitCookieExpiryHours * 60 * 60;
  const maxAge = lockedUntil != null ? Math.ceil((lockedUntil - now) / 1000) : cookieExpirySeconds;
  return `${rateLimitCookieName}=${value}; Path=/; HttpOnly; SameSite=Lax; Max-Age=${maxAge}`;
}

export function getClearRateLimitCookieHeader(): string {
  return `${rateLimitCookieName}=; Path=/; HttpOnly; SameSite=Lax; Max-Age=0`;
}

export const RATE_LIMIT_COOKIE_NAME = rateLimitCookieName;
export const MAX_ATTEMPTS = rateLimitMaxAttempts;
export const LOCKOUT_MS = rateLimitLockoutMinutes * 60 * 1000;
