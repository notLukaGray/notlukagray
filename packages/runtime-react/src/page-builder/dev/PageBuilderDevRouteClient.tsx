"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { PageBuilderDevOverlay } from "@/page-builder/dev/PageBuilderDevOverlay";
import { useFigmaExportDiagnosticsStore } from "@/page-builder/dev/figma-export-diagnostics-store";

export function PageBuilderDevRouteClient() {
  const pathname = usePathname();

  useEffect(() => {
    useFigmaExportDiagnosticsStore.getState().clear();
  }, [pathname]);

  return <PageBuilderDevOverlay />;
}
