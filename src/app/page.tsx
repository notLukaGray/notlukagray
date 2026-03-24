import { homePageData, person } from "@/core/lib/globals";
import { HomeView } from "@/core/ui//HomeView";
import { PersonJsonLd } from "@/core/ui/PersonJsonLd";
import type { HeroProject } from "@/core/lib/globals";
import type { SectionBlock } from "@/page-builder/core/page-builder-schemas";
import { getModalProps } from "@/page-builder/core/page-builder";
import { HomeWithUnlockModal } from "./HomeWithUnlockModal";

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

type Props = {
  searchParams: Promise<{ unlock_redirect?: string }>;
};

export default async function Home({ searchParams }: Props) {
  const heroProjects = (homePageData?.heroProjects ?? []) as HeroProject[];
  const params = await searchParams;
  const redirectUrl = safeRedirect(params.unlock_redirect);
  const unlockModalProps =
    redirectUrl && typeof process.env.SITE_PASSWORD === "string"
      ? getModalProps("unlock", {
          transformSections: (sections) => injectUnlockRedirect(sections, redirectUrl),
        })
      : null;

  return (
    <HomeWithUnlockModal unlockModalProps={unlockModalProps}>
      {person && <PersonJsonLd person={person} />}
      <HomeView heroProjects={heroProjects} />
    </HomeWithUnlockModal>
  );
}
