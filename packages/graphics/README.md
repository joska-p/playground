---
title: 'Graphics'
coordinates: '/visuals/generative'
status: 'Active'
date_discovered: 2025-07-27
---

# @repo/graphics

> A zero-dependency, React-first generative graphics library that bridges custom
> GLSL engines with WebGL2 — replacing Three.js/R3F with tiny, decoupled modules
> for coordinate mapping, shader execution, framebuffer management, and
> instanced drawing.

---

## Essence

Graphics is the foundational rendering layer for the creative playground. It
provides the coordinate space math, WebGL2 resource management, and React
bindings that every generative package needs — without the weight of a full 3D
engine.

The library is structured as independent modules that can be used separately:
use `SpaceMapper` alone for coordinate transformations, `QuadPipeline` for
fragment shader execution, or the full React hooks for a complete generative
canvas experience.

## Module Overview

| Module                   | Purpose                                                                         | Replaces                                 |
| ------------------------ | ------------------------------------------------------------------------------- | ---------------------------------------- |
| **SpaceMapper**          | DPR-aware coordinate conversions: screen↔UV↔NDC↔buffer, data↔screen, grid↔world | Scattered manual math across 6+ packages |
| **QuadPipeline**         | Fullscreen triangle shader runner — compile GLSL, bind uniforms, draw           | `<Canvas><Plane><ShaderMaterial>`        |
| **FBOManager**           | Ping-pong framebuffers for multi-pass rendering                                 | `@react-three/drei` `useFBO`             |
| **InstancedBatch**       | Hardware-instanced drawing for lines and meshes                                 | drei `<Instances/>`                      |
| **CanvasContainer**      | Responsive, DPR-aware wrapper component                                         | Per-package resize logic                 |
| **useShaderPass**        | React hook: mount a fragment shader on a canvas                                 | Manual R3F scene setup                   |
| **useInteractiveCanvas** | React hook: pan/zoom/pointer state for 2D canvases                              | `OrbitControls` (2D)                     |

## Quick Launch

```bash
pnpm add @repo/graphics
```

```tsx
import { useShaderPass } from '@repo/graphics/react/useShaderPass';

function ShaderArt() {
  const { canvasRef } = useShaderPass({
    fragmentShader: `
      #version 300 es
      precision highp float;
      uniform float u_time;
      uniform vec2 u_resolution;
      out vec4 fragColor;
      void main() {
        vec2 uv = gl_FragCoord.xy / u_resolution;
        fragColor = vec4(uv, sin(u_time) * 0.5 + 0.5, 1.0);
      }
    `
  });

  return (
    <canvas
      ref={canvasRef}
      style={{ width: '100%', height: '100%' }}
    />
  );
}
```

## Architecture

```
@repo/graphics
├── math/
│   ├── Vector2.ts              Lightweight 2D vector ops
│   ├── Vector3.ts              Lightweight 3D vector ops
│   └── SpaceMapper.ts          Viewport, DPR, coordinate conversions
├── webgl/
│   ├── WebGLContext.ts          Canvas setup, DPR resize, context loss handling
│   ├── QuadPipeline.ts          Fullscreen triangle shader runner
│   ├── FBOManager.ts            Ping-pong framebuffers
│   └── InstancedBatch.ts        Hardware-instanced drawing
└── react/
    ├── useShaderPass.ts         Hook: mount a GLSL fragment shader
    ├── useInteractiveCanvas.ts  Hook: pan/zoom/pointer state
    └── CanvasContainer.tsx      Responsive wrapper component
```

## Coordinate Spaces

Graphics unifies the coordinate space chaos found across the monorepo:

| Space      | Range             | Origin         | Use                                   |
| ---------- | ----------------- | -------------- | ------------------------------------- |
| **Screen** | CSS pixels        | Top-left       | Pointer events, DOM layout            |
| **UV**     | `[0, 1]`          | Bottom-left    | GLSL texture lookups                  |
| **NDC**    | `[-1, 1]`         | Center         | Vertex positions, Cartesian math      |
| **Buffer** | `[0, W] x [0, H]` | Top-left       | `gl_FragCoord`, DPR-scaled pixels     |
| **Data**   | Arbitrary         | Domain-defined | Chart/plot data coordinates           |
| **Grid**   | Integer cells     | Center         | Cellular automata, grid-based systems |

`SpaceMapper` converts between all of these with a single API.

## Field Notes

- **The Catalyst:** The audit revealed 9 inconsistencies across the monorepo:
  Y-axis flip mismatches between CPU/GLSL renderers, missing DPR handling in 3
  packages, no aspect ratio correction in shaders, and scattered coordinate
  transformation code duplicated differently in every package. A unified library
  eliminates all of these.

- **Design Principle:** Every module is independent and has zero runtime
  dependencies. The React hooks depend on the WebGL modules, but the WebGL
  modules don't depend on React. The math modules don't depend on anything.

- **Future Horizons:** GLSL code generation from AST (replacing
  `compileToGLSL` in randomart-engine), a shader preset registry, video frame
  export, and a declarative scene graph for composable generative art.

---

_Part of [Creative Playground](https://joska-p.github.io/playground)_
