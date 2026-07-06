---
title: 'Zustand Stores'
description: 'Store structure, naming, async orchestration, and when/how to split a growing store.'
category: 'conventions'
tags:
  - reference
---

# Zustand Stores

## Contents

- [Rule](#rule)
- [Splitting a growing store (guideline)](#splitting-a-growing-store-guideline)

## Rule

**Rule**, with one **guideline** threshold noted below.

- Store files live in `stores/[domain]/`.
- Single-component UI state → `useState`. Promote to Zustand only when consumed by multiple unrelated components.
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

## Splitting a growing store (guideline)

**Guideline** — single-file store is fine under ~120 lines. Past that,
split progressively, only as far as actually needed:

- **First split**: `store.ts` (the `create()` call + raw store export,
  internal only), `actions.ts` (mutators + async orchestration),
  `selectors.ts` (getter hooks). Three flat files — no subdirectories yet.
- **If `actions.ts` or `selectors.ts` itself gets complicated or too
  big**: split _that_ file into its own subdirectory (`actions/`,
  `selectors/`), either one file per function — named after what it
  exports, e.g. `useRows.ts` exports `useRows()` — or grouped by related
  concern if that reads better than one-file-per-function (e.g.
  `actions/grid.ts` holding every grid-related mutator together).
- `types.ts` — store-specific types, split off whenever it's more than a
  couple of lines.

The 120-line number and "complicated or too big" are both judgment calls,
not build-time checks — split earlier if a file is already hard to scan,
or later if it's still simple past the threshold. The point is: don't
create `actions/` and `selectors/` directories up front for a store that
doesn't need them yet.
