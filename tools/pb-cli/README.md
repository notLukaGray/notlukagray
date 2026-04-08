# @pb/pb-cli

CLI for page-builder operational workflows.

## Commands

Run through repo root:

```bash
npm run pb-cli -- <command>
```

Supported commands:

- `validate <file>`
- `diff <file-a> <file-b>`
- `migrate <file> --from <version> --to <version>`
- `conformance [fixtures-dir]`

## Exit Codes

- `0`: success
- `1`: validation or conformance failure
- `2`: usage error, missing file/dir, parse error, or unhandled command error

## Output Behavior

- Commands emit structured JSON.
- `migrate` writes migrated page JSON to stdout and diagnostics summary to stderr.
- `conformance` defaults fixtures directory to `packages/contracts/fixtures` when omitted.

## Examples

```bash
npm run pb-cli -- validate apps/web/src/content/pages/work/example/index.json
npm run pb-cli -- diff old.json new.json
npm run pb-cli -- migrate old.json --from 0.5.0-v0 --to 1.0.0
npm run pb-cli -- conformance
```

## Local Package Script

From `tools/pb-cli` workspace:

```bash
npm run cli --workspace @pb/pb-cli -- validate <file>
```
