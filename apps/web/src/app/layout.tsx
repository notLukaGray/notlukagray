import type { Metadata } from "next";
import "./globals.css";
import { primaryFontLocal, secondaryFontLocal, monoFontLocal } from "@/app/fonts/create-fonts";
import { primaryFontConfig, secondaryFontConfig, monoFontConfig } from "@/app/fonts/config";
import { getActiveWebfontUrls } from "@/app/fonts/webfont";
import { generateFontCssVars } from "@/app/fonts/css-vars";
import { typeScaleConfig } from "@/app/fonts/type-scale";
import { siteUrl, cdnBase } from "@/core/lib/globals";
import { ThemeProvider } from "@/core/providers/theme-provider";
import { AppLayout } from "@/core/ui/app-layout";
import { DeviceTypeProvider } from "@/core/providers/device-type-provider";
import { DevPageValidationClient } from "@/core/dev/DevPageValidationClient";
import { DevContentReloadClient } from "@/core/dev/DevContentReloadClient";
import { pbBrandCssInline } from "@/app/theme/config";
import { pbBuilderDefaultsV1 } from "@/app/theme/pb-builder-defaults";
import { pbContentGuidelinesCssInline } from "@/app/theme/pb-content-guidelines-config";
import { pbContentGuidelines } from "@/app/theme/pb-content-guidelines-config";
import { setCoreConfig } from "@pb/core";
import { PageBuilderRuntimeEffects } from "@pb/runtime-react/effects";

const title = "Portfolio";
const description = "Modern portfolio website";

const cdnOrigin =
  typeof cdnBase === "string" ? new URL(cdnBase).origin : "https://media.notlukagray.com";

export const metadata: Metadata = {
  metadataBase: siteUrl ? new URL(siteUrl) : undefined,
  title,
  description,
  alternates: { canonical: "./" },
  robots: { index: true, follow: true },
  openGraph: { title, description },
  twitter: {
    card: "summary_large_image",
    title,
    description,
  },
  icons: {
    other: [
      { rel: "preconnect", url: cdnOrigin },
      { rel: "dns-prefetch", url: cdnOrigin },
    ],
  },
};

export const viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#171717" },
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

// Only apply a slot's next/font variable className when that slot uses local files.
// Webfont slots get their --font-* var set via the generated <style> block above.
const htmlFontClasses = [
  primaryFontConfig.source === "local" ? primaryFontLocal.variable : null,
  secondaryFontConfig.source === "local" ? secondaryFontLocal.variable : null,
  monoFontConfig.source === "local" ? monoFontLocal.variable : null,
]
  .filter(Boolean)
  .join(" ");

setCoreConfig({
  builderDefaults: pbBuilderDefaultsV1,
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
          dangerouslySetInnerHTML={{ __html: pbContentGuidelinesCssInline() }}
          suppressHydrationWarning
        />
        <DeviceTypeProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="dark"
            enableSystem
            disableTransitionOnChange
          >
            {process.env.NODE_ENV === "development" && (
              <>
                <DevPageValidationClient />
                <DevContentReloadClient />
              </>
            )}
            <AppLayout>
              <PageBuilderRuntimeEffects />
              {children}
            </AppLayout>
          </ThemeProvider>
        </DeviceTypeProvider>
      </body>
    </html>
  );
}
