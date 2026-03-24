import type { SectionBlock } from "../page-builder-schemas";

const VIEWPORT_MOBILE_PX = 768;
const VIEWPORT_DESKTOP_PX = 1920;

function parsePercent(value: unknown): number | undefined {
  if (value == null) return undefined;
  const s = String(value).trim();
  const m = s.match(/^(\d+(?:\.\d+)?)\s*%$/);
  return m ? Math.min(1, Math.max(0, Number(m[1]) / 100)) : undefined;
}

export function computeContainerWidthPx(
  section: SectionBlock,
  elementId: string | undefined,
  isMobile: boolean
): number | undefined {
  const viewportPx = isMobile ? VIEWPORT_MOBILE_PX : VIEWPORT_DESKTOP_PX;
  const sectionRecord = section as Record<string, unknown>;
  const widthPct = parsePercent(sectionRecord.width) ?? 1;
  const contentWidthPct = parsePercent(sectionRecord.contentWidth) ?? 1;
  const contentAreaPx = Math.round(viewportPx * widthPct * contentWidthPct);
  if (contentAreaPx <= 0) return undefined;

  const type = sectionRecord.type as string | undefined;
  if (type === "contentBlock" || type === "scrollContainer" || type === "revealSection") {
    return contentAreaPx;
  }
  if (type !== "sectionColumn") return contentAreaPx;

  const columnSpan = sectionRecord.columnSpan as Record<string, number | "all"> | undefined;
  if (elementId && columnSpan?.[elementId] === "all") return contentAreaPx;

  const columnWidths = sectionRecord.columnWidths as number[] | undefined;
  const columnAssignments = sectionRecord.columnAssignments as Record<string, number> | undefined;
  if (!Array.isArray(columnWidths) || columnWidths.length === 0) return contentAreaPx;
  const total = columnWidths.reduce((a, b) => a + b, 0);
  if (total <= 0) return contentAreaPx;

  const colIndex =
    elementId != null && columnAssignments && typeof columnAssignments[elementId] === "number"
      ? columnAssignments[elementId]
      : 0;
  const fraction = columnWidths[Math.min(colIndex, columnWidths.length - 1)]! / total;
  return Math.round(contentAreaPx * fraction);
}

function buildMemoKey(
  section: SectionBlock,
  elementId: string | undefined,
  isMobile: boolean
): string {
  const sectionRecord = section as Record<string, unknown>;
  const widthPct = parsePercent(sectionRecord.width) ?? 1;
  const contentWidthPct = parsePercent(sectionRecord.contentWidth) ?? 1;
  const type = (sectionRecord.type as string) ?? "";
  const columnWidths = sectionRecord.columnWidths as number[] | undefined;
  const columnAssignments = sectionRecord.columnAssignments as Record<string, number> | undefined;
  const colIndex =
    elementId != null && columnAssignments && typeof columnAssignments[elementId] === "number"
      ? columnAssignments[elementId]
      : 0;
  const columnWidthsStr = Array.isArray(columnWidths) ? columnWidths.join(",") : "";
  return `${widthPct}:${contentWidthPct}:${type}:${columnWidthsStr}:${colIndex}:${isMobile}`;
}

/**
 * Returns a memoized version of computeContainerWidthPx that caches results within a single
 * tree walk. Create one per resolvePageBuilderAssetsOnServer call so the map does not persist across requests.
 */
export function createMemoizedComputeContainerWidthPx(): (
  section: SectionBlock,
  elementId: string | undefined,
  isMobile: boolean
) => number | undefined {
  const memo = new Map<string, number | undefined>();
  return (section, elementId, isMobile) => {
    const key = buildMemoKey(section, elementId, isMobile);
    if (memo.has(key)) return memo.get(key);
    const result = computeContainerWidthPx(section, elementId, isMobile);
    memo.set(key, result);
    return result;
  };
}
