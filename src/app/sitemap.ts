import type { MetadataRoute } from "next";
import { getPageSlugBases } from "@/page-builder/core/page-builder";
import { siteUrl } from "@/core/lib/globals";

const STATIC_PATHS = ["", "/work", "/profile", "/research", "/teaching", "/unlock", "/style-guide"];

export default function sitemap(): MetadataRoute.Sitemap {
  const base = siteUrl || "https://notlukagray.com";
  const now = new Date();

  const staticEntries: MetadataRoute.Sitemap = STATIC_PATHS.map((pathname) => ({
    url: `${base}${pathname || ""}`,
    lastModified: now,
    changeFrequency: "weekly" as const,
    priority: pathname === "" ? 1 : 0.8,
  }));

  const pageEntries: MetadataRoute.Sitemap = getPageSlugBases().map(({ slug, basePath }) => ({
    url: `${base}${basePath}/${slug}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  return [...staticEntries, ...pageEntries];
}
