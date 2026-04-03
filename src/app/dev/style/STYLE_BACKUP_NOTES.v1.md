# Style Page Backup (v1)

This snapshot preserves the current `/dev/style` thinking before we continue splitting controls into:

1. Foundations (`/dev/style` for global primitives)
2. Layout (`/dev/layout/*`)
3. Elements (`/dev/elements/*`)

Backup source file:

- `src/app/dev/style/StyleDevClient.backup.v1.tsx`

Designer note:

- Nothing is removed permanently from the system.
- If a concept feels better in the legacy combined view, we can re-introduce that flow in a calmer, guided way.
