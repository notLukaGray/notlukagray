import type { PbResponsiveValue } from "@/app/theme/pb-builder-defaults";
import {
  hasMobileOverride,
  resolveResponsiveValueForDevice,
  setDesktopResponsiveValue,
  setMobileResponsiveValue,
  toggleMobileOverride,
} from "@/app/dev/elements/_shared/responsive-layout-value";
import { ALIGN_OPTIONS, ALIGN_Y_OPTIONS, TEXT_ALIGN_OPTIONS } from "./foundation-constants";
import { ResponsiveSelectField, ResponsiveTextField } from "./field-primitives";

export type TypographySizingShape = {
  width?: PbResponsiveValue<string>;
  height?: PbResponsiveValue<string>;
  align?: PbResponsiveValue<"left" | "center" | "right">;
  alignY?: PbResponsiveValue<"top" | "center" | "bottom">;
  textAlign?: PbResponsiveValue<"left" | "center" | "right" | "justify">;
  zIndex?: number;
};

type Props<T extends TypographySizingShape> = {
  variant: T;
  onPatch: (patch: Partial<T>) => void;
};

export function SharedTypographySizingFields<T extends TypographySizingShape>({
  variant,
  onPatch,
}: Props<T>) {
  const widthDesktop = resolveResponsiveValueForDevice(variant.width, "desktop") ?? "";
  const widthMobile = resolveResponsiveValueForDevice(variant.width, "mobile") ?? widthDesktop;
  const widthHasMobile = hasMobileOverride(variant.width);

  const heightDesktop = resolveResponsiveValueForDevice(variant.height, "desktop") ?? "";
  const heightMobile = resolveResponsiveValueForDevice(variant.height, "mobile") ?? heightDesktop;
  const heightHasMobile = hasMobileOverride(variant.height);

  const alignDesktop = resolveResponsiveValueForDevice(variant.align, "desktop") ?? "center";
  const alignMobile = resolveResponsiveValueForDevice(variant.align, "mobile") ?? alignDesktop;
  const alignHasMobile = hasMobileOverride(variant.align);

  const alignYDesktop = resolveResponsiveValueForDevice(variant.alignY, "desktop") ?? "center";
  const alignYMobile = resolveResponsiveValueForDevice(variant.alignY, "mobile") ?? alignYDesktop;
  const alignYHasMobile = hasMobileOverride(variant.alignY);

  const textAlignDesktop = resolveResponsiveValueForDevice(variant.textAlign, "desktop") ?? "left";
  const textAlignMobile =
    resolveResponsiveValueForDevice(variant.textAlign, "mobile") ?? textAlignDesktop;
  const textAlignHasMobile = hasMobileOverride(variant.textAlign);

  return (
    <>
      <ResponsiveTextField
        label="Width"
        desktopValue={widthDesktop}
        mobileValue={widthMobile}
        hasMobile={widthHasMobile}
        placeholderDesktop="optional"
        placeholderMobile="mobile width"
        onToggleMobile={(enabled) =>
          onPatch({
            width: toggleMobileOverride(variant.width, enabled, widthDesktop),
          } as Partial<T>)
        }
        onDesktopChange={(value) =>
          onPatch({ width: setDesktopResponsiveValue(variant.width, value) } as Partial<T>)
        }
        onMobileChange={(value) =>
          onPatch({
            width: setMobileResponsiveValue(variant.width, value, widthDesktop),
          } as Partial<T>)
        }
      />
      <ResponsiveTextField
        label="Height"
        desktopValue={heightDesktop}
        mobileValue={heightMobile}
        hasMobile={heightHasMobile}
        placeholderDesktop="optional"
        placeholderMobile="mobile height"
        onToggleMobile={(enabled) =>
          onPatch({
            height: toggleMobileOverride(variant.height, enabled, heightDesktop),
          } as Partial<T>)
        }
        onDesktopChange={(value) =>
          onPatch({ height: setDesktopResponsiveValue(variant.height, value) } as Partial<T>)
        }
        onMobileChange={(value) =>
          onPatch({
            height: setMobileResponsiveValue(variant.height, value, heightDesktop),
          } as Partial<T>)
        }
      />

      <ResponsiveSelectField
        label="Align X"
        options={ALIGN_OPTIONS}
        desktopValue={alignDesktop}
        mobileValue={alignMobile}
        hasMobile={alignHasMobile}
        onToggleMobile={(enabled) =>
          onPatch({
            align: toggleMobileOverride(variant.align, enabled, alignDesktop),
          } as Partial<T>)
        }
        onDesktopChange={(value) =>
          onPatch({
            align: setDesktopResponsiveValue(variant.align, value as "left" | "center" | "right"),
          } as Partial<T>)
        }
        onMobileChange={(value) =>
          onPatch({
            align: setMobileResponsiveValue(
              variant.align,
              value as "left" | "center" | "right",
              alignDesktop as "left" | "center" | "right"
            ),
          } as Partial<T>)
        }
      />
      <ResponsiveSelectField
        label="Align Y"
        options={ALIGN_Y_OPTIONS}
        desktopValue={alignYDesktop}
        mobileValue={alignYMobile}
        hasMobile={alignYHasMobile}
        onToggleMobile={(enabled) =>
          onPatch({
            alignY: toggleMobileOverride(variant.alignY, enabled, alignYDesktop),
          } as Partial<T>)
        }
        onDesktopChange={(value) =>
          onPatch({
            alignY: setDesktopResponsiveValue(variant.alignY, value as "top" | "center" | "bottom"),
          } as Partial<T>)
        }
        onMobileChange={(value) =>
          onPatch({
            alignY: setMobileResponsiveValue(
              variant.alignY,
              value as "top" | "center" | "bottom",
              alignYDesktop as "top" | "center" | "bottom"
            ),
          } as Partial<T>)
        }
      />
      <ResponsiveSelectField
        label="Text align"
        options={TEXT_ALIGN_OPTIONS}
        desktopValue={textAlignDesktop}
        mobileValue={textAlignMobile}
        hasMobile={textAlignHasMobile}
        onToggleMobile={(enabled) =>
          onPatch({
            textAlign: toggleMobileOverride(variant.textAlign, enabled, textAlignDesktop),
          } as Partial<T>)
        }
        onDesktopChange={(value) =>
          onPatch({
            textAlign: setDesktopResponsiveValue(
              variant.textAlign,
              value as "left" | "center" | "right" | "justify"
            ),
          } as Partial<T>)
        }
        onMobileChange={(value) =>
          onPatch({
            textAlign: setMobileResponsiveValue(
              variant.textAlign,
              value as "left" | "center" | "right" | "justify",
              textAlignDesktop as "left" | "center" | "right" | "justify"
            ),
          } as Partial<T>)
        }
      />

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
              onPatch({ zIndex: undefined } as Partial<T>);
              return;
            }
            const n = Number(raw);
            if (Number.isFinite(n)) onPatch({ zIndex: n } as Partial<T>);
          }}
        />
      </label>
    </>
  );
}
