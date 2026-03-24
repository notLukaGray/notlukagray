"use client";

import { useRef } from "react";
import { ScrollContainerProvider } from "@/page-builder/section/position/use-scroll-container";
import { MotionConfig } from "@/page-builder/integrations/framer-motion";

/**
 * Teaching layout: same scroll + motion context as research so page-builder
 * sections and Framer Motion (e.g. useSectionScrollProgress) work correctly.
 */
export default function TeachingLayout({ children }: { children: React.ReactNode }) {
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
