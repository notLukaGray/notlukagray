import { NextRequest, NextResponse } from "next/server";

export type FormPayload = Record<string, string | string[] | boolean>;

/** Max JSON body size (100KB) to mitigate DoS from huge payloads. */
const MAX_BODY_BYTES = 100 * 1024;

function coerceValue(v: unknown): string | string[] | boolean {
  if (typeof v === "string") return v;
  if (typeof v === "number") return String(v);
  if (typeof v === "boolean") return v;
  if (Array.isArray(v)) return v.map((x) => (typeof x === "string" ? x : String(x)));
  return String(v ?? "");
}

/**
 * Parses POST body as JSON form payload. GET requests should use searchParams in the route.
 * Rejects bodies over MAX_BODY_BYTES when Content-Length is present.
 */
export async function parseFormBody(
  request: NextRequest
): Promise<{ payload: FormPayload } | NextResponse> {
  const contentLength = request.headers.get("content-length");
  if (contentLength) {
    const size = parseInt(contentLength, 10);
    if (!Number.isNaN(size) && size > MAX_BODY_BYTES) {
      return NextResponse.json({ error: "Payload too large." }, { status: 413 });
    }
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid body." }, { status: 400 });
  }
  if (body === null || typeof body !== "object" || Array.isArray(body)) {
    return NextResponse.json({ error: "Invalid body." }, { status: 400 });
  }
  const payload: FormPayload = {};
  for (const [k, v] of Object.entries(body)) {
    if (typeof k !== "string" || k.startsWith("_")) continue;
    payload[k] = coerceValue(v);
  }
  return { payload };
}
