import { describe, it, expect } from "vitest";
import * as FM from "./index";

describe("framer-motion integration index", () => {
  it("re-exports accessibility and reduced-motion hooks", () => {
    expect(typeof FM.useReducedMotion).toBe("function");
    expect(typeof FM.useReducedMotionConfig).toBe("function");
    expect(typeof FM.useShouldReduceMotion).toBe("function");
  });

  it("re-exports viewport hook", () => {
    expect(typeof FM.useInView).toBe("function");
  });

  it("re-exports animation primitives", () => {
    expect(FM.motion).toBeDefined();
    expect(typeof FM.animate).toBe("function");
    expect(FM.AnimatePresence).toBeDefined();
    expect(typeof FM.delay).toBe("function");
    expect(FM.MotionConfig).toBeDefined();
  });

  it("re-exports presence hooks", () => {
    expect(typeof FM.usePresence).toBe("function");
    expect(typeof FM.useIsPresent).toBe("function");
  });

  it("re-exports motion value hooks", () => {
    expect(typeof FM.useMotionValue).toBe("function");
    expect(typeof FM.useMotionValueEvent).toBe("function");
    expect(typeof FM.useTransform).toBe("function");
    expect(typeof FM.useSpring).toBe("function");
  });

  it("re-exports scroll trigger", () => {
    expect(typeof FM.useScroll).toBe("function");
  });

  it("re-exports layout hooks", () => {
    expect(typeof FM.useInstantLayoutTransition).toBe("function");
    expect(typeof FM.useInstantTransition).toBe("function");
    expect(typeof FM.useResetProjection).toBe("function");
  });

  it("re-exports gestures (ReorderGroup/ReorderItem, not raw Reorder)", () => {
    expect(typeof FM.useDragControls).toBe("function");
    expect(typeof FM.ReorderGroup).toBe("function");
    expect(typeof FM.ReorderItem).toBe("function");
  });

  it("re-exports video lazy load hook", () => {
    expect(typeof FM.useVideoLazyLoad).toBe("function");
  });

  it("re-exports section helpers", () => {
    expect(FM.SectionMotionWrapper).toBeDefined();
    expect(typeof FM.SectionScrollProgressBar).toBe("function");
  });

  it("re-exports drag/scroll helpers and MotionFromJson", () => {
    expect(typeof FM.useDragHandleControls).toBe("function");
    expect(typeof FM.useSectionScrollOpacityStyle).toBe("function");
    expect(FM.MotionFromJson).toBeDefined();
  });
});
