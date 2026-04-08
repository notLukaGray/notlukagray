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

const jobInquirySchema = z.object({
  name: z.string().min(1, "Name is required").max(500),
  email: z.string().email("Invalid email").max(320),
  role: z.string().max(200).optional(),
  message: z.string().min(1, "Message is required").max(10_000),
});

export async function POST(request: NextRequest) {
  const rateLimitRes = checkFormRateLimit(request, "job-inquiry");
  if (rateLimitRes) return rateLimitRes;

  const parsed = await parseFormBody(request);
  if (parsed instanceof Response) return parsed;

  const name = typeof parsed.payload.name === "string" ? parsed.payload.name.trim() : "";
  const email = typeof parsed.payload.email === "string" ? parsed.payload.email.trim() : "";
  const role = typeof parsed.payload.role === "string" ? parsed.payload.role.trim() : undefined;
  const message = typeof parsed.payload.message === "string" ? parsed.payload.message.trim() : "";

  const result = jobInquirySchema.safeParse({ name, email, role, message });
  if (!result.success) {
    const msg = result.error.flatten().formErrors[0] ?? result.error.message;
    return formErrorResponse(typeof msg === "string" ? msg : "Invalid input.", 400);
  }

  const to = process.env.FORM_JOB_INQUIRY_RECIPIENT ?? process.env.FORM_CONTACT_RECIPIENT;
  const from = process.env.FORM_CONTACT_FROM ?? process.env.RESEND_FROM ?? "noreply@localhost";
  if (!to || typeof to !== "string") {
    return formErrorResponse("Job inquiry form is not configured.", 503);
  }

  const { ok, error } = await sendEmail({
    to,
    from: from.includes("<") ? from : `Site <${from}>`,
    subject: `Job / collaboration inquiry: ${result.data.name} (${result.data.email})`,
    text: [
      `Name: ${escapeEmailText(result.data.name)}`,
      `Email: ${escapeEmailText(result.data.email)}`,
      result.data.role ? `Role: ${escapeEmailText(result.data.role)}` : null,
      "",
      escapeEmailText(result.data.message),
    ]
      .filter(Boolean)
      .join("\n"),
    replyTo: result.data.email,
  });

  if (!ok) return formErrorResponse(error ?? "Failed to send. Try again.", 502);

  const redirect =
    typeof parsed.payload.redirect === "string" && parsed.payload.redirect.startsWith("/")
      ? parsed.payload.redirect
      : undefined;
  const response = formSuccessResponse(redirect);
  const cookie = buildFormRateLimitCookie(request, "job-inquiry");
  if (cookie) response.headers.append("Set-Cookie", cookie);
  return response;
}
