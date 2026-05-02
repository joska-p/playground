---
title: "Creative Playground"
description: "A creative coding playground for experiments, visualizations, and visual toys."
tags:
  - explanation
featured: true
---

# Creative Playground

by [@joska-p](https://github.com/joska-p)

A creative coding playground where I experiment with generative art, data viz, and visual toys. Built for fun, documented for collaborators.

---

## Principles

**Stable Shell / Volatile Engines**
Infrastructure is boring and should stay that way. The experiments? They're meant to break, evolve, and get rewritten.

**Stateless First**
Avoid state until you actually need it. Pure functions > side effects.

**Composable UI**
Small, focused components that do one thing well. Mix and match.

---

## Built With

| Tool          | Link                                                 | Where                             |
| ------------- | ---------------------------------------------------- | --------------------------------- |
| Astro         | [astro.build](https://astro.build)                   | App shell, routing, content       |
| React 19      | [react.dev](https://react.dev)                       | UI components                     |
| Tailwind CSS  | [tailwindcss.com](https://tailwindcss.com)           | Styling                           |
| TypeScript    | [typescriptlang.org](https://typescriptlang.org)     | Type safety                       |
| Turborepo     | [turbo.build](https://turbo.build/repo)              | Build orchestration               |
| pnpm          | [pnpm.io](https://pnpm.io)                           | Package management                |
| Storybook     | [storybook.js.org](https://storybook.js.org)         | [Component explorer](/storybook/) |
| Lucide        | [lucide.dev](https://lucide.dev)                     | Icons                             |
| Zustand       | [zustand-demo.pmnd.rs](https://zustand-demo.pmnd.rs) | State management                  |
| D3            | [d3js.org](https://d3js.org)                         | Data visualization                |
| ESLint        | [eslint.org](https://eslint.org)                     | Linting                           |
| Prettier      | [prettier.io](https://prettier.io)                   | Formatting                        |
| Podman        | [podman.io](https://podman.io)                       | Dev environment                   |

---

## Quick Start

### Dev Container (Recommended)

Requires [Podman](https://podman.io) and an editor with devcontainer support (Zed, VS Code, etc.).

```bash
mkdir .container_home   # only once — persists shell state across rebuilds
```

Then open the project in your editor and choose **Reopen in Container**.

```bash
pnpm install && pnpm dev
```

> **Rebuilding?** Run `rm -rf .container_home/*` before reopening so the fresh image is copied cleanly.

### Manual Setup

Requires Node 24+ and pnpm.

```bash
pnpm install && pnpm dev
```

- **Playground:** [localhost:4321](http://localhost:4321)
- **Storybook:** [localhost:6006](http://localhost:6006)

---

## Structure

```
apps/
├── playground/        # The shell (Astro + docs)
└── storybook/        # Component playground

packages/
├── ui/               # Shared components
├── mosaic-maker/     # CSS Grid patterns from palettes
├── sequence-renderer/ # Math sequences (Recamán, Fibonacci)
├── palette-generator/ # Color theory schemes
├── image-to-particles/ # Image → particle physics
└── tailwind-config/  # Design tokens (Gruvbox theme)
```

Components? Check [Storybook](/storybook/). Design tokens? See [Design Tokens](/docs/reference/design-tokens/).

---

## Adding Projects

1. Add to `apps/playground/src/data/projects.ts`
2. Create `apps/playground/src/pages/projects/<category>/<project>/index.astro`
3. Done.

Full guide: [Adding Projects](/docs/how-to/adding-projects/)

---
