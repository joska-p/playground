# AGENTS.md — Creative Playground

## Quick Commands

```bash
pnpm dev        # Start all apps (Astro:4321, Storybook:6006)
pnpm build      # Production build
pnpm lint       # Turborepo lint (depends on ^lint)
pnpm format     # Prettier write
pnpm check-types # astro check (depends on ^build)
pnpm clean      # Clean .turbo and node_modules
pnpm graphify   # Update knowledge graph post-code change
```

## Mandatory Setup

- **Node.js 22+**: `pnpm` auto-installs
- **Nix (recommended)**: `nix develop` or `direnv allow` — ensures correct environment

## Architecture

| Path | Type |
|------|------|
| `apps/playground` | Main Astro app + in-app docs |
| `apps/storybook` | UI component isolation (port 6006) |
| `packages/ui` | Shared atomic components |
| `packages/*` | "Engines": mosaic-maker, sequence-renderer, palette-generator, image-to-particles |

## Knowledge Graph

Read `graphify-out/GRAPH_REPORT.md` for god nodes and architecture context. Run `pnpm graphify` after code changes.

## Verification Rules

- UI changes MUST verify in Storybook (`apps/storybook`)
- Run `pnpm lint && pnpm format && pnpm check-types` before commit

## Critical Conventions

- **Branch**: ALWAYS work on `develop` branch, never push to `main`
- **Commands**: ALWAYS use `pnpm --filter <package> <command>` from root, NEVER `cd` into directories

```bash
pnpm --filter @repo/playground dev      # Main site (port 4321)
pnpm --filter @repo/storybook dev     # Storybook (port 6006)
pnpm --filter @repo/ui build         # Build specific package
pnpm --filter @repo/mosaic-maker lint  # Lint specific package
```

## See Also

- **In-app docs**: `apps/playground/src/content/docs/` — Guidelines, API, etc...
- `.agents/skills/` — Domain-specific skills (frontend-design, turborepo, etc.)
- `.opencode/opencode.json` → links to this file for OpenCode
