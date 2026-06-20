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
| **automa-engine**   | Cellular automata core          | [`@repo/automa-engine`](./packages/engines/automa-engine)     |
| **sequence-engine** | Mathematical sequence generator | [`@repo/sequence-engine`](./packages/engines/sequence-engine) |
| **palette-engine**  | Color spaces + harmony rules    | [`@repo/palette-engine`](./packages/engines/palette-engine)   |
| **pixel-engine**    | Image manipulation core         | [`@repo/pixel-engine`](./packages/engines/pixel-engine)       |

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

| Doc                                                                                                       | Description                                                |
| --------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------- |
| [Documentation hub](https://joska-p.github.io/playground/docs/)                                           | Documentation hub                                          |
| [Overview](https://joska-p.github.io/playground/docs/explanation/overview/)                               | What this is, principles, architecture                     |
| [Engines](https://joska-p.github.io/playground/docs/explanation/engines/)                                 | How rules and visualizations work                          |
| [Your First Visualization](https://joska-p.github.io/playground/docs/tutorial/first-visualization/)       | Step-by-step tutorial                                      |
| [Scaffolding Packages](https://joska-p.github.io/playground/docs/how-to/scaffolding-packages/)            | Generate new packages with `turbo gen`                     |
| [Project Maintenance](https://joska-p.github.io/playground/docs/how-to/maintenance/)                      | Clean artifacts and reset with `pnpm clean` / `pnpm reset` |
| [Adding Projects](https://joska-p.github.io/playground/docs/how-to/adding-projects/)                      | How to add new visualizations                              |
| [Adding Components](https://joska-p.github.io/playground/docs/how-to/adding-components/)                  | How to add UI components                                   |
| [Adding a Rule](https://joska-p.github.io/playground/docs/how-to/adding-sequence-rule/)                   | Add sequence rules                                         |
| [Adding a Visualization](https://joska-p.github.io/playground/docs/how-to/adding-visualization/)          | Add visualization types                                    |
| [Import and Export Strategy](https://joska-p.github.io/playground/docs/reference/import-export-strategy/) | Public API and barrel rules                                |
| [Design Tokens](https://joska-p.github.io/playground/docs/reference/design-tokens/)                       | Color palette and typography                               |
| [UI Components](https://joska-p.github.io/playground/docs/reference/ui-components/)                       | Component library reference                                |

---

## Built With

[Astro](https://astro.build) · [React 19](https://react.dev) · [Tailwind CSS](https://tailwindcss.com) · [TypeScript](https://typescriptlang.org) · [Turborepo](https://turbo.build/repo) · [Storybook](https://storybook.js.org) · [D3](https://d3js.org)

---

## License

This project is licensed under the [MIT License](./LICENSE).
