"use client";

import { useEffect } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import { clearVariables } from "@/page-builder/runtime/page-builder-variable-store";
import { usePageBuilderActionRunner } from "@/page-builder/hooks/use-page-builder-action-runner";

export function PageBuilderRuntimeEffects() {
  usePageBuilderActionRunner();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const searchKey = searchParams.toString();

  useEffect(() => {
    clearVariables();
  }, [pathname, searchKey]);

  return null;
}
