import { cookies, headers } from "next/headers";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { accessCookieName } from "@/core/lib/auth-constants";
import { verifyAccessToken } from "@/core/lib/access-cookie";
import {
  buildUnlockModalProps,
  getSafeUnlockPreviewUrl,
  getSingleQueryValue,
  isUnlockEnabled,
  rewriteProtectedInternalLinks,
  safeRedirectPath,
} from "@/core/lib/unlock-linking";
import {
  getPageAsync,
  getPageBuilderPropsAsync,
  discoverAllPages,
  resolvePagePath,
  isMobileFromUserAgent,
} from "@pb/core";
import { PageBuilderPage } from "@pb/runtime-react/server";
import { getTwitterCardForOgImage } from "@/core/lib/globals";
import { UnlockPageShell } from "@/core/ui/UnlockPageShell";

type Props = {
  params: Promise<{ slug: string[] }>;
  searchParams: Promise<{
    unlock?: string | string[];
    unlock_redirect?: string | string[];
    unlock_preview?: string | string[];
  }>;
};
function hasUnlockQuery(value: unknown): boolean {
  if (typeof value === "string") return value === "1";
  if (Array.isArray(value)) return value.includes("1");
  return false;
}

export async function generateStaticParams(): Promise<{ slug: string[] }[]> {
  return discoverAllPages().map(({ slugSegments }) => ({ slug: slugSegments }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug: segments } = await params;
  if (!segments?.length) return {};

  const page = await getPageAsync(segments.join("/"));
  if (!page) return {};

  const { title, description, ogImage, canonicalUrl, robots, keywords } = page as {
    title: string;
    description?: string;
    ogImage?: string;
    canonicalUrl?: string;
    robots?: string;
    keywords?: string;
  };

  return {
    title,
    ...(description && { description }),
    ...(keywords && { keywords }),
    ...(robots && { robots }),
    ...(canonicalUrl && { alternates: { canonical: canonicalUrl } }),
    openGraph: {
      title,
      ...(description && { description }),
      ...(ogImage && { images: [ogImage] }),
    },
    twitter: {
      card: getTwitterCardForOgImage(ogImage),
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

  const [headersList, page, cookieStore] = await Promise.all([
    headers(),
    getPageAsync(segments.join("/")),
    cookies(),
  ]);
  const hasAccess = verifyAccessToken(cookieStore.get(accessCookieName)?.value);
  const isMobile = isMobileFromUserAgent(headersList.get("user-agent") ?? "");
  const props = await getPageBuilderPropsAsync(segments.join("/"), { isMobile });
  if (!props) notFound();

  const structuredData = (page as { structuredData?: unknown } | null)?.structuredData ?? null;

  const query = await searchParams;
  const unlockPreview = getSafeUnlockPreviewUrl(getSingleQueryValue(query.unlock_preview));
  const unlockRedirect = safeRedirectPath(getSingleQueryValue(query.unlock_redirect));
  const isUnlockRoute = segments.length === 1 && segments[0] === "unlock";
  const showUnlockModalOnProtectedPage = hasUnlockQuery(query.unlock) && isUnlockEnabled();
  const showUnlockModalOnCurrentPage = !hasAccess && Boolean(unlockRedirect) && isUnlockEnabled();
  const showUnlockModalOnUnlockPage = isUnlockRoute && !hasAccess && isUnlockEnabled();
  const showUnlockModal =
    showUnlockModalOnProtectedPage || showUnlockModalOnCurrentPage || showUnlockModalOnUnlockPage;
  const pagePath = `/${segments.join("/")}`;
  const unlockTarget = showUnlockModalOnCurrentPage
    ? (unlockRedirect as string)
    : showUnlockModalOnUnlockPage
      ? (unlockRedirect ?? "/")
      : pagePath;

  const unlockModalProps = buildUnlockModalProps(unlockTarget, showUnlockModal);
  const shouldRewriteProtectedLinks = !hasAccess && isUnlockEnabled();
  const sectionsForRenderBase = isUnlockRoute ? [] : (props.resolvedSections ?? []);
  const sectionsForRender = shouldRewriteProtectedLinks
    ? rewriteProtectedInternalLinks(sectionsForRenderBase, pagePath)
    : sectionsForRenderBase;
  const pagePropsForRender = { ...props, resolvedSections: sectionsForRender };

  const shouldRenderProtectedContent = !showUnlockModalOnProtectedPage;
  const structuredDataForRender = shouldRenderProtectedContent ? structuredData : null;

  return (
    <UnlockPageShell
      unlockModalProps={unlockModalProps}
      hideChildrenWhenModalOpen={showUnlockModalOnProtectedPage}
      closeOnOverlayClick={!isUnlockRoute}
      unlockPreview={isUnlockRoute ? null : unlockPreview}
      showPreviewBackground={false}
      solidBackdropClassName={isUnlockRoute ? "fixed inset-0 -z-10 bg-background" : undefined}
      structuredData={structuredDataForRender}
    >
      {shouldRenderProtectedContent ? <PageBuilderPage {...pagePropsForRender} /> : null}
    </UnlockPageShell>
  );
}
