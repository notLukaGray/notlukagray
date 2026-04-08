import { useMemo, useRef } from "react";
import { buildImageDevPreviewElementBlock } from "@/app/dev/elements/image/runtime-draft";
import { ServerBreakpointProvider } from "@/core/providers/device-type-provider";
import { ElementRenderer } from "@pb/runtime-react/renderers";
import { PREVIEW_FALLBACK_IMAGE_SRC } from "@/app/dev/elements/image/constants";
import {
  getPreviewLayoutSummary,
  getPreviewMediaShell,
  resolveVariantForPreview,
} from "@/app/dev/elements/image/preview-motion";
import type { ImageElementDevController } from "@/app/dev/elements/image/useImageElementDevController";
import { ImagePreviewFooter } from "./image-preview-footer";
import { ImagePreviewOverlays } from "./image-preview-overlays";
import { ImagePreviewToolbar } from "./image-preview-toolbar";
import { ImagePreviewUploadControls } from "./image-preview-upload-controls";
import { useImagePreviewCrop } from "./use-image-preview-crop";
import { useImagePreviewVisibleWhenSync } from "./use-image-preview-visible-when-sync";

function getLetterboxGuideStyle(objectFit: string): React.CSSProperties {
  const showGuide =
    objectFit === "contain" || objectFit === "fillWidth" || objectFit === "fillHeight";
  if (!showGuide) return {};
  return {
    backgroundImage: [
      "linear-gradient(45deg, rgba(255,255,255,0.07) 25%, transparent 25%)",
      "linear-gradient(-45deg, rgba(255,255,255,0.07) 25%, transparent 25%)",
      "linear-gradient(45deg, transparent 75%, rgba(255,255,255,0.07) 75%)",
      "linear-gradient(-45deg, transparent 75%, rgba(255,255,255,0.07) 75%)",
    ].join(", "),
    backgroundSize: "10px 10px",
    backgroundPosition: "0 0, 0 5px, 5px -5px, -5px 0px",
  };
}

function resolvePreviewAlt(uploadName: string | null): string {
  if (uploadName != null && uploadName.trim().length > 0) return `Preview · ${uploadName}`;
  return "Image preview";
}

export function ImagePreviewPanel({ controller }: { controller: ImageElementDevController }) {
  const inputRef = useRef<HTMLInputElement | null>(null);

  const previewVariant = useMemo(
    () => resolveVariantForPreview(controller.active, controller.previewDevice),
    [controller.active, controller.previewDevice]
  );
  const previewShell = useMemo(() => getPreviewMediaShell(previewVariant), [previewVariant]);
  const layoutSummary = useMemo(() => getPreviewLayoutSummary(previewVariant), [previewVariant]);

  const canCrop = controller.showObjectPositionControl;
  const canCropPanZoom = controller.showCropPanZoom;
  const hiddenByVisibleWhenRuntime =
    controller.runtimeDraft.visibleWhenEnabled && !controller.runtimePreview.visibleWhenMatches;
  const runtimeCursor =
    controller.runtimePreview.cursor ??
    (controller.runtimePreview.linkHref ? "pointer" : undefined);
  useImagePreviewVisibleWhenSync(controller.runtimeDraft);

  const {
    cropSurfaceRef,
    cropMode,
    cropCursorResolved,
    cropInteractionActive,
    objectPositionCropActive,
    setCropMode,
    handleSurfacePointerDown,
    handleSurfaceContextMenu,
    handleSurfaceMouseMove,
    handleSurfaceMouseUp,
    handleSurfaceMouseLeave,
  } = useImagePreviewCrop({
    controller,
    canCrop,
    canCropPanZoom,
    runtimeCursor,
  });

  const previewSrc = controller.previewUploadUrl ?? PREVIEW_FALLBACK_IMAGE_SRC;
  const previewAlt = resolvePreviewAlt(controller.previewUploadName);

  const previewBlock = useMemo(
    () =>
      buildImageDevPreviewElementBlock(
        controller.activeVariant,
        controller.active,
        controller.runtimeDraft,
        {
          previewSrc,
          previewAlt,
          previewLayoutSlot: {
            device: controller.previewDevice,
            mediaStyle: previewShell.mediaStyle,
          },
        }
      ),
    [
      controller.active,
      controller.activeVariant,
      controller.previewDevice,
      controller.runtimeDraft,
      previewAlt,
      previewShell.mediaStyle,
      previewSrc,
    ]
  );

  return (
    <div className="space-y-3">
      <ImagePreviewToolbar controller={controller} />

      <ImagePreviewUploadControls
        inputRef={inputRef}
        controller={controller}
        canCrop={canCrop}
        canCropPanZoom={canCropPanZoom}
        cropMode={cropMode}
        setCropMode={setCropMode}
      />

      <p className="text-[10px] leading-relaxed text-muted-foreground">
        <span className="font-medium text-foreground">ElementRenderer:</span> image preview is
        rendered through the page-builder stack with merged runtime metadata.
      </p>

      <div className="relative mx-auto w-full max-w-[58rem] rounded-xl border border-border/50 bg-[linear-gradient(135deg,rgba(255,255,255,0.04),rgba(255,255,255,0))] [aspect-ratio:16/9]">
        <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(0deg,rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] [background-size:18px_18px]" />
        <div className="pointer-events-none absolute inset-6 rounded border border-dashed border-foreground/20 md:inset-8" />

        <div className={previewShell.className + " min-h-0 min-w-0"} style={previewShell.style}>
          <div
            ref={cropSurfaceRef}
            className={previewShell.slotClassName}
            style={{ ...previewShell.slotStyle, cursor: cropCursorResolved }}
            onPointerDown={handleSurfacePointerDown}
            onContextMenu={handleSurfaceContextMenu}
            onMouseMove={handleSurfaceMouseMove}
            onMouseUp={handleSurfaceMouseUp}
            onMouseLeave={handleSurfaceMouseLeave}
          >
            <div
              className={previewShell.innerClassName}
              style={{
                ...(previewShell.innerStyle ?? {}),
                ...getLetterboxGuideStyle(previewVariant.objectFit),
                ...(cropInteractionActive ? { pointerEvents: "none" } : {}),
              }}
            >
              <ServerBreakpointProvider
                key={controller.previewDevice === "mobile" ? "mobile" : "desktop"}
                isMobile={controller.previewDevice === "mobile"}
              >
                <ElementRenderer
                  key={"image-preview-renderer-" + controller.previewKey}
                  block={previewBlock}
                  forceEntranceAnimation
                  exitPresenceShow={controller.previewVisible}
                  exitPresenceKey={"image-preview-" + controller.previewKey}
                  exitPresenceMode="wait"
                  onExitComplete={controller.onPreviewExitComplete}
                />
              </ServerBreakpointProvider>
            </div>
          </div>
        </div>

        <ImagePreviewOverlays
          controller={controller}
          previewVariant={previewVariant}
          hiddenByVisibleWhenRuntime={hiddenByVisibleWhenRuntime}
        />
      </div>

      <ImagePreviewFooter
        layoutSummary={layoutSummary}
        canCrop={canCrop}
        canCropPanZoom={canCropPanZoom}
        objectPositionCropActive={objectPositionCropActive}
        previewVariant={previewVariant}
      />
    </div>
  );
}
