---
title: "@repo/mandelbrot"
package: "@repo/mandelbrot"
kind: package
description: Deep-zoom Mandelbrot explorer built on perturbation theory with
  arbitrary-precision (BigInt) reference orbits.
---

# @repo/mandelbrot

> Deep-zoom Mandelbrot explorer built on perturbation theory with arbitrary-precision (BigInt) reference orbits.

---

## What it is

An interactive Mandelbrot-set viewer that zooms to millions of × and stays crisp
and real-time in the browser. The trick is **perturbation theory**: one slow
high-precision point (the _reference orbit_, computed with BigInt-backed
fixed-point on the CPU) plus a fast per-pixel delta loop in the GPU shader,
with double-single arithmetic, Zhuoran rebasing, a distance estimate, and
in-shader OKLCH colour.

The pipeline and its design decisions are explained in depth in
[REVIEW.md](_media/REVIEW.md). The package is planned to grow into a **bespoke
framework hosting several independent visualizers** (migrated from
`packages/fracture`) built on `@repo/glaze` — the driving roadmap is
[PLAN.md](_media/PLAN.md).

## Quick Start

```bash
pnpm --filter @repo/mandelbrot dev
```

## Layout

| Path                          | Role                                                                  |
| ----------------------------- | --------------------------------------------------------------------- |
| `src/components/`             | Viewer, control panel, HUD (React shell).                             |
| `src/lib/big-float.ts`        | Arbitrary-precision numbers as `BigInt` fixed-point, dependency-free. |
| `src/lib/mandelbrot/view.ts`  | Camera math: log2-magnification zoom + BigFloat centre.               |
| `src/lib/mandelbrot/look.ts`  | Colour/lighting/iteration model (`LookState` → shader params).        |
| `src/lib/reference-orbit.ts`  | CPU reference-orbit iteration (+ chunked async fallback).             |
| `src/lib/reference.worker.ts` | Vite module worker that runs the orbit compute off the main thread.   |
| `src/lib/reference-worker.ts` | `@repo/worker-pool` adapter: dispatch, serialization, fallback.       |
| `src/lib/reference-policy.ts` | Drift thresholds + token superseding (app-owned).                     |
| `src/lib/webgl/`              | WebGL2 renderer + perturbation shader (being replaced by glaze).      |

## Docs

- [PLAN.md](_media/PLAN.md) — the driving roadmap (phases, renderer registry, decisions).
- [NEXT-SESSION.md](_media/NEXT-SESSION.md) — fresh-context hand-off prompt for the next phase.
- [REVIEW.md](_media/REVIEW.md) — pipeline walkthrough + code review findings.
- [REPORT-perturbation-ultimate.md](_media/REPORT-perturbation-ultimate.md) — mandelbrot ↔
  `fracture` implementation comparison and the merged blueprint.

## Conventions

This package follows [project conventions](/docs/conventions/01-overview.md):

---

_Part of the [Creative Playground](https://joska-p.github.io/playground)_

## Modules

- [\<internal\>](@repo.mandelbrot.<internal>.md)

## Functions

### App()

> **App**(): [`Element`](@repo.mandelbrot.<internal>.md#element)

Defined in: [packages/mandelbrot/src/App.tsx:4](https://github.com/joska-p/playground/blob/f540aad548a4f8b54c8b2dc7de26bf81e2d8c83e/packages/mandelbrot/src/App.tsx#L4)

#### Returns

[`Element`](@repo.mandelbrot.<internal>.md#element)
