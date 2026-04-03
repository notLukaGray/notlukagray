"use client";

import type { CSSProperties, ReactNode } from "react";
import { ElementExitWrapper } from "@/page-builder/integrations/framer-motion";
import type { MotionPropsFromJson, MotionTiming } from "@/page-builder/core/page-builder-schemas";

type Props = {
  previewVisible: boolean;
  previewKey: number;
  previewMotion: MotionPropsFromJson;
  motionTiming?: MotionTiming;
  exitPreset?: string;
  autoLoop: boolean;
  setAutoLoop: (next: boolean) => void;
  animateInPreview: () => void;
  animateOutPreview: () => void;
  showPreview: () => void;
  variantLabel: string;
  hiddenByVisibleWhen: boolean;
  /** Merged onto the preview content frame (e.g. runtime link cursor). */
  frameStyle?: CSSProperties;
  children: ReactNode;
};

export function TypographyLiveMotionPreview({
  previewVisible,
  previewKey,
  previewMotion,
  motionTiming,
  exitPreset,
  autoLoop,
  setAutoLoop,
  animateInPreview,
  animateOutPreview,
  showPreview,
  variantLabel,
  hiddenByVisibleWhen,
  frameStyle,
  children,
}: Props) {
  return (
    <div className="space-y-3">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <p className="font-mono text-[11px] uppercase tracking-wide text-muted-foreground">
          Preview
        </p>
        <div className="flex flex-wrap items-center gap-2">
          <button
            type="button"
            onClick={animateInPreview}
            className="rounded border border-border px-2 py-1 text-[10px] font-mono text-foreground hover:bg-muted"
          >
            Animate in
          </button>
          <button
            type="button"
            onClick={animateOutPreview}
            className="rounded border border-border px-2 py-1 text-[10px] font-mono text-foreground hover:bg-muted"
          >
            Animate out
          </button>
          <button
            type="button"
            onClick={showPreview}
            className="rounded border border-border px-2 py-1 text-[10px] font-mono text-foreground hover:bg-muted"
          >
            Show
          </button>
          <label className="inline-flex items-center gap-2 border-l border-border/60 pl-3 text-[11px] text-muted-foreground">
            <input
              type="checkbox"
              checked={autoLoop}
              onChange={(e) => setAutoLoop(e.target.checked)}
            />
            Auto loop
          </label>
        </div>
      </div>

      <div
        className="min-h-[8rem] rounded-md border border-border/80 bg-muted/20 p-6"
        style={{
          ...frameStyle,
          opacity: hiddenByVisibleWhen ? 0.35 : frameStyle?.opacity,
        }}
      >
        <ElementExitWrapper
          show={previewVisible}
          motion={previewMotion}
          motionTiming={motionTiming}
          exitPreset={exitPreset}
          exitKey={`typography-preview-${previewKey}`}
          className="block w-full"
        >
          {children}
        </ElementExitWrapper>
        <p className="mt-3 text-[10px] text-muted-foreground">
          Variant: {variantLabel} · <code className="font-mono">motion</code>,{" "}
          <code className="font-mono">motionTiming</code>, runtime motion JSON when set.
        </p>
      </div>
    </div>
  );
}
