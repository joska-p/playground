---
title: "Adding a Visualization"
description: "Add a new visualization to the Sequence Renderer engine."
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
  draw: (canvas: HTMLCanvasElement, sequence: number[]) => void;
};
```

The `draw` function receives a canvas element and the generated sequence array.

---

## Step 1: Create the Draw Function

Create `packages/sequence-renderer/src/core/visualizations/my-viz.ts`:

```typescript
export function drawMyViz(canvas: HTMLCanvasElement, sequence: number[]) {
  if (!canvas.parentElement) return;

  const width = canvas.parentElement.clientWidth;
  const height = canvas.parentElement.clientHeight;
  canvas.width = width;
  canvas.height = height;

  const ctx = canvas.getContext("2d") as CanvasRenderingContext2D;
  ctx.clearRect(0, 0, width, height);

  // Your drawing logic here
  const maxVal = Math.max(...sequence, 0);
  const stepX = width / (sequence.length - 1 || 1);
  const scaleY = height / maxVal;

  ctx.beginPath();
  ctx.strokeStyle = "hsl(160, 50%, 50%)";
  ctx.lineWidth = 2;

  sequence.forEach((value, index) => {
    const x = index * stepX;
    const y = height - value * scaleY;
    if (index === 0) ctx.moveTo(x, y);
    else ctx.lineTo(x, y);
  });

  ctx.stroke();
}
```

---

## Step 2: Export the Visualization

In `packages/sequence-renderer/src/core/visualizations/index.ts`:

```typescript
import { drawMyViz } from "./my-viz.js";

export const visualizations = [
  // ...existing visualizations
  { id: "my-viz", name: "My Visualization", draw: drawMyViz },
];
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
