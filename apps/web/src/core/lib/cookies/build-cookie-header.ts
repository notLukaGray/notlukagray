type CookieAttrs = {
  name: string;
  value: string;
  maxAge?: number;
  path?: string;
  httpOnly?: boolean;
  sameSite?: "Lax" | "Strict" | "None";
};

export function buildCookieHeader(a: CookieAttrs): string {
  const parts = [`${a.name}=${a.value}`, `Path=${a.path ?? "/"}`];
  if (a.maxAge != null) parts.push(`Max-Age=${a.maxAge}`);
  if (a.httpOnly !== false) parts.push("HttpOnly");
  parts.push(`SameSite=${a.sameSite ?? "Lax"}`);
  if (process.env.NODE_ENV === "production") parts.push("Secure");
  return parts.join("; ");
}
