"use client";

import type { ReactNode } from "react";
import { DevWorkbenchNav } from "@/app/dev/_components/DevWorkbenchNav";
import { DevWorkbenchPageShell } from "@/app/dev/_components/DevWorkbenchPageShell";

type Props = {
  header: ReactNode;
  variantPicker: ReactNode;
  preview: ReactNode;
  settings: ReactNode;
  sidebar: ReactNode;
  onReset?: () => void;
};

export function ElementDevWorkspace({
  header,
  variantPicker,
  preview,
  settings,
  sidebar,
  onReset,
}: Props) {
  return (
    <DevWorkbenchPageShell
      nav={<DevWorkbenchNav onResetSection={onReset} onTotalReset={onReset} />}
    >
      {header}
      <div className="grid grid-cols-1 gap-8 md:grid-cols-[minmax(0,1fr)_minmax(17.5rem,26.25rem)] md:items-start">
        <div className="space-y-6">
          {variantPicker}
          <section className="rounded-lg border border-border bg-card/20 p-4">{preview}</section>
          {settings}
        </div>
        {sidebar}
      </div>
    </DevWorkbenchPageShell>
  );
}
