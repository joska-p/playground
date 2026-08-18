---
title: State
description: Data fetching, state initialization, and Zustand store conventions.
tags:
    - conventions
    - reference
---

# State

## Data fetching

- **Do** use TanStack Query for all server/async data.
- **Don't** fetch inside Zustand actions or `useEffect`.
- **Don't** mirror server data in Zustand stores — stores hold **client-only** state.

## State initialization

- **Do** always initialize state with a usable default so components render coherently before async data arrives.

## Zustand stores

- **Do** place store files in `stores/[domain]/`.
- **Do** use `useState` for single-component UI state. Promote to Zustand only when consumed by multiple unrelated components.
- **Don't** name the raw store with a public-facing prefix — use `camelCase[Domain]Store`, never imported in components.

### Async orchestration

- **Do** write async logic in `actions.ts` as plain async functions using `getState()`/`setState()`.
- **Don't** use thunk middleware.

```ts
// ✅ Good — actions.ts
export async function fetchAndSetNodes() {
    const { filters } = nodesStore.getState();
    const data = await fetchNodes(filters);
    nodesStore.setState({ nodes: data });
}

// ❌ Bad — thunk middleware
const useNodesStore = create((set, get) => ({
    nodes: [],
    fetchNodes: async () => {
        const data = await fetchNodes(get().filters);
        set({ nodes: data });
    },
}));
```

- **Don't** let an action in one domain read from another domain's store — merge those domains instead.
- **Do** split a store into multiple domains if they are truly independent.

### Splitting a growing store (guideline)

A single-file store is fine until it's actually hard to scan. Split progressively, only as far as needed:

1. **First split**: `store.ts` (the `create()` call + raw store export, internal only), `actions.ts` (mutators + async orchestration), `selectors.ts` (getter hooks). Three flat files — no subdirectories.
2. **If `actions.ts` or `selectors.ts` gets complicated**: split into its own subdirectory (`actions/`, `selectors/`), either one file per function or grouped by related concern.
3. **`types.ts`** — store-specific types, split off whenever more than a couple of lines.

- **Don't** create `actions/` and `selectors/` directories up front for a store that doesn't need them yet.
- **Don't** split on line count alone — split when the file is hard to scan.
