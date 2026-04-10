import { z } from "zod";
import { elementLayoutSchema } from "./element-foundation-schemas";
import { triggerActionSchema } from "./schema-primitives";

export const buttonActionSchema = z.enum([
  "assetPlay",
  "assetPause",
  "assetTogglePlay",
  "assetSeek",
  "assetMute",
  "videoFullscreen",
  "three.load",
  "three.unload",
  "three.toggleLoaded",
  "three.setVisibility",
  "three.fadeIn",
  "three.fadeOut",
  "three.playAnimation",
  "three.pauseAnimation",
  "three.toggleAnimation",
  "three.setAnimation",
  "three.setCameraPreset",
  "three.nextCameraPreset",
  "three.resetCamera",
  "three.playVideoTexture",
  "three.pauseVideoTexture",
  "three.toggleVideoTexture",
  "three.setCameraEffectsPreset",
  "three.crossFadeAnimation",
  "three.scrubAnimation",
  "three.setPosition",
  "three.translateBy",
  "three.setRotation",
  "three.rotateBy",
  "three.setScale",
  "three.scaleBy",
  "three.resetTransform",
  "three.animateTo",
  "three.startContinuousRotate",
  "three.stopContinuousRotate",
  "three.startContinuousFloat",
  "three.stopContinuousFloat",
  "three.startContinuousScale",
  "three.stopContinuousScale",
  "three.animateCamera",
  "three.orbitEnable",
  "three.orbitDisable",
  "three.setMaterialColor",
  "three.setMaterialOpacity",
  "three.setEmissiveIntensity",
  "three.setLightIntensity",
  "three.setLightColor",
  "three.setPostProcessingParam",
  "three.togglePostEffect",
  "navigate",
  "back",
  "scrollTo",
  "scrollLock",
  "scrollUnlock",
  "contentOverride",
  "modalOpen",
  "modalClose",
  "modalToggle",
  "setVariable",
  "fireMultiple",
  "conditionalAction",
  "elementShow",
  "elementHide",
  "elementToggle",
  "playSound",
  "stopSound",
  "setVolume",
  "copyToClipboard",
  "vibrate",
  "setDocumentTitle",
  "openExternalUrl",
  "trackEvent",
  "setLocalStorage",
  "setSessionStorage",
  "rive.setInput",
  "rive.fireTrigger",
  "rive.play",
  "rive.pause",
  "rive.reset",
]);
export type ButtonAction = z.infer<typeof buttonActionSchema>;

export function parseButtonAction(value: string | undefined): ButtonAction | undefined {
  if (value == null || value === "") return undefined;
  const result = buttonActionSchema.safeParse(value);
  return result.success ? result.data : undefined;
}

export const elementButtonSchema = z
  .object({
    type: z.literal("elementButton"),
    /** Preset key for `pbBuilderDefaultsV1.elements.button` variant templates. */
    variant: z.enum(["default", "accent", "ghost", "text"]).optional(),
    label: z.string().optional(),
    copyType: z.enum(["heading", "body"]).optional(),
    level: z
      .union([z.literal(1), z.literal(2), z.literal(3), z.literal(4), z.literal(5), z.literal(6)])
      .optional(),
    wordWrap: z.boolean().optional(),
    vectorRef: z.string().optional(),
    href: z.string().optional(),
    external: z.boolean().optional(),
    action: buttonActionSchema.optional(),
    actionPayload: z.unknown().optional(),
    linkDefault: z.string().optional(),
    linkHover: z.string().optional(),
    linkActive: z.string().optional(),
    linkDisabled: z.string().optional(),
    linkTransition: z.union([z.string(), z.number()]).optional(),
    disabled: z.boolean().optional(),
    loading: z.boolean().optional(),
    loadingLabel: z.string().optional(),
    wrapperFill: z.string().optional(),
    wrapperStroke: z.string().optional(),
    wrapperFillRef: z.string().optional(),
    wrapperStrokeRef: z.string().optional(),
    wrapperPadding: z.string().optional(),
    wrapperBorderRadius: z.string().optional(),
    pointerDownAction: triggerActionSchema.optional(),
    pointerUpAction: triggerActionSchema.optional(),
  })
  .merge(elementLayoutSchema)
  // elementLayoutSchema has `action: z.string()` for generic element interactions.
  // .extend() re-asserts the stricter buttonActionSchema enum after the merge overrides it.
  .extend({ action: buttonActionSchema.optional() })
  .refine(
    (data) => {
      const hasLink = data.href != null && data.href !== "";
      const hasAction = data.action != null;
      return !hasLink || !hasAction;
    },
    {
      message: "elementButton: use either href (link) or action (button function), not both",
      path: ["href"],
    }
  );
