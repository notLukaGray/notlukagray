import type { ElementBlock } from "@/page-builder/core/page-builder-schemas";
import type { PbImageAnimationDefaults } from "@/app/theme/pb-builder-defaults";

export type LinkVariantDefaults = Omit<Extract<ElementBlock, { type: "elementLink" }>, "type"> & {
  animation: PbImageAnimationDefaults;
};

export type LinkVariantKey = "inline" | "emphasis" | "nav";

export type PersistedLinkDefaults = {
  v: 1;
  defaultVariant: LinkVariantKey;
  variants: Record<LinkVariantKey, LinkVariantDefaults>;
};
