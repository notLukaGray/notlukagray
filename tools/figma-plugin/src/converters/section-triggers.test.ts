import { describe, expect, it } from "vitest";
import { parseSectionTriggerProps } from "./section-triggers";

describe("section trigger annotations", () => {
  it("parses scrollSpeed from section annotations", () => {
    const props = parseSectionTriggerProps({
      scrollspeed: "0.6",
    });

    expect(props).toMatchObject({
      scrollSpeed: 0.6,
    });
  });

  it("ignores invalid scrollSpeed values", () => {
    const props = parseSectionTriggerProps({
      scrollspeed: "fast",
    });

    expect(props).not.toHaveProperty("scrollSpeed");
  });
});
