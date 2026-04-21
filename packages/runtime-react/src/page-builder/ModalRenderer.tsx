"use client";

import { useEffect, useRef, useState } from "react";
import type { ModalProps } from "@pb/core/internal/modal-types";
import { SECTION_COMPONENTS } from "@/page-builder/section";
import { generateSectionKey } from "@pb/core/internal/section-keys";
import { SectionErrorBoundary } from "./SectionErrorBoundary";
import { ModalAnimationWrapper } from "@/page-builder/integrations/framer-motion/modal-wrapper";
import { SectionGlassEffect } from "@/page-builder/section/stack/SectionGlassEffect";
import { usePageBuilderThemeMode } from "@/page-builder/theme/use-page-builder-theme-mode";
import { resolveThemeValueDeep } from "@/page-builder/theme/theme-string";

/**
 * Listens to `page-builder-modal` events and manages local open state for a modal by id.
 * Returns null when the modal has never been explicitly opened (hidden by default).
 */
function useModalEventListener(modalId: string, initialOpen: boolean): boolean {
  const [open, setOpen] = useState(initialOpen);

  useEffect(() => {
    const handler = (e: Event) => {
      const { type, id: targetId } = (e as CustomEvent<{ type: string; id?: string }>).detail;
      if (type === "modalOpen" && targetId === modalId) setOpen(true);
      if (type === "modalClose" && (!targetId || targetId === modalId)) setOpen(false);
      if (type === "modalToggle" && targetId === modalId) setOpen((v) => !v);
    };
    window.addEventListener("page-builder-modal", handler as EventListener);
    return () => window.removeEventListener("page-builder-modal", handler as EventListener);
  }, [modalId]);

  return open;
}

type ModalRendererProps = ModalProps & {
  /** When set, enter/exit are driven by FM using transition from props (JSON). Omit for always-visible. */
  show?: boolean;
  /**
   * When true and `show` is omitted, modal manages its own open state by listening to
   * `page-builder-modal` events targeting its `id`. Starts hidden; opens on `modalOpen` event.
   * When false/omitted and `show` is omitted, modal is always visible (existing behavior).
   */
  eventDriven?: boolean;
  /** Optional callback when overlay is clicked (e.g. close). Not used for unlock. */
  onOverlayClick?: () => void;
  /** Optional className for the overlay (backdrop). */
  overlayClassName?: string;
  /** Optional className for the dialog container. */
  dialogClassName?: string;
};

function ModalContent({
  id,
  title,
  effects,
  resolvedSections,
  onOverlayClick,
  overlayClassName,
  dialogClassName,
}: Omit<ModalRendererProps, "show">) {
  const themeMode = usePageBuilderThemeMode();
  const dialogRef = useRef<HTMLDivElement | null>(null);
  const resolvedEffects = resolveThemeValueDeep(effects, themeMode) as typeof effects;
  const hasGlassEffect = (resolvedEffects ?? []).some((effect) => effect.type === "glass");
  const resolvedDialogClassName =
    dialogClassName ??
    (hasGlassEffect
      ? "relative w-full max-w-[min(theme(maxWidth.sm),calc(100vw-2rem))] md:max-w-md max-h-[90vh] overflow-y-auto rounded-xl bg-transparent shadow-xl border border-white/15 p-6"
      : "w-full max-w-[min(theme(maxWidth.sm),calc(100vw-2rem))] md:max-w-md max-h-[90vh] overflow-y-auto rounded-xl bg-background shadow-xl border border-border p-6");

  return (
    <div
      className={
        overlayClassName ??
        "fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
      }
      role="dialog"
      aria-modal="true"
      aria-labelledby={title ? `${id}-title` : undefined}
      onClick={onOverlayClick}
    >
      <div
        ref={dialogRef}
        className={resolvedDialogClassName}
        role="document"
        onClick={(e) => e.stopPropagation()}
      >
        {hasGlassEffect && (
          <SectionGlassEffect effects={resolvedEffects} sectionRef={dialogRef} variant="auto" />
        )}
        {title && (
          <h2 id={`${id}-title`} className="sr-only">
            {title}
          </h2>
        )}
        <div
          className={hasGlassEffect ? "relative z-[1] flex flex-col gap-4" : "flex flex-col gap-4"}
        >
          {resolvedSections.map((section, i) => {
            const SectionComponent = SECTION_COMPONENTS[section.type];
            const key = generateSectionKey(section, i);
            if (!SectionComponent) {
              if (process.env.NODE_ENV === "development") {
                console.warn(
                  `[page-builder] ModalRenderer: unknown section type "${section.type}"`
                );
              }
              return null;
            }
            return (
              <SectionErrorBoundary key={key} sectionKey={key}>
                <SectionComponent {...section} />
              </SectionErrorBoundary>
            );
          })}
        </div>
      </div>
    </div>
  );
}

/**
 * Inner variant: uses event-driven `page-builder-modal` events to control open state.
 * Used when `show` is not provided externally. Starts hidden; opens on `modalOpen` event.
 */
function ModalRendererEventDriven({
  id,
  title,
  effects,
  resolvedSections,
  transition,
  motion,
  onOverlayClick,
  overlayClassName,
  dialogClassName,
}: Omit<ModalRendererProps, "show">) {
  const open = useModalEventListener(id, false);

  const content = (
    <ModalContent
      id={id}
      title={title}
      effects={effects}
      resolvedSections={resolvedSections}
      onOverlayClick={onOverlayClick}
      overlayClassName={overlayClassName}
      dialogClassName={dialogClassName}
    />
  );

  return (
    <ModalAnimationWrapper modalKey={id} show={open} transition={transition} motion={motion}>
      {content}
    </ModalAnimationWrapper>
  );
}

/**
 * Renders a modal: overlay + centered dialog with page-builder sections inside.
 * Props come from getModalProps(id, options) (JSON).
 * - When `show` is passed: enter/exit are driven by that boolean via Framer Motion.
 * - When `eventDriven` is true and `show` is omitted: modal listens to `page-builder-modal`
 *   events (modalOpen/modalClose/modalToggle) targeting its `id` and manages open state
 *   internally. Starts hidden; opens on `modalOpen` event.
 * - Otherwise: modal is always visible when rendered (e.g. unlock modal shown via URL param).
 */
export function ModalRenderer({
  id,
  title,
  effects,
  resolvedSections,
  transition,
  motion,
  show,
  eventDriven,
  onOverlayClick,
  overlayClassName,
  dialogClassName,
}: ModalRendererProps) {
  const content = (
    <ModalContent
      id={id}
      title={title}
      effects={effects}
      resolvedSections={resolvedSections}
      onOverlayClick={onOverlayClick}
      overlayClassName={overlayClassName}
      dialogClassName={dialogClassName}
    />
  );

  if (show !== undefined) {
    return (
      <ModalAnimationWrapper modalKey={id} show={show} transition={transition} motion={motion}>
        {content}
      </ModalAnimationWrapper>
    );
  }

  if (eventDriven) {
    return (
      <ModalRendererEventDriven
        id={id}
        title={title}
        effects={effects}
        resolvedSections={resolvedSections}
        transition={transition}
        motion={motion}
        onOverlayClick={onOverlayClick}
        overlayClassName={overlayClassName}
        dialogClassName={dialogClassName}
      />
    );
  }

  return content;
}
