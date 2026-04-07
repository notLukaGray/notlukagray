import type { ElementBlock } from "@/page-builder/core/page-builder-schemas";
import type { PbImageAnimationDefaults } from "@/app/theme/pb-builder-defaults";

export type InputVariantDefaults = Omit<Extract<ElementBlock, { type: "elementInput" }>, "type"> & {
  animation: PbImageAnimationDefaults;
};

export type InputVariantKey = "default" | "compact" | "minimal";

export type PersistedInputDefaults = {
  v: 1;
  defaultVariant: InputVariantKey;
  variants: Record<InputVariantKey, InputVariantDefaults>;
};
