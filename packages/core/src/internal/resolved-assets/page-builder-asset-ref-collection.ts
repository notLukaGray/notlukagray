import type { bgBlock, SectionBlock } from "@pb/contracts";
import { walkPageBuilderAssetTree } from "./page-builder-asset-tree-walk";

type AssetRefCollector = { seen: Set<string>; refs: string[] };

function addAssetRef(ref: string, collector: AssetRefCollector): void {
  if (!ref || typeof ref !== "string") return;
  if (collector.seen.has(ref)) return;
  if (
    ref.startsWith("http://") ||
    ref.startsWith("https://") ||
    ref.startsWith("/api/video/") ||
    ref.startsWith("data:")
  )
    return;
  collector.seen.add(ref);
  collector.refs.push(ref);
}

export function collectPageBuilderAssetRefs(
  bg: bgBlock | null,
  sections: SectionBlock[]
): string[] {
  const collector: AssetRefCollector = { seen: new Set<string>(), refs: [] };

  walkPageBuilderAssetTree(bg, sections, (_key, value) => {
    if (typeof value === "string") addAssetRef(value, collector);
  });

  return collector.refs;
}
