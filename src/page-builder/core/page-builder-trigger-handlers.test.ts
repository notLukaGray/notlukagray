import { describe, it, expect } from "vitest";
import {
  getTransitionId,
  isBgTransitionProgressOverride,
  computeBgProgressOverrides,
} from "./page-builder-trigger-handlers";
import { OVERRIDE_KEY_BG } from "@/page-builder/core/page-builder-schemas";

describe("page-builder-trigger-handlers", () => {
  describe("getTransitionId", () => {
    it("returns payload.id when payload is object with id", () => {
      expect(getTransitionId({ type: "startTransition", payload: { id: "t3" } })).toBe("t3");
    });
    it("returns undefined when payload has no id", () => {
      expect(getTransitionId({ type: "startTransition", payload: { id: "" } })).toBeUndefined();
    });
    it("returns undefined when payload is missing", () => {
      expect(getTransitionId({ type: "stopTransition", payload: { id: "" } })).toBeUndefined();
    });
    it("returns undefined when id is empty string", () => {
      expect(getTransitionId({ type: "stopTransition", payload: { id: "" } })).toBeUndefined();
    });
  });

  describe("isBgTransitionProgressOverride", () => {
    it("returns true when progress and payload is bg override with backgroundTransition value", () => {
      expect(
        isBgTransitionProgressOverride(
          {
            type: "contentOverride",
            payload: {
              key: OVERRIDE_KEY_BG,
              value: { type: "backgroundTransition", from: {}, to: {} },
            },
          },
          0.5
        )
      ).toBe(true);
    });
    it("returns false when progress is null", () => {
      expect(
        isBgTransitionProgressOverride(
          {
            type: "contentOverride",
            payload: { key: OVERRIDE_KEY_BG, value: { type: "backgroundTransition" } },
          },
          null
        )
      ).toBe(false);
    });
    it("returns false when key is not OVERRIDE_KEY_BG", () => {
      expect(
        isBgTransitionProgressOverride(
          {
            type: "contentOverride",
            payload: { key: "other", value: { type: "backgroundTransition" } },
          },
          0.5
        )
      ).toBe(false);
    });
    it("returns false when value.type is not backgroundTransition", () => {
      expect(
        isBgTransitionProgressOverride(
          {
            type: "contentOverride",
            payload: { key: OVERRIDE_KEY_BG, value: { type: "backgroundVariable" } },
          },
          0.5
        )
      ).toBe(false);
    });
  });

  describe("computeBgProgressOverrides", () => {
    const resolvedBg = {
      type: "backgroundTransition" as const,
      from: { type: "backgroundVariable" as const, layers: [] },
      to: { type: "backgroundVariable" as const, layers: [] },
    };

    it("returns null when baseBg is not backgroundTransition", () => {
      expect(
        computeBgProgressOverrides({}, { type: "backgroundVariable", layers: [] }, 0.5)
      ).toBeNull();
    });
    it("returns next overrides with progress when baseBg is backgroundTransition", () => {
      const prev = {};
      const next = computeBgProgressOverrides(prev, resolvedBg, 0.5);
      expect(next).not.toBeNull();
      expect(next![OVERRIDE_KEY_BG]).toMatchObject({ type: "backgroundTransition", progress: 0.5 });
    });
    it("returns null when progress unchanged", () => {
      const prev = { [OVERRIDE_KEY_BG]: { ...resolvedBg, progress: 0.5 } };
      expect(computeBgProgressOverrides(prev, resolvedBg, 0.5)).toBeNull();
    });
  });
});
