export * from "./page-builder/core/page-builder-schemas";
export * from "./page-builder/core/page-builder-motion-defaults";
export {
  PAGE_DENSITY_LEVELS,
  getPageDensityMultipliers,
  buildPageDensityCssVars,
  scaleSpaceForDensity,
  scaleSpaceShorthandForDensity,
  scaleRadiusForDensity,
} from "./page-builder/core/page-density";

export {
  importerCapabilitySchema,
  exporterCapabilitySchema,
  cmsAdapterCapabilitySchema,
  integrationCapabilitySchema,
  type ImporterCapability,
  type ExporterCapability,
  type CmsAdapterCapability,
  type IntegrationCapability,
} from "./capability-schemas";

export { CONTRACT_VERSION, SUPPORTED_CONTRACT_VERSIONS } from "./version";

export type { JsonPrimitive, JsonValue, JsonObject } from "./core/lib/json-value";

export {
  sectionBlockSchema as sectionSchema,
  elementBlockSchema as elementSchema,
  moduleBlockSchema as moduleSchema,
  formFieldBlockSchema as formFieldSchema,
} from "./page-builder/core/page-builder-schemas";
