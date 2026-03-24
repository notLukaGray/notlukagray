import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { siteUrl, cdnBase } from "@/core/lib/globals";
import { ThemeProvider } from "@/core/providers/theme-provider";
import { AppLayout } from "@/core/ui/app-layout";
import { DeviceTypeProvider } from "@/core/providers/device-type-provider";
import { DevPageValidationClient } from "@/core/dev/DevPageValidationClient";
import { DevContentReloadClient } from "@/core/dev/DevContentReloadClient";

const exo2 = localFont({
  src: [
    {
      path: "../../public/font/exo-2-latin-wght-normal.woff2",
      style: "normal",
      weight: "100 900",
    },
    {
      path: "../../public/font/exo-2-latin-wght-italic.woff2",
      style: "italic",
      weight: "100 900",
    },
  ],
  variable: "--font-exo2",
  // optional = never block first paint on font load (better LCP; fallback used if font not ready)
  display: "optional",
  preload: true,
  // Match fallback font metrics to Exo 2 to reduce reflow and element render delay when font loads
  adjustFontFallback: "Arial",
});

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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning className={exo2.variable}>
      <body className={`${exo2.className} antialiased`}>
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
            <AppLayout>{children}</AppLayout>
          </ThemeProvider>
        </DeviceTypeProvider>
      </body>
    </html>
  );
}
