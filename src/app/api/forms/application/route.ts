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

const applicationSchema = z.object({
  name: z.string().min(1, "Name is required").max(500),
  email: z.string().email("Invalid email").max(320),
  message: z.string().max(50_000).optional(),
  fileUrl: z.string().url().max(2000).optional(),
});

export async function POST(request: NextRequest) {
  const rateLimitRes = checkFormRateLimit(request, "application");
  if (rateLimitRes) return rateLimitRes;

  const parsed = await parseFormBody(request);
  if (parsed instanceof Response) return parsed;

  const name = typeof parsed.payload.name === "string" ? parsed.payload.name.trim() : "";
  const email = typeof parsed.payload.email === "string" ? parsed.payload.email.trim() : "";
  const message =
    typeof parsed.payload.message === "string" ? parsed.payload.message.trim() : undefined;
  const fileUrl =
    typeof parsed.payload.fileUrl === "string" ? parsed.payload.fileUrl.trim() : undefined;

  const result = applicationSchema.safeParse({ name, email, message, fileUrl });
  if (!result.success) {
    const msg = result.error.flatten().formErrors[0] ?? result.error.message;
    return formErrorResponse(typeof msg === "string" ? msg : "Invalid input.", 400);
  }

  const to = process.env.FORM_APPLICATION_RECIPIENT ?? process.env.FORM_CONTACT_RECIPIENT;
  const from = process.env.FORM_CONTACT_FROM ?? process.env.RESEND_FROM ?? "noreply@localhost";
  if (!to || typeof to !== "string") {
    return formErrorResponse("Application form is not configured.", 503);
  }

  const lines: string[] = [
    `Name: ${escapeEmailText(result.data.name)}`,
    `Email: ${escapeEmailText(result.data.email)}`,
    result.data.message ? `Message: ${escapeEmailText(result.data.message)}` : null,
    result.data.fileUrl ? `File / link: ${escapeEmailText(result.data.fileUrl)}` : null,
  ].filter((x): x is string => x != null);

  const { ok, error } = await sendEmail({
    to,
    from: from.includes("<") ? from : `Site <${from}>`,
    subject: `Application: ${result.data.name} (${result.data.email})`,
    text: lines.join("\n"),
    replyTo: result.data.email,
  });

  if (!ok) return formErrorResponse(error ?? "Failed to submit. Try again.", 502);

  const redirect =
    typeof parsed.payload.redirect === "string" && parsed.payload.redirect.startsWith("/")
      ? parsed.payload.redirect
      : undefined;
  const response = formSuccessResponse(redirect);
  const cookie = buildFormRateLimitCookie(request, "application");
  if (cookie) response.headers.append("Set-Cookie", cookie);
  return response;
}
