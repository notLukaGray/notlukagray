import { describe, expect, it } from "vitest";
import { elementButtonSchema } from "./element-button-schemas";
import { formFieldBlockSchema } from "./form-field-schemas";
import { pageBuilderSchema } from "./page-definition-and-resolution-schemas";

describe("phase 0 schema hardening", () => {
  describe("elementButton.action", () => {
    it("rejects unknown actions", () => {
      const result = elementButtonSchema.safeParse({
        type: "elementButton",
        action: "unknownAction",
      });
      expect(result.success).toBe(false);
    });

    it("accepts enum-backed actions", () => {
      const result = elementButtonSchema.safeParse({
        type: "elementButton",
        action: "modalOpen",
      });
      expect(result.success).toBe(true);
    });
  });

  describe("form field combos", () => {
    it("requires options for select/radio/checkboxGroup fields", () => {
      expect(
        formFieldBlockSchema.safeParse({
          type: "formField",
          fieldType: "select",
        }).success
      ).toBe(false);

      expect(
        formFieldBlockSchema.safeParse({
          type: "formField",
          fieldType: "radio",
          options: [],
        }).success
      ).toBe(false);

      expect(
        formFieldBlockSchema.safeParse({
          type: "formField",
          fieldType: "checkboxGroup",
        }).success
      ).toBe(false);
    });

    it("requires label for submit fields", () => {
      expect(
        formFieldBlockSchema.safeParse({
          type: "formField",
          fieldType: "submit",
        }).success
      ).toBe(false);
      expect(
        formFieldBlockSchema.safeParse({
          type: "formField",
          fieldType: "submit",
          label: "  ",
        }).success
      ).toBe(false);
      expect(
        formFieldBlockSchema.safeParse({
          type: "formField",
          fieldType: "submit",
          label: "Send",
        }).success
      ).toBe(true);
    });

    it("rejects multiple on non-file/select fields", () => {
      expect(
        formFieldBlockSchema.safeParse({
          type: "formField",
          fieldType: "text",
          multiple: true,
        }).success
      ).toBe(false);
      expect(
        formFieldBlockSchema.safeParse({
          type: "formField",
          fieldType: "file",
          multiple: true,
        }).success
      ).toBe(true);
      expect(
        formFieldBlockSchema.safeParse({
          type: "formField",
          fieldType: "select",
          multiple: true,
          options: [{ value: "a", label: "A" }],
        }).success
      ).toBe(true);
    });
  });

  describe("background transition ids", () => {
    const basePage = {
      slug: "phase-0",
      title: "Phase 0",
      definitions: {},
      sectionOrder: [],
    };

    it("requires id on all transition types", () => {
      const timeResult = pageBuilderSchema.safeParse({
        ...basePage,
        transitions: { type: "TIME", from: "a", to: "b", duration: 300 },
      });
      const triggerResult = pageBuilderSchema.safeParse({
        ...basePage,
        transitions: { type: "TRIGGER", from: "a", to: "b", duration: 300 },
      });
      const scrollResult = pageBuilderSchema.safeParse({
        ...basePage,
        transitions: { type: "SCROLL", from: "a", to: "b" },
      });

      expect(timeResult.success).toBe(false);
      expect(triggerResult.success).toBe(false);
      expect(scrollResult.success).toBe(false);
    });

    it("accepts transitions with explicit ids", () => {
      const result = pageBuilderSchema.safeParse({
        ...basePage,
        transitions: [
          { type: "TIME", id: "t-time", from: "a", to: "b", duration: 300 },
          { type: "TRIGGER", id: "t-trigger", from: "a", to: "b", duration: 300 },
          { type: "SCROLL", id: "t-scroll", from: "a", to: "b" },
        ],
      });
      expect(result.success).toBe(true);
    });
  });
});
