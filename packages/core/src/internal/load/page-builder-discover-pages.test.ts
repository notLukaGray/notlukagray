import fs from "fs";
import fsPromises from "fs/promises";
import path from "path";
import { describe, expect, it, vi } from "vitest";
import { PAGE_DATA_DIR } from "./page-builder-load-io";
import { discoverAllPages, resolvePagePath } from "./page-builder-discover-pages";

describe("resolvePagePath reserved segments", () => {
  it("throws when mobile appears in slug segments", () => {
    expect(() => resolvePagePath(["work", "mobile"])).toThrow(/reserved/i);
  });

  it("throws when desktop appears in slug segments", () => {
    expect(() => resolvePagePath(["desktop"])).toThrow(/reserved/i);
  });

  it("returns null for empty slug segments", () => {
    expect(resolvePagePath([])).toBeNull();
  });

  it("returns null for unsafe segment values", () => {
    expect(resolvePagePath([".."])).toBeNull();
    expect(resolvePagePath(["work/project"])).toBeNull();
    expect(resolvePagePath([".hidden"])).toBeNull();
  });

  it("returns null when target index.json does not exist", () => {
    const existsSync = vi.spyOn(fs, "existsSync").mockReturnValue(false);
    const result = resolvePagePath(["work", "missing-page"]);
    expect(result).toBeNull();
    expect(existsSync).toHaveBeenCalled();
    existsSync.mockRestore();
  });

  it("returns resolved index path when file exists", () => {
    const expected = path.resolve(PAGE_DATA_DIR, "work", "existing-page", "index.json");
    const existsSync = vi
      .spyOn(fs, "existsSync")
      .mockImplementation((p) => path.resolve(String(p)) === expected);
    const result = resolvePagePath(["work", "existing-page"]);
    expect(result).toBe(expected);
    existsSync.mockRestore();
  });
});

describe("discoverAllPages", () => {
  it("re-scans in dev when files are added between calls", async () => {
    const rootSlug = `vitest-dev-cache-${Date.now()}`;
    const firstPageDir = path.join(PAGE_DATA_DIR, rootSlug, "one");
    const secondPageDir = path.join(PAGE_DATA_DIR, rootSlug, "two");
    await fsPromises.mkdir(firstPageDir, { recursive: true });
    await fsPromises.writeFile(path.join(firstPageDir, "index.json"), "{}", "utf8");

    try {
      const first = discoverAllPages().filter((p) => p.slugSegments[0] === rootSlug);
      expect(first.length).toBe(1);

      await fsPromises.mkdir(secondPageDir, { recursive: true });
      await fsPromises.writeFile(path.join(secondPageDir, "index.json"), "{}", "utf8");

      const second = discoverAllPages().filter((p) => p.slugSegments[0] === rootSlug);
      expect(second.length).toBe(2);
    } finally {
      await fsPromises.rm(path.join(PAGE_DATA_DIR, rootSlug), { recursive: true, force: true });
    }
  });
});
