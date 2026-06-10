# @repo/image-to-particles

> Transform images into interactive falling particle animations.

## Quick Start

```bash
pnpm add @repo/image-to-particles
```

```tsx
import { ImageToParticles } from '@repo/image-to-particles';

export default function myParticles() {
  return <ImageToParticles />;
}
```

## Architecture

The package converts pixel data from an uploaded image into a physics-driven particle system. Each pixel becomes a particle that falls from the top of the canvas and settles into its original position.

```
Upload Image
  → Canvas reads ImageData
    → initParticles() samples visible pixels
      → Particle[] with origin (pixel position) + color
        → Animation loop (requestAnimationFrame)
          ├─ "waiting" → staggered delay before falling
          ├─ "falling" → gravity + initial velocity
          └─ "landed"  → return force toward origin + damping
```

## Particle Lifecycle

| State     | Behavior                                | Transition                                            |
| --------- | --------------------------------------- | ----------------------------------------------------- |
| `waiting` | Stationary at top of canvas             | After `delay` ms → `falling`                          |
| `falling` | Moves downward with gravity             | When within `POSITION_THRESHOLD` of origin → `landed` |
| `landed`  | Spring-returns toward `originX/originY` | Stable when distance < `POSITION_THRESHOLD`           |

## Configuration

All physics constants are in `src/core/config.ts`:

| Constant                         | Default         | Description                            |
| -------------------------------- | --------------- | -------------------------------------- |
| `CANVAS_WIDTH` / `CANVAS_HEIGHT` | 800 / 600       | Canvas dimensions                      |
| `MAX_PARTICLES`                  | 5000            | Upper bound on particle count          |
| `GRAVITY`                        | 0.5             | Downward acceleration per frame        |
| `INITIAL_VELOCITY`               | x: ±0.5, y: 0–2 | Random velocity range at start of fall |
| `PARTICLE_SIZE`                  | 1.5–2.5         | Radius range in pixels                 |
| `RETURN_FORCE`                   | 0.05            | Spring constant toward origin          |
| `DAMPING`                        | 0.95            | Velocity decay in `landed` state       |
| `POSITION_THRESHOLD`             | 0.5             | Distance tolerance for stable landing  |

## Particle Sampling

On image load, the system:

1. Counts visible (non-zero alpha) pixels.
2. Calculates a `samplingRate` to cap particles at `MAX_PARTICLES`.
3. Iterates pixels, sampling every Nth pixel to build the particle array.

Each particle stores: position, origin, color, size, velocity, state, and a staggered delay.

## Exports

| Export             | Path                                        | Description                              |
| ------------------ | ------------------------------------------- | ---------------------------------------- |
| `ImageToParticles` | `@repo/image-to-particles/ImageToParticles` | Main component with file upload + canvas |
| `./styles`         | `@repo/image-to-particles/styles`           | Component CSS                            |

## Hook

```ts
import { useImageUpload } from '@repo/image-to-particles';
// Returns [dataUrl: string | null, onChangeHandler: ChangeEventHandler]
```

---

_Part of @repo/playground_
