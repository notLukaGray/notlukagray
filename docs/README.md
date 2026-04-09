# Documentation

This directory contains canonical system-level documentation.

## Core Docs

- [`architecture.md`](./architecture.md): package boundaries, data flow, and runtime model
- [`integration.md`](./integration.md): integration surfaces across packages, tools, and app consumer
- [`operations-quality-checks.md`](./operations-quality-checks.md): CI gates and local verification commands
- [`scripts-lifecycle.md`](./scripts-lifecycle.md): root script inventory and ownership intent
- [`page-builder-schema-semantics.md`](./page-builder-schema-semantics.md): full page-builder variable/value semantics, constraints, defaults, and runtime precedence

## Workspace Docs

Packages:

- [`../packages/contracts/README.md`](../packages/contracts/README.md)
- [`../packages/contracts/SCHEMA_CHEATSHEET.md`](../packages/contracts/SCHEMA_CHEATSHEET.md)
- [`../packages/core/README.md`](../packages/core/README.md)
- [`../packages/runtime-react/README.md`](../packages/runtime-react/README.md)
- [`../packages/sdk/README.md`](../packages/sdk/README.md)
- [`../packages/extensions/README.md`](../packages/extensions/README.md)

Tools:

- [`../tools/pb-cli/README.md`](../tools/pb-cli/README.md)
- [`../tools/figma-plugin/README.md`](../tools/figma-plugin/README.md)
- [`../tools/figma-bridge/README.md`](../tools/figma-bridge/README.md)
- [`../tools/figma-widget/README.md`](../tools/figma-widget/README.md)

App consumer:

- [`../apps/web/README.md`](../apps/web/README.md)

## Notes

- Legacy migration docs and validation playbooks were removed and replaced by this structure.
- Quality/validation guidance now lives in `operations-quality-checks.md`.
