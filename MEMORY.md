# Memory

## Page-builder pipeline

- Asset-tree walkers now own all cloning in return-style APIs (`walkBgBlock`, `walkElement`, `walkSectionKeys`, `walkSection`), and callers must use the returned value when recursing.
- URL injection and raw background-definition building now rely on walker-owned cloning instead of shallow-clone-then-nested-mutate patterns.
- Loader outputs deep-freeze `pageBuilder.definitions` in non-production environments via `deepFreezeForDev` so accidental in-place mutation fails fast during development and tests.
