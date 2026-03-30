import { describe, it, expect } from "vitest";
import { getModalProps } from "./page-builder-get-props";

describe("page-builder-get-props", () => {
  describe("getModalProps", () => {
    it("returns null for nonexistent modal", () => {
      expect(getModalProps("nonexistent_modal_xyz")).toBeNull();
    });

    it("does not call transformSections when modal does not exist", () => {
      let called = false;
      const result = getModalProps("nonexistent_modal_xyz", {
        transformSections: (sections) => {
          called = true;
          return sections;
        },
      });
      expect(result).toBeNull();
      expect(called).toBe(false);
    });

    it("returns modal props with resolvedSections from asset pipeline for unlock modal", () => {
      const props = getModalProps("unlock");
      expect(props).not.toBeNull();
      expect(props?.id).toBe("unlock");
      expect(props?.title).toBe("Unlock");
      expect(Array.isArray(props?.resolvedSections)).toBe(true);
      expect(props?.resolvedSections?.length).toBeGreaterThanOrEqual(1);
      for (const section of props?.resolvedSections ?? []) {
        expect(section).toHaveProperty("type");
        expect(typeof (section as { type: string }).type).toBe("string");
      }
    });

    it("applies transformSections when provided", () => {
      const props = getModalProps("unlock", {
        transformSections: (sections) => sections.slice(0, 1),
      });
      expect(props?.resolvedSections).toHaveLength(1);
    });

    it("supports isMobile option and remains deterministic in shape", () => {
      const mobile = getModalProps("unlock", { isMobile: true });
      const desktop = getModalProps("unlock", { isMobile: false });
      expect(mobile?.id).toBe("unlock");
      expect(desktop?.id).toBe("unlock");
      expect(Array.isArray(mobile?.resolvedSections)).toBe(true);
      expect(Array.isArray(desktop?.resolvedSections)).toBe(true);
      expect(mobile?.resolvedSections.length).toBeGreaterThan(0);
      expect(desktop?.resolvedSections.length).toBeGreaterThan(0);
    });
  });
});
