"use client";

import { DevWorkbenchNav } from "@/app/dev/_components/DevWorkbenchNav";
import { DevWorkbenchPageShell } from "@/app/dev/_components/DevWorkbenchPageShell";
import { HeadingDevHeader } from "./HeadingDevHeader";
import { HeadingPreviewPanel } from "./HeadingPreviewPanel";
import { HeadingSettingsPanel } from "./HeadingSettingsPanel";
import { HeadingSidebar } from "./HeadingSidebar";
import { HeadingVariantPicker } from "./HeadingVariantPicker";
import { useHeadingElementDevController } from "./useHeadingElementDevController";

export function HeadingElementDevClient() {
  const controller = useHeadingElementDevController();
  return (
    <DevWorkbenchPageShell
      nav={
        <DevWorkbenchNav
          onResetSection={controller.resetHeadingDefaults}
          onTotalReset={controller.resetHeadingDefaults}
        />
      }
    >
      <HeadingDevHeader />
      <div className="grid grid-cols-1 gap-8 md:grid-cols-[minmax(0,1fr)_minmax(17.5rem,26.25rem)] md:items-start">
        <div className="space-y-6">
          <HeadingVariantPicker controller={controller} />
          <section className="rounded-lg border border-border bg-card/20 p-4">
            <HeadingPreviewPanel controller={controller} />
          </section>
          <HeadingSettingsPanel controller={controller} />
        </div>
        <HeadingSidebar controller={controller} />
      </div>
    </DevWorkbenchPageShell>
  );
}
