import type {
  TriggerAction,
  SectionBlock,
} from "@pb/contracts/page-builder/core/page-builder-schemas";
import type { BackgroundTransitionEffect } from "@pb/contracts/page-builder/core/page-builder-types";
import type { PageBuilderPageProps } from "@pb/core";
import { buildPageDensityCssVars } from "@pb/contracts/page-builder/core/page-density";
import { PageBuilderRenderer } from "@/page-builder/hooks";
import { FigmaExportDiagnosticsBridge } from "@/page-builder/dev/FigmaExportDiagnosticsBridge";
import { PageScrollProvider } from "@/page-builder/section/position/page-scroll-provider";
import { PageForcedTheme, pageForcedThemeInlineScript } from "./PageForcedTheme";

export type PageBuilderPageWrapperProps = PageBuilderPageProps & {
  mainClassName?: string;

  mainStyle?: React.CSSProperties;

  articleClassName?: string;
};

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

export function PageBuilderPage({
  page,
  resolvedBg,
  resolvedSections,
  bgDefinitions,
  serverIsMobile,
  overlaySections,
  mainClassName = "relative w-full min-h-screen",
  mainStyle = {
    paddingTop: "calc(var(--nav-height, 64px) + env(safe-area-inset-top, 0px))",
    paddingBottom: "48px",
    paddingLeft: "env(safe-area-inset-left, 0px)",
    paddingRight: "env(safe-area-inset-right, 0px)",
    backgroundColor: "#000000",
  },
  articleClassName = "w-full",
}: PageBuilderPageWrapperProps) {
  const density = page.density ?? "balanced";
  const forcedTheme =
    page.forcedTheme === "light" || page.forcedTheme === "dark" ? page.forcedTheme : undefined;
  const densityVars = buildPageDensityCssVars(density) as React.CSSProperties;
  const mergedMainStyle: React.CSSProperties = {
    ...mainStyle,
    ...densityVars,
  };

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
    <main className={mainClassName} style={mergedMainStyle} data-pb-density={density}>
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
    return (
      <>
        {forcedTheme ? (
          <>
            <script
              dangerouslySetInnerHTML={{ __html: pageForcedThemeInlineScript(forcedTheme) }}
            />
            <PageForcedTheme theme={forcedTheme} />
          </>
        ) : null}
        <FigmaExportDiagnosticsBridge diagnostics={page.figmaExportDiagnostics} />
        {pageContent}
      </>
    );
  }

  return (
    <>
      {forcedTheme ? (
        <>
          <script dangerouslySetInnerHTML={{ __html: pageForcedThemeInlineScript(forcedTheme) }} />
          <PageForcedTheme theme={forcedTheme} />
        </>
      ) : null}
      <FigmaExportDiagnosticsBridge diagnostics={page.figmaExportDiagnostics} />
      {sortedOverlays.map((section, i) => {
        const s = section as SectionBlock & {
          fixedPosition?: string;
          zIndex?: number;
          id?: string;
        };
        const fixedPosition = s.fixedPosition ?? "top";
        const resolvedZIndex = s.zIndex ?? (fixedPosition === "top" ? 100 : 50);
        const wrapperStyle: React.CSSProperties = {
          ...densityVars,
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
