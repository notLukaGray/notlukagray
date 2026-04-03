"use client";

import { DevWorkbenchNav } from "@/app/dev/_components/DevWorkbenchNav";
import { DevWorkbenchPageShell } from "@/app/dev/_components/DevWorkbenchPageShell";
import { ImageDevHeader } from "./ImageDevHeader";
import { ImagePreviewPanel } from "./ImagePreviewPanel";
import { ImageSettingsPanel } from "./ImageSettingsPanel";
import { ImageSidebar } from "./ImageSidebar";
import { ImageVariantPicker } from "./ImageVariantPicker";
import { useImageElementDevController } from "./useImageElementDevController";

export function ImageElementDevClient() {
  const controller = useImageElementDevController();
  return (
    <DevWorkbenchPageShell
      nav={
        <DevWorkbenchNav
          onResetSection={controller.resetImageDefaults}
          onTotalReset={controller.resetImageDefaults}
        />
      }
    >
      <ImageDevHeader />
      <div className="grid grid-cols-1 gap-8 md:grid-cols-[minmax(0,1fr)_minmax(17.5rem,26.25rem)] md:items-start">
        <div className="space-y-6">
          <ImageVariantPicker controller={controller} />
          <section className="rounded-lg border border-border bg-card/20 p-4">
            <ImagePreviewPanel controller={controller} />
          </section>
          <ImageSettingsPanel controller={controller} />
        </div>
        <ImageSidebar controller={controller} />
      </div>
    </DevWorkbenchPageShell>
  );
}
