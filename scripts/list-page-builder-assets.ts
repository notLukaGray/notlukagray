/** List asset URLs from all page builder JSON. Usage: npm run list-assets */

/** Import core modules only — avoid `page-builder` barrel (pulls client components + CSS into Node). */
import { discoverAllPages, getPage } from "@pb/core";
import { getAllAssetUrlsFromPage } from "@pb/core/media";

async function main() {
  const slugs = discoverAllPages().map((page) => page.slugSegments.join("/"));

  if (slugs.length === 0) {
    return;
  }

  for (const slug of slugs) {
    const page = await getPage(slug);
    if (!page) {
      process.exitCode = 1;
      continue;
    }
    getAllAssetUrlsFromPage(page);
  }
}

main();
