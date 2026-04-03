"use client";

import { DevWorkbenchNav } from "@/app/dev/_components/DevWorkbenchNav";
import { DevWorkbenchPageShell } from "@/app/dev/_components/DevWorkbenchPageShell";
import { LinkDevHeader } from "./LinkDevHeader";
import { LinkPreviewPanel } from "./LinkPreviewPanel";
import { LinkSettingsPanel } from "./LinkSettingsPanel";
import { LinkSidebar } from "./LinkSidebar";
import { LinkVariantPicker } from "./LinkVariantPicker";
import { useLinkElementDevController } from "./useLinkElementDevController";

export function LinkElementDevClient() {
  const controller = useLinkElementDevController();
  return (
    <DevWorkbenchPageShell
      nav={
        <DevWorkbenchNav
          onResetSection={controller.resetLinkDefaults}
          onTotalReset={controller.resetLinkDefaults}
        />
      }
    >
      <LinkDevHeader />
      <div className="grid grid-cols-1 gap-8 md:grid-cols-[minmax(0,1fr)_minmax(17.5rem,26.25rem)] md:items-start">
        <div className="space-y-6">
          <LinkVariantPicker controller={controller} />
          <section className="rounded-lg border border-border bg-card/20 p-4">
            <LinkPreviewPanel controller={controller} />
          </section>
          <LinkSettingsPanel controller={controller} />
        </div>
        <LinkSidebar controller={controller} />
      </div>
    </DevWorkbenchPageShell>
  );
}
