# Project Conventions

> **Agent use:** rules only — no rationale, no examples. For worked examples and reasoning, see the [Codebase Conventions](https://playground-beryl-omega.vercel.app/docs/explanation/conventions/) docs page.

Stack: `Turborepo` · `Vite` · `React` · `Astro` · `TypeScript` · `Tailwind` · `Zustand` · `Zod` · `TanStack Query` · `Storybook` · `Vitest`

## Architecture

Three-layer unidirectional flow — dependencies point **downward only**:

```
Presentation Layer  →  State Orchestration Layer  →  Core Domain Engine
```

- **Core Domain Engine** — pure math, utilities, schemas, constants. No React, no store, no side effects.
- **State Orchestration Layer** — Zustand stores. Bridges UI and core. No data fetching (use TanStack Query instead).
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
- Group by **domain**. Within a domain, use these conventional folders:
  - `components/` — React and Astro components.
  - `hooks/` — custom hooks and Zustand store files.
  - `core/` — constants, types, pure data. No React, no store.
  - `utils/` — one file per clear purpose. No catch-all files.
  - `styles/` — CSS files, co-located with components or in a shared `styles/` folder for global styles.

## Naming

Two rules cover every file:

1. **Component files** (React + Astro) → `PascalCase` — matches the exported name: `Button.tsx`, `SectionHeader.astro`
2. **Everything else** → `camelCase` for hooks (`useImageUpload.ts`), `kebab-case` for all other files

| Entity                | Convention                                | Example                   |
| --------------------- | ----------------------------------------- | ------------------------- |
| Directories           | kebab-case                                | `color-palette/`          |
| React component files | `PascalCase.tsx`                          | `Button.tsx`              |
| Astro component files | `PascalCase.astro`                        | `SectionHeader.astro`     |
| Hook files            | `camelCase.ts` — must start with `use`    | `useImageUpload.ts`       |
| Zustand store files   | `camelCase.ts` — must start with `use`    | `useGraphStore.ts`        |
| All other files       | `kebab-case.ts`                           | `fetch-palettes.ts`       |
| Zod schema files      | `kebab-case.schema.ts`                    | `color-palette.schema.ts` |
| Type-only files       | `kebab-case.types.ts`                     | `color-palette.types.ts`  |
| CSS / stylesheets     | `kebab-case.css` / `.module.css`          | `gruvbox-theme.css`       |
| Content files         | `kebab-case.md` / `.mdx`                  | `first-visualization.md`  |
| Test files            | same base name + `.test.ts` / `.test.tsx` | `Button.test.tsx`         |
| Story files           | same base name + `.stories.tsx`           | `Button.stories.tsx`      |

### Identifiers

| Identifier               | Convention                            | Example                           |
| ------------------------ | ------------------------------------- | --------------------------------- |
| Variables, functions     | camelCase                             | `fetchPalettes`                   |
| React + Astro components | PascalCase                            | `Button`, `SectionHeader`         |
| Hooks                    | `use` + camelCase                     | `useImageUpload`                  |
| Zustand store variable   | `use` + Domain + `Store` (unexported) | `useGraphStore`                   |
| Zustand getter hooks     | `use` + Domain + Slice                | `useGraphNodes`                   |
| Zustand setter fns       | camelCase verb + Domain + target      | `addGraphNode`, `selectGraphNode` |
| Props types              | `XxxProps`, co-located                | `ButtonProps`                     |
| Module-level constants   | SCREAMING_SNAKE_CASE                  | `MAX_RETRIES`                     |
| Zod schemas              | camelCase + `Schema`                  | `colorPaletteSchema`              |
| TypeScript types         | PascalCase                            | `ColorPalette`                    |
| Enums                    | PascalCase (members: SCREAMING_SNAKE) | `Direction.NORTH`                 |

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

## Async

- Prefer `async/await` for sequential logic and readability.
- `.then()` is acceptable for fire-and-forget chains or when avoiding an `async` wrapper is cleaner.
- Never mix both styles in the same function.

## Data fetching

- **TanStack Query** for all server/async data. No fetching inside Zustand actions or `useEffect`.
- Query keys are co-located with their query function, not scattered across components.
- Zustand stores hold **client-only** state (UI state, selections, ephemeral data). They do not mirror server data.

## Error handling

- **Prefer safe defaults over throwing.** Return a fallback value when a missing value is recoverable.
- **React Error Boundaries** catch unexpected render errors. Place boundaries at meaningful subtree roots, not wrapping every component.
- Only throw when the error is truly unrecoverable and the subtree must be replaced.
- Never silently swallow errors (`catch (e) {}`). Log or surface them.

## Comments

- **Do not comment what the code does** — write self-documenting code instead.
- **Do comment why** when the reason is non-obvious: a tricky tradeoff, a workaround for an upstream bug, or an intentional constraint that looks wrong.
- No commented-out code. Delete unused code.

## Zustand stores

- Store files live in `hooks/` alongside other hooks.
- The store hook is named `use[Domain]Store` and is exported — but only imported in its own `actions.ts` and `selectors.ts` files, never in components.
- Getter hooks: `use[Domain][Slice]` — select a **single slice** and export it. (`useGraphNodes`, `useGraphEdges`)
- Setter functions: plain `camelCase`, not hooks. (`addGraphNode`, `selectGraphNode`)
- Store files use `.ts`, never `.tsx`.
- Actions mutate; selectors read. Don't mix.
- Subscribe to minimal slices. Heavyweight path (structural) → reconciliation. Lightweight path (cosmetic) → direct DOM/style mutations.

## Zod schemas

- Co-located next to the code they validate. Use `.schema.ts` suffix.
- Runtime validation only — write TS types separately, don't use `z.infer<>` as source of truth.

## UI components — CSS token system

- All components in `packages/ui` must use the project CSS tokens (e.g. `--color-primary`, `--radius-md`). No hardcoded colors, spacing, or radius values.
- Tokens map to Tailwind utility classes via the Tailwind config — always use the utility class, never the raw CSS variable directly in JSX.
- When adding a new design decision (color, spacing, shadow), define a token first, then use it. Never one-off values.

## Testing — Vitest

- Tests live next to the file they test (`Button.test.tsx` beside `Button.tsx`).
- Test behaviour, not implementation. Don't assert on internal state.
- Pure core functions → unit tests. Components → `vitest-browser-react` (real browser, no jsdom).
- No test should depend on another test's side effects. Each test is fully isolated.
- Prefer `describe` blocks that read like sentences: `describe('Button', () => { it('renders disabled when prop is set') })`.

## General rules

- Types co-located with usage. No shared `types/` package.
- `type` over `interface`. Use `interface` only for declaration merging.
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
