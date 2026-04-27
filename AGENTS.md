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
- Run `pnpm lint && pnpm format && pnpm check-types` before completing

## Critical Conventions

- **Branch**: ALWAYS work on `develop` branch, never push to `main`
- **State**: Use URL SearchParams for shareable UI state (`URL as State`)
- **Component structure**: `src/components/Name/` (includes `.stories.tsx`)
- **Environment detection** (Astro config): Use `process.env.VERCEL`, NOT `import.meta.env`
- **Graphify**: Include GITHUB_ACTIONS and VERCEL in turbo.json `globalEnv` if modifying env logic
- **Commands**: ALWAYS use `pnpm --filter <package> <command>` from root, NEVER `cd` into directories

## Target Specific Packages

Always use `--filter` to target packages/apps:

```bash
pnpm --filter @repo/playground dev      # Main site (port 4321)
pnpm --filter @repo/storybook dev     # Storybook (port 6006)
pnpm --filter @repo/ui build         # Build specific package
pnpm --filter @repo/mosaic-maker lint  # Lint specific package
```

## Turborepo Dependencies

```json
"check-types": { "dependsOn": ["^build"] },
"lint": { "dependsOn": ["^lint"] }
```

Build must complete before type-check runs. Package order in `pnpm-workspace.yaml`: `apps/*` then `packages/*`.

## See Also

- **In-app docs**: `apps/playground/src/content/docs/` — See "Content Collections" above for API
- `.agents/skills/` — Domain-specific skills (frontend-design, turborepo, etc.)
- `.opencode/opencode.json` → links to this file for OpenCode

## Skills

**Recommended**: Install the Astro skill for general Astro guidance:
```bash
npx skills add astrolicious/agent-skills@astro
```
(5.1K installs — CLI commands, project structure, and deployment)

## Content Collections

This repo uses Astro 6.0+ content collections with glob loader:
- **Config**: `apps/playground/src/content.config.ts`
- **Content**: `apps/playground/src/content/docs/*.md` (frontmatter: title, description, type, order, draft)
- **API**: `getCollection('docs')` from `astro:content`

Docs are rendered via dynamic route `apps/playground/src/pages/docs/[...slug].astro`.

## Verification Before Commit

Always verify with:

```bash
pnpm lint && pnpm format && pnpm check-types
```

All must pass before committing.