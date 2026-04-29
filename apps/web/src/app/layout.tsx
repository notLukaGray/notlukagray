import type { Metadata, Viewport } from "next";
import "./globals.css";
import { primaryFontLocal, secondaryFontLocal, monoFontLocal } from "@/app/fonts/create-fonts";
import { primaryFontConfig, secondaryFontConfig, monoFontConfig } from "@/app/fonts/config";
import { getActiveWebfontUrls } from "@/app/fonts/webfont";
import { generateFontCssVars } from "@/app/fonts/css-vars";
import { typeScaleConfig } from "@/app/fonts/type-scale";
import { getTwitterCardForOgImage, siteUrl, cdnBase, siteMetadata } from "@/core/lib/globals";
import { ThemeProvider } from "@/core/providers/theme-provider";
import { AppLayout } from "@/core/ui/app-layout";
import { DeviceTypeProvider } from "@/core/providers/device-type-provider";
import { BrowserDataClient } from "@/app/BrowserDataClient";
import { pbBrandCssInline } from "@/app/theme/config";
import { pbBuilderDefaultsV1 } from "@/app/theme/pb-builder-defaults";
import { pbContentGuidelinesCssInline } from "@/app/theme/pb-content-guidelines-config";
import { pbContentGuidelines } from "@/app/theme/pb-content-guidelines-config";
import { getProductionColorToolPersistedV2 } from "@/app/dev/colors/color-tool-persistence";
import { getProductionWorkbenchSession } from "@/app/dev/workbench/workbench-defaults";
import { buildWorkbenchThemeColorVarMap } from "@/app/theme/pb-workbench-color-var-map";
import { serializePbFoundationsCss } from "@/app/theme/pb-foundation-css";
import { setCoreConfig } from "@pb/core";

function getOrigin(value: string): string | null {
  try {
    return new URL(value).origin;
  } catch {
    return null;
  }
}

const cdnOrigin = getOrigin(cdnBase);
const productionColorConfig = getProductionColorToolPersistedV2();
const lightThemeColor =
  buildWorkbenchThemeColorVarMap(productionColorConfig, "light")["--pb-secondary"] ?? "#ffffff";
const darkThemeColor =
  buildWorkbenchThemeColorVarMap(productionColorConfig, "dark")["--pb-secondary"] ?? "#000000";

export const metadata: Metadata = {
  metadataBase: siteUrl ? new URL(siteUrl) : undefined,
  title: siteMetadata.title,
  description: siteMetadata.description,
  alternates: { canonical: "./" },
  openGraph: {
    title: siteMetadata.title,
    description: siteMetadata.description,
  },
  twitter: {
    card: getTwitterCardForOgImage(undefined),
    title: siteMetadata.title,
    description: siteMetadata.description,
  },
  ...(cdnOrigin && {
    icons: {
      other: [
        { rel: "preconnect", url: cdnOrigin },
        { rel: "dns-prefetch", url: cdnOrigin },
      ],
    },
  }),
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: lightThemeColor },
    { media: "(prefers-color-scheme: dark)", color: darkThemeColor },
  ],
};

// Build once at module level — these are pure functions of static config.
const webfontUrls = getActiveWebfontUrls(primaryFontConfig, secondaryFontConfig, monoFontConfig);
const fontCssVars = generateFontCssVars(
  primaryFontConfig,
  secondaryFontConfig,
  monoFontConfig,
  typeScaleConfig
);
const pbFoundationsCss = serializePbFoundationsCss(getProductionWorkbenchSession());

// Only apply a slot's next/font variable className when that slot uses local files.
// Webfont slots get their --font-* var set via the generated <style> block above.
const htmlFontClasses = [
  primaryFontConfig.source === "local" ? primaryFontLocal.variable : null,
  secondaryFontConfig.source === "local" ? secondaryFontLocal.variable : null,
  monoFontConfig.source === "local" ? monoFontLocal.variable : null,
]
  .filter(Boolean)
  .join(" ");

async function DevelopmentClients() {
  if (process.env.NODE_ENV !== "development") return null;
  const { DevRuntimeClients } = await import("./DevRuntimeClients");
  return <DevRuntimeClients />;
}

setCoreConfig({
  builderDefaults: {
    ...pbBuilderDefaultsV1,
    workbenchElements: getProductionWorkbenchSession().elements,
  },
  contentGuidelines: pbContentGuidelines,
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning className={htmlFontClasses}>
      <head>
        {/* Weight vars + webfont family overrides. Injected before any stylesheet
            so CSS custom properties are available when globals.css is parsed. */}
        <style dangerouslySetInnerHTML={{ __html: fontCssVars }} />
        {/* Webfont stylesheets — only present when at least one slot uses "webfont". */}
        {webfontUrls.map((url) => (
          <link key={url} rel="stylesheet" href={url} />
        ))}
      </head>
      <body className="font-sans antialiased">
        {/* PB brand `--pb-*` tokens: `theme/config.ts`. Layout & copy vars: `theme/pb-content-guidelines-config.ts`. */}
        <style dangerouslySetInnerHTML={{ __html: pbBrandCssInline() }} suppressHydrationWarning />
        <style
          id="pb-foundations-runtime"
          dangerouslySetInnerHTML={{ __html: pbFoundationsCss }}
          suppressHydrationWarning
        />
        <style
          dangerouslySetInnerHTML={{ __html: pbContentGuidelinesCssInline() }}
          suppressHydrationWarning
        />
        <DeviceTypeProvider>
          <ThemeProvider attribute="class" disableTransitionOnChange>
            <BrowserDataClient />
            <DevelopmentClients />
            <AppLayout>{children}</AppLayout>
          </ThemeProvider>
        </DeviceTypeProvider>
      </body>
    </html>
  );
}
