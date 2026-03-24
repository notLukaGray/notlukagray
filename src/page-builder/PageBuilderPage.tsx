import type { TriggerAction } from "@/page-builder/core/page-builder-schemas";
import type { BackgroundTransitionEffect } from "@/page-builder/core/page-builder-types";
import type { PageBuilderPageProps } from "@/page-builder/core/page-builder";
import { PageBuilderRenderer } from "@/page-builder/hooks";

export type PageBuilderPageWrapperProps = PageBuilderPageProps & {
  /** Optional className for the outer <main>. */
  mainClassName?: string;
  /** Optional style for the outer <main>. */
  mainStyle?: React.CSSProperties;
  /** Optional className for the <article> wrapper. */
  articleClassName?: string;
};

/**
 * Renders a page builder page: main > article > h1 (sr-only) + PageBuilderRenderer.
 * Use with props from getPageBuilderProps(slug, options).
 */
export function PageBuilderPage({
  page,
  resolvedBg,
  resolvedSections,
  bgDefinitions,
  serverIsMobile,
  mainClassName = "relative w-full min-h-screen bg-black",
  mainStyle = { paddingBottom: "var(--footer-height)" },
  articleClassName = "w-full",
}: PageBuilderPageWrapperProps) {
  return (
    <main className={mainClassName} style={mainStyle}>
      <article className={articleClassName} aria-label={page.title}>
        <h1 className="sr-only">{page.title}</h1>
        <PageBuilderRenderer
          resolvedBg={resolvedBg}
          resolvedSections={resolvedSections}
          onPageProgress={page.onPageProgress as TriggerAction | undefined}
          bgDefinitions={bgDefinitions}
          transitions={
            page.transitions as
              | BackgroundTransitionEffect
              | BackgroundTransitionEffect[]
              | undefined
          }
          serverIsMobile={serverIsMobile}
        />
      </article>
    </main>
  );
}
