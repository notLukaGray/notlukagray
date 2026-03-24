/**
 * Video node detection: heuristics for identifying video-like SceneNodes.
 */

import { extractComponentProps } from "./component-props";

/**
 * Returns true if the fills array contains a Figma-native VIDEO fill paint.
 */
export function hasVideoFill(fills: readonly Paint[]): boolean {
  return fills.some((f) => f.visible !== false && (f as Paint & { type: string }).type === "VIDEO");
}

/**
 * Returns true if a node should be treated as an `elementVideo`.
 *
 * Detection rules (any of):
 * 1. `[pb: type=elementVideo]` or `[pb: type=video]` annotation
 * 2. Has a Figma-native VIDEO fill
 * 3. Node name starts with "video" or "vid-" (case-insensitive)
 * 4. INSTANCE whose component property `src` points to a video URL
 */
export function isVideoNode(node: SceneNode, annotations: Record<string, string>): boolean {
  if (annotations.type === "elementVideo" || annotations.type === "video") return true;

  if ("fills" in node) {
    const fills = (node as SceneNode & { fills?: readonly Paint[] }).fills;
    if (fills && hasVideoFill(fills)) return true;
  }

  const name = (node.name || "").toLowerCase();
  if (name.startsWith("video") || name.startsWith("vid-")) return true;

  if (node.type === "INSTANCE") {
    const props = extractComponentProps(node as InstanceNode);
    if (props.src && /\.(mp4|webm|mov|ogg)(\?|$)/i.test(props.src)) return true;
  }

  return false;
}
