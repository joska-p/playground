---
title: TypeScript Style
description: type over interface, and three patterns for handling absence.
tags:
  - conventions
  - reference
---

# TypeScript Style

## Contents

- [Rule](#rule)
- [Handling absence — three patterns, pick by situation](#handling-absence--three-patterns-pick-by-situation)

## Rule

**Rule** — `type` over `interface`. This is enforced by ESLint
(`@typescript-eslint/consistent-type-definitions`) repo-wide, not just a
style preference: `type` avoids interface declaration merging and
composes more predictably with unions/intersections. Use an intersection
(`&`) anywhere you'd have reached for `extends`. A package can override
this in its own ESLint config if it has a real reason to — that happens
occasionally — but the default, and what you should reach for first, is
`type`.

## Handling absence — three patterns, pick by situation

TypeScript's `null`/`undefined` handling is a common source of clutter —
`if (!x) return` scattered everywhere, or silent fallback values that mask
real bugs. Three patterns cover most cases; none of them is "the" answer,
each fits a different shape of problem.

**Discriminated union (`Result<T>`)** — when a function can fail in a way
the caller genuinely needs to branch on:

```ts
type Success<T> = { success: true; data: T };
type Failure = { success: false; error: string };
type Result<T> = Success<T> | Failure;

function fetchConfig(id: string): Result<{ theme: string; zoom: number }> {
  if (!id) return { success: false, error: 'Missing ID' };
  return { success: true, data: { theme: 'gruvbox', zoom: 1 } };
}
```

TypeScript won't let you touch `data` until you've checked `success`,
narrowing automatically inside the branch. _Cost_: more ceremony than a
plain return — worth it when the failure case needs a distinct message or
handling, not for every function that could theoretically return nothing.

**`??` at the call site** — when a lookup can reasonably come back empty
and a fallback value is genuinely fine:

```ts
const findNode = (nodes: NodeElement[], id: string) => nodes.find((n) => n.id === id);

const activeNode = findNode(allNodes, 'canvas-root') ?? { id: 'fallback', x: 0, y: 0 };
```

Keep the function itself honest about returning `undefined` — resolve it
where the caller has enough context to pick a sensible fallback, not
inside the utility.

**Invariant / assert-and-throw** — when the value's absence isn't a
normal state to branch on, it's a bug:

```ts
function assertExists<T>(value: T | null | undefined, message = 'Value must exist'): T {
  if (value === null || value === undefined) throw new Error(message);
  return value;
}

const canvas = assertExists(document.getElementById('canvas'), 'Canvas element missing from DOM');
```

This is the sharp end of the existing [Error Handling](./06-error-handling.md) rule
("never silently swallow errors") applied to absence specifically — throw
loudly instead of writing a defensive `if` that quietly limps past a state
that should never happen.

**This doesn't conflict with [State Initialization](./04-state-initialization.md) above.** Giving a store
or component a sensible _initial_ value so the UI renders before async
data arrives is a different situation from a function silently
substituting a fake value to dodge returning `null`. The first is expected
and documented; the second is the "no silent defaults" case these patterns
exist to avoid. If you're not sure which situation you're in: an initial
value you _chose on purpose_ and documented is fine; a fallback that
exists only to avoid handling `null`/`undefined` at all is the smell.
