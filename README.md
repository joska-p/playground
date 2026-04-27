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

Our documentation lives within the Astro app itself—built with Astro content collections for a seamless experience:

- **Explore inline**: [http://localhost:4321/docs/](http://localhost:4321/docs/)
- **Local docs**: Run `pnpm dev` then visit `/docs/`

### Quick Links

| Guide | What You'll Learn |
| ------ | -----------------|
| [Architecture](./apps/playground/src/content/docs/explanation/architecture.md) | How the playground is organized |
| [Getting Started](./apps/playground/src/content/docs/tutorial/getting-started.md) | Set up your dev environment |
| [Adding Pages](./apps/playground/src/content/docs/how-to/adding-pages.md) | Add new visualizations |
| [Projects Model](./apps/playground/src/content/docs/how-to/projects.md) | The data model behind projects |
| [Component API](./apps/playground/src/content/docs/reference/component-api.md) | UI library reference |
| [Design Tokens](./apps/playground/src/content/docs/reference/design-tokens.md) | The Gruvbox theme system |

---

## 📁 Repository Structure

- `apps/playground` — The main Astro shell and docs site.
- `apps/storybook` — Component documentation and isolated testing.
- `packages/ui` — Shared atomic UI components (Gruvbox theme).
- `packages/*` — Specialized creative engines.

---

_Built with 🎨 by the Creative Playground Team_
