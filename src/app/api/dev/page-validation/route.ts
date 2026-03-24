import { NextRequest, NextResponse } from "next/server";
import {
  runPageBuilderValidation,
  summarizeValidation,
} from "@/page-builder/dev/page-builder-validation";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

export async function GET(request: NextRequest) {
  if (process.env.NODE_ENV !== "development") {
    return new Response("Not found", { status: 404 });
  }

  const slug = request.nextUrl.searchParams.get("slug");
  const results = runPageBuilderValidation(slug ? { slugs: [slug] } : {});
  const summary = summarizeValidation(results);

  return NextResponse.json({
    results,
    summary,
  });
}
