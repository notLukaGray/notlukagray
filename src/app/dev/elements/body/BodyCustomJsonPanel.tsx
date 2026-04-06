import { useMemo, useState } from "react";
import {
  createVariantDiff,
  parseVariantJson,
  stringifyJson,
  type CustomJsonMode,
} from "@/app/dev/elements/image/custom-json";
import { BASE_DEFAULTS } from "./constants";
import type { BodyVariantDefaults } from "./types";
import type { BodyElementDevController } from "./useBodyElementDevController";

export function BodyCustomJsonPanel({ controller }: { controller: BodyElementDevController }) {
  const [mode, setMode] = useState<CustomJsonMode>("patch");
  const [text, setText] = useState("");
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const baseVariant = BASE_DEFAULTS.variants[controller.activeVariant];
  const fullCurrentJson = useMemo(() => stringifyJson(controller.active), [controller.active]);
  const diffJson = useMemo(
    () => stringifyJson(createVariantDiff(baseVariant, controller.active)),
    [baseVariant, controller.active]
  );

  const loadCurrent = () => {
    setText(fullCurrentJson);
    setError(null);
    setMessage("Loaded current variant JSON.");
  };

  const formatJson = () => {
    const parsed = parseVariantJson(text);
    if (!parsed.value) {
      setError(parsed.error ?? "Invalid JSON.");
      setMessage(null);
      return;
    }
    setText(stringifyJson(parsed.value));
    setError(null);
    setMessage("Formatted JSON.");
  };

  const applyJson = () => {
    const parsed = parseVariantJson(text);
    if (!parsed.value) {
      setError(parsed.error ?? "Invalid JSON.");
      setMessage(null);
      return;
    }
    const next = controller.normalizeVariant(
      mode === "replace" ? BASE_DEFAULTS.variants[controller.activeVariant] : controller.active,
      parsed.value as Partial<BodyVariantDefaults>
    );
    if (mode === "replace") controller.setVariantExact(controller.activeVariant, next);
    else controller.setVariantPatch(controller.activeVariant, next);
    setError(null);
    setMessage(mode === "replace" ? "Applied JSON in replace mode." : "Applied JSON patch.");
  };

  return (
    <section className="space-y-3 rounded-lg border border-border bg-card/20 p-4">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <p className="font-mono text-[11px] uppercase tracking-wide text-muted-foreground">
          Custom JSON
        </p>
        <div className="inline-flex rounded border border-border/60 bg-background/60 p-0.5">
          {(["patch", "replace"] as const).map((item) => (
            <button
              key={item}
              type="button"
              onClick={() => setMode(item)}
              className={`rounded px-2 py-1 text-[10px] font-mono uppercase tracking-wide ${mode === item ? "bg-foreground/10 text-foreground" : "text-muted-foreground hover:text-foreground"}`}
            >
              {item}
            </button>
          ))}
        </div>
      </div>
      <p className="text-[10px] text-muted-foreground">
        Patch merges keys into this variant defaults object. Replace rebuilds from the neutral dev
        preset base, then applies your JSON.
      </p>
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        className="min-h-[14rem] w-full rounded border border-border bg-background p-3 font-mono text-[11px] text-foreground focus:outline-none focus:ring-1 focus:ring-ring"
        placeholder="Paste body variant JSON object here…"
      />
      <div className="flex flex-wrap gap-2">
        <button
          type="button"
          onClick={loadCurrent}
          className="rounded border border-border px-2 py-1 text-[10px] font-mono text-foreground hover:bg-muted"
        >
          Load Current
        </button>
        <button
          type="button"
          onClick={formatJson}
          className="rounded border border-border px-2 py-1 text-[10px] font-mono text-foreground hover:bg-muted"
        >
          Format
        </button>
        <button
          type="button"
          onClick={applyJson}
          className="rounded border border-border px-2 py-1 text-[10px] font-mono text-foreground hover:bg-muted"
        >
          Validate + Apply
        </button>
        <button
          type="button"
          onClick={() => void navigator.clipboard.writeText(fullCurrentJson)}
          className="rounded border border-border px-2 py-1 text-[10px] font-mono text-foreground hover:bg-muted"
        >
          Copy Full
        </button>
        <button
          type="button"
          onClick={() => void navigator.clipboard.writeText(diffJson)}
          className="rounded border border-border px-2 py-1 text-[10px] font-mono text-foreground hover:bg-muted"
        >
          Copy Diff
        </button>
      </div>
      {error ? <p className="text-[10px] text-rose-300">{error}</p> : null}
      {message ? <p className="text-[10px] text-muted-foreground">{message}</p> : null}
    </section>
  );
}
