---
title: 'Sequence Renderer'
description: 'A canvas that unfurls mathematical sequences into visible form — Fourier epicycles tracing harmonic paths, layers stacking like transparencies on a light table, and a viewport you can orbit with two fingers.'
category: 'reference'
tags:
  - reference
  - sequence-renderer
order: 20
---

# @repo/sequence-renderer

---

## Essence

Sequence Renderer is the browser-surface layer of a two-package sequence
visualization system. It takes the pure generation logic from
[`@repo/sequence-engine`](/docs/reference/packages/sequence-engine) and
gives it a body: a `<canvas>` element, a Fourier DFT computation running
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

State lives in a global Zustand store. Selector hooks let each component
subscribe to exactly the slice it needs; mutation functions handle
regeneration, layer toggling, and viewport changes. The component tree
is small: an `App` shell, an `ErrorBoundary`, a `Sidebar` with controls,
and the `SequenceCanvas` where the actual drawing happens.

## Quick Launch

```bash
pnpm dev --filter @repo/sequence-renderer
```

Or install it into your own project:

```bash
pnpm add @repo/sequence-renderer
```

```tsx
import { App } from '@repo/sequence-renderer';

export default function Page() {
  return <App />;
}
```

```tsx
import '@repo/sequence-renderer/styles';
```

## Field Notes

- **The Catalyst:** The question of what a mathematical sequence _looks_
  like when drawn as a path through space. Recamán's sequence, harmonic
  series, Collatz orbits — each one produces a distinct visual signature
  when the terms are treated as coordinates or angles. Fourier
  decomposition takes this further: any periodic signal can be expressed
  as a sum of rotating circles, and watching those circles trace out a
  shape feels like seeing the mathematics breathe.

- **Quirks & Anomalies:** The Fourier DFT computation runs entirely in a
  Web Worker to avoid blocking the main thread during large step counts.
  The worker returns harmonic data that the canvas then renders as
  epicycles — each circle's radius and angular velocity derived from a
  single DFT pass. The `harmonicPath` rule is registered at module level
  in `App.tsx`, which means importing the app has a side effect. This is
  intentional: the rule needs to exist before any sequence generation
  happens, and module-level registration is the simplest guarantee.

- **Future Horizons:** Animated playback that walks through the sequence
  term-by-term, letting the epicycles build up in real time. Export to
  SVG for static visualizations. Per-layer blending modes beyond simple
  opacity — additive, multiply, difference — to create composite images
  from overlapping layer traces. A parameter inspector that shows the
  raw DFT coefficients alongside the visual output.

---

## Architecture

```
UI/Presentation (React components)
    │
    ▼
Zustand Store (bridges engine logic ↔ UI components)
    │
    ▼
core/           — Canvas rendering, layer system, types
modules/fourier — DFT computation (Web Worker), Fourier epicycle rendering, harmonicPath rule
    │
    ▼
@repo/sequence-engine (pure: sequence generation, rule types, PresetStore interface, built-in presets)
```

## State & Store

The store uses a consistent Zustand pattern. Access state via selector
hooks:

```typescript
const seed = useSeed(); // Random seed string
const sequenceRule = useSequenceRule(); // Current SequenceRule
const steps = useSequenceSteps(); // Step count
const sequence = useSequenceSequence(); // Generated number array
const layers = useLayersConfig(); // LayerConfigEntry[]
const viewport = useViewport(); // CanvasViewport
```

| Mutation                             | Effect                                 |
| :----------------------------------- | :------------------------------------- |
| `setSequenceRule({ sequenceRule })`  | Change rule, clamp steps, regenerate   |
| `setSequenceSteps({ steps })`        | Change step count, regenerate          |
| `setSeed(seed)`                      | Change random seed, regenerate         |
| `toggleLayer(layerId)`               | Enable/disable a layer                 |
| `addLayer(layerId)`                  | Append a new layer with default params |
| `updateLayerParams(layerId, params)` | Merge param overrides for a layer      |
| `setViewport(...)`                   | Update viewport state                  |

## Component Tree

```
App
  ErrorBoundary
    Sidebar (right panel)
      Sidebar.Main
        SequenceCanvas  — <canvas> with mouse wheel zoom + drag pan
      Sidebar.Panel
        SidebarControls
          SequenceSelector      — Dropdown (rules)
          Seed                  — Text input for random seed
          StepsSlider           — Step count
          LayerStackEditor      — Add/remove layers, toggle per-layer params
          ViewportControls      — Zoom/Pan toggle + sliders
```

---

_See [@repo/sequence-engine](/docs/reference/packages/sequence-engine) for the pure generation engine, rule system, and PresetStore interface._

_Part of the [Creative Playground](https://joska-p.github.io/playground)_
