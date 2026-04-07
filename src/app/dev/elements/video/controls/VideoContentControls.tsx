import { VIDEO_MODULE_PRESET_OPTIONS } from "../constants";
import type { VideoElementDevController } from "../useVideoElementDevController";

function linkRef(link: { ref?: string } | undefined): string {
  return typeof link?.ref === "string" ? link.ref : "";
}

function resolveModuleSelectValue(moduleKey: string | undefined): string {
  if (!moduleKey) return "";
  const isPreset = VIDEO_MODULE_PRESET_OPTIONS.some((option) => option.key === moduleKey);
  return isPreset ? moduleKey : "__custom__";
}

export function VideoContentControls({ controller }: { controller: VideoElementDevController }) {
  const { active, activeVariant, setVariantPatch } = controller;

  return (
    <>
      <div className="sm:col-span-2 rounded border border-border/60 bg-muted/20 px-3 py-2">
        <p className="font-mono text-[10px] uppercase tracking-wide text-muted-foreground">
          Content
        </p>
        <p className="mt-1 text-[10px] text-muted-foreground">
          Source, poster, accessibility, and optional link/module wiring. Maps to{" "}
          <code>elementVideo</code> content fields.
        </p>
      </div>

      <label className="space-y-1.5">
        <span className="font-mono text-[10px] uppercase tracking-wide text-muted-foreground">
          Video source
        </span>
        <input
          type="text"
          className="w-full rounded border border-border bg-background px-3 py-2 font-mono text-[11px] text-foreground"
          value={active.src ?? ""}
          onChange={(e) => setVariantPatch(activeVariant, { src: e.target.value || undefined })}
          placeholder="Bunny asset key or URL"
        />
      </label>

      <label className="space-y-1.5">
        <span className="font-mono text-[10px] uppercase tracking-wide text-muted-foreground">
          Poster
        </span>
        <input
          type="text"
          className="w-full rounded border border-border bg-background px-3 py-2 font-mono text-[11px] text-foreground"
          value={active.poster ?? ""}
          onChange={(e) => setVariantPatch(activeVariant, { poster: e.target.value || undefined })}
          placeholder="Poster URL (optional in dev preview)"
        />
      </label>

      <label className="space-y-1.5 sm:col-span-2">
        <span className="font-mono text-[10px] uppercase tracking-wide text-muted-foreground">
          Aria label
        </span>
        <input
          type="text"
          className="w-full rounded border border-border bg-background px-3 py-2 font-mono text-[11px] text-foreground"
          value={active.ariaLabel ?? ""}
          onChange={(e) =>
            setVariantPatch(activeVariant, { ariaLabel: e.target.value || undefined })
          }
          placeholder="Video"
        />
      </label>

      <label className="space-y-1.5">
        <span className="font-mono text-[10px] uppercase tracking-wide text-muted-foreground">
          Link ref
        </span>
        <input
          type="text"
          className="w-full rounded border border-border bg-background px-3 py-2 font-mono text-[11px] text-foreground"
          value={linkRef(active.link)}
          onChange={(e) =>
            setVariantPatch(activeVariant, {
              link: e.target.value
                ? { ref: e.target.value, external: active.link?.external ?? false }
                : undefined,
            })
          }
          placeholder="/work/reel or #anchor"
        />
      </label>

      <label className="inline-flex items-center gap-2 rounded border border-border/60 bg-background/60 px-3 py-2 text-[11px] text-foreground">
        <input
          type="checkbox"
          checked={active.link?.external === true}
          onChange={(e) =>
            setVariantPatch(activeVariant, {
              link: active.link?.ref
                ? { ref: active.link.ref, external: e.target.checked }
                : undefined,
            })
          }
        />
        Link is external
      </label>

      <label className="space-y-1.5">
        <span className="font-mono text-[10px] uppercase tracking-wide text-muted-foreground">
          Module preset
        </span>
        <select
          className="w-full rounded border border-border bg-background px-3 py-2 font-mono text-[11px] text-foreground"
          value={resolveModuleSelectValue(active.module)}
          onChange={(e) => {
            const next = e.target.value;
            if (next === "__custom__") return;
            setVariantPatch(activeVariant, { module: next || undefined });
          }}
        >
          <option value="">No module overlay</option>
          {VIDEO_MODULE_PRESET_OPTIONS.map((option) => (
            <option key={option.key} value={option.key}>
              {option.label}
            </option>
          ))}
          <option value="__custom__">Custom key (use field below)</option>
        </select>
      </label>

      <label className="space-y-1.5">
        <span className="font-mono text-[10px] uppercase tracking-wide text-muted-foreground">
          Module key
        </span>
        <input
          type="text"
          className="w-full rounded border border-border bg-background px-3 py-2 font-mono text-[11px] text-foreground"
          value={active.module ?? ""}
          onChange={(e) => setVariantPatch(activeVariant, { module: e.target.value || undefined })}
          placeholder="Optional module id (e.g. video-player)"
        />
      </label>
    </>
  );
}
