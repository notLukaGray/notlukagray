import type { ElementBlock } from "@/page-builder/core/page-builder-schemas";
import { TypographyLiveMotionPreview } from "@/app/dev/elements/_shared/TypographyLiveMotionPreview";
import { ElementBody } from "@/page-builder/elements/ElementBody";
import { VARIANT_LABELS } from "./constants";
import type { BodyElementDevController } from "./useBodyElementDevController";

export function BodyPreviewPanel({ controller }: { controller: BodyElementDevController }) {
  const { active, runtimePreview } = controller;
  const { animation: _animation, ...bodyRest } = active;
  const block: Extract<ElementBlock, { type: "elementBody" }> = {
    type: "elementBody",
    ...bodyRest,
  };
  const hiddenByVisibleWhen =
    controller.runtimeDraft.visibleWhenEnabled && !runtimePreview.visibleWhenMatches;
  const variantLabel = controller.isCustomVariant
    ? "Custom"
    : VARIANT_LABELS[controller.activeVariant];

  return (
    <TypographyLiveMotionPreview
      previewVisible={controller.previewVisible}
      previewKey={controller.previewKey}
      previewMotion={controller.previewMotion}
      motionTiming={active.animation ? undefined : active.motionTiming}
      exitPreset={active.animation ? undefined : active.exitPreset}
      autoLoop={controller.autoLoop}
      setAutoLoop={controller.setAutoLoop}
      animateInPreview={controller.animateInPreview}
      animateOutPreview={controller.animateOutPreview}
      showPreview={controller.showPreview}
      variantLabel={variantLabel}
      hiddenByVisibleWhen={hiddenByVisibleWhen}
      frameStyle={runtimePreview.wrapperStyle}
    >
      <ElementBody {...block} />
    </TypographyLiveMotionPreview>
  );
}
