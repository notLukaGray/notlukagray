#!/usr/bin/env npx tsx

import { runCli } from "../tools/pb-cli/src/index";

runCli(process.argv).then(
  (exitCode) => {
    process.exit(exitCode);
  },
  (error) => {
    process.stderr.write(`${error instanceof Error ? error.message : String(error)}\n`);
    process.exit(2);
  }
);
