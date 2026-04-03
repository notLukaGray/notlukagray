import type { AnimationBehavior } from "@/app/dev/elements/_shared/motion-lab";
import { MOTION_CUSTOM_FIELD_KEYS } from "@/app/dev/elements/_shared/motion-lab";
import type { PbAnimationLabController } from "@/app/dev/elements/_shared/pb-animation-lab-controller";
import {
  ANIMATION_TRIGGER_OPTIONS,
  ENTRANCE_PRESET_OPTIONS,
  EXIT_PRESET_OPTIONS,
  HYBRID_STACK_OPTIONS,
} from "@/app/dev/elements/image/constants";
import { ImageAnimationCustomInPanel } from "@/app/dev/elements/image/controls/ImageAnimationCustomInPanel";
import { ImageAnimationCustomOutPanel } from "@/app/dev/elements/image/controls/ImageAnimationCustomOutPanel";
import type {
  PbImageAnimationDefaults,
  PbImageHybridStackPreset,
} from "@/app/theme/pb-builder-defaults";

export function PbAnimationLabControls({ controller }: { controller: PbAnimationLabController }) {
  const {
    active,
    activeVariant,
    animationBehavior,
    showFineTuneControls,
    showHybridControls,
    showPresetControls,
  } = controller;
  return (
    <>
      <label className="space-y-1.5">
        <span className="font-mono text-[10px] uppercase tracking-wide text-muted-foreground">
          Animation behavior
        </span>
        <select
          className="w-full rounded border border-border bg-background px-3 py-2 font-mono text-[11px] text-foreground focus:outline-none focus:ring-1 focus:ring-ring"
          value={animationBehavior}
          onChange={(e) => setBehavior(controller, e.target.value as AnimationBehavior)}
        >
          <option value="preset">Preset (simple)</option>
          <option value="hybrid">Hybrid (stack + duration)</option>
          <option value="custom">Custom (full control)</option>
        </select>
      </label>
      <label className="space-y-1.5">
        <span className="font-mono text-[10px] uppercase tracking-wide text-muted-foreground">
          Animate trigger
        </span>
        <select
          className="w-full rounded border border-border bg-background px-3 py-2 font-mono text-[11px] text-foreground focus:outline-none focus:ring-1 focus:ring-ring"
          value={active.animation.trigger}
          onChange={(e) =>
            controller.setAnimationPatch(activeVariant, {
              trigger: e.target.value as PbImageAnimationDefaults["trigger"],
            })
          }
        >
          {ANIMATION_TRIGGER_OPTIONS.map((opt) => (
            <option key={opt} value={opt}>
              {opt}
            </option>
          ))}
        </select>
      </label>
      {showPresetControls ? (
        <PresetFields controller={controller} />
      ) : (
        <div className="rounded border border-border/60 bg-muted/20 px-3 py-2 text-[10px] text-muted-foreground">
          Presets are disabled in Custom mode. Motion is generated only from your controls below.
        </div>
      )}
      <div className="sm:col-span-2 space-y-3 rounded-md border border-dashed border-border/80 bg-muted/15 p-3">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <p className="font-mono text-[10px] uppercase tracking-wide text-muted-foreground">
            Animation Lab
          </p>
          <span className="rounded border border-border/60 bg-background/70 px-2 py-1 font-mono text-[10px] text-foreground">
            {animationBehavior.toUpperCase()}
          </span>
        </div>
        <p className="text-[10px] leading-snug text-muted-foreground">
          Preset = one preset in/out pair. Hybrid = preset plus one optional stacked effect and one
          shared duration. Custom = full keyframe control for entrance and exit.
        </p>
        {showHybridControls ? (
          <p className="text-[10px] leading-snug text-muted-foreground">
            Hybrid keeps core presets clean. Slide, zoom, and tilt stay their own motion and stack
            only when you choose it.
          </p>
        ) : null}
        {showFineTuneControls ? (
          <p className="text-[10px] leading-snug text-muted-foreground">
            Custom controls currently map to: {MOTION_CUSTOM_FIELD_KEYS.join(", ")}.
          </p>
        ) : null}
        {showHybridControls ? <HybridFields controller={controller} /> : null}
        {showFineTuneControls ? (
          <div className="grid gap-3 lg:grid-cols-2">
            <ImageAnimationCustomInPanel controller={controller} />
            <ImageAnimationCustomOutPanel controller={controller} />
          </div>
        ) : null}
      </div>
    </>
  );
}

function PresetFields({ controller }: { controller: PbAnimationLabController }) {
  return (
    <>
      <SelectPreset
        controller={controller}
        field="entrancePreset"
        label="Animate in preset"
        options={ENTRANCE_PRESET_OPTIONS}
      />
      <SelectPreset
        controller={controller}
        field="exitPreset"
        label="Animate out preset"
        options={EXIT_PRESET_OPTIONS}
      />
    </>
  );
}

function SelectPreset({
  controller,
  field,
  label,
  options,
}: {
  controller: PbAnimationLabController;
  field: "entrancePreset" | "exitPreset";
  label: string;
  options: string[];
}) {
  return (
    <label className="space-y-1.5">
      <span className="font-mono text-[10px] uppercase tracking-wide text-muted-foreground">
        {label}
      </span>
      <select
        className="w-full rounded border border-border bg-background px-3 py-2 font-mono text-[11px] text-foreground focus:outline-none focus:ring-1 focus:ring-ring"
        value={controller.active.animation[field]}
        onChange={(e) =>
          controller.setAnimationPatch(controller.activeVariant, { [field]: e.target.value })
        }
      >
        {options.map((opt) => (
          <option key={opt} value={opt}>
            {opt}
          </option>
        ))}
      </select>
    </label>
  );
}

function HybridFields({ controller }: { controller: PbAnimationLabController }) {
  return (
    <div className="space-y-2 rounded border border-border/70 bg-background/60 p-3">
      <p className="font-mono text-[10px] uppercase tracking-wide text-muted-foreground">
        Hybrid Stack
      </p>
      <div className="grid gap-2 sm:grid-cols-3">
        <HybridPreset controller={controller} field="hybridStackInPreset" label="Stack in" />
        <HybridPreset controller={controller} field="hybridStackOutPreset" label="Stack out" />
        <label className="space-y-1">
          <span className="font-mono text-[10px] uppercase tracking-wide text-muted-foreground">
            Duration (s)
          </span>
          <input
            type="number"
            min={0.05}
            step={0.01}
            className="w-full rounded border border-border bg-background px-2 py-1.5 font-mono text-[11px]"
            value={controller.active.animation.fineTune.hybridDuration}
            onChange={(e) =>
              controller.setAnimationPatch(controller.activeVariant, {
                fineTune: {
                  ...controller.active.animation.fineTune,
                  hybridDuration: Math.max(0.05, Number(e.target.value || 0.45)),
                },
              })
            }
          />
        </label>
      </div>
    </div>
  );
}

function HybridPreset({
  controller,
  field,
  label,
}: {
  controller: PbAnimationLabController;
  field: "hybridStackInPreset" | "hybridStackOutPreset";
  label: string;
}) {
  return (
    <label className="space-y-1">
      <span className="font-mono text-[10px] uppercase tracking-wide text-muted-foreground">
        {label}
      </span>
      <select
        className="w-full rounded border border-border bg-background px-2 py-1.5 font-mono text-[11px]"
        value={controller.active.animation.fineTune[field]}
        onChange={(e) =>
          controller.setAnimationPatch(controller.activeVariant, {
            fineTune: {
              ...controller.active.animation.fineTune,
              [field]: e.target.value as PbImageHybridStackPreset,
            },
          })
        }
      >
        {HYBRID_STACK_OPTIONS.map((opt) => (
          <option key={opt} value={opt}>
            {opt}
          </option>
        ))}
      </select>
    </label>
  );
}

function setBehavior(controller: PbAnimationLabController, next: AnimationBehavior) {
  if (next === "preset")
    return controller.setAnimationPatch(controller.activeVariant, {
      fineTune: { ...controller.active.animation.fineTune, enabled: false, usePresetAsBase: true },
    });
  if (next === "custom")
    return controller.setAnimationPatch(controller.activeVariant, {
      fineTune: { ...controller.active.animation.fineTune, enabled: true, usePresetAsBase: false },
    });
  controller.setAnimationPatch(controller.activeVariant, {
    fineTune: {
      ...controller.active.animation.fineTune,
      enabled: true,
      usePresetAsBase: true,
      hybridStackInPreset: controller.active.animation.fineTune.hybridStackInPreset ?? "none",
      hybridStackOutPreset: controller.active.animation.fineTune.hybridStackOutPreset ?? "none",
      hybridDuration: Math.max(0.05, controller.active.animation.fineTune.hybridDuration ?? 0.45),
    },
  });
}
