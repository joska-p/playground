---
title: Scaffolding Packages
description: Generate new Vite + React packages with a single command.
tags:
    - how-to
featured: true
---

# Scaffolding Packages

New packages come from `pnpm gen` (which wraps [`turbo gen`](https://turbo.build/repo/docs/guides/generating-code)) through a custom generator at `turbo/generators/`. It creates a package with the same build tooling as `@repo/mosaic-maker`: Vite, React, TypeScript, Tailwind, ESLint, plus Zustand and Zod wired into a demo component.

## Prerequisites

- The working directory is the repo root.
- Dependencies are installed (`pnpm install`).

## Usage

```bash
pnpm gen new-package
```

The generator prompts for a package name (kebab-case, e.g. `my-visualization`). The prompt skips with:

```bash
pnpm gen new-package --args my-visualization
```

## What You Get

The generator creates `packages/<name>/` with:

```
packages/<name>/
├── .gitignore
├── eslint.config.js
├── index.html                       # Vite dev entry point
├── package.json                     # @repo/<name>, deps on @repo/ui + zod + zustand
├── public/
│   └── favicon.svg
├── README.md
├── src/
│   ├── App.tsx                      # Local dev wrapper
│   ├── components/
│   │   └── Demo.tsx                 # Public component, exported via package.json
│   ├── demo.schema.ts               # Zod schema (runtime validation)
│   ├── stores/
│   │   └── demo/
│   │       └── store.ts             # Zustand store (private, getter hooks + setter fns)
│   ├── main.tsx                     # React DOM entry
│   └── styles/
│       └── global.css               # Tailwind v4 + @repo/ui/gruvbox-theme
├── tsconfig.json
├── tsconfig.app.json
├── tsconfig.node.json
├── turbo.json
└── vite.config.ts
```

The `Demo` component is the public API; consumers import it via `@repo/<name>/Demo` (declared in `package.json` `exports`).

## After Generation

```bash
pnpm install
pnpm --filter @repo/<name> dev       # start Vite dev server
```

## Documenting the Package

[Documenting a Package](./documenting-packages/) covers the README, the reference doc bootstrap on the Astro site, and the links from related docs.

## Adding to the Playground Website

The `Demo` component renders on the Astro site through a `client:only` island. A project page under `src/pages/` imports `@repo/<name>/Demo`:

```astro
---
import { Demo } from '@repo/<name>/Demo';
import { StrictMode } from 'react';
---

<StrictMode>
    <Demo client:only="react" />
</StrictMode>
```

## The Generator Source

The custom generator lives at `turbo/generators/`:

```
turbo/generators/
├── config.ts              # Plop generator: validates name, copies templates
└── templates/             # Handlebars templates for the new package
    ├── .gitignore.hbs
    ├── README.md.hbs
    ├── index.html.hbs
    ├── package.json.hbs
    ├── vite.config.ts
    ├── tsconfig*.json
    ├── turbo.json
    ├── eslint.config.js
    ├── public/
    └── src/
```

The `templates/` directory defines what every new package gets. The templates mirror `@repo/mosaic-maker`'s config exactly; only the application code differs.
