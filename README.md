# Creative Playground

[![Deploy to GitHub Pages](https://github.com/joska-p/playground/actions/workflows/deploy.yml/badge.svg)](https://github.com/joska-p/playground/actions/workflows/deploy.yml)

> A high-performance creative coding lab and monorepo for frontend exploration. Built with [**Astro**](https://astro.build/), [**React 19**](https://react.dev/), and [**Tailwind CSS v4**](https://tailwindcss.com/).

---

## 🧪 The Lab

The Creative Playground is divided into a **Stable Shell** (Astro infrastructure) and **Volatile Engines** (experimental React visualizations).

| Engine | Description | Package |
| :--- | :--- | :--- |
| **Mosaic Maker** | Transform palettes into procedural patterns | [`@repo/mosaic-maker`](./packages/mosaic-maker) |
| **Sequences** | Visualize mathematical sequences | [`@repo/sequence-renderer`](./packages/sequence-renderer) |
| **Palettes** | Color theory scheme generator | [`@repo/palette-generator`](./packages/palette-generator) |
| **Particles** | Physics-based particle deconstruction | [`@repo/image-to-particles`](./packages/image-to-particles) |

---

## 🚀 Getting Started

### ❄️ Using Nix (Recommended)
Enter a perfectly configured shell with all dependencies:
```bash
nix develop # or direnv allow
```

### 🛠️ Manual Setup
Ensure you have **Node.js v22+** and **pnpm v10+** installed.
```bash
pnpm install
pnpm dev
```
- **Main Site:** [localhost:4321](http://localhost:4321)
- **Storybook:** [localhost:6006](http://localhost:6006)

---

## 📖 Documentation Hub

Our full documentation is now hosted within the Astro app for a seamless experience:

👉 [**Explore the Documentation Hub**](https://joska-p.github.io/playground/docs)

- [**Development Manifesto**](https://joska-p.github.io/playground/docs/explanation/architecture) — Our architectural philosophy.
- [**Getting Started**](https://joska-p.github.io/playground/docs/tutorial/getting-started) — Detailed setup guide.
- [**Adding Engines**](https://joska-p.github.io/playground/docs/how-to/adding-pages) — How to contribute new experiments.
- [**Component API**](https://joska-p.github.io/playground/docs/reference/component-api) — UI library reference.

---

## 📁 Repository Structure

- `apps/playground` — The main Astro shell and docs site.
- `apps/storybook` — Component documentation and isolated testing.
- `packages/ui` — Shared atomic UI components (Gruvbox theme).
- `packages/*` — Specialized creative engines.

---

_Built with 🎨 by the Creative Playground Team_
