/**
 * Top-level FrameNode → SectionBlock converter.
 * Each top-level selected frame becomes one page-builder section.
 *
 * Routing:
 * - `[pb: type=sectionColumn]` or detected horizontal grid → sectionColumn
 * - `[pb: type=revealSection]` → revealSection
 * - Default → contentBlock
 */

import type { ContentBlock, ElementBlock } from "../types/page-builder";
import type { ConversionContext } from "../types/figma-plugin";
import { convertNode } from "./node-to-element";
import {
  extractLayoutProps,
  extractAutoLayoutProps,
  extractBorderProps,
  extractSectionPlacementFromParent,
} from "./layout";
import {
  extractBoxShadow,
  extractBackdropFilter,
  extractFilter,
  extractGlassEffect,
} from "./effects";
import { extractSectionFillPayload, exportImageFillAsset } from "./fills";
import { slugify, ensureUniqueId } from "../utils/slugify";
import { toPx } from "../utils/css";
import {
  parseAnnotations,
  stripAnnotations,
  findUnsupportedAnnotationKeys,
  SECTION_SUPPORTED_ANNOTATION_KEYS,
  SECTION_SUPPORTED_ANNOTATION_FAMILIES,
} from "./annotations-parse";
import { buildMotionTiming } from "./motion";
import { parseSectionTriggerProps } from "./section-triggers";
import { isColumnLayout, convertFrameToColumnSection } from "./section-column";
import { isRevealLayout, convertFrameToRevealSection } from "./section-reveal";
import { warnRepeatedStructuralSignatures } from "./structure-hints";
import { getInspectableBackgroundAsync } from "./node-css";

/**
 * Converts a top-level FrameNode to a page-builder section block.
 *
 * The section type is determined by annotations and auto-detection:
 * - `[pb: type=sectionColumn]` or horizontal multi-column frame → `sectionColumn`
 * - `[pb: type=revealSection]` → `revealSection`
 * - Otherwise → `contentBlock`
 *
 * For contentBlock sections:
 * - Frame direct children become the `elements` array.
 * - When the frame has auto-layout padding, a wrapper `elementGroup` is injected
 *   so padding is honoured without violating the section model.
 * - All `[pb:...]` trigger/effect annotations are applied via `parseSectionTriggerProps`.
 */
export async function convertFrameToSection(
  frame: FrameNode,
  ctx: ConversionContext
): Promise<ContentBlock> {
  // Parse annotations first — needed for type routing
  const annotations = parseAnnotations(frame.name || "");
  const unsupportedKeys = findUnsupportedAnnotationKeys(
    annotations,
    SECTION_SUPPORTED_ANNOTATION_KEYS,
    SECTION_SUPPORTED_ANNOTATION_FAMILIES
  );
  if (unsupportedKeys.length > 0) {
    ctx.warnings.push(
      `[annotations] frame "${frame.name || "section"}" has unsupported annotation key(s): ${unsupportedKeys.join(", ")}`
    );
  }

  // -------------------------------------------------------------------------
  // Section type routing
  // -------------------------------------------------------------------------
  const annotatedType = annotations["type"]?.toLowerCase();

  // When an explicit [pb: type=...] annotation is present it fully controls routing.
  // Auto-detection (isColumnLayout, isRevealLayout) is only applied when no type
  // annotation exists, so annotating [pb: type=contentBlock] suppresses the heuristics.
  const hasExplicitType = !!annotatedType;

  if (
    annotatedType === "sectioncolumn" ||
    (!hasExplicitType && isColumnLayout(frame, annotations))
  ) {
    return convertFrameToColumnSection(frame, ctx) as unknown as ContentBlock;
  }

  if (
    annotatedType === "revealsection" ||
    (!hasExplicitType && isRevealLayout(frame, annotations))
  ) {
    return convertFrameToRevealSection(frame, ctx) as unknown as ContentBlock;
  }

  // -------------------------------------------------------------------------
  // Default: contentBlock
  // -------------------------------------------------------------------------

  const layout = extractLayoutProps(frame);
  const autoLayout = extractAutoLayoutProps(frame);
  const sectionPlacement = extractSectionPlacementFromParent(frame);

  const effects = frame.effects;
  const boxShadow = extractBoxShadow(effects);
  const filter = extractFilter(effects);
  const backdropFilter = extractBackdropFilter(effects);
  const glassEffect = extractGlassEffect(effects, frame);
  const figmaEffects: unknown[] = glassEffect ? [glassEffect] : [];

  const fills = frame.fills as Paint[];
  let fillPayload = extractSectionFillPayload(fills, { width: frame.width, height: frame.height });
  const hasImageFill = fills.some((fill) => fill.type === "IMAGE" && fill.visible !== false);
  const inspectBackground = !hasImageFill ? await getInspectableBackgroundAsync(frame) : undefined;
  if (inspectBackground) {
    fillPayload = { fill: inspectBackground };
  }
  // Export image background fill as a named CDN asset (e.g. hero/bg.png)
  const bgImage = await exportImageFillAsset(frame, ctx);
  const borderProps = extractBorderProps(frame);

  // Convert all direct children to elements
  const elements: ElementBlock[] = [];
  for (const child of frame.children) {
    try {
      const converted = await convertNode(child, ctx);
      if (converted !== null) {
        elements.push(converted);
      }
    } catch (err) {
      ctx.warnings.push(
        `node-to-section: error converting child "${child.name}" in section "${frame.name}": ${String(err)}`
      );
    }
  }
  warnRepeatedStructuralSignatures(
    frame.name || "section",
    elements,
    ctx.warnings,
    "direct children",
    {
      suppress: ctx.autoPresets,
    }
  );

  const rawName = stripAnnotations(frame.name || "section");
  const sectionId = ensureUniqueId(slugify(rawName), ctx.usedIds);

  // Detect padding in autoLayout
  const autoLayoutRecord = autoLayout as Record<string, unknown>;
  const { paddingTop, paddingRight, paddingBottom, paddingLeft, padding, ...autoLayoutNoPadding } =
    autoLayoutRecord;

  const hasPadding =
    paddingTop !== undefined ||
    paddingRight !== undefined ||
    paddingBottom !== undefined ||
    paddingLeft !== undefined ||
    padding !== undefined;

  // Base section (fill, dimensions, effects, layout)
  const sectionBase: Record<string, unknown> = {
    type: "contentBlock",
    id: sectionId,
    elements: [], // filled below
    width: toPx(frame.width),
    height: toPx(frame.height),
    ...sectionPlacement,
    ...(fillPayload?.fill ? { fill: fillPayload.fill } : {}),
    ...(fillPayload?.layers ? { layers: fillPayload.layers } : {}),
    ...(bgImage ? { bgImage } : {}),
    ...borderProps,
    ...(boxShadow ? { boxShadow } : {}),
    ...(filter ? { filter } : {}),
    ...(backdropFilter ? { backdropFilter, WebkitBackdropFilter: backdropFilter } : {}),
    overflow: frame.clipsContent ? "hidden" : undefined,
    borderRadius: layout.borderRadius,
    ...(layout.opacity !== undefined ? { opacity: layout.opacity } : {}),
    ...(layout.blendMode ? { blendMode: layout.blendMode } : {}),
    ...(figmaEffects.length > 0 ? { effects: figmaEffects } : {}),
  };
  const section = sectionBase as unknown as ContentBlock;

  // -------------------------------------------------------------------------
  // Padding wrapping
  // When the frame has auto-layout padding, wrap elements in an elementGroup
  // that carries the padding + flex props. The section itself gets flex layout
  // without padding.
  // -------------------------------------------------------------------------
  if (hasPadding && frame.layoutMode !== "NONE") {
    const wrapperId = ensureUniqueId(slugify(rawName + "-inner"), ctx.usedIds);
    const innerDefinitions: Record<string, ElementBlock> = {};
    const innerOrder: string[] = [];

    for (const el of elements) {
      const elId = el.id as string | undefined;
      if (elId) {
        innerDefinitions[elId] = el;
        innerOrder.push(elId);
      }
    }

    const wrapperGroup: ElementBlock = {
      type: "elementGroup",
      id: wrapperId,
      width: "100%",
      // Full autoLayout WITH padding
      ...autoLayoutRecord,
      section: {
        elementOrder: innerOrder,
        definitions: innerDefinitions,
      },
    };

    // Section gets flex layout WITHOUT padding
    Object.assign(section, autoLayoutNoPadding);
    section.elements = [wrapperGroup];
  } else {
    // No padding (or no auto-layout) — spread layout without padding keys
    Object.assign(section, autoLayoutNoPadding);
    section.elements = elements;
  }

  // -------------------------------------------------------------------------
  // Annotation overrides (fill, overflow, hidden only — triggers handled below)
  // -------------------------------------------------------------------------
  if (annotations["fill"]) {
    sectionBase["fill"] = annotations["fill"];
    delete sectionBase["layers"];
  }
  if (annotations["overflow"]) sectionBase["overflow"] = annotations["overflow"];
  if (annotations["hidden"] === "true") sectionBase["hidden"] = true;

  // -------------------------------------------------------------------------
  // Trigger / effect / behavioural props
  // -------------------------------------------------------------------------
  const triggerProps = parseSectionTriggerProps(annotations);
  const mergedEffects = [
    ...figmaEffects,
    ...(Array.isArray(triggerProps.effects) ? triggerProps.effects : []),
  ];
  if (mergedEffects.length > 0) triggerProps.effects = mergedEffects;
  Object.assign(sectionBase, triggerProps);

  // -------------------------------------------------------------------------
  // Motion shorthand — entrance/exit/trigger/duration/delay/viewportAmount
  // -------------------------------------------------------------------------
  const motionTiming = buildMotionTiming(annotations);
  if (motionTiming) sectionBase["motionTiming"] = motionTiming;

  return section;
}
