import { NextRequest, NextResponse } from "next/server";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

export async function POST(request: NextRequest) {
  if (process.env.NODE_ENV === "production") {
    return NextResponse.json({ ok: false }, { status: 404 });
  }
  // Consume the request body to avoid lingering stream warnings.
  try {
    await request.text();
  } catch {
    // ignore
  }
  return NextResponse.json({ ok: true });
}
