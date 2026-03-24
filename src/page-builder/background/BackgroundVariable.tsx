"use client";

import { useMemo } from "react";
import type { CSSProperties } from "react";
import type { bgBlock } from "@/page-builder/core/page-builder-schemas";

type Props = Extract<bgBlock, { type: "backgroundVariable" }>;

const DEFAULT_BLEND = "normal";

/** Page builder background: variable layers (fill, blend mode, opacity) via CSS. */
export function BackgroundVariable({ layers }: Props) {
  const sectionProps = useMemo(
    () => ({
      className: "pointer-events-none fixed inset-0 z-0",
      "aria-hidden": true as const,
    }),
    []
  );

  const layerElements = useMemo(() => {
    if (!layers?.length) return null;

    return layers.map((layer, i) => {
      const fill = layer.fill ?? "transparent";
      const blendMode = (layer.blendMode ?? DEFAULT_BLEND) as CSSProperties["mixBlendMode"];
      const opacity = layer.opacity ?? 1;

      return (
        <div
          key={i}
          className="absolute inset-0"
          style={{
            background: fill,
            mixBlendMode: blendMode,
            opacity,
          }}
        />
      );
    });
  }, [layers]);

  if (!layers?.length) return null;

  return <section {...sectionProps}>{layerElements}</section>;
}
