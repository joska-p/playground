---
title: "Toolbox"
description: "Reusable patterns and utilities: a generic Web Worker hook, Zustand + Zod state management demo, and reference patterns."
category: "reference"
tags:
  - reference
  - toolbox
order: 20
---

# @repo/toolbox

> Reusable patterns and utilities: a generic Web Worker hook, Zustand + Zod state management demo, and reference patterns.

## Quick Start

```bash
pnpm add @repo/toolbox
```

```tsx
import { useWebWorker } from "@repo/toolbox/hooks/useWebWorker";

function Fib() {
  const { result, loading, run } = useWebWorker((n: number) => {
    // Runs in a Web Worker — no blocking
    const fib = (x: number): number => x <= 1 ? x : fib(x - 1) + fib(x - 2);
    return fib(n);
  });

  return (
    <div>
      <button onClick={() => run(40)}>Compute</button>
      {loading && <span>Working…</span>}
      {result !== null && <span>Result: {result}</span>}
    </div>
  );
}
```

## useWebWorker Hook

Converts any pure function into a Web Worker by stringifying it:

```typescript
function useWebWorker<TInput, TOutput>(
  workerFunction: (input: TInput) => TOutput
): {
  result: TOutput | null;
  loading: boolean;
  error: string | null;
  run: (input: TInput) => void;
}
```

- Creates a Blob URL from the function body
- Terminates any in-flight worker before starting a new one
- Cleans up the Blob URL on completion
- Ideal for computationally expensive operations (search, filtering, math)

## Demo Component

A reference implementation showcasing Zustand + Zod validation:

```tsx
import { Demo } from "@repo/toolbox/Demo";
```

Validates input (1–100 characters) with Zod before committing to a Zustand store.
Displays submission count, last message, and history with reset functionality.

### State Management Pattern

```typescript
// demoStore.ts — singleton Zustand store
const count = useDemoCount();
const submissions = useDemoSubmissions();
addDemoSubmission(text);    // increments count, appends with timestamp
resetDemo();                // clears all state
```

### Validation Schema

```typescript
const demoSchema = z.object({
  text: z.string()
    .min(1, "Message is required")
    .max(100, "Message must be 100 characters or fewer"),
});
```

## Exports

| Export | Path | Description |
|---|---|---|
| `useWebWorker` | `@repo/toolbox/hooks/useWebWorker` | Generic Web Worker hook |
| `Demo` | `@repo/toolbox/Demo` | Zustand + Zod demo component |
| `./styles` | `@repo/toolbox/styles` | Component CSS |

## Patterns

- **Worker-as-function** — no separate worker file needed. Function is serialized into a Worker at runtime.
- **Zustand + Zod** — validate before committing to state. Clean separation of validation and state management.
- **Singleton store** — store created at module scope with standalone selector/action functions.
- **Cancellation** — previous worker terminated before new one starts (safe for search-as-you-type).

---

_Part of [Creative Playground](https://playground-beryl-omega.vercel.app)_

