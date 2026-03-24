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

const waitlistSchema = z.object({
  email: z.string().email("Invalid email").max(320),
  interest: z.string().max(500).optional(),
  role: z.string().max(200).optional(),
});

export async function POST(request: NextRequest) {
  const rateLimitRes = checkFormRateLimit(request, "waitlist");
  if (rateLimitRes) return rateLimitRes;

  const parsed = await parseFormBody(request);
  if (parsed instanceof Response) return parsed;

  const email = typeof parsed.payload.email === "string" ? parsed.payload.email.trim() : "";
  const interest =
    typeof parsed.payload.interest === "string" ? parsed.payload.interest.trim() : undefined;
  const role = typeof parsed.payload.role === "string" ? parsed.payload.role.trim() : undefined;

  const result = waitlistSchema.safeParse({ email, interest, role });
  if (!result.success) {
    const msg = result.error.flatten().formErrors[0] ?? result.error.message;
    return formErrorResponse(typeof msg === "string" ? msg : "Invalid input.", 400);
  }

  const webhook = process.env.WAITLIST_WEBHOOK_URL;
  const WEBHOOK_TIMEOUT_MS = 10_000;
  if (webhook && typeof webhook === "string") {
    try {
      const res = await fetch(webhook, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: result.data.email,
          interest: result.data.interest ?? "",
          role: result.data.role ?? "",
          source: "waitlist",
        }),
        signal: AbortSignal.timeout(WEBHOOK_TIMEOUT_MS),
      });
      if (!res.ok) return formErrorResponse("Join failed. Try again later.", 502);
    } catch {
      return formErrorResponse("Join failed. Try again later.", 502);
    }
  } else {
    const to = process.env.FORM_WAITLIST_RECIPIENT ?? process.env.FORM_CONTACT_RECIPIENT;
    const from = process.env.FORM_CONTACT_FROM ?? process.env.RESEND_FROM ?? "noreply@localhost";
    if (to && typeof to === "string") {
      const { ok, error } = await sendEmail({
        to,
        from: from.includes("<") ? from : `Site <${from}>`,
        subject: `Waitlist: ${result.data.email}`,
        text: [
          `Email: ${escapeEmailText(result.data.email)}`,
          result.data.interest ? `Interest: ${escapeEmailText(result.data.interest)}` : null,
          result.data.role ? `Role: ${escapeEmailText(result.data.role)}` : null,
        ]
          .filter(Boolean)
          .join("\n"),
      });
      if (!ok) return formErrorResponse(error ?? "Join failed.", 502);
    }
  }

  const redirect =
    typeof parsed.payload.redirect === "string" && parsed.payload.redirect.startsWith("/")
      ? parsed.payload.redirect
      : undefined;
  const response = formSuccessResponse(redirect);
  const cookie = buildFormRateLimitCookie(request, "waitlist");
  if (cookie) response.headers.append("Set-Cookie", cookie);
  return response;
}
