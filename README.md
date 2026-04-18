# 🎨 Creative Playground

[![Deploy to GitHub Pages](https://github.com/joska-p/playground/actions/workflows/deploy.yml/badge.svg)](https://github.com/joska-p/playground/actions/workflows/deploy.yml)

A personal monorepo serving as a sandbox for exploring modern web technologies, creative coding, and frontend architecture.

🚀 **[Live Demo](https://joska-p.github.io/playground/)** | 📚 **[Storybook](https://joska-p.github.io/playground/storybook)**

---

## ✨ Features & Experiments

This playground hosts various experiments and tools built while learning new frameworks and patterns:

*   **🧩 Mosaic Maker**: An interactive tool to generate and customize mosaic patterns from images or color palettes.
*   **✨ Particles**: Image-to-particle conversion experiments, exploring canvas manipulation and animations.
*   **🔢 Sequences**: Mathematical visualizations, including the beautiful **Recamán's Sequence**.
*   **🎨 Palette Generator**: Tools for exploring color theory and generating accessible color schemes.
*   **📊 Data Viz**: Minimalist components like custom SVG pie charts.

## 🏗️ Architecture

The workspace is a **Turborepo** monorepo managed with **pnpm**, designed for high performance and shared configurations.

### 📱 Applications
*   `apps/playground`: The main **Astro** site hosting all experiments.
*   `apps/storybook`: **Storybook** instance documenting the shared UI components.

### 📦 Packages
*   `packages/mosaic-maker`: Core logic and React components for the mosaic engine.
*   `packages/ui`: A shared library of primitive UI components built with **React 19**.
*   `packages/tailwind-config`: Shared styling configuration for **Tailwind CSS v4**.
*   `packages/typescript-config`: Centralized TS configs for consistent DX.
*   `packages/eslint-config`: Shared linting rules to maintain code quality.

## 🛠️ Tech Stack

*   **Frameworks**: [Astro](https://astro.build/), [React 19](https://react.dev/)
*   **Build System**: [Turborepo](https://turbo.build/), [pnpm](https://pnpm.io/)
*   **Styling**: [Tailwind CSS v4](https://tailwindcss.com/)
*   **Language**: [TypeScript](https://www.typescriptlang.org/)
*   **Infrastructure**: [Nix](https://nixos.org/) & [direnv](https://direnv.net/) for a reproducible dev environment.

## 🚀 Getting Started

### Development Environment

This project uses **Nix** and **direnv** to ensure a consistent environment across different machines.

1.  Clone the repository.
2.  If you have Nix and direnv installed, simply `cd` into the directory and run `direnv allow`.
3.  All dependencies (`pnpm`, `node`, `turbo`) will be automatically available.

### Installation & Run

```bash
# Install dependencies
pnpm install

# Start development servers
pnpm dev

# Build all apps and packages
pnpm build
```

## 📝 License

Personal learning project. Feel free to explore and use bits of code for your own learning!
