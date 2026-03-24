import { notFound } from "next/navigation";
import type { Metadata } from "next";
import {
  getPageSlugs,
  getPageAsync,
  getPageBuilderPropsAsync,
  PageBuilderPage,
} from "@/page-builder/core/page-builder";

type Props = {
  params: Promise<{ slug: string; variant: string }>;
};

const VARIANTS = ["mobile", "desktop"] as const;

export async function generateStaticParams() {
  const slugs = getPageSlugs();
  return slugs.flatMap((slug) => VARIANTS.map((variant) => ({ slug, variant })));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const page = await getPageAsync(slug);
  if (!page) return { title: "Work" };
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

export default async function WorkSlugVariantPage({ params }: Props) {
  const { slug, variant } = await params;
  if (!VARIANTS.includes(variant as (typeof VARIANTS)[number])) notFound();
  const isMobile = variant === "mobile";
  const props = await getPageBuilderPropsAsync(slug, {
    assetBaseUrl: "/work",
    isMobile,
  });
  if (!props) notFound();
  return <PageBuilderPage {...props} />;
}
