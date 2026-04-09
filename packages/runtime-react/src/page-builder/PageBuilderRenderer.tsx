"use client";

import { useMemo } from "react";
import type { bgBlock, SectionBlock } from "@pb/contracts/page-builder/core/page-builder-schemas";
import { SECTION_COMPONENTS } from "@/page-builder/section";
import { generateSectionKey } from "@pb/core/internal/section-keys";
import type { TriggerAction } from "@pb/contracts/page-builder/core/page-builder-schemas";
import type { BackgroundTransitionEffect } from "@pb/contracts/page-builder/core/page-builder-types";
import { usePageBuilderTriggers } from "@/page-builder/hooks/use-page-builder-triggers";
import { ServerBreakpointProvider } from "@pb/runtime-react/core/providers/device-type-provider";
import { PageBuilderBackground } from "./PageBuilderBackground";
import { SectionErrorBoundary } from "./SectionErrorBoundary";

type Props = {
  resolvedBg: bgBlock | null;
  resolvedSections: SectionBlock[];
  onPageProgress?: TriggerAction;
  bgDefinitions?: Record<string, bgBlock>;
  transitions?: BackgroundTransitionEffect | BackgroundTransitionEffect[];
  serverIsMobile?: boolean;
};

export function PageBuilderRenderer({
  resolvedBg,
  resolvedSections,
  onPageProgress,
  bgDefinitions,
  transitions,
  serverIsMobile,
}: Props) {
  const {
    currentBg,
    sectionsWithOverrides,
    activeTransitionIds,
    reversingTransitionIds,
    transitionProgress,
    setActiveTransitionIds,
    setReversingTransitionIds,
    transitionsArray,
  } = usePageBuilderTriggers({
    resolvedBg,
    resolvedSections,
    onPageProgress,
    bgDefinitions,
    transitions,
  });

  const bg = currentBg;
  const sections = sectionsWithOverrides;

  const resolvedTransitionBackgrounds = useMemo(() => {
    if (transitionsArray.length === 0 || !bgDefinitions)
      return new Map<string, { fromBg: bgBlock | null; toBg: bgBlock | null }>();
    const resolved = new Map<string, { fromBg: bgBlock | null; toBg: bgBlock | null }>();
    for (const transition of transitionsArray) {
      const transitionId = transition.id;
      const fromBgRaw = bgDefinitions[transition.from];
      const toBgRaw = bgDefinitions[transition.to];
      if (!fromBgRaw || !toBgRaw) {
        resolved.set(transitionId, { fromBg: null, toBg: null });
        continue;
      }
      resolved.set(transitionId, { fromBg: fromBgRaw, toBg: toBgRaw });
    }
    return resolved;
  }, [transitionsArray, bgDefinitions]);

  const loading = false;
  const error = null;

  const hasAbsoluteSections = sections.some(
    (s) => s && typeof s === "object" && ("initialX" in s || "initialY" in s)
  );

  const firstContentSectionIndex = useMemo(
    () => sections.findIndex((s) => s.type !== "divider"),
    [sections]
  );

  const content = (
    <>
      {error && (
        <p className="sr-only" role="status" aria-live="polite">
          Some media failed to load. Content may be incomplete.
        </p>
      )}
      <PageBuilderBackground
        loading={loading}
        bg={bg}
        transitionsArray={transitionsArray}
        activeTransitionIds={activeTransitionIds}
        reversingTransitionIds={reversingTransitionIds}
        transitionProgress={transitionProgress}
        resolvedTransitionBackgrounds={resolvedTransitionBackgrounds}
        setActiveTransitionIds={setActiveTransitionIds}
        setReversingTransitionIds={setReversingTransitionIds}
      />
      <div style={{ position: "relative", zIndex: 2 }}>
        {sections.map((section, i) => {
          const SectionComponent = SECTION_COMPONENTS[section.type];
          const key = generateSectionKey(section, i);
          const extraProps: { _isFirstSection?: boolean } = {
            _isFirstSection: firstContentSectionIndex >= 0 && i === firstContentSectionIndex,
          };
          if (!SectionComponent) {
            if (process.env.NODE_ENV === "development") {
              console.warn(
                `[page-builder] PageBuilderRenderer: unknown section type "${section.type}"`
              );
            }
            return null;
          }
          return (
            <SectionErrorBoundary key={key} sectionKey={key}>
              <SectionComponent {...section} {...extraProps} />
            </SectionErrorBoundary>
          );
        })}
      </div>
    </>
  );

  const wrapper = (
    <div
      className={hasAbsoluteSections ? "relative w-full" : ""}
      style={hasAbsoluteSections ? { minHeight: "100%" } : undefined}
    >
      {serverIsMobile !== undefined ? (
        <ServerBreakpointProvider isMobile={serverIsMobile}>{content}</ServerBreakpointProvider>
      ) : (
        content
      )}
    </div>
  );

  return wrapper;
}
