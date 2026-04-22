# Playground (Astro)

The main Astro site hosting all experiments and creative coding tools.

## Commands

From the workspace root:

| Command | Action |
| :--- | :--- |
| `pnpm dev` | Start development server at `localhost:4321` |
| `pnpm build` | Build production files to `./dist` |
| `pnpm preview` | Preview production build locally |

## Structure

```
src/
├── components/    # Astro + React components
├── layouts/       # Page layouts
├── pages/         # File-based routing
├── styles/       # Global styles
└── content/      # Content collections
```

## Adding New Experiments

1. Create a new page in `src/pages/`
2. Add any required components to `src/components/`
3. Follow the [Architectural Blueprint](../../docs/drafts/architectural-blueprint.md) for structure conventions