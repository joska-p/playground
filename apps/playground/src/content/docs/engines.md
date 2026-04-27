---
title: "Engines"
description: "How the creative engines work — rules, generators, and pluggable systems."
type: "explanation"
---

# Engines

The creative engines follow a simple pattern: **rules generate data, visualizations render it**.

---

## Sequence Renderer

### The Pattern

```
Rule (math) → Sequence → Visualization (draw) → Canvas
```

**Rules** define _what numbers to generate_. **Visualizations** define _how to draw them_. They're independent — mix any rule with any visualization.

### Rules (`src/core/rules.ts`)

A rule is a simple interface:

```typescript
type SequenceRule = {
  name: string;
  id: string;
  description: string;
  maxSteps: number;
  getNext: (params: NextStepParams) => number;
};
```

Example — Recamán's Rule:

```typescript
getNext: ({ index, current, seen }) => {
  const backward = current - index;
  return backward > 0 && !seen.has(backward) ? backward : current + index;
};
```

### Available Rules

| Rule           | ID           | Description                |
| -------------- | ------------ | -------------------------- |
| **Recamán**    | `recaman`    | Jump back by n if possible |
| **Fibonacci**  | `fibonacci`  | F(n) = F(n-1) + F(n-2)     |
| **Primes**     | `primes`     | Prime numbers only         |
| **Triangular** | `triangular` | 1, 3, 6, 10, 15...         |
| **Collatz**    | `collatz`    | Even: n/2, Odd: 3n+1       |

### Adding a Rule

1. Define a new `SequenceRule` object in `rules.ts`
2. Add it to the `sequencesRule` array
3. Done — appears in UI automatically

### Visualizations (`src/core/visualizations/`)

A visualization is a draw function:

```typescript
type Visualization = {
  id: string;
  name: string;
  draw: (canvas, sequence) => void;
};
```

### Adding a Visualization

1. Create `src/core/visualizations/my-viz.ts`
2. Export it in `src/core/visualizations/index.ts`
3. Appears in UI automatically

---

## Shared Patterns

### State Management

Engines use **Zustand** for state:

```typescript
const { value, setValue } = useStore();
```

### Pluggable Architecture

Add new rules or visualizations by:

1. Defining the data structure
2. Adding to the registry array
3. UI updates automatically

This keeps the engine core stable while experiments evolve freely.
