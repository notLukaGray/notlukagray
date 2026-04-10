import { headers } from "next/headers";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import type { SectionBlock } from "@pb/contracts";
import {
  getPageAsync,
  getPageBuilderPropsAsync,
  discoverAllPages,
  getModalProps,
  resolvePagePath,
  isMobileFromUserAgent,
} from "@pb/core";
import { PageBuilderPage } from "@pb/runtime-react/server";
import { HomeWithUnlockModal } from "../HomeWithUnlockModal";

type Props = {
  params: Promise<{ slug: string[] }>;
  searchParams: Promise<{ unlock?: string | string[] }>;
};

function hasUnlockQuery(value: unknown): boolean {
  if (typeof value === "string") return value === "1";
  if (Array.isArray(value)) return value.includes("1");
  return false;
}

function injectUnlockRedirect(sections: SectionBlock[], redirect: string): SectionBlock[] {
  return sections.map((block) => {
    if (block.type !== "formBlock" || block.action !== "unlock") return block;
    return { ...block, actionPayload: { ...block.actionPayload, redirect } };
  });
}

export async function generateStaticParams(): Promise<{ slug: string[] }[]> {
  return discoverAllPages().map(({ slugSegments }) => ({ slug: slugSegments }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug: segments } = await params;
  if (!segments?.length) return {};

  const page = await getPageAsync(segments.join("/"));
  if (!page) return {};

  const { title, description, ogImage, passwordProtected } = page as {
    title: string;
    description?: string;
    ogImage?: string;
    passwordProtected?: boolean;
  };

  return {
    title,
    ...(description && { description }),
    ...(passwordProtected && { robots: { index: false, follow: true } }),
    openGraph: {
      title,
      ...(description && { description }),
      ...(ogImage && { images: [ogImage] }),
    },
    twitter: {
      card: "summary_large_image",
      title,
      ...(description && { description }),
      ...(ogImage && { images: [ogImage] }),
    },
  };
}

export default async function UniversalSlugPage({ params, searchParams }: Props) {
  const { slug: segments } = await params;
  if (!segments?.length) notFound();

  if (!resolvePagePath(segments)) notFound();

  const headersList = await headers();
  const isMobile = isMobileFromUserAgent(headersList.get("user-agent") ?? "");
  const props = await getPageBuilderPropsAsync(segments.join("/"), { isMobile });
  if (!props) notFound();

  const query = await searchParams;
  const showUnlockModal =
    hasUnlockQuery(query.unlock) &&
    typeof process.env.SITE_PASSWORD === "string" &&
    process.env.SITE_PASSWORD.length > 0;
  const pagePath = `/${segments.join("/")}`;

  const unlockModalProps = showUnlockModal
    ? getModalProps("unlock", {
        transformSections: (sections) => injectUnlockRedirect(sections, pagePath),
      })
    : null;

  return (
    <HomeWithUnlockModal
      unlockModalProps={unlockModalProps}
      hideChildrenWhenModalOpen={showUnlockModal}
    >
      <PageBuilderPage {...props} />
    </HomeWithUnlockModal>
  );
}
