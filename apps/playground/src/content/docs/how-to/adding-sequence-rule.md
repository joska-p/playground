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

## Rule Type

```typescript
type NextStepOptions = {
  index: number;
  current: number;
  sequence: number[];
  seen: Set<number>;
};
```

`NextStepOptions` gives you:

| Param      | Type          | Meaning                            |
| ---------- | ------------- | ---------------------------------- |
| `index`    | `number`      | Current step number (starts at 0)  |
| `current`  | `number`      | The previous value in the sequence |
| `sequence` | `number[]`    | The full sequence generated so far |
| `seen`     | `Set<number>` | All unique values generated so far |

Rules are created with `createRule()` which validates the config and returns
a frozen `SequenceRule` object.

---

## Step 1: Define the Rule

Create `packages/sequence-renderer/src/core/rules/myRule.ts`:

```typescript
import { createRule } from './create-rule';

export const myRule = createRule({
  name: 'My Rule',
  id: 'my-rule',
  description: 'What it does.',
  maxSteps: 100,
  getNext: ({ index, current, seen }) => {
    // Your math here
    return current + index;
  }
});
```

Example — Recamán's Rule:

```typescript
getNext: ({ index, current, seen }) => {
  const backward = current - index;
  return backward > 0 && !seen.has(backward) ? backward : current + index;
};
```

`createRule` validates that `id`, `name`, and `getNext` are present and
that `maxSteps >= 2`. It returns an immutable frozen object.

---

## Step 2: Register the Rule

In `packages/sequence-renderer/src/core/rules/registry.ts`, import your rule
and add it to the `rules` Map:

```typescript
import { myRule } from './myRule';

const rules = new Map<string, SequenceRule>([
  [recamanRule.id, recamanRule],
  [fibonacciRule.id, fibonacciRule],
  [primesRule.id, primesRule],
  [triangularRule.id, triangularRule],
  [collatzRule.id, collatzRule],
  [myRule.id, myRule]
]);
```

The rule appears in the UI dropdown automatically — no extra wiring.

---

## Step 3: Test It

```bash
pnpm --filter @repo/sequence-renderer build
pnpm --filter @repo/playground dev
```

Visit `http://localhost:4321/projects/generative/sequences/` and select your
new rule from the dropdown.

---

## Checklist

- [ ] Rule has a unique `id`
- [ ] `maxSteps` is reasonable (avoid infinite loops)
- [ ] `getNext` handles edge cases
- [ ] Rule appears in the UI dropdown
