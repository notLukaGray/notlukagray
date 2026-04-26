import fs from "node:fs";
import { cookies } from "next/headers";
import { person } from "@/core/lib/globals";
import { HomeView } from "@/core/ui//HomeView";
import { PersonJsonLd } from "@/core/ui/PersonJsonLd";
import type { HeroProject } from "@/core/lib/globals";
import { discoverAllPages } from "@pb/core";
import { accessCookieName } from "@/core/lib/auth-constants";
import { verifyAccessToken } from "@/core/lib/access-cookie";
import {
  buildUnlockModalProps,
  isProtectedHref,
  isUnlockEnabled,
  safeRedirectPath,
} from "@/core/lib/unlock-linking";
import { UnlockPageShell } from "@/core/ui/UnlockPageShell";
// Temporary: load hero data from archived file until homepage is rebuilt as a page-builder page
import deadHome from "@/content/_dead/home.json";

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

function buildContentPageHrefMap(): Map<string, string> {
  const map = new Map<string, string>();
  for (const page of discoverAllPages()) {
    if (page.slugSegments[0] === "dev") continue;
    const data = parseJsonFile(page.contentPath);
    const contentSlug =
      typeof data?.slug === "string" ? data.slug : page.slugSegments[page.slugSegments.length - 1];
    if (!contentSlug) continue;
    map.set(contentSlug, `/${page.slugSegments.join("/")}`);
  }
  return map;
}

function buildContentPageOgImageMap(): Map<string, string> {
  const map = new Map<string, string>();
  for (const page of discoverAllPages()) {
    if (page.slugSegments[0] === "dev") continue;
    const data = parseJsonFile(page.contentPath);
    const href = `/${page.slugSegments.join("/")}`;
    const ogImage = typeof data?.ogImage === "string" ? data.ogImage : null;
    if (ogImage) map.set(href, ogImage);
  }
  return map;
}

function attachProjectHrefs(projects: HeroProject[], hasAccess: boolean): HeroProject[] {
  const hrefBySlug = buildContentPageHrefMap();
  const ogImageByHref = buildContentPageOgImageMap();
  const shouldUseModalUnlockLinks = !hasAccess && isUnlockEnabled();

  return projects.map((project) => {
    const href = hrefBySlug.get(project.slug);
    if (!href) return project;
    if (!shouldUseModalUnlockLinks) return { ...project, href };
    if (!isProtectedHref(href)) return { ...project, href };
    const unlockParams = new URLSearchParams();
    unlockParams.set("unlock_redirect", href);
    const preview = ogImageByHref.get(href);
    if (preview) unlockParams.set("unlock_preview", preview);
    return { ...project, href: `/?${unlockParams.toString()}` };
  });
}

type Props = {
  searchParams: Promise<{ unlock_redirect?: string }>;
};

export default async function Home({ searchParams }: Props) {
  const cookieStore = await cookies();
  const hasAccess = verifyAccessToken(cookieStore.get(accessCookieName)?.value);
  const params = await searchParams;
  const redirectUrl = safeRedirectPath(params.unlock_redirect);
  const unlockModalProps = buildUnlockModalProps(redirectUrl, !hasAccess && isUnlockEnabled());
  const heroProjects = attachProjectHrefs(deadHome.heroProjects as HeroProject[], hasAccess);

  return (
    <UnlockPageShell unlockModalProps={unlockModalProps}>
      {person && <PersonJsonLd person={person} />}
      <HomeView heroProjects={heroProjects} />
    </UnlockPageShell>
  );
}
