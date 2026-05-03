---
title: "Engines"
description: "How the creative engines work — rules, generators, and pluggable systems."
tags:
  - explanation
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

### Available Rules

| Rule           | ID           | Description                |
| -------------- | ------------ | -------------------------- |
| **Recamán**    | `recaman`    | Jump back by n if possible |
| **Fibonacci**  | `fibonacci`  | F(n) = F(n-1) + F(n-2)     |
| **Primes**     | `primes`     | Prime numbers only         |
| **Triangular** | `triangular` | 1, 3, 6, 10, 15...         |
| **Collatz**    | `collatz`    | Even: n/2, Odd: 3n+1       |

### Available Visualizations

| Visualization    | ID           | Description                         |
| ---------------- | ------------ | ----------------------------------- |
| **Line Graph**   | `line-graph` | Connected points, stock-chart style |
| **Scatter Plot** | `scatter`    | Dots positioned by sequence value   |
| **Bars**         | `bars`       | Vertical bars per sequence step     |

### Data Structures

**Rule interface:**

```typescript
type SequenceRule = {
  name: string;
  id: string;
  description: string;
  maxSteps: number;
  getNext: (params: NextStepParams) => number;
};
```

**Visualization interface:**

```typescript
type Visualization = {
  id: string;
  name: string;
  draw: (canvas, sequence) => void;
};
```

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

---

## Extending

- **Add a rule**: See [Adding a Sequence Rule](/docs/how-to/adding-sequence-rule/)
- **Add a visualization**: See [Adding a Visualization](/docs/how-to/adding-visualization/)
