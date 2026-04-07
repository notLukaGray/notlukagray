import type { ElementBlock } from "@/page-builder/core/page-builder-schemas";
import type { PbImageAnimationDefaults } from "@/app/theme/pb-builder-defaults";

export type VectorVariantDefaults = Omit<
  Extract<ElementBlock, { type: "elementVector" }>,
  "type"
> & {
  animation: PbImageAnimationDefaults;
};

export type VectorVariantKey = "default" | "outline" | "filled";

export type PersistedVectorDefaults = {
  v: 1;
  defaultVariant: VectorVariantKey;
  variants: Record<VectorVariantKey, VectorVariantDefaults>;
};
