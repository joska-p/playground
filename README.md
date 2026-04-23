# Creative Playground

[![Deploy to GitHub Pages](https://github.com/joska-p/playground/actions/workflows/deploy.yml/badge.svg)](https://github.com/joska-p/playground/actions/workflows/deploy.yml)

> A personal monorepo for creative coding experiments and frontend exploration.

---

## ✨ What's Inside

| Category | Project |
|----------|---------|
| **Particles** | Image to Particles |
| **Sequences** | Sequence Renderer |
| **Mosaic** | Mosaic Maker |
| **Colors** | Palette Generator |
| **Data Viz** | Piechart |

---

## 🚀 Quick Start

```bash
pnpm install
pnpm dev
```

Opens at [localhost:4321](http://localhost:4321)

### Nix (Optional)

If you're on NixOS or have Nix:

```bash
# With flakes (recommended)
nix develop

# Or with direnv
direnv allow
```

This gives you: Node.js, pnpm, turbo, ESLint, Prettier, TypeScript, and language servers.

---

## 📁 Structure

```
apps/
├── playground/    # Main Astro site
└── storybook/     # Component docs (port 6006)

packages/
├── ui/                  # Shared UI components
├── mosaic-maker/        # Mosaic generation
├── sequence-renderer/  # Math sequence viz
├── palette-generator/   # Color tools
├── image-to-particles/   # Particle effects
├── tailwind-config/     # Design tokens
├── typescript-config/   # TS config
└── eslint-config/     # ESLint config
```

---

## 📖 Documentation

| Topic | Where |
|-------|-------|
| **Get started** | [docs/tutorials/getting-started.md](docs/tutorials/getting-started.md) |
| **Add pages** | [docs/how-to/adding-pages.md](docs/how-to/adding-pages.md) |
| **Build components** | [docs/how-to/creating-components.md](docs/how-to/creating-components.md) |
| **Design tokens** | [docs/reference/design-tokens.md](docs/reference/design-tokens.md) |
| **Component API** | [docs/reference/component-api.md](docs/reference/component-api.md) |
| **Architecture** | [docs/explanation/architecture.md](docs/explanation/architecture.md) |
| **Storybook** | [joska-p.github.io/playground/storybook](https://joska-p.github.io/playground/storybook) |

---

## 🛠️ Commands

| Command | What |
|--------|------|
| `pnpm dev` | Start all apps |
| `pnpm build` | Production build |
| `pnpm check-types` | TypeScript check |
| `pnpm lint` | Lint check |

---

## 🏷️ Stack

- **Framework**: Astro + React 19
- **Styling**: Tailwind CSS (Gruvbox theme)
- **State**: Zustand
- **Components**: CVA + Storybook

---

## 📄 License

Personal project. Feel free to explore and borrow.

*Built with 🎨 by the playground*