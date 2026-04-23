# Creative Playground

[![Deploy to GitHub Pages](https://github.com/joska-p/playground/actions/workflows/deploy.yml/badge.svg)](https://github.com/joska-p/playground/actions/workflows/deploy.yml)

A personal monorepo for creative coding experiments and frontend exploration.

---

## What's Inside

Interactive web experiments organized by category:

| Category | Project |
|----------|---------|
| Particles | Image to Particles |
| Sequences | Sequence Renderer |
| Mosaic | Mosaic Maker |
| Colors | Palettes Generator |
| Data Viz | Piechart |

---

## Quick Start

```bash
pnpm install
pnpm dev
```

---

## Documentation

See [docs/index.md](docs/index.md) for:

- Design system (Gruvbox theme, component guidelines)
- Architecture (code conventions, directory structure)
- Guides (adding new pages)

---

## Structure

```
apps/
├── playground/    # Astro site
└── storybook/    # Component documentation

packages/
├── ui/                   # UI components
├── mosaic-maker/          # Mosaic engine
├── sequence-renderer/   # Sequence visualization
├── image-to-particles/    # Particle effects
├── palette-generator/    # Color palettes
├── tailwind-config/      # Theme
├── typescript-config/   # TS config
└── eslint-config/       # ESLint config
```

---

## License

Personal project. Feel free to explore and borrow.