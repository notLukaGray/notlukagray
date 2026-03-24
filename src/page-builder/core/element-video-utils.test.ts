import { describe, it, expect, vi } from "vitest";
import {
  resolveVideoShowWhen,
  getVideoActionHandler,
  resolveVideoLink,
  getElementVideoVideoStyle,
  getElementVideoInnerStyle,
  type VideoShowWhenState,
  type VideoActionHandlers,
} from "./element-video-utils";

describe("element-video-utils", () => {
  const state: VideoShowWhenState = {
    isPlaying: true,
    isMuted: false,
    isFullscreen: false,
  };

  describe("resolveVideoShowWhen", () => {
    it("returns true when showWhen is undefined", () => {
      expect(resolveVideoShowWhen(undefined, state)).toBe(true);
    });
    it("returns isPlaying for assetPlaying", () => {
      expect(resolveVideoShowWhen("assetPlaying", state)).toBe(true);
      expect(resolveVideoShowWhen("assetPlaying", { ...state, isPlaying: false })).toBe(false);
    });
    it("returns !isPlaying for assetPaused", () => {
      expect(resolveVideoShowWhen("assetPaused", state)).toBe(false);
    });
    it("returns isMuted for assetMuted", () => {
      expect(resolveVideoShowWhen("assetMuted", { ...state, isMuted: true })).toBe(true);
    });
    it("returns isFullscreen for videoFullscreen", () => {
      expect(resolveVideoShowWhen("videoFullscreen", { ...state, isFullscreen: true })).toBe(true);
    });
    it("returns true for unknown showWhen", () => {
      expect(resolveVideoShowWhen("unknown", state)).toBe(true);
    });
  });

  describe("getVideoActionHandler", () => {
    const handlers: VideoActionHandlers = {
      onPlay: () => {},
      onPause: () => {},
      onTogglePlay: () => {},
      onSeek: () => {},
      onMuteToggle: () => {},
      onFullscreenToggle: () => {},
    };

    it("returns undefined when action is undefined", () => {
      expect(getVideoActionHandler(undefined, undefined, handlers)).toBeUndefined();
    });
    it("returns onPlay for assetPlay", () => {
      const fn = getVideoActionHandler("assetPlay", undefined, handlers);
      expect(fn).toBe(handlers.onPlay);
    });
    it("returns function that calls onSeek(payload) for assetSeek", () => {
      const onSeek = vi.fn();
      const fn = getVideoActionHandler("assetSeek", -10, { ...handlers, onSeek });
      expect(fn).toBeDefined();
      fn!();
      expect(onSeek).toHaveBeenCalledWith(-10);
    });
    it("uses 0 when assetSeek payload is undefined", () => {
      const onSeek = vi.fn();
      const fn = getVideoActionHandler("assetSeek", undefined, { ...handlers, onSeek });
      fn!();
      expect(onSeek).toHaveBeenCalledWith(0);
    });
  });

  describe("resolveVideoLink", () => {
    it("returns not linkable when showPlayButton is true", () => {
      expect(resolveVideoLink({ ref: "/page" }, true)).toEqual({
        isLinkable: false,
        resolvedHref: null,
        isInternal: false,
      });
    });
    it("returns not linkable when link has no ref", () => {
      expect(resolveVideoLink({}, false)).toEqual({
        isLinkable: false,
        resolvedHref: null,
        isInternal: false,
      });
    });
    it("returns internal link for / path", () => {
      expect(resolveVideoLink({ ref: "/about" }, false)).toEqual({
        isLinkable: true,
        resolvedHref: "/about",
        isInternal: true,
      });
    });
    it("returns internal link for # anchor", () => {
      expect(resolveVideoLink({ ref: "#section" }, false)).toEqual({
        isLinkable: true,
        resolvedHref: "#section",
        isInternal: false,
      });
    });
    it("prefixes with # when ref is not external and not / or #", () => {
      expect(resolveVideoLink({ ref: "section-id" }, false)).toEqual({
        isLinkable: true,
        resolvedHref: "#section-id",
        isInternal: false,
      });
    });
    it("returns external when link.external is true", () => {
      expect(resolveVideoLink({ ref: "https://example.com", external: true }, false)).toEqual({
        isLinkable: true,
        resolvedHref: "https://example.com",
        isInternal: false,
      });
    });
  });

  describe("getElementVideoVideoStyle", () => {
    it("returns cover style for cover objectFit", () => {
      const style = getElementVideoVideoStyle("cover", "center");
      expect(style.objectFit).toBe("cover");
      expect(style.objectPosition).toBe("center");
      expect(style.width).toBe("100%");
    });
    it("returns fillWidth style for fillWidth", () => {
      const style = getElementVideoVideoStyle("fillWidth");
      expect(style.width).toBe("100%");
      expect(style.height).toBe("auto");
    });
    it("returns fillHeight style for fillHeight", () => {
      const style = getElementVideoVideoStyle("fillHeight");
      expect(style.height).toBe("100%");
      expect(style.width).toBe("auto");
    });
    it("returns cover as default when objectFit undefined", () => {
      const style = getElementVideoVideoStyle(undefined);
      expect(style.objectFit).toBe("cover");
    });
  });

  describe("getElementVideoInnerStyle", () => {
    const base = { display: "flex", width: "100%", height: "100%" };
    it("returns baseStyle when objectFit is cover", () => {
      expect(getElementVideoInnerStyle(base, "cover")).toEqual(base);
    });
    it("adds height auto and alignItems stretch for fillWidth", () => {
      expect(getElementVideoInnerStyle(base, "fillWidth")).toEqual({
        ...base,
        height: "auto",
        alignItems: "stretch",
      });
    });
    it("adds width auto and justifyContent stretch for fillHeight", () => {
      expect(getElementVideoInnerStyle(base, "fillHeight")).toEqual({
        ...base,
        width: "auto",
        justifyContent: "stretch",
      });
    });
    it("uses first value when objectFit is tuple", () => {
      expect(getElementVideoInnerStyle(base, ["fillWidth", "cover"])).toEqual({
        ...base,
        height: "auto",
        alignItems: "stretch",
      });
    });
  });
});
