import { headers } from "next/headers";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import {
  getPageAsync,
  getPageSlugsByBase,
  getAssetBaseUrl,
  getPageBuilderPropsAsync,
  isMobileFromUserAgent,
  PageBuilderPage,
} from "@/page-builder/core/page-builder";

const TEACHING_BASE = "/teaching";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  const slugs = getPageSlugsByBase(TEACHING_BASE);
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const page = await getPageAsync(slug);
  if (!page) return { title: "Teaching" };
  if (getAssetBaseUrl(page) !== TEACHING_BASE) return { title: "Teaching" };
  const { title, description, ogImage, passwordProtected } = page;
  return {
    title,
    ...(description && { description }),
    ...(passwordProtected && {
      robots: { index: false, follow: true },
    }),
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

export default async function TeachingSlugPage({ params }: Props) {
  const { slug } = await params;
  const headersList = await headers();
  const isMobile = isMobileFromUserAgent(headersList.get("user-agent") ?? "");
  const props = await getPageBuilderPropsAsync(slug, {
    assetBaseUrl: TEACHING_BASE,
    isMobile,
  });
  if (!props) notFound();
  return <PageBuilderPage {...props} />;
}
