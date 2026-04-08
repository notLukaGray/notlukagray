"use client";

import Image from "next/image";
import { useState, useCallback } from "react";
import type { BackgroundVideoProps } from "./BackgroundVideo/background-video-types";

const sectionProps = {
  className: "pointer-events-none fixed inset-0 z-0 min-h-[100dvh] h-[100dvh]",
  "aria-hidden": true as const,
} as const;

export function BackgroundVideo({
  video,
  poster,
  overlay,
}: BackgroundVideoProps & { priority?: boolean }) {
  const [usePosterFallback, setUsePosterFallback] = useState(false);

  const handleError = useCallback(() => {
    setUsePosterFallback(true);
  }, []);

  const overlayStyle = overlay ? { backgroundColor: overlay } : undefined;
  const overlayEl = overlayStyle ? (
    <div
      className="absolute inset-0 h-full w-full pointer-events-none"
      style={overlayStyle}
      aria-hidden
    />
  ) : null;

  // Fallback: if video fails, show the poster as a static background.
  if (usePosterFallback && poster) {
    return (
      <section {...sectionProps}>
        <div className="absolute inset-0 h-full w-full" aria-hidden>
          <Image src={poster} alt="" fill priority className="object-cover object-center" />
        </div>
        {overlayEl}
      </section>
    );
  }

  // Primary path: no poster for the happy path. Let the video paint directly.
  return (
    <section {...sectionProps}>
      <div className="absolute inset-0 h-full w-full">
        <video
          src={video}
          muted
          loop
          playsInline
          autoPlay
          preload="metadata"
          disablePictureInPicture
          disableRemotePlayback
          controlsList="nodownload nofullscreen noremoteplayback"
          draggable={false}
          className="h-full w-full object-cover"
          aria-hidden
          tabIndex={-1}
          onContextMenu={(e) => e.preventDefault()}
          onDragStart={(e) => e.preventDefault()}
          onError={handleError}
        />
      </div>
      {overlayEl}
    </section>
  );
}
