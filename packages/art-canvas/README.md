---
title: 'Art Canvas'
coordinates: '/visuals/generative'
status: 'Active'
date_discovered: 2025-06-01
---

# @repo/art-canvas

> A drop-bag for shader experiments — a WebGL workshop container where each
> idea lives as its own module, and adding a new one is deliberately easy.

---

## What this is

Art Canvas is not a product. It's a **workshop**: a single interactive canvas
plus a controls panel, wired so that a new experiment is just another module.
You drop an idea in, play with it, leave it, come back to it. Nothing here is
finished — that's the point. Some modules are rough sketches, some are further
along, and a few are barely defined at all.

The container is the real asset. The canvas, the state pattern, the controls
wiring, the styling — all solved once, so a new idea only has to be the idea.

There are no plans to redesign the UI or the concept. The container is stable
and working; the fun happens inside it.

## The modules

| Module        | State                                                |
| ------------- | ---------------------------------------------------- |
| **Seed**      | Procedural shader generator — seed + mood bias into a composed fragment shader. The most "built" module. |
| **Atlas**     | The current direction — modular-arithmetic shader rendering Unicode symbols (arrows, boxes, arcs, chevrons). |
| **Folded Space** | A hardcoded study of `repeatSpace` + cosine palette composition. |
| **Manual**    | A hand-authored shader with a few sliders. |

## Quick Start

Run the workshop on its own:

```bash
pnpm dev --filter @repo/art-canvas
```

Or embed it in your own project:

```bash
pnpm add @repo/art-canvas
```

```tsx
import { App } from '@repo/art-canvas/art-canvas';
import '@repo/art-canvas/styles';

export default function Artwork() {
    return <App />;
}
```

`App` fills its container — render it somewhere full-screen so the canvas has
room. The `styles` import brings in the Tailwind theme the workshop is styled
with.

## Adding a module

The whole point of the container is that this is a small, mechanical recipe:

1. Create `src/modules/<name>/` — a component that renders on mode match,
   plus optional controls and a Zustand store (`store/`, `actions.ts`,
   `selectors.ts`, `types.ts`).
2. Add the mode to `InputMode` in `src/stores/ui/store.ts`.
3. Wire it in two spots: render it in `ArtCanvas.tsx`, register the option +
   conditional controls in `components/controls/ControlsPanel.tsx`.

That's it. The module owns its shader, its controls, and its state.

## Patterns & Gotchas

- **A module is self-contained.** Component, controls, and store all live
  under `src/modules/<name>/`. A module that can't be lifted out cleanly is a
  sign the pattern is being stretched — keep modules independent.
- **Module authoring tolerates variation.** The Seed generator expects its
  module code and GLSL dependencies to be registered in registries; simpler
  modules (Atlas, Manual) author their shader inline. Both are fine.
- **Determinism vs surprise (Seed).** The same seed always produces the same
  shader — surprise comes from the mood lens and the user's own overrides.
- **GLSL has two collision domains (Seed).** Module code and shared preamble
  utilities are injected separately: `resolveDeps` deduplicates the preamble so
  each utility lands exactly once. When a new module needs a shared utility,
  register it in the preamble registry and declare it in the module's `deps`.

## Direction

The experiment worth pushing is **Atlas** — unicode as visual matter. The
Fibonacci-syllabic symbols (arrows, boxes, arcs, chevrons) already render
beautifully as shader output; the open question is how far the idea can go:
richer symbol families, tighter interaction between symbol shape and grid
math, and palettes that treat the glyphs as texture rather than text.

---

_Part of the [Creative Playground](https://joska-p.github.io/playground)_
