---
title: "Your First Visualization"
description: "A step-by-step guide to creating your first visualization in the playground."
type: "tutorial"
---

# Your First Visualization

Let's build a simple visualization from scratch. By the end, you'll have a new project in the playground.

---

## What We're Building

A simple "Random Walk" visualization — a particle that takes random steps and leaves a trail.

---

## Step 1: Add to Projects

Open `apps/playground/src/data/projects.ts` and add your project:

```typescript
export const projects: Record<string, Project> = {
  // ...existing projects
  randomwalk: {
    slug: "randomwalk",
    name: "Random Walk",
    description: "A particle wandering randomly through space.",
    category: "generative",
    tags: ["Canvas", "Random"],
    icon: icons.Sparkles,
  },
};
```

---

## Step 2: Create the Page

Create `apps/playground/src/pages/projects/generative/randomwalk/index.astro`:

```astro
---
import BaseLayout from "../../../../layouts/base-layout.astro";
import { RandomWalk } from "@repo/random-walk"; // We'll create this
---

<BaseLayout title="Random Walk">
  <RandomWalk client:load />
</BaseLayout>
```

---

## Step 3: Build the Component

Create `packages/random-walk/src/index.tsx`:

```tsx
import { useEffect, useRef, useState } from "react";

export function RandomWalk() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isRunning, setIsRunning] = useState(true);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Starting position
    let x = canvas.width / 2;
    let y = canvas.height / 2;

    const animate = () => {
      // Random step
      x += Math.random() * 20 - 10;
      y += Math.random() * 20 - 10;

      // Draw
      ctx.fillStyle = "hsl(160, 50%, 50%)";
      ctx.beginPath();
      ctx.arc(x, y, 2, 0, Math.PI * 2);
      ctx.fill();

      if (isRunning) requestAnimationFrame(animate);
    };

    animate();
  }, [isRunning]);

  return (
    <div>
      <canvas ref={canvasRef} width={800} height={600} />
      <button onClick={() => setIsRunning(!isRunning)}>{isRunning ? "Pause" : "Play"}</button>
    </div>
  );
}
```

---

## Step 4: Export the Package

In `packages/random-walk/src/index.ts`:

```typescript
export { RandomWalk } from "./index";
```

In `packages/random-walk/package.json`, add to `exports`:

```json
{
  "name": "@repo/random-walk",
  "exports": {
    ".": "./src/index.ts"
  }
}
```

---

## Step 5: Run It

```bash
pnpm --filter @repo/playground dev
```

Visit `http://localhost:4321/projects/generative/randomwalk/`

---

## What's Next?

- Add controls (speed, color, particle size)
- Save to `@repo/ui` if reusable
- Check [Adding Projects](/docs/adding-projects/) for more patterns

---

## Key Takeaways

1. **Projects are just pages** — Astro routing handles the URL
2. **Engines are React components** — Import and use `client:load`
3. **Canvas is simple** — Just requestAnimationFrame + drawing commands
4. **State is optional** — Start stateless, add Zustand when needed
