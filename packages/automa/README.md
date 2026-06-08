# @repo/automa

> Interactive Cellular Automaton simulator with pluggable rules, Web Worker stepping, Zustand state management, and React Three Fiber rendering.

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
            ├─ rule selector
            └─ debug overlay (D)

automatonStore (global Zustand singleton)
  ├─ Pure state mutations only (setGrid, clear, randomize, ...)
  └─ Consumer via selectors (useGrid, useRunning, ...)

actions.ts (plain functions, no hooks)
  ├─ init / destroy — Worker + timer lifecycle
  ├─ step / play / pause — animation orchestration
  └─ clear / randomize / paintCell / setRule — grid edits
```

## Engine

Cellular automaton rules run in a **Web Worker** to avoid blocking the UI thread:

```
engine.ts          Generic evolve (lookup tables + multi-state support)
worker.ts          Off-main-thread computation, transferrable ArrayBuffers
grid.ts            Grid allocation / seeding — createGrid, seedGrid
types.ts           CellValue, Grid type aliases
rules/             Rule definitions — Conway, HighLife, registry
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
