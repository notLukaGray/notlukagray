import fs from "fs";
import path from "path";
import { describe, expect, it, vi } from "vitest";
import { PAGE_DATA_DIR } from "./page-builder-load-io";
import { resolvePagePath } from "./page-builder-discover-pages";

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
