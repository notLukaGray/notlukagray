import type { NextConfig } from "next";
import { cdnBase } from "./apps/web/src/core/lib/globals";

function getCdnHostname(url: string): string | null {
  try {
    const parsed = new URL(url);
    return parsed.hostname;
  } catch {
    return null;
  }
}

const cdnHostname = getCdnHostname(cdnBase);

const nextConfig: NextConfig = {
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
        loaderFile: "./apps/web/src/core/lib/next-image-loader.ts",
      }
    : undefined,
};

export default nextConfig;
