/**
 * Allowlisted form handlers. Runtime only needs URL lookup for section form blocks.
 */
const FORM_HANDLERS: Record<string, string> = {
  unlock: "/api/unlock",
  contact: "/api/forms/contact",
  newsletter: "/api/forms/newsletter",
  waitlist: "/api/forms/waitlist",
  "event-registration": "/api/forms/event-registration",
  feedback: "/api/forms/feedback",
  "gated-asset": "/api/forms/gated-asset",
  "job-inquiry": "/api/forms/job-inquiry",
  "quote-request": "/api/forms/quote-request",
  application: "/api/forms/application",
  rsvp: "/api/forms/rsvp",
  unsubscribe: "/api/forms/unsubscribe",
  "password-reset": "/api/forms/password-reset",
  "magic-link": "/api/forms/magic-link",
};

export function getFormActionUrl(action: string): string | null {
  if (typeof action !== "string" || !action.trim()) return null;
  const key = action.trim();
  return FORM_HANDLERS[key] ?? null;
}
