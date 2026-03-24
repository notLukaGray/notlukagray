import { NextRequest } from "next/server";
import { createHmac } from "crypto";
import { z } from "zod";
import {
  parseFormBody,
  formSuccessResponse,
  formErrorResponse,
  sendEmail,
  checkFormRateLimit,
  buildFormRateLimitCookie,
} from "@/core/lib/forms";

const magicLinkSchema = z.object({
  email: z.string().email("Invalid email").max(320),
});

const TOKEN_TTL_MS = 15 * 60 * 1000; // 15 minutes

function getMagicLinkSecret(): string | undefined {
  return process.env.MAGIC_LINK_SECRET ?? process.env.SITE_PASSWORD;
}

function buildMagicLinkToken(email: string, secret: string): string {
  const expiry = Date.now() + TOKEN_TTL_MS;
  const payload = `${email}:${expiry}`;
  const sig = createHmac("sha256", secret).update(payload).digest("base64url");
  return Buffer.from(JSON.stringify({ email, expiry, sig }), "utf8").toString("base64url");
}

export async function POST(request: NextRequest) {
  const rateLimitRes = checkFormRateLimit(request, "magic-link");
  if (rateLimitRes) return rateLimitRes;

  const parsed = await parseFormBody(request);
  if (parsed instanceof Response) return parsed;

  const email = typeof parsed.payload.email === "string" ? parsed.payload.email.trim() : "";
  const result = magicLinkSchema.safeParse({ email });
  if (!result.success) {
    const msg = result.error.flatten().formErrors[0] ?? result.error.message;
    return formErrorResponse(typeof msg === "string" ? msg : "Invalid email.", 400);
  }

  const secret = getMagicLinkSecret();
  if (!secret) {
    return formErrorResponse("Magic link is not configured.", 503);
  }
  const token = buildMagicLinkToken(result.data.email, secret);
  const baseUrl = process.env.VERCEL_URL
    ? `https://${process.env.VERCEL_URL}`
    : (process.env.SITE_URL ?? "http://localhost:3000");
  const loginLink = `${baseUrl}/api/auth/magic?token=${encodeURIComponent(token)}`;

  const from = process.env.FORM_CONTACT_FROM ?? process.env.RESEND_FROM ?? "noreply@localhost";
  const { ok, error } = await sendEmail({
    to: result.data.email,
    from: from.includes("<") ? from : `Site <${from}>`,
    subject: "Your login link",
    text: `Click to sign in:\n\n${loginLink}\n\nThis link expires in 15 minutes. If you didn't request this, you can ignore this email.`,
  });

  if (!ok) {
    return formErrorResponse(error ?? "Failed to send. Try again later.", 502);
  }

  const redirect =
    typeof parsed.payload.redirect === "string" && parsed.payload.redirect.startsWith("/")
      ? parsed.payload.redirect
      : "/?magic=sent";
  const response = formSuccessResponse(redirect);
  const cookie = buildFormRateLimitCookie(request, "magic-link");
  if (cookie) response.headers.append("Set-Cookie", cookie);
  return response;
}
