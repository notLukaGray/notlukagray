"use client";

import type { PageBuilderAction } from "@pb/contracts/page-builder/core/page-builder-schemas";
import { useActionLogStore } from "@/page-builder/runtime/page-builder-variable-store";

/** Event dispatched by triggers; renderer applies contentOverride, backgroundSwitch, etc. */
export const PAGE_BUILDER_TRIGGER_EVENT = "page-builder-trigger";

export type PageBuilderTriggerDetail = {
  triggerId?: string;
  visible?: boolean;
  progress?: number; // 0-1 scroll progress through section
  source?: "button" | "trigger" | "system";
  action: PageBuilderAction;
};

export function firePageBuilderTrigger(
  visible: boolean,
  action: PageBuilderAction,
  triggerId?: string
): void {
  if (typeof window === "undefined") return;
  window.dispatchEvent(
    new CustomEvent<PageBuilderTriggerDetail>(PAGE_BUILDER_TRIGGER_EVENT, {
      detail: { triggerId, visible, action },
    })
  );
}

export function firePageBuilderProgressTrigger(
  progress: number,
  action: PageBuilderAction,
  triggerId?: string
): void {
  if (typeof window === "undefined") return;
  window.dispatchEvent(
    new CustomEvent<PageBuilderTriggerDetail>(PAGE_BUILDER_TRIGGER_EVENT, {
      detail: { triggerId, progress, action },
    })
  );
}

export function firePageBuilderAction(
  action: PageBuilderAction,
  source: PageBuilderTriggerDetail["source"] = "system"
): void {
  if (typeof window === "undefined") return;
  window.dispatchEvent(
    new CustomEvent<PageBuilderTriggerDetail>(PAGE_BUILDER_TRIGGER_EVENT, {
      detail: { action, source },
    })
  );
  if (process.env.NODE_ENV === "development") {
    useActionLogStore.getState().push({
      type: action.type,
      payload: action.payload,
      timestamp: Date.now(),
      source,
    });
  }
}
