import { describe, it, expect } from "vitest";
import { generateSectionKey, normalizeKeyPart } from "./section-keys";

describe("section-keys", () => {
  describe("normalizeKeyPart", () => {
    it("replaces spaces with underscores", () => {
      expect(normalizeKeyPart("hello world")).toBe("hello_world");
    });
    it("strips non-alphanumeric chars", () => {
      expect(normalizeKeyPart("a/b.c-d")).toBe("a_b_c_d");
    });
    it("limits length by default", () => {
      expect(normalizeKeyPart("a".repeat(50))).toHaveLength(20);
    });
    it("accepts custom maxLen", () => {
      expect(normalizeKeyPart("hello", 3)).toBe("hel");
    });
  });

  describe("generateSectionKey", () => {
    it("same input => same key", () => {
      const section = {
        type: "sectionColumn",
        id: "hero",
        columns: 1,
        columnAssignments: {},
      } as Parameters<typeof generateSectionKey>[0];
      expect(generateSectionKey(section, 0)).toBe(generateSectionKey(section, 0));
      expect(generateSectionKey(section, 5)).toBe(generateSectionKey(section, 5));
    });

    it("different section id => different key", () => {
      const s1 = {
        type: "sectionColumn",
        id: "a",
        columns: 1,
        columnAssignments: {},
      } as Parameters<typeof generateSectionKey>[0];
      const s2 = {
        type: "sectionColumn",
        id: "b",
        columns: 1,
        columnAssignments: {},
      } as Parameters<typeof generateSectionKey>[0];
      expect(generateSectionKey(s1, 0)).not.toBe(generateSectionKey(s2, 0));
    });

    it("different index => different key when no content hints", () => {
      const section = {
        type: "sectionColumn",
        columns: 1,
        columnAssignments: {},
      } as Parameters<typeof generateSectionKey>[0];
      expect(generateSectionKey(section, 0)).toBe("sectionColumn_0");
      expect(generateSectionKey(section, 1)).toBe("sectionColumn_1");
    });

    it("uses id when present", () => {
      const section = {
        type: "sectionColumn",
        id: "my-section",
        columns: 1,
        columnAssignments: {},
      } as Parameters<typeof generateSectionKey>[0];
      expect(generateSectionKey(section, 99)).toBe("sectionColumn_my-section");
    });

    it("uses text hash for elements with text", () => {
      const section = {
        type: "sectionColumn",
        columns: 1,
        columnAssignments: {},
        elements: [{ type: "elementBody", text: "Hello World", copyType: "body" }],
      } as unknown as Parameters<typeof generateSectionKey>[0];
      const key = generateSectionKey(section, 0);
      expect(key).toMatch(/^sectionColumn_/);
      const sectionWithElements = section as { elements: { text: string }[] };
      const firstEl = sectionWithElements.elements[0];
      expect(firstEl).toBeDefined();
      expect(key).toContain(String(firstEl!.text.length));
      expect(generateSectionKey(section, 5)).toBe(key);
    });

    it("uses src hash for elements with src", () => {
      const section = {
        type: "sectionColumn",
        columns: 1,
        columnAssignments: {},
        elements: [{ type: "elementImage", src: "/assets/hero.webp" }],
      } as unknown as Parameters<typeof generateSectionKey>[0];
      const key = generateSectionKey(section, 0);
      expect(key).toMatch(/^sectionColumn_/);
    });

    it("no randomness or Date usage", () => {
      const section = {
        type: "sectionColumn",
        columns: 1,
        columnAssignments: {},
      } as Parameters<typeof generateSectionKey>[0];
      // Dynamic values would change between calls
      const k1 = generateSectionKey(section, 0);
      const k2 = generateSectionKey(section, 0);
      expect(k1).toBe(k2);
    });
  });
});
