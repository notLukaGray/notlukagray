"use client";

import { useRef } from "react";
import { useScrollLock } from "@/page-builder/section/position/use-scroll-lock";
import { useSmoothScroll } from "@/core/hooks/use-smooth-scroll";
import { ScrollContainerProvider } from "@/page-builder/section/position/use-scroll-container";
import { MotionConfig } from "@/page-builder/integrations/framer-motion";

export default function WorkLayout({ children }: { children: React.ReactNode }) {
  useScrollLock();
  const scrollRef = useRef<HTMLDivElement>(null);
  useSmoothScroll(scrollRef);
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
