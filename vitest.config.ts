import { defineConfig } from "vitest/config";
import path from "path";

export default defineConfig({
  test: {
    environment: "happy-dom",
    include: ["**/*.test.ts", "**/*.test.tsx"],
  },
  resolve: {
    alias: [
      {
        find: "@/page-builder",
        replacement: path.resolve(__dirname, "./packages/runtime-react/src/page-builder"),
      },
      {
        find: "@/core",
        replacement: path.resolve(__dirname, "./apps/web/src/core"),
      },
      {
        find: "@/content",
        replacement: path.resolve(__dirname, "./apps/web/src/content"),
      },
      {
        find: "@",
        replacement: path.resolve(__dirname, "./apps/web/src"),
      },
    ],
  },
});
