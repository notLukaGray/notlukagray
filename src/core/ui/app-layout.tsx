"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { Header, Footer } from "./header-footer";
import { usePageBuilderActionRunner } from "@/page-builder/hooks/use-page-builder-action-runner";
import { clearVariables } from "@/page-builder/core/page-builder-variable-store";
import { layoutFromJsonSlugs } from "@/core/lib/globals";
import { PageBuilderDevOverlay } from "@/page-builder/dev/PageBuilderDevOverlay";

type AppLayoutProps = {
  children: React.ReactNode;
};

export function AppLayout({ children }: AppLayoutProps) {
  usePageBuilderActionRunner();
  const pathname = usePathname();

  useEffect(() => {
    clearVariables();
  }, [pathname]);
  const isWorkPage = pathname?.startsWith("/work") ?? false;
  const isResearchSlug = pathname?.startsWith("/research/") ?? false;
  const isPbDevPage = pathname?.startsWith("/pb-dev") ?? false;
  const useLayoutFromJson = pathname && (layoutFromJsonSlugs.includes(pathname) || isResearchSlug);
  const hideSiteChrome = useLayoutFromJson || isPbDevPage;

  return (
    <>
      {!hideSiteChrome && <Header />}
      <div
        className="min-h-dvh w-full min-w-0 flex flex-col"
        style={{
          paddingBottom: isWorkPage || isResearchSlug ? 0 : "var(--footer-height)",
        }}
      >
        {children}
      </div>
      {!hideSiteChrome && <Footer />}
      <PageBuilderDevOverlay />
    </>
  );
}
