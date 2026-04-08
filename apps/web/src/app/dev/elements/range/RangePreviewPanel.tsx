import { useMemo } from "react";
import { TypographyLiveMotionPreview } from "@/app/dev/elements/_shared/TypographyLiveMotionPreview";
import { buildResolvedTypographyWorkbenchBlock } from "@/app/dev/elements/_shared/typography-workbench-preview";
import type { ElementBlock } from "@pb/contracts";
import { VARIANT_LABELS } from "./constants";
import type { RangeElementDevController } from "./useRangeElementDevController";

export function RangePreviewPanel({ controller }: { controller: RangeElementDevController }) {
  const { runtimePreview } = controller;
  const previewBlock = useMemo(() => {
    const rangeBlock = buildResolvedTypographyWorkbenchBlock(controller.runtimeDraft, {
      type: "elementRange",
      ...controller.active,
    });
    return {
      type: "elementGroup",
      width: "100%",
      display: "flex",
      flexDirection: "column",
      gap: "0.75rem",
      section: {
        elementOrder: ["range-label", "range-control", "range-hint"],
        definitions: {
          "range-label": {
            type: "elementBody",
            text: "Preview slider",
            level: 6,
            opacity: 0.75,
          },
          "range-control": rangeBlock,
          "range-hint": {
            type: "elementBody",
            text: "Drag the thumb to check track/fill/thumb contrast and feel.",
            level: 6,
            opacity: 0.6,
          },
        },
      },
    } as ElementBlock;
  }, [controller.active, controller.runtimeDraft]);
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
