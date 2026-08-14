---
title: "Fracture"
description: "Interactive WebGL2 fractal explorer — Mandelbrot and Julia sets with deep-zoom perturbation and double-single emulation."
hasApp: true
---


# @repo/fracture

> A high-precision GLSL fractal renderer — exploring Mandelbrot and Julia sets through deep perturbation and double-single emulation.

---

## Essence

`@repo/fracture` is a WebGL2 fractal explorer that renders complex orbit dynamics directly on the GPU. It provides multiple GLSL shader pipelines — from standard single-precision float orbits to double-single (DS) emulation for deep zooming without precision loss artifacts.

State management is cleanly split between param stores (holding zoom, pan coordinates, max iterations, and Julia constants) and view stores (active renderer mode and UI overlay states).

## Quick Launch

```bash
pnpm dev --filter @repo/fracture
```

Or embed the React component:

```tsx
import { App } from '@repo/fracture/fracture';

export default function Page() {
    return <App />;
}
```

```tsx
import '@repo/fracture/styles';
```

## Field Notes

- **The Catalyst:** Overcoming standard IEEE-754 single-precision `float` limits in WebGL shaders (which pixelate at ~$10^{-7}$ zoom scales) by implementing double-single math (`vec2` high + low float pairs).
- **Quirks & Anomalies:** Uses React 19 `<Activity>` boundaries to keep alternate GLSL scene pipelines mounted and pre-warmed while switching render strategies in real time.
- **Future Horizons:** Extracting the core GLSL perturbation and paramStore modules into a reusable `@repo/fracture-engine` package shared with Mandelbrot visualizers.

---

## Architecture

```
@repo/fracture
  ├─ App.tsx (React 19 Activity pipeline switcher)
  ├─ components/
  │   ├─ OriginalScene.tsx (Standard GLSL Mandelbrot shader)
  │   ├─ DoubleSplitScene.tsx (Double-single precision emulation shader)
  │   ├─ PerturbationScene.tsx (Perturbation theory orbit shader)
  │   └─ ControlPanel.tsx (Floating UI controls & parameter sliders)
  └─ stores/
      ├─ paramStore.ts (Zoom, offset, iterations, Julia parameters)
      └─ viewStore.ts (Active renderer selection)
```

---

_Part of the [Creative Playground](https://joska-p.github.io/playground)_
