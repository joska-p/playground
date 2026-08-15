---
name: stores
description: Use when writing or editing Zustand stores, store actions, state slices, or getter selectors.
---

# Stores (the Bridge)

Source: `apps/playground/src/content/docs/conventions/07-zustand-stores.md` and `03-data-fetching.md`.
Holds client-only state — never mirrors server data.

- Single-component state → `useState`. Promote to Zustand only when more than one unrelated component reads it.
- Raw store: `camelCase[Domain]Store`. Never imported by components; the `create()` call is never exported.
- **Getter hooks** select a single slice: `store((s) => s.x)`. One hook per slice, fine-grained to avoid cascade re-renders.
- **Setters** are plain functions (no `use` prefix) reading/writing via `getState()`/`setState()` — clamp/derive there. No thunk middleware.
- **Async orchestration** lives in `actions.ts` as a plain async function — read `getState()` *before* `await`.
- No fetching inside store actions — server data goes through TanStack Query.

## Splitting (guideline — don't over-split)

- A single-file store is fine until it's actually hard to scan. Big files are OK when the store stays simple — don't split on line count alone.
- When it does get hard to scan, split progressively, only as far as needed:
  1. `store.ts` (the `create()` call, internal) + `actions.ts` + `selectors.ts` + `types.ts` once more than a couple of lines.
  2. Only if `actions.ts`/`selectors.ts` itself gets complicated: split *that* file into its own subdirectory — one file per exported function (e.g. `useRows.ts` → `useRows()`), or grouped by concern.
- Don't create `actions/` / `selectors/` directories up front.
- Coupling test: an action reading another domain's store → merge the domains. Truly independent domains → split.
