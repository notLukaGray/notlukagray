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

const feedbackSchema = z
  .object({
    rating: z.union([z.number(), z.string()]).optional(),
    choice: z.string().max(500).optional(),
    comment: z.string().max(10_000).optional(),
  })
  .refine(
    (d) => d.rating !== undefined || d.choice !== undefined || (d.comment && d.comment.trim()),
    { message: "At least one field is required." }
  );

export async function POST(request: NextRequest) {
  const rateLimitRes = checkFormRateLimit(request, "feedback");
  if (rateLimitRes) return rateLimitRes;

  const parsed = await parseFormBody(request);
  if (parsed instanceof Response) return parsed;

  const rating = parsed.payload.rating;
  const choice =
    typeof parsed.payload.choice === "string" ? parsed.payload.choice.trim() : undefined;
  const comment =
    typeof parsed.payload.comment === "string" ? parsed.payload.comment.trim() : undefined;

  const numRating =
    typeof rating === "number" ? rating : typeof rating === "string" ? Number(rating) : undefined;
  const result = feedbackSchema.safeParse({
    rating: numRating,
    choice,
    comment,
  });
  if (!result.success) {
    const msg = result.error.flatten().formErrors[0] ?? result.error.message;
    return formErrorResponse(typeof msg === "string" ? msg : "Invalid input.", 400);
  }

  const to = process.env.FORM_FEEDBACK_RECIPIENT ?? process.env.FORM_CONTACT_RECIPIENT;
  const from = process.env.FORM_CONTACT_FROM ?? process.env.RESEND_FROM ?? "noreply@localhost";
  if (!to || typeof to !== "string") {
    return formErrorResponse("Feedback form is not configured.", 503);
  }

  const lines: string[] = [];
  if (result.data.rating != null) lines.push(`Rating: ${result.data.rating}`);
  if (result.data.choice) lines.push(`Choice: ${escapeEmailText(result.data.choice)}`);
  if (result.data.comment) lines.push(`Comment: ${escapeEmailText(result.data.comment)}`);

  const { ok, error } = await sendEmail({
    to,
    from: from.includes("<") ? from : `Site <${from}>`,
    subject: "Feedback submitted",
    text: lines.join("\n"),
  });

  if (!ok) return formErrorResponse(error ?? "Submission failed. Try again.", 502);

  const redirect =
    typeof parsed.payload.redirect === "string" && parsed.payload.redirect.startsWith("/")
      ? parsed.payload.redirect
      : undefined;
  const response = formSuccessResponse(redirect);
  const cookie = buildFormRateLimitCookie(request, "feedback");
  if (cookie) response.headers.append("Set-Cookie", cookie);
  return response;
}
