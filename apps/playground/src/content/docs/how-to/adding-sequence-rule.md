---
title: "Adding a Sequence Rule"
description: "Add a new math rule to the Sequence Renderer engine."
tags:
  - how-to
---

# Adding a Sequence Rule

Rules define _what numbers to generate_. Visualizations define _how to draw them_. This guide shows how to add a new rule.

---

## The Rule Interface

```typescript
type SequenceRule = {
  name: string;
  id: string;
  description: string;
  maxSteps: number;
  getNext: (params: NextStepParams) => number;
};
```

`NextStepParams` gives you:

| Param | Type | Meaning |
| --- | --- | --- |
| `index` | `number` | Current step number (starts at 0) |
| `current` | `number` | The previous value in the sequence |
| `seen` | `Set<number>` | All values generated so far |

---

## Step 1: Define the Rule

Edit `packages/sequence-renderer/src/core/rules.ts`:

```typescript
const myRule: SequenceRule = {
  name: "My Rule",
  id: "my-rule",
  description: "What it does.",
  maxSteps: 100,
  getNext: ({ index, current, seen }) => {
    // Your math here
    return current + index;
  },
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

Add it to the `sequencesRule` array in the same file:

```typescript
export const sequencesRule: SequenceRule[] = [
  // ...existing rules
  myRule,
];
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
