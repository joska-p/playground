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
| [`@repo/glaze`](../../api/glaze/) | 2D rendering toolkit — CPU/GPU surfaces, shaders, React. |
| [`@repo/randomart-engine`](../../api/randomart-engine/) | Grammar-driven expression trees compiling to CPU pixels and GLSL. |

New packages are added here as they ship docs (`pnpm build:docs && pnpm collect-assets`).
