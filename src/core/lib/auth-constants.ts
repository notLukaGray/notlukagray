import raw from "@/content/data/globals.json";

const authConfig = (raw as { auth?: Record<string, unknown> }).auth;
const accessCookieConfig = authConfig?.accessCookie as Record<string, unknown> | undefined;

export const accessCookieName: string =
  typeof accessCookieConfig?.name === "string" ? accessCookieConfig.name : "site_access";
