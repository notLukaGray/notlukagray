import fs from "fs";
import os from "os";
import path from "path";
import { describe, it, expect } from "vitest";
import {
  readJsonFileSafe,
  coercePresetMap,
  loadPageBuilder,
  getPageSlugBases,
  getPageSlugsByBase,
  getPageSlugs,
  validatePageBuilder,
} from "./page-builder-load";
import { isSafePathSegment } from "./page-builder-paths";

describe("page-builder-load", () => {
  describe("getPageSlugBases", () => {
    it("returns an array", () => {
      const result = getPageSlugBases();
      expect(Array.isArray(result)).toBe(true);
    });
    it("returns objects with non-empty slug and basePath", () => {
      const result = getPageSlugBases();
      for (const item of result) {
        expect(item).toHaveProperty("slug", expect.any(String));
        expect(item).toHaveProperty("basePath", expect.any(String));
        expect(item.slug.length).toBeGreaterThan(0);
        expect(item.basePath.length).toBeGreaterThan(0);
      }
    });
    it("returns only safe path segments for slug (no traversal)", () => {
      const result = getPageSlugBases();
      for (const item of result) {
        const slugSegments = item.slug.split("/").filter(Boolean);
        expect(slugSegments.length).toBeGreaterThan(0);
        for (const segment of slugSegments) {
          expect(isSafePathSegment(segment)).toBe(true);
        }
      }
    });
    it("returns same length and shape when called twice in same request", () => {
      const a = getPageSlugBases();
      const b = getPageSlugBases();
      expect(a.length).toBe(b.length);
      if (a.length > 0) {
        expect(a[0]).toHaveProperty("slug");
        expect(a[0]).toHaveProperty("basePath");
      }
    });
  });

  describe("readJsonFileSafe", () => {
    it("returns null for non-existent file", () => {
      const result = readJsonFileSafe(path.join(process.cwd(), "nonexistent-preset-file.json"));
      expect(result).toBe(null);
    });

    it("returns null for invalid JSON content", () => {
      const tempPath = path.join(os.tmpdir(), `page-builder-invalid-${Date.now()}.json`);
      fs.writeFileSync(tempPath, "{ invalid json", "utf-8");
      try {
        expect(readJsonFileSafe(tempPath)).toBeNull();
      } finally {
        fs.unlinkSync(tempPath);
      }
    });
  });

  describe("loadPageBuilder path validation", () => {
    it("returns null for invalid slug (path traversal)", () => {
      expect(loadPageBuilder("..")).toBe(null);
      expect(loadPageBuilder("../other")).toBe(null);
    });
    it("returns null for invalid slug (path separators)", () => {
      expect(loadPageBuilder("a/b")).toBe(null);
      expect(loadPageBuilder("slug/../other")).toBe(null);
    });
    it("returns null for empty slug", () => {
      expect(loadPageBuilder("")).toBe(null);
    });
    it("returns null for invalid slug characters", () => {
      expect(loadPageBuilder(".hidden")).toBe(null);
      expect(loadPageBuilder("with space")).toBe(null);
    });
  });

  describe("validatePageBuilder", () => {
    it("returns ok true for valid page", () => {
      const result = validatePageBuilder(
        {
          slug: "ok",
          title: "OK",
          sectionOrder: ["hero"],
          definitions: { hero: { type: "contentBlock", elements: [] } },
        } as unknown as Parameters<typeof validatePageBuilder>[0],
        "ok"
      );
      expect(result.ok).toBe(true);
    });

    it("returns error details for invalid page", () => {
      const result = validatePageBuilder(
        {
          slug: "bad",
          title: "Bad",
          sectionOrder: ["hero"],
          definitions: { hero: { type: "notASection" } },
        } as unknown as Parameters<typeof validatePageBuilder>[0],
        "bad"
      );
      expect(result.ok).toBe(false);
      if (!result.ok) {
        expect(result.error).toContain("Page builder validation failed for bad");
        expect(result.issues.length).toBeGreaterThan(0);
      }
    });
  });

  describe("coercePresetMap", () => {
    it("returns empty object for null or non-object", () => {
      expect(coercePresetMap(null)).toEqual({});
      expect(coercePresetMap(undefined)).toEqual({});
      expect(coercePresetMap("string")).toEqual({});
      expect(coercePresetMap(42)).toEqual({});
    });
    it("includes object values keyed by string", () => {
      const data = {
        a: { type: "elementVector", viewBox: "0 0 1 1", shapes: [] },
        b: { type: "section", title: "S" },
      };
      const out = coercePresetMap(data);
      expect(Object.keys(out)).toEqual(["a", "b"]);
      expect(out.a).toEqual(data.a);
      expect(out.b).toEqual(data.b);
    });
    it("skips non-object values", () => {
      const data = { ok: { type: "x" }, skip: "string", skip2: 1, skip3: null };
      const out = coercePresetMap(data);
      expect(out).toEqual({ ok: { type: "x" } });
    });
    it("merge order: later Object.assign overwrites earlier (caller responsibility)", () => {
      const first = { key: { type: "a", value: 1 } };
      const second = { key: { type: "b", value: 2 } };
      const merged = { ...coercePresetMap(first), ...coercePresetMap(second) };
      expect(merged.key).toEqual(second.key);
    });

    it("keeps array values because they are objects at runtime", () => {
      const data = { arr: [1, 2, 3] as unknown as { type: string } };
      const out = coercePresetMap(data);
      expect(out).toHaveProperty("arr");
      expect(Array.isArray(out.arr)).toBe(true);
    });
  });

  describe("slug-base helpers", () => {
    it("getPageSlugsByBase only returns slugs for the requested base", () => {
      const base = "/work";
      const expected = getPageSlugBases()
        .filter((p) => p.basePath === base)
        .map((p) => p.slug);
      expect(getPageSlugsByBase(base)).toEqual(expected);
    });

    it("getPageSlugs defaults to /work base", () => {
      expect(getPageSlugs()).toEqual(getPageSlugsByBase("/work"));
    });
  });
});
