import { headers } from "next/headers";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import {
  getPageAsync,
  getPageBuilderPropsAsync,
  discoverAllPages,
  resolvePagePath,
  isMobileFromUserAgent,
} from "@pb/core";
import { PageBuilderPage } from "@pb/runtime-react/server";

type Props = {
  params: Promise<{ slug: string[] }>;
};

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

export default async function UniversalSlugPage({ params }: Props) {
  const { slug: segments } = await params;
  if (!segments?.length) notFound();

  if (!resolvePagePath(segments)) notFound();

  const headersList = await headers();
  const isMobile = isMobileFromUserAgent(headersList.get("user-agent") ?? "");
  const props = await getPageBuilderPropsAsync(segments.join("/"), { isMobile });
  if (!props) notFound();

  return <PageBuilderPage {...props} />;
}
