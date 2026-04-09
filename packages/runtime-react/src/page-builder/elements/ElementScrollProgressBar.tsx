"use client";

import type { ElementBlock } from "@pb/contracts/page-builder/core/page-builder-schemas";
import { useSectionScrollTarget } from "@/page-builder/section/position/SectionScrollTargetContext";
import { SectionScrollProgressBar } from "@/page-builder/integrations/framer-motion";

type Props = Extract<ElementBlock, { type: "elementScrollProgressBar" }>;

/** Coerce responsive or tuple value to a single string for bar style props. */
function asString(v: unknown): string | undefined {
  if (typeof v === "string") return v;
  if (Array.isArray(v) && typeof v[0] === "string") return v[0];
  return undefined;
}

/**
 * Renders a scroll progress bar (0→1) for the parent section. Must be placed inside
 * a section that provides SectionScrollTargetContext; otherwise renders nothing.
 * Style from element props or motion-defaults progressBar.
 */
export function ElementScrollProgressBar(props: Props) {
  const sectionRef = useSectionScrollTarget();
  if (!sectionRef) return null;

  const height = asString(props.height);
  const fill = asString(props.fill);
  const trackBackground = asString(props.trackBackground);
  const offset =
    Array.isArray(props.offset) && props.offset.length === 2
      ? (props.offset as [string, string])
      : undefined;

  return (
    <div
      className="w-full"
      style={{
        position: "relative",
        height: 0,
        overflow: "visible",
      }}
    >
      <SectionScrollProgressBar
        sectionRef={sectionRef}
        height={height}
        fill={fill}
        trackBackground={trackBackground}
        offset={offset}
      />
    </div>
  );
}
