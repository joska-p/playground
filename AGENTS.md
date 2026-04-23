## graphify

This project has a graphify knowledge graph at graphify-out/.

Rules:
- Before answering architecture or codebase questions, read graphify-out/GRAPH_REPORT.md for god nodes and community structure
- If graphify-out/wiki/index.md exists, navigate it instead of reading raw files
- For cross-module "how does X relate to Y" questions, prefer `graphify query "<question>"`, `graphify path "<A>" "<B>"`, or `graphify explain "<concept>"` over grep — these traverse the graph's EXTRACTED + INFERRED edges instead of scanning files
- After modifying code files in this session, run `graphify update .` to keep the graph current (AST-only, no API cost)

---

## Commands

```bash
pnpm dev          # Start all dev servers (Astro + Storybook)
pnpm build        # Production build
pnpm lint         # ESLint check
pnpm lint-fix     # ESLint + auto-fix
pnpm format      # Prettier write
pnpm check-types # TypeScript check
```

Run single packages from their directories: `cd apps/playground && pnpm dev` or `cd apps/storybook && pnpm dev` (Storybook runs on port 6006).

## Architecture

```
apps/playground/    # Astro site (entry: src/pages/)
apps/storybook/     # Component docs (port 6006)
packages/
├── ui/                 # Primitive UI components
├── mosaic-maker/      # Mosaic generation
├── sequence-renderer/ # Mathematical sequences
├── palette-generator/ # Color palettes
├── image-to-particles/# Particle effects
├── tailwind-config/   # Shared Tailwind theme
├── typescript-config/ # Shared TS config
└── eslint-config/    # Shared ESLint config
```

Packages follow component-per-folder pattern with src/core/, src/components/, src/hooks/, src/renderers/, src/utils/.

## Deploy

GitHub Pages via `.github/workflows/deploy.yml`. CI uses Nix (`nix develop --command pnpm install`). Build must pass before merge to main.

## Constraints

- Node.js >= 22.12.0 required
- Package manager: pnpm 10.19.0 (workspace:*
- Turbo task order: build depends on ^build (libraries first)
