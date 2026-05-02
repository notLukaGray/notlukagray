import fs from "fs";
import path from "path";
import { describe, expect, it } from "vitest";
import type { PageBuilderDefinitionBlock } from "@pb/contracts";
import { PAGE_DATA_DIR } from "./page-builder-load-io";
import {
  hydrateSectionFilesBySegments,
  hydrateSectionFilesBySegmentsAsync,
} from "./page-builder-load-definitions-hydrate";

function writeJson(filePath: string, value: unknown): void {
  fs.writeFileSync(filePath, JSON.stringify(value, null, 2), "utf8");
}

describe("hydrateSectionFilesBySegments parity", () => {
  it("keeps section keys protected and applies deterministic fragment order", async () => {
    const slug = `loader-test-${Date.now()}`;
    const pageDir = path.join(PAGE_DATA_DIR, slug);
    fs.mkdirSync(pageDir, { recursive: true });

    try {
      writeJson(path.join(pageDir, "hero.json"), {
        type: "contentBlock",
        definitions: {
          hero: { type: "SHOULD_NOT_WIN" },
          nestedOnly: { type: "elementBody", text: "nested" },
        },
      });
      writeJson(path.join(pageDir, "z-fragment.json"), {
        shared: { type: "elementBody", text: "z" },
      });
      writeJson(path.join(pageDir, "a-fragment.json"), {
        shared: { type: "elementBody", text: "a" },
      });

      const syncDefs = hydrateSectionFilesBySegments({}, [slug], ["hero"]) as Record<
        string,
        PageBuilderDefinitionBlock & { text?: string }
      >;
      const asyncDefs = (await hydrateSectionFilesBySegmentsAsync({}, [slug], ["hero"])) as Record<
        string,
        PageBuilderDefinitionBlock & { text?: string }
      >;

      expect((syncDefs.hero as { type?: string }).type).toBe("contentBlock");
      expect((asyncDefs.hero as { type?: string }).type).toBe("contentBlock");
      expect((syncDefs.nestedOnly as { type?: string }).type).toBe("elementBody");
      expect((asyncDefs.nestedOnly as { type?: string }).type).toBe("elementBody");
      expect((syncDefs.shared as { text?: string }).text).toBe("z");
      expect((asyncDefs.shared as { text?: string }).text).toBe("z");
      expect(asyncDefs).toEqual(syncDefs);
    } finally {
      fs.rmSync(pageDir, { recursive: true, force: true });
    }
  });
});
