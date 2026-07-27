---
title: 'Graphics lib'
description: 'A zero-dependency, React-first generative graphics library that bridges custom GLSL engines with WebGL2 — replacing heavy 3D engines with tiny, decoupled modules for coordinate mapping, shader execution, framebuffer management, and instanced drawing.'
category: 'reference'
tags:
  - reference
  - graphics
order: 20
---

# @repo/graphics

---

## Core Philosophy & Design Guidelines

This package is built around three core architectural principles to keep spatial math readable and bug-free:

1. **Zero Abbreviations & Explicit Naming:** No shortened variable or parameter names (`v`, `buf`, `ndc`, `padW`). Everything reads as self-documenting, plain English (`vector`, `canvasElementBounds`, `targetFramebufferPixel`).
2. **Pure Curried Functions over State Engines:** Math modules export higher-order, curried functions rather than stateful classes or mutation methods. You configure the spatial context first (e.g., bounds, device pixel ratio, scale fit modes), and get back a specialized, single-argument transformer `(vector: Vector2) => Vector2`.
3. **`originToTarget` Directional Flow:** Conversions are named explicitly by their source and destination spaces (`createScreenToCanvas`, `createCanvasToBuffer`, `createDataToCanvas`). The target of one stage naturally plugs into the origin of the next.

---

## Module Overview

| Module                   | Purpose                                                                                                            | Replaces                              |
| :----------------------- | :----------------------------------------------------------------------------------------------------------------- | :------------------------------------ |
| **math/**                | Curried coordinate transforms (`screenToCanvas`, `canvasToBuffer`, `dataToCanvas`), `Vector2`, and `Vector3` math. | Scattered manual math across packages |
| **QuadPipeline**         | Fullscreen triangle shader runner — compile GLSL, bind uniforms, draw                                              | `<Canvas><Plane><ShaderMaterial>`     |
| **FBOManager**           | Ping-pong framebuffers for multi-pass rendering and feedback loops                                                 | `@react-three/drei` `useFBO`          |
| **InstancedBatch**       | Hardware-instanced drawing for particle systems, lines, and meshes                                                 | Drei `<Instances/>`                   |
| **CanvasContainer**      | Responsive, DPR-aware canvas wrapper component                                                                     | Per-package resize logic              |
| **useShaderPass**        | React hook: mount a fragment shader on a canvas                                                                    | Manual R3F scene setup                |
| **useInteractiveCanvas** | React hook: pan/zoom/pointer state for 2D canvases                                                                 | `OrbitControls` (2D)                  |

---

## Spatial Coordinate System Specs

To prevent Y-axis flip bugs and DPI mismatch errors across WebGL shaders and CPU canvas drawing, all transformations adhere to these strict domain definitions:

```

[ Screen Space ]  --->  [ Canvas Space ]  --->  [ Framebuffer Space ]  --->  [ Device Space (NDC) ]
(Browser CSS)           (Canvas Layout)          (High-DPI GPU Buffer)         (WebGL Normalized)

```

| Space Name       | Boundaries / Range                     | Origin Position        | Unit / Context                                     |
| :--------------- | :------------------------------------- | :--------------------- | :------------------------------------------------- |
| **Screen**       | `[0, windowWidth] x [0, windowHeight]` | Top-Left               | Raw browser pointer events (`clientX`, `clientY`)  |
| **Canvas**       | `[0, canvasWidth] x [0, canvasHeight]` | Top-Left               | Local CSS layout pixels inside the canvas element  |
| **Normalized**   | `[0.0, 1.0] x [0.0, 1.0]`              | Top-Left               | Relative percentages across canvas dimensions      |
| **Device (NDC)** | `[-1.0, 1.0] x [-1.0, 1.0]`            | Center                 | Standard WebGL Normalized Device Coordinates       |
| **Buffer**       | `[0, width * DPR] x [0, height * DPR]` | Top-Left / Bottom-Left | Physical GPU render target pixels (`gl_FragCoord`) |
| **Data**         | Domain-defined (e.g., `[-100, 100]`)   | Domain-defined         | Raw mathematical data, charts, or simulation space |

---

## Functional API Usage Specification

Because transformations are curried, you pre-configure your conversion pipeline once (during initialization or window resize) and pass pure single-argument functions directly into render loops or array mappings.

### 1. Functional Pipelines (`originToTarget`)

```typescript
import { createScreenToCanvas, createCanvasToBuffer } from '@repo/graphics/math';

// Step 1: Pre-configure functions with viewport context
const screenToCanvas = createScreenToCanvas(canvasElementBounds);
const canvasToBuffer = createCanvasToBuffer(devicePixelRatio);

// Step 2: Transform points effortlessly
const canvasPoint = screenToCanvas(pointerEventVector);
const bufferPoint = canvasToBuffer(canvasPoint);
```

### 2. Array & Data Domain Mappings (`fitMode`)

`fitMode` determines how domain mathematical data maps inside non-square canvas viewports:

- `'contain'`: Scales domain so 100% of data fits inside canvas (letterbox/pillarbox).
- `'cover'`: Scales domain so canvas is fully covered (crops domain edges).
- `'fill'`: Distorts data to stretch precisely across canvas dimensions.

```typescript
import { createDataToCanvas } from '@repo/graphics/math';

// Pre-configure data-to-canvas transformer
const dataToCanvas = createDataToCanvas(dataDomainBounds, canvasDimensions, 'contain');

// Direct array mapping without callback closures:
const canvasNodePositions = dataPoints.map(dataToCanvas);
```

---

## WebGL & React Integration Spec

### Quick Launch with `useShaderPass`

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
        vec2 normalizedCoordinates = gl_FragCoord.xy / u_resolution;
        fragColor = vec4(normalizedCoordinates, sin(u_time) * 0.5 + 0.5, 1.0);
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

---

## Architecture Blueprint

```
@repo/graphics
├── math/
│   ├── Vector2.ts             2D spatial vectors and arithmetic operations
│   ├── Vector3.ts             3D spatial vectors and linear algebra helpers
│   └── transforms.ts          Higher-order curried coordinate transformation factories
├── webgl/
│   ├── WebGLContext.ts        Canvas setup, DPR resize, context loss handling
│   ├── QuadPipeline.ts        Fullscreen triangle shader compiler and runner
│   ├── FBOManager.ts          Ping-pong framebuffers for multi-pass/feedback rendering
│   └── InstancedBatch.ts      Hardware-instanced drawing pipeline
└── react/
    ├── useShaderPass.ts       Hook: mount and execute a GLSL fragment shader
    ├── useInteractiveCanvas.ts Hook: pan/zoom/pointer state for 2D canvases
    └── CanvasContainer.tsx    Responsive, DPR-aware canvas container component

```

---

## Field Notes & Guidelines for Contributors

- **Zero Runtime Dependencies:** The math layer must remain 100% pure TypeScript with zero external dependencies.
- **Separation of Concerns:** React hooks rely on WebGL modules, but WebGL modules must never rely on React. Math modules rely on nothing.
- **Avoid Arrow Function Memory Leaks in Classes:** If extending classes in `webgl/`, prefer standard prototype methods to keep shared memory allocations minimal.

---

*Part of [Creative Playground*](https://joska-p.github.io/playground)
