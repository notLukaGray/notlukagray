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

const quoteSchema = z.object({
  name: z.string().max(500).optional(),
  email: z.string().email("Invalid email").max(320),
  budget: z.string().max(200).optional(),
  timeline: z.string().max(500).optional(),
  brief: z.string().min(1, "Brief is required").max(20_000),
});

export async function POST(request: NextRequest) {
  const rateLimitRes = checkFormRateLimit(request, "quote-request");
  if (rateLimitRes) return rateLimitRes;

  const parsed = await parseFormBody(request);
  if (parsed instanceof Response) return parsed;

  const name = typeof parsed.payload.name === "string" ? parsed.payload.name.trim() : undefined;
  const email = typeof parsed.payload.email === "string" ? parsed.payload.email.trim() : "";
  const budget =
    typeof parsed.payload.budget === "string" ? parsed.payload.budget.trim() : undefined;
  const timeline =
    typeof parsed.payload.timeline === "string" ? parsed.payload.timeline.trim() : undefined;
  const brief = typeof parsed.payload.brief === "string" ? parsed.payload.brief.trim() : "";

  const result = quoteSchema.safeParse({ name, email, budget, timeline, brief });
  if (!result.success) {
    const msg = result.error.flatten().formErrors[0] ?? result.error.message;
    return formErrorResponse(typeof msg === "string" ? msg : "Invalid input.", 400);
  }

  const to = process.env.FORM_QUOTE_RECIPIENT ?? process.env.FORM_CONTACT_RECIPIENT;
  const from = process.env.FORM_CONTACT_FROM ?? process.env.RESEND_FROM ?? "noreply@localhost";
  if (!to || typeof to !== "string") {
    return formErrorResponse("Quote request form is not configured.", 503);
  }

  const lines: string[] = [
    result.data.name ? `Name: ${escapeEmailText(result.data.name)}` : null,
    `Email: ${escapeEmailText(result.data.email)}`,
    result.data.budget ? `Budget: ${escapeEmailText(result.data.budget)}` : null,
    result.data.timeline ? `Timeline: ${escapeEmailText(result.data.timeline)}` : null,
    "",
    "Brief:",
    escapeEmailText(result.data.brief),
  ].filter((x): x is string => x != null);

  const { ok, error } = await sendEmail({
    to,
    from: from.includes("<") ? from : `Site <${from}>`,
    subject: `Quote / project request: ${result.data.email}`,
    text: lines.join("\n"),
    replyTo: result.data.email,
  });

  if (!ok) return formErrorResponse(error ?? "Failed to send. Try again.", 502);

  const redirect =
    typeof parsed.payload.redirect === "string" && parsed.payload.redirect.startsWith("/")
      ? parsed.payload.redirect
      : undefined;
  const response = formSuccessResponse(redirect);
  const cookie = buildFormRateLimitCookie(request, "quote-request");
  if (cookie) response.headers.append("Set-Cookie", cookie);
  return response;
}
