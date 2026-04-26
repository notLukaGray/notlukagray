"use client";

import { useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import {
  LOOP_COPY_COUNT,
  MAX_SNAP_RETRIES,
  PROGRAMMATIC_AUTO_SCROLL_SUPPRESS_MS,
  PROGRAMMATIC_SMOOTH_SCROLL_BUFFER_MS,
  SCROLL_SETTLE_EPSILON_PX,
  SNAP_SETTLE_EPSILON_PX,
  STALL_RECOVERY_IDLE_MS,
  DEFAULT_SCROLL_SETTLE_FRAMES,
  clampIndex,
  getContainerExtent,
  getItemScrollOffset,
  getItemSize,
  getNowMs,
  getScrollPosition,
  wrapIndex,
} from "./infinite-scroll-math";
import type { ScrollAxis, SnapAlign } from "./infinite-scroll-types";

type UseInfiniteScrollSnapOptions = {
  axis: ScrollAxis;
  containerRef: React.RefObject<HTMLDivElement | null>;
  fallbackSelectableBaseIndex: number;
  initialRenderedIndex: number;
  itemCount: number;
  itemRefs: React.RefObject<Array<HTMLDivElement | null>>;
  loop: boolean;
  normalizeLoopScrollPosition: () => boolean;
  normalizedInitialIndex: number;
  prefersReducedMotion: boolean;
  scheduleNormalizeRetry: (maxRetries?: number) => void;
  selectableBaseIndices: number[];
  selectableRenderedIndices: number[];
  snapAlign: SnapAlign;
  snapDurationMs: number;
};

export function useInfiniteScrollSnap({
  axis,
  containerRef,
  fallbackSelectableBaseIndex,
  initialRenderedIndex,
  itemCount,
  itemRefs,
  loop,
  normalizeLoopScrollPosition,
  normalizedInitialIndex,
  prefersReducedMotion,
  scheduleNormalizeRetry,
  selectableBaseIndices,
  selectableRenderedIndices,
  snapAlign,
  snapDurationMs,
}: UseInfiniteScrollSnapOptions) {
  const [committedRenderedIndex, setCommittedRenderedIndex] = useState(initialRenderedIndex);
  const [isMoving, setIsMoving] = useState(false);
  const committedRenderedIndexRef = useRef(initialRenderedIndex);
  const suppressAutoScrollUntilRef = useRef(0);
  const settleFrameRef = useRef<number | null>(null);
  const stallRecoveryTimeoutRef = useRef<number | null>(null);
  const isMovingRef = useRef(false);
  const isPointerActiveRef = useRef(false);
  const lastScrollActivityAtRef = useRef(0);
  const settleStableFramesRef = useRef(0);
  const settleLastPositionRef = useRef<number | null>(null);
  const pendingSnapIndexRef = useRef<number | null>(null);
  const requestedRenderedIndexRef = useRef<number | null>(null);
  const retryCountRef = useRef(0);
  const armStallRecoveryRef = useRef<() => void>(() => {});
  const watchForSettleRef = useRef<(restart?: boolean) => void>(() => {});

  const activeBaseIndex = useMemo(
    () =>
      itemCount > 0
        ? loop
          ? wrapIndex(committedRenderedIndex, itemCount)
          : clampIndex(committedRenderedIndex, itemCount)
        : 0,
    [committedRenderedIndex, itemCount, loop]
  );

  const clearSettleLoop = useCallback(() => {
    if (settleFrameRef.current != null) {
      cancelAnimationFrame(settleFrameRef.current);
      settleFrameRef.current = null;
    }
  }, []);

  const clearStallRecoveryTimeout = useCallback(() => {
    if (stallRecoveryTimeoutRef.current != null) {
      window.clearTimeout(stallRecoveryTimeoutRef.current);
      stallRecoveryTimeoutRef.current = null;
    }
  }, []);

  const getCanonicalRenderedIndex = useCallback(
    (baseIndex: number) => (loop ? itemCount + baseIndex : baseIndex),
    [itemCount, loop]
  );
  const resolveCanonicalRenderedIndex = useCallback(
    (targetRenderedIndex: number) => {
      const baseIndex = loop
        ? wrapIndex(targetRenderedIndex, itemCount)
        : clampIndex(targetRenderedIndex, itemCount);
      const safeBaseIndex = selectableBaseIndices.includes(baseIndex)
        ? baseIndex
        : fallbackSelectableBaseIndex;

      return {
        safeBaseIndex,
        canonicalRenderedIndex: getCanonicalRenderedIndex(safeBaseIndex),
      };
    },
    [fallbackSelectableBaseIndex, getCanonicalRenderedIndex, itemCount, loop, selectableBaseIndices]
  );

  // In a looped carousel, every base item is rendered in LOOP_COPY_COUNT copies.
  // Pick the copy whose target scroll position is closest to where we are now —
  // otherwise we always animate to the middle copy and visually take the long
  // way around (e.g. item 14 → item 1 spinning backward 13 items instead of 2).
  const pickNearestRenderedIndexForBase = useCallback(
    (targetBaseIndex: number) => {
      const canonical = getCanonicalRenderedIndex(targetBaseIndex);
      if (!loop || itemCount === 0) return canonical;
      const container = containerRef.current;
      if (!container) return canonical;

      const currentPosition = getScrollPosition(container, axis);
      let bestRenderedIndex = canonical;
      let bestDistance = Number.POSITIVE_INFINITY;

      for (let copyIndex = 0; copyIndex < LOOP_COPY_COUNT; copyIndex += 1) {
        const candidateRenderedIndex = copyIndex * itemCount + targetBaseIndex;
        const item = itemRefs.current[candidateRenderedIndex];
        if (!item) continue;
        const targetPosition = getItemScrollOffset(container, item, axis, snapAlign);
        const distance = Math.abs(targetPosition - currentPosition);
        if (distance < bestDistance) {
          bestDistance = distance;
          bestRenderedIndex = candidateRenderedIndex;
        }
      }

      return bestRenderedIndex;
    },
    [axis, containerRef, getCanonicalRenderedIndex, itemCount, itemRefs, loop, snapAlign]
  );

  const getNearestRenderedIndex = useCallback(() => {
    const container = containerRef.current;
    if (!container || itemCount === 0) return committedRenderedIndexRef.current;

    const currentPosition = getScrollPosition(container, axis);
    let nearestIndex = committedRenderedIndexRef.current;
    let smallestDistance = Number.POSITIVE_INFINITY;

    for (const index of selectableRenderedIndices) {
      const item = itemRefs.current[index];
      if (!item) continue;
      const targetPosition = getItemScrollOffset(container, item, axis, snapAlign);
      const distance = Math.abs(targetPosition - currentPosition);
      if (distance < smallestDistance) {
        smallestDistance = distance;
        nearestIndex = index;
      }
    }

    return nearestIndex;
  }, [axis, containerRef, itemCount, itemRefs, selectableRenderedIndices, snapAlign]);

  const scrollToRenderedIndex = useCallback(
    (
      nextRenderedIndex: number,
      behavior: ScrollBehavior,
      options?: {
        suppressMs?: number;
      }
    ) => {
      const container = containerRef.current;
      const item = itemRefs.current[nextRenderedIndex];
      if (!container || !item) {
        scheduleNormalizeRetry();
        return false;
      }

      const resolvedBehavior: ScrollBehavior =
        prefersReducedMotion && behavior === "smooth" ? "auto" : behavior;
      const suppressMs =
        options?.suppressMs ??
        (resolvedBehavior === "smooth"
          ? Math.max(220, snapDurationMs + PROGRAMMATIC_SMOOTH_SCROLL_BUFFER_MS)
          : PROGRAMMATIC_AUTO_SCROLL_SUPPRESS_MS);
      if (suppressMs > 0) {
        suppressAutoScrollUntilRef.current = getNowMs() + suppressMs;
      }

      const nextPosition = getItemScrollOffset(container, item, axis, snapAlign);
      if (axis === "horizontal") {
        container.scrollTo({ left: nextPosition, behavior: resolvedBehavior });
      } else {
        container.scrollTo({ top: nextPosition, behavior: resolvedBehavior });
      }

      return true;
    },
    [
      axis,
      containerRef,
      itemRefs,
      prefersReducedMotion,
      scheduleNormalizeRetry,
      snapAlign,
      snapDurationMs,
    ]
  );

  const normalizeLoopWhenIdle = useCallback(() => {
    if (isPointerActiveRef.current || requestedRenderedIndexRef.current != null) return true;
    if (normalizeLoopScrollPosition()) return true;
    scheduleNormalizeRetry();
    return false;
  }, [normalizeLoopScrollPosition, scheduleNormalizeRetry]);

  const clearPendingSnapTarget = useCallback(() => {
    requestedRenderedIndexRef.current = null;
    pendingSnapIndexRef.current = null;
    retryCountRef.current = 0;
  }, []);
  const getSettleTargetRenderedIndex = useCallback(
    () => requestedRenderedIndexRef.current ?? getNearestRenderedIndex(),
    [getNearestRenderedIndex]
  );

  const finalizeSelection = useCallback(
    (nextRenderedIndex: number) => {
      if (itemCount === 0) return;

      const { canonicalRenderedIndex } = resolveCanonicalRenderedIndex(nextRenderedIndex);

      committedRenderedIndexRef.current = canonicalRenderedIndex;
      setCommittedRenderedIndex(canonicalRenderedIndex);
      clearPendingSnapTarget();

      normalizeLoopWhenIdle();
      scrollToRenderedIndex(canonicalRenderedIndex, "auto");

      settleStableFramesRef.current = 0;
      settleLastPositionRef.current = null;
      isMovingRef.current = false;
      setIsMoving(false);
      clearStallRecoveryTimeout();
    },
    [
      clearStallRecoveryTimeout,
      clearPendingSnapTarget,
      itemCount,
      resolveCanonicalRenderedIndex,
      normalizeLoopWhenIdle,
      scrollToRenderedIndex,
    ]
  );

  const commitToRenderedIndex = useCallback(
    (targetRenderedIndex: number, options: { animate: boolean }) => {
      if (itemCount === 0) return;

      const { safeBaseIndex, canonicalRenderedIndex } =
        resolveCanonicalRenderedIndex(targetRenderedIndex);
      committedRenderedIndexRef.current = canonicalRenderedIndex;
      setCommittedRenderedIndex(canonicalRenderedIndex);

      clearSettleLoop();
      clearStallRecoveryTimeout();
      pendingSnapIndexRef.current = null;
      retryCountRef.current = 0;
      settleStableFramesRef.current = 0;
      settleLastPositionRef.current = null;
      isMovingRef.current = options.animate;
      setIsMoving(options.animate);

      // Normalize first so the "closest copy" calc uses the post-teleport scroll
      // position. Then animated commits scroll to whichever copy of the target is
      // visually nearest, so the user sees the shortest path. Settle finalizes
      // back to canonical (middle copy).
      normalizeLoopWhenIdle();
      const scrollTargetRenderedIndex =
        options.animate && loop
          ? pickNearestRenderedIndexForBase(safeBaseIndex)
          : canonicalRenderedIndex;
      requestedRenderedIndexRef.current = options.animate ? scrollTargetRenderedIndex : null;
      scrollToRenderedIndex(
        scrollTargetRenderedIndex,
        options.animate && !prefersReducedMotion ? "smooth" : "auto"
      );

      if (options.animate) {
        watchForSettleRef.current(true);
        armStallRecoveryRef.current();
      }
    },
    [
      clearSettleLoop,
      clearStallRecoveryTimeout,
      itemCount,
      loop,
      normalizeLoopWhenIdle,
      pickNearestRenderedIndexForBase,
      prefersReducedMotion,
      resolveCanonicalRenderedIndex,
      scrollToRenderedIndex,
    ]
  );

  const armStallRecovery = useCallback(() => {
    clearStallRecoveryTimeout();
    stallRecoveryTimeoutRef.current = window.setTimeout(() => {
      stallRecoveryTimeoutRef.current = null;
      if (!isMovingRef.current) return;
      if (isPointerActiveRef.current) {
        armStallRecoveryRef.current();
        return;
      }
      if (getNowMs() - lastScrollActivityAtRef.current < STALL_RECOVERY_IDLE_MS) {
        armStallRecoveryRef.current();
        return;
      }
      finalizeSelection(getSettleTargetRenderedIndex());
    }, STALL_RECOVERY_IDLE_MS);
  }, [clearStallRecoveryTimeout, finalizeSelection, getSettleTargetRenderedIndex]);

  const watchForSettle = useCallback(
    (restart = false) => {
      if (restart) {
        clearSettleLoop();
        settleStableFramesRef.current = 0;
        settleLastPositionRef.current = null;
      } else if (settleFrameRef.current != null) {
        return;
      } else {
        settleStableFramesRef.current = 0;
        settleLastPositionRef.current = null;
      }

      const tick = (_timestamp: number) => {
        const container = containerRef.current;
        if (!container) {
          settleFrameRef.current = null;
          return;
        }

        normalizeLoopWhenIdle();

        const currentPosition = getScrollPosition(container, axis);

        if (isPointerActiveRef.current) {
          settleStableFramesRef.current = 0;
          settleLastPositionRef.current = currentPosition;
          settleFrameRef.current = requestAnimationFrame(tick);
          return;
        }

        const previousPosition = settleLastPositionRef.current;
        if (
          previousPosition == null ||
          Math.abs(previousPosition - currentPosition) > SCROLL_SETTLE_EPSILON_PX
        ) {
          settleLastPositionRef.current = currentPosition;
          settleStableFramesRef.current = 0;
          settleFrameRef.current = requestAnimationFrame(tick);
          return;
        }

        settleStableFramesRef.current += 1;
        if (settleStableFramesRef.current < DEFAULT_SCROLL_SETTLE_FRAMES) {
          settleFrameRef.current = requestAnimationFrame(tick);
          return;
        }

        settleFrameRef.current = null;

        const targetRenderedIndex = getSettleTargetRenderedIndex();
        const targetItem = itemRefs.current[targetRenderedIndex];
        if (!targetItem) {
          finalizeSelection(targetRenderedIndex);
          return;
        }

        const snappedPosition = getItemScrollOffset(container, targetItem, axis, snapAlign);
        const shouldRetrySnap =
          Math.abs(snappedPosition - currentPosition) > SNAP_SETTLE_EPSILON_PX &&
          pendingSnapIndexRef.current !== targetRenderedIndex &&
          retryCountRef.current < MAX_SNAP_RETRIES;

        if (shouldRetrySnap) {
          pendingSnapIndexRef.current = targetRenderedIndex;
          retryCountRef.current += 1;
          scrollToRenderedIndex(targetRenderedIndex, "smooth");
          watchForSettleRef.current(true);
          return;
        }

        finalizeSelection(targetRenderedIndex);
      };

      settleFrameRef.current = requestAnimationFrame(tick);
    },
    [
      axis,
      clearSettleLoop,
      containerRef,
      finalizeSelection,
      getSettleTargetRenderedIndex,
      itemRefs,
      normalizeLoopWhenIdle,
      scrollToRenderedIndex,
      snapAlign,
    ]
  );

  const markMoving = useCallback(() => {
    if (itemCount <= 1) return;
    lastScrollActivityAtRef.current = getNowMs();
    isMovingRef.current = true;
    setIsMoving(true);
    watchForSettle(false);
    armStallRecovery();
  }, [armStallRecovery, itemCount, watchForSettle]);

  const onScroll = useCallback(() => {
    if (itemCount <= 1) return;
    const now = getNowMs();
    lastScrollActivityAtRef.current = now;
    if (now < suppressAutoScrollUntilRef.current && !isPointerActiveRef.current) return;
    if (!isPointerActiveRef.current) {
      normalizeLoopWhenIdle();
    } else {
      clearPendingSnapTarget();
    }
    markMoving();
  }, [clearPendingSnapTarget, itemCount, markMoving, normalizeLoopWhenIdle]);

  const goToRenderedIndex = useCallback(
    (nextRenderedIndex: number) => {
      if (itemCount === 0) return;
      lastScrollActivityAtRef.current = getNowMs();
      commitToRenderedIndex(nextRenderedIndex, { animate: true });
    },
    [commitToRenderedIndex, itemCount]
  );

  const goToBaseIndex = useCallback(
    (baseIndex: number) => {
      if (itemCount === 0 || selectableBaseIndices.length === 0) return;
      const safeBaseIndex = selectableBaseIndices.includes(baseIndex)
        ? baseIndex
        : fallbackSelectableBaseIndex;
      lastScrollActivityAtRef.current = getNowMs();
      commitToRenderedIndex(getCanonicalRenderedIndex(safeBaseIndex), { animate: true });
    },
    [
      commitToRenderedIndex,
      fallbackSelectableBaseIndex,
      getCanonicalRenderedIndex,
      itemCount,
      selectableBaseIndices,
    ]
  );

  const stepBy = useCallback(
    (delta: number) => {
      if (itemCount === 0 || delta === 0 || selectableRenderedIndices.length === 0) return;

      const currentSelectableIndex = selectableRenderedIndices.indexOf(
        committedRenderedIndexRef.current
      );
      if (currentSelectableIndex < 0) return;

      const nextSelectableIndex = loop
        ? wrapIndex(currentSelectableIndex + delta, selectableRenderedIndices.length)
        : clampIndex(currentSelectableIndex + delta, selectableRenderedIndices.length);
      const nextRenderedIndex = selectableRenderedIndices[nextSelectableIndex];
      if (nextRenderedIndex == null) return;

      goToRenderedIndex(nextRenderedIndex);
    },
    [goToRenderedIndex, itemCount, loop, selectableRenderedIndices]
  );

  const getPageStep = useCallback(() => {
    const container = containerRef.current;
    const currentItem = itemRefs.current[committedRenderedIndexRef.current];
    if (!container || !currentItem) return 1;

    const containerExtent = getContainerExtent(container, axis);
    const itemExtent = getItemSize(currentItem, axis);
    if (containerExtent <= 0 || itemExtent <= 0) return 1;

    return Math.max(1, Math.round(containerExtent / itemExtent));
  }, [axis, containerRef, itemRefs]);

  const stepByPage = useCallback(
    (direction: 1 | -1) => {
      stepBy(direction * getPageStep());
    },
    [getPageStep, stepBy]
  );

  const realignToCommitted = useCallback(() => {
    if (itemCount === 0) return;
    if (getNowMs() < suppressAutoScrollUntilRef.current) return;
    normalizeLoopWhenIdle();
    scrollToRenderedIndex(committedRenderedIndexRef.current, "auto", { suppressMs: 0 });
  }, [itemCount, normalizeLoopWhenIdle, scrollToRenderedIndex]);

  const setPointerActive = useCallback(
    (nextIsPointerActive: boolean) => {
      isPointerActiveRef.current = nextIsPointerActive;
      if (nextIsPointerActive) {
        clearPendingSnapTarget();
        clearStallRecoveryTimeout();
        return;
      }
      normalizeLoopWhenIdle();
      if (isMovingRef.current) {
        lastScrollActivityAtRef.current = getNowMs();
        watchForSettle(true);
        armStallRecovery();
      }
    },
    [
      armStallRecovery,
      clearPendingSnapTarget,
      clearStallRecoveryTimeout,
      normalizeLoopWhenIdle,
      watchForSettle,
    ]
  );

  useEffect(() => {
    committedRenderedIndexRef.current = committedRenderedIndex;
  }, [committedRenderedIndex]);

  useEffect(() => {
    isMovingRef.current = isMoving;
  }, [isMoving]);

  useEffect(() => {
    armStallRecoveryRef.current = armStallRecovery;
    watchForSettleRef.current = watchForSettle;
  }, [armStallRecovery, watchForSettle]);

  useLayoutEffect(() => {
    if (itemCount === 0) {
      committedRenderedIndexRef.current = 0;
      isMovingRef.current = false;
      // eslint-disable-next-line react-hooks/set-state-in-effect -- reset internal selection when source items/config change
      setCommittedRenderedIndex(0);
      setIsMoving(false);
      return;
    }

    const nextRenderedIndex =
      loop && itemCount > 0 ? itemCount + normalizedInitialIndex : normalizedInitialIndex;
    committedRenderedIndexRef.current = nextRenderedIndex;
    isMovingRef.current = false;
    setCommittedRenderedIndex(nextRenderedIndex);
    setIsMoving(false);
    clearPendingSnapTarget();
    suppressAutoScrollUntilRef.current = 0;
    settleStableFramesRef.current = 0;
    settleLastPositionRef.current = null;

    const frame = requestAnimationFrame(() => {
      normalizeLoopWhenIdle();
      scrollToRenderedIndex(nextRenderedIndex, "auto", { suppressMs: 0 });
    });

    return () => cancelAnimationFrame(frame);
  }, [
    itemCount,
    loop,
    clearPendingSnapTarget,
    normalizeLoopWhenIdle,
    normalizedInitialIndex,
    scrollToRenderedIndex,
  ]);

  useEffect(
    () => () => {
      clearSettleLoop();
      clearStallRecoveryTimeout();
    },
    [clearSettleLoop, clearStallRecoveryTimeout]
  );

  return {
    activeBaseIndex,
    clearPendingSnapTarget,
    committedRenderedIndex,
    goToBaseIndex,
    goToRenderedIndex,
    isMoving,
    isMovingRef,
    isPointerActiveRef,
    onScroll,
    realignToCommitted,
    setPointerActive,
    stepBy,
    stepByPage,
  };
}
