---
title: 'Sequence Renderer'
description: 'Visualize mathematical sequences — Recamán, Fibonacci, and more.'
category: 'reference'
tags:
  - reference
  - sequence-renderer
order: 20
---

# @repo/sequence-renderer

## Quick Start

```bash
pnpm add @repo/sequence-renderer
```

```tsx
import { SequenceRenderer } from '@repo/sequence-renderer';

export default function MyViz() {
  return <SequenceRenderer />;
}
```

## Core Philosophy

Decouple **generation** from **visualization**:

1. **Rules** — Define sequences via `getNext()` in `src/core/rules.ts`.
2. **Visualizations** — Pluggable drawing functions in `src/core/visualizations/`.
3. **Zustand Store** — State management (`sequenceStore`).

## Available Sequences

| Sequence       | Rule                       | Description           |
| :------------- | :------------------------- | :-------------------- |
| **Recamán**    | Jump back by n if possible | Classic visualization |
| **Fibonacci**  | F(n) = F(n-1) + F(n-2)     | Golden ratio          |
| **Primes**     | Prime numbers only         | Prime visualization   |
| **Triangular** | 1, 3, 6, 10, 15...         | Triangle numbers      |
| **Collatz**    | Even: n/2, Odd: 3n+1       | The 3n+1 problem      |

## Visualization System

Visualizations are pluggable renderers:

```typescript
export const recamanArcs = {
  id: 'recaman-arcs',
  name: 'Recamán Arcs',
  draw: (ctx, sequence, bounds) => {
    // Your drawing magic here
  },
};
```

## State & Actions

```typescript
const sequenceRule = useSequenceRule();
const steps = useSequenceSteps();
const visualizationId = useSequenceVisualizationId();
const sequence = useSequenceSequence();
```

| Action                   | What                 |
| :----------------------- | :------------------- |
| `setSequenceRule(rule)`  | Change sequence type |
| `setSteps(n)`            | Change step count    |
| `setVisualizationId(id)` | Switch visualization |

## Data Flow

`User changes` → `Store updates` → `Sequence recalculates` → `Canvas renders`

## How to Add a New Sequence

1. Define in `src/core/rules.ts` by adding a `SequenceRule` object.
2. Add to the rules array — it will automatically appear in the UI.

## How to Add a New Visualization

### Step 1: Create the visualization

Create a new file in `src/core/visualizations/` (e.g., `my-viz.ts`):

```typescript
import type { Visualization } from './types';

export const myViz: Visualization = {
  id: 'my-viz',
  name: 'My Awesome Visualization',
  draw: (ctx, sequence, bounds) => {
    const { width, height } = bounds;
    ctx.beginPath();
    ctx.arc(width / 2, height / 2, 50, 0, Math.PI * 2);
    ctx.fill();
  },
};
```

### Step 2: Register it

Import and add your visualization to the registry in `src/core/visualizations/index.ts`:

```typescript
import { myViz } from './my-viz';

export const visualizations: Visualization[] = [
  myViz,
  // ...others
];
```

### Step 3: Drawing API

- `ctx`: `CanvasRenderingContext2D`
- `sequence`: `number[]`
- `bounds`: `{ width: number, height: number }`

#### Common patterns

- **Lines**: `ctx.beginPath(); ctx.moveTo(x1, y1); ctx.lineTo(x2, y2); ctx.stroke();`
- **Circles**: `ctx.beginPath(); ctx.arc(x, y, radius, 0, Math.PI * 2); ctx.fill();`

---

_Part of @repo/playground_
