/**
 * Sends email via Resend API. No SDK; uses fetch.
 * Set RESEND_API_KEY and FORM_CONTACT_FROM (e.g. "Site <noreply@yourdomain.com>") in env.
 */
export async function sendEmail(params: {
  to: string;
  from: string;
  subject: string;
  text: string;
  replyTo?: string;
}): Promise<{ ok: boolean; error?: string }> {
  const key = process.env.RESEND_API_KEY;
  if (!key || typeof key !== "string") {
    return { ok: false, error: "Email not configured" };
  }
  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${key}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: params.from,
        to: [params.to],
        subject: params.subject,
        text: params.text,
        ...(params.replyTo && { reply_to: params.replyTo }),
      }),
    });
    const data = (await res.json().catch(() => ({}))) as { message?: string };
    if (!res.ok)
      return { ok: false, error: (data as { message?: string }).message ?? "Send failed" };
    return { ok: true };
  } catch (e) {
    const msg = e instanceof Error ? e.message : "Send failed";
    return { ok: false, error: msg };
  }
}

/** Escapes plain text for safe inclusion in email body (no HTML). */
export function escapeEmailText(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .slice(0, 50_000);
}
