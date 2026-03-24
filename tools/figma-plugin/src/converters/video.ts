/**
 * Video conversion barrel.
 * Implementation split across:
 *   video-detect.ts  — isVideoNode, hasVideoFill
 *   video-convert.ts — convertVideoNode
 */

export { hasVideoFill, isVideoNode } from "./video-detect";
export { convertVideoNode } from "./video-convert";
