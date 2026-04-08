import { headers } from "next/headers";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import type { SectionBlock } from "@pb/contracts";
import { getPageBuilderPropsAsync, isMobileFromUserAgent } from "@pb/core";
import { PageBuilderPage } from "@pb/runtime-react/server";

type Props = {
  searchParams: Promise<{ redirect?: string }>;
};

function safeRedirect(redirect: unknown): string {
  if (typeof redirect !== "string" || !redirect.trim()) return "/";
  const r = redirect.trim();
  return r.startsWith("/") && !r.startsWith("//") ? r : "/";
}

function injectUnlockRedirect(sections: SectionBlock[], redirect: string): SectionBlock[] {
  return sections.map((block) => {
    if (block.type !== "formBlock" || block.action !== "unlock") return block;
    return { ...block, actionPayload: { ...block.actionPayload, redirect } };
  });
}

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "Unlock",
    robots: { index: false, follow: true },
  };
}

export default async function UnlockPage({ searchParams }: Props) {
  const redirect = safeRedirect((await searchParams).redirect);
  const headersList = await headers();
  const isMobile = isMobileFromUserAgent(headersList.get("user-agent") ?? "");
  const props = await getPageBuilderPropsAsync("unlock", {
    transformSections: (sections) => injectUnlockRedirect(sections, redirect),
    isMobile,
  });
  if (!props) notFound();
  return (
    <PageBuilderPage
      {...props}
      mainClassName="relative w-full min-h-screen bg-black flex flex-col items-center justify-center"
      articleClassName="w-full max-w-md px-4"
    />
  );
}
