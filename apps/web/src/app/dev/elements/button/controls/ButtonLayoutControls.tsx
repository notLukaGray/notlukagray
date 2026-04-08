import { SharedFoundationLayoutFields } from "@/app/dev/elements/_shared/dev-controls";
import type { ButtonVariantDefaults } from "../types";
import type { ButtonElementDevController } from "../useButtonElementDevController";

export function ButtonLayoutControls({ controller }: { controller: ButtonElementDevController }) {
  const { active, activeVariant, setVariantPatch } = controller;

  return (
    <>
      <div className="sm:col-span-2 rounded border border-border/60 bg-muted/20 px-3 py-2">
        <p className="font-mono text-[10px] uppercase tracking-wide text-muted-foreground">
          Layout
        </p>
        <p className="mt-1 text-[10px] text-muted-foreground">
          Shared layout controls for spacing, width/height, and border radius.
        </p>
      </div>

      <SharedFoundationLayoutFields<ButtonVariantDefaults>
        variant={active}
        onPatch={(patch) => setVariantPatch(activeVariant, patch)}
      />
    </>
  );
}
