import type { ButtonVariantDefaults } from "../types";
import type { ButtonElementDevController } from "../useButtonElementDevController";

const LEVELS = [1, 2, 3, 4, 5, 6] as const;

type OptionalStringKey =
  | "label"
  | "href"
  | "action"
  | "wrapperFill"
  | "wrapperStroke"
  | "wrapperPadding"
  | "wrapperBorderRadius";

function normalizeOptionalText(value: string): string | undefined {
  return value.trim().length > 0 ? value : undefined;
}

function fieldValue(value: string | undefined): string {
  return value ?? "";
}

export function ButtonContentControls({ controller }: { controller: ButtonElementDevController }) {
  const { active, activeVariant, setVariantPatch } = controller;
  const setOptionalField = (key: OptionalStringKey, value: string) => {
    setVariantPatch(activeVariant, { [key]: normalizeOptionalText(value) });
  };

  return (
    <>
      <div className="sm:col-span-2 rounded border border-border/60 bg-muted/20 px-3 py-2">
        <p className="font-mono text-[10px] uppercase tracking-wide text-muted-foreground">
          Content
        </p>
        <p className="mt-1 text-[10px] text-muted-foreground">
          Label, action/link behavior, and wrapper chrome fields for <code>elementButton</code>.
        </p>
      </div>

      <label className="space-y-1.5">
        <span className="font-mono text-[10px] uppercase tracking-wide text-muted-foreground">
          Label
        </span>
        <input
          type="text"
          className="w-full rounded border border-border bg-background px-3 py-2 font-mono text-[11px] text-foreground"
          value={fieldValue(active.label)}
          onChange={(e) => setOptionalField("label", e.target.value)}
        />
      </label>

      <label className="space-y-1.5">
        <span className="font-mono text-[10px] uppercase tracking-wide text-muted-foreground">
          Copy type
        </span>
        <select
          className="w-full rounded border border-border bg-background px-3 py-2 font-mono text-[11px] text-foreground"
          value={active.copyType ?? "body"}
          onChange={(e) =>
            setVariantPatch(activeVariant, {
              copyType: e.target.value as ButtonVariantDefaults["copyType"],
            })
          }
        >
          <option value="body">Body</option>
          <option value="heading">Heading</option>
        </select>
      </label>

      <label className="space-y-1.5">
        <span className="font-mono text-[10px] uppercase tracking-wide text-muted-foreground">
          Level
        </span>
        <select
          className="w-full rounded border border-border bg-background px-3 py-2 font-mono text-[11px] text-foreground"
          value={active.level ?? 4}
          onChange={(e) =>
            setVariantPatch(activeVariant, {
              level: Number(e.target.value) as 1 | 2 | 3 | 4 | 5 | 6,
            })
          }
        >
          {LEVELS.map((lv) => (
            <option key={lv} value={lv}>
              Level {lv}
            </option>
          ))}
        </select>
      </label>

      <label className="space-y-1.5">
        <span className="font-mono text-[10px] uppercase tracking-wide text-muted-foreground">
          Href
        </span>
        <input
          type="text"
          className="w-full rounded border border-border bg-background px-3 py-2 font-mono text-[11px] text-foreground"
          value={fieldValue(active.href)}
          onChange={(e) => setOptionalField("href", e.target.value)}
          placeholder="/work"
        />
      </label>

      <label className="space-y-1.5 sm:col-span-2">
        <span className="font-mono text-[10px] uppercase tracking-wide text-muted-foreground">
          Action
        </span>
        <input
          type="text"
          className="w-full rounded border border-border bg-background px-3 py-2 font-mono text-[11px] text-foreground"
          value={fieldValue(active.action)}
          onChange={(e) => setOptionalField("action", e.target.value)}
          placeholder="assetTogglePlay"
        />
      </label>

      <label className="inline-flex items-center gap-2 rounded border border-border/60 bg-background/60 px-3 py-2 text-[11px] text-foreground">
        <input
          type="checkbox"
          checked={active.external === true}
          onChange={(e) => setVariantPatch(activeVariant, { external: e.target.checked })}
        />
        External link
      </label>

      <label className="inline-flex items-center gap-2 rounded border border-border/60 bg-background/60 px-3 py-2 text-[11px] text-foreground">
        <input
          type="checkbox"
          checked={active.disabled === true}
          onChange={(e) => setVariantPatch(activeVariant, { disabled: e.target.checked })}
        />
        Disabled
      </label>

      <label className="inline-flex items-center gap-2 rounded border border-border/60 bg-background/60 px-3 py-2 text-[11px] text-foreground sm:col-span-2">
        <input
          type="checkbox"
          checked={active.wordWrap === true}
          onChange={(e) => setVariantPatch(activeVariant, { wordWrap: e.target.checked })}
        />
        Word wrap
      </label>

      <label className="space-y-1.5">
        <span className="font-mono text-[10px] uppercase tracking-wide text-muted-foreground">
          Wrapper fill
        </span>
        <input
          type="text"
          className="w-full rounded border border-border bg-background px-3 py-2 font-mono text-[11px] text-foreground"
          value={fieldValue(active.wrapperFill)}
          onChange={(e) => setOptionalField("wrapperFill", e.target.value)}
          placeholder="rgba(255,255,255,0.1)"
        />
      </label>

      <label className="space-y-1.5">
        <span className="font-mono text-[10px] uppercase tracking-wide text-muted-foreground">
          Wrapper stroke
        </span>
        <input
          type="text"
          className="w-full rounded border border-border bg-background px-3 py-2 font-mono text-[11px] text-foreground"
          value={fieldValue(active.wrapperStroke)}
          onChange={(e) => setOptionalField("wrapperStroke", e.target.value)}
          placeholder="var(--pb-border)"
        />
      </label>

      <label className="space-y-1.5">
        <span className="font-mono text-[10px] uppercase tracking-wide text-muted-foreground">
          Wrapper padding
        </span>
        <input
          type="text"
          className="w-full rounded border border-border bg-background px-3 py-2 font-mono text-[11px] text-foreground"
          value={fieldValue(active.wrapperPadding)}
          onChange={(e) => setOptionalField("wrapperPadding", e.target.value)}
          placeholder="0.5rem 1rem"
        />
      </label>

      <label className="space-y-1.5">
        <span className="font-mono text-[10px] uppercase tracking-wide text-muted-foreground">
          Wrapper radius
        </span>
        <input
          type="text"
          className="w-full rounded border border-border bg-background px-3 py-2 font-mono text-[11px] text-foreground"
          value={fieldValue(active.wrapperBorderRadius)}
          onChange={(e) => setOptionalField("wrapperBorderRadius", e.target.value)}
          placeholder="0.5rem"
        />
      </label>
    </>
  );
}
