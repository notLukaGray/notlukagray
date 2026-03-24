/**
 * Converts frame nodes to sectionColumn page-builder section blocks.
 */

import type { ElementBlock } from "../types/page-builder";
import type { ConversionContext } from "../types/figma-plugin";
import { convertNode } from "./node-to-element";
import { extractSectionFillPayload } from "./fills-image";
import {
  extractAutoLayoutProps,
  extractLayoutProps,
  extractBorderProps,
  extractSectionPlacementFromParent,
} from "./layout";
import { extractColumnGrid, snapToColumn, type ColumnGridInfo } from "./layout-grid";
import {
  extractBoxShadow,
  extractFilter,
  extractBackdropFilter,
  extractGlassEffect,
} from "./effects";
import { slugify, ensureUniqueId } from "../utils/slugify";
import { toPx } from "../utils/css";
import { parseAnnotations, stripAnnotations } from "./annotations-parse";
import { parseSectionTriggerProps } from "./section-triggers";
import { getVisibleChildren, warnRepeatedStructuralSignatures } from "./structure-hints";
import { getInspectableBackgroundAsync } from "./node-css";

function isColumnContainer(
  node: SceneNode
): node is FrameNode | GroupNode | ComponentNode | InstanceNode {
  return (
    node.type === "FRAME" ||
    node.type === "GROUP" ||
    node.type === "COMPONENT" ||
    node.type === "INSTANCE"
  );
}

/**
 * Minimal representation of a sectionColumn section block as emitted by this converter.
 */
export interface SectionColumnBlock {
  type: "sectionColumn";
  id: string;
  elements: ElementBlock[];
  columns: number;
  columnAssignments: Record<string, number>;
  columnWidths?: string[];
  columnGaps?: string;
  elementOrder?: string[];
  fill?: string;
  width?: string;
  height?: string;
  overflow?: string;
  borderRadius?: string;
  [key: string]: unknown;
}

/**
 * Converts a frame with a Figma COLUMN layout grid to a sectionColumn block.
 */
async function convertGridFrameToColumnSection(
  frame: FrameNode,
  ctx: ConversionContext,
  grid: ColumnGridInfo
): Promise<SectionColumnBlock> {
  const rawName = stripAnnotations(frame.name || "");
  const id = ensureUniqueId(slugify(rawName || "section"), ctx.usedIds);
  const annotations = parseAnnotations(frame.name || "");

  const elements: ElementBlock[] = [];
  const columnAssignments: Record<string, number> = {};
  const elementOrder: string[] = [];

  const children =
    "children" in frame ? (frame as unknown as { children: SceneNode[] }).children : [];

  const visibleChildren = getVisibleChildren(children);
  const columnChildren = visibleChildren.filter(isColumnContainer);
  const inferImplicitColumns =
    columnChildren.length === 0 && visibleChildren.length >= 2 && frame.layoutMode === "HORIZONTAL";
  const implicitColumnOrder = inferImplicitColumns
    ? [...visibleChildren].sort((a, b) => ("x" in a ? a.x : 0) - ("x" in b ? b.x : 0))
    : [];
  const implicitColumnIndex = new Map<SceneNode, number>();
  implicitColumnOrder.forEach((child, index) => implicitColumnIndex.set(child, index + 1));

  for (const child of visibleChildren) {
    if (isColumnContainer(child)) {
      const colIdx = columnChildren.indexOf(child);
      const colChildren = "children" in child ? (child.children as readonly SceneNode[]) : [];

      for (const subChild of colChildren) {
        try {
          const el = await convertNode(subChild, ctx, {
            layoutMode: "NONE",
            parentWidth: frame.width,
            parentHeight: frame.height,
          });
          if (!el) continue;

          const elId = String((el as Record<string, unknown>)["id"] ?? "");
          if (!elId) continue;

          elements.push(el);
          elementOrder.push(elId);
          columnAssignments[elId] = colIdx + 1;
        } catch (err) {
          ctx.warnings.push(
            `section-column (grid): error converting child "${subChild.name}" in column ${colIdx + 1}: ${String(err)}`
          );
        }
      }
      continue;
    }

    let el: ElementBlock | null = null;
    try {
      el = await convertNode(child, ctx, {
        layoutMode: "NONE",
        parentWidth: frame.width,
        parentHeight: frame.height,
      });
    } catch (err) {
      ctx.warnings.push(
        `section-column (grid): error converting child "${child.name}": ${String(err)}`
      );
      continue;
    }
    if (!el) continue;

    const elId = String((el as Record<string, unknown>)["id"] ?? "");
    if (!elId) continue;

    elements.push(el);
    elementOrder.push(elId);

    if (inferImplicitColumns) {
      columnAssignments[elId] = implicitColumnIndex.get(child) ?? 1;
    } else {
      const childX = "x" in child ? (child as { x: number }).x : 0;
      const childWidth = "width" in child ? (child as { width: number }).width : grid.columnWidthPx;
      const { column } = snapToColumn(childX, childWidth, grid);
      columnAssignments[elId] = column;
    }
  }

  const columnWidths: string[] = inferImplicitColumns
    ? Array(visibleChildren.length).fill("1fr")
    : Array<string>(grid.count).fill("1fr");

  const section: SectionColumnBlock = {
    type: "sectionColumn",
    id,
    elements,
    columns: inferImplicitColumns ? visibleChildren.length : grid.count,
    columnAssignments,
    columnWidths,
    columnGaps: `${grid.gutterPx}px`,
    ...(elementOrder.length > 0 ? { elementOrder } : {}),
  };

  let fillPayload = extractSectionFillPayload(frame.fills as readonly Paint[], {
    width: frame.width,
    height: frame.height,
  });
  const hasImageFillTop = (frame.fills as readonly Paint[]).some(
    (fill) => fill.type === "IMAGE" && fill.visible !== false
  );
  const inspectBackgroundTop = !hasImageFillTop
    ? await getInspectableBackgroundAsync(frame)
    : undefined;
  if (inspectBackgroundTop) {
    fillPayload = { fill: inspectBackgroundTop };
  }
  if (fillPayload?.fill) section.fill = fillPayload.fill;
  if (fillPayload?.layers) (section as Record<string, unknown>).layers = fillPayload.layers;

  const borderRadius = extractLayoutProps(frame).borderRadius;
  if (borderRadius) (section as Record<string, unknown>)["borderRadius"] = borderRadius;

  const boxShadow = extractBoxShadow(frame.effects);
  if (boxShadow) section.boxShadow = boxShadow;
  const filter = extractFilter(frame.effects);
  if (filter) section.filter = filter;
  const backdropFilter = extractBackdropFilter(frame.effects);
  if (backdropFilter) {
    section.backdropFilter = backdropFilter;
    (section as Record<string, unknown>).WebkitBackdropFilter = backdropFilter;
  }
  const glassEffect = extractGlassEffect(frame.effects, frame);
  const figmaEffects: unknown[] = glassEffect ? [glassEffect] : [];
  if (figmaEffects.length > 0) (section as Record<string, unknown>).effects = figmaEffects;

  section.width = `${Math.round(frame.width)}px`;

  const triggerProps = parseSectionTriggerProps(annotations);
  const mergedEffects = [
    ...figmaEffects,
    ...(Array.isArray(triggerProps.effects) ? triggerProps.effects : []),
  ];
  if (mergedEffects.length > 0) triggerProps.effects = mergedEffects;
  Object.assign(section, triggerProps);

  warnRepeatedStructuralSignatures(frame.name || rawName, elements, ctx.warnings, "children", {
    suppress: ctx.autoPresets,
  });

  return section;
}

/**
 * Converts a horizontal Figma frame to a `sectionColumn` page-builder section.
 */
export async function convertFrameToColumnSection(
  frame: FrameNode,
  ctx: ConversionContext
): Promise<SectionColumnBlock> {
  // Grid-based conversion for frames with layout grids but no auto-layout
  if ((frame.layoutMode === "NONE" || !("layoutMode" in frame)) && "width" in frame) {
    const grid = extractColumnGrid(frame, frame.width);
    if (grid && grid.count >= 2) {
      return convertGridFrameToColumnSection(frame, ctx, grid);
    }
  }

  const annotations = parseAnnotations(frame.name || "");
  const rawName = stripAnnotations(frame.name || "section");
  const sectionId = ensureUniqueId(slugify(rawName), ctx.usedIds);

  const elements: ElementBlock[] = [];
  const columnAssignments: Record<string, number> = {};
  const elementOrder: string[] = [];

  const visibleChildren = (frame.children as readonly SceneNode[]).filter(
    (child) => (child as { visible?: boolean }).visible !== false
  );
  const columnChildren = visibleChildren.filter(isColumnContainer);
  const looseChildren = visibleChildren.filter((child) => !isColumnContainer(child));
  const inferImplicitColumns =
    columnChildren.length === 0 && visibleChildren.length >= 2 && frame.layoutMode === "HORIZONTAL";
  const columnIndexByNode = new Map<FrameNode | GroupNode | ComponentNode | InstanceNode, number>();
  const columnCenters = columnChildren.map((colFrame, index) => {
    columnIndexByNode.set(colFrame, index);
    const x = "x" in colFrame ? colFrame.x : 0;
    const width = "width" in colFrame ? colFrame.width : 0;
    return x + width / 2;
  });

  const assignLooseChildToColumn = (child: SceneNode): number => {
    if (columnCenters.length === 0) {
      return inferImplicitColumns ? visibleChildren.indexOf(child) + 1 || 1 : 1;
    }

    const childX = "x" in child ? (child as { x: number }).x : 0;
    const childWidth = "width" in child ? (child as { width: number }).width : 0;
    const childCenter = childX + childWidth / 2;

    let nearestIndex = 0;
    let nearestDistance = Number.POSITIVE_INFINITY;
    for (let index = 0; index < columnCenters.length; index++) {
      const distance = Math.abs(columnCenters[index] - childCenter);
      if (distance < nearestDistance) {
        nearestDistance = distance;
        nearestIndex = index;
      }
    }
    return nearestIndex + 1;
  };

  for (const child of visibleChildren) {
    if (isColumnContainer(child)) {
      const colIdx = columnIndexByNode.get(child) ?? 0;
      const colChildren = "children" in child ? (child.children as readonly SceneNode[]) : [];

      for (const subChild of colChildren) {
        try {
          const converted = await convertNode(subChild, ctx);
          if (converted !== null) {
            const elId = converted.id as string | undefined;
            if (elId) {
              columnAssignments[elId] = colIdx + 1;
              elementOrder.push(elId);
            }
            elements.push(converted);
          }
        } catch (err) {
          ctx.warnings.push(
            `section-column: error converting child "${subChild.name}" in column ${colIdx + 1}: ${String(err)}`
          );
        }
      }
      continue;
    }

    try {
      const converted = await convertNode(child, ctx);
      if (converted !== null) {
        const elId = converted.id as string | undefined;
        if (elId) {
          columnAssignments[elId] = assignLooseChildToColumn(child);
          elementOrder.push(elId);
        }
        elements.push(converted);
      }
    } catch (err) {
      ctx.warnings.push(
        `section-column: error converting loose child "${child.name}": ${String(err)}`
      );
    }
  }

  const allColumnWidths = columnChildren.map((c) =>
    "width" in c ? (c as { width: number }).width : 0
  );
  const allEqual =
    allColumnWidths.length > 0 &&
    allColumnWidths.every((w) => Math.abs(w - allColumnWidths[0]) < 1);
  const columnCount = inferImplicitColumns
    ? visibleChildren.length
    : Math.max(columnChildren.length, 1);
  const columnWidths: string[] = inferImplicitColumns
    ? Array(columnCount).fill("1fr")
    : allColumnWidths.length === 0
      ? Array(columnCount).fill("1fr")
      : allEqual
        ? Array(columnCount).fill("1fr")
        : allColumnWidths.map((w) => toPx(w));

  const columnGaps: string | undefined =
    frame.itemSpacing > 0 ? toPx(frame.itemSpacing) : undefined;

  const layout = extractLayoutProps(frame);
  const autoLayout = extractAutoLayoutProps(frame);
  const sectionPlacement = extractSectionPlacementFromParent(frame);
  const fills = frame.fills as Paint[];
  let fillPayload = extractSectionFillPayload(fills, { width: frame.width, height: frame.height });
  const hasImageFill = fills.some((fill) => fill.type === "IMAGE" && fill.visible !== false);
  const inspectBackground = !hasImageFill ? await getInspectableBackgroundAsync(frame) : undefined;
  if (inspectBackground) {
    fillPayload = { fill: inspectBackground };
  }
  const borderProps = extractBorderProps(frame);
  const effects = frame.effects;
  const boxShadow = extractBoxShadow(effects);
  const filter = extractFilter(effects);
  const backdropFilter = extractBackdropFilter(effects);
  const glassEffect = extractGlassEffect(effects, frame);
  const figmaEffects: unknown[] = glassEffect ? [glassEffect] : [];

  const { paddingTop, paddingRight, paddingBottom, paddingLeft, padding, ...autoLayoutNoPadding } =
    autoLayout as Record<string, unknown>;
  void paddingTop;
  void paddingRight;
  void paddingBottom;
  void paddingLeft;
  void padding;

  const sectionRecord: Record<string, unknown> = {
    type: "sectionColumn",
    id: sectionId,
    elements,
    columns: columnCount,
    columnAssignments,
    ...(columnWidths.length > 0 ? { columnWidths } : {}),
    ...(columnGaps !== undefined ? { columnGaps } : {}),
    ...(elementOrder.length > 0 ? { elementOrder } : {}),
    width: toPx(frame.width),
    height: toPx(frame.height),
    ...sectionPlacement,
    ...(fillPayload?.fill ? { fill: fillPayload.fill } : {}),
    ...(fillPayload?.layers ? { layers: fillPayload.layers } : {}),
    ...borderProps,
    ...(boxShadow ? { boxShadow } : {}),
    ...(filter ? { filter } : {}),
    ...(backdropFilter ? { backdropFilter, WebkitBackdropFilter: backdropFilter } : {}),
    ...autoLayoutNoPadding,
    overflow: frame.clipsContent ? "hidden" : undefined,
    ...(layout.borderRadius !== undefined ? { borderRadius: layout.borderRadius } : {}),
    ...(layout.opacity !== undefined ? { opacity: layout.opacity } : {}),
    ...(layout.blendMode ? { blendMode: layout.blendMode } : {}),
    ...(figmaEffects.length > 0 ? { effects: figmaEffects } : {}),
  };
  const section = sectionRecord as unknown as SectionColumnBlock;

  if (annotations["fill"]) {
    section.fill = annotations["fill"];
    delete (section as Record<string, unknown>).layers;
  }
  if (annotations["overflow"]) section.overflow = annotations["overflow"];
  if (annotations["hidden"] === "true") section.hidden = true;

  const triggerProps = parseSectionTriggerProps(annotations);
  const mergedEffects = [
    ...figmaEffects,
    ...(Array.isArray(triggerProps.effects) ? triggerProps.effects : []),
  ];
  if (mergedEffects.length > 0) triggerProps.effects = mergedEffects;
  Object.assign(section, triggerProps);

  warnRepeatedStructuralSignatures(frame.name || rawName, elements, ctx.warnings, "children", {
    suppress: ctx.autoPresets,
  });

  if (inferImplicitColumns) {
    ctx.warnings.push(
      `section-column: frame "${frame.name || rawName}" inferred ${columnCount} implicit column${columnCount === 1 ? "" : "s"} from horizontal layout; add explicit column wrappers or [pb: type=sectionColumn] to lock the structure`
    );
  } else if (
    looseChildren.length > 0 ||
    (columnChildren.length === 0 && visibleChildren.length > 0)
  ) {
    ctx.warnings.push(
      `section-column: frame "${frame.name || rawName}" used fallback column assignment for mixed/invalid direct children; loose nodes were mapped to the nearest column and a single fallback column was created when needed`
    );
  }

  return section;
}
