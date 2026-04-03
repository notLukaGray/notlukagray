import type { ReactNode } from "react";
import type { PbResponsiveValue } from "@/app/theme/pb-builder-defaults";
import {
  hasMobileOverride,
  resolveResponsiveValueForDevice,
  setDesktopResponsiveValue,
  setMobileResponsiveValue,
  toggleMobileOverride,
} from "@/app/dev/elements/_shared/responsive-layout-value";
import { ResponsiveTextField } from "./field-primitives";

export type FoundationLayoutMarginsShape = {
  borderRadius?: PbResponsiveValue<string>;
  marginTop?: PbResponsiveValue<string>;
  marginBottom?: PbResponsiveValue<string>;
  marginLeft?: PbResponsiveValue<string>;
  marginRight?: PbResponsiveValue<string>;
};

type Props<T extends FoundationLayoutMarginsShape> = {
  variant: T;
  onPatch: (patch: Partial<T>) => void;
  intro?: ReactNode;
};

export function SharedFoundationLayoutFields<T extends FoundationLayoutMarginsShape>({
  variant,
  onPatch,
  intro,
}: Props<T>) {
  const borderDesktop = resolveResponsiveValueForDevice(variant.borderRadius, "desktop") ?? "";
  const borderMobile =
    resolveResponsiveValueForDevice(variant.borderRadius, "mobile") ?? borderDesktop;
  const borderHasMobile = hasMobileOverride(variant.borderRadius);

  const marginTopDesktop = resolveResponsiveValueForDevice(variant.marginTop, "desktop") ?? "";
  const marginTopMobile =
    resolveResponsiveValueForDevice(variant.marginTop, "mobile") ?? marginTopDesktop;
  const marginTopHasMobile = hasMobileOverride(variant.marginTop);
  const marginBottomDesktop =
    resolveResponsiveValueForDevice(variant.marginBottom, "desktop") ?? "";
  const marginBottomMobile =
    resolveResponsiveValueForDevice(variant.marginBottom, "mobile") ?? marginBottomDesktop;
  const marginBottomHasMobile = hasMobileOverride(variant.marginBottom);
  const marginLeftDesktop = resolveResponsiveValueForDevice(variant.marginLeft, "desktop") ?? "";
  const marginLeftMobile =
    resolveResponsiveValueForDevice(variant.marginLeft, "mobile") ?? marginLeftDesktop;
  const marginLeftHasMobile = hasMobileOverride(variant.marginLeft);
  const marginRightDesktop = resolveResponsiveValueForDevice(variant.marginRight, "desktop") ?? "";
  const marginRightMobile =
    resolveResponsiveValueForDevice(variant.marginRight, "mobile") ?? marginRightDesktop;
  const marginRightHasMobile = hasMobileOverride(variant.marginRight);

  return (
    <>
      {intro}
      <ResponsiveTextField
        label="Border radius"
        desktopValue={borderDesktop}
        mobileValue={borderMobile}
        hasMobile={borderHasMobile}
        placeholderDesktop="e.g. 0.375rem"
        onToggleMobile={(enabled) =>
          onPatch({
            borderRadius:
              toggleMobileOverride(variant.borderRadius, enabled, borderDesktop) ?? borderDesktop,
          } as Partial<T>)
        }
        onDesktopChange={(value) =>
          onPatch({
            borderRadius: setDesktopResponsiveValue(variant.borderRadius, value),
          } as Partial<T>)
        }
        onMobileChange={(value) =>
          onPatch({
            borderRadius: setMobileResponsiveValue(variant.borderRadius, value, borderDesktop),
          } as Partial<T>)
        }
      />

      <ResponsiveTextField
        label="Margin top"
        desktopValue={marginTopDesktop}
        mobileValue={marginTopMobile}
        hasMobile={marginTopHasMobile}
        placeholderDesktop="optional"
        onToggleMobile={(enabled) =>
          onPatch({
            marginTop: toggleMobileOverride(variant.marginTop, enabled, marginTopDesktop),
          } as Partial<T>)
        }
        onDesktopChange={(value) =>
          onPatch({ marginTop: setDesktopResponsiveValue(variant.marginTop, value) } as Partial<T>)
        }
        onMobileChange={(value) =>
          onPatch({
            marginTop: setMobileResponsiveValue(variant.marginTop, value, marginTopDesktop),
          } as Partial<T>)
        }
      />
      <ResponsiveTextField
        label="Margin bottom"
        desktopValue={marginBottomDesktop}
        mobileValue={marginBottomMobile}
        hasMobile={marginBottomHasMobile}
        placeholderDesktop="optional"
        onToggleMobile={(enabled) =>
          onPatch({
            marginBottom: toggleMobileOverride(variant.marginBottom, enabled, marginBottomDesktop),
          } as Partial<T>)
        }
        onDesktopChange={(value) =>
          onPatch({
            marginBottom: setDesktopResponsiveValue(variant.marginBottom, value),
          } as Partial<T>)
        }
        onMobileChange={(value) =>
          onPatch({
            marginBottom: setMobileResponsiveValue(
              variant.marginBottom,
              value,
              marginBottomDesktop
            ),
          } as Partial<T>)
        }
      />
      <ResponsiveTextField
        label="Margin left"
        desktopValue={marginLeftDesktop}
        mobileValue={marginLeftMobile}
        hasMobile={marginLeftHasMobile}
        placeholderDesktop="optional"
        onToggleMobile={(enabled) =>
          onPatch({
            marginLeft: toggleMobileOverride(variant.marginLeft, enabled, marginLeftDesktop),
          } as Partial<T>)
        }
        onDesktopChange={(value) =>
          onPatch({
            marginLeft: setDesktopResponsiveValue(variant.marginLeft, value),
          } as Partial<T>)
        }
        onMobileChange={(value) =>
          onPatch({
            marginLeft: setMobileResponsiveValue(variant.marginLeft, value, marginLeftDesktop),
          } as Partial<T>)
        }
      />
      <ResponsiveTextField
        label="Margin right"
        desktopValue={marginRightDesktop}
        mobileValue={marginRightMobile}
        hasMobile={marginRightHasMobile}
        placeholderDesktop="optional"
        onToggleMobile={(enabled) =>
          onPatch({
            marginRight: toggleMobileOverride(variant.marginRight, enabled, marginRightDesktop),
          } as Partial<T>)
        }
        onDesktopChange={(value) =>
          onPatch({
            marginRight: setDesktopResponsiveValue(variant.marginRight, value),
          } as Partial<T>)
        }
        onMobileChange={(value) =>
          onPatch({
            marginRight: setMobileResponsiveValue(variant.marginRight, value, marginRightDesktop),
          } as Partial<T>)
        }
      />
    </>
  );
}
