import { describe, expect, it } from "vitest";
import { renderToStaticMarkup } from "react-dom/server";
import { ElementHeading } from "./ElementHeading";

describe("ElementHeading semantic contract", () => {
  it("uses semanticLevel for the heading tag while preserving the visual level", () => {
    const markup = renderToStaticMarkup(
      <ElementHeading type="elementHeading" level={4} semanticLevel={1} text="Hello" />
    );

    expect(markup).toContain("<h1");
    expect(markup).toContain("typography-heading-md");
  });

  it("applies gradient textFill over flat color and supports lineHeight", () => {
    const markup = renderToStaticMarkup(
      <ElementHeading
        type="elementHeading"
        level={2}
        text="Gradient"
        color="#111111"
        lineHeight="1.4"
        textFill={{ type: "gradient", value: "linear-gradient(90deg,#f00,#00f)" }}
      />
    );

    expect(markup).toContain("line-height:1.4");
    expect(markup).toContain("background-image:linear-gradient(90deg,#f00,#00f)");
    expect(markup).toContain("color:transparent");
    expect(markup).not.toContain("color:#111111");
  });
});
