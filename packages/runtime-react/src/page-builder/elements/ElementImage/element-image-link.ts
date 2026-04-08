import type { ElementBlock } from "@pb/core/internal/page-builder-schemas";

type ElementImageProps = Extract<ElementBlock, { type: "elementImage" }>;

export function resolveElementImageLink(link: ElementImageProps["link"]) {
  const href = link?.ref;
  const isExternal = link?.external ?? false;
  const resolvedHref =
    href && (isExternal || href.startsWith("/") || href.startsWith("#"))
      ? href
      : href
        ? `#${href}`
        : null;
  const isInternal = Boolean(resolvedHref && !isExternal && resolvedHref.startsWith("/"));
  return { resolvedHref, isInternal };
}
