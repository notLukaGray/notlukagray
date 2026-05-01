import { createHmac, timingSafeEqual } from "crypto";
import { buildCookieHeader } from "../cookies/build-cookie-header";
import { getRememberedCount, rememberFingerprint } from "../rate-limit/memory-store";

const DEFAULT_MAX_PER_HOUR = 5;
const HOUR_MS = 60 * 60 * 1000;

type Payload = { timestamps: number[]; fp?: string };

function getSecret(): string | undefined {
  return process.env.SITE_PASSWORD ?? process.env.FORM_RATE_LIMIT_SECRET;
}

function getCookieName(handlerKey: string): string {
  return `form_rate_${handlerKey.replace(/[^a-z0-9-]/gi, "_")}`;
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

function parseCookie(cookieHeader: string | null, handlerKey: string): Payload | null {
  if (!cookieHeader) return null;
  const name = getCookieName(handlerKey);
  const match = cookieHeader.match(new RegExp(`${name}=([^;]+)`));
  const value = match?.[1]?.trim();
  if (!value) return null;
  const [payloadB64, sig] = value.split(".");
  if (!payloadB64 || !sig || !verify(payloadB64, sig)) return null;
  try {
    const json = Buffer.from(payloadB64, "base64url").toString("utf8");
    const data = JSON.parse(json) as Payload;
    return Array.isArray(data.timestamps) ? data : null;
  } catch {
    return null;
  }
}

export function getFormRateLimitState(
  cookieHeader: string | null,
  handlerKey: string,
  maxPerHour: number = DEFAULT_MAX_PER_HOUR,
  fp?: string
): { count: number; allowed: boolean } {
  const payload = parseCookie(cookieHeader, handlerKey);
  if (!payload) return { count: 0, allowed: true };

  const now = Date.now();
  const cutoff = now - HOUR_MS;
  let recent = payload.timestamps.filter((t) => typeof t === "number" && t > cutoff);

  const cookieFp = typeof payload.fp === "string" ? payload.fp : undefined;

  if (fp && cookieFp !== fp) {
    const remembered = getRememberedCount(fp);
    if (remembered != null) {
      recent = Array.from({ length: remembered }, () => cutoff + 1);
    }
  }

  return { count: recent.length, allowed: recent.length < maxPerHour };
}

export function getFormRateLimitCookieHeader(
  cookieHeader: string | null,
  handlerKey: string,
  maxPerHour: number = DEFAULT_MAX_PER_HOUR,
  fp?: string
): string {
  const payload = parseCookie(cookieHeader, handlerKey);
  const now = Date.now();
  const cutoff = now - HOUR_MS;
  const timestamps = payload?.timestamps ?? [];
  const recent = [...timestamps.filter((t: number) => t > cutoff), now].slice(-maxPerHour);

  if (fp) {
    rememberFingerprint(fp, recent.length, HOUR_MS);
  }

  const data: Payload = { timestamps: recent, ...(fp != null && { fp }) };
  const payloadB64 = Buffer.from(JSON.stringify(data), "utf8").toString("base64url");
  const signature = sign(payloadB64);
  if (!signature) return "";
  const name = getCookieName(handlerKey);
  const value = `${payloadB64}.${signature}`;
  return buildCookieHeader({ name, value, maxAge: 3600 });
}

export function getClearFormRateLimitCookieHeader(handlerKey: string): string {
  return buildCookieHeader({ name: getCookieName(handlerKey), value: "", maxAge: 0 });
}
