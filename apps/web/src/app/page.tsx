import fs from "node:fs";
import { person } from "@/core/lib/globals";
import { HomeView } from "@/core/ui//HomeView";
import { PersonJsonLd } from "@/core/ui/PersonJsonLd";
import type { HeroProject } from "@/core/lib/globals";
import type { SectionBlock } from "@pb/contracts";
import { discoverAllPages, getModalProps } from "@pb/core";
import { HomeWithUnlockModal } from "./HomeWithUnlockModal";
// Temporary: load hero data from archived file until homepage is rebuilt as a page-builder page
import deadHome from "@/content/_dead/home.json";

function safeRedirect(value: unknown): string | null {
  if (typeof value !== "string" || !value.trim()) return null;
  const r = value.trim();
  return r.startsWith("/") && !r.startsWith("//") ? r : null;
}

function injectUnlockRedirect(sections: SectionBlock[], redirect: string): SectionBlock[] {
  return sections.map((block) => {
    if (block.type !== "formBlock" || block.action !== "unlock") return block;
    return { ...block, actionPayload: { ...block.actionPayload, redirect } };
  });
}

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

function attachProjectHrefs(projects: HeroProject[]): HeroProject[] {
  const hrefBySlug = buildContentPageHrefMap();
  return projects.map((project) => {
    const href = hrefBySlug.get(project.slug);
    return href ? { ...project, href } : project;
  });
}

type Props = {
  searchParams: Promise<{ unlock_redirect?: string }>;
};

export default async function Home({ searchParams }: Props) {
  const params = await searchParams;
  const redirectUrl = safeRedirect(params.unlock_redirect);
  const unlockModalProps =
    redirectUrl && typeof process.env.SITE_PASSWORD === "string"
      ? getModalProps("unlock", {
          transformSections: (sections) => injectUnlockRedirect(sections, redirectUrl),
        })
      : null;
  const heroProjects = attachProjectHrefs(deadHome.heroProjects as HeroProject[]);

  return (
    <HomeWithUnlockModal unlockModalProps={unlockModalProps}>
      {person && <PersonJsonLd person={person} />}
      <HomeView heroProjects={heroProjects} />
    </HomeWithUnlockModal>
  );
}
