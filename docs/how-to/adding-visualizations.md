# Adding Visualizations

> Want to add a new visualization to the sequence renderer? Here's how.

---

## 📁 Where Visualizations Live

```
packages/sequence-renderer/src/core/visualizations/
├── index.ts          # Registry
├── recaman-arcs.ts  # Existing viz
└── my-viz.ts       # 👋 Your new one
```

## 🚀 Add a New Visualization

### Step 1: Create the Visualization

```typescript
// my-viz.ts
import type { Visualization } from "./types";

export const myViz: Visualization = {
  id: "my-viz",
  name: "My Awesome Visualization",
  draw: (ctx, sequence, bounds) => {
    const { width, height } = bounds;
    
    // Your drawing logic here
    ctx.beginPath();
    ctx.arc(width / 2, height / 2, 50, 0, Math.PI * 2);
    ctx.fill();
  },
};
```

### Step 2: Register It

```typescript
// index.ts
import { myViz } from "./my-viz";

export const visualizations: Visualization[] = [
  myViz,
  // ...others stay here
];
```

### Step 3: Use It

The visualization automatically appears in the dropdown!

---

## 🎨 Drawing API

### Canvas Context

```typescript
draw: (ctx, sequence, bounds) => {
  // ctx: CanvasRenderingContext2D
  // sequence: number[]
  // bounds: { width: number, height: number }
}
```

### Common Patterns

#### Lines

```typescript
ctx.beginPath();
ctx.moveTo(x1, y1);
ctx.lineTo(x2, y2);
ctx.stroke();
```

#### Circles

```typescript
ctx.beginPath();
ctx.arc(x, y, radius, 0, Math.PI * 2);
ctx.fill();
ctx.stroke();
```

#### Colors from Sequence

```typescript
const color = `hsl(${index * 10}, 70%, 50%)`;
ctx.strokeStyle = color;
```

---

## 🎯 Tips

> Tip: Use `requestAnimationFrame` for animations—don't block the main thread.

> Note: Always call `ctx.beginPath()` before drawing to avoid connected shapes.

---

## 🧪 Test Your Visualization

```bash
cd apps/playground && pnpm dev
# Navigate to Sequences > Your Viz
```

---

## 📋 Quick Reference

| Task | File |
|------|------|
| Add new viz | `packages/sequence-renderer/src/core/visualizations/my-viz.ts` |
| Register | `packages/sequence-renderer/src/core/visualizations/index.ts` |
| Test locally | `pnpm dev` → Sequences category |