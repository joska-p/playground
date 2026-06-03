---
title: "Codebase Conventions"
description: "Architecture, naming, and coding patterns used across the project."
category: "explanation"
tags:
  - explanation
---

# Codebase Conventions

Stack: `Turborepo` · `Vite` · `React` · `Astro` · `TypeScript` · `Tailwind` · `Zustand` · `Zod` · `TanStack Query` · `Storybook` · `Vitest`

---

## Architecture

Three-layer unidirectional flow — dependencies point **downward only**:

```
Presentation Layer  →  State Orchestration Layer  →  Core Domain Engine
```

- **Core Domain Engine** — pure math, utilities, schemas, constants. No React, no store, no side effects.
- **State Orchestration Layer** — Zustand stores. Bridges UI and core. No data fetching (use TanStack Query instead).
- **Presentation Layer** — thin orchestrators: read state, dispatch events. No business logic.

This ensures the core engine is testable in isolation and UI frameworks can be swapped without touching domain logic.

---

## Monorepo Structure

```
apps/
  playground/   ← Astro site (docs, experiments, notebook)
  storybook/    ← Standalone Storybook
packages/
  ui/           ← Shared React component library
  ...           ← Other shared packages (Vite + React)
```

Cross-package imports use `@repo/` path aliases only — never relative paths across package boundaries.

---

## File Structure

- **One conceptual unit per directory.** A directory needs 2+ files; otherwise place the file in the parent.
- **Group by domain.** Within a domain, use these conventional folders:
  - `components/` — React and Astro components.
  - `hooks/` — custom hooks and Zustand store files.
  - `core/` — constants, types, pure data. No React, no store.
  - `utils/` — one file per clear purpose. No catch-all files.
  - `styles/` — CSS files, co-located with components or in a shared `styles/` folder for global styles.

---

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

---

## File extensions

- `.tsx` — files containing JSX only.
- `.ts` — everything else (hooks, stores, utils, schemas, types).
- `.astro` — Astro components.

---

## Exports

- **Named exports only.** No `export default`. Filename matches primary export.
- **No barrel files** (`index.ts`). Import directly from source.
- **No wildcard re-exports** (`export * from`).
- **Package public API** declared via `package.json` `exports` — one subpath per component.

---

## Function Syntax

- **React components** → `function` declaration. Never `const Component = () =>`.
- **Top-level named functions** → `function` declaration.
- **Inline callbacks and one-liners** → arrow functions.
- Annotate return types on React components (`JSX.Element`) and async functions.

Why `function` declarations?

- **Generics are clean**: `function Component<T>()` avoids the TSX workaround `const Component = <T,>() =>`
- **DevTools**: React DevTools always resolves `function` names correctly
- **Hoisting**: helpers can sit below the main export without forward references

---

## Async

- Prefer `async/await` for sequential logic and readability.
- `.then()` is acceptable for fire-and-forget chains or when avoiding an `async` wrapper is cleaner.
- Never mix both styles in the same function.

---

## Data Fetching

- **TanStack Query** for all server/async data. No fetching inside Zustand actions or `useEffect`.
- Query keys are co-located with their query function, not scattered across components.
- Zustand stores hold **client-only** state (UI state, selections, ephemeral data). They do not mirror server data.

---

## Error Handling

- **Prefer safe defaults over throwing.** Return a fallback value when a missing value is recoverable.
- **React Error Boundaries** catch unexpected render errors. Place boundaries at meaningful subtree roots, not wrapping every component.
- Only throw when the error is truly unrecoverable and the subtree must be replaced.
- Never silently swallow errors (`catch (e) {}`). Log or surface them.

---

## Comments

- **Do not comment what the code does** — write self-documenting code instead.
- **Do comment why** when the reason is non-obvious: a tricky tradeoff, a workaround for an upstream bug, or an intentional constraint that looks wrong.
- No commented-out code. Delete unused code.

---

## Zustand Stores

Store files live in `stores/[domain]/` alongside its associated files.

The store hook is named `use[Domain]Store` and is exported — but only imported in its own `actions.ts` (setters) and `selectors.ts` (getters) files, never in components.

- Getter hooks: `use[Domain][Slice]` — select a **single slice** and export it. (`useGraphNodes`, `useGraphEdges`)
- Setter functions: plain `camelCase`, not hooks. (`addGraphNode`, `selectGraphNode`)
- Store files use `.ts`, never `.tsx`.
- Actions mutate; selectors read. Don't mix.
- Subscribe to minimal slices. Heavyweight path (structural) → full reconciliation. Lightweight path (cosmetic) → direct DOM/style mutations.

---

## Zod Schemas

- Co-located next to the code they validate. Use `.schema.ts` suffix.
- Runtime validation only — write TS types separately, don't use `z.infer<>` as source of truth.

---

## UI Components — CSS Token System

- All components in `packages/ui` must use the project CSS tokens (e.g. `--color-primary`, `--radius-md`). No hardcoded colors, spacing, or radius values.
- Tokens map to Tailwind utility classes via the Tailwind config — always use the utility class, never the raw CSS variable directly in JSX.
- When adding a new design decision (color, spacing, shadow), define a token first, then use it. Never one-off values.

---

## Tailwind & CSS Approach

- **Default:** Tailwind utility classes for layout, spacing, color, typography.
- **CSS Modules** (`*.module.css`) are reserved for styles that utilities cannot express: complex animations, pseudo-element tricks, or deeply scoped third-party overrides.
- **Global CSS** is limited to base resets and CSS custom properties (design tokens) declared in a single `global.css` per app.
- Do not mix Tailwind and inline `style={{}}` props for the same concern.

---

## Testing — Vitest

- Tests live next to the file they test (`Button.test.tsx` beside `Button.tsx`).
- Test behaviour, not implementation. Don't assert on internal state.
- Pure core functions → unit tests. Components → `vitest-browser-react` (real browser, no jsdom).
- No test should depend on another test's side effects. Each test is fully isolated.
- Prefer `describe` blocks that read like sentences: `describe('Button', () => { it('renders disabled when prop is set') })`.

---

## General Rules

- Types co-located with usage. No shared `types/` package.
- `type` over `interface`. Use `interface` only for declaration merging.
- No empty files.
- `array.sort()` mutates — use: `array.toSorted()`.
- Unused code is deleted, not commented out.

---

## ESLint

| Convention                          | Rule                                             |
| ----------------------------------- | ------------------------------------------------ |
| No default exports                  | `import/no-default-export`                       |
| `type` over `interface`             | `@typescript-eslint/consistent-type-definitions` |
| `import type` for type-only imports | `@typescript-eslint/consistent-type-imports`     |
| No circular dependencies            | `import/no-cycle`                                |

Tool config files (`vite.config.ts`, etc.) are exempt from `import/no-default-export`.

---

## Data Hydration & Validation

- **Never block initial UI paint on network.** Provide a local fallback state immediately. Network-dependent assets must hydrate the viewport layout during cold mounts while background data resolution finishes.
- **All external payloads** must pass through Zod validation at the network boundary before entering stores.
- **Validated payloads** committed to persistent storage must carry a version flag and TTL.
- **When permuting data model attributes**, preserve insertion-order key structure — only values may change. This ensures rendering subsystems can evaluate node transitions without mapping errors.

---

## Layout Computations

Programmatic layout must align with native rendering engines. When calculating child counts to fill a container, account for platform edge cases (e.g. trailing spacing omission) to avoid off-by-one rendering gaps.

For example, `computeNumberOfTiles.ts` mirrors CSS Grid's `auto-fill` arithmetic:

```typescript
tilesPerRow = Math.floor((width + gap) / (tileSize + gap));
```

The `+ gap` in the numerator accounts for the last tile having no trailing gap, keeping JS and CSS in agreement.

---

## Performance Guardrails

- **High-frequency inputs** (resize, mouse, scroll): throttle or debounce before layout calculations. Isolate runtime calculations from layout thrashing.
- **Stable keys**: virtual lists and rendering loops must use deterministic keys derived from data properties — no random keys that trigger component unmount/remount churn.
- **Action audit**: lifecycle hooks and event managers must not cascade into duplicate calculations or execution loops.

---

## Storybook

Stories live in `apps/storybook/stories/` — **not co-located** with components. Mirror the source package structure inside `apps/storybook/stories/`:

```
apps/storybook/stories/
  ui/
    Button.stories.tsx        ← mirrors packages/ui/src/Button.tsx
    GraphViz.stories.tsx
```

Import via `@repo/` aliases only. Story files use `[ComponentName].stories.tsx`.

---

## Package Dependencies

| Scenario                                  | Where                                  |
| ----------------------------------------- | -------------------------------------- |
| `react` / `react-dom` in a shared package | `peerDependencies` + `devDependencies` |
| `react` / `react-dom` in an app           | `dependencies`                         |
| `vite`, `typescript`, `tailwindcss`       | `devDependencies` (everywhere)         |
| `@types/*`                                | `devDependencies` (everywhere)         |
| `@repo/eslint-config`, `@repo/tsconfig`   | `devDependencies`                      |
| `@repo/ui` consumed by an app at runtime  | `dependencies` in the app              |
| `zustand`, `zod` re-exported by a package | `peerDependencies` + `devDependencies` |
| `zustand`, `zod` used only internally     | `dependencies`                         |

Always pair a peer dep with a matching entry in `devDependencies` so the package can build and test locally. The monorepo has two flavours of packages — **apps** (fully bundled, dependency tree collapses at build time) and **shared packages** (consumed by other packages, must not bundle what the consumer already provides).

---

## Edge Cases

- **Tool config files** (`vite.config.ts`, `tailwind.config.ts`, `eslint.config.js`) require a default export by the tool's spec — forced exception. The `import/no-default-export` rule is turned off for these in ESLint.
- **`package.json` `exports` field** is a Node.js resolver directive, not a JavaScript export — the named export rule doesn't apply to it.
- **WIP packages** must follow naming rules from the start. Renames are expensive once things are imported across packages.

---

[`CONVENTIONS.md`]: https://gitlab.com/jpotin/playground/blob/main/CONVENTIONS.md
