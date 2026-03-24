import JSZip from "jszip";
import { describe, expect, it } from "vitest";
import { buildExportZip } from "./ui-zip";

describe("export zip packaging", () => {
  it("includes export-trace.json when a trace is present", async () => {
    const blob = await buildExportZip(
      {
        pages: {},
        presets: {},
        modals: {},
        modules: {},
        globals: {},
        assets: [],
        warnings: [],
        trace: {
          counts: {
            severity: { error: 0, warn: 1, info: 0 },
            category: { preflight: 1 },
          },
          frames: [],
        },
        elementCount: 0,
      },
      [],
      0,
      0
    );

    const zip = await JSZip.loadAsync(await blob.arrayBuffer());
    expect(zip.file("export-trace.json")).toBeTruthy();

    const traceJson = await zip.file("export-trace.json")!.async("string");
    expect(JSON.parse(traceJson)).toEqual({
      counts: {
        severity: { error: 0, warn: 1, info: 0 },
        category: { preflight: 1 },
      },
      frames: [],
    });
  });
});
