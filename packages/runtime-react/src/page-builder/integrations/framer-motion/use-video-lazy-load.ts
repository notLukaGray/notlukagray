"use client";

import { useCallback, useState } from "react";
import { useInView } from "@/page-builder/integrations/framer-motion/viewport";
import { MOTION_DEFAULTS } from "@pb/contracts/page-builder/core/page-builder-motion-defaults";

type UseVideoLazyLoadParams = {
  autoplay: boolean;
  hasSource: boolean;
  priority?: boolean;
  containerRef: React.RefObject<HTMLElement | null>;
};

export function useVideoLazyLoad({
  autoplay,
  hasSource,
  priority = false,
  containerRef,
}: UseVideoLazyLoadParams) {
  const [userArmed, setUserArmed] = useState(false);

  const isInView = useInView(containerRef, {
    amount: MOTION_DEFAULTS.viewport.amount,
    once: MOTION_DEFAULTS.viewport.once,
  });

  const shouldLoadVideo = priority || autoplay || (hasSource && (isInView || userArmed));

  const armVideoLoad = useCallback(() => {
    setUserArmed(true);
  }, []);

  return { shouldLoadVideo, armVideoLoad };
}
