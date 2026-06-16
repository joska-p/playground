---
title: 'Adding a Visualization'
description: 'Add a new visualization to the Sequence Renderer engine using the layered architecture.'
category: 'how-to'
tags:
  - how-to
---

# Adding a Visualization

Visualizations define _how to draw_ a sequence. The system uses a layered
architecture — individual drawing units called **layers** are composed into
**presets** via `visualisationFactory()`.

---

## Layer Type

Layers receive a pre-computed `DrawingContext` — canvas sizing, clearing, and
centering offsets are handled automatically:

```typescript
export type DrawingContext = {
  canvas: HTMLCanvasElement;
  context: CanvasRenderingContext2D;
  sequence: number[];
  containerSize: { width: number; height: number };
  maxVal: number;
  valueScale: number;
  offsetX: number;
  offsetY: number;
  textColor: string;
};
```

Layers are created with `defineLayer()` which provides a `.defaults()` /
`.draw()` builder and returns a `.with()` configurator.

---

## Step 1: Create a Layer

Create `packages/sequence-renderer/src/core/visualizations/layers/myLayer.ts`:

```typescript
import { defineLayer } from '../layerFactory';

type MyLayerOptions = { lineWidth: number; alpha: number };

const myLayer = defineLayer<MyLayerOptions>()
  .defaults({ lineWidth: 2, alpha: 0.8 })
  .draw((ctx, options) => {
    ctx.context.save();
    ctx.context.strokeStyle = 'hsl(160, 50%, 50%)';
    ctx.context.lineWidth = options.lineWidth;
    ctx.context.globalAlpha = options.alpha;

    // ctx.offsetX, ctx.offsetY — pre-computed centering offsets
    // ctx.valueScale — pixels per unit
    // ctx.sequence — the generated numbers
    // ctx.context — CanvasRenderingContext2D

    ctx.context.beginPath();
    ctx.context.moveTo(ctx.offsetX, ctx.offsetY);
    ctx.context.lineTo(
      ctx.offsetX + (ctx.maxVal * ctx.valueScale) / 2,
      ctx.offsetY - 50
    );
    ctx.context.stroke();
    ctx.context.restore();
  });

export { myLayer };
```

The layer can be configured at composition time via `.with({ lineWidth: 3 })`.

---

## Step 2: Create a Preset

Create `packages/sequence-renderer/src/core/visualizations/presets/myViz.ts`:

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

The `basePreset` includes `drawBaseline` (horizontal axis line) and
`drawPlottedNumbers` (dots at each value). You can use it as a starting
point or build entirely from your own layers.

### Optional — custom scale

Pass a `calculateScale` function to control how sequence values map to
pixels:

```typescript
import type { ScaleCalculator } from '../types';

const myScale: ScaleCalculator = ({ sequence, containerSize }) => {
  const maxVal = Math.max(...sequence, 0);
  return (containerSize.width * 0.9) / (maxVal || 1);
};

export const myViz = visualisationFactory({
  id: 'my-viz',
  name: 'My Visualization',
  layers: [...basePreset, myLayer.with()],
  calculateScale: myScale
});
```

### Optional — compatibility

Use `compatibleWith` to restrict which sequences the visualization works
with:

```typescript
compatibleWith: (meta) => meta.hasIntervals;
```

---

## Step 3: Register It

In `packages/sequence-renderer/src/core/visualizations/registry.ts`, import
your preset and add it to the `visualizationRegistry` Map:

```typescript
import { myViz } from './presets/myViz';

export const visualizationRegistry = new Map<string, Visualization>([
  [frontWave.id, frontWave],
  [recamanWalk.id, recamanWalk],
  [myViz.id, myViz]
]);
```

The visualization appears in the UI dropdown automatically.

---

## Step 4: Test It

```bash
pnpm --filter @repo/sequence-renderer build
pnpm --filter @repo/playground dev
```

Visit `http://localhost:4321/projects/generative/sequences/` and select your
new visualization from the dropdown.

---

## Tips

- **Use `defineLayer()`** — it handles `save`/`restore` and provides
  configurable defaults
- **Share layers across presets** — layers are composable units, not tied to
  one visualization
- **`DrawingContext` is pre-computed** — canvas sizing, clearing, and
  centering offsets are handled by `visualisationFactory`
- **Scale calculators** go in `src/core/visualizations/scales/` and can be
  composed with `combineScales()`

---

## Checklist

- [ ] Layer has a unique `id`
- [ ] Preset has a unique `id`
- [ ] Handles empty sequences gracefully
- [ ] Uses `DrawingContext` properties instead of manual canvas sizing
- [ ] Appears in the UI dropdown
