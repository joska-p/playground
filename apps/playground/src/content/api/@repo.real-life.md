---
title: "@repo/real-life"
package: "@repo/real-life"
kind: package
description: A continuous cellular automaton that runs entirely on the GPU — Conway's
---

# @repo/real-life

> A continuous cellular automaton that runs entirely on the GPU — Conway's
> Game of Life reimagined as smooth, flowing fields of growth and decay,
> rendered through GLSL shaders and React Three Fiber.

---

## Essence

Real Life takes the binary alive/dead logic of cellular automata and
replaces it with continuous values between 0 and 1. Instead of snapping
cells between states, the simulation breathes — neighbourhoods gently
swell when they hit a sweet spot of density, and slowly fade when they're
too sparse or too crowded. The result is an organic, almost biological
texture that feels more like watching a petri dish than a computer
simulation.

The entire simulation runs on the GPU. A fragment shader reads the
current state from a texture, samples eight neighbours, applies the
growth/decay rule, and writes the next state. Two WebGL render targets
ping-pong back and forth each frame, and a display shader maps the final
grayscale values onto a full-screen quad. The CPU barely lifts a finger
beyond throttling the update rate.

## Quick Launch

```bash
pnpm dev --filter @repo/real-life
```

## Architecture

```
src/
  components/
    ContinuousAutomaton.tsx   # Root: wires buffers, scene, and display
    SimulationRenderer.tsx    # useFrame loop — ping-pong + display update
    DisplayMesh.tsx           # Full-screen quad with the output texture
  hooks/
    useInitialGridTexture.ts  # Random 512×512 RGBA seed texture
    useSimulationBuffers.ts   # Double-buffered WebGLRenderTarget pair
    useSimulationScene.ts     # Off-screen scene with the shader material
    useThrottledUpdate.ts     # Frame-rate limiter for the sim step
  shaders/
    fragmentShader.glsl       # The continuous automaton rule
    vertexShader.glsl         # Passthrough fullscreen quad
  core/
    engine.ts                 # ASCII terminal prototype (the original sketch)
```

## Field Notes

- **The Catalyst:** A late-night wondering — what if Conway's rules weren't
  binary? The ASCII prototype in `core/engine.ts` was the first sketch: ten
  density levels rendered to a terminal at 2 fps. The GPU version followed
  naturally.
- **Quirks & Anomalies:** The shader rule thresholds (0.15–0.45 for growth)
  were tuned by eye until the patterns felt alive. Small changes produce
  radically different textures — some freeze into static, others explode
  into noise.
- **Future Horizons:** Coloured state channels (separate R/G/B automata
  interacting), mouse-click seeding, and potentially multi-scale rules where
  neighbourhood radius varies by zoom level.

---

_Part of the [Creative Playground](https://joska-p.github.io/playground)_

## Modules

- [\<internal\>](@repo.real-life.<internal>.md)

## Functions

### App()

> **App**(): [`Element`](@repo.real-life.<internal>.md#element)

Defined in: [packages/real-life/src/App.tsx:4](https://github.com/joska-p/playground/blob/f540aad548a4f8b54c8b2dc7de26bf81e2d8c83e/packages/real-life/src/App.tsx#L4)

#### Returns

[`Element`](@repo.real-life.<internal>.md#element)
