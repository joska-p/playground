# @repo/automa

> Interactive Cellular Automaton simulator — Conway's Game of Life on an editable 2D grid with Web Worker stepping, Zustand state management, and React Three Fiber rendering.

## Quick Start

```bash
pnpm add @repo/automa
```

```tsx
import { AutomatonProvider, AutomatonCanvas, Controls } from "@repo/automa";

export default function App() {
  return (
    <AutomatonProvider rows={60} cols={80} initialDensity={0.3}>
      <AutomatonCanvas />
      <Controls />
    </AutomatonProvider>
  );
}
```

## Architecture

```
AutomatonProvider
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

| Input | Action |
|---|---|
| Left-click + drag | Draw / erase cells (brush mode) |
| Scroll wheel / middle-click | Zoom |
| D | Toggle debug overlay |
| Space | Play / pause |

## Exports

| Export | Path | Description |
|---|---|---|
| `AutomatonCanvas` | `@repo/automa` | R3F orthographic grid with shader rendering |
| `AutomatonProvider` | `@repo/automa` | Provider wrapping the CA Zustand store |
| `Controls` | `@repo/automa` | UI panel: play, step, speed, brush mode, import/export |
| `./styles` | `@repo/automa/styles` | Component CSS |

## Key Dependencies

| Package | Role |
|---|---|
| `three` | 3D rendering engine |
| `@react-three/fiber` | React renderer for Three.js |
| `@react-three/drei` | R3F utilities (OrbitControls) |
| `zustand` | State management |
| `zod` | Pattern import/export schema validation |
| `@repo/ui` | Shared UI components (Button, Slider, etc.) |

---

_Part of [Creative Playground](https://playground-beryl-omega.vercel.app)_
