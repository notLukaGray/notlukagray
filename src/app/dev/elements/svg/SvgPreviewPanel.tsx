import { useMemo } from "react";
import { TypographyLiveMotionPreview } from "@/app/dev/elements/_shared/TypographyLiveMotionPreview";
import { buildResolvedTypographyWorkbenchBlock } from "@/app/dev/elements/_shared/typography-workbench-preview";
import { DEFAULT_MARKUP, VARIANT_LABELS } from "./constants";
import type { SvgElementDevController } from "./useSvgElementDevController";

export function SvgPreviewPanel({ controller }: { controller: SvgElementDevController }) {
  const { runtimePreview } = controller;
  const previewBlock = useMemo(
    () =>
      buildResolvedTypographyWorkbenchBlock(controller.runtimeDraft, {
        type: "elementSVG",
        ...controller.active,
        markup: controller.active.markup ?? DEFAULT_MARKUP,
      }),
    [controller.active, controller.runtimeDraft]
  );
  const hiddenByVisibleWhen =
    controller.runtimeDraft.visibleWhenEnabled && !runtimePreview.visibleWhenMatches;
  const variantLabel = controller.isCustomVariant
    ? "Create Custom"
    : VARIANT_LABELS[controller.activeVariant];

  return (
    <TypographyLiveMotionPreview
      previewVisible={controller.previewVisible}
      previewKey={controller.previewKey}
      autoLoop={controller.autoLoop}
      setAutoLoop={controller.setAutoLoop}
      animateInPreview={controller.animateInPreview}
      animateOutPreview={controller.animateOutPreview}
      showPreview={controller.showPreview}
      variantLabel={variantLabel}
      hiddenByVisibleWhen={hiddenByVisibleWhen}
      runtimeDraft={controller.runtimeDraft}
      previewBlock={previewBlock}
      onPreviewExitComplete={controller.onPreviewExitComplete}
      animationSource={controller.active.animation}
    />
  );
}
