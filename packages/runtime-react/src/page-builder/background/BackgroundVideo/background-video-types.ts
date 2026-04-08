import type { bgBlock } from "@pb/core/internal/page-builder-schemas";

export type BackgroundVideoProps = Extract<bgBlock, { type: "backgroundVideo" }>;
