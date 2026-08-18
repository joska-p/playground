---
title: Errors
description: Error handling with the shared ErrorBoundary and patterns for absence.
tags:
    - conventions
    - reference
---

# Errors

## ErrorBoundary

- **Do** use `@repo/ui/ErrorBoundary` — don't create one from scratch.
- **Do** place at every route boundary minimum. Add a feature-level boundary for self-contained widgets.
- **Don't** wrap every component.
- **Don't** silently swallow errors (`catch (e) {}`).

## Handling absence

Three patterns cover most cases. Pick by situation:

### Discriminated union (`Result<T>`)

When a function can fail in a way the caller genuinely needs to branch on:

```ts
type Success<T> = { success: true; data: T };
type Failure = { success: false; error: string };
type Result<T> = Success<T> | Failure;

function fetchConfig(id: string): Result<{ theme: string; zoom: number }> {
    if (!id) return { success: false, error: 'Missing ID' };
    return { success: true, data: { theme: 'gruvbox', zoom: 1 } };
}
```

TypeScript won't let you touch `data` until you've checked `success`. Use when the failure case needs a distinct message or handling — not for every function that could theoretically return nothing.

### `??` at the call site

When a lookup can reasonably come back empty and a fallback value is genuinely fine:

```ts
const findNode = (nodes: NodeElement[], id: string) => nodes.find((n) => n.id === id);

const activeNode = findNode(allNodes, 'canvas-root') ?? { id: 'fallback', x: 0, y: 0 };
```

- **Do** keep the function itself honest about returning `undefined`.
- **Do** resolve the fallback where the caller has enough context — not inside the utility.

### Invariant / assert-and-throw

When the value's absence isn't a normal state to branch on, it's a bug:

```ts
function assertExists<T>(value: T | null | undefined, message = 'Value must exist'): T {
    if (value === null || value === undefined) throw new Error(message);
    return value;
}

const canvas = assertExists(document.getElementById('canvas'), 'Canvas element missing from DOM');
```

### Don't confuse with state initialization

Giving a store or component a sensible _initial_ value so the UI renders before async data arrives is different from a function silently substituting a fake value to dodge returning `null`. The first is expected and documented; the second is the "no silent defaults" case these patterns exist to avoid.
