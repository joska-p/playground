# Creative Playground

[![Deploy to GitHub Pages](https://github.com/joska-p/playground/actions/workflows/deploy.yml/badge.svg)](https://github.com/joska-p/playground/actions/workflows/deploy.yml)

> A personal monorepo for creative coding experiments and frontend exploration. Built with [**Astro**](https://astro.build/), [**React 19**](https://react.dev/), and [**Tailwind CSS**](https://tailwindcss.com/).

---

## 🏛️ Development Philosophy

This project follows a **"Stateless First"** approach. We prioritize server-side rendering and minimal client-side state. Complex logic is isolated into "Engines," while the UI shell remains light and fast.

Read the [**Development Manifesto (DEVELOPMENT.md)**](./DEVELOPMENT.md) for full architectural guidelines.

---

## ✨ Experiments & Engines

| Engine | Description | Package |
| :--- | :--- | :--- |
| **Mosaic Maker** | Transform palettes into patterns | [`@repo/mosaic-maker`](./packages/mosaic-maker/README.md) |
| **Sequence Renderer** | Visualize mathematical sequences | [`@repo/sequence-renderer`](./packages/sequence-renderer/README.md) |
| **Palette Generator** | Color tool suite | [`@repo/palette-generator`](./packages/palette-generator/README.md) |
| **Image to Particles** | Interactive particle effects | [`@repo/image-to-particles`](./packages/image-to-particles/README.md) |

---

## 🚀 Getting Started

### ❄️ Using [Nix](https://nixos.org/) (Recommended)

If you have Nix installed, you can enter a perfectly configured shell with all dependencies ([Node](https://nodejs.org/), [pnpm](https://pnpm.io/), [uv](https://docs.astral.sh/uv/), etc.) pre-installed:

```bash
# With flakes (recommended)
nix develop

# Or with direnv
direnv allow
```

### 🛠️ Manual Setup

If you're not using Nix, you will need the following tools installed globally on your system:

-   [**Node.js**](https://nodejs.org/) (v22+)
-   [**pnpm**](https://pnpm.io/) (v10+)
-   [**uv**](https://docs.astral.sh/uv/) (for Python-based tooling like [`graphify`](https://github.com/joska-p/graphifyy))
-   [**Turborepo**](https://turbo.build/) (`pnpm add -g turbo`)
-   [**Graphviz**](https://graphviz.org/) (optional, for dependency visualization)

Once ready:

```bash
pnpm install
pnpm dev
```
Opens at [localhost:4321](http://localhost:4321). [Storybook](https://storybook.js.org/) is available at port 6006.

---

## 📖 Platform Guides (Stable Infrastructure)

Detailed guides for the core playground infrastructure:

### 🌱 Tutorials
-   [**Getting Started**](./docs/tutorials/getting-started.md) — Set up and make your first contribution.

### 🛠️ How-To
-   [**Adding Pages**](./docs/how-to/adding-pages.md) — Add new experiments to the Astro shell.
-   [**Creating Components**](./docs/how-to/creating-components.md) — Build UI components in the shared library.

### 📖 Reference
-   [**Architecture Overview**](./docs/explanation/architecture.md) — Directory structure and conventions.
-   [**Design Tokens**](./docs/reference/design-tokens.md) — Colors, typography, and spacing.
-   [**Component API**](./docs/reference/component-api.md) — Shared UI component documentation.

---

## 📊 Live Resources

-   [**Storybook (Production)**](https://joska-p.github.io/playground/storybook)
-   [**Project Board / GitHub**](https://github.com/joska-p/playground)

---

## 📁 Repository Structure

```
apps/
├── playground/    # Main Astro shell
└── storybook/     # Component documentation

packages/
├── ui/            # Atomic UI components
├── [engines]/     # Specialized creative experiments
├── tailwind-config/ # Theme & Design tokens
└── configs/       # Tooling & Compiler configurations
```

---

## 📜 Credits & Tools

This project is built on the shoulders of giants and powered by modern AI-assisted workflows.

### 🏗️ Frameworks & Core
-   [**Astro**](https://astro.build/) — The web framework for content-driven websites.
-   [**React 19**](https://react.dev/) — For high-interactivity engines and components.
-   [**TypeScript**](https://www.typescriptlang.org/) — Ensuring type safety across the monorepo.

### 🎨 Styling & UI
-   [**Tailwind CSS v4**](https://tailwindcss.com/) — Next-generation utility-first CSS.
-   [**CVA**](https://cva.style/) — Class Variance Authority for component variants.
-   [**Lucide**](https://lucide.dev/) — Beautiful & consistent icons.

### 🧬 Logic & State
-   [**Zustand**](https://github.com/pmndrs/zustand) — Small, fast, and scalable bearbones state-management.
-   [**clsx**](https://github.com/lukeed/clsx) & [**tailwind-merge**](https://github.com/dcastil/tailwind-merge) — Utility for constructing className strings.

### 🛠️ Workflow & Infrastructure
-   [**Turborepo**](https://turbo.build/) — High-performance build system for JavaScript and TypeScript monorepos.
-   [**pnpm**](https://pnpm.io/) — Fast, disk space efficient package manager.
-   [**Nix**](https://nixos.org/) — Reproducible builds and development environments.
-   [**uv**](https://docs.astral.sh/uv/) — Extremely fast Python package installer and resolver.

### 🤖 AI Assistance & Knowledge
-   [**Gemini CLI**](https://github.com/google-gemini/gemini-cli) — Interactive AI agent for surgical code modifications and architectural guidance.
-   [**Graphify**](https://github.com/joska-p/graphifyy) — AST-based knowledge graph generator for codebase navigation and context.
-   [**Vis Network**](https://visjs.github.io/vis-network/docs/network/) — Powering the interactive graph visualizations.

---

_Built with 🎨 by the playground_
