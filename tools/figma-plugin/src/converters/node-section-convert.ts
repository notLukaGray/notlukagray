/**
 * Converts Figma SECTION nodes (canvas section frames) to ElementBlocks.
 */

import type { ElementBlock } from "../types/page-builder";
import type { ConversionContext } from "../types/figma-plugin";
import { slugify, ensureUniqueId } from "../utils/slugify";
import {
  inferNodeId,
  applyElementAnnotationProps,
  type GroupNodeParentCtx,
} from "./node-element-helpers";

type ConvertNodeFn = (
  node: SceneNode,
  ctx: ConversionContext,
  parentCtx?: GroupNodeParentCtx
) => Promise<ElementBlock | null>;

function makeFallbackGroup(node: SectionNode, ctx: ConversionContext): ElementBlock {
  const id = ensureUniqueId(slugify(inferNodeId(node)), ctx.usedIds);
  ctx.warnings.push(
    `[warn] "${node.name}" (SECTION) — could not fully convert, emitting as fallback group`
  );
  return {
    type: "elementGroup",
    id,
    section: { elementOrder: [], definitions: {} },
  } as ElementBlock;
}

export async function convertSectionNode(
  node: SectionNode,
  ctx: ConversionContext,
  annotations: Record<string, string>,
  parentCtx: GroupNodeParentCtx | undefined,
  convertNodeFn: ConvertNodeFn
): Promise<ElementBlock> {
  if (!("children" in node) || !node.children.length) {
    return makeFallbackGroup(node, ctx);
  }

  const id = ensureUniqueId(slugify(inferNodeId(node)), ctx.usedIds);
  const children: ElementBlock[] = [];

  for (const child of node.children) {
    const el = await convertNodeFn(child, ctx, parentCtx);
    if (el) children.push(el);
  }

  if (children.length === 0) {
    return makeFallbackGroup(node, ctx);
  }

  const result: ElementBlock = {
    type: "elementGroup",
    id,
    section: {
      elementOrder: children.map((c) => String((c as Record<string, unknown>).id ?? "")),
      definitions: Object.fromEntries(
        children.map((c) => [String((c as Record<string, unknown>).id ?? ""), c])
      ),
    },
  };
  applyElementAnnotationProps(result, node, annotations, ctx.warnings);
  return result;
}
