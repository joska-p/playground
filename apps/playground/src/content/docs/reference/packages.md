---
title: Package API Reference
description: Auto-generated API reference for every package — extracted from the code with TypeDoc, README included.
tags:
    - reference
order: 10
---

# Package API Reference

Each package's documentation is **generated from its source code** — no manual
API inventory to maintain. `build:docs` runs TypeDoc over the package's exports
(reading its TSDoc comments) and renders:

- the **README** as the overview page — concept, quick start, and usage,
- the **API reference** — types, classes, functions, and parameters extracted
  from the code.

Generated docs are served from [`/docs/api/`](../../api/):

| Package                                                           | Docs                                                                                                                               |
| ----------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------- |
| [`@repo/art-canvas`](../../api/art-canvas/)                       | Interactive WebGL canvas that composes procedural shader art from a mood-biased, seed-deterministic pipeline.                      |
| [`@repo/automa`](../../api/automa/)                               | Interactive WebGL2 cellular automaton workbench — GPGPU stepping, brush painting, creature stamps.                                  |
| [`@repo/automa-engine`](../../api/automa-engine/)                 | Pure cellular automaton engine — B/S lookup tables, multi-state aging, CPU and GPU simulation engines.                             |
| [`@repo/fracture`](../../api/fracture/)                           | High-precision GLSL fractal renderer — Mandelbrot and Julia set dynamics with double-single perturbation math.                    |
| [`@repo/glaze`](../../api/glaze/)                                 | 2D rendering toolkit — CPU/GPU surfaces, shaders, React.                                                                           |
| [`@repo/l-system-engine`](../../api/l-system-engine/)             | Grammar-agnostic L-system rewriting engine — pure symbol rewriting with rule factories, seeding, and validation.                   |
| [`@repo/palette-engine`](../../api/palette-engine/)               | Color harmony engine — OKLab, OKLCh, HSL, sRGB spaces and pure harmony rules without UI dependencies.                              |
| [`@repo/pixel`](../../api/pixel/)                                 | Browser image-manipulation engine — typed step pipelines over a Web Worker pool.                                                   |
| [`@repo/pixel-engine`](../../api/pixel-engine/)                   | Bare-metal image pipeline — double-buffered transforms, fused pixel passes, and tiled convolutions.                                |
| [`@repo/pixel-manipulator`](../../api/pixel-manipulator/)         | React workbench for image manipulation — upload, chain steps, inspect results.                                                     |
| [`@repo/radu-machine-learning`](../../api/radu-machine-learning/) | A gallery of hand-drawn stroke data with a sketchpad that plots your own drawings against the dataset's feature space.             |
| [`@repo/randomart-engine`](../../api/randomart-engine/)           | Grammar-driven expression trees compiling to CPU pixels and GLSL.                                                                  |
| [`@repo/randomart-engine-next`](../../api/randomart-engine-next/) | Seed-deterministic expression trees compiling to CPU evaluation and GLSL fragment shaders, with operator/rule/behavior registries. |
| [`@repo/sequence-renderer`](../../api/sequence-renderer/)         | Interactive canvas that unfurls mathematical sequences — Fourier epicycles, a layer stack, and an orbitable viewport.              |
| [`@repo/three-stage`](../../api/three-stage/)                     | 3D scene explorer — swappable geometries, materials, light rigs, and R3F debug gizmos.                                             |
| [`@repo/ui`](../../api/ui/)                                       | Design system and React component library — Tailwind CSS v4, CVA variants, and Gruvbox aesthetic.                                   |

New packages are added here as they ship docs (`pnpm build:docs && pnpm collect-assets`).
