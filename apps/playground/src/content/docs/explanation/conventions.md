---
title: 'Codebase Conventions'
description: 'Architecture, naming, and coding patterns used across the project.'
category: 'explanation'
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
| Zustand store files   | `camelCase.ts`                            | `store.ts`                |
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
| Zustand store variable   | `camelCase[Domain]Store` (exported)   | `graphStore`                      |
| Zustand getter hooks     | `use` + Slice (no domain prefix)      | `useNodes`                        |
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
- **No barrel files** (`index.ts`) at the top level. Barrel files are allowed inside component directories to expose the component while keeping internal helpers (hooks, renderers) private.
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

## Null & Undefined

- **Prefer `undefined` over `null`.** TypeScript uses `undefined` for optional fields natively; `null` requires explicit opt-in and adds noise to type unions.
- Use optional chaining (`?.`) and nullish coalescing (`??`) rather than null checks.
- Only use `null` when interfacing with an external API or library that explicitly returns it.

---

## Data Fetching

- **TanStack Query** for all server/async data. No fetching inside Zustand actions or `useEffect`.
- Query keys are co-located with their query function, not scattered across components.
- Zustand stores hold **client-only** state (UI state, selections, ephemeral data). They do not mirror server data.

---

## Error Handling

- **Prefer safe defaults over throwing.** Return a fallback value when a missing value is recoverable.
- **React Error Boundaries** must be placed at a minimum at every route boundary. Add a second boundary at the feature level for any widget that is self-contained and whose failure should not take down the whole page. Do not wrap every component.
- Only throw when the error is truly unrecoverable and the subtree must be replaced.
- Never silently swallow errors (`catch (e) {}`). Log or surface them.

---

## Comments

- **Do not comment what the code does** — write self-documenting code instead.
- **Do comment why** when the reason is non-obvious: a tricky tradeoff, a workaround for an upstream bug, or an intentional constraint that looks wrong.
- No commented-out code. Delete unused code.

---

## Commits

This project follows [Conventional Commits](https://www.conventionalcommits.org/). Every commit message must be structured as:

```
<type>(<scope>): <subject>
```

Common types:

| Type       | When to use                                     |
| ---------- | ----------------------------------------------- |
| `feat`     | New feature                                     |
| `fix`      | Bug fix                                         |
| `refactor` | Code change that is neither a fix nor a feature |
| `chore`    | Tooling, config, dependencies                   |
| `docs`     | Documentation only                              |
| `test`     | Adding or updating tests                        |
| `perf`     | Performance improvement                         |

Scope is the package or domain name (e.g. `feat(ui): add Button variant`). Enforced via `commitlint` + `husky`.

Breaking changes must append `!` after the type and include a `BREAKING CHANGE:` footer.

---

## Zustand Stores

Store files live in `stores/[domain]/`. For small domains (any single file under ~120 lines), a single `store.ts` is acceptable. Split into the 4-file structure once a file exceeds that threshold or when clear separation of concerns emerges:

- `store.ts` — `create()` + raw store export (internal only)
- `actions.ts` — all mutators + async orchestration
- `selectors.ts` — all read hooks (components only import from here and `actions.ts`)
- `types.ts` — store-specific types

The raw store is named `camelCase[Domain]Store` (e.g., `graphStore`, `manipulatorStore`) and exported — but only imported in its own `actions.ts` and `selectors.ts` files, never in components.

- **Local state first.** Single-component UI state (dropdown selection, toggle, file name) → `useState`. Only promote to Zustand when state is consumed by multiple unrelated components.
- Getter hooks: `use[Slice]` — select a **single slice**, drop the domain prefix. (`useNodes`, `useEdges`)
- Setter functions: plain `camelCase`, not hooks. (`addNode`, `selectNode`)
- Store files use `.ts`, never `.tsx`.
- Actions mutate; selectors read. Don't mix.
- Subscribe to minimal slices. Heavyweight path (structural) → full reconciliation. Lightweight path (cosmetic) → direct DOM/style mutations.
- **Async orchestration** (e.g., executing a workflow, calling a pipeline) lives in `actions.ts` as a plain async function using `getState()`/`setState()`. No thunk middleware needed.
- **Domain boundary test:** if an action in one domain reads from another domain's store (e.g. `pipeline/actions` imports `workflow/store`), those domains are coupled — merge them into one domain.

---

## Zod Schemas

- Co-located next to the code they validate. Use `.schema.ts` suffix.
- **Use `z.infer<typeof schema>` as the source of truth for TypeScript types.** Do not write parallel hand-maintained types — they will drift. Export the inferred type alongside the schema:

```typescript
// color-palette.schema.ts
export const colorPaletteSchema = z.object({ ... });
export type ColorPalette = z.infer<typeof colorPaletteSchema>;
```

- The only exception is when a type must exist before its schema (e.g. recursive types that Zod cannot infer cleanly) — document why with a comment.

---

## UI Components — CSS Token System

- All components in `packages/ui` must use the project CSS tokens (e.g. `--color-primary`, `--radius-md`). No hardcoded colors, spacing, or radius values.
- Tokens map to Tailwind utility classes via the Tailwind config — always use the utility class, never the raw CSS variable directly in JSX.
- When adding a new design decision (color, spacing, shadow), define a token first, then use it. Never one-off values.

---

## Tailwind & CSS Approach

- **Default:** Tailwind utility classes for layout, spacing, color, typography.
- **CSS Modules** (`*.module.css`) are reserved for styles that Tailwind utilities genuinely cannot express. Concrete cases that warrant a module:
  - Multi-step `@keyframes` animations
  - `::before` / `::after` pseudo-elements with `content`
  - `:has()` / `:is()` chains that would require more than 2 levels of Tailwind's `[&...]` syntax
  - Deeply scoped third-party component overrides

  If you find yourself reaching for a module for any other reason, default to Tailwind first.

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
| Import order enforced               | handled by import-sort plugin (auto-fixable)     |

Import order groups (auto-sorted by plugin, listed here for reference):

1. Node built-ins (`node:fs`, `node:path`)
2. External packages (`react`, `zod`, `zustand`)
3. Internal monorepo aliases (`@repo/ui`, `@repo/core`)
4. Relative imports (`./Button`, `../utils`)
5. Type-only imports (grouped with their source by `consistent-type-imports`)

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

## Documentation

- Each package's `README.md` is the **source of truth** for its documentation.
- READMEs must document both **consumer usage** (API, examples) and **contributor internals** (architecture, rationale, gotchas).
- After updating a package README, sync it to the Astro docs site by running from repo root:
  ```bash
  pnpm --filter @repo/playground sync-package-docs
  ```
  The script **overwrites** `apps/playground/src/content/docs/reference/packages/<name>.md` with the README content wrapped in Astro frontmatter. The README is the single source of truth — do not edit reference docs directly.
- To remove reference docs whose source package is gone, append `--prune`:
  ```bash
  pnpm --filter @repo/playground sync-package-docs -- --prune
  ```

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
