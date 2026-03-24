"use client";

import { Suspense, useMemo } from "react";
import { Canvas } from "@react-three/fiber";
import { SceneContent } from "./model3d-scene-content";
import type { Block } from "./model3d-types";
import type {
  Model3DAnimationCommand,
  Model3DCameraCommand,
  Model3DVideoTextureCommand,
  Model3DTransformCommand,
  Model3DMaterialCommand,
  Model3DSceneCommand,
  Model3DPostProcessingCommand,
} from "./model3d-controls";

export function Model3DScene({
  block,
  animationCommand,
  cameraCommand,
  videoTextureCommand,
  transformCommand,
  materialCommand,
  sceneCommand,
  postProcessingCommand,
  onNavigate,
  onReady,
}: {
  block: Block;
  animationCommand: Model3DAnimationCommand | null;
  cameraCommand: Model3DCameraCommand | null;
  videoTextureCommand: Model3DVideoTextureCommand | null;
  transformCommand: Model3DTransformCommand | null;
  materialCommand: Model3DMaterialCommand | null;
  sceneCommand: Model3DSceneCommand | null;
  postProcessingCommand: Model3DPostProcessingCommand | null;
  onNavigate?: (href: string) => void;
  onReady?: () => void;
}) {
  const dpr = block.canvas?.dpr ?? 1.5;
  const glOpts = block.canvas?.gl ?? {};
  const dprArr = useMemo(() => [1, Math.min(dpr, 2)] as [number, number], [dpr]);

  return (
    <Canvas
      dpr={dprArr}
      gl={{
        antialias: glOpts.antialias ?? true,
        powerPreference: glOpts.powerPreference ?? "high-performance",
        alpha: glOpts.alpha ?? true,
      }}
      camera={{ position: [0, 0, 1], fov: 50 }}
    >
      <Suspense fallback={null}>
        <SceneContent
          block={block}
          animationCommand={animationCommand}
          cameraCommand={cameraCommand}
          videoTextureCommand={videoTextureCommand}
          transformCommand={transformCommand}
          materialCommand={materialCommand}
          sceneCommand={sceneCommand}
          postProcessingCommand={postProcessingCommand}
          onNavigate={onNavigate}
          onReady={onReady}
        />
      </Suspense>
    </Canvas>
  );
}
