# Project Conventions

> **Agent use:** rules only — no rationale, no examples. For worked examples and reasoning, see the [Codebase Conventions](https://playground-beryl-omega.vercel.app/docs/explanation/conventions/) docs page.

Stack: `Turborepo` · `Vite` · `React` · `Astro` · `TypeScript` · `Tailwind` · `Zustand` · `Zod` · `TanStack Query` · `Storybook` · `Vitest`

## Architecture

Three-layer unidirectional flow — dependencies point **downward only**:

- **Core Domain Engine** — pure math, utilities, schemas, constants. No React, no store, no side effects.
- **State Orchestration Layer** — Zustand stores. Bridges UI and core. No data fetching (use TanStack Query instead).
- **Presentation Layer** — thin orchestrators: read state, dispatch events. No business logic.

## Data fetching

- **TanStack Query** for all server/async data. No fetching inside Zustand actions or `useEffect`.
- Query keys are co-located with their query function, not scattered across components.
- Zustand stores hold **client-only** state (UI state, selections, ephemeral data). They do not mirror server data.

## Data Hydration & Validation

- **Never block initial UI paint on network.** Provide a local fallback state immediately.
- **All external payloads** must pass through Zod validation at the network boundary before entering stores.

## Error handling

- **Prefer safe defaults over throwing.** Return a fallback value when a missing value is recoverable.
- **React Error Boundaries** catch unexpected render errors. Place boundaries at meaningful subtree roots, not wrapping every component.
- Only throw when the error is truly unrecoverable and the subtree must be replaced.
- Never silently swallow errors (`catch (e) {}`). Log or surface them.

## Zustand stores

- Store files live in `stores/[domain]/` with exactly 4 files per domain:
  - `store.ts` — `create()` + raw store export (internal only)
  - `actions.ts` — all mutators + async orchestration
  - `selectors.ts` — all read hooks (components only import from here and `actions.ts`)
  - `types.ts` — store-specific types
- The raw store is named `camelCase[Domain]Store` (e.g. `graphStore`, `manipulatorStore`) and exported — but only imported in its own `actions.ts` and `selectors.ts` files, never in components.
- Selector and action names drop the domain prefix (e.g. `useImageSource` not `usePipelineImageSource`). The file path already scopes the domain.
- Actions mutate; selectors read. Don't mix.
- Subscribe to minimal slices. Heavyweight path (structural) → reconciliation. Lightweight path (cosmetic) → direct DOM/style mutations.
- **Local state first.** Single-component UI state (dropdown selection, file name, toggle) → `useState`. Only promote to Zustand when the state is consumed by multiple unrelated components.
- **Async orchestration** (e.g. executing a workflow, calling a pipeline) lives in `actions.ts` as a plain async function using `getState()`/`setState()`. No thunk middleware needed.
- **Domain boundary test:** if an action in one domain reads from another domain's store (e.g. `pipeline/actions` imports `workflow/store`), those domains are coupled — merge them into one domain.

## Zod schemas

- Co-located next to the code they validate. Use `.schema.ts` suffix.
- Runtime validation only — write TS types separately, don't use `z.infer<>` as source of truth.

## UI components — CSS token system

- All components in `packages/ui` must use the project CSS tokens (e.g. `--color-primary`, `--radius-md`). No hardcoded colors, spacing, or radius values.
- Tokens map to Tailwind utility classes via the Tailwind config — always use the utility class, never the raw CSS variable directly in JSX.
- When adding a new design decision (color, spacing, shadow), define a token first, then use it. Never one-off values.

## Tailwind & CSS

- **Default:** Tailwind utility classes for layout, spacing, color, typography.
- **CSS Modules** (`*.module.css`) — only for styles utilities cannot express: complex animations, pseudo-element tricks, deeply scoped third-party overrides.

## Storybook

Stories live in `apps/storybook/stories/` — not co-located with components. Mirror the source package structure:
Import via `@repo/` aliases only. Story files use `[ComponentName].stories.tsx`.

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

## Performance Guardrails

- **High-frequency inputs** (resize, mouse, scroll): throttle or debounce before layout calculations. Isolate runtime calculations from layout thrashing.
- **Stable keys**: virtual lists and rendering loops must use deterministic keys derived from data properties — no random keys that trigger component unmount/remount churn.
- **Action audit**: lifecycle hooks and event managers must not cascade into duplicate calculations or execution loops.

## Edge Cases

- **Tool config files** (`vite.config.ts`, `tailwind.config.ts`, `eslint.config.js`) require a default export by the tool's spec — forced exception. The `import/no-default-export` rule is turned off for these in ESLint.
