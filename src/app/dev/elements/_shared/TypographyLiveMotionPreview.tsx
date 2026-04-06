"use client";

import { useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import { useDevPreviewFontVars } from "./useDevPreviewFontVars";
import { parseLooseValue } from "@/app/dev/elements/image/runtime-draft";
import type { ImageRuntimeDraft } from "@/app/dev/elements/image/types";
import {
  getVariable,
  setVariable,
  useVariableStore,
} from "@/page-builder/core/page-builder-variable-store";
import type { JsonValue } from "@/page-builder/core/page-builder-types/json-value";
import type {
  ElementBlock,
  MotionPropsFromJson,
  MotionTiming,
} from "@/page-builder/core/page-builder-schemas";
import { ElementExitWrapper } from "@/page-builder/integrations/framer-motion";
import { ElementRenderer } from "@/page-builder/elements/Shared/ElementRenderer";
import { blockNeedsExitPresence } from "@/app/dev/elements/_shared/block-needs-exit-presence";
import { buildPreviewMotion } from "@/app/dev/elements/image/preview-motion";
import type { PbImageAnimationDefaults } from "@/app/theme/pb-builder-defaults";

type Props = {
  previewVisible: boolean;
  previewKey: number;
  autoLoop: boolean;
  setAutoLoop: (next: boolean) => void;
  animateInPreview: () => void;
  animateOutPreview: () => void;
  showPreview: () => void;
  variantLabel: string;
  hiddenByVisibleWhen: boolean;
  runtimeDraft: ImageRuntimeDraft;
  previewBlock: ElementBlock;
  onPreviewExitComplete: () => void;
  /** Variant animation defaults (dev-only on workbench); used when the block has no exit preset / exit motion. */
  animationSource: PbImageAnimationDefaults;
};

export function TypographyLiveMotionPreview({
  previewVisible,
  previewKey,
  autoLoop,
  setAutoLoop,
  animateInPreview,
  animateOutPreview,
  showPreview,
  variantLabel,
  hiddenByVisibleWhen,
  runtimeDraft,
  previewBlock,
  onPreviewExitComplete,
  animationSource,
}: Props) {
  const slotRef = useRef<HTMLDivElement>(null);
  const [reservedMinHeight, setReservedMinHeight] = useState<number | undefined>(undefined);
  const fontVars = useDevPreviewFontVars();

  useLayoutEffect(() => {
    const el = slotRef.current;
    if (!el) return;
    const update = () => {
      if (!previewVisible) return;
      const h = el.getBoundingClientRect().height;
      if (h > 0) setReservedMinHeight(Math.ceil(h));
    };
    update();
    const ro = new ResizeObserver(update);
    ro.observe(el);
    return () => ro.disconnect();
  }, [previewVisible, previewKey, previewBlock]);

  useEffect(() => {
    const key = runtimeDraft.visibleWhenVariable.trim();
    if (!runtimeDraft.visibleWhenEnabled || !key) return;
    const previous = getVariable(key);
    const next = parseLooseValue(runtimeDraft.visibleWhenPreviewValue) as JsonValue;
    setVariable(key, next);
    return () => {
      if (previous !== undefined) {
        setVariable(key, previous);
      } else {
        useVariableStore.setState((s) => {
          const vars = { ...s.variables };
          delete vars[key];
          return { variables: vars };
        });
      }
    };
  }, [
    runtimeDraft.visibleWhenEnabled,
    runtimeDraft.visibleWhenVariable,
    runtimeDraft.visibleWhenPreviewValue,
  ]);

  const ext = previewBlock as ElementBlock & {
    motion?: MotionPropsFromJson;
    motionTiming?: MotionTiming;
    exitPreset?: string;
  };

  const rendererRemountKey = useMemo(() => {
    return JSON.stringify([ext.motionTiming, ext.motion, ext.exitPreset]);
  }, [ext.motion, ext.motionTiming, ext.exitPreset]);

  const needsExitPresence = blockNeedsExitPresence(previewBlock);
  const fallbackPreviewMotion = useMemo(
    () => buildPreviewMotion(animationSource),
    [animationSource]
  );

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
        className={`min-h-[8rem] rounded-md border border-border/80 bg-muted/20 p-6 ${hiddenByVisibleWhen ? "opacity-[0.35]" : ""}`}
      >
        <div
          ref={slotRef}
          className="w-full"
          style={{
            ...(reservedMinHeight != null ? { minHeight: `${reservedMinHeight}px` } : undefined),
            ...fontVars,
          }}
        >
          {needsExitPresence ? (
            <ElementRenderer
              key={`${previewKey}-${rendererRemountKey}`}
              block={previewBlock}
              exitPresenceShow={previewVisible}
              exitPresenceKey={`typography-preview-${previewKey}`}
              exitPresenceMode="wait"
              onExitComplete={onPreviewExitComplete}
              forceEntranceAnimation
            />
          ) : (
            <ElementExitWrapper
              show={previewVisible}
              motion={fallbackPreviewMotion}
              motionTiming={ext.motionTiming}
              exitKey={`typography-preview-fallback-${previewKey}`}
              presenceMode="wait"
              onExitComplete={onPreviewExitComplete}
              className="block w-full"
            >
              <ElementRenderer
                key={`${previewKey}-${rendererRemountKey}`}
                block={previewBlock}
                forceEntranceAnimation
              />
            </ElementExitWrapper>
          )}
        </div>
        <p className="mt-3 text-[10px] text-muted-foreground">
          Variant: {variantLabel} · Renders through{" "}
          <code className="font-mono">ElementRenderer</code> with merged runtime fields (
          <code className="font-mono">motionTiming</code>, <code className="font-mono">motion</code>
          , <code className="font-mono">visibleWhen</code>, <code className="font-mono">aria</code>,{" "}
          <code className="font-mono">wrapperStyle</code>
          ).
        </p>
      </div>
    </div>
  );
}
