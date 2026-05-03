# Creative Playground

[![Pipeline Status](https://gitlab.com/jpotin/playground/badges/main/pipeline.svg)](https://gitlab.com/jpotin/playground/-/pipelines)
[![Pages Status](https://gitlab.com/jpotin/playground/badges/main/pages.svg)](https://jpotin.gitlab.io/playground/)

> A creative coding playground where I experiment with generative art, data viz, and visual toys. Built for fun, documented for collaborators.

by [@joska-p](https://github.com/joska-p)

---

## The Lab

| Engine | Description | Package |
| --- | --- | --- |
| **Mosaic Maker** | Transform palettes into procedural patterns | [`@repo/mosaic-maker`](./packages/mosaic-maker) |
| **Sequences** | Visualize mathematical sequences | [`@repo/sequence-renderer`](./packages/sequence-renderer) |
| **Palettes** | Color theory scheme generator | [`@repo/palette-generator`](./packages/palette-generator) |
| **Particles** | Physics-based particle deconstruction | [`@repo/image-to-particles`](./packages/image-to-particles) |

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

## Documentation

| Doc | Description |
| --- | --- |
| [Documentation hub](https://playground-beryl-omega.vercel.app/docs/) | Documentation hub |
| [Overview](https://playground-beryl-omega.vercel.app/docs/explanation/overview/) | What this is, principles, architecture |
| [Engines](https://playground-beryl-omega.vercel.app/docs/explanation/engines/) | How rules and visualizations work |
| [Your First Visualization](https://playground-beryl-omega.vercel.app/docs/tutorial/first-visualization/) | Step-by-step tutorial |
| [Adding Projects](https://playground-beryl-omega.vercel.app/docs/how-to/adding-projects/) | How to add new visualizations |
| [Adding Components](https://playground-beryl-omega.vercel.app/docs/how-to/adding-components/) | How to add UI components |
| [Adding a Rule](https://playground-beryl-omega.vercel.app/docs/how-to/adding-sequence-rule/) | Add sequence rules |
| [Adding a Visualization](https://playground-beryl-omega.vercel.app/docs/how-to/adding-visualization/) | Add visualization types |
| [Import and Export Strategy](https://playground-beryl-omega.vercel.app/docs/reference/import-export-strategy/) | Public API and barrel rules |
| [Design Tokens](https://playground-beryl-omega.vercel.app/docs/reference/design-tokens/) | Color palette and typography |
| [UI Components](https://playground-beryl-omega.vercel.app/docs/reference/ui-components/) | Component library reference |

---

## Built With

[Astro](https://astro.build) · [React 19](https://react.dev) · [Tailwind CSS](https://tailwindcss.com) · [TypeScript](https://typescriptlang.org) · [Turborepo](https://turbo.build/repo) · [Storybook](https://storybook.js.org) · [D3](https://d3js.org)
