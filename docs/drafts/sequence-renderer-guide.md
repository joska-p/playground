# Sequence Renderer Architecture Guide

This document explains the architecture of the `@repo/sequence-renderer` package, which provides visualizations for mathematical sequences like Recamán's Sequence using Canvas rendering.

---

## 🏗️ Core Philosophy

The Sequence Renderer decouples **sequence generation** from **visualization**.

- **Rules**: Define sequences via `getNext(index, current, sequence, seen)` function
- **Visualization**: Pluggable drawing functions in `src/core/visualizations/`
- **Store**: Zustand store for state management

---

## 🗄️ State Management

The store is in `src/store/useSequenceStore.tsx`:

```typescript
const { sequenceRule, steps, visualizationId, sequence } = useSequenceStore();
```

Actions are atomic - each updates the state and recomputes derived values in a single transaction.

---

## 🎨 Visualization System

Visualizations are pluggable renderers in `src/core/visualizations/`:

```typescript
// src/core/visualizations/recaman-arcs.ts
export const recamanArcs = {
  id: "recaman-arcs",
  name: "Recamán Arcs",
  draw: (canvas, sequence) => { /* ... */ },
};
```

Register in `src/core/visualizations/index.ts`:

```typescript
export const visualizations: Visualization[] = [recamanArcs];
```

### Adding a New Visualization

1. Create `src/core/visualizations/my-visualization.ts`
2. Export `{ id, name, draw }`
3. Add to `index.ts` registry

---

## 🔄 Data Flow

1. **User Action**: Changes rule, steps, or visualization via UI
2. **Store Action**: Updates state atomically, recomputes sequence
3. **CanvasRenderer**: Calls `visualization.draw(canvas, sequence)` 

---

## 📁 File Structure

```
src/
├── core/
│   ├── rules.ts          # Sequence definitions
│   ├── generator.ts     # Sequence generation
│   └── visualizations/ # Drawing functions
├── components/
│   ├── controls/        # UI controls
│   ├── renderers/       # CanvasRenderer
│   └── sequence-display/
├── store/
│   └── useSequenceStore.tsx
└── utils/
    └── math.ts
```

---

## 🚀 Adding a New Sequence

1. Define the rule in `src/core/rules.ts`:

```typescript
export const myRule: SequenceRule = {
  name: "My Sequence",
  id: "my-sequence",
  description: "...",
  maxSteps: 100,
  getNext: ({ index, current, sequence, seen }) => { /* ... */ },
};
```

2. Add to `sequencesRule` array - it automatically appears in the UI dropdown.

---

## 🧮 Supported Sequences

- **Recamán**: Jump back by `n` if possible, else forward
- **Fibonacci**: F(n) = F(n-1) + F(n-2)
- **Primes**: Prime numbers
- **Triangular**: 1, 3, 6, 10, 15...
- **Collatz**: Even: n/2 | Odd: 3n+1