"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { clearVariables } from "@/page-builder/runtime/page-builder-variable-store";
import { usePageBuilderActionRunner } from "@/page-builder/hooks/use-page-builder-action-runner";

export function PageBuilderRuntimeEffects() {
  usePageBuilderActionRunner();
  const pathname = usePathname();

  useEffect(() => {
    clearVariables();
  }, [pathname]);

  return null;
}
