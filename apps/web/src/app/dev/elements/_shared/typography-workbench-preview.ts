import { mergeTypographyDevRuntime } from "@/app/dev/elements/image/runtime-draft";
import type { ImageRuntimeDraft } from "@/app/dev/elements/image/types";
import type { ElementBlock } from "@pb/contracts";
import { resolveEntranceMotionsForElement } from "@pb/runtime-react/dev-core";

/** Merged dev runtime fields + `motionTiming.resolvedEntranceMotion` — same shape page JSON uses before render. */
export function buildResolvedTypographyWorkbenchBlock(
  draft: ImageRuntimeDraft,
  element: Record<string, unknown> & { type: ElementBlock["type"] }
): ElementBlock {
  const merged = mergeTypographyDevRuntime(draft, element) as Record<string, unknown>;
  const mt = merged.motionTiming as Record<string, unknown> | undefined;
  // Match image dev preview: nested flex + clip can prevent reliable `whileInView`; mount entrance on `onMount`.
  if (mt && typeof mt === "object") {
    merged.motionTiming = { ...mt, trigger: "onMount" };
  }
  return resolveEntranceMotionsForElement(merged) as ElementBlock;
}
