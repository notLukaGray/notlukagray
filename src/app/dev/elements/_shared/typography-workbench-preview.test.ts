import { describe, expect, it } from "vitest";
import { DEFAULT_IMAGE_RUNTIME_DRAFT } from "@/app/dev/elements/image/runtime-draft";
import { BASE_DEFAULTS as HEADING_BASE } from "@/app/dev/elements/heading/constants";
import {
  evaluateConditions,
  type VisibleWhenConfig,
} from "@/page-builder/core/page-builder-condition-evaluator";
import {
  clearVariables,
  setVariable,
  useVariableStore,
} from "@/page-builder/core/page-builder-variable-store";
import { buildResolvedTypographyWorkbenchBlock } from "./typography-workbench-preview";

describe("buildResolvedTypographyWorkbenchBlock", () => {
  it("resolves entrance motion from variant animation (motionTiming.resolvedEntranceMotion)", () => {
    const variant = HEADING_BASE.variants.display;
    const block = buildResolvedTypographyWorkbenchBlock(DEFAULT_IMAGE_RUNTIME_DRAFT, {
      type: "elementHeading",
      ...variant,
      text: "Hello",
      level: 1,
    });
    const mt = block.motionTiming as
      | {
          resolvedEntranceMotion?: unknown;
          trigger?: string;
        }
      | undefined;
    expect(mt?.resolvedEntranceMotion).toBeDefined();
    expect(mt?.trigger).toBe("onMount");
    expect(mt?.resolvedEntranceMotion).toMatchObject({
      initial: expect.any(Object),
      animate: expect.any(Object),
    });
  });

  it("merges visibleWhen from runtime draft when enabled", () => {
    const variant = HEADING_BASE.variants.display;
    const block = buildResolvedTypographyWorkbenchBlock(
      {
        ...DEFAULT_IMAGE_RUNTIME_DRAFT,
        visibleWhenEnabled: true,
        visibleWhenVariable: "mode",
        visibleWhenOperator: "equals",
        visibleWhenValue: '"dark"',
      },
      { type: "elementHeading", ...variant, text: "Hi", level: 1 }
    );
    expect(block.visibleWhen).toEqual({
      variable: "mode",
      operator: "equals",
      value: "dark",
    });
  });

  it("visibleWhen evaluates against the variable store like ElementRenderer", () => {
    clearVariables();
    const variant = HEADING_BASE.variants.display;
    const block = buildResolvedTypographyWorkbenchBlock(
      {
        ...DEFAULT_IMAGE_RUNTIME_DRAFT,
        visibleWhenEnabled: true,
        visibleWhenVariable: "mode",
        visibleWhenOperator: "equals",
        visibleWhenValue: '"dark"',
      },
      { type: "elementHeading", ...variant, text: "Hi", level: 1 }
    );
    const cfg = block.visibleWhen as VisibleWhenConfig;
    expect(cfg).toBeDefined();
    setVariable("mode", "dark");
    expect(evaluateConditions(cfg, useVariableStore.getState().variables)).toBe(true);
    setVariable("mode", "light");
    expect(evaluateConditions(cfg, useVariableStore.getState().variables)).toBe(false);
    clearVariables();
  });

  it("merges interactions cursor from runtime draft", () => {
    const variant = HEADING_BASE.variants.display;
    const block = buildResolvedTypographyWorkbenchBlock(
      { ...DEFAULT_IMAGE_RUNTIME_DRAFT, cursor: "grab" },
      { type: "elementHeading", ...variant, text: "Hi", level: 1 }
    );
    expect(block.interactions).toEqual({ cursor: "grab" });
  });

  it("merges runtime motion JSON onto the block", () => {
    const variant = HEADING_BASE.variants.display;
    const motionJson = JSON.stringify({ whileHover: { scale: 1.02 } });
    const block = buildResolvedTypographyWorkbenchBlock(
      { ...DEFAULT_IMAGE_RUNTIME_DRAFT, motionJson },
      { type: "elementHeading", ...variant, text: "Hi", level: 1 }
    );
    expect(block.motion).toMatchObject({ whileHover: { scale: 1.02 } });
  });
});
