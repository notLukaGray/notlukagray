import { describe, expect, it, vi } from "vitest";

describe("getPageSlugBases nested slug mapping", () => {
  it("keeps the full slug path instead of collapsing to last segment", async () => {
    vi.resetModules();

    vi.doMock("./load/page-builder-discover-pages", () => ({
      discoverAllPages: () => [
        {
          slugSegments: ["work", "shared-leaf"],
          contentPath: "/tmp/work/shared-leaf/index.json",
        },
        {
          slugSegments: ["research", "shared-leaf"],
          contentPath: "/tmp/research/shared-leaf/index.json",
        },
      ],
    }));

    vi.doMock("fs", async (importOriginal) => {
      const actual = await importOriginal<typeof import("fs")>();
      const mocked = {
        ...actual,
        existsSync: () => true,
        readFileSync: (filePath: string) => {
          if (filePath.includes("/tmp/work/")) return '{"assetBaseUrl":"/work"}';
          if (filePath.includes("/tmp/research/")) return '{"assetBaseUrl":"/research"}';
          return "";
        },
      };
      return { ...mocked, default: mocked };
    });

    const { getPageSlugBases } = await import("./page-builder-load");
    expect(getPageSlugBases()).toEqual([
      { slug: "research/shared-leaf", basePath: "/research" },
      { slug: "work/shared-leaf", basePath: "/work" },
    ]);
  });
});
