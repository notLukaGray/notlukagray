import type React from "react";
import type { UpdateTransitionProgressAction } from "@/page-builder/core/page-builder-schemas";
import type { BackgroundTransitionEffect } from "@/page-builder/core/page-builder-types";
import type { TriggerHandlerContext } from "./context-and-bg-progress";

function shouldDebounce(
  lastTriggerTimeRef: { current: Map<string, number> },
  transitionId: string,
  windowMs: number
): boolean {
  const now = Date.now();
  const lastTrigger = lastTriggerTimeRef.current.get(transitionId);
  if (lastTrigger != null && now - lastTrigger < windowMs) return true;
  lastTriggerTimeRef.current.set(transitionId, now);
  return false;
}

type TransitionControlDeps = Pick<
  TriggerHandlerContext,
  | "lastTriggerTimeRef"
  | "transitionsArray"
  | "setActiveTransitionIds"
  | "setReversingTransitionIds"
  | "dispatchStart"
>;

export function createTransitionControlHandlers({
  lastTriggerTimeRef,
  transitionsArray,
  setActiveTransitionIds,
  setReversingTransitionIds,
  dispatchStart,
}: TransitionControlDeps) {
  const startTransition = (transitionId: string) => {
    if (shouldDebounce(lastTriggerTimeRef, transitionId, 500)) return;
    const transition = transitionsArray.find((t) => {
      if (t.type === "TRIGGER") {
        const triggerTransition = t as Extract<BackgroundTransitionEffect, { type: "TRIGGER" }>;
        return (triggerTransition.id || "default") === transitionId;
      }
      return false;
    });
    const isTriggerType = transition?.type === "TRIGGER";

    setActiveTransitionIds((prev) => {
      if (prev.has(transitionId)) {
        setReversingTransitionIds((revPrev) => {
          if (revPrev.has(transitionId)) {
            const revNext = new Set(revPrev);
            revNext.delete(transitionId);
            dispatchStart(transitionId, true);
            return revNext;
          }
          if (isTriggerType) dispatchStart(transitionId, true);
          return revPrev;
        });
        return prev;
      }
      const next = new Set(prev);
      next.add(transitionId);
      setReversingTransitionIds((revPrev) => {
        const revNext = new Set(revPrev);
        revNext.delete(transitionId);
        return revNext;
      });
      dispatchStart(transitionId, true);
      return next;
    });
  };

  const stopTransition = (transitionId: string) => {
    if (shouldDebounce(lastTriggerTimeRef, transitionId, 500)) return;
    setActiveTransitionIds((prev) => {
      if (!prev.has(transitionId)) return prev;
      setReversingTransitionIds((revPrev) => {
        if (revPrev.has(transitionId)) return revPrev;
        const revNext = new Set(revPrev);
        revNext.add(transitionId);
        dispatchStart(transitionId, false);
        return revNext;
      });
      return prev;
    });
  };

  return { startTransition, stopTransition };
}

export function createUpdateTransitionProgressHandler(
  setTransitionProgress: React.Dispatch<React.SetStateAction<Map<string, number>>>,
  dispatchUpdateProgress: (transitionId: string, progressValue: number) => void
) {
  return (action: UpdateTransitionProgressAction, fallbackProgress: number) => {
    const { id: transitionId, progress, invert } = action.payload;
    const progressValue = progress ?? fallbackProgress;
    if (!transitionId || !Number.isFinite(progressValue)) return;
    const mapped = invert ? 1 - progressValue : progressValue;
    const clamped = Math.max(0, Math.min(1, mapped));
    setTransitionProgress((prev) => {
      const next = new Map(prev);
      next.set(transitionId, clamped);
      return next;
    });
    dispatchUpdateProgress(transitionId, clamped);
  };
}
