---
title: 'Graphics'
coordinates: '/visuals/generative'
status: 'Active'
date_discovered: 2025-07-27
---

# @repo/graphics

> A zero-dependency, React-first generative graphics library that bridges custom
> GLSL engines with WebGL2 — replacing heavy 3D engines with tiny, decoupled
> modules for coordinate mapping, shader execution, framebuffer management, GPU
> compute (GPGPU), and render-loop orchestration.

---

## Core Philosophy & Design Guidelines

This package is built around three core architectural principles:

1. **Zero Abbreviations & Explicit Naming:** No shortened variable or parameter names (`v`, `buf`, `ndc`). Everything reads as self-documenting, plain English (`vector`, `canvasElementBounds`, `devicePixelRatio`).
2. **Pure Curried Functions over State Engines:** Math modules export higher-order, curried functions rather than stateful classes. You configure the spatial context first (bounds, DPR, scale fit mode) and get back a specialized, single-argument transformer `(vector: Vector2) => Vector2`.
3. **`originToTarget` Directional Flow:** Conversions are named explicitly by their source and destination spaces (`createScreenToCanvas`, `createCanvasToBuffer`, `createDataToCanvas`). The target of one stage naturally plugs into the origin of the next.

---

## Module Overview

| Module / Export                | Kind      | Purpose                                                                                                                                                                                                                                                   |
| :----------------------------- | :-------- | :-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **math/transforms**            | functions | Curried coordinate transforms (`screenToCanvas`, `canvasToNormalized`, `normalizedToWebGL`, `canvasToBuffer`, `bufferToCanvas`, `dataToCanvas`, `canvasToData`, `screenToBuffer`, `bufferToScreen`), `createShaderUniformBuilder`, `generateGLSLFragment` |
| **webgl/WebGLContext**         | class     | Canvas setup, DPR-aware resize, viewport management, context loss handling                                                                                                                                                                                |
| **webgl/QuadPipeline**         | class     | Fullscreen triangle shader runner — compile GLSL, bind uniforms (auto + custom), draw                                                                                                                                                                     |
| **webgl/FBOManager**           | class     | Ping-pong framebuffers for multi-pass rendering and feedback loops                                                                                                                                                                                        |
| **webgl/FrameLoop**            | class     | `requestAnimationFrame` loop with subscribe/unsubscribe, delta time                                                                                                                                                                                       |
| **webgl/ShaderRunner**         | class     | Convenience composition of `WebGLContext` + `QuadPipeline` with resize and mouse support                                                                                                                                                                  |
| **webgl/GPGPUPipeline**        | class     | GPU compute pipeline over an `FBOManager` — multi-program, state texture, init/step                                                                                                                                                                       |
| **react/FrameLoopContext**     | context   | `GraphicsProvider` + `useFrame` — rAF loop distributed via React context                                                                                                                                                                                  |
| **react/useShaderRunner**      | hook      | Mount a fragment shader on a canvas with `ResizeObserver` auto-resize                                                                                                                                                                                     |
| **react/ShaderCanvas**         | component | Standalone animated shader component combining `useShaderRunner` + `useFrame`                                                                                                                                                                             |
| **react/useInteractiveCanvas** | hook      | Pan/zoom/pointer state for 2D canvases (zero re-renders, mutable ref)                                                                                                                                                                                     |
| **react/useGPGPU**             | hook      | React wrapper around `GPGPUPipeline` — sim shader → state texture                                                                                                                                                                                         |

---

## Spatial Coordinate System

All transformations adhere to strict domain definitions — preventing Y-axis flip bugs and DPI mismatch errors:

```
[ Screen Space ]  --->  [ Canvas Space ]  --->  [ Normalized Space ]  --->  [ WebGL NDC ]
  (Browser CSS)        (Canvas Layout)          (0–1)                    (-1–1, Y-flipped)
                              |
                              v
                       [ Buffer Space ]
                       (High-DPI GPU pixels)
```

| Space Name     | Boundaries / Range                     | Origin Position | Unit / Context                                     |
| :------------- | :------------------------------------- | :-------------- | :------------------------------------------------- |
| **Screen**     | `[0, windowWidth] x [0, windowHeight]` | Top-Left        | Raw browser pointer events (`clientX`, `clientY`)  |
| **Canvas**     | `[0, canvasWidth] x [0, canvasHeight]` | Top-Left        | Local CSS layout pixels inside the canvas element  |
| **Normalized** | `[0.0, 1.0] x [0.0, 1.0]`              | Top-Left        | Relative percentages across canvas dimensions      |
| **WebGL NDC**  | `[-1.0, 1.0] x [-1.0, 1.0]`            | Center          | Standard WebGL Normalized Device Coordinates       |
| **Buffer**     | `[0, width * DPR] x [0, height * DPR]` | Top-Left        | Physical GPU render target pixels (`gl_FragCoord`) |
| **Data**       | Domain-defined (e.g., `[-100, 100]`)   | Domain-defined  | Raw mathematical data, charts, or simulation space |

---

## Functional API

Transformations are curried — pre-configure your conversion pipeline once and pass pure single-argument functions into render loops:

```typescript
import { createScreenToCanvas, createCanvasToBuffer } from '@repo/graphics/math/transforms';

const screenToCanvas = createScreenToCanvas(canvasElementBounds);
const canvasToBuffer = createCanvasToBuffer(devicePixelRatio);

const canvasPoint = screenToCanvas(pointerEventVector);
const bufferPoint = canvasToBuffer(canvasPoint);
```

### Composite transforms

Shorthand for common two-stage pipelines:

```typescript
import { createScreenToBuffer, createBufferToScreen } from '@repo/graphics/math/transforms';

const screenToBuffer = createScreenToBuffer(canvasBounds, devicePixelRatio);
const bufferToScreen = createBufferToScreen(canvasBounds, devicePixelRatio);
```

### Data-domain mapping with fit modes

`fitMode` determines how mathematical data maps inside non-square viewports:

- `'contain'` — Scales domain so all data fits (letterbox/pillarbox).
- `'cover'` — Scales domain to fill the canvas (crops domain edges).
- `'fill'` — Distorts data to stretch across canvas dimensions.
- `'none'` — Raw 1:1 mapping, no scaling.

```typescript
import { createDataToCanvas } from '@repo/graphics/math/transforms';

const dataToCanvas = createDataToCanvas(
  { xMin: -100, xMax: 100, yMin: -50, yMax: 50 },
  canvasDimensions,
  'contain',
  0.05 // 5% padding
);

const canvasPositions = dataPoints.map(dataToCanvas);
```

### GLSL fragment boilerplate

`generateGLSLFragment` produces reusable UV-calculation snippets for your shaders:

```typescript
import { generateGLSLFragment } from '@repo/graphics/math/transforms';

const uvSetup = generateGLSLFragment({
  inputSpace: 'canvas',
  flipVertically: true,
  correctAspectRatio: true
});
// → "vec2 uv = gl_FragCoord.xy / uniformResolution;"
// → "uv.y = 1.0 - uv.y;"
// → "uv.x *= uniformResolution.x / uniformResolution.y;"
```

### Shader uniform builder

```typescript
import { createShaderUniformBuilder } from '@repo/graphics/math/transforms';

const buildUniforms = createShaderUniformBuilder(cssWidth, cssHeight, devicePixelRatio);
const uniforms = buildUniforms(mouseBufferPixel);
// → { uniformResolution: [w*dpr, h*dpr], uniformAspectRatio: w/h, uniformMouse: [px, py] }
```

---

## WebGL Classes

### QuadPipeline — fullscreen fragment shader runner

Compiles a fragment shader (with auto `#version 300 es` injection) against a built-in fullscreen triangle vertex shader, introspects uniforms, and auto-binds `uniformResolution` / `uniformAspectRatio` / `uniformMouse`. Custom uniforms can be set via `setUniforms`:

```typescript
import { QuadPipeline, createShaderUniformBuilder } from '@repo/graphics';

const gl = canvas.getContext('webgl2');
const builder = createShaderUniformBuilder(width, height, dpr);
const pipeline = new QuadPipeline(gl, builder);

pipeline.compileFragmentShader(myFragmentSrc);

// Auto uniforms are bound on render():
pipeline.render(mousePx);

// Custom uniforms (numbers, arrays, textures):
pipeline.setUniforms({
  u_time: performance.now() / 1000,
  u_color: [1.0, 0.4, 0.1],
  u_texture: myWebGLTexture
});

// Update builder after resize:
pipeline.updateUniformBuilder(createShaderUniformBuilder(newW, newH, dpr));
```

### WebGLContext — canvas lifecycle

```typescript
import { WebGLContext } from '@repo/graphics/webgl/WebGLContext';

const ctx = new WebGLContext({ canvas, dpr: devicePixelRatio });
ctx.viewport();
ctx.clear(0, 0, 0, 1);
ctx.resize(width, height, dpr);
ctx.onContextLost(() => {
  /* re-create resources */
});
ctx.onContextRestored(() => {
  /* re-upload */
});
```

### FBOManager — ping-pong framebuffers

```typescript
import { FBOManager } from '@repo/graphics/webgl/FBOManager';

const fbo = new FBOManager(gl, width, height);

// Each frame:
fbo.bindWrite(); // render to current write target
// ... draw calls ...
fbo.unbind();
fbo.swap(); // swap read ↔ write for next frame

const readTex = fbo.getReadTexture(); // previous frame's result
const writeTex = fbo.getWriteTexture(); // current frame's target
```

### FrameLoop — rAF subscription

```typescript
import { FrameLoop } from '@repo/graphics/webgl/FrameLoop';

const loop = new FrameLoop();
const unsubscribe = loop.subscribe((time, delta) => {
  // time in seconds, delta in seconds
});
unsubscribe(); // auto-stops when no subscribers
loop.dispose();
```

### ShaderRunner — Quick all-in-one

Combines `WebGLContext` + `QuadPipeline` for the common case:

```typescript
import { ShaderRunner } from '@repo/graphics/webgl/ShaderRunner';

const runner = new ShaderRunner(canvas, fragmentShaderSrc);
runner.render(); // draw one frame
runner.setMouse({ x, y }); // update mouse uniform
runner.resize(width, height);
```

### GPGPUPipeline — GPU compute (simulation)

Runs a simulation shader against a state texture in a feedback loop via `FBOManager`. Supports multiple named programs:

```typescript
import { GPGPUPipeline } from '@repo/graphics/webgl/GPGPUPipeline';

const gpu = new GPGPUPipeline(gl, width, height, simFragmentSrc);
gpu.compile();

gpu.addProgram('render', renderFragmentSrc);
gpu.useProgram('default');

// Each tick:
gpu.setUniforms({ u_dt: 0.016 });
gpu.step(); // render → swap FBO

// Initialize state:
gpu.init(new Uint8Array(width * height));
const stateTexture = gpu.getStateTexture();
```

---

## React Integration

### GraphicsProvider & useFrame — frame loop context

Wrap your tree with `GraphicsProvider` and subscribe to the animation loop with `useFrame`:

```tsx
import { GraphicsProvider, useFrame } from '@repo/graphics/react/FrameLoopContext';

function Root() {
  return (
    <GraphicsProvider>
      <MyScene />
    </GraphicsProvider>
  );
}

function MyScene() {
  useFrame((time, delta) => {
    // Called every rAF — stable callback ref, no stale closures
  });
}
```

### ShaderCanvas — auto-animating shader component

Drop-in animated shader with mouse tracking and an `onBeforeRender` callback for custom uniforms:

```tsx
import { ShaderCanvas } from '@repo/graphics/react/ShaderCanvas';

<ShaderCanvas
  fragmentShader={myShaderSrc}
  onBeforeRender={(pipeline, time) => {
    pipeline.setUniforms({ u_time: time });
  }}
/>;
```

### useShaderRunner — mount a shader with ResizeObserver

```tsx
import { useShaderRunner } from '@repo/graphics/react/useShaderRunner';

function MyCanvas() {
  const { canvasRef, runnerRef } = useShaderRunner(fragmentShader);

  useEffect(() => {
    const id = setInterval(() => runnerRef.current?.render(), 16);
    return () => clearInterval(id);
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{ width: '100%', height: '100%' }}
    />
  );
}
```

### useInteractiveCanvas — pan/zoom/pointer state

Zero-re-render mutable ref for 2D canvas interaction:

```tsx
import { useInteractiveCanvas } from '@repo/graphics/react/useInteractiveCanvas';

function Canvas() {
  const canvasRef = useRef(null);
  const state = useInteractiveCanvas(canvasRef);

  // Read mutable ref in your draw loop:
  //   state.current.pan, state.current.zoom, state.current.pointer
}
```

### useGPGPU — GPU compute hook

```tsx
import { useGPGPU } from '@repo/graphics/react/useGPGPU';

const gl = canvas.getContext('webgl2');
const { pipelineRef, getStateTexture } = useGPGPU(gl, 256, 256, simShader);

// Step the simulation each frame:
pipelineRef.current?.setUniforms({ u_dt: 0.016 });
pipelineRef.current?.step();
```

---

## Architecture Blueprint

```
@repo/graphics/src/
├── math/
│   └── transforms.ts         Curried coordinate factory functions + GLSL boilerplate generator
├── webgl/
│   ├── WebGLContext.ts       Canvas setup, DPR resize, context loss handling
│   ├── QuadPipeline.ts       Fullscreen triangle shader compiler and runner
│   ├── FBOManager.ts         Ping-pong framebuffers for multi-pass/feedback
│   ├── FrameLoop.ts          Generic requestAnimationFrame subscription manager
│   ├── ShaderRunner.ts       Convenience: WebGLContext + QuadPipeline
│   └── GPGPUPipeline.ts      GPU compute pipeline over FBOManager (simulation)
└── react/
    ├── FrameLoopContext.tsx   GraphicsProvider + useFrame (rAF via React context)
    ├── useShaderRunner.ts    Hook: mount a fragment shader with ResizeObserver
    ├── ShaderCanvas.tsx      Animated shader component with onBeforeRender
    ├── useInteractiveCanvas.ts Hook: pan/zoom/pointer state for 2D canvases
    └── useGPGPU.ts           Hook: GPGPU simulation pipeline → state texture
```

---

## Field Notes & Guidelines for Contributors

- **Zero Runtime Dependencies:** The math layer must remain 100% pure TypeScript with zero external dependencies.
- **Separation of Concerns:** React hooks rely on WebGL modules, but WebGL modules must never rely on React. Math modules rely on nothing.
- **Avoid Arrow Function Memory Leaks in Classes:** If extending classes in `webgl/`, prefer standard prototype methods to keep shared memory allocations minimal.

---

*Part of [Creative Playground*](https://joska-p.github.io/playground)
