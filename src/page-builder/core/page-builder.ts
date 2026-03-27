import {
  getPage,
  getPageAsync,
  getModalProps,
  getPageBuilderProps,
  getPageBuilderPropsAsync,
  type GetPageBuilderPropsOptions,
  type PageBuilderPageProps,
  type PageBuilderPageClientPage,
  type GetModalPropsOptions,
} from "./page-builder-get-props";

export type {
  bgVarLayer,
  bgPatternRepeat,
  bgBlock,
  ElementBlock,
  SectionBlock,
  ResolvedPage,
  PageBuilder,
  PageBuilderDefinitionBlock,
  PageScrollConfig,
  SectionBlockWithElementOrder,
} from "@/page-builder/core/page-builder-schemas";
export { ASSET_URL_KEYS } from "@/page-builder/core/page-builder-schemas";
export { resolveAssetUrl } from "@/core/lib/asset-url";

export {
  getAssetBaseUrl,
  resolveBgBlockUrls,
  resolveElementBlockUrls,
  resolveSectionBlockUrls,
} from "@/page-builder/core/page-builder-blocks";
export { resolveTriggerPayloadUrls } from "@/page-builder/core/page-builder-triggers";
export {
  isPresetRef,
  resolvePresetRef,
  mergePresetIntoBlock,
  resolvePresets,
} from "@/page-builder/core/page-builder-presets";
export {
  readJsonFileSafe,
  coercePresetMap,
  loadPageBuilder,
  loadPageBuilderByPath,
  loadPageBuilderByPathAsync,
  getPageSlugs,
  getPageSlugsByBase,
  getPageSlugBases,
} from "@/page-builder/core/page-builder-load";
export {
  discoverAllPages,
  resolvePagePath,
  type PageEntry,
} from "@/page-builder/core/load/page-builder-discover-pages";
export { loadModal, type ModalBuilder } from "@/page-builder/core/modal-load";
export { expandPageBuilder } from "@/page-builder/core/page-builder-expand";
export { getAllAssetUrlsFromPage } from "@/page-builder/core/page-builder-asset-urls";
export { PageBuilderPage } from "../PageBuilderPage";
export { isMobileFromUserAgent } from "./page-builder-resolve-breakpoint-server";
export { ModalRenderer } from "../ModalRenderer";

export type {
  GetPageBuilderPropsOptions,
  PageBuilderPageProps,
  PageBuilderPageClientPage,
  GetModalPropsOptions,
};
export type { ModalProps } from "./modal-types";

export { getPage, getPageAsync, getModalProps, getPageBuilderProps, getPageBuilderPropsAsync };
