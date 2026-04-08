"use client";

import { useMemo, useState } from "react";
import { DevWorkbenchNav } from "@/app/dev/_components/DevWorkbenchNav";
import { DevWorkbenchPageHeader } from "@/app/dev/_components/DevWorkbenchPageHeader";
import { DevWorkbenchPageShell } from "@/app/dev/_components/DevWorkbenchPageShell";

type TabId = "overview" | "colors" | "typography" | "components";

const TABS: { id: TabId; label: string }[] = [
  { id: "overview", label: "Overview" },
  { id: "colors", label: "Colors" },
  { id: "typography", label: "Typography" },
  { id: "components", label: "Components" },
];

export function DevTestClient() {
  const [activeTab, setActiveTab] = useState<TabId>("overview");

  const tabContent = useMemo(() => {
    if (activeTab === "overview") {
      return (
        <div className="space-y-3">
          <p className="text-sm text-muted-foreground">
            Front-facing defaults proving ground. As foundations, layout, and elements split out,
            each tab should reflect shipped defaults.
          </p>
          <ul className="list-disc pl-5 text-sm text-muted-foreground">
            <li>Foundations: color tokens, fonts, spacing baseline.</li>
            <li>Layout: pages, sections, and frame behavior.</li>
            <li>Elements: button variants, rich text, and image defaults.</li>
          </ul>
        </div>
      );
    }
    if (activeTab === "colors") {
      return (
        <div className="grid gap-3 sm:grid-cols-3">
          {[
            { label: "Primary", bg: "var(--primary)", fg: "var(--primary-foreground)" },
            { label: "Secondary", bg: "var(--secondary)", fg: "var(--secondary-foreground)" },
            { label: "Accent", bg: "var(--accent)", fg: "var(--accent-foreground)" },
          ].map((swatch) => (
            <div
              key={swatch.label}
              className="rounded border border-border p-4"
              style={{ background: swatch.bg, color: swatch.fg }}
            >
              <p className="font-mono text-xs">{swatch.label}</p>
              <p className="mt-2 text-sm">Token preview</p>
            </div>
          ))}
        </div>
      );
    }
    if (activeTab === "typography") {
      return (
        <div className="space-y-4">
          <p className="typography-heading-xl">Typography Heading XL</p>
          <p className="typography-heading-md">Typography Heading MD</p>
          <p className="typography-body-lg text-muted-foreground">
            Typography body sample to validate the current type scale and weight mappings.
          </p>
          <p className="typography-body-sm text-muted-foreground">
            Keep this tab synced with `/dev/fonts` decisions.
          </p>
        </div>
      );
    }
    return (
      <div className="space-y-4">
        <div className="flex flex-wrap gap-3">
          <button
            type="button"
            className="inline-flex items-center justify-center rounded border border-border bg-primary px-4 py-2 text-sm text-primary-foreground"
          >
            Button Default
          </button>
          <button
            type="button"
            className="inline-flex items-center justify-center rounded border border-border bg-accent px-4 py-2 text-sm text-accent-foreground"
          >
            Button Accent
          </button>
          <button
            type="button"
            className="inline-flex items-center justify-center rounded border border-border bg-transparent px-4 py-2 text-sm"
          >
            Button Ghost
          </button>
        </div>
        <div className="rounded border border-border p-4">
          <p className="font-mono text-xs text-muted-foreground">Rich text sample</p>
          <p className="mt-2 text-sm">Paragraph one.</p>
          <p className="mt-2 text-sm">Paragraph two with spacing to inspect rhythm defaults.</p>
        </div>
      </div>
    );
  }, [activeTab]);

  return (
    <DevWorkbenchPageShell
      nav={
        <DevWorkbenchNav
          onResetSection={() => setActiveTab("overview")}
          onTotalReset={() => setActiveTab("overview")}
        />
      }
    >
      <DevWorkbenchPageHeader
        eyebrow="Dev · Preview"
        title="Defaults test page"
        description="Tabbed surface to validate how defaults feel in practice. This will expand as layout and element editors grow."
      />

      <section className="rounded-lg border border-border bg-card/20 p-4">
        <div className="mb-4 flex flex-wrap gap-2">
          {TABS.map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveTab(tab.id)}
              className={`rounded border px-3 py-1.5 text-[11px] font-mono transition-colors ${
                activeTab === tab.id
                  ? "border-foreground/40 bg-foreground/10 text-foreground"
                  : "border-border text-muted-foreground hover:bg-muted/60 hover:text-foreground"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
        {tabContent}
      </section>
    </DevWorkbenchPageShell>
  );
}
