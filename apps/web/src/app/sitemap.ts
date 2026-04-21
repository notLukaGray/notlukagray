import fs from "node:fs";
import path from "node:path";
import type { MetadataRoute } from "next";
import { discoverAllPages } from "@pb/core";
import { siteUrl } from "@/core/lib/globals";

type SitemapChangeFrequency = NonNullable<MetadataRoute.Sitemap[number]["changeFrequency"]>;

type SitemapOverride = {
  changeFrequency?: SitemapChangeFrequency;
  priority?: number;
};

const CHANGE_FREQUENCIES = new Set<SitemapChangeFrequency>([
  "always",
  "hourly",
  "daily",
  "weekly",
  "monthly",
  "yearly",
  "never",
]);
const APP_DIR = path.join(process.cwd(), "src/app");
const STATIC_APP_ROUTE_EXCLUDES = new Set(["api", "dev", "playground"]);

function parseJsonFile(filePath: string): Record<string, unknown> | null {
  try {
    const parsed = JSON.parse(fs.readFileSync(filePath, "utf-8")) as unknown;
    return parsed != null && typeof parsed === "object" && !Array.isArray(parsed)
      ? (parsed as Record<string, unknown>)
      : null;
  } catch {
    return null;
  }
}

function isNoindex(robots: unknown): boolean {
  return typeof robots === "string" && robots.toLowerCase().includes("noindex");
}

function readSitemapOverride(value: unknown): SitemapOverride | false | null {
  if (value === false) return false;
  if (value == null || typeof value !== "object" || Array.isArray(value)) return null;
  const record = value as Record<string, unknown>;
  return {
    ...(CHANGE_FREQUENCIES.has(record.changeFrequency as SitemapChangeFrequency) && {
      changeFrequency: record.changeFrequency as SitemapChangeFrequency,
    }),
    ...(typeof record.priority === "number" && { priority: record.priority }),
  };
}

function defaultChangeFrequency(depth: number): SitemapChangeFrequency {
  return depth <= 1 ? "weekly" : "monthly";
}

function defaultPriority(depth: number): number {
  if (depth === 0) return 1;
  return depth === 1 ? 0.8 : 0.7;
}

function toSitemapUrl(base: string, pathname: string): string {
  return `${base}${pathname === "/" ? "" : pathname}`;
}

function isPublicStaticAppSegment(segment: string): boolean {
  return (
    !segment.startsWith("_") &&
    !segment.startsWith(".") &&
    !segment.startsWith("[") &&
    !STATIC_APP_ROUTE_EXCLUDES.has(segment)
  );
}

function discoverStaticAppRoutes(dir: string = APP_DIR, segments: string[] = []): string[] {
  let children: string[];
  try {
    children = fs.readdirSync(dir);
  } catch {
    return [];
  }

  const routes: string[] = [];
  if (segments.length > 0 && (children.includes("page.tsx") || children.includes("page.ts"))) {
    routes.push(`/${segments.join("/")}`);
  }

  for (const child of children) {
    if (!isPublicStaticAppSegment(child)) continue;
    const childPath = path.join(dir, child);
    let stat: fs.Stats;
    try {
      stat = fs.statSync(childPath);
    } catch {
      continue;
    }
    if (!stat.isDirectory()) continue;
    routes.push(...discoverStaticAppRoutes(childPath, [...segments, child]));
  }

  return routes;
}

export default function sitemap(): MetadataRoute.Sitemap {
  const base = siteUrl || "https://notlukagray.com";
  const now = new Date();
  const entries: MetadataRoute.Sitemap = [
    {
      url: toSitemapUrl(base, "/"),
      lastModified: now,
      changeFrequency: defaultChangeFrequency(0),
      priority: defaultPriority(0),
    },
  ];

  for (const page of discoverAllPages()) {
    if (page.slugSegments[0] === "dev") continue;
    const data = parseJsonFile(page.contentPath);
    if (data == null || isNoindex(data.robots)) continue;
    const override = readSitemapOverride(data.sitemap);
    if (override === false) continue;

    const pathname = `/${page.slugSegments.join("/")}`;
    const depth = page.slugSegments.length;
    entries.push({
      url: toSitemapUrl(base, pathname),
      lastModified: now,
      changeFrequency: override?.changeFrequency ?? defaultChangeFrequency(depth),
      priority: override?.priority ?? defaultPriority(depth),
    });
  }

  const existingUrls = new Set(entries.map((entry) => entry.url));
  for (const pathname of discoverStaticAppRoutes()) {
    const url = toSitemapUrl(base, pathname);
    if (existingUrls.has(url)) continue;
    entries.push({
      url,
      lastModified: now,
      changeFrequency: defaultChangeFrequency(1),
      priority: defaultPriority(1),
    });
  }

  return entries;
}
