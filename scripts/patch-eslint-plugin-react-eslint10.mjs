#!/usr/bin/env node
/**
 * Patches eslint-plugin-react (bundled by eslint-config-next) for ESLint 10.
 * ESLint 10 removed context.getFilename(); use context.filename instead.
 * Run automatically after npm install so the fix survives installs.
 */
import { readFileSync, writeFileSync } from "fs";
import { fileURLToPath } from "url";
import { dirname, join } from "path";

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, "..");
const target = join(
  root,
  "node_modules/eslint-config-next/node_modules/eslint-plugin-react/lib/util/version.js"
);

try {
  let code = readFileSync(target, "utf8");
  const oldLine =
    "const filename = typeof contextOrFilename === 'string' ? contextOrFilename : contextOrFilename.getFilename();";
  const newLine =
    "const filename = typeof contextOrFilename === 'string' ? contextOrFilename : (contextOrFilename.filename ?? contextOrFilename.getFilename?.());";
  if (code.includes(oldLine)) {
    code = code.replace(oldLine, newLine);
    writeFileSync(target, code);
  }
} catch (err) {
  if (err.code === "ENOENT") {
    // eslint-config-next not installed or structure changed; skip
    process.exit(0);
  }
  throw err;
}
