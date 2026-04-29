---
title: "Your First Visualization"
description: "A step-by-step guide to creating your first visualization in the playground."
tags:
  - tutorial
featured: true
---

# Your First Visualization

Let's add a new visualization to the Sequence Renderer. By the end, you'll have drawn something new with math.

---

## What We're Building

A "Line Graph" visualization — draws the sequence as connected points, like a stock chart.

---

## Step 1: Create the Visualization

Create `packages/sequence-renderer/src/core/visualizations/line-graph.ts`:

```typescript
export function drawLineGraph(canvas: HTMLCanvasElement, sequence: number[]) {
  if (!canvas.parentElement) return;

  const width = canvas.parentElement.clientWidth;
  const height = canvas.parentElement.clientHeight;
  canvas.width = width;
  canvas.height = height;

  const ctx = canvas.getContext("2d") as CanvasRenderingContext2D;

  // Clear canvas
  ctx.clearRect(0, 0, width, height);

  // Calculate scales
  const maxVal = Math.max(...sequence, 0);
  const stepX = width / (sequence.length - 1 || 1);
  const scaleY = height / maxVal;

  // Draw line
  ctx.beginPath();
  ctx.strokeStyle = "hsl(160, 50%, 50%)";
  ctx.lineWidth = 2;

  sequence.forEach((value, index) => {
    const x = index * stepX;
    const y = height - value * scaleY;

    if (index === 0) {
      ctx.moveTo(x, y);
    } else {
      ctx.lineTo(x, y);
    }
  });

  ctx.stroke();

  // Draw points
  ctx.fillStyle = "hsl(160, 50%, 50%)";
  sequence.forEach((value, index) => {
    const x = index * stepX;
    const y = height - value * scaleY;
    ctx.beginPath();
    ctx.arc(x, y, 3, 0, Math.PI * 2);
    ctx.fill();
  });
}
```

---

## Step 2: Export the Visualization

In `packages/sequence-renderer/src/core/visualizations/index.ts`:

```typescript
import { drawLineGraph } from "./line-graph.js";

export const visualizations = [
  // ...existing visualizations
  { id: "line-graph", name: "Line Graph", draw: drawLineGraph },
];
```

---

## Step 3: Run It

```bash
pnpm --filter @repo/sequence-renderer build
pnpm --filter @repo/playground dev
```

Visit `http://localhost:4321/projects/generative/sequences/`

Select your new "Line Graph" visualization from the dropdown.

---

## What's Next?

- Add controls (color, line width, show/hide points)
- Try different sequences (Fibonacci, Primes, Collatz)
- Check [Engines](/docs/explanation/engines/) for how rules and visualizations work together

---

## Key Takeaways

1. **Visualizations are draw functions** — they receive `canvas` and `sequence`
2. **Rules generate data, visualizations render it** — they're independent
3. **Add to the array, it appears in UI** — no config needed
