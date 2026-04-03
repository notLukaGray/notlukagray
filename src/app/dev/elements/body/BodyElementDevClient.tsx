"use client";

import { DevWorkbenchNav } from "@/app/dev/_components/DevWorkbenchNav";
import { DevWorkbenchPageShell } from "@/app/dev/_components/DevWorkbenchPageShell";
import { BodyDevHeader } from "./BodyDevHeader";
import { BodyPreviewPanel } from "./BodyPreviewPanel";
import { BodySettingsPanel } from "./BodySettingsPanel";
import { BodySidebar } from "./BodySidebar";
import { BodyVariantPicker } from "./BodyVariantPicker";
import { useBodyElementDevController } from "./useBodyElementDevController";

export function BodyElementDevClient() {
  const controller = useBodyElementDevController();
  return (
    <DevWorkbenchPageShell
      nav={
        <DevWorkbenchNav
          onResetSection={controller.resetBodyDefaults}
          onTotalReset={controller.resetBodyDefaults}
        />
      }
    >
      <BodyDevHeader />
      <div className="grid grid-cols-1 gap-8 md:grid-cols-[minmax(0,1fr)_minmax(17.5rem,26.25rem)] md:items-start">
        <div className="space-y-6">
          <BodyVariantPicker controller={controller} />
          <section className="rounded-lg border border-border bg-card/20 p-4">
            <BodyPreviewPanel controller={controller} />
          </section>
          <BodySettingsPanel controller={controller} />
        </div>
        <BodySidebar controller={controller} />
      </div>
    </DevWorkbenchPageShell>
  );
}
