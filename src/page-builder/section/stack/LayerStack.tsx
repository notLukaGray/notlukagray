"use client";

import { useMemo } from "react";
import type { dividerLayer } from "@/page-builder/core/page-builder-schemas";
import { castBlendMode } from "@/page-builder/core/section-utils";

type LayerStackProps = {
  layers?: dividerLayer[];
  fill?: string;
};

/** Renders section background layers (blend modes) or a single fill. */
export function LayerStack({ layers, fill }: LayerStackProps) {
  const layerElements = useMemo(() => {
    if (layers?.length) {
      return layers.map((layer, i) => (
        <div
          key={i}
          className="absolute inset-0"
          style={{
            background: layer.fill ?? "transparent",
            mixBlendMode: castBlendMode(layer.blendMode),
            opacity: layer.opacity,
          }}
        />
      ));
    }

    if (fill) {
      return <div className="absolute inset-0" style={{ background: fill }} />;
    }

    return null;
  }, [layers, fill]);

  return <>{layerElements}</>;
}
