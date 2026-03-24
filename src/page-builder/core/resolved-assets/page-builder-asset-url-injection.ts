import { isImageRef } from "@/core/lib/proxy-url";
import type { bgBlock, ElementBlock, SectionBlock } from "@/page-builder/core/page-builder-schemas";
import { walkBgBlock, walkElement, walkSectionKeys } from "./page-builder-asset-tree-walk";
import type { GetSignedImageUrlFn, ElementInjectionContext } from "./page-builder-asset-url-map";

function resolveAssetRef(
  ref: string,
  urlByRef: Map<string, string | null>,
  proxyUrlByRef: Map<string, string> | undefined,
  getSignedImageUrl: GetSignedImageUrlFn | undefined,
  obj: Record<string, unknown>,
  key: string,
  isModel3D: boolean,
  elementContext?: ElementInjectionContext
): string {
  const proxy = proxyUrlByRef?.get(ref);
  const cdn = urlByRef.get(ref);

  if (isModel3D) {
    return proxy ?? (cdn !== undefined ? (cdn ?? ref) : ref);
  }

  if (isImageRef(ref) && getSignedImageUrl) {
    return getSignedImageUrl(ref, obj, key, elementContext);
  }

  if (isImageRef(ref)) {
    return cdn !== undefined && cdn != null ? cdn : (proxy ?? ref);
  }

  return proxy ?? (cdn !== undefined ? (cdn ?? ref) : ref);
}

export type InjectResolvedUrlsOptions = {
  onElement?: (section: SectionBlock, element: ElementBlock) => void;
};

export function injectResolvedUrlsIntoPage(
  bg: bgBlock | null,
  sections: SectionBlock[],
  urlByRef: Map<string, string | null>,
  proxyUrlByRef?: Map<string, string>,
  getSignedImageUrl?: GetSignedImageUrlFn,
  options?: InjectResolvedUrlsOptions
): { resolvedBg: bgBlock | null; resolvedSections: SectionBlock[] } {
  const onElement = options?.onElement;
  const resolvedBg: bgBlock | null = bg
    ? (() => {
        const out = { ...bg } as Record<string, unknown>;
        walkBgBlock(out as bgBlock, (key, value, node, kind) => {
          if (typeof value !== "string") return;
          const resolved = resolveAssetRef(
            value,
            urlByRef,
            proxyUrlByRef,
            getSignedImageUrl,
            node,
            key,
            kind === "model3d"
          );
          node[key] = resolved;
        });
        return out as bgBlock;
      })()
    : null;

  const resolvedSections: SectionBlock[] = sections.map((section) => {
    const out = { ...section } as Record<string, unknown>;
    walkSectionKeys(out as SectionBlock, (key, value, node, kind) => {
      if (typeof value !== "string") return;
      const resolved = resolveAssetRef(
        value,
        urlByRef,
        proxyUrlByRef,
        getSignedImageUrl,
        node,
        key,
        kind === "model3d"
      );
      node[key] = resolved;
    });

    const elements = "elements" in section ? section.elements : undefined;
    if (Array.isArray(elements)) {
      out.elements = (elements as ElementBlock[]).map((el) => {
        onElement?.(section, el);
        const e = { ...el } as Record<string, unknown>;
        const elementContext: ElementInjectionContext = {
          section: section as SectionBlock,
          element: el as ElementBlock,
        };
        walkElement(e as ElementBlock, (key, value, node, kind) => {
          if (typeof value !== "string") return;

          // 3D blocks use only MODEL3D_ASSET_KEYS (source, path, geometry); skip webpage
          // ASSET_URL_KEYS (image, src, poster, etc.) so textures never get Bunny/image logic
          // meant for display images.
          if (kind !== "model3d" && (node as { type?: string }).type === "elementModel3D") {
            return;
          }

          const resolved = resolveAssetRef(
            value,
            urlByRef,
            proxyUrlByRef,
            getSignedImageUrl,
            node,
            key,
            kind === "model3d",
            elementContext
          );
          node[key] = resolved;
        });
        return e as ElementBlock;
      });
    }
    return out as SectionBlock;
  });

  return { resolvedBg, resolvedSections };
}

/** Inject URLs into a single bg block (for bg definitions). Avoids full page inject. */
export function injectResolvedUrlsIntoBgBlock(
  bg: bgBlock,
  urlByRef: Map<string, string | null>,
  proxyUrlByRef?: Map<string, string>,
  getSignedImageUrl?: GetSignedImageUrlFn
): bgBlock {
  const out = { ...bg } as Record<string, unknown>;
  walkBgBlock(out as bgBlock, (key, value, node, kind) => {
    if (typeof value !== "string") return;
    const resolved = resolveAssetRef(
      value,
      urlByRef,
      proxyUrlByRef,
      getSignedImageUrl,
      node,
      key,
      kind === "model3d"
    );
    node[key] = resolved;
  });
  return out as bgBlock;
}
