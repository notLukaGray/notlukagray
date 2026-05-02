export type HeroProject = {
  id: string;
  title: string;
  description?: string;
  slug: string;
  href?: string;
  brand?: { name: string; slug: string };
  video?: { url?: string; poster?: string; duration?: number };
  isHero?: boolean;
  isRestricted?: boolean;
  order?: number;
  [key: string]: unknown;
};

export type PersonSchema = {
  name: string;
  jobTitle: string;
  url: string;
  sameAs: string[];
};

export type TwitterCardType = "summary" | "summary_large_image";

export function getTwitterCardForOgImage(ogImage: unknown): TwitterCardType {
  return typeof ogImage === "string" && ogImage.trim() ? "summary_large_image" : "summary";
}

export type RuntimeGlobals = {
  siteUrl: string;
  assetBaseUrl: string;
  person: PersonSchema | null;
  siteMetadata: { title: string; description: string };
  layoutFromJsonSlugs: string[];
  cdnBase: string;
  cdnTokenExpiryDays: number;
  cdnClientCacheExpiryHours: number;
  cdnApiCacheMaxAge: number;
  cdnApiCacheStaleWhileRevalidate: number;
  cdnAllowedHosts: string[];
  cdnAllowedExtensions: string[];
  imageDefaultWidth: number;
  imageDefaultPosterWidth: number;
  imagePosterWidth: number;
  imageMobileMaxWidth: number;
  imageMobileMaxWidth2x: number;
  imageDefaultQuality: number;
  imagePosterQuality: number;
  imageDefaultFormat: string;
  imageDefaultAspectRatio: string | null;
  imagePosterAspectRatio: string | null;
  imageClass: string | null;
  imagePosterClass: string | null;
  accessCookieName: string;
  accessCookieMaxAgeDays: number;
  rateLimitCookieName: string;
  rateLimitMaxAttempts: number;
  rateLimitLockoutMinutes: number;
  rateLimitCookieExpiryHours: number;
  formRateLimitMaxPerHour: number;
  uiResizeDebounceMs: number;
  uiVideoPauseButtonHideDelayMs: number;
  uiHeroCarouselOpacityCurve: number[];
  uiHeroCarouselPlaceholderBackgrounds: string[];
  uiVideoDoubleTapThresholdMs: number;
  uiVideoHoldThresholdMs: number;
  uiVideoHoldRepeatMs: number;
  uiVideoFeedbackDurationMs: number;
  uiVideoSeekBackSeconds: number;
  uiVideoSeekForwardSeconds: number;
  uiVideoDefaultAspectRatio: string;
  cacheVideoUrlPrefix: string;
};

const DEFAULTS: RuntimeGlobals = {
  siteUrl: "",
  assetBaseUrl: "",
  person: null,
  siteMetadata: { title: "Portfolio", description: "Portfolio" },
  layoutFromJsonSlugs: [],
  cdnBase: "https://media.notlukagray.com/website",
  cdnTokenExpiryDays: 7,
  cdnClientCacheExpiryHours: 1,
  cdnApiCacheMaxAge: 3600,
  cdnApiCacheStaleWhileRevalidate: 300,
  cdnAllowedHosts: ["media.notlukagray.com"],
  cdnAllowedExtensions: [
    ".webm",
    ".mp4",
    ".mpd",
    ".m3u8",
    ".ts",
    ".m4s",
    ".m4a",
    ".aac",
    ".webp",
    ".jpg",
    ".jpeg",
    ".png",
    ".glb",
    ".gltf",
    ".exr",
    ".hdr",
  ],
  imageDefaultWidth: 1200,
  imageDefaultPosterWidth: 1920,
  imagePosterWidth: 1280,
  imageMobileMaxWidth: 768,
  imageMobileMaxWidth2x: 1536,
  imageDefaultQuality: 75,
  imagePosterQuality: 75,
  imageDefaultFormat: "webp",
  imageDefaultAspectRatio: null,
  imagePosterAspectRatio: null,
  imageClass: null,
  imagePosterClass: null,
  accessCookieName: "site_access",
  accessCookieMaxAgeDays: 7,
  rateLimitCookieName: "unlock_rate",
  rateLimitMaxAttempts: 5,
  rateLimitLockoutMinutes: 10,
  rateLimitCookieExpiryHours: 1,
  formRateLimitMaxPerHour: 5,
  uiResizeDebounceMs: 50,
  uiVideoPauseButtonHideDelayMs: 3000,
  uiHeroCarouselOpacityCurve: [0],
  uiHeroCarouselPlaceholderBackgrounds: ["#000000"],
  uiVideoDoubleTapThresholdMs: 450,
  uiVideoHoldThresholdMs: 400,
  uiVideoHoldRepeatMs: 500,
  uiVideoFeedbackDurationMs: 500,
  uiVideoSeekBackSeconds: 10,
  uiVideoSeekForwardSeconds: 30,
  uiVideoDefaultAspectRatio: "16/9",
  cacheVideoUrlPrefix: "video_url_",
};

let runtimeGlobals: RuntimeGlobals = { ...DEFAULTS };

export let siteUrl = runtimeGlobals.siteUrl;
export let assetBaseUrl = runtimeGlobals.assetBaseUrl;
export let person = runtimeGlobals.person;
export let siteMetadata = runtimeGlobals.siteMetadata;
export let layoutFromJsonSlugs = runtimeGlobals.layoutFromJsonSlugs;
export let cdnBase = runtimeGlobals.cdnBase;
export let cdnTokenExpiryDays = runtimeGlobals.cdnTokenExpiryDays;
export let cdnClientCacheExpiryHours = runtimeGlobals.cdnClientCacheExpiryHours;
export let cdnApiCacheMaxAge = runtimeGlobals.cdnApiCacheMaxAge;
export let cdnApiCacheStaleWhileRevalidate = runtimeGlobals.cdnApiCacheStaleWhileRevalidate;
export let cdnAllowedHosts = runtimeGlobals.cdnAllowedHosts;
export let cdnAllowedExtensions = runtimeGlobals.cdnAllowedExtensions;
export let imageDefaultWidth = runtimeGlobals.imageDefaultWidth;
export let imageDefaultPosterWidth = runtimeGlobals.imageDefaultPosterWidth;
export let imagePosterWidth = runtimeGlobals.imagePosterWidth;
export let imageMobileMaxWidth = runtimeGlobals.imageMobileMaxWidth;
export let imageMobileMaxWidth2x = runtimeGlobals.imageMobileMaxWidth2x;
export let imageDefaultQuality = runtimeGlobals.imageDefaultQuality;
export let imagePosterQuality = runtimeGlobals.imagePosterQuality;
export let imageDefaultFormat = runtimeGlobals.imageDefaultFormat;
export let imageDefaultAspectRatio = runtimeGlobals.imageDefaultAspectRatio;
export let imagePosterAspectRatio = runtimeGlobals.imagePosterAspectRatio;
export let imageClass = runtimeGlobals.imageClass;
export let imagePosterClass = runtimeGlobals.imagePosterClass;
export let accessCookieName = runtimeGlobals.accessCookieName;
export let accessCookieMaxAgeDays = runtimeGlobals.accessCookieMaxAgeDays;
export let rateLimitCookieName = runtimeGlobals.rateLimitCookieName;
export let rateLimitMaxAttempts = runtimeGlobals.rateLimitMaxAttempts;
export let rateLimitLockoutMinutes = runtimeGlobals.rateLimitLockoutMinutes;
export let rateLimitCookieExpiryHours = runtimeGlobals.rateLimitCookieExpiryHours;
export let formRateLimitMaxPerHour = runtimeGlobals.formRateLimitMaxPerHour;
export let uiResizeDebounceMs = runtimeGlobals.uiResizeDebounceMs;
export let uiVideoPauseButtonHideDelayMs = runtimeGlobals.uiVideoPauseButtonHideDelayMs;
export let uiHeroCarouselOpacityCurve = runtimeGlobals.uiHeroCarouselOpacityCurve;
export let uiHeroCarouselPlaceholderBackgrounds =
  runtimeGlobals.uiHeroCarouselPlaceholderBackgrounds;
export let uiVideoDoubleTapThresholdMs = runtimeGlobals.uiVideoDoubleTapThresholdMs;
export let uiVideoHoldThresholdMs = runtimeGlobals.uiVideoHoldThresholdMs;
export let uiVideoHoldRepeatMs = runtimeGlobals.uiVideoHoldRepeatMs;
export let uiVideoFeedbackDurationMs = runtimeGlobals.uiVideoFeedbackDurationMs;
export let uiVideoSeekBackSeconds = runtimeGlobals.uiVideoSeekBackSeconds;
export let uiVideoSeekForwardSeconds = runtimeGlobals.uiVideoSeekForwardSeconds;
export let uiVideoDefaultAspectRatio = runtimeGlobals.uiVideoDefaultAspectRatio;
export let cacheVideoUrlPrefix = runtimeGlobals.cacheVideoUrlPrefix;

function syncExportedGlobals(): void {
  siteUrl = runtimeGlobals.siteUrl;
  assetBaseUrl = runtimeGlobals.assetBaseUrl;
  person = runtimeGlobals.person;
  siteMetadata = runtimeGlobals.siteMetadata;
  layoutFromJsonSlugs = runtimeGlobals.layoutFromJsonSlugs;
  cdnBase = runtimeGlobals.cdnBase;
  cdnTokenExpiryDays = runtimeGlobals.cdnTokenExpiryDays;
  cdnClientCacheExpiryHours = runtimeGlobals.cdnClientCacheExpiryHours;
  cdnApiCacheMaxAge = runtimeGlobals.cdnApiCacheMaxAge;
  cdnApiCacheStaleWhileRevalidate = runtimeGlobals.cdnApiCacheStaleWhileRevalidate;
  cdnAllowedHosts = runtimeGlobals.cdnAllowedHosts;
  cdnAllowedExtensions = runtimeGlobals.cdnAllowedExtensions;
  imageDefaultWidth = runtimeGlobals.imageDefaultWidth;
  imageDefaultPosterWidth = runtimeGlobals.imageDefaultPosterWidth;
  imagePosterWidth = runtimeGlobals.imagePosterWidth;
  imageMobileMaxWidth = runtimeGlobals.imageMobileMaxWidth;
  imageMobileMaxWidth2x = runtimeGlobals.imageMobileMaxWidth2x;
  imageDefaultQuality = runtimeGlobals.imageDefaultQuality;
  imagePosterQuality = runtimeGlobals.imagePosterQuality;
  imageDefaultFormat = runtimeGlobals.imageDefaultFormat;
  imageDefaultAspectRatio = runtimeGlobals.imageDefaultAspectRatio;
  imagePosterAspectRatio = runtimeGlobals.imagePosterAspectRatio;
  imageClass = runtimeGlobals.imageClass;
  imagePosterClass = runtimeGlobals.imagePosterClass;
  accessCookieName = runtimeGlobals.accessCookieName;
  accessCookieMaxAgeDays = runtimeGlobals.accessCookieMaxAgeDays;
  rateLimitCookieName = runtimeGlobals.rateLimitCookieName;
  rateLimitMaxAttempts = runtimeGlobals.rateLimitMaxAttempts;
  rateLimitLockoutMinutes = runtimeGlobals.rateLimitLockoutMinutes;
  rateLimitCookieExpiryHours = runtimeGlobals.rateLimitCookieExpiryHours;
  formRateLimitMaxPerHour = runtimeGlobals.formRateLimitMaxPerHour;
  uiResizeDebounceMs = runtimeGlobals.uiResizeDebounceMs;
  uiVideoPauseButtonHideDelayMs = runtimeGlobals.uiVideoPauseButtonHideDelayMs;
  uiHeroCarouselOpacityCurve = runtimeGlobals.uiHeroCarouselOpacityCurve;
  uiHeroCarouselPlaceholderBackgrounds = runtimeGlobals.uiHeroCarouselPlaceholderBackgrounds;
  uiVideoDoubleTapThresholdMs = runtimeGlobals.uiVideoDoubleTapThresholdMs;
  uiVideoHoldThresholdMs = runtimeGlobals.uiVideoHoldThresholdMs;
  uiVideoHoldRepeatMs = runtimeGlobals.uiVideoHoldRepeatMs;
  uiVideoFeedbackDurationMs = runtimeGlobals.uiVideoFeedbackDurationMs;
  uiVideoSeekBackSeconds = runtimeGlobals.uiVideoSeekBackSeconds;
  uiVideoSeekForwardSeconds = runtimeGlobals.uiVideoSeekForwardSeconds;
  uiVideoDefaultAspectRatio = runtimeGlobals.uiVideoDefaultAspectRatio;
  cacheVideoUrlPrefix = runtimeGlobals.cacheVideoUrlPrefix;
}

export function configureRuntimeGlobals(patch: Partial<RuntimeGlobals>): void {
  runtimeGlobals = {
    ...runtimeGlobals,
    ...patch,
    cdnAllowedExtensions: patch.cdnAllowedExtensions
      ? [...patch.cdnAllowedExtensions]
      : runtimeGlobals.cdnAllowedExtensions,
    cdnAllowedHosts: patch.cdnAllowedHosts
      ? [...patch.cdnAllowedHosts]
      : runtimeGlobals.cdnAllowedHosts,
    layoutFromJsonSlugs: patch.layoutFromJsonSlugs
      ? [...patch.layoutFromJsonSlugs]
      : runtimeGlobals.layoutFromJsonSlugs,
    uiHeroCarouselOpacityCurve: patch.uiHeroCarouselOpacityCurve
      ? [...patch.uiHeroCarouselOpacityCurve]
      : runtimeGlobals.uiHeroCarouselOpacityCurve,
    uiHeroCarouselPlaceholderBackgrounds: patch.uiHeroCarouselPlaceholderBackgrounds
      ? [...patch.uiHeroCarouselPlaceholderBackgrounds]
      : runtimeGlobals.uiHeroCarouselPlaceholderBackgrounds,
  };
  syncExportedGlobals();
}

export function resetRuntimeGlobals(): void {
  runtimeGlobals = { ...DEFAULTS };
  syncExportedGlobals();
}
