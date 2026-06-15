---
title: 'Adding a Visualization'
description: 'Add a new visualization to the Sequence Renderer engine.'
category: 'how-to'
tags:
  - how-to
---

# Adding a Visualization

Visualizations define _how to draw_ a sequence. Rules define _what numbers_ to generate. This guide shows how to add a new visualization.

---

## The Visualization Interface

```typescript
type Visualization = {
  id: string;
  name: string;
  draw: (options: { canvas: HTMLCanvasElement; sequence: number[] }) => void;
};
```

The `draw` function receives an options object containing the canvas element and the generated sequence array.

---

## Step 1: Create the Visualization

Create `packages/sequence-renderer/src/core/visualizations/myViz.ts`:

```typescript
import type { Visualization } from './types';

function draw({
  canvas,
  sequence
}: {
  canvas: HTMLCanvasElement;
  sequence: number[];
}): void {
  if (!canvas.parentElement) return;

  const width = canvas.parentElement.clientWidth;
  const height = canvas.parentElement.clientHeight;
  canvas.width = width;
  canvas.height = height;

  const ctx = canvas.getContext('2d');
  if (!ctx) return;
  ctx.clearRect(0, 0, width, height);

  // Your drawing logic here
  const maxVal = Math.max(...sequence, 0);
  const stepX = width / (sequence.length - 1 || 1);
  const scaleY = height / maxVal;

  ctx.beginPath();
  ctx.strokeStyle = 'hsl(160, 50%, 50%)';
  ctx.lineWidth = 2;

  sequence.forEach((value, index) => {
    const x = index * stepX;
    const y = height - value * scaleY;
    if (index === 0) ctx.moveTo(x, y);
    else ctx.lineTo(x, y);
  });

  ctx.stroke();
}

export const myViz: Visualization = {
  id: 'my-viz',
  name: 'My Visualization',
  draw
};
```

---

## Step 2: Register the Visualization

In `packages/sequence-renderer/src/core/visualizations/registry.ts`, import your visualization and register it in the map:

```typescript
import { myViz } from './myViz';

// Inside the Map constructor in registry.ts:
const visualizations = new Map<string, Visualization>([
  [recamanArcs.id, recamanArcs],
  [factorWave.id, factorWave],
  [myViz.id, myViz]
]);
```

---

## Step 3: Test It

```bash
pnpm --filter @repo/sequence-renderer build
pnpm --filter @repo/playground dev
```

Visit `http://localhost:4321/projects/generative/sequences/` and select your new visualization from the dropdown.

---

## Tips

- **Canvas sizing**: Always size canvas to its parent container
- **Cleanup**: Call `ctx.clearRect()` before drawing
- **Scaling**: Account for `maxVal` when mapping sequence values to pixel coordinates
- **Styling**: Use HSL colors for easy theming

---

## Checklist

- [ ] Visualization has a unique `id`
- [ ] Handles empty sequences gracefully
- [ ] Canvas resizes with its container
- [ ] Appears in the UI dropdown
