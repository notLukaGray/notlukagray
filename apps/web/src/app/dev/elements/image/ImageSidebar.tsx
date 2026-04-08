import { IMAGE_VARIABLES_NOT_SUPPORTED_YET } from "./constants";
import { ImageCustomJsonPanel } from "./ImageCustomJsonPanel";
import type { ImageElementDevController } from "./useImageElementDevController";

export function ImageSidebar({ controller }: { controller: ImageElementDevController }) {
  return (
    <div className="space-y-6 md:sticky md:top-8">
      {controller.isCustomVariant ? (
        <ImageCustomJsonPanel controller={controller} />
      ) : (
        <HandoffSnippetPanel controller={controller} />
      )}
      <div className="space-y-3 rounded-lg border border-border bg-card/20 p-4">
        <p className="font-mono text-[11px] uppercase tracking-wide text-muted-foreground">
          Variable Coverage
        </p>
        <p className="text-[10px] text-muted-foreground">
          This list is intentionally strict: only hard runtime gaps that are not yet available from
          this tool.
        </p>
        <CoverageList
          title="Hard stops (not supported yet)"
          values={IMAGE_VARIABLES_NOT_SUPPORTED_YET}
        />
      </div>
    </div>
  );
}

function HandoffSnippetPanel({ controller }: { controller: ImageElementDevController }) {
  return (
    <div className="space-y-3 rounded-lg border border-border bg-card/20 p-4">
      <p className="font-mono text-[11px] uppercase tracking-wide text-muted-foreground">
        Handoff snippet
      </p>
      <p className="text-[10px] leading-snug text-muted-foreground">
        Share this JSON with engineering to wire these image variants into runtime defaults.
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
        <p className="text-[10px] text-muted-foreground">Loading saved image defaults...</p>
      ) : null}
    </div>
  );
}

function CoverageList({ title, values }: { title: string; values: readonly string[] }) {
  return (
    <div>
      <p className="mb-1 font-mono text-[10px] uppercase tracking-wide text-muted-foreground">
        {title}
      </p>
      <ul className="space-y-1 text-[11px] text-foreground">
        {values.map((entry) => (
          <li key={entry}>- {entry}</li>
        ))}
      </ul>
    </div>
  );
}
