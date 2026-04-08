import type { bgBlock } from "./background-block-types";
import type {
  ConditionOperator,
  VariableCondition,
  VisibleWhenConfig,
} from "../page-builder-condition-evaluator";
import type { JsonValue, JsonPrimitive } from "./json-value";

export type { ConditionOperator, VariableCondition, VisibleWhenConfig };

export const OVERRIDE_KEY_BG = "bg" as const;

export type ContentOverrideAction = {
  type: "contentOverride";
  payload: { key: string; value: JsonValue };
};

export type BackgroundSwitchAction = {
  type: "backgroundSwitch";
  payload: bgBlock | string | Record<string, unknown>;
};

export type StartTransitionAction = {
  type: "startTransition";
  payload: { id: string };
};

export type StopTransitionAction = {
  type: "stopTransition";
  payload: { id: string };
};

export type UpdateTransitionProgressAction = {
  type: "updateTransitionProgress";
  payload: { id: string; progress?: number; invert?: boolean };
};

export interface BackAction {
  type: "back";
  payload?: Record<string, never>;
}

// --- Navigation & Scroll ---
/** payload.href: string; payload.replace?: boolean — uses Next.js router push/replace */
export type NavigateAction = { type: "navigate"; payload: { href: string; replace?: boolean } };
/** payload.id?: string (element id); payload.offset?: number (px); payload.behavior?: "smooth"|"instant"; payload.block?: "start"|"center"|"end"|"nearest" */
export type ScrollToAction = {
  type: "scrollTo";
  payload?: {
    id?: string;
    offset?: number;
    behavior?: "smooth" | "instant";
    block?: ScrollLogicalPosition;
  };
};
/** Locks body scroll (overflow: hidden) */
export type ScrollLockAction = { type: "scrollLock"; payload?: Record<string, never> };
/** Restores body scroll */
export type ScrollUnlockAction = { type: "scrollUnlock"; payload?: Record<string, never> };

// --- Modal ---
/** payload.id: string — opens modal by id */
export type ModalOpenAction = { type: "modalOpen"; payload: { id: string } };
/** payload.id?: string — closes specific modal or topmost if omitted */
export type ModalCloseAction = { type: "modalClose"; payload?: { id?: string } };
/** payload.id: string — toggles modal by id */
export type ModalToggleAction = { type: "modalToggle"; payload: { id: string } };

// --- State & Logic ---
/** payload.key: string; payload.value: JsonValue — sets a named runtime variable */
export type SetVariableAction = { type: "setVariable"; payload: { key: string; value: JsonValue } };
/** payload.actions: TriggerAction[]; payload.mode?: "parallel"|"sequence"; payload.delayBetween?: number (ms, sequence only) */
export type FireMultipleAction = {
  type: "fireMultiple";
  payload: { actions: PageBuilderAction[]; mode?: "parallel" | "sequence"; delayBetween?: number };
};
export interface ConditionalBranch {
  conditions: VariableCondition[];
  logic?: "and" | "or";
  then: PageBuilderAction;
}

export interface ConditionalActionPayload {
  // Shorthand: single condition — backward-compatible with the old schema
  variable?: string;
  operator?: ConditionOperator;
  value?: JsonPrimitive;
  // Multi-condition alternative to shorthand
  conditions?: VariableCondition[];
  logic?: "and" | "or";

  then: PageBuilderAction;
  elseIf?: ConditionalBranch[];
  else?: PageBuilderAction;
}

export type ConditionalAction = {
  type: "conditionalAction";
  payload: ConditionalActionPayload;
};

// --- Element Visibility ---
/** payload.id: string — shows a 2D element by id */
export type ElementShowAction = { type: "elementShow"; payload: { id: string } };
/** payload.id: string — hides a 2D element by id */
export type ElementHideAction = { type: "elementHide"; payload: { id: string } };
/** payload.id: string — toggles 2D element visibility */
export type ElementToggleAction = { type: "elementToggle"; payload: { id: string } };

// --- Media ---
/** payload.src: string (url); payload.volume?: number 0–1; payload.loop?: boolean */
export type PlaySoundAction = {
  type: "playSound";
  payload: { src: string; volume?: number; loop?: boolean };
};
/** payload.src?: string — stops specific src or all if omitted */
export type StopSoundAction = { type: "stopSound"; payload?: { src?: string } };
/** payload.id?: string (element id); payload.volume: number 0–1 */
export type SetVolumeAction = { type: "setVolume"; payload: { volume: number; id?: string } };

// --- Browser / Device ---
/** payload.text: string — copies to clipboard */
export type CopyToClipboardAction = { type: "copyToClipboard"; payload: { text: string } };
/** payload.pattern?: number | number[] — navigator.vibrate pattern */
export type VibrateAction = { type: "vibrate"; payload?: { pattern?: number | number[] } };
/** payload.title: string */
export type SetDocumentTitleAction = { type: "setDocumentTitle"; payload: { title: string } };
/** payload.url: string; payload.target?: string (default "_blank") */
export type OpenExternalUrlAction = {
  type: "openExternalUrl";
  payload: { url: string; target?: string };
};

// --- Analytics ---
/** payload.event: string; payload.properties?: Record<string, JsonValue> */
export type TrackEventAction = {
  type: "trackEvent";
  payload: { event: string; properties?: Record<string, JsonValue> };
};

// --- Storage ---
/** payload.key: string; payload.value: JsonValue — JSON.stringify'd */
export type SetLocalStorageAction = {
  type: "setLocalStorage";
  payload: { key: string; value: JsonValue };
};
/** payload.key: string; payload.value: JsonValue */
export type SetSessionStorageAction = {
  type: "setSessionStorage";
  payload: { key: string; value: JsonValue };
};

// 3D element actions — discriminated union by type.
// Payloads are all typed as optional Record<string, unknown> to stay compatible
// with the Zod-inferred schema (which uses a loose threePayload for all three.* actions).
// Field-level specificity is documented in comments; the dispatcher reads them dynamically.
export type ThreeLoadAction = { type: "three.load"; payload?: Record<string, unknown> };
export type ThreeUnloadAction = { type: "three.unload"; payload?: Record<string, unknown> };
export type ThreeToggleLoadedAction = {
  type: "three.toggleLoaded";
  payload?: Record<string, unknown>;
};
/** payload.visible: boolean */
export type ThreeSetVisibilityAction = {
  type: "three.setVisibility";
  payload?: Record<string, unknown>;
};
export type ThreeFadeInAction = { type: "three.fadeIn"; payload?: Record<string, unknown> };
export type ThreeFadeOutAction = { type: "three.fadeOut"; payload?: Record<string, unknown> };
/** payload.name: string — animation clip name */
export type ThreePlayAnimationAction = {
  type: "three.playAnimation";
  payload?: Record<string, unknown>;
};
export type ThreePauseAnimationAction = {
  type: "three.pauseAnimation";
  payload?: Record<string, unknown>;
};
export type ThreeToggleAnimationAction = {
  type: "three.toggleAnimation";
  payload?: Record<string, unknown>;
};
/** payload.name: string — animation clip name */
export type ThreeSetAnimationAction = {
  type: "three.setAnimation";
  payload?: Record<string, unknown>;
};
/** payload.preset?: string */
export type ThreeSetCameraPresetAction = {
  type: "three.setCameraPreset";
  payload?: Record<string, unknown>;
};
/** payload.preset?: string */
export type ThreeNextCameraPresetAction = {
  type: "three.nextCameraPreset";
  payload?: Record<string, unknown>;
};
/** payload.preset?: string */
export type ThreeResetCameraAction = {
  type: "three.resetCamera";
  payload?: Record<string, unknown>;
};
export type ThreePlayVideoTextureAction = {
  type: "three.playVideoTexture";
  payload?: Record<string, unknown>;
};
export type ThreePauseVideoTextureAction = {
  type: "three.pauseVideoTexture";
  payload?: Record<string, unknown>;
};
export type ThreeToggleVideoTextureAction = {
  type: "three.toggleVideoTexture";
  payload?: Record<string, unknown>;
};
/** payload.preset: string */
export type ThreeSetCameraEffectsPresetAction = {
  type: "three.setCameraEffectsPreset";
  payload?: Record<string, unknown>;
};
/** payload.name: string; payload.durationMs?: number; payload.warp?: boolean */
export type ThreeCrossFadeAnimationAction = {
  type: "three.crossFadeAnimation";
  payload?: Record<string, unknown>;
};
/** payload.clip?: string; payload.progress?: number — or progress injected from trigger event detail */
export type ThreeScrubAnimationAction = {
  type: "three.scrubAnimation";
  payload?: Record<string, unknown>;
};

// --- Transform actions ---
/** payload.position?: [x,y,z]; payload.x?/y?/z?; payload.durationMs? */
export type ThreeSetPositionAction = {
  type: "three.setPosition";
  payload?: Record<string, unknown>;
};
/** payload.x?/y?/z? (relative delta); payload.durationMs? */
export type ThreeTranslateByAction = {
  type: "three.translateBy";
  payload?: Record<string, unknown>;
};
/** payload.rotation?: [x,y,z] radians; payload.x?/y?/z?; payload.durationMs? */
export type ThreeSetRotationAction = {
  type: "three.setRotation";
  payload?: Record<string, unknown>;
};
/** payload.x?/y?/z? (relative delta radians) */
export type ThreeRotateByAction = { type: "three.rotateBy"; payload?: Record<string, unknown> };
/** payload.scale: number | [x,y,z]; payload.durationMs? */
export type ThreeSetScaleAction = { type: "three.setScale"; payload?: Record<string, unknown> };
/** payload.factor: number — multiplies current scale */
export type ThreeScaleByAction = { type: "three.scaleBy"; payload?: Record<string, unknown> };
/** Snaps back to schema-defined position/rotation/scale */
export type ThreeResetTransformAction = {
  type: "three.resetTransform";
  payload?: Record<string, unknown>;
};
/** payload.position?/rotation?/scale?; payload.durationMs — lerped tween to all at once */
export type ThreeAnimateToAction = { type: "three.animateTo"; payload?: Record<string, unknown> };

// --- Continuous loop actions ---
/** payload.axis?: [x,y,z] (default [0,1,0]); payload.speed?: number (radians/sec, default 1) */
export type ThreeStartContinuousRotateAction = {
  type: "three.startContinuousRotate";
  payload?: Record<string, unknown>;
};
export type ThreeStopContinuousRotateAction = {
  type: "three.stopContinuousRotate";
  payload?: Record<string, unknown>;
};
/** payload.amount?: number (units, default 0.1); payload.speed?: number (Hz, default 1) */
export type ThreeStartContinuousFloatAction = {
  type: "three.startContinuousFloat";
  payload?: Record<string, unknown>;
};
export type ThreeStopContinuousFloatAction = {
  type: "three.stopContinuousFloat";
  payload?: Record<string, unknown>;
};
/** payload.min?: number (default 0.9); payload.max?: number (default 1.1); payload.speed?: number (Hz) */
export type ThreeStartContinuousScaleAction = {
  type: "three.startContinuousScale";
  payload?: Record<string, unknown>;
};
export type ThreeStopContinuousScaleAction = {
  type: "three.stopContinuousScale";
  payload?: Record<string, unknown>;
};

// --- Camera extended actions ---
/** payload.position?/lookAt?/fov?; payload.durationMs — smooth lerped camera move */
export type ThreeAnimateCameraAction = {
  type: "three.animateCamera";
  payload?: Record<string, unknown>;
};
/** payload.autoRotate?: boolean; payload.autoRotateSpeed?: number */
export type ThreeOrbitEnableAction = {
  type: "three.orbitEnable";
  payload?: Record<string, unknown>;
};
export type ThreeOrbitDisableAction = {
  type: "three.orbitDisable";
  payload?: Record<string, unknown>;
};

// --- Material actions ---
/** payload.color: string (hex or css); payload.meshName?: string */
export type ThreeSetMaterialColorAction = {
  type: "three.setMaterialColor";
  payload?: Record<string, unknown>;
};
/** payload.opacity: number 0–1; payload.meshName?; payload.durationMs? */
export type ThreeSetMaterialOpacityAction = {
  type: "three.setMaterialOpacity";
  payload?: Record<string, unknown>;
};
/** payload.intensity: number; payload.meshName? */
export type ThreeSetEmissiveIntensityAction = {
  type: "three.setEmissiveIntensity";
  payload?: Record<string, unknown>;
};

// --- Scene object actions ---
/** payload.intensity: number; payload.index?: number; payload.name?: string */
export type ThreeSetLightIntensityAction = {
  type: "three.setLightIntensity";
  payload?: Record<string, unknown>;
};
/** payload.color: string; payload.index?: number; payload.name?: string */
export type ThreeSetLightColorAction = {
  type: "three.setLightColor";
  payload?: Record<string, unknown>;
};

// --- Post-processing actions ---
/** payload.effect: string (type key); payload.param: string; payload.value: number */
export type ThreeSetPostProcessingParamAction = {
  type: "three.setPostProcessingParam";
  payload?: Record<string, unknown>;
};
/** payload.effect: string; payload.enabled?: boolean (omit to toggle) */
export type ThreeTogglePostEffectAction = {
  type: "three.togglePostEffect";
  payload?: Record<string, unknown>;
};

// rive.* element actions
// Payloads are typed as optional Record<string, unknown> to stay compatible
// with the Zod-inferred schema (rivePayload). Field-level specifics documented below;
// the dispatcher reads them dynamically.

/** payload.id?: string; payload.input: string; payload.value: boolean | number — set a SM boolean or number input */
export type RiveSetInputAction = { type: "rive.setInput"; payload?: Record<string, unknown> };
/** payload.id?: string; payload.input: string — fire a SM trigger input */
export type RiveFireTriggerAction = { type: "rive.fireTrigger"; payload?: Record<string, unknown> };
/** payload.id?: string; payload.animationName?: string — play a specific animation or activate the SM */
export type RivePlayAction = { type: "rive.play"; payload?: Record<string, unknown> };
/** payload.id?: string */
export type RivePauseAction = { type: "rive.pause"; payload?: Record<string, unknown> };
/** payload.id?: string */
export type RiveResetAction = { type: "rive.reset"; payload?: Record<string, unknown> };

export type RiveAction =
  | RiveSetInputAction
  | RiveFireTriggerAction
  | RivePlayAction
  | RivePauseAction
  | RiveResetAction;

export type Model3DAction =
  | ThreeLoadAction
  | ThreeUnloadAction
  | ThreeToggleLoadedAction
  | ThreeSetVisibilityAction
  | ThreeFadeInAction
  | ThreeFadeOutAction
  | ThreePlayAnimationAction
  | ThreePauseAnimationAction
  | ThreeToggleAnimationAction
  | ThreeSetAnimationAction
  | ThreeSetCameraPresetAction
  | ThreeNextCameraPresetAction
  | ThreeResetCameraAction
  | ThreePlayVideoTextureAction
  | ThreePauseVideoTextureAction
  | ThreeToggleVideoTextureAction
  | ThreeSetCameraEffectsPresetAction
  | ThreeCrossFadeAnimationAction
  | ThreeScrubAnimationAction
  // Transform
  | ThreeSetPositionAction
  | ThreeTranslateByAction
  | ThreeSetRotationAction
  | ThreeRotateByAction
  | ThreeSetScaleAction
  | ThreeScaleByAction
  | ThreeResetTransformAction
  | ThreeAnimateToAction
  // Continuous
  | ThreeStartContinuousRotateAction
  | ThreeStopContinuousRotateAction
  | ThreeStartContinuousFloatAction
  | ThreeStopContinuousFloatAction
  | ThreeStartContinuousScaleAction
  | ThreeStopContinuousScaleAction
  // Camera extended
  | ThreeAnimateCameraAction
  | ThreeOrbitEnableAction
  | ThreeOrbitDisableAction
  // Material
  | ThreeSetMaterialColorAction
  | ThreeSetMaterialOpacityAction
  | ThreeSetEmissiveIntensityAction
  // Scene
  | ThreeSetLightIntensityAction
  | ThreeSetLightColorAction
  // Post-processing
  | ThreeSetPostProcessingParamAction
  | ThreeTogglePostEffectAction;

export type PageBuilderAction =
  | ContentOverrideAction
  | BackgroundSwitchAction
  | BackAction
  | StartTransitionAction
  | StopTransitionAction
  | UpdateTransitionProgressAction
  // Navigation & Scroll
  | NavigateAction
  | ScrollToAction
  | ScrollLockAction
  | ScrollUnlockAction
  // Modal
  | ModalOpenAction
  | ModalCloseAction
  | ModalToggleAction
  // State & Logic
  | SetVariableAction
  | FireMultipleAction
  | ConditionalAction
  // Element Visibility
  | ElementShowAction
  | ElementHideAction
  | ElementToggleAction
  // Media
  | PlaySoundAction
  | StopSoundAction
  | SetVolumeAction
  // Browser
  | CopyToClipboardAction
  | VibrateAction
  | SetDocumentTitleAction
  | OpenExternalUrlAction
  // Analytics
  | TrackEventAction
  // Storage
  | SetLocalStorageAction
  | SetSessionStorageAction
  | Model3DAction
  | RiveAction;

/** Alias for the full action union; use in trigger options and handler signatures. */
export type TriggerAction = PageBuilderAction;

export type SectionTriggerOptions = {
  onVisible?: TriggerAction;
  onInvisible?: TriggerAction;
  onProgress?: TriggerAction;
  onViewportProgress?: TriggerAction;
  threshold?: number;
  triggerOnce?: boolean;
  rootMargin?: string;
  delay?: number;
  sticky?: boolean;
  stickyOffset?: string;
};
