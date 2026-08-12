---
title: 'Playground'
coordinates: '/apps/playground'
status: 'Active'
date_discovered: 2025-06-01
---

# @repo/playground

> Main documentation site, interactive discovery pages, and field notes for Creative Playground — built with Astro 6, Tailwind CSS v4, and React 19.

---

## Essence

`@repo/playground` is the central hub of the monorepo. It serves three core purposes:

1. **Documentation Site**: Markdown content collections under `src/content/docs/` covering architecture explanations, conventions, how-to guides, and the package API reference.
2. **Discovery Pages**: Dynamic showcase routes (`src/pages/discoveries/*.astro`) embedding interactive WebGL/Canvas visualizers and experiment applications.
3. **Static Asset Hub**: Merges TypeDoc static API reference sites (`/docs/api/<pkg>/`) and Storybook (`/storybook/`) during build time via `scripts/collect-static-assets.mjs`.

## Quick Start

```bash
# Start local development server
pnpm --filter @repo/playground dev

# Build production bundle
pnpm --filter @repo/playground build
```

---

## Site Architecture

```
apps/playground/
├── src/
│   ├── content/
│   │   ├── docs/                   # Documentation Content Collection
│   │   │   ├── conventions/        # Core coding & design system standards
│   │   │   ├── explanation/        # Architectural mental models & trade-offs
│   │   │   ├── how-to/             # Task-oriented guides & tutorials
│   │   │   └── reference/          # Package API index page & references
│   │   └── notes/                  # Creative field notes & research essays
│   ├── pages/
│   │   ├── index.astro             # Landing page
│   │   ├── docs/[...slug].astro    # Dynamic markdown docs rendering
│   │   ├── notes/[...slug].astro   # Field notes rendering
│   │   └── discoveries/            # Interactive showcase routes for packages
│   └── layouts/                    # Navigation header, footer, and page containers
└── dist/                           # Final production site build
    ├── docs/api/<pkg>/             # Merged TypeDoc static HTML sites
    └── storybook/                  # Merged Storybook static site
```

## Documentation Pipeline

1. Package source code is annotated with TSDoc (`/** */`).
2. `pnpm build:docs` compiles each package's exports with TypeDoc into `packages/<pkg>/dist-docs/`.
3. `pnpm build` in `@repo/playground` compiles Astro pages.
4. `pnpm collect-assets` merges `packages/<pkg>/dist-docs/` into `apps/playground/dist/docs/api/<pkg>/`.

---

_Part of the [Creative Playground](https://joska-p.github.io/playground)_
