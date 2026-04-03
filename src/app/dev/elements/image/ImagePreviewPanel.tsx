/* eslint-disable @next/next/no-img-element -- preview uses temporary local object URLs that are not persisted. */
import { useEffect, useMemo, useRef, useState } from "react";
import { ElementExitWrapper } from "@/page-builder/integrations/framer-motion";
import { VARIANT_LABELS } from "./constants";
import { curvePreviewLabel } from "./utils";
import {
  getPreviewLayoutSummary,
  getPreviewMediaShell,
  getPreviewUploadImageStyle,
  getPreviewFrameStyle,
  resolveVariantForPreview,
} from "./preview-motion";
import type { ImageElementDevController } from "./useImageElementDevController";

function clamp(n: number, min: number, max: number): number {
  return Math.min(max, Math.max(min, n));
}

export function ImagePreviewPanel({ controller }: { controller: ImageElementDevController }) {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const cropSurfaceRef = useRef<HTMLDivElement | null>(null);
  const lastPtrRef = useRef<{ x: number; y: number } | null>(null);
  const controllerRef = useRef(controller);
  useEffect(() => {
    controllerRef.current = controller;
  }, [controller]);
  const [cropMode, setCropMode] = useState(false);
  const [isDraggingCrop, setIsDraggingCrop] = useState(false);
  const [cropDragMode, setCropDragMode] = useState<"pan" | "scale" | null>(null);
  const previewVariant = useMemo(
    () => resolveVariantForPreview(controller.active, controller.previewDevice),
    [controller.active, controller.previewDevice]
  );
  const previewShell = useMemo(() => getPreviewMediaShell(previewVariant), [previewVariant]);
  const frameStyle = useMemo(
    () => getPreviewFrameStyle(previewVariant, previewShell.mediaStyle),
    [previewShell.mediaStyle, previewVariant]
  );
  const runtimeCursor =
    controller.runtimePreview.cursor ??
    (controller.runtimePreview.linkHref ? "pointer" : undefined);
  const shellStyle = useMemo(
    () => ({
      ...previewShell.style,
      ...controller.runtimePreview.wrapperStyle,
      cursor: runtimeCursor,
    }),
    [controller.runtimePreview.wrapperStyle, previewShell.style, runtimeCursor]
  );
  const uploadStyle = useMemo(() => getPreviewUploadImageStyle(previewVariant), [previewVariant]);
  const layoutSummary = useMemo(() => getPreviewLayoutSummary(previewVariant), [previewVariant]);
  const hiddenByVisibleWhen =
    controller.runtimeDraft.visibleWhenEnabled && !controller.runtimePreview.visibleWhenMatches;
  const showInPreview = controller.previewVisible;
  const canCrop = controller.showObjectPositionControl;
  const isCropObjectFit = previewVariant.objectFit === "crop";
  const canCropPanZoom = controller.showCropPanZoom;

  const setFocalFromClient = (clientX: number, clientY: number) => {
    if (!cropSurfaceRef.current) return;
    const rect = cropSurfaceRef.current.getBoundingClientRect();
    if (rect.width <= 0 || rect.height <= 0) return;
    const nx = (clientX - rect.left) / rect.width;
    const ny = (clientY - rect.top) / rect.height;
    const c = controllerRef.current;
    const cur = c.active.imageCrop ?? { x: 0, y: 0, scale: 1 };
    c.setVariantPatch(c.activeVariant, {
      imageCrop: {
        ...cur,
        focalX: clamp(nx, 0, 1),
        focalY: clamp(ny, 0, 1),
      },
    });
  };

  useEffect(() => {
    if (!cropDragMode) return;
    const onMove = (e: PointerEvent) => {
      if (!lastPtrRef.current || !cropSurfaceRef.current) return;
      const rect = cropSurfaceRef.current.getBoundingClientRect();
      if (rect.width <= 0 || rect.height <= 0) return;
      const c = controllerRef.current;
      const cur = c.active.imageCrop ?? { x: 0, y: 0, scale: 1 };
      if (cropDragMode === "pan") {
        const dx = e.clientX - lastPtrRef.current.x;
        const dy = e.clientY - lastPtrRef.current.y;
        lastPtrRef.current = { x: e.clientX, y: e.clientY };
        c.setVariantPatch(c.activeVariant, {
          imageCrop: {
            ...cur,
            x: clamp((cur.x ?? 0) + (dx / rect.width) * 100, -45, 45),
            y: clamp((cur.y ?? 0) + (dy / rect.height) * 100, -45, 45),
            scale: cur.scale ?? 1,
          },
        });
      } else {
        const dx = e.clientX - lastPtrRef.current.x;
        lastPtrRef.current = { x: e.clientX, y: e.clientY };
        const deltaScale = (dx / rect.width) * 3;
        c.setVariantPatch(c.activeVariant, {
          imageCrop: {
            ...cur,
            x: cur.x ?? 0,
            y: cur.y ?? 0,
            scale: clamp((cur.scale ?? 1) + deltaScale, 1, 4),
          },
        });
      }
    };
    const onUp = () => {
      setCropDragMode(null);
      lastPtrRef.current = null;
    };
    window.addEventListener("pointermove", onMove);
    window.addEventListener("pointerup", onUp);
    window.addEventListener("pointercancel", onUp);
    return () => {
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerup", onUp);
      window.removeEventListener("pointercancel", onUp);
    };
  }, [cropDragMode]);

  const updateCropPosition = (clientX: number, clientY: number) => {
    if (!canCrop || !cropSurfaceRef.current) return;
    const rect = cropSurfaceRef.current.getBoundingClientRect();
    if (rect.width <= 0 || rect.height <= 0) return;
    const x = clamp(((clientX - rect.left) / rect.width) * 100, 0, 100);
    const y = clamp(((clientY - rect.top) / rect.height) * 100, 0, 100);
    controller.setVariantPatch(controller.activeVariant, {
      objectPosition: `${x.toFixed(1)}% ${y.toFixed(1)}%`,
    });
  };

  const mediaNode = (
    <div
      ref={cropSurfaceRef}
      className="relative h-full w-full"
      style={{
        ...frameStyle,
        opacity: hiddenByVisibleWhen ? 0.25 : frameStyle.opacity,
        cursor: canCropPanZoom
          ? cropDragMode === "pan"
            ? "grabbing"
            : cropDragMode === "scale"
              ? "ew-resize"
              : "grab"
          : cropMode && canCrop
            ? isDraggingCrop
              ? "grabbing"
              : "grab"
            : runtimeCursor,
      }}
      onPointerDown={(e) => {
        if (canCropPanZoom) {
          if (e.button === 0) {
            e.preventDefault();
            (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
            lastPtrRef.current = { x: e.clientX, y: e.clientY };
            setCropDragMode("pan");
            return;
          }
          if (e.button === 2) {
            e.preventDefault();
            (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
            lastPtrRef.current = { x: e.clientX, y: e.clientY };
            setCropDragMode("scale");
            return;
          }
          if (e.button === 1) {
            e.preventDefault();
            setFocalFromClient(e.clientX, e.clientY);
            return;
          }
          return;
        }
        if (!cropMode || !canCrop) return;
        setIsDraggingCrop(true);
        updateCropPosition(e.clientX, e.clientY);
      }}
      onContextMenu={(e) => {
        if (canCropPanZoom) e.preventDefault();
      }}
      onMouseMove={(e) => {
        if (!cropMode || !canCrop || !isDraggingCrop) return;
        updateCropPosition(e.clientX, e.clientY);
      }}
      onMouseUp={() => setIsDraggingCrop(false)}
      onMouseLeave={() => setIsDraggingCrop(false)}
    >
      {controller.previewUploadUrl ? (
        <div className="absolute inset-0 flex items-center justify-center">
          <img src={controller.previewUploadUrl} alt="Preview upload" style={uploadStyle} />
        </div>
      ) : (
        <>
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(120deg, color-mix(in oklab, var(--primary) 62%, white), color-mix(in oklab, var(--accent) 62%, white))",
            }}
          />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_72%_24%,rgba(255,255,255,0.35),transparent_44%)]" />
        </>
      )}
    </div>
  );

  return (
    <div className="space-y-3">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <p className="font-mono text-[11px] uppercase tracking-wide text-muted-foreground">
          Preview
        </p>
        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            onClick={controller.animateInPreview}
            className="rounded border border-border px-2 py-1 text-[10px] font-mono text-foreground hover:bg-muted"
          >
            Animate in
          </button>
          <button
            type="button"
            onClick={controller.animateOutPreview}
            className="rounded border border-border px-2 py-1 text-[10px] font-mono text-foreground hover:bg-muted"
          >
            Animate out
          </button>
          <button
            type="button"
            onClick={controller.showPreview}
            className="rounded border border-border px-2 py-1 text-[10px] font-mono text-foreground hover:bg-muted"
          >
            Show
          </button>
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-3">
        <label className="inline-flex items-center gap-2 text-[11px] text-muted-foreground">
          <input
            type="checkbox"
            checked={controller.autoLoop}
            onChange={(e) => controller.setAutoLoop(e.target.checked)}
          />
          Auto loop
        </label>
        <div className="inline-flex rounded border border-border/60 bg-background/60 p-0.5">
          {(["desktop", "mobile"] as const).map((device) => (
            <button
              key={device}
              type="button"
              onClick={() => controller.setPreviewDevice(device)}
              className={`rounded px-2 py-1 text-[10px] font-mono uppercase tracking-wide ${controller.previewDevice === device ? "bg-foreground/10 text-foreground" : "text-muted-foreground hover:text-foreground"}`}
            >
              {device}
            </button>
          ))}
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-2">
        <input
          ref={inputRef}
          type="file"
          accept="image/*"
          className="sr-only"
          onChange={(e) => {
            const file = e.target.files?.[0] ?? null;
            e.target.value = "";
            controller.setPreviewUploadFile(file);
          }}
        />
        <button
          type="button"
          className="rounded border border-border px-2 py-1 text-[10px] font-mono text-foreground hover:bg-muted"
          onClick={() => inputRef.current?.click()}
        >
          Upload Image
        </button>
        {controller.previewUploadUrl ? (
          <button
            type="button"
            className="rounded border border-border px-2 py-1 text-[10px] font-mono text-foreground hover:bg-muted"
            onClick={controller.clearPreviewUpload}
          >
            Clear Image
          </button>
        ) : null}
        <button
          type="button"
          onClick={() => setCropMode((prev) => !prev)}
          disabled={!canCrop}
          className="rounded border border-border px-2 py-1 text-[10px] font-mono text-foreground hover:bg-muted disabled:cursor-not-allowed disabled:opacity-50"
        >
          {cropMode ? "Crop On" : "Crop Off"}
        </button>
        <button
          type="button"
          onClick={() => {
            if (canCropPanZoom) {
              controller.setVariantPatch(controller.activeVariant, {
                imageCrop: { x: 0, y: 0, scale: 1 },
              });
            } else {
              controller.setVariantPatch(controller.activeVariant, { objectPosition: "50% 50%" });
            }
          }}
          disabled={!canCrop && !canCropPanZoom}
          className="rounded border border-border px-2 py-1 text-[10px] font-mono text-foreground hover:bg-muted disabled:cursor-not-allowed disabled:opacity-50"
        >
          Center
        </button>
        <span
          className="text-[10px] text-muted-foreground"
          title={controller.previewUploadName ?? undefined}
        >
          {controller.previewUploadName
            ? `${controller.previewUploadName} · preview-only`
            : "Upload a local file to preview only (not saved)"}
        </span>
      </div>

      <div className="relative mx-auto w-full max-w-[46rem] overflow-hidden rounded-xl border border-border/50 bg-[linear-gradient(135deg,rgba(255,255,255,0.04),rgba(255,255,255,0))] [aspect-ratio:16/9]">
        <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(0deg,rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] [background-size:18px_18px]" />
        <div className="pointer-events-none absolute inset-6 rounded border border-dashed border-foreground/20 md:inset-8" />
        <ElementExitWrapper
          show={showInPreview}
          motion={controller.previewMotion}
          exitKey={`image-preview-${controller.previewKey}`}
          className={previewShell.className}
          style={shellStyle}
        >
          {controller.runtimePreview.linkHref ? (
            <a
              href={controller.runtimePreview.linkHref}
              target={controller.runtimePreview.linkExternal ? "_blank" : undefined}
              rel={controller.runtimePreview.linkExternal ? "noopener noreferrer" : undefined}
              className="block h-full w-full"
              aria-label={controller.runtimePreview.ariaLabel}
            >
              {mediaNode}
            </a>
          ) : (
            <div className="block h-full w-full" aria-label={controller.runtimePreview.ariaLabel}>
              {mediaNode}
            </div>
          )}
        </ElementExitWrapper>

        <div className="pointer-events-none absolute left-3 top-3 rounded bg-background/70 px-2 py-1 font-mono text-[10px] text-foreground">
          {controller.isCustomVariant ? "Custom" : VARIANT_LABELS[controller.activeVariant]} ·{" "}
          {previewVariant.layoutMode} · {previewVariant.objectFit} · {controller.previewDevice}
        </div>
        <div className="pointer-events-none absolute bottom-3 left-3 rounded bg-background/70 px-2 py-1 font-mono text-[10px] text-foreground">
          {controller.active.animation.trigger} · {controller.animationBehavior}
          {controller.showPresetControls
            ? ` · ${controller.active.animation.entrancePreset} / ${controller.active.animation.exitPreset}`
            : ""}
        </div>
        <div className="pointer-events-none absolute top-3 right-3 rounded bg-background/70 px-2 py-1 font-mono text-[10px] text-foreground">
          {controller.runtimePreview.linkHref ? "link on" : "no link"} ·{" "}
          {hiddenByVisibleWhen ? "hidden(sim)" : "visible"}
        </div>
        {hiddenByVisibleWhen ? (
          <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
            <p className="rounded bg-background/80 px-2 py-1 font-mono text-[10px] text-foreground">
              Hidden by visibleWhen simulation
            </p>
          </div>
        ) : null}
        {controller.showFineTuneControls ? (
          <div className="pointer-events-none absolute bottom-3 right-3 rounded bg-background/70 px-2 py-1 font-mono text-[10px] text-foreground">
            {curvePreviewLabel(controller.active.animation.fineTune.entrance.curve)}
          </div>
        ) : controller.showHybridControls ? (
          <div className="pointer-events-none absolute bottom-3 right-3 rounded bg-background/70 px-2 py-1 font-mono text-[10px] text-foreground">
            {`${controller.active.animation.fineTune.hybridStackInPreset} / ${controller.active.animation.fineTune.hybridStackOutPreset} · ${controller.active.animation.fineTune.hybridDuration}s`}
          </div>
        ) : null}
      </div>

      <p className="text-[10px] text-muted-foreground">{layoutSummary}</p>
      <p className="text-[10px] text-muted-foreground">
        {isCropObjectFit && canCropPanZoom ? (
          <>
            Object fit crop: left-drag pan · right-drag scale · middle-click focal (saved only, no
            pan) ·{" "}
            {(() => {
              const c = previewVariant.imageCrop ?? { x: 0, y: 0, scale: 1 };
              const focal =
                c.focalX != null && c.focalY != null
                  ? ` · focal ${(c.focalX * 100).toFixed(0)}%, ${(c.focalY * 100).toFixed(0)}%`
                  : "";
              return `x ${c.x.toFixed(1)}% · y ${c.y.toFixed(1)}% · scale ${c.scale.toFixed(2)}${focal}`;
            })()}
          </>
        ) : (
          <>
            Object position: {previewVariant.objectPosition ?? "50% 50%"}
            {cropMode && canCrop ? " (toggle Crop On, then drag in frame)" : ""}
          </>
        )}
      </p>
    </div>
  );
}
