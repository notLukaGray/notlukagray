#!/usr/bin/env npx tsx

import * as fs from "fs";
import * as path from "path";

const PAGE_DATA_DIR = path.join(process.cwd(), "src/content/pages");
const PAGE_IGNORE = new Set(["schema.example.json"]);
const OUT_PATH = path.join(process.cwd(), "src/content/page-manifest.json");
const DEFAULT_BASE_PATH = "/work";

const SAFE_PATH_SEGMENT_REGEX = /^[a-zA-Z0-9_-]{1,200}$/;
function isSafePathSegment(segment: string): boolean {
  return typeof segment === "string" && segment.length > 0 && SAFE_PATH_SEGMENT_REGEX.test(segment);
}

function main(): void {
  if (!fs.existsSync(PAGE_DATA_DIR)) {
    fs.writeFileSync(OUT_PATH, JSON.stringify([], null, 2), "utf-8");
    return;
  }

  const files = fs
    .readdirSync(PAGE_DATA_DIR)
    .filter((f) => f.endsWith(".json") && !PAGE_IGNORE.has(f) && !f.endsWith("-sections.json"));

  const result: { slug: string; assetBaseUrl: string }[] = [];

  for (const f of files) {
    const slug = f.replace(/\.json$/, "");
    if (!isSafePathSegment(slug)) continue;

    const pagePath = path.join(PAGE_DATA_DIR, f);
    if (!fs.existsSync(pagePath)) continue;

    let raw: string;
    try {
      raw = fs.readFileSync(pagePath, "utf-8");
    } catch {
      continue;
    }

    let parsed: Record<string, unknown>;
    try {
      parsed = JSON.parse(raw) as Record<string, unknown>;
    } catch {
      continue;
    }

    if (parsed == null || typeof parsed !== "object") continue;

    const assetBaseUrl =
      typeof parsed.assetBaseUrl === "string" ? parsed.assetBaseUrl : DEFAULT_BASE_PATH;
    result.push({ slug, assetBaseUrl });
  }

  result.sort((a, b) => a.slug.localeCompare(b.slug));
  fs.writeFileSync(OUT_PATH, JSON.stringify(result, null, 2), "utf-8");
}

main();
