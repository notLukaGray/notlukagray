"use client";

import { useRef } from "react";
import { ScrollContainerProvider } from "@/page-builder/section/position/use-scroll-container";
import { MotionConfig } from "@/page-builder/integrations/framer-motion";

/**
 * Research layout: provides a scroll container with non-static position so
 * Framer Motion useScroll (e.g. useSectionScrollProgress) can compute scroll
 * offset correctly. Matches work layout pattern without scroll lock / smooth scroll.
 */
export default function ResearchLayout({ children }: { children: React.ReactNode }) {
  const scrollRef = useRef<HTMLDivElement>(null);
  return (
    <MotionConfig reducedMotion="user">
      <ScrollContainerProvider containerRef={scrollRef}>
        <div
          ref={scrollRef}
          className="work-scroll relative h-dvh w-full min-w-0 overflow-y-auto overflow-x-hidden bg-black"
        >
          {children}
        </div>
      </ScrollContainerProvider>
    </MotionConfig>
  );
}
