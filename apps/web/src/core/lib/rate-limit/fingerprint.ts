import crypto, { createHmac } from "crypto";

export function buildFingerprint(req: { headers: Headers }, route: string): string {
  const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown";
  const ua = req.headers.get("user-agent") ?? "unknown";
  const secret = process.env.RATE_LIMIT_SECRET;
  if (!secret) {
    if (process.env.NODE_ENV === "production") {
      throw new Error("RATE_LIMIT_SECRET must be set in production");
    }
    console.warn("[rate-limit] RATE_LIMIT_SECRET unset — set it in .env.local");
    return crypto.createHash("sha256").update(`dev:${route}:${ip}`).digest("hex");
  }
  return createHmac("sha256", secret).update(`${ip}|${ua}|${route}`).digest("hex");
}
