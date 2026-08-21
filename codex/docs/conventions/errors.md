---
title: Errors
description: Error handling with the shared ErrorBoundary and patterns for absence.
tags:
    - conventions
    - reference
---

# Errors

## ErrorBoundary

`@repo/ui/ErrorBoundary` is the shared boundary component. Every route carries one at minimum; a self-contained widget adds a feature-level boundary of its own. Boundaries mark route and widget edges, and caught errors receive handling: a fallback renders, a reporter fires, or the error propagates upward.

## Handling absence

Three patterns cover absence, each matched to its situation:

### Discriminated union (`Result<T>`)

A function whose failure mode matters to the caller returns a `Result`:

```ts
type Success<T> = { success: true; data: T };
type Failure = { success: false; error: string };
type Result<T> = Success<T> | Failure;

function fetchConfig(id: string): Result<{ theme: string; zoom: number }> {
    if (!id) return { success: false, error: 'Missing ID' };
    return { success: true, data: { theme: 'gruvbox', zoom: 1 } };
}
```

TypeScript gates access to `data` behind the `success` check. This pattern fits failures carrying a distinct message or branch; simple lookups travel lighter.

### `??` at the call site

A lookup that may reasonably come back empty pairs with a fallback at the call site:

```ts
const findNode = (nodes: NodeElement[], id: string) => nodes.find((n) => n.id === id);

const activeNode = findNode(allNodes, 'canvas-root') ?? { id: 'fallback', x: 0, y: 0 };
```

The function stays honest about returning `undefined`; the caller resolves the fallback where the context lives.

### Invariant / assert-and-throw

An absence that signals a bug throws:

```ts
function assertExists<T>(value: T | null | undefined, message = 'Value must exist'): T {
    if (value === null || value === undefined) throw new Error(message);
    return value;
}

const canvas = assertExists(document.getElementById('canvas'), 'Canvas element missing from DOM');
```

### Initial values are a different concern

A store or component starts on a sensible initial value so the UI renders before async data arrives. That starting value is documented, expected state. A function reports what it finds; absence travels to the caller, where the context resolves it.
