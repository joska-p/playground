---
title: 'Codebase Conventions'
description: 'Architecture, naming, and coding patterns used across the project.'
category: 'explanation'
tags:
  - explanation
---

# Project Conventions

Write code that reads like a sentence. Prefer clarity over brevity, but cut every unnecessary word.

## Architecture

Three-layer unidirectional flow — dependencies point **downward only**:

- **Core Domain Engine** — pure math, utilities, schemas, constants. No React, no store, no side effects.
- **State Orchestration Layer** — Zustand stores. Bridges UI and core. No data fetching.
- **Presentation Layer** — thin orchestrators: read state, dispatch events. No business logic.

## Data Fetching

- TanStack Query for all server/async data. No fetching inside Zustand actions or `useEffect`.
- Zustand stores hold **client-only** state. They do not mirror server data.

## State Initialization

Always initialize state with a usable default so components render coherently before async data arrives.

## Data Validation

Use Zod to validate external data (API responses, user input). Validate at the entry point — not scattered deep in components or store actions.

## Error Handling

- Use `@repo/ui/ErrorBoundary` — don't create one from scratch. Place at every route boundary minimum. Add a feature-level boundary for self-contained widgets. Do not wrap every component.
- Never silently swallow errors (`catch (e) {}`).

## Zustand Stores

- Store files live in `stores/[domain]/`.
- Single-component UI state → `useState`. Promote to Zustand only when consumed by multiple unrelated components.
- Single-file store is acceptable under ~120 lines. Split into a domain directory beyond that:
  - `store.ts` — `create()` + raw store export (internal only)
  - `actions.ts` — all mutators + async orchestration
  - `selectors/` — one file per selector hook, each named after the hook it exports (e.g. `useRows.ts` exports `useRows()`)
  - `types.ts` — store-specific types
- Raw store named `camelCase[Domain]Store` — never imported in components.
- Async orchestration in `actions.ts` as a plain async function using `getState()`/`setState()`. No thunk middleware:
  ```typescript
  // actions.ts
  export async function fetchAndSetNodes() {
    const { filters } = nodesStore.getState();
    const data = await fetchNodes(filters);
    nodesStore.setState({ nodes: data });
  }
  ```
- Domain coupling test: if an action in one domain reads from another domain's store, merge those domains. Conversely, don't hesitate to split a store into multiple domains if they are truly independent.

## Zod Schemas

- Co-located next to the code they validate, `.schema.ts` suffix.
- Use `z.infer<typeof schema>` as the TypeScript type. Do not write parallel hand-maintained types.

## UI Components — CSS Tokens

- All components in `packages/ui` must use project CSS tokens. No hardcoded colors, spacing, or radius values.
- Use Tailwind utility classes that map to tokens — never raw CSS variables in JSX.
- When adding a new design decision, define a token first.
- Prefer Tailwind scale values over arbitrary ones (`text-xs` over `text-[11px]`). If you reach for an arbitrary value, ask yourself if a token is missing first.

## UI Components — Responsive Layout

## Layout: Grid > Flexbox

**Default Choice:** Use CSS Grid (Tailwind: `grid`, `grid-cols-*`, etc.) for all layout structures.
**Rationale:** Grid provides explicit control over both axes, better gap handling, and simpler responsive design.

**Exceptions:** Use Flexbox (`flex`, `justify-*`, `items-*`) for:

- Single-axis alignment (e.g., navbars, button groups).
- Dynamic or wrapping content (e.g., tag lists).

Prefer **intrinsic layout** over breakpoint-driven layout for typography. Let content reflow based on available space — not a fixed viewport width.

- Use `repeat(auto-fit, minmax(..., 1fr))` for grids that reflow naturally. Use `auto-fill` when empty tracks should be preserved (e.g. to maintain grid alignment), `auto-fit` when they should collapse.
- Use `clamp()` for fluid typography and spacing instead of overriding values at breakpoints.
- If a value is reused, define it as a token in `@theme` rather than repeating the arbitrary value:

  ```css
  @theme {
    --text-fluid-base: clamp(1rem, 2.5vw, 1.5rem);
    --grid-cols-cards: repeat(auto-fit, minmax(200px, 1fr));
  }
  ```

- In JSX, use Tailwind's arbitrary value syntax to keep intrinsic layout out of `style`:

  ```tsx
  // ✅ Intrinsic grid — reflows without breakpoints
  <div className="grid grid-cols-[repeat(auto-fit,minmax(200px,1fr))] gap-4" />

  // ✅ Fluid type with clamp
  <p className="text-[clamp(1rem,2.5vw,1.5rem)]" />

  // ❌ Breakpoint-switching column counts
  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3" />
  ```

- Breakpoints (`sm:`, `md:`, `lg:`) are a last resort — only when the layout genuinely cannot adapt intrinsically. If you're writing a responsive prefix to change a column count or font size, ask whether `minmax()` or `clamp()` solves it first.

## Dynamic Tailwind Colors

Use CSS variables set via `style` + Tailwind's CSS variable shorthand to apply dynamic colors:

```tsx
// ✅ Tailwind v4
<div
  style={{ '--color-primary': dynamicValue }}
  className="text-(--color-primary)"
/>

// ❌
<div style={{ color: dynamicValue }} />
```

See `apps/playground/src/content/docs/explanation/dynamic-tailwind.md` for the full explanation.

## Documentation

- Each package's `README.md` is the source of truth for its docs.
- After updating a package README, sync to the Astro docs site:
  ```bash
  pnpm --filter @repo/playground sync-package-docs
  ```

## Imports & Exports

- Public API is declared in `package.json` `exports` — one subpath per public symbol, no root barrel.
- No barrel files (`index.ts`).
- Named exports only — no `export default`.
- No wildcard re-exports (`export * from`). List identifiers explicitly.
- Filename must match the primary exported identifier exactly.
- Use `export type { ... }` for type-only exports.
- Consumers import via subpath: `import { Button } from "@repo/ui/Button"`.
- In **bundle mode** (Vite, webpack, etc.), file extensions are not required in import paths. Omit `.ts` / `.tsx` extensions when the bundler resolves them automatically.

## Performance

- High-frequency inputs (resize, mouse, scroll): throttle or debounce before layout calculations.
- Use deterministic keys derived from data — no random keys.
