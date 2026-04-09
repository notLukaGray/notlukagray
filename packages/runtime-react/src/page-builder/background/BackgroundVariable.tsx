"use client";

import type { bgBlock } from "@pb/contracts/page-builder/core/page-builder-schemas";
import { AnimatedBgVariableLayer } from "./AnimatedBgVariableLayer";

type Props = Extract<bgBlock, { type: "backgroundVariable" }>;

/**
 * Page builder background: variable layers (fill, blend mode, opacity, motion).
 *
 * Each layer in the array is rendered as an `AnimatedBgVariableLayer`, which handles
 * both static CSS layers (no `motion` field) and fully animated layers (loop, entrance,
 * scroll, pointer, parallax, trigger — composable in any combination).
 */
export function BackgroundVariable({ layers }: Props) {
  if (!layers?.length) return null;

  return (
    <section className="pointer-events-none fixed inset-0 z-0" aria-hidden>
      {layers.map((layer, i) => (
        <AnimatedBgVariableLayer
          key={i}
          fill={layer.fill}
          blendMode={layer.blendMode}
          opacity={layer.opacity}
          backgroundSize={layer.backgroundSize}
          backgroundPosition={layer.backgroundPosition}
          motion={layer.motion}
        />
      ))}
    </section>
  );
}
