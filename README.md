# Creative Playground

[![Deploy to GitHub Pages](https://github.com/joska-p/playground/actions/workflows/deploy.yml/badge.svg)](https://github.com/joska-p/playground/actions/workflows/deploy.yml)

> A creative coding playground where I experiment with generative art, data viz, and visual toys. Built for fun, documented for collaborators.

by [@joska-p](https://github.com/joska-p)

---

## The Lab

| Engine           | Description                                 | Package                                                     |
| ---------------- | ------------------------------------------- | ----------------------------------------------------------- |
| **Mosaic Maker** | Transform palettes into procedural patterns | [`@repo/mosaic-maker`](./packages/mosaic-maker)             |
| **Sequences**    | Visualize mathematical sequences            | [`@repo/sequence-renderer`](./packages/sequence-renderer)   |
| **Palettes**     | Color theory scheme generator               | [`@repo/palette-generator`](./packages/palette-generator)   |
| **Particles**    | Physics-based particle deconstruction       | [`@repo/image-to-particles`](./packages/image-to-particles) |

---

## Quick Start

### Using Nix (Recommended)

```bash
nix develop
```

### Manual Setup

```bash
pnpm install && pnpm dev
```

- **Playground:** [localhost:4321](http://localhost:4321)
- **Storybook:** [localhost:6006](http://localhost:6006)

---

## Documentation

| Doc                                           | Description                   |
| --------------------------------------------- | ----------------------------- |
| [Getting Started](/docs/getting-started/)     | Manifesto and overview        |
| [Adding Projects](/docs/adding-projects/)     | How to add new visualizations |
| [Adding Components](/docs/adding-components/) | How to add UI components      |
| [Design Tokens](/docs/design-tokens/)         | Color palette and typography  |
| [UI Components](/docs/ui-components/)         | Component library reference   |

---

## Built With

[Astro](https://astro.build) · [React 19](https://react.dev) · [Tailwind CSS](https://tailwindcss.com) · [TypeScript](https://typescriptlang.org) · [Turborepo](https://turbo.build/repo) · [Storybook](https://storybook.js.org) · [D3](https://d3js.org) · [AI assistance](https://chat.openai.com)
