import type { NextConfig } from "next";
import fs from "node:fs";
import path from "node:path";

function readCdnBase(): string {
  try {
    const configPath = path.join(process.cwd(), "src/content/config/cdn.json");
    const raw = fs.readFileSync(configPath, "utf8");
    const parsed = JSON.parse(raw) as { cdnBase?: unknown };
    return typeof parsed.cdnBase === "string"
      ? parsed.cdnBase
      : "https://media.notlukagray.com/website";
  } catch {
    return "https://media.notlukagray.com/website";
  }
}

function getCdnHostname(url: string): string | null {
  try {
    const parsed = new URL(url);
    return parsed.hostname;
  } catch {
    return null;
  }
}

const cdnHostname = getCdnHostname(readCdnBase());

const nextConfig: NextConfig = {
  allowedDevOrigins: ["192.168.1.*"],
  reactCompiler: true,
  async redirects() {
    return [{ source: "/pb-dev/playground", destination: "/playground", permanent: false }];
  },
  logging: {
    incomingRequests: {
      ignore: [/\/api\/dev\/content-watch/, /\/api\/dev\/page-validation/],
    },
  },
  experimental: {
    optimizePackageImports: [
      "framer-motion",
      "@react-three/drei",
      "@react-three/fiber",
      "react-markdown",
    ],
    // Inline critical CSS to reduce render-blocking; improves FCP/LCP (production only).
    inlineCss: true,
  },
  images: cdnHostname
    ? {
        remotePatterns: [
          {
            protocol: "https",
            hostname: cdnHostname,
            pathname: "/**",
          },
        ],
        loader: "custom",
        loaderFile: "./src/core/lib/next-image-loader.ts",
      }
    : undefined,
};

export default nextConfig;
