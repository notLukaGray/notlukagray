"use client";

/**
 * RivePlayer — wraps @rive-app/react-canvas behind the integration boundary.
 * Nothing outside src/page-builder/integrations/rive/ imports from @rive-app/react-canvas.
 */

import { useRive, Layout, Fit, Alignment } from "@rive-app/react-canvas";
import type { Rive } from "@rive-app/react-canvas";

export type RivePlayerProps = {
  /** URL to the .riv file. */
  src: string;
  /** Artboard name; defaults to the first artboard in the file. */
  artboard?: string;
  /** State machine name to load. */
  stateMachine?: string;
  /** Whether to start playback automatically (default true). */
  autoplay?: boolean;
  /** State machine boolean/number inputs to apply after the Rive instance is ready. */
  riveInputs?: Record<string, boolean | number>;
  /** Callback fired when the active state machine changes states. */
  onStateChange?: (stateName: string) => void;
  /** Ref forwarded to the raw Rive instance for imperative control. */
  riveRef?: React.MutableRefObject<Rive | null>;
  className?: string;
  style?: React.CSSProperties;
  /** aria-label for the canvas wrapper. */
  ariaLabel?: string;
};

export function RivePlayer({
  src,
  artboard,
  stateMachine,
  autoplay = true,
  riveInputs,
  onStateChange,
  riveRef,
  className,
  style,
  ariaLabel,
}: RivePlayerProps) {
  const { rive, RiveComponent } = useRive(
    {
      src,
      artboard,
      stateMachines: stateMachine ? [stateMachine] : undefined,
      autoplay,
      layout: new Layout({ fit: Fit.Contain, alignment: Alignment.Center }),
      onStateChange: onStateChange
        ? (event) => {
            const states = (event as { data?: string[] }).data;
            if (Array.isArray(states)) {
              for (const s of states) onStateChange(s);
            }
          }
        : undefined,
    },
    { shouldResizeCanvasToContainer: true }
  );

  // Forward rive instance to caller ref.
  if (riveRef !== undefined) {
    riveRef.current = rive ?? null;
  }

  // Apply SM inputs when rive is ready and inputs change.
  if (rive && riveInputs) {
    for (const [name, value] of Object.entries(riveInputs)) {
      try {
        const input = stateMachine
          ? rive.stateMachineInputs(stateMachine)?.find((i) => i.name === name)
          : undefined;
        if (!input) continue;
        input.value = value;
      } catch {
        // Input may not exist in this artboard; silently skip.
      }
    }
  }

  return (
    <div
      className={className}
      style={{ width: "100%", height: "100%", ...style }}
      role="img"
      aria-label={ariaLabel ?? "Rive animation"}
    >
      <RiveComponent style={{ width: "100%", height: "100%" }} />
    </div>
  );
}
