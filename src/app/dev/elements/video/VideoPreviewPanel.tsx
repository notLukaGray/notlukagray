import { useMemo } from "react";
import { TypographyLiveMotionPreview } from "@/app/dev/elements/_shared/TypographyLiveMotionPreview";
import { buildResolvedTypographyWorkbenchBlock } from "@/app/dev/elements/_shared/typography-workbench-preview";
import { PREVIEW_FALLBACK_POSTER_SRC, VARIANT_LABELS } from "./constants";
import type { VideoElementDevController } from "./useVideoElementDevController";

export function VideoPreviewPanel({ controller }: { controller: VideoElementDevController }) {
  const { runtimePreview } = controller;
  const previewBlock = useMemo(
    () =>
      buildResolvedTypographyWorkbenchBlock(controller.runtimeDraft, {
        ...controller.active,
        type: "elementVideo",
        src: controller.active.src ?? "",
        poster: controller.active.poster?.trim()
          ? controller.active.poster
          : PREVIEW_FALLBACK_POSTER_SRC,
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
