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
import { getAccessCookieHeader } from "@/core/lib/access-cookie";

const gatedSchema = z.object({
  email: z.string().email("Invalid email").max(320),
  name: z.string().max(500).optional(),
});

export async function POST(request: NextRequest) {
  const rateLimitRes = checkFormRateLimit(request, "gated-asset");
  if (rateLimitRes) return rateLimitRes;

  const parsed = await parseFormBody(request);
  if (parsed instanceof Response) return parsed;

  const email = typeof parsed.payload.email === "string" ? parsed.payload.email.trim() : "";
  const name = typeof parsed.payload.name === "string" ? parsed.payload.name.trim() : undefined;

  const result = gatedSchema.safeParse({ email, name });
  if (!result.success) {
    const msg = result.error.flatten().formErrors[0] ?? result.error.message;
    return formErrorResponse(typeof msg === "string" ? msg : "Invalid input.", 400);
  }

  const payloadRedirect =
    typeof parsed.payload.redirect === "string" &&
    parsed.payload.redirect.startsWith("/") &&
    !parsed.payload.redirect.startsWith("//")
      ? parsed.payload.redirect
      : null;
  const envRedirect =
    typeof process.env.GATED_ASSET_REDIRECT === "string" &&
    process.env.GATED_ASSET_REDIRECT.startsWith("/") &&
    !process.env.GATED_ASSET_REDIRECT.startsWith("//")
      ? process.env.GATED_ASSET_REDIRECT
      : null;
  const redirectUrl = payloadRedirect ?? envRedirect ?? "/";

  const to = process.env.FORM_GATED_RECIPIENT ?? process.env.FORM_CONTACT_RECIPIENT;
  const from = process.env.FORM_CONTACT_FROM ?? process.env.RESEND_FROM ?? "noreply@localhost";
  if (to && typeof to === "string") {
    const { ok, error } = await sendEmail({
      to,
      from: from.includes("<") ? from : `Site <${from}>`,
      subject: `Gated asset access: ${result.data.email}`,
      text: [
        result.data.name ? `Name: ${escapeEmailText(result.data.name)}` : null,
        `Email: ${escapeEmailText(result.data.email)}`,
      ]
        .filter(Boolean)
        .join("\n"),
    });
    if (!ok) return formErrorResponse(error ?? "Failed to send. Try again later.", 502);
  }

  const accessCookieHeader = getAccessCookieHeader();
  const response = formSuccessResponse(redirectUrl);
  if (accessCookieHeader) response.headers.set("Set-Cookie", accessCookieHeader);
  const cookie = buildFormRateLimitCookie(request, "gated-asset");
  if (cookie) response.headers.append("Set-Cookie", cookie);
  return response;
}
