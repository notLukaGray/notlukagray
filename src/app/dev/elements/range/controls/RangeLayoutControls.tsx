import { SharedFoundationLayoutFields } from "@/app/dev/elements/_shared/dev-controls";
import type { RangeVariantDefaults } from "../types";
import type { RangeElementDevController } from "../useRangeElementDevController";

// eslint-disable-next-line complexity
export function RangeLayoutControls({ controller }: { controller: RangeElementDevController }) {
  const { active, activeVariant, setVariantPatch } = controller;

  const patchStyle = (field: keyof NonNullable<RangeVariantDefaults["style"]>, value: string) => {
    const next = { ...(active.style ?? {}) } as Record<string, string | number>;
    if (value.trim().length === 0) {
      delete next[field];
    } else {
      next[field] = value;
    }
    setVariantPatch(activeVariant, {
      style: Object.keys(next).length > 0 ? (next as RangeVariantDefaults["style"]) : undefined,
    });
  };

  return (
    <>
      <div className="sm:col-span-2 rounded border border-border/60 bg-muted/20 px-3 py-2">
        <p className="font-mono text-[10px] uppercase tracking-wide text-muted-foreground">
          Layout
        </p>
        <p className="mt-1 text-[10px] text-muted-foreground">
          Range style sub-fields and foundation layout controls.
        </p>
      </div>

      {/* Style sub-fields */}
      <div className="space-y-2">
        <label className="block font-mono text-[10px] uppercase tracking-wide text-muted-foreground">
          Track Color (CSS)
        </label>
        <input
          type="text"
          value={active.style?.trackColor ?? ""}
          onChange={(e) => patchStyle("trackColor", e.target.value)}
          className="w-full rounded border border-border bg-background px-2 py-1.5 font-mono text-[11px] text-foreground focus:outline-none focus:ring-1 focus:ring-ring"
          placeholder="rgba(255,255,255,0.2)"
        />
      </div>

      <div className="space-y-2">
        <label className="block font-mono text-[10px] uppercase tracking-wide text-muted-foreground">
          Fill Color (CSS)
        </label>
        <input
          type="text"
          value={active.style?.fillColor ?? ""}
          onChange={(e) => patchStyle("fillColor", e.target.value)}
          className="w-full rounded border border-border bg-background px-2 py-1.5 font-mono text-[11px] text-foreground focus:outline-none focus:ring-1 focus:ring-ring"
          placeholder="rgba(255,255,255,0.9)"
        />
      </div>

      <div className="space-y-2">
        <label className="block font-mono text-[10px] uppercase tracking-wide text-muted-foreground">
          Track Height
        </label>
        <input
          type="text"
          value={active.style?.trackHeight ?? ""}
          onChange={(e) => patchStyle("trackHeight", e.target.value)}
          className="w-full rounded border border-border bg-background px-2 py-1.5 font-mono text-[11px] text-foreground focus:outline-none focus:ring-1 focus:ring-ring"
          placeholder="4px"
        />
      </div>

      <div className="space-y-2">
        <label className="block font-mono text-[10px] uppercase tracking-wide text-muted-foreground">
          Thumb Size
        </label>
        <input
          type="text"
          value={active.style?.thumbSize ?? ""}
          onChange={(e) => patchStyle("thumbSize", e.target.value)}
          className="w-full rounded border border-border bg-background px-2 py-1.5 font-mono text-[11px] text-foreground focus:outline-none focus:ring-1 focus:ring-ring"
          placeholder="14px"
        />
      </div>

      <div className="space-y-2">
        <label className="block font-mono text-[10px] uppercase tracking-wide text-muted-foreground">
          Border Radius
        </label>
        <input
          type="text"
          value={active.style?.borderRadius ?? ""}
          onChange={(e) => patchStyle("borderRadius", e.target.value)}
          className="w-full rounded border border-border bg-background px-2 py-1.5 font-mono text-[11px] text-foreground focus:outline-none focus:ring-1 focus:ring-ring"
          placeholder="9999px"
        />
      </div>

      <SharedFoundationLayoutFields<RangeVariantDefaults>
        variant={active}
        onPatch={(patch) => setVariantPatch(activeVariant, patch)}
      />
    </>
  );
}
