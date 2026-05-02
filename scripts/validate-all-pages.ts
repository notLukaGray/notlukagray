#!/usr/bin/env npx tsx
import { discoverAllPages, loadPageBuilderByPathAsync, resolvePagePath } from "@pb/core/loader";

process.env.STRICT_VALIDATION = "true";
process.env.NODE_ENV = "development";

async function main(): Promise<void> {
  const pages = discoverAllPages();
  let failures = 0;

  for (const page of pages) {
    const slug = page.slugSegments.join("/");
    const absPath = resolvePagePath(page.slugSegments);
    if (!absPath) continue;
    try {
      await loadPageBuilderByPathAsync(absPath, page.slugSegments);
    } catch (err) {
      const msg = err instanceof Error ? err.message : String(err);
      console.error(`FAIL ${slug}: ${msg}`);
      failures += 1;
    }
  }

  if (failures > 0) {
    console.error(`Strict validation failures: ${failures}/${pages.length}`);
    process.exit(1);
  }

  console.log(`All ${pages.length} pages passed strict validation.`);
}

void main();
