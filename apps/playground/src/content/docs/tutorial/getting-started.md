---
title: "Getting Started"
description: "Set up your development environment and make your first contribution."
type: "tutorial"
order: 1
---

# Getting Started

> Welcome to the Creative Playground! Let's build something cool.

---

## What is This?

The Creative Playground is a monorepo of interactive visualizations—mosaic generators, sequence renderers, particle effects, and color tools. Built with React 19, Astro, and Tailwind.

## Quick Start

### Using Nix (Recommended)

If you have Nix installed, you can enter a perfectly configured shell with all dependencies pre-installed:

```bash
# With flakes (recommended)
nix develop

# Or with direnv
direnv allow
```

This shell includes Node.js, pnpm, uv, turbo, ESLint, Prettier, and all necessary language servers.

### Manual Setup

If you're not using Nix, ensure you have these tools installed:

- **Node.js** (v22+)
- **pnpm** (v10+)
- **uv** (for `graphify` and Python tooling)
- **Turborepo**
- **Graphviz** (optional)

```bash
# Install dependencies
pnpm install

# Start development environment
pnpm dev
```

| Command            | What Happens                      |
| ------------------ | --------------------------------- |
| `pnpm dev`         | All apps + packages in watch mode |
| `pnpm build`       | Production build                  |
| `pnpm check-types` | TypeScript check                  |
| `nix develop`      | Nix shell (optional)              |

## Project Structure

```
apps/
├── playground/       # Main Astro site
└── storybook/        # Component docs

packages/
├── ui/               # Shared UI components
├── mosaic-maker/     # Mosaic generation
├── sequence-renderer/ # Math sequence viz
├── palette-generator/ # Color tools
├── image-to-particles/ # Particle effects
├── tailwind-config/   # Design tokens
└── typescript-config/ # TS config
```

## Your First Contribution

1. **Add a page**: Create `apps/playground/src/pages/<category>/<project>/index.tsx`
2. **Add route**: Update `src/constants/routes.ts`
3. **Build something awesome**: Use `@repo/ui` components

```tsx
import { Sidebar, Button } from "@repo/ui";

function MyProject() {
  return (
    <Sidebar>
      <Sidebar.Panel>
        <Button>Click me</Button>
      </Sidebar.Panel>
      <Sidebar.Main>
        <p>Hello, world!</p>
      </Sidebar.Main>
    </Sidebar>
  );
}
```

## Run Individual Apps

```bash
cd apps/playground && pnpm dev      # Main site (port 4321)
cd apps/storybook && pnpm dev     # Storybook (port 6006)
```

## Pro Tips

> **Tip:** Run `pnpm lint-fix` before committing—keeps things tidy.

> **Note:** All packages use React 19. Check `packages/ui/package.json` for peer dependencies.

## Verify Your Setup

After running `pnpm dev`, verify everything works:

| Check     | URL                   | What to Look For                  |
| --------- | --------------------- | --------------------------------- |
| Main site | http://localhost:4321 | Homepage loads, no console errors |
| Storybook | http://localhost:6006 | UI components render correctly    |

### Quick Verification Commands

```bash
# Run full verification (lint → format → typecheck)
pnpm lint && pnpm format && pnpm check-types

# Build for production
pnpm build
```

Expected output: No errors from lint, format, or typecheck.

### Target Specific Packages

Always run commands from root when possible. Use `--filter` to target a package or app:

```bash
# Build a specific package
pnpm --filter @repo/ui build

# Build a specific app
pnpm --filter @repo/playground build

# Lint a specific package
pnpm --filter @repo/mosaic-maker lint

# Run a specific package's tests
pnpm --filter @repo/ui test
```

> **Tip:** Use `--filter` instead of `cd package && pnpm cmd` for consistency.

## Troubleshooting

### Common Issues

| Issue                            | Cause              | Fix                                      |
| -------------------------------- | ------------------ | ---------------------------------------- |
| `pnpm: command not found`        | pnpm not installed | `npm install -g pnpm`                    |
| `uv: command not found`          | Missing uv         | `pip install uv` or use Nix              |
| Port 4321 in use                 | Already running    | Kill process or use different port       |
| Type errors after package update | Cache stale        | Delete `.turbo` and rerun `pnpm install` |
| Storybook stories not showing    | Not built          | `cd apps/storybook && pnpm build`        |

### Node.js Version

This project requires **Node.js 22+**. Check your version:

```bash
node --version
```

If you have an older version, use `n` or `fnm` to switch:

```bash
fnm install 22
fnm use 22
```

### Clean Restart

If things feel off, start fresh:

```bash
# Remove caches
rm -rf .turbo node_modules apps/*/node_modules packages/*/node_modules

# Reinstall
pnpm install

# Verify
pnpm lint && pnpm check-types
```
