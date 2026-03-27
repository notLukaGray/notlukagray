"use client";

import { useRef } from "react";
import { ScrollContainerProvider } from "@/page-builder/section/position/use-scroll-container";
import { MotionConfig } from "@/page-builder/integrations/framer-motion";

/**
 * Universal page-builder layout: provides a scroll container with non-static
 * position so Framer Motion useScroll (e.g. useSectionScrollProgress) can
 * compute scroll offset correctly, wrapped in a MotionConfig that respects
 * the user's reduced-motion preference.
 *
 * Previously each section (work, research, teaching) had its own layout.
 * Those are replaced by this single catch-all layout. Page-level scroll
 * behaviors (lock, smooth scroll) are controlled via page JSON — see the
 * page-builder scroll behavior task.
 */
export default function UniversalPageBuilderLayout({ children }: { children: React.ReactNode }) {
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
