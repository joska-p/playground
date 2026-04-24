# @repo/sequence-renderer

> Visualize mathematical sequences—Recamán, Fibonacci, and more.

---

## 🚀 Quick Start

```bash
pnpm add @repo/sequence-renderer
```

```tsx
import { SequenceRenderer } from "@repo/sequence-renderer";

export default function MyViz() {
  return <SequenceRenderer />;
}
```

## 🏗️ Core Philosophy

Decouple **generation** from **visualization**:

1.  **Rules** — Define sequences via `getNext()` function in `src/core/rules.ts`.
2.  **Visualizations** — Pluggable drawing functions in `src/core/visualizations/`.
3.  **Zustand Store** — State management (`useSequenceStore`).

## 🧮 Available Sequences

| Sequence | Rule | Description |
| :--- | :--- | :--- |
| **Recamán** | Jump back by n if possible | Classic visualization |
| **Fibonacci** | F(n) = F(n-1) + F(n-2) | Golden ratio |
| **Primes** | Prime numbers only | Prime visualization |
| **Triangular** | 1, 3, 6, 10, 15... | Triangle numbers |
| **Collatz** | Even: n/2, Odd: 3n+1 | The 3n+1 problem |

## 🎨 Visualization System

Visualizations are pluggable renderers:

```typescript
// recaman-arcs.ts
export const recamanArcs = {
  id: "recaman-arcs",
  name: "Recamán Arcs",
  draw: (ctx, sequence, bounds) => {
    // Your drawing magic here
  },
};
```

## 💾 State & Actions

```typescript
const { sequenceRule, steps, visualizationId, sequence } = useSequenceStore();
```

| Action | What |
| :--- | :--- |
| `setSequenceRule(rule)` | Change sequence type |
| `setSteps(n)` | Change step count |
| `setVisualizationId(id)` | Switch visualization |

## 🔄 Data Flow

`User changes` → `Store updates` → `Sequence recalculates` → `Canvas renders`

---

## ➕ Add a New Sequence

1.  Define in `src/core/rules.ts` by adding a `SequenceRule` object.
2.  Add to the rules array—it will automatically appear in UI.

## ➕ Add a New Visualization

1.  Create a new visualization file in `src/core/visualizations/`.
2.  Register it in `src/core/visualizations/index.ts`.

---

_Part of @repo/playground_
