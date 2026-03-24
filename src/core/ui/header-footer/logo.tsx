"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useId, useState } from "react";
import { logoConfig } from "@/core/lib/globals";
import { resolveLogoProps, type LogoConfig, type ResolvedLogoProps } from "@/core/lib/logo";

function LogoSvg({
  viewBox,
  size,
  fillPaths,
  gradient,
  stroke,
  defaultId,
  hoverId,
  activeId,
  strokeColor,
  fillUrl,
}: ResolvedLogoProps) {
  const grad = gradient;
  return (
    <svg
      width={size}
      height={size}
      viewBox={viewBox}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="block"
      aria-hidden
    >
      <defs>
        <linearGradient
          id={defaultId}
          gradientUnits="objectBoundingBox"
          x1="0"
          y1="1"
          x2="1"
          y2="0"
          gradientTransform={`rotate(${grad.angleDeg} 0.5 0.5)`}
        >
          {grad.stops.map((s, i) => (
            <stop key={i} offset={s.offset} stopColor={grad.defaultColor} stopOpacity={s.opacity} />
          ))}
        </linearGradient>
        <linearGradient
          id={hoverId}
          gradientUnits="objectBoundingBox"
          x1="0"
          y1="1"
          x2="1"
          y2="0"
          gradientTransform={`rotate(${grad.angleDeg} 0.5 0.5)`}
        >
          {(grad.hoverStops ?? grad.stops).map((s, i) => (
            <stop key={i} offset={s.offset} stopColor={grad.hoverColor} stopOpacity={s.opacity} />
          ))}
        </linearGradient>
        <linearGradient
          id={activeId}
          gradientUnits="objectBoundingBox"
          x1="0"
          y1="1"
          x2="1"
          y2="0"
          gradientTransform={`rotate(${grad.angleDeg} 0.5 0.5)`}
        >
          {(grad.activeStops ?? grad.stops).map((s, i) => (
            <stop key={i} offset={s.offset} stopColor={grad.activeColor} stopOpacity={s.opacity} />
          ))}
        </linearGradient>
      </defs>
      <g fill={fillUrl}>
        {fillPaths.map((d, i) => (
          <path key={i} d={d} />
        ))}
      </g>
      <g
        fill="none"
        stroke={strokeColor}
        strokeWidth={stroke.width}
        strokeMiterlimit={stroke.miterLimit}
        strokeLinejoin={stroke.lineJoin as "round" | "miter" | "bevel"}
        style={{ mixBlendMode: stroke.blendMode as "overlay", opacity: stroke.opacity }}
      >
        {fillPaths.map((d, i) => (
          <path key={i} d={d} />
        ))}
      </g>
    </svg>
  );
}

export function Logo() {
  const pathname = usePathname();
  const [hover, setHover] = useState(false);
  const id = useId().replace(/:/g, "-");
  const isActive = pathname === "/";
  const props = resolveLogoProps(logoConfig as LogoConfig, id, { hover, isActive });

  return (
    <Link
      href="/"
      className="relative inline-flex shrink-0 items-center justify-center rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/50"
      aria-label="Home"
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      <LogoSvg {...props} />
    </Link>
  );
}
