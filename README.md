# Creative Playground

[![Deploy to GitHub Pages](https://github.com/joska-p/playground/actions/workflows/deploy.yml/badge.svg)](https://github.com/joska-p/playground/actions/workflows/deploy.yml)

A personal monorepo for creative coding experiments and frontend exploration.

🚀 **[Live Demo](https://joska-p.github.io/playground/)** · 📚 **[Storybook](https://joska-p.github.io/playground/storybook)** · 🔗 **[Knowledge Graph](https://joska-p.github.io/playground/graph/)**

---

## What's Inside

Interactive web experiments organized by type:

| Category | Projects |
|----------|----------|
| **Particles** | Image to Particles |
| **Sequences** | Sequence Renderer |
| **Mosaic** | Mosaic Maker |
| **Colors** | Palettes Generator |
| **Data Viz** | Piechart |

Each category has a landing page listing its projects.

---

## Structure

```
apps/
├── playground/    # Astro site with all experiments
└── storybook/     # Component documentation

packages/
├── ui/                    # Primitive UI components
├── mosaic-maker/           # Mosaic generation engine
├── sequence-renderer/     # Mathematical sequence viz
├── tailwind-config/       # Shared Tailwind theme
├── typescript-config/     # Shared TypeScript config
└── eslint-config/         # Shared ESLint config
```

### Architecture

Packages follow a consistent structure:

- `src/core/` — Pure domain logic (no UI dependencies)
- `src/components/` — Component-per-folder pattern
- `src/hooks/` — React lifecycle and state
- `src/renderers/` — Canvas/SVG/WebGL output
- `src/utils/` — Generic helpers

See [Architectural Blueprint](docs/drafts/architectural-blueprint.md) for full conventions.

---

## Getting Started

```bash
# Install (uses Nix + direnv automatically if available)
pnpm install

# Start all dev servers
pnpm dev

# Build for production
pnpm build

# Type-check, lint, format
pnpm check-types
pnpm lint
pnpm format
```

---

## Adding Projects

See [Adding Pages and Routes](docs/guides/adding-pages.md) for a step-by-step guide.

---

## Documentation

```
docs/
├── drafts/          # In-progress architecture docs
│   ├── architectural-blueprint.md   # Monorepo standards
│   ├── mosaic-engine-guide.md       # Tile system
│   └── sequence-renderer-guide.md    # Sequence viz
├── audit/           # Completed audit reports
│   ├── monorepo-flow-audit.md       # Turborepo issues (resolved)
│   ├── mosaic-maker-audit.md         # Architecture review
│   └── ...
└── guides/         # How-to docs
    └── adding-pages.md               # Adding new projects
```

---

## Maintenance

- Packages follow **component-per-folder** pattern
- **Independent builds** — each package can be built separately
- **Shared configs** — TS, ESLint, Tailwind in dedicated packages
- **Graphify** — Knowledge graph auto-rebuilds on commit

---

## License

Personal learning project. Feel free to explore and borrow!