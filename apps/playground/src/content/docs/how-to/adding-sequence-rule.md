---
title: 'Adding a Sequence Rule'
description: 'Add a new math rule to the Sequence Renderer engine.'
category: 'how-to'
tags:
  - how-to
---

# Adding a Sequence Rule

Rules define _what numbers to generate_. Visualizations define _how to draw them_. This guide shows how to add a new rule.

---

## The Rule Interface

```typescript
type NextStepOptions = {
  index: number;
  current: number;
  sequence: number[];
  seen: Set<number>;
};

type SequenceRule = {
  name: string;
  id: string;
  description: string;
  maxSteps: number;
  getNext: (options: NextStepOptions) => number;
};
```

`NextStepOptions` gives you:

| Param      | Type          | Meaning                            |
| ---------- | ------------- | ---------------------------------- |
| `index`    | `number`      | Current step number (starts at 0)  |
| `current`  | `number`      | The previous value in the sequence |
| `sequence` | `number[]`    | The full sequence generated so far |
| `seen`     | `Set<number>` | All unique values generated so far |

---

## Step 1: Define the Rule

Create a new file `packages/sequence-renderer/src/core/rules/myRule.ts`:

```typescript
import type { SequenceRule } from './types';

export const myRule: SequenceRule = {
  name: 'My Rule',
  id: 'my-rule',
  description: 'What it does.',
  maxSteps: 100,
  getNext: ({ index, current, seen }) => {
    // Your math here
    return current + index;
  }
};
```

Example — Recamán's Rule:

```typescript
getNext: ({ index, current, seen }) => {
  const backward = current - index;
  return backward > 0 && !seen.has(backward) ? backward : current + index;
};
```

---

## Step 2: Register the Rule

In `packages/sequence-renderer/src/core/rules/registry.ts`, import your rule and register it in the map:

```typescript
import { myRule } from './myRule';

// Inside the Map constructor in registry.ts:
const rules = new Map<string, SequenceRule>([
  [recamanRule.id, recamanRule],
  [fibonacciRule.id, fibonacciRule],
  [primesRule.id, primesRule],
  [triangularRule.id, triangularRule],
  [collatzRule.id, collatzRule],
  [myRule.id, myRule]
]);
```

---

## Step 3: Test It

```bash
pnpm --filter @repo/sequence-renderer build
pnpm --filter @repo/playground dev
```

Visit `http://localhost:4321/projects/generative/sequences/` and select your new rule from the dropdown.

---

## Checklist

- [ ] Rule has a unique `id`
- [ ] `maxSteps` is reasonable (avoid infinite loops)
- [ ] `getNext` handles edge cases
- [ ] Rule appears in the UI dropdown
