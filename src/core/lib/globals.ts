import raw from "../../content/data/globals.json";
import { resolveAssetUrl } from "./asset-url";

export type NavItem = { type: "link"; label: string; href: string } | { type: "logo" };
export type FooterItem =
  | { label: string; href: string; external: true }
  | { type: "copyright"; text: string };

export type HeroProject = {
  id: string;
  title: string;
  description?: string;
  slug: string;
  brand?: { name: string; slug: string };
  video?: { url?: string; poster?: string; duration?: number };
  isHero?: boolean;
  isRestricted?: boolean;
  order?: number;
  [key: string]: unknown;
};

type RawNav = (typeof raw.nav)[number];
type RawFooter = (typeof raw.footer)[number];

function parseNavFooter(): { nav: NavItem[]; footer: FooterItem[] } {
  return {
    nav: raw.nav.map((item: RawNav): NavItem => {
      if ("type" in item && item.type === "logo") return { type: "logo" };
      return {
        type: "link",
        label: (item as { label: string }).label,
        href: (item as { href: string }).href,
      };
    }),
    footer: raw.footer.map((item: RawFooter): FooterItem => {
      if ("type" in item && item.type === "copyright")
        return { type: "copyright", text: (item as { text: string }).text };
      return {
        label: (item as { label: string }).label,
        href: (item as { href: string }).href,
        external: true,
      };
    }),
  };
}

const parsed = parseNavFooter();
export const headerFooterData = { nav: parsed.nav, footer: parsed.footer };
export const logoConfig = raw.logo;

export type PersonSchema = {
  name: string;
  jobTitle: string;
  url: string;
  sameAs: string[];
};

const rawPerson = (raw as { person?: Record<string, unknown> }).person;
export const person: PersonSchema | null =
  rawPerson &&
  typeof rawPerson.name === "string" &&
  typeof rawPerson.jobTitle === "string" &&
  typeof rawPerson.url === "string" &&
  Array.isArray(rawPerson.sameAs)
    ? {
        name: rawPerson.name,
        jobTitle: rawPerson.jobTitle,
        url: rawPerson.url,
        sameAs: (rawPerson.sameAs as string[]).filter((u): u is string => typeof u === "string"),
      }
    : null;

export const siteUrl: string =
  typeof (raw as { siteUrl?: string }).siteUrl === "string"
    ? (raw as { siteUrl: string }).siteUrl
    : "";

export const assetBaseUrl: string =
  typeof (raw as { assetBaseUrl?: string }).assetBaseUrl === "string"
    ? (raw as { assetBaseUrl: string }).assetBaseUrl
    : "";

export const cdnBase: string =
  typeof (raw as { cdnBase?: string }).cdnBase === "string"
    ? (raw as { cdnBase: string }).cdnBase
    : "https://media.notlukagray.com/website";

const cdnConfig = (raw as { cdn?: Record<string, unknown> }).cdn;
export const cdnTokenExpiryDays: number =
  typeof cdnConfig?.tokenExpiryDays === "number" ? cdnConfig.tokenExpiryDays : 7;
export const cdnClientCacheExpiryHours: number =
  typeof cdnConfig?.clientCacheExpiryHours === "number" ? cdnConfig.clientCacheExpiryHours : 1;
export const cdnApiCacheMaxAge: number =
  typeof cdnConfig?.apiCacheMaxAge === "number" ? cdnConfig.apiCacheMaxAge : 3600;
export const cdnApiCacheStaleWhileRevalidate: number =
  typeof cdnConfig?.apiCacheStaleWhileRevalidate === "number"
    ? cdnConfig.apiCacheStaleWhileRevalidate
    : 300;
export const cdnAllowedExtensions: string[] =
  Array.isArray(cdnConfig?.allowedExtensions) &&
  cdnConfig.allowedExtensions.every((ext: unknown) => typeof ext === "string")
    ? (cdnConfig.allowedExtensions as string[])
    : [".webm", ".mp4", ".webp", ".jpg", ".jpeg", ".png", ".glb", ".gltf", ".exr", ".hdr"];

const cdnImagesConfig = (cdnConfig as { images?: Record<string, unknown> } | undefined)?.images;
export const imageDefaultWidth: number =
  typeof cdnImagesConfig?.defaultWidth === "number" ? cdnImagesConfig.defaultWidth : 1200;
export const imageDefaultPosterWidth: number =
  typeof cdnImagesConfig?.defaultPosterWidth === "number"
    ? cdnImagesConfig.defaultPosterWidth
    : 1920;
/** Web-optimized poster width for LCP (hero/background posters). When set in globals, used instead of defaultPosterWidth. */
export const imagePosterWidth: number =
  typeof cdnImagesConfig?.posterWidth === "number"
    ? cdnImagesConfig.posterWidth
    : imageDefaultPosterWidth;
export const imageMobileMaxWidth: number =
  typeof cdnImagesConfig?.mobileMaxWidth === "number" ? cdnImagesConfig.mobileMaxWidth : 768;
export const imageMobileMaxWidth2x: number =
  typeof cdnImagesConfig?.mobileMaxWidth2x === "number" ? cdnImagesConfig.mobileMaxWidth2x : 1536;
export const imageDefaultQuality: number =
  typeof cdnImagesConfig?.defaultQuality === "number" ? cdnImagesConfig.defaultQuality : 75;
/** Web-optimized poster quality for LCP. When set in globals, used for hero/background posters. */
export const imagePosterQuality: number =
  typeof cdnImagesConfig?.posterQuality === "number"
    ? cdnImagesConfig.posterQuality
    : imageDefaultQuality;
export const imageDefaultFormat: string =
  typeof cdnImagesConfig?.defaultFormat === "string" ? cdnImagesConfig.defaultFormat : "webp";
export const imageDefaultAspectRatio: string | null =
  cdnImagesConfig?.defaultAspectRatio != null &&
  typeof cdnImagesConfig.defaultAspectRatio === "string"
    ? cdnImagesConfig.defaultAspectRatio
    : null;
export const imagePosterAspectRatio: string | null =
  cdnImagesConfig?.posterAspectRatio != null &&
  typeof cdnImagesConfig.posterAspectRatio === "string"
    ? cdnImagesConfig.posterAspectRatio
    : null;
export const imageClass: string | null =
  cdnImagesConfig?.class != null && typeof cdnImagesConfig.class === "string"
    ? cdnImagesConfig.class
    : null;
export const imagePosterClass: string | null =
  cdnImagesConfig?.posterClass != null && typeof cdnImagesConfig.posterClass === "string"
    ? cdnImagesConfig.posterClass
    : null;

// Auth configuration
const authConfig = (raw as { auth?: Record<string, unknown> }).auth;
const accessCookieConfig = authConfig?.accessCookie as Record<string, unknown> | undefined;
export const accessCookieName: string =
  typeof accessCookieConfig?.name === "string" ? accessCookieConfig.name : "site_access";
export const accessCookieMaxAgeDays: number =
  typeof accessCookieConfig?.maxAgeDays === "number" ? accessCookieConfig.maxAgeDays : 7;

const rateLimitConfig = authConfig?.rateLimit as Record<string, unknown> | undefined;
export const rateLimitCookieName: string =
  typeof rateLimitConfig?.cookieName === "string" ? rateLimitConfig.cookieName : "unlock_rate";
export const rateLimitMaxAttempts: number =
  typeof rateLimitConfig?.maxAttempts === "number" ? rateLimitConfig.maxAttempts : 5;
export const rateLimitLockoutMinutes: number =
  typeof rateLimitConfig?.lockoutMinutes === "number" ? rateLimitConfig.lockoutMinutes : 10;
export const rateLimitCookieExpiryHours: number =
  typeof rateLimitConfig?.cookieExpiryHours === "number" ? rateLimitConfig.cookieExpiryHours : 1;

const formRateLimitConfig = authConfig?.formRateLimit as Record<string, unknown> | undefined;
export const formRateLimitMaxPerHour: number =
  typeof formRateLimitConfig?.maxPerHour === "number" ? formRateLimitConfig.maxPerHour : 5;

// UI configuration
const uiConfig = (raw as { ui?: Record<string, unknown> }).ui;
export const uiResizeDebounceMs: number =
  typeof uiConfig?.resizeDebounceMs === "number" ? uiConfig.resizeDebounceMs : 50;
export const uiVideoPauseButtonHideDelayMs: number =
  typeof uiConfig?.videoPauseButtonHideDelayMs === "number"
    ? uiConfig.videoPauseButtonHideDelayMs
    : 3000;

const uiVideoConfig = uiConfig?.video as Record<string, unknown> | undefined;
export const uiVideoDoubleTapThresholdMs: number =
  typeof uiVideoConfig?.doubleTapThresholdMs === "number"
    ? uiVideoConfig.doubleTapThresholdMs
    : 450;
export const uiVideoHoldThresholdMs: number =
  typeof uiVideoConfig?.holdThresholdMs === "number" ? uiVideoConfig.holdThresholdMs : 400;
export const uiVideoHoldRepeatMs: number =
  typeof uiVideoConfig?.holdRepeatMs === "number" ? uiVideoConfig.holdRepeatMs : 500;
export const uiVideoFeedbackDurationMs: number =
  typeof uiVideoConfig?.feedbackDurationMs === "number" ? uiVideoConfig.feedbackDurationMs : 500;
export const uiVideoSeekBackSeconds: number =
  typeof uiVideoConfig?.seekBackSeconds === "number" ? uiVideoConfig.seekBackSeconds : 10;
export const uiVideoSeekForwardSeconds: number =
  typeof uiVideoConfig?.seekForwardSeconds === "number" ? uiVideoConfig.seekForwardSeconds : 30;
export const uiVideoDefaultAspectRatio: string =
  typeof uiVideoConfig?.defaultAspectRatio === "string" ? uiVideoConfig.defaultAspectRatio : "16/9";

// Cache configuration
const cacheConfig = (raw as { cache?: Record<string, unknown> }).cache;
export const cacheVideoUrlPrefix: string =
  typeof cacheConfig?.videoUrlPrefix === "string" ? cacheConfig.videoUrlPrefix : "video_url_";

/**
 * Pages that render their own nav/footer from page-builder JSON; the app Header/Footer is hidden for these.
 * Managed in globals.json under `layoutFromJsonSlugs`.
 *
 * Note: an alternative approach would be a `layoutFromJson: boolean` field on individual page definitions,
 * read during page load. That would be self-documenting per-page but requires a pipeline change to plumb
 * the flag through to the layout component.
 */
export const layoutFromJsonSlugs: string[] = (() => {
  const raw_ = raw as { layoutFromJsonSlugs?: unknown };
  return Array.isArray(raw_.layoutFromJsonSlugs) &&
    raw_.layoutFromJsonSlugs.every((s): s is string => typeof s === "string")
    ? raw_.layoutFromJsonSlugs
    : [];
})();

export const homePageData = (() => {
  const home = raw.home as {
    heroProjects?: Array<{
      video?: { url?: string; poster?: string; duration?: number };
      [key: string]: unknown;
    }>;
    [key: string]: unknown;
  };
  if (!home?.heroProjects?.length || !assetBaseUrl) return home;
  return {
    ...home,
    heroProjects: home.heroProjects.map((p) => {
      if (!p.video) return p;
      return {
        ...p,
        video: {
          ...p.video,
          url: resolveAssetUrl(p.video.url ?? "", assetBaseUrl),
          poster: resolveAssetUrl(p.video.poster ?? "", assetBaseUrl),
        },
      };
    }),
  };
})();

export function isFooterLink(
  item: FooterItem
): item is { label: string; href: string; external: true } {
  return "href" in item;
}
