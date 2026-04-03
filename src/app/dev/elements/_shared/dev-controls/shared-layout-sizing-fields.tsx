import type { PbImageVariantDefaults } from "@/app/theme/pb-builder-defaults";
import {
  hasMobileOverride,
  resolveConstraintsForDevice,
  resolveResponsiveValueForDevice,
  setDesktopConstraintField,
  setDesktopResponsiveValue,
  setMobileConstraintField,
  setMobileResponsiveValue,
  toggleConstraintsMobileOverride,
  toggleMobileOverride,
  type ConstraintField,
} from "@/app/dev/elements/_shared/responsive-layout-value";
import { ALIGN_OPTIONS, ALIGN_Y_OPTIONS } from "./foundation-constants";
import { ConstraintField as ConstraintFieldControl } from "./constraint-field";
import { ResponsiveSelectField, ResponsiveTextField } from "./field-primitives";

type Props = {
  variant: PbImageVariantDefaults;
  showWidthHeightFields: boolean;
  showAlignmentControls: boolean;
  showConstraintsEditor: boolean;
  onPatch: (patch: Partial<PbImageVariantDefaults>) => void;
  widthPlaceholderDesktop?: string;
  heightPlaceholderDesktop?: string;
};

export function SharedLayoutSizingFields({
  variant,
  showWidthHeightFields,
  showAlignmentControls,
  showConstraintsEditor,
  onPatch,
  widthPlaceholderDesktop = "e.g. 100%",
  heightPlaceholderDesktop = "e.g. 100%",
}: Props) {
  const widthDesktop = resolveResponsiveValueForDevice(variant.width, "desktop") ?? "";
  const widthMobile = resolveResponsiveValueForDevice(variant.width, "mobile") ?? widthDesktop;
  const widthHasMobile = hasMobileOverride(variant.width);

  const heightDesktop = resolveResponsiveValueForDevice(variant.height, "desktop") ?? "";
  const heightMobile = resolveResponsiveValueForDevice(variant.height, "mobile") ?? heightDesktop;
  const heightHasMobile = hasMobileOverride(variant.height);

  const constraintsDesktop = resolveConstraintsForDevice(variant.constraints, "desktop") ?? {};
  const constraintsMobile =
    resolveConstraintsForDevice(variant.constraints, "mobile") ?? constraintsDesktop;
  const constraintsHasMobile = hasMobileOverride(variant.constraints);

  const alignDesktop = resolveResponsiveValueForDevice(variant.align, "desktop") ?? "center";
  const alignMobile = resolveResponsiveValueForDevice(variant.align, "mobile") ?? alignDesktop;
  const alignHasMobile = hasMobileOverride(variant.align);
  const alignYDesktop = resolveResponsiveValueForDevice(variant.alignY, "desktop") ?? "center";
  const alignYMobile = resolveResponsiveValueForDevice(variant.alignY, "mobile") ?? alignYDesktop;
  const alignYHasMobile = hasMobileOverride(variant.alignY);

  return (
    <>
      {showWidthHeightFields ? (
        <>
          <ResponsiveTextField
            label="Width"
            desktopValue={widthDesktop}
            mobileValue={widthMobile}
            hasMobile={widthHasMobile}
            placeholderDesktop={widthPlaceholderDesktop}
            placeholderMobile="mobile width"
            onToggleMobile={(enabled) =>
              onPatch({ width: toggleMobileOverride(variant.width, enabled, widthDesktop) })
            }
            onDesktopChange={(value) =>
              onPatch({ width: setDesktopResponsiveValue(variant.width, value) })
            }
            onMobileChange={(value) =>
              onPatch({ width: setMobileResponsiveValue(variant.width, value, widthDesktop) })
            }
          />
          <ResponsiveTextField
            label="Height"
            desktopValue={heightDesktop}
            mobileValue={heightMobile}
            hasMobile={heightHasMobile}
            placeholderDesktop={heightPlaceholderDesktop}
            placeholderMobile="mobile height"
            onToggleMobile={(enabled) =>
              onPatch({ height: toggleMobileOverride(variant.height, enabled, heightDesktop) })
            }
            onDesktopChange={(value) =>
              onPatch({ height: setDesktopResponsiveValue(variant.height, value) })
            }
            onMobileChange={(value) =>
              onPatch({ height: setMobileResponsiveValue(variant.height, value, heightDesktop) })
            }
          />
        </>
      ) : null}

      {showAlignmentControls ? (
        <>
          <ResponsiveSelectField
            label="Align X"
            options={ALIGN_OPTIONS}
            desktopValue={alignDesktop}
            mobileValue={alignMobile}
            hasMobile={alignHasMobile}
            onToggleMobile={(enabled) =>
              onPatch({ align: toggleMobileOverride(variant.align, enabled, alignDesktop) })
            }
            onDesktopChange={(value) =>
              onPatch({
                align: setDesktopResponsiveValue(
                  variant.align,
                  value as "left" | "center" | "right"
                ),
              })
            }
            onMobileChange={(value) =>
              onPatch({
                align: setMobileResponsiveValue(
                  variant.align,
                  value as "left" | "center" | "right",
                  alignDesktop as "left" | "center" | "right"
                ),
              })
            }
          />
          <ResponsiveSelectField
            label="Align Y"
            options={ALIGN_Y_OPTIONS}
            desktopValue={alignYDesktop}
            mobileValue={alignYMobile}
            hasMobile={alignYHasMobile}
            onToggleMobile={(enabled) =>
              onPatch({ alignY: toggleMobileOverride(variant.alignY, enabled, alignYDesktop) })
            }
            onDesktopChange={(value) =>
              onPatch({
                alignY: setDesktopResponsiveValue(
                  variant.alignY,
                  value as "top" | "center" | "bottom"
                ),
              })
            }
            onMobileChange={(value) =>
              onPatch({
                alignY: setMobileResponsiveValue(
                  variant.alignY,
                  value as "top" | "center" | "bottom",
                  alignYDesktop as "top" | "center" | "bottom"
                ),
              })
            }
          />
        </>
      ) : (
        <div className="rounded border border-border/60 bg-muted/20 px-3 py-2 text-[10px] text-muted-foreground">
          Alignment appears when using fill, constraints, or explicit width and height sizing.
        </div>
      )}

      <label className="space-y-1.5">
        <span className="font-mono text-[10px] uppercase tracking-wide text-muted-foreground">
          Z-index
        </span>
        <input
          type="number"
          step={1}
          className="w-full rounded border border-border bg-background px-3 py-2 font-mono text-[11px] text-foreground placeholder:text-muted-foreground/70"
          value={variant.zIndex ?? ""}
          placeholder="optional"
          onChange={(e) => {
            const raw = e.target.value;
            if (raw === "" || raw === "-") {
              onPatch({ zIndex: undefined });
              return;
            }
            const n = Number(raw);
            if (Number.isFinite(n)) onPatch({ zIndex: n });
          }}
        />
      </label>

      {showConstraintsEditor ? (
        <>
          <div className="sm:col-span-2 rounded border border-border/60 bg-background/60 px-3 py-2">
            <label className="inline-flex items-center gap-2 text-[10px] font-mono uppercase tracking-wide text-muted-foreground">
              <input
                type="checkbox"
                checked={constraintsHasMobile}
                onChange={(e) =>
                  onPatch({
                    constraints: toggleConstraintsMobileOverride(
                      variant.constraints,
                      e.target.checked
                    ),
                  })
                }
              />
              Mobile override
            </label>
          </div>
          <ConstraintFieldControl
            field="minWidth"
            label="Min width"
            desktop={constraintsDesktop.minWidth ?? ""}
            mobile={constraintsMobile.minWidth ?? ""}
            hasMobile={constraintsHasMobile}
            onDesktopChange={(field: ConstraintField, value: string) =>
              onPatch({ constraints: setDesktopConstraintField(variant.constraints, field, value) })
            }
            onMobileChange={(field: ConstraintField, value: string) =>
              onPatch({ constraints: setMobileConstraintField(variant.constraints, field, value) })
            }
          />
          <ConstraintFieldControl
            field="minHeight"
            label="Min height"
            desktop={constraintsDesktop.minHeight ?? ""}
            mobile={constraintsMobile.minHeight ?? ""}
            hasMobile={constraintsHasMobile}
            onDesktopChange={(field: ConstraintField, value: string) =>
              onPatch({ constraints: setDesktopConstraintField(variant.constraints, field, value) })
            }
            onMobileChange={(field: ConstraintField, value: string) =>
              onPatch({ constraints: setMobileConstraintField(variant.constraints, field, value) })
            }
          />
          <ConstraintFieldControl
            field="maxWidth"
            label="Max width"
            desktop={constraintsDesktop.maxWidth ?? ""}
            mobile={constraintsMobile.maxWidth ?? ""}
            hasMobile={constraintsHasMobile}
            onDesktopChange={(field: ConstraintField, value: string) =>
              onPatch({ constraints: setDesktopConstraintField(variant.constraints, field, value) })
            }
            onMobileChange={(field: ConstraintField, value: string) =>
              onPatch({ constraints: setMobileConstraintField(variant.constraints, field, value) })
            }
          />
          <ConstraintFieldControl
            field="maxHeight"
            label="Max height"
            desktop={constraintsDesktop.maxHeight ?? ""}
            mobile={constraintsMobile.maxHeight ?? ""}
            hasMobile={constraintsHasMobile}
            onDesktopChange={(field: ConstraintField, value: string) =>
              onPatch({ constraints: setDesktopConstraintField(variant.constraints, field, value) })
            }
            onMobileChange={(field: ConstraintField, value: string) =>
              onPatch({ constraints: setMobileConstraintField(variant.constraints, field, value) })
            }
          />
        </>
      ) : null}
    </>
  );
}
