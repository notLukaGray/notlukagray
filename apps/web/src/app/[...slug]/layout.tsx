"use client";

import { useRef } from "react";
import { MotionConfig } from "@pb/runtime-react/motion";
import { ScrollContainerProvider } from "@pb/runtime-react/scroll";

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
