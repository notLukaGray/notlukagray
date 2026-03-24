import path from "path";
import { describe, it, expect } from "vitest";
import {
  readJsonFileSafe,
  coercePresetMap,
  parseJsonSafe,
  PAGE_DATA_DIR,
  PAGE_IGNORE,
} from "@/page-builder/core/load/page-builder-load-io";

describe("page-builder-load-io", () => {
  describe("readJsonFileSafe", () => {
    it("returns null for non-existent file", () => {
      expect(readJsonFileSafe(path.join(process.cwd(), "nonexistent-file-xyz.json"))).toBe(null);
    });
  });

  describe("parseJsonSafe", () => {
    it("returns ok and data for valid JSON", () => {
      const r = parseJsonSafe<{ a: number }>('{"a":1}');
      expect(r).toEqual({ ok: true, data: { a: 1 } });
    });
    it("returns ok false for invalid JSON", () => {
      const r = parseJsonSafe("not json");
      expect(r.ok).toBe(false);
      expect("error" in r && r.error).toBeDefined();
    });
  });

  describe("coercePresetMap", () => {
    it("returns empty object for null or non-object", () => {
      expect(coercePresetMap(null)).toEqual({});
      expect(coercePresetMap("x")).toEqual({});
    });
    it("includes object values keyed by string", () => {
      const data = { k: { type: "elementVector", shapes: [] } };
      expect(coercePresetMap(data)).toEqual(data);
    });
  });

  describe("constants", () => {
    it("PAGE_DATA_DIR is a string path", () => {
      expect(typeof PAGE_DATA_DIR).toBe("string");
      expect(PAGE_DATA_DIR).toContain("content");
      expect(PAGE_DATA_DIR).toContain("pages");
    });
    it("PAGE_IGNORE is a Set", () => {
      expect(PAGE_IGNORE).toBeInstanceOf(Set);
      expect(PAGE_IGNORE.has("schema.example.json")).toBe(true);
    });
  });
});
