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

## 🧮 Available Sequences

| Sequence | Description |
|----------|-------------|
| **Recamán** | Jump back if possible |
| **Fibonacci** | The golden ratio |
| **Primes** | Prime numbers |
| **Triangular** | 1, 3, 6, 10... |
| **Collatz** | The 3n+1 problem |

## 🎨 Available Visualizations

| Visual | Style |
|--------|-------|
| Recamán Arcs | Curved arcs |
| Bar Chart | Vertical bars |
| Dot Plot | Points |

## 🧩 Store Exports

```tsx
import { 
  useSequenceStore,
  setSequenceRule,
  setSteps,
  setVisualizationId 
} from "@repo/sequence-renderer";
```

---

## 📖 Learn More

| Topic | Link |
|-------|------|
| Deep Dive | [docs/explanation/sequence-renderer.md](../../docs/explanation/sequence-renderer.md) |
| Add Viz | [docs/how-to/adding-visualizations.md](../../docs/how-to/adding-visualizations.md) |
| Architecture | [docs/explanation/architecture.md](../../docs/explanation/architecture.md) |

---

*Part of @repo/playground*