import type { ElementBlock } from "@/page-builder/core/page-builder-schemas";
import { TypographyLiveMotionPreview } from "@/app/dev/elements/_shared/TypographyLiveMotionPreview";
import { ElementLink } from "@/page-builder/elements/ElementLink";
import { VARIANT_LABELS } from "./constants";
import type { LinkElementDevController } from "./useLinkElementDevController";

export function LinkPreviewPanel({ controller }: { controller: LinkElementDevController }) {
  const { active, runtimePreview } = controller;
  const { animation: _animation, ...linkRest } = active;
  const block: Extract<ElementBlock, { type: "elementLink" }> = {
    type: "elementLink",
    ...linkRest,
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
      <ElementLink {...block} />
    </TypographyLiveMotionPreview>
  );
}
