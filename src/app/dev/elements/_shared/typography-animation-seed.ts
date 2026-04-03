import { pbBuilderDefaultsV1 } from "@/app/theme/pb-builder-defaults";
import type { PbImageAnimationDefaults } from "@/app/theme/pb-builder-defaults";

/** Deep clone of the image hero animation defaults — same animation lab starting point for typography dev. */
export function cloneDefaultTypographyAnimation(): PbImageAnimationDefaults {
  return JSON.parse(
    JSON.stringify(pbBuilderDefaultsV1.elements.image.variants.hero.animation)
  ) as PbImageAnimationDefaults;
}

export function addTypographyAnimationToVariants<
  K extends string,
  T extends Record<string, unknown>,
>(variants: Record<K, T>): Record<K, T & { animation: PbImageAnimationDefaults }> {
  const out = {} as Record<K, T & { animation: PbImageAnimationDefaults }>;
  for (const key of Object.keys(variants) as K[]) {
    out[key] = {
      ...variants[key],
      animation: cloneDefaultTypographyAnimation(),
    };
  }
  return out;
}
