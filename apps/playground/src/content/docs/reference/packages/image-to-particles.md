---
title: "Image to Particles"
description: "An image disintegrates into thousands of particles that tumble from the top of the canvas, drift under gravity, and spring back to their origin — turning a photograph into a moment of organized collapse and recovery."
category: "reference"
tags:
  - reference
  - image-to-particles
order: 20
---

---
title: 'Image to Particles'
coordinates: '/visuals/particles'
status: 'Active'
date_discovered: 2025-06-15
---

# @repo/image-to-particles

---

## Essence

Image to Particles is a single-package React component that converts any
uploaded image into a physics-driven particle system. Each visible pixel
becomes a particle with its own color, size, and velocity. On load, the
particles are scattered above the canvas, fall under gravity with staggered
timing, and once they reach their target row, spring back to their
original position with damped oscillation.

The experience sits between destruction and restoration. The image
disassembles itself — pixels raining down like confetti — and then
reconstitutes, each particle finding its way home. The `Replay` button
lets you watch the collapse again, which is satisfying in a way that
never gets old.

The system is bounded by a `MAX_PARTICLES` cap. When an image has more
visible pixels than the cap allows, `initParticles` calculates a sampling
rate and picks every Nth pixel, keeping the animation smooth regardless
of source resolution. Each particle also carries a small random color
variation (±10 per channel) so the reassembled image has a slightly
grainy, living quality rather than a pixel-perfect reproduction.

## Quick Launch

```bash
pnpm dev --filter @repo/image-to-particles
```

Or install it into your own project:

```bash
pnpm add @repo/image-to-particles
```

```tsx
import { ImageToParticles } from '@repo/image-to-particles';

export default function MyParticles() {
  return <ImageToParticles />;
}
```

```tsx
import '@repo/image-to-particles/styles';
```

## Field Notes

- **The Catalyst:** The question of what an image _is_ when you拆解 it
  into its constituent pixels and give each one independent physics. A
  photograph is a flat grid of color values — but if each value were a
  physical object with mass and velocity, the image would behave like a
  suspension of particles in a fluid. The three-state lifecycle
  (waiting → falling → landed) emerged from wanting the collapse to feel
  choreographed rather than simultaneous: each pixel starts with a random
  staggered delay, so the image falls apart in a wave rather than all at
  once.

- **Quirks & Anomalies:** The landing behavior uses a spring force
  (`RETURN_FORCE = 0.05`) combined with velocity damping (`DAMPING =
0.95`), which produces a visible oscillation as particles overshoot
  their origin and settle. This was initially a bug — the particles
  wobbled past their target and had to be pulled back — but the wobble
  turned out to be the most interesting part of the animation. The
  `POSITION_THRESHOLD` of 0.5 pixels is the tolerance for "close enough"
  — once a particle is within half a pixel of its origin on the x-axis,
  it snaps into place and its velocity zeroes out. The y-axis transition
  from `falling` to `landed` is stricter: it happens the moment the
  particle reaches or passes its `originY`, which prevents the spring
  oscillation from manifesting vertically.

- **Future Horizons:** A mode where particles scatter outward from the
  click point instead of falling from above — an explosion rather than a
  collapse. Per-particle mass derived from pixel brightness, so darker
  pixels fall faster. A "freeze" button that pauses the animation at any
  point, letting you inspect the half-disassembled state. Color-space
  awareness: the particle color could be computed in OKLCh to preserve
  perceptual uniformity during the color variation step, rather than
  adding a flat ±10 to raw RGB channels.

---

## Particle Lifecycle

Each particle moves through three states. The transitions are driven by
the animation loop — no external state machine, just a `state` property
on each particle object checked every frame.

```
         delay expires          y >= originY         distance < threshold
waiting ──────────────→ falling ──────────────→ landed ──────────────────→ settled
  (above canvas)        (gravity pull)          (spring return)           (at origin)
```

| State     | Behavior                                | Transition                                          |
| --------- | --------------------------------------- | --------------------------------------------------- |
| `waiting` | Stationary at y = −10 (above canvas)    | After `delay` ms → `falling`                        |
| `falling` | Moves downward with gravity             | When y ≥ `originY` → `landed`                       |
| `landed`  | Spring-force toward `originX` on x-axis | When \|dx\| < `POSITION_THRESHOLD` → snap to origin |

## Configuration

All physics constants live in `src/core/config.ts`:

| Constant                         | Value           | Purpose                                |
| -------------------------------- | --------------- | -------------------------------------- |
| `CANVAS_WIDTH` / `CANVAS_HEIGHT` | 800 / 600       | Canvas dimensions in pixels            |
| `MAX_PARTICLES`                  | 5000            | Upper bound on particle count          |
| `GRAVITY`                        | 0.5             | Downward acceleration per frame        |
| `INITIAL_VELOCITY`               | x: ±0.5, y: 0–2 | Random velocity range at start of fall |
| `PARTICLE_SIZE`                  | 1.5–2.5         | Radius range in pixels                 |
| `RETURN_FORCE`                   | 0.05            | Spring constant toward origin (x-axis) |
| `DAMPING`                        | 0.95            | Velocity decay per frame in `landed`   |
| `POSITION_THRESHOLD`             | 0.5             | Distance tolerance for stable landing  |

## Particle Sampling

On image load, the system:

1. Counts visible pixels (alpha > 128).
2. Calculates `samplingRate = ceil(sqrt(visiblePixels / MAX_PARTICLES))`.
3. Iterates the image data, sampling every Nth pixel to build the
   particle array.
4. Assigns each particle a random color variation (±10 per RGB channel),
   a random initial velocity, and a staggered delay
   (`currentDelay += random * 5`).

## Exports

| Export             | Path                                        | Description                           |
| ------------------ | ------------------------------------------- | ------------------------------------- |
| `ImageToParticles` | `@repo/image-to-particles/ImageToParticles` | Main component — file upload + canvas |
| `useImageUpload`   | `@repo/image-to-particles`                  | Hook: returns `[dataUrl, onChange]`   |
| `./styles`         | `@repo/image-to-particles/styles`           | Component CSS                         |

---

_Part of the [Creative Playground](https://joska-p.github.io/playground)_

