"use client";

import { useCallback, useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import type { ModalProps } from "@pb/core";
import { ModalRenderer } from "@pb/runtime-react/modal";
import { DeviceTypeProvider as RuntimeDeviceTypeProvider } from "@pb/runtime-react/core/providers/device-type-provider";

type Props = {
  children: React.ReactNode;
  unlockModalProps: ModalProps | null;
  hideChildrenWhenModalOpen?: boolean;
  closeOnOverlayClick?: boolean;
};

/**
 * Renders page content with an optional unlock modal overlay.
 * Modal props (including transition) come from getModalProps; no hardcoded modal logic.
 */
export function WithUnlockModal({
  children,
  unlockModalProps,
  hideChildrenWhenModalOpen = false,
  closeOnOverlayClick = true,
}: Props) {
  const router = useRouter();
  const pathname = usePathname();
  const modalOpen = Boolean(unlockModalProps);
  const hideChildren = modalOpen && hideChildrenWhenModalOpen;
  const [overlayEntered, setOverlayEntered] = useState(false);

  useEffect(() => {
    if (!modalOpen) return;

    let enterFrameId = 0;
    const resetFrameId = window.requestAnimationFrame(() => {
      setOverlayEntered(false);
      enterFrameId = window.requestAnimationFrame(() => setOverlayEntered(true));
    });

    return () => {
      window.cancelAnimationFrame(resetFrameId);
      window.cancelAnimationFrame(enterFrameId);
    };
  }, [modalOpen]);
  const handleOverlayClick = useCallback(() => {
    setOverlayEntered(false);
    if (typeof window !== "undefined" && window.history.length > 1) {
      router.back();
      return;
    }

    const params = new URLSearchParams(window.location.search);
    params.delete("unlock");
    params.delete("unlock_redirect");
    params.delete("unlock_preview");
    const nextUrl = params.toString() ? `${pathname}?${params.toString()}` : pathname;
    router.replace(nextUrl);
  }, [pathname, router]);

  return (
    <>
      {!hideChildren && children}
      {unlockModalProps && (
        <RuntimeDeviceTypeProvider>
          <ModalRenderer
            {...unlockModalProps}
            show
            overlayClassName={`fixed inset-0 z-190 flex items-center justify-center p-4 transition-[opacity,background-color] duration-400 ease-out ${
              overlayEntered
                ? hideChildren
                  ? "bg-background/72 opacity-100"
                  : "bg-background/52 opacity-100"
                : "bg-background/0 opacity-0"
            }`}
            onOverlayClick={closeOnOverlayClick ? handleOverlayClick : undefined}
            dialogClassName="w-[min(92vw,28rem)] sm:w-[min(86vw,30rem)] max-h-[90vh] overflow-y-auto rounded-xl border border-border bg-background p-5 shadow-xl sm:p-6"
          />
        </RuntimeDeviceTypeProvider>
      )}
    </>
  );
}
