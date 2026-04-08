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

const unsubscribeSchema = z.object({
  email: z.string().email("Invalid email").max(320),
  lists: z.union([z.string(), z.array(z.string())]).optional(),
  preferences: z.record(z.string(), z.boolean()).optional(),
});

function normalizeLists(lists: unknown): string[] {
  if (Array.isArray(lists))
    return lists.filter((x): x is string => typeof x === "string").slice(0, 20);
  if (typeof lists === "string")
    return lists
      .split(/[,\s]+/)
      .filter(Boolean)
      .slice(0, 20);
  return [];
}

export async function POST(request: NextRequest) {
  const rateLimitRes = checkFormRateLimit(request, "unsubscribe");
  if (rateLimitRes) return rateLimitRes;

  const parsed = await parseFormBody(request);
  if (parsed instanceof Response) return parsed;

  const email = typeof parsed.payload.email === "string" ? parsed.payload.email.trim() : "";
  const listsRaw = parsed.payload.lists ?? parsed.payload.unsubscribeFrom;
  const lists = normalizeLists(listsRaw);
  const prefs = parsed.payload.preferences;
  const preferences =
    prefs && typeof prefs === "object" && !Array.isArray(prefs)
      ? (Object.fromEntries(
          Object.entries(prefs).filter(
            (e): e is [string, boolean] => typeof e[0] === "string" && typeof e[1] === "boolean"
          )
        ) as Record<string, boolean>)
      : undefined;

  const result = unsubscribeSchema.safeParse({ email, lists, preferences });
  if (!result.success) {
    const msg = result.error.flatten().formErrors[0] ?? result.error.message;
    return formErrorResponse(typeof msg === "string" ? msg : "Invalid input.", 400);
  }

  const webhook = process.env.UNSUBSCRIBE_WEBHOOK_URL;
  const WEBHOOK_TIMEOUT_MS = 10_000;
  if (webhook && typeof webhook === "string") {
    try {
      const res = await fetch(webhook, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: result.data.email,
          lists: result.data.lists ?? [],
          preferences: result.data.preferences ?? {},
          source: "unsubscribe",
        }),
        signal: AbortSignal.timeout(WEBHOOK_TIMEOUT_MS),
      });
      if (!res.ok) return formErrorResponse("Update failed. Try again later.", 502);
    } catch {
      return formErrorResponse("Update failed. Try again later.", 502);
    }
  } else {
    const to = process.env.FORM_UNSUBSCRIBE_RECIPIENT ?? process.env.FORM_CONTACT_RECIPIENT;
    const from = process.env.FORM_CONTACT_FROM ?? process.env.RESEND_FROM ?? "noreply@localhost";
    if (to && typeof to === "string") {
      const lines: string[] = [
        `Email: ${escapeEmailText(result.data.email)}`,
        result.data.lists?.length
          ? `Unsubscribe from: ${(Array.isArray(result.data.lists) ? result.data.lists : [result.data.lists]).map(escapeEmailText).join(", ")}`
          : "Unsubscribe from all",
        result.data.preferences && Object.keys(result.data.preferences).length > 0
          ? `Preferences: ${JSON.stringify(result.data.preferences)}`
          : null,
      ].filter((x): x is string => x != null);

      const { ok, error } = await sendEmail({
        to,
        from: from.includes("<") ? from : `Site <${from}>`,
        subject: `Unsubscribe / preferences: ${result.data.email}`,
        text: lines.join("\n"),
      });
      if (!ok)
        return formErrorResponse(error ?? "Update notification failed. Try again later.", 502);
    }
  }

  const redirect =
    typeof parsed.payload.redirect === "string" && parsed.payload.redirect.startsWith("/")
      ? parsed.payload.redirect
      : undefined;
  const response = formSuccessResponse(redirect);
  const cookie = buildFormRateLimitCookie(request, "unsubscribe");
  if (cookie) response.headers.append("Set-Cookie", cookie);
  return response;
}
