import { describe, expect, it } from "vitest";
import { sanitizeRichTextMarkup } from "./sanitize-rich-text";

describe("sanitizeRichTextMarkup", () => {
  it("removes script tags and event handlers", () => {
    const raw =
      '<span onclick="alert(1)" style="font-size:18px;color:#fff">Hello</span><script>alert(1)</script>';
    const safe = sanitizeRichTextMarkup(raw);
    expect(safe).toContain("<span");
    expect(safe).not.toContain("onclick=");
    expect(safe).not.toContain("<script");
  });

  it("blocks javascript hrefs but keeps safe links", () => {
    const raw =
      '<a href="javascript:alert(1)" target="_blank">Bad</a><a href="https://example.com" target="_blank" rel="noopener">Good</a>';
    const safe = sanitizeRichTextMarkup(raw);
    expect(safe).not.toContain('href="javascript:alert(1)"');
    expect(safe).toContain('href="https://example.com"');
  });

  it("keeps only allowed style declarations", () => {
    const raw =
      '<span style="font-size:30px;line-height:40px;background:url(javascript:1);position:absolute;color:#fff">Copy</span>';
    const safe = sanitizeRichTextMarkup(raw);
    expect(safe).toContain('style="font-size:30px;line-height:40px;color:#fff"');
    expect(safe).not.toContain("background:");
    expect(safe).not.toContain("position:");
  });

  it("preserves semantic emphasis tags", () => {
    const raw = '<span style="font-size:50px"><strong><em>Text</em></strong></span>';
    const safe = sanitizeRichTextMarkup(raw);
    expect(safe).toContain("<strong>");
    expect(safe).toContain("<em>");
    expect(safe).toContain("Text");
  });
});
