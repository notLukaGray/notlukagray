import { createHmac, timingSafeEqual } from "crypto";
import { accessCookieName, accessCookieMaxAgeDays } from "./globals";
import { buildCookieHeader } from "./cookies/build-cookie-header";

const MESSAGE = "access";

function getDeployId(): string {
  const v = process.env.ACCESS_TOKEN_VERSION;
  if (!v) {
    if (process.env.NODE_ENV === "production") {
      throw new Error("ACCESS_TOKEN_VERSION must be set in production");
    }
    return "local";
  }
  return v;
}

function getSecret(): string | undefined {
  return process.env.SITE_PASSWORD;
}

function getSignedMessage(): string {
  return `${MESSAGE}:${getDeployId()}`;
}

export function createAccessToken(): string {
  const secret = getSecret();
  if (!secret) return "";
  return createHmac("sha256", secret).update(getSignedMessage()).digest("base64url");
}

export function verifyAccessToken(value: string | undefined): boolean {
  if (!value) return false;
  const secret = getSecret();
  if (!secret) return false;
  const expected = createHmac("sha256", secret).update(getSignedMessage()).digest("base64url");
  if (value.length !== expected.length) return false;
  try {
    return timingSafeEqual(Buffer.from(value, "utf8"), Buffer.from(expected, "utf8"));
  } catch {
    return false;
  }
}

export function getAccessCookieHeader(): string {
  const token = createAccessToken();
  if (!token) return "";
  const maxAge = accessCookieMaxAgeDays * 24 * 60 * 60;
  return buildCookieHeader({ name: accessCookieName, value: token, maxAge });
}

export function getClearAccessCookieHeader(): string {
  return buildCookieHeader({ name: accessCookieName, value: "", maxAge: 0 });
}

export const COOKIE_NAME = accessCookieName;
