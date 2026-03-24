import { describe, expect, it } from "vitest";
import { renderToStaticMarkup } from "react-dom/server";
import { ElementHeading } from "./ElementHeading";

describe("ElementHeading semantic contract", () => {
  it("uses semanticLevel for the heading tag while preserving the visual level", () => {
    const markup = renderToStaticMarkup(
      <ElementHeading type="elementHeading" level={4} semanticLevel={1} text="Hello" />
    );

    expect(markup).toContain("<h1");
    expect(markup).toContain("typography-heading-tertiary-light");
  });
});
