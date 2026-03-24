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

const passwordResetSchema = z.object({
  email: z.string().email("Invalid email").max(320),
});

const TOKEN_TTL_MS = 60 * 60 * 1000; // 1 hour

function getResetTokenSecret(): string | undefined {
  return process.env.SITE_PASSWORD ?? process.env.FORM_RATE_LIMIT_SECRET;
}

function buildResetToken(email: string, secret: string): string {
  const expiry = Date.now() + TOKEN_TTL_MS;
  const payload = `${email}:${expiry}`;
  const sig = createHmac("sha256", secret).update(payload).digest("base64url");
  return Buffer.from(JSON.stringify({ email, expiry, sig }), "utf8").toString("base64url");
}

export async function POST(request: NextRequest) {
  const rateLimitRes = checkFormRateLimit(request, "password-reset");
  if (rateLimitRes) return rateLimitRes;

  const parsed = await parseFormBody(request);
  if (parsed instanceof Response) return parsed;

  const email = typeof parsed.payload.email === "string" ? parsed.payload.email.trim() : "";
  const result = passwordResetSchema.safeParse({ email });
  if (!result.success) {
    const msg = result.error.flatten().formErrors[0] ?? result.error.message;
    return formErrorResponse(typeof msg === "string" ? msg : "Invalid email.", 400);
  }

  const secret = getResetTokenSecret();
  if (!secret) {
    return formErrorResponse("Password reset is not configured.", 503);
  }
  const token = buildResetToken(result.data.email, secret);
  const baseUrl = process.env.VERCEL_URL
    ? `https://${process.env.VERCEL_URL}`
    : (process.env.SITE_URL ?? "http://localhost:3000");
  const resetLink = `${baseUrl}/unlock?token=${encodeURIComponent(token)}`;

  const from = process.env.FORM_CONTACT_FROM ?? process.env.RESEND_FROM ?? "noreply@localhost";
  const { ok, error } = await sendEmail({
    to: result.data.email,
    from: from.includes("<") ? from : `Site <${from}>`,
    subject: "Password / unlock link",
    text: `You requested an unlock link. Use this link to access the site:\n\n${resetLink}\n\nThis link expires in 1 hour. If you didn't request this, you can ignore this email.`,
  });

  if (!ok) {
    return formErrorResponse(error ?? "Failed to send. Try again later.", 502);
  }

  const redirect =
    typeof parsed.payload.redirect === "string" && parsed.payload.redirect.startsWith("/")
      ? parsed.payload.redirect
      : "/unlock?sent=1";
  const response = formSuccessResponse(redirect);
  const cookie = buildFormRateLimitCookie(request, "password-reset");
  if (cookie) response.headers.append("Set-Cookie", cookie);
  return response;
}
