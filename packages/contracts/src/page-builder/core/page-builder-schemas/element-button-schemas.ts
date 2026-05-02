import { z } from "zod";
import { elementLayoutSchema } from "./element-foundation-schemas";
import {
  referrerPolicySchema,
  responsiveStringSchema,
  themeStringSchema,
  triggerActionSchema,
} from "./schema-primitives";

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
  "setTheme",
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
    /**
     * Font family override. Use named slots to follow active foundations:
     * `"primary"` | `"secondary"` | `"mono"`.
     */
    fontFamily: z.string().optional(),
    wordWrap: z.boolean().optional(),
    vectorRef: z.string().optional(),
    href: z.string().optional(),
    external: z.boolean().optional(),
    target: z.enum(["_self", "_blank", "_parent", "_top"]).optional(),
    rel: z.string().optional(),
    download: z.union([z.boolean(), z.string()]).optional(),
    hreflang: z.string().optional(),
    ping: z.string().optional(),
    referrerPolicy: referrerPolicySchema.optional(),
    action: buttonActionSchema.optional(),
    actionPayload: z.unknown().optional(),
    linkDefault: themeStringSchema.optional(),
    linkHover: themeStringSchema.optional(),
    linkActive: themeStringSchema.optional(),
    linkDisabled: themeStringSchema.optional(),
    linkTransition: z.union([z.string(), z.number()]).optional(),
    disabled: z.boolean().optional(),
    loading: z.boolean().optional(),
    loadingLabel: z.string().optional(),
    wrapperFill: themeStringSchema.optional(),
    wrapperStroke: themeStringSchema.optional(),
    wrapperFillRef: z.string().optional(),
    wrapperStrokeRef: z.string().optional(),
    /** Border width in px when `wrapperStroke` draws a border (default 2 at runtime). */
    wrapperStrokeWidth: z.number().min(0).max(48).optional(),
    wrapperPadding: responsiveStringSchema.optional(),
    wrapperBorderRadius: responsiveStringSchema.optional(),
    /** Explicit width for the padded wrapper pill (e.g. "10rem", "100%"). */
    wrapperWidth: responsiveStringSchema.optional(),
    /** Explicit height for the padded wrapper pill (e.g. "2.75rem", "44px"). */
    wrapperHeight: responsiveStringSchema.optional(),
    /** Minimum width for the padded wrapper pill — useful for fixed-size icon buttons or glass. */
    wrapperMinWidth: responsiveStringSchema.optional(),
    /** Minimum height for the padded wrapper pill — sets a minimum tap target without fixed height. */
    wrapperMinHeight: responsiveStringSchema.optional(),
    /** Fill color on hover. Falls back to a subtle brightness shift if unset. */
    wrapperFillHover: themeStringSchema.optional(),
    /** Stroke/border color on hover. */
    wrapperStrokeHover: themeStringSchema.optional(),
    /** Fill color when pressed/active. */
    wrapperFillActive: themeStringSchema.optional(),
    /** Scale transform on hover (default 1). */
    wrapperScaleHover: z.number().optional(),
    /** Scale transform when pressed (e.g. 0.97). */
    wrapperScaleActive: z.number().optional(),
    /** Scale transform when disabled (default 1). */
    wrapperScaleDisabled: z.number().optional(),
    /** Opacity multiplier on hover (0–1). Stacks on top of hover fill. */
    wrapperOpacityHover: z.number().optional(),
    /** Fill color when disabled. */
    wrapperFillDisabled: themeStringSchema.optional(),
    /** CSS transition override for all wrapper state changes. */
    wrapperTransition: z.string().optional(),
    /**
     * Extra CSS custom properties applied on the interactive wrapper (keys must start with `--`).
     * Merged after built-in state vars so authors can override or add advanced tokens.
     */
    wrapperInteractionVars: z.record(z.string(), themeStringSchema).optional(),
    pointerDownAction: triggerActionSchema.optional(),
    pointerUpAction: triggerActionSchema.optional(),
  })
  .merge(elementLayoutSchema)
  // elementLayoutSchema has `action: z.string()` for generic element interactions.
  // .safeExtend() re-asserts the stricter buttonActionSchema enum after the merge overrides it.
  .safeExtend({ action: buttonActionSchema.optional() })
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
