---
title: "automa"
description: "An interactive cellular automaton that lets you paint life onto a grid, watch it evolve under pluggable rules, and orbit the result in a full-screen React Three Fiber viewport — Conway's Game of Life as a playground you can reach into."
category: "reference"
tags:
  - reference
  - automa
order: 20
---

---
title: 'Automa'
coordinates: '/visuals/generative'
status: 'Active'
date_discovered: 2025-06-01
---

# @repo/automa

---

## Essence

Automa is the React layer of a two-package cellular automaton system. It takes
the pure simulation engine ([`@repo/automa-engine`](/docs/reference/packages/automa-engine))
and wraps it in an interactive canvas: orthographic camera, orbit controls,
brush painting, and a rule selector that lets you swap between Game of Life,
HighLife, Brian's Brain, and any custom rule you register.

The interesting tension is between _simulation_ and _interaction_. The engine
thinks in tick cycles and neighbor counts; the UI thinks in pointer events
and pixel coordinates. The bridge is a DataTexture — every frame, the
grid state is written into a texture that a fullscreen shader reads, turning
a flat array of integers into a colour-mapped field on the GPU. The camera
auto-fits the grid dimensions on mount, and OrbitControls take over from
there.

State lives in a global Zustand store. Pure mutation functions handle the
grid; selector hooks let each component subscribe to exactly the slice it
needs. The result is a system where the simulation, the rendering, and the
controls are three independent layers that agree on a shared data model.

## Quick Launch

```bash
pnpm dev --filter @repo/automa
```

Or install it into your own project:

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

## Field Notes

- **The Catalyst:** The question of whether a cellular automaton could feel
  like a _toy_ rather than a textbook demo. Conway's Game of Life is
  compelling but passive — you watch, you don't touch. Automa lets you draw
  cells with a brush, swap rules mid-simulation, and orbit the grid as a
  three-dimensional object. The R3F layer turns a flat grid into a spatial
  experience.

- **Quirks & Anomalies:** Drawing maps pointer events on a 3D plane to grid
  cell indices. The plane geometry is centered at the origin, so pointer
  world coordinates need a `(+cols/2, +rows/2)` shift to align with
  row-major storage. The Y axis happens to be consistent between Three.js
  world space and grid space — no flip required — which felt suspicious
  enough to warrant a comment in the code. Also, the colour picker is driven
  by the active rule's `stateCount`; switching to Brian's Brain (3 states)
  instantly reveals a third colour swatch, and the UI adapts without any
  conditional logic.

- **Future Horizons:** Larger grids with instanced rendering, cell history
  trails that show the last N states as colour gradients, and rule
  composition — chaining two rules in sequence within a single tick to create
  hybrid automata. A touch-friendly mode for tablets and phones, where brush
  painting feels more natural than mouse dragging.

---

## Rendering Strategy

The grid lives on the CPU as a flat `Uint8Array`. Every frame, `useGridTexture`
writes it into a Three.js `DataTexture`, which a fullscreen mesh reads via a
`ShaderMaterial`. The shader maps each cell's state integer to a colour from
the active palette — no geometry per cell, no instancing, just one texture
sample per pixel.

```
GridState (Uint8Array)
  → useGridTexture (bridges CPU ↔ GPU every frame)
    → DataTexture (R=state integer)
      → ShaderMaterial (maps state → colour)
        → fullscreen <mesh> (R3F canvas)
```

## Hook Decomposition

The UI layer splits into four hooks, each with one job:

| Hook              | Responsibility                                                                              |
| ----------------- | ------------------------------------------------------------------------------------------- |
| `useCameraFitter` | Auto-fits the orthographic camera to grid dimensions on mount and resize. 15% margin.       |
| `useCellPainting` | Maps pointer events to grid cell mutations. Handles the world-to-grid coordinate transform. |
| `useGridTexture`  | Bridges grid state to GPU. Writes the `Uint8Array` into a `DataTexture` every frame.        |
| `useStepTimer`    | Measures simulation step performance. Provides timing data for the debug overlay.           |

## Controls

| Input                       | Action                          |
| --------------------------- | ------------------------------- |
| Left-click + drag           | Draw / erase cells (brush mode) |
| Right-click + drag          | Pan                             |
| Scroll wheel / middle-click | Zoom                            |
| D                           | Toggle debug overlay            |
| Space                       | Play / pause                    |

## State Management

The Zustand store is a global singleton. Pure mutation functions handle all
state changes (`setGrid`, `clear`, `randomize`, `paintCell`, `setRule`);
selector hooks (`useGrid`, `useRunning`, etc.) let components subscribe
to exactly the slice they need. The store never owns logic — it holds data.
Actions that orchestrate the simulation (`step`, `play`, `pause`) live in a
separate `actions.ts` file alongside the WorkerPool lifecycle (`init`,
`destroy`) and grid edits (`clear`, `randomize`, `paintCell`).

## Colour Picker

Each state gets its own colour swatch. The number of swatches is driven by the
active rule's `stateCount` — switch to a 3-state rule and a third swatch
appears automatically. No conditional UI logic; the picker reads the rule
object and adapts.

---

_See [@repo/automa-engine](/docs/reference/packages/automa-engine) for the core simulation engine, rule system, and Web Worker stepping._

_Part of the [Creative Playground](https://joska-p.github.io/playground)_

