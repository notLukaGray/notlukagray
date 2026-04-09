import type { TriggerAction } from "@pb/contracts/page-builder/core/page-builder-schemas";
import {
  createBackgroundSwitchHandler,
  createBgTransitionProgressOverrideHandler,
  createContentOverrideHandler,
} from "./page-builder-trigger-handlers/overrides";
import {
  createTransitionControlHandlers,
  createUpdateTransitionProgressHandler,
} from "./page-builder-trigger-handlers/transitions";
import {
  getTransitionId,
  isBgTransitionProgressOverride,
} from "./page-builder-trigger-handlers/action-parsing";
import {
  type TriggerHandlerContext,
  computeBgProgressOverrides,
} from "./page-builder-trigger-handlers/context-and-bg-progress";

export {
  computeBgProgressOverrides,
  getTransitionId,
  isBgTransitionProgressOverride,
  type TriggerHandlerContext,
};

/** Build the action handler map for PAGE_BUILDER_TRIGGER_EVENT. Pure logic; side effects go through context. */
export function createTriggerHandlers(
  ctx: TriggerHandlerContext
): Record<string, (action: TriggerAction, progress: number | null) => void> {
  const {
    setOverrides,
    setActiveTransitionIds,
    setReversingTransitionIds,
    setTransitionProgress,
    resolvedBg,
    bgDefinitions,
    transitionsArray,
    lastProgressRef,
    lastTriggerTimeRef,
    dispatchStart,
    dispatchUpdateProgress,
  } = ctx;

  const handleBgTransitionProgressOverride = createBgTransitionProgressOverrideHandler(
    resolvedBg,
    lastProgressRef,
    setOverrides
  );
  const handleContentOverride = createContentOverrideHandler(setOverrides);
  const { startTransition, stopTransition } = createTransitionControlHandlers({
    lastTriggerTimeRef,
    transitionsArray,
    setActiveTransitionIds,
    setReversingTransitionIds,
    dispatchStart,
  });
  const updateTransitionProgressAction = createUpdateTransitionProgressHandler(
    setTransitionProgress,
    dispatchUpdateProgress
  );
  const backgroundSwitch = createBackgroundSwitchHandler(bgDefinitions, setOverrides);

  return {
    contentOverride: (action, progress) => {
      if (isBgTransitionProgressOverride(action, progress)) {
        handleBgTransitionProgressOverride(progress!);
        return;
      }
      if (action.type === "contentOverride") handleContentOverride(action);
    },
    startTransition: (action) => {
      if (action.type !== "startTransition") return;
      const transitionId = getTransitionId(action);
      if (transitionId) startTransition(transitionId);
    },
    stopTransition: (action) => {
      if (action.type !== "stopTransition") return;
      const transitionId = getTransitionId(action);
      if (transitionId) stopTransition(transitionId);
    },
    updateTransitionProgress: (action, progress) => {
      // progress from the event detail is only present for scroll/viewport triggers.
      // When fired from a button, progress is null — fall back to 0 so the inner
      // handler can resolve the value from action.payload.progress instead.
      if (action.type === "updateTransitionProgress")
        updateTransitionProgressAction(action, progress ?? 0);
    },
    backgroundSwitch: (action) => {
      if (action.type === "backgroundSwitch") backgroundSwitch(action);
    },
  };
}
