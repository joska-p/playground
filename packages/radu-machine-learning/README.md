# @repo/radu-machine-learning

Machine Learning Course Contents: https://github.com/gniziemazity/ml-course

Course Link: https://www.youtube.com/playlist?list=PLB0Tybl0UNfYe9aJXfWw-Dw_4VnFrqRC4

> Hand-drawn stroke data viewer. Displays hand-writing samples organized by session for machine learning exploration.

## Quick Start

```bash
pnpm add @repo/radu-machine-learning
```

```tsx
import { RaduMachineLearning } from '@repo/radu-machine-learning';

export default function App() {
  return <RaduMachineLearning />;
}
```

## Architecture

```
RaduMachineLearning
  ├─ Sessions (basis-2/3)
  │   └─ Session (×N)
  │       └─ Drawing (×M)
  │           └─ <canvas> ← drawSample() renders stroke paths
  └─ Charts (basis-1/3 — placeholder)
```

The package reads hand-drawn stroke data from a bundled JSON file. Each stroke is a sequence of `[x, y]` points organized by session and drawing label.

## Data Model

```typescript
type Paths = number[][][]; // Array of strokes, each is an array of [x, y] points

type SessionData = {
  session: number;
  student: string;
  drawings: Record<string, Paths>; // label → stroke data
};
```

Each drawing is stored under a label key (e.g., "car", "house") within a timestamped session. The data represents strokes from a student named Radu.

## Drawing Rendering

The `draw.ts` utility handles rendering stroke data onto a canvas:

1. **`getMinMax(paths)`** — finds bounding box of all stroke points.
2. **`drawSample(canvas, ctx, paths)`** — scales canvas proportionally, computes uniform scale from the larger dimension, then renders each stroke as a connected line path.

All drawings are scaled uniformly to preserve aspect ratio.

## Exports

| Export                | Path                                              | Description    |
| --------------------- | ------------------------------------------------- | -------------- |
| `RaduMachineLearning` | `@repo/radu-machine-learning/RaduMachineLearning` | Root component |
| `./styles`            | `@repo/radu-machine-learning/styles`              | Component CSS  |

## State Management

No state management library. Data is loaded from the bundled `sampleData.json` as a static import.

---

_Part of [Creative Playground](https://jpotin.gitlab.io/playground)_
