"use client";

import type { ModalProps } from "@pb/core";
import { ModalRenderer } from "@pb/runtime-react/modal";
import { DeviceTypeProvider as RuntimeDeviceTypeProvider } from "@pb/runtime-react/core/providers/device-type-provider";

type Props = {
  children: React.ReactNode;
  unlockModalProps: ModalProps | null;
  hideChildrenWhenModalOpen?: boolean;
};

/**
 * Renders page content with an optional unlock modal overlay.
 * Modal props (including transition) come from getModalProps; no hardcoded modal logic.
 */
export function HomeWithUnlockModal({
  children,
  unlockModalProps,
  hideChildrenWhenModalOpen = false,
}: Props) {
  const modalOpen = Boolean(unlockModalProps);
  const hideChildren = modalOpen && hideChildrenWhenModalOpen;

  return (
    <>
      {!hideChildren && children}
      {unlockModalProps && (
        <RuntimeDeviceTypeProvider>
          <ModalRenderer
            {...unlockModalProps}
            overlayClassName={
              hideChildren
                ? "fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black"
                : undefined
            }
            dialogClassName="w-[min(92vw,28rem)] sm:w-[min(86vw,30rem)] max-h-[90vh] overflow-y-auto rounded-xl border border-border bg-background p-5 shadow-xl sm:p-6"
          />
        </RuntimeDeviceTypeProvider>
      )}
    </>
  );
}
