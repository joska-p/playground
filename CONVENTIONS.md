# Project Conventions

> **Agent use:** rules only — no rationale, no examples. For worked examples and reasoning, see the [Codebase Conventions](https://playground-beryl-omega.vercel.app/docs/explanation/conventions/) docs page.

Stack: `Turborepo` · `Vite` · `React` · `Astro` · `TypeScript` · `Tailwind` · `Zustand` · `Zod` · `Storybook`

## Architecture

Three-layer unidirectional flow — dependencies point **downward only**:

```
Presentation Layer  →  State Orchestration Layer  →  Core Domain Engine
```

- **Core Domain Engine** — pure math, utilities, schemas, constants. No React, no store, no side effects.
- **State Orchestration Layer** — Zustand stores. Bridges UI and core.
- **Presentation Layer** — thin orchestrators: read state, dispatch events. No business logic.

## Monorepo structure

```
apps/
  playground/   ← Astro site (docs, experiments, notebook)
  storybook/    ← Standalone Storybook
packages/
  ui/           ← Shared React component library
  ...           ← Other shared packages (Vite + React)
```

Cross-package imports: `@repo/` path aliases only — never relative paths across package boundaries.

## File structure

- One conceptual unit per directory. A directory needs 2+ files; otherwise place the file in the parent.
- Group by **domain**, not by type. No top-level `components/`, `hooks/`, `utils/` directories.
- `core/` — constants, types, pure data. No React, no store.
- `store/` — split into `store.ts`, `actions.ts`, `selectors.ts`, and optionally `types.ts`.
- `utils/` — one file per clear purpose. No catch-all files.

## Naming — files

| Entity                | Convention                                | Example                  |
| --------------------- | ----------------------------------------- | ------------------------ |
| Directories           | kebab-case                                | `color-palette/`         |
| React component files | `PascalCase.tsx`                          | `Button.tsx`             |
| Astro component files | `kebab-case.astro`                        | `section-header.astro`   |
| Hook files            | `camelCase.ts` — must start with `use`    | `useImageUpload.ts`      |
| Zustand store files   | `camelCase.ts` — must end with `Store`    | `graphStore.ts`          |
| Utility / core files  | `camelCase.ts`                            | `fetchPalettes.ts`       |
| Zod schema files      | `camelCase.schema.ts`                     | `colorPalette.schema.ts` |
| Type-only files       | `camelCase.types.ts`                      | `colorPalette.types.ts`  |
| CSS / stylesheets     | `kebab-case.css` / `.module.css`          | `gruvbox-theme.css`      |
| Content files         | `kebab-case.md` / `.mdx`                  | `first-visualization.md` |
| Test files            | same base name + `.test.ts` / `.test.tsx` | `Button.test.tsx`        |
| Story files           | same base name + `.stories.tsx`           | `Button.stories.tsx`     |

## Naming — identifiers

| Identifier             | Convention                            | Example                           |
| ---------------------- | ------------------------------------- | --------------------------------- |
| Variables, functions   | camelCase                             | `fetchPalettes`                   |
| React components       | PascalCase                            | `Button`                          |
| Hooks                  | `use` + camelCase                     | `useImageUpload`                  |
| Zustand store variable | camelCase + `Store` (unexported)      | `graphStore`                      |
| Zustand getter hooks   | `use` + Domain + Slice                | `useGraphNodes`                   |
| Zustand setter fns     | camelCase verb + Domain + target      | `addGraphNode`, `selectGraphNode` |
| Props types            | `XxxProps`, co-located                | `ButtonProps`                     |
| Module-level constants | SCREAMING_SNAKE_CASE                  | `MAX_RETRIES`                     |
| Zod schemas            | camelCase + `Schema`                  | `colorPaletteSchema`              |
| TypeScript types       | PascalCase                            | `ColorPalette`                    |
| Enums                  | PascalCase (members: SCREAMING_SNAKE) | `Direction.NORTH`                 |

**Semantics:** Functions are verbs (`regenerate`), components are nouns (`Button`). No re-aliasing.

## File extensions

- `.tsx` — files containing JSX only.
- `.ts` — everything else (hooks, stores, utils, schemas, types).
- `.astro` — Astro components.

## Exports

- **Named exports only.** No `export default`. Filename matches primary export.
- **No barrel files** (`index.ts`). Import directly from source.
- **No wildcard re-exports** (`export * from`).
- **Package public API** declared via `package.json` `exports` — one subpath per component.

## Function syntax

- **React components** → `function` declaration. Never `const Component = () =>`.
- **Top-level named functions** → `function` declaration.
- **Inline callbacks and one-liners** → arrow functions.
- Annotate return types on React components (`JSX.Element`) and async functions.

## Zustand stores

- Store variable is **never exported**.
- Getter hooks: `use[Domain][Slice]` — select a **single slice**.
- Setter functions: plain `camelCase`, not hooks.
- Store files use `.ts`, never `.tsx`.
- Actions mutate; selectors read. Don't mix.
- Subscribe to minimal slices. Heavyweight path (structural) → reconciliation. Lightweight path (cosmetic) → direct DOM/style mutations.

## Zod schemas

- Co-located next to the code they validate. Use `.schema.ts` suffix.
- Runtime validation only — write TS types separately, don't use `z.infer<>` as source of truth.

## General rules

- Types co-located with usage. No shared `types/` package.
- `type` over `interface`. Use `interface` only for declaration merging.
- No comments. Code is self-documenting.
- No empty files.
- `array.sort()` mutates — spread first: `[...array].sort()`.
- Unused code is deleted, not commented out.

## ESLint

| Convention                          | Rule                                             |
| ----------------------------------- | ------------------------------------------------ |
| No default exports                  | `import/no-default-export`                       |
| `type` over `interface`             | `@typescript-eslint/consistent-type-definitions` |
| `import type` for type-only imports | `@typescript-eslint/consistent-type-imports`     |
| No circular dependencies            | `import/no-cycle`                                |

Tool config files (`vite.config.ts`, etc.) are exempt from `import/no-default-export`.
