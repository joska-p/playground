# Project Conventions

> **Agent use:** rules only — no rationale, no examples. For worked examples and reasoning, see the [Codebase Conventions](/apps/playground/src/content/docs/explanation/conventions.md) docs page.

Stack: `Turborepo` · `Vite` · `React` · `Astro` · `TypeScript` · `Tailwind` · `Zustand` · `Zod` · `TanStack Query` · `Storybook` · `Vitest`

## Architecture

Three-layer unidirectional flow — dependencies point **downward only**:

- **Core Domain Engine** — pure math, utilities, schemas, constants. No React, no store, no side effects.
- **State Orchestration Layer** — Zustand stores. Bridges UI and core. No data fetching (use TanStack Query instead).
- **Presentation Layer** — thin orchestrators: read state, dispatch events. No business logic.

## Data Fetching

- **TanStack Query** for all server/async data. No fetching inside Zustand actions or `useEffect`.
- Query keys are co-located with their query function, not scattered across components.
- Zustand stores hold **client-only** state (UI state, selections, ephemeral data). They do not mirror server data.

## Data Hydration & Validation

- **Never block initial UI paint on network.** Provide a local fallback state immediately.
- **All external payloads** must pass through Zod validation at the network boundary before entering stores.

## Null & Undefined

- **Prefer `undefined` over `null`.** Only use `null` when an external API explicitly returns it.
- Use optional chaining (`?.`) and nullish coalescing (`??`) rather than null checks.

## Error Handling

- **Prefer safe defaults over throwing.** Return a fallback value when a missing value is recoverable.
- **React Error Boundaries** must be placed at every route boundary as a minimum. Add a feature-level boundary for self-contained widgets whose failure should not take down the whole page. Do not wrap every component.
- Only throw when the error is truly unrecoverable and the subtree must be replaced.
- Never silently swallow errors (`catch (e) {}`). Log or surface them.

## Commits

Follow [Conventional Commits](https://www.conventionalcommits.org/): `<type>(<scope>): <subject>`.
Types: `feat`, `fix`, `refactor`, `chore`, `docs`, `test`, `perf`.
Breaking changes: append `!` after the type and include a `BREAKING CHANGE:` footer.
Enforced via `commitlint` + `husky`.

## Zustand Stores

- Store files live in `stores/[domain]/`.
- **Local state first.** Single-component UI state → `useState`. Only promote to Zustand when state is consumed by multiple unrelated components.
- Single-file store is acceptable while all files stay under ~120 lines. Split into 4 files when that threshold is crossed:
  - `store.ts` — `create()` + raw store export (internal only)
  - `actions.ts` — all mutators + async orchestration
  - `selectors.ts` — all read hooks (components only import from here and `actions.ts`)
  - `types.ts` — store-specific types
- The raw store is named `camelCase[Domain]Store` (e.g. `graphStore`) — only imported in its own `actions.ts` and `selectors.ts`, never in components.
- Selector and action names drop the domain prefix (`useNodes` not `useGraphNodes`).
- Actions mutate; selectors read. Don't mix.
- Subscribe to minimal slices. Heavyweight path (structural) → reconciliation. Lightweight path (cosmetic) → direct DOM/style mutations.
- **Async orchestration** lives in `actions.ts` as a plain async function using `getState()`/`setState()`. No thunk middleware.
- **Domain boundary test:** if an action in one domain reads from another domain's store, those domains are coupled — merge them.

## Zod Schemas

- Co-located next to the code they validate. Use `.schema.ts` suffix.
- **Use `z.infer<typeof schema>` as the TypeScript type source of truth.** Do not write parallel hand-maintained types. Export the inferred type alongside the schema.
- Exception: recursive types Zod cannot infer cleanly — document the reason with a comment.

## UI Components — CSS Token System

- All components in `packages/ui` must use the project CSS tokens (e.g. `--color-primary`, `--radius-md`). No hardcoded colors, spacing, or radius values.
- Tokens map to Tailwind utility classes — always use the utility class, never the raw CSS variable directly in JSX.
- When adding a new design decision, define a token first. Never one-off values.

## Tailwind & CSS

- **Default:** Tailwind utility classes for layout, spacing, color, typography.
- **CSS Modules** (`*.module.css`) — only for: multi-step `@keyframes`, `::before`/`::after` with `content`, `:has()`/`:is()` chains beyond 2 levels of `[&...]`, deeply scoped third-party overrides. Default to Tailwind for everything else.
- **Global CSS** — base resets and CSS custom properties only, in a single `global.css` per app.
- Do not mix Tailwind and inline `style={{}}` for the same concern.
- **Dynamic Tailwind Colors with CSS Variables** css trick documented in `apps/playground/src/content/docs/explanation/dynamic-tailwind.md`. Use `style={{ '--color-primary': dynamicValue }}` + `text-[color:var(--color-primary)]` — never inline styles for color directly.

## Storybook

Stories live in `apps/storybook/stories/` — not co-located with components. Mirror the source package structure.
Import via `@repo/` aliases only. Story files use `[ComponentName].stories.tsx`.

## Documentation

- Each package's `README.md` is the **source of truth** for its documentation.
- After updating a package README, sync to the Astro docs site:
  ```bash
  pnpm --filter @repo/playground sync-package-docs
  ```
- Do not edit reference docs directly — the README is the single source of truth.

## Performance Guardrails

- **High-frequency inputs** (resize, mouse, scroll): throttle or debounce before layout calculations.
- **Stable keys**: use deterministic keys derived from data properties — no random keys.
- **Action audit**: lifecycle hooks and event managers must not cascade into duplicate calculations.

## ESLint

| Convention                          | Rule                                             |
| ----------------------------------- | ------------------------------------------------ |
| No default exports                  | `import/no-default-export`                       |
| `type` over `interface`             | `@typescript-eslint/consistent-type-definitions` |
| `import type` for type-only imports | `@typescript-eslint/consistent-type-imports`     |
| No circular dependencies            | `import/no-cycle`                                |
| Import order enforced               | handled by import-sort plugin (auto-fixable)     |

Import order: (1) Node built-ins, (2) external packages, (3) `@repo/` aliases, (4) relative imports, (5) type imports grouped with their source.

## Edge Cases

- **Tool config files** (`vite.config.ts`, `tailwind.config.ts`, `eslint.config.js`) require a default export — `import/no-default-export` is turned off for these.
- **WIP packages** must follow naming rules from the start.
