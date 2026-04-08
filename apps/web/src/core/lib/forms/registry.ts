/**
 * Allowlisted form handlers. Only these keys resolve to a submit URL.
 * Form block action is a handler key; arbitrary URLs are not accepted.
 */
export const FORM_HANDLERS: Record<string, string> = {
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
} as const;

export type FormHandlerKey = keyof typeof FORM_HANDLERS;

/**
 * Resolves a form block action (handler key) to the allowlisted URL, or null if unknown.
 */
export function getFormActionUrl(action: string): string | null {
  if (typeof action !== "string" || !action.trim()) return null;
  const key = action.trim();
  const url = (FORM_HANDLERS as Record<string, string>)[key];
  return url ?? null;
}

export function isFormHandlerKey(action: string): action is FormHandlerKey {
  return action in FORM_HANDLERS;
}
