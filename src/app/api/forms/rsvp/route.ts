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

const rsvpSchema = z.object({
  attending: z.union([
    z.boolean(),
    z.literal("yes"),
    z.literal("no"),
    z.string().transform((s) => s.toLowerCase() === "yes" || s === "1"),
  ]),
  name: z.string().max(500).optional(),
  email: z.string().email("Invalid email").max(320).optional(),
  dietary: z.string().max(1000).optional(),
  accessNeeds: z.string().max(1000).optional(),
});

export async function POST(request: NextRequest) {
  const rateLimitRes = checkFormRateLimit(request, "rsvp");
  if (rateLimitRes) return rateLimitRes;

  const parsed = await parseFormBody(request);
  if (parsed instanceof Response) return parsed;

  const attendingRaw = parsed.payload.attending;
  const attending =
    typeof attendingRaw === "boolean"
      ? attendingRaw
      : attendingRaw === "yes" || attendingRaw === "1"
        ? true
        : attendingRaw === "no" || attendingRaw === "0"
          ? false
          : undefined;
  const name = typeof parsed.payload.name === "string" ? parsed.payload.name.trim() : undefined;
  const email = typeof parsed.payload.email === "string" ? parsed.payload.email.trim() : undefined;
  const dietary =
    typeof parsed.payload.dietary === "string" ? parsed.payload.dietary.trim() : undefined;
  const accessNeeds =
    typeof parsed.payload.accessNeeds === "string" ? parsed.payload.accessNeeds.trim() : undefined;

  const result = rsvpSchema.safeParse({
    attending: attending ?? false,
    name,
    email,
    dietary,
    accessNeeds,
  });
  if (!result.success) {
    const msg = result.error.flatten().formErrors[0] ?? result.error.message;
    return formErrorResponse(typeof msg === "string" ? msg : "Invalid input.", 400);
  }

  const to = process.env.FORM_RSVP_RECIPIENT ?? process.env.FORM_CONTACT_RECIPIENT;
  const from = process.env.FORM_CONTACT_FROM ?? process.env.RESEND_FROM ?? "noreply@localhost";
  if (to && typeof to === "string") {
    const lines: string[] = [
      `Attending: ${result.data.attending ? "Yes" : "No"}`,
      result.data.name ? `Name: ${escapeEmailText(result.data.name)}` : null,
      result.data.email ? `Email: ${escapeEmailText(result.data.email)}` : null,
      result.data.dietary ? `Dietary: ${escapeEmailText(result.data.dietary)}` : null,
      result.data.accessNeeds ? `Access needs: ${escapeEmailText(result.data.accessNeeds)}` : null,
    ].filter((x): x is string => x != null);

    const { ok, error } = await sendEmail({
      to,
      from: from.includes("<") ? from : `Site <${from}>`,
      subject: `RSVP: ${result.data.attending ? "Yes" : "No"}${result.data.name ? ` – ${result.data.name}` : ""}`,
      text: lines.join("\n"),
      ...(result.data.email && { replyTo: result.data.email }),
    });
    if (!ok) return formErrorResponse(error ?? "Failed to send. Try again later.", 502);
  }

  const redirect =
    typeof parsed.payload.redirect === "string" && parsed.payload.redirect.startsWith("/")
      ? parsed.payload.redirect
      : undefined;
  const response = formSuccessResponse(redirect);
  const cookie = buildFormRateLimitCookie(request, "rsvp");
  if (cookie) response.headers.append("Set-Cookie", cookie);
  return response;
}
