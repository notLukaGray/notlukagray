import type { TriggerAction, SectionBlock } from "@/page-builder/core/page-builder-schemas";
import type { BackgroundTransitionEffect } from "@/page-builder/core/page-builder-types";
import type { PageBuilderPageProps } from "@/page-builder/core/page-builder";
import { PageBuilderRenderer } from "@/page-builder/hooks";
import { PageScrollProvider } from "@/page-builder/section/position/page-scroll-provider";

export type PageBuilderPageWrapperProps = PageBuilderPageProps & {
  /** Optional className for the outer <main>. */
  mainClassName?: string;
  /** Optional style for the outer <main>. */
  mainStyle?: React.CSSProperties;
  /** Optional className for the <article> wrapper. */
  articleClassName?: string;
};

/**
 * Strip the fixed-positioning fields from a section before passing it to the renderer.
 * The CSS fixed wrapper is applied externally by PageBuilderPage; the section itself
 * must not call useFixedTrait so that server and client agree on position: "relative".
 */
function stripFixedFields(section: SectionBlock): SectionBlock {
  const {
    fixed: _fixed,
    fixedPosition: _fixedPosition,
    fixedOffset: _fixedOffset,
    ...rest
  } = section as SectionBlock & {
    fixed?: unknown;
    fixedPosition?: unknown;
    fixedOffset?: unknown;
  };
  return rest as SectionBlock;
}

/**
 * Renders a page builder page: main > article > h1 (sr-only) + PageBuilderRenderer.
 * Use with props from getPageBuilderProps(slug, options).
 *
 * Overlay sections (header/footer) are rendered outside the scroll container in plain
 * CSS `position: fixed` wrappers so that `useFixedTrait` is never called on them.
 * This eliminates the SSR/client hydration mismatch where the hook returns
 * `position: "fixed"` on the server (no scroll container) but `position: "absolute"`
 * on the client (scroll container found).
 *
 * When `page.scroll` is set, wraps content in PageScrollProvider which applies
 * smooth scroll, body scroll-lock, and overflow classes, and provides
 * ScrollContainerProvider for section motion effects.
 */
export function PageBuilderPage({
  page,
  resolvedBg,
  resolvedSections,
  bgDefinitions,
  serverIsMobile,
  overlaySections,
  mainClassName = "relative w-full min-h-screen bg-black",
  mainStyle = {
    paddingTop: "var(--nav-height, 64px)",
    paddingBottom: "var(--footer-height, 48px)",
  },
  articleClassName = "w-full",
}: PageBuilderPageWrapperProps) {
  // Sort overlays: top-positioned (header) first, bottom-positioned (footer) last.
  const sortedOverlays = overlaySections
    ? [...overlaySections].sort((a, b) => {
        const aPos = (a as SectionBlock & { fixedPosition?: string }).fixedPosition ?? "top";
        const bPos = (b as SectionBlock & { fixedPosition?: string }).fixedPosition ?? "top";
        if (aPos === bPos) return 0;
        return aPos === "top" ? -1 : 1;
      })
    : [];

  const inner = (
    <main className={mainClassName} style={mainStyle}>
      <article className={articleClassName} aria-label={page.title} data-liquid-snapshot-root="">
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

  const pageContent =
    page.scroll != null ? (
      <PageScrollProvider scroll={page.scroll}>{inner}</PageScrollProvider>
    ) : (
      inner
    );

  if (sortedOverlays.length === 0) {
    return pageContent;
  }

  return (
    <>
      {sortedOverlays.map((section, i) => {
        const s = section as SectionBlock & {
          fixedPosition?: string;
          zIndex?: number;
          id?: string;
        };
        const fixedPosition = s.fixedPosition ?? "top";
        const resolvedZIndex = s.zIndex ?? (fixedPosition === "top" ? 100 : 50);
        const wrapperStyle: React.CSSProperties = {
          position: "fixed",
          left: 0,
          right: 0,
          zIndex: resolvedZIndex,
          pointerEvents: "none",
          ...(fixedPosition === "bottom" ? { bottom: 0 } : { top: 0 }),
        };
        const strippedSection = stripFixedFields(section);
        return (
          <div key={s.id ?? `overlay-${i}`} style={wrapperStyle}>
            <div style={{ pointerEvents: "auto" }}>
              <PageBuilderRenderer
                resolvedBg={null}
                resolvedSections={[strippedSection]}
                serverIsMobile={serverIsMobile}
              />
            </div>
          </div>
        );
      })}
      {pageContent}
    </>
  );
}
