import type { bgBlock } from "@pb/contracts/page-builder/core/page-builder-schemas";

export type BackgroundVideoProps = Extract<bgBlock, { type: "backgroundVideo" }>;
