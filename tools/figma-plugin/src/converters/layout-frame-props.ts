/**
 * Extracts universal layout props (size, opacity, rotation, radius, blend mode,
 * visibility, overflow, border) from any SceneNode.
 */

import type { LayoutProps } from "../types/page-builder";
import { figmaRadiusToCSS, toPx } from "../utils/css";
import { extractBorderProps } from "./layout-border";
import { resolveNumericVar, type BoundVarsMap } from "./layout-var-resolve";

/**
 * Extracts universal layout props from any SceneNode.
 * Width, height, opacity, rotation, cornerRadius, blend mode, etc.
 */
export function extractLayoutProps(node: SceneNode): LayoutProps {
  const props: LayoutProps = {};

  // Collect Figma variable bindings for numeric properties
  const boundVars = (node as unknown as { boundVariables?: BoundVarsMap }).boundVariables;

  // Sizing mode hints — when HUG or FILL, we skip fixed px values for that axis
  const sizingH = (node as unknown as { layoutSizingHorizontal?: string }).layoutSizingHorizontal;
  const sizingV = (node as unknown as { layoutSizingVertical?: string }).layoutSizingVertical;

  // Dimensions — map Figma sizing modes to CSS equivalents.
  // FIXED → explicit px (or variable).
  // HUG   → no width emitted (natural content size; group nodes handle this via extractAutoLayoutProps).
  // FILL  → "100%" (stretch to parent — same as extractAutoLayoutProps does for group nodes).
  //          For text nodes this is critical: without an explicit width the renderer has no width
  //          signal and the text will not wrap at the correct container width.
  if ("width" in node) {
    if (sizingH === "FILL") {
      props.width = "100%";
    } else if (sizingH !== "HUG") {
      const rw = resolveNumericVar(boundVars, "width", node.width, "px", node);
      props.width = typeof rw === "number" ? toPx(rw) : rw;
    }
  }
  if ("height" in node) {
    if (sizingV === "FILL") {
      props.height = "100%";
    } else if (sizingV !== "HUG") {
      const rh = resolveNumericVar(boundVars, "height", node.height, "px", node);
      props.height = typeof rh === "number" ? toPx(rh) : rh;
    }
  }

  // Opacity
  if ("opacity" in node && typeof node.opacity === "number" && node.opacity < 1) {
    props.opacity = parseFloat(node.opacity.toFixed(3));
  }

  // Rotation (Figma rotation is in degrees, clockwise)
  if ("rotation" in node && typeof node.rotation === "number" && node.rotation !== 0) {
    props.rotate = parseFloat(node.rotation.toFixed(2));
  }

  // Corner radius (only on applicable node types)
  if (
    node.type === "FRAME" ||
    node.type === "RECTANGLE" ||
    node.type === "COMPONENT" ||
    node.type === "INSTANCE"
  ) {
    const radius = node.cornerRadius;
    if (radius !== 0) {
      if (typeof radius === "number") {
        const rr = resolveNumericVar(boundVars, "cornerRadius", radius, "px", node);
        props.borderRadius = typeof rr === "number" ? toPx(rr) : rr;
      } else {
        props.borderRadius = figmaRadiusToCSS(
          node as RectangleNode | FrameNode | ComponentNode | InstanceNode
        );
      }
    }
  }

  // Blend mode
  if (
    "blendMode" in node &&
    node.blendMode &&
    node.blendMode !== "NORMAL" &&
    node.blendMode !== "PASS_THROUGH"
  ) {
    props.blendMode = figmaBlendModeToCSS(node.blendMode);
  }

  // Visibility
  if ("visible" in node && node.visible === false) {
    props.hidden = true;
  }

  // Overflow (frames)
  if ("clipsContent" in node) {
    props.overflow = node.clipsContent ? "hidden" : "visible";
  }

  // Border / stroke — merged into wrapperStyle for element-level nodes.
  const borders = extractBorderProps(node);
  if (Object.keys(borders).length > 0) {
    if (!props.wrapperStyle) props.wrapperStyle = {};
    if (borders.border) props.wrapperStyle["border"] = borders.border;
    if (borders.borderTop) props.wrapperStyle["borderTop"] = borders.borderTop;
    if (borders.borderRight) props.wrapperStyle["borderRight"] = borders.borderRight;
    if (borders.borderBottom) props.wrapperStyle["borderBottom"] = borders.borderBottom;
    if (borders.borderLeft) props.wrapperStyle["borderLeft"] = borders.borderLeft;
    if (borders.outline) props.wrapperStyle["outline"] = borders.outline;
  }

  return props;
}

/**
 * Extracts the CSS `align-self` value for a child node within an auto-layout parent.
 * Figma's `layoutAlign` property sets per-child cross-axis alignment.
 *
 * Returns undefined if the value is "INHERIT" or not set (uses parent's alignItems).
 */
export function extractChildLayoutAlign(node: SceneNode): string | undefined {
  const layoutAlign = (node as unknown as { layoutAlign?: string }).layoutAlign;
  if (!layoutAlign || layoutAlign === "INHERIT") return undefined;

  const map: Record<string, string> = {
    MIN: "flex-start",
    MAX: "flex-end",
    CENTER: "center",
    STRETCH: "stretch",
    BASELINE: "baseline",
  };
  return map[layoutAlign];
}

// ---------------------------------------------------------------------------
// Internal helpers
// ---------------------------------------------------------------------------

function figmaBlendModeToCSS(mode: BlendMode): string {
  const map: Partial<Record<BlendMode, string>> = {
    MULTIPLY: "multiply",
    SCREEN: "screen",
    OVERLAY: "overlay",
    DARKEN: "darken",
    LIGHTEN: "lighten",
    COLOR_DODGE: "color-dodge",
    COLOR_BURN: "color-burn",
    HARD_LIGHT: "hard-light",
    SOFT_LIGHT: "soft-light",
    DIFFERENCE: "difference",
    EXCLUSION: "exclusion",
    HUE: "hue",
    SATURATION: "saturation",
    COLOR: "color",
    LUMINOSITY: "luminosity",
  };
  return map[mode] ?? "normal";
}
