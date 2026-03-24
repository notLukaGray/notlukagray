"use client";

import { useMemo } from "react";
import type { SectionEffect } from "@/page-builder/core/page-builder-schemas";

type GlassEffect = Extract<SectionEffect, { type: "glass" }>;

type GlassOverlayProps = {
  effects?: SectionEffect[];
};

function clamp(value: number, min: number, max: number): number {
  return Math.max(min, Math.min(max, value));
}

function round(value: number, decimals = 3): number {
  const factor = 10 ** decimals;
  return Math.round(value * factor) / factor;
}

function resolveGlassEffect(effects?: SectionEffect[]): GlassEffect | null {
  if (!Array.isArray(effects)) return null;
  for (const effect of effects) {
    if (effect.type === "glass") return effect;
  }
  return null;
}

/** Extra visual layers for advanced glass treatment (glare, micro-noise, chromatic fringe). */
export function GlassOverlay({ effects }: GlassOverlayProps) {
  const glass = useMemo(() => resolveGlassEffect(effects), [effects]);
  if (!glass) return null;

  const lightIntensity = clamp(glass.lightIntensity ?? 0.35, 0, 1);
  const refraction = clamp(glass.refraction ?? 0.45, 0, 1);
  const dispersion = clamp(glass.dispersion ?? 0, 0, 1);
  const depth = Math.max(glass.depth ?? 1, 1);
  const lightAngle = glass.lightAngle ?? -35;

  const glareOpacity = round(0.12 + lightIntensity * 0.35, 3);
  const causticOpacity = round(0.06 + refraction * 0.2, 3);
  const noiseOpacity = round(0.04 + depth * 0.02 + refraction * 0.03, 3);
  const fringeOffset = round(dispersion * 2.2, 2);
  const fringeOpacity = round(0.08 + dispersion * 0.22, 3);
  const noiseSize = `${Math.max(2, Math.round(8 - Math.min(3, depth)))}px`;

  return (
    <>
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none"
        style={{
          borderRadius: "inherit",
          background: [
            `linear-gradient(${lightAngle}deg, rgba(255,255,255,${glareOpacity}) 0%, rgba(255,255,255,0.02) 34%, rgba(255,255,255,0) 60%)`,
            `linear-gradient(${lightAngle + 180}deg, rgba(255,255,255,${causticOpacity}) 0%, rgba(255,255,255,0) 45%)`,
          ].join(", "),
          mixBlendMode: "screen",
        }}
      />
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none"
        style={{
          borderRadius: "inherit",
          backgroundImage:
            "radial-gradient(rgba(255,255,255,0.45) 0.7px, rgba(255,255,255,0) 0.7px)",
          backgroundSize: `${noiseSize} ${noiseSize}`,
          opacity: noiseOpacity,
          mixBlendMode: "soft-light",
        }}
      />
      {dispersion > 0 ? (
        <div
          aria-hidden
          className="absolute inset-0 pointer-events-none"
          style={{
            borderRadius: "inherit",
            boxShadow: [
              `inset ${fringeOffset}px 0 0 rgba(255, 84, 184, ${fringeOpacity})`,
              `inset -${fringeOffset}px 0 0 rgba(80, 199, 255, ${fringeOpacity})`,
            ].join(", "),
          }}
        />
      ) : null}
    </>
  );
}
