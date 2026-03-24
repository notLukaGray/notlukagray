/**
 * Node type router.
 * Dispatches a SceneNode to the appropriate element converter based on node.type.
 */

import type { ElementBlock } from "../types/page-builder";
import type { ConversionContext } from "../types/figma-plugin";
import { convertTextNode } from "./text";
import { convertImageNode } from "./image";
import { convertVectorNode } from "./vector";
import { extractImageFill } from "./fills-image";
import { slugify, ensureUniqueId } from "../utils/slugify";
import { toPx } from "../utils/css";
import {
  parseNodeAnnotations,
  findUnsupportedAnnotationKeys,
  ELEMENT_SUPPORTED_ANNOTATION_KEYS,
} from "./annotations-parse";
import { buildMotionTiming } from "./motion";
import { isLikelyButton, convertButtonNode } from "./button";
import { isVideoNode, convertVideoNode } from "./video";
import { buildVariantElement } from "./component-variants";
import { convertGroupNode, convertRichTextNode } from "./node-element-group";
import {
  inferNodeId,
  applyElementAnnotationProps,
  applyAbsPos,
  type GroupNodeParentCtx,
} from "./node-element-helpers";
import { convertInstanceNode } from "./node-instance-convert";
import { convertSectionNode } from "./node-section-convert";

export type { GroupNodeParentCtx };

void buildMotionTiming; // referenced transitively via applyElementAnnotationProps

/**
 * Converts a SceneNode to a page-builder ElementBlock.
 * Returns null for nodes that cannot be represented in the page-builder schema.
 */
export async function convertNode(
  node: SceneNode,
  ctx: ConversionContext,
  parentCtx?: GroupNodeParentCtx
): Promise<ElementBlock | null> {
  const annotations = parseNodeAnnotations(
    node as unknown as { name?: string } & Record<string, unknown>
  );
  const unsupportedKeys = findUnsupportedAnnotationKeys(
    annotations,
    ELEMENT_SUPPORTED_ANNOTATION_KEYS
  );
  if (unsupportedKeys.length > 0) {
    ctx.warnings.push(
      `[annotations] "${node.name}" (${node.type}) has unsupported annotation key(s): ${unsupportedKeys.join(", ")}`
    );
  }

  // Annotation type overrides — bypass normal heuristic routing
  if (annotations.type === "button") {
    const result = await convertButtonNode(node, ctx, annotations);
    applyAbsPos(result, node, parentCtx);
    applyElementAnnotationProps(result, node, annotations, ctx.warnings);
    return result;
  }
  if (annotations.type === "spacer") {
    const id = ensureUniqueId(slugify(inferNodeId(node)), ctx.usedIds);
    const result: ElementBlock = {
      type: "elementSpacer",
      id,
      width: "width" in node ? toPx((node as { width: number }).width) : undefined,
      height: "height" in node ? toPx((node as { height: number }).height) : undefined,
    };
    applyAbsPos(result, node, parentCtx);
    applyElementAnnotationProps(result, node, annotations, ctx.warnings);
    return result;
  }
  if (annotations.type === "svg") {
    const result = await convertVectorNode(node as VectorNode, ctx);
    if (result) {
      applyAbsPos(result, node, parentCtx);
      applyElementAnnotationProps(result, node, annotations, ctx.warnings);
    }
    return result;
  }
  if (annotations.type === "image") {
    const result = await convertImageNode(node as RectangleNode, ctx);
    if (result) {
      applyAbsPos(result, node, parentCtx);
      applyElementAnnotationProps(result, node, annotations, ctx.warnings);
    }
    return result;
  }

  // Video detection
  if (isVideoNode(node, annotations)) {
    const result = await convertVideoNode(node, ctx, annotations);
    if (result) {
      applyAbsPos(result, node, parentCtx);
      applyElementAnnotationProps(result, node, annotations, ctx.warnings);
    }
    return result;
  }

  switch (node.type) {
    case "TEXT": {
      if (
        node.textStyleId === figma.mixed ||
        node.fontName === figma.mixed ||
        node.fontSize === figma.mixed
      ) {
        const result = await convertRichTextNode(node, ctx);
        if (result) {
          applyAbsPos(result, node, parentCtx);
          applyElementAnnotationProps(result, node, annotations, ctx.warnings);
        }
        return result;
      }
      const result: ElementBlock | null = await convertTextNode(node, ctx);
      if (result) {
        applyAbsPos(result, node, parentCtx);
        applyElementAnnotationProps(result, node, annotations, ctx.warnings);
      }
      return result;
    }

    case "VECTOR":
    case "BOOLEAN_OPERATION":
    case "STAR":
    case "POLYGON":
    case "LINE": {
      const result = await convertVectorNode(node, ctx);
      if (result) {
        applyAbsPos(result, node, parentCtx);
        applyElementAnnotationProps(result, node, annotations, ctx.warnings);
      }
      return result;
    }

    case "RECTANGLE": {
      const fills = node.fills as Paint[];
      const imageFill = extractImageFill(fills);
      if (imageFill) {
        const result = await convertImageNode(node, ctx);
        if (result) {
          applyAbsPos(result, node, parentCtx);
          applyElementAnnotationProps(result, node, annotations, ctx.warnings);
        }
        return result;
      }
      const result = await convertVectorNode(node, ctx);
      if (result) {
        applyAbsPos(result, node, parentCtx);
        applyElementAnnotationProps(result, node, annotations, ctx.warnings);
      }
      return result;
    }

    case "ELLIPSE": {
      const result = await convertVectorNode(node, ctx);
      if (result) {
        applyAbsPos(result, node, parentCtx);
        applyElementAnnotationProps(result, node, annotations, ctx.warnings);
      }
      return result;
    }

    case "FRAME":
    case "COMPONENT":
    case "GROUP": {
      const fills = "fills" in node ? (node.fills as Paint[]) : [];
      const imageFill = extractImageFill(fills);
      if (imageFill) {
        const result = await convertImageNode(node, ctx);
        if (result) {
          applyAbsPos(result, node, parentCtx);
          applyElementAnnotationProps(result, node, annotations, ctx.warnings);
        }
        return result;
      }

      if (node.type === "COMPONENT" && isLikelyButton(node, annotations)) {
        const result = await convertButtonNode(node, ctx, annotations);
        applyAbsPos(result, node, parentCtx);
        applyElementAnnotationProps(result, node, annotations, ctx.warnings);
        return result;
      }

      const groupResult = await convertGroupNode(
        node as FrameNode | GroupNode | ComponentNode,
        ctx,
        convertNode,
        parentCtx
      );
      if (groupResult) {
        applyElementAnnotationProps(groupResult, node, annotations, ctx.warnings);
        return groupResult;
      }

      {
        const fallbackId = ensureUniqueId(slugify(inferNodeId(node)), ctx.usedIds);
        ctx.warnings.push(
          `[warn] "${node.name}" (${node.type}) — could not fully convert, emitting as fallback group`
        );
        return {
          type: "elementGroup",
          id: fallbackId,
          section: { elementOrder: [], definitions: {} },
        } as ElementBlock;
      }
    }

    case "INSTANCE":
      return convertInstanceNode(node as InstanceNode, ctx, annotations, parentCtx, convertNode);

    case "COMPONENT_SET":
      return buildVariantElement(node as ComponentSetNode, ctx, convertNode);

    case "SECTION":
      return convertSectionNode(node as SectionNode, ctx, annotations, parentCtx, convertNode);

    default:
      ctx.warnings.push(
        `[node-router] Unsupported node type "${node.type}" ("${node.name}") — skipped`
      );
      return null;
  }
}
