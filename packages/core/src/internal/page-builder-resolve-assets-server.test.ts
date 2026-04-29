import { afterEach, describe, expect, it } from "vitest";
import { resolvePageBuilderAssetsOnServer } from "./page-builder-resolve-assets-server";

describe("resolvePageBuilderAssetsOnServer", () => {
  const originalSecret = process.env.BUNNY_TOKEN_SECRET;

  afterEach(() => {
    if (originalSecret === undefined) {
      delete process.env.BUNNY_TOKEN_SECRET;
    } else {
      process.env.BUNNY_TOKEN_SECRET = originalSecret;
    }
  });

  it("routes fill element images through the proxy so next/image can negotiate width", () => {
    const { resolvedSections } = resolvePageBuilderAssetsOnServer(
      null,
      [
        {
          type: "contentBlock",
          elements: [
            {
              type: "elementImage",
              id: "img-fill",
              src: "work/pic.webp",
              alt: "",
              width: "100%",
              height: "20rem",
            },
          ],
        },
      ] as never[],
      {},
      [],
      { isMobile: false }
    );

    const src = (resolvedSections[0] as unknown as { elements: Array<{ src: string }> })
      .elements[0]!.src;
    expect(src).toBe("/api/video/work/pic.webp?format=webp");
  });

  it("keeps intrinsic element images on fixed signed urls", () => {
    process.env.BUNNY_TOKEN_SECRET = "test-secret";

    const { resolvedSections } = resolvePageBuilderAssetsOnServer(
      null,
      [
        {
          type: "contentBlock",
          elements: [
            {
              type: "elementImage",
              id: "img-hug",
              src: "work/pic.webp",
              alt: "",
              width: "400px",
              height: "hug",
            },
          ],
        },
      ] as never[],
      {},
      [],
      { isMobile: false }
    );

    const src = (resolvedSections[0] as unknown as { elements: Array<{ src: string }> })
      .elements[0]!.src;
    const url = new URL(src);
    expect(url.origin).toBe("https://media.notlukagray.com");
    expect(url.pathname).toBe("/website/work/pic.webp");
    expect(url.searchParams.get("width")).toBe("400");
    expect(url.searchParams.get("quality")).toBe("75");
    expect(url.searchParams.get("format")).toBe("webp");
  });

  it("routes fill-height element images through the proxy so next/image can negotiate width", () => {
    const { resolvedSections } = resolvePageBuilderAssetsOnServer(
      null,
      [
        {
          type: "contentBlock",
          elements: [
            {
              type: "elementImage",
              id: "img-fill-height",
              src: "work/pic.webp",
              alt: "",
              width: "18rem",
              height: "100%",
            },
          ],
        },
      ] as never[],
      {},
      [],
      { isMobile: false }
    );

    const src = (resolvedSections[0] as unknown as { elements: Array<{ src: string }> })
      .elements[0]!.src;
    expect(src).toBe("/api/video/work/pic.webp?format=webp");
  });

  it("routes background video posters through the proxy for responsive fallback images", () => {
    const { resolvedBg } = resolvePageBuilderAssetsOnServer(
      {
        type: "backgroundVideo",
        video: "work/hero.mp4",
        poster: "work/hero.webp",
      } as never,
      [],
      {},
      [],
      { isMobile: false }
    );

    expect((resolvedBg as { poster: string }).poster).toBe(
      "/api/video/work/hero.webp?format=webp&aspect_ratio=16%3A9"
    );
  });
});
