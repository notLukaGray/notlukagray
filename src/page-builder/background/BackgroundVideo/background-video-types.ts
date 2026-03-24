import type { bgBlock } from "@/page-builder/core/page-builder-schemas";

export type BackgroundVideoProps = Extract<bgBlock, { type: "backgroundVideo" }>;
