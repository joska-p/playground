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

| Package            | Docs                                                       |
| ------------------ | ---------------------------------------------------------- |
| [`@repo/art-canvas`](../../api/art-canvas/) | Interactive WebGL canvas that composes procedural shader art from a mood-biased, seed-deterministic pipeline. |
| [`@repo/glaze`](../../api/glaze/) | 2D rendering toolkit — CPU/GPU surfaces, shaders, React. |
| [`@repo/l-system-engine`](../../api/l-system-engine/) | Grammar-agnostic L-system rewriting engine — pure symbol rewriting with rule factories, seeding, and validation. |
| [`@repo/pixel`](../../api/pixel/) | Browser image-manipulation engine — typed step pipelines over a Web Worker pool. |
| [`@repo/pixel-manipulator`](../../api/pixel-manipulator/) | React workbench for image manipulation — upload, chain steps, inspect results. |
| [`@repo/randomart-engine`](../../api/randomart-engine/) | Grammar-driven expression trees compiling to CPU pixels and GLSL. |
| [`@repo/randomart-engine-next`](../../api/randomart-engine-next/) | Seed-deterministic expression trees compiling to CPU evaluation and GLSL fragment shaders, with operator/rule/behavior registries. |
| [`@repo/sequence-renderer`](../../api/sequence-renderer/) | Interactive canvas that unfurls mathematical sequences — Fourier epicycles, a layer stack, and an orbitable viewport. |

New packages are added here as they ship docs (`pnpm build:docs && pnpm collect-assets`).
