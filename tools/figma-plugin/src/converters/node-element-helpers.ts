/**
 * Shared helper functions for element conversion:
 * ID inference, annotation prop application, absolute positioning.
 */

import type { ElementInteractions } from "../types/page-builder";
import {
  extractAbsolutePositionStyle,
  extractConstraintPosition,
  isAbsolutePositioned,
} from "./layout-auto-props";
import { extractChildLayoutAlign } from "./layout-frame-props";
import { extractPrototypeInteractions } from "./prototype-interactions";
import { parseElementInteractionAnnotations } from "./annotations-interactions";
import { parseAnnotationValue, annotationFlag } from "./annotations-parse";
import { buildMotionTiming } from "./motion";
import { hasChildren, isTextNode } from "@figma-plugin/helpers";

// ---------------------------------------------------------------------------
// inferNodeId
// ---------------------------------------------------------------------------

const AUTO_NAME_RE =
  /^(Frame|Group|Rectangle|Ellipse|Vector|Line|Polygon|Star|Section|Component|Boolean Operation)\s+\d+$/i;

/**
 * Infers a meaningful ID for a node even when the layer name is an
 * auto-generated Figma default.
 *
 * Priority: 1. Clean layer name, 2. First text child, 3. Type + index
 */
export function inferNodeId(node: SceneNode, fallbackIndex?: number): string {
  const rawName = node.name?.trim() ?? "";
  const cleanName = rawName.replace(/\[pb:[^\]]*\]/g, "").trim();

  if (cleanName && !AUTO_NAME_RE.test(cleanName)) {
    return cleanName;
  }

  if (hasChildren(node)) {
    const children = node.children as SceneNode[];
    for (const child of children) {
      if (isTextNode(child)) {
        const text = (child as unknown as { characters: string }).characters?.trim();
        if (text && text.length > 0 && text.length <= 60) {
          return text.slice(0, 40);
        }
      }
    }
  }

  const typeName = node.type.toLowerCase().replace(/_/g, "-");
  return fallbackIndex !== undefined ? `${typeName}-${fallbackIndex}` : typeName;
}

// ---------------------------------------------------------------------------
// Parent context
// ---------------------------------------------------------------------------

export interface GroupNodeParentCtx {
  layoutMode: "NONE" | "HORIZONTAL" | "VERTICAL";
  parentWidth?: number;
  parentHeight?: number;
}

// ---------------------------------------------------------------------------
// mergeInteractions
// ---------------------------------------------------------------------------

export function mergeInteractions(
  proto: ElementInteractions | undefined,
  annotated: ElementInteractions | undefined
): ElementInteractions | undefined {
  if (!proto && !annotated) return undefined;
  return { ...proto, ...annotated };
}

// ---------------------------------------------------------------------------
// applyAbsPos
// ---------------------------------------------------------------------------

export function applyAbsPos(
  resultInput: unknown,
  node: SceneNode,
  parentCtx?: GroupNodeParentCtx
): void {
  const result = resultInput as Record<string, unknown>;
  if (parentCtx?.layoutMode === "NONE" && "x" in node && "y" in node) {
    const absStyle = extractAbsolutePositionStyle(
      node as SceneNode & { x: number; y: number; width: number; height: number }
    );
    result.wrapperStyle = {
      ...absStyle,
      ...((result.wrapperStyle as Record<string, unknown>) ?? {}),
    };
  }

  if (isAbsolutePositioned(node) && "x" in node && "y" in node) {
    const absStyle = extractConstraintPosition(
      node as SceneNode & { x: number; y: number; width: number; height: number },
      parentCtx?.parentWidth,
      parentCtx?.parentHeight
    );
    result.wrapperStyle = {
      ...((result.wrapperStyle as Record<string, unknown>) ?? {}),
      ...absStyle,
    };
  }
}

// ---------------------------------------------------------------------------
// applyElementAnnotationProps
// ---------------------------------------------------------------------------

/**
 * Applies all annotation-driven and Figma-node-driven supplemental fields to a
 * converted element block in-place. Covers interactions, visibleWhen, opacity,
 * hidden, blendMode, overflow, rotate, flipHorizontal/Vertical, aria, and zIndex.
 */
export function applyElementAnnotationProps(
  elementInput: unknown,
  node: SceneNode,
  annotations: Record<string, string>,
  warnings?: string[]
): void {
  const element = elementInput as Record<string, unknown>;

  // 1. Interactions
  const existingInteractions = element.interactions as ElementInteractions | undefined;
  const protoInteractions = extractPrototypeInteractions(node, warnings);
  const annotationInteractions = parseElementInteractionAnnotations(annotations);
  const interactions = mergeInteractions(
    mergeInteractions(existingInteractions, protoInteractions),
    annotationInteractions
  );
  if (interactions && Object.keys(interactions).length > 0) {
    element.interactions = interactions;
    if (interactions.cursor) element.cursor = interactions.cursor;
  }

  // 2. visibleWhen
  if (annotations.visiblewhen) {
    const parts = annotations.visiblewhen.split(":");
    if (parts.length >= 3) {
      element.visibleWhen = {
        variable: parts[0],
        operator: parts[1],
        value: parseAnnotationValue(parts[2]),
      };
    }
  }

  // 3. opacity
  if (annotations.opacity !== undefined) {
    const op = parseFloat(annotations.opacity);
    if (!isNaN(op)) element.opacity = op;
  }

  // 4. hidden
  if ((node as SceneNode & { visible?: boolean }).visible === false) element.hidden = true;
  if (annotationFlag(annotations, "hidden")) element.hidden = true;

  // 5. blendMode
  if (annotations.blendmode) element.blendMode = annotations.blendmode;

  // 6. overflow
  if ((node as SceneNode & { clipsContent?: boolean }).clipsContent === true) {
    element.overflow = "hidden";
  }
  if (annotations.overflow) element.overflow = annotations.overflow;

  // 7. rotate
  const nodeWithRotation = node as SceneNode & { rotation?: number };
  if (typeof nodeWithRotation.rotation === "number") {
    const deg = -nodeWithRotation.rotation;
    if (Math.abs(deg) > 0.01) element.rotate = Math.round(deg * 100) / 100;
  }

  // 8. flipHorizontal / flipVertical
  if (annotationFlag(annotations, "fliph")) element.flipHorizontal = true;
  if (annotationFlag(annotations, "flipv")) element.flipVertical = true;

  // 9. aria
  const ariaObj: Record<string, string | boolean> = {};
  if (annotations.arialabel) ariaObj.label = annotations.arialabel;
  if (annotations.ariarole) ariaObj.role = annotations.ariarole;
  if (annotations.ariahidden) ariaObj.hidden = annotationFlag(annotations, "ariahidden");
  if (Object.keys(ariaObj).length > 0) element.aria = ariaObj;

  // 10. zIndex
  if (annotations.zindex !== undefined) {
    const z = parseInt(annotations.zindex, 10);
    if (!isNaN(z)) element.zIndex = z;
  }

  // 11. Per-child align-self
  const alignSelf = extractChildLayoutAlign(node);
  if (alignSelf) element.alignSelf = alignSelf;

  // 12. Motion shorthand
  const motionTiming = buildMotionTiming(annotations);
  if (motionTiming) element.motionTiming = motionTiming;
}
