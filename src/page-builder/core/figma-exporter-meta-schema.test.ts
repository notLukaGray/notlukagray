import { describe, expect, it } from "vitest";
import { elementBlockSchema } from "@/page-builder/core/page-builder-schemas/element-block-schemas";
import {
  figmaExporterMetaSchema,
  pageBuilderMetaSchema,
} from "@/page-builder/core/page-builder-schemas/figma-exporter-meta-schema";

describe("pageBuilderMetaSchema", () => {
  it("accepts meta.figma and preserves extension keys on meta and figma", () => {
    const parsed = pageBuilderMetaSchema.safeParse({
      figma: {
        sourceType: "STICKY",
        futureField: "kept",
      },
      otherVendor: { x: 1 },
    });
    expect(parsed.success).toBe(true);
    if (parsed.success) {
      expect(parsed.data.figma?.sourceType).toBe("STICKY");
      expect(parsed.data.figma && "futureField" in parsed.data.figma).toBe(true);
      expect("otherVendor" in parsed.data).toBe(true);
    }
  });

  it("accepts originalLayers aligned with divider layers", () => {
    const parsed = figmaExporterMetaSchema.safeParse({
      originalLayers: [{ fill: "#000", blendMode: "multiply", opacity: 0.5 }],
    });
    expect(parsed.success).toBe(true);
  });
});

describe("elementBlockSchema with meta.figma", () => {
  it("parses elementHeading with nested exporter metadata", () => {
    const parsed = elementBlockSchema.safeParse({
      type: "elementHeading",
      level: 2,
      text: "Hi",
      meta: {
        figma: {
          sourceName: "Title",
          fallbackReason: "test-reason",
          exporterNote: "parity",
        },
      },
    });
    expect(parsed.success).toBe(true);
  });
});
