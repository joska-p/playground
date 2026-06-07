# @repo/automa

> Interactive Cellular Automaton simulator — Conway's Game of Life on an editable 2D grid with Web Worker stepping, Zustand state management, and React Three Fiber rendering.

## Quick Start

```bash
pnpm add @repo/automa
```

```tsx
import { App } from '@repo/automa';

export default function Page() {
  return (
    <StrictMode>
      <App
        rows={80}
        cols={60}
        seed={42}
      />
    </StrictMode>
  );
}
```

## Architecture

```
App
  └─ ErrorBoundary
       ├─ AutomatonCanvas
       │   └─ <Canvas> (R3F — orthographic, OrbitControls)
       │       ├─ <OrbitControls> (zoom via middle-click, no rotation, no pan)
       │       ├─ <mesh> (shaderMaterial ← DataTexture)
       │       └─ <GridLines> (debug overlay)
       │
       └─ Controls
           ├─ play / pause / step / clear / randomize
           ├─ speed slider
           ├─ brush mode (draw / erase)
           ├─ import / export pattern
           └─ debug overlay (D)

automatonStore (global Zustand singleton)
  ├─ Pure state mutations only (setGrid, clear, randomize, ...)
  └─ Consumer via selectors (useGrid, useRunning, ...)

actions.ts (plain functions, no hooks)
  ├─ init / destroy — Worker + timer lifecycle
  ├─ step / play / pause — animation orchestration
  ├─ clear / randomize / paintCell — grid edits
  └─ importPattern / exportPattern — file I/O
```

## Engine

The engine runs Conway's Game of Life in a **Web Worker** to avoid blocking the UI thread:

```
step.ts            Core algorithm (toroidal wrap-around) — evolveGrid
worker.ts          Off-main-thread computation, transferrable ArrayBuffers
grid.ts            Grid allocation / seeding — createGrid, seedGrid
rng.ts             Seeded PRNG — createSeededRandom
pattern.schema.ts  Zod schema for import/export of `.json` patterns
types.ts           CellValue, Grid type aliases
```

## Controls

| Input                       | Action                          |
| --------------------------- | ------------------------------- |
| Left-click + drag           | Draw / erase cells (brush mode) |
| Scroll wheel / middle-click | Zoom                            |
| D                           | Toggle debug overlay            |
| Space                       | Play / pause                    |

---

_Part of [Creative Playground](https://playground-beryl-omega.vercel.app)_
