import { describe, expect, it } from "vitest";
import type { PageBuilderDefinitionBlock } from "@pb/contracts";
import { mergeNestedSectionDefinitions } from "./page-builder-load-definitions-merge";

describe("mergeNestedSectionDefinitions", () => {
  it("does not let nested defs overwrite a section key", () => {
    const definitions: Record<string, PageBuilderDefinitionBlock> = {
      hero: { type: "contentBlock" } as unknown as PageBuilderDefinitionBlock,
    };
    const sectionSet = new Set(["hero"]);
    const nested = {
      hero: { type: "SHOULD_NOT_WIN" },
      extra: { type: "elementBody", text: "x" },
    };

    mergeNestedSectionDefinitions(definitions, nested, sectionSet);

    expect((definitions.hero as { type?: string }).type).toBe("contentBlock");
    expect((definitions.extra as { type?: string }).type).toBe("elementBody");
  });
});
