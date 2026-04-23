# Sequence Renderer

> Visualizing math sequences—one arc at a time.

---

## 🏗️ Core Philosophy

Decouple **generation** from **visualization**:

1. **Rules** — Define sequences via `getNext()` function
2. **Visualizations** — Pluggable drawing functions
3. **Zustand Store** — State management

## 🧮 Available Sequences

| Sequence | Rule | Description |
|----------|------|-------------|
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

### Register

In `src/core/visualizations/index.ts`:

```typescript
export const visualizations: Visualization[] = [recamanArcs, myViz];
```

## 💾 State

```typescript
const { sequenceRule, steps, visualizationId, sequence } = useSequenceStore();
```

### Actions

| Action | What |
|--------|------|
| `setSequenceRule(rule)` | Change sequence type |
| `setSteps(n)` | Change step count |
| `setVisualizationId(id)` | Switch visualization |

## 🔄 Data Flow

```
User changes → Store updates → Sequence recalculates → Canvas renders
```

## ➕ Add a New Sequence

1. Define in `src/core/rules.ts`:

```typescript
export const myRule: SequenceRule = {
  name: "My Sequence",
  id: "my-sequence",
  maxSteps: 100,
  getNext: ({ index, current, sequence, seen }) => {
    // Your logic here
  },
};
```

2. Add to the rules array—automatically appears in UI!

## ➕ Add a New Visualization

See [how-to/adding-visualizations](../how-to/adding-visualizations.md).

---

## 📂 File Structure

```
src/
├── core/
│   ├── rules.ts           # Sequence definitions
│   ├── generator.ts     # Generation logic
│   └── visualizations/ # Drawing functions
├── components/
│   ├── controls/       # UI
│   └── renderers/    # CanvasRenderer
└── store/
    └── useSequenceStore.tsx
```

---

## 📚 Learn More

| Topic | Where |
|-------|-------|
| Add visualizations | [how-to/adding-visualizations](./adding-visualizations.md) |
| Architecture | [explanation/architecture](./architecture.md) |