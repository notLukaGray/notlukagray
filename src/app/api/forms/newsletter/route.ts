import { NextRequest } from "next/server";
import { z } from "zod";
import {
  parseFormBody,
  formSuccessResponse,
  formErrorResponse,
  sendEmail,
  escapeEmailText,
  checkFormRateLimit,
  buildFormRateLimitCookie,
} from "@/core/lib/forms";

const newsletterSchema = z.object({
  email: z.string().email("Invalid email").max(320),
  name: z.string().max(500).optional(),
});

export async function POST(request: NextRequest) {
  const rateLimitRes = checkFormRateLimit(request, "newsletter");
  if (rateLimitRes) return rateLimitRes;

  const parsed = await parseFormBody(request);
  if (parsed instanceof Response) return parsed;

  const email = typeof parsed.payload.email === "string" ? parsed.payload.email.trim() : "";
  const name = typeof parsed.payload.name === "string" ? parsed.payload.name.trim() : undefined;

  const result = newsletterSchema.safeParse({ email, name });
  if (!result.success) {
    const msg = result.error.flatten().formErrors[0] ?? result.error.message;
    return formErrorResponse(typeof msg === "string" ? msg : "Invalid input.", 400);
  }

  const webhook = process.env.NEWSLETTER_WEBHOOK_URL ?? process.env.MAILCHIMP_WEBHOOK_URL;
  const WEBHOOK_TIMEOUT_MS = 10_000;
  if (webhook && typeof webhook === "string") {
    try {
      const res = await fetch(webhook, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: result.data.email,
          name: result.data.name ?? "",
          source: "newsletter",
        }),
        signal: AbortSignal.timeout(WEBHOOK_TIMEOUT_MS),
      });
      if (!res.ok) {
        return formErrorResponse("Subscription failed. Try again later.", 502);
      }
    } catch {
      return formErrorResponse("Subscription failed. Try again later.", 502);
    }
  } else {
    const to = process.env.FORM_NEWSLETTER_RECIPIENT ?? process.env.FORM_CONTACT_RECIPIENT;
    const from = process.env.FORM_CONTACT_FROM ?? process.env.RESEND_FROM ?? "noreply@localhost";
    if (to && typeof to === "string") {
      const { ok, error } = await sendEmail({
        to,
        from: from.includes("<") ? from : `Site <${from}>`,
        subject: `Newsletter signup: ${result.data.email}`,
        text: [
          result.data.name ? `Name: ${escapeEmailText(result.data.name)}` : null,
          `Email: ${escapeEmailText(result.data.email)}`,
        ]
          .filter(Boolean)
          .join("\n"),
      });
      if (!ok) return formErrorResponse(error ?? "Signup failed.", 502);
    }
  }

  const redirect =
    typeof parsed.payload.redirect === "string" && parsed.payload.redirect.startsWith("/")
      ? parsed.payload.redirect
      : undefined;
  const response = formSuccessResponse(redirect);
  const cookie = buildFormRateLimitCookie(request, "newsletter");
  if (cookie) response.headers.append("Set-Cookie", cookie);
  return response;
}
