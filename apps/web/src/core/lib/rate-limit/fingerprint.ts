import { createHmac } from "crypto";

export function buildFingerprint(req: { headers: Headers }, route: string): string {
  const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown";
  const ua = req.headers.get("user-agent") ?? "unknown";
  const secret = process.env.RATE_LIMIT_SECRET ?? "";
  return createHmac("sha256", secret).update(`${ip}|${ua}|${route}`).digest("hex");
}
