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

const contactSchema = z.object({
  name: z.string().max(500).optional(),
  email: z.string().email("Invalid email").max(320),
  message: z.string().min(1, "Message is required").max(50_000),
});

export async function POST(request: NextRequest) {
  const rateLimitRes = checkFormRateLimit(request, "contact");
  if (rateLimitRes) return rateLimitRes;

  const parsed = await parseFormBody(request);
  if (parsed instanceof Response) return parsed;

  const name = typeof parsed.payload.name === "string" ? parsed.payload.name.trim() : "";
  const email = typeof parsed.payload.email === "string" ? parsed.payload.email.trim() : "";
  const message = typeof parsed.payload.message === "string" ? parsed.payload.message.trim() : "";

  const result = contactSchema.safeParse({ name, email, message });
  if (!result.success) {
    const msg = result.error.flatten().formErrors[0] ?? result.error.message;
    return formErrorResponse(typeof msg === "string" ? msg : "Invalid input.", 400);
  }

  const to = process.env.FORM_CONTACT_RECIPIENT ?? process.env.RESEND_FROM;
  const from = process.env.FORM_CONTACT_FROM ?? process.env.RESEND_FROM ?? "noreply@localhost";
  if (!to || typeof to !== "string") {
    return formErrorResponse("Contact form is not configured.", 503);
  }

  const subject = `Contact form: ${result.data.name ? `${result.data.name} – ` : ""}${result.data.email}`;
  const text = [
    result.data.name ? `Name: ${escapeEmailText(result.data.name)}` : null,
    `Email: ${escapeEmailText(result.data.email)}`,
    "",
    escapeEmailText(result.data.message),
  ]
    .filter(Boolean)
    .join("\n");

  const { ok, error } = await sendEmail({
    to,
    from: from.includes("<") ? from : `Site <${from}>`,
    subject,
    text,
    replyTo: result.data.email,
  });

  if (!ok) {
    return formErrorResponse(error ?? "Failed to send. Try again later.", 502);
  }

  const redirect =
    typeof parsed.payload.redirect === "string" && parsed.payload.redirect.startsWith("/")
      ? parsed.payload.redirect
      : undefined;
  const response = formSuccessResponse(redirect);
  const cookie = buildFormRateLimitCookie(request, "contact");
  if (cookie) response.headers.append("Set-Cookie", cookie);
  return response;
}
