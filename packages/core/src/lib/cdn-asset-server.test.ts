import { afterEach, describe, expect, it, vi } from "vitest";
import { getSignedCdnUrl } from "./cdn-asset-server";

describe("getSignedCdnUrl", () => {
  const originalSecret = process.env.BUNNY_TOKEN_SECRET;
  const originalBucket = process.env.BUNNY_TOKEN_EXPIRY_BUCKET_SECONDS;

  afterEach(() => {
    if (originalSecret === undefined) {
      delete process.env.BUNNY_TOKEN_SECRET;
    } else {
      process.env.BUNNY_TOKEN_SECRET = originalSecret;
    }
    if (originalBucket === undefined) {
      delete process.env.BUNNY_TOKEN_EXPIRY_BUCKET_SECONDS;
    } else {
      process.env.BUNNY_TOKEN_EXPIRY_BUCKET_SECONDS = originalBucket;
    }
    vi.restoreAllMocks();
  });

  it("buckets expiry to reduce signed URL churn", () => {
    process.env.BUNNY_TOKEN_SECRET = "test-secret";
    process.env.BUNNY_TOKEN_EXPIRY_BUCKET_SECONDS = "3600";
    vi.spyOn(Date, "now").mockReturnValue(new Date("2026-04-29T12:15:10.000Z").getTime());

    const first = getSignedCdnUrl("work/pic.webp", { width: "400", quality: "75" });
    vi.spyOn(Date, "now").mockReturnValue(new Date("2026-04-29T12:35:20.000Z").getTime());
    const second = getSignedCdnUrl("work/pic.webp", { width: "400", quality: "75" });

    const firstUrl = new URL(first);
    const secondUrl = new URL(second);
    expect(firstUrl.searchParams.get("expires")).toBe(secondUrl.searchParams.get("expires"));
  });

  it("normalizes and clamps image params before signing", () => {
    process.env.BUNNY_TOKEN_SECRET = "test-secret";
    const signed = getSignedCdnUrl("work/pic.webp", {
      width: "99999",
      quality: "0",
      format: "WEBP",
      aspect_ratio: "16/9",
      class: "hero",
      bogus: "x",
    } as Record<string, string>);

    const url = new URL(signed);
    expect(url.searchParams.get("width")).toBe("4096");
    expect(url.searchParams.get("quality")).toBe("1");
    expect(url.searchParams.get("format")).toBe("webp");
    expect(url.searchParams.get("aspect_ratio")).toBe("16:9");
    expect(url.searchParams.get("class")).toBe("hero");
    expect(url.searchParams.get("bogus")).toBeNull();
  });
});
