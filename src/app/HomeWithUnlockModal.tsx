"use client";

import type { ModalProps } from "@/page-builder/core/modal-types";
import { ModalRenderer } from "@/page-builder/ModalRenderer";

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
      {unlockModalProps && <ModalRenderer {...unlockModalProps} />}
    </>
  );
}
