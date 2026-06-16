---
title: "Sequence Renderer"
description: "Visualize mathematical sequences — Recamán, Fibonacci, and more."
category: "reference"
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
import { App } from '@repo/sequence-renderer';

export default function MyViz() {
  return <App />;
}
```

Import styles:

```tsx
import '@repo/sequence-renderer/styles';
```

## Core Philosophy

Decouple **generation** from **visualization**:

1. **Rules** — Define sequences via `factoryRule()` in `src/core/rules/`.
2. **Visualizations** — Composable layers built with `defineLayer()` + `visualisationFactory()` in `src/core/visualizations/`.
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

Visualizations are composed of **layers** bundled into **presets**.

### Layers

Individual drawing units created with `defineLayer()`:

```typescript
import { defineLayer } from '../layerFactory';

type MyOptions = { lineWidth: number; alpha: number };

const myLayer = defineLayer<MyOptions>()
  .defaults({ lineWidth: 1, alpha: 0.8 })
  .draw((ctx, options) => {
    // ctx: DrawingContext (pre-computed canvas, scale, offsets, etc.)
    // options: resolved MyOptions
  });

export { myLayer };
```

Available layers in `src/core/visualizations/layers/`:

| Layer                | What it draws                     |
| :------------------- | :-------------------------------- |
| `drawBaseline`       | Horizontal baseline at y=0        |
| `drawPlottedNumbers` | Dots at each unique value         |
| `drawRecamanArcs`    | Recamán's semicircle arcs         |
| `drawFactorWaves`    | Sine waves from each prime factor |

### Presets

Presets compose layers into ready-to-use `Visualization` objects via `visualisationFactory()`:

```typescript
import { visualisationFactory } from '../visualisationFactory';
import { basePreset } from './base';
import { myLayer } from '../layers/myLayer';

export const myViz = visualisationFactory({
  id: 'my-viz',
  name: 'My Visualization',
  layers: [...basePreset, myLayer.with()],
  calculateScale: myCustomScale, // optional
  compatibleWith: (meta) => meta.hasIntervals // optional
});
```

Available presets in `src/core/visualizations/presets/`:

| Preset        | Composed from                                  |
| :------------ | :--------------------------------------------- |
| `base`        | `drawBaseline` + `drawPlottedNumbers`          |
| `frontWave`   | `base` + `drawFactorWaves`                     |
| `recamanWalk` | `base` + `drawRecamanArcs` (with custom scale) |

### Scale Calculators

Custom scaling functions in `src/core/visualizations/scales/`:

- `calculateRecamanScale` — Uses `findBiggestInterval` for both axes
- `combineScales(...calculators)` — Composes multiple scale calculators

## State & Actions

```typescript
const sequenceRule = useSequenceRule();
const steps = useSequenceSteps();
const visualizationId = useSequenceVisualizationId();
const sequence = useSequenceSequence();
```

| Action                                            | What                 |
| :------------------------------------------------ | :------------------- |
| `setSequenceRule({ sequenceRule })`               | Change sequence type |
| `setSequenceSteps({ steps })`                     | Change step count    |
| `setSequenceVisualizationId({ visualizationId })` | Switch visualization |

## Data Flow

`User changes` → `Store updates` → `Sequence recalculates` → `Canvas renders`

Rules clamp step input to their `maxSteps` boundary via `clampSteps()`.

## How to Add a New Sequence

1. Create a rule file in `src/core/rules/` using `factoryRule()`:

   ```typescript
   import { factoryRule } from './create-rule';

   export const myRule = factoryRule({
     id: 'my-rule',
     name: 'My Rule',
     description: 'What it does',
     maxSteps: 500,
     getNext: ({ index, current, sequence, seen }) => {
       // return next value
     }
   });
   ```

2. Register in `src/core/rules/registry.ts`:
   ```typescript
   import { myRule } from './myRule';
   // add to the `rules` Map
   ```

## How to Add a New Visualization

### Step 1: Create a layer

Create a file in `src/core/visualizations/layers/` (e.g., `myLayer.ts`):

```typescript
import { defineLayer } from '../layerFactory';

type MyOptions = { lineWidth: number; alpha: number };

const myLayer = defineLayer<MyOptions>()
  .defaults({ lineWidth: 2, alpha: 0.5 })
  .draw((ctx, { lineWidth, alpha }) => {
    ctx.context.save();
    ctx.context.lineWidth = lineWidth;
    ctx.context.globalAlpha = alpha;
    // ... draw using ctx.context (CanvasRenderingContext2D)
    ctx.context.restore();
  });

export { myLayer };
```

### Step 2: Create a preset

Create a file in `src/core/visualizations/presets/`:

```typescript
import { visualisationFactory } from '../visualisationFactory';
import { basePreset } from './base';
import { myLayer } from '../layers/myLayer';

export const myViz = visualisationFactory({
  id: 'my-viz',
  name: 'My Visualization',
  layers: [...basePreset, myLayer.with({ lineWidth: 3 })]
});
```

### Step 3: Register it

Add to the `visualizationRegistry` map in `src/core/visualizations/registry.ts`.

### Step 4: Optional — Custom scale

Create a scale calculator in `src/core/visualizations/scales/` and pass it as `calculateScale`.

## Drawing API

Layers receive a `DrawingContext` object:

| Property        | Type                       | Description                         |
| :-------------- | :------------------------- | :---------------------------------- |
| `canvas`        | `HTMLCanvasElement`        | The canvas element                  |
| `context`       | `CanvasRenderingContext2D` | 2D drawing context (pre-fetched)    |
| `sequence`      | `number[]`                 | The generated sequence              |
| `containerSize` | `{ width, height }`        | Canvas dimensions from parent       |
| `maxVal`        | `number`                   | Max value in sequence               |
| `valueScale`    | `number`                   | Pixels-per-unit scale               |
| `offsetX`       | `number`                   | Horizontal centering offset         |
| `offsetY`       | `number`                   | Vertical centering offset (midline) |
| `textColor`     | `string`                   | Computed CSS color of the canvas    |

Canvas sizing, clearing, and centering offsets are handled automatically by `visualisationFactory`.

## Available Utilities

- `src/utils/find-biggest-interval.ts` — Finds the largest step between consecutive values (used by Recamán scale)

---

_Part of @repo/playground_

