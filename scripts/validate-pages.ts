#!/usr/bin/env npx tsx
/**
 * CLI for page-builder validation. Use before commit or in CI:
 *   npm run validate-pages
 *   npm run validate-pages [slug1] [slug2]
 * Uses the same logic as dev browser validation (see page-builder-validation.ts).
 */
import {
  runPageBuilderValidation,
  summarizeValidation,
} from "../src/page-builder/dev/page-builder-validation";

interface ValidateConfig {
  slugs: string[];
}

function parseArgs(argv: string[]): ValidateConfig {
  const slugs = argv.length > 0 ? argv : [];
  return { slugs };
}

function formatReport(resultsReturn: ReturnType<typeof runPageBuilderValidation>): string {
  const { validCount, invalidCount } = summarizeValidation(resultsReturn);
  const summary = `Summary: ${validCount} page${validCount === 1 ? "" : "s"} valid, ${invalidCount} page${
    invalidCount === 1 ? "" : "s"
  } invalid.`;
  const hasErrors = invalidCount > 0;
  const message = hasErrors
    ? "\nValidation failed.\nFix the errors above (check the JSON path after 'Location:' and the page shown in 'Source:') before deploying."
    : "\nAll pages validated successfully. 🎉";
  return summary + message;
}

function exitWithStatus(resultsReturn: ReturnType<typeof runPageBuilderValidation>): void {
  const hasErrors = resultsReturn.some((r) => !r.valid);
  process.exit(hasErrors ? 1 : 0);
}

function main(): void {
  const config = parseArgs(process.argv.slice(2));
  const results = runPageBuilderValidation({ slugs: config.slugs });

  for (const { slug, valid, errors } of results) {
    if (!valid) {
      console.error(`\n❌ Page "${slug}" has validation errors:`);
      for (const error of errors) {
        // Try to split our enriched error string into clearer parts.
        // Format from validator is roughly:
        //   "<path>: [code] union[0]: message (meta...) (source ...)"
        // We re-label these pieces for readability.
        const locationMatch = error.match(/^([^:]+):\s*(.*)$/);
        const [location, restAfterLocation] = locationMatch
          ? [locationMatch[0], locationMatch[2]]
          : [null, error];

        const safeRest = restAfterLocation ?? error;
        const sourceMatch = safeRest.match(/\(source [^)]+\)$/);
        const source = sourceMatch ? sourceMatch[0] : null;
        const core = sourceMatch ? safeRest.slice(0, sourceMatch.index).trim() : safeRest.trim();

        if (location || source) {
          console.error("  - Error:");
          if (location) {
            console.error(`      Location: ${location.replace(/:\s*$/, "")}`);
          }
          console.error(`      Details: ${core}`);
          if (source) {
            console.error(`      Source: ${source.replace(/^\(|\)$/g, "")}`);
          }
        } else {
          console.error(`  - ${error}`);
        }
      }
    }
  }

  console.error(formatReport(results));
  exitWithStatus(results);
}

main();
