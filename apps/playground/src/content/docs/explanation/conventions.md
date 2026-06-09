---
title: 'Codebase Conventions'
description: 'Architecture, naming, and coding patterns used across the project.'
category: 'explanation'
tags:
  - explanation
---

# Project Conventions

Write code that reads like a sentence. Prefer clarity over brevity, but cut every unnecessary word.

> **Agent use:** rules only. For rationale and examples, see the [Codebase Conventions](/apps/playground/src/content/docs/explanation/conventions.md) docs page.

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

- Use `react-error-boundary` — don't create one from scratch. Place at every route boundary minimum. Add a feature-level boundary for self-contained widgets. Do not wrap every component.
- Never silently swallow errors (`catch (e) {}`).

## Zustand Stores

- Store files live in `stores/[domain]/`.
- Single-component UI state → `useState`. Promote to Zustand only when consumed by multiple unrelated components.
- Single-file store is acceptable under ~120 lines. Split into 4 files beyond that:
  - `store.ts` — `create()` + raw store export (internal only)
  - `actions.ts` — all mutators + async orchestration
  - `selectors.ts` — all read hooks
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

## Performance

- High-frequency inputs (resize, mouse, scroll): throttle or debounce before layout calculations.
- Use deterministic keys derived from data — no random keys.
