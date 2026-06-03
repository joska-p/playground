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

## Data fetching

- **TanStack Query** for all server/async data. No fetching inside Zustand actions or `useEffect`.
- Query keys are co-located with their query function, not scattered across components.
- Zustand stores hold **client-only** state (UI state, selections, ephemeral data). They do not mirror server data.

## Data Hydration & Validation

- **Never block initial UI paint on network.** Provide a local fallback state immediately.
- **All external payloads** must pass through Zod validation at the network boundary before entering stores.
- **Validated payloads** committed to persistent storage must carry a version flag and TTL.
- **When permuting data model attributes**, preserve insertion-order key structure — only values may change.

## Error handling

- **Prefer safe defaults over throwing.** Return a fallback value when a missing value is recoverable.
- **React Error Boundaries** catch unexpected render errors. Place boundaries at meaningful subtree roots, not wrapping every component.
- Only throw when the error is truly unrecoverable and the subtree must be replaced.
- Never silently swallow errors (`catch (e) {}`). Log or surface them.

## Zustand stores

- Store files live in `stores/[domain]/` alongside its associated files.
- The store hook is named `use[Domain]Store` and is exported — but only imported in its own `actions.ts` (setters) and `selectors.ts` (getters) files, never in components.
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

## Tailwind & CSS

- **Default:** Tailwind utility classes for layout, spacing, color, typography.
- **CSS Modules** (`*.module.css`) — only for styles utilities cannot express: complex animations, pseudo-element tricks, deeply scoped third-party overrides.
- **Global CSS** — only base resets and CSS custom properties (design tokens) in a single `global.css` per app.
- Do not mix Tailwind and inline `style={{}}` for the same concern.

## Testing — Vitest

- Tests live next to the file they test (`Button.test.tsx` beside `Button.tsx`).
- Test behaviour, not implementation. Don't assert on internal state.
- Pure core functions → unit tests. Components → `vitest-browser-react` (real browser, no jsdom).
- No test should depend on another test's side effects. Each test is fully isolated.
- Prefer `describe` blocks that read like sentences: `describe('Button', () => { it('renders disabled when prop is set') })`.

## Storybook

Stories live in `apps/storybook/stories/` — not co-located with components. Mirror the source package structure:

```
apps/storybook/stories/
  ui/
    Button.stories.tsx        ← mirrors packages/ui/src/Button.tsx
    GraphViz.stories.tsx
```

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

## Layout Computations

Programmatic layout must align with native rendering engines. When calculating child counts to fill a container, account for platform edge cases (e.g. trailing spacing omission) to avoid off-by-one rendering gaps.

## Performance Guardrails

- **High-frequency inputs** (resize, mouse, scroll): throttle or debounce before layout calculations. Isolate runtime calculations from layout thrashing.
- **Stable keys**: virtual lists and rendering loops must use deterministic keys derived from data properties — no random keys that trigger component unmount/remount churn.
- **Action audit**: lifecycle hooks and event managers must not cascade into duplicate calculations or execution loops.

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

Always pair a peer dep with a matching entry in `devDependencies` so the package can build and test locally.

## Edge Cases

- **Tool config files** (`vite.config.ts`, `tailwind.config.ts`, `eslint.config.js`) require a default export by the tool's spec — forced exception. The `import/no-default-export` rule is turned off for these in ESLint.
- **`package.json` `exports` field** is a Node.js resolver directive, not a JavaScript export — the named export rule doesn't apply to it.
- **WIP packages** must follow naming rules from the start. Renames are expensive once things are imported across packages.
