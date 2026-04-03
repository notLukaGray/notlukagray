import type { ElementBlock } from "@/page-builder/core/page-builder-schemas";
import { TypographyLiveMotionPreview } from "@/app/dev/elements/_shared/TypographyLiveMotionPreview";
import { ElementHeading } from "@/page-builder/elements/ElementHeading";
import { VARIANT_LABELS } from "./constants";
import type { HeadingElementDevController } from "./useHeadingElementDevController";

export function HeadingPreviewPanel({ controller }: { controller: HeadingElementDevController }) {
  const { active, runtimePreview } = controller;
  const { animation: _animation, ...headingRest } = active;
  const block = { type: "elementHeading" as const, ...headingRest } satisfies Extract<
    ElementBlock,
    { type: "elementHeading" }
  >;
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
      <ElementHeading {...block} />
    </TypographyLiveMotionPreview>
  );
}
