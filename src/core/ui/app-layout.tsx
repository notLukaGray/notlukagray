"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { usePageBuilderActionRunner } from "@/page-builder/hooks/use-page-builder-action-runner";
import { clearVariables } from "@/page-builder/core/page-builder-variable-store";
import { PageBuilderDevOverlay } from "@/page-builder/dev/PageBuilderDevOverlay";
import { useFigmaExportDiagnosticsStore } from "@/page-builder/dev/figma-export-diagnostics-store";

type AppLayoutProps = {
  children: React.ReactNode;
};

export function AppLayout({ children }: AppLayoutProps) {
  usePageBuilderActionRunner();
  const pathname = usePathname();

  useEffect(() => {
    clearVariables();
    useFigmaExportDiagnosticsStore.getState().clear();
  }, [pathname]);

  return (
    <>
      <div className="min-h-dvh w-full min-w-0 flex flex-col">{children}</div>
      <PageBuilderDevOverlay />
    </>
  );
}
