# @repo/sequence-renderer

> A canvas that unfurls mathematical sequences into visible form — Fourier
> epicycles tracing harmonic paths, layers stacking like transparencies on
> a light table, and a viewport you can orbit with two fingers.

---

## Essence

Sequence Renderer is the browser-surface layer of a two-package sequence
visualization system. It takes the pure generation logic from
[`@repo/sequence-engine`](https://github.com/joska-p/playground/tree/main/packages/sequence-engine)
and gives it a body: a `<canvas>` element, a Fourier DFT computation running
in a Web Worker, a configurable layer stack, and a Zustand store that
bridges engine logic to React components.

The interesting tension is between _mathematical purity_ and _visual
exploration_. The engine produces a `number[]` — a flat, unadorned
sequence. The renderer's job is to make that sequence _legible_ as
movement through space. The Fourier module decomposes the sequence into
harmonic components, each one a rotating epicycle, and the canvas draws
the trace they leave behind. Changing the seed changes the phase;
changing the rule changes the shape; changing the layer stack changes
what you see and what stays hidden.

State lives in Zustand stores. Selector hooks subscribe each component to
exactly the slice it needs; action functions handle rule changes,
regeneration, layer toggling, and viewport updates. The component tree
stays small: an `App` shell wrapped in an error boundary, the canvas that
draws the sequence, and a controls panel.

## Quick Start

Run the visualizer on its own:

```bash
pnpm dev --filter @repo/sequence-renderer
```

Or embed it in your own project:

```bash
pnpm add @repo/sequence-renderer
```

```tsx
import { App } from '@repo/sequence-renderer/sequence-renderer';
import '@repo/sequence-renderer/styles';

export default function Page() {
    return <App />;
}
```

`App` fills its container — render it somewhere full-screen so the canvas has
room. The `styles` import brings in the Tailwind theme the visualizer is styled
with.

## Usage

`App` renders a full-screen canvas plus a controls panel:

- **Sequence** — pick a rule from the engine's registry (Recamán, Fibonacci,
  Collatz, and friends), slide the step count, and set the random seed. Every
  change regenerates the sequence.
- **Viewport** — reset the canvas zoom and pan.
- **Layers** — the sequence is drawn as a stack of layers, each one a draw
  function from a registry (baselines, plotted numbers, arcs, connection
  lines, radial spokes, fills, charts, and Fourier epicycles). Toggle, add, or
  remove layers and tweak their parameters.

The canvas is interactive: scroll to zoom, drag to pan.

## Patterns & Gotchas

- **Determinism vs surprise.** The engine's rules are deterministic given a
  seed, so the same seed and steps always regenerate the same sequence —
  while different rules project the same seed into completely different
  shapes.
- **The DFT runs in a Web Worker.** The Fourier decomposition is offloaded to
  a worker so large step counts don't block the main thread; the worker
  returns harmonic data that the canvas renders as epicycles.
- **Importing `App` has a side effect.** The Fourier rule is registered at
  module level, so importing the app registers the `harmonic-path` rule in the
  engine's registry before any sequence generation happens. This is
  intentional — the rule needs to exist before the app runs.

## Field Notes

- **The Catalyst:** The question of what a mathematical sequence _looks_
  like when drawn as a path through space. Recamán's sequence, harmonic
  series, Collatz orbits — each one produces a distinct visual signature
  when the terms are treated as coordinates or angles. Fourier
  decomposition takes this further: any periodic signal can be expressed
  as a sum of rotating circles, and watching those circles trace out a
  shape feels like seeing the mathematics breathe.

- **Quirks & Anomalies:** The `harmonicPath` rule is registered at module
  level in `App.tsx`, which means importing the app has a side effect.
  This is intentional: the rule needs to exist before any sequence
  generation happens, and module-level registration is the simplest
  guarantee.

- **Future Horizons:** Animated playback that walks through the sequence
  term-by-term, letting the epicycles build up in real time. Export to
  SVG for static visualizations. Per-layer blending modes beyond simple
  opacity — additive, multiply, difference — to create composite images
  from overlapping layer traces. A parameter inspector that shows the
  raw DFT coefficients alongside the visual output.

---

_Part of the [Creative Playground](https://joska-p.github.io/playground)_
