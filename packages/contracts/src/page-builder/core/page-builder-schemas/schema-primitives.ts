import { z } from "zod";
import type { PageBuilderAction } from "../page-builder-types/trigger-action-types";

// Loose payload schema for 3D actions — the dispatcher does all real parsing at runtime.
// Intentionally z.record(z.string(), z.unknown()): these payloads carry heterogeneous numeric,
// string, boolean, and array values (e.g. position vectors, animation names, durations).
// Narrowing them to JsonValue would break vector fields like position: [x, y, z] (number[]).
const threePayload = z.record(z.string(), z.unknown()).optional();

// Loose payload schema for Rive actions — same pattern as threePayload.
// Intentionally loose: rive.setInput carries mixed boolean/number/string values per SM input type.
const rivePayload = z.record(z.string(), z.unknown()).optional();

// Loose payload schema for asset/media element actions (assetPlay, assetPause, videoFullscreen, etc.)
// Intentionally loose: the media dispatcher reads target id, time codes, and other heterogeneous fields.
const assetPayload = z.record(z.string(), z.unknown()).optional();

// Self-referential lazy stub — used in conditionalAction's then/else/branch fields.
// Typed as ZodTypeAny to break the circular inference cycle; runtime shape is identical
// to triggerActionSchema (they refer to the same object after initialisation).
const lazyTriggerAction: z.ZodTypeAny = z.lazy(() => triggerActionSchema);

// Recursive JSON value schema — mirrors the JsonValue type from core/lib/json-value.ts.
// Used in place of z.unknown() wherever a value must be JSON-serialisable.
export const jsonValueSchema: z.ZodType<import("../../../core/lib/json-value").JsonValue> = z.lazy(
  () =>
    z.union([
      z.string(),
      z.number(),
      z.boolean(),
      z.null(),
      z.array(jsonValueSchema),
      z.record(z.string(), jsonValueSchema),
    ])
);

const conditionOperatorEnum = z.enum([
  "equals",
  "notEquals",
  "gt",
  "gte",
  "lt",
  "lte",
  "contains",
  "startsWith",
]);

const variableConditionSchema = z.object({
  variable: z.string(),
  operator: conditionOperatorEnum,
  value: jsonValueSchema,
});

/** All trigger actions validated from section/content JSON, including 3D element actions. */
export const triggerActionSchema: z.ZodType<PageBuilderAction> = z.discriminatedUnion("type", [
  // Core actions
  z.object({
    type: z.literal("contentOverride"),
    payload: z.object({ key: z.string(), value: jsonValueSchema }),
  }),
  z.object({
    type: z.literal("backgroundSwitch"),
    payload: z.union([z.string(), z.record(z.string(), z.unknown())]),
  }),
  z.object({
    type: z.literal("startTransition"),
    payload: z.object({ id: z.string() }),
  }),
  z.object({
    type: z.literal("stopTransition"),
    payload: z.object({ id: z.string() }),
  }),
  z.object({
    type: z.literal("updateTransitionProgress"),
    payload: z.object({
      id: z.string(),
      progress: z.number().optional(),
      invert: z.boolean().optional(),
    }),
  }),
  // Navigation & Back
  z.object({ type: z.literal("back") }),
  z.object({
    type: z.literal("navigate"),
    payload: z.object({ href: z.string(), replace: z.boolean().optional() }),
  }),
  z.object({
    type: z.literal("scrollTo"),
    payload: z
      .object({
        id: z.string().optional(),
        offset: z.number().optional(),
        behavior: z.enum(["smooth", "instant"]).optional(),
        block: z.enum(["start", "center", "end", "nearest"]).optional(),
      })
      .optional(),
  }),
  z.object({
    type: z.literal("scrollLock"),
    payload: z.object({}).optional(),
  }),
  z.object({
    type: z.literal("scrollUnlock"),
    payload: z.object({}).optional(),
  }),
  // Modal
  z.object({ type: z.literal("modalOpen"), payload: z.object({ id: z.string() }) }),
  z.object({
    type: z.literal("modalClose"),
    payload: z.object({ id: z.string().optional() }).optional(),
  }),
  z.object({ type: z.literal("modalToggle"), payload: z.object({ id: z.string() }) }),
  // State & Logic
  z.object({
    type: z.literal("setVariable"),
    payload: z.object({ key: z.string(), value: jsonValueSchema }),
  }),
  z.object({
    type: z.literal("fireMultiple"),
    payload: z.object({
      actions: z.array(lazyTriggerAction),
      mode: z.enum(["parallel", "sequence"]).optional(),
      delayBetween: z.number().optional(),
    }),
  }),
  z.object({
    type: z.literal("conditionalAction"),
    payload: z.object({
      // Shorthand single-condition form (backward-compatible)
      variable: z.string().optional(),
      operator: conditionOperatorEnum.optional(),
      value: jsonValueSchema.optional(),
      // Multi-condition form
      conditions: z.array(variableConditionSchema).optional(),
      logic: z.enum(["and", "or"]).optional(),
      // Branches — lazyTriggerAction breaks the circular inference cycle
      then: lazyTriggerAction,
      elseIf: z
        .array(
          z.object({
            conditions: z.array(variableConditionSchema),
            logic: z.enum(["and", "or"]).optional(),
            then: lazyTriggerAction,
          })
        )
        .optional(),
      else: lazyTriggerAction.optional(),
    }),
  }),
  // Element visibility
  z.object({ type: z.literal("elementShow"), payload: z.object({ id: z.string() }) }),
  z.object({ type: z.literal("elementHide"), payload: z.object({ id: z.string() }) }),
  z.object({ type: z.literal("elementToggle"), payload: z.object({ id: z.string() }) }),
  // Media
  z.object({
    type: z.literal("playSound"),
    payload: z.object({
      src: z.string(),
      volume: z.number().optional(),
      loop: z.boolean().optional(),
    }),
  }),
  z.object({
    type: z.literal("stopSound"),
    payload: z.object({ src: z.string().optional() }).optional(),
  }),
  z.object({
    type: z.literal("setVolume"),
    payload: z.object({ volume: z.number(), id: z.string().optional() }),
  }),
  // Browser
  z.object({ type: z.literal("copyToClipboard"), payload: z.object({ text: z.string() }) }),
  z.object({
    type: z.literal("vibrate"),
    payload: z
      .object({ pattern: z.union([z.number(), z.array(z.number())]).optional() })
      .optional(),
  }),
  z.object({ type: z.literal("setDocumentTitle"), payload: z.object({ title: z.string() }) }),
  z.object({
    type: z.literal("openExternalUrl"),
    payload: z.object({ url: z.string(), target: z.string().optional() }),
  }),
  // Analytics
  z.object({
    type: z.literal("trackEvent"),
    payload: z.object({
      event: z.string(),
      properties: z.record(z.string(), jsonValueSchema).optional(),
    }),
  }),
  // Storage
  z.object({
    type: z.literal("setLocalStorage"),
    payload: z.object({ key: z.string(), value: jsonValueSchema }),
  }),
  z.object({
    type: z.literal("setSessionStorage"),
    payload: z.object({ key: z.string(), value: jsonValueSchema }),
  }),
  // 3D element actions
  z.object({ type: z.literal("three.load"), payload: threePayload }),
  z.object({ type: z.literal("three.unload"), payload: threePayload }),
  z.object({ type: z.literal("three.toggleLoaded"), payload: threePayload }),
  z.object({ type: z.literal("three.setVisibility"), payload: threePayload }),
  z.object({ type: z.literal("three.fadeIn"), payload: threePayload }),
  z.object({ type: z.literal("three.fadeOut"), payload: threePayload }),
  z.object({ type: z.literal("three.playAnimation"), payload: threePayload }),
  z.object({ type: z.literal("three.pauseAnimation"), payload: threePayload }),
  z.object({ type: z.literal("three.toggleAnimation"), payload: threePayload }),
  z.object({ type: z.literal("three.setAnimation"), payload: threePayload }),
  z.object({ type: z.literal("three.crossFadeAnimation"), payload: threePayload }),
  z.object({ type: z.literal("three.scrubAnimation"), payload: threePayload }),
  z.object({ type: z.literal("three.setCameraPreset"), payload: threePayload }),
  z.object({ type: z.literal("three.nextCameraPreset"), payload: threePayload }),
  z.object({ type: z.literal("three.resetCamera"), payload: threePayload }),
  z.object({ type: z.literal("three.playVideoTexture"), payload: threePayload }),
  z.object({ type: z.literal("three.pauseVideoTexture"), payload: threePayload }),
  z.object({ type: z.literal("three.toggleVideoTexture"), payload: threePayload }),
  z.object({ type: z.literal("three.setCameraEffectsPreset"), payload: threePayload }),
  // Transform actions
  z.object({ type: z.literal("three.setPosition"), payload: threePayload }),
  z.object({ type: z.literal("three.translateBy"), payload: threePayload }),
  z.object({ type: z.literal("three.setRotation"), payload: threePayload }),
  z.object({ type: z.literal("three.rotateBy"), payload: threePayload }),
  z.object({ type: z.literal("three.setScale"), payload: threePayload }),
  z.object({ type: z.literal("three.scaleBy"), payload: threePayload }),
  z.object({ type: z.literal("three.resetTransform"), payload: threePayload }),
  z.object({ type: z.literal("three.animateTo"), payload: threePayload }),
  // Continuous loop actions
  z.object({ type: z.literal("three.startContinuousRotate"), payload: threePayload }),
  z.object({ type: z.literal("three.stopContinuousRotate"), payload: threePayload }),
  z.object({ type: z.literal("three.startContinuousFloat"), payload: threePayload }),
  z.object({ type: z.literal("three.stopContinuousFloat"), payload: threePayload }),
  z.object({ type: z.literal("three.startContinuousScale"), payload: threePayload }),
  z.object({ type: z.literal("three.stopContinuousScale"), payload: threePayload }),
  // Camera extended
  z.object({ type: z.literal("three.animateCamera"), payload: threePayload }),
  z.object({ type: z.literal("three.orbitEnable"), payload: threePayload }),
  z.object({ type: z.literal("three.orbitDisable"), payload: threePayload }),
  // Material
  z.object({ type: z.literal("three.setMaterialColor"), payload: threePayload }),
  z.object({ type: z.literal("three.setMaterialOpacity"), payload: threePayload }),
  z.object({ type: z.literal("three.setEmissiveIntensity"), payload: threePayload }),
  // Scene
  z.object({ type: z.literal("three.setLightIntensity"), payload: threePayload }),
  z.object({ type: z.literal("three.setLightColor"), payload: threePayload }),
  // Post-processing
  z.object({ type: z.literal("three.setPostProcessingParam"), payload: threePayload }),
  z.object({ type: z.literal("three.togglePostEffect"), payload: threePayload }),
  // Asset / media element actions (video, audio controls targeting a specific element)
  z.object({ type: z.literal("assetPlay"), payload: assetPayload }),
  z.object({ type: z.literal("assetPause"), payload: assetPayload }),
  z.object({ type: z.literal("assetTogglePlay"), payload: assetPayload }),
  z.object({ type: z.literal("assetSeek"), payload: z.number().optional() }),
  z.object({ type: z.literal("assetMute"), payload: assetPayload }),
  z.object({ type: z.literal("videoFullscreen"), payload: assetPayload }),
  // Rive element actions
  z.object({ type: z.literal("rive.setInput"), payload: rivePayload }),
  z.object({ type: z.literal("rive.fireTrigger"), payload: rivePayload }),
  z.object({ type: z.literal("rive.play"), payload: rivePayload }),
  z.object({ type: z.literal("rive.pause"), payload: rivePayload }),
  z.object({ type: z.literal("rive.reset"), payload: rivePayload }),
]) as unknown as z.ZodType<PageBuilderAction>;

/** Inferred type from triggerActionSchema. Used for section JSON. */
export type CoreTriggerAction = z.infer<typeof triggerActionSchema>;

export const cssInlineStyleValueSchema = z.union([z.string(), z.number()]);
export const cssInlineStyleSchema = z.record(z.string(), cssInlineStyleValueSchema);

export const responsiveStringSchema = z.union([z.string(), z.tuple([z.string(), z.string()])]);

const sectionAlignEnum = z.enum(["left", "center", "right", "full"]);
export const responsiveSectionAlignSchema = z.union([
  sectionAlignEnum,
  z.tuple([sectionAlignEnum, sectionAlignEnum]),
]);

const elementAlignEnum = z.enum(["left", "center", "right"]);
export const responsiveElementAlignSchema = z.union([
  elementAlignEnum,
  z.tuple([elementAlignEnum, elementAlignEnum]),
]);

const elementAlignYEnum = z.enum(["top", "center", "bottom"]);
export const responsiveElementAlignYSchema = z.union([
  elementAlignYEnum,
  z.tuple([elementAlignYEnum, elementAlignYEnum]),
]);

export const elementTextAlignSchema = z.enum(["left", "right", "center", "justify"]);
export const responsiveTextAlignSchema = z.union([
  elementTextAlignSchema,
  z.tuple([elementTextAlignSchema, elementTextAlignSchema]),
]);

export const responsiveBooleanSchema = z
  .union([
    z.boolean(),
    z
      .object({
        mobile: z.boolean().optional(),
        desktop: z.boolean().optional(),
      })
      .refine((obj) => obj.mobile !== undefined || obj.desktop !== undefined, {
        message: "At least one of mobile or desktop boolean value must be provided",
      }),
  ])
  .optional();
