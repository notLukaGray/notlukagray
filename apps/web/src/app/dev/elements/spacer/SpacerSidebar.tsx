import { SpacerCustomJsonPanel } from "./SpacerCustomJsonPanel";
import type { SpacerElementDevController } from "./useSpacerElementDevController";

export function SpacerSidebar({ controller }: { controller: SpacerElementDevController }) {
  return (
    <div className="space-y-6 md:sticky md:top-8">
      {controller.isCustomVariant ? (
        <SpacerCustomJsonPanel controller={controller} />
      ) : (
        <HandoffSnippetPanel controller={controller} />
      )}
    </div>
  );
}

function HandoffSnippetPanel({ controller }: { controller: SpacerElementDevController }) {
  return (
    <div className="space-y-3 rounded-lg border border-border bg-card/20 p-4">
      <p className="font-mono text-[11px] uppercase tracking-wide text-muted-foreground">
        Handoff snippet
      </p>
      <p className="text-[10px] leading-snug text-muted-foreground">
        Share this JSON with engineering to wire these spacer variants into runtime defaults.
      </p>
      <pre className="max-h-96 overflow-x-auto overflow-y-auto whitespace-pre-wrap rounded bg-muted/40 p-3 font-mono text-[11px] leading-relaxed text-foreground">
        {controller.exportJson}
      </pre>
      <button
        type="button"
        onClick={() => void controller.copyExport()}
        className="w-full rounded border border-border px-3 py-2 text-sm font-mono text-foreground transition-colors hover:bg-muted"
      >
        {controller.copied ? "Copied!" : "Copy JSON"}
      </button>
      {!controller.hydrated ? (
        <p className="text-[10px] text-muted-foreground">Loading saved spacer defaults…</p>
      ) : null}
    </div>
  );
}
