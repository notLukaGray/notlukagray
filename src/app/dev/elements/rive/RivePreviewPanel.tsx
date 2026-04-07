"use client";

import { VARIANT_LABELS } from "./constants";
import type { RiveElementDevController } from "./useRiveElementDevController";

export function RivePreviewPanel({ controller }: { controller: RiveElementDevController }) {
  const variantLabel = controller.isCustomVariant
    ? "Create Custom"
    : VARIANT_LABELS[controller.activeVariant];

  return (
    <div className="space-y-3">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <p className="font-mono text-[11px] uppercase tracking-wide text-muted-foreground">
          Preview
        </p>
        <span className="font-mono text-[10px] text-muted-foreground">{variantLabel}</span>
      </div>
      <div className="min-h-[10rem] rounded-md border border-dashed border-border/80 bg-muted/10 p-6 flex flex-col items-center justify-center gap-3">
        <p className="font-mono text-[11px] text-muted-foreground text-center">
          Live preview requires an asset reference.
        </p>
        <p className="text-[10px] text-muted-foreground/70 text-center max-w-[22rem]">
          elementRive renders from page JSON with a real{" "}
          <code className="font-mono text-[10px]">.riv</code> file key. Use Custom JSON to paste
          your element block, or copy the handoff snippet for engineering.
        </p>
        <div className="mt-2 rounded border border-border/50 bg-background/60 px-3 py-2 font-mono text-[10px] text-muted-foreground">
          type: &quot;elementRive&quot;
        </div>
      </div>
    </div>
  );
}
