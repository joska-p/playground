---
title: "Overview"
description: "What Creative Playground is, its principles, and architecture."
tags:
  - explanation
featured: true
---

# Creative Playground

A creative coding playground for experiments, visualizations, and visual toys. Built for fun, documented for collaborators.

---

## Principles

**Stable Shell / Volatile Engines**
Infrastructure is boring and should stay that way. The experiments? They're meant to break, evolve, and get rewritten.

**Stateless First**
Avoid state until you actually need it. Pure functions > side effects.

**Composable UI**
Small, focused components that do one thing well. Mix and match.

---

## Architecture

The codebase follows a **monorepo** structure with clear separation between the shell and the engines.

### Apps

| App | Purpose |
| --- | --- |
| `apps/playground` | The shell — Astro app with docs, project pages, and routing |
| `apps/storybook` | Component explorer for UI library |

### Packages

| Package | Purpose |
| --- | --- |
| `packages/ui` | Shared React components with CVA variants |
| `packages/mosaic-maker` | CSS Grid patterns from color palettes |
| `packages/sequence-renderer` | Math sequence visualization engine |
| `packages/palette-generator` | Color theory scheme generator |
| `packages/image-to-particles` | Image → particle physics deconstruction |
| `packages/tailwind-config` | Design tokens (Gruvbox theme) |

### Data Flow

```
User Action → Engine Rule → Data → Visualization → Canvas/DOM
```

The shell (Astro) provides layout and navigation. Engines own their logic. UI components bridge them.

---

## Built With

| Tool | Link | Role |
| --- | --- | --- |
| Astro | [astro.build](https://astro.build) | App shell, routing, content |
| React 19 | [react.dev](https://react.dev) | UI components |
| Tailwind CSS | [tailwindcss.com](https://tailwindcss.com) | Styling |
| TypeScript | [typescriptlang.org](https://typescriptlang.org) | Type safety |
| Turborepo | [turbo.build](https://turbo.build/repo) | Build orchestration |
| pnpm | [pnpm.io](https://pnpm.io) | Package management |
| Storybook | [storybook.js.org](https://storybook.js.org) | Component explorer |
| Zustand | [zustand-demo.pmnd.rs](https://zustand-demo.pmnd.rs) | State management |
| D3 | [d3js.org](https://d3js.org) | Data visualization |

---

## Next Steps

- **New here?** Start with [Your First Visualization](/docs/tutorial/first-visualization/)
- **Adding a project?** See [Adding Projects](/docs/how-to/adding-projects/)
- **Understanding engines?** Read [Engines](/docs/explanation/engines/)
- **UI components?** Browse [Storybook](/storybook/) or [UI Components Reference](/docs/reference/ui-components/)
