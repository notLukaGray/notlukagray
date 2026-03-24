import { describe, expect, it } from "vitest";
import { parseTargetOverride } from "./main-frame-detect";

describe("parseTargetOverride", () => {
  it("keeps slash-name key semantics aligned with detectExportTarget", () => {
    const frame = { name: "Section/Hero Banner" } as FrameNode;
    const target = parseTargetOverride("modal", frame);

    expect(target).toMatchObject({
      type: "modal",
      key: "hero-banner",
      label: "Hero Banner",
    });
  });

  it("falls back to whole frame name when no slash exists", () => {
    const frame = { name: "Landing Hero" } as FrameNode;
    const target = parseTargetOverride("page", frame);

    expect(target).toMatchObject({
      type: "page",
      key: "landing-hero",
      label: "Landing Hero",
    });
  });
});
