import * as THREE from "three";
import type { VideoTextureOptions } from "./video-texture-types";

export function createVideoTexture(
  videoEl: HTMLVideoElement,
  options: VideoTextureOptions = {}
): THREE.VideoTexture {
  const texture = new THREE.VideoTexture(videoEl);
  configureTexture(texture, options);
  return texture;
}

export function configureTexture(
  texture: THREE.VideoTexture,
  options: VideoTextureOptions = {}
): void {
  const { sharpText = false, useAsAlphaMap = false } = options;
  texture.generateMipmaps = false;
  texture.minFilter = sharpText ? THREE.NearestFilter : THREE.LinearFilter;
  texture.magFilter = sharpText ? THREE.NearestFilter : THREE.LinearFilter;
  texture.flipY = false;
  texture.colorSpace = useAsAlphaMap ? THREE.NoColorSpace : THREE.SRGBColorSpace;
  texture.format = THREE.RGBAFormat;
}

export function disposeTexture(texture: THREE.VideoTexture | null): void {
  if (texture) texture.dispose();
}

export function buildVideoTextureUrl(videoPath: string, version?: string | number): string {
  const isDataUrl = videoPath.startsWith("data:");
  if (isDataUrl) return videoPath;

  const hasQuery = videoPath.includes("?");
  if (version !== undefined) {
    return `${videoPath}${hasQuery ? "&" : "?"}v=${version}`;
  }
  return hasQuery ? `${videoPath}&t=${Date.now()}` : `${videoPath}?t=${Date.now()}`;
}

export function getVideoCrossOrigin(finalUrl: string): "" | "anonymous" {
  const isSameOrigin =
    finalUrl.startsWith("data:") ||
    finalUrl.startsWith("/") ||
    (typeof window !== "undefined" && finalUrl.startsWith(window.location.origin));
  return isSameOrigin ? "" : "anonymous";
}
