"use client";

import { useEffect, useMemo, useState, type RefObject } from "react";
import LiquidGlass from "@nkzw/liquid-glass";
import type { SectionEffect } from "@/page-builder/core/page-builder-schemas";
import { GlassOverlay } from "./GlassOverlay";

type GlassEffect = Extract<SectionEffect, { type: "glass" }>;
type GlassMode = NonNullable<GlassEffect["mode"]>;

type SectionGlassEffectProps = {
  effects?: SectionEffect[];
  sectionRef?: RefObject<HTMLElement | null>;
};

type SectionSize = {
  width: number;
  height: number;
  borderRadius: number;
};

const DEFAULT_SECTION_SIZE: SectionSize = {
  width: 0,
  height: 0,
  borderRadius: 0,
};

function clamp(value: number, min: number, max: number): number {
  return Math.max(min, Math.min(max, value));
}

function parsePx(value: string | undefined): number | undefined {
  if (typeof value !== "string") return undefined;
  const normalized = value.trim().toLowerCase();
  if (!normalized) return undefined;
  const numeric = normalized.endsWith("px")
    ? Number.parseFloat(normalized.slice(0, -2))
    : Number.parseFloat(normalized);
  return Number.isFinite(numeric) ? numeric : undefined;
}

function resolveGlassEffect(effects?: SectionEffect[]): GlassEffect | null {
  if (!Array.isArray(effects)) return null;
  for (const effect of effects) {
    if (effect.type === "glass") return effect;
  }
  return null;
}

function resolveMode(glass: GlassEffect): GlassMode {
  const explicitMode = glass.mode;
  if (
    explicitMode === "standard" ||
    explicitMode === "polar" ||
    explicitMode === "prominent" ||
    explicitMode === "shader"
  ) {
    return explicitMode;
  }

  const refraction = clamp(glass.refraction ?? 0.45, 0, 1);
  const dispersion = clamp(glass.dispersion ?? 0, 0, 1);
  if (refraction >= 0.65 || dispersion >= 0.45) return "shader";
  if (refraction >= 0.45 || dispersion >= 0.2) return "prominent";
  return "standard";
}

function resolveLiquidGlassProps(glass: GlassEffect) {
  const frostPx = parsePx(glass.frost) ?? 16;
  const lightIntensity = clamp(glass.lightIntensity ?? 0.35, 0, 1);
  const refraction = clamp(glass.refraction ?? 0.45, 0, 1);
  const dispersion = clamp(glass.dispersion ?? 0, 0, 1);
  const depth = Math.max(glass.depth ?? 1, 1);

  return {
    mode: resolveMode(glass),
    blurAmount: clamp(frostPx / 32, 0.04, 1.25),
    displacementScale: clamp(24 + refraction * 112, 12, 136),
    aberrationIntensity: clamp(0.8 + dispersion * 5.2, 0.4, 6),
    elasticity: clamp(0.08 + (depth - 1) * 0.14, 0.06, 0.65),
    saturation: Math.round(118 + lightIntensity * 86 + refraction * 18),
    overLight: lightIntensity >= 0.62,
  };
}

export function SectionGlassEffect({ effects, sectionRef }: SectionGlassEffectProps) {
  const glass = useMemo(() => resolveGlassEffect(effects), [effects]);
  const [sectionSize, setSectionSize] = useState<SectionSize>(DEFAULT_SECTION_SIZE);

  useEffect(() => {
    const sectionEl = sectionRef?.current;
    if (!sectionEl) return;

    const update = () => {
      const computed = getComputedStyle(sectionEl);
      const radius = Number.parseFloat(computed.borderTopLeftRadius) || 0;
      setSectionSize({
        width: Math.max(0, sectionEl.clientWidth),
        height: Math.max(0, sectionEl.clientHeight),
        borderRadius: radius,
      });
    };

    update();

    if (typeof ResizeObserver === "undefined") {
      window.addEventListener("resize", update);
      return () => window.removeEventListener("resize", update);
    }

    const observer = new ResizeObserver(() => update());
    observer.observe(sectionEl);
    return () => observer.disconnect();
  }, [sectionRef, glass]);

  if (!glass) return null;

  const runtime = resolveLiquidGlassProps(glass);

  return (
    <>
      <div aria-hidden className="absolute inset-0 pointer-events-none overflow-hidden">
        {sectionSize.width > 0 && sectionSize.height > 0 ? (
          <LiquidGlass
            aberrationIntensity={runtime.aberrationIntensity}
            blurAmount={runtime.blurAmount}
            borderRadius={sectionSize.borderRadius}
            displacementScale={runtime.displacementScale}
            elasticity={runtime.elasticity}
            mode={runtime.mode}
            mouseContainer={sectionRef ?? null}
            overLight={runtime.overLight}
            padding="0px"
            saturation={runtime.saturation}
            style={{
              height: 0,
              left: "50%",
              pointerEvents: "none",
              position: "absolute",
              top: "50%",
              width: 0,
              zIndex: 0,
            }}
          >
            <span
              style={{
                display: "block",
                height: `${sectionSize.height}px`,
                width: `${sectionSize.width}px`,
              }}
            />
          </LiquidGlass>
        ) : null}
      </div>
      <GlassOverlay effects={effects} />
    </>
  );
}
