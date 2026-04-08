/**
 * Element blocks are defined by `elementBlockSchema` (Zod). Re-export the inferred type so
 * `page-builder-types` stays aligned with runtime validation — including `elementGroup` fields
 * such as `gap`, `rowGap`, `columnGap`, `flexDirection`, `alignItems`, `justifyContent`, etc.
 */
export type { ElementBlock } from "../page-builder-schemas";
