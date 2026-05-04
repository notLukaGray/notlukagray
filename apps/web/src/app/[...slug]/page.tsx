import { cookies, headers } from "next/headers";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import type { FilterConfig } from "@pb/contracts";
import { accessCookieName } from "@/core/lib/auth-constants";
import { parseBrowserDataCookie, browserDataCookieName } from "@/core/lib/browser-data-cookie";
import { verifyAccessToken } from "@/core/lib/access-cookie";
import {
  buildUnlockModalProps,
  getSafeUnlockPreviewUrl,
  getSingleQueryValue,
  isUnlockEnabled,
  rewriteProtectedInternalLinks,
  safeRedirectPath,
} from "@/core/lib/unlock-linking";
import { parseFiltersFromQuery } from "@/core/lib/parse-page-filters";
import { PROTECTED_PAGE_PATHS } from "@/core/lib/protected-slugs.generated";
import {
  getPageAsync,
  getPageBuilderPropsAsync,
  discoverAllPages,
  resolvePagePath,
  isMobileFromUserAgent,
} from "@pb/core";
import { PageBuilderPage } from "@pb/runtime-react/server";
import { getTwitterCardForOgImage, cdnBase } from "@/core/lib/globals";
import { getSignedCdnUrl } from "@pb/core/lib/cdn-asset-server";
import { UnlockPageShell } from "@/core/ui/UnlockPageShell";

type SearchParamsRaw = Record<string, string | string[] | undefined>;

type Props = {
  params: Promise<{ slug: string[] }>;
  searchParams: Promise<SearchParamsRaw>;
};
function hasUnlockQuery(value: unknown): boolean {
  if (typeof value === "string") return value === "1";
  if (Array.isArray(value)) return value.includes("1");
  return false;
}

function buildPageRenderKey(pathname: string, query: SearchParamsRaw): string {
  const params = new URLSearchParams();
  for (const [key, rawValue] of Object.entries(query)) {
    if (rawValue == null) continue;
    if (Array.isArray(rawValue)) {
      for (const value of rawValue) params.append(key, value);
      continue;
    }
    params.append(key, rawValue);
  }
  const queryString = params.toString();
  return queryString.length > 0 ? `${pathname}?${queryString}` : pathname;
}

export async function generateStaticParams(): Promise<{ slug: string[] }[]> {
  return discoverAllPages().map(({ slugSegments }) => ({ slug: slugSegments }));
}

export async function generateMetadata({ params, searchParams }: Props): Promise<Metadata> {
  const { slug: segments } = await params;
  if (!segments?.length) return {};

  const query = await searchParams;
  const isUnlockRoute = segments.length === 1 && segments[0] === "unlock";
  const redirectTarget = isUnlockRoute
    ? safeRedirectPath(getSingleQueryValue(query.unlock_redirect))
    : null;
  const redirectSlug = redirectTarget?.replace(/^\/+/, "");
  const validRedirect =
    redirectSlug && PROTECTED_PAGE_PATHS.has(redirectSlug) ? redirectSlug : null;
  const effectiveSlug = validRedirect ?? segments.join("/");

  const page = await getPageAsync(effectiveSlug);
  if (!page) return {};

  const { title, description, ogImage, canonicalUrl, robots, keywords, filterConfig } = page as {
    title: string;
    description?: string;
    ogImage?: string;
    canonicalUrl?: string;
    robots?: string;
    keywords?: string;
    filterConfig?: FilterConfig;
  };

  const activeFilters = parseFiltersFromQuery(query, filterConfig);
  const hasActiveFilters = Object.keys(activeFilters).length > 0;

  const normalizedCdnBase = cdnBase.replace(/\/+$/, "");
  const ogImageKey = ogImage?.startsWith(normalizedCdnBase)
    ? ogImage.slice(normalizedCdnBase.length).replace(/^\/+/, "")
    : null;
  const signedOgImage = ogImageKey ? getSignedCdnUrl(ogImageKey) : ogImage;

  const effectiveRobots = isUnlockRoute
    ? "noindex, follow"
    : hasActiveFilters
      ? "noindex, follow"
      : robots;
  const effectiveCanonical = isUnlockRoute
    ? null
    : hasActiveFilters
      ? `/${segments.join("/")}`
      : canonicalUrl;

  return {
    title,
    ...(description && { description }),
    ...(keywords && { keywords }),
    ...(effectiveRobots && { robots: effectiveRobots }),
    ...(effectiveCanonical && { alternates: { canonical: effectiveCanonical } }),
    openGraph: {
      title,
      ...(description && { description }),
      ...(signedOgImage && { images: [signedOgImage] }),
    },
    twitter: {
      card: getTwitterCardForOgImage(ogImage),
      title,
      ...(description && { description }),
      ...(signedOgImage && { images: [signedOgImage] }),
    },
  };
}

export default async function UniversalSlugPage({ params, searchParams }: Props) {
  const { slug: segments } = await params;
  if (!segments?.length) notFound();

  if (!resolvePagePath(segments)) notFound();

  const [headersList, page, cookieStore, query] = await Promise.all([
    headers(),
    getPageAsync(segments.join("/")),
    cookies(),
    searchParams,
  ]);
  const hasAccess = verifyAccessToken(cookieStore.get(accessCookieName)?.value);
  const isMobile = isMobileFromUserAgent(headersList.get("user-agent") ?? "");
  const browserData = parseBrowserDataCookie(cookieStore.get(browserDataCookieName)?.value);
  const filterConfig = (page as { filterConfig?: FilterConfig } | null)?.filterConfig;
  const activeFilters = parseFiltersFromQuery(query, filterConfig);
  const hasActiveFilters = Object.keys(activeFilters).length > 0;
  const props = await getPageBuilderPropsAsync(segments.join("/"), {
    isMobile,
    ...(browserData?.viewportWidthPx != null
      ? { viewportWidthPx: browserData.viewportWidthPx }
      : {}),
    ...(hasActiveFilters ? { activeFilters } : {}),
  });
  if (!props) notFound();

  const structuredData = (page as { structuredData?: unknown } | null)?.structuredData ?? null;
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
  const pageRenderKey = buildPageRenderKey(pagePath, query);

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
      {shouldRenderProtectedContent ? (
        <PageBuilderPage key={pageRenderKey} {...pagePropsForRender} />
      ) : null}
    </UnlockPageShell>
  );
}
