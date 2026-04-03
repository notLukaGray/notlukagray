import { SharedFontSlotField } from "@/app/dev/elements/_shared/dev-controls";
import type { LinkVariantDefaults } from "../types";
import type { LinkElementDevController } from "../useLinkElementDevController";

const LEVELS = [1, 2, 3, 4, 5, 6] as const;

function levelToSelectValue(level: LinkVariantDefaults["level"]): string {
  if (level === undefined || level === null) return "";
  if (Array.isArray(level)) return String(level[1]);
  return String(level);
}

export function LinkContentControls({ controller }: { controller: LinkElementDevController }) {
  const { active, activeVariant, setVariantPatch } = controller;
  const needsHeadingLevel = active.copyType === "heading";

  return (
    <>
      <div className="sm:col-span-2 rounded border border-border/60 bg-muted/20 px-3 py-2">
        <p className="font-mono text-[10px] uppercase tracking-wide text-muted-foreground">
          Content
        </p>
        <p className="mt-1 text-[10px] text-muted-foreground">
          Label, href, copy semantics, typography level, word wrap, and link colors. Maps to
          `elementLink` content fields.
        </p>
      </div>

      <label className="space-y-1.5">
        <span className="font-mono text-[10px] uppercase tracking-wide text-muted-foreground">
          Label
        </span>
        <input
          type="text"
          className="w-full rounded border border-border bg-background px-3 py-2 font-mono text-[11px] text-foreground"
          value={active.label}
          onChange={(e) => setVariantPatch(activeVariant, { label: e.target.value })}
        />
      </label>

      <label className="space-y-1.5">
        <span className="font-mono text-[10px] uppercase tracking-wide text-muted-foreground">
          Href
        </span>
        <input
          type="text"
          className="w-full rounded border border-border bg-background px-3 py-2 font-mono text-[11px] text-foreground"
          value={active.href}
          onChange={(e) => setVariantPatch(activeVariant, { href: e.target.value })}
        />
      </label>

      <label className="inline-flex items-center gap-2 rounded border border-border/60 bg-background/60 px-3 py-2 text-[11px] text-foreground">
        <input
          type="checkbox"
          checked={!!active.external}
          onChange={(e) => setVariantPatch(activeVariant, { external: e.target.checked })}
        />
        External link
      </label>

      <label className="inline-flex items-center gap-2 rounded border border-border/60 bg-background/60 px-3 py-2 text-[11px] text-foreground">
        <input
          type="checkbox"
          checked={!!active.disabled}
          onChange={(e) => setVariantPatch(activeVariant, { disabled: e.target.checked })}
        />
        Disabled
      </label>

      <label className="space-y-1.5">
        <span className="font-mono text-[10px] uppercase tracking-wide text-muted-foreground">
          Copy type
        </span>
        <select
          className="w-full rounded border border-border bg-background px-3 py-2 font-mono text-[11px] text-foreground"
          value={active.copyType}
          onChange={(e) => {
            const copyType = e.target.value as "heading" | "body";
            setVariantPatch(activeVariant, {
              copyType,
              level:
                copyType === "heading" && (active.level === undefined || active.level === null)
                  ? 3
                  : active.level,
            });
          }}
        >
          <option value="body">Body typography</option>
          <option value="heading">Heading typography</option>
        </select>
      </label>

      <label className="space-y-1.5">
        <span className="font-mono text-[10px] uppercase tracking-wide text-muted-foreground">
          Level {needsHeadingLevel ? "(required for heading)" : "(optional)"}
        </span>
        <select
          className="w-full rounded border border-border bg-background px-3 py-2 font-mono text-[11px] text-foreground"
          value={
            needsHeadingLevel
              ? levelToSelectValue(active.level) || "3"
              : levelToSelectValue(active.level)
          }
          onChange={(e) => {
            const v = e.target.value;
            setVariantPatch(activeVariant, {
              level: v === "" ? undefined : (Number(v) as LinkVariantDefaults["level"]),
            });
          }}
        >
          {!needsHeadingLevel ? <option value="">Unset</option> : null}
          {LEVELS.map((lv) => (
            <option key={lv} value={lv}>
              Level {lv}
            </option>
          ))}
        </select>
      </label>

      <SharedFontSlotField
        idSuffix={`link-${activeVariant}`}
        value={active.fontFamily}
        onChange={(next) => setVariantPatch(activeVariant, { fontFamily: next })}
      />

      <label className="inline-flex items-center gap-2 rounded border border-border/60 bg-background/60 px-3 py-2 text-[11px] text-foreground sm:col-span-2">
        <input
          type="checkbox"
          checked={active.wordWrap !== false}
          onChange={(e) => setVariantPatch(activeVariant, { wordWrap: e.target.checked })}
        />
        Word wrap
      </label>

      <div className="sm:col-span-2 rounded border border-border/60 bg-muted/20 px-3 py-2">
        <p className="font-mono text-[10px] uppercase tracking-wide text-muted-foreground">
          Link colors (CSS values)
        </p>
      </div>
      <label className="space-y-1.5">
        <span className="font-mono text-[10px] uppercase tracking-wide text-muted-foreground">
          Default
        </span>
        <input
          type="text"
          className="w-full rounded border border-border bg-background px-3 py-2 font-mono text-[11px] text-foreground"
          value={active.linkDefault ?? ""}
          onChange={(e) =>
            setVariantPatch(activeVariant, { linkDefault: e.target.value || undefined })
          }
        />
      </label>
      <label className="space-y-1.5">
        <span className="font-mono text-[10px] uppercase tracking-wide text-muted-foreground">
          Hover
        </span>
        <input
          type="text"
          className="w-full rounded border border-border bg-background px-3 py-2 font-mono text-[11px] text-foreground"
          value={active.linkHover ?? ""}
          onChange={(e) =>
            setVariantPatch(activeVariant, { linkHover: e.target.value || undefined })
          }
        />
      </label>
      <label className="space-y-1.5">
        <span className="font-mono text-[10px] uppercase tracking-wide text-muted-foreground">
          Active
        </span>
        <input
          type="text"
          className="w-full rounded border border-border bg-background px-3 py-2 font-mono text-[11px] text-foreground"
          value={active.linkActive ?? ""}
          onChange={(e) =>
            setVariantPatch(activeVariant, { linkActive: e.target.value || undefined })
          }
        />
      </label>
      <label className="space-y-1.5">
        <span className="font-mono text-[10px] uppercase tracking-wide text-muted-foreground">
          Disabled
        </span>
        <input
          type="text"
          className="w-full rounded border border-border bg-background px-3 py-2 font-mono text-[11px] text-foreground"
          value={active.linkDisabled ?? ""}
          onChange={(e) =>
            setVariantPatch(activeVariant, { linkDisabled: e.target.value || undefined })
          }
        />
      </label>
      <label className="space-y-1.5 sm:col-span-2">
        <span className="font-mono text-[10px] uppercase tracking-wide text-muted-foreground">
          Transition
        </span>
        <input
          type="text"
          className="w-full rounded border border-border bg-background px-3 py-2 font-mono text-[11px] text-foreground"
          value={active.linkTransition === undefined ? "" : String(active.linkTransition)}
          onChange={(e) =>
            setVariantPatch(activeVariant, { linkTransition: e.target.value || undefined })
          }
          placeholder="e.g. 150ms or 0.2s"
        />
      </label>
    </>
  );
}
