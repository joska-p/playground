# Adjusted Technical Design Document (TDD): Fourier Layer Plugin

## 1. Architectural Strategy

1. **The Generator:** Continues to produce alternating coordinates `[x0, y0, x1, y1, ...]` based on a text seed string.
2. **The Worker Pool Cache:** Since a `VisualLayer`'s `draw()` method runs synchronously on every canvas update, it cannot `await` a worker response inline. We will create a helper/hook or a local cache wrapper that feeds data to the `@repo/worker-pool` and holds onto the computed epicycles.
3. **The Layer Loop Time ($t$):** Since the app doesn't have a playback controller, the layer can hook into its own lightweight `requestAnimationFrame` loop to call a state updater, or use the execution stamp of `performance.now()` directly inside the `draw()` loop to animate the rotating arms smoothly whenever the canvas updates.

---

## 2. Mathematical Cache Adapter (`fourierStore.ts`)

Since layers are state-agnostic rendering pipelines, we create a small, simple singleton cache that maps a sequence data instance to its computed Fourier epicycles via your background worker pool.

```typescript
import { WorkerPool } from '@repo/worker-pool';

export interface Epicycle {
  frequency: number;
  amplitude: number;
  phase: number;
}

const fourierPool = new WorkerPool<Float32Array, Epicycle[]>({
  workerFactory: () =>
    new Worker(new URL('./fourier.worker.ts', import.meta.url), { type: 'module' }),
  maxPoolSize: 1,
  serialize: (task) => ({ message: task, transfer: [task.buffer] }),
  deserialize: (event) => event.data
});

// Cache map to prevent re-computing DFT for the exact same dataset array
const epicycleCache = new Map<string, Epicycle[]>();
const pendingCalculations = new Set<string>();

export function getOrComputeEpicycles(data: number[], onComputed: () => void): Epicycle[] | null {
  // Generate a fingerprint hash of the sequence values to key the cache
  const key = data.slice(0, 20).join(',') + `:${data.length}`;

  if (epicycleCache.has(key)) {
    return epicycleCache.get(key) ?? null;
  }

  if (!pendingCalculations.has(key)) {
    pendingCalculations.add(key);
    const floatBuffer = new Float32Array(data);

    fourierPool.run(floatBuffer).then((result) => {
      epicycleCache.set(key, result);
      pendingCalculations.delete(key);
      onComputed(); // Trigger a canvas redraw event once math finishes
    });
  }

  return null;
}
```

---

## 3. Creating the Visual Layer (`drawFourierEpicycles.ts`)

This file follows the exact structural blueprint of your `drawRecamanArcs.ts` layer module! It registers parameters, exposes clean defaults, and uses the layout constants computed by your core renderer.

```typescript
import type { VisualLayer } from '../types';
import { getOrComputeEpicycles } from './fourierStore';

// Keeps track of drawn tip coordinate trails across frame clears
const pathHistory: Array<{ x: number; y: number }> = [];
let lastSequenceKey = '';

const drawFourierEpicycles: VisualLayer = {
  id: 'fourier-epicycles',
  name: 'Fourier Epicycles',
  description: 'Traces paths utilizing orbiting epicycle vectors computed via DFT.',
  category: 'drawing',
  defaults: {
    precisionLimit: 40,
    showCircles: 1.0, // 1 for true, 0 for false (matching numeric param structures)
    speedMultiplier: 1.0
  },
  params: {
    precisionLimit: {
      label: 'Circle Count (Precision)',
      type: 'number',
      min: 1,
      max: 200,
      step: 1
    },
    showCircles: {
      label: 'Show Circles (0=Hide, 1=Show)',
      type: 'number',
      min: 0,
      max: 1,
      step: 1
    },
    speedMultiplier: {
      label: 'Animation Speed',
      type: 'number',
      min: 0.1,
      max: 5,
      step: 0.1
    }
  },
  draw: (ctx, data, params, layout) => {
    const {
      precisionLimit = 40,
      showCircles = 1,
      speedMultiplier = 1.0
    } = params as Record<string, number>;

    // 1. Fetch background calculated epicycle chains
    const epicycles = getOrComputeEpicycles(data, () => {
      // Callback triggers an app-level canvas re-render when worker resolves
      ctx.canvas.dispatchEvent(new CustomEvent('sequence-renderer:trigger-redraw'));
    });

    if (!epicycles || epicycles.length === 0) return;

    // Reset paths when switching between different preset datasets
    const currentSequenceKey = `${data.length}:${data[0]}`;
    if (currentSequenceKey !== lastSequenceKey) {
      pathHistory.length = 0;
      lastSequenceKey = currentSequenceKey;
    }

    // 2. Generate smooth running time delta directly via performance clock
    const time = (performance.now() / 1000) * 0.5 * speedMultiplier;

    ctx.save();
    // Center the orbiting platform onto your standard canvas offset framework
    ctx.translate(layout.offsetX, layout.offsetY);

    let x = 0;
    let y = 0;
    const limit = Math.min(epicycles.length, precisionLimit);

    // 3. Compute vector orbital offsets
    for (let i = 0; i < limit; i++) {
      const epi = epicycles[i];
      const prevX = x;
      const prevY = y;

      // Map components. Radius scaling utilizes your architecture's custom valueScale
      const radius = epi.amplitude * layout.valueScale;
      x += radius * Math.cos(epi.frequency * time + epi.phase);
      y += radius * Math.sin(epi.frequency * time + epi.phase);

      if (showCircles === 1) {
        ctx.beginPath();
        ctx.arc(prevX, prevY, radius, 0, Math.PI * 2);
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.1)';
        ctx.lineWidth = 1;
        ctx.stroke();

        ctx.beginPath();
        ctx.moveTo(prevX, prevY);
        ctx.lineTo(x, y);
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.2)';
        ctx.stroke();
      }
    }

    // 4. Capture tip coordinate trail locations
    pathHistory.push({ x, y });
    if (pathHistory.length > 2000) pathHistory.shift();

    // 5. Draw the resulting vector trail line onto the canvas
    ctx.beginPath();
    if (pathHistory.length > 0) {
      ctx.moveTo(pathHistory[0].x, pathHistory[0].y);
      for (const pt of pathHistory) {
        ctx.lineTo(pt.x, pt.y);
      }
    }

    const themeColor = getComputedStyle(ctx.canvas).color || '#00ffcc';
    ctx.strokeStyle = themeColor;
    ctx.lineWidth = 2;
    ctx.stroke();
    ctx.restore();

    // 6. Force-loop animation frame loops since there are no core app timeline tickers
    requestAnimationFrame(() => {
      ctx.canvas.dispatchEvent(new CustomEvent('sequence-renderer:trigger-redraw'));
    });
  }
};

export { drawFourierEpicycles };
```

---

## 4. Integration into your Layer Registry

To make it active, you just register it along with your other layers inside `layers/registry.ts`:

```typescript
// Inside your layers registry file where getLayer resolves items
import { drawFourierEpicycles } from './drawFourierEpicycles';

const layersRegistry = {
  'recaman-arcs': drawRecamanArcs,
  'fourier-epicycles': drawFourierEpicycles
  // ... rest of your layers
};
```
