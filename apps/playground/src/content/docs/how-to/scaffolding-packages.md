---
title: "Scaffolding Packages"
description: "Generate new Vite + React packages with a single command."
category: "how-to"
tags:
  - how-to
featured: true
---

# Scaffolding Packages

New packages are scaffolded with `pnpm gen` (which wraps [`turbo gen`](https://turbo.build/repo/docs/guides/generating-code)) using a custom generator at `turbo/generators/`. It creates a package with the same build tooling as `@repo/mosaic-maker` — Vite, React, TypeScript, Tailwind, ESLint — plus Zustand and Zod wired into a demo component.

## Prerequisites

- You are at the repo root.
- Dependencies are installed (`pnpm install`).

## Usage

```bash
pnpm gen new-package
```

You will be prompted for a package name (kebab-case, e.g. `my-visualization`).

To skip the prompt:

```bash
pnpm gen new-package --args my-visualization
```

## What You Get

Running the generator creates `packages/<name>/` with:

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
│   │   └── Demo.tsx                 # Public component — exported via package.json
│   ├── demo.schema.ts               # Zod schema (runtime validation)
│   ├── demoStore.ts                 # Zustand store (private, getter hooks + setter fns)
│   ├── main.tsx                     # React DOM entry
│   └── styles/
│       └── styles.css               # Tailwind v4 + @repo/ui/gruvbox-theme
├── tsconfig.json
├── tsconfig.app.json
├── tsconfig.node.json
├── turbo.json
└── vite.config.ts
```

The `Demo` component is the public API — consumers import it via `@repo/<name>/Demo` (declared in `package.json` `exports`).

## After Generation

```bash
pnpm install
pnpm --filter @repo/<name> dev       # start Vite dev server
```

## Adding to the Playground Website

Follow [Adding Projects](./adding-projects/) to register the new package as a project page on the Astro site. For React components, use the `client:only="react"` directive:

```astro
---
import { Demo } from "@repo/<name>/Demo";
import { StrictMode } from "react";
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

Edit `templates/` to change what every new package gets. The templates mirror `@repo/mosaic-maker`'s config exactly — only the application code differs.
