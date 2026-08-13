# Creative Playground

[![Pipeline Status](https://gitlab.com/jpotin/playground/badges/main/pipeline.svg)](https://gitlab.com/jpotin/playground/-/pipelines)
[![Website](https://img.shields.io/badge/Live_Demo-GitLab_Pages-orange?style=flat&logo=gitlab)](https://joska-p.github.io/playground/)

> A creative coding playground where I experiment with generative art, data viz, and visual toys. Built for fun, documented for collaborators.

by [@jpotin](https://gitlab.com/jpotin)

---

## The Lab

| Engine           | Description                                 | Package                                                     |
| ---------------- | ------------------------------------------- | ----------------------------------------------------------- |
| **Mosaic Maker** | Transform palettes into procedural patterns | [`@repo/mosaic-maker`](./packages/mosaic-maker)             |
| **Sequences**    | Visualize mathematical sequences            | [`@repo/sequence-renderer`](./packages/sequence-renderer)   |
| **Palettes**     | Color theory scheme generator               | [`@repo/palette-generator`](./packages/palette-generator)   |
| **Particles**    | Physics-based particle deconstruction       | [`@repo/image-to-particles`](./packages/image-to-particles) |
| **Pixel**        | Image manipulation pipeline                 | [`@repo/pixel`](./packages/pixel)                           |

### Engines

| Engine              | Description                     | Package                                                       |
| ------------------- | ------------------------------- | ------------------------------------------------------------- |
| **automa-engine**   | Cellular automata core          | [`@repo/automa-engine`](./packages/automa-engine)         |
| **sequence-engine** | Mathematical sequence generator | [`@repo/sequence-engine`](./packages/sequence-engine)     |
| **palette-engine**  | Color spaces + harmony rules    | [`@repo/palette-engine`](./packages/palette-engine)       |
| **pixel-engine**    | Image manipulation core         | [`@repo/pixel-engine`](./packages/pixel-engine)           |

---

## Quick Start

### Dev Container (Recommended)

Requires [Podman](https://podman.io) and an editor with devcontainer support (Zed, VS Code, etc.).

Then open the project in your editor and choose **Reopen in Container**.

```bash
pnpm install && pnpm dev
```

### Manual Setup

Requires Node 24+ and pnpm.

```bash
pnpm install && pnpm dev
```

- **Playground:** [localhost:4321](http://localhost:4321)
- **Storybook:** [localhost:6006](http://localhost:6006)

---

## Documentation

| Doc                                                                                            | Description                                                |
| ---------------------------------------------------------------------------------------------- | ---------------------------------------------------------- |
| [Documentation hub](https://joska-p.github.io/playground/docs/)                                | Documentation hub                                          |
| [Conventions](https://joska-p.github.io/playground/docs/conventions/01-overview/)              | Code style, package structure, and common patterns         |
| [Architecture](https://joska-p.github.io/playground/docs/explanation/architecture/)            | System overview and principles                             |
| [Engine Patterns](https://joska-p.github.io/playground/docs/explanation/engine-patterns/)      | How rules and visualizations work                          |
| [Scaffolding Packages](https://joska-p.github.io/playground/docs/how-to/scaffolding-packages/) | Generate new packages with `turbo gen`                     |
| [Documenting Packages](https://joska-p.github.io/playground/docs/how-to/documenting-packages/) | README-first docs, synced to the site                      |
| [Project Maintenance](https://joska-p.github.io/playground/docs/how-to/maintenance/)           | Clean artifacts and reset with `pnpm clean` / `pnpm reset` |

---

## Built With

[Astro](https://astro.build) · [React 19](https://react.dev) · [Tailwind CSS](https://tailwindcss.com) · [TypeScript](https://typescriptlang.org) · [Turborepo](https://turbo.build/repo) · [Storybook](https://storybook.js.org) · [D3](https://d3js.org)

---

## License

This project is licensed under the [MIT License](./LICENSE).
