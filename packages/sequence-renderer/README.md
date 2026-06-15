# @repo/sequence-renderer

> Visualize mathematical sequences — Recamán, Fibonacci, and more.

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

1. **Rules** — Define sequences via `getNext()` in `src/core/rules/`.
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
import type { Visualization } from './types';

export const recamanArcs: Visualization = {
  id: 'recaman-arcs',
  name: 'Recamán Arcs',
  draw: ({ canvas, sequence }) => {
    // Your drawing magic here
  }
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

1. Define a rule file in `src/core/rules/` (e.g., `myRule.ts`) using the `SequenceRule` type.
2. Register the rule in `src/core/rules/registry.ts` inside the `rules` map.

## How to Add a New Visualization

### Step 1: Create the visualization

Create a new file in `src/core/visualizations/` (e.g., `myViz.ts`):

```typescript
import type { Visualization } from './types';

export const myViz: Visualization = {
  id: 'my-viz',
  name: 'My Awesome Visualization',
  draw: ({ canvas, sequence }) => {
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    const { width, height } = canvas;
    ctx.beginPath();
    ctx.arc(width / 2, height / 2, 50, 0, Math.PI * 2);
    ctx.fill();
  }
};
```

### Step 2: Register it

Import and register your visualization in the map in `src/core/visualizations/registry.ts`:

```typescript
import { myViz } from './myViz';

// Inside the Map constructor in registry.ts:
const visualizations = new Map<string, Visualization>([
  [recamanArcs.id, recamanArcs],
  [factorWave.id, factorWave],
  [myViz.id, myViz]
]);
```

### Step 3: Drawing API

The `draw` function receives a single options object:

- `canvas`: `HTMLCanvasElement`
- `sequence`: `number[]`

#### Common patterns

- **Get 2D context**: `const ctx = canvas.getContext('2d');`
- **Resize canvas**:
  ```typescript
  if (!canvas.parentElement) return;
  canvas.width = canvas.parentElement.clientWidth;
  canvas.height = canvas.parentElement.clientHeight;
  ```
- **Clear canvas**: `ctx.clearRect(0, 0, canvas.width, canvas.height);`
- **Lines**: `ctx.beginPath(); ctx.moveTo(x1, y1); ctx.lineTo(x2, y2); ctx.stroke();`
- **Circles**: `ctx.beginPath(); ctx.arc(x, y, radius, 0, Math.PI * 2); ctx.fill();`

---

_Part of @repo/playground_
