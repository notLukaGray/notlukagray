"use client";

import type { ModalProps } from "@pb/core";
import { ModalRenderer } from "@pb/runtime-react/modal";
import { DeviceTypeProvider as RuntimeDeviceTypeProvider } from "@pb/runtime-react/core/providers/device-type-provider";

type Props = {
  children: React.ReactNode;
  unlockModalProps: ModalProps | null;
};

/**
 * Renders home content with an optional unlock modal overlay (when unlock_redirect is in the URL).
 * Modal props (including transition) come from getModalProps; no hardcoded modal logic.
 */
export function HomeWithUnlockModal({ children, unlockModalProps }: Props) {
  return (
    <>
      {children}
      {unlockModalProps && (
        <RuntimeDeviceTypeProvider>
          <ModalRenderer {...unlockModalProps} />
        </RuntimeDeviceTypeProvider>
      )}
    </>
  );
}
