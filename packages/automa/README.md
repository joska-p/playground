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
       │       ├─ <OrbitControls> (zoom via middle-click, pan via right-click)
       │       ├─ <mesh> (shaderMaterial ← DataTexture)
       │       └─ <GridLines> (debug overlay)
       │
       └─ Controls
            ├─ play / pause / step / clear / randomize
            ├─ speed slider
            ├─ brush mode (draw / erase)
            ├─ rule selector
            ├─ color picker (per-state colors)
            └─ debug overlay (D)

Hooks
  ├─ useCameraFitter — auto-fits orthographic camera to grid dimensions on mount/resize
  ├─ useCellPainting — maps pointer events → grid cell mutation
  ├─ useGridTexture  — bridges grid state ↔ GPU DataTexture every frame
  └─ useStepTimer    — measures simulation step performance

automaStore (global Zustand singleton)
  ├─ Pure state mutations only (setGrid, clear, randomize, ...)
  └─ Consumer via selectors (useGrid, useRunning, ...)

actions.ts (plain functions, no hooks)
  ├─ init / destroy — WorkerPool lifecycle (via @repo/worker-pool)
  ├─ step / play / pause — async animation orchestration
  └─ clear / randomize / paintCell / setRule — grid edits
```

## Controls

| Input                       | Action                          |
| --------------------------- | ------------------------------- |
| Left-click + drag           | Draw / erase cells (brush mode) |
| Right-click + drag          | Pan                             |
| Scroll wheel / middle-click | Zoom                            |
| D                           | Toggle debug overlay            |
| Space                       | Play / pause                    |

## Camera

On mount the orthographic camera auto-fits the grid with a 15% margin via `useCameraFitter`. The camera is updated whenever the grid dimensions or viewport size change — no manual `zoom`/`position` needed. Pan and zoom via OrbitControls work normally after the initial framing.

## Drawing

Drawing maps pointer events on the 3D plane to grid cell indices using `useCellPainting`. The plane geometry is centered at the origin, so pointer world coordinates are shifted by `(+cols/2, +rows/2)` to align with the grid's row-major storage. The Y axis is consistent between Three.js world space and grid space (no flip).

## Color picker

Each state gets its own color swatch. The number of swatches is driven by the active rule's `stateCount` — switch to a 3-state rule and a third row appears automatically.

---
_See [@repo/automa-engine](/docs/reference/packages/automa-engine) for core simulation logic, rules, and engine API._
_Part of @repo/playground_
