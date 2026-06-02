# @repo/image-pipeline

TypeScript-first, browser-based image manipulation pipeline. Zero dependencies.

## Documentation

Interactive documentation is available in the playground at `/projects/image/pipeline`:

```bash
pnpm --filter @repo/playground dev
```

The docs cover API surfaces (`Pipeline`, `pipelineGateway`, `Registry`), all built-in manipulations with "Try It Out" demos, and internals (execution engine, worker architecture, tiling, resize algorithm).

## Quick Start

```bash
pnpm --filter @repo/image-pipeline dev
```

## Conventions

This package follows [project conventions](../../CONVENTIONS.md):

- **Named exports only** — no `export default`.
- **Function declarations** for components and top-level functions.
- **`@repo/ui` components** for all UI.
- **No barrel files** — import directly from source paths.
